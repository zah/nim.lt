if(!lt.util.load.provided_QMARK_('lt.plugins.nimrod')) {
goog.provide('lt.plugins.nimrod');
goog.require('cljs.core');
goog.require('lt.plugins.auto_complete');
goog.require('lt.objs.notifos');
goog.require('lt.objs.proc');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor.pool');
goog.require('clojure.string');
goog.require('lt.objs.command');
goog.require('lt.plugins.auto_complete');
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

lt.plugins.nimrod.spawn = require("child_process").spawn;

lt.plugins.nimrod.resolve_path = require("path").resolve;

lt.plugins.nimrod.which = lt.util.load.node_module.call(null,"shelljs").which;

lt.plugins.nimrod.nimrod_exe = (function (){var or__6797__auto__ = lt.plugins.nimrod.which.call(null,"nimrod");if(cljs.core.truth_(or__6797__auto__))
{return or__6797__auto__;
} else
{return lt.objs.console.error.call(null,[cljs.core.str("Nimrod executable not found in PATH: "),cljs.core.str(process.env.PATH)].join(''));
}
})();

lt.plugins.nimrod.errors_regex = /(.+)\((\d+), (\d+)\) (Error|Warning|Hint): (.+)/;

lt.plugins.nimrod.parse_errors = (function parse_errors(input){var results = [];var seq__22962_23047 = cljs.core.seq.call(null,clojure.string.split.call(null,input,"\n"));var chunk__22963_23048 = null;var count__22964_23049 = 0;var i__22965_23050 = 0;while(true){
if((i__22965_23050 < count__22964_23049))
{var line_23051 = cljs.core._nth.call(null,chunk__22963_23048,i__22965_23050);var temp__4090__auto___23052 = line_23051.match(lt.plugins.nimrod.errors_regex);if(cljs.core.truth_(temp__4090__auto___23052))
{var match_23053 = temp__4090__auto___23052;results.push(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"file","file",1017047278),cljs.core.nth.call(null,match_23053,1),new cljs.core.Keyword(null,"line","line",1017226086),parseInt(cljs.core.nth.call(null,match_23053,2)),new cljs.core.Keyword(null,"col","col",1014002930),parseInt(cljs.core.nth.call(null,match_23053,3)),new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.keyword.call(null,clojure.string.lower_case.call(null,cljs.core.nth.call(null,match_23053,4))),new cljs.core.Keyword(null,"msg","msg",1014012659),cljs.core.nth.call(null,match_23053,5)], null));
} else
{}
{
var G__23054 = seq__22962_23047;
var G__23055 = chunk__22963_23048;
var G__23056 = count__22964_23049;
var G__23057 = (i__22965_23050 + 1);
seq__22962_23047 = G__23054;
chunk__22963_23048 = G__23055;
count__22964_23049 = G__23056;
i__22965_23050 = G__23057;
continue;
}
} else
{var temp__4092__auto___23058 = cljs.core.seq.call(null,seq__22962_23047);if(temp__4092__auto___23058)
{var seq__22962_23059__$1 = temp__4092__auto___23058;if(cljs.core.chunked_seq_QMARK_.call(null,seq__22962_23059__$1))
{var c__7526__auto___23060 = cljs.core.chunk_first.call(null,seq__22962_23059__$1);{
var G__23061 = cljs.core.chunk_rest.call(null,seq__22962_23059__$1);
var G__23062 = c__7526__auto___23060;
var G__23063 = cljs.core.count.call(null,c__7526__auto___23060);
var G__23064 = 0;
seq__22962_23047 = G__23061;
chunk__22963_23048 = G__23062;
count__22964_23049 = G__23063;
i__22965_23050 = G__23064;
continue;
}
} else
{var line_23065 = cljs.core.first.call(null,seq__22962_23059__$1);var temp__4090__auto___23066 = line_23065.match(lt.plugins.nimrod.errors_regex);if(cljs.core.truth_(temp__4090__auto___23066))
{var match_23067 = temp__4090__auto___23066;results.push(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"file","file",1017047278),cljs.core.nth.call(null,match_23067,1),new cljs.core.Keyword(null,"line","line",1017226086),parseInt(cljs.core.nth.call(null,match_23067,2)),new cljs.core.Keyword(null,"col","col",1014002930),parseInt(cljs.core.nth.call(null,match_23067,3)),new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.keyword.call(null,clojure.string.lower_case.call(null,cljs.core.nth.call(null,match_23067,4))),new cljs.core.Keyword(null,"msg","msg",1014012659),cljs.core.nth.call(null,match_23067,5)], null));
} else
{}
{
var G__23068 = cljs.core.next.call(null,seq__22962_23059__$1);
var G__23069 = null;
var G__23070 = 0;
var G__23071 = 0;
seq__22962_23047 = G__23068;
chunk__22963_23048 = G__23069;
count__22964_23049 = G__23070;
i__22965_23050 = G__23071;
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

lt.plugins.nimrod.map_errors_to_lines = (function map_errors_to_lines(errors){return cljs.core.sort.call(null,(function (){var iter__7495__auto__ = (function iter__22974(s__22975){return (new cljs.core.LazySeq(null,(function (){var s__22975__$1 = s__22975;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__22975__$1);if(temp__4092__auto__)
{var s__22975__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__22975__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__22975__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__22977 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__22976 = 0;while(true){
if((i__22976 < size__7494__auto__))
{var vec__22980 = cljs.core._nth.call(null,c__7493__auto__,i__22976);var ln = cljs.core.nth.call(null,vec__22980,0,null);var values = cljs.core.nth.call(null,vec__22980,1,null);cljs.core.chunk_append.call(null,b__22977,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ln,cljs.core.group_by.call(null,new cljs.core.Keyword(null,"type","type",1017479852),values)], null));
{
var G__23072 = (i__22976 + 1);
i__22976 = G__23072;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22977),iter__22974.call(null,cljs.core.chunk_rest.call(null,s__22975__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22977),null);
}
} else
{var vec__22981 = cljs.core.first.call(null,s__22975__$2);var ln = cljs.core.nth.call(null,vec__22981,0,null);var values = cljs.core.nth.call(null,vec__22981,1,null);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ln,cljs.core.group_by.call(null,new cljs.core.Keyword(null,"type","type",1017479852),values)], null),iter__22974.call(null,cljs.core.rest.call(null,s__22975__$2)));
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

lt.plugins.nimrod.mark = (function mark(errors,spacing){var e__8143__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.hintwrapper","div.hintwrapper",570322369),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.spacer","span.spacer",4763675330),spacing], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",1013907977),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"jshinterrors"], null),(function (){var iter__7495__auto__ = (function iter__22992(s__22993){return (new cljs.core.LazySeq(null,(function (){var s__22993__$1 = s__22993;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__22993__$1);if(temp__4092__auto__)
{var s__22993__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__22993__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__22993__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__22995 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__22994 = 0;while(true){
if((i__22994 < size__7494__auto__))
{var e = cljs.core._nth.call(null,c__7493__auto__,i__22994);cljs.core.chunk_append.call(null,b__22995,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),new cljs.core.Keyword(null,"msg","msg",1014012659).cljs$core$IFn$_invoke$arity$1(e)], null));
{
var G__23073 = (i__22994 + 1);
i__22994 = G__23073;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22995),iter__22992.call(null,cljs.core.chunk_rest.call(null,s__22993__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22995),null);
}
} else
{var e = cljs.core.first.call(null,s__22993__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),new cljs.core.Keyword(null,"msg","msg",1014012659).cljs$core$IFn$_invoke$arity$1(e)], null),iter__22992.call(null,cljs.core.rest.call(null,s__22993__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__7495__auto__.call(null,new cljs.core.Keyword(null,"error","error",1110689146).cljs$core$IFn$_invoke$arity$1(errors));
})()], null)], null));var seq__22996_23074 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,cljs.core.PersistentVector.EMPTY));var chunk__22997_23075 = null;var count__22998_23076 = 0;var i__22999_23077 = 0;while(true){
if((i__22999_23077 < count__22998_23076))
{var vec__23000_23078 = cljs.core._nth.call(null,chunk__22997_23075,i__22999_23077);var ev__8144__auto___23079 = cljs.core.nth.call(null,vec__23000_23078,0,null);var func__8145__auto___23080 = cljs.core.nth.call(null,vec__23000_23078,1,null);lt.util.dom.on.call(null,e__8143__auto__,ev__8144__auto___23079,func__8145__auto___23080);
{
var G__23081 = seq__22996_23074;
var G__23082 = chunk__22997_23075;
var G__23083 = count__22998_23076;
var G__23084 = (i__22999_23077 + 1);
seq__22996_23074 = G__23081;
chunk__22997_23075 = G__23082;
count__22998_23076 = G__23083;
i__22999_23077 = G__23084;
continue;
}
} else
{var temp__4092__auto___23085 = cljs.core.seq.call(null,seq__22996_23074);if(temp__4092__auto___23085)
{var seq__22996_23086__$1 = temp__4092__auto___23085;if(cljs.core.chunked_seq_QMARK_.call(null,seq__22996_23086__$1))
{var c__7526__auto___23087 = cljs.core.chunk_first.call(null,seq__22996_23086__$1);{
var G__23088 = cljs.core.chunk_rest.call(null,seq__22996_23086__$1);
var G__23089 = c__7526__auto___23087;
var G__23090 = cljs.core.count.call(null,c__7526__auto___23087);
var G__23091 = 0;
seq__22996_23074 = G__23088;
chunk__22997_23075 = G__23089;
count__22998_23076 = G__23090;
i__22999_23077 = G__23091;
continue;
}
} else
{var vec__23001_23092 = cljs.core.first.call(null,seq__22996_23086__$1);var ev__8144__auto___23093 = cljs.core.nth.call(null,vec__23001_23092,0,null);var func__8145__auto___23094 = cljs.core.nth.call(null,vec__23001_23092,1,null);lt.util.dom.on.call(null,e__8143__auto__,ev__8144__auto___23093,func__8145__auto___23094);
{
var G__23095 = cljs.core.next.call(null,seq__22996_23086__$1);
var G__23096 = null;
var G__23097 = 0;
var G__23098 = 0;
seq__22996_23074 = G__23095;
chunk__22997_23075 = G__23096;
count__22998_23076 = G__23097;
i__22999_23077 = G__23098;
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

lt.plugins.nimrod.create_hints = (function create_hints(editor,category,errors){var seq__23014_23099 = cljs.core.seq.call(null,category.call(null,cljs.core.deref.call(null,editor)));var chunk__23015_23100 = null;var count__23016_23101 = 0;var i__23017_23102 = 0;while(true){
if((i__23017_23102 < count__23016_23101))
{var widget_23103 = cljs.core._nth.call(null,chunk__23015_23100,i__23017_23102);lt.objs.editor.remove_line_widget.call(null,editor,widget_23103);
{
var G__23104 = seq__23014_23099;
var G__23105 = chunk__23015_23100;
var G__23106 = count__23016_23101;
var G__23107 = (i__23017_23102 + 1);
seq__23014_23099 = G__23104;
chunk__23015_23100 = G__23105;
count__23016_23101 = G__23106;
i__23017_23102 = G__23107;
continue;
}
} else
{var temp__4092__auto___23108 = cljs.core.seq.call(null,seq__23014_23099);if(temp__4092__auto___23108)
{var seq__23014_23109__$1 = temp__4092__auto___23108;if(cljs.core.chunked_seq_QMARK_.call(null,seq__23014_23109__$1))
{var c__7526__auto___23110 = cljs.core.chunk_first.call(null,seq__23014_23109__$1);{
var G__23111 = cljs.core.chunk_rest.call(null,seq__23014_23109__$1);
var G__23112 = c__7526__auto___23110;
var G__23113 = cljs.core.count.call(null,c__7526__auto___23110);
var G__23114 = 0;
seq__23014_23099 = G__23111;
chunk__23015_23100 = G__23112;
count__23016_23101 = G__23113;
i__23017_23102 = G__23114;
continue;
}
} else
{var widget_23115 = cljs.core.first.call(null,seq__23014_23109__$1);lt.objs.editor.remove_line_widget.call(null,editor,widget_23115);
{
var G__23116 = cljs.core.next.call(null,seq__23014_23109__$1);
var G__23117 = null;
var G__23118 = 0;
var G__23119 = 0;
seq__23014_23099 = G__23116;
chunk__23015_23100 = G__23117;
count__23016_23101 = G__23118;
i__23017_23102 = G__23119;
continue;
}
}
} else
{}
}
break;
}
var cm = lt.objs.editor.__GT_cm_ed.call(null,editor);var prev = cm.getScrollInfo();var hints = cljs.core.doall.call(null,(function (){var iter__7495__auto__ = ((function (cm,prev){
return (function iter__23018(s__23019){return (new cljs.core.LazySeq(null,((function (cm,prev){
return (function (){var s__23019__$1 = s__23019;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__23019__$1);if(temp__4092__auto__)
{var s__23019__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__23019__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__23019__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__23021 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__23020 = 0;while(true){
if((i__23020 < size__7494__auto__))
{var vec__23024 = cljs.core._nth.call(null,c__7493__auto__,i__23020);var ln = cljs.core.nth.call(null,vec__23024,0,null);var data = cljs.core.nth.call(null,vec__23024,1,null);cljs.core.chunk_append.call(null,b__23021,lt.objs.editor.line_widget.call(null,editor,(ln - 1),lt.plugins.nimrod.mark.call(null,data,lt.plugins.nimrod.__GT_spacing.call(null,lt.objs.editor.line.call(null,editor,(ln - 1))))));
{
var G__23120 = (i__23020 + 1);
i__23020 = G__23120;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23021),iter__23018.call(null,cljs.core.chunk_rest.call(null,s__23019__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23021),null);
}
} else
{var vec__23025 = cljs.core.first.call(null,s__23019__$2);var ln = cljs.core.nth.call(null,vec__23025,0,null);var data = cljs.core.nth.call(null,vec__23025,1,null);return cljs.core.cons.call(null,lt.objs.editor.line_widget.call(null,editor,(ln - 1),lt.plugins.nimrod.mark.call(null,data,lt.plugins.nimrod.__GT_spacing.call(null,lt.objs.editor.line.call(null,editor,(ln - 1))))),iter__23018.call(null,cljs.core.rest.call(null,s__23019__$2)));
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

lt.plugins.nimrod.parse_structured_lines = (function parse_structured_lines(marker,input){var iter__7495__auto__ = (function iter__23030(s__23031){return (new cljs.core.LazySeq(null,(function (){var s__23031__$1 = s__23031;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__23031__$1);if(temp__4092__auto__)
{var s__23031__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__23031__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__23031__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__23033 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__23032 = 0;while(true){
if((i__23032 < size__7494__auto__))
{var ln = cljs.core._nth.call(null,c__7493__auto__,i__23032);var parts = clojure.string.split.call(null,ln,"\t");if(cljs.core._EQ_.call(null,marker,cljs.core.first.call(null,parts)))
{cljs.core.chunk_append.call(null,b__23033,parts);
{
var G__23121 = (i__23032 + 1);
i__23032 = G__23121;
continue;
}
} else
{{
var G__23122 = (i__23032 + 1);
i__23032 = G__23122;
continue;
}
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23033),iter__23030.call(null,cljs.core.chunk_rest.call(null,s__23031__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23033),null);
}
} else
{var ln = cljs.core.first.call(null,s__23031__$2);var parts = clojure.string.split.call(null,ln,"\t");if(cljs.core._EQ_.call(null,marker,cljs.core.first.call(null,parts)))
{return cljs.core.cons.call(null,parts,iter__23030.call(null,cljs.core.rest.call(null,s__23031__$2)));
} else
{{
var G__23123 = cljs.core.rest.call(null,s__23031__$2);
s__23031__$1 = G__23123;
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

lt.plugins.nimrod.parse_suggestions = (function parse_suggestions(input){return cljs.core.map.call(null,(function (p1__23034_SHARP_){return clojure.string.split.call(null,cljs.core.nth.call(null,p1__23034_SHARP_,2),".");
}),lt.plugins.nimrod.parse_structured_lines.call(null,"sug",input));
});

lt.plugins.nimrod.match_char = (function match_char(input,ch){return cljs.core._EQ_.call(null,cljs.core.first.call(null,input.text),ch);
});

lt.plugins.nimrod.suggestions_to_lt_format = (function suggestions_to_lt_format(suggestions){return cljs.core.into_array.call(null,(function (){var iter__7495__auto__ = (function iter__23039(s__23040){return (new cljs.core.LazySeq(null,(function (){var s__23040__$1 = s__23040;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__23040__$1);if(temp__4092__auto__)
{var s__23040__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__23040__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__23040__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__23042 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__23041 = 0;while(true){
if((i__23041 < size__7494__auto__))
{var s = cljs.core._nth.call(null,c__7493__auto__,i__23041);var sym = (((cljs.core.count.call(null,s) > 1))?cljs.core.second.call(null,s):cljs.core.first.call(null,s));cljs.core.chunk_append.call(null,b__23042,{"completion": sym});
{
var G__23124 = (i__23041 + 1);
i__23041 = G__23124;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23042),iter__23039.call(null,cljs.core.chunk_rest.call(null,s__23040__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23042),null);
}
} else
{var s = cljs.core.first.call(null,s__23040__$2);var sym = (((cljs.core.count.call(null,s) > 1))?cljs.core.second.call(null,s):cljs.core.first.call(null,s));return cljs.core.cons.call(null,{"completion": sym},iter__23039.call(null,cljs.core.rest.call(null,s__23040__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__7495__auto__.call(null,suggestions);
})());
});

lt.plugins.nimrod.__BEH__autocomplete_on_dot = (function __BEH__autocomplete_on_dot(ed,_,ch){if(lt.plugins.nimrod.match_char.call(null,ch,"."))
{return lt.plugins.nimrod.idetools.call(null,"suggest",ed,(function (err,stdout,stderr){lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"hint-tokens","hint-tokens",3416256274),lt.plugins.nimrod.suggestions_to_lt_format.call(null,lt.plugins.nimrod.parse_suggestions.call(null,stdout)));
return lt.object.raise.call(null,ed,new cljs.core.Keyword(null,"hint","hint",1017106937));
}));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.nimrod","autocomplete-on-dot","lt.plugins.nimrod/autocomplete-on-dot",2417831331),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.nimrod.__BEH__autocomplete_on_dot,new cljs.core.Keyword(null,"desc","desc",1016984067),"Nimrod: Use idetools for completion",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"input","input",1114262332),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549));

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

lt.plugins.nimrod.execute_command = (function execute_command(cmd,args,opt){var proc = lt.plugins.nimrod.spawn.call(null,cmd,args);proc.stdout.on("data",opt.on_stdout);
proc.stderr.on("data",opt.on_stderr);
var temp__4092__auto___23125 = opt.on_exit;if(cljs.core.truth_(temp__4092__auto___23125))
{var exit_23126 = temp__4092__auto___23125;proc.on("exit",exit_23126);
} else
{}
return proc;
});

lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"nimrod.compile-and-run","nimrod.compile-and-run",4188571124),new cljs.core.Keyword(null,"desc","desc",1016984067),"Nimrod: Compile and Run",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);return lt.plugins.nimrod.execute_command.call(null,"nimrod",["-r","--verbosity:0","c",lt.plugins.nimrod.quoted_main_file.call(null,ed)],{"on_stderr": (function (p1__23044_SHARP_){return lt.objs.console.error.call(null,[cljs.core.str(p1__23044_SHARP_)].join(''));
}), "on_stdout": (function (p1__23043_SHARP_){return lt.objs.console.log.call(null,[cljs.core.str(p1__23043_SHARP_)].join(''));
})});
})], null));

lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"nimrod.nimrod-i","nimrod.nimrod-i",761501148),new cljs.core.Keyword(null,"desc","desc",1016984067),"Nimrod: Run in Interpreter",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);return lt.plugins.nimrod.execute_command.call(null,"nimrod",["i",lt.plugins.nimrod.quoted_main_file.call(null,ed)],{"on_stderr": (function (p1__23046_SHARP_){return lt.objs.console.error.call(null,[cljs.core.str(p1__23046_SHARP_)].join(''));
}), "on_stdout": (function (p1__23045_SHARP_){return lt.objs.console.log.call(null,[cljs.core.str(p1__23045_SHARP_)].join(''));
})});
})], null));

}

//# sourceMappingURL=