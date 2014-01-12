(ns lt.plugins.nimrod
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.command :as cmd]
            [lt.objs.console :as console]
            [lt.objs.proc :as proc]
            [lt.objs.editor.pool :as pool]
            [lt.util.load :as load]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def exec (.-exec (js/require "child_process")))
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

(defn editor-quoted-path [e]
  (quote-path (-> @e :info :path)))

(defn call-nimrod [cmd cb]
  (exec (str nimrod-exe cmd) cb))

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

(behavior ::eval-on-save
          :triggers #{:save}
          :reaction (fn [editor]
                      (letfn [(check-results-ready
                               [err stdout stderr]
                               (let [errors (map-errors-to-lines (parse-errors stdout))
                                     cm (editor/->cm-ed editor)]
                                 (editor/operation cm #(create-hints editor :nimrod.hints errors))))]

                        (call-nimrod (str "check " (editor-quoted-path editor))
                                     check-results-ready))))

(behavior ::eval!
          :triggers #{:eval!}
          :reaction (fn [this event]
                      ))

(object/object* ::nimrod-lang
                :tags #{:nimrod.lang}
                :behaviors [::eval!]
                :triggers #{:eval!})

(def nimrod-lang (object/create ::nimrod-lang))
