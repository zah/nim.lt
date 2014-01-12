(ns lt.plugins.nimrod
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.command :as cmd]
            [lt.objs.console :as console]
            [lt.objs.proc :as proc]
            [lt.objs.editor.pool :as pool]
            [lt.objs.notifos :as notifos]
            [lt.util.load :as load]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def exec (.-exec (js/require "child_process")))
(def resolve-path (.-resolve (js/require "path")))
(def which (.-which (load/node-module "shelljs")))

(def nimrod-exe (or (which "nimrod")
                    (console/error (str "Nimrod executable not found in PATH: "
                                        (-> js/process .-env .-PATH)))))

(def errors-regex #"(.+)\((\d+), (\d+)\) (Error|Warning|Hint): (.+)")

(defn parse-errors [input]
  (let [results #js []]
    (doseq [line (string/split input "\n")]
      (if-let [match (.match line errors-regex)]
        (.push results {:file (nth match 1)
                        :line (js/parseInt (nth match 2))
                        :col  (js/parseInt (nth match 3))
                        :type (keyword (string/lower-case (nth match 4)))
                        :msg  (nth match 5)})))
    results))

(defn map-errors-to-lines [errors]
  (sort (for [[ln values] (group-by :line errors)]
          [ln (group-by :type values)])))

(defn quote-path [f]
  (str "\"" f "\""))

(defn included-from-range [ed]
  (editor/range ed {:line 0 :ch 0} {:line 10 :ch 0}))

(defn included-from [ed]
  (when-let [match (re-find #"(?m)^\#\s*included from ([a-zA-Z_0-9\.\/\\]+)"
                                                (included-from-range ed))]
    (nth match 1)))

(defn quoted-main-file [ed]
  (let [path (-> @ed :info :path)
        includer (included-from ed)
        main-file (if includer (resolve-path path ".." includer)
                                path)]
    (quote-path main-file)))


(defn call-nimrod [cmd cb]
  (exec (str nimrod-exe " " cmd) cb))

(def symbol-types
  {"skParam"  "v"
   "skVar"    "v"
   "skLet"    "v"
   "skTemp"   "v"
   "skForVar" "v"
   "skConst"  "v"
   "skResult" "v"
   "skGenericParam" "T"
   "skType"   "T"
   "skProc"   "f"
   "skMethod" "f"
   "skMacro"  "f"
   "skIterator"  "f"
   "skConverter" "f"
   "skTemplate"  "f"
   "skField"  "m"
   "skEnumField" "m"})

(defn idetools-at [op tracked-file main-file pos cb]
  (let [cmd (str "idetools --" op " --track:\"" tracked-file ","
                 (inc (:line pos)) "," (inc (:ch pos)) "\" " main-file)]
    (call-nimrod cmd cb)))

(defn idetools [op ed cb]
  (when (editor/dirty? ed nil)
    (cmd/exec! :save))
  (let [path (-> @ed :info :path)]
    (idetools-at op path (quoted-main-file ed) (editor/->cursor ed) cb)))


(defui mark [errors spacing]
  [:div.hintwrapper
   [:span.spacer spacing]
   [:ul {:class "jshinterrors"}
    (for [e (:error errors)]
      [:li (:msg e)])]])

(defn ->spacing [text]
  (when text
    (-> (re-seq #"^\s+" text)
        (first))))

(defn create-hints [editor category errors]
  (doseq [widget (category @editor)]
    (editor/remove-line-widget editor widget))
  (let [cm (editor/->cm-ed editor)
        prev (.getScrollInfo cm)
        hints (doall (for [[ln data] errors]
                       (editor/line-widget editor
                                           (dec ln)
                                           (mark data (->spacing (editor/line editor (dec ln)))))))]
    (object/merge! editor {category hints})
    ;; ensure scroll position is the same as it was when we started
    (.scrollTo (editor/->cm-ed editor) (.-left prev) (.-top prev))))

;;(defn word-at-cursor [editor]
;;  (editor/->token editor (editor/->cursor editor)))

(defn parse-structured-lines [marker input]
  (for [ln (string/split-lines input)
                :let [parts (string/split ln "\t")]
                :when (= marker (first parts))]
    parts))

(defn parse-defs [input]
  (parse-structured-lines "def" input))

(defn parse-suggestions [input]
  (parse-structured-lines "sug" input))

(behavior ::jump-to-definition-at-cursor
          :triggers #{:editor.jump-to-definition-at-cursor!}
          :reaction (fn [editor]
                      (idetools "def" editor
                                (fn [err stdout stderr]
                                  (let [defs (parse-defs stdout)]
                                    (if (> (count defs) 0)
                                      (object/raise lt.objs.jump-stack/jump-stack
                                                    :jump-stack.push!
                                                    editor
                                                    (nth (first defs) 4)
                                                    {:line (dec (nth (first defs) 5)) :ch 0})

                                      (notifos/set-msg! "Definition not found"
                                                        {:class "error"})))))))

(behavior ::eval-on-save
          :triggers #{:save}
          :reaction (fn [editor]
                      (letfn [(check-results-ready
                               [err stdout stderr]
                               (let [errors (map-errors-to-lines (parse-errors stdout))
                                     cm (editor/->cm-ed editor)]
                                 (editor/operation cm #(create-hints editor :nimrod.hints errors))))]

                        (call-nimrod (str "check " (quoted-main-file editor))
                                     check-results-ready))))

(behavior ::on-eval
                  :triggers #{:eval}
                  :reaction (fn [editor]
                              (object/raise nimrod-lang :eval! {:origin editor})))

(behavior ::eval!
          :triggers #{:eval!}
          :reaction (fn [this event]
                      (console/error "Evaluating Nimrod is not yet supported")))

(object/object* ::nimrod-lang
                :tags #{:nimrod.lang})

(def nimrod-lang (object/create ::nimrod-lang))
