if(!lt.util.load.provided_QMARK_('lt.plugins.nimrod')) {
goog.provide('lt.plugins.nimrod');
goog.require('cljs.core');
goog.require('lt.objs.notifos');
goog.require('lt.objs.proc');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor.pool');
goog.require('clojure.string');
goog.require('lt.objs.command');
goog.require('lt.util.load');
goog.require('clojure.string');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.util.load');
goog.require('lt.objs.console');
goog.require('lt.objs.proc');
goog.require('lt.objs.editor');
goog.require('lt.objs.console');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');

lt.plugins.nimrod.exec = require("child_process").exec;

lt.plugins.nimrod.resolve_path = require("path").resolve;

lt.plugins.nimrod.which = lt.util.load.node_module.call(null,"shelljs").which;

lt.plugins.nimrod.nimrod_exe = (function (){var or__6797__auto__ = lt.plugins.nimrod.which.call(null,"nimrod");if(cljs.core.truth_(or__6797__auto__))
{return or__6797__auto__;
} else
{return lt.objs.console.error.call(null,[cljs.core.str("Nimrod executable not found in PATH: "),cljs.core.str(process.env.PATH)].join(''));
}
})();

lt.plugins.nimrod.errors_regex = /(.+)\((\d+), (\d+)\) (Error|Warning|Hint): (.+)/;

lt.plugins.nimrod.parse_errors = (function parse_errors(input){var results = [];var seq__22101_22173 = cljs.core.seq.call(null,clojure.string.split.call(null,input,"\n"));var chunk__22102_22174 = null;var count__22103_22175 = 0;var i__22104_22176 = 0;while(true){
if((i__22104_22176 < count__22103_22175))
{var line_22177 = cljs.core._nth.call(null,chunk__22102_22174,i__22104_22176);var temp__4090__auto___22178 = line_22177.match(lt.plugins.nimrod.errors_regex);if(cljs.core.truth_(temp__4090__auto___22178))
{var match_22179 = temp__4090__auto___22178;results.push(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"file","file",1017047278),cljs.core.nth.call(null,match_22179,1),new cljs.core.Keyword(null,"line","line",1017226086),parseInt(cljs.core.nth.call(null,match_22179,2)),new cljs.core.Keyword(null,"col","col",1014002930),parseInt(cljs.core.nth.call(null,match_22179,3)),new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.keyword.call(null,clojure.string.lower_case.call(null,cljs.core.nth.call(null,match_22179,4))),new cljs.core.Keyword(null,"msg","msg",1014012659),cljs.core.nth.call(null,match_22179,5)], null));
} else
{}
{
var G__22180 = seq__22101_22173;
var G__22181 = chunk__22102_22174;
var G__22182 = count__22103_22175;
var G__22183 = (i__22104_22176 + 1);
seq__22101_22173 = G__22180;
chunk__22102_22174 = G__22181;
count__22103_22175 = G__22182;
i__22104_22176 = G__22183;
continue;
}
} else
{var temp__4092__auto___22184 = cljs.core.seq.call(null,seq__22101_22173);if(temp__4092__auto___22184)
{var seq__22101_22185__$1 = temp__4092__auto___22184;if(cljs.core.chunked_seq_QMARK_.call(null,seq__22101_22185__$1))
{var c__7526__auto___22186 = cljs.core.chunk_first.call(null,seq__22101_22185__$1);{
var G__22187 = cljs.core.chunk_rest.call(null,seq__22101_22185__$1);
var G__22188 = c__7526__auto___22186;
var G__22189 = cljs.core.count.call(null,c__7526__auto___22186);
var G__22190 = 0;
seq__22101_22173 = G__22187;
chunk__22102_22174 = G__22188;
count__22103_22175 = G__22189;
i__22104_22176 = G__22190;
continue;
}
} else
{var line_22191 = cljs.core.first.call(null,seq__22101_22185__$1);var temp__4090__auto___22192 = line_22191.match(lt.plugins.nimrod.errors_regex);if(cljs.core.truth_(temp__4090__auto___22192))
{var match_22193 = temp__4090__auto___22192;results.push(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"file","file",1017047278),cljs.core.nth.call(null,match_22193,1),new cljs.core.Keyword(null,"line","line",1017226086),parseInt(cljs.core.nth.call(null,match_22193,2)),new cljs.core.Keyword(null,"col","col",1014002930),parseInt(cljs.core.nth.call(null,match_22193,3)),new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.keyword.call(null,clojure.string.lower_case.call(null,cljs.core.nth.call(null,match_22193,4))),new cljs.core.Keyword(null,"msg","msg",1014012659),cljs.core.nth.call(null,match_22193,5)], null));
} else
{}
{
var G__22194 = cljs.core.next.call(null,seq__22101_22185__$1);
var G__22195 = null;
var G__22196 = 0;
var G__22197 = 0;
seq__22101_22173 = G__22194;
chunk__22102_22174 = G__22195;
count__22103_22175 = G__22196;
i__22104_22176 = G__22197;
continue;
}
}
} else
{}
}
break;
}
return results;
});

