if(!lt.util.load.provided_QMARK_('lt.plugins.nimrod')) {
goog.provide('lt.plugins.nimrod');
goog.require('cljs.core');
goog.require('lt.objs.proc');
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

lt.plugins.nimrod.which = lt.util.load.node_module.call(null,"shelljs").which;

lt.plugins.nimrod.nimrod_exe = (function (){var or__6797__auto__ = lt.plugins.nimrod.which.call(null,"nimrod");if(cljs.core.truth_(or__6797__auto__))
{return or__6797__auto__;
} else
{return lt.objs.console.error.call(null,[cljs.core.str("Nimrod executable not found in PATH: "),cljs.core.str(process.env.PATH)].join(''));
}
})();

lt.plugins.nimrod.errors_regex = /(.+)\((\d+), (\d+)\) (Error|Warning|Hint): (.+)/;

lt.plugins.nimrod.parse_errors = (function parse_errors(input){var results = [];var seq__47545_47609 = cljs.core.seq.call(null,clojure.string.split.call(null,input,"\n"));var chunk__47546_47610 = null;var count__47547_47611 = 0;var i__47548_47612 = 0;while(true){
if((i__47548_47612 < count__47547_47611))
{var line_47613 = cljs.core._nth.call(null,chunk__47546_47610,i__47548_47612);var temp__4090__auto___47614 = line_47613.match(lt.plugins.nimrod.errors_regex);if(cljs.core.truth_(temp__4090__auto___47614))
{var match_47615 = temp__4090__auto___47614;results.push(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"file","file",1017047278),cljs.core.nth.call(null,match_47615,1),new cljs.core.Keyword(null,"line","line",1017226086),parseInt(cljs.core.nth.call(null,match_47615,2)),new cljs.core.Keyword(null,"col","col",1014002930),parseInt(cljs.core.nth.call(null,match_47615,3)),new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.keyword.call(null,clojure.string.lower_case.call(null,cljs.core.nth.call(null,match_47615,4))),new cljs.core.Keyword(null,"msg","msg",1014012659),cljs.core.nth.call(null,match_47615,5)], null));
} else
{}
{
var G__47616 = seq__47545_47609;
var G__47617 = chunk__47546_47610;
var G__47618 = count__47547_47611;
var G__47619 = (i__47548_47612 + 1);
seq__47545_47609 = G__47616;
chunk__47546_47610 = G__47617;
count__47547_47611 = G__47618;
i__47548_47612 = G__47619;
continue;
}
} else
{var temp__4092__auto___47620 = cljs.core.seq.call(null,seq__47545_47609);if(temp__4092__auto___47620)
{var seq__47545_47621__$1 = temp__4092__auto___47620;if(cljs.core.chunked_seq_QMARK_.call(null,seq__47545_47621__$1))
{var c__7526__auto___47622 = cljs.core.chunk_first.call(null,seq__47545_47621__$1);{
var G__47623 = cljs.core.chunk_rest.call(null,seq__47545_47621__$1);
var G__47624 = c__7526__auto___47622;
var G__47625 = cljs.core.count.call(null,c__7526__auto___47622);
var G__47626 = 0;
seq__47545_47609 = G__47623;
chunk__47546_47610 = G__47624;
count__47547_47611 = G__47625;
i__47548_47612 = G__47626;
continue;
}
} else
{var line_47627 = cljs.core.first.call(null,seq__47545_47621__$1);var temp__4090__auto___47628 = line_47627.match(lt.plugins.nimrod.errors_regex);if(cljs.core.truth_(temp__4090__auto___47628))
{var match_47629 = temp__4090__auto___47628;results.push(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"file","file",1017047278),cljs.core.nth.call(null,match_47629,1),new cljs.core.Keyword(null,"line","line",1017226086),parseInt(cljs.core.nth.call(null,match_47629,2)),new cljs.core.Keyword(null,"col","col",1014002930),parseInt(cljs.core.nth.call(null,match_47629,3)),new cljs.core.Keyword(null,"type","type",1017479852),cljs.core.keyword.call(null,clojure.string.lower_case.call(null,cljs.core.nth.call(null,match_47629,4))),new cljs.core.Keyword(null,"msg","msg",1014012659),cljs.core.nth.call(null,match_47629,5)], null));
} else
{}
{
var G__47630 = cljs.core.next.call(null,seq__47545_47621__$1);
var G__47631 = null;
var G__47632 = 0;
var G__47633 = 0;
seq__47545_47609 = G__47630;
chunk__47546_47610 = G__47631;
count__47547_47611 = G__47632;
i__47548_47612 = G__47633;
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

lt.plugins.nimrod.map_errors_to_lines = (function map_errors_to_lines(errors){return cljs.core.sort.call(null,(function (){var iter__7495__auto__ = (function iter__47557(s__47558){return (new cljs.core.LazySeq(null,(function (){var s__47558__$1 = s__47558;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__47558__$1);if(temp__4092__auto__)
{var s__47558__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__47558__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__47558__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__47560 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__47559 = 0;while(true){
if((i__47559 < size__7494__auto__))
{var vec__47563 = cljs.core._nth.call(null,c__7493__auto__,i__47559);var ln = cljs.core.nth.call(null,vec__47563,0,null);var values = cljs.core.nth.call(null,vec__47563,1,null);cljs.core.chunk_append.call(null,b__47560,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ln,cljs.core.group_by.call(null,new cljs.core.Keyword(null,"type","type",1017479852),values)], null));
{
var G__47634 = (i__47559 + 1);
i__47559 = G__47634;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__47560),iter__47557.call(null,cljs.core.chunk_rest.call(null,s__47558__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__47560),null);
}
} else
{var vec__47564 = cljs.core.first.call(null,s__47558__$2);var ln = cljs.core.nth.call(null,vec__47564,0,null);var values = cljs.core.nth.call(null,vec__47564,1,null);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ln,cljs.core.group_by.call(null,new cljs.core.Keyword(null,"type","type",1017479852),values)], null),iter__47557.call(null,cljs.core.rest.call(null,s__47558__$2)));
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

lt.plugins.nimrod.editor_quoted_path = (function editor_quoted_path(e){return lt.plugins.nimrod.quote_path.call(null,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,e))));
});

lt.plugins.nimrod.call_nimrod = (function call_nimrod(cmd,cb){return lt.plugins.nimrod.exec.call(null,[cljs.core.str(lt.plugins.nimrod.nimrod_exe),cljs.core.str(cmd)].join(''),cb);
});

lt.plugins.nimrod.mark = (function mark(errors,spacing){var e__8137__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.hintwrapper","div.hintwrapper",570322369),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.spacer","span.spacer",4763675330),spacing], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",1013907977),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"jshinterrors"], null),(function (){var iter__7495__auto__ = (function iter__47575(s__47576){return (new cljs.core.LazySeq(null,(function (){var s__47576__$1 = s__47576;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__47576__$1);if(temp__4092__auto__)
{var s__47576__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__47576__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__47576__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__47578 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__47577 = 0;while(true){
if((i__47577 < size__7494__auto__))
{var e = cljs.core._nth.call(null,c__7493__auto__,i__47577);cljs.core.chunk_append.call(null,b__47578,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),new cljs.core.Keyword(null,"msg","msg",1014012659).cljs$core$IFn$_invoke$arity$1(e)], null));
{
var G__47635 = (i__47577 + 1);
i__47577 = G__47635;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__47578),iter__47575.call(null,cljs.core.chunk_rest.call(null,s__47576__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__47578),null);
}
} else
{var e = cljs.core.first.call(null,s__47576__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",1013907695),new cljs.core.Keyword(null,"msg","msg",1014012659).cljs$core$IFn$_invoke$arity$1(e)], null),iter__47575.call(null,cljs.core.rest.call(null,s__47576__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__7495__auto__.call(null,new cljs.core.Keyword(null,"error","error",1110689146).cljs$core$IFn$_invoke$arity$1(errors));
})()], null)], null));var seq__47579_47636 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,cljs.core.PersistentVector.EMPTY));var chunk__47580_47637 = null;var count__47581_47638 = 0;var i__47582_47639 = 0;while(true){
if((i__47582_47639 < count__47581_47638))
{var vec__47583_47640 = cljs.core._nth.call(null,chunk__47580_47637,i__47582_47639);var ev__8138__auto___47641 = cljs.core.nth.call(null,vec__47583_47640,0,null);var func__8139__auto___47642 = cljs.core.nth.call(null,vec__47583_47640,1,null);lt.util.dom.on.call(null,e__8137__auto__,ev__8138__auto___47641,func__8139__auto___47642);
{
var G__47643 = seq__47579_47636;
var G__47644 = chunk__47580_47637;
var G__47645 = count__47581_47638;
var G__47646 = (i__47582_47639 + 1);
seq__47579_47636 = G__47643;
chunk__47580_47637 = G__47644;
count__47581_47638 = G__47645;
i__47582_47639 = G__47646;
continue;
}
} else
{var temp__4092__auto___47647 = cljs.core.seq.call(null,seq__47579_47636);if(temp__4092__auto___47647)
{var seq__47579_47648__$1 = temp__4092__auto___47647;if(cljs.core.chunked_seq_QMARK_.call(null,seq__47579_47648__$1))
{var c__7526__auto___47649 = cljs.core.chunk_first.call(null,seq__47579_47648__$1);{
var G__47650 = cljs.core.chunk_rest.call(null,seq__47579_47648__$1);
var G__47651 = c__7526__auto___47649;
var G__47652 = cljs.core.count.call(null,c__7526__auto___47649);
var G__47653 = 0;
seq__47579_47636 = G__47650;
chunk__47580_47637 = G__47651;
count__47581_47638 = G__47652;
i__47582_47639 = G__47653;
continue;
}
} else
{var vec__47584_47654 = cljs.core.first.call(null,seq__47579_47648__$1);var ev__8138__auto___47655 = cljs.core.nth.call(null,vec__47584_47654,0,null);var func__8139__auto___47656 = cljs.core.nth.call(null,vec__47584_47654,1,null);lt.util.dom.on.call(null,e__8137__auto__,ev__8138__auto___47655,func__8139__auto___47656);
{
var G__47657 = cljs.core.next.call(null,seq__47579_47648__$1);
var G__47658 = null;
var G__47659 = 0;
var G__47660 = 0;
seq__47579_47636 = G__47657;
chunk__47580_47637 = G__47658;
count__47581_47638 = G__47659;
i__47582_47639 = G__47660;
continue;
}
}
} else
{}
}
break;
}
return e__8137__auto__;
});

