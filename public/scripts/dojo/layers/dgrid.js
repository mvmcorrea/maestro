//>>built
require({cache:{"xstyle/has-class":function(){
define(["dojo/has"],function(_1){
var _2={};
return function(){
var _3,_4=arguments;
for(var i=0;i<_4.length;i++){
var _3=_4[i];
if(!_2[_3]){
_2[_3]=true;
var _5=_3.match(/^(no-)?(.+?)((-[\d\.]+)(-[\d\.]+)?)?$/),_6=_1(_5[2]),_7=-_5[4];
if((_7>0?_7<=_6&&(-_5[5]||_7)>=_6:!!_6)==!_5[1]){
document.documentElement.className+=" has-"+_3;
}
}
}
};
});
},"dgrid/OnDemandGrid":function(){
define(["dojo/_base/declare","./Grid","./OnDemandList"],function(_8,_9,_a){
return _8([_9,_a],{});
});
},"dgrid/List":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/on","dojo/has","./util/misc","dojo/has!touch?./TouchScroll","xstyle/has-class","put-selector/put","dojo/_base/sniff","xstyle/css!./css/dgrid.css"],function(_b,_c,_d,_e,_f,_10,_11,put){
_11("mozilla","opera","webkit","ie","ie-6","ie-6-7","quirks","no-quirks","touch");
var _12="dgrid-row-odd",_13="dgrid-row-even",_14,_15;
function _16(id){
return document.getElementById(id);
};
function _17(_18,_19){
var _1a=document.body,_1b;
put(_1a,_18,".dgrid-scrollbar-measure");
_1b=_18["offset"+_19]-_18["client"+_19];
put(_18,"!dgrid-scrollbar-measure");
_1a.removeChild(_18);
return _1b;
};
_e.add("dom-scrollbar-width",function(_1c,doc,_1d){
return _17(_1d,"Width");
});
_e.add("dom-scrollbar-height",function(_1e,doc,_1f){
return _17(_1f,"Height");
});
var _20=0;
function _21(){
return "dgrid_"+_20++;
};
var _22=/ +/g;
function _23(cls){
var _24=cls?"."+cls.replace(_22,"."):"";
if(this._class){
_24="!"+this._class.replace(_22,"!")+_24;
}
put(this.domNode,_24);
this._class=cls;
};
function _25(){
return this._class;
};
var _26=_e("ie")<7&&!_e("quirks")?function(){
var _27,w,h,_28;
if(!this._started){
return;
}
_27=document.documentElement;
w=_27.clientWidth;
h=_27.clientHeight;
_28=this._prevWinDims||[];
if(_28[0]!==w||_28[1]!==h){
this.resize();
this._prevWinDims=[w,h];
}
}:function(){
if(this._started){
this.resize();
}
};
return _c(_10?_10:null,{tabableHeader:false,showHeader:false,showFooter:false,maintainOddEven:true,cleanAddedRules:true,postscript:function(_29,_2a){
var _2b=this;
(this._Row=function(id,_2c,_2d){
this.id=id;
this.data=_2c;
this.element=_2d;
}).prototype.remove=function(){
_2b.removeRow(this.element);
};
if(_2a){
this.srcNodeRef=_2a=_2a.nodeType?_2a:_16(_2a);
}
this.create(_29,_2a);
},listType:"list",create:function(_2e,_2f){
var _30=this.domNode=_2f||put("div"),cls;
if(_2e){
this.params=_2e;
_c.safeMixin(this,_2e);
cls=_2e["class"]||_2e.className||_30.className;
this._sort=_2e.sort||[];
delete this.sort;
}else{
this._sort=[];
}
this.observers=[];
this._listeners=[];
this._rowIdToObject={};
this.postMixInProperties&&this.postMixInProperties();
this.id=_30.id=_30.id||this.id||_21();
this.buildRendering();
if(cls){
_23.call(this,cls);
}
this.postCreate&&this.postCreate();
delete this.srcNodeRef;
if(this.domNode.offsetHeight){
this.startup();
}
},buildRendering:function(){
var _31=this.domNode,_32=this,_33,_34,_35,_36,_37;
_37=this.isRTL=(document.body.dir||document.documentElement.dir||document.body.style.direction).toLowerCase()=="rtl";
_31.className="";
put(_31,"[role=grid].ui-widget.dgrid.dgrid-"+this.listType);
_33=this.headerNode=put(_31,"div.dgrid-header.dgrid-header-row.ui-widget-header"+(this.showHeader?"":".dgrid-header-hidden"));
if(_e("quirks")||_e("ie")<8){
_34=put(_31,"div.dgrid-spacer");
}
_35=this.bodyNode=put(_31,"div.dgrid-scroller");
_35.tabIndex=-1;
this.headerScrollNode=put(_31,"div.dgrid-header-scroll.dgrid-scrollbar-width.ui-widget-header");
_36=this.footerNode=put("div.dgrid-footer"+(this.showFooter?"":".dgrid-footer-hidden"));
put(_31,_36);
if(_37){
_31.className+=" dgrid-rtl"+(_e("webkit")?"":" dgrid-rtl-nonwebkit");
}
_d(_35,"scroll",function(_38){
if(_32.showHeader){
_33.scrollLeft=_38.scrollLeft||_35.scrollLeft;
}
_38.stopPropagation();
_d.emit(_31,"scroll",{scrollTarget:_35});
});
this.configStructure();
this.renderHeader();
this.contentNode=this.touchNode=put(this.bodyNode,"div.dgrid-content.ui-widget-content");
this._listeners.push(this._resizeHandle=_d(window,"resize",_f.throttleDelayed(_26,this)));
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
this._started=true;
this.resize();
this.set("sort",this._sort);
},configStructure:function(){
},resize:function(){
var _39=this.bodyNode,_3a=this.headerNode,_3b=this.footerNode,_3c=_3a.offsetHeight,_3d=this.showFooter?_3b.offsetHeight:0,_3e=_e("quirks")||_e("ie")<7;
this.headerScrollNode.style.height=_39.style.marginTop=_3c+"px";
_39.style.marginBottom=_3d+"px";
if(_3e){
_39.style.height="";
_39.style.height=Math.max((this.domNode.offsetHeight-_3c-_3d),0)+"px";
if(_3d){
_3b.style.bottom="1px";
setTimeout(function(){
_3b.style.bottom="";
},0);
}
}
if(!_14){
_14=_e("dom-scrollbar-width");
_15=_e("dom-scrollbar-height");
if(_e("ie")){
_14++;
_15++;
}
_f.addCssRule(".dgrid-scrollbar-width","width: "+_14+"px");
_f.addCssRule(".dgrid-scrollbar-height","height: "+_15+"px");
if(_14!=17&&!_3e){
_f.addCssRule(".dgrid-header","right: "+_14+"px");
_f.addCssRule(".dgrid-rtl-nonwebkit .dgrid-header","left: "+_14+"px");
}
}
if(_3e){
_3a.style.width=_39.clientWidth+"px";
setTimeout(function(){
_3a.scrollLeft=_39.scrollLeft;
},0);
}
},addCssRule:function(_3f,css){
var _40=_f.addCssRule(_3f,css);
if(this.cleanAddedRules){
this._listeners.push(_40);
}
return _40;
},on:function(_41,_42){
var _43=_d(this.domNode,_41,_42);
if(!_e("dom-addeventlistener")){
this._listeners.push(_43);
}
return _43;
},cleanup:function(){
var _44=this.observers,i;
for(i in this._rowIdToObject){
if(this._rowIdToObject[i]!=this.columns){
var _45=_16(i);
if(_45){
this.removeRow(_45,true);
}
}
}
for(i=0;i<_44.length;i++){
var _46=_44[i];
_46&&_46.cancel();
}
this.observers=[];
this.preload=null;
},destroy:function(){
if(this._listeners){
for(var i=this._listeners.length;i--;){
this._listeners[i].remove();
}
delete this._listeners;
}
this.cleanup();
put(this.domNode,"!");
},refresh:function(){
this.cleanup();
this._rowIdToObject={};
this._autoId=0;
this.contentNode.innerHTML="";
this.scrollTo({x:0,y:0});
},newRow:function(_47,_48,_49,i,_4a){
if(_48){
var row=this.insertRow(_47,_48,_49,i,_4a);
put(row,".ui-state-highlight");
setTimeout(function(){
put(row,"!ui-state-highlight");
},250);
return row;
}
},adjustRowIndices:function(_4b){
if(this.maintainOddEven){
var _4c=_4b;
var _4d=_4c.rowIndex;
if(_4d>-1){
do{
if(_4c.rowIndex>-1){
if((_4c.className+" ").indexOf("dgrid-row ")>-1){
put(_4c,"."+(_4d%2==1?_12:_13)+"!"+(_4d%2==0?_12:_13));
}
_4c.rowIndex=_4d++;
}
}while((_4c=_4c.nextSibling)&&_4c.rowIndex!=_4d&&!_4c.blockRowIndex);
}
}
},renderArray:function(_4e,_4f,_50){
_50=_50||{};
var _51=this,_52=_50.start||0,row,_53,_54;
if(!_4f){
this._lastCollection=_4e;
}
if(_4e.observe){
var _55=this.observers.push(_4e.observe(function(_56,_57,to){
var _58,_59,_5a;
if(_57>-1&&_53[_57]){
row=_53.splice(_57,1)[0];
if(row.parentNode==_54){
_58=row.nextSibling;
if(_58){
if(_57!=to){
_58.rowIndex--;
}
}
_51.removeRow(row);
}
if(_51._processScroll){
_51._processScroll();
}
}
if(to>-1){
_59=_53[to];
if(!_59){
_59=_53[to-1];
if(_59){
_59=(_59.connected||_59).nextSibling;
}
}
_5a=(_4f&&_4f.parentNode)||(_59&&_59.parentNode)||_51.contentNode;
row=_51.newRow(_56,_5a,_59,_50.start+to,_50);
if(row){
row.observerIndex=_55;
_53.splice(to,0,row);
if(!_58||to<_57){
var _5b=row.previousSibling;
_58=!_5b||_5b.rowIndex+1==row.rowIndex||row.rowIndex==0?row:_5b;
}
}
_50.count++;
}
_57!=to&&_58&&_51.adjustRowIndices(_58);
_51._onNotification(_53,_56,_57,to);
},true))-1;
}
var _5c=document.createDocumentFragment();
if(_4e.map){
_53=_4e.map(_5d,console.error);
if(_53.then){
return _53.then(_5e);
}
}else{
_53=[];
for(var i=0,l=_4e.length;i<l;i++){
_53[i]=_5d(_4e[i]);
}
}
var _5f;
function _5d(_60){
_5f=_51.insertRow(_60,_5c,null,_52++,_50);
_5f.observerIndex=_55;
return _5f;
};
function _5e(_61){
_54=_4f?_4f.parentNode:_51.contentNode;
if(_54){
_54.insertBefore(_5c,_4f||null);
_5f=_61[_61.length-1];
_5f&&_51.adjustRowIndices(_5f);
}
return (_53=_61);
};
return _5e(_53);
},_onNotification:function(_62,_63,_64,to){
},renderHeader:function(){
},_autoId:0,insertRow:function(_65,_66,_67,i,_68){
var _69=_68.parentId,id=this.id+"-row-"+(_69?_69+"-":"")+((this.store&&this.store.getIdentity)?this.store.getIdentity(_65):this._autoId++),row=_16(id),_6a=row&&row.previousSibling;
if(row){
this.removeRow(row);
}
row=this.renderRow(_65,_68);
row.className=(row.className||"")+" ui-state-default dgrid-row "+(i%2==1?_12:_13);
this._rowIdToObject[row.id=id]=_65;
_66.insertBefore(row,_67||null);
if(_6a){
this.adjustRowIndices(_6a);
}
row.rowIndex=i;
return row;
},renderRow:function(_6b,_6c){
return put("div",""+_6b);
},removeRow:function(_6d,_6e){
_6d=_6d.element||_6d;
delete this._rowIdToObject[_6d.id];
if(!_6e){
put(_6d,"!");
}
},row:function(_6f){
var id;
if(_6f instanceof this._Row){
return _6f;
}
if(_6f.target&&_6f.target.nodeType){
_6f=_6f.target;
}
if(_6f.nodeType){
var _70;
do{
var _71=_6f.id;
if((_70=this._rowIdToObject[_71])){
return new this._Row(_71.substring(this.id.length+5),_70,_6f);
}
_6f=_6f.parentNode;
}while(_6f&&_6f!=this.domNode);
return;
}
if(typeof _6f=="object"){
id=this.store.getIdentity(_6f);
}else{
id=_6f;
_6f=this._rowIdToObject[this.id+"-row-"+id];
}
return new this._Row(id,_6f,_16(this.id+"-row-"+id));
},cell:function(_72){
return {row:this.row(_72)};
},_move:function(_73,_74,_75,_76){
var _77,_78,_79;
_79=_78=_73.element;
_74=_74||1;
do{
if((_77=_78[_74<0?"previousSibling":"nextSibling"])){
do{
_78=_77;
if(_78&&(_78.className+" ").indexOf(_75+" ")>-1){
_79=_78;
_74+=_74<0?1:-1;
break;
}
}while((_77=(!_76||!_78.hidden)&&_78[_74<0?"lastChild":"firstChild"]));
}else{
_78=_78.parentNode;
if(_78===this.bodyNode||_78===this.headerNode){
break;
}
}
}while(_74);
return _79;
},up:function(row,_7a,_7b){
if(!row.element){
row=this.row(row);
}
return this.row(this._move(row,-(_7a||1),"dgrid-row",_7b));
},down:function(row,_7c,_7d){
if(!row.element){
row=this.row(row);
}
return this.row(this._move(row,_7c||1,"dgrid-row",_7d));
},scrollTo:_e("touch")?function(){
return this.inherited(arguments);
}:function(_7e){
if(typeof _7e.x!=="undefined"){
this.bodyNode.scrollLeft=_7e.x;
}
if(typeof _7e.y!=="undefined"){
this.bodyNode.scrollTop=_7e.y;
}
},getScrollPosition:_e("touch")?function(){
return this.inherited(arguments);
}:function(){
return {x:this.bodyNode.scrollLeft,y:this.bodyNode.scrollTop};
},get:function(_7f){
var fn="_get"+_7f.charAt(0).toUpperCase()+_7f.slice(1);
if(typeof this[fn]==="function"){
return this[fn].apply(this,[].slice.call(arguments,1));
}
if(!1&&typeof this[fn+"Attr"]==="function"){
console.warn("dgrid: Use "+fn+" instead of "+fn+"Attr for getting "+_7f);
}
return this[_7f];
},set:function(_80,_81){
if(typeof _80==="object"){
for(var k in _80){
this.set(k,_80[k]);
}
}else{
var fn="_set"+_80.charAt(0).toUpperCase()+_80.slice(1);
if(typeof this[fn]==="function"){
this[fn].apply(this,[].slice.call(arguments,1));
}else{
if(!1&&typeof this[fn+"Attr"]==="function"){
console.warn("dgrid: Use "+fn+" instead of "+fn+"Attr for setting "+_80);
}
this[_80]=_81;
}
}
return this;
},_getClass:_25,_setClass:_23,_getClassName:_25,_setClassName:_23,_setSort:function(_82,_83){
this._sort=typeof _82!="string"?_82:[{attribute:_82,descending:_83}];
this.refresh();
if(this._lastCollection){
if(_82.length){
if(typeof _82!="string"){
_83=_82[0].descending;
_82=_82[0].attribute;
}
this._lastCollection.sort(function(a,b){
var _84=a[_82],_85=b[_82];
if(_84===undefined){
_84="";
}
if(_85===undefined){
_85="";
}
return _84==_85?0:(_84>_85==!_83?1:-1);
});
}
this.renderArray(this._lastCollection);
}
},sort:function(_86,_87){
_b.deprecated("sort(...)","use set(\"sort\", ...) instead","dgrid 1.0");
this.set("sort",_86,_87);
},_getSort:function(){
return this._sort;
},_setShowHeader:function(_88){
var _89=this.headerNode;
this.showHeader=_88;
put(_89,(_88?"!":".")+"dgrid-header-hidden");
this.renderHeader();
this.resize();
if(_88){
_89.scrollLeft=this.getScrollPosition().x;
}
},setShowHeader:function(_8a){
_b.deprecated("setShowHeader(...)","use set(\"showHeader\", ...) instead","dgrid 1.0");
this.set("showHeader",_8a);
},_setShowFooter:function(_8b){
this.showFooter=_8b;
put(this.footerNode,(_8b?"!":".")+"dgrid-footer-hidden");
this.resize();
}});
});
},"dgrid/util/mouse":function(){
define(["dojo/on","dojo/dom","dojo/query"],function(on,dom){
function _8c(_8d,_8e){
return function(_8f,_90){
return on(_8f,_8d+":"+_8e,function(evt){
if(!dom.isDescendant(evt.relatedTarget,this)){
return _90.call(this,evt);
}
});
};
};
return {enterRow:_8c(".dgrid-content .dgrid-row","mouseover"),enterCell:_8c(".dgrid-content .dgrid-cell","mouseover"),enterHeaderCell:_8c(".dgrid-header .dgrid-cell","mouseover"),leaveRow:_8c(".dgrid-content .dgrid-row","mouseout"),leaveCell:_8c(".dgrid-content .dgrid-cell","mouseout"),leaveHeaderCell:_8c(".dgrid-header .dgrid-cell","mouseout"),createDelegatingHandler:_8c};
});
},"xstyle/load-css":function(){
define([],function(){
"use strict";
var _91="onreadystatechange",_92="onload",_93="createElement",_94=false,doc=document,_95=typeof _css_cache=="undefined"?{}:_css_cache,_96,_97={"event-link-onload":false,"dom-create-style-element":!document.createStyleSheet},_98=doc.head||(doc.head=doc.getElementsByTagName("head")[0]);
function has(_99){
return _97[_99];
};
function _9a(doc,_9b){
var _9c=doc[_93]("link");
_9c.rel="stylesheet";
_9c.type="text/css";
if(_9b){
_9c.href=_9b;
}
return _9c;
};
function _9d(_9e,_9f){
return _9e.lastIndexOf(".")<=_9e.lastIndexOf("/")?_9e+"."+_9f:_9e;
};
function _a0(_a1){
var _a2=_a1.split("!"),suf,i=1,_a3;
while((suf=_a2[i++])){
_a3=suf.split("=",2);
_a2[_a3[0]]=_a3.length==2?_a3[1]:true;
}
return _a2;
};
if(!has("bundled-css")){
var _a4=function(_a5,cb){
if(require.onError){
require.onError=(function(_a6){
return function(){
_94=true;
_a6.apply(this,arguments);
};
})(require.onError);
}
function _a7(_a8,cb){
var _a9=_a8.link;
_a9[_91]=_a9[_92]=function(){
if(!_a9.readyState||_a9.readyState=="complete"){
_97["event-link-onload"]=true;
_aa(_a8);
cb();
}
};
};
var _ab;
function _ac(){
if(!_ab){
_ab=document[_93]("div");
_ab.id="_cssx_load_test";
_ab.style.cssText="position:absolute;top:-999px;left:-999px;";
doc.body.appendChild(_ab);
}
return doc.defaultView.getComputedStyle(_ab,null).marginTop=="-5px";
};
function _ad(_ae){
var _af,_b0,_b1=false;
try{
_af=_ae.sheet||_ae.styleSheet;
if(_af){
_b0=_af.cssRules||_af.rules;
_b1=_b0?_b0.length>0:_b0!==_96;
if(_b1&&navigator.userAgent.indexOf("Chrome")>=0){
_af.insertRule("#_cssx_load_test{margin-top:-5px;}",0);
_b1=_ac();
_af.deleteRule(0);
}
}
}
catch(ex){
_b1=(ex.code==1000)||(ex.message.match(/security|denied/i));
}
return _b1;
};
function _b2(_b3,cb){
if(_ad(_b3.link)){
_aa(_b3);
cb();
}else{
if(!_94){
setTimeout(function(){
_b2(_b3,cb);
},_b3.wait);
}
}
};
function _aa(_b4){
var _b5=_b4.link;
_b5[_91]=_b5[_92]=null;
};
var _b6;
function _b7(){
if(!_b6){
_b6=true;
cb();
}
};
_a7(_a5,_b7);
if(!has("event-link-onload")){
_b2(_a5,_b7);
}
};
}
function _b8(css){
if(has("dom-create-style-element")){
_b9=document.createElement("style");
_b9.setAttribute("type","text/css");
_b9.appendChild(document.createTextNode(css));
_98.insertBefore(_b9,_98.firstChild);
return _b9;
}else{
var _b9=document.createStyleSheet();
_b9.cssText=css;
return _b9.owningElement;
}
};
return function(_ba,_bb,_bc){
var _bd=_ba.split(","),_be=_bd.length,_bf=function(){
if(--_be==0){
_bb(_c0.sheet||_c0.styleSheet);
}
};
for(var i=0,_c1;i<_bd.length;i++,_c1=url){
_ba=_bd[i];
var _c2=_95[_ba];
if(_c2){
_c0=_b8(_c2);
return _bf();
}
var _c3=_a0(_ba),_c4=_c3.shift(),url=_9d(_c4,"css"),_c0=_9a(doc),_c5="nowait" in _c3?_c3.nowait!="false":!!(_bc&&_bc.cssDeferLoad),_c6={link:_c0,url:url,wait:_bc&&_bc.cssWatchPeriod||50};
_a4(_c6,_bf);
if(_c5){
_bb(_c0);
}
_c0.href=url;
_98.appendChild(_c0);
}
};
});
},"dgrid/Keyboard":function(){
define(["dojo/_base/declare","dojo/aspect","dojo/on","dojo/_base/lang","dojo/has","put-selector/put","dojo/_base/Deferred","dojo/_base/sniff"],function(_c7,_c8,on,_c9,has,put,_ca){
var _cb={checkbox:1,radio:1,button:1},_cc=/\bdgrid-cell\b/,_cd=/\bdgrid-row\b/;
has.add("dom-contains",function(_ce,doc,_cf){
return !!_cf.contains;
});
function _d0(_d1,_d2){
if(has("dom-contains")){
return _d1.contains(_d2);
}else{
return _d1.compareDocumentPosition(_d2)&8;
}
};
var _d3=_c7(null,{pageSkip:10,tabIndex:0,keyMap:null,headerKeyMap:null,postMixInProperties:function(){
this.inherited(arguments);
if(!this.keyMap){
this.keyMap=_c9.mixin({},_d3.defaultKeyMap);
}
if(!this.headerKeyMap){
this.headerKeyMap=_c9.mixin({},_d3.defaultHeaderKeyMap);
}
},postCreate:function(){
this.inherited(arguments);
var _d4=this;
function _d5(_d6){
var _d7=_d6.target;
return _d7.type&&(!_cb[_d7.type]||_d6.keyCode==32);
};
function _d8(_d9){
var _da=_d4.cellNavigation,_db=_da?_cc:_cd,_dc=_d9===_d4.headerNode,_dd=_d9;
function _de(){
_d4._focusedHeaderNode=_dd=_da?_d4.headerNode.getElementsByTagName("th")[0]:_d4.headerNode;
if(_dd){
_dd.tabIndex=_d4.tabIndex;
}
};
if(_dc){
_de();
_c8.after(_d4,"renderHeader",_de,true);
}else{
_c8.after(_d4,"renderArray",function(ret){
return _ca.when(ret,function(ret){
var _df=_d4._focusedNode||_dd;
if(_db.test(_df.className)&&_d0(_d9,_df)){
return ret;
}
for(var i=0,_e0=_d9.getElementsByTagName("*"),_e1;(_e1=_e0[i]);++i){
if(_db.test(_e1.className)){
_df=_d4._focusedNode=_e1;
break;
}
}
_df.tabIndex=_d4.tabIndex;
return ret;
});
});
}
_d4._listeners.push(on(_d9,"mousedown",function(_e2){
if(!_d5(_e2)){
_d4._focusOnNode(_e2.target,_dc,_e2);
}
}));
_d4._listeners.push(on(_d9,"keydown",function(_e3){
if(_e3.metaKey||_e3.altKey){
return;
}
var _e4=_d4[_dc?"headerKeyMap":"keyMap"][_e3.keyCode];
if(_e4&&!_d5(_e3)){
_e4.call(_d4,_e3);
}
}));
};
if(this.tabableHeader){
_d8(this.headerNode);
on(this.headerNode,"dgrid-cellfocusin",function(){
_d4.scrollTo({x:this.scrollLeft});
});
}
_d8(this.contentNode);
},addKeyHandler:function(key,_e5,_e6){
return _c8.after(this[_e6?"headerKeyMap":"keyMap"],key,_e5,true);
},_focusOnNode:function(_e7,_e8,_e9){
var _ea="_focused"+(_e8?"Header":"")+"Node",_eb=this[_ea],_ec=this.cellNavigation?"cell":"row",_ed=this[_ec](_e7),_ee,_ef,_f0,_f1,i;
_e7=_ed&&_ed.element;
if(!_e7){
return;
}
if(this.cellNavigation){
_ee=_e7.getElementsByTagName("input");
for(i=0,_f0=_ee.length;i<_f0;i++){
_ef=_ee[i];
if((_ef.tabIndex!=-1||"lastValue" in _ef)&&!_ef.disabled){
if(has("ie")<8){
_ef.style.position="relative";
}
_ef.focus();
if(has("ie")<8){
_ef.style.position="";
}
_f1=true;
break;
}
}
}
_e9=_c9.mixin({grid:this},_e9);
if(_e9.type){
_e9.parentType=_e9.type;
}
if(!_e9.bubbles){
_e9.bubbles=true;
}
if(_eb){
put(_eb,"!dgrid-focus[!tabIndex]");
if(has("ie")<8){
_eb.style.position="";
}
_e9[_ec]=this[_ec](_eb);
on.emit(_e7,"dgrid-cellfocusout",_e9);
}
_eb=this[_ea]=_e7;
_e9[_ec]=_ed;
if(!_f1){
if(has("ie")<8){
_e7.style.position="relative";
}
_e7.tabIndex=this.tabIndex;
_e7.focus();
}
put(_e7,".dgrid-focus");
on.emit(_eb,"dgrid-cellfocusin",_e9);
},focusHeader:function(_f2){
this._focusOnNode(_f2||this._focusedHeaderNode,true);
},focus:function(_f3){
this._focusOnNode(_f3||this._focusedNode,false);
}});
var _f4=_d3.moveFocusVertical=function(_f5,_f6){
var _f7=this.cellNavigation,_f8=this[_f7?"cell":"row"](_f5),_f9=_f7&&_f8.column.id,_fa=this.down(this._focusedNode,_f6,true);
if(_f7){
_fa=this.cell(_fa,_f9);
}
this._focusOnNode(_fa,false,_f5);
_f5.preventDefault();
};
var _fb=_d3.moveFocusUp=function(_fc){
_f4.call(this,_fc,-1);
};
var _fd=_d3.moveFocusDown=function(_fe){
_f4.call(this,_fe,1);
};
var _ff=_d3.moveFocusPageUp=function(_100){
_f4.call(this,_100,-this.pageSkip);
};
var _101=_d3.moveFocusPageDown=function(_102){
_f4.call(this,_102,this.pageSkip);
};
var _103=_d3.moveFocusHorizontal=function(_104,_105){
if(!this.cellNavigation){
return;
}
var _106=!this.row(_104),_107=this["_focused"+(_106?"Header":"")+"Node"];
this._focusOnNode(this.right(_107,_105),_106,_104);
_104.preventDefault();
};
var _108=_d3.moveFocusLeft=function(_109){
_103.call(this,_109,-1);
};
var _10a=_d3.moveFocusRight=function(_10b){
_103.call(this,_10b,1);
};
var _10c=_d3.moveHeaderFocusEnd=function(_10d,_10e){
var _10f;
if(this.cellNavigation){
_10f=this.headerNode.getElementsByTagName("th");
this._focusOnNode(_10f[_10e?0:_10f.length-1],true,_10d);
}
_10d.preventDefault();
};
var _110=_d3.moveHeaderFocusHome=function(_111){
_10c.call(this,_111,true);
};
var _112=_d3.moveFocusEnd=function(_113,_114){
var self=this,_115=this.cellNavigation,_116=this.contentNode,_117=_114?0:_116.scrollHeight,_118=_116.scrollTop+_117,_119=_116[_114?"firstChild":"lastChild"],_11a=_119.className.indexOf("dgrid-preload")>-1,_11b=_11a?_119[(_114?"next":"previous")+"Sibling"]:_119,_11c=_11b.offsetTop+(_114?0:_11b.offsetHeight),_11d;
if(_11a){
while(_11b&&_11b.className.indexOf("dgrid-row")<0){
_11b=_11b[(_114?"next":"previous")+"Sibling"];
}
if(!_11b){
return;
}
}
if(!_11a||_119.offsetHeight<1){
if(_115){
_11b=this.cell(_11b,this.cell(_113).column.id);
}
this._focusOnNode(_11b,false,_113);
}else{
if(!has("dom-addeventlistener")){
_113=_c9.mixin({},_113);
}
_11d=_c8.after(this,"renderArray",function(rows){
_11d.remove();
return _ca.when(rows,function(rows){
var _11e=rows[_114?0:rows.length-1];
if(_115){
_11e=self.cell(_11e,self.cell(_113).column.id);
}
self._focusOnNode(_11e,false,_113);
});
});
}
if(_118===_11c){
_113.preventDefault();
}
};
var _11f=_d3.moveFocusHome=function(_120){
_112.call(this,_120,true);
};
function _121(_122){
_122.preventDefault();
};
_d3.defaultKeyMap={32:_121,33:_ff,34:_101,35:_112,36:_11f,37:_108,38:_fb,39:_10a,40:_fd};
_d3.defaultHeaderKeyMap={32:_121,35:_10c,36:_110,37:_108,39:_10a};
return _d3;
});
},"dgrid/util/misc":function(){
define(["put-selector/put"],function(put){
var _123=[],_124,_125,_126,_127=/([^A-Za-z0-9_\u00A0-\uFFFF-])/g;
function _128(_129){
var _12a=_123[_129],i,l;
if(_12a===undefined){
return;
}
_124[_125](_12a);
_123[_129]=undefined;
for(i=_129+1,l=_123.length;i<l;i++){
if(_123[i]>_12a){
_123[i]--;
}
}
};
var util={defaultDelay:15,throttle:function(cb,_12b,_12c){
var ran=false;
_12c=_12c||util.defaultDelay;
return function(){
if(ran){
return;
}
ran=true;
cb.apply(_12b,arguments);
setTimeout(function(){
ran=false;
},_12c);
};
},throttleDelayed:function(cb,_12d,_12e){
var ran=false;
_12e=_12e||util.defaultDelay;
return function(){
if(ran){
return;
}
ran=true;
var a=arguments;
setTimeout(function(){
ran=false;
cb.apply(_12d,a);
},_12e);
};
},debounce:function(cb,_12f,_130){
var _131;
_130=_130||util.defaultDelay;
return function(){
if(_131){
clearTimeout(_131);
_131=null;
}
var a=arguments;
_131=setTimeout(function(){
cb.apply(_12f,a);
},_130);
};
},addCssRule:function(_132,css){
if(!_124){
_124=put(document.getElementsByTagName("head")[0],"style");
_124=_124.sheet||_124.styleSheet;
_125=_124.deleteRule?"deleteRule":"removeRule";
_126=_124.cssRules?"cssRules":"rules";
}
var _133=_123.length;
_123[_133]=(_124.cssRules||_124.rules).length;
_124.addRule?_124.addRule(_132,css):_124.insertRule(_132+"{"+css+"}",_123[_133]);
return {get:function(prop){
return _124[_126][_123[_133]].style[prop];
},set:function(prop,_134){
if(typeof _123[_133]!=="undefined"){
_124[_126][_123[_133]].style[prop]=_134;
}
},remove:function(){
_128(_133);
}};
},escapeCssIdentifier:function(id){
return id.replace(_127,"\\$1");
}};
return util;
});
},"dgrid/util/touch":function(){
define(["dojo/on","dojo/query"],function(on,_135){
var util={tapRadius:10,dbltapTime:250,selector:function(_136,_137,_138){
return function(_139,_13a){
var _13b=_137.bubble;
if(_13b){
_137=_13b;
}else{
if(_138!==false){
_138=true;
}
}
return on(_139,_137,function(_13c){
var _13d=_13c.target;
if(_13d.nodeType==3){
_13d=_13d.parentNode;
}
while(!_135.matches(_13d,_136,_139)){
if(_13d==_139||!_138||!(_13d=_13d.parentNode)){
return;
}
}
return _13a.call(_13d,_13c);
});
};
},countCurrentTouches:function(evt,node){
var i,_13e,_13f;
for(i=0,_13e=0;(_13f=evt.touches[i]);++i){
if(node.contains(_13f.target)){
++_13e;
}
}
return _13e;
}};
function _140(_141,_142,evt,_143){
if(evt.targetTouches.length>1){
return;
}
var _144=evt.changedTouches[0],_145=_144.screenX,_146=_144.screenY;
_143&&evt.preventDefault();
var _147=on(_141,"touchend",function(evt){
var end=evt.changedTouches[0];
if(!evt.targetTouches.length){
if(Math.abs(end.screenX-_145)<util.tapRadius&&Math.abs(end.screenY-_146)<util.tapRadius){
_143&&evt.preventDefault();
_142.call(this,evt);
}
_147.remove();
}
});
};
function tap(_148,_149){
return on(_148,"touchstart",function(evt){
_140(_148,_149,evt);
});
};
function _14a(_14b,_14c){
var _14d,_14e;
return on(_14b,"touchstart",function(evt){
if(!_14d){
_140(_14b,function(evt){
_14d=evt.changedTouches[0];
_14e=setTimeout(function(){
_14d=_14e=null;
},util.dbltapTime);
},evt);
}else{
_140(_14b,function(evt){
if(!_14d){
return;
}
var _14f=evt.changedTouches[0];
if(Math.abs(_14f.screenX-_14d.screenX)<util.tapRadius&&Math.abs(_14f.screenY-_14d.screenY)<util.tapRadius){
_14e&&clearTimeout(_14e);
_14d=_14e=null;
_14c.call(this,evt);
}
},evt,true);
}
});
};
util.tap=tap;
util.dbltap=_14a;
return util;
});
},"xstyle/css":function(){
define(["require"],function(_150){
"use strict";
var _151=window.cssCache||(window.cssCache={});
return {load:function(_152,_153,_154,_155){
var url=_153.toUrl(_152);
if(_151[url]){
return createStyleSheet(_151[url]);
}
var _156=document.documentElement;
var _157=_156.insertBefore(document.createElement("div"),_156.firstChild);
_157.id=_153.toAbsMid(_152).replace(/\//g,"-").replace(/\..*/,"")+"-loaded";
var _158=(_157.currentStyle||getComputedStyle(_157,null)).display;
_156.removeChild(_157);
if(_158=="none"){
return _154();
}
_150(["./load-css"],function(load){
load(url,_154);
});
},pluginBuilder:"xstyle/css-builder"};
});
},"dgrid/Selection":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/Deferred","dojo/on","dojo/has","dojo/aspect","./List","dojo/has!touch?./util/touch","put-selector/put","dojo/query","dojo/_base/sniff"],function(_159,_15a,_15b,on,has,_15c,List,_15d,put){
has.add("css-user-select",function(_15e,doc,_15f){
var _160=_15f.style,_161=["Khtml","O","ms","Moz","Webkit"],i=_161.length,name="userSelect";
do{
if(typeof _160[name]!=="undefined"){
return name;
}
}while(i--&&(name=_161[i]+"UserSelect"));
return false;
});
has.add("dom-selectstart",typeof document.onselectstart!=="undefined");
var _162=has("mac")?"metaKey":"ctrlKey",_163=has("css-user-select");
function _164(node,_165){
var _166=node.unselectable=_165?"on":"",_167=node.getElementsByTagName("*"),i=_167.length;
while(--i){
if(_167[i].tagName==="INPUT"||_167[i].tagName==="TEXTAREA"){
continue;
}
_167[i].unselectable=_166;
}
};
function _168(grid,_169){
var node=grid.bodyNode,_16a=_169?"text":has("ff")<21?"-moz-none":"none";
if(_163){
node.style[_163]=_16a;
}else{
if(has("dom-selectstart")){
if(!_169&&!grid._selectstartHandle){
grid._selectstartHandle=on(node,"selectstart",function(evt){
var tag=evt.target&&evt.target.tagName;
if(tag!=="INPUT"&&tag!=="TEXTAREA"){
evt.preventDefault();
}
});
}else{
if(_169&&grid._selectstartHandle){
grid._selectstartHandle.remove();
delete grid._selectstartHandle;
}
}
}else{
_164(node,!_169);
if(!_169&&!grid._unselectableHandle){
grid._unselectableHandle=_15c.after(grid,"renderRow",function(row){
_164(row,true);
return row;
});
}else{
if(_169&&grid._unselectableHandle){
grid._unselectableHandle.remove();
delete grid._unselectableHandle;
}
}
}
}
};
return _15a(null,{selectionDelegate:".dgrid-row",selectionEvents:"mousedown,mouseup,dgrid-cellfocusin",deselectOnRefresh:true,allowSelectAll:false,selection:{},selectionMode:"extended",allowTextSelection:undefined,create:function(){
this.selection={};
return this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
var _16b=this.selectionMode;
this.selectionMode="";
this._setSelectionMode(_16b);
this._initSelectionEvents();
},destroy:function(){
this.inherited(arguments);
if(this._selectstartHandle){
this._selectstartHandle.remove();
}
if(this._unselectableHandle){
this._unselectableHandle.remove();
}
},_setSelectionMode:function(mode){
if(mode==this.selectionMode){
return;
}
this.clearSelection();
this.selectionMode=mode;
this._selectionHandlerName="_"+mode+"SelectionHandler";
this._setAllowTextSelection(this.allowTextSelection);
},setSelectionMode:function(mode){
_159.deprecated("setSelectionMode(...)","use set(\"selectionMode\", ...) instead","dgrid 1.0");
this.set("selectionMode",mode);
},_setAllowTextSelection:function(_16c){
if(typeof _16c!=="undefined"){
_168(this,_16c);
}else{
_168(this,this.selectionMode==="none");
}
this.allowTextSelection=_16c;
},_handleSelect:function(_16d,_16e){
if(!this[this._selectionHandlerName]||(_16d.type=="dgrid-cellfocusin"&&_16d.parentType=="mousedown")||(_16d.type=="mouseup"&&_16e!=this._waitForMouseUp)){
return;
}
this._waitForMouseUp=null;
this._selectionTriggerEvent=_16d;
if(!_16d.keyCode||!_16d.ctrlKey||_16d.keyCode==32){
if(!_16d.shiftKey&&_16d.type=="mousedown"&&this.isSelected(_16e)){
this._waitForMouseUp=_16e;
}else{
this[this._selectionHandlerName](_16d,_16e);
}
}
this._selectionTriggerEvent=null;
},_singleSelectionHandler:function(_16f,_170){
var _171=_16f.keyCode?_16f.ctrlKey:_16f[_162];
if(this._lastSelected===_170){
this.select(_170,null,!_171||!this.isSelected(_170));
}else{
this.clearSelection();
this.select(_170);
this._lastSelected=_170;
}
},_multipleSelectionHandler:function(_172,_173){
var _174=this._lastSelected,_175=_172.keyCode?_172.ctrlKey:_172[_162],_176;
if(!_172.shiftKey){
_176=_175?null:true;
_174=null;
}
this.select(_173,_174,_176);
if(!_174){
this._lastSelected=_173;
}
},_extendedSelectionHandler:function(_177,_178){
if(_177.button===2?!this.isSelected(_178):!(_177.keyCode?_177.ctrlKey:_177[_162])){
this.clearSelection(null,true);
}
this._multipleSelectionHandler(_177,_178);
},_toggleSelectionHandler:function(_179,_17a){
this.select(_17a,null,null);
},_initSelectionEvents:function(){
var grid=this,_17b=this.selectionDelegate;
if(has("touch")){
on(this.contentNode,_15d.selector(_17b,_15d.tap),function(evt){
grid._handleSelect(evt,this);
});
}else{
on(this.contentNode,on.selector(_17b,this.selectionEvents),function(_17c){
grid._handleSelect(_17c,this);
});
}
if(this.addKeyHandler){
this.addKeyHandler(32,function(_17d){
grid._handleSelect(_17d,_17d.target);
});
}
if(this.allowSelectAll){
this.on("keydown",function(_17e){
if(_17e[_162]&&_17e.keyCode==65){
_17e.preventDefault();
grid[grid.allSelected?"clearSelection":"selectAll"]();
}
});
}
_15c.before(this,"removeRow",function(_17f,_180){
var row;
if(!_180){
row=this.row(_17f);
if(row&&(row.id in this.selection)){
this.deselect(_17f);
}
}
});
},allowSelect:function(row){
return true;
},_selectionEventQueue:function(_181,type){
var grid=this,_182="dgrid-"+(_181?"select":"deselect"),rows=this[_182],_183=this._selectionTriggerEvent;
if(_183){
_183=_183.type;
}
if(rows){
return rows;
}
setTimeout(this._fireSelectionEvent=function(){
if(!rows){
return;
}
var _184={bubbles:true,grid:grid};
if(_183){
_184.parentType=_183;
}
_184[type]=rows;
on.emit(grid.contentNode,_182,_184);
rows=null;
delete grid[_182];
},0);
return (rows=this[_182]=[]);
},select:function(row,_185,_186){
if(_186===undefined){
_186=true;
}
if(!row.element){
row=this.row(row);
}
if(!_186||this.allowSelect(row)){
var _187=this.selection;
var _188=_187[row.id];
if(_186===null){
_186=!_188;
}
var _189=row.element;
if(!_186&&!this.allSelected){
delete this.selection[row.id];
}else{
_187[row.id]=_186;
}
if(_189){
if(_186){
put(_189,".dgrid-selected.ui-state-active");
}else{
put(_189,"!dgrid-selected!ui-state-active");
}
}
if(_186!=_188&&_189){
this._selectionEventQueue(_186,"rows").push(row);
}
if(_185){
if(!_185.element){
_185=this.row(_185);
}
var _18a=_185.element;
var _18b=row.element;
var _18c=(_18a&&(_18a.compareDocumentPosition?_18a.compareDocumentPosition(_18b)==2:_18a.sourceIndex>_18b.sourceIndex))?"down":"up";
while(row.element!=_18a&&(row=this[_18c](row))){
this.select(row,null,_186);
}
}
}
},deselect:function(row,_18d){
this.select(row,_18d,false);
},clearSelection:function(_18e,_18f){
this.allSelected=false;
for(var id in this.selection){
if(_18e!==id){
this.deselect(id);
}
}
if(!_18f){
this._lastSelected=null;
}
},selectAll:function(){
this.allSelected=true;
this.selection={};
for(var i in this._rowIdToObject){
var row=this.row(this._rowIdToObject[i]);
this.select(row.id);
}
},isSelected:function(_190){
if(typeof _190==="undefined"||_190===null){
return false;
}
if(!_190.element){
_190=this.row(_190);
}
return (_190.id in this.selection)?!!this.selection[_190.id]:this.allSelected&&(!_190.data||this.allowSelect(_190));
},refresh:function(){
if(this.deselectOnRefresh){
this.clearSelection();
this._fireSelectionEvent&&this._fireSelectionEvent();
}
this._lastSelected=null;
return this.inherited(arguments);
},renderArray:function(){
var grid=this,rows=this.inherited(arguments);
_15b.when(rows,function(rows){
var _191=grid.selection,i,row,_192;
for(i=0;i<rows.length;i++){
row=grid.row(rows[i]);
_192=row.id in _191?_191[row.id]:grid.allSelected;
if(_192){
grid.select(row,null,_192);
}
}
});
return rows;
}});
});
},"dgrid/_StoreMixin":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/on","dojo/aspect","put-selector/put"],function(_193,_194,lang,_195,_196,_197,put){
function noop(_198){
return _198;
};
function _199(err){
if(typeof err!=="object"){
err=new Error(err);
}
err.grid=this;
if(_196.emit(this.domNode,"dgrid-error",{grid:this,error:err,cancelable:true,bubbles:true})){
console.error(err);
}
};
return _194(null,{store:null,query:null,queryOptions:null,getBeforePut:true,noDataMessage:"",loadingMessage:"",constructor:function(){
this.query={};
this.queryOptions={};
this.dirty={};
this._updating={};
this._columnsWithSet={};
_197.before(this,"configStructure",lang.hitch(this,function(){
this._columnsWithSet={};
}));
},_configColumn:function(_19a){
if(_19a.set){
this._columnsWithSet[_19a.field]=_19a;
}
},_setStore:function(_19b,_19c,_19d){
this.store=_19b;
this.dirty={};
this.set("query",_19c,_19d);
},_setQuery:function(_19e,_19f){
var sort=_19f&&_19f.sort;
this.query=_19e!==undefined?_19e:this.query;
this.queryOptions=_19f||this.queryOptions;
sort?this.set("sort",sort):this.refresh();
},setStore:function(_1a0,_1a1,_1a2){
_193.deprecated("setStore(...)","use set(\"store\", ...) instead","dgrid 1.0");
this.set("store",_1a0,_1a1,_1a2);
},setQuery:function(_1a3,_1a4){
_193.deprecated("setQuery(...)","use set(\"query\", ...) instead","dgrid 1.0");
this.set("query",_1a3,_1a4);
},_getQueryOptions:function(){
var _1a5=lang.delegate(this.queryOptions,{});
if(this._sort.length){
_1a5.sort=this._sort;
}
return _1a5;
},_getQuery:function(){
var q=this.query;
return typeof q=="object"&&q!=null?lang.delegate(q,{}):q;
},_setSort:function(_1a6,_1a7){
if(this.store){
this._lastCollection=null;
}
this.inherited(arguments);
},insertRow:function(_1a8,_1a9,_1aa,i,_1ab){
var _1ac=this.store,_1ad=this.dirty,id=_1ac&&_1ac.getIdentity(_1a8),_1ae;
if(id in _1ad&&!(id in this._updating)){
_1ae=_1ad[id];
}
if(_1ae){
_1a8=lang.delegate(_1a8,_1ae);
}
return this.inherited(arguments);
},updateDirty:function(id,_1af,_1b0){
var _1b1=this.dirty,_1b2=_1b1[id];
if(!_1b2){
_1b2=_1b1[id]={};
}
_1b2[_1af]=_1b0;
},setDirty:function(id,_1b3,_1b4){
_193.deprecated("setDirty(...)","use updateDirty() instead","dgrid 1.0");
this.updateDirty(id,_1b3,_1b4);
},save:function(){
var self=this,_1b5=this.store,_1b6=this.dirty,dfd=new _195(),_1b7=dfd.promise,_1b8=function(id){
var data;
return (self.getBeforePut||!(data=self.row(id).data))?function(){
return _1b5.get(id);
}:function(){
return data;
};
};
function _1b9(id,_1ba){
return function(_1bb){
var _1bc=self._columnsWithSet,_1bd=self._updating,key,data;
if(typeof _1bb.set==="function"){
_1bb.set(_1ba);
}else{
for(key in _1ba){
_1bb[key]=_1ba[key];
}
}
for(key in _1bc){
data=_1bc[key].set(_1bb);
if(data!==undefined){
_1bb[key]=data;
}
}
_1bd[id]=true;
return _195.when(_1b5.put(_1bb),function(){
delete _1b6[id];
delete _1bd[id];
});
};
};
for(var id in _1b6){
var put=_1b9(id,_1b6[id]);
_1b7=_1b7.then(_1b8(id)).then(put);
}
dfd.resolve();
return _1b7;
},revert:function(){
this.dirty={};
this.refresh();
},_trackError:function(func){
var _1be;
if(typeof func=="string"){
func=lang.hitch(this,func);
}
try{
_1be=func();
}
catch(err){
_199.call(this,err);
}
return _195.when(_1be,noop,lang.hitch(this,_199));
},newRow:function(){
if(this.noDataNode){
put(this.noDataNode,"!");
delete this.noDataNode;
}
return this.inherited(arguments);
},removeRow:function(_1bf,_1c0){
var row={element:_1bf};
if(!_1c0&&this.noDataMessage&&(this.up(row).element===_1bf)&&(this.down(row).element===_1bf)){
this.noDataNode=put(this.contentNode,"div.dgrid-no-data");
this.noDataNode.innerHTML=this.noDataMessage;
}
return this.inherited(arguments);
}});
});
},"dgrid/OnDemandList":function(){
define(["./List","./_StoreMixin","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/on","./util/misc","put-selector/put"],function(List,_1c1,_1c2,lang,_1c3,_1c4,_1c5,put){
return _1c2([List,_1c1],{minRowsPerPage:25,maxRowsPerPage:250,maxEmptySpace:Infinity,bufferRows:10,farOffRemoval:2000,queryRowsOverlap:1,pagingMethod:"debounce",pagingDelay:_1c5.defaultDelay,keepScrollPosition:false,rowHeight:22,postCreate:function(){
this.inherited(arguments);
var self=this;
_1c4(this.bodyNode,"scroll",_1c5[this.pagingMethod](function(_1c6){
self._processScroll(_1c6);
},null,this.pagingDelay));
},renderQuery:function(_1c7,_1c8,_1c9){
var self=this,_1ca={query:_1c7,count:0,node:_1c8,options:_1c9},_1cb=this.preload,_1cc;
if(!_1c8){
var _1cd={node:put(this.contentNode,"div.dgrid-preload",{rowIndex:0}),count:0,query:_1c7,next:_1ca,options:_1c9};
_1cd.node.style.height="0";
_1ca.node=_1c8=put(this.contentNode,"div.dgrid-preload");
_1ca.previous=_1cd;
}
_1c8.rowIndex=this.minRowsPerPage;
if(_1cb){
if((_1ca.next=_1cb.next)&&this.bodyNode.scrollTop>=_1cb.node.offsetTop){
_1ca.previous=_1cb;
}else{
_1ca.next=_1cb;
_1ca.previous=_1cb.previous;
}
_1ca.previous.next=_1ca;
_1ca.next.previous=_1ca;
}else{
this.preload=_1ca;
}
var _1ce=put(_1c8,"-div.dgrid-loading"),_1cf=put(_1ce,"div.dgrid-below");
_1cf.innerHTML=this.loadingMessage;
function _1d0(err){
put(_1ce,"!");
if(err){
if(self._refreshDeferred){
self._refreshDeferred.reject(err);
delete self._refreshDeferred;
}
throw err;
}
};
_1c9=lang.mixin(this.get("queryOptions"),_1c9,{start:0,count:this.minRowsPerPage,query:_1c7});
this._trackError(function(){
return _1cc=_1c7(_1c9);
});
if(typeof _1cc==="undefined"){
_1d0();
return;
}
_1c3.when(self.renderArray(_1cc,_1c8,_1c9),function(trs){
var _1d1=typeof _1cc.total==="undefined"?_1cc.length:_1cc.total;
return _1c3.when(_1d1,function(_1d2){
put(_1ce,"!");
var _1d3=trs.length;
if(_1d2===0){
if(self.noDataNode){
put(self.noDataNode,"!");
delete self.noDataNode;
}
self.noDataNode=put(self.contentNode,"div.dgrid-no-data");
self.noDataNode.innerHTML=self.noDataMessage;
}
var _1d4=0;
for(var i=0;i<_1d3;i++){
_1d4+=self._calcRowHeight(trs[i]);
}
if(_1d3&&_1d4){
self.rowHeight=_1d4/_1d3;
}
_1d2-=_1d3;
_1ca.count=_1d2;
_1c8.rowIndex=_1d3;
if(_1d2){
_1c8.style.height=Math.min(_1d2*self.rowHeight,self.maxEmptySpace)+"px";
}else{
_1c8.style.display="none";
}
if(self._previousScrollPosition){
self.scrollTo(self._previousScrollPosition);
delete self._previousScrollPosition;
}
self._processScroll();
if(self._refreshDeferred){
self._refreshDeferred.resolve(_1cc);
delete self._refreshDeferred;
}
return trs;
},_1d0);
},_1d0);
return _1cc;
},refresh:function(_1d5){
var self=this,keep=(_1d5&&_1d5.keepScrollPosition),dfd,_1d6;
if(typeof keep==="undefined"){
keep=this.keepScrollPosition;
}
if(keep){
this._previousScrollPosition=this.getScrollPosition();
}
this.inherited(arguments);
if(this.store){
dfd=this._refreshDeferred=new _1c3();
_1d6=self.renderQuery(function(_1d7){
return self.store.query(self.query,_1d7);
});
if(typeof _1d6==="undefined"){
dfd.reject();
}
return dfd.then(function(_1d8){
setTimeout(function(){
_1c4.emit(self.domNode,"dgrid-refresh-complete",{bubbles:true,cancelable:false,grid:self,results:_1d8});
},0);
delete self._refreshDeferred;
return _1d8;
},function(err){
delete self._refreshDeferred;
throw err;
});
}
},resize:function(){
this.inherited(arguments);
this._processScroll();
},_calcRowHeight:function(_1d9){
var _1da=_1d9.previousSibling;
return _1da&&_1da.offsetTop!=_1d9.offsetTop?_1d9.offsetHeight:0;
},lastScrollTop:0,_processScroll:function(evt){
var grid=this,_1db=grid.bodyNode,_1dc=(evt&&evt.scrollTop)||this.getScrollPosition().y,_1dd=_1db.offsetHeight+_1dc,_1de,_1df,_1e0=grid.preload,_1e1=grid.lastScrollTop,_1e2=grid.bufferRows*grid.rowHeight,_1e3=_1e2-grid.rowHeight,_1e4,_1e5,_1e6;
var _1e7=1;
grid.lastScrollTop=_1dc;
function _1e8(_1e9,_1ea,_1eb,_1ec){
var _1ed=grid.farOffRemoval,_1df=_1e9.node;
if(_1ea>2*_1ed){
var row,_1ee=_1df[_1eb];
var _1ef=0;
var _1f0=0;
var _1f1=[];
while((row=_1ee)){
var _1f2=grid._calcRowHeight(row);
if(_1ef+_1f2+_1ed>_1ea||(_1ee.className.indexOf("dgrid-row")<0&&_1ee.className.indexOf("dgrid-loading")<0)){
break;
}
var _1ee=row[_1eb];
var _1f3,_1f4=row.observerIndex;
if(_1f4!=_1f3&&_1f3>-1){
var _1f5=grid.observers;
var _1f6=_1f5[_1f3];
_1f6&&_1f6.cancel();
_1f5[_1f3]=0;
}
_1ef+=_1f2;
_1f0+=row.count||1;
_1f3=_1f4;
grid.removeRow(row,true);
_1f1.push(row);
}
_1e9.count+=_1f0;
if(_1ec){
_1df.rowIndex-=_1f0;
_1f7(_1e9);
}else{
_1df.style.height=(_1df.offsetHeight+_1ef)+"px";
}
var _1f8=put("div",_1f1);
setTimeout(function(){
put(_1f8,"!");
},1);
}
};
function _1f7(_1f9,_1fa){
_1f9.node.style.height=Math.min(_1f9.count*grid.rowHeight,_1fa?Infinity:grid.maxEmptySpace)+"px";
};
while(_1e0&&!_1e0.node.offsetWidth){
_1e0=_1e0.previous;
}
while(_1e0&&_1e0!=_1de){
_1de=grid.preload;
grid.preload=_1e0;
_1df=_1e0.node;
var _1fb=_1df.offsetTop;
var _1fc;
if(_1dd+_1e7+_1e3<_1fb){
do{
_1e0=_1e0.previous;
}while(_1e0&&!_1e0.node.offsetWidth);
}else{
if(_1dc-_1e7-_1e3>(_1fb+(_1fc=_1df.offsetHeight))){
do{
_1e0=_1e0.next;
}while(_1e0&&!_1e0.node.offsetWidth);
}else{
var _1fd=((_1df.rowIndex?_1dc-_1e2:_1dd)-_1fb)/grid.rowHeight;
var _1fe=(_1dd-_1dc+2*_1e2)/grid.rowHeight;
var _1ff=Math.max(Math.min((_1dc-_1e1)*grid.rowHeight,grid.maxRowsPerPage/2),grid.maxRowsPerPage/-2);
_1fe+=Math.min(Math.abs(_1ff),10);
if(_1df.rowIndex==0){
_1fd-=_1fe;
}
_1fd=Math.max(_1fd,0);
if(_1fd<10&&_1fd>0&&_1fe+_1fd<grid.maxRowsPerPage){
_1fe+=Math.max(0,_1fd);
_1fd=0;
}
_1fe=Math.min(Math.max(_1fe,grid.minRowsPerPage),grid.maxRowsPerPage,_1e0.count);
if(_1fe==0){
return;
}
_1fe=Math.ceil(_1fe);
_1fd=Math.min(Math.floor(_1fd),_1e0.count-_1fe);
var _200=lang.mixin(grid.get("queryOptions"),_1e0.options);
_1e0.count-=_1fe;
var _201=_1df,_202,_203=grid.queryRowsOverlap,_204=_1df.rowIndex>0&&_1e0;
if(_204){
var _205=_1e0.previous;
if(_205){
_1e8(_205,_1dc-(_205.node.offsetTop+_205.node.offsetHeight),"nextSibling");
if(_1fd>0&&_205.node==_1df.previousSibling){
_1fd=Math.min(_1e0.count,_1fd);
_1e0.previous.count+=_1fd;
_1f7(_1e0.previous,true);
_1df.rowIndex+=_1fd;
_203=0;
}else{
_1fe+=_1fd;
}
_1e0.count-=_1fd;
}
_200.start=_1df.rowIndex-_203;
_1df.rowIndex+=_1fe;
}else{
if(_1e0.next){
_1e8(_1e0.next,_1e0.next.node.offsetTop-_1dd,"previousSibling",true);
var _201=_1df.nextSibling;
if(_201==_1e0.next.node){
_1e0.next.count+=_1e0.count-_1fd;
_1e0.next.node.rowIndex=_1fd+_1fe;
_1f7(_1e0.next);
_1e0.count=_1fd;
_203=0;
}else{
_202=true;
}
}
_200.start=_1e0.count;
}
_200.count=Math.min(_1fe+_203,grid.maxRowsPerPage);
if(_202&&_201&&_201.offsetWidth){
_202=_201.offsetTop;
}
_1f7(_1e0);
var _206=put(_201,"-div.dgrid-loading[style=height:"+_1fe*grid.rowHeight+"px]"),_207=put(_206,"div.dgrid-"+(_204?"below":"above"));
_207.innerHTML=grid.loadingMessage;
_206.count=_1fe;
_206.blockRowIndex=true;
_200.query=_1e0.query;
var _208=_1e0.query(_200),_209=grid._trackError(function(){
return _208;
});
if(_209===undefined){
put(_206,"!");
return;
}
(function(_20a,_20b,_20c,_20d,_20e){
_1e6=_1c3.when(grid.renderArray(_20e,_20a,_200),function(rows){
_1e5=_20e;
_201=_20a.nextSibling;
put(_20a,"!");
if(_20d&&_201&&_201.offsetWidth){
var pos=grid.getScrollPosition();
grid.scrollTo({x:pos.x,y:pos.y+_201.offsetTop-_20d,preserveMomentum:true});
}
if(_20c){
_1c3.when(_20e.total||_20e.length,function(_20f){
_20c.count=_20f-_20c.node.rowIndex;
_1f7(_20c);
});
}
grid._processScroll();
return rows;
},function(e){
put(_20a,"!");
throw e;
});
}).call(this,_206,_1db,_204,_202,_208);
_1e0=_1e0.previous;
}
}
}
if(_1e6&&(_1e4=this._refreshDeferred)){
delete this._refreshDeferred;
_1c3.when(_1e6,function(){
_1e4.resolve(_1e5);
});
}
}});
});
},"put-selector/put":function(){
(function(_210){
var _211,_212=/[-+,> ]/;
_210([],_211=function(doc,_213){
"use strict";
_212=_213||_212;
var _214=/(?:\s*([-+ ,<>]))?\s*(\.|!\.?|#)?([-\w%$]+)?(?:\[([^\]=]+)=?['"]?([^\]'"]*)['"]?\])?/g,_215,doc=doc||document,_216=typeof doc.createElement=="object";
function _217(_218,text){
_218.appendChild(doc.createTextNode(text));
};
function put(_219){
var _21a,_21b,_21c,_21d,_21e,args=arguments,_21f=args[0];
function _220(){
if(_21e&&_21d&&_21e!=_21d){
(_21d==_219&&(_21a||(_21a=_212.test(_221)&&doc.createDocumentFragment()))||_21d).insertBefore(_21e,_21c||null);
}
};
for(var i=0;i<args.length;i++){
var _221=args[i];
if(typeof _221=="object"){
_21b=false;
if(_221 instanceof Array){
_21e=doc.createDocumentFragment();
for(var key=0;key<_221.length;key++){
_21e.appendChild(put(_221[key]));
}
_221=_21e;
}
if(_221.nodeType){
_21e=_221;
_220();
_21d=_221;
_21c=0;
}else{
for(var key in _221){
_21e[key]=_221[key];
}
}
}else{
if(_21b){
_21b=false;
_217(_21e,_221);
}else{
if(i<1){
_219=null;
}
_21b=true;
var _222=_221.replace(_214,function(t,_223,_224,_225,_226,_227){
if(_223){
_220();
if(_223=="-"||_223=="+"){
_21d=(_21c=(_21e||_21d)).parentNode;
_21e=null;
if(_223=="+"){
_21c=_21c.nextSibling;
}
}else{
if(_223=="<"){
_21d=_21e=(_21e||_21d).parentNode;
}else{
if(_223==","){
_21d=_219;
}else{
if(_21e){
_21d=_21e;
}
}
_21e=null;
}
_21c=0;
}
if(_21e){
_21d=_21e;
}
}
var tag=!_224&&_225;
if(tag||(!_21e&&(_224||_226))){
if(tag=="$"){
_217(_21d,args[++i]);
}else{
tag=tag||put.defaultTag;
var _228=_216&&args[i+1]&&args[i+1].name;
if(_228){
tag="<"+tag+" name=\""+_228+"\">";
}
_21e=doc.createElement(tag);
}
}
if(_224){
if(_225=="$"){
_225=args[++i];
}
if(_224=="#"){
_21e.id=_225;
}else{
var _229=_21e.className;
var _22a=_229&&(" "+_229+" ").replace(" "+_225+" "," ");
if(_224=="."){
_21e.className=_229?(_22a+_225).substring(1):_225;
}else{
if(_221=="!"){
put("div",_21e,"<").innerHTML="";
}else{
_22a=_22a.substring(1,_22a.length-1);
if(_22a!=_229){
_21e.className=_22a;
}
}
}
}
}
if(_226){
if(_227=="$"){
_227=args[++i];
}
if(_226=="style"){
_21e.style.cssText=_227;
}else{
_21e[_226.charAt(0)=="!"?(_226=_226.substring(1))&&"removeAttribute":"setAttribute"](_226,_227===""?_226:_227);
}
}
return "";
});
if(_222){
throw new SyntaxError("Unexpected char "+_222+" in "+_221);
}
_220();
_21d=_21f=_21e||_21d;
}
}
}
if(_219&&_21a){
_219.appendChild(_21a);
}
return _21f;
};
put.defaultTag="div";
put.forDocument=_211;
return put;
});
})(typeof define=="undefined"?function(deps,_22b){
if(typeof window=="undefined"){
require("./node-html")(module,_22b);
}else{
put=_22b();
}
}:define);
},"dgrid/Grid":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/on","dojo/has","put-selector/put","./List","./util/misc","dojo/_base/sniff"],function(_22c,_22d,_22e,has,put,List,_22f){
var _230=has("ie")<8&&!has("quirks");
var _231=/[^\._a-zA-Z0-9-]/g;
function _232(_233,_234){
if(_234&&_234.nodeType){
_233.appendChild(_234);
}
};
var Grid=_22d(List,{columns:null,cellNavigation:true,tabableHeader:true,showHeader:true,column:function(_235){
if(typeof _235=="string"){
return this.columns[_235];
}else{
return this.cell(_235).column;
}
},listType:"grid",cell:function(_236,_237){
if(_236.column&&_236.element){
return _236;
}
if(_236.target&&_236.target.nodeType){
_236=_236.target;
}
var _238;
if(_236.nodeType){
var _239;
do{
if(this._rowIdToObject[_236.id]){
break;
}
var _23a=_236.columnId;
if(_23a){
_237=_23a;
_238=_236;
break;
}
_236=_236.parentNode;
}while(_236&&_236!=this.domNode);
}
if(!_238&&typeof _237!="undefined"){
var row=this.row(_236),_23b=row.element;
if(_23b){
var _23c=_23b.getElementsByTagName("td");
for(var i=0;i<_23c.length;i++){
if(_23c[i].columnId==_237){
_238=_23c[i];
break;
}
}
}
}
if(_236!=null){
return {row:row||this.row(_236),column:_237&&this.column(_237),element:_238};
}
},createRowCells:function(tag,each,_23d){
var row=put("table.dgrid-row-table[role=presentation]"),_23e=this.cellNavigation,_23f=(has("ie")<9||has("quirks"))?put(row,"tbody"):row,tr,si,sl,i,l,_240,_241,id,_242,cell,_243,_244,_245;
_23d=_23d||this.subRows;
for(si=0,sl=_23d.length;si<sl;si++){
_240=_23d[si];
tr=put(_23f,"tr");
if(_240.className){
put(tr,"."+_240.className);
}
for(i=0,l=_240.length;i<l;i++){
_241=_240[i];
id=_241.id;
_242=_241.className||(_241.field&&"field-"+_241.field);
cell=put(tag+(".dgrid-cell.dgrid-cell-padding"+(id?".dgrid-column-"+id:"")+(_242?"."+_242:"")).replace(_231,"-")+"[role="+(tag==="th"?"columnheader":"gridcell")+"]");
cell.columnId=id;
if(_230){
_243=put(cell,"!dgrid-cell-padding div.dgrid-cell-padding");
cell.contents=_243;
}else{
_243=cell;
}
_244=_241.colSpan;
if(_244){
cell.colSpan=_244;
}
_245=_241.rowSpan;
if(_245){
cell.rowSpan=_245;
}
each(_243,_241);
tr.appendChild(cell);
}
}
return row;
},left:function(cell,_246){
if(!cell.element){
cell=this.cell(cell);
}
return this.cell(this._move(cell,-(_246||1),"dgrid-cell"));
},right:function(cell,_247){
if(!cell.element){
cell=this.cell(cell);
}
return this.cell(this._move(cell,_247||1,"dgrid-cell"));
},renderRow:function(_248,_249){
var self=this;
var row=this.createRowCells("td",function(td,_24a){
var data=_248;
if(_24a.get){
data=_24a.get(_248);
}else{
if("field" in _24a&&_24a.field!="_item"){
data=data[_24a.field];
}
}
if(_24a.renderCell){
_232(td,_24a.renderCell(_248,data,td,_249));
}else{
_24b.call(_24a,_248,data,td,_249);
}
},_249&&_249.subRows);
return put("div[role=row]>",row);
},renderHeader:function(){
var grid=this,_24c=this.columns,_24d=this.headerNode,i=_24d.childNodes.length;
_24d.setAttribute("role","row");
while(i--){
put(_24d.childNodes[i],"!");
}
var row=this.createRowCells("th",function(th,_24e){
var _24f=_24e.headerNode=th;
if(_230){
th=th.parentNode;
}
var _250=_24e.field;
if(_250){
th.field=_250;
}
if(_24e.renderHeaderCell){
_232(_24f,_24e.renderHeaderCell(_24f));
}else{
if(_24e.label||_24e.field){
_24f.appendChild(document.createTextNode(_24e.label||_24e.field));
}
}
if(_24e.sortable!==false&&_250&&_250!="_item"){
th.sortable=true;
th.className+=" dgrid-sortable";
}
},this.subRows&&this.subRows.headerRows);
this._rowIdToObject[row.id=this.id+"-header"]=this.columns;
_24d.appendChild(row);
if(this._sortListener){
this._sortListener.remove();
}
this._sortListener=_22e(row,"click,keydown",function(_251){
if(_251.type=="click"||_251.keyCode==32||(!has("opera")&&_251.keyCode==13)){
var _252=_251.target,_253,sort,_254,_255;
do{
if(_252.sortable){
_254=[{attribute:(_253=_252.field||_252.columnId),descending:(sort=grid._sort[0])&&sort.attribute==_253&&!sort.descending}];
_255={bubbles:true,cancelable:true,grid:grid,parentType:_251.type,sort:_254};
if(_22e.emit(_251.target,"dgrid-sort",_255)){
grid._sortNode=_252;
grid.set("sort",_254);
}
break;
}
}while((_252=_252.parentNode)&&_252!=_24d);
}
});
},resize:function(){
var _256=this.headerNode.firstChild,_257=this.contentNode,_258;
this.inherited(arguments);
if(!has("ie")||(has("ie")>7&&!has("quirks"))){
_257.style.width="";
if(_257&&_256){
if((_258=_256.offsetWidth)!=_257.offsetWidth){
_257.style.width=_258+"px";
}
}
}
},destroy:function(){
this._destroyColumns();
if(this._sortListener){
this._sortListener.remove();
}
this.inherited(arguments);
},_setSort:function(_259,_25a){
this.inherited(arguments);
this.updateSortArrow(this._sort);
},updateSortArrow:function(sort,_25b){
if(this._lastSortedArrow){
put(this._lastSortedArrow,"<!dgrid-sort-up!dgrid-sort-down");
put(this._lastSortedArrow,"!");
delete this._lastSortedArrow;
}
if(_25b){
this._sort=sort;
}
if(!sort[0]){
return;
}
var prop=sort[0].attribute,desc=sort[0].descending,_25c=this._sortNode,_25d,_25e,i;
delete this._sortNode;
if(!_25c){
_25d=this.columns;
for(i in _25d){
_25e=_25d[i];
if(_25e.field==prop){
_25c=_25e.headerNode;
break;
}
}
}
if(_25c){
_25c=_25c.contents||_25c;
this._lastSortedArrow=put(_25c.firstChild,"-div.dgrid-sort-arrow.ui-icon[role=presentation]");
this._lastSortedArrow.innerHTML="&nbsp;";
put(_25c,desc?".dgrid-sort-down":".dgrid-sort-up");
this.resize();
}
},styleColumn:function(_25f,css){
return this.addCssRule("#"+_22f.escapeCssIdentifier(this.domNode.id)+" .dgrid-column-"+_25f,css);
},_configColumns:function(_260,_261){
var _262=[],_263=_261 instanceof Array,_264,_265;
for(_264 in _261){
_265=_261[_264];
if(typeof _265=="string"){
_261[_264]=_265={label:_265};
}
if(!_263&&!_265.field){
_265.field=_264;
}
_264=_265.id=_265.id||(isNaN(_264)?_264:(_260+_264));
if(_263){
this.columns[_264]=_265;
}
if(this._configColumn){
this._configColumn(_265,_264,_261,_260);
}
_265.grid=this;
if(typeof _265.init==="function"){
_265.init();
}
_262.push(_265);
}
return _263?_261:_262;
},_destroyColumns:function(){
var _266=this.subRows,_267=_266&&_266.length,i,j,_268,len;
this.cleanup();
for(i=0;i<_267;i++){
for(j=0,len=_266[i].length;j<len;j++){
_268=_266[i][j];
if(typeof _268.destroy==="function"){
_268.destroy();
}
}
}
},configStructure:function(){
var _269=this.subRows,_26a=this._columns=this.columns;
this.columns=!_26a||_26a instanceof Array?{}:_26a;
if(_269){
for(var i=0;i<_269.length;i++){
_269[i]=this._configColumns(i+"-",_269[i]);
}
}else{
this.subRows=[this._configColumns("",_26a)];
}
},_getColumns:function(){
return this._columns||this.columns;
},_setColumns:function(_26b){
this._destroyColumns();
this.subRows=null;
this.columns=_26b;
this._updateColumns();
},_setSubRows:function(_26c){
this._destroyColumns();
this.subRows=_26c;
this._updateColumns();
},setColumns:function(_26d){
_22c.deprecated("setColumns(...)","use set(\"columns\", ...) instead","dgrid 1.0");
this.set("columns",_26d);
},setSubRows:function(_26e){
_22c.deprecated("setSubRows(...)","use set(\"subRows\", ...) instead","dgrid 1.0");
this.set("subRows",_26e);
},_updateColumns:function(){
this.configStructure();
this.renderHeader();
this.refresh();
this._lastCollection&&this.renderArray(this._lastCollection);
if(this._started){
if(this._sort&&this._sort.length){
this.updateSortArrow(this._sort);
}else{
this.resize();
}
}
}});
function _24b(_26f,data,td,_270){
if(this.formatter){
var _271=this.formatter,_272=this.grid.formatterScope;
td.innerHTML=typeof _271==="string"&&_272?_272[_271](data,_26f):_271(data,_26f);
}else{
if(data!=null){
td.appendChild(document.createTextNode(data));
}
}
};
Grid.appendIfNode=_232;
Grid.defaultRenderCell=_24b;
return Grid;
});
}}});
define("dojo/layers/dgrid",[],1);