lt.plugins.nimrod.map_errors_to_lines = (function map_errors_to_lines(errors){return cljs.core.sort.call(null,(function (){var iter__7495__auto__ = (function iter__22113(s__22114){return (new cljs.core.LazySeq(null,(function (){var s__22114__$1 = s__22114;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__22114__$1);if(temp__4092__auto__)
{var s__22114__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__22114__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__22114__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__22116 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__22115 = 0;while(true){
if((i__22115 < size__7494__auto__))
{var vec__22119 = cljs.core._nth.call(null,c__7493__auto__,i__22115);var ln = cljs.core.nth.call(null,vec__22119,0,null);var values = cljs.core.nth.call(null,vec__22119,1,null);cljs.core.chunk_append.call(null,b__22116,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ln,cljs.core.group_by.call(null,new cljs.core.Keyword(null,"type","type",1017479852),values)], null));
{
var G__22198 = (i__22115 + 1);
i__22115 = G__22198;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22116),iter__22113.call(null,cljs.core.chunk_rest.call(null,s__22114__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22116),null);
}
} else
{var vec__22120 = cljs.core.first.call(null,s__22114__$2);var ln = cljs.core.nth.call(null,vec__22120,0,null);var values = cljs.core.nth.call(null,vec__22120,1,null);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ln,cljs.core.group_by.call(null,new cljs.core.Keyword(null,"type","type",1017479852),values)], null),iter__22113.call(null,cljs.core.rest.call(null,s__22114__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__7495__auto__.call(null,cljs.core.group_by.call(null,new cljs.core.Keyword(null,"line","line",1017226086),errors));
})());
});

lt.plugins.nimrod.quote_path = (function quote_path(f){return [cljs.core.str("\""),cljs.core.str(f),cljs.core.str("\"")].join('');
});

lt.plugins.nimrod.included_from_range = (function included_from_range(ed){return lt.objs.editor.range.call(null,ed,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),0,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),10,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null));
});

lt.plugins.nimrod.included_from = (function included_from(ed){var temp__4092__auto__ = cljs.core.re_find.call(null,/^\#\s*included from ([a-zA-Z_0-9\.\\/\\]+)/m,lt.plugins.nimrod.included_from_range.call(null,ed));if(cljs.core.truth_(temp__4092__auto__))
{var match = temp__4092__auto__;return cljs.core.nth.call(null,match,1);
} else
{return null;
}
});

lt.plugins.nimrod.quoted_main_file = (function quoted_main_file(ed){var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));var includer = lt.plugins.nimrod.included_from.call(null,ed);var main_file = (cljs.core.truth_(includer)?lt.plugins.nimrod.resolve_path.call(null,path,"..",includer):path);return lt.plugins.nimrod.quote_path.call(null,main_file);
});

lt.plugins.nimrod.call_nimrod = (function call_nimrod(cmd,cb){return lt.plugins.nimrod.exec.call(null,[cljs.core.str(lt.plugins.nimrod.nimrod_exe),cljs.core.str(" "),cljs.core.str(cmd)].join(''),cb);
});

lt.plugins.nimrod.symbol_types = cljs.core.PersistentHashMap.fromArrays(["skEnumField","skField","skLet","skIterator","skConverter","skConst","skTemp","skProc","skGenericParam","skVar","skType","skTemplate","skMacro","skResult","skParam","skForVar","skMethod"],["m","m","v","f","f","v","v","f","T","v","T","f","f","v","v","v","f"]);

lt.plugins.nimrod.idetools_at = (function idetools_at(op,tracked_file,main_file,pos,cb){var cmd = [cljs.core.str("idetools --"),cljs.core.str(op),cljs.core.str(" --track:\""),cljs.core.str(tracked_file),cljs.core.str(","),cljs.core.str((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(pos) + 1)),cljs.core.str(","),cljs.core.str((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(pos) + 1)),cljs.core.str("\" "),cljs.core.str(main_file)].join('');return lt.plugins.nimrod.call_nimrod.call(null,cmd,cb);
});

lt.plugins.nimrod.idetools = (function idetools(op,ed,cb){if(cljs.core.truth_(lt.objs.editor.dirty_QMARK_.call(null,ed,null)))
{lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"save","save",1017427183));
} else
{}
var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));return lt.plugins.nimrod.idetools_at.call(null,op,path,lt.plugins.nimrod.quoted_main_file.call(null,ed),lt.objs.editor.__GT_cursor.call(null,ed),cb);
});