lt.plugins.nimrod.__GT_spacing = (function __GT_spacing(text){if(cljs.core.truth_(text))
{return cljs.core.first.call(null,cljs.core.re_seq.call(null,/^\s+/,text));
} else
{return null;
}
});

lt.plugins.nimrod.create_hints = (function create_hints(editor,category,errors){var seq__47597_47661 = cljs.core.seq.call(null,category.call(null,cljs.core.deref.call(null,editor)));var chunk__47598_47662 = null;var count__47599_47663 = 0;var i__47600_47664 = 0;while(true){
if((i__47600_47664 < count__47599_47663))
{var widget_47665 = cljs.core._nth.call(null,chunk__47598_47662,i__47600_47664);lt.objs.editor.remove_line_widget.call(null,editor,widget_47665);
{
var G__47666 = seq__47597_47661;
var G__47667 = chunk__47598_47662;
var G__47668 = count__47599_47663;
var G__47669 = (i__47600_47664 + 1);
seq__47597_47661 = G__47666;
chunk__47598_47662 = G__47667;
count__47599_47663 = G__47668;
i__47600_47664 = G__47669;
continue;
}
} else
{var temp__4092__auto___47670 = cljs.core.seq.call(null,seq__47597_47661);if(temp__4092__auto___47670)
{var seq__47597_47671__$1 = temp__4092__auto___47670;if(cljs.core.chunked_seq_QMARK_.call(null,seq__47597_47671__$1))
{var c__7526__auto___47672 = cljs.core.chunk_first.call(null,seq__47597_47671__$1);{
var G__47673 = cljs.core.chunk_rest.call(null,seq__47597_47671__$1);
var G__47674 = c__7526__auto___47672;
var G__47675 = cljs.core.count.call(null,c__7526__auto___47672);
var G__47676 = 0;
seq__47597_47661 = G__47673;
chunk__47598_47662 = G__47674;
count__47599_47663 = G__47675;
i__47600_47664 = G__47676;
continue;
}
} else
{var widget_47677 = cljs.core.first.call(null,seq__47597_47671__$1);lt.objs.editor.remove_line_widget.call(null,editor,widget_47677);
{
var G__47678 = cljs.core.next.call(null,seq__47597_47671__$1);
var G__47679 = null;
var G__47680 = 0;
var G__47681 = 0;
seq__47597_47661 = G__47678;
chunk__47598_47662 = G__47679;
count__47599_47663 = G__47680;
i__47600_47664 = G__47681;
continue;
}
}
} else
{}
}
break;
}
var cm = lt.objs.editor.__GT_cm_ed.call(null,editor);var prev = cm.getScrollInfo();var hints = cljs.core.doall.call(null,(function (){var iter__7495__auto__ = ((function (cm,prev){
return (function iter__47601(s__47602){return (new cljs.core.LazySeq(null,((function (cm,prev){
return (function (){var s__47602__$1 = s__47602;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__47602__$1);if(temp__4092__auto__)
{var s__47602__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__47602__$2))
{var c__7493__auto__ = cljs.core.chunk_first.call(null,s__47602__$2);var size__7494__auto__ = cljs.core.count.call(null,c__7493__auto__);var b__47604 = cljs.core.chunk_buffer.call(null,size__7494__auto__);if((function (){var i__47603 = 0;while(true){
if((i__47603 < size__7494__auto__))
{var vec__47607 = cljs.core._nth.call(null,c__7493__auto__,i__47603);var ln = cljs.core.nth.call(null,vec__47607,0,null);var data = cljs.core.nth.call(null,vec__47607,1,null);cljs.core.chunk_append.call(null,b__47604,lt.objs.editor.line_widget.call(null,editor,(ln - 1),lt.plugins.nimrod.mark.call(null,data,lt.plugins.nimrod.__GT_spacing.call(null,lt.objs.editor.line.call(null,editor,(ln - 1))))));
{
var G__47682 = (i__47603 + 1);
i__47603 = G__47682;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__47604),iter__47601.call(null,cljs.core.chunk_rest.call(null,s__47602__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__47604),null);
}
} else
{var vec__47608 = cljs.core.first.call(null,s__47602__$2);var ln = cljs.core.nth.call(null,vec__47608,0,null);var data = cljs.core.nth.call(null,vec__47608,1,null);return cljs.core.cons.call(null,lt.objs.editor.line_widget.call(null,editor,(ln - 1),lt.plugins.nimrod.mark.call(null,data,lt.plugins.nimrod.__GT_spacing.call(null,lt.objs.editor.line.call(null,editor,(ln - 1))))),iter__47601.call(null,cljs.core.rest.call(null,s__47602__$2)));
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

lt.plugins.nimrod.__BEH__eval_on_save = (function __BEH__eval_on_save(editor){var check_results_ready = (function check_results_ready(err,stdout,stderr){var errors = lt.plugins.nimrod.map_errors_to_lines.call(null,lt.plugins.nimrod.parse_errors.call(null,stdout));var cm = lt.objs.editor.__GT_cm_ed.call(null,editor);return lt.objs.editor.operation.call(null,cm,(function (){return lt.plugins.nimrod.create_hints.call(null,editor,new cljs.core.Keyword(null,"nimrod.hints","nimrod.hints",2940953989),errors);
}));
});
return lt.plugins.nimrod.call_nimrod.call(null,[cljs.core.str("check "),cljs.core.str(lt.plugins.nimrod.editor_quoted_path.call(null,editor))].join(''),check_results_ready);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.nimrod","eval-on-save","lt.plugins.nimrod/eval-on-save",4320823085),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.nimrod.__BEH__eval_on_save,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"save","save",1017427183),null], null), null));

lt.plugins.nimrod.__BEH__eval_BANG_ = (function __BEH__eval_BANG_(this$,event){return null;
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.nimrod","eval!","lt.plugins.nimrod/eval!",1873086586),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.nimrod.__BEH__eval_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval!","eval!",1110791799),null], null), null));

lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.nimrod","nimrod-lang","lt.plugins.nimrod/nimrod-lang",2524535993),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"nimrod.lang","nimrod.lang",1768915257),null], null), null),new cljs.core.Keyword(null,"behaviors","behaviors",607554515),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.plugins.nimrod","eval!","lt.plugins.nimrod/eval!",1873086586)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval!","eval!",1110791799),null], null), null));

lt.plugins.nimrod.nimrod_lang = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.nimrod","nimrod-lang","lt.plugins.nimrod/nimrod-lang",2524535993));

}

//# sourceMappingURL=