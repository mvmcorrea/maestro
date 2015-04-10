//>>built
require({cache:{"dijit/layout/BorderContainer":function(){
define(["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/on","dojo/touch","../_WidgetBase","../_Widget","../_TemplatedMixin","./LayoutContainer","./utils"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,on,_a,_b,_c,_d,_e,_f){
var _10=_3("dijit.layout._Splitter",[_c,_d],{live:true,templateString:"<div class=\"dijitSplitter\" data-dojo-attach-event=\"onkeydown:_onKeyDown,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>",constructor:function(){
this._handlers=[];
},postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
this._factor=/top|left/.test(this.region)?1:-1;
this._cookieName=this.container.id+"_"+this.region;
},buildRendering:function(){
this.inherited(arguments);
_4.add(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V"));
if(this.container.persist){
var _11=_2(this._cookieName);
if(_11){
this.child.domNode.style[this.horizontal?"height":"width"]=_11;
}
}
},_computeMaxSize:function(){
var dim=this.horizontal?"h":"w",_12=_6.getMarginBox(this.child.domNode)[dim],_13=_1.filter(this.container.getChildren(),function(_14){
return _14.region=="center";
})[0];
var _15=_6.getContentBox(_13.domNode)[dim]-10;
return Math.min(this.child.maxSize,_12+_15);
},_startDrag:function(e){
if(!this.cover){
this.cover=_5.place("<div class=dijitSplitterCover></div>",this.child.domNode,"after");
}
_4.add(this.cover,"dijitSplitterCoverActive");
if(this.fake){
_5.destroy(this.fake);
}
if(!(this._resize=this.live)){
(this.fake=this.domNode.cloneNode(true)).removeAttribute("id");
_4.add(this.domNode,"dijitSplitterShadow");
_5.place(this.fake,this.domNode,"after");
}
_4.add(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active");
if(this.fake){
_4.remove(this.fake,"dijitSplitterHover dijitSplitter"+(this.horizontal?"H":"V")+"Hover");
}
var _16=this._factor,_17=this.horizontal,_18=_17?"pageY":"pageX",_19=e[_18],_1a=this.domNode.style,dim=_17?"h":"w",_1b=_7.getComputedStyle(this.child.domNode),_1c=_6.getMarginBox(this.child.domNode,_1b)[dim],max=this._computeMaxSize(),min=Math.max(this.child.minSize,_6.getPadBorderExtents(this.child.domNode,_1b)[dim]+10),_1d=this.region,_1e=_1d=="top"||_1d=="bottom"?"top":"left",_1f=parseInt(_1a[_1e],10),_20=this._resize,_21=_9.hitch(this.container,"_layoutChildren",this.child.id),de=this.ownerDocument;
this._handlers=this._handlers.concat([on(de,_a.move,this._drag=function(e,_22){
var _23=e[_18]-_19,_24=_16*_23+_1c,_25=Math.max(Math.min(_24,max),min);
if(_20||_22){
_21(_25);
}
_1a[_1e]=_23+_1f+_16*(_25-_24)+"px";
}),on(de,"dragstart",function(e){
e.stopPropagation();
e.preventDefault();
}),on(this.ownerDocumentBody,"selectstart",function(e){
e.stopPropagation();
e.preventDefault();
}),on(de,_a.release,_9.hitch(this,"_stopDrag"))]);
e.stopPropagation();
e.preventDefault();
},_onMouse:function(e){
var o=(e.type=="mouseover"||e.type=="mouseenter");
_4.toggle(this.domNode,"dijitSplitterHover",o);
_4.toggle(this.domNode,"dijitSplitter"+(this.horizontal?"H":"V")+"Hover",o);
},_stopDrag:function(e){
try{
if(this.cover){
_4.remove(this.cover,"dijitSplitterCoverActive");
}
if(this.fake){
_5.destroy(this.fake);
}
_4.remove(this.domNode,"dijitSplitterActive dijitSplitter"+(this.horizontal?"H":"V")+"Active dijitSplitterShadow");
this._drag(e);
this._drag(e,true);
}
finally{
this._cleanupHandlers();
delete this._drag;
}
if(this.container.persist){
_2(this._cookieName,this.child.domNode.style[this.horizontal?"height":"width"],{expires:365});
}
},_cleanupHandlers:function(){
var h;
while(h=this._handlers.pop()){
h.remove();
}
},_onKeyDown:function(e){
this._resize=true;
var _26=this.horizontal;
var _27=1;
switch(e.keyCode){
case _26?_8.UP_ARROW:_8.LEFT_ARROW:
_27*=-1;
case _26?_8.DOWN_ARROW:_8.RIGHT_ARROW:
break;
default:
return;
}
var _28=_6.getMarginSize(this.child.domNode)[_26?"h":"w"]+this._factor*_27;
this.container._layoutChildren(this.child.id,Math.max(Math.min(_28,this._computeMaxSize()),this.child.minSize));
e.stopPropagation();
e.preventDefault();
},destroy:function(){
this._cleanupHandlers();
delete this.child;
delete this.container;
delete this.cover;
delete this.fake;
this.inherited(arguments);
}});
var _29=_3("dijit.layout._Gutter",[_c,_d],{templateString:"<div class=\"dijitGutter\" role=\"presentation\"></div>",postMixInProperties:function(){
this.inherited(arguments);
this.horizontal=/top|bottom/.test(this.region);
},buildRendering:function(){
this.inherited(arguments);
_4.add(this.domNode,"dijitGutter"+(this.horizontal?"H":"V"));
}});
var _2a=_3("dijit.layout.BorderContainer",_e,{gutters:true,liveSplitters:true,persist:false,baseClass:"dijitBorderContainer",_splitterClass:_10,postMixInProperties:function(){
if(!this.gutters){
this.baseClass+="NoGutter";
}
this.inherited(arguments);
},_setupChild:function(_2b){
this.inherited(arguments);
var _2c=_2b.region,ltr=_2b.isLeftToRight();
if(_2c=="leading"){
_2c=ltr?"left":"right";
}
if(_2c=="trailing"){
_2c=ltr?"right":"left";
}
if(_2c){
if(_2c!="center"&&(_2b.splitter||this.gutters)&&!_2b._splitterWidget){
var _2d=_2b.splitter?this._splitterClass:_29;
if(_9.isString(_2d)){
_2d=_9.getObject(_2d);
}
var _2e=new _2d({id:_2b.id+"_splitter",container:this,child:_2b,region:_2c,live:this.liveSplitters});
_2e.isSplitter=true;
_2b._splitterWidget=_2e;
var _2f=_2c=="bottom"||_2c==(this.isLeftToRight()?"right":"left");
_5.place(_2e.domNode,_2b.domNode,_2f?"before":"after");
_2e.startup();
}
}
},layout:function(){
this._layoutChildren();
},removeChild:function(_30){
var _31=_30._splitterWidget;
if(_31){
_31.destroy();
delete _30._splitterWidget;
}
this.inherited(arguments);
},getChildren:function(){
return _1.filter(this.inherited(arguments),function(_32){
return !_32.isSplitter;
});
},getSplitter:function(_33){
return _1.filter(this.getChildren(),function(_34){
return _34.region==_33;
})[0]._splitterWidget;
},resize:function(_35,_36){
if(!this.cs||!this.pe){
var _37=this.domNode;
this.cs=_7.getComputedStyle(_37);
this.pe=_6.getPadExtents(_37,this.cs);
this.pe.r=_7.toPixelValue(_37,this.cs.paddingRight);
this.pe.b=_7.toPixelValue(_37,this.cs.paddingBottom);
_7.set(_37,"padding","0px");
}
this.inherited(arguments);
},_layoutChildren:function(_38,_39){
if(!this._borderBox||!this._borderBox.h){
return;
}
var _3a=[];
_1.forEach(this._getOrderedChildren(),function(_3b){
_3a.push(_3b);
if(_3b._splitterWidget){
_3a.push(_3b._splitterWidget);
}
});
var dim={l:this.pe.l,t:this.pe.t,w:this._borderBox.w-this.pe.w,h:this._borderBox.h-this.pe.h};
_f.layoutChildren(this.domNode,dim,_3a,_38,_39);
},destroyRecursive:function(){
_1.forEach(this.getChildren(),function(_3c){
var _3d=_3c._splitterWidget;
if(_3d){
_3d.destroy();
}
delete _3c._splitterWidget;
});
this.inherited(arguments);
}});
_2a.ChildWidgetProperties={splitter:false,minSize:0,maxSize:Infinity};
_9.mixin(_2a.ChildWidgetProperties,_e.ChildWidgetProperties);
_9.extend(_b,_2a.ChildWidgetProperties);
_2a._Splitter=_10;
_2a._Gutter=_29;
return _2a;
});
},"dijit/layout/ScrollingTabController":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/_base/lang","dojo/on","dojo/query","dojo/sniff","../registry","dojo/text!./templates/ScrollingTabController.html","dojo/text!./templates/_ScrollingTabControllerButton.html","./TabController","./utils","../_WidgetsInTemplateMixin","../Menu","../MenuItem","../form/Button","../_HasDropDown","dojo/NodeList-dom","../a11yclick"],function(_3e,_3f,_40,_41,_42,fx,_43,on,_44,has,_45,_46,_47,_48,_49,_4a,_4b,_4c,_4d,_4e){
var _4f=_3f("dijit.layout.ScrollingTabController",[_48,_4a],{baseClass:"dijitTabController dijitScrollingTabController",templateString:_46,useMenu:true,useSlider:true,tabStripClass:"",_minScroll:5,_setClassAttr:{node:"containerNode",type:"class"},buildRendering:function(){
this.inherited(arguments);
var n=this.domNode;
this.scrollNode=this.tablistWrapper;
this._initButtons();
if(!this.tabStripClass){
this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"")+"None";
_40.add(n,"tabStrip-disabled");
}
_40.add(this.tablistWrapper,this.tabStripClass);
},onStartup:function(){
this.inherited(arguments);
_42.set(this.domNode,"visibility","");
this._postStartup=true;
this.own(on(this.containerNode,"attrmodified-label, attrmodified-iconclass",_43.hitch(this,function(evt){
if(this._dim){
this.resize(this._dim);
}
})));
},onAddChild:function(_50,_51){
this.inherited(arguments);
_42.set(this.containerNode,"width",(_42.get(this.containerNode,"width")+200)+"px");
},onRemoveChild:function(_52,_53){
var _54=this.pane2button(_52.id);
if(this._selectedTab===_54.domNode){
this._selectedTab=null;
}
this.inherited(arguments);
},_initButtons:function(){
this._btnWidth=0;
this._buttons=_44("> .tabStripButton",this.domNode).filter(function(btn){
if((this.useMenu&&btn==this._menuBtn.domNode)||(this.useSlider&&(btn==this._rightBtn.domNode||btn==this._leftBtn.domNode))){
this._btnWidth+=_41.getMarginSize(btn).w;
return true;
}else{
_42.set(btn,"display","none");
return false;
}
},this);
},_getTabsWidth:function(){
var _55=this.getChildren();
if(_55.length){
var _56=_55[this.isLeftToRight()?0:_55.length-1].domNode,_57=_55[this.isLeftToRight()?_55.length-1:0].domNode;
return _57.offsetLeft+_57.offsetWidth-_56.offsetLeft;
}else{
return 0;
}
},_enableBtn:function(_58){
var _59=this._getTabsWidth();
_58=_58||_42.get(this.scrollNode,"width");
return _59>0&&_58<_59;
},resize:function(dim){
this._dim=dim;
this.scrollNode.style.height="auto";
var cb=this._contentBox=_49.marginBox2contentBox(this.domNode,{h:0,w:dim.w});
cb.h=this.scrollNode.offsetHeight;
_41.setContentSize(this.domNode,cb);
var _5a=this._enableBtn(this._contentBox.w);
this._buttons.style("display",_5a?"":"none");
this._leftBtn.region="left";
this._rightBtn.region="right";
this._menuBtn.region=this.isLeftToRight()?"right":"left";
_49.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,region:"center"}]);
if(this._selectedTab){
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
this.scrollNode.scrollLeft=this._convertToScrollLeft(this._getScrollForSelectedTab());
}
this._setButtonClass(this._getScroll());
this._postResize=true;
return {h:this._contentBox.h,w:dim.w};
},_getScroll:function(){
return (this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit"))?this.scrollNode.scrollLeft:_42.get(this.containerNode,"width")-_42.get(this.scrollNode,"width")+(has("ie")>=8?-1:1)*this.scrollNode.scrollLeft;
},_convertToScrollLeft:function(val){
if(this.isLeftToRight()||has("ie")<8||(has("ie")&&has("quirks"))||has("webkit")){
return val;
}else{
var _5b=_42.get(this.containerNode,"width")-_42.get(this.scrollNode,"width");
return (has("ie")>=8?-1:1)*(val-_5b);
}
},onSelectChild:function(_5c){
var tab=this.pane2button(_5c.id);
if(!tab){
return;
}
var _5d=tab.domNode;
if(_5d!=this._selectedTab){
this._selectedTab=_5d;
if(this._postResize){
var sl=this._getScroll();
if(sl>_5d.offsetLeft||sl+_42.get(this.scrollNode,"width")<_5d.offsetLeft+_42.get(_5d,"width")){
this.createSmoothScroll().play();
}
}
}
this.inherited(arguments);
},_getScrollBounds:function(){
var _5e=this.getChildren(),_5f=_42.get(this.scrollNode,"width"),_60=_42.get(this.containerNode,"width"),_61=_60-_5f,_62=this._getTabsWidth();
if(_5e.length&&_62>_5f){
return {min:this.isLeftToRight()?0:_5e[_5e.length-1].domNode.offsetLeft,max:this.isLeftToRight()?(_5e[_5e.length-1].domNode.offsetLeft+_5e[_5e.length-1].domNode.offsetWidth)-_5f:_61};
}else{
var _63=this.isLeftToRight()?0:_61;
return {min:_63,max:_63};
}
},_getScrollForSelectedTab:function(){
var w=this.scrollNode,n=this._selectedTab,_64=_42.get(this.scrollNode,"width"),_65=this._getScrollBounds();
var pos=(n.offsetLeft+_42.get(n,"width")/2)-_64/2;
pos=Math.min(Math.max(pos,_65.min),_65.max);
return pos;
},createSmoothScroll:function(x){
if(arguments.length>0){
var _66=this._getScrollBounds();
x=Math.min(Math.max(x,_66.min),_66.max);
}else{
x=this._getScrollForSelectedTab();
}
if(this._anim&&this._anim.status()=="playing"){
this._anim.stop();
}
var _67=this,w=this.scrollNode,_68=new fx.Animation({beforeBegin:function(){
if(this.curve){
delete this.curve;
}
var _69=w.scrollLeft,_6a=_67._convertToScrollLeft(x);
_68.curve=new fx._Line(_69,_6a);
},onAnimate:function(val){
w.scrollLeft=val;
}});
this._anim=_68;
this._setButtonClass(x);
return _68;
},_getBtnNode:function(e){
var n=e.target;
while(n&&!_40.contains(n,"tabStripButton")){
n=n.parentNode;
}
return n;
},doSlideRight:function(e){
this.doSlide(1,this._getBtnNode(e));
},doSlideLeft:function(e){
this.doSlide(-1,this._getBtnNode(e));
},doSlide:function(_6b,_6c){
if(_6c&&_40.contains(_6c,"dijitTabDisabled")){
return;
}
var _6d=_42.get(this.scrollNode,"width");
var d=(_6d*0.75)*_6b;
var to=this._getScroll()+d;
this._setButtonClass(to);
this.createSmoothScroll(to).play();
},_setButtonClass:function(_6e){
var _6f=this._getScrollBounds();
this._leftBtn.set("disabled",_6e<=_6f.min);
this._rightBtn.set("disabled",_6e>=_6f.max);
}});
var _70=_3f("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:_47,tabIndex:"",isFocusable:function(){
return false;
}});
_3f("dijit.layout._ScrollingTabControllerButton",[_4d,_70]);
_3f("dijit.layout._ScrollingTabControllerMenuButton",[_4d,_4e,_70],{containerId:"",tabIndex:"-1",isLoaded:function(){
return false;
},loadDropDown:function(_71){
this.dropDown=new _4b({id:this.containerId+"_menu",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir});
var _72=_45.byId(this.containerId);
_3e.forEach(_72.getChildren(),function(_73){
var _74=new _4c({id:_73.id+"_stcMi",label:_73.title,iconClass:_73.iconClass,disabled:_73.disabled,ownerDocument:this.ownerDocument,dir:_73.dir,lang:_73.lang,textDir:_73.textDir||_72.textDir,onClick:function(){
_72.selectChild(_73);
}});
this.dropDown.addChild(_74);
},this);
_71();
},closeDropDown:function(_75){
this.inherited(arguments);
if(this.dropDown){
this._popupStateNode.removeAttribute("aria-owns");
this.dropDown.destroyRecursive();
delete this.dropDown;
}
}});
return _4f;
});
},"dijit/layout/TabController":function(){
define(["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/has","dojo/i18n","dojo/_base/lang","./StackController","../registry","../Menu","../MenuItem","dojo/text!./templates/_TabButton.html","dojo/i18n!../nls/common"],function(_76,dom,_77,_78,has,_79,_7a,_7b,_7c,_7d,_7e,_7f){
var _80=_76("dijit.layout._TabButton"+(has("dojo-bidi")?"_NoBidi":""),_7b.StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:_7f,_setNameAttr:"focusNode",scrollOnFocus:false,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.containerNode,false);
},startup:function(){
this.inherited(arguments);
var n=this.domNode;
this.defer(function(){
n.className=n.className;
},1);
},_setCloseButtonAttr:function(_81){
this._set("closeButton",_81);
_78.toggle(this.domNode,"dijitClosable",_81);
this.closeNode.style.display=_81?"":"none";
if(_81){
var _82=_79.getLocalization("dijit","common");
if(this.closeNode){
_77.set(this.closeNode,"title",_82.itemClose);
}
}
},_setDisabledAttr:function(_83){
this.inherited(arguments);
if(this.closeNode){
if(_83){
_77.remove(this.closeNode,"title");
}else{
var _84=_79.getLocalization("dijit","common");
_77.set(this.closeNode,"title",_84.itemClose);
}
}
},_setLabelAttr:function(_85){
this.inherited(arguments);
if(!this.showLabel&&!this.params.title){
this.iconNode.alt=_7a.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
if(has("dojo-bidi")){
_80=_76("dijit.layout._TabButton",_80,{_setLabelAttr:function(_86){
this.inherited(arguments);
this.applyTextDir(this.iconNode,this.iconNode.alt);
}});
}
var _87=_76("dijit.layout.TabController",_7b,{baseClass:"dijitTabController",templateString:"<div role='tablist' data-dojo-attach-event='onkeydown:onkeydown'></div>",tabPosition:"top",buttonWidget:_80,buttonWidgetCloseClass:"dijitTabCloseButton",postCreate:function(){
this.inherited(arguments);
var _88=new _7d({id:this.id+"_Menu",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode],selector:function(_89){
return _78.contains(_89,"dijitClosable")&&!_78.contains(_89,"dijitTabDisabled");
}});
this.own(_88);
var _8a=_79.getLocalization("dijit","common"),_8b=this;
_88.addChild(new _7e({label:_8a.itemClose,ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:function(evt){
var _8c=_7c.byNode(this.getParent().currentTarget);
_8b.onCloseButtonClick(_8c.page);
}}));
}});
_87.TabButton=_80;
return _87;
});
},"dijit/layout/StackController":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/keys","dojo/_base/lang","dojo/on","dojo/topic","../focus","../registry","../_Widget","../_TemplatedMixin","../_Container","../form/ToggleButton","dojo/touch","dojo/i18n!../nls/common"],function(_8d,_8e,_8f,_90,_91,_92,on,_93,_94,_95,_96,_97,_98,_99){
var _9a=_8e("dijit.layout._StackButton",_99,{tabIndex:"-1",closeButton:false,_aria_attr:"aria-selected",buildRendering:function(evt){
this.inherited(arguments);
(this.focusNode||this.domNode).setAttribute("role","tab");
}});
var _9b=_8e("dijit.layout.StackController",[_96,_97,_98],{baseClass:"dijitStackController",templateString:"<span role='tablist' data-dojo-attach-event='onkeydown'></span>",containerId:"",buttonWidget:_9a,buttonWidgetCloseClass:"dijitStackCloseButton",pane2button:function(id){
return _95.byId(this.id+"_"+id);
},postCreate:function(){
this.inherited(arguments);
this.own(_93.subscribe(this.containerId+"-startup",_92.hitch(this,"onStartup")),_93.subscribe(this.containerId+"-addChild",_92.hitch(this,"onAddChild")),_93.subscribe(this.containerId+"-removeChild",_92.hitch(this,"onRemoveChild")),_93.subscribe(this.containerId+"-selectChild",_92.hitch(this,"onSelectChild")),_93.subscribe(this.containerId+"-containerKeyDown",_92.hitch(this,"onContainerKeyDown")));
this.containerNode.dojoClick=true;
this.own(on(this.containerNode,"click",_92.hitch(this,function(evt){
var _9c=_95.getEnclosingWidget(evt.target);
if(_9c!=this.containerNode&&!_9c.disabled&&_9c.page){
for(var _9d=evt.target;_9d!==this.containerNode;_9d=_9d.parentNode){
if(_8f.contains(_9d,this.buttonWidgetCloseClass)){
this.onCloseButtonClick(_9c.page);
break;
}else{
if(_9d==_9c.domNode){
this.onButtonClick(_9c.page);
break;
}
}
}
}
})));
},onStartup:function(_9e){
this.textDir=_9e.textDir;
_8d.forEach(_9e.children,this.onAddChild,this);
if(_9e.selected){
this.onSelectChild(_9e.selected);
}
var _9f=_95.byId(this.containerId).containerNode,_a0=_92.hitch(this,"pane2button"),_a1={"title":"label","showtitle":"showLabel","iconclass":"iconClass","closable":"closeButton","tooltip":"title","disabled":"disabled","textdir":"textdir"},_a2=function(_a3,_a4){
return on(_9f,"attrmodified-"+_a3,function(evt){
var _a5=_a0(evt.detail&&evt.detail.widget&&evt.detail.widget.id);
if(_a5){
_a5.set(_a4,evt.detail.newValue);
}
});
};
for(var _a6 in _a1){
this.own(_a2(_a6,_a1[_a6]));
}
},destroy:function(_a7){
this.destroyDescendants(_a7);
this.inherited(arguments);
},onAddChild:function(_a8,_a9){
var Cls=_92.isString(this.buttonWidget)?_92.getObject(this.buttonWidget):this.buttonWidget;
var _aa=new Cls({id:this.id+"_"+_a8.id,name:this.id+"_"+_a8.id,label:_a8.title,disabled:_a8.disabled,ownerDocument:this.ownerDocument,dir:_a8.dir,lang:_a8.lang,textDir:_a8.textDir||this.textDir,showLabel:_a8.showTitle,iconClass:_a8.iconClass,closeButton:_a8.closable,title:_a8.tooltip,page:_a8});
this.addChild(_aa,_a9);
_a8.controlButton=_aa;
if(!this._currentChild){
this.onSelectChild(_a8);
}
var _ab=_a8._wrapper.getAttribute("aria-labelledby")?_a8._wrapper.getAttribute("aria-labelledby")+" "+_aa.id:_aa.id;
_a8._wrapper.removeAttribute("aria-label");
_a8._wrapper.setAttribute("aria-labelledby",_ab);
},onRemoveChild:function(_ac){
if(this._currentChild===_ac){
this._currentChild=null;
}
var _ad=this.pane2button(_ac.id);
if(_ad){
this.removeChild(_ad);
_ad.destroy();
}
delete _ac.controlButton;
},onSelectChild:function(_ae){
if(!_ae){
return;
}
if(this._currentChild){
var _af=this.pane2button(this._currentChild.id);
_af.set("checked",false);
_af.focusNode.setAttribute("tabIndex","-1");
}
var _b0=this.pane2button(_ae.id);
_b0.set("checked",true);
this._currentChild=_ae;
_b0.focusNode.setAttribute("tabIndex","0");
var _b1=_95.byId(this.containerId);
},onButtonClick:function(_b2){
var _b3=this.pane2button(_b2.id);
_94.focus(_b3.focusNode);
if(this._currentChild&&this._currentChild.id===_b2.id){
_b3.set("checked",true);
}
var _b4=_95.byId(this.containerId);
_b4.selectChild(_b2);
},onCloseButtonClick:function(_b5){
var _b6=_95.byId(this.containerId);
_b6.closeChild(_b5);
if(this._currentChild){
var b=this.pane2button(this._currentChild.id);
if(b){
_94.focus(b.focusNode||b.domNode);
}
}
},adjacent:function(_b7){
if(!this.isLeftToRight()&&(!this.tabPosition||/top|bottom/.test(this.tabPosition))){
_b7=!_b7;
}
var _b8=this.getChildren();
var idx=_8d.indexOf(_b8,this.pane2button(this._currentChild.id)),_b9=_b8[idx];
var _ba;
do{
idx=(idx+(_b7?1:_b8.length-1))%_b8.length;
_ba=_b8[idx];
}while(_ba.disabled&&_ba!=_b9);
return _ba;
},onkeydown:function(e,_bb){
if(this.disabled||e.altKey){
return;
}
var _bc=null;
if(e.ctrlKey||!e._djpage){
switch(e.keyCode){
case _91.LEFT_ARROW:
case _91.UP_ARROW:
if(!e._djpage){
_bc=false;
}
break;
case _91.PAGE_UP:
if(e.ctrlKey){
_bc=false;
}
break;
case _91.RIGHT_ARROW:
case _91.DOWN_ARROW:
if(!e._djpage){
_bc=true;
}
break;
case _91.PAGE_DOWN:
if(e.ctrlKey){
_bc=true;
}
break;
case _91.HOME:
var _bd=this.getChildren();
for(var idx=0;idx<_bd.length;idx++){
var _be=_bd[idx];
if(!_be.disabled){
this.onButtonClick(_be.page);
break;
}
}
e.stopPropagation();
e.preventDefault();
break;
case _91.END:
var _bd=this.getChildren();
for(var idx=_bd.length-1;idx>=0;idx--){
var _be=_bd[idx];
if(!_be.disabled){
this.onButtonClick(_be.page);
break;
}
}
e.stopPropagation();
e.preventDefault();
break;
case _91.DELETE:
case "W".charCodeAt(0):
if(this._currentChild.closable&&(e.keyCode==_91.DELETE||e.ctrlKey)){
this.onCloseButtonClick(this._currentChild);
e.stopPropagation();
e.preventDefault();
}
break;
case _91.TAB:
if(e.ctrlKey){
this.onButtonClick(this.adjacent(!e.shiftKey).page);
e.stopPropagation();
e.preventDefault();
}
break;
}
if(_bc!==null){
this.onButtonClick(this.adjacent(_bc).page);
e.stopPropagation();
e.preventDefault();
}
}
},onContainerKeyDown:function(_bf){
_bf.e._djpage=_bf.page;
this.onkeydown(_bf.e);
}});
_9b.StackButton=_9a;
return _9b;
});
},"dijit/layout/LayoutContainer":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-style","dojo/_base/lang","../_WidgetBase","./_LayoutWidget","./utils"],function(_c0,_c1,_c2,_c3,_c4,_c5,_c6,_c7){
var _c8=_c1("dijit.layout.LayoutContainer",_c6,{design:"headline",baseClass:"dijitLayoutContainer",startup:function(){
if(this._started){
return;
}
_c0.forEach(this.getChildren(),this._setupChild,this);
this.inherited(arguments);
},_setupChild:function(_c9){
this.inherited(arguments);
var _ca=_c9.region;
if(_ca){
_c2.add(_c9.domNode,this.baseClass+"Pane");
}
},_getOrderedChildren:function(){
var _cb=_c0.map(this.getChildren(),function(_cc,idx){
return {pane:_cc,weight:[_cc.region=="center"?Infinity:0,_cc.layoutPriority,(this.design=="sidebar"?1:-1)*(/top|bottom/.test(_cc.region)?1:-1),idx]};
},this);
_cb.sort(function(a,b){
var aw=a.weight,bw=b.weight;
for(var i=0;i<aw.length;i++){
if(aw[i]!=bw[i]){
return aw[i]-bw[i];
}
}
return 0;
});
return _c0.map(_cb,function(w){
return w.pane;
});
},layout:function(){
_c7.layoutChildren(this.domNode,this._contentBox,this._getOrderedChildren());
},addChild:function(_cd,_ce){
this.inherited(arguments);
if(this._started){
this.layout();
}
},removeChild:function(_cf){
this.inherited(arguments);
if(this._started){
this.layout();
}
_c2.remove(_cf.domNode,this.baseClass+"Pane");
_c3.set(_cf.domNode,{top:"auto",bottom:"auto",left:"auto",right:"auto",position:"static"});
_c3.set(_cf.domNode,/top|bottom/.test(_cf.region)?"width":"height","auto");
}});
_c8.ChildWidgetProperties={region:"",layoutAlign:"",layoutPriority:0};
_c4.extend(_c5,_c8.ChildWidgetProperties);
return _c8;
});
},"dijit/layout/AccordionPane":function(){
define(["dojo/_base/declare","dojo/_base/kernel","./ContentPane"],function(_d0,_d1,_d2){
return _d0("dijit.layout.AccordionPane",_d2,{constructor:function(){
_d1.deprecated("dijit.layout.AccordionPane deprecated, use ContentPane instead","","2.0");
},onSelected:function(){
}});
});
},"dijit/layout/_TabContainerBase":function(){
define(["dojo/text!./templates/TabContainer.html","./StackContainer","./utils","../_TemplatedMixin","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(_d3,_d4,_d5,_d6,_d7,_d8,_d9,_da){
return _d7("dijit.layout._TabContainerBase",[_d4,_d6],{tabPosition:"top",baseClass:"dijitTabContainer",tabStrip:false,nested:false,templateString:_d3,postMixInProperties:function(){
this.baseClass+=this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,"");
this.srcNodeRef&&_da.set(this.srcNodeRef,"visibility","hidden");
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.tablist=this._makeController(this.tablistNode);
if(!this.doLayout){
_d8.add(this.domNode,"dijitTabContainerNoLayout");
}
if(this.nested){
_d8.add(this.domNode,"dijitTabContainerNested");
_d8.add(this.tablist.containerNode,"dijitTabContainerTabListNested");
_d8.add(this.tablistSpacer,"dijitTabContainerSpacerNested");
_d8.add(this.containerNode,"dijitTabPaneWrapperNested");
}else{
_d8.add(this.domNode,"tabStrip-"+(this.tabStrip?"enabled":"disabled"));
}
},_setupChild:function(tab){
_d8.add(tab.domNode,"dijitTabPane");
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
this.tablist.startup();
this.inherited(arguments);
},layout:function(){
if(!this._contentBox||typeof (this._contentBox.l)=="undefined"){
return;
}
var sc=this.selectedChildWidget;
if(this.doLayout){
var _db=this.tabPosition.replace(/-h/,"");
this.tablist.region=_db;
var _dc=[this.tablist,{domNode:this.tablistSpacer,region:_db},{domNode:this.containerNode,region:"center"}];
_d5.layoutChildren(this.domNode,this._contentBox,_dc);
this._containerContentBox=_d5.marginBox2contentBox(this.containerNode,_dc[2]);
if(sc&&sc.resize){
sc.resize(this._containerContentBox);
}
}else{
if(this.tablist.resize){
var s=this.tablist.domNode.style;
s.width="0";
var _dd=_d9.getContentBox(this.domNode).w;
s.width="";
this.tablist.resize({w:_dd});
}
if(sc&&sc.resize){
sc.resize();
}
}
},destroy:function(_de){
if(this.tablist){
this.tablist.destroy(_de);
}
this.inherited(arguments);
}});
});
},"dijit/layout/StackContainer":function(){
define(["dojo/_base/array","dojo/cookie","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/has","dojo/_base/lang","dojo/on","dojo/ready","dojo/topic","dojo/when","../registry","../_WidgetBase","./_LayoutWidget","dojo/i18n!../nls/common"],function(_df,_e0,_e1,_e2,_e3,has,_e4,on,_e5,_e6,_e7,_e8,_e9,_ea){
if(has("dijit-legacy-requires")){
_e5(0,function(){
var _eb=["dijit/layout/StackController"];
require(_eb);
});
}
var _ec=_e1("dijit.layout.StackContainer",_ea,{doLayout:true,persist:false,baseClass:"dijitStackContainer",buildRendering:function(){
this.inherited(arguments);
_e2.add(this.domNode,"dijitLayoutContainer");
},postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,"keydown",_e4.hitch(this,"_onKeyDown")));
},startup:function(){
if(this._started){
return;
}
var _ed=this.getChildren();
_df.forEach(_ed,this._setupChild,this);
if(this.persist){
this.selectedChildWidget=_e8.byId(_e0(this.id+"_selectedChild"));
}else{
_df.some(_ed,function(_ee){
if(_ee.selected){
this.selectedChildWidget=_ee;
}
return _ee.selected;
},this);
}
var _ef=this.selectedChildWidget;
if(!_ef&&_ed[0]){
_ef=this.selectedChildWidget=_ed[0];
_ef.selected=true;
}
_e6.publish(this.id+"-startup",{children:_ed,selected:_ef,textDir:this.textDir});
this.inherited(arguments);
},resize:function(){
if(!this._hasBeenShown){
this._hasBeenShown=true;
var _f0=this.selectedChildWidget;
if(_f0){
this._showChild(_f0);
}
}
this.inherited(arguments);
},_setupChild:function(_f1){
var _f2=_f1.domNode,_f3=_e3.place("<div role='tabpanel' class='"+this.baseClass+"ChildWrapper dijitHidden'>",_f1.domNode,"replace"),_f4=_f1["aria-label"]||_f1.title||_f1.label;
if(_f4){
_f3.setAttribute("aria-label",_f4);
}
_e3.place(_f2,_f3);
_f1._wrapper=_f3;
this.inherited(arguments);
if(_f2.style.display=="none"){
_f2.style.display="block";
}
_f1.domNode.title="";
},addChild:function(_f5,_f6){
this.inherited(arguments);
if(this._started){
_e6.publish(this.id+"-addChild",_f5,_f6);
this.layout();
if(!this.selectedChildWidget){
this.selectChild(_f5);
}
}
},removeChild:function(_f7){
var idx=_df.indexOf(this.getChildren(),_f7);
this.inherited(arguments);
_e3.destroy(_f7._wrapper);
delete _f7._wrapper;
if(this._started){
_e6.publish(this.id+"-removeChild",_f7);
}
if(this._descendantsBeingDestroyed){
return;
}
if(this.selectedChildWidget===_f7){
this.selectedChildWidget=undefined;
if(this._started){
var _f8=this.getChildren();
if(_f8.length){
this.selectChild(_f8[Math.max(idx-1,0)]);
}
}
}
if(this._started){
this.layout();
}
},selectChild:function(_f9,_fa){
var d;
_f9=_e8.byId(_f9);
if(this.selectedChildWidget!=_f9){
d=this._transition(_f9,this.selectedChildWidget,_fa);
this._set("selectedChildWidget",_f9);
_e6.publish(this.id+"-selectChild",_f9);
if(this.persist){
_e0(this.id+"_selectedChild",this.selectedChildWidget.id);
}
}
return _e7(d||true);
},_transition:function(_fb,_fc){
if(_fc){
this._hideChild(_fc);
}
var d=this._showChild(_fb);
if(_fb.resize){
if(this.doLayout){
_fb.resize(this._containerContentBox||this._contentBox);
}else{
_fb.resize();
}
}
return d;
},_adjacent:function(_fd){
var _fe=this.getChildren();
var _ff=_df.indexOf(_fe,this.selectedChildWidget);
_ff+=_fd?1:_fe.length-1;
return _fe[_ff%_fe.length];
},forward:function(){
return this.selectChild(this._adjacent(true),true);
},back:function(){
return this.selectChild(this._adjacent(false),true);
},_onKeyDown:function(e){
_e6.publish(this.id+"-containerKeyDown",{e:e,page:this});
},layout:function(){
var _100=this.selectedChildWidget;
if(_100&&_100.resize){
if(this.doLayout){
_100.resize(this._containerContentBox||this._contentBox);
}else{
_100.resize();
}
}
},_showChild:function(page){
var _101=this.getChildren();
page.isFirstChild=(page==_101[0]);
page.isLastChild=(page==_101[_101.length-1]);
page._set("selected",true);
if(page._wrapper){
_e2.replace(page._wrapper,"dijitVisible","dijitHidden");
}
return (page._onShow&&page._onShow())||true;
},_hideChild:function(page){
page._set("selected",false);
if(page._wrapper){
_e2.replace(page._wrapper,"dijitHidden","dijitVisible");
}
page.onHide&&page.onHide();
},closeChild:function(page){
var _102=page.onClose&&page.onClose(this,page);
if(_102){
this.removeChild(page);
page.destroyRecursive();
}
},destroyDescendants:function(_103){
this._descendantsBeingDestroyed=true;
this.selectedChildWidget=undefined;
_df.forEach(this.getChildren(),function(_104){
if(!_103){
this.removeChild(_104);
}
_104.destroyRecursive(_103);
},this);
this._descendantsBeingDestroyed=false;
}});
_ec.ChildWidgetProperties={selected:false,disabled:false,closable:false,iconClass:"dijitNoIcon",showTitle:true};
_e4.extend(_e9,_ec.ChildWidgetProperties);
return _ec;
});
},"dijit/layout/AccordionContainer":function(){
define(["require","dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/topic","../focus","../_base/manager","dojo/ready","../_Widget","../_Container","../_TemplatedMixin","../_CssStateMixin","./StackContainer","./ContentPane","dojo/text!./templates/AccordionButton.html","../a11yclick"],function(_105,_106,_107,fx,dom,_108,_109,_10a,_10b,keys,lang,has,_10c,_10d,_10e,_10f,_110,_111,_112,_113,_114,_115,_116){
var _117=_107("dijit.layout._AccordionButton",[_110,_112,_113],{templateString:_116,label:"",_setLabelAttr:{node:"titleTextNode",type:"innerHTML"},title:"",_setTitleAttr:{node:"titleTextNode",type:"attribute",attribute:"title"},iconClassAttr:"",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitAccordionTitle",getParent:function(){
return this.parent;
},buildRendering:function(){
this.inherited(arguments);
var _118=this.id.replace(" ","_");
_108.set(this.titleTextNode,"id",_118+"_title");
this.focusNode.setAttribute("aria-labelledby",_108.get(this.titleTextNode,"id"));
dom.setSelectable(this.domNode,false);
},getTitleHeight:function(){
return _10b.getMarginSize(this.domNode).h;
},_onTitleClick:function(){
var _119=this.getParent();
_119.selectChild(this.contentWidget,true);
_10d.focus(this.focusNode);
},_onTitleKeyDown:function(evt){
return this.getParent()._onKeyDown(evt,this.contentWidget);
},_setSelectedAttr:function(_11a){
this._set("selected",_11a);
this.focusNode.setAttribute("aria-expanded",_11a?"true":"false");
this.focusNode.setAttribute("aria-selected",_11a?"true":"false");
this.focusNode.setAttribute("tabIndex",_11a?"0":"-1");
}});
if(has("dojo-bidi")){
_117.extend({_setLabelAttr:function(_11b){
this._set("label",_11b);
_108.set(this.titleTextNode,"innerHTML",_11b);
this.applyTextDir(this.titleTextNode);
},_setTitleAttr:function(_11c){
this._set("title",_11c);
_108.set(this.titleTextNode,"title",_11c);
this.applyTextDir(this.titleTextNode);
}});
}
var _11d=_107("dijit.layout._AccordionInnerContainer"+(has("dojo-bidi")?"_NoBidi":""),[_110,_113],{baseClass:"dijitAccordionInnerContainer",isLayoutContainer:true,buildRendering:function(){
this.domNode=_10a.place("<div class='"+this.baseClass+"' role='presentation'>",this.contentWidget.domNode,"after");
var _11e=this.contentWidget,cls=lang.isString(this.buttonWidget)?lang.getObject(this.buttonWidget):this.buttonWidget;
this.button=_11e._buttonWidget=(new cls({contentWidget:_11e,label:_11e.title,title:_11e.tooltip,dir:_11e.dir,lang:_11e.lang,textDir:_11e.textDir||this.textDir,iconClass:_11e.iconClass,id:_11e.id+"_button",parent:this.parent})).placeAt(this.domNode);
this.containerNode=_10a.place("<div class='dijitAccordionChildWrapper' role='tabpanel' style='display:none'>",this.domNode);
this.containerNode.setAttribute("aria-labelledby",this.button.id);
_10a.place(this.contentWidget.domNode,this.containerNode);
},postCreate:function(){
this.inherited(arguments);
var _11f=this.button,cw=this.contentWidget;
this._contentWidgetWatches=[cw.watch("title",lang.hitch(this,function(name,_120,_121){
_11f.set("label",_121);
})),cw.watch("tooltip",lang.hitch(this,function(name,_122,_123){
_11f.set("title",_123);
})),cw.watch("iconClass",lang.hitch(this,function(name,_124,_125){
_11f.set("iconClass",_125);
}))];
},_setSelectedAttr:function(_126){
this._set("selected",_126);
this.button.set("selected",_126);
if(_126){
var cw=this.contentWidget;
if(cw.onSelected){
cw.onSelected();
}
}
},startup:function(){
this.contentWidget.startup();
},destroy:function(){
this.button.destroyRecursive();
_106.forEach(this._contentWidgetWatches||[],function(w){
w.unwatch();
});
delete this.contentWidget._buttonWidget;
delete this.contentWidget._wrapperWidget;
this.inherited(arguments);
},destroyDescendants:function(_127){
this.contentWidget.destroyRecursive(_127);
}});
if(has("dojo-bidi")){
_11d=_107("dijit.layout._AccordionInnerContainer",_11d,{postCreate:function(){
this.inherited(arguments);
var _128=this.button;
this._contentWidgetWatches.push(this.contentWidget.watch("textDir",function(name,_129,_12a){
_128.set("textDir",_12a);
}));
}});
}
var _12b=_107("dijit.layout.AccordionContainer",_114,{duration:_10e.defaultDuration,buttonWidget:_117,baseClass:"dijitAccordionContainer",buildRendering:function(){
this.inherited(arguments);
this.domNode.style.overflow="hidden";
this.domNode.setAttribute("role","tablist");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(this.selectedChildWidget){
this.selectedChildWidget._wrapperWidget.set("selected",true);
}
},layout:function(){
var _12c=this.selectedChildWidget;
if(!_12c){
return;
}
var _12d=_12c._wrapperWidget.domNode,_12e=_10b.getMarginExtents(_12d),_12f=_10b.getPadBorderExtents(_12d),_130=_12c._wrapperWidget.containerNode,_131=_10b.getMarginExtents(_130),_132=_10b.getPadBorderExtents(_130),_133=this._contentBox;
var _134=0;
_106.forEach(this.getChildren(),function(_135){
if(_135!=_12c){
_134+=_10b.getMarginSize(_135._wrapperWidget.domNode).h;
}
});
this._verticalSpace=_133.h-_134-_12e.h-_12f.h-_131.h-_132.h-_12c._buttonWidget.getTitleHeight();
this._containerContentBox={h:this._verticalSpace,w:this._contentBox.w-_12e.w-_12f.w-_131.w-_132.w};
if(_12c){
_12c.resize(this._containerContentBox);
}
},_setupChild:function(_136){
_136._wrapperWidget=_11d({contentWidget:_136,buttonWidget:this.buttonWidget,id:_136.id+"_wrapper",dir:_136.dir,lang:_136.lang,textDir:_136.textDir||this.textDir,parent:this});
this.inherited(arguments);
_10a.place(_136.domNode,_136._wrapper,"replace");
},removeChild:function(_137){
if(_137._wrapperWidget){
_10a.place(_137.domNode,_137._wrapperWidget.domNode,"after");
_137._wrapperWidget.destroy();
delete _137._wrapperWidget;
}
_109.remove(_137.domNode,"dijitHidden");
this.inherited(arguments);
},getChildren:function(){
return _106.map(this.inherited(arguments),function(_138){
return _138.declaredClass=="dijit.layout._AccordionInnerContainer"?_138.contentWidget:_138;
},this);
},destroy:function(){
if(this._animation){
this._animation.stop();
}
_106.forEach(this.getChildren(),function(_139){
if(_139._wrapperWidget){
_139._wrapperWidget.destroy();
}else{
_139.destroyRecursive();
}
});
this.inherited(arguments);
},_showChild:function(_13a){
_13a._wrapperWidget.containerNode.style.display="block";
return this.inherited(arguments);
},_hideChild:function(_13b){
_13b._wrapperWidget.containerNode.style.display="none";
this.inherited(arguments);
},_transition:function(_13c,_13d,_13e){
if(has("ie")<8){
_13e=false;
}
if(this._animation){
this._animation.stop(true);
delete this._animation;
}
var self=this;
if(_13c){
_13c._wrapperWidget.set("selected",true);
var d=this._showChild(_13c);
if(this.doLayout&&_13c.resize){
_13c.resize(this._containerContentBox);
}
}
if(_13d){
_13d._wrapperWidget.set("selected",false);
if(!_13e){
this._hideChild(_13d);
}
}
if(_13e){
var _13f=_13c._wrapperWidget.containerNode,_140=_13d._wrapperWidget.containerNode;
var _141=_13c._wrapperWidget.containerNode,_142=_10b.getMarginExtents(_141),_143=_10b.getPadBorderExtents(_141),_144=_142.h+_143.h;
_140.style.height=(self._verticalSpace-_144)+"px";
this._animation=new fx.Animation({node:_13f,duration:this.duration,curve:[1,this._verticalSpace-_144-1],onAnimate:function(_145){
_145=Math.floor(_145);
_13f.style.height=_145+"px";
_140.style.height=(self._verticalSpace-_144-_145)+"px";
},onEnd:function(){
delete self._animation;
_13f.style.height="auto";
_13d._wrapperWidget.containerNode.style.display="none";
_140.style.height="auto";
self._hideChild(_13d);
}});
this._animation.onStop=this._animation.onEnd;
this._animation.play();
}
return d;
},_onKeyDown:function(e,_146){
if(this.disabled||e.altKey||!(_146||e.ctrlKey)){
return;
}
var c=e.keyCode;
if((_146&&(c==keys.LEFT_ARROW||c==keys.UP_ARROW))||(e.ctrlKey&&c==keys.PAGE_UP)){
this._adjacent(false)._buttonWidget._onTitleClick();
e.stopPropagation();
e.preventDefault();
}else{
if((_146&&(c==keys.RIGHT_ARROW||c==keys.DOWN_ARROW))||(e.ctrlKey&&(c==keys.PAGE_DOWN||c==keys.TAB))){
this._adjacent(true)._buttonWidget._onTitleClick();
e.stopPropagation();
e.preventDefault();
}
}
}});
if(has("dijit-legacy-requires")){
_10f(0,function(){
var _147=["dijit/layout/AccordionPane"];
_105(_147);
});
}
_12b._InnerContainer=_11d;
_12b._Button=_117;
return _12b;
});
},"dijit/layout/TabContainer":function(){
define(["dojo/_base/lang","dojo/_base/declare","./_TabContainerBase","./TabController","./ScrollingTabController"],function(lang,_148,_149,_14a,_14b){
return _148("dijit.layout.TabContainer",_149,{useMenu:true,useSlider:true,controllerWidget:"",_makeController:function(_14c){
var cls=this.baseClass+"-tabs"+(this.doLayout?"":" dijitTabNoLayout"),_14a=typeof this.controllerWidget=="string"?lang.getObject(this.controllerWidget):this.controllerWidget;
return new _14a({id:this.id+"_tablist",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,tabPosition:this.tabPosition,doLayout:this.doLayout,containerId:this.id,"class":cls,nested:this.nested,useMenu:this.useMenu,useSlider:this.useSlider,tabStripClass:this.tabStrip?this.baseClass+(this.tabStrip?"":"No")+"Strip":null},_14c);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.controllerWidget){
this.controllerWidget=(this.tabPosition=="top"||this.tabPosition=="bottom")&&!this.nested?_14b:_14a;
}
}});
});
},"url:dijit/layout/templates/_TabButton.html":"<div role=\"presentation\" data-dojo-attach-point=\"titleNode,innerDiv,tabContent\" class=\"dijitTabInner dijitTabContent\">\n\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitTabButtonIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t<span data-dojo-attach-point='containerNode,focusNode' class='tabLabel'></span>\n\t<span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t  role=\"presentation\">\n\t\t<span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t\t\t></span>\n</div>\n","url:dijit/layout/templates/_ScrollingTabControllerButton.html":"<div data-dojo-attach-event=\"ondijitclick:_onClick\" class=\"dijitTabInnerDiv dijitTabContent dijitButtonContents\"  data-dojo-attach-point=\"focusNode\" role=\"button\">\n\t<span role=\"presentation\" class=\"dijitInline dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n</div>","url:dijit/layout/templates/TabContainer.html":"<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n","url:dijit/layout/templates/AccordionButton.html":"<div data-dojo-attach-event='ondijitclick:_onTitleClick' class='dijitAccordionTitle' role=\"presentation\">\n\t<div data-dojo-attach-point='titleNode,focusNode' data-dojo-attach-event='onkeydown:_onTitleKeyDown'\n\t\t\tclass='dijitAccordionTitleFocus' role=\"tab\" aria-expanded=\"false\"\n\t\t><span class='dijitInline dijitAccordionArrow' role=\"presentation\"></span\n\t\t><span class='arrowTextUp' role=\"presentation\">+</span\n\t\t><span class='arrowTextDown' role=\"presentation\">-</span\n\t\t><span role=\"presentation\" class=\"dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t\t<span role=\"presentation\" data-dojo-attach-point='titleTextNode, textDirNode' class='dijitAccordionText'></span>\n\t</div>\n</div>\n","url:dijit/layout/templates/ScrollingTabController.html":"<div class=\"dijitTabListContainer-${tabPosition}\" style=\"visibility:hidden\">\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_menuBtn\"\n\t\t data-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\n\t\t data-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_leftBtn\"\n\t\t data-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\n\t\t data-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_rightBtn\"\n\t\t data-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\n\t\t data-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\n\t<div class='dijitTabListWrapper' data-dojo-attach-point='tablistWrapper'>\n\t\t<div role='tablist' data-dojo-attach-event='onkeydown:onkeydown'\n\t\t\t data-dojo-attach-point='containerNode' class='nowrapTabStrip'></div>\n\t</div>\n</div>"}});
define("dojo/layers/layout",[],1);