lt.plugins.nimrod.mark = (function mark(errors,spacing){var e__8143__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.hintwrapper","div.hintwrapper",570322369),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.spacer","span.spacer",4763675330),spacing], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",1013907977),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"jshinterrors"], null),(function (){var iter__7495__auto__ = (function iter__22131(s__22132){return (new cljs.core.LazySeq(null,(function (){var s__22132__$1 = s__22132;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__22132__$1);if(temp__4092__auto__)
{var s__22132__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__22132__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__22132__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__22134 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__22133 = 0;while(true){
if((i__22133 < size__7494__auto__))
{var e = cljs.core._nth.call(null,c__7493__auto__,i__22133);cljs.core.chunk_append.call(null,b__22134,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),new cljs.core.Keyword(null,"msg","msg",1014012659).cljs$core$IFn$_invoke$arity$1(e)], null));
{
var G__22199 = (i__22133 + 1);
i__22133 = G__22199;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22134),iter__22131.call(null,cljs.core.chunk_rest.call(null,s__22132__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22134),null);
}
} else
{var e = cljs.core.first.call(null,s__22132__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),new cljs.core.Keyword(null,"msg","msg",1014012659).cljs$core$IFn$_invoke$arity$1(e)], null),iter__22131.call(null,cljs.core.rest.call(null,s__22132__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__7495__auto__.call(null,new cljs.core.Keyword(null,"error","error",1110689146).cljs$core$IFn$_invoke$arity$1(errors));
})()], null)], null));var seq__22135_22200 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,cljs.core.PersistentVector.EMPTY));var chunk__22136_22201 = null;var count__22137_22202 = 0;var i__22138_22203 = 0;while(true){
if((i__22138_22203 < count__22137_22202))
{var vec__22139_22204 = cljs.core._nth.call(null,chunk__22136_22201,i__22138_22203);var ev__8144__auto___22205 = cljs.core.nth.call(null,vec__22139_22204,0,null);var func__8145__auto___22206 = cljs.core.nth.call(null,vec__22139_22204,1,null);lt.util.dom.on.call(null,e__8143__auto__,ev__8144__auto___22205,func__8145__auto___22206);
{
var G__22207 = seq__22135_22200;
var G__22208 = chunk__22136_22201;
var G__22209 = count__22137_22202;
var G__22210 = (i__22138_22203 + 1);
seq__22135_22200 = G__22207;
chunk__22136_22201 = G__22208;
count__22137_22202 = G__22209;
i__22138_22203 = G__22210;
continue;
}
} else
{var temp__4092__auto___22211 = cljs.core.seq.call(null,seq__22135_22200);if(temp__4092__auto___22211)
{var seq__22135_22212__$1 = temp__4092__auto___22211;if(cljs.core.chunked_seq_QMARK_.call(null,seq__22135_22212__$1))
{var c__7526__auto___22213 = cljs.core.chunk_first.call(null,seq__22135_22212__$1);{
var G__22214 = cljs.core.chunk_rest.call(null,seq__22135_22212__$1);
var G__22215 = c__7526__auto___22213;
var G__22216 = cljs.core.count.call(null,c__7526__auto___22213);
var G__22217 = 0;
seq__22135_22200 = G__22214;
chunk__22136_22201 = G__22215;
count__22137_22202 = G__22216;
i__22138_22203 = G__22217;
continue;
}
} else
{var vec__22140_22218 = cljs.core.first.call(null,seq__22135_22212__$1);var ev__8144__auto___22219 = cljs.core.nth.call(null,vec__22140_22218,0,null);var func__8145__auto___22220 = cljs.core.nth.call(null,vec__22140_22218,1,null);lt.util.dom.on.call(null,e__8143__auto__,ev__8144__auto___22219,func__8145__auto___22220);
{
var G__22221 = cljs.core.next.call(null,seq__22135_22212__$1);
var G__22222 = null;
var G__22223 = 0;
var G__22224 = 0;
seq__22135_22200 = G__22221;
chunk__22136_22201 = G__22222;
count__22137_22202 = G__22223;
i__22138_22203 = G__22224;
continue;
}
}
} else
{}
}
break;
}
return e__8143__auto__;
});

lt.plugins.nimrod.__GT_spacing = (function __GT_spacing(text){if(cljs.core.truth_(text))
{return cljs.core.first.call(null,cljs.core.re_seq.call(null,/^\s+/,text));
} else
{return null;
}
});

lt.plugins.nimrod.create_hints = (function create_hints(editor,category,errors){var seq__22153_22225 = cljs.core.seq.call(null,category.call(null,cljs.core.deref.call(null,editor)));var chunk__22154_22226 = null;var count__22155_22227 = 0;var i__22156_22228 = 0;while(true){
if((i__22156_22228 < count__22155_22227))
{var widget_22229 = cljs.core._nth.call(null,chunk__22154_22226,i__22156_22228);lt.objs.editor.remove_line_widget.call(null,editor,widget_22229);
{
var G__22230 = seq__22153_22225;
var G__22231 = chunk__22154_22226;
var G__22232 = count__22155_22227;
var G__22233 = (i__22156_22228 + 1);
seq__22153_22225 = G__22230;
chunk__22154_22226 = G__22231;
count__22155_22227 = G__22232;
i__22156_22228 = G__22233;
continue;
}
} else
{var temp__4092__auto___22234 = cljs.core.seq.call(null,seq__22153_22225);if(temp__4092__auto___22234)
{var seq__22153_22235__$1 = temp__4092__auto___22234;if(cljs.core.chunked_seq_QMARK_.call(null,seq__22153_22235__$1))
{var c__7526__auto___22236 = cljs.core.chunk_first.call(null,seq__22153_22235__$1);{
var G__22237 = cljs.core.chunk_rest.call(null,seq__22153_22235__$1);
var G__22238 = c__7526__auto___22236;
var G__22239 = cljs.core.count.call(null,c__7526__auto___22236);
var G__22240 = 0;
seq__22153_22225 = G__22237;
chunk__22154_22226 = G__22238;
count__22155_22227 = G__22239;
i__22156_22228 = G__22240;
continue;
}
} else
{var widget_22241 = cljs.core.first.call(null,seq__22153_22235__$1);lt.objs.editor.remove_line_widget.call(null,editor,widget_22241);
{
var G__22242 = cljs.core.next.call(null,seq__22153_22235__$1);
var G__22243 = null;
var G__22244 = 0;
var G__22245 = 0;
seq__22153_22225 = G__22242;
chunk__22154_22226 = G__22243;
count__22155_22227 = G__22244;
i__22156_22228 = G__22245;
continue;
}
}
} else
{}
}
break;
}
var cm = lt.objs.editor.__GT_cm_ed.call(null,editor);var prev = cm.getScrollInfo();var hints = cljs.core.doall.call(null,(function (){var iter__7495__auto__ = ((function (cm,prev){
return (function iter__22157(s__22158){return (new cljs.core.LazySeq(null,((function (cm,prev){
return (function (){var s__22158__$1 = s__22158;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__22158__$1);if(temp__4092__auto__)
{var s__22158__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__22158__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__22158__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__22160 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__22159 = 0;while(true){
if((i__22159 < size__7494__auto__))
{var vec__22163 = cljs.core._nth.call(null,c__7493__auto__,i__22159);var ln = cljs.core.nth.call(null,vec__22163,0,null);var data = cljs.core.nth.call(null,vec__22163,1,null);cljs.core.chunk_append.call(null,b__22160,lt.objs.editor.line_widget.call(null,editor,(ln - 1),lt.plugins.nimrod.mark.call(null,data,lt.plugins.nimrod.__GT_spacing.call(null,lt.objs.editor.line.call(null,editor,(ln - 1))))));
{
var G__22246 = (i__22159 + 1);
i__22159 = G__22246;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22160),iter__22157.call(null,cljs.core.chunk_rest.call(null,s__22158__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22160),null);
}
} else
{var vec__22164 = cljs.core.first.call(null,s__22158__$2);var ln = cljs.core.nth.call(null,vec__22164,0,null);var data = cljs.core.nth.call(null,vec__22164,1,null);return cljs.core.cons.call(null,lt.objs.editor.line_widget.call(null,editor,(ln - 1),lt.plugins.nimrod.mark.call(null,data,lt.plugins.nimrod.__GT_spacing.call(null,lt.objs.editor.line.call(null,editor,(ln - 1))))),iter__22157.call(null,cljs.core.rest.call(null,s__22158__$2)));
}
} else
{return null;
}
break;
}
});})(cm,prev))
,null,null));
});})(cm,prev))
;return iter__7495__auto__.call(null,errors);
})());lt.object.merge_BANG_.call(null,editor,new cljs.core.PersistentArrayMap.fromArray([category,hints], true, false));
return lt.objs.editor.__GT_cm_ed.call(null,editor).scrollTo(prev.left,prev.top);
});

lt.plugins.nimrod.parse_structured_lines = (function parse_structured_lines(marker,input){var iter__7495__auto__ = (function iter__22169(s__22170){return (new cljs.core.LazySeq(null,(function (){var s__22170__$1 = s__22170;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__22170__$1);if(temp__4092__auto__)
{var s__22170__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__22170__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__22170__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__22172 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__22171 = 0;while(true){
if((i__22171 < size__7494__auto__))
{var ln = cljs.core._nth.call(null,c__7493__auto__,i__22171);var parts = clojure.string.split.call(null,ln,"\t");if(cljs.core._EQ_.call(null,marker,cljs.core.first.call(null,parts)))
{cljs.core.chunk_append.call(null,b__22172,parts);
{
var G__22247 = (i__22171 + 1);
i__22171 = G__22247;
continue;
}
} else
{{
var G__22248 = (i__22171 + 1);
i__22171 = G__22248;
continue;
}
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22172),iter__22169.call(null,cljs.core.chunk_rest.call(null,s__22170__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22172),null);
}
} else
{var ln = cljs.core.first.call(null,s__22170__$2);var parts = clojure.string.split.call(null,ln,"\t");if(cljs.core._EQ_.call(null,marker,cljs.core.first.call(null,parts)))
{return cljs.core.cons.call(null,parts,iter__22169.call(null,cljs.core.rest.call(null,s__22170__$2)));
} else
{{
var G__22249 = cljs.core.rest.call(null,s__22170__$2);
s__22170__$1 = G__22249;
continue;
}
}
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__7495__auto__.call(null,clojure.string.split_lines.call(null,input));
});

lt.plugins.nimrod.parse_defs = (function parse_defs(input){return lt.plugins.nimrod.parse_structured_lines.call(null,"def",input);
});

lt.plugins.nimrod.parse_suggestions = (function parse_suggestions(input){return lt.plugins.nimrod.parse_structured_lines.call(null,"sug",input);
});

lt.plugins.nimrod.__BEH__jump_to_definition_at_cursor = (function __BEH__jump_to_definition_at_cursor(editor){return lt.plugins.nimrod.idetools.call(null,"def",editor,(function (err,stdout,stderr){var defs = lt.plugins.nimrod.parse_defs.call(null,stdout);if((cljs.core.count.call(null,defs) > 0))
{return lt.object.raise.call(null,lt.objs.jump_stack.jump_stack,new cljs.core.Keyword(null,"jump-stack.push!","jump-stack.push!",4063822260),editor,cljs.core.nth.call(null,cljs.core.first.call(null,defs),4),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(cljs.core.nth.call(null,cljs.core.first.call(null,defs),5) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null));
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,"Definition not found",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
}
}));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.nimrod","jump-to-definition-at-cursor","lt.plugins.nimrod/jump-to-definition-at-cursor",3192570206),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.nimrod.__BEH__jump_to_definition_at_cursor,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.jump-to-definition-at-cursor!","editor.jump-to-definition-at-cursor!",4501637705),null], null), null));

lt.plugins.nimrod.__BEH__eval_on_save = (function __BEH__eval_on_save(editor){var check_results_ready = (function check_results_ready(err,stdout,stderr){var errors = lt.plugins.nimrod.map_errors_to_lines.call(null,lt.plugins.nimrod.parse_errors.call(null,stdout));var cm = lt.objs.editor.__GT_cm_ed.call(null,editor);return lt.objs.editor.operation.call(null,cm,(function (){return lt.plugins.nimrod.create_hints.call(null,editor,new cljs.core.Keyword(null,"nimrod.hints","nimrod.hints",2940953989),errors);
}));
});
return lt.plugins.nimrod.call_nimrod.call(null,[cljs.core.str("check "),cljs.core.str(lt.plugins.nimrod.quoted_main_file.call(null,editor))].join(''),check_results_ready);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.nimrod","eval-on-save","lt.plugins.nimrod/eval-on-save",4320823085),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.nimrod.__BEH__eval_on_save,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"save","save",1017427183),null], null), null));

lt.plugins.nimrod.__BEH__on_eval = (function __BEH__on_eval(editor){return lt.object.raise.call(null,lt.plugins.nimrod.nimrod_lang,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.nimrod","on-eval","lt.plugins.nimrod/on-eval",4684595005),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.nimrod.__BEH__on_eval,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval","eval",1017029646),null], null), null));

lt.plugins.nimrod.__BEH__eval_BANG_ = (function __BEH__eval_BANG_(this$,event){return lt.objs.console.error.call(null,"Evaluating Nimrod is not yet supported");
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.nimrod","eval!","lt.plugins.nimrod/eval!",1873086586),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.nimrod.__BEH__eval_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval!","eval!",1110791799),null], null), null));

lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.nimrod","nimrod-lang","lt.plugins.nimrod/nimrod-lang",2524535993),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"nimrod.lang","nimrod.lang",1768915257),null], null), null));

lt.plugins.nimrod.nimrod_lang = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.nimrod","nimrod-lang","lt.plugins.nimrod/nimrod-lang",2524535993));

}

//# sourceMappingURL=