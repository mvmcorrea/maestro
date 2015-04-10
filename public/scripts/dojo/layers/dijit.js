//>>built
require({cache:{"dijit/_editor/plugins/FontChoice":function(){
define(["require","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/i18n","dojo/_base/lang","dojo/store/Memory","../../registry","../../_Widget","../../_TemplatedMixin","../../_WidgetsInTemplateMixin","../../form/FilteringSelect","../_Plugin","../range","dojo/i18n!../nls/FontChoice"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e){
var _f=_3("dijit._editor.plugins._FontDropDown",[_9,_a,_b],{label:"",plainText:false,templateString:"<span style='white-space: nowrap' class='dijit dijitReset dijitInline'>"+"<label class='dijitLeft dijitInline' for='${selectId}'>${label}</label>"+"<input data-dojo-type='../../form/FilteringSelect' required='false' "+"data-dojo-props='labelType:\"html\", labelAttr:\"label\", searchAttr:\"name\"' "+"class='${comboClass}' "+"tabIndex='-1' id='${selectId}' data-dojo-attach-point='select' value=''/>"+"</span>",contextRequire:_1,postMixInProperties:function(){
this.inherited(arguments);
this.strings=_5.getLocalization("dijit._editor","FontChoice");
this.label=this.strings[this.command];
this.id=_8.getUniqueId(this.declaredClass.replace(/\./g,"_"));
this.selectId=this.id+"_select";
this.inherited(arguments);
},postCreate:function(){
this.select.set("store",new _7({idProperty:"value",data:_2.map(this.values,function(_10){
var _11=this.strings[_10]||_10;
return {label:this.getLabel(_10,_11),name:_11,value:_10};
},this)}));
this.select.set("value","",false);
this.disabled=this.select.get("disabled");
},_setValueAttr:function(_12,_13){
_13=_13!==false;
this.select.set("value",_2.indexOf(this.values,_12)<0?"":_12,_13);
if(!_13){
this.select._lastValueReported=null;
}
},_getValueAttr:function(){
return this.select.get("value");
},focus:function(){
this.select.focus();
},_setDisabledAttr:function(_14){
this._set("disabled",_14);
this.select.set("disabled",_14);
}});
var _15=_3("dijit._editor.plugins._FontNameDropDown",_f,{generic:false,command:"fontName",comboClass:"dijitFontNameCombo",postMixInProperties:function(){
if(!this.values){
this.values=this.generic?["serif","sans-serif","monospace","cursive","fantasy"]:["Arial","Times New Roman","Comic Sans MS","Courier New"];
}
this.inherited(arguments);
},getLabel:function(_16,_17){
if(this.plainText){
return _17;
}else{
return "<div style='font-family: "+_16+"'>"+_17+"</div>";
}
},_setValueAttr:function(_18,_19){
_19=_19!==false;
if(this.generic){
var map={"Arial":"sans-serif","Helvetica":"sans-serif","Myriad":"sans-serif","Times":"serif","Times New Roman":"serif","Comic Sans MS":"cursive","Apple Chancery":"cursive","Courier":"monospace","Courier New":"monospace","Papyrus":"fantasy","Estrangelo Edessa":"cursive","Gabriola":"fantasy"};
_18=map[_18]||_18;
}
this.inherited(arguments,[_18,_19]);
}});
var _1a=_3("dijit._editor.plugins._FontSizeDropDown",_f,{command:"fontSize",comboClass:"dijitFontSizeCombo",values:[1,2,3,4,5,6,7],getLabel:function(_1b,_1c){
if(this.plainText){
return _1c;
}else{
return "<font size="+_1b+"'>"+_1c+"</font>";
}
},_setValueAttr:function(_1d,_1e){
_1e=_1e!==false;
if(_1d.indexOf&&_1d.indexOf("px")!=-1){
var _1f=parseInt(_1d,10);
_1d={10:1,13:2,16:3,18:4,24:5,32:6,48:7}[_1f]||_1d;
}
this.inherited(arguments,[_1d,_1e]);
}});
var _20=_3("dijit._editor.plugins._FormatBlockDropDown",_f,{command:"formatBlock",comboClass:"dijitFormatBlockCombo",values:["noFormat","p","h1","h2","h3","pre"],postCreate:function(){
this.inherited(arguments);
this.set("value","noFormat",false);
},getLabel:function(_21,_22){
if(this.plainText||_21=="noFormat"){
return _22;
}else{
return "<"+_21+">"+_22+"</"+_21+">";
}
},_execCommand:function(_23,_24,_25){
if(_25==="noFormat"){
var _26;
var end;
var sel=_e.getSelection(_23.window);
if(sel&&sel.rangeCount>0){
var _27=sel.getRangeAt(0);
var _28,tag;
if(_27){
_26=_27.startContainer;
end=_27.endContainer;
while(_26&&_26!==_23.editNode&&_26!==_23.document.body&&_26.nodeType!==1){
_26=_26.parentNode;
}
while(end&&end!==_23.editNode&&end!==_23.document.body&&end.nodeType!==1){
end=end.parentNode;
}
var _29=_6.hitch(this,function(_2a,ary){
if(_2a.childNodes&&_2a.childNodes.length){
var i;
for(i=0;i<_2a.childNodes.length;i++){
var c=_2a.childNodes[i];
if(c.nodeType==1){
if(_23.selection.inSelection(c)){
var tag=c.tagName?c.tagName.toLowerCase():"";
if(_2.indexOf(this.values,tag)!==-1){
ary.push(c);
}
_29(c,ary);
}
}
}
}
});
var _2b=_6.hitch(this,function(_2c){
if(_2c&&_2c.length){
_23.beginEditing();
while(_2c.length){
this._removeFormat(_23,_2c.pop());
}
_23.endEditing();
}
});
var _2d=[];
if(_26==end){
var _2e;
_28=_26;
while(_28&&_28!==_23.editNode&&_28!==_23.document.body){
if(_28.nodeType==1){
tag=_28.tagName?_28.tagName.toLowerCase():"";
if(_2.indexOf(this.values,tag)!==-1){
_2e=_28;
break;
}
}
_28=_28.parentNode;
}
_29(_26,_2d);
if(_2e){
_2d=[_2e].concat(_2d);
}
_2b(_2d);
}else{
_28=_26;
while(_23.selection.inSelection(_28)){
if(_28.nodeType==1){
tag=_28.tagName?_28.tagName.toLowerCase():"";
if(_2.indexOf(this.values,tag)!==-1){
_2d.push(_28);
}
_29(_28,_2d);
}
_28=_28.nextSibling;
}
_2b(_2d);
}
_23.onDisplayChanged();
}
}
}else{
_23.execCommand(_24,_25);
}
},_removeFormat:function(_2f,_30){
if(_2f.customUndo){
while(_30.firstChild){
_4.place(_30.firstChild,_30,"before");
}
_30.parentNode.removeChild(_30);
}else{
_2f.selection.selectElementChildren(_30);
var _31=_2f.selection.getSelectedHtml();
_2f.selection.selectElement(_30);
_2f.execCommand("inserthtml",_31||"");
}
}});
var _32=_3("dijit._editor.plugins.FontChoice",_d,{useDefaultCommand:false,_initButton:function(){
var _33={fontName:_15,fontSize:_1a,formatBlock:_20}[this.command],_34=this.params;
if(this.params.custom){
_34.values=this.params.custom;
}
var _35=this.editor;
this.button=new _33(_6.delegate({dir:_35.dir,lang:_35.lang},_34));
this.own(this.button.select.on("change",_6.hitch(this,function(_36){
if(this.editor.focused){
this.editor.focus();
}
if(this.command=="fontName"&&_36.indexOf(" ")!=-1){
_36="'"+_36+"'";
}
if(this.button._execCommand){
this.button._execCommand(this.editor,this.command,_36);
}else{
this.editor.execCommand(this.command,_36);
}
})));
},updateState:function(){
var _37=this.editor;
var _38=this.command;
if(!_37||!_37.isLoaded||!_38.length){
return;
}
if(this.button){
var _39=this.get("disabled");
this.button.set("disabled",_39);
if(_39){
return;
}
var _3a;
try{
_3a=_37.queryCommandValue(_38)||"";
}
catch(e){
_3a="";
}
var _3b=_6.isString(_3a)&&_3a.match(/'([^']*)'/);
if(_3b){
_3a=_3b[1];
}
if(_38==="formatBlock"){
if(!_3a||_3a=="p"){
_3a=null;
var _3c;
var sel=_e.getSelection(this.editor.window);
if(sel&&sel.rangeCount>0){
var _3d=sel.getRangeAt(0);
if(_3d){
_3c=_3d.endContainer;
}
}
while(_3c&&_3c!==_37.editNode&&_3c!==_37.document){
var tg=_3c.tagName?_3c.tagName.toLowerCase():"";
if(tg&&_2.indexOf(this.button.values,tg)>-1){
_3a=tg;
break;
}
_3c=_3c.parentNode;
}
if(!_3a){
_3a="noFormat";
}
}else{
if(_2.indexOf(this.button.values,_3a)<0){
_3a="noFormat";
}
}
}
if(_3a!==this.button.get("value")){
this.button.set("value",_3a,false);
}
}
}});
_2.forEach(["fontName","fontSize","formatBlock"],function(_3e){
_d.registry[_3e]=function(_3f){
return new _32({command:_3e,plainText:_3f.plainText});
};
});
_32._FontDropDown=_f;
_32._FontNameDropDown=_15;
_32._FontSizeDropDown=_1a;
_32._FormatBlockDropDown=_20;
return _32;
});
},"dijit/form/TextBox":function(){
define(["dojo/_base/declare","dojo/dom-construct","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/sniff","./_FormValueWidget","./_TextBoxMixin","dojo/text!./templates/TextBox.html","../main"],function(_40,_41,_42,_43,_44,on,has,_45,_46,_47,_48){
var _49=_40("dijit.form.TextBox"+(has("dojo-bidi")?"_NoBidi":""),[_45,_46],{templateString:_47,_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" data-dojo-attach-point=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:has("ie")?"disabled":"",baseClass:"dijitTextBox",postMixInProperties:function(){
var _4a=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((_4a=="hidden"||_4a=="file")&&this.templateString==this.constructor.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
if(has("ie")<9){
this.defer(function(){
try{
var s=_42.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _4b=this.domNode.getElementsByTagName("INPUT");
if(_4b){
for(var i=0;i<_4b.length;i++){
_4b[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
});
}
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=_41.create("span",{onmousedown:function(e){
e.preventDefault();
},className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
this.own(on(this._phspan,"touchend, pointerup, MSPointerUp",_44.hitch(this,function(){
this.focus();
})));
}
this._phspan.innerHTML="";
this._phspan.appendChild(this._phspan.ownerDocument.createTextNode(v));
this._updatePlaceHolder();
},_onInput:function(evt){
this.inherited(arguments);
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this.textbox.value)?"":"none";
}
},_setValueAttr:function(_4c,_4d,_4e){
this.inherited(arguments);
this._updatePlaceHolder();
},getDisplayedValue:function(){
_43.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use get('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},setDisplayedValue:function(_4f){
_43.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_4f);
},_onBlur:function(e){
if(this.disabled){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
if(has("mozilla")){
if(this.selectOnClick){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
}
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
}});
if(has("ie")<9){
_49.prototype._isTextSelected=function(){
var _50=this.ownerDocument.selection.createRange();
var _51=_50.parentElement();
return _51==this.textbox&&_50.text.length>0;
};
_48._setSelectionRange=_46._setSelectionRange=function(_52,_53,_54){
if(_52.createTextRange){
var r=_52.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_53);
r.moveEnd("character",_54-_53);
r.select();
}
};
}
if(has("dojo-bidi")){
_49=_40("dijit.form.TextBox",_49,{_setPlaceHolderAttr:function(v){
this.inherited(arguments);
this.applyTextDir(this._phspan);
}});
}
return _49;
});
},"dijit/_base/scroll":function(){
define(["dojo/window","../main"],function(_55,_56){
_56.scrollIntoView=function(_57,pos){
_55.scrollIntoView(_57,pos);
};
});
},"dijit/_TemplatedMixin":function(){
define(["dojo/cache","dojo/_base/declare","dojo/dom-construct","dojo/_base/lang","dojo/on","dojo/sniff","dojo/string","./_AttachMixin"],function(_58,_59,_5a,_5b,on,has,_5c,_5d){
var _5e=_59("dijit._TemplatedMixin",_5d,{templateString:null,templatePath:null,_skipNodeCache:false,searchContainerNode:true,_stringRepl:function(_5f){
var _60=this.declaredClass,_61=this;
return _5c.substitute(_5f,this,function(_62,key){
if(key.charAt(0)=="!"){
_62=_5b.getObject(key.substr(1),false,_61);
}
if(typeof _62=="undefined"){
throw new Error(_60+" template:"+key);
}
if(_62==null){
return "";
}
return key.charAt(0)=="!"?_62:_62.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this._rendered){
if(!this.templateString){
this.templateString=_58(this.templatePath,{sanitize:true});
}
var _63=_5e.getCachedTemplate(this.templateString,this._skipNodeCache,this.ownerDocument);
var _64;
if(_5b.isString(_63)){
_64=_5a.toDom(this._stringRepl(_63),this.ownerDocument);
if(_64.nodeType!=1){
throw new Error("Invalid template: "+_63);
}
}else{
_64=_63.cloneNode(true);
}
this.domNode=_64;
}
this.inherited(arguments);
if(!this._rendered){
this._fillContent(this.srcNodeRef);
}
this._rendered=true;
},_fillContent:function(_65){
var _66=this.containerNode;
if(_65&&_66){
while(_65.hasChildNodes()){
_66.appendChild(_65.firstChild);
}
}
}});
_5e._templateCache={};
_5e.getCachedTemplate=function(_67,_68,doc){
var _69=_5e._templateCache;
var key=_67;
var _6a=_69[key];
if(_6a){
try{
if(!_6a.ownerDocument||_6a.ownerDocument==(doc||document)){
return _6a;
}
}
catch(e){
}
_5a.destroy(_6a);
}
_67=_5c.trim(_67);
if(_68||_67.match(/\$\{([^\}]+)\}/g)){
return (_69[key]=_67);
}else{
var _6b=_5a.toDom(_67,doc);
if(_6b.nodeType!=1){
throw new Error("Invalid template: "+_67);
}
return (_69[key]=_6b);
}
};
if(has("ie")){
on(window,"unload",function(){
var _6c=_5e._templateCache;
for(var key in _6c){
var _6d=_6c[key];
if(typeof _6d=="object"){
_5a.destroy(_6d);
}
delete _6c[key];
}
});
}
return _5e;
});
},"dijit/_Templated":function(){
define(["./_WidgetBase","./_TemplatedMixin","./_WidgetsInTemplateMixin","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/kernel"],function(_6e,_6f,_70,_71,_72,_73,_74){
_73.extend(_6e,{waiRole:"",waiState:""});
return _72("dijit._Templated",[_6f,_70],{widgetsInTemplate:false,constructor:function(){
_74.deprecated(this.declaredClass+": dijit._Templated deprecated, use dijit._TemplatedMixin and if necessary dijit._WidgetsInTemplateMixin","","2.0");
},_processNode:function(_75,_76){
var ret=this.inherited(arguments);
var _77=_76(_75,"waiRole");
if(_77){
_75.setAttribute("role",_77);
}
var _78=_76(_75,"waiState");
if(_78){
_71.forEach(_78.split(/\s*,\s*/),function(_79){
if(_79.indexOf("-")!=-1){
var _7a=_79.split("-");
_75.setAttribute("aria-"+_7a[0],_7a[1]);
}
});
}
return ret;
}});
});
},"dijit/_CssStateMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/has","dojo/_base/lang","dojo/on","dojo/domReady","dojo/touch","dojo/_base/window","./a11yclick","./registry"],function(_7b,_7c,dom,_7d,has,_7e,on,_7f,_80,win,_81,_82){
var _83=_7c("dijit._CssStateMixin",[],{hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_7b.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active","_opened"],function(_84){
this.watch(_84,_7e.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes||{}){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._trackMouseState(this.domNode,this.baseClass);
this._setStateClass();
},_cssMouseEvent:function(_85){
if(!this.disabled){
switch(_85.type){
case "mouseover":
case "MSPointerOver":
case "pointerover":
this._set("hovering",true);
this._set("active",this._mouseDown);
break;
case "mouseout":
case "MSPointerOut":
case "pointerout":
this._set("hovering",false);
this._set("active",false);
break;
case "mousedown":
case "touchstart":
case "MSPointerDown":
case "pointerdown":
case "keydown":
this._set("active",true);
break;
case "mouseup":
case "dojotouchend":
case "MSPointerUp":
case "pointerup":
case "keyup":
this._set("active",false);
break;
}
}
},_setStateClass:function(){
var _86=this.baseClass.split(" ");
function _87(_88){
_86=_86.concat(_7b.map(_86,function(c){
return c+_88;
}),"dijit"+_88);
};
if(!this.isLeftToRight()){
_87("Rtl");
}
var _89=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_87(_89);
}
if(this.state){
_87(this.state);
}
if(this.selected){
_87("Selected");
}
if(this._opened){
_87("Opened");
}
if(this.disabled){
_87("Disabled");
}else{
if(this.readOnly){
_87("ReadOnly");
}else{
if(this.active){
_87("Active");
}else{
if(this.hovering){
_87("Hover");
}
}
}
}
if(this.focused){
_87("Focused");
}
var tn=this.stateNode||this.domNode,_8a={};
_7b.forEach(tn.className.split(" "),function(c){
_8a[c]=true;
});
if("_stateClasses" in this){
_7b.forEach(this._stateClasses,function(c){
delete _8a[c];
});
}
_7b.forEach(_86,function(c){
_8a[c]=true;
});
var _8b=[];
for(var c in _8a){
_8b.push(c);
}
tn.className=_8b.join(" ");
this._stateClasses=_86;
},_subnodeCssMouseEvent:function(_8c,_8d,evt){
if(this.disabled||this.readOnly){
return;
}
function _8e(_8f){
_7d.toggle(_8c,_8d+"Hover",_8f);
};
function _90(_91){
_7d.toggle(_8c,_8d+"Active",_91);
};
function _92(_93){
_7d.toggle(_8c,_8d+"Focused",_93);
};
switch(evt.type){
case "mouseover":
case "MSPointerOver":
case "pointerover":
_8e(true);
break;
case "mouseout":
case "MSPointerOut":
case "pointerout":
_8e(false);
_90(false);
break;
case "mousedown":
case "touchstart":
case "MSPointerDown":
case "pointerdown":
case "keydown":
_90(true);
break;
case "mouseup":
case "MSPointerUp":
case "pointerup":
case "dojotouchend":
case "keyup":
_90(false);
break;
case "focus":
case "focusin":
_92(true);
break;
case "blur":
case "focusout":
_92(false);
break;
}
},_trackMouseState:function(_94,_95){
_94._cssState=_95;
}});
_7f(function(){
function _96(evt,_97,_98){
if(_98&&dom.isDescendant(_98,_97)){
return;
}
for(var _99=_97;_99&&_99!=_98;_99=_99.parentNode){
if(_99._cssState){
var _9a=_82.getEnclosingWidget(_99);
if(_9a){
if(_99==_9a.domNode){
_9a._cssMouseEvent(evt);
}else{
_9a._subnodeCssMouseEvent(_99,_99._cssState,evt);
}
}
}
}
};
var _9b=win.body(),_9c;
on(_9b,_80.over,function(evt){
_96(evt,evt.target,evt.relatedTarget);
});
on(_9b,_80.out,function(evt){
_96(evt,evt.target,evt.relatedTarget);
});
on(_9b,_81.press,function(evt){
_9c=evt.target;
_96(evt,_9c);
});
on(_9b,_81.release,function(evt){
_96(evt,_9c);
_9c=null;
});
on(_9b,"focusin, focusout",function(evt){
var _9d=evt.target;
if(_9d._cssState&&!_9d.getAttribute("widgetId")){
var _9e=_82.getEnclosingWidget(_9d);
if(_9e){
_9e._subnodeCssMouseEvent(_9d,_9d._cssState,evt);
}
}
});
});
return _83;
});
},"dijit/DialogUnderlay":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/aspect","dojo/dom-attr","dojo/dom-style","dojo/on","dojo/window","./_Widget","./_TemplatedMixin","./BackgroundIframe","./Viewport","./main"],function(_9f,_a0,_a1,_a2,_a3,on,_a4,_a5,_a6,_a7,_a8,_a9){
var _aa=_9f("dijit.DialogUnderlay",[_a5,_a6],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' tabIndex='-1' data-dojo-attach-point='node'></div></div>",dialogId:"","class":"",_modalConnects:[],_setDialogIdAttr:function(id){
_a2.set(this.node,"id",id+"_underlay");
this._set("dialogId",id);
},_setClassAttr:function(_ab){
this.node.className="dijitDialogUnderlay "+_ab;
this._set("class",_ab);
},postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
this.own(on(this.domNode,"keydown",_a0.hitch(this,"_onKeyDown")));
this.inherited(arguments);
},layout:function(){
var is=this.node.style,os=this.domNode.style;
os.display="none";
var _ac=_a4.getBox(this.ownerDocument);
os.top=_ac.t+"px";
os.left=_ac.l+"px";
is.width=_ac.w+"px";
is.height=_ac.h+"px";
os.display="block";
},show:function(){
this.domNode.style.display="block";
this.open=true;
this.layout();
this.bgIframe=new _a7(this.domNode);
var win=_a4.get(this.ownerDocument);
this._modalConnects=[_a8.on("resize",_a0.hitch(this,"layout")),on(win,"scroll",_a0.hitch(this,"layout"))];
},hide:function(){
this.bgIframe.destroy();
delete this.bgIframe;
this.domNode.style.display="none";
while(this._modalConnects.length){
(this._modalConnects.pop()).remove();
}
this.open=false;
},destroy:function(){
while(this._modalConnects.length){
(this._modalConnects.pop()).remove();
}
this.inherited(arguments);
},_onKeyDown:function(){
}});
_aa.show=function(_ad,_ae){
var _af=_aa._singleton;
if(!_af||_af._destroyed){
_af=_a9._underlay=_aa._singleton=new _aa(_ad);
}else{
if(_ad){
_af.set(_ad);
}
}
_a3.set(_af.domNode,"zIndex",_ae);
if(!_af.open){
_af.show();
}
};
_aa.hide=function(){
var _b0=_aa._singleton;
if(_b0&&!_b0._destroyed){
_b0.hide();
}
};
return _aa;
});
},"dijit/_editor/html":function(){
define(["dojo/_base/array","dojo/_base/lang","dojo/sniff"],function(_b1,_b2,has){
var _b3={};
_b2.setObject("dijit._editor.html",_b3);
var _b4=_b3.escapeXml=function(str,_b5){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_b5){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
_b3.getNodeHtml=function(_b6){
var _b7=[];
_b3.getNodeHtmlHelper(_b6,_b7);
return _b7.join("");
};
_b3.getNodeHtmlHelper=function(_b8,_b9){
switch(_b8.nodeType){
case 1:
var _ba=_b8.nodeName.toLowerCase();
if(!_ba||_ba.charAt(0)=="/"){
return "";
}
_b9.push("<",_ba);
var _bb=[],_bc={};
var _bd;
if(has("dom-attributes-explicit")||has("dom-attributes-specified-flag")){
var i=0;
while((_bd=_b8.attributes[i++])){
var n=_bd.name;
if(n.substr(0,3)!=="_dj"&&(!has("dom-attributes-specified-flag")||_bd.specified)&&!(n in _bc)){
var v=_bd.value;
if(n=="src"||n=="href"){
if(_b8.getAttribute("_djrealurl")){
v=_b8.getAttribute("_djrealurl");
}
}
if(has("ie")===8&&n==="style"){
v=v.replace("HEIGHT:","height:").replace("WIDTH:","width:");
}
_bb.push([n,v]);
_bc[n]=v;
}
}
}else{
var _be=/^input$|^img$/i.test(_b8.nodeName)?_b8:_b8.cloneNode(false);
var s=_be.outerHTML;
var _bf=/[\w-]+=("[^"]*"|'[^']*'|\S*)/gi;
var _c0=s.match(_bf);
s=s.substr(0,s.indexOf(">"));
_b1.forEach(_c0,function(_c1){
if(_c1){
var idx=_c1.indexOf("=");
if(idx>0){
var key=_c1.substring(0,idx);
if(key.substr(0,3)!="_dj"){
if(key=="src"||key=="href"){
if(_b8.getAttribute("_djrealurl")){
_bb.push([key,_b8.getAttribute("_djrealurl")]);
return;
}
}
var val,_c2;
switch(key){
case "style":
val=_b8.style.cssText.toLowerCase();
break;
case "class":
val=_b8.className;
break;
case "width":
if(_ba==="img"){
_c2=/width=(\S+)/i.exec(s);
if(_c2){
val=_c2[1];
}
break;
}
case "height":
if(_ba==="img"){
_c2=/height=(\S+)/i.exec(s);
if(_c2){
val=_c2[1];
}
break;
}
default:
val=_b8.getAttribute(key);
}
if(val!=null){
_bb.push([key,val.toString()]);
}
}
}
}
},this);
}
_bb.sort(function(a,b){
return a[0]<b[0]?-1:(a[0]==b[0]?0:1);
});
var j=0;
while((_bd=_bb[j++])){
_b9.push(" ",_bd[0],"=\"",(typeof _bd[1]==="string"?_b4(_bd[1],true):_bd[1]),"\"");
}
switch(_ba){
case "br":
case "hr":
case "img":
case "input":
case "base":
case "meta":
case "area":
case "basefont":
_b9.push(" />");
break;
case "script":
_b9.push(">",_b8.innerHTML,"</",_ba,">");
break;
default:
_b9.push(">");
if(_b8.hasChildNodes()){
_b3.getChildrenHtmlHelper(_b8,_b9);
}
_b9.push("</",_ba,">");
}
break;
case 4:
case 3:
_b9.push(_b4(_b8.nodeValue,true));
break;
case 8:
_b9.push("<!--",_b4(_b8.nodeValue,true),"-->");
break;
default:
_b9.push("<!-- Element not recognized - Type: ",_b8.nodeType," Name: ",_b8.nodeName,"-->");
}
};
_b3.getChildrenHtml=function(_c3){
var _c4=[];
_b3.getChildrenHtmlHelper(_c3,_c4);
return _c4.join("");
};
_b3.getChildrenHtmlHelper=function(dom,_c5){
if(!dom){
return;
}
var _c6=dom["childNodes"]||dom;
var _c7=!has("ie")||_c6!==dom;
var _c8,i=0;
while((_c8=_c6[i++])){
if(!_c7||_c8.parentNode==dom){
_b3.getNodeHtmlHelper(_c8,_c5);
}
}
};
return _b3;
});
},"dijit/place":function(){
define(["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","./Viewport","./main"],function(_c9,_ca,_cb,_cc,win,_cd,_ce){
function _cf(_d0,_d1,_d2,_d3){
var _d4=_cd.getEffectiveBox(_d0.ownerDocument);
if(!_d0.parentNode||String(_d0.parentNode.tagName).toLowerCase()!="body"){
win.body(_d0.ownerDocument).appendChild(_d0);
}
var _d5=null;
_c9.some(_d1,function(_d6){
var _d7=_d6.corner;
var pos=_d6.pos;
var _d8=0;
var _d9={w:{"L":_d4.l+_d4.w-pos.x,"R":pos.x-_d4.l,"M":_d4.w}[_d7.charAt(1)],h:{"T":_d4.t+_d4.h-pos.y,"B":pos.y-_d4.t,"M":_d4.h}[_d7.charAt(0)]};
var s=_d0.style;
s.left=s.right="auto";
if(_d2){
var res=_d2(_d0,_d6.aroundCorner,_d7,_d9,_d3);
_d8=typeof res=="undefined"?0:res;
}
var _da=_d0.style;
var _db=_da.display;
var _dc=_da.visibility;
if(_da.display=="none"){
_da.visibility="hidden";
_da.display="";
}
var bb=_ca.position(_d0);
_da.display=_db;
_da.visibility=_dc;
var _dd={"L":pos.x,"R":pos.x-bb.w,"M":Math.max(_d4.l,Math.min(_d4.l+_d4.w,pos.x+(bb.w>>1))-bb.w)}[_d7.charAt(1)],_de={"T":pos.y,"B":pos.y-bb.h,"M":Math.max(_d4.t,Math.min(_d4.t+_d4.h,pos.y+(bb.h>>1))-bb.h)}[_d7.charAt(0)],_df=Math.max(_d4.l,_dd),_e0=Math.max(_d4.t,_de),_e1=Math.min(_d4.l+_d4.w,_dd+bb.w),_e2=Math.min(_d4.t+_d4.h,_de+bb.h),_e3=_e1-_df,_e4=_e2-_e0;
_d8+=(bb.w-_e3)+(bb.h-_e4);
if(_d5==null||_d8<_d5.overflow){
_d5={corner:_d7,aroundCorner:_d6.aroundCorner,x:_df,y:_e0,w:_e3,h:_e4,overflow:_d8,spaceAvailable:_d9};
}
return !_d8;
});
if(_d5.overflow&&_d2){
_d2(_d0,_d5.aroundCorner,_d5.corner,_d5.spaceAvailable,_d3);
}
var l=_ca.isBodyLtr(_d0.ownerDocument),top=_d5.y,_e5=l?_d5.x:_d4.w-_d5.x-_d5.w;
if(/relative|absolute/.test(_cb.get(win.body(_d0.ownerDocument),"position"))){
top-=_cb.get(win.body(_d0.ownerDocument),"marginTop");
_e5-=(l?1:-1)*_cb.get(win.body(_d0.ownerDocument),l?"marginLeft":"marginRight");
}
var s=_d0.style;
s.top=top+"px";
s[l?"left":"right"]=_e5+"px";
s[l?"right":"left"]="auto";
return _d5;
};
var _e6={"TL":"BR","TR":"BL","BL":"TR","BR":"TL"};
var _e7={at:function(_e8,pos,_e9,_ea,_eb){
var _ec=_c9.map(_e9,function(_ed){
var c={corner:_ed,aroundCorner:_e6[_ed],pos:{x:pos.x,y:pos.y}};
if(_ea){
c.pos.x+=_ed.charAt(1)=="L"?_ea.x:-_ea.x;
c.pos.y+=_ed.charAt(0)=="T"?_ea.y:-_ea.y;
}
return c;
});
return _cf(_e8,_ec,_eb);
},around:function(_ee,_ef,_f0,_f1,_f2){
var _f3;
if(typeof _ef=="string"||"offsetWidth" in _ef){
_f3=_ca.position(_ef,true);
if(/^(above|below)/.test(_f0[0])){
var _f4=_ca.getBorderExtents(_ef),_f5=_ef.firstChild?_ca.getBorderExtents(_ef.firstChild):{t:0,l:0,b:0,r:0},_f6=_ca.getBorderExtents(_ee),_f7=_ee.firstChild?_ca.getBorderExtents(_ee.firstChild):{t:0,l:0,b:0,r:0};
_f3.y+=Math.min(_f4.t+_f5.t,_f6.t+_f7.t);
_f3.h-=Math.min(_f4.t+_f5.t,_f6.t+_f7.t)+Math.min(_f4.b+_f5.b,_f6.b+_f7.b);
}
}else{
_f3=_ef;
}
if(_ef.parentNode){
var _f8=_cb.getComputedStyle(_ef).position=="absolute";
var _f9=_ef.parentNode;
while(_f9&&_f9.nodeType==1&&_f9.nodeName!="BODY"){
var _fa=_ca.position(_f9,true),pcs=_cb.getComputedStyle(_f9);
if(/relative|absolute/.test(pcs.position)){
_f8=false;
}
if(!_f8&&/hidden|auto|scroll/.test(pcs.overflow)){
var _fb=Math.min(_f3.y+_f3.h,_fa.y+_fa.h);
var _fc=Math.min(_f3.x+_f3.w,_fa.x+_fa.w);
_f3.x=Math.max(_f3.x,_fa.x);
_f3.y=Math.max(_f3.y,_fa.y);
_f3.h=_fb-_f3.y;
_f3.w=_fc-_f3.x;
}
if(pcs.position=="absolute"){
_f8=true;
}
_f9=_f9.parentNode;
}
}
var x=_f3.x,y=_f3.y,_fd="w" in _f3?_f3.w:(_f3.w=_f3.width),_fe="h" in _f3?_f3.h:(_cc.deprecated("place.around: dijit/place.__Rectangle: { x:"+x+", y:"+y+", height:"+_f3.height+", width:"+_fd+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_f3.height+", w:"+_fd+" }","","2.0"),_f3.h=_f3.height);
var _ff=[];
function push(_100,_101){
_ff.push({aroundCorner:_100,corner:_101,pos:{x:{"L":x,"R":x+_fd,"M":x+(_fd>>1)}[_100.charAt(1)],y:{"T":y,"B":y+_fe,"M":y+(_fe>>1)}[_100.charAt(0)]}});
};
_c9.forEach(_f0,function(pos){
var ltr=_f1;
switch(pos){
case "above-centered":
push("TM","BM");
break;
case "below-centered":
push("BM","TM");
break;
case "after-centered":
ltr=!ltr;
case "before-centered":
push(ltr?"ML":"MR",ltr?"MR":"ML");
break;
case "after":
ltr=!ltr;
case "before":
push(ltr?"TL":"TR",ltr?"TR":"TL");
push(ltr?"BL":"BR",ltr?"BR":"BL");
break;
case "below-alt":
ltr=!ltr;
case "below":
push(ltr?"BL":"BR",ltr?"TL":"TR");
push(ltr?"BR":"BL",ltr?"TR":"TL");
break;
case "above-alt":
ltr=!ltr;
case "above":
push(ltr?"TL":"TR",ltr?"BL":"BR");
push(ltr?"TR":"TL",ltr?"BR":"BL");
break;
default:
push(pos.aroundCorner,pos.corner);
}
});
var _102=_cf(_ee,_ff,_f2,{w:_fd,h:_fe});
_102.aroundNodePos=_f3;
return _102;
}};
return _ce.place=_e7;
});
},"dijit/_HasDropDown":function(){
define(["dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","dojo/touch","./registry","./focus","./popup","./_FocusMixin"],function(_103,_104,dom,_105,_106,_107,_108,has,keys,lang,on,_109,_10a,_10b,_10c,_10d){
return _103("dijit._HasDropDown",_10d,{_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:-1,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
if(e.type!="MSPointerDown"&&e.type!="pointerdown"){
e.preventDefault();
}
this._docHandler=this.own(on(this.ownerDocument,_109.release,lang.hitch(this,"_onDropDownMouseUp")))[0];
this.toggleDropDown();
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this._docHandler.remove();
this._docHandler=null;
}
var _10e=this.dropDown,_10f=false;
if(e&&this._opened){
var c=_107.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_10f){
if(_106.contains(t,"dijitPopup")){
_10f=true;
}else{
t=t.parentNode;
}
}
if(_10f){
t=e.target;
if(_10e.onItemClick){
var _110;
while(t&&!(_110=_10a.byNode(t))){
t=t.parentNode;
}
if(_110&&_110.onClick&&_110.getParent){
_110.getParent().onItemClick(_110,e);
}
}
return;
}
}
}
if(this._opened){
if(_10e.focus&&(_10e.autoFocus!==false||(e.type=="mouseup"&&!this.hovering))){
this._focusDropDownTimer=this.defer(function(){
_10e.focus();
delete this._focusDropDownTimer;
});
}
}else{
if(this.focus){
this.defer("focus");
}
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
e.stopPropagation();
e.preventDefault();
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _111={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
_106.add(this._arrowWrapperNode||this._buttonNode,"dijit"+_111+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
var _112=this.focusNode||this.domNode;
this.own(on(this._buttonNode,_109.press,lang.hitch(this,"_onDropDownMouseDown")),on(this._buttonNode,"click",lang.hitch(this,"_onDropDownClick")),on(_112,"keydown",lang.hitch(this,"_onKey")),on(_112,"keyup",lang.hitch(this,"_onKeyUp")));
},destroy:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown,_113=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
e.stopPropagation();
e.preventDefault();
return;
}
}
if(d&&this._opened&&e.keyCode==keys.ESCAPE){
this.closeDropDown();
e.stopPropagation();
e.preventDefault();
}else{
if(!this._opened&&(e.keyCode==keys.DOWN_ARROW||((e.keyCode==keys.ENTER||(e.keyCode==keys.SPACE&&(!this._searchTimer||(e.ctrlKey||e.altKey||e.metaKey))))&&((_113.tagName||"").toLowerCase()!=="input"||(_113.type&&_113.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
e.stopPropagation();
e.preventDefault();
}
}
},_onKeyUp:function(){
if(this._toggleOnKeyUp){
delete this._toggleOnKeyUp;
this.toggleDropDown();
var d=this.dropDown;
if(d&&d.focus){
this.defer(lang.hitch(d,"focus"),1);
}
}
},_onBlur:function(){
this.closeDropDown(false);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_114){
_114();
},loadAndOpenDropDown:function(){
var d=new _104(),_115=lang.hitch(this,function(){
this.openDropDown();
d.resolve(this.dropDown);
});
if(!this.isLoaded()){
this.loadDropDown(_115);
}else{
_115();
}
return d;
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
if(!this._opened){
this.loadAndOpenDropDown();
}else{
this.closeDropDown(true);
}
},openDropDown:function(){
var _116=this.dropDown,_117=_116.domNode,_118=this._aroundNode||this.domNode,self=this;
var _119=_10c.open({parent:this,popup:_116,around:_118,orient:this.dropDownPosition,maxHeight:this.maxHeight,onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
_105.set(self._popupStateNode,"popupActive",false);
_106.remove(self._popupStateNode,"dijitHasDropDownOpen");
self._set("_opened",false);
}});
if(this.forceWidth||(this.autoWidth&&_118.offsetWidth>_116._popupWrapper.offsetWidth)){
var _11a={w:_118.offsetWidth-(_116._popupWrapper.offsetWidth-_116.domNode.offsetWidth)};
if(lang.isFunction(_116.resize)){
_116.resize(_11a);
}else{
_107.setMarginBox(_117,_11a);
}
}
_105.set(this._popupStateNode,"popupActive","true");
_106.add(this._popupStateNode,"dijitHasDropDownOpen");
this._set("_opened",true);
this._popupStateNode.setAttribute("aria-expanded","true");
this._popupStateNode.setAttribute("aria-owns",_116.id);
if(_117.getAttribute("role")!=="presentation"&&!_117.getAttribute("aria-labelledby")){
_117.setAttribute("aria-labelledby",this.id);
}
return _119;
},closeDropDown:function(_11b){
if(this._focusDropDownTimer){
this._focusDropDownTimer.remove();
delete this._focusDropDownTimer;
}
if(this._opened){
this._popupStateNode.setAttribute("aria-expanded","false");
if(_11b){
this.focus();
}
_10c.close(this.dropDown);
this._opened=false;
}
}});
});
},"dijit/tree/TreeStoreModel":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/lang"],function(_11c,_11d,_11e,lang){
return _11e("dijit.tree.TreeStoreModel",null,{store:null,childrenAttrs:["children"],newItemIdAttr:"id",labelAttr:"",root:null,query:null,deferItemLoadingUntilExpand:false,constructor:function(args){
lang.mixin(this,args);
this.connects=[];
var _11f=this.store;
if(!_11f.getFeatures()["dojo.data.api.Identity"]){
throw new Error("dijit.tree.TreeStoreModel: store must support dojo.data.Identity");
}
if(_11f.getFeatures()["dojo.data.api.Notification"]){
this.connects=this.connects.concat([_11d.after(_11f,"onNew",lang.hitch(this,"onNewItem"),true),_11d.after(_11f,"onDelete",lang.hitch(this,"onDeleteItem"),true),_11d.after(_11f,"onSet",lang.hitch(this,"onSetItem"),true)]);
}
},destroy:function(){
var h;
while(h=this.connects.pop()){
h.remove();
}
},getRoot:function(_120,_121){
if(this.root){
_120(this.root);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_122){
if(_122.length!=1){
throw new Error("dijit.tree.TreeStoreModel: root query returned "+_122.length+" items, but must return exactly one");
}
this.root=_122[0];
_120(this.root);
}),onError:_121});
}
},mayHaveChildren:function(item){
return _11c.some(this.childrenAttrs,function(attr){
return this.store.hasAttribute(item,attr);
},this);
},getChildren:function(_123,_124,_125){
var _126=this.store;
if(!_126.isItemLoaded(_123)){
var _127=lang.hitch(this,arguments.callee);
_126.loadItem({item:_123,onItem:function(_128){
_127(_128,_124,_125);
},onError:_125});
return;
}
var _129=[];
for(var i=0;i<this.childrenAttrs.length;i++){
var vals=_126.getValues(_123,this.childrenAttrs[i]);
_129=_129.concat(vals);
}
var _12a=0;
if(!this.deferItemLoadingUntilExpand){
_11c.forEach(_129,function(item){
if(!_126.isItemLoaded(item)){
_12a++;
}
});
}
if(_12a==0){
_124(_129);
}else{
_11c.forEach(_129,function(item,idx){
if(!_126.isItemLoaded(item)){
_126.loadItem({item:item,onItem:function(item){
_129[idx]=item;
if(--_12a==0){
_124(_129);
}
},onError:_125});
}
});
}
},isItem:function(_12b){
return this.store.isItem(_12b);
},fetchItemByIdentity:function(_12c){
this.store.fetchItemByIdentity(_12c);
},getIdentity:function(item){
return this.store.getIdentity(item);
},getLabel:function(item){
if(this.labelAttr){
return this.store.getValue(item,this.labelAttr);
}else{
return this.store.getLabel(item);
}
},newItem:function(args,_12d,_12e){
var _12f={parent:_12d,attribute:this.childrenAttrs[0]},_130;
if(this.newItemIdAttr&&args[this.newItemIdAttr]){
this.fetchItemByIdentity({identity:args[this.newItemIdAttr],scope:this,onItem:function(item){
if(item){
this.pasteItem(item,null,_12d,true,_12e);
}else{
_130=this.store.newItem(args,_12f);
if(_130&&(_12e!=undefined)){
this.pasteItem(_130,_12d,_12d,false,_12e);
}
}
}});
}else{
_130=this.store.newItem(args,_12f);
if(_130&&(_12e!=undefined)){
this.pasteItem(_130,_12d,_12d,false,_12e);
}
}
},pasteItem:function(_131,_132,_133,_134,_135){
var _136=this.store,_137=this.childrenAttrs[0];
if(_132){
_11c.forEach(this.childrenAttrs,function(attr){
if(_136.containsValue(_132,attr,_131)){
if(!_134){
var _138=_11c.filter(_136.getValues(_132,attr),function(x){
return x!=_131;
});
_136.setValues(_132,attr,_138);
}
_137=attr;
}
});
}
if(_133){
if(typeof _135=="number"){
var _139=_136.getValues(_133,_137).slice();
_139.splice(_135,0,_131);
_136.setValues(_133,_137,_139);
}else{
_136.setValues(_133,_137,_136.getValues(_133,_137).concat(_131));
}
}
},onChange:function(){
},onChildrenChange:function(){
},onDelete:function(){
},onNewItem:function(item,_13a){
if(!_13a){
return;
}
this.getChildren(_13a.item,lang.hitch(this,function(_13b){
this.onChildrenChange(_13a.item,_13b);
}));
},onDeleteItem:function(item){
this.onDelete(item);
},onSetItem:function(item,_13c){
if(_11c.indexOf(this.childrenAttrs,_13c)!=-1){
this.getChildren(item,lang.hitch(this,function(_13d){
this.onChildrenChange(item,_13d);
}));
}else{
this.onChange(item);
}
}});
});
},"dijit/_editor/plugins/EnterKeyHandling":function(){
define(["dojo/_base/declare","dojo/dom-construct","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","dojo/_base/window","dojo/window","../_Plugin","../RichText","../range","../../_base/focus"],function(_13e,_13f,keys,lang,on,has,win,_140,_141,_142,_143,_144){
return _13e("dijit._editor.plugins.EnterKeyHandling",_141,{blockNodeForEnter:"BR",constructor:function(args){
if(args){
if("blockNodeForEnter" in args){
args.blockNodeForEnter=args.blockNodeForEnter.toUpperCase();
}
lang.mixin(this,args);
}
},setEditor:function(_145){
if(this.editor===_145){
return;
}
this.editor=_145;
if(this.blockNodeForEnter=="BR"){
this.editor.customUndo=true;
_145.onLoadDeferred.then(lang.hitch(this,function(d){
this.own(on(_145.document,"keydown",lang.hitch(this,function(e){
if(e.keyCode==keys.ENTER){
var ne=lang.mixin({},e);
ne.shiftKey=true;
if(!this.handleEnterKey(ne)){
e.stopPropagation();
e.preventDefault();
}
}
})));
if(has("ie")>=9&&has("ie")<=10){
this.own(on(_145.document,"paste",lang.hitch(this,function(e){
setTimeout(lang.hitch(this,function(){
var r=this.editor.document.selection.createRange();
r.move("character",-1);
r.select();
r.move("character",1);
r.select();
}),0);
})));
}
return d;
}));
}else{
if(this.blockNodeForEnter){
var h=lang.hitch(this,"handleEnterKey");
_145.addKeyHandler(13,0,0,h);
_145.addKeyHandler(13,0,1,h);
this.own(this.editor.on("KeyPressed",lang.hitch(this,"onKeyPressed")));
}
}
},onKeyPressed:function(){
if(this._checkListLater){
if(win.withGlobal(this.editor.window,"isCollapsed",_144)){
var _146=this.editor.selection.getAncestorElement("LI");
if(!_146){
_142.prototype.execCommand.call(this.editor,"formatblock",this.blockNodeForEnter);
var _147=this.editor.selection.getAncestorElement(this.blockNodeForEnter);
if(_147){
_147.innerHTML=this.bogusHtmlContent;
if(has("ie")<=9){
var r=this.editor.document.selection.createRange();
r.move("character",-1);
r.select();
}
}else{
console.error("onKeyPressed: Cannot find the new block node");
}
}else{
if(has("mozilla")){
if(_146.parentNode.parentNode.nodeName=="LI"){
_146=_146.parentNode.parentNode;
}
}
var fc=_146.firstChild;
if(fc&&fc.nodeType==1&&(fc.nodeName=="UL"||fc.nodeName=="OL")){
_146.insertBefore(fc.ownerDocument.createTextNode(" "),fc);
var _148=_143.create(this.editor.window);
_148.setStart(_146.firstChild,0);
var _149=_143.getSelection(this.editor.window,true);
_149.removeAllRanges();
_149.addRange(_148);
}
}
}
this._checkListLater=false;
}
if(this._pressedEnterInBlock){
if(this._pressedEnterInBlock.previousSibling){
this.removeTrailingBr(this._pressedEnterInBlock.previousSibling);
}
delete this._pressedEnterInBlock;
}
},bogusHtmlContent:"&#160;",blockNodes:/^(?:P|H1|H2|H3|H4|H5|H6|LI)$/,handleEnterKey:function(e){
var _14a,_14b,_14c,_14d,_14e,_14f,doc=this.editor.document,br,rs,txt;
if(e.shiftKey){
var _150=this.editor.selection.getParentElement();
var _151=_143.getAncestor(_150,this.blockNodes);
if(_151){
if(_151.tagName=="LI"){
return true;
}
_14a=_143.getSelection(this.editor.window);
_14b=_14a.getRangeAt(0);
if(!_14b.collapsed){
_14b.deleteContents();
_14a=_143.getSelection(this.editor.window);
_14b=_14a.getRangeAt(0);
}
if(_143.atBeginningOfContainer(_151,_14b.startContainer,_14b.startOffset)){
br=doc.createElement("br");
_14c=_143.create(this.editor.window);
_151.insertBefore(br,_151.firstChild);
_14c.setStartAfter(br);
_14a.removeAllRanges();
_14a.addRange(_14c);
}else{
if(_143.atEndOfContainer(_151,_14b.startContainer,_14b.startOffset)){
_14c=_143.create(this.editor.window);
br=doc.createElement("br");
_151.appendChild(br);
_151.appendChild(doc.createTextNode(" "));
_14c.setStart(_151.lastChild,0);
_14a.removeAllRanges();
_14a.addRange(_14c);
}else{
rs=_14b.startContainer;
if(rs&&rs.nodeType==3){
txt=rs.nodeValue;
_14d=doc.createTextNode(txt.substring(0,_14b.startOffset));
_14e=doc.createTextNode(txt.substring(_14b.startOffset));
_14f=doc.createElement("br");
if(_14e.nodeValue==""&&has("webkit")){
_14e=doc.createTextNode(" ");
}
_13f.place(_14d,rs,"after");
_13f.place(_14f,_14d,"after");
_13f.place(_14e,_14f,"after");
_13f.destroy(rs);
_14c=_143.create(this.editor.window);
_14c.setStart(_14e,0);
_14a.removeAllRanges();
_14a.addRange(_14c);
return false;
}
return true;
}
}
}else{
_14a=_143.getSelection(this.editor.window);
if(_14a.rangeCount){
_14b=_14a.getRangeAt(0);
if(_14b&&_14b.startContainer){
if(!_14b.collapsed){
_14b.deleteContents();
_14a=_143.getSelection(this.editor.window);
_14b=_14a.getRangeAt(0);
}
rs=_14b.startContainer;
if(rs&&rs.nodeType==3){
var _152=false;
var _153=_14b.startOffset;
if(rs.length<_153){
ret=this._adjustNodeAndOffset(rs,_153);
rs=ret.node;
_153=ret.offset;
}
txt=rs.nodeValue;
_14d=doc.createTextNode(txt.substring(0,_153));
_14e=doc.createTextNode(txt.substring(_153));
_14f=doc.createElement("br");
if(!_14e.length){
_14e=doc.createTextNode(" ");
_152=true;
}
if(_14d.length){
_13f.place(_14d,rs,"after");
}else{
_14d=rs;
}
_13f.place(_14f,_14d,"after");
_13f.place(_14e,_14f,"after");
_13f.destroy(rs);
_14c=_143.create(this.editor.window);
_14c.setStart(_14e,0);
_14c.setEnd(_14e,_14e.length);
_14a.removeAllRanges();
_14a.addRange(_14c);
if(_152&&!has("webkit")){
this.editor.selection.remove();
}else{
this.editor.selection.collapse(true);
}
}else{
var _154;
if(_14b.startOffset>=0){
_154=rs.childNodes[_14b.startOffset];
}
var _14f=doc.createElement("br");
var _14e=doc.createTextNode(" ");
if(!_154){
rs.appendChild(_14f);
rs.appendChild(_14e);
}else{
_13f.place(_14f,_154,"before");
_13f.place(_14e,_14f,"after");
}
_14c=_143.create(this.editor.window);
_14c.setStart(_14e,0);
_14c.setEnd(_14e,_14e.length);
_14a.removeAllRanges();
_14a.addRange(_14c);
this.editor.selection.collapse(true);
}
}
}else{
_142.prototype.execCommand.call(this.editor,"inserthtml","<br>");
}
}
return false;
}
var _155=true;
_14a=_143.getSelection(this.editor.window);
_14b=_14a.getRangeAt(0);
if(!_14b.collapsed){
_14b.deleteContents();
_14a=_143.getSelection(this.editor.window);
_14b=_14a.getRangeAt(0);
}
var _156=_143.getBlockAncestor(_14b.endContainer,null,this.editor.editNode);
var _157=_156.blockNode;
if((this._checkListLater=(_157&&(_157.nodeName=="LI"||_157.parentNode.nodeName=="LI")))){
if(has("mozilla")){
this._pressedEnterInBlock=_157;
}
if(/^(\s|&nbsp;|&#160;|\xA0|<span\b[^>]*\bclass=['"]Apple-style-span['"][^>]*>(\s|&nbsp;|&#160;|\xA0)<\/span>)?(<br>)?$/.test(_157.innerHTML)){
_157.innerHTML="";
if(has("webkit")){
_14c=_143.create(this.editor.window);
_14c.setStart(_157,0);
_14a.removeAllRanges();
_14a.addRange(_14c);
}
this._checkListLater=false;
}
return true;
}
if(!_156.blockNode||_156.blockNode===this.editor.editNode){
try{
_142.prototype.execCommand.call(this.editor,"formatblock",this.blockNodeForEnter);
}
catch(e2){
}
_156={blockNode:this.editor.selection.getAncestorElement(this.blockNodeForEnter),blockContainer:this.editor.editNode};
if(_156.blockNode){
if(_156.blockNode!=this.editor.editNode&&(!(_156.blockNode.textContent||_156.blockNode.innerHTML).replace(/^\s+|\s+$/g,"").length)){
this.removeTrailingBr(_156.blockNode);
return false;
}
}else{
_156.blockNode=this.editor.editNode;
}
_14a=_143.getSelection(this.editor.window);
_14b=_14a.getRangeAt(0);
}
var _158=doc.createElement(this.blockNodeForEnter);
_158.innerHTML=this.bogusHtmlContent;
this.removeTrailingBr(_156.blockNode);
var _159=_14b.endOffset;
var node=_14b.endContainer;
if(node.length<_159){
var ret=this._adjustNodeAndOffset(node,_159);
node=ret.node;
_159=ret.offset;
}
if(_143.atEndOfContainer(_156.blockNode,node,_159)){
if(_156.blockNode===_156.blockContainer){
_156.blockNode.appendChild(_158);
}else{
_13f.place(_158,_156.blockNode,"after");
}
_155=false;
_14c=_143.create(this.editor.window);
_14c.setStart(_158,0);
_14a.removeAllRanges();
_14a.addRange(_14c);
if(this.editor.height){
_140.scrollIntoView(_158);
}
}else{
if(_143.atBeginningOfContainer(_156.blockNode,_14b.startContainer,_14b.startOffset)){
_13f.place(_158,_156.blockNode,_156.blockNode===_156.blockContainer?"first":"before");
if(_158.nextSibling&&this.editor.height){
_14c=_143.create(this.editor.window);
_14c.setStart(_158.nextSibling,0);
_14a.removeAllRanges();
_14a.addRange(_14c);
_140.scrollIntoView(_158.nextSibling);
}
_155=false;
}else{
if(_156.blockNode===_156.blockContainer){
_156.blockNode.appendChild(_158);
}else{
_13f.place(_158,_156.blockNode,"after");
}
_155=false;
if(_156.blockNode.style){
if(_158.style){
if(_156.blockNode.style.cssText){
_158.style.cssText=_156.blockNode.style.cssText;
}
}
}
rs=_14b.startContainer;
var _15a;
if(rs&&rs.nodeType==3){
var _15b,_15c;
_159=_14b.endOffset;
if(rs.length<_159){
ret=this._adjustNodeAndOffset(rs,_159);
rs=ret.node;
_159=ret.offset;
}
txt=rs.nodeValue;
_14d=doc.createTextNode(txt.substring(0,_159));
_14e=doc.createTextNode(txt.substring(_159,txt.length));
_13f.place(_14d,rs,"before");
_13f.place(_14e,rs,"after");
_13f.destroy(rs);
var _15d=_14d.parentNode;
while(_15d!==_156.blockNode){
var tg=_15d.tagName;
var _15e=doc.createElement(tg);
if(_15d.style){
if(_15e.style){
if(_15d.style.cssText){
_15e.style.cssText=_15d.style.cssText;
}
}
}
if(_15d.tagName==="FONT"){
if(_15d.color){
_15e.color=_15d.color;
}
if(_15d.face){
_15e.face=_15d.face;
}
if(_15d.size){
_15e.size=_15d.size;
}
}
_15b=_14e;
while(_15b){
_15c=_15b.nextSibling;
_15e.appendChild(_15b);
_15b=_15c;
}
_13f.place(_15e,_15d,"after");
_14d=_15d;
_14e=_15e;
_15d=_15d.parentNode;
}
_15b=_14e;
if(_15b.nodeType==1||(_15b.nodeType==3&&_15b.nodeValue)){
_158.innerHTML="";
}
_15a=_15b;
while(_15b){
_15c=_15b.nextSibling;
_158.appendChild(_15b);
_15b=_15c;
}
}
_14c=_143.create(this.editor.window);
var _15f;
var _160=_15a;
if(this.blockNodeForEnter!=="BR"){
while(_160){
_15f=_160;
_15c=_160.firstChild;
_160=_15c;
}
if(_15f&&_15f.parentNode){
_158=_15f.parentNode;
_14c.setStart(_158,0);
_14a.removeAllRanges();
_14a.addRange(_14c);
if(this.editor.height){
_140.scrollIntoView(_158);
}
if(has("mozilla")){
this._pressedEnterInBlock=_156.blockNode;
}
}else{
_155=true;
}
}else{
_14c.setStart(_158,0);
_14a.removeAllRanges();
_14a.addRange(_14c);
if(this.editor.height){
_140.scrollIntoView(_158);
}
if(has("mozilla")){
this._pressedEnterInBlock=_156.blockNode;
}
}
}
}
return _155;
},_adjustNodeAndOffset:function(node,_161){
while(node.length<_161&&node.nextSibling&&node.nextSibling.nodeType==3){
_161=_161-node.length;
node=node.nextSibling;
}
return {"node":node,"offset":_161};
},removeTrailingBr:function(_162){
var para=/P|DIV|LI/i.test(_162.tagName)?_162:this.editor.selection.getParentOfType(_162,["P","DIV","LI"]);
if(!para){
return;
}
if(para.lastChild){
if((para.childNodes.length>1&&para.lastChild.nodeType==3&&/^[\s\xAD]*$/.test(para.lastChild.nodeValue))||para.lastChild.tagName=="BR"){
_13f.destroy(para.lastChild);
}
}
if(!para.childNodes.length){
para.innerHTML=this.bogusHtmlContent;
}
}});
});
},"dijit/_MenuBase":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/lang","dojo/mouse","dojo/on","dojo/window","./a11yclick","./registry","./_Widget","./_CssStateMixin","./_KeyNavContainer","./_TemplatedMixin"],function(_163,_164,dom,_165,_166,lang,_167,on,_168,_169,_16a,_16b,_16c,_16d,_16e){
return _164("dijit._MenuBase",[_16b,_16e,_16d,_16c],{selected:null,_setSelectedAttr:function(item){
if(this.selected!=item){
if(this.selected){
this.selected._setSelected(false);
this._onChildDeselect(this.selected);
}
if(item){
item._setSelected(true);
}
this._set("selected",item);
}
},activated:false,_setActivatedAttr:function(val){
_166.toggle(this.domNode,"dijitMenuActive",val);
_166.toggle(this.domNode,"dijitMenuPassive",!val);
this._set("activated",val);
},parentMenu:null,popupDelay:500,passivePopupDelay:Infinity,autoFocus:false,childSelector:function(node){
var _16f=_16a.byNode(node);
return node.parentNode==this.containerNode&&_16f&&_16f.focus;
},postCreate:function(){
var self=this,_170=typeof this.childSelector=="string"?this.childSelector:lang.hitch(this,"childSelector");
this.own(on(this.containerNode,on.selector(_170,_167.enter),function(){
self.onItemHover(_16a.byNode(this));
}),on(this.containerNode,on.selector(_170,_167.leave),function(){
self.onItemUnhover(_16a.byNode(this));
}),on(this.containerNode,on.selector(_170,_169),function(evt){
self.onItemClick(_16a.byNode(this),evt);
evt.stopPropagation();
evt.preventDefault();
}));
this.inherited(arguments);
},onKeyboardSearch:function(item,evt,_171,_172){
this.inherited(arguments);
if(!!item&&(_172==-1||(!!item.popup&&_172==1))){
this.onItemClick(item,evt);
}
},_keyboardSearchCompare:function(item,_173){
if(!!item.shortcutKey){
return _173==item.shortcutKey.toLowerCase()?-1:0;
}
return this.inherited(arguments)?1:0;
},onExecute:function(){
},onCancel:function(){
},_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.onItemClick(this.focusedChild,evt);
}else{
var _174=this._getTopMenu();
if(_174&&_174._isMenuBar){
_174.focusNext();
}
}
},_onPopupHover:function(){
this.set("selected",this.currentPopupItem);
this._stopPendingCloseTimer();
},onItemHover:function(item){
if(this.activated){
this.set("selected",item);
if(item.popup&&!item.disabled&&!this.hover_timer){
this.hover_timer=this.defer(function(){
this._openItemPopup(item);
},this.popupDelay);
}
}else{
if(this.passivePopupDelay<Infinity){
if(this.passive_hover_timer){
this.passive_hover_timer.remove();
}
this.passive_hover_timer=this.defer(function(){
this.onItemClick(item,{type:"click"});
},this.passivePopupDelay);
}
}
this._hoveredChild=item;
item._set("hovering",true);
},_onChildDeselect:function(item){
this._stopPopupTimer();
if(this.currentPopupItem==item){
this._stopPendingCloseTimer();
this._pendingClose_timer=this.defer(function(){
this._pendingClose_timer=null;
this.currentPopupItem=null;
item._closePopup();
},this.popupDelay);
}
},onItemUnhover:function(item){
if(this._hoveredChild==item){
this._hoveredChild=null;
}
if(this.passive_hover_timer){
this.passive_hover_timer.remove();
this.passive_hover_timer=null;
}
item._set("hovering",false);
},_stopPopupTimer:function(){
if(this.hover_timer){
this.hover_timer=this.hover_timer.remove();
}
},_stopPendingCloseTimer:function(){
if(this._pendingClose_timer){
this._pendingClose_timer=this._pendingClose_timer.remove();
}
},_getTopMenu:function(){
for(var top=this;top.parentMenu;top=top.parentMenu){
}
return top;
},onItemClick:function(item,evt){
if(this.passive_hover_timer){
this.passive_hover_timer.remove();
}
this.focusChild(item);
if(item.disabled){
return false;
}
if(item.popup){
this.set("selected",item);
this.set("activated",true);
var _175=/^key/.test(evt._origType||evt.type)||(evt.clientX==0&&evt.clientY==0);
this._openItemPopup(item,_175);
}else{
this.onExecute();
item._onClick?item._onClick(evt):item.onClick(evt);
}
},_openItemPopup:function(_176,_177){
if(_176==this.currentPopupItem){
return;
}
if(this.currentPopupItem){
this._stopPendingCloseTimer();
this.currentPopupItem._closePopup();
}
this._stopPopupTimer();
var _178=_176.popup;
_178.parentMenu=this;
this.own(this._mouseoverHandle=on.once(_178.domNode,"mouseover",lang.hitch(this,"_onPopupHover")));
var self=this;
_176._openPopup({parent:this,orient:this._orient||["after","before"],onCancel:function(){
if(_177){
self.focusChild(_176);
}
self._cleanUp();
},onExecute:lang.hitch(this,"_cleanUp",true),onClose:function(){
if(self._mouseoverHandle){
self._mouseoverHandle.remove();
delete self._mouseoverHandle;
}
}},_177);
this.currentPopupItem=_176;
},onOpen:function(){
this.isShowingNow=true;
this.set("activated",true);
},onClose:function(){
this.set("activated",false);
this.set("selected",null);
this.isShowingNow=false;
this.parentMenu=null;
},_closeChild:function(){
this._stopPopupTimer();
if(this.currentPopupItem){
if(this.focused){
_165.set(this.selected.focusNode,"tabIndex",this.tabIndex);
this.selected.focusNode.focus();
}
this.currentPopupItem._closePopup();
this.currentPopupItem=null;
}
},_onItemFocus:function(item){
if(this._hoveredChild&&this._hoveredChild!=item){
this.onItemUnhover(this._hoveredChild);
}
this.set("selected",item);
},_onBlur:function(){
this._cleanUp(true);
this.inherited(arguments);
},_cleanUp:function(_179){
this._closeChild();
if(typeof this.isShowingNow=="undefined"){
this.set("activated",false);
}
if(_179){
this.set("selected",null);
}
}});
});
},"dijit/focus":function(){
define(["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/domReady","dojo/sniff","dojo/Stateful","dojo/_base/window","dojo/window","./a11y","./registry","./main"],function(_17a,_17b,dom,_17c,_17d,_17e,_17f,lang,on,_180,has,_181,win,_182,a11y,_183,_184){
var _185;
var _186=_17b([_181,_17f],{curNode:null,activeStack:[],constructor:function(){
var _187=lang.hitch(this,function(node){
if(dom.isDescendant(this.curNode,node)){
this.set("curNode",null);
}
if(dom.isDescendant(this.prevNode,node)){
this.set("prevNode",null);
}
});
_17a.before(_17e,"empty",_187);
_17a.before(_17e,"destroy",_187);
},registerIframe:function(_188){
return this.registerWin(_188.contentWindow,_188);
},registerWin:function(_189,_18a){
var _18b=this,body=_189.document&&_189.document.body;
if(body){
var mdh=on(_189.document,"mousedown, touchstart",function(evt){
_18b._justMouseDowned=true;
setTimeout(function(){
_18b._justMouseDowned=false;
},0);
if(evt&&evt.target&&evt.target.parentNode==null){
return;
}
_18b._onTouchNode(_18a||evt.target,"mouse");
});
var fih=on(body,"focusin",function(evt){
_185=(new Date()).getTime();
if(!evt.target.tagName){
return;
}
var tag=evt.target.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(a11y.isFocusable(evt.target)){
_18b._onFocusNode(_18a||evt.target);
}else{
_18b._onTouchNode(_18a||evt.target);
}
});
var foh=on(body,"focusout",function(evt){
if((new Date()).getTime()<_185+100){
return;
}
_18b._onBlurNode(_18a||evt.target);
});
return {remove:function(){
mdh.remove();
fih.remove();
foh.remove();
mdh=fih=foh=null;
body=null;
}};
}
},_onBlurNode:function(node){
if(this._clearFocusTimer){
clearTimeout(this._clearFocusTimer);
}
this._clearFocusTimer=setTimeout(lang.hitch(this,function(){
this.set("prevNode",this.curNode);
this.set("curNode",null);
}),0);
if(this._justMouseDowned){
return;
}
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
}
this._clearActiveWidgetsTimer=setTimeout(lang.hitch(this,function(){
delete this._clearActiveWidgetsTimer;
this._setStack([]);
}),0);
},_onTouchNode:function(node,by){
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
delete this._clearActiveWidgetsTimer;
}
if(_17d.contains(node,"dijitPopup")){
node=node.firstChild;
}
var _18c=[];
try{
while(node){
var _18d=_17c.get(node,"dijitPopupParent");
if(_18d){
node=_183.byId(_18d).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===win.body()){
break;
}
node=_182.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_18e=id&&_183.byId(id);
if(_18e&&!(by=="mouse"&&_18e.get("disabled"))){
_18c.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_18c,by);
},_onFocusNode:function(node){
if(!node){
return;
}
if(node.nodeType==9){
return;
}
if(this._clearFocusTimer){
clearTimeout(this._clearFocusTimer);
delete this._clearFocusTimer;
}
this._onTouchNode(node);
if(node==this.curNode){
return;
}
this.set("prevNode",this.curNode);
this.set("curNode",node);
},_setStack:function(_18f,by){
var _190=this.activeStack,_191=_190.length-1,_192=_18f.length-1;
if(_18f[_192]==_190[_191]){
return;
}
this.set("activeStack",_18f);
var _193,i;
for(i=_191;i>=0&&_190[i]!=_18f[i];i--){
_193=_183.byId(_190[i]);
if(_193){
_193._hasBeenBlurred=true;
_193.set("focused",false);
if(_193._focusManager==this){
_193._onBlur(by);
}
this.emit("widget-blur",_193,by);
}
}
for(i++;i<=_192;i++){
_193=_183.byId(_18f[i]);
if(_193){
_193.set("focused",true);
if(_193._focusManager==this){
_193._onFocus(by);
}
this.emit("widget-focus",_193,by);
}
}
},focus:function(node){
if(node){
try{
node.focus();
}
catch(e){
}
}
}});
var _194=new _186();
_180(function(){
var _195=_194.registerWin(_182.get(document));
if(has("ie")){
on(window,"unload",function(){
if(_195){
_195.remove();
_195=null;
}
});
}
});
_184.focus=function(node){
_194.focus(node);
};
for(var attr in _194){
if(!/^_/.test(attr)){
_184.focus[attr]=typeof _194[attr]=="function"?lang.hitch(_194,attr):_194[attr];
}
}
_194.watch(function(attr,_196,_197){
_184.focus[attr]=_197;
});
return _194;
});
},"dojo/i18n":function(){
define(["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json","module"],function(dojo,_198,has,_199,_19a,lang,xhr,json,_19b){
has.add("dojo-preload-i18n-Api",1);
1||has.add("dojo-v1x-i18n-Api",1);
var _19c=dojo.i18n={},_19d=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_19e=function(root,_19f,_1a0,_1a1){
for(var _1a2=[_1a0+_1a1],_1a3=_19f.split("-"),_1a4="",i=0;i<_1a3.length;i++){
_1a4+=(_1a4?"-":"")+_1a3[i];
if(!root||root[_1a4]){
_1a2.push(_1a0+_1a4+"/"+_1a1);
_1a2.specificity=_1a4;
}
}
return _1a2;
},_1a5={},_1a6=function(_1a7,_1a8,_1a9){
_1a9=_1a9?_1a9.toLowerCase():dojo.locale;
_1a7=_1a7.replace(/\./g,"/");
_1a8=_1a8.replace(/\./g,"/");
return (/root/i.test(_1a9))?(_1a7+"/nls/"+_1a8):(_1a7+"/nls/"+_1a9+"/"+_1a8);
},_1aa=dojo.getL10nName=function(_1ab,_1ac,_1ad){
return _1ab=_19b.id+"!"+_1a6(_1ab,_1ac,_1ad);
},_1ae=function(_1af,_1b0,_1b1,_1b2,_1b3,load){
_1af([_1b0],function(root){
var _1b4=lang.clone(root.root||root.ROOT),_1b5=_19e(!root._v1x&&root,_1b3,_1b1,_1b2);
_1af(_1b5,function(){
for(var i=1;i<_1b5.length;i++){
_1b4=lang.mixin(lang.clone(_1b4),arguments[i]);
}
var _1b6=_1b0+"/"+_1b3;
_1a5[_1b6]=_1b4;
_1b4.$locale=_1b5.specificity;
load();
});
});
},_1b7=function(id,_1b8){
return /^\./.test(id)?_1b8(id):id;
},_1b9=function(_1ba){
var list=_19a.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(_1ba);
return list;
},load=function(id,_1bb,load){
if(has("dojo-preload-i18n-Api")){
var _1bc=id.split("*"),_1bd=_1bc[1]=="preload";
if(_1bd){
if(!_1a5[id]){
_1a5[id]=1;
_1be(_1bc[2],json.parse(_1bc[3]),1,_1bb);
}
load(1);
}
if(_1bd||_1bf(id,_1bb,load)){
return;
}
}
var _1c0=_19d.exec(id),_1c1=_1c0[1]+"/",_1c2=_1c0[5]||_1c0[4],_1c3=_1c1+_1c2,_1c4=(_1c0[5]&&_1c0[4]),_1c5=_1c4||dojo.locale||"",_1c6=_1c3+"/"+_1c5,_1c7=_1c4?[_1c5]:_1b9(_1c5),_1c8=_1c7.length,_1c9=function(){
if(!--_1c8){
load(lang.delegate(_1a5[_1c6]));
}
};
_199.forEach(_1c7,function(_1ca){
var _1cb=_1c3+"/"+_1ca;
if(has("dojo-preload-i18n-Api")){
_1cc(_1cb);
}
if(!_1a5[_1cb]){
_1ae(_1bb,_1c3,_1c1,_1c2,_1ca,_1c9);
}else{
_1c9();
}
});
};
if(has("dojo-unit-tests")){
var _1cd=_19c.unitTests=[];
}
if(has("dojo-preload-i18n-Api")||1){
var _1ce=_19c.normalizeLocale=function(_1cf){
var _1d0=_1cf?_1cf.toLowerCase():dojo.locale;
return _1d0=="root"?"ROOT":_1d0;
},isXd=function(mid,_1d1){
return (1&&1)?_1d1.isXdUrl(_198.toUrl(mid+".js")):true;
},_1d2=0,_1d3=[],_1be=_19c._preloadLocalizations=function(_1d4,_1d5,_1d6,_1d7){
_1d7=_1d7||_198;
function _1d8(mid,_1d9){
if(isXd(mid,_1d7)||_1d6){
_1d7([mid],_1d9);
}else{
_1e3([mid],_1d9,_1d7);
}
};
function _1da(_1db,func){
var _1dc=_1db.split("-");
while(_1dc.length){
if(func(_1dc.join("-"))){
return;
}
_1dc.pop();
}
func("ROOT");
};
function _1dd(_1de){
_1de=_1ce(_1de);
_1da(_1de,function(loc){
if(_199.indexOf(_1d5,loc)>=0){
var mid=_1d4.replace(/\./g,"/")+"_"+loc;
_1d2++;
_1d8(mid,function(_1df){
for(var p in _1df){
_1a5[_198.toAbsMid(p)+"/"+loc]=_1df[p];
}
--_1d2;
while(!_1d2&&_1d3.length){
load.apply(null,_1d3.shift());
}
});
return true;
}
return false;
});
};
_1dd();
_199.forEach(dojo.config.extraLocale,_1dd);
},_1bf=function(id,_1e0,load){
if(_1d2){
_1d3.push([id,_1e0,load]);
}
return _1d2;
},_1cc=function(){
};
}
if(1){
var _1e1={},_1e2=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"+"\t   require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return __amdValue;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_1e3=function(deps,_1e4,_1e5){
var _1e6=[];
_199.forEach(deps,function(mid){
var url=_1e5.toUrl(mid+".js");
function load(text){
var _1e7=_1e2(text,_1cc,mid,_1e1);
if(_1e7===_1e1){
_1e6.push(_1a5[url]=_1e1.result);
}else{
if(_1e7 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_1e7);
_1e7={};
}
_1e6.push(_1a5[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_1e7:{root:_1e7,_v1x:1}));
}
};
if(_1a5[url]){
_1e6.push(_1a5[url]);
}else{
var _1e8=_1e5.syncLoadNls(mid);
if(_1e8){
_1e6.push(_1e8);
}else{
if(!xhr){
try{
_1e5.getText(url,true,load);
}
catch(e){
_1e6.push(_1a5[url]={});
}
}else{
xhr.get({url:url,sync:true,load:load,error:function(){
_1e6.push(_1a5[url]={});
}});
}
}
}
});
_1e4&&_1e4.apply(null,_1e6);
};
_1cc=function(_1e9){
for(var _1ea,_1eb=_1e9.split("/"),_1ec=dojo.global[_1eb[0]],i=1;_1ec&&i<_1eb.length-1;_1ec=_1ec[_1eb[i++]]){
}
if(_1ec){
_1ea=_1ec[_1eb[i]];
if(!_1ea){
_1ea=_1ec[_1eb[i].replace(/-/g,"_")];
}
if(_1ea){
_1a5[_1e9]=_1ea;
}
}
return _1ea;
};
_19c.getLocalization=function(_1ed,_1ee,_1ef){
var _1f0,_1f1=_1a6(_1ed,_1ee,_1ef);
load(_1f1,(!isXd(_1f1,_198)?function(deps,_1f2){
_1e3(deps,_1f2,_198);
}:_198),function(_1f3){
_1f0=_1f3;
});
return _1f0;
};
if(has("dojo-unit-tests")){
_1cd.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _1f4;
_1f4=_1e2("{prop:1}",_1cc,"nonsense",_1e1);
t.is({prop:1},_1f4);
t.is(undefined,_1f4[1]);
_1f4=_1e2("({prop:1})",_1cc,"nonsense",_1e1);
t.is({prop:1},_1f4);
t.is(undefined,_1f4[1]);
_1f4=_1e2("{'prop-x':1}",_1cc,"nonsense",_1e1);
t.is({"prop-x":1},_1f4);
t.is(undefined,_1f4[1]);
_1f4=_1e2("({'prop-x':1})",_1cc,"nonsense",_1e1);
t.is({"prop-x":1},_1f4);
t.is(undefined,_1f4[1]);
_1f4=_1e2("define({'prop-x':1})",_1cc,"nonsense",_1e1);
t.is(_1e1,_1f4);
t.is({"prop-x":1},_1e1.result);
_1f4=_1e2("define('some/module', {'prop-x':1})",_1cc,"nonsense",_1e1);
t.is(_1e1,_1f4);
t.is({"prop-x":1},_1e1.result);
_1f4=_1e2("this is total nonsense and should throw an error",_1cc,"nonsense",_1e1);
t.is(_1f4 instanceof Error,true);
});
});
}
}
return lang.mixin(_19c,{dynamic:true,normalize:_1b7,load:load,cache:_1a5,getL10nName:_1aa});
});
},"dijit/hccss":function(){
define(["dojo/dom-class","dojo/hccss","dojo/domReady","dojo/_base/window"],function(_1f5,has,_1f6,win){
_1f6(function(){
if(has("highcontrast")){
_1f5.add(win.body(),"dijit_a11y");
}
});
return has;
});
},"dijit/tree/ForestStoreModel":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","./TreeStoreModel"],function(_1f7,_1f8,_1f9,lang,_1fa){
return _1f8("dijit.tree.ForestStoreModel",_1fa,{rootId:"$root$",rootLabel:"ROOT",query:null,constructor:function(_1fb){
this.root={store:this,root:true,id:_1fb.rootId,label:_1fb.rootLabel,children:_1fb.rootChildren};
},mayHaveChildren:function(item){
return item===this.root||this.inherited(arguments);
},getChildren:function(_1fc,_1fd,_1fe){
if(_1fc===this.root){
if(this.root.children){
_1fd(this.root.children);
}else{
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_1ff){
this.root.children=_1ff;
_1fd(_1ff);
}),onError:_1fe});
}
}else{
this.inherited(arguments);
}
},isItem:function(_200){
return (_200===this.root)?true:this.inherited(arguments);
},fetchItemByIdentity:function(_201){
if(_201.identity==this.root.id){
var _202=_201.scope||_1f9.global;
if(_201.onItem){
_201.onItem.call(_202,this.root);
}
}else{
this.inherited(arguments);
}
},getIdentity:function(item){
return (item===this.root)?this.root.id:this.inherited(arguments);
},getLabel:function(item){
return (item===this.root)?this.root.label:this.inherited(arguments);
},newItem:function(args,_203,_204){
if(_203===this.root){
this.onNewRootItem(args);
return this.store.newItem(args);
}else{
return this.inherited(arguments);
}
},onNewRootItem:function(){
},pasteItem:function(_205,_206,_207,_208,_209){
if(_206===this.root){
if(!_208){
this.onLeaveRoot(_205);
}
}
this.inherited(arguments,[_205,_206===this.root?null:_206,_207===this.root?null:_207,_208,_209]);
if(_207===this.root){
this.onAddToRoot(_205);
}
},onAddToRoot:function(item){
},onLeaveRoot:function(item){
},_requeryTop:function(){
var _20a=this.root.children||[];
this.store.fetch({query:this.query,onComplete:lang.hitch(this,function(_20b){
this.root.children=_20b;
if(_20a.length!=_20b.length||_1f7.some(_20a,function(item,idx){
return _20b[idx]!=item;
})){
this.onChildrenChange(this.root,_20b);
}
})});
},onNewItem:function(item,_20c){
this._requeryTop();
this.inherited(arguments);
},onDeleteItem:function(item){
if(_1f7.indexOf(this.root.children,item)!=-1){
this._requeryTop();
}
this.inherited(arguments);
},onSetItem:function(item,_20d,_20e,_20f){
this._requeryTop();
this.inherited(arguments);
}});
});
},"dijit/PopupMenuBarItem":function(){
define(["dojo/_base/declare","./PopupMenuItem","./MenuBarItem"],function(_210,_211,_212){
var _213=_212._MenuBarItemMixin;
return _210("dijit.PopupMenuBarItem",[_211,_213],{});
});
},"dijit/form/_ComboBoxMenuMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/has","dojo/i18n","dojo/i18n!./nls/ComboBox"],function(_214,_215,_216,has,i18n){
var _217=_215("dijit.form._ComboBoxMenuMixin"+(has("dojo-bidi")?"_NoBidi":""),null,{_messages:null,postMixInProperties:function(){
this.inherited(arguments);
this._messages=i18n.getLocalization("dijit.form","ComboBox",this.lang);
},buildRendering:function(){
this.inherited(arguments);
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
},_setValueAttr:function(_218){
this._set("value",_218);
this.onChange(_218);
},onClick:function(node){
if(node==this.previousButton){
this._setSelectedAttr(null);
this.onPage(-1);
}else{
if(node==this.nextButton){
this._setSelectedAttr(null);
this.onPage(1);
}else{
this.onChange(node);
}
}
},onChange:function(){
},onPage:function(){
},onClose:function(){
this._setSelectedAttr(null);
},_createOption:function(item,_219){
var _21a=this._createMenuItem();
var _21b=_219(item);
if(_21b.html){
_21a.innerHTML=_21b.label;
}else{
_21a.appendChild(_21a.ownerDocument.createTextNode(_21b.label));
}
if(_21a.innerHTML==""){
_21a.innerHTML="&#160;";
}
return _21a;
},createOptions:function(_21c,_21d,_21e){
this.items=_21c;
this.previousButton.style.display=(_21d.start==0)?"none":"";
_216.set(this.previousButton,"id",this.id+"_prev");
_214.forEach(_21c,function(item,i){
var _21f=this._createOption(item,_21e);
_21f.setAttribute("item",i);
_216.set(_21f,"id",this.id+i);
this.nextButton.parentNode.insertBefore(_21f,this.nextButton);
},this);
var _220=false;
if(_21c.total&&!_21c.total.then&&_21c.total!=-1){
if((_21d.start+_21d.count)<_21c.total){
_220=true;
}else{
if((_21d.start+_21d.count)>_21c.total&&_21d.count==_21c.length){
_220=true;
}
}
}else{
if(_21d.count==_21c.length){
_220=true;
}
}
this.nextButton.style.display=_220?"":"none";
_216.set(this.nextButton,"id",this.id+"_next");
},clearResultList:function(){
var _221=this.containerNode;
while(_221.childNodes.length>2){
_221.removeChild(_221.childNodes[_221.childNodes.length-2]);
}
this._setSelectedAttr(null);
},highlightFirstOption:function(){
this.selectFirstNode();
},highlightLastOption:function(){
this.selectLastNode();
},selectFirstNode:function(){
this.inherited(arguments);
if(this.getHighlightedOption()==this.previousButton){
this.selectNextNode();
}
},selectLastNode:function(){
this.inherited(arguments);
if(this.getHighlightedOption()==this.nextButton){
this.selectPreviousNode();
}
},getHighlightedOption:function(){
return this.selected;
}});
if(has("dojo-bidi")){
_217=_215("dijit.form._ComboBoxMenuMixin",_217,{_createOption:function(){
var _222=this.inherited(arguments);
this.applyTextDir(_222);
return _222;
}});
}
return _217;
});
},"dijit/form/_SearchMixin":function(){
define(["dojo/_base/declare","dojo/keys","dojo/_base/lang","dojo/query","dojo/string","dojo/when","../registry"],function(_223,keys,lang,_224,_225,when,_226){
return _223("dijit.form._SearchMixin",null,{pageSize:Infinity,store:null,fetchProperties:{},query:{},searchDelay:200,searchAttr:"name",queryExpr:"${0}*",ignoreCase:true,_patternToRegExp:function(_227){
return new RegExp("^"+_227.replace(/(\\.)|(\*)|(\?)|\W/g,function(str,_228,star,_229){
return star?".*":_229?".":_228?_228:"\\"+str;
})+"$",this.ignoreCase?"mi":"m");
},_abortQuery:function(){
if(this.searchTimer){
this.searchTimer=this.searchTimer.remove();
}
if(this._queryDeferHandle){
this._queryDeferHandle=this._queryDeferHandle.remove();
}
if(this._fetchHandle){
if(this._fetchHandle.abort){
this._cancelingQuery=true;
this._fetchHandle.abort();
this._cancelingQuery=false;
}
if(this._fetchHandle.cancel){
this._cancelingQuery=true;
this._fetchHandle.cancel();
this._cancelingQuery=false;
}
this._fetchHandle=null;
}
},_processInput:function(evt){
if(this.disabled||this.readOnly){
return;
}
var key=evt.charOrCode;
if("type" in evt&&evt.type.substring(0,3)=="key"&&(evt.altKey||((evt.ctrlKey||evt.metaKey)&&(key!="x"&&key!="v"))||key==keys.SHIFT)){
return;
}
var _22a=false;
this._prev_key_backspace=false;
switch(key){
case keys.DELETE:
case keys.BACKSPACE:
this._prev_key_backspace=true;
this._maskValidSubsetError=true;
_22a=true;
break;
default:
_22a=typeof key=="string"||key==229;
}
if(_22a){
if(!this.store){
this.onSearch();
}else{
this.searchTimer=this.defer("_startSearchFromInput",1);
}
}
},onSearch:function(){
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value);
},_startSearch:function(text){
this._abortQuery();
var _22b=this,_224=lang.clone(this.query),_22c={start:0,count:this.pageSize,queryOptions:{ignoreCase:this.ignoreCase,deep:true}},qs=_225.substitute(this.queryExpr,[text.replace(/([\\\*\?])/g,"\\$1")]),q,_22d=function(){
var _22e=_22b._fetchHandle=_22b.store.query(_224,_22c);
if(_22b.disabled||_22b.readOnly||(q!==_22b._lastQuery)){
return;
}
when(_22e,function(res){
_22b._fetchHandle=null;
if(!_22b.disabled&&!_22b.readOnly&&(q===_22b._lastQuery)){
when(_22e.total,function(_22f){
res.total=_22f;
var _230=_22b.pageSize;
if(isNaN(_230)||_230>res.total){
_230=res.total;
}
res.nextPage=function(_231){
_22c.direction=_231=_231!==false;
_22c.count=_230;
if(_231){
_22c.start+=res.length;
if(_22c.start>=res.total){
_22c.count=0;
}
}else{
_22c.start-=_230;
if(_22c.start<0){
_22c.count=Math.max(_230+_22c.start,0);
_22c.start=0;
}
}
if(_22c.count<=0){
res.length=0;
_22b.onSearch(res,_224,_22c);
}else{
_22d();
}
};
_22b.onSearch(res,_224,_22c);
});
}
},function(err){
_22b._fetchHandle=null;
if(!_22b._cancelingQuery){
console.error(_22b.declaredClass+" "+err.toString());
}
});
};
lang.mixin(_22c,this.fetchProperties);
if(this.store._oldAPI){
q=qs;
}else{
q=this._patternToRegExp(qs);
q.toString=function(){
return qs;
};
}
this._lastQuery=_224[this.searchAttr]=q;
this._queryDeferHandle=this.defer(_22d,this.searchDelay);
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var list=this.list;
if(list){
this.store=_226.byId(list);
}
}
this.inherited(arguments);
}});
});
},"dojo/parser":function(){
define(["require","./_base/kernel","./_base/lang","./_base/array","./_base/config","./dom","./_base/window","./_base/url","./aspect","./promise/all","./date/stamp","./Deferred","./has","./query","./on","./ready"],function(_232,dojo,_233,_234,_235,dom,_236,_237,_238,all,_239,_23a,has,_23b,don,_23c){
new Date("X");
function _23d(text){
return eval("("+text+")");
};
var _23e=0;
_238.after(_233,"extend",function(){
_23e++;
},true);
function _23f(ctor){
var map=ctor._nameCaseMap,_240=ctor.prototype;
if(!map||map._extendCnt<_23e){
map=ctor._nameCaseMap={};
for(var name in _240){
if(name.charAt(0)==="_"){
continue;
}
map[name.toLowerCase()]=name;
}
map._extendCnt=_23e;
}
return map;
};
var _241={};
function _242(_243,_244){
var ts=_243.join();
if(!_241[ts]){
var _245=[];
for(var i=0,l=_243.length;i<l;i++){
var t=_243[i];
_245[_245.length]=(_241[t]=_241[t]||(_233.getObject(t)||(~t.indexOf("/")&&(_244?_244(t):_232(t)))));
}
var ctor=_245.shift();
_241[ts]=_245.length?(ctor.createSubclass?ctor.createSubclass(_245):ctor.extend.apply(ctor,_245)):ctor;
}
return _241[ts];
};
var _246={_clearCache:function(){
_23e++;
_241={};
},_functionFromScript:function(_247,_248){
var _249="",_24a="",_24b=(_247.getAttribute(_248+"args")||_247.getAttribute("args")),_24c=_247.getAttribute("with");
var _24d=(_24b||"").split(/\s*,\s*/);
if(_24c&&_24c.length){
_234.forEach(_24c.split(/\s*,\s*/),function(part){
_249+="with("+part+"){";
_24a+="}";
});
}
return new Function(_24d,_249+_247.innerHTML+_24a);
},instantiate:function(_24e,_24f,_250){
_24f=_24f||{};
_250=_250||{};
var _251=(_250.scope||dojo._scopeName)+"Type",_252="data-"+(_250.scope||dojo._scopeName)+"-",_253=_252+"type",_254=_252+"mixins";
var list=[];
_234.forEach(_24e,function(node){
var type=_251 in _24f?_24f[_251]:node.getAttribute(_253)||node.getAttribute(_251);
if(type){
var _255=node.getAttribute(_254),_256=_255?[type].concat(_255.split(/\s*,\s*/)):[type];
list.push({node:node,types:_256});
}
});
return this._instantiate(list,_24f,_250);
},_instantiate:function(_257,_258,_259,_25a){
var _25b=_234.map(_257,function(obj){
var ctor=obj.ctor||_242(obj.types,_259.contextRequire);
if(!ctor){
throw new Error("Unable to resolve constructor for: '"+obj.types.join()+"'");
}
return this.construct(ctor,obj.node,_258,_259,obj.scripts,obj.inherited);
},this);
function _25c(_25d){
if(!_258._started&&!_259.noStart){
_234.forEach(_25d,function(_25e){
if(typeof _25e.startup==="function"&&!_25e._started){
_25e.startup();
}
});
}
return _25d;
};
if(_25a){
return all(_25b).then(_25c);
}else{
return _25c(_25b);
}
},construct:function(ctor,node,_25f,_260,_261,_262){
var _263=ctor&&ctor.prototype;
_260=_260||{};
var _264={};
if(_260.defaults){
_233.mixin(_264,_260.defaults);
}
if(_262){
_233.mixin(_264,_262);
}
var _265;
if(has("dom-attributes-explicit")){
_265=node.attributes;
}else{
if(has("dom-attributes-specified-flag")){
_265=_234.filter(node.attributes,function(a){
return a.specified;
});
}else{
var _266=/^input$|^img$/i.test(node.nodeName)?node:node.cloneNode(false),_267=_266.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_265=_234.map(_267.split(/\s+/),function(name){
var _268=name.toLowerCase();
return {name:name,value:(node.nodeName=="LI"&&name=="value")||_268=="enctype"?node.getAttribute(_268):node.getAttributeNode(_268).value};
});
}
}
var _269=_260.scope||dojo._scopeName,_26a="data-"+_269+"-",hash={};
if(_269!=="dojo"){
hash[_26a+"props"]="data-dojo-props";
hash[_26a+"type"]="data-dojo-type";
hash[_26a+"mixins"]="data-dojo-mixins";
hash[_269+"type"]="dojoType";
hash[_26a+"id"]="data-dojo-id";
}
var i=0,item,_26b=[],_26c,_26d;
while(item=_265[i++]){
var name=item.name,_26e=name.toLowerCase(),_26f=item.value;
switch(hash[_26e]||_26e){
case "data-dojo-type":
case "dojotype":
case "data-dojo-mixins":
break;
case "data-dojo-props":
_26d=_26f;
break;
case "data-dojo-id":
case "jsid":
_26c=_26f;
break;
case "data-dojo-attach-point":
case "dojoattachpoint":
_264.dojoAttachPoint=_26f;
break;
case "data-dojo-attach-event":
case "dojoattachevent":
_264.dojoAttachEvent=_26f;
break;
case "class":
_264["class"]=node.className;
break;
case "style":
_264["style"]=node.style&&node.style.cssText;
break;
default:
if(!(name in _263)){
var map=_23f(ctor);
name=map[_26e]||name;
}
if(name in _263){
switch(typeof _263[name]){
case "string":
_264[name]=_26f;
break;
case "number":
_264[name]=_26f.length?Number(_26f):NaN;
break;
case "boolean":
_264[name]=_26f.toLowerCase()!="false";
break;
case "function":
if(_26f===""||_26f.search(/[^\w\.]+/i)!=-1){
_264[name]=new Function(_26f);
}else{
_264[name]=_233.getObject(_26f,false)||new Function(_26f);
}
_26b.push(name);
break;
default:
var pVal=_263[name];
_264[name]=(pVal&&"length" in pVal)?(_26f?_26f.split(/\s*,\s*/):[]):(pVal instanceof Date)?(_26f==""?new Date(""):_26f=="now"?new Date():_239.fromISOString(_26f)):(pVal instanceof _237)?(dojo.baseUrl+_26f):_23d(_26f);
}
}else{
_264[name]=_26f;
}
}
}
for(var j=0;j<_26b.length;j++){
var _270=_26b[j].toLowerCase();
node.removeAttribute(_270);
node[_270]=null;
}
if(_26d){
try{
_26d=_23d.call(_260.propsThis,"{"+_26d+"}");
_233.mixin(_264,_26d);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_26d+"'");
}
}
_233.mixin(_264,_25f);
if(!_261){
_261=(ctor&&(ctor._noScript||_263._noScript)?[]:_23b("> script[type^='dojo/']",node));
}
var _271=[],_272=[],_273=[],ons=[];
if(_261){
for(i=0;i<_261.length;i++){
var _274=_261[i];
node.removeChild(_274);
var _275=(_274.getAttribute(_26a+"event")||_274.getAttribute("event")),prop=_274.getAttribute(_26a+"prop"),_276=_274.getAttribute(_26a+"method"),_277=_274.getAttribute(_26a+"advice"),_278=_274.getAttribute("type"),nf=this._functionFromScript(_274,_26a);
if(_275){
if(_278=="dojo/connect"){
_271.push({method:_275,func:nf});
}else{
if(_278=="dojo/on"){
ons.push({event:_275,func:nf});
}else{
_264[_275]=nf;
}
}
}else{
if(_278=="dojo/aspect"){
_271.push({method:_276,advice:_277,func:nf});
}else{
if(_278=="dojo/watch"){
_273.push({prop:prop,func:nf});
}else{
_272.push(nf);
}
}
}
}
}
var _279=ctor.markupFactory||_263.markupFactory;
var _27a=_279?_279(_264,node,ctor):new ctor(_264,node);
function _27b(_27c){
if(_26c){
_233.setObject(_26c,_27c);
}
for(i=0;i<_271.length;i++){
_238[_271[i].advice||"after"](_27c,_271[i].method,_233.hitch(_27c,_271[i].func),true);
}
for(i=0;i<_272.length;i++){
_272[i].call(_27c);
}
for(i=0;i<_273.length;i++){
_27c.watch(_273[i].prop,_273[i].func);
}
for(i=0;i<ons.length;i++){
don(_27c,ons[i].event,ons[i].func);
}
return _27c;
};
if(_27a.then){
return _27a.then(_27b);
}else{
return _27b(_27a);
}
},scan:function(root,_27d){
var list=[],mids=[],_27e={};
var _27f=(_27d.scope||dojo._scopeName)+"Type",_280="data-"+(_27d.scope||dojo._scopeName)+"-",_281=_280+"type",_282=_280+"textdir",_283=_280+"mixins";
var node=root.firstChild;
var _284=_27d.inherited;
if(!_284){
function _285(node,attr){
return (node.getAttribute&&node.getAttribute(attr))||(node.parentNode&&_285(node.parentNode,attr));
};
_284={dir:_285(root,"dir"),lang:_285(root,"lang"),textDir:_285(root,_282)};
for(var key in _284){
if(!_284[key]){
delete _284[key];
}
}
}
var _286={inherited:_284};
var _287;
var _288;
function _289(_28a){
if(!_28a.inherited){
_28a.inherited={};
var node=_28a.node,_28b=_289(_28a.parent);
var _28c={dir:node.getAttribute("dir")||_28b.dir,lang:node.getAttribute("lang")||_28b.lang,textDir:node.getAttribute(_282)||_28b.textDir};
for(var key in _28c){
if(_28c[key]){
_28a.inherited[key]=_28c[key];
}
}
}
return _28a.inherited;
};
while(true){
if(!node){
if(!_286||!_286.node){
break;
}
node=_286.node.nextSibling;
_288=false;
_286=_286.parent;
_287=_286.scripts;
continue;
}
if(node.nodeType!=1){
node=node.nextSibling;
continue;
}
if(_287&&node.nodeName.toLowerCase()=="script"){
type=node.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_287.push(node);
}
node=node.nextSibling;
continue;
}
if(_288){
node=node.nextSibling;
continue;
}
var type=node.getAttribute(_281)||node.getAttribute(_27f);
var _28d=node.firstChild;
if(!type&&(!_28d||(_28d.nodeType==3&&!_28d.nextSibling))){
node=node.nextSibling;
continue;
}
var _28e;
var ctor=null;
if(type){
var _28f=node.getAttribute(_283),_290=_28f?[type].concat(_28f.split(/\s*,\s*/)):[type];
try{
ctor=_242(_290,_27d.contextRequire);
}
catch(e){
}
if(!ctor){
_234.forEach(_290,function(t){
if(~t.indexOf("/")&&!_27e[t]){
_27e[t]=true;
mids[mids.length]=t;
}
});
}
var _291=ctor&&!ctor.prototype._noScript?[]:null;
_28e={types:_290,ctor:ctor,parent:_286,node:node,scripts:_291};
_28e.inherited=_289(_28e);
list.push(_28e);
}else{
_28e={node:node,scripts:_287,parent:_286};
}
_287=_291;
_288=node.stopParser||(ctor&&ctor.prototype.stopParser&&!(_27d.template));
_286=_28e;
node=_28d;
}
var d=new _23a();
if(mids.length){
if(has("dojo-debug-messages")){
console.warn("WARNING: Modules being Auto-Required: "+mids.join(", "));
}
var r=_27d.contextRequire||_232;
r(mids,function(){
d.resolve(_234.filter(list,function(_292){
if(!_292.ctor){
try{
_292.ctor=_242(_292.types,_27d.contextRequire);
}
catch(e){
}
}
var _293=_292.parent;
while(_293&&!_293.types){
_293=_293.parent;
}
var _294=_292.ctor&&_292.ctor.prototype;
_292.instantiateChildren=!(_294&&_294.stopParser&&!(_27d.template));
_292.instantiate=!_293||(_293.instantiate&&_293.instantiateChildren);
return _292.instantiate;
}));
});
}else{
d.resolve(list);
}
return d.promise;
},_require:function(_295,_296){
var hash=_23d("{"+_295.innerHTML+"}"),vars=[],mids=[],d=new _23a();
var _297=(_296&&_296.contextRequire)||_232;
for(var name in hash){
vars.push(name);
mids.push(hash[name]);
}
_297(mids,function(){
for(var i=0;i<vars.length;i++){
_233.setObject(vars[i],arguments[i]);
}
d.resolve(arguments);
});
return d.promise;
},_scanAmd:function(root,_298){
var _299=new _23a(),_29a=_299.promise;
_299.resolve(true);
var self=this;
_23b("script[type='dojo/require']",root).forEach(function(node){
_29a=_29a.then(function(){
return self._require(node,_298);
});
node.parentNode.removeChild(node);
});
return _29a;
},parse:function(_29b,_29c){
var root;
if(!_29c&&_29b&&_29b.rootNode){
_29c=_29b;
root=_29c.rootNode;
}else{
if(_29b&&_233.isObject(_29b)&&!("nodeType" in _29b)){
_29c=_29b;
}else{
root=_29b;
}
}
root=root?dom.byId(root):_236.body();
_29c=_29c||{};
var _29d=_29c.template?{template:true}:{},_29e=[],self=this;
var p=this._scanAmd(root,_29c).then(function(){
return self.scan(root,_29c);
}).then(function(_29f){
return self._instantiate(_29f,_29d,_29c,true);
}).then(function(_2a0){
return _29e=_29e.concat(_2a0);
}).otherwise(function(e){
console.error("dojo/parser::parse() error",e);
throw e;
});
_233.mixin(_29e,p);
return _29e;
}};
if(1){
dojo.parser=_246;
}
if(_235.parseOnLoad){
_23c(100,_246,"parse");
}
return _246;
});
},"dijit/form/ToggleButton":function(){
define(["dojo/_base/declare","dojo/_base/kernel","./Button","./_ToggleButtonMixin"],function(_2a1,_2a2,_2a3,_2a4){
return _2a1("dijit.form.ToggleButton",[_2a3,_2a4],{baseClass:"dijitToggleButton",setChecked:function(_2a5){
_2a2.deprecated("setChecked("+_2a5+") is deprecated. Use set('checked',"+_2a5+") instead.","","2.0");
this.set("checked",_2a5);
}});
});
},"dojo/date/stamp":function(){
define(["../_base/lang","../_base/array"],function(lang,_2a6){
var _2a7={};
lang.setObject("dojo.date.stamp",_2a7);
_2a7.fromISOString=function(_2a8,_2a9){
if(!_2a7._isoRegExp){
_2a7._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _2aa=_2a7._isoRegExp.exec(_2a8),_2ab=null;
if(_2aa){
_2aa.shift();
if(_2aa[1]){
_2aa[1]--;
}
if(_2aa[6]){
_2aa[6]*=1000;
}
if(_2a9){
_2a9=new Date(_2a9);
_2a6.forEach(_2a6.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _2a9["get"+prop]();
}),function(_2ac,_2ad){
_2aa[_2ad]=_2aa[_2ad]||_2ac;
});
}
_2ab=new Date(_2aa[0]||1970,_2aa[1]||0,_2aa[2]||1,_2aa[3]||0,_2aa[4]||0,_2aa[5]||0,_2aa[6]||0);
if(_2aa[0]<100){
_2ab.setFullYear(_2aa[0]||1970);
}
var _2ae=0,_2af=_2aa[7]&&_2aa[7].charAt(0);
if(_2af!="Z"){
_2ae=((_2aa[8]||0)*60)+(Number(_2aa[9])||0);
if(_2af!="-"){
_2ae*=-1;
}
}
if(_2af){
_2ae-=_2ab.getTimezoneOffset();
}
if(_2ae){
_2ab.setTime(_2ab.getTime()+_2ae*60000);
}
}
return _2ab;
};
_2a7.toISOString=function(_2b0,_2b1){
var _2b2=function(n){
return (n<10)?"0"+n:n;
};
_2b1=_2b1||{};
var _2b3=[],_2b4=_2b1.zulu?"getUTC":"get",date="";
if(_2b1.selector!="time"){
var year=_2b0[_2b4+"FullYear"]();
date=["0000".substr((year+"").length)+year,_2b2(_2b0[_2b4+"Month"]()+1),_2b2(_2b0[_2b4+"Date"]())].join("-");
}
_2b3.push(date);
if(_2b1.selector!="date"){
var time=[_2b2(_2b0[_2b4+"Hours"]()),_2b2(_2b0[_2b4+"Minutes"]()),_2b2(_2b0[_2b4+"Seconds"]())].join(":");
var _2b5=_2b0[_2b4+"Milliseconds"]();
if(_2b1.milliseconds){
time+="."+(_2b5<100?"0":"")+_2b2(_2b5);
}
if(_2b1.zulu){
time+="Z";
}else{
if(_2b1.selector!="time"){
var _2b6=_2b0.getTimezoneOffset();
var _2b7=Math.abs(_2b6);
time+=(_2b6>0?"-":"+")+_2b2(Math.floor(_2b7/60))+":"+_2b2(_2b7%60);
}
}
_2b3.push(time);
}
return _2b3.join("T");
};
return _2a7;
});
},"dojo/Stateful":function(){
define(["./_base/declare","./_base/lang","./_base/array","./when"],function(_2b8,lang,_2b9,when){
return _2b8("dojo.Stateful",null,{_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
return (apn[name]={s:"_"+name+"Setter",g:"_"+name+"Getter"});
},postscript:function(_2ba){
if(_2ba){
this.set(_2ba);
}
},_get:function(name,_2bb){
return typeof this[_2bb.g]==="function"?this[_2bb.g]():this[name];
},get:function(name){
return this._get(name,this._getAttrNames(name));
},set:function(name,_2bc){
if(typeof name==="object"){
for(var x in name){
if(name.hasOwnProperty(x)&&x!="_watchCallbacks"){
this.set(x,name[x]);
}
}
return this;
}
var _2bd=this._getAttrNames(name),_2be=this._get(name,_2bd),_2bf=this[_2bd.s],_2c0;
if(typeof _2bf==="function"){
_2c0=_2bf.apply(this,Array.prototype.slice.call(arguments,1));
}else{
this[name]=_2bc;
}
if(this._watchCallbacks){
var self=this;
when(_2c0,function(){
self._watchCallbacks(name,_2be,_2bc);
});
}
return this;
},_changeAttrValue:function(name,_2c1){
var _2c2=this.get(name);
this[name]=_2c1;
if(this._watchCallbacks){
this._watchCallbacks(name,_2c2,_2c1);
}
return this;
},watch:function(name,_2c3){
var _2c4=this._watchCallbacks;
if(!_2c4){
var self=this;
_2c4=this._watchCallbacks=function(name,_2c5,_2c6,_2c7){
var _2c8=function(_2c9){
if(_2c9){
_2c9=_2c9.slice();
for(var i=0,l=_2c9.length;i<l;i++){
_2c9[i].call(self,name,_2c5,_2c6);
}
}
};
_2c8(_2c4["_"+name]);
if(!_2c7){
_2c8(_2c4["*"]);
}
};
}
if(!_2c3&&typeof name==="function"){
_2c3=name;
name="*";
}else{
name="_"+name;
}
var _2ca=_2c4[name];
if(typeof _2ca!=="object"){
_2ca=_2c4[name]=[];
}
_2ca.push(_2c3);
var _2cb={};
_2cb.unwatch=_2cb.remove=function(){
var _2cc=_2b9.indexOf(_2ca,_2c3);
if(_2cc>-1){
_2ca.splice(_2cc,1);
}
};
return _2cb;
}});
});
},"dijit/form/_AutoCompleterMixin":function(){
define(["dojo/aspect","dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/lang","dojo/query","dojo/regexp","dojo/sniff","./DataList","./_TextBoxMixin","./_SearchMixin"],function(_2cd,_2ce,_2cf,keys,lang,_2d0,_2d1,has,_2d2,_2d3,_2d4){
var _2d5=_2ce("dijit.form._AutoCompleterMixin",_2d4,{item:null,autoComplete:true,highlightMatch:"first",labelAttr:"",labelType:"text",maxHeight:-1,_stopClickEvents:false,_getCaretPos:function(_2d6){
var pos=0;
if(typeof (_2d6.selectionStart)=="number"){
pos=_2d6.selectionStart;
}else{
if(has("ie")){
var tr=_2d6.ownerDocument.selection.createRange().duplicate();
var ntr=_2d6.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
pos=String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
}
}
}
return pos;
},_setCaretPos:function(_2d7,_2d8){
_2d8=parseInt(_2d8);
_2d3.selectInputText(_2d7,_2d8,_2d8);
},_setDisabledAttr:function(_2d9){
this.inherited(arguments);
this.domNode.setAttribute("aria-disabled",_2d9?"true":"false");
},_onKey:function(evt){
if(evt.charCode>=32){
return;
}
var key=evt.charCode||evt.keyCode;
if(key==keys.ALT||key==keys.CTRL||key==keys.META||key==keys.SHIFT){
return;
}
var pw=this.dropDown;
var _2da=null;
this._abortQuery();
this.inherited(arguments);
if(evt.altKey||evt.ctrlKey||evt.metaKey){
return;
}
if(this._opened){
_2da=pw.getHighlightedOption();
}
switch(key){
case keys.PAGE_DOWN:
case keys.DOWN_ARROW:
case keys.PAGE_UP:
case keys.UP_ARROW:
if(this._opened){
this._announceOption(_2da);
}
evt.stopPropagation();
evt.preventDefault();
break;
case keys.ENTER:
if(_2da){
if(_2da==pw.nextButton){
this._nextSearch(1);
evt.stopPropagation();
evt.preventDefault();
break;
}else{
if(_2da==pw.previousButton){
this._nextSearch(-1);
evt.stopPropagation();
evt.preventDefault();
break;
}
}
evt.stopPropagation();
evt.preventDefault();
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
case keys.TAB:
var _2db=this.get("displayedValue");
if(pw&&(_2db==pw._messages["previousMessage"]||_2db==pw._messages["nextMessage"])){
break;
}
if(_2da){
this._selectOption(_2da);
}
case keys.ESCAPE:
if(this._opened){
this._lastQuery=null;
this.closeDropDown();
}
break;
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
_2d3.selectInputText(fn,fn.value.length);
var _2dc=this.ignoreCase?"toLowerCase":"substr";
if(text[_2dc](0).indexOf(this.focusNode.value[_2dc](0))==0){
var cpos=this.autoComplete?this._getCaretPos(fn):fn.value.length;
if((cpos+1)>fn.value.length){
fn.value=text;
_2d3.selectInputText(fn,cpos);
}
}else{
fn.value=text;
_2d3.selectInputText(fn);
}
},_openResultList:function(_2dd,_2de,_2df){
var _2e0=this.dropDown.getHighlightedOption();
this.dropDown.clearResultList();
if(!_2dd.length&&_2df.start==0){
this.closeDropDown();
return;
}
this._nextSearch=this.dropDown.onPage=lang.hitch(this,function(_2e1){
_2dd.nextPage(_2e1!==-1);
this.focus();
});
this.dropDown.createOptions(_2dd,_2df,lang.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if("direction" in _2df){
if(_2df.direction){
this.dropDown.highlightFirstOption();
}else{
if(!_2df.direction){
this.dropDown.highlightLastOption();
}
}
if(_2e0){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_2de[this.searchAttr].toString())){
this._announceOption(this.dropDown.containerNode.firstChild.nextSibling);
}
}
},_showResultList:function(){
this.closeDropDown(true);
this.openDropDown();
this.domNode.setAttribute("aria-expanded","true");
},loadDropDown:function(){
this._startSearchAll();
},isLoaded:function(){
return false;
},closeDropDown:function(){
this._abortQuery();
if(this._opened){
this.inherited(arguments);
this.domNode.setAttribute("aria-expanded","false");
}
},_setBlurValue:function(){
var _2e2=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_2e2==pw._messages["previousMessage"]||_2e2==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_2e2);
}else{
if(this.value!=this._lastValueReported){
this._handleOnChange(this.value,true);
}
this._refreshState();
}
}
this.focusNode.removeAttribute("aria-activedescendant");
},_setItemAttr:function(item,_2e3,_2e4){
var _2e5="";
if(item){
if(!_2e4){
_2e4=this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr];
}
_2e5=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_2e4;
}
this.set("value",_2e5,_2e3,_2e4,item);
},_announceOption:function(node){
if(!node){
return;
}
var _2e6;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_2e6=node.innerHTML;
this.item=undefined;
this.value="";
}else{
var item=this.dropDown.items[node.getAttribute("item")];
_2e6=(this.store._oldAPI?this.store.getValue(item,this.searchAttr):item[this.searchAttr]).toString();
this.set("item",item,false,_2e6);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
this.focusNode.setAttribute("aria-activedescendant",_2cf.get(node,"id"));
this._autoCompleteText(_2e6);
},_selectOption:function(_2e7){
this.closeDropDown();
if(_2e7){
this._announceOption(_2e7);
}
this._setCaretPos(this.focusNode,this.focusNode.value.length);
this._handleOnChange(this.value,true);
this.focusNode.removeAttribute("aria-activedescendant");
},_startSearchAll:function(){
this._startSearch("");
},_startSearchFromInput:function(){
this.item=undefined;
this.inherited(arguments);
},_startSearch:function(key){
if(!this.dropDown){
var _2e8=this.id+"_popup",_2e9=lang.isString(this.dropDownClass)?lang.getObject(this.dropDownClass,false):this.dropDownClass;
this.dropDown=new _2e9({onChange:lang.hitch(this,this._selectOption),id:_2e8,dir:this.dir,textDir:this.textDir});
}
this._lastInput=key;
this.inherited(arguments);
},_getValueField:function(){
return this.searchAttr;
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.store){
var _2ea=this.srcNodeRef;
this.store=new _2d2({},_2ea);
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _2eb=this._getValueField();
this.value=this.store._oldAPI?this.store.getValue(item,_2eb):item[_2eb];
}
}
}
},postCreate:function(){
var _2ec=_2d0("label[for=\""+this.id+"\"]");
if(_2ec.length){
if(!_2ec[0].id){
_2ec[0].id=this.id+"_label";
}
this.domNode.setAttribute("aria-labelledby",_2ec[0].id);
}
this.inherited(arguments);
_2cd.after(this,"onSearch",lang.hitch(this,"_openResultList"),true);
},_getMenuLabelFromItem:function(item){
var _2ed=this.labelFunc(item,this.store),_2ee=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_2ed=this.doHighlight(_2ed,this._lastInput);
_2ee="html";
}
return {html:_2ee=="html",label:_2ed};
},doHighlight:function(_2ef,find){
var _2f0=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=_2d1.escapeString(find);
return this._escapeHtml(_2ef.replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_2f0),"\uffff$1\uffff")).replace(/\uFFFF([^\uFFFF]+)\uFFFF/g,"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_2f1){
return (_2f1._oldAPI?_2f1.getValue(item,this.labelAttr||this.searchAttr):item[this.labelAttr||this.searchAttr]).toString();
},_setValueAttr:function(_2f2,_2f3,_2f4,item){
this._set("item",item||null);
if(_2f2==null){
_2f2="";
}
this.inherited(arguments);
}});
if(has("dojo-bidi")){
_2d5.extend({_setTextDirAttr:function(_2f5){
this.inherited(arguments);
if(this.dropDown){
this.dropDown._set("textDir",_2f5);
}
}});
}
return _2d5;
});
},"dijit/form/MappedTextBox":function(){
define(["dojo/_base/declare","dojo/sniff","dojo/dom-construct","./ValidationTextBox"],function(_2f6,has,_2f7,_2f8){
return _2f6("dijit.form.MappedTextBox",_2f8,{postMixInProperties:function(){
this.inherited(arguments);
this.nameAttrSetting="";
},_setNameAttr:"valueNode",serialize:function(val){
return val.toString?val.toString():"";
},toString:function(){
var val=this.filter(this.get("value"));
return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";
},validate:function(){
this.valueNode.value=this.toString();
return this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.valueNode=_2f7.place("<input type='hidden'"+((this.name&&!has("msapp"))?" name=\""+this.name.replace(/"/g,"&quot;")+"\"":"")+"/>",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
});
},"dijit/form/ComboBoxMixin":function(){
define(["dojo/_base/declare","dojo/Deferred","dojo/_base/kernel","dojo/_base/lang","dojo/store/util/QueryResults","./_AutoCompleterMixin","./_ComboBoxMenu","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(_2f9,_2fa,_2fb,lang,_2fc,_2fd,_2fe,_2ff,_300){
return _2f9("dijit.form.ComboBoxMixin",[_2ff,_2fd],{dropDownClass:_2fe,hasDownArrow:true,templateString:_300,baseClass:"dijitTextBox dijitComboBox",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},_setHasDownArrowAttr:function(val){
this._set("hasDownArrow",val);
this._buttonNode.style.display=val?"":"none";
},_showResultList:function(){
this.displayMessage("");
this.inherited(arguments);
},_setStoreAttr:function(_301){
if(!_301.get){
lang.mixin(_301,{_oldAPI:true,get:function(id){
var _302=new _2fa();
this.fetchItemByIdentity({identity:id,onItem:function(_303){
_302.resolve(_303);
},onError:function(_304){
_302.reject(_304);
}});
return _302.promise;
},query:function(_305,_306){
var _307=new _2fa(function(){
_308.abort&&_308.abort();
});
_307.total=new _2fa();
var _308=this.fetch(lang.mixin({query:_305,onBegin:function(_309){
_307.total.resolve(_309);
},onComplete:function(_30a){
_307.resolve(_30a);
},onError:function(_30b){
_307.reject(_30b);
}},_306));
return _2fc(_307);
}});
}
this._set("store",_301);
},postMixInProperties:function(){
var _30c=this.params.store||this.store;
if(_30c){
this._setStoreAttr(_30c);
}
this.inherited(arguments);
if(!this.params.store&&!this.store._oldAPI){
var _30d=this.declaredClass;
lang.mixin(this.store,{getValue:function(item,attr){
_2fb.deprecated(_30d+".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly","","2.0");
return item[attr];
},getLabel:function(item){
_2fb.deprecated(_30d+".store.getLabel(item) is deprecated for builtin store.  Use item.label directly","","2.0");
return item.name;
},fetch:function(args){
_2fb.deprecated(_30d+".store.fetch() is deprecated for builtin store.","Use store.query()","2.0");
var shim=["dojo/data/ObjectStore"];
require(shim,lang.hitch(this,function(_30e){
new _30e({objectStore:this}).fetch(args);
}));
}});
}
}});
});
},"dijit/form/_TextBoxMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","../main"],function(_30f,_310,dom,has,keys,lang,on,_311){
var _312=_310("dijit.form._TextBoxMixin"+(has("dojo-bidi")?"_NoBidi":""),null,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_313,_314,_315){
var _316;
if(_313!==undefined){
_316=this.filter(_313);
if(typeof _315!="string"){
if(_316!==null&&((typeof _316!="number")||!isNaN(_316))){
_315=this.filter(this.format(_316,this.constraints));
}else{
_315="";
}
}
}
if(_315!=null&&((typeof _315)!="number"||!isNaN(_315))&&this.textbox.value!=_315){
this.textbox.value=_315;
this._set("displayedValue",this.get("displayedValue"));
}
this.inherited(arguments,[_316,_314]);
},displayedValue:"",_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},_setDisplayedValueAttr:function(_317){
if(_317==null){
_317="";
}else{
if(typeof _317!="string"){
_317=String(_317);
}
}
this.textbox.value=_317;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
},format:function(_318){
return _318==null?"":(_318.toString?_318.toString():_318);
},parse:function(_319){
return _319;
},_refreshState:function(){
},onInput:function(){
},__skipInputEvent:false,_onInput:function(evt){
this._processInput(evt);
if(this.intermediateChanges){
this.defer(function(){
this._handleOnChange(this.get("value"),false);
});
}
},_processInput:function(evt){
this._refreshState();
this._set("displayedValue",this.get("displayedValue"));
},postCreate:function(){
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
var _31a=function(e){
var _31b;
if(e.type=="keydown"){
_31b=e.keyCode;
switch(_31b){
case keys.SHIFT:
case keys.ALT:
case keys.CTRL:
case keys.META:
case keys.CAPS_LOCK:
case keys.NUM_LOCK:
case keys.SCROLL_LOCK:
return;
}
if(!e.ctrlKey&&!e.metaKey&&!e.altKey){
switch(_31b){
case keys.NUMPAD_0:
case keys.NUMPAD_1:
case keys.NUMPAD_2:
case keys.NUMPAD_3:
case keys.NUMPAD_4:
case keys.NUMPAD_5:
case keys.NUMPAD_6:
case keys.NUMPAD_7:
case keys.NUMPAD_8:
case keys.NUMPAD_9:
case keys.NUMPAD_MULTIPLY:
case keys.NUMPAD_PLUS:
case keys.NUMPAD_ENTER:
case keys.NUMPAD_MINUS:
case keys.NUMPAD_PERIOD:
case keys.NUMPAD_DIVIDE:
return;
}
if((_31b>=65&&_31b<=90)||(_31b>=48&&_31b<=57)||_31b==keys.SPACE){
return;
}
var _31c=false;
for(var i in keys){
if(keys[i]===e.keyCode){
_31c=true;
break;
}
}
if(!_31c){
return;
}
}
}
_31b=e.charCode>=32?String.fromCharCode(e.charCode):e.charCode;
if(!_31b){
_31b=(e.keyCode>=65&&e.keyCode<=90)||(e.keyCode>=48&&e.keyCode<=57)||e.keyCode==keys.SPACE?String.fromCharCode(e.keyCode):e.keyCode;
}
if(!_31b){
_31b=229;
}
if(e.type=="keypress"){
if(typeof _31b!="string"){
return;
}
if((_31b>="a"&&_31b<="z")||(_31b>="A"&&_31b<="Z")||(_31b>="0"&&_31b<="9")||(_31b===" ")){
if(e.ctrlKey||e.metaKey||e.altKey){
return;
}
}
}
if(e.type=="input"){
if(this.__skipInputEvent){
this.__skipInputEvent=false;
return;
}
}else{
this.__skipInputEvent=true;
}
var faux={faux:true},attr;
for(attr in e){
if(attr!="layerX"&&attr!="layerY"){
var v=e[attr];
if(typeof v!="function"&&typeof v!="undefined"){
faux[attr]=v;
}
}
}
lang.mixin(faux,{charOrCode:_31b,_wasConsumed:false,preventDefault:function(){
faux._wasConsumed=true;
e.preventDefault();
},stopPropagation:function(){
e.stopPropagation();
}});
if(this.onInput(faux)===false){
faux.preventDefault();
faux.stopPropagation();
}
if(faux._wasConsumed){
return;
}
this.defer(function(){
this._onInput(faux);
});
if(e.type=="keypress"){
e.stopPropagation();
}
};
this.own(on(this.textbox,"keydown, keypress, paste, cut, input, compositionend",lang.hitch(this,_31a)));
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=lang.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
});
}
return val;
},_setBlurValue:function(){
this._setValueAttr(this.get("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
},_isTextSelected:function(){
return this.textbox.selectionStart!=this.textbox.selectionEnd;
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
if(this.selectOnClick&&by=="mouse"){
this._selectOnClickHandle=on.once(this.domNode,"mouseup, touchend",lang.hitch(this,function(evt){
if(!this._isTextSelected()){
_312.selectInputText(this.textbox);
}
}));
this.own(this._selectOnClickHandle);
this.defer(function(){
if(this._selectOnClickHandle){
this._selectOnClickHandle.remove();
this._selectOnClickHandle=null;
}
},500);
}
this.inherited(arguments);
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
}});
if(has("dojo-bidi")){
_312=_310("dijit.form._TextBoxMixin",_312,{_setValueAttr:function(){
this.inherited(arguments);
this.applyTextDir(this.focusNode);
},_setDisplayedValueAttr:function(){
this.inherited(arguments);
this.applyTextDir(this.focusNode);
},_onInput:function(){
this.applyTextDir(this.focusNode);
this.inherited(arguments);
}});
}
_312._setSelectionRange=_311._setSelectionRange=function(_31d,_31e,stop){
if(_31d.setSelectionRange){
_31d.setSelectionRange(_31e,stop);
}
};
_312.selectInputText=_311.selectInputText=function(_31f,_320,stop){
_31f=dom.byId(_31f);
if(isNaN(_320)){
_320=0;
}
if(isNaN(stop)){
stop=_31f.value?_31f.value.length:0;
}
try{
_31f.focus();
_312._setSelectionRange(_31f,_320,stop);
}
catch(e){
}
};
return _312;
});
},"dijit/_base/window":function(){
define(["dojo/window","../main"],function(_321,_322){
_322.getDocumentWindow=function(doc){
return _321.get(doc);
};
});
},"dijit/PopupMenuItem":function(){
define(["dojo/_base/declare","dojo/dom-style","dojo/_base/lang","dojo/query","./popup","./registry","./MenuItem","./hccss"],function(_323,_324,lang,_325,pm,_326,_327){
return _323("dijit.PopupMenuItem",_327,{_fillContent:function(){
if(this.srcNodeRef){
var _328=_325("*",this.srcNodeRef);
this.inherited(arguments,[_328[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},_openPopup:function(_329,_32a){
var _32b=this.popup;
pm.open(lang.delegate(_329,{popup:this.popup,around:this.domNode}));
if(_32a&&_32b.focus){
_32b.focus();
}
},_closePopup:function(){
pm.close(this.popup);
this.popup.parentMenu=null;
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
if(!this.popup){
var node=_325("[widgetId]",this.dropDownContainer)[0];
this.popup=_326.byNode(node);
}
this.ownerDocumentBody.appendChild(this.popup.domNode);
this.popup.domNode.setAttribute("aria-labelledby",this.containerNode.id);
this.popup.startup();
this.popup.domNode.style.display="none";
if(this.arrowWrapper){
_324.set(this.arrowWrapper,"visibility","");
}
this.focusNode.setAttribute("aria-haspopup","true");
},destroyDescendants:function(_32c){
if(this.popup){
if(!this.popup._destroyed){
this.popup.destroyRecursive(_32c);
}
delete this.popup;
}
this.inherited(arguments);
}});
});
},"dijit/_editor/plugins/TextColor":function(){
define(["require","dojo/colors","dojo/_base/declare","dojo/_base/lang","../_Plugin","../../form/DropDownButton"],function(_32d,_32e,_32f,lang,_330,_331){
var _332=_32f("dijit._editor.plugins.TextColor",_330,{buttonClass:_331,useDefaultCommand:false,_initButton:function(){
this.inherited(arguments);
var self=this;
this.button.loadDropDown=function(_333){
_32d(["../../ColorPalette"],lang.hitch(this,function(_334){
this.dropDown=new _334({dir:self.editor.dir,ownerDocument:self.editor.ownerDocument,value:self.value,onChange:function(_335){
self.editor.execCommand(self.command,_335);
}});
_333();
}));
};
},updateState:function(){
var _336=this.editor;
var _337=this.command;
if(!_336||!_336.isLoaded||!_337.length){
return;
}
if(this.button){
var _338=this.get("disabled");
this.button.set("disabled",_338);
if(_338){
return;
}
var _339;
try{
_339=_336.queryCommandValue(_337)||"";
}
catch(e){
_339="";
}
}
if(_339==""){
_339="#000000";
}
if(_339=="transparent"){
_339="#ffffff";
}
if(typeof _339=="string"){
if(_339.indexOf("rgb")>-1){
_339=_32e.fromRgb(_339).toHex();
}
}else{
_339=((_339&255)<<16)|(_339&65280)|((_339&16711680)>>>16);
_339=_339.toString(16);
_339="#000000".slice(0,7-_339.length)+_339;
}
this.value=_339;
var _33a=this.button.dropDown;
if(_33a&&_339!==_33a.get("value")){
_33a.set("value",_339,false);
}
}});
_330.registry["foreColor"]=function(){
return new _332({command:"foreColor"});
};
_330.registry["hiliteColor"]=function(){
return new _332({command:"hiliteColor"});
};
return _332;
});
},"dojo/hccss":function(){
define(["require","./_base/config","./dom-class","./dom-style","./has","./domReady","./_base/window"],function(_33b,_33c,_33d,_33e,has,_33f,win){
has.add("highcontrast",function(){
var div=win.doc.createElement("div");
div.style.cssText="border: 1px solid; border-color:red green; position: absolute; height: 5px; top: -999px;"+"background-image: url("+(_33c.blankGif||_33b.toUrl("./resources/blank.gif"))+");";
win.body().appendChild(div);
var cs=_33e.getComputedStyle(div),_340=cs.backgroundImage,hc=(cs.borderTopColor==cs.borderRightColor)||(_340&&(_340=="none"||_340=="url(invalid-url:)"));
if(has("ie")<=8){
div.outerHTML="";
}else{
win.body().removeChild(div);
}
return hc;
});
_33f(function(){
if(has("highcontrast")){
_33d.add(win.body(),"dj_a11y");
}
});
return has;
});
},"dijit/main":function(){
define(["dojo/_base/kernel"],function(dojo){
return dojo.dijit;
});
},"dijit/_OnDijitClickMixin":function(){
define(["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/has","./a11yclick"],function(on,_341,keys,_342,has,_343){
var ret=_342("dijit._OnDijitClickMixin",null,{connect:function(obj,_344,_345){
return this.inherited(arguments,[obj,_344=="ondijitclick"?_343:_344,_345]);
}});
ret.a11yclick=_343;
return ret;
});
},"dojo/dnd/autoscroll":function(){
define(["../_base/lang","../sniff","../_base/window","../dom-geometry","../dom-style","../window"],function(lang,has,win,_346,_347,_348){
var _349={};
lang.setObject("dojo.dnd.autoscroll",_349);
_349.getViewport=_348.getBox;
_349.V_TRIGGER_AUTOSCROLL=32;
_349.H_TRIGGER_AUTOSCROLL=32;
_349.V_AUTOSCROLL_VALUE=16;
_349.H_AUTOSCROLL_VALUE=16;
var _34a,doc=win.doc,_34b=Infinity,_34c=Infinity;
_349.autoScrollStart=function(d){
doc=d;
_34a=_348.getBox(doc);
var html=win.body(doc).parentNode;
_34b=Math.max(html.scrollHeight-_34a.h,0);
_34c=Math.max(html.scrollWidth-_34a.w,0);
};
_349.autoScroll=function(e){
var v=_34a||_348.getBox(doc),html=win.body(doc).parentNode,dx=0,dy=0;
if(e.clientX<_349.H_TRIGGER_AUTOSCROLL){
dx=-_349.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-_349.H_TRIGGER_AUTOSCROLL){
dx=Math.min(_349.H_AUTOSCROLL_VALUE,_34c-html.scrollLeft);
}
}
if(e.clientY<_349.V_TRIGGER_AUTOSCROLL){
dy=-_349.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-_349.V_TRIGGER_AUTOSCROLL){
dy=Math.min(_349.V_AUTOSCROLL_VALUE,_34b-html.scrollTop);
}
}
window.scrollBy(dx,dy);
};
_349._validNodes={"div":1,"p":1,"td":1};
_349._validOverflow={"auto":1,"scroll":1};
_349.autoScrollNodes=function(e){
var b,t,w,h,rx,ry,dx=0,dy=0,_34d,_34e;
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in _349._validNodes)){
var s=_347.getComputedStyle(n),_34f=(s.overflow.toLowerCase() in _349._validOverflow),_350=(s.overflowX.toLowerCase() in _349._validOverflow),_351=(s.overflowY.toLowerCase() in _349._validOverflow);
if(_34f||_350||_351){
b=_346.getContentBox(n,s);
t=_346.position(n,true);
}
if(_34f||_350){
w=Math.min(_349.H_TRIGGER_AUTOSCROLL,b.w/2);
rx=e.pageX-t.x;
if(has("webkit")||has("opera")){
rx+=win.body().scrollLeft;
}
dx=0;
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
_34d=n.scrollLeft;
n.scrollLeft=n.scrollLeft+dx;
}
}
if(_34f||_351){
h=Math.min(_349.V_TRIGGER_AUTOSCROLL,b.h/2);
ry=e.pageY-t.y;
if(has("webkit")||has("opera")){
ry+=win.body().scrollTop;
}
dy=0;
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
_34e=n.scrollTop;
n.scrollTop=n.scrollTop+dy;
}
}
if(dx||dy){
return;
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
_349.autoScroll(e);
};
return _349;
});
},"dojo/dnd/TimedMoveable":function(){
define(["../_base/declare","./Moveable"],function(_352,_353){
var _354=_353.prototype.onMove;
return _352("dojo.dnd.TimedMoveable",_353,{timeout:40,constructor:function(node,_355){
if(!_355){
_355={};
}
if(_355.timeout&&typeof _355.timeout=="number"&&_355.timeout>=0){
this.timeout=_355.timeout;
}
},onMoveStop:function(_356){
if(_356._timer){
clearTimeout(_356._timer);
_354.call(this,_356,_356._leftTop);
}
_353.prototype.onMoveStop.apply(this,arguments);
},onMove:function(_357,_358){
_357._leftTop=_358;
if(!_357._timer){
var _359=this;
_357._timer=setTimeout(function(){
_357._timer=null;
_354.call(_359,_357,_357._leftTop);
},this.timeout);
}
}});
});
},"dijit/form/_ListMouseMixin":function(){
define(["dojo/_base/declare","dojo/on","dojo/touch","./_ListBase"],function(_35a,on,_35b,_35c){
return _35a("dijit.form._ListMouseMixin",_35c,{postCreate:function(){
this.inherited(arguments);
this.domNode.dojoClick=true;
this.own(on(this.domNode,"mousedown",function(evt){
evt.preventDefault();
}));
this._listConnect("click","_onClick");
this._listConnect("mousedown","_onMouseDown");
this._listConnect("mouseup","_onMouseUp");
this._listConnect("mouseover","_onMouseOver");
this._listConnect("mouseout","_onMouseOut");
},_onClick:function(evt,_35d){
this._setSelectedAttr(_35d);
if(this._deferredClick){
this._deferredClick.remove();
}
this._deferredClick=this.defer(function(){
this._deferredClick=null;
this.onClick(_35d);
});
},_onMouseDown:function(evt,_35e){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
this._isDragging=true;
this._setSelectedAttr(_35e);
},_onMouseUp:function(evt,_35f){
this._isDragging=false;
var _360=this.selected;
var _361=this._hoveredNode;
if(_360&&_35f==_360){
this.defer(function(){
this._onClick(evt,_360);
});
}else{
if(_361){
this.defer(function(){
this._onClick(evt,_361);
});
}
}
},_onMouseOut:function(evt,_362){
if(this._hoveredNode){
this.onUnhover(this._hoveredNode);
this._hoveredNode=null;
}
if(this._isDragging){
this._cancelDrag=(new Date()).getTime()+1000;
}
},_onMouseOver:function(evt,_363){
if(this._cancelDrag){
var time=(new Date()).getTime();
if(time>this._cancelDrag){
this._isDragging=false;
}
this._cancelDrag=null;
}
this._hoveredNode=_363;
this.onHover(_363);
if(this._isDragging){
this._setSelectedAttr(_363);
}
}});
});
},"dojo/cookie":function(){
define(["./_base/kernel","./regexp"],function(dojo,_364){
dojo.cookie=function(name,_365,_366){
var c=document.cookie,ret;
if(arguments.length==1){
var _367=c.match(new RegExp("(?:^|; )"+_364.escapeString(name)+"=([^;]*)"));
ret=_367?decodeURIComponent(_367[1]):undefined;
}else{
_366=_366||{};
var exp=_366.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_366.expires=d;
}
if(exp&&exp.toUTCString){
_366.expires=exp.toUTCString();
}
_365=encodeURIComponent(_365);
var _368=name+"="+_365,_369;
for(_369 in _366){
_368+="; "+_369;
var _36a=_366[_369];
if(_36a!==true){
_368+="="+_36a;
}
}
document.cookie=_368;
}
return ret;
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
return dojo.cookie;
});
},"dojo/cache":function(){
define(["./_base/kernel","./text"],function(dojo){
return dojo.cache;
});
},"dijit/_base/popup":function(){
define(["dojo/dom-class","dojo/_base/window","../popup","../BackgroundIframe"],function(_36b,win,_36c){
var _36d=_36c._createWrapper;
_36c._createWrapper=function(_36e){
if(!_36e.declaredClass){
_36e={_popupWrapper:(_36e.parentNode&&_36b.contains(_36e.parentNode,"dijitPopup"))?_36e.parentNode:null,domNode:_36e,destroy:function(){
},ownerDocument:_36e.ownerDocument,ownerDocumentBody:win.body(_36e.ownerDocument)};
}
return _36d.call(this,_36e);
};
var _36f=_36c.open;
_36c.open=function(args){
if(args.orient&&typeof args.orient!="string"&&!("length" in args.orient)){
var ary=[];
for(var key in args.orient){
ary.push({aroundCorner:key,corner:args.orient[key]});
}
args.orient=ary;
}
return _36f.call(this,args);
};
return _36c;
});
},"dojo/promise/all":function(){
define(["../_base/array","../Deferred","../when"],function(_370,_371,when){
"use strict";
var some=_370.some;
return function all(_372){
var _373,_370;
if(_372 instanceof Array){
_370=_372;
}else{
if(_372&&typeof _372==="object"){
_373=_372;
}
}
var _374;
var _375=[];
if(_373){
_370=[];
for(var key in _373){
if(Object.hasOwnProperty.call(_373,key)){
_375.push(key);
_370.push(_373[key]);
}
}
_374={};
}else{
if(_370){
_374=[];
}
}
if(!_370||!_370.length){
return new _371().resolve(_374);
}
var _376=new _371();
_376.promise.always(function(){
_374=_375=null;
});
var _377=_370.length;
some(_370,function(_378,_379){
if(!_373){
_375.push(_379);
}
when(_378,function(_37a){
if(!_376.isFulfilled()){
_374[_375[_379]]=_37a;
if(--_377===0){
_376.resolve(_374);
}
}
},_376.reject);
return _376.isFulfilled();
});
return _376.promise;
};
});
},"dijit/ColorPalette":function(){
define(["require","dojo/text!./templates/ColorPalette.html","./_Widget","./_TemplatedMixin","./_PaletteMixin","./hccss","dojo/i18n","dojo/_base/Color","dojo/_base/declare","dojo/dom-construct","dojo/string","dojo/i18n!dojo/nls/colors","dojo/colors"],function(_37b,_37c,_37d,_37e,_37f,has,i18n,_380,_381,_382,_383){
var _384=_381("dijit.ColorPalette",[_37d,_37e,_37f],{palette:"7x10",_palettes:{"7x10":[["white","seashell","cornsilk","lemonchiffon","lightyellow","palegreen","paleturquoise","lightcyan","lavender","plum"],["lightgray","pink","bisque","moccasin","khaki","lightgreen","lightseagreen","lightskyblue","cornflowerblue","violet"],["silver","lightcoral","sandybrown","orange","palegoldenrod","chartreuse","mediumturquoise","skyblue","mediumslateblue","orchid"],["gray","red","orangered","darkorange","yellow","limegreen","darkseagreen","royalblue","slateblue","mediumorchid"],["dimgray","crimson","chocolate","coral","gold","forestgreen","seagreen","blue","blueviolet","darkorchid"],["darkslategray","firebrick","saddlebrown","sienna","olive","green","darkcyan","mediumblue","darkslateblue","darkmagenta"],["black","darkred","maroon","brown","darkolivegreen","darkgreen","midnightblue","navy","indigo","purple"]],"3x4":[["white","lime","green","blue"],["silver","yellow","fuchsia","navy"],["gray","red","purple","black"]]},templateString:_37c,baseClass:"dijitColorPalette",_dyeFactory:function(_385,row,col,_386){
return new this._dyeClass(_385,row,col,_386);
},buildRendering:function(){
this.inherited(arguments);
this._dyeClass=_381(_384._Color,{palette:this.palette});
this._preparePalette(this._palettes[this.palette],i18n.getLocalization("dojo","colors",this.lang));
}});
_384._Color=_381("dijit._Color",_380,{template:"<span class='dijitInline dijitPaletteImg'>"+"<img src='${blankGif}' alt='${alt}' title='${title}' class='dijitColorPaletteSwatch' style='background-color: ${color}'/>"+"</span>",hcTemplate:"<span class='dijitInline dijitPaletteImg' style='position: relative; overflow: hidden; height: 12px; width: 14px;'>"+"<img src='${image}' alt='${alt}' title='${title}' style='position: absolute; left: ${left}px; top: ${top}px; ${size}'/>"+"</span>",_imagePaths:{"7x10":_37b.toUrl("./themes/a11y/colors7x10.png"),"3x4":_37b.toUrl("./themes/a11y/colors3x4.png")},constructor:function(_387,row,col,_388){
this._title=_388;
this._row=row;
this._col=col;
this.setColor(_380.named[_387]);
},getValue:function(){
return this.toHex();
},fillCell:function(cell,_389){
var html=_383.substitute(has("highcontrast")?this.hcTemplate:this.template,{color:this.toHex(),blankGif:_389,alt:this._title,title:this._title,image:this._imagePaths[this.palette].toString(),left:this._col*-20-5,top:this._row*-20-5,size:this.palette=="7x10"?"height: 145px; width: 206px":"height: 64px; width: 86px"});
_382.place(html,cell);
}});
return _384;
});
},"dojo/_base/url":function(){
define(["./kernel"],function(dojo){
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_38a=function(){
var n=null,_38b=arguments,uri=[_38b[0]];
for(var i=1;i<_38b.length;i++){
if(!_38b[i]){
continue;
}
var _38c=new _38a(_38b[i]+""),_38d=new _38a(uri[0]+"");
if(_38c.path==""&&!_38c.scheme&&!_38c.authority&&!_38c.query){
if(_38c.fragment!=n){
_38d.fragment=_38c.fragment;
}
_38c=_38d;
}else{
if(!_38c.scheme){
_38c.scheme=_38d.scheme;
if(!_38c.authority){
_38c.authority=_38d.authority;
if(_38c.path.charAt(0)!="/"){
var path=_38d.path.substring(0,_38d.path.lastIndexOf("/")+1)+_38c.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==(segs.length-1)){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_38c.path=segs.join("/");
}
}
}
}
uri=[];
if(_38c.scheme){
uri.push(_38c.scheme,":");
}
if(_38c.authority){
uri.push("//",_38c.authority);
}
uri.push(_38c.path);
if(_38c.query){
uri.push("?",_38c.query);
}
if(_38c.fragment){
uri.push("#",_38c.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
_38a.prototype.toString=function(){
return this.uri;
};
return dojo._Url=_38a;
});
},"dojo/text":function(){
define(["./_base/kernel","require","./has","./request"],function(dojo,_38e,has,_38f){
var _390;
if(1){
_390=function(url,sync,load){
_38f(url,{sync:!!sync}).then(load);
};
}else{
if(_38e.getText){
_390=_38e.getText;
}else{
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _391={},_392=function(text){
if(text){
text=text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _393=text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_393){
text=_393[1];
}
}else{
text="";
}
return text;
},_394={},_395={};
dojo.cache=function(_396,url,_397){
var key;
if(typeof _396=="string"){
if(/\//.test(_396)){
key=_396;
_397=url;
}else{
key=_38e.toUrl(_396.replace(/\./g,"/")+(url?("/"+url):""));
}
}else{
key=_396+"";
_397=url;
}
var val=(_397!=undefined&&typeof _397!="string")?_397.value:_397,_398=_397&&_397.sanitize;
if(typeof val=="string"){
_391[key]=val;
return _398?_392(val):val;
}else{
if(val===null){
delete _391[key];
return null;
}else{
if(!(key in _391)){
_390(key,true,function(text){
_391[key]=text;
});
}
return _398?_392(_391[key]):_391[key];
}
}
};
return {dynamic:true,normalize:function(id,_399){
var _39a=id.split("!"),url=_39a[0];
return (/^\./.test(url)?_399(url):url)+(_39a[1]?"!"+_39a[1]:"");
},load:function(id,_39b,load){
var _39c=id.split("!"),_39d=_39c.length>1,_39e=_39c[0],url=_39b.toUrl(_39c[0]),_39f="url:"+url,text=_394,_3a0=function(text){
load(_39d?_392(text):text);
};
if(_39e in _391){
text=_391[_39e];
}else{
if(_39b.cache&&_39f in _39b.cache){
text=_39b.cache[_39f];
}else{
if(url in _391){
text=_391[url];
}
}
}
if(text===_394){
if(_395[url]){
_395[url].push(_3a0);
}else{
var _3a1=_395[url]=[_3a0];
_390(url,!_39b.async,function(text){
_391[_39e]=_391[url]=text;
for(var i=0;i<_3a1.length;){
_3a1[i++](text);
}
delete _395[url];
});
}
}else{
_3a0(text);
}
}};
});
},"dojo/uacss":function(){
define(["./dom-geometry","./_base/lang","./domReady","./sniff","./_base/window"],function(_3a2,lang,_3a3,has,_3a4){
var html=_3a4.doc.documentElement,ie=has("ie"),_3a5=has("opera"),maj=Math.floor,ff=has("ff"),_3a6=_3a2.boxModel.replace(/-/,""),_3a7={"dj_quirks":has("quirks"),"dj_opera":_3a5,"dj_khtml":has("khtml"),"dj_webkit":has("webkit"),"dj_safari":has("safari"),"dj_chrome":has("chrome"),"dj_gecko":has("mozilla"),"dj_ios":has("ios"),"dj_android":has("android")};
if(ie){
_3a7["dj_ie"]=true;
_3a7["dj_ie"+maj(ie)]=true;
_3a7["dj_iequirks"]=has("quirks");
}
if(ff){
_3a7["dj_ff"+maj(ff)]=true;
}
_3a7["dj_"+_3a6]=true;
var _3a8="";
for(var clz in _3a7){
if(_3a7[clz]){
_3a8+=clz+" ";
}
}
html.className=lang.trim(html.className+" "+_3a8);
_3a3(function(){
if(!_3a2.isBodyLtr()){
var _3a9="dj_rtl dijitRtl "+_3a8.replace(/ /g,"-rtl ");
html.className=lang.trim(html.className+" "+_3a9+"dj_rtl dijitRtl "+_3a8.replace(/ /g,"-rtl "));
}
});
return has;
});
},"dijit/Tooltip":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/on","dojo/sniff","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","./main"],function(_3aa,_3ab,fx,dom,_3ac,_3ad,_3ae,lang,_3af,on,has,_3b0,_3b1,_3b2,_3b3,_3b4,_3b5,_3b6){
var _3b7=_3ab("dijit._MasterTooltip",[_3b2,_3b3],{duration:_3b0.defaultDuration,templateString:_3b5,postCreate:function(){
this.ownerDocumentBody.appendChild(this.domNode);
this.bgIframe=new _3b4(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,"_onHide")});
},show:function(_3b8,_3b9,_3ba,rtl,_3bb){
if(this.aroundNode&&this.aroundNode===_3b9&&this.containerNode.innerHTML==_3b8){
return;
}
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_3b8;
if(_3bb){
this.set("textDir",_3bb);
}
this.containerNode.align=rtl?"right":"left";
var pos=_3b1.around(this.domNode,_3b9,_3ba&&_3ba.length?_3ba:_3bc.defaultPosition,!rtl,lang.hitch(this,"orient"));
var _3bd=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_3bd.y+((_3bd.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_3bd.x+((_3bd.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}else{
this.connectorNode.style.left="";
this.connectorNode.style.top="";
}
}
_3ae.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_3b9;
},orient:function(node,_3be,_3bf,_3c0,_3c1){
this.connectorNode.style.top="";
var _3c2=_3c0.h,_3c3=_3c0.w;
node.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_3be+"-"+_3bf];
this.domNode.style.width="auto";
var size=_3ad.position(this.domNode);
if(has("ie")==9){
size.w+=2;
}
var _3c4=Math.min((Math.max(_3c3,1)),size.w);
_3ad.setMarginBox(this.domNode,{w:_3c4});
if(_3bf.charAt(0)=="B"&&_3be.charAt(0)=="B"){
var bb=_3ad.position(node);
var _3c5=this.connectorNode.offsetHeight;
if(bb.h>_3c2){
var _3c6=_3c2-((_3c1.h+_3c5)>>1);
this.connectorNode.style.top=_3c6+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_3c1.h/2-_3c5/2,0),bb.h-_3c5)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_3c3);
},_onShow:function(){
if(has("ie")){
this.domNode.style.filter="";
}
},hide:function(_3c7){
if(this._onDeck&&this._onDeck[1]==_3c7){
this._onDeck=null;
}else{
if(this.aroundNode===_3c7){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
}});
if(has("dojo-bidi")){
_3b7.extend({_setAutoTextDir:function(node){
this.applyTextDir(node);
_3aa.forEach(node.children,function(_3c8){
this._setAutoTextDir(_3c8);
},this);
},_setTextDirAttr:function(_3c9){
this._set("textDir",_3c9);
if(_3c9=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
}
_3b6.showTooltip=function(_3ca,_3cb,_3cc,rtl,_3cd){
if(_3cc){
_3cc=_3aa.map(_3cc,function(val){
return {after:"after-centered",before:"before-centered"}[val]||val;
});
}
if(!_3bc._masterTT){
_3b6._masterTT=_3bc._masterTT=new _3b7();
}
return _3bc._masterTT.show(_3ca,_3cb,_3cc,rtl,_3cd);
};
_3b6.hideTooltip=function(_3ce){
return _3bc._masterTT&&_3bc._masterTT.hide(_3ce);
};
var _3bc=_3ab("dijit.Tooltip",_3b2,{label:"",showDelay:400,connectId:[],position:[],selector:"",_setConnectIdAttr:function(_3cf){
_3aa.forEach(this._connections||[],function(_3d0){
_3aa.forEach(_3d0,function(_3d1){
_3d1.remove();
});
},this);
this._connectIds=_3aa.filter(lang.isArrayLike(_3cf)?_3cf:(_3cf?[_3cf]:[]),function(id){
return dom.byId(id,this.ownerDocument);
},this);
this._connections=_3aa.map(this._connectIds,function(id){
var node=dom.byId(id,this.ownerDocument),_3d2=this.selector,_3d3=_3d2?function(_3d4){
return on.selector(_3d2,_3d4);
}:function(_3d5){
return _3d5;
},self=this;
return [on(node,_3d3(_3af.enter),function(){
self._onHover(this);
}),on(node,_3d3("focusin"),function(){
self._onHover(this);
}),on(node,_3d3(_3af.leave),lang.hitch(self,"_onUnHover")),on(node,_3d3("focusout"),lang.hitch(self,"_onUnHover"))];
},this);
this._set("connectId",_3cf);
},addTarget:function(node){
var id=node.id||node;
if(_3aa.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=_3aa.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_3ac.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_3aa.forEach(lang.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},getContent:function(node){
return this.label||this.domNode.innerHTML;
},_onHover:function(_3d6){
if(!this._showTimer){
this._showTimer=this.defer(function(){
this.open(_3d6);
},this.showDelay);
}
},_onUnHover:function(){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
this.close();
},open:function(_3d7){
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
var _3d8=this.getContent(_3d7);
if(!_3d8){
return;
}
_3bc.show(_3d8,_3d7,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_3d7;
this.onShow(_3d7,this.position);
},close:function(){
if(this._connectNode){
_3bc.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
this._showTimer.remove();
delete this._showTimer;
}
},onShow:function(){
},onHide:function(){
},destroy:function(){
this.close();
_3aa.forEach(this._connections||[],function(_3d9){
_3aa.forEach(_3d9,function(_3da){
_3da.remove();
});
},this);
this.inherited(arguments);
}});
_3bc._MasterTooltip=_3b7;
_3bc.show=_3b6.showTooltip;
_3bc.hide=_3b6.hideTooltip;
_3bc.defaultPosition=["after-centered","before-centered"];
return _3bc;
});
},"dojo/string":function(){
define(["./_base/kernel","./_base/lang"],function(_3db,lang){
var _3dc={};
lang.setObject("dojo.string",_3dc);
_3dc.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
_3dc.pad=function(text,size,ch,end){
if(!ch){
ch="0";
}
var out=String(text),pad=_3dc.rep(ch,Math.ceil((size-out.length)/ch.length));
return end?out+pad:pad+out;
};
_3dc.substitute=function(_3dd,map,_3de,_3df){
_3df=_3df||_3db.global;
_3de=_3de?lang.hitch(_3df,_3de):function(v){
return v;
};
return _3dd.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_3e0,key,_3e1){
var _3e2=lang.getObject(key,false,map);
if(_3e1){
_3e2=lang.getObject(_3e1,false,_3df).call(_3df,_3e2,key);
}
return _3de(_3e2,key).toString();
});
};
_3dc.trim=String.prototype.trim?lang.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
return _3dc;
});
},"dijit/form/DropDownButton":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/query","../registry","../popup","./Button","../_Container","../_HasDropDown","dojo/text!./templates/DropDownButton.html"],function(_3e3,lang,_3e4,_3e5,_3e6,_3e7,_3e8,_3e9,_3ea){
return _3e3("dijit.form.DropDownButton",[_3e7,_3e8,_3e9],{baseClass:"dijitDropDownButton",templateString:_3ea,_fillContent:function(){
if(this.srcNodeRef){
var _3eb=_3e4("*",this.srcNodeRef);
this.inherited(arguments,[_3eb[0]]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _3ec=_3e4("[widgetId]",this.dropDownContainer)[0];
if(_3ec){
this.dropDown=_3e5.byNode(_3ec);
}
delete this.dropDownContainer;
}
if(this.dropDown){
_3e6.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _3ed=this.dropDown;
return (!!_3ed&&(!_3ed.href||_3ed.isLoaded));
},loadDropDown:function(_3ee){
var _3ef=this.dropDown;
var _3f0=_3ef.on("load",lang.hitch(this,function(){
_3f0.remove();
_3ee();
}));
_3ef.refresh();
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
});
},"dijit/form/_FormValueMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","./_FormWidgetMixin"],function(_3f1,_3f2,keys,lang,on,has,_3f3){
return _3f1("dijit.form._FormValueMixin",_3f3,{readOnly:false,_setReadOnlyAttr:function(_3f4){
_3f2.set(this.focusNode,"readOnly",_3f4);
this._set("readOnly",_3f4);
},postCreate:function(){
this.inherited(arguments);
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_3f5,_3f6){
this._handleOnChange(_3f5,_3f6);
},_handleOnChange:function(_3f7,_3f8){
this._set("value",_3f7);
this.inherited(arguments);
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
}});
});
},"dijit/form/_FormWidgetMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/on","dojo/sniff","dojo/window","../a11y"],function(_3f9,_3fa,_3fb,_3fc,lang,_3fd,on,has,_3fe,a11y){
return _3fa("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text","aria-label":"focusNode",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",_setDisabledAttr:function(_3ff){
this._set("disabled",_3ff);
_3fb.set(this.focusNode,"disabled",_3ff);
if(this.valueNode){
_3fb.set(this.valueNode,"disabled",_3ff);
}
this.focusNode.setAttribute("aria-disabled",_3ff?"true":"false");
if(_3ff){
this._set("hovering",false);
this._set("active",false);
var _400="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_3f9.forEach(lang.isArray(_400)?_400:[_400],function(_401){
var node=this[_401];
if(has("webkit")||a11y.hasDefaultTabStop(node)){
node.setAttribute("tabIndex","-1");
}else{
node.removeAttribute("tabIndex");
}
},this);
}else{
if(this.tabIndex!=""){
this.set("tabIndex",this.tabIndex);
}
}
},_onFocus:function(by){
if(by=="mouse"&&this.isFocusable()){
var _402=this.own(on(this.focusNode,"focus",function(){
_403.remove();
_402.remove();
}))[0];
var _403=this.own(on(this.ownerDocumentBody,"mouseup, touchend",lang.hitch(this,function(evt){
_403.remove();
_402.remove();
if(this.focused){
if(evt.type=="touchend"){
this.defer("focus");
}else{
this.focus();
}
}
})))[0];
}
if(this.scrollOnFocus){
this.defer(function(){
_3fe.scrollIntoView(this.domNode);
});
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_3fc.get(this.domNode,"display")!="none");
},focus:function(){
if(!this.disabled&&this.focusNode.focus){
try{
this.focusNode.focus();
}
catch(e){
}
}
},compare:function(val1,val2){
if(typeof val1=="number"&&typeof val2=="number"){
return (isNaN(val1)&&isNaN(val2))?0:val1-val2;
}else{
if(val1>val2){
return 1;
}else{
if(val1<val2){
return -1;
}else{
return 0;
}
}
}
},onChange:function(){
},_onChangeActive:false,_handleOnChange:function(_404,_405){
if(this._lastValueReported==undefined&&(_405===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_404;
}
this._pendingOnChange=this._pendingOnChange||(typeof _404!=typeof this._lastValueReported)||(this.compare(_404,this._lastValueReported)!=0);
if((this.intermediateChanges||_405||_405===undefined)&&this._pendingOnChange){
this._lastValueReported=_404;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
this._onChangeHandle.remove();
}
this._onChangeHandle=this.defer(function(){
this._onChangeHandle=null;
this.onChange(_404);
});
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
this._onChangeHandle.remove();
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
}});
});
},"dijit/a11yclick":function(){
define(["dojo/keys","dojo/mouse","dojo/on","dojo/touch"],function(keys,_406,on,_407){
function _408(e){
if((e.keyCode===keys.ENTER||e.keyCode===keys.SPACE)&&!/input|button|textarea/i.test(e.target.nodeName)){
for(var node=e.target;node;node=node.parentNode){
if(node.dojoClick){
return true;
}
}
}
};
var _409;
on(document,"keydown",function(e){
if(_408(e)){
_409=e.target;
e.preventDefault();
}else{
_409=null;
}
});
on(document,"keyup",function(e){
if(_408(e)&&e.target==_409){
_409=null;
on.emit(e.target,"click",{cancelable:true,bubbles:true,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,metaKey:e.metaKey,altKey:e.altKey,_origType:e.type});
}
});
var _40a=function(node,_40b){
node.dojoClick=true;
return on(node,"click",_40b);
};
_40a.click=_40a;
_40a.press=function(node,_40c){
var _40d=on(node,_407.press,function(evt){
if(evt.type=="mousedown"&&!_406.isLeft(evt)){
return;
}
_40c(evt);
}),_40e=on(node,"keydown",function(evt){
if(evt.keyCode===keys.ENTER||evt.keyCode===keys.SPACE){
_40c(evt);
}
});
return {remove:function(){
_40d.remove();
_40e.remove();
}};
};
_40a.release=function(node,_40f){
var _410=on(node,_407.release,function(evt){
if(evt.type=="mouseup"&&!_406.isLeft(evt)){
return;
}
_40f(evt);
}),_411=on(node,"keyup",function(evt){
if(evt.keyCode===keys.ENTER||evt.keyCode===keys.SPACE){
_40f(evt);
}
});
return {remove:function(){
_410.remove();
_411.remove();
}};
};
_40a.move=_407.move;
return _40a;
});
},"dijit/tree/ObjectStoreModel":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/lang","dojo/when"],function(_412,_413,_414,lang,when){
return _414("dijit.tree.ObjectStoreModel",null,{store:null,labelAttr:"name",labelType:"text",root:null,query:null,constructor:function(args){
lang.mixin(this,args);
this.childrenCache={};
},destroy:function(){
for(var id in this.childrenCache){
this.childrenCache[id].close&&this.childrenCache[id].close();
}
},getRoot:function(_415,_416){
if(this.root){
_415(this.root);
}else{
var res;
when(res=this.store.query(this.query),lang.hitch(this,function(_417){
if(_417.length!=1){
throw new Error("dijit.tree.ObjectStoreModel: root query returned "+_417.length+" items, but must return exactly one");
}
this.root=_417[0];
_415(this.root);
if(res.observe){
res.observe(lang.hitch(this,function(obj){
this.onChange(obj);
}),true);
}
}),_416);
}
},mayHaveChildren:function(){
return true;
},getChildren:function(_418,_419,_41a){
var id=this.store.getIdentity(_418);
if(this.childrenCache[id]){
when(this.childrenCache[id],_419,_41a);
return;
}
var res=this.childrenCache[id]=this.store.getChildren(_418);
when(res,_419,_41a);
if(res.observe){
res.observe(lang.hitch(this,function(obj,_41b,_41c){
this.onChange(obj);
if(_41b!=_41c){
when(res,lang.hitch(this,"onChildrenChange",_418));
}
}),true);
}
},isItem:function(){
return true;
},getIdentity:function(item){
return this.store.getIdentity(item);
},getLabel:function(item){
return item[this.labelAttr];
},newItem:function(args,_41d,_41e,_41f){
return this.store.put(args,{parent:_41d,before:_41f});
},pasteItem:function(_420,_421,_422,_423,_424,_425){
if(!_423){
var _426=[].concat(this.childrenCache[this.getIdentity(_421)]),_427=_412.indexOf(_426,_420);
_426.splice(_427,1);
this.onChildrenChange(_421,_426);
}
return this.store.put(_420,{overwrite:true,parent:_422,before:_425});
},onChange:function(){
},onChildrenChange:function(){
},onDelete:function(){
}});
});
},"dijit/Destroyable":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare"],function(_428,_429,_42a){
return _42a("dijit.Destroyable",null,{destroy:function(_42b){
this._destroyed=true;
},own:function(){
_428.forEach(arguments,function(_42c){
var _42d="destroyRecursive" in _42c?"destroyRecursive":"destroy" in _42c?"destroy":"remove";
var odh=_429.before(this,"destroy",function(_42e){
_42c[_42d](_42e);
});
var hdh=_429.after(_42c,_42d,function(){
odh.remove();
hdh.remove();
},true);
},this);
return arguments;
}});
});
},"dijit/layout/_ContentPaneResizeMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/query","dojo/sniff","../registry","../Viewport","./utils"],function(_42f,_430,_431,_432,_433,lang,_434,has,_435,_436,_437){
return _430("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isLayoutContainer:true,startup:function(){
if(this._started){
return;
}
var _438=this.getParent();
this._childOfLayoutWidget=_438&&_438.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
this.inherited(arguments);
if(this._isShown()){
this._onShow();
}
if(!this._childOfLayoutWidget){
this.own(_436.on("resize",lang.hitch(this,"resize")));
}
},_checkIfSingleChild:function(){
var _439=[],_43a=false;
_434("> *",this.containerNode).some(function(node){
var _43b=_435.byNode(node);
if(_43b&&_43b.resize){
_439.push(_43b);
}else{
if(!/script|link|style/i.test(node.nodeName)&&node.offsetHeight){
_43a=true;
}
}
});
this._singleChild=_439.length==1&&!_43a?_439[0]:null;
_431.toggle(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_43c,_43d){
this._resizeCalled=true;
this._scheduleLayout(_43c,_43d);
},_scheduleLayout:function(_43e,_43f){
if(this._isShown()){
this._layout(_43e,_43f);
}else{
this._needLayout=true;
this._changeSize=_43e;
this._resultSize=_43f;
}
},_layout:function(_440,_441){
delete this._needLayout;
if(!this._wasShown&&this.open!==false){
this._onShow();
}
if(_440){
_432.setMarginBox(this.domNode,_440);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_441||{};
lang.mixin(mb,_440||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_432.getMarginBox(cn),mb);
}
this._contentBox=_437.marginBox2contentBox(cn,mb);
}else{
this._contentBox=_432.getContentBox(cn);
}
this._layoutChildren();
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||_432.getContentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
var _442=this.getChildren(),_443,i=0;
while(_443=_442[i++]){
if(_443.resize){
_443.resize();
}
}
}
},_isShown:function(){
if(this._childOfLayoutWidget){
if(this._resizeCalled&&"open" in this){
return this.open;
}
return this._resizeCalled;
}else{
if("open" in this){
return this.open;
}else{
var node=this.domNode,_444=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!_431.contains(node,"dijitHidden")&&_444&&_444.style&&(_444.style.display!="none");
}
}
},_onShow:function(){
this._wasShown=true;
if(this._needLayout){
this._layout(this._changeSize,this._resultSize);
}
this.inherited(arguments);
}});
});
},"dijit/WidgetSet":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","./registry"],function(_445,_446,_447,_448){
var _449=_446("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_44a){
if(this._hash[_44a.id]){
throw new Error("Tried to register widget with id=="+_44a.id+" but that id is already registered");
}
this._hash[_44a.id]=_44a;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_44b){
_44b=_44b||_447.global;
var i=0,id;
for(id in this._hash){
func.call(_44b,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_44c,_44d){
_44d=_44d||_447.global;
var res=new _449(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_44c.call(_44d,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new _449(),id,_44e;
for(id in this._hash){
_44e=this._hash[id];
if(_44e.declaredClass==cls){
res.add(_44e);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_44f){
return _445.map(this.toArray(),func,_44f);
},every:function(func,_450){
_450=_450||_447.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_450,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_451){
_451=_451||_447.global;
var x=0,i;
for(i in this._hash){
if(func.call(_451,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
_445.forEach(["forEach","filter","byClass","map","every","some"],function(func){
_448[func]=_449.prototype[func];
});
return _449;
});
},"dijit/_editor/RichText":function(){
define(["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/query","dojo/domReady","dojo/sniff","dojo/topic","dojo/_base/unload","dojo/_base/url","dojo/window","../_Widget","../_CssStateMixin","../selection","./range","./html","../focus","../main"],function(_452,_453,_454,_455,dom,_456,_457,_458,_459,_45a,_45b,keys,lang,on,_45c,_45d,has,_45e,_45f,_460,_461,_462,_463,_464,_465,_466,_467,_468){
var _469=_454("dijit._editor.RichText",[_462,_463],{constructor:function(_46a){
this.contentPreFilters=[];
this.contentPostFilters=[];
this.contentDomPreFilters=[];
this.contentDomPostFilters=[];
this.editingAreaStyleSheets=[];
this.events=[].concat(this.events);
this._keyHandlers={};
if(_46a&&lang.isString(_46a.value)){
this.value=_46a.value;
}
this.onLoadDeferred=new _455();
},baseClass:"dijitEditor",inheritWidth:false,focusOnLoad:false,name:"",styleSheets:"",height:"300px",minHeight:"1em",isClosed:true,isLoaded:false,_SEPARATOR:"@@**%%__RICHTEXTBOUNDRY__%%**@@",_NAME_CONTENT_SEP:"@@**%%:%%**@@",onLoadDeferred:null,isTabIndent:false,disableSpellCheck:false,postCreate:function(){
if("textarea"===this.domNode.tagName.toLowerCase()){
console.warn("RichText should not be used with the TEXTAREA tag.  See dijit._editor.RichText docs.");
}
this.contentPreFilters=[lang.hitch(this,"_preFixUrlAttributes")].concat(this.contentPreFilters);
if(has("mozilla")){
this.contentPreFilters=[this._normalizeFontStyle].concat(this.contentPreFilters);
this.contentPostFilters=[this._removeMozBogus].concat(this.contentPostFilters);
}
if(has("webkit")){
this.contentPreFilters=[this._removeWebkitBogus].concat(this.contentPreFilters);
this.contentPostFilters=[this._removeWebkitBogus].concat(this.contentPostFilters);
}
if(has("ie")||has("trident")){
this.contentPostFilters=[this._normalizeFontStyle].concat(this.contentPostFilters);
this.contentDomPostFilters=[lang.hitch(this,"_stripBreakerNodes")].concat(this.contentDomPostFilters);
}
this.contentDomPostFilters=[lang.hitch(this,"_stripTrailingEmptyNodes")].concat(this.contentDomPostFilters);
this.inherited(arguments);
_45e.publish(_468._scopeName+"._editor.RichText::init",this);
},startup:function(){
this.inherited(arguments);
this.open();
this.setupDefaultShortcuts();
},setupDefaultShortcuts:function(){
var exec=lang.hitch(this,function(cmd,arg){
return function(){
return !this.execCommand(cmd,arg);
};
});
var _46b={b:exec("bold"),i:exec("italic"),u:exec("underline"),a:exec("selectall"),s:function(){
this.save(true);
},m:function(){
this.isTabIndent=!this.isTabIndent;
},"1":exec("formatblock","h1"),"2":exec("formatblock","h2"),"3":exec("formatblock","h3"),"4":exec("formatblock","h4"),"\\":exec("insertunorderedlist")};
if(!has("ie")){
_46b.Z=exec("redo");
}
var key;
for(key in _46b){
this.addKeyHandler(key,true,false,_46b[key]);
}
},events:["onKeyDown","onKeyUp"],captureEvents:[],_editorCommandsLocalized:false,_localizeEditorCommands:function(){
if(_469._editorCommandsLocalized){
this._local2NativeFormatNames=_469._local2NativeFormatNames;
this._native2LocalFormatNames=_469._native2LocalFormatNames;
return;
}
_469._editorCommandsLocalized=true;
_469._local2NativeFormatNames={};
_469._native2LocalFormatNames={};
this._local2NativeFormatNames=_469._local2NativeFormatNames;
this._native2LocalFormatNames=_469._native2LocalFormatNames;
var _46c=["div","p","pre","h1","h2","h3","h4","h5","h6","ol","ul","address"];
var _46d="",_46e,i=0;
while((_46e=_46c[i++])){
if(_46e.charAt(1)!=="l"){
_46d+="<"+_46e+"><span>content</span></"+_46e+"><br/>";
}else{
_46d+="<"+_46e+"><li>content</li></"+_46e+"><br/>";
}
}
var _46f={position:"absolute",top:"0px",zIndex:10,opacity:0.01};
var div=_458.create("div",{style:_46f,innerHTML:_46d});
this.ownerDocumentBody.appendChild(div);
var _470=lang.hitch(this,function(){
var node=div.firstChild;
while(node){
try{
this.selection.selectElement(node.firstChild);
var _471=node.tagName.toLowerCase();
this._local2NativeFormatNames[_471]=document.queryCommandValue("formatblock");
this._native2LocalFormatNames[this._local2NativeFormatNames[_471]]=_471;
node=node.nextSibling.nextSibling;
}
catch(e){
}
}
_458.destroy(div);
});
this.defer(_470);
},open:function(_472){
if(!this.onLoadDeferred||this.onLoadDeferred.fired>=0){
this.onLoadDeferred=new _455();
}
if(!this.isClosed){
this.close();
}
_45e.publish(_468._scopeName+"._editor.RichText::open",this);
if(arguments.length===1&&_472.nodeName){
this.domNode=_472;
}
var dn=this.domNode;
var html;
if(lang.isString(this.value)){
html=this.value;
delete this.value;
dn.innerHTML="";
}else{
if(dn.nodeName&&dn.nodeName.toLowerCase()=="textarea"){
var ta=(this.textarea=dn);
this.name=ta.name;
html=ta.value;
dn=this.domNode=this.ownerDocument.createElement("div");
dn.setAttribute("widgetId",this.id);
ta.removeAttribute("widgetId");
dn.cssText=ta.cssText;
dn.className+=" "+ta.className;
_458.place(dn,ta,"before");
var _473=lang.hitch(this,function(){
_45a.set(ta,{display:"block",position:"absolute",top:"-1000px"});
if(has("ie")){
var s=ta.style;
this.__overflow=s.overflow;
s.overflow="hidden";
}
});
if(has("ie")){
this.defer(_473,10);
}else{
_473();
}
if(ta.form){
var _474=ta.value;
this.reset=function(){
var _475=this.getValue();
if(_475!==_474){
this.replaceValue(_474);
}
};
on(ta.form,"submit",lang.hitch(this,function(){
_456.set(ta,"disabled",this.disabled);
ta.value=this.getValue();
}));
}
}else{
html=_466.getChildrenHtml(dn);
dn.innerHTML="";
}
}
this.value=html;
if(dn.nodeName&&dn.nodeName==="LI"){
dn.innerHTML=" <br>";
}
this.header=dn.ownerDocument.createElement("div");
dn.appendChild(this.header);
this.editingArea=dn.ownerDocument.createElement("div");
dn.appendChild(this.editingArea);
this.footer=dn.ownerDocument.createElement("div");
dn.appendChild(this.footer);
if(!this.name){
this.name=this.id+"_AUTOGEN";
}
if(this.name!==""&&(!_453["useXDomain"]||_453["allowXdRichTextSave"])){
var _476=dom.byId(_468._scopeName+"._editor.RichText.value");
if(_476&&_476.value!==""){
var _477=_476.value.split(this._SEPARATOR),i=0,dat;
while((dat=_477[i++])){
var data=dat.split(this._NAME_CONTENT_SEP);
if(data[0]===this.name){
html=data[1];
_477=_477.splice(i,1);
_476.value=_477.join(this._SEPARATOR);
break;
}
}
}
if(!_469._globalSaveHandler){
_469._globalSaveHandler={};
_45f.addOnUnload(function(){
var id;
for(id in _469._globalSaveHandler){
var f=_469._globalSaveHandler[id];
if(lang.isFunction(f)){
f();
}
}
});
}
_469._globalSaveHandler[this.id]=lang.hitch(this,"_saveContent");
}
this.isClosed=false;
var ifr=(this.editorObject=this.iframe=this.ownerDocument.createElement("iframe"));
ifr.id=this.id+"_iframe";
ifr.style.border="none";
ifr.style.width="100%";
if(this._layoutMode){
ifr.style.height="100%";
}else{
if(has("ie")>=7){
if(this.height){
ifr.style.height=this.height;
}
if(this.minHeight){
ifr.style.minHeight=this.minHeight;
}
}else{
ifr.style.height=this.height?this.height:this.minHeight;
}
}
ifr.frameBorder=0;
ifr._loadFunc=lang.hitch(this,function(w){
this.window=w;
this.document=w.document;
this.selection=new _464.SelectionManager(w);
if(has("ie")){
this._localizeEditorCommands();
}
this.onLoad(html);
});
var src=this._getIframeDocTxt().replace(/\\/g,"\\\\").replace(/'/g,"\\'"),s;
if(has("ie")<11){
s="javascript:document.open();try{parent.window;}catch(e){document.domain=\""+document.domain+"\";}"+"document.write('"+src+"');document.close()";
}else{
s="javascript: '"+src+"'";
}
if(has("ie")==9){
this.editingArea.appendChild(ifr);
ifr.src=s;
}else{
ifr.setAttribute("src",s);
this.editingArea.appendChild(ifr);
}
if(dn.nodeName==="LI"){
dn.lastChild.style.marginTop="-1.2em";
}
_457.add(this.domNode,this.baseClass);
},_local2NativeFormatNames:{},_native2LocalFormatNames:{},_getIframeDocTxt:function(){
var _478=_45a.getComputedStyle(this.domNode);
var html="<div id='dijitEditorBody'></div>";
var font=[_478.fontWeight,_478.fontSize,_478.fontFamily].join(" ");
var _479=_478.lineHeight;
if(_479.indexOf("px")>=0){
_479=parseFloat(_479)/parseFloat(_478.fontSize);
}else{
if(_479.indexOf("em")>=0){
_479=parseFloat(_479);
}else{
_479="normal";
}
}
var _47a="";
var self=this;
this.style.replace(/(^|;)\s*(line-|font-?)[^;]+/ig,function(_47b){
_47b=_47b.replace(/^;/ig,"")+";";
var s=_47b.split(":")[0];
if(s){
s=lang.trim(s);
s=s.toLowerCase();
var i;
var sC="";
for(i=0;i<s.length;i++){
var c=s.charAt(i);
switch(c){
case "-":
i++;
c=s.charAt(i).toUpperCase();
default:
sC+=c;
}
}
_45a.set(self.domNode,sC,"");
}
_47a+=_47b+";";
});
var _47c=_45c("label[for=\""+this.id+"\"]");
var _47d="";
if(_47c.length){
_47d=_47c[0].innerHTML;
}else{
if(this["aria-label"]){
_47d=this["aria-label"];
}else{
if(this["aria-labelledby"]){
_47d=dom.byId(this["aria-labelledby"]).innerHTML;
}
}
}
this.iframe.setAttribute("title",_47d);
return ["<!DOCTYPE html>",this.isLeftToRight()?"<html lang='"+this.lang+"'>\n<head>\n":"<html dir='rtl' lang='"+this.lang+"'>\n<head>\n",_47d?"<title>"+_47d+"</title>":"","<meta http-equiv='Content-Type' content='text/html'>\n","<style>\n","\tbody,html {\n","\t\tbackground:transparent;\n","\t\tpadding: 1px 0 0 0;\n","\t\tmargin: -1px 0 0 0;\n","\t}\n","\tbody,html,#dijitEditorBody { outline: none; }","html { height: 100%; width: 100%; overflow: hidden; }\n",this.height?"\tbody,#dijitEditorBody { height: 100%; width: 100%; overflow: auto; }\n":"\tbody,#dijitEditorBody { min-height: "+this.minHeight+"; width: 100%; overflow-x: auto; overflow-y: hidden; }\n","\tbody{\n","\t\ttop:0px;\n","\t\tleft:0px;\n","\t\tright:0px;\n","\t\tfont:",font,";\n",((this.height||has("opera"))?"":"\t\tposition: fixed;\n"),"\t\tline-height:",_479,";\n","\t}\n","\tp{ margin: 1em 0; }\n","\tli > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; }\n",(!has("ie")?"\tli{ min-height:1.2em; }\n":""),"</style>\n",this._applyEditingAreaStyleSheets(),"\n","</head>\n<body role='main' ","onload='frameElement && frameElement._loadFunc(window,document)' ","style='"+_47a+"'>",html,"</body>\n</html>"].join("");
},_applyEditingAreaStyleSheets:function(){
var _47e=[];
if(this.styleSheets){
_47e=this.styleSheets.split(";");
this.styleSheets="";
}
_47e=_47e.concat(this.editingAreaStyleSheets);
this.editingAreaStyleSheets=[];
var text="",i=0,url,_47f=_461.get(this.ownerDocument);
while((url=_47e[i++])){
var _480=(new _460(_47f.location,url)).toString();
this.editingAreaStyleSheets.push(_480);
text+="<link rel=\"stylesheet\" type=\"text/css\" href=\""+_480+"\"/>";
}
return text;
},addStyleSheet:function(uri){
var url=uri.toString(),_481=_461.get(this.ownerDocument);
if(url.charAt(0)==="."||(url.charAt(0)!=="/"&&!uri.host)){
url=(new _460(_481.location,url)).toString();
}
if(_452.indexOf(this.editingAreaStyleSheets,url)>-1){
return;
}
this.editingAreaStyleSheets.push(url);
this.onLoadDeferred.then(lang.hitch(this,function(){
if(this.document.createStyleSheet){
this.document.createStyleSheet(url);
}else{
var head=this.document.getElementsByTagName("head")[0];
var _482=this.document.createElement("link");
_482.rel="stylesheet";
_482.type="text/css";
_482.href=url;
head.appendChild(_482);
}
}));
},removeStyleSheet:function(uri){
var url=uri.toString(),_483=_461.get(this.ownerDocument);
if(url.charAt(0)==="."||(url.charAt(0)!=="/"&&!uri.host)){
url=(new _460(_483.location,url)).toString();
}
var _484=_452.indexOf(this.editingAreaStyleSheets,url);
if(_484===-1){
return;
}
delete this.editingAreaStyleSheets[_484];
_45c("link[href=\""+url+"\"]",this.window.document).orphan();
},disabled:false,_mozSettingProps:{"styleWithCSS":false},_setDisabledAttr:function(_485){
_485=!!_485;
this._set("disabled",_485);
if(!this.isLoaded){
return;
}
var _486=has("ie")&&(this.isLoaded||!this.focusOnLoad);
if(_486){
this.editNode.unselectable="on";
}
this.editNode.contentEditable=!_485;
this.editNode.tabIndex=_485?"-1":this.tabIndex;
if(_486){
this.defer(function(){
if(this.editNode){
this.editNode.unselectable="off";
}
});
}
if(has("mozilla")&&!_485&&this._mozSettingProps){
var ps=this._mozSettingProps;
var n;
for(n in ps){
if(ps.hasOwnProperty(n)){
try{
this.document.execCommand(n,false,ps[n]);
}
catch(e2){
}
}
}
}
this._disabledOK=true;
},onLoad:function(html){
if(!this.window.__registeredWindow){
this.window.__registeredWindow=true;
this._iframeRegHandle=_467.registerIframe(this.iframe);
}
this.editNode=this.document.body.firstChild;
var _487=this;
this.beforeIframeNode=_458.place("<div tabIndex=-1></div>",this.iframe,"before");
this.afterIframeNode=_458.place("<div tabIndex=-1></div>",this.iframe,"after");
this.iframe.onfocus=this.document.onfocus=function(){
_487.editNode.focus();
};
this.focusNode=this.editNode;
var _488=this.events.concat(this.captureEvents);
var ap=this.iframe?this.document:this.editNode;
this.own(_452.map(_488,function(item){
var type=item.toLowerCase().replace(/^on/,"");
on(ap,type,lang.hitch(this,item));
},this));
this.own(on(ap,"mouseup",lang.hitch(this,"onClick")));
if(has("ie")){
this.own(on(this.document,"mousedown",lang.hitch(this,"_onIEMouseDown")));
this.editNode.style.zoom=1;
}else{
this.own(on(this.document,"mousedown",lang.hitch(this,function(){
delete this._cursorToStart;
})));
}
if(has("webkit")){
this._webkitListener=this.own(on(this.document,"mouseup",lang.hitch(this,"onDisplayChanged")))[0];
this.own(on(this.document,"mousedown",lang.hitch(this,function(e){
var t=e.target;
if(t&&(t===this.document.body||t===this.document)){
this.defer("placeCursorAtEnd");
}
})));
}
if(has("ie")){
try{
this.document.execCommand("RespectVisibilityInDesign",true,null);
}
catch(e){
}
}
this.isLoaded=true;
this.set("disabled",this.disabled);
var _489=lang.hitch(this,function(){
this.setValue(html);
if(this.onLoadDeferred){
this.onLoadDeferred.resolve(true);
}
this.onDisplayChanged();
if(this.focusOnLoad){
_45d(lang.hitch(this,"defer","focus",this.updateInterval));
}
this.value=this.getValue(true);
});
if(this.setValueDeferred){
this.setValueDeferred.then(_489);
}else{
_489();
}
},onKeyDown:function(e){
if(e.keyCode===keys.TAB&&this.isTabIndent){
e.stopPropagation();
e.preventDefault();
if(this.queryCommandEnabled((e.shiftKey?"outdent":"indent"))){
this.execCommand((e.shiftKey?"outdent":"indent"));
}
}
if(e.keyCode==keys.TAB&&!this.isTabIndent){
if(e.shiftKey&&!e.ctrlKey&&!e.altKey){
this.beforeIframeNode.focus();
}else{
if(!e.shiftKey&&!e.ctrlKey&&!e.altKey){
this.afterIframeNode.focus();
}
}
}
if(has("ie")<9&&e.keyCode===keys.BACKSPACE&&this.document.selection.type==="Control"){
e.stopPropagation();
e.preventDefault();
this.execCommand("delete");
}
if(has("ff")){
if(e.keyCode===keys.PAGE_UP||e.keyCode===keys.PAGE_DOWN){
if(this.editNode.clientHeight>=this.editNode.scrollHeight){
e.preventDefault();
}
}
}
var _48a=this._keyHandlers[e.keyCode],args=arguments;
if(_48a&&!e.altKey){
_452.some(_48a,function(h){
if(!(h.shift^e.shiftKey)&&!(h.ctrl^(e.ctrlKey||e.metaKey))){
if(!h.handler.apply(this,args)){
e.preventDefault();
}
return true;
}
},this);
}
this.defer("onKeyPressed",1);
return true;
},onKeyUp:function(){
},setDisabled:function(_48b){
_45b.deprecated("dijit.Editor::setDisabled is deprecated","use dijit.Editor::attr(\"disabled\",boolean) instead",2);
this.set("disabled",_48b);
},_setValueAttr:function(_48c){
this.setValue(_48c);
},_setDisableSpellCheckAttr:function(_48d){
if(this.document){
_456.set(this.document.body,"spellcheck",!_48d);
}else{
this.onLoadDeferred.then(lang.hitch(this,function(){
_456.set(this.document.body,"spellcheck",!_48d);
}));
}
this._set("disableSpellCheck",_48d);
},addKeyHandler:function(key,ctrl,_48e,_48f){
if(typeof key=="string"){
key=key.toUpperCase().charCodeAt(0);
}
if(!lang.isArray(this._keyHandlers[key])){
this._keyHandlers[key]=[];
}
this._keyHandlers[key].push({shift:_48e||false,ctrl:ctrl||false,handler:_48f});
},onKeyPressed:function(){
this.onDisplayChanged();
},onClick:function(e){
this.onDisplayChanged(e);
},_onIEMouseDown:function(){
if(!this.focused&&!this.disabled){
this.focus();
}
},_onBlur:function(e){
if(has("ie")>=9){
this.defer(function(){
if(!_467.curNode){
this.ownerDocumentBody.focus();
}
});
}
this.inherited(arguments);
var _490=this.getValue(true);
if(_490!==this.value){
this.onChange(_490);
}
this._set("value",_490);
},_onFocus:function(e){
if(!this.disabled){
if(!this._disabledOK){
this.set("disabled",false);
}
this.inherited(arguments);
}
},blur:function(){
if(!has("ie")&&this.window.document.documentElement&&this.window.document.documentElement.focus){
this.window.document.documentElement.focus();
}else{
if(this.ownerDocumentBody.focus){
this.ownerDocumentBody.focus();
}
}
},focus:function(){
if(!this.isLoaded){
this.focusOnLoad=true;
return;
}
if(this._cursorToStart){
delete this._cursorToStart;
if(this.editNode.childNodes){
this.placeCursorAtStart();
return;
}
}
if(has("ie")<9){
this.iframe.fireEvent("onfocus",document.createEventObject());
}else{
this.editNode.focus();
}
},updateInterval:200,_updateTimer:null,onDisplayChanged:function(){
if(this._updateTimer){
this._updateTimer.remove();
}
this._updateTimer=this.defer("onNormalizedDisplayChanged",this.updateInterval);
},onNormalizedDisplayChanged:function(){
delete this._updateTimer;
},onChange:function(){
},_normalizeCommand:function(cmd,_491){
var _492=cmd.toLowerCase();
if(_492==="formatblock"){
if(has("safari")&&_491===undefined){
_492="heading";
}
}else{
if(_492==="hilitecolor"&&!has("mozilla")){
_492="backcolor";
}
}
return _492;
},_qcaCache:{},queryCommandAvailable:function(_493){
var ca=this._qcaCache[_493];
if(ca!==undefined){
return ca;
}
return (this._qcaCache[_493]=this._queryCommandAvailable(_493));
},_queryCommandAvailable:function(_494){
var ie=1;
var _495=1<<1;
var _496=1<<2;
var _497=1<<3;
function _498(_499){
return {ie:Boolean(_499&ie),mozilla:Boolean(_499&_495),webkit:Boolean(_499&_496),opera:Boolean(_499&_497)};
};
var _49a=null;
switch(_494.toLowerCase()){
case "bold":
case "italic":
case "underline":
case "subscript":
case "superscript":
case "fontname":
case "fontsize":
case "forecolor":
case "hilitecolor":
case "justifycenter":
case "justifyfull":
case "justifyleft":
case "justifyright":
case "delete":
case "selectall":
case "toggledir":
_49a=_498(_495|ie|_496|_497);
break;
case "createlink":
case "unlink":
case "removeformat":
case "inserthorizontalrule":
case "insertimage":
case "insertorderedlist":
case "insertunorderedlist":
case "indent":
case "outdent":
case "formatblock":
case "inserthtml":
case "undo":
case "redo":
case "strikethrough":
case "tabindent":
_49a=_498(_495|ie|_497|_496);
break;
case "blockdirltr":
case "blockdirrtl":
case "dirltr":
case "dirrtl":
case "inlinedirltr":
case "inlinedirrtl":
_49a=_498(ie);
break;
case "cut":
case "copy":
case "paste":
_49a=_498(ie|_495|_496|_497);
break;
case "inserttable":
_49a=_498(_495|ie);
break;
case "insertcell":
case "insertcol":
case "insertrow":
case "deletecells":
case "deletecols":
case "deleterows":
case "mergecells":
case "splitcell":
_49a=_498(ie|_495);
break;
default:
return false;
}
return ((has("ie")||has("trident"))&&_49a.ie)||(has("mozilla")&&_49a.mozilla)||(has("webkit")&&_49a.webkit)||(has("opera")&&_49a.opera);
},execCommand:function(_49b,_49c){
var _49d;
if(this.focused){
this.focus();
}
_49b=this._normalizeCommand(_49b,_49c);
if(_49c!==undefined){
if(_49b==="heading"){
throw new Error("unimplemented");
}else{
if(_49b==="formatblock"&&(has("ie")||has("trident"))){
_49c="<"+_49c+">";
}
}
}
var _49e="_"+_49b+"Impl";
if(this[_49e]){
_49d=this[_49e](_49c);
}else{
_49c=arguments.length>1?_49c:null;
if(_49c||_49b!=="createlink"){
_49d=this.document.execCommand(_49b,false,_49c);
}
}
this.onDisplayChanged();
return _49d;
},queryCommandEnabled:function(_49f){
if(this.disabled||!this._disabledOK){
return false;
}
_49f=this._normalizeCommand(_49f);
var _4a0="_"+_49f+"EnabledImpl";
if(this[_4a0]){
return this[_4a0](_49f);
}else{
return this._browserQueryCommandEnabled(_49f);
}
},queryCommandState:function(_4a1){
if(this.disabled||!this._disabledOK){
return false;
}
_4a1=this._normalizeCommand(_4a1);
try{
return this.document.queryCommandState(_4a1);
}
catch(e){
return false;
}
},queryCommandValue:function(_4a2){
if(this.disabled||!this._disabledOK){
return false;
}
var r;
_4a2=this._normalizeCommand(_4a2);
if((has("ie")||has("trident"))&&_4a2==="formatblock"){
r=this._native2LocalFormatNames[this.document.queryCommandValue(_4a2)];
}else{
if(has("mozilla")&&_4a2==="hilitecolor"){
var _4a3;
try{
_4a3=this.document.queryCommandValue("styleWithCSS");
}
catch(e){
_4a3=false;
}
this.document.execCommand("styleWithCSS",false,true);
r=this.document.queryCommandValue(_4a2);
this.document.execCommand("styleWithCSS",false,_4a3);
}else{
r=this.document.queryCommandValue(_4a2);
}
}
return r;
},_sCall:function(name,args){
return this.selection[name].apply(this.selection,args);
},placeCursorAtStart:function(){
this.focus();
var _4a4=false;
if(has("mozilla")){
var _4a5=this.editNode.firstChild;
while(_4a5){
if(_4a5.nodeType===3){
if(_4a5.nodeValue.replace(/^\s+|\s+$/g,"").length>0){
_4a4=true;
this.selection.selectElement(_4a5);
break;
}
}else{
if(_4a5.nodeType===1){
_4a4=true;
var tg=_4a5.tagName?_4a5.tagName.toLowerCase():"";
if(/br|input|img|base|meta|area|basefont|hr|link/.test(tg)){
this.selection.selectElement(_4a5);
}else{
this.selection.selectElementChildren(_4a5);
}
break;
}
}
_4a5=_4a5.nextSibling;
}
}else{
_4a4=true;
this.selection.selectElementChildren(this.editNode);
}
if(_4a4){
this.selection.collapse(true);
}
},placeCursorAtEnd:function(){
this.focus();
var _4a6=false;
if(has("mozilla")){
var last=this.editNode.lastChild;
while(last){
if(last.nodeType===3){
if(last.nodeValue.replace(/^\s+|\s+$/g,"").length>0){
_4a6=true;
this.selection.selectElement(last);
break;
}
}else{
if(last.nodeType===1){
_4a6=true;
this.selection.selectElement(last.lastChild||last);
break;
}
}
last=last.previousSibling;
}
}else{
_4a6=true;
this.selection.selectElementChildren(this.editNode);
}
if(_4a6){
this.selection.collapse(false);
}
},getValue:function(_4a7){
if(this.textarea){
if(this.isClosed||!this.isLoaded){
return this.textarea.value;
}
}
return this._postFilterContent(null,_4a7);
},_getValueAttr:function(){
return this.getValue(true);
},setValue:function(html){
if(!this.isLoaded){
this.onLoadDeferred.then(lang.hitch(this,function(){
this.setValue(html);
}));
return;
}
this._cursorToStart=true;
if(this.textarea&&(this.isClosed||!this.isLoaded)){
this.textarea.value=html;
}else{
html=this._preFilterContent(html);
var node=this.isClosed?this.domNode:this.editNode;
if(!html&&has("webkit")){
html="&#160;";
}
node.innerHTML=html;
this._preDomFilterContent(node);
}
this.onDisplayChanged();
this._set("value",this.getValue(true));
},replaceValue:function(html){
if(this.isClosed){
this.setValue(html);
}else{
if(this.window&&this.window.getSelection&&!has("mozilla")){
this.setValue(html);
}else{
if(this.window&&this.window.getSelection){
html=this._preFilterContent(html);
this.execCommand("selectall");
this.execCommand("inserthtml",html);
this._preDomFilterContent(this.editNode);
}else{
if(this.document&&this.document.selection){
this.setValue(html);
}
}
}
}
this._set("value",this.getValue(true));
},_preFilterContent:function(html){
var ec=html;
_452.forEach(this.contentPreFilters,function(ef){
if(ef){
ec=ef(ec);
}
});
return ec;
},_preDomFilterContent:function(dom){
dom=dom||this.editNode;
_452.forEach(this.contentDomPreFilters,function(ef){
if(ef&&lang.isFunction(ef)){
ef(dom);
}
},this);
},_postFilterContent:function(dom,_4a8){
var ec;
if(!lang.isString(dom)){
dom=dom||this.editNode;
if(this.contentDomPostFilters.length){
if(_4a8){
dom=lang.clone(dom);
}
_452.forEach(this.contentDomPostFilters,function(ef){
dom=ef(dom);
});
}
ec=_466.getChildrenHtml(dom);
}else{
ec=dom;
}
if(!lang.trim(ec.replace(/^\xA0\xA0*/,"").replace(/\xA0\xA0*$/,"")).length){
ec="";
}
_452.forEach(this.contentPostFilters,function(ef){
ec=ef(ec);
});
return ec;
},_saveContent:function(){
var _4a9=dom.byId(_468._scopeName+"._editor.RichText.value");
if(_4a9){
if(_4a9.value){
_4a9.value+=this._SEPARATOR;
}
_4a9.value+=this.name+this._NAME_CONTENT_SEP+this.getValue(true);
}
},escapeXml:function(str,_4aa){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_4aa){
str=str.replace(/'/gm,"&#39;");
}
return str;
},getNodeHtml:function(node){
_45b.deprecated("dijit.Editor::getNodeHtml is deprecated","use dijit/_editor/html::getNodeHtml instead",2);
return _466.getNodeHtml(node);
},getNodeChildrenHtml:function(dom){
_45b.deprecated("dijit.Editor::getNodeChildrenHtml is deprecated","use dijit/_editor/html::getChildrenHtml instead",2);
return _466.getChildrenHtml(dom);
},close:function(save){
if(this.isClosed){
return;
}
if(!arguments.length){
save=true;
}
if(save){
this._set("value",this.getValue(true));
}
if(this.interval){
clearInterval(this.interval);
}
if(this._webkitListener){
this._webkitListener.remove();
delete this._webkitListener;
}
if(has("ie")){
this.iframe.onfocus=null;
}
this.iframe._loadFunc=null;
if(this._iframeRegHandle){
this._iframeRegHandle.remove();
delete this._iframeRegHandle;
}
if(this.textarea){
var s=this.textarea.style;
s.position="";
s.left=s.top="";
if(has("ie")){
s.overflow=this.__overflow;
this.__overflow=null;
}
this.textarea.value=this.value;
_458.destroy(this.domNode);
this.domNode=this.textarea;
}else{
this.domNode.innerHTML=this.value;
}
delete this.iframe;
_457.remove(this.domNode,this.baseClass);
this.isClosed=true;
this.isLoaded=false;
delete this.editNode;
delete this.focusNode;
if(this.window&&this.window._frameElement){
this.window._frameElement=null;
}
this.window=null;
this.document=null;
this.editingArea=null;
this.editorObject=null;
},destroy:function(){
if(!this.isClosed){
this.close(false);
}
if(this._updateTimer){
this._updateTimer.remove();
}
this.inherited(arguments);
if(_469._globalSaveHandler){
delete _469._globalSaveHandler[this.id];
}
},_removeMozBogus:function(html){
return html.replace(/\stype="_moz"/gi,"").replace(/\s_moz_dirty=""/gi,"").replace(/_moz_resizing="(true|false)"/gi,"");
},_removeWebkitBogus:function(html){
html=html.replace(/\sclass="webkit-block-placeholder"/gi,"");
html=html.replace(/\sclass="apple-style-span"/gi,"");
html=html.replace(/<meta charset=\"utf-8\" \/>/gi,"");
return html;
},_normalizeFontStyle:function(html){
return html.replace(/<(\/)?strong([ \>])/gi,"<$1b$2").replace(/<(\/)?em([ \>])/gi,"<$1i$2");
},_preFixUrlAttributes:function(html){
return html.replace(/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2").replace(/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi,"$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
},_browserQueryCommandEnabled:function(_4ab){
if(!_4ab){
return false;
}
var elem=has("ie")<9?this.document.selection.createRange():this.document;
try{
return elem.queryCommandEnabled(_4ab);
}
catch(e){
return false;
}
},_createlinkEnabledImpl:function(){
var _4ac=true;
if(has("opera")){
var sel=this.window.getSelection();
if(sel.isCollapsed){
_4ac=true;
}else{
_4ac=this.document.queryCommandEnabled("createlink");
}
}else{
_4ac=this._browserQueryCommandEnabled("createlink");
}
return _4ac;
},_unlinkEnabledImpl:function(){
var _4ad=true;
if(has("mozilla")||has("webkit")){
_4ad=this.selection.hasAncestorElement("a");
}else{
_4ad=this._browserQueryCommandEnabled("unlink");
}
return _4ad;
},_inserttableEnabledImpl:function(){
var _4ae=true;
if(has("mozilla")||has("webkit")){
_4ae=true;
}else{
_4ae=this._browserQueryCommandEnabled("inserttable");
}
return _4ae;
},_cutEnabledImpl:function(){
var _4af=true;
if(has("webkit")){
var sel=this.window.getSelection();
if(sel){
sel=sel.toString();
}
_4af=!!sel;
}else{
_4af=this._browserQueryCommandEnabled("cut");
}
return _4af;
},_copyEnabledImpl:function(){
var _4b0=true;
if(has("webkit")){
var sel=this.window.getSelection();
if(sel){
sel=sel.toString();
}
_4b0=!!sel;
}else{
_4b0=this._browserQueryCommandEnabled("copy");
}
return _4b0;
},_pasteEnabledImpl:function(){
var _4b1=true;
if(has("webkit")){
return true;
}else{
_4b1=this._browserQueryCommandEnabled("paste");
}
return _4b1;
},_inserthorizontalruleImpl:function(_4b2){
if(has("ie")){
return this._inserthtmlImpl("<hr>");
}
return this.document.execCommand("inserthorizontalrule",false,_4b2);
},_unlinkImpl:function(_4b3){
if((this.queryCommandEnabled("unlink"))&&(has("mozilla")||has("webkit"))){
var a=this.selection.getAncestorElement("a");
this.selection.selectElement(a);
return this.document.execCommand("unlink",false,null);
}
return this.document.execCommand("unlink",false,_4b3);
},_hilitecolorImpl:function(_4b4){
var _4b5;
var _4b6=this._handleTextColorOrProperties("hilitecolor",_4b4);
if(!_4b6){
if(has("mozilla")){
this.document.execCommand("styleWithCSS",false,true);
_4b5=this.document.execCommand("hilitecolor",false,_4b4);
this.document.execCommand("styleWithCSS",false,false);
}else{
_4b5=this.document.execCommand("hilitecolor",false,_4b4);
}
}
return _4b5;
},_backcolorImpl:function(_4b7){
if(has("ie")){
_4b7=_4b7?_4b7:null;
}
var _4b8=this._handleTextColorOrProperties("backcolor",_4b7);
if(!_4b8){
_4b8=this.document.execCommand("backcolor",false,_4b7);
}
return _4b8;
},_forecolorImpl:function(_4b9){
if(has("ie")){
_4b9=_4b9?_4b9:null;
}
var _4ba=false;
_4ba=this._handleTextColorOrProperties("forecolor",_4b9);
if(!_4ba){
_4ba=this.document.execCommand("forecolor",false,_4b9);
}
return _4ba;
},_inserthtmlImpl:function(_4bb){
_4bb=this._preFilterContent(_4bb);
var rv=true;
if(has("ie")<9){
var _4bc=this.document.selection.createRange();
if(this.document.selection.type.toUpperCase()==="CONTROL"){
var n=_4bc.item(0);
while(_4bc.length){
_4bc.remove(_4bc.item(0));
}
n.outerHTML=_4bb;
}else{
_4bc.pasteHTML(_4bb);
}
_4bc.select();
}else{
if(has("trident")<8){
var _4bc;
var _4bd=_465.getSelection(this.window);
if(_4bd&&_4bd.rangeCount&&_4bd.getRangeAt){
_4bc=_4bd.getRangeAt(0);
_4bc.deleteContents();
var div=_458.create("div");
div.innerHTML=_4bb;
var node,_4be;
var n=this.document.createDocumentFragment();
while((node=div.firstChild)){
_4be=n.appendChild(node);
}
_4bc.insertNode(n);
if(_4be){
_4bc=_4bc.cloneRange();
_4bc.setStartAfter(_4be);
_4bc.collapse(false);
_4bd.removeAllRanges();
_4bd.addRange(_4bc);
}
}
}else{
if(has("mozilla")&&!_4bb.length){
this.selection.remove();
}else{
rv=this.document.execCommand("inserthtml",false,_4bb);
}
}
}
return rv;
},_boldImpl:function(_4bf){
var _4c0=false;
if(has("ie")){
this._adaptIESelection();
_4c0=this._adaptIEFormatAreaAndExec("bold");
}
if(!_4c0){
_4c0=this.document.execCommand("bold",false,_4bf);
}
return _4c0;
},_italicImpl:function(_4c1){
var _4c2=false;
if(has("ie")){
this._adaptIESelection();
_4c2=this._adaptIEFormatAreaAndExec("italic");
}
if(!_4c2){
_4c2=this.document.execCommand("italic",false,_4c1);
}
return _4c2;
},_underlineImpl:function(_4c3){
var _4c4=false;
if(has("ie")){
this._adaptIESelection();
_4c4=this._adaptIEFormatAreaAndExec("underline");
}
if(!_4c4){
_4c4=this.document.execCommand("underline",false,_4c3);
}
return _4c4;
},_strikethroughImpl:function(_4c5){
var _4c6=false;
if(has("ie")){
this._adaptIESelection();
_4c6=this._adaptIEFormatAreaAndExec("strikethrough");
}
if(!_4c6){
_4c6=this.document.execCommand("strikethrough",false,_4c5);
}
return _4c6;
},_superscriptImpl:function(_4c7){
var _4c8=false;
if(has("ie")){
this._adaptIESelection();
_4c8=this._adaptIEFormatAreaAndExec("superscript");
}
if(!_4c8){
_4c8=this.document.execCommand("superscript",false,_4c7);
}
return _4c8;
},_subscriptImpl:function(_4c9){
var _4ca=false;
if(has("ie")){
this._adaptIESelection();
_4ca=this._adaptIEFormatAreaAndExec("subscript");
}
if(!_4ca){
_4ca=this.document.execCommand("subscript",false,_4c9);
}
return _4ca;
},_fontnameImpl:function(_4cb){
var _4cc;
if(has("ie")){
_4cc=this._handleTextColorOrProperties("fontname",_4cb);
}
if(!_4cc){
_4cc=this.document.execCommand("fontname",false,_4cb);
}
return _4cc;
},_fontsizeImpl:function(_4cd){
var _4ce;
if(has("ie")){
_4ce=this._handleTextColorOrProperties("fontsize",_4cd);
}
if(!_4ce){
_4ce=this.document.execCommand("fontsize",false,_4cd);
}
return _4ce;
},_insertorderedlistImpl:function(_4cf){
var _4d0=false;
if(has("ie")){
_4d0=this._adaptIEList("insertorderedlist",_4cf);
}
if(!_4d0){
_4d0=this.document.execCommand("insertorderedlist",false,_4cf);
}
return _4d0;
},_insertunorderedlistImpl:function(_4d1){
var _4d2=false;
if(has("ie")){
_4d2=this._adaptIEList("insertunorderedlist",_4d1);
}
if(!_4d2){
_4d2=this.document.execCommand("insertunorderedlist",false,_4d1);
}
return _4d2;
},getHeaderHeight:function(){
return this._getNodeChildrenHeight(this.header);
},getFooterHeight:function(){
return this._getNodeChildrenHeight(this.footer);
},_getNodeChildrenHeight:function(node){
var h=0;
if(node&&node.childNodes){
var i;
for(i=0;i<node.childNodes.length;i++){
var size=_459.position(node.childNodes[i]);
h+=size.h;
}
}
return h;
},_isNodeEmpty:function(node,_4d3){
if(node.nodeType===1){
if(node.childNodes.length>0){
return this._isNodeEmpty(node.childNodes[0],_4d3);
}
return true;
}else{
if(node.nodeType===3){
return (node.nodeValue.substring(_4d3)==="");
}
}
return false;
},_removeStartingRangeFromRange:function(node,_4d4){
if(node.nextSibling){
_4d4.setStart(node.nextSibling,0);
}else{
var _4d5=node.parentNode;
while(_4d5&&_4d5.nextSibling==null){
_4d5=_4d5.parentNode;
}
if(_4d5){
_4d4.setStart(_4d5.nextSibling,0);
}
}
return _4d4;
},_adaptIESelection:function(){
var _4d6=_465.getSelection(this.window);
if(_4d6&&_4d6.rangeCount&&!_4d6.isCollapsed){
var _4d7=_4d6.getRangeAt(0);
var _4d8=_4d7.startContainer;
var _4d9=_4d7.startOffset;
while(_4d8.nodeType===3&&_4d9>=_4d8.length&&_4d8.nextSibling){
_4d9=_4d9-_4d8.length;
_4d8=_4d8.nextSibling;
}
var _4da=null;
while(this._isNodeEmpty(_4d8,_4d9)&&_4d8!==_4da){
_4da=_4d8;
_4d7=this._removeStartingRangeFromRange(_4d8,_4d7);
_4d8=_4d7.startContainer;
_4d9=0;
}
_4d6.removeAllRanges();
_4d6.addRange(_4d7);
}
},_adaptIEFormatAreaAndExec:function(_4db){
var _4dc=_465.getSelection(this.window);
var doc=this.document;
var rs,ret,_4dd,txt,_4de,_4df,_4e0,_4e1;
if(_4db&&_4dc&&_4dc.isCollapsed){
var _4e2=this.queryCommandValue(_4db);
if(_4e2){
var _4e3=this._tagNamesForCommand(_4db);
_4dd=_4dc.getRangeAt(0);
var fs=_4dd.startContainer;
if(fs.nodeType===3){
var _4e4=_4dd.endOffset;
if(fs.length<_4e4){
ret=this._adjustNodeAndOffset(rs,_4e4);
fs=ret.node;
_4e4=ret.offset;
}
}
var _4e5;
while(fs&&fs!==this.editNode){
var _4e6=fs.tagName?fs.tagName.toLowerCase():"";
if(_452.indexOf(_4e3,_4e6)>-1){
_4e5=fs;
break;
}
fs=fs.parentNode;
}
if(_4e5){
rs=_4dd.startContainer;
var _4e7=doc.createElement(_4e5.tagName);
_458.place(_4e7,_4e5,"after");
if(rs&&rs.nodeType===3){
var _4e8,_4e9;
var _4ea=_4dd.endOffset;
if(rs.length<_4ea){
ret=this._adjustNodeAndOffset(rs,_4ea);
rs=ret.node;
_4ea=ret.offset;
}
txt=rs.nodeValue;
_4de=doc.createTextNode(txt.substring(0,_4ea));
var _4eb=txt.substring(_4ea,txt.length);
if(_4eb){
_4df=doc.createTextNode(_4eb);
}
_458.place(_4de,rs,"before");
if(_4df){
_4e0=doc.createElement("span");
_4e0.className="ieFormatBreakerSpan";
_458.place(_4e0,rs,"after");
_458.place(_4df,_4e0,"after");
_4df=_4e0;
}
_458.destroy(rs);
var _4ec=_4de.parentNode;
var _4ed=[];
var _4ee;
while(_4ec!==_4e5){
var tg=_4ec.tagName;
_4ee={tagName:tg};
_4ed.push(_4ee);
var _4ef=doc.createElement(tg);
if(_4ec.style){
if(_4ef.style){
if(_4ec.style.cssText){
_4ef.style.cssText=_4ec.style.cssText;
_4ee.cssText=_4ec.style.cssText;
}
}
}
if(_4ec.tagName==="FONT"){
if(_4ec.color){
_4ef.color=_4ec.color;
_4ee.color=_4ec.color;
}
if(_4ec.face){
_4ef.face=_4ec.face;
_4ee.face=_4ec.face;
}
if(_4ec.size){
_4ef.size=_4ec.size;
_4ee.size=_4ec.size;
}
}
if(_4ec.className){
_4ef.className=_4ec.className;
_4ee.className=_4ec.className;
}
if(_4df){
_4e8=_4df;
while(_4e8){
_4e9=_4e8.nextSibling;
_4ef.appendChild(_4e8);
_4e8=_4e9;
}
}
if(_4ef.tagName==_4ec.tagName){
_4e0=doc.createElement("span");
_4e0.className="ieFormatBreakerSpan";
_458.place(_4e0,_4ec,"after");
_458.place(_4ef,_4e0,"after");
}else{
_458.place(_4ef,_4ec,"after");
}
_4de=_4ec;
_4df=_4ef;
_4ec=_4ec.parentNode;
}
if(_4df){
_4e8=_4df;
if(_4e8.nodeType===1||(_4e8.nodeType===3&&_4e8.nodeValue)){
_4e7.innerHTML="";
}
while(_4e8){
_4e9=_4e8.nextSibling;
_4e7.appendChild(_4e8);
_4e8=_4e9;
}
}
var _4f0;
if(_4ed.length){
_4ee=_4ed.pop();
var _4f1=doc.createElement(_4ee.tagName);
if(_4ee.cssText&&_4f1.style){
_4f1.style.cssText=_4ee.cssText;
}
if(_4ee.className){
_4f1.className=_4ee.className;
}
if(_4ee.tagName==="FONT"){
if(_4ee.color){
_4f1.color=_4ee.color;
}
if(_4ee.face){
_4f1.face=_4ee.face;
}
if(_4ee.size){
_4f1.size=_4ee.size;
}
}
_458.place(_4f1,_4e7,"before");
while(_4ed.length){
_4ee=_4ed.pop();
var _4f2=doc.createElement(_4ee.tagName);
if(_4ee.cssText&&_4f2.style){
_4f2.style.cssText=_4ee.cssText;
}
if(_4ee.className){
_4f2.className=_4ee.className;
}
if(_4ee.tagName==="FONT"){
if(_4ee.color){
_4f2.color=_4ee.color;
}
if(_4ee.face){
_4f2.face=_4ee.face;
}
if(_4ee.size){
_4f2.size=_4ee.size;
}
}
_4f1.appendChild(_4f2);
_4f1=_4f2;
}
_4e1=doc.createTextNode(".");
_4e0.appendChild(_4e1);
_4f1.appendChild(_4e1);
_4f0=_465.create(this.window);
_4f0.setStart(_4e1,0);
_4f0.setEnd(_4e1,_4e1.length);
_4dc.removeAllRanges();
_4dc.addRange(_4f0);
this.selection.collapse(false);
_4e1.parentNode.innerHTML="";
}else{
_4e0=doc.createElement("span");
_4e0.className="ieFormatBreakerSpan";
_4e1=doc.createTextNode(".");
_4e0.appendChild(_4e1);
_458.place(_4e0,_4e7,"before");
_4f0=_465.create(this.window);
_4f0.setStart(_4e1,0);
_4f0.setEnd(_4e1,_4e1.length);
_4dc.removeAllRanges();
_4dc.addRange(_4f0);
this.selection.collapse(false);
_4e1.parentNode.innerHTML="";
}
if(!_4e7.firstChild){
_458.destroy(_4e7);
}
return true;
}
}
return false;
}else{
_4dd=_4dc.getRangeAt(0);
rs=_4dd.startContainer;
if(rs&&rs.nodeType===3){
var _4e4=_4dd.startOffset;
if(rs.length<_4e4){
ret=this._adjustNodeAndOffset(rs,_4e4);
rs=ret.node;
_4e4=ret.offset;
}
txt=rs.nodeValue;
_4de=doc.createTextNode(txt.substring(0,_4e4));
var _4eb=txt.substring(_4e4);
if(_4eb!==""){
_4df=doc.createTextNode(txt.substring(_4e4));
}
_4e0=doc.createElement("span");
_4e1=doc.createTextNode(".");
_4e0.appendChild(_4e1);
if(_4de.length){
_458.place(_4de,rs,"after");
}else{
_4de=rs;
}
_458.place(_4e0,_4de,"after");
if(_4df){
_458.place(_4df,_4e0,"after");
}
_458.destroy(rs);
var _4f0=_465.create(this.window);
_4f0.setStart(_4e1,0);
_4f0.setEnd(_4e1,_4e1.length);
_4dc.removeAllRanges();
_4dc.addRange(_4f0);
doc.execCommand(_4db);
_458.place(_4e0.firstChild,_4e0,"before");
_458.destroy(_4e0);
_4f0.setStart(_4e1,0);
_4f0.setEnd(_4e1,_4e1.length);
_4dc.removeAllRanges();
_4dc.addRange(_4f0);
this.selection.collapse(false);
_4e1.parentNode.innerHTML="";
return true;
}
}
}else{
return false;
}
},_adaptIEList:function(_4f3){
var _4f4=_465.getSelection(this.window);
if(_4f4.isCollapsed){
if(_4f4.rangeCount&&!this.queryCommandValue(_4f3)){
var _4f5=_4f4.getRangeAt(0);
var sc=_4f5.startContainer;
if(sc&&sc.nodeType==3){
if(!_4f5.startOffset){
var _4f6="ul";
if(_4f3==="insertorderedlist"){
_4f6="ol";
}
var list=this.document.createElement(_4f6);
var li=_458.create("li",null,list);
_458.place(list,sc,"before");
li.appendChild(sc);
_458.create("br",null,list,"after");
var _4f7=_465.create(this.window);
_4f7.setStart(sc,0);
_4f7.setEnd(sc,sc.length);
_4f4.removeAllRanges();
_4f4.addRange(_4f7);
this.selection.collapse(true);
return true;
}
}
}
}
return false;
},_handleTextColorOrProperties:function(_4f8,_4f9){
var _4fa=_465.getSelection(this.window);
var doc=this.document;
var rs,ret,_4fb,txt,_4fc,_4fd,_4fe,_4ff;
_4f9=_4f9||null;
if(_4f8&&_4fa&&_4fa.isCollapsed){
if(_4fa.rangeCount){
_4fb=_4fa.getRangeAt(0);
rs=_4fb.startContainer;
if(rs&&rs.nodeType===3){
var _500=_4fb.startOffset;
if(rs.length<_500){
ret=this._adjustNodeAndOffset(rs,_500);
rs=ret.node;
_500=ret.offset;
}
txt=rs.nodeValue;
_4fc=doc.createTextNode(txt.substring(0,_500));
var _501=txt.substring(_500);
if(_501!==""){
_4fd=doc.createTextNode(txt.substring(_500));
}
_4fe=doc.createElement("span");
_4ff=doc.createTextNode(".");
_4fe.appendChild(_4ff);
var _502=doc.createElement("span");
_4fe.appendChild(_502);
if(_4fc.length){
_458.place(_4fc,rs,"after");
}else{
_4fc=rs;
}
_458.place(_4fe,_4fc,"after");
if(_4fd){
_458.place(_4fd,_4fe,"after");
}
_458.destroy(rs);
var _503=_465.create(this.window);
_503.setStart(_4ff,0);
_503.setEnd(_4ff,_4ff.length);
_4fa.removeAllRanges();
_4fa.addRange(_503);
if(has("webkit")){
var _504="color";
if(_4f8==="hilitecolor"||_4f8==="backcolor"){
_504="backgroundColor";
}
_45a.set(_4fe,_504,_4f9);
this.selection.remove();
_458.destroy(_502);
_4fe.innerHTML="&#160;";
this.selection.selectElement(_4fe);
this.focus();
}else{
this.execCommand(_4f8,_4f9);
_458.place(_4fe.firstChild,_4fe,"before");
_458.destroy(_4fe);
_503.setStart(_4ff,0);
_503.setEnd(_4ff,_4ff.length);
_4fa.removeAllRanges();
_4fa.addRange(_503);
this.selection.collapse(false);
_4ff.parentNode.removeChild(_4ff);
}
return true;
}
}
}
return false;
},_adjustNodeAndOffset:function(node,_505){
while(node.length<_505&&node.nextSibling&&node.nextSibling.nodeType===3){
_505=_505-node.length;
node=node.nextSibling;
}
return {"node":node,"offset":_505};
},_tagNamesForCommand:function(_506){
if(_506==="bold"){
return ["b","strong"];
}else{
if(_506==="italic"){
return ["i","em"];
}else{
if(_506==="strikethrough"){
return ["s","strike"];
}else{
if(_506==="superscript"){
return ["sup"];
}else{
if(_506==="subscript"){
return ["sub"];
}else{
if(_506==="underline"){
return ["u"];
}
}
}
}
}
}
return [];
},_stripBreakerNodes:function(node){
if(!this.isLoaded){
return;
}
_45c(".ieFormatBreakerSpan",node).forEach(function(b){
while(b.firstChild){
_458.place(b.firstChild,b,"before");
}
_458.destroy(b);
});
return node;
},_stripTrailingEmptyNodes:function(node){
function _507(node){
return (/^(p|div|br)$/i.test(node.nodeName)&&node.children.length==0&&lang.trim(node.textContent||node.innerText||"")=="")||(node.nodeType===3&&lang.trim(node.nodeValue)=="");
};
while(node.lastChild&&_507(node.lastChild)){
_458.destroy(node.lastChild);
}
return node;
}});
return _469;
});
},"dojo/dnd/Moveable":function(){
define(["../_base/array","../_base/declare","../_base/lang","../dom","../dom-class","../Evented","../on","../topic","../touch","./common","./Mover","../_base/window"],function(_508,_509,lang,dom,_50a,_50b,on,_50c,_50d,dnd,_50e,win){
var _50f=_509("dojo.dnd.Moveable",[_50b],{handle:"",delay:0,skip:false,constructor:function(node,_510){
this.node=dom.byId(node);
if(!_510){
_510={};
}
this.handle=_510.handle?dom.byId(_510.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_510.delay>0?_510.delay:0;
this.skip=_510.skip;
this.mover=_510.mover?_510.mover:_50e;
this.events=[on(this.handle,_50d.press,lang.hitch(this,"onMouseDown")),on(this.handle,"dragstart",lang.hitch(this,"onSelectStart")),on(this.handle,"selectstart",lang.hitch(this,"onSelectStart"))];
},markupFactory:function(_511,node,Ctor){
return new Ctor(node,_511);
},destroy:function(){
_508.forEach(this.events,function(_512){
_512.remove();
});
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(on(this.handle,_50d.move,lang.hitch(this,"onMouseMove")),on(this.handle,_50d.release,lang.hitch(this,"onMouseUp")));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
e.stopPropagation();
e.preventDefault();
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
e.stopPropagation();
e.preventDefault();
},onMouseUp:function(e){
for(var i=0;i<2;++i){
this.events.pop().remove();
}
e.stopPropagation();
e.preventDefault();
},onSelectStart:function(e){
if(!this.skip||!dnd.isFormElement(e)){
e.stopPropagation();
e.preventDefault();
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_513){
_50c.publish("/dnd/move/start",_513);
_50a.add(win.body(),"dojoMove");
_50a.add(this.node,"dojoMoveItem");
},onMoveStop:function(_514){
_50c.publish("/dnd/move/stop",_514);
_50a.remove(win.body(),"dojoMove");
_50a.remove(this.node,"dojoMoveItem");
},onFirstMove:function(){
},onMove:function(_515,_516){
this.onMoving(_515,_516);
var s=_515.node.style;
s.left=_516.l+"px";
s.top=_516.t+"px";
this.onMoved(_515,_516);
},onMoving:function(){
},onMoved:function(){
}});
return _50f;
});
},"dijit/TooltipDialog":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","./focus","./layout/ContentPane","./_DialogMixin","./form/_FormMixin","./_TemplatedMixin","dojo/text!./templates/TooltipDialog.html","./main"],function(_517,_518,has,keys,lang,on,_519,_51a,_51b,_51c,_51d,_51e,_51f){
var _520=_517("dijit.TooltipDialog",[_51a,_51d,_51c,_51b],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:_51e,_setTitleAttr:"containerNode",postCreate:function(){
this.inherited(arguments);
this.own(on(this.containerNode,"keydown",lang.hitch(this,"_onKey")));
},orient:function(node,_521,_522){
var newC={"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft","BR-TL":"dijitTooltipBelow dijitTooltipABLeft","BL-TR":"dijitTooltipBelow dijitTooltipABRight","TL-BR":"dijitTooltipAbove dijitTooltipABRight","TR-BL":"dijitTooltipAbove dijitTooltipABLeft"}[_521+"-"+_522];
_518.replace(this.domNode,newC,this._currentOrientClass||"");
this._currentOrientClass=newC;
},focus:function(){
this._getFocusItems(this.containerNode);
_519.focus(this._firstFocusItem);
},onOpen:function(pos){
this.orient(this.domNode,pos.aroundCorner,pos.corner);
var _523=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_523.y+((_523.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_523.x+((_523.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
this._onShow();
},onClose:function(){
this.onHide();
},_onKey:function(evt){
if(evt.keyCode==keys.ESCAPE){
this.defer("onCancel");
evt.stopPropagation();
evt.preventDefault();
}else{
if(evt.keyCode==keys.TAB){
var node=evt.target;
this._getFocusItems(this.containerNode);
if(this._firstFocusItem==this._lastFocusItem){
evt.stopPropagation();
evt.preventDefault();
}else{
if(node==this._firstFocusItem&&evt.shiftKey){
_519.focus(this._lastFocusItem);
evt.stopPropagation();
evt.preventDefault();
}else{
if(node==this._lastFocusItem&&!evt.shiftKey){
_519.focus(this._firstFocusItem);
evt.stopPropagation();
evt.preventDefault();
}else{
evt.stopPropagation();
}
}
}
}
}
}});
if(has("dojo-bidi")){
_520.extend({_setTitleAttr:function(_524){
this.containerNode.title=(this.textDir&&this.enforceTextDirWithUcc)?this.enforceTextDirWithUcc(null,_524):_524;
this._set("title",_524);
},_setTextDirAttr:function(_525){
if(!this._created||this.textDir!=_525){
this._set("textDir",_525);
if(this.textDir&&this.title){
this.containerNode.title=this.enforceTextDirWithUcc(null,this.title);
}
}
}});
}
return _520;
});
},"dojo/store/util/SimpleQueryEngine":function(){
define(["../../_base/array"],function(_526){
return function(_527,_528){
switch(typeof _527){
default:
throw new Error("Can not query with a "+typeof _527);
case "object":
case "undefined":
var _529=_527;
_527=function(_52a){
for(var key in _529){
var _52b=_529[key];
if(_52b&&_52b.test){
if(!_52b.test(_52a[key],_52a)){
return false;
}
}else{
if(_52b!=_52a[key]){
return false;
}
}
}
return true;
};
break;
case "string":
if(!this[_527]){
throw new Error("No filter function "+_527+" was found in store");
}
_527=this[_527];
case "function":
}
function _52c(_52d){
var _52e=_526.filter(_52d,_527);
var _52f=_528&&_528.sort;
if(_52f){
_52e.sort(typeof _52f=="function"?_52f:function(a,b){
for(var sort,i=0;sort=_52f[i];i++){
var _530=a[sort.attribute];
var _531=b[sort.attribute];
_530=_530!=null?_530.valueOf():_530;
_531=_531!=null?_531.valueOf():_531;
if(_530!=_531){
return !!sort.descending==(_530==null||_530>_531)?-1:1;
}
}
return 0;
});
}
if(_528&&(_528.start||_528.count)){
var _532=_52e.length;
_52e=_52e.slice(_528.start||0,(_528.start||0)+(_528.count||Infinity));
_52e.total=_532;
}
return _52e;
};
_52c.matches=_527;
return _52c;
};
});
},"dijit/typematic":function(){
define(["dojo/_base/array","dojo/_base/connect","dojo/_base/lang","dojo/on","dojo/sniff","./main"],function(_533,_534,lang,on,has,_535){
var _536=(_535.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(lang.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_537,node,_538,obj,_539,_53a,_53b){
if(obj!=this._obj){
this.stop();
this._initialDelay=_53a||500;
this._subsequentDelay=_539||0.9;
this._minDelay=_53b||10;
this._obj=obj;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=lang.hitch(_537,_538);
this._evt={faux:true};
for(var attr in evt){
if(attr!="layerX"&&attr!="layerY"){
var v=evt[attr];
if(typeof v!="function"&&typeof v!="undefined"){
this._evt[attr]=v;
}
}
}
this._fireEventAndReload();
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_53c,_53d,_53e,_53f,_540,_541){
var type="keyCode" in _53c?"keydown":"charCode" in _53c?"keypress":_534._keypress,attr="keyCode" in _53c?"keyCode":"charCode" in _53c?"charCode":"charOrCode";
var _542=[on(node,type,lang.hitch(this,function(evt){
if(evt[attr]==_53c[attr]&&(_53c.ctrlKey===undefined||_53c.ctrlKey==evt.ctrlKey)&&(_53c.altKey===undefined||_53c.altKey==evt.altKey)&&(_53c.metaKey===undefined||_53c.metaKey==(evt.metaKey||false))&&(_53c.shiftKey===undefined||_53c.shiftKey==evt.shiftKey)){
evt.stopPropagation();
evt.preventDefault();
_536.trigger(evt,_53d,node,_53e,_53c,_53f,_540,_541);
}else{
if(_536._obj==_53c){
_536.stop();
}
}
})),on(node,"keyup",lang.hitch(this,function(){
if(_536._obj==_53c){
_536.stop();
}
}))];
return {remove:function(){
_533.forEach(_542,function(h){
h.remove();
});
}};
},addMouseListener:function(node,_543,_544,_545,_546,_547){
var _548=[on(node,"mousedown",lang.hitch(this,function(evt){
evt.preventDefault();
_536.trigger(evt,_543,node,_544,node,_545,_546,_547);
})),on(node,"mouseup",lang.hitch(this,function(evt){
if(this._obj){
evt.preventDefault();
}
_536.stop();
})),on(node,"mouseout",lang.hitch(this,function(evt){
if(this._obj){
evt.preventDefault();
}
_536.stop();
})),on(node,"dblclick",lang.hitch(this,function(evt){
evt.preventDefault();
if(has("ie")<9){
_536.trigger(evt,_543,node,_544,node,_545,_546,_547);
setTimeout(lang.hitch(this,_536.stop),50);
}
}))];
return {remove:function(){
_533.forEach(_548,function(h){
h.remove();
});
}};
},addListener:function(_549,_54a,_54b,_54c,_54d,_54e,_54f,_550){
var _551=[this.addKeyListener(_54a,_54b,_54c,_54d,_54e,_54f,_550),this.addMouseListener(_549,_54c,_54d,_54e,_54f,_550)];
return {remove:function(){
_533.forEach(_551,function(h){
h.remove();
});
}};
}});
return _536;
});
},"dijit/MenuItem":function(){
define(["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/kernel","dojo/sniff","dojo/_base/lang","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(_552,dom,_553,_554,_555,has,lang,_556,_557,_558,_559,_55a){
var _55b=_552("dijit.MenuItem"+(has("dojo-bidi")?"_NoBidi":""),[_556,_557,_558,_559],{templateString:_55a,baseClass:"dijitMenuItem",label:"",_setLabelAttr:function(val){
this._set("label",val);
var _55c="";
var text;
var ndx=val.search(/{\S}/);
if(ndx>=0){
_55c=val.charAt(ndx+1);
var _55d=val.substr(0,ndx);
var _55e=val.substr(ndx+3);
text=_55d+_55c+_55e;
val=_55d+"<span class=\"dijitMenuItemShortcutKey\">"+_55c+"</span>"+_55e;
}else{
text=val;
}
this.domNode.setAttribute("aria-label",text+" "+this.accelKey);
this.containerNode.innerHTML=val;
this._set("shortcutKey",_55c);
},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},accelKey:"",disabled:false,_fillContent:function(_55f){
if(_55f&&!("label" in this.params)){
this._set("label",_55f.innerHTML);
}
},buildRendering:function(){
this.inherited(arguments);
var _560=this.id+"_text";
_553.set(this.containerNode,"id",_560);
if(this.accelKeyNode){
_553.set(this.accelKeyNode,"id",this.id+"_accel");
}
dom.setSelectable(this.domNode,false);
},onClick:function(){
},focus:function(){
try{
if(has("ie")==8){
this.containerNode.focus();
}
this.focusNode.focus();
}
catch(e){
}
},_onFocus:function(){
this.getParent()._onItemFocus(this);
this.inherited(arguments);
},_setSelected:function(_561){
_554.toggle(this.domNode,"dijitMenuItemSelected",_561);
},setLabel:function(_562){
_555.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_562);
},setDisabled:function(_563){
_555.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");
this.set("disabled",_563);
},_setDisabledAttr:function(_564){
this.focusNode.setAttribute("aria-disabled",_564?"true":"false");
this._set("disabled",_564);
},_setAccelKeyAttr:function(_565){
if(this.accelKeyNode){
this.accelKeyNode.style.display=_565?"":"none";
this.accelKeyNode.innerHTML=_565;
_553.set(this.containerNode,"colSpan",_565?"1":"2");
}
this._set("accelKey",_565);
}});
if(has("dojo-bidi")){
_55b=_552("dijit.MenuItem",_55b,{_setLabelAttr:function(val){
this.inherited(arguments);
if(this.textDir==="auto"){
this.applyTextDir(this.textDirNode);
}
}});
}
return _55b;
});
},"dijit/MenuBarItem":function(){
define(["dojo/_base/declare","./MenuItem","dojo/text!./templates/MenuBarItem.html"],function(_566,_567,_568){
var _569=_566("dijit._MenuBarItemMixin",null,{templateString:_568,_setIconClassAttr:null});
var _56a=_566("dijit.MenuBarItem",[_567,_569],{});
_56a._MenuBarItemMixin=_569;
return _56a;
});
},"dijit/MenuBar":function(){
define(["dojo/_base/declare","dojo/keys","./_MenuBase","dojo/text!./templates/MenuBar.html"],function(_56b,keys,_56c,_56d){
return _56b("dijit.MenuBar",_56c,{templateString:_56d,baseClass:"dijitMenuBar",popupDelay:0,_isMenuBar:true,_orient:["below"],_moveToPopup:function(evt){
if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled){
this.onItemClick(this.focusedChild,evt);
}
},focusChild:function(item){
this.inherited(arguments);
if(this.activated&&item.popup&&!item.disabled){
this._openItemPopup(item,true);
}
},_onChildDeselect:function(item){
if(this.currentPopupItem==item){
this.currentPopupItem=null;
item._closePopup();
}
this.inherited(arguments);
},_onLeftArrow:function(){
this.focusPrev();
},_onRightArrow:function(){
this.focusNext();
},_onDownArrow:function(evt){
this._moveToPopup(evt);
},_onUpArrow:function(){
},onItemClick:function(item,evt){
if(item.popup&&item.popup.isShowingNow&&(!/^key/.test(evt.type)||evt.keyCode!==keys.DOWN_ARROW)){
item.focusNode.focus();
this._cleanUp(true);
}else{
this.inherited(arguments);
}
}});
});
},"dijit/ToolbarSeparator":function(){
define(["dojo/_base/declare","dojo/dom","./_Widget","./_TemplatedMixin"],function(_56e,dom,_56f,_570){
return _56e("dijit.ToolbarSeparator",[_56f,_570],{templateString:"<div class=\"dijitToolbarSeparator dijitInline\" role=\"presentation\"></div>",buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/layout/_LayoutWidget":function(){
define(["dojo/_base/lang","../_Widget","../_Container","../_Contained","../Viewport","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style"],function(lang,_571,_572,_573,_574,_575,_576,_577,_578){
return _575("dijit.layout._LayoutWidget",[_571,_572,_573],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
_576.add(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _579=this.getParent&&this.getParent();
if(!(_579&&_579.isLayoutContainer)){
this.resize();
this.own(_574.on("resize",lang.hitch(this,"resize")));
}
},resize:function(_57a,_57b){
var node=this.domNode;
if(_57a){
_577.setMarginBox(node,_57a);
}
var mb=_57b||{};
lang.mixin(mb,_57a||{});
if(!("h" in mb)||!("w" in mb)){
mb=lang.mixin(_577.getMarginBox(node),mb);
}
var cs=_578.getComputedStyle(node);
var me=_577.getMarginExtents(node,cs);
var be=_577.getBorderExtents(node,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=_577.getPadExtents(node,cs);
this._contentBox={l:_578.toPixelValue(node,cs.paddingLeft),t:_578.toPixelValue(node,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_57c){
var cls=this.baseClass+"-child "+(_57c.baseClass?this.baseClass+"-"+_57c.baseClass:"");
_576.add(_57c.domNode,cls);
},addChild:function(_57d,_57e){
this.inherited(arguments);
if(this._started){
this._setupChild(_57d);
}
},removeChild:function(_57f){
var cls=this.baseClass+"-child"+(_57f.baseClass?" "+this.baseClass+"-"+_57f.baseClass:"");
_576.remove(_57f.domNode,cls);
this.inherited(arguments);
}});
});
},"dijit/popup":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/keys","dojo/_base/lang","dojo/on","./place","./BackgroundIframe","./Viewport","./main"],function(_580,_581,_582,dom,_583,_584,_585,_586,has,keys,lang,on,_587,_588,_589,_58a){
function _58b(){
if(this._popupWrapper){
_584.destroy(this._popupWrapper);
delete this._popupWrapper;
}
};
var _58c=_582(null,{_stack:[],_beginZIndex:1000,_idGen:1,_repositionAll:function(){
if(this._firstAroundNode){
var _58d=this._firstAroundPosition,_58e=_585.position(this._firstAroundNode,true),dx=_58e.x-_58d.x,dy=_58e.y-_58d.y;
if(dx||dy){
this._firstAroundPosition=_58e;
for(var i=0;i<this._stack.length;i++){
var _58f=this._stack[i].wrapper.style;
_58f.top=(parseInt(_58f.top,10)+dy)+"px";
if(_58f.right=="auto"){
_58f.left=(parseInt(_58f.left,10)+dx)+"px";
}else{
_58f.right=(parseInt(_58f.right,10)-dx)+"px";
}
}
}
this._aroundMoveListener=setTimeout(lang.hitch(this,"_repositionAll"),dx||dy?10:50);
}
},_createWrapper:function(_590){
var _591=_590._popupWrapper,node=_590.domNode;
if(!_591){
_591=_584.create("div",{"class":"dijitPopup",style:{display:"none"},role:"region","aria-label":_590["aria-label"]||_590.label||_590.name||_590.id},_590.ownerDocumentBody);
_591.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_590._popupWrapper=_591;
_581.after(_590,"destroy",_58b,true);
}
return _591;
},moveOffScreen:function(_592){
var _593=this._createWrapper(_592);
var ltr=_585.isBodyLtr(_592.ownerDocument),_594={visibility:"hidden",top:"-9999px",display:""};
_594[ltr?"left":"right"]="-9999px";
_594[ltr?"right":"left"]="auto";
_586.set(_593,_594);
return _593;
},hide:function(_595){
var _596=this._createWrapper(_595);
_586.set(_596,{display:"none",height:"auto",overflow:"visible",border:""});
var node=_595.domNode;
if("_originalStyle" in node){
node.style.cssText=node._originalStyle;
}
},getTopPopup:function(){
var _597=this._stack;
for(var pi=_597.length-1;pi>0&&_597[pi].parent===_597[pi-1].widget;pi--){
}
return _597[pi];
},open:function(args){
var _598=this._stack,_599=args.popup,node=_599.domNode,_59a=args.orient||["below","below-alt","above","above-alt"],ltr=args.parent?args.parent.isLeftToRight():_585.isBodyLtr(_599.ownerDocument),_59b=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_598.length&&(!args.parent||!dom.isDescendant(args.parent.domNode,_598[_598.length-1].widget.domNode))){
this.close(_598[_598.length-1].widget);
}
var _59c=this.moveOffScreen(_599);
if(_599.startup&&!_599._started){
_599.startup();
}
var _59d,_59e=_585.position(node);
if("maxHeight" in args&&args.maxHeight!=-1){
_59d=args.maxHeight||Infinity;
}else{
var _59f=_589.getEffectiveBox(this.ownerDocument),_5a0=_59b?_585.position(_59b,false):{y:args.y-(args.padding||0),h:(args.padding||0)*2};
_59d=Math.floor(Math.max(_5a0.y,_59f.h-(_5a0.y+_5a0.h)));
}
if(_59e.h>_59d){
var cs=_586.getComputedStyle(node),_5a1=cs.borderLeftWidth+" "+cs.borderLeftStyle+" "+cs.borderLeftColor;
_586.set(_59c,{overflowY:"scroll",height:_59d+"px",border:_5a1});
node._originalStyle=node.style.cssText;
node.style.border="none";
}
_583.set(_59c,{id:id,style:{zIndex:this._beginZIndex+_598.length},"class":"dijitPopup "+(_599.baseClass||_599["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(_598.length==0&&_59b){
this._firstAroundNode=_59b;
this._firstAroundPosition=_585.position(_59b,true);
this._aroundMoveListener=setTimeout(lang.hitch(this,"_repositionAll"),50);
}
if(has("config-bgIframe")&&!_599.bgIframe){
_599.bgIframe=new _588(_59c);
}
var _5a2=_599.orient?lang.hitch(_599,"orient"):null,best=_59b?_587.around(_59c,_59b,_59a,ltr,_5a2):_587.at(_59c,args,_59a=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding,_5a2);
_59c.style.visibility="visible";
node.style.visibility="visible";
var _5a3=[];
_5a3.push(on(_59c,"keydown",lang.hitch(this,function(evt){
if(evt.keyCode==keys.ESCAPE&&args.onCancel){
evt.stopPropagation();
evt.preventDefault();
args.onCancel();
}else{
if(evt.keyCode==keys.TAB){
evt.stopPropagation();
evt.preventDefault();
var _5a4=this.getTopPopup();
if(_5a4&&_5a4.onCancel){
_5a4.onCancel();
}
}
}
})));
if(_599.onCancel&&args.onCancel){
_5a3.push(_599.on("cancel",args.onCancel));
}
_5a3.push(_599.on(_599.onExecute?"execute":"change",lang.hitch(this,function(){
var _5a5=this.getTopPopup();
if(_5a5&&_5a5.onExecute){
_5a5.onExecute();
}
})));
_598.push({widget:_599,wrapper:_59c,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_5a3});
if(_599.onOpen){
_599.onOpen(best);
}
return best;
},close:function(_5a6){
var _5a7=this._stack;
while((_5a6&&_580.some(_5a7,function(elem){
return elem.widget==_5a6;
}))||(!_5a6&&_5a7.length)){
var top=_5a7.pop(),_5a8=top.widget,_5a9=top.onClose;
if(_5a8.onClose){
_5a8.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_5a8&&_5a8.domNode){
this.hide(_5a8);
}
if(_5a9){
_5a9();
}
}
if(_5a7.length==0&&this._aroundMoveListener){
clearTimeout(this._aroundMoveListener);
this._firstAroundNode=this._firstAroundPosition=this._aroundMoveListener=null;
}
}});
return (_58a.popup=new _58c());
});
},"dijit/_base/manager":function(){
define(["dojo/_base/array","dojo/_base/config","dojo/_base/lang","../registry","../main"],function(_5aa,_5ab,lang,_5ac,_5ad){
var _5ae={};
_5aa.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){
_5ae[name]=_5ac[name];
});
lang.mixin(_5ae,{defaultDuration:_5ab["defaultDuration"]||200});
lang.mixin(_5ad,_5ae);
return _5ad;
});
},"dojo/dnd/Mover":function(){
define(["../_base/array","../_base/declare","../_base/lang","../sniff","../_base/window","../dom","../dom-geometry","../dom-style","../Evented","../on","../touch","./common","./autoscroll"],function(_5af,_5b0,lang,has,win,dom,_5b1,_5b2,_5b3,on,_5b4,dnd,_5b5){
return _5b0("dojo.dnd.Mover",[_5b3],{constructor:function(node,e,host){
this.node=dom.byId(node);
this.marginBox={l:e.pageX,t:e.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
function _5b6(e){
e.preventDefault();
e.stopPropagation();
};
this.events=[on(d,_5b4.move,lang.hitch(this,"onFirstMove")),on(d,_5b4.move,lang.hitch(this,"onMouseMove")),on(d,_5b4.release,lang.hitch(this,"onMouseUp")),on(d,"dragstart",_5b6),on(d.body,"selectstart",_5b6)];
_5b5.autoScrollStart(d);
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
_5b5.autoScroll(e);
var m=this.marginBox;
this.host.onMove(this,{l:m.l+e.pageX,t:m.t+e.pageY},e);
e.preventDefault();
e.stopPropagation();
},onMouseUp:function(e){
if(has("webkit")&&has("mac")&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
e.preventDefault();
e.stopPropagation();
},onFirstMove:function(e){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left))||0;
t=Math.round(parseFloat(s.top))||0;
break;
default:
s.position="absolute";
var m=_5b1.getMarginBox(this.node);
var b=win.doc.body;
var bs=_5b2.getComputedStyle(b);
var bm=_5b1.getMarginBox(b,bs);
var bc=_5b1.getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this,e);
}
this.events.shift().remove();
},destroy:function(){
_5af.forEach(this.events,function(_5b7){
_5b7.remove();
});
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
});
},"dojo/request/default":function(){
define(["exports","require","../has"],function(_5b8,_5b9,has){
var _5ba=has("config-requestProvider"),_5bb;
if(1){
_5bb="./xhr";
}else{
if(0){
_5bb="./node";
}
}
if(!_5ba){
_5ba=_5bb;
}
_5b8.getPlatformDefaultId=function(){
return _5bb;
};
_5b8.load=function(id,_5bc,_5bd,_5be){
_5b9([id=="platform"?_5bb:_5ba],function(_5bf){
_5bd(_5bf);
});
};
});
},"dijit/BackgroundIframe":function(){
define(["require","./main","dojo/_base/config","dojo/dom-construct","dojo/dom-style","dojo/_base/lang","dojo/on","dojo/sniff"],function(_5c0,_5c1,_5c2,_5c3,_5c4,lang,on,has){
has.add("config-bgIframe",!has("touch"));
var _5c5=new function(){
var _5c6=[];
this.pop=function(){
var _5c7;
if(_5c6.length){
_5c7=_5c6.pop();
_5c7.style.display="";
}else{
if(has("ie")<9){
var burl=_5c2["dojoBlankHtmlUrl"]||_5c0.toUrl("dojo/resources/blank.html")||"javascript:\"\"";
var html="<iframe src='"+burl+"' role='presentation'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_5c7=document.createElement(html);
}else{
_5c7=_5c3.create("iframe");
_5c7.src="javascript:\"\"";
_5c7.className="dijitBackgroundIframe";
_5c7.setAttribute("role","presentation");
_5c4.set(_5c7,"opacity",0.1);
}
_5c7.tabIndex=-1;
}
return _5c7;
};
this.push=function(_5c8){
_5c8.style.display="none";
_5c6.push(_5c8);
};
}();
_5c1.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(has("config-bgIframe")){
var _5c9=(this.iframe=_5c5.pop());
node.appendChild(_5c9);
if(has("ie")<7||has("quirks")){
this.resize(node);
this._conn=on(node,"resize",lang.hitch(this,"resize",node));
}else{
_5c4.set(_5c9,{width:"100%",height:"100%"});
}
}
};
lang.extend(_5c1.BackgroundIframe,{resize:function(node){
if(this.iframe){
_5c4.set(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
this._conn.remove();
this._conn=null;
}
if(this.iframe){
_5c5.push(this.iframe);
delete this.iframe;
}
}});
return _5c1.BackgroundIframe;
});
},"dijit/form/Button":function(){
define(["require","dojo/_base/declare","dojo/dom-class","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/ready","./_FormWidget","./_ButtonMixin","dojo/text!./templates/Button.html"],function(_5ca,_5cb,_5cc,has,_5cd,lang,_5ce,_5cf,_5d0,_5d1){
if(has("dijit-legacy-requires")){
_5ce(0,function(){
var _5d2=["dijit/form/DropDownButton","dijit/form/ComboButton","dijit/form/ToggleButton"];
_5ca(_5d2);
});
}
var _5d3=_5cb("dijit.form.Button"+(has("dojo-bidi")?"_NoBidi":""),[_5cf,_5d0],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:_5d1,_setValueAttr:"valueNode",_setNameAttr:function(name){
if(this.valueNode){
this.valueNode.setAttribute("name",name);
}
},_fillContent:function(_5d4){
if(_5d4&&(!this.params||!("label" in this.params))){
var _5d5=lang.trim(_5d4.innerHTML);
if(_5d5){
this.label=_5d5;
}
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
_5cc.toggle(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},setLabel:function(_5d6){
_5cd.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_5d6);
},_setLabelAttr:function(_5d7){
this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){
this.titleNode.title=lang.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
}});
if(has("dojo-bidi")){
_5d3=_5cb("dijit.form.Button",_5d3,{_setLabelAttr:function(_5d8){
this.inherited(arguments);
if(this.titleNode.title){
this.applyTextDir(this.titleNode,this.titleNode.title);
}
},_setTextDirAttr:function(_5d9){
if(this._created&&this.textDir!=_5d9){
this._set("textDir",_5d9);
this._setLabelAttr(this.label);
}
}});
}
return _5d3;
});
},"dijit/_WidgetBase":function(){
define(["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./Destroyable","dojo/has!dojo-bidi?./_BidiMixin","./registry"],function(_5da,_5db,_5dc,_5dd,_5de,_5df,dom,_5e0,_5e1,_5e2,_5e3,_5e4,has,_5e5,lang,on,_5e6,_5e7,_5e8,win,_5e9,_5ea,_5eb){
has.add("dijit-legacy-requires",!_5e5.isAsync);
has.add("dojo-bidi",false);
if(has("dijit-legacy-requires")){
_5e6(0,function(){
var _5ec=["dijit/_base/manager"];
_5da(_5ec);
});
}
var _5ed={};
function _5ee(obj){
var ret={};
for(var attr in obj){
ret[attr.toLowerCase()]=true;
}
return ret;
};
function _5ef(attr){
return function(val){
_5e0[val?"set":"remove"](this.domNode,attr,val);
this._set(attr,val);
};
};
function _5f0(a,b){
return a===b||(a!==a&&b!==b);
};
var _5f1=_5df("dijit._WidgetBase",[_5e7,_5e9],{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:_5ef("lang"),dir:"",_setDirAttr:_5ef("dir"),"class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,ownerDocument:null,_setOwnerDocumentAttr:function(val){
this._set("ownerDocument",val);
},attributeMap:{},_blankGif:_5dd.blankGif||_5da.toUrl("dojo/resources/blank.gif"),_introspect:function(){
var ctor=this.constructor;
if(!ctor._setterAttrs){
var _5f2=ctor.prototype,_5f3=ctor._setterAttrs=[],_5f4=(ctor._onMap={});
for(var name in _5f2.attributeMap){
_5f3.push(name);
}
for(name in _5f2){
if(/^on/.test(name)){
_5f4[name.substring(2).toLowerCase()]=name;
}
if(/^_set[A-Z](.*)Attr$/.test(name)){
name=name.charAt(4).toLowerCase()+name.substr(5,name.length-9);
if(!_5f2.attributeMap||!(name in _5f2.attributeMap)){
_5f3.push(name);
}
}
}
}
},postscript:function(_5f5,_5f6){
this.create(_5f5,_5f6);
},create:function(_5f7,_5f8){
this._introspect();
this.srcNodeRef=dom.byId(_5f8);
this._connects=[];
this._supportingWidgets=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_5f7){
this.params=_5f7;
lang.mixin(this,_5f7);
}
this.postMixInProperties();
if(!this.id){
this.id=_5eb.getUniqueId(this.declaredClass.replace(/\./g,"_"));
if(this.params){
delete this.params.id;
}
}
this.ownerDocument=this.ownerDocument||(this.srcNodeRef?this.srcNodeRef.ownerDocument:document);
this.ownerDocumentBody=win.body(this.ownerDocument);
_5eb.add(this);
this.buildRendering();
var _5f9;
if(this.domNode){
this._applyAttributes();
var _5fa=this.srcNodeRef;
if(_5fa&&_5fa.parentNode&&this.domNode!==_5fa){
_5fa.parentNode.replaceChild(this.domNode,_5fa);
_5f9=true;
}
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(_5f9){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var _5fb={};
for(var key in this.params||{}){
_5fb[key]=this._get(key);
}
_5db.forEach(this.constructor._setterAttrs,function(key){
if(!(key in _5fb)){
var val=this._get(key);
if(val){
this.set(key,val);
}
}
},this);
for(key in _5fb){
this.set(key,_5fb[key]);
}
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||this.ownerDocument.createElement("div");
}
if(this.baseClass){
var _5fc=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_5fc=_5fc.concat(_5db.map(_5fc,function(name){
return name+"Rtl";
}));
}
_5e1.add(this.domNode,_5fc);
}
},postCreate:function(){
},startup:function(){
if(this._started){
return;
}
this._started=true;
_5db.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
},destroyRecursive:function(_5fd){
this._beingDestroyed=true;
this.destroyDescendants(_5fd);
this.destroy(_5fd);
},destroy:function(_5fe){
this._beingDestroyed=true;
this.uninitialize();
function _5ff(w){
if(w.destroyRecursive){
w.destroyRecursive(_5fe);
}else{
if(w.destroy){
w.destroy(_5fe);
}
}
};
_5db.forEach(this._connects,lang.hitch(this,"disconnect"));
_5db.forEach(this._supportingWidgets,_5ff);
if(this.domNode){
_5db.forEach(_5eb.findWidgets(this.domNode,this.containerNode),_5ff);
}
this.destroyRendering(_5fe);
_5eb.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_600){
if(this.bgIframe){
this.bgIframe.destroy(_600);
delete this.bgIframe;
}
if(this.domNode){
if(_600){
_5e0.remove(this.domNode,"widgetId");
}else{
_5e2.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_600){
_5e2.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_601){
_5db.forEach(this.getChildren(),function(_602){
if(_602.destroyRecursive){
_602.destroyRecursive(_601);
}
});
},uninitialize:function(){
return false;
},_setStyleAttr:function(_603){
var _604=this.domNode;
if(lang.isObject(_603)){
_5e4.set(_604,_603);
}else{
if(_604.style.cssText){
_604.style.cssText+="; "+_603;
}else{
_604.style.cssText=_603;
}
}
this._set("style",_603);
},_attrToDom:function(attr,_605,_606){
_606=arguments.length>=3?_606:this.attributeMap[attr];
_5db.forEach(lang.isArray(_606)?_606:[_606],function(_607){
var _608=this[_607.node||_607||"domNode"];
var type=_607.type||"attribute";
switch(type){
case "attribute":
if(lang.isFunction(_605)){
_605=lang.hitch(this,_605);
}
var _609=_607.attribute?_607.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
if(_608.tagName){
_5e0.set(_608,_609,_605);
}else{
_608.set(_609,_605);
}
break;
case "innerText":
_608.innerHTML="";
_608.appendChild(this.ownerDocument.createTextNode(_605));
break;
case "innerHTML":
_608.innerHTML=_605;
break;
case "class":
_5e1.replace(_608,_605,this[attr]);
break;
}
},this);
},get:function(name){
var _60a=this._getAttrNames(name);
return this[_60a.g]?this[_60a.g]():this._get(name);
},set:function(name,_60b){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _60c=this._getAttrNames(name),_60d=this[_60c.s];
if(lang.isFunction(_60d)){
var _60e=_60d.apply(this,Array.prototype.slice.call(arguments,1));
}else{
var _60f=this.focusNode&&!lang.isFunction(this.focusNode)?"focusNode":"domNode",tag=this[_60f]&&this[_60f].tagName,_610=tag&&(_5ed[tag]||(_5ed[tag]=_5ee(this[_60f]))),map=name in this.attributeMap?this.attributeMap[name]:_60c.s in this?this[_60c.s]:((_610&&_60c.l in _610&&typeof _60b!="function")||/^aria-|^data-|^role$/.test(name))?_60f:null;
if(map!=null){
this._attrToDom(name,_60b,map);
}
this._set(name,_60b);
}
return _60e||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.replace(/^[a-z]|-[a-zA-Z]/g,function(c){
return c.charAt(c.length-1).toUpperCase();
});
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr",l:uc.toLowerCase()});
},_set:function(name,_611){
var _612=this[name];
this[name]=_611;
if(this._created&&!_5f0(_612,_611)){
if(this._watchCallbacks){
this._watchCallbacks(name,_612,_611);
}
this.emit("attrmodified-"+name,{detail:{prevValue:_612,newValue:_611}});
}
},_get:function(name){
return this[name];
},emit:function(type,_613,_614){
_613=_613||{};
if(_613.bubbles===undefined){
_613.bubbles=true;
}
if(_613.cancelable===undefined){
_613.cancelable=true;
}
if(!_613.detail){
_613.detail={};
}
_613.detail.widget=this;
var ret,_615=this["on"+type];
if(_615){
ret=_615.apply(this,_614?_614:[_613]);
}
if(this._started&&!this._beingDestroyed){
on.emit(this.domNode,type.toLowerCase(),_613);
}
return ret;
},on:function(type,func){
var _616=this._onMap(type);
if(_616){
return _5dc.after(this,_616,func,true);
}
return this.own(on(this.domNode,type,func))[0];
},_onMap:function(type){
var ctor=this.constructor,map=ctor._onMap;
if(!map){
map=(ctor._onMap={});
for(var attr in ctor.prototype){
if(/^on/.test(attr)){
map[attr.replace(/^on/,"").toLowerCase()]=attr;
}
}
}
return map[typeof type=="string"&&type.toLowerCase()];
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getChildren:function(){
return this.containerNode?_5eb.findWidgets(this.containerNode):[];
},getParent:function(){
return _5eb.getEnclosingWidget(this.domNode.parentNode);
},connect:function(obj,_617,_618){
return this.own(_5de.connect(obj,_617,this,_618))[0];
},disconnect:function(_619){
_619.remove();
},subscribe:function(t,_61a){
return this.own(_5e8.subscribe(t,lang.hitch(this,_61a)))[0];
},unsubscribe:function(_61b){
_61b.remove();
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):_5e3.isBodyLtr(this.ownerDocument);
},isFocusable:function(){
return this.focus&&(_5e4.get(this.domNode,"display")!="none");
},placeAt:function(_61c,_61d){
var _61e=!_61c.tagName&&_5eb.byId(_61c);
if(_61e&&_61e.addChild&&(!_61d||typeof _61d==="number")){
_61e.addChild(this,_61d);
}else{
var ref=_61e?(_61e.containerNode&&!/after|before|replace/.test(_61d||"")?_61e.containerNode:_61e.domNode):dom.byId(_61c,this.ownerDocument);
_5e2.place(this.domNode,ref,_61d);
if(!this._started&&(this.getParent()||{})._started){
this.startup();
}
}
return this;
},defer:function(fcn,_61f){
var _620=setTimeout(lang.hitch(this,function(){
if(!_620){
return;
}
_620=null;
if(!this._destroyed){
lang.hitch(this,fcn)();
}
}),_61f||0);
return {remove:function(){
if(_620){
clearTimeout(_620);
_620=null;
}
return null;
}};
}});
if(has("dojo-bidi")){
_5f1.extend(_5ea);
}
return _5f1;
});
},"dojo/store/Memory":function(){
define(["../_base/declare","./util/QueryResults","./util/SimpleQueryEngine"],function(_621,_622,_623){
var base=null;
return _621("dojo.store.Memory",base,{constructor:function(_624){
for(var i in _624){
this[i]=_624[i];
}
this.setData(this.data||[]);
},data:null,idProperty:"id",index:null,queryEngine:_623,get:function(id){
return this.data[this.index[id]];
},getIdentity:function(_625){
return _625[this.idProperty];
},put:function(_626,_627){
var data=this.data,_628=this.index,_629=this.idProperty;
var id=_626[_629]=(_627&&"id" in _627)?_627.id:_629 in _626?_626[_629]:Math.random();
if(id in _628){
if(_627&&_627.overwrite===false){
throw new Error("Object already exists");
}
data[_628[id]]=_626;
}else{
_628[id]=data.push(_626)-1;
}
return id;
},add:function(_62a,_62b){
(_62b=_62b||{}).overwrite=false;
return this.put(_62a,_62b);
},remove:function(id){
var _62c=this.index;
var data=this.data;
if(id in _62c){
data.splice(_62c[id],1);
this.setData(data);
return true;
}
},query:function(_62d,_62e){
return _622(this.queryEngine(_62d,_62e)(this.data));
},setData:function(data){
if(data.items){
this.idProperty=data.identifier;
data=this.data=data.items;
}else{
this.data=data;
}
this.index={};
for(var i=0,l=data.length;i<l;i++){
this.index[data[i][this.idProperty]]=i;
}
}});
});
},"dijit/_base/sniff":function(){
define(["dojo/uacss"],function(){
});
},"dijit/Editor":function(){
define(["require","dojo/_base/array","dojo/_base/declare","dojo/Deferred","dojo/i18n","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/string","dojo/topic","./_Container","./Toolbar","./ToolbarSeparator","./layout/_LayoutWidget","./form/ToggleButton","./_editor/_Plugin","./_editor/plugins/EnterKeyHandling","./_editor/html","./_editor/range","./_editor/RichText","./main","dojo/i18n!./_editor/nls/commands"],function(_62f,_630,_631,_632,i18n,_633,_634,_635,_636,keys,lang,has,_637,_638,_639,_63a,_63b,_63c,_63d,_63e,_63f,html,_640,_641,_642){
var _643=_631("dijit.Editor",_641,{plugins:null,extraPlugins:null,constructor:function(){
if(!lang.isArray(this.plugins)){
this.plugins=["undo","redo","|","cut","copy","paste","|","bold","italic","underline","strikethrough","|","insertOrderedList","insertUnorderedList","indent","outdent","|","justifyLeft","justifyRight","justifyCenter","justifyFull",_63f];
}
this._plugins=[];
this._editInterval=this.editActionInterval*1000;
if(has("ie")||has("trident")){
this.events.push("onBeforeDeactivate");
this.events.push("onBeforeActivate");
}
},postMixInProperties:function(){
this.setValueDeferred=new _632();
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
this._steps=this._steps.slice(0);
this._undoedSteps=this._undoedSteps.slice(0);
if(lang.isArray(this.extraPlugins)){
this.plugins=this.plugins.concat(this.extraPlugins);
}
this.commands=i18n.getLocalization("dijit._editor","commands",this.lang);
if(has("webkit")){
_636.set(this.domNode,"KhtmlUserSelect","none");
}
},startup:function(){
this.inherited(arguments);
if(!this.toolbar){
this.toolbar=new _63a({ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,"aria-label":this.id});
this.header.appendChild(this.toolbar.domNode);
}
_630.forEach(this.plugins,this.addPlugin,this);
this.setValueDeferred.resolve(true);
_634.add(this.iframe.parentNode,"dijitEditorIFrameContainer");
_634.add(this.iframe,"dijitEditorIFrame");
_633.set(this.iframe,"allowTransparency",true);
this.toolbar.startup();
this.onNormalizedDisplayChanged();
},destroy:function(){
_630.forEach(this._plugins,function(p){
if(p&&p.destroy){
p.destroy();
}
});
this._plugins=[];
this.toolbar.destroyRecursive();
delete this.toolbar;
this.inherited(arguments);
},addPlugin:function(_644,_645){
var args=lang.isString(_644)?{name:_644}:lang.isFunction(_644)?{ctor:_644}:_644;
if(!args.setEditor){
var o={"args":args,"plugin":null,"editor":this};
if(args.name){
if(_63e.registry[args.name]){
o.plugin=_63e.registry[args.name](args);
}else{
_638.publish(_642._scopeName+".Editor.getPlugin",o);
}
}
if(!o.plugin){
try{
var pc=args.ctor||lang.getObject(args.name)||_62f(args.name);
if(pc){
o.plugin=new pc(args);
}
}
catch(e){
throw new Error(this.id+": cannot find plugin ["+args.name+"]");
}
}
if(!o.plugin){
throw new Error(this.id+": cannot find plugin ["+args.name+"]");
}
_644=o.plugin;
}
if(arguments.length>1){
this._plugins[_645]=_644;
}else{
this._plugins.push(_644);
}
_644.setEditor(this);
if(lang.isFunction(_644.setToolbar)){
_644.setToolbar(this.toolbar);
}
},resize:function(size){
if(size){
_63c.prototype.resize.apply(this,arguments);
}
},layout:function(){
var _646=(this._contentBox.h-(this.getHeaderHeight()+this.getFooterHeight()+_635.getPadBorderExtents(this.iframe.parentNode).h+_635.getMarginExtents(this.iframe.parentNode).h));
this.editingArea.style.height=_646+"px";
if(this.iframe){
this.iframe.style.height="100%";
}
this._layoutMode=true;
},_onIEMouseDown:function(e){
var _647;
var b=this.document.body;
var _648=b.clientWidth;
var _649=b.clientHeight;
var _64a=b.clientLeft;
var _64b=b.offsetWidth;
var _64c=b.offsetHeight;
var _64d=b.offsetLeft;
if(/^rtl$/i.test(b.dir||"")){
if(_648<_64b&&e.x>_648&&e.x<_64b){
_647=true;
}
}else{
if(e.x<_64a&&e.x>_64d){
_647=true;
}
}
if(!_647){
if(_649<_64c&&e.y>_649&&e.y<_64c){
_647=true;
}
}
if(!_647){
delete this._cursorToStart;
delete this._savedSelection;
if(e.target.tagName=="BODY"){
this.defer("placeCursorAtEnd");
}
this.inherited(arguments);
}
},onBeforeActivate:function(){
this._restoreSelection();
},onBeforeDeactivate:function(e){
if(this.customUndo){
this.endEditing(true);
}
if(e.target.tagName!="BODY"){
this._saveSelection();
}
},customUndo:true,editActionInterval:3,beginEditing:function(cmd){
if(!this._inEditing){
this._inEditing=true;
this._beginEditing(cmd);
}
if(this.editActionInterval>0){
if(this._editTimer){
this._editTimer.remove();
}
this._editTimer=this.defer("endEditing",this._editInterval);
}
},_steps:[],_undoedSteps:[],execCommand:function(cmd){
if(this.customUndo&&(cmd=="undo"||cmd=="redo")){
return this[cmd]();
}else{
if(this.customUndo){
this.endEditing();
this._beginEditing();
}
var r=this.inherited(arguments);
if(this.customUndo){
this._endEditing();
}
return r;
}
},_pasteImpl:function(){
return this._clipboardCommand("paste");
},_cutImpl:function(){
return this._clipboardCommand("cut");
},_copyImpl:function(){
return this._clipboardCommand("copy");
},_clipboardCommand:function(cmd){
var r;
try{
r=this.document.execCommand(cmd,false,null);
if(has("webkit")&&!r){
throw {code:1011};
}
}
catch(e){
if(e.code==1011||(e.code==9&&has("opera"))){
var sub=_637.substitute,_64e={cut:"X",copy:"C",paste:"V"};
alert(sub(this.commands.systemShortcut,[this.commands[cmd],sub(this.commands[has("mac")?"appleKey":"ctrlKey"],[_64e[cmd]])]));
}
r=false;
}
return r;
},queryCommandEnabled:function(cmd){
if(this.customUndo&&(cmd=="undo"||cmd=="redo")){
return cmd=="undo"?(this._steps.length>1):(this._undoedSteps.length>0);
}else{
return this.inherited(arguments);
}
},_moveToBookmark:function(b){
var _64f=b.mark;
var mark=b.mark;
var col=b.isCollapsed;
var r,_650,_651,sel;
if(mark){
if(has("ie")<9||(has("ie")===9&&has("quirks"))){
if(lang.isArray(mark)){
_64f=[];
_630.forEach(mark,function(n){
_64f.push(_640.getNode(n,this.editNode));
},this);
this.selection.moveToBookmark({mark:_64f,isCollapsed:col});
}else{
if(mark.startContainer&&mark.endContainer){
sel=_640.getSelection(this.window);
if(sel&&sel.removeAllRanges){
sel.removeAllRanges();
r=_640.create(this.window);
_650=_640.getNode(mark.startContainer,this.editNode);
_651=_640.getNode(mark.endContainer,this.editNode);
if(_650&&_651){
r.setStart(_650,mark.startOffset);
r.setEnd(_651,mark.endOffset);
sel.addRange(r);
}
}
}
}
}else{
sel=_640.getSelection(this.window);
if(sel&&sel.removeAllRanges){
sel.removeAllRanges();
r=_640.create(this.window);
_650=_640.getNode(mark.startContainer,this.editNode);
_651=_640.getNode(mark.endContainer,this.editNode);
if(_650&&_651){
r.setStart(_650,mark.startOffset);
r.setEnd(_651,mark.endOffset);
sel.addRange(r);
}
}
}
}
},_changeToStep:function(from,to){
this.setValue(to.text);
var b=to.bookmark;
if(!b){
return;
}
this._moveToBookmark(b);
},undo:function(){
var ret=false;
if(!this._undoRedoActive){
this._undoRedoActive=true;
this.endEditing(true);
var s=this._steps.pop();
if(s&&this._steps.length>0){
this.focus();
this._changeToStep(s,this._steps[this._steps.length-1]);
this._undoedSteps.push(s);
this.onDisplayChanged();
delete this._undoRedoActive;
ret=true;
}
delete this._undoRedoActive;
}
return ret;
},redo:function(){
var ret=false;
if(!this._undoRedoActive){
this._undoRedoActive=true;
this.endEditing(true);
var s=this._undoedSteps.pop();
if(s&&this._steps.length>0){
this.focus();
this._changeToStep(this._steps[this._steps.length-1],s);
this._steps.push(s);
this.onDisplayChanged();
ret=true;
}
delete this._undoRedoActive;
}
return ret;
},endEditing:function(_652){
if(this._editTimer){
this._editTimer=this._editTimer.remove();
}
if(this._inEditing){
this._endEditing(_652);
this._inEditing=false;
}
},_getBookmark:function(){
var b=this.selection.getBookmark();
var tmp=[];
if(b&&b.mark){
var mark=b.mark;
if(has("ie")<9||(has("ie")===9&&has("quirks"))){
var sel=_640.getSelection(this.window);
if(!lang.isArray(mark)){
if(sel){
var _653;
if(sel.rangeCount){
_653=sel.getRangeAt(0);
}
if(_653){
b.mark=_653.cloneRange();
}else{
b.mark=this.selection.getBookmark();
}
}
}else{
_630.forEach(b.mark,function(n){
tmp.push(_640.getIndex(n,this.editNode).o);
},this);
b.mark=tmp;
}
}
try{
if(b.mark&&b.mark.startContainer){
tmp=_640.getIndex(b.mark.startContainer,this.editNode).o;
b.mark={startContainer:tmp,startOffset:b.mark.startOffset,endContainer:b.mark.endContainer===b.mark.startContainer?tmp:_640.getIndex(b.mark.endContainer,this.editNode).o,endOffset:b.mark.endOffset};
}
}
catch(e){
b.mark=null;
}
}
return b;
},_beginEditing:function(){
if(this._steps.length===0){
this._steps.push({"text":html.getChildrenHtml(this.editNode),"bookmark":this._getBookmark()});
}
},_endEditing:function(){
var v=html.getChildrenHtml(this.editNode);
this._undoedSteps=[];
this._steps.push({text:v,bookmark:this._getBookmark()});
},onKeyDown:function(e){
if(!has("ie")&&!this.iframe&&e.keyCode==keys.TAB&&!this.tabIndent){
this._saveSelection();
}
if(!this.customUndo){
this.inherited(arguments);
return;
}
var k=e.keyCode;
if(e.ctrlKey&&!e.shiftKey&&!e.altKey){
if(k==90||k==122){
e.stopPropagation();
e.preventDefault();
this.undo();
return;
}else{
if(k==89||k==121){
e.stopPropagation();
e.preventDefault();
this.redo();
return;
}
}
}
this.inherited(arguments);
switch(k){
case keys.ENTER:
case keys.BACKSPACE:
case keys.DELETE:
this.beginEditing();
break;
case 88:
case 86:
if(e.ctrlKey&&!e.altKey&&!e.metaKey){
this.endEditing();
if(e.keyCode==88){
this.beginEditing("cut");
}else{
this.beginEditing("paste");
}
this.defer("endEditing",1);
break;
}
default:
if(!e.ctrlKey&&!e.altKey&&!e.metaKey&&(e.keyCode<keys.F1||e.keyCode>keys.F15)){
this.beginEditing();
break;
}
case keys.ALT:
this.endEditing();
break;
case keys.UP_ARROW:
case keys.DOWN_ARROW:
case keys.LEFT_ARROW:
case keys.RIGHT_ARROW:
case keys.HOME:
case keys.END:
case keys.PAGE_UP:
case keys.PAGE_DOWN:
this.endEditing(true);
break;
case keys.CTRL:
case keys.SHIFT:
case keys.TAB:
break;
}
},_onBlur:function(){
this.inherited(arguments);
this.endEditing(true);
},_saveSelection:function(){
try{
this._savedSelection=this._getBookmark();
}
catch(e){
}
},_restoreSelection:function(){
if(this._savedSelection){
delete this._cursorToStart;
if(this.selection.isCollapsed()){
this._moveToBookmark(this._savedSelection);
}
delete this._savedSelection;
}
},onClick:function(){
this.endEditing(true);
this.inherited(arguments);
},replaceValue:function(html){
if(!this.customUndo){
this.inherited(arguments);
}else{
if(this.isClosed){
this.setValue(html);
}else{
this.beginEditing();
if(!html){
html="&#160;";
}
this.setValue(html);
this.endEditing();
}
}
},_setDisabledAttr:function(_654){
this.setValueDeferred.then(lang.hitch(this,function(){
if((!this.disabled&&_654)||(!this._buttonEnabledPlugins&&_654)){
_630.forEach(this._plugins,function(p){
p.set("disabled",true);
});
}else{
if(this.disabled&&!_654){
_630.forEach(this._plugins,function(p){
p.set("disabled",false);
});
}
}
}));
this.inherited(arguments);
},_setStateClass:function(){
try{
this.inherited(arguments);
if(this.document&&this.document.body){
_636.set(this.document.body,"color",_636.get(this.iframe,"color"));
}
}
catch(e){
}
}});
function _655(args){
return new _63e({command:args.name});
};
function _656(args){
return new _63e({buttonClass:_63d,command:args.name});
};
lang.mixin(_63e.registry,{"undo":_655,"redo":_655,"cut":_655,"copy":_655,"paste":_655,"insertOrderedList":_655,"insertUnorderedList":_655,"indent":_655,"outdent":_655,"justifyCenter":_655,"justifyFull":_655,"justifyLeft":_655,"justifyRight":_655,"delete":_655,"selectAll":_655,"removeFormat":_655,"unlink":_655,"insertHorizontalRule":_655,"bold":_656,"italic":_656,"underline":_656,"strikethrough":_656,"subscript":_656,"superscript":_656,"|":function(){
return new _63e({setEditor:function(_657){
this.editor=_657;
this.button=new _63b({ownerDocument:_657.ownerDocument});
}});
}});
return _643;
});
},"dijit/Toolbar":function(){
define(["require","dojo/_base/declare","dojo/has","dojo/keys","dojo/ready","./_Widget","./_KeyNavContainer","./_TemplatedMixin"],function(_658,_659,has,keys,_65a,_65b,_65c,_65d){
if(has("dijit-legacy-requires")){
_65a(0,function(){
var _65e=["dijit/ToolbarSeparator"];
_658(_65e);
});
}
return _659("dijit.Toolbar",[_65b,_65d,_65c],{templateString:"<div class=\"dijit\" role=\"toolbar\" tabIndex=\"${tabIndex}\" data-dojo-attach-point=\"containerNode\">"+"</div>",baseClass:"dijitToolbar",_onLeftArrow:function(){
this.focusPrev();
},_onRightArrow:function(){
this.focusNext();
}});
});
},"dojo/regexp":function(){
define(["./_base/kernel","./_base/lang"],function(dojo,lang){
var _65f={};
lang.setObject("dojo.regexp",_65f);
_65f.escapeString=function(str,_660){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_660&&_660.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
_65f.buildGroupRE=function(arr,re,_661){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return _65f.group(b.join("|"),_661);
};
_65f.group=function(_662,_663){
return "("+(_663?"?:":"")+_662+")";
};
return _65f;
});
},"dijit/DropDownMenu":function(){
define(["dojo/_base/declare","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(_664,keys,_665,_666,_667){
return _664("dijit.DropDownMenu",[_667,_666],{templateString:_665,baseClass:"dijitMenu",_onUpArrow:function(){
this.focusPrev();
},_onDownArrow:function(){
this.focusNext();
},_onRightArrow:function(evt){
this._moveToPopup(evt);
evt.stopPropagation();
evt.preventDefault();
},_onLeftArrow:function(evt){
if(this.parentMenu){
if(this.parentMenu._isMenuBar){
this.parentMenu.focusPrev();
}else{
this.onCancel(false);
}
}else{
evt.stopPropagation();
evt.preventDefault();
}
}});
});
},"dijit/_AttachMixin":function(){
define(["require","dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","dojo/mouse","dojo/on","dojo/touch","./_WidgetBase"],function(_668,_669,_66a,_66b,lang,_66c,on,_66d,_66e){
var _66f=lang.delegate(_66d,{"mouseenter":_66c.enter,"mouseleave":_66c.leave,"keypress":_66a._keypress});
var _670;
var _671=_66b("dijit._AttachMixin",null,{constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},buildRendering:function(){
this.inherited(arguments);
this._attachTemplateNodes(this.domNode);
this._beforeFillContent();
},_beforeFillContent:function(){
},_attachTemplateNodes:function(_672){
var node=_672;
while(true){
if(node.nodeType==1&&(this._processTemplateNode(node,function(n,p){
return n.getAttribute(p);
},this._attach)||this.searchContainerNode)&&node.firstChild){
node=node.firstChild;
}else{
if(node==_672){
return;
}
while(!node.nextSibling){
node=node.parentNode;
if(node==_672){
return;
}
}
node=node.nextSibling;
}
}
},_processTemplateNode:function(_673,_674,_675){
var ret=true;
var _676=this.attachScope||this,_677=_674(_673,"dojoAttachPoint")||_674(_673,"data-dojo-attach-point");
if(_677){
var _678,_679=_677.split(/\s*,\s*/);
while((_678=_679.shift())){
if(lang.isArray(_676[_678])){
_676[_678].push(_673);
}else{
_676[_678]=_673;
}
ret=(_678!="containerNode");
this._attachPoints.push(_678);
}
}
var _67a=_674(_673,"dojoAttachEvent")||_674(_673,"data-dojo-attach-event");
if(_67a){
var _67b,_67c=_67a.split(/\s*,\s*/);
var trim=lang.trim;
while((_67b=_67c.shift())){
if(_67b){
var _67d=null;
if(_67b.indexOf(":")!=-1){
var _67e=_67b.split(":");
_67b=trim(_67e[0]);
_67d=trim(_67e[1]);
}else{
_67b=trim(_67b);
}
if(!_67d){
_67d=_67b;
}
this._attachEvents.push(_675(_673,_67b,lang.hitch(_676,_67d)));
}
}
}
return ret;
},_attach:function(node,type,func){
type=type.replace(/^on/,"").toLowerCase();
if(type=="dijitclick"){
type=_670||(_670=_668("./a11yclick"));
}else{
type=_66f[type]||type;
}
return on(node,type,func);
},_detachTemplateNodes:function(){
var _67f=this.attachScope||this;
_669.forEach(this._attachPoints,function(_680){
delete _67f[_680];
});
this._attachPoints=[];
_669.forEach(this._attachEvents,function(_681){
_681.remove();
});
this._attachEvents=[];
},destroyRendering:function(){
this._detachTemplateNodes();
this.inherited(arguments);
}});
lang.extend(_66e,{dojoAttachEvent:"",dojoAttachPoint:""});
return _671;
});
},"dijit/form/_FormMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/window"],function(_682,_683,_684,lang,on,_685){
return _683("dijit.form._FormMixin",null,{state:"",_getDescendantFormWidgets:function(_686){
var res=[];
_682.forEach(_686||this.getChildren(),function(_687){
if("value" in _687){
res.push(_687);
}else{
res=res.concat(this._getDescendantFormWidgets(_687.getChildren()));
}
},this);
return res;
},reset:function(){
_682.forEach(this._getDescendantFormWidgets(),function(_688){
if(_688.reset){
_688.reset();
}
});
},validate:function(){
var _689=false;
return _682.every(_682.map(this._getDescendantFormWidgets(),function(_68a){
_68a._hasBeenBlurred=true;
var _68b=_68a.disabled||!_68a.validate||_68a.validate();
if(!_68b&&!_689){
_685.scrollIntoView(_68a.containerNode||_68a.domNode);
_68a.focus();
_689=true;
}
return _68b;
}),function(item){
return item;
});
},setValues:function(val){
_684.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
_682.forEach(this._getDescendantFormWidgets(),function(_68c){
if(!_68c.name){
return;
}
var _68d=map[_68c.name]||(map[_68c.name]=[]);
_68d.push(_68c);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _68e=map[name],_68f=lang.getObject(name,false,obj);
if(_68f===undefined){
continue;
}
_68f=[].concat(_68f);
if(typeof _68e[0].checked=="boolean"){
_682.forEach(_68e,function(w){
w.set("value",_682.indexOf(_68f,w._get("value"))!=-1);
});
}else{
if(_68e[0].multiple){
_68e[0].set("value",_68f);
}else{
_682.forEach(_68e,function(w,i){
w.set("value",_68f[i]);
});
}
}
}
},getValues:function(){
_684.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
_682.forEach(this._getDescendantFormWidgets(),function(_690){
var name=_690.name;
if(!name||_690.disabled){
return;
}
var _691=_690.get("value");
if(typeof _690.checked=="boolean"){
if(/Radio/.test(_690.declaredClass)){
if(_691!==false){
lang.setObject(name,_691,obj);
}else{
_691=lang.getObject(name,false,obj);
if(_691===undefined){
lang.setObject(name,null,obj);
}
}
}else{
var ary=lang.getObject(name,false,obj);
if(!ary){
ary=[];
lang.setObject(name,ary,obj);
}
if(_691!==false){
ary.push(_691);
}
}
}else{
var prev=lang.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(lang.isArray(prev)){
prev.push(_691);
}else{
lang.setObject(name,[prev,_691],obj);
}
}else{
lang.setObject(name,_691,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(){
},_getState:function(){
var _692=_682.map(this._descendants,function(w){
return w.get("state")||"";
});
return _682.indexOf(_692,"Error")>=0?"Error":_682.indexOf(_692,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
},connectChildren:function(_693){
this._descendants=this._getDescendantFormWidgets();
_682.forEach(this._descendants,function(_694){
if(!_694._started){
_694.startup();
}
});
if(!_693){
this._onChildChange();
}
},_onChildChange:function(attr){
if(!attr||attr=="state"||attr=="disabled"){
this._set("state",this._getState());
}
if(!attr||attr=="value"||attr=="disabled"||attr=="checked"){
if(this._onChangeDelayTimer){
this._onChangeDelayTimer.remove();
}
this._onChangeDelayTimer=this.defer(function(){
delete this._onChangeDelayTimer;
this._set("value",this.get("value"));
},10);
}
},startup:function(){
this.inherited(arguments);
this._descendants=this._getDescendantFormWidgets();
this.value=this.get("value");
this.state=this._getState();
var self=this;
this.own(on(this.containerNode,"attrmodified-state, attrmodified-disabled, attrmodified-value, attrmodified-checked",function(evt){
if(evt.target==self.domNode){
return;
}
self._onChildChange(evt.type.replace("attrmodified-",""));
}));
this.watch("state",function(attr,_695,_696){
this.onValidStateChange(_696=="");
});
},destroy:function(){
this.inherited(arguments);
}});
});
},"dijit/Menu":function(){
define(["require","dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-geometry","dojo/dom-style","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","dojo/_base/window","dojo/window","./popup","./DropDownMenu","dojo/ready"],function(_697,_698,_699,dom,_69a,_69b,_69c,keys,lang,on,has,win,_69d,pm,_69e,_69f){
if(has("dijit-legacy-requires")){
_69f(0,function(){
var _6a0=["dijit/MenuItem","dijit/PopupMenuItem","dijit/CheckedMenuItem","dijit/MenuSeparator"];
_697(_6a0);
});
}
return _699("dijit.Menu",_69e,{constructor:function(){
this._bindings=[];
},targetNodeIds:[],selector:"",contextMenuForWindow:false,leftClickToOpen:false,refocus:true,postCreate:function(){
if(this.contextMenuForWindow){
this.bindDomNode(this.ownerDocumentBody);
}else{
_698.forEach(this.targetNodeIds,this.bindDomNode,this);
}
this.inherited(arguments);
},_iframeContentWindow:function(_6a1){
return _69d.get(this._iframeContentDocument(_6a1))||this._iframeContentDocument(_6a1)["__parent__"]||(_6a1.name&&document.frames[_6a1.name])||null;
},_iframeContentDocument:function(_6a2){
return _6a2.contentDocument||(_6a2.contentWindow&&_6a2.contentWindow.document)||(_6a2.name&&document.frames[_6a2.name]&&document.frames[_6a2.name].document)||null;
},bindDomNode:function(node){
node=dom.byId(node,this.ownerDocument);
var cn;
if(node.tagName.toLowerCase()=="iframe"){
var _6a3=node,_6a4=this._iframeContentWindow(_6a3);
cn=win.body(_6a4.document);
}else{
cn=(node==win.body(this.ownerDocument)?this.ownerDocument.documentElement:node);
}
var _6a5={node:node,iframe:_6a3};
_69a.set(node,"_dijitMenu"+this.id,this._bindings.push(_6a5));
var _6a6=lang.hitch(this,function(cn){
var _6a7=this.selector,_6a8=_6a7?function(_6a9){
return on.selector(_6a7,_6a9);
}:function(_6aa){
return _6aa;
},self=this;
return [on(cn,_6a8(this.leftClickToOpen?"click":"contextmenu"),function(evt){
evt.stopPropagation();
evt.preventDefault();
self._scheduleOpen(this,_6a3,{x:evt.pageX,y:evt.pageY});
}),on(cn,_6a8("keydown"),function(evt){
if(evt.shiftKey&&evt.keyCode==keys.F10){
evt.stopPropagation();
evt.preventDefault();
self._scheduleOpen(this,_6a3);
}
})];
});
_6a5.connects=cn?_6a6(cn):[];
if(_6a3){
_6a5.onloadHandler=lang.hitch(this,function(){
var _6ab=this._iframeContentWindow(_6a3),cn=win.body(_6ab.document);
_6a5.connects=_6a6(cn);
});
if(_6a3.addEventListener){
_6a3.addEventListener("load",_6a5.onloadHandler,false);
}else{
_6a3.attachEvent("onload",_6a5.onloadHandler);
}
}
},unBindDomNode:function(_6ac){
var node;
try{
node=dom.byId(_6ac,this.ownerDocument);
}
catch(e){
return;
}
var _6ad="_dijitMenu"+this.id;
if(node&&_69a.has(node,_6ad)){
var bid=_69a.get(node,_6ad)-1,b=this._bindings[bid],h;
while((h=b.connects.pop())){
h.remove();
}
var _6ae=b.iframe;
if(_6ae){
if(_6ae.removeEventListener){
_6ae.removeEventListener("load",b.onloadHandler,false);
}else{
_6ae.detachEvent("onload",b.onloadHandler);
}
}
_69a.remove(node,_6ad);
delete this._bindings[bid];
}
},_scheduleOpen:function(_6af,_6b0,_6b1){
if(!this._openTimer){
this._openTimer=this.defer(function(){
delete this._openTimer;
this._openMyself({target:_6af,iframe:_6b0,coords:_6b1});
},1);
}
},_openMyself:function(args){
var _6b2=args.target,_6b3=args.iframe,_6b4=args.coords,_6b5=!_6b4;
this.currentTarget=_6b2;
if(_6b4){
if(_6b3){
var ifc=_69b.position(_6b3,true),_6b6=this._iframeContentWindow(_6b3),_6b7=_69b.docScroll(_6b6.document);
var cs=_69c.getComputedStyle(_6b3),tp=_69c.toPixelValue,left=(has("ie")&&has("quirks")?0:tp(_6b3,cs.paddingLeft))+(has("ie")&&has("quirks")?tp(_6b3,cs.borderLeftWidth):0),top=(has("ie")&&has("quirks")?0:tp(_6b3,cs.paddingTop))+(has("ie")&&has("quirks")?tp(_6b3,cs.borderTopWidth):0);
_6b4.x+=ifc.x+left-_6b7.x;
_6b4.y+=ifc.y+top-_6b7.y;
}
}else{
_6b4=_69b.position(_6b2,true);
_6b4.x+=10;
_6b4.y+=10;
}
var self=this;
var _6b8=this._focusManager.get("prevNode");
var _6b9=this._focusManager.get("curNode");
var _6ba=!_6b9||(dom.isDescendant(_6b9,this.domNode))?_6b8:_6b9;
function _6bb(){
if(self.refocus&&_6ba){
_6ba.focus();
}
pm.close(self);
};
pm.open({popup:this,x:_6b4.x,y:_6b4.y,onExecute:_6bb,onCancel:_6bb,orient:this.isLeftToRight()?"L":"R"});
this.focus();
if(!_6b5){
this.defer(function(){
this._cleanUp(true);
});
}
this._onBlur=function(){
this.inherited("_onBlur",arguments);
pm.close(this);
};
},destroy:function(){
_698.forEach(this._bindings,function(b){
if(b){
this.unBindDomNode(b.node);
}
},this);
this.inherited(arguments);
}});
});
},"dijit/layout/ContentPane":function(){
define(["dojo/_base/kernel","dojo/_base/lang","../_Widget","../_Container","./_ContentPaneResizeMixin","dojo/string","dojo/html","dojo/i18n!../nls/loading","dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/_base/xhr","dojo/i18n","dojo/when"],function(_6bc,lang,_6bd,_6be,_6bf,_6c0,html,_6c1,_6c2,_6c3,_6c4,dom,_6c5,_6c6,xhr,i18n,when){
return _6c3("dijit.layout.ContentPane",[_6bd,_6be,_6bf],{href:"",content:"",extractContent:false,parseOnLoad:true,parserScope:_6bc._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,_setTitleAttr:null,stopParser:true,template:false,markupFactory:function(_6c7,node,ctor){
var self=new ctor(_6c7,node);
return !self.href&&self._contentSetter&&self._contentSetter.parseDeferred&&!self._contentSetter.parseDeferred.isFulfilled()?self._contentSetter.parseDeferred.then(function(){
return self;
}):self;
},create:function(_6c8,_6c9){
if((!_6c8||!_6c8.template)&&_6c9&&!("href" in _6c8)&&!("content" in _6c8)){
_6c9=dom.byId(_6c9);
var df=_6c9.ownerDocument.createDocumentFragment();
while(_6c9.firstChild){
df.appendChild(_6c9.firstChild);
}
_6c8=lang.delegate(_6c8,{content:df});
}
this.inherited(arguments,[_6c8,_6c9]);
},postMixInProperties:function(){
this.inherited(arguments);
var _6ca=i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=_6c0.substitute(this.loadingMessage,_6ca);
this.errorMessage=_6c0.substitute(this.errorMessage,_6ca);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.removeAttribute("title");
},startup:function(){
this.inherited(arguments);
if(this._contentSetter){
_6c2.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},_startChildren:function(){
_6c2.forEach(this.getChildren(),function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
});
if(this._contentSetter){
_6c2.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&lang.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
_6bc.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new _6c4(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
_6bc.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new _6c4(lang.hitch(this,"cancel"));
if(this._created){
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
}
this._setContent(data||"");
this._isDownloaded=false;
return this.onLoadDeferred;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
this.onLoadDeferred=null;
},destroy:function(){
this.cancel();
this.inherited(arguments);
},destroyRecursive:function(_6cb){
if(this._beingDestroyed){
return;
}
this.inherited(arguments);
},_onShow:function(){
this.inherited(arguments);
if(this.href){
if(!this._xhrDfd&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)){
return this.refresh();
}
}
},refresh:function(){
this.cancel();
this.onLoadDeferred=new _6c4(lang.hitch(this,"cancel"));
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
this._setContent(this.onDownloadStart(),true);
var self=this;
var _6cc={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(lang.isObject(this.ioArgs)){
lang.mixin(_6cc,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||xhr.get)(_6cc)),_6cd;
hand.then(function(html){
_6cd=html;
try{
self._isDownloaded=true;
return self._setContent(html,false);
}
catch(err){
self._onError("Content",err);
}
},function(err){
if(!hand.canceled){
self._onError("Download",err);
}
delete self._xhrDfd;
return err;
}).then(function(){
self.onDownloadEnd();
delete self._xhrDfd;
return _6cd;
});
delete this._hrefChanged;
},_onLoadHandler:function(data){
this._set("isLoaded",true);
try{
this.onLoadDeferred.resolve(data);
}
catch(e){
console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);
}
},_onUnloadHandler:function(){
this._set("isLoaded",false);
try{
this.onUnload();
}
catch(e){
console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);
}
},destroyDescendants:function(_6ce){
if(this.isLoaded){
this._onUnloadHandler();
}
var _6cf=this._contentSetter;
_6c2.forEach(this.getChildren(),function(_6d0){
if(_6d0.destroyRecursive){
_6d0.destroyRecursive(_6ce);
}else{
if(_6d0.destroy){
_6d0.destroy(_6ce);
}
}
_6d0._destroyed=true;
});
if(_6cf){
_6c2.forEach(_6cf.parseResults,function(_6d1){
if(!_6d1._destroyed){
if(_6d1.destroyRecursive){
_6d1.destroyRecursive(_6ce);
}else{
if(_6d1.destroy){
_6d1.destroy(_6ce);
}
}
_6d1._destroyed=true;
}
});
delete _6cf.parseResults;
}
if(!_6ce){
_6c6.empty(this.containerNode);
}
delete this._singleChild;
},_setContent:function(cont,_6d2){
this.destroyDescendants();
var _6d3=this._contentSetter;
if(!(_6d3&&_6d3 instanceof html._ContentSetter)){
_6d3=this._contentSetter=new html._ContentSetter({node:this.containerNode,_onError:lang.hitch(this,this._onError),onContentError:lang.hitch(this,function(e){
var _6d4=this.onContentError(e);
try{
this.containerNode.innerHTML=_6d4;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _6d5=lang.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:!cont.domNode&&this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang,textDir:this.textDir},this._contentSetterParams||{});
var p=_6d3.set((lang.isObject(cont)&&cont.domNode)?cont.domNode:cont,_6d5);
var self=this;
return when(p&&p.then?p:_6d3.parseDeferred,function(){
delete self._contentSetterParams;
if(!_6d2){
if(self._started){
self._startChildren();
self._scheduleLayout();
}
self._onLoadHandler(cont);
}
});
},_onError:function(type,err,_6d6){
this.onLoadDeferred.reject(err);
var _6d7=this["on"+type+"Error"].call(this,err);
if(_6d6){
console.error(_6d6,err);
}else{
if(_6d7){
this._setContent(_6d7,true);
}
}
},onLoad:function(){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(){
},onDownloadError:function(){
return this.errorMessage;
},onDownloadEnd:function(){
}});
});
},"dijit/_KeyNavContainer":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/_base/kernel","dojo/keys","dojo/_base/lang","./registry","./_Container","./_FocusMixin","./_KeyNavMixin"],function(_6d8,_6d9,_6da,_6db,keys,lang,_6dc,_6dd,_6de,_6df){
return _6d9("dijit._KeyNavContainer",[_6de,_6df,_6dd],{connectKeyNavHandlers:function(_6e0,_6e1){
var _6e2=(this._keyNavCodes={});
var prev=lang.hitch(this,"focusPrev");
var next=lang.hitch(this,"focusNext");
_6d8.forEach(_6e0,function(code){
_6e2[code]=prev;
});
_6d8.forEach(_6e1,function(code){
_6e2[code]=next;
});
_6e2[keys.HOME]=lang.hitch(this,"focusFirstChild");
_6e2[keys.END]=lang.hitch(this,"focusLastChild");
},startupKeyNavChildren:function(){
_6db.deprecated("startupKeyNavChildren() call no longer needed","","2.0");
},startup:function(){
this.inherited(arguments);
_6d8.forEach(this.getChildren(),lang.hitch(this,"_startupChild"));
},addChild:function(_6e3,_6e4){
this.inherited(arguments);
this._startupChild(_6e3);
},_startupChild:function(_6e5){
_6e5.set("tabIndex","-1");
},_getFirst:function(){
var _6e6=this.getChildren();
return _6e6.length?_6e6[0]:null;
},_getLast:function(){
var _6e7=this.getChildren();
return _6e7.length?_6e7[_6e7.length-1]:null;
},focusNext:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,1));
},focusPrev:function(){
this.focusChild(this._getNextFocusableChild(this.focusedChild,-1),true);
},childSelector:function(node){
var node=_6dc.byNode(node);
return node&&node.getParent()==this;
}});
});
},"dijit/layout/utils":function(){
define(["dojo/_base/array","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang"],function(_6e8,_6e9,_6ea,_6eb,lang){
function _6ec(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
};
function size(_6ed,dim){
var _6ee=_6ed.resize?_6ed.resize(dim):_6ea.setMarginBox(_6ed.domNode,dim);
if(_6ee){
lang.mixin(_6ed,_6ee);
}else{
lang.mixin(_6ed,_6ea.getMarginBox(_6ed.domNode));
lang.mixin(_6ed,dim);
}
};
var _6ef={marginBox2contentBox:function(node,mb){
var cs=_6eb.getComputedStyle(node);
var me=_6ea.getMarginExtents(node,cs);
var pb=_6ea.getPadBorderExtents(node,cs);
return {l:_6eb.toPixelValue(node,cs.paddingLeft),t:_6eb.toPixelValue(node,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
},layoutChildren:function(_6f0,dim,_6f1,_6f2,_6f3){
dim=lang.mixin({},dim);
_6e9.add(_6f0,"dijitLayoutContainer");
_6f1=_6e8.filter(_6f1,function(item){
return item.region!="center"&&item.layoutAlign!="client";
}).concat(_6e8.filter(_6f1,function(item){
return item.region=="center"||item.layoutAlign=="client";
}));
_6e8.forEach(_6f1,function(_6f4){
var elm=_6f4.domNode,pos=(_6f4.region||_6f4.layoutAlign);
if(!pos){
throw new Error("No region setting for "+_6f4.id);
}
var _6f5=elm.style;
_6f5.left=dim.l+"px";
_6f5.top=dim.t+"px";
_6f5.position="absolute";
_6e9.add(elm,"dijitAlign"+_6ec(pos));
var _6f6={};
if(_6f2&&_6f2==_6f4.id){
_6f6[_6f4.region=="top"||_6f4.region=="bottom"?"h":"w"]=_6f3;
}
if(pos=="leading"){
pos=_6f4.isLeftToRight()?"left":"right";
}
if(pos=="trailing"){
pos=_6f4.isLeftToRight()?"right":"left";
}
if(pos=="top"||pos=="bottom"){
_6f6.w=dim.w;
size(_6f4,_6f6);
dim.h-=_6f4.h;
if(pos=="top"){
dim.t+=_6f4.h;
}else{
_6f5.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_6f6.h=dim.h;
size(_6f4,_6f6);
dim.w-=_6f4.w;
if(pos=="left"){
dim.l+=_6f4.w;
}else{
_6f5.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
size(_6f4,dim);
}
}
}
});
}};
lang.setObject("dijit.layout.utils",_6ef);
return _6ef;
});
},"dijit/_Contained":function(){
define(["dojo/_base/declare","./registry"],function(_6f7,_6f8){
return _6f7("dijit._Contained",null,{_getSibling:function(_6f9){
var node=this.domNode;
do{
node=node[_6f9+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&_6f8.byNode(node);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
});
},"dijit/form/DataList":function(){
define(["dojo/_base/declare","dojo/dom","dojo/_base/lang","dojo/query","dojo/store/Memory","../registry"],function(_6fa,dom,lang,_6fb,_6fc,_6fd){
function _6fe(_6ff){
return {id:_6ff.value,value:_6ff.value,name:lang.trim(_6ff.innerText||_6ff.textContent||"")};
};
return _6fa("dijit.form.DataList",_6fc,{constructor:function(_700,_701){
this.domNode=dom.byId(_701);
lang.mixin(this,_700);
if(this.id){
_6fd.add(this);
}
this.domNode.style.display="none";
this.inherited(arguments,[{data:_6fb("option",this.domNode).map(_6fe)}]);
},destroy:function(){
_6fd.remove(this.id);
},fetchSelectedItem:function(){
var _702=_6fb("> option[selected]",this.domNode)[0]||_6fb("> option",this.domNode)[0];
return _702&&_6fe(_702);
}});
});
},"dijit/_editor/_Plugin":function(){
define(["dojo/_base/connect","dojo/_base/declare","dojo/_base/lang","../Destroyable","../form/Button"],function(_703,_704,lang,_705,_706){
var _707=_704("dijit._editor._Plugin",_705,{constructor:function(args){
this.params=args||{};
lang.mixin(this,this.params);
this._attrPairNames={};
},editor:null,iconClassPrefix:"dijitEditorIcon",button:null,command:"",useDefaultCommand:true,buttonClass:_706,disabled:false,getLabel:function(key){
return this.editor.commands[key];
},_initButton:function(){
if(this.command.length){
var _708=this.getLabel(this.command),_709=this.editor,_70a=this.iconClassPrefix+" "+this.iconClassPrefix+this.command.charAt(0).toUpperCase()+this.command.substr(1);
if(!this.button){
var _70b=lang.mixin({label:_708,ownerDocument:_709.ownerDocument,dir:_709.dir,lang:_709.lang,showLabel:false,iconClass:_70a,dropDown:this.dropDown,tabIndex:"-1"},this.params||{});
this.button=new this.buttonClass(_70b);
}
}
if(this.get("disabled")&&this.button){
this.button.set("disabled",this.get("disabled"));
}
},destroy:function(){
if(this.dropDown){
this.dropDown.destroyRecursive();
}
this.inherited(arguments);
},connect:function(o,f,tf){
this.own(_703.connect(o,f,this,tf));
},updateState:function(){
var e=this.editor,c=this.command,_70c,_70d;
if(!e||!e.isLoaded||!c.length){
return;
}
var _70e=this.get("disabled");
if(this.button){
try{
_70d=!_70e&&e.queryCommandEnabled(c);
if(this.enabled!==_70d){
this.enabled=_70d;
this.button.set("disabled",!_70d);
}
if(_70d){
if(typeof this.button.checked=="boolean"){
_70c=e.queryCommandState(c);
if(this.checked!==_70c){
this.checked=_70c;
this.button.set("checked",e.queryCommandState(c));
}
}
}
}
catch(e){
}
}
},setEditor:function(_70f){
this.editor=_70f;
this._initButton();
if(this.button&&this.useDefaultCommand){
if(this.editor.queryCommandAvailable(this.command)){
this.own(this.button.on("click",lang.hitch(this.editor,"execCommand",this.command,this.commandArg)));
}else{
this.button.domNode.style.display="none";
}
}
this.own(this.editor.on("NormalizedDisplayChanged",lang.hitch(this,"updateState")));
},setToolbar:function(_710){
if(this.button){
_710.addChild(this.button);
}
},set:function(name,_711){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _712=this._getAttrNames(name);
if(this[_712.s]){
var _713=this[_712.s].apply(this,Array.prototype.slice.call(arguments,1));
}else{
this._set(name,_711);
}
return _713||this;
},get:function(name){
var _714=this._getAttrNames(name);
return this[_714.g]?this[_714.g]():this[name];
},_setDisabledAttr:function(_715){
this._set("disabled",_715);
this.updateState();
},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.charAt(0).toUpperCase()+name.substr(1);
return (apn[name]={s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"});
},_set:function(name,_716){
this[name]=_716;
}});
_707.registry={};
return _707;
});
},"dijit/tree/_dndSelector":function(){
define(["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/dom","dojo/mouse","dojo/on","dojo/touch","../a11yclick","./_dndContainer"],function(_717,_718,_719,_71a,lang,dom,_71b,on,_71c,_71d,_71e){
return _719("dijit.tree._dndSelector",_71e,{constructor:function(){
this.selection={};
this.anchor=null;
this.events.push(on(this.tree.domNode,_71c.press,lang.hitch(this,"onMouseDown")),on(this.tree.domNode,_71c.release,lang.hitch(this,"onMouseUp")),on(this.tree.domNode,_71c.move,lang.hitch(this,"onMouseMove")),on(this.tree.domNode,_71d.press,lang.hitch(this,"onClickPress")),on(this.tree.domNode,_71d.release,lang.hitch(this,"onClickRelease")));
},singular:false,getSelectedTreeNodes:function(){
var _71f=[],sel=this.selection;
for(var i in sel){
_71f.push(sel[i]);
}
return _71f;
},selectNone:function(){
this.setSelection([]);
return this;
},destroy:function(){
this.inherited(arguments);
this.selection=this.anchor=null;
},addTreeNode:function(node,_720){
this.setSelection(this.getSelectedTreeNodes().concat([node]));
if(_720){
this.anchor=node;
}
return node;
},removeTreeNode:function(node){
var _721=_717.filter(this.getSelectedTreeNodes(),function(_722){
return !dom.isDescendant(_722.domNode,node.domNode);
});
this.setSelection(_721);
return node;
},isTreeNodeSelected:function(node){
return node.id&&!!this.selection[node.id];
},setSelection:function(_723){
var _724=this.getSelectedTreeNodes();
_717.forEach(this._setDifference(_724,_723),lang.hitch(this,function(node){
node.setSelected(false);
if(this.anchor==node){
delete this.anchor;
}
delete this.selection[node.id];
}));
_717.forEach(this._setDifference(_723,_724),lang.hitch(this,function(node){
node.setSelected(true);
this.selection[node.id]=node;
}));
this._updateSelectionProperties();
},_setDifference:function(xs,ys){
_717.forEach(ys,function(y){
y.__exclude__=true;
});
var ret=_717.filter(xs,function(x){
return !x.__exclude__;
});
_717.forEach(ys,function(y){
delete y["__exclude__"];
});
return ret;
},_updateSelectionProperties:function(){
var _725=this.getSelectedTreeNodes();
var _726=[],_727=[],_728=[];
_717.forEach(_725,function(node){
var ary=node.getTreePath(),_729=this.tree.model;
_727.push(node);
_726.push(ary);
ary=_717.map(ary,function(item){
return _729.getIdentity(item);
},this);
_728.push(ary.join("/"));
},this);
var _72a=_717.map(_727,function(node){
return node.item;
});
this.tree._set("paths",_726);
this.tree._set("path",_726[0]||[]);
this.tree._set("selectedNodes",_727);
this.tree._set("selectedNode",_727[0]||null);
this.tree._set("selectedItems",_72a);
this.tree._set("selectedItem",_72a[0]||null);
},onClickPress:function(e){
if(this.current&&this.current.isExpandable&&this.tree.isExpandoNode(e.target,this.current)){
return;
}
if(_71b.isLeft(e)){
e.preventDefault();
}
var _72b=e.type=="keydown"?this.tree.focusedChild:this.current;
if(!_72b){
return;
}
var copy=_718.isCopyKey(e),id=_72b.id;
if(!this.singular&&!e.shiftKey&&this.selection[id]){
this._doDeselect=true;
return;
}else{
this._doDeselect=false;
}
this.userSelect(_72b,copy,e.shiftKey);
},onClickRelease:function(e){
if(!this._doDeselect){
return;
}
this._doDeselect=false;
this.userSelect(e.type=="keyup"?this.tree.focusedChild:this.current,_718.isCopyKey(e),e.shiftKey);
},onMouseMove:function(){
this._doDeselect=false;
},onMouseDown:function(){
},onMouseUp:function(){
},_compareNodes:function(n1,n2){
if(n1===n2){
return 0;
}
if("sourceIndex" in document.documentElement){
return n1.sourceIndex-n2.sourceIndex;
}else{
if("compareDocumentPosition" in document.documentElement){
return n1.compareDocumentPosition(n2)&2?1:-1;
}else{
if(document.createRange){
var r1=doc.createRange();
r1.setStartBefore(n1);
var r2=doc.createRange();
r2.setStartBefore(n2);
return r1.compareBoundaryPoints(r1.END_TO_END,r2);
}else{
throw Error("dijit.tree._compareNodes don't know how to compare two different nodes in this browser");
}
}
}
},userSelect:function(node,_72c,_72d){
if(this.singular){
if(this.anchor==node&&_72c){
this.selectNone();
}else{
this.setSelection([node]);
this.anchor=node;
}
}else{
if(_72d&&this.anchor){
var cr=this._compareNodes(this.anchor.rowNode,node.rowNode),_72e,end,_72f=this.anchor;
if(cr<0){
_72e=_72f;
end=node;
}else{
_72e=node;
end=_72f;
}
var _730=[];
while(_72e!=end){
_730.push(_72e);
_72e=this.tree._getNext(_72e);
}
_730.push(end);
this.setSelection(_730);
}else{
if(this.selection[node.id]&&_72c){
this.removeTreeNode(node);
}else{
if(_72c){
this.addTreeNode(node,true);
}else{
this.setSelection([node]);
this.anchor=node;
}
}
}
}
},getItem:function(key){
var _731=this.selection[key];
return {data:_731,type:["treeNode"]};
},forInSelectedItems:function(f,o){
o=o||_71a.global;
for(var id in this.selection){
f.call(o,this.getItem(id),id,this);
}
}});
});
},"dijit/_Container":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/kernel"],function(_732,_733,_734,_735){
return _733("dijit._Container",null,{buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_736,_737){
var _738=this.containerNode;
if(_737>0){
_738=_738.firstChild;
while(_737>0){
if(_738.nodeType==1){
_737--;
}
_738=_738.nextSibling;
}
if(_738){
_737="before";
}else{
_738=this.containerNode;
_737="last";
}
}
_734.place(_736.domNode,_738,_737);
if(this._started&&!_736._started){
_736.startup();
}
},removeChild:function(_739){
if(typeof _739=="number"){
_739=this.getChildren()[_739];
}
if(_739){
var node=_739.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},_getSiblingOfChild:function(_73a,dir){
_735.deprecated(this.declaredClass+"::_getSiblingOfChild() is deprecated. Use _KeyNavMixin::_getNext() instead.","","2.0");
var _73b=this.getChildren(),idx=_732.indexOf(_73b,_73a);
return _73b[idx+dir];
},getIndexOfChild:function(_73c){
return _732.indexOf(this.getChildren(),_73c);
}});
});
},"dojo/html":function(){
define(["./_base/kernel","./_base/lang","./_base/array","./_base/declare","./dom","./dom-construct","./parser"],function(_73d,lang,_73e,_73f,dom,_740,_741){
var _742=0;
var html={_secureForInnerHtml:function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
},_emptyNode:_740.empty,_setNodeContent:function(node,cont){
_740.empty(node);
if(cont){
if(typeof cont=="string"){
cont=_740.toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&lang.isArrayLike(cont)){
for(var _743=cont.length,i=0;i<cont.length;i=_743==cont.length?i+1:0){
_740.place(cont[i],node,"last");
}
}else{
_740.place(cont,node,"last");
}
}
return node;
},_ContentSetter:_73f("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:_73d._scopeName,startup:true,constructor:function(_744,node){
lang.mixin(this,_744||{});
node=this.node=dom.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_742++].join("_");
}
},set:function(cont,_745){
if(undefined!==cont){
this.content=cont;
}
if(_745){
this._mixin(_745);
}
this.onBegin();
this.setContent();
var ret=this.onEnd();
if(ret&&ret.then){
return ret;
}else{
return this.node;
}
},setContent:function(){
var node=this.node;
if(!node){
throw new Error(this.declaredClass+": setContent given no node");
}
try{
node=html._setNodeContent(node,this.content);
}
catch(e){
var _746=this.onContentError(e);
try{
node.innerHTML=_746;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseDeferred){
if(!this.parseDeferred.isResolved()){
this.parseDeferred.cancel();
}
delete this.parseDeferred;
}
if(this.parseResults&&this.parseResults.length){
_73e.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
_740.empty(this.node);
},onBegin:function(){
var cont=this.content;
if(lang.isString(cont)){
if(this.cleanContent){
cont=html._secureForInnerHtml(cont);
}
if(this.extractContent){
var _747=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_747){
cont=_747[1];
}
}
}
this.empty();
this.content=cont;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.parseDeferred;
delete this.node;
delete this.content;
},onContentError:function(err){
return "Error occurred setting content: "+err;
},onExecError:function(err){
return "Error occurred executing scripts: "+err;
},_mixin:function(_748){
var _749={},key;
for(key in _748){
if(key in _749){
continue;
}
this[key]=_748[key];
}
},_parse:function(){
var _74a=this.node;
try{
var _74b={};
_73e.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_74b[name]=this[name];
}
},this);
var self=this;
this.parseDeferred=_741.parse({rootNode:_74a,noStart:!this.startup,inherited:_74b,scope:this.parserScope}).then(function(_74c){
return self.parseResults=_74c;
},function(e){
self._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_74d){
var _74e=this["on"+type+"Error"].call(this,err);
if(_74d){
console.error(_74d,err);
}else{
if(_74e){
html._setNodeContent(this.node,_74e,true);
}
}
}}),set:function(node,cont,_74f){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_74f){
return html._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(lang.mixin(_74f,{content:cont,node:node}));
return op.set();
}
}};
lang.setObject("dojo.html",html);
return html;
});
},"dijit/_PaletteMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/keys","dojo/_base/lang","dojo/on","./_CssStateMixin","./a11yclick","./focus","./typematic"],function(_750,_751,_752,_753,keys,lang,on,_754,_755,_756,_757){
var _758=_750("dijit._PaletteMixin",_754,{defaultTimeout:500,timeoutChangeRate:0.9,value:"",_selectedCell:-1,tabIndex:"0",cellClass:"dijitPaletteCell",dyeClass:null,_dyeFactory:function(_759){
var _75a=typeof this.dyeClass=="string"?lang.getObject(this.dyeClass):this.dyeClass;
return new _75a(_759);
},_preparePalette:function(_75b,_75c){
this._cells=[];
var url=this._blankGif;
this.own(on(this.gridNode,_755,lang.hitch(this,"_onCellClick")));
for(var row=0;row<_75b.length;row++){
var _75d=_753.create("tr",{tabIndex:"-1",role:"row"},this.gridNode);
for(var col=0;col<_75b[row].length;col++){
var _75e=_75b[row][col];
if(_75e){
var _75f=this._dyeFactory(_75e,row,col,_75c[_75e]);
var _760=_753.create("td",{"class":this.cellClass,tabIndex:"-1",title:_75c[_75e],role:"gridcell"},_75d);
_75f.fillCell(_760,url);
_760.idx=this._cells.length;
this._cells.push({node:_760,dye:_75f});
}
}
}
this._xDim=_75b[0].length;
this._yDim=_75b.length;
var _761={UP_ARROW:-this._xDim,DOWN_ARROW:this._xDim,RIGHT_ARROW:this.isLeftToRight()?1:-1,LEFT_ARROW:this.isLeftToRight()?-1:1};
for(var key in _761){
this.own(_757.addKeyListener(this.domNode,{keyCode:keys[key],ctrlKey:false,altKey:false,shiftKey:false},this,function(){
var _762=_761[key];
return function(_763){
this._navigateByKey(_762,_763);
};
}(),this.timeoutChangeRate,this.defaultTimeout));
}
},postCreate:function(){
this.inherited(arguments);
this._setCurrent(this._cells[0].node);
},focus:function(){
_756.focus(this._currentFocus);
},_onCellClick:function(evt){
var _764=evt.target;
while(_764.tagName!="TD"){
if(!_764.parentNode||_764==this.gridNode){
return;
}
_764=_764.parentNode;
}
var _765=this._getDye(_764).getValue();
this._setCurrent(_764);
_756.focus(_764);
this._setValueAttr(_765,true);
evt.stopPropagation();
evt.preventDefault();
},_setCurrent:function(node){
if("_currentFocus" in this){
_751.set(this._currentFocus,"tabIndex","-1");
}
this._currentFocus=node;
if(node){
_751.set(node,"tabIndex",this.tabIndex);
}
},_setValueAttr:function(_766,_767){
if(this._selectedCell>=0){
_752.remove(this._cells[this._selectedCell].node,this.cellClass+"Selected");
}
this._selectedCell=-1;
if(_766){
for(var i=0;i<this._cells.length;i++){
if(_766==this._cells[i].dye.getValue()){
this._selectedCell=i;
_752.add(this._cells[i].node,this.cellClass+"Selected");
break;
}
}
}
this._set("value",this._selectedCell>=0?_766:null);
if(_767||_767===undefined){
this.onChange(_766);
}
},onChange:function(){
},_navigateByKey:function(_768,_769){
if(_769==-1){
return;
}
var _76a=this._currentFocus.idx+_768;
if(_76a<this._cells.length&&_76a>-1){
var _76b=this._cells[_76a].node;
this._setCurrent(_76b);
this.defer(lang.hitch(_756,"focus",_76b));
}
},_getDye:function(cell){
return this._cells[cell.idx].dye;
}});
return _758;
});
},"dijit/form/ValidationTextBox":function(){
define(["dojo/_base/declare","dojo/_base/kernel","dojo/i18n","./TextBox","../Tooltip","dojo/text!./templates/ValidationTextBox.html","dojo/i18n!./nls/validate"],function(_76c,_76d,i18n,_76e,_76f,_770){
var _771;
return _771=_76c("dijit.form.ValidationTextBox",_76e,{templateString:_770,required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},pattern:".*",regExp:"",regExpGen:function(){
},state:"",tooltipPosition:[],_deprecateRegExp:function(attr,_772){
if(_772!=_771.prototype[attr]){
_76d.deprecated("ValidationTextBox id="+this.id+", set('"+attr+"', ...) is deprecated.  Use set('pattern', ...) instead.","","2.0");
this.set("pattern",_772);
}
},_setRegExpGenAttr:function(_773){
this._deprecateRegExp("regExpGen",_773);
this._set("regExpGen",this._computeRegexp);
},_setRegExpAttr:function(_774){
this._deprecateRegExp("regExp",_774);
},_setValueAttr:function(){
this.inherited(arguments);
this._refreshState();
},validator:function(_775,_776){
return (new RegExp("^(?:"+this._computeRegexp(_776)+")"+(this.required?"":"?")+"$")).test(_775)&&(!this.required||!this._isEmpty(_775))&&(this._isEmpty(_775)||this.parse(_775,_776)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(){
return this.validator(this.textbox.value,this.get("constraints"));
},_isEmpty:function(_777){
return (this.trim?/^\s*$/:/^$/).test(_777);
},getErrorMessage:function(){
var _778=this.invalidMessage=="$_unset_$"?this.messages.invalidMessage:!this.invalidMessage?this.promptMessage:this.invalidMessage;
var _779=this.missingMessage=="$_unset_$"?this.messages.missingMessage:!this.missingMessage?_778:this.missingMessage;
return (this.required&&this._isEmpty(this.textbox.value))?_779:_778;
},getPromptMessage:function(){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_77a){
var _77b="";
var _77c=this.disabled||this.isValid(_77a);
if(_77c){
this._maskValidSubsetError=true;
}
var _77d=this._isEmpty(this.textbox.value);
var _77e=!_77c&&_77a&&this._isValidSubset();
this._set("state",_77c?"":(((((!this._hasBeenBlurred||_77a)&&_77d)||_77e)&&(this._maskValidSubsetError||(_77e&&!this._hasBeenBlurred&&_77a)))?"Incomplete":"Error"));
this.focusNode.setAttribute("aria-invalid",_77c?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_77a&&_77e;
_77b=this.getErrorMessage(_77a);
}else{
if(this.state=="Incomplete"){
_77b=this.getPromptMessage(_77a);
this._maskValidSubsetError=!this._hasBeenBlurred||_77a;
}else{
if(_77d){
_77b=this.getPromptMessage(_77a);
}
}
}
this.set("message",_77b);
return _77c;
},displayMessage:function(_77f){
if(_77f&&this.focused){
_76f.show(_77f,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_76f.hide(this.domNode);
}
},_refreshState:function(){
if(this._created){
this.validate(this.focused);
}
this.inherited(arguments);
},constructor:function(_780){
this.constraints={};
this.baseClass+=" dijitValidationTextBox";
},startup:function(){
this.inherited(arguments);
this._refreshState();
},_setConstraintsAttr:function(_781){
if(!_781.locale&&this.lang){
_781.locale=this.lang;
}
this._set("constraints",_781);
this._refreshState();
},_setPatternAttr:function(_782){
this._set("pattern",_782);
this._refreshState();
},_computeRegexp:function(_783){
var p=this.pattern;
if(typeof p=="function"){
p=p.call(this,_783);
}
if(p!=this._lastRegExp){
var _784="";
this._lastRegExp=p;
if(p!=".*"){
p.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,function(re){
switch(re.charAt(0)){
case "{":
case "+":
case "?":
case "*":
case "^":
case "$":
case "|":
case "(":
_784+=re;
break;
case ")":
_784+="|$)";
break;
default:
_784+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_784);
}
catch(e){
_784=this.pattern;
console.warn("RegExp error in "+this.declaredClass+": "+this.pattern);
}
this._partialre="^(?:"+_784+")$";
}
return p;
},postMixInProperties:function(){
this.inherited(arguments);
this.messages=i18n.getLocalization("dijit.form","validate",this.lang);
this._setConstraintsAttr(this.constraints);
},_setDisabledAttr:function(_785){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_786){
this._set("required",_786);
this.focusNode.setAttribute("aria-required",_786);
this._refreshState();
},_setMessageAttr:function(_787){
this._set("message",_787);
this.displayMessage(_787);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
});
},"dijit/selection":function(){
define(["dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/sniff","dojo/_base/window","dijit/focus"],function(_788,dom,lang,has,_789,_78a){
var _78b=function(win){
var doc=win.document;
this.getType=function(){
if(doc.getSelection){
var _78c="text";
var oSel;
try{
oSel=win.getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _78d=oSel.getRangeAt(0);
if((_78d.startContainer==_78d.endContainer)&&((_78d.endOffset-_78d.startOffset)==1)&&(_78d.startContainer.nodeType!=3)){
_78c="control";
}
}
return _78c;
}else{
return doc.selection.type.toLowerCase();
}
};
this.getSelectedText=function(){
if(doc.getSelection){
var _78e=win.getSelection();
return _78e?_78e.toString():"";
}else{
if(this.getType()=="control"){
return null;
}
return doc.selection.createRange().text;
}
};
this.getSelectedHtml=function(){
if(doc.getSelection){
var _78f=win.getSelection();
if(_78f&&_78f.rangeCount){
var i;
var html="";
for(i=0;i<_78f.rangeCount;i++){
var frag=_78f.getRangeAt(i).cloneContents();
var div=doc.createElement("div");
div.appendChild(frag);
html+=div.innerHTML;
}
return html;
}
return null;
}else{
if(this.getType()=="control"){
return null;
}
return doc.selection.createRange().htmlText;
}
};
this.getSelectedElement=function(){
if(this.getType()=="control"){
if(doc.getSelection){
var _790=win.getSelection();
return _790.anchorNode.childNodes[_790.anchorOffset];
}else{
var _791=doc.selection.createRange();
if(_791&&_791.item){
return doc.selection.createRange().item(0);
}
}
}
return null;
};
this.getParentElement=function(){
if(this.getType()=="control"){
var p=this.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(doc.getSelection){
var _792=doc.getSelection();
if(_792){
var node=_792.anchorNode;
while(node&&(node.nodeType!=1)){
node=node.parentNode;
}
return node;
}
}else{
var r=doc.selection.createRange();
r.collapse(true);
return r.parentElement();
}
}
return null;
};
this.hasAncestorElement=function(_793){
return this.getAncestorElement.apply(this,arguments)!=null;
};
this.getAncestorElement=function(_794){
var node=this.getSelectedElement()||this.getParentElement();
return this.getParentOfType(node,arguments);
};
this.isTag=function(node,tags){
if(node&&node.tagName){
var _795=node.tagName.toLowerCase();
for(var i=0;i<tags.length;i++){
var _796=String(tags[i]).toLowerCase();
if(_795==_796){
return _796;
}
}
}
return "";
};
this.getParentOfType=function(node,tags){
while(node){
if(this.isTag(node,tags).length){
return node;
}
node=node.parentNode;
}
return null;
};
this.collapse=function(_797){
if(doc.getSelection){
var _798=win.getSelection();
if(_798.removeAllRanges){
if(_797){
_798.collapseToStart();
}else{
_798.collapseToEnd();
}
}else{
_798.collapse(_797);
}
}else{
var _799=doc.selection.createRange();
_799.collapse(_797);
_799.select();
}
};
this.remove=function(){
var sel=doc.selection;
if(doc.getSelection){
sel=win.getSelection();
sel.deleteFromDocument();
return sel;
}else{
if(sel.type.toLowerCase()!="none"){
sel.clear();
}
return sel;
}
};
this.selectElementChildren=function(_79a,_79b){
var _79c;
_79a=dom.byId(_79a);
if(doc.getSelection){
var _79d=win.getSelection();
if(has("opera")){
if(_79d.rangeCount){
_79c=_79d.getRangeAt(0);
}else{
_79c=doc.createRange();
}
_79c.setStart(_79a,0);
_79c.setEnd(_79a,(_79a.nodeType==3)?_79a.length:_79a.childNodes.length);
_79d.addRange(_79c);
}else{
_79d.selectAllChildren(_79a);
}
}else{
_79c=_79a.ownerDocument.body.createTextRange();
_79c.moveToElementText(_79a);
if(!_79b){
try{
_79c.select();
}
catch(e){
}
}
}
};
this.selectElement=function(_79e,_79f){
var _7a0;
_79e=dom.byId(_79e);
if(doc.getSelection){
var _7a1=doc.getSelection();
_7a0=doc.createRange();
if(_7a1.removeAllRanges){
if(has("opera")){
if(_7a1.getRangeAt(0)){
_7a0=_7a1.getRangeAt(0);
}
}
_7a0.selectNode(_79e);
_7a1.removeAllRanges();
_7a1.addRange(_7a0);
}
}else{
try{
var tg=_79e.tagName?_79e.tagName.toLowerCase():"";
if(tg==="img"||tg==="table"){
_7a0=_789.body(doc).createControlRange();
}else{
_7a0=_789.body(doc).createRange();
}
_7a0.addElement(_79e);
if(!_79f){
_7a0.select();
}
}
catch(e){
this.selectElementChildren(_79e,_79f);
}
}
};
this.inSelection=function(node){
if(node){
var _7a2;
var _7a3;
if(doc.getSelection){
var sel=win.getSelection();
if(sel&&sel.rangeCount>0){
_7a3=sel.getRangeAt(0);
}
if(_7a3&&_7a3.compareBoundaryPoints&&doc.createRange){
try{
_7a2=doc.createRange();
_7a2.setStart(node,0);
if(_7a3.compareBoundaryPoints(_7a3.START_TO_END,_7a2)===1){
return true;
}
}
catch(e){
}
}
}else{
_7a3=doc.selection.createRange();
try{
_7a2=node.ownerDocument.body.createTextRange();
_7a2.moveToElementText(node);
}
catch(e2){
}
if(_7a3&&_7a2){
if(_7a3.compareEndPoints("EndToStart",_7a2)===1){
return true;
}
}
}
}
return false;
},this.getBookmark=function(){
var bm,rg,tg,sel=doc.selection,cf=_78a.curNode;
if(doc.getSelection){
sel=win.getSelection();
if(sel){
if(sel.isCollapsed){
tg=cf?cf.tagName:"";
if(tg){
tg=tg.toLowerCase();
if(tg=="textarea"||(tg=="input"&&(!cf.type||cf.type.toLowerCase()=="text"))){
sel={start:cf.selectionStart,end:cf.selectionEnd,node:cf,pRange:true};
return {isCollapsed:(sel.end<=sel.start),mark:sel};
}
}
bm={isCollapsed:true};
if(sel.rangeCount){
bm.mark=sel.getRangeAt(0).cloneRange();
}
}else{
rg=sel.getRangeAt(0);
bm={isCollapsed:false,mark:rg.cloneRange()};
}
}
}else{
if(sel){
tg=cf?cf.tagName:"";
tg=tg.toLowerCase();
if(cf&&tg&&(tg=="button"||tg=="textarea"||tg=="input")){
if(sel.type&&sel.type.toLowerCase()=="none"){
return {isCollapsed:true,mark:null};
}else{
rg=sel.createRange();
return {isCollapsed:rg.text&&rg.text.length?false:true,mark:{range:rg,pRange:true}};
}
}
bm={};
try{
rg=sel.createRange();
bm.isCollapsed=!(sel.type=="Text"?rg.htmlText.length:rg.length);
}
catch(e){
bm.isCollapsed=true;
return bm;
}
if(sel.type.toUpperCase()=="CONTROL"){
if(rg.length){
bm.mark=[];
var i=0,len=rg.length;
while(i<len){
bm.mark.push(rg.item(i++));
}
}else{
bm.isCollapsed=true;
bm.mark=null;
}
}else{
bm.mark=rg.getBookmark();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return bm;
};
this.moveToBookmark=function(_7a4){
var mark=_7a4.mark;
if(mark){
if(doc.getSelection){
var sel=win.getSelection();
if(sel&&sel.removeAllRanges){
if(mark.pRange){
var n=mark.node;
n.selectionStart=mark.start;
n.selectionEnd=mark.end;
}else{
sel.removeAllRanges();
sel.addRange(mark);
}
}else{
console.warn("No idea how to restore selection for this browser!");
}
}else{
if(doc.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(lang.isArray(mark)){
rg=doc.body.createControlRange();
_788.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=doc.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
};
this.isCollapsed=function(){
return this.getBookmark().isCollapsed;
};
};
var _7a5=new _78b(window);
_7a5.SelectionManager=_78b;
return _7a5;
});
},"dijit/_base/typematic":function(){
define(["../typematic"],function(){
});
},"dijit/_base":function(){
define(["./main","./a11y","./WidgetSet","./_base/focus","./_base/manager","./_base/place","./_base/popup","./_base/scroll","./_base/sniff","./_base/typematic","./_base/wai","./_base/window"],function(_7a6){
return _7a6._base;
});
},"dojo/window":function(){
define(["./_base/lang","./sniff","./_base/window","./dom","./dom-geometry","./dom-style","./dom-construct"],function(lang,has,_7a7,dom,geom,_7a8,_7a9){
has.add("rtl-adjust-position-for-verticalScrollBar",function(win,doc){
var body=_7a7.body(doc),_7aa=_7a9.create("div",{style:{overflow:"scroll",overflowX:"visible",direction:"rtl",visibility:"hidden",position:"absolute",left:"0",top:"0",width:"64px",height:"64px"}},body,"last"),div=_7a9.create("div",{style:{overflow:"hidden",direction:"ltr"}},_7aa,"last"),ret=geom.position(div).x!=0;
_7aa.removeChild(div);
body.removeChild(_7aa);
return ret;
});
has.add("position-fixed-support",function(win,doc){
var body=_7a7.body(doc),_7ab=_7a9.create("span",{style:{visibility:"hidden",position:"fixed",left:"1px",top:"1px"}},body,"last"),_7ac=_7a9.create("span",{style:{position:"fixed",left:"0",top:"0"}},_7ab,"last"),ret=geom.position(_7ac).x!=geom.position(_7ab).x;
_7ab.removeChild(_7ac);
body.removeChild(_7ab);
return ret;
});
var _7ad={getBox:function(doc){
doc=doc||_7a7.doc;
var _7ae=(doc.compatMode=="BackCompat")?_7a7.body(doc):doc.documentElement,_7af=geom.docScroll(doc),w,h;
if(has("touch")){
var _7b0=_7ad.get(doc);
w=_7b0.innerWidth||_7ae.clientWidth;
h=_7b0.innerHeight||_7ae.clientHeight;
}else{
w=_7ae.clientWidth;
h=_7ae.clientHeight;
}
return {l:_7af.x,t:_7af.y,w:w,h:h};
},get:function(doc){
if(has("ie")&&_7ad!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
},scrollIntoView:function(node,pos){
try{
node=dom.byId(node);
var doc=node.ownerDocument||_7a7.doc,body=_7a7.body(doc),html=doc.documentElement||body.parentNode,isIE=has("ie"),isWK=has("webkit");
if(node==body||node==html){
return;
}
if(!(has("mozilla")||isIE||isWK||has("opera")||has("trident"))&&("scrollIntoView" in node)){
node.scrollIntoView(false);
return;
}
var _7b1=doc.compatMode=="BackCompat",_7b2=Math.min(body.clientWidth||html.clientWidth,html.clientWidth||body.clientWidth),_7b3=Math.min(body.clientHeight||html.clientHeight,html.clientHeight||body.clientHeight),_7b4=(isWK||_7b1)?body:html,_7b5=pos||geom.position(node),el=node.parentNode,_7b6=function(el){
return (isIE<=6||(isIE==7&&_7b1))?false:(has("position-fixed-support")&&(_7a8.get(el,"position").toLowerCase()=="fixed"));
};
if(_7b6(node)){
return;
}
while(el){
if(el==body){
el=_7b4;
}
var _7b7=geom.position(el),_7b8=_7b6(el),rtl=_7a8.getComputedStyle(el).direction.toLowerCase()=="rtl";
if(el==_7b4){
_7b7.w=_7b2;
_7b7.h=_7b3;
if(_7b4==html&&isIE&&rtl){
_7b7.x+=_7b4.offsetWidth-_7b7.w;
}
if(_7b7.x<0||!isIE||isIE>=9){
_7b7.x=0;
}
if(_7b7.y<0||!isIE||isIE>=9){
_7b7.y=0;
}
}else{
var pb=geom.getPadBorderExtents(el);
_7b7.w-=pb.w;
_7b7.h-=pb.h;
_7b7.x+=pb.l;
_7b7.y+=pb.t;
var _7b9=el.clientWidth,_7ba=_7b7.w-_7b9;
if(_7b9>0&&_7ba>0){
if(rtl&&has("rtl-adjust-position-for-verticalScrollBar")){
_7b7.x+=_7ba;
}
_7b7.w=_7b9;
}
_7b9=el.clientHeight;
_7ba=_7b7.h-_7b9;
if(_7b9>0&&_7ba>0){
_7b7.h=_7b9;
}
}
if(_7b8){
if(_7b7.y<0){
_7b7.h+=_7b7.y;
_7b7.y=0;
}
if(_7b7.x<0){
_7b7.w+=_7b7.x;
_7b7.x=0;
}
if(_7b7.y+_7b7.h>_7b3){
_7b7.h=_7b3-_7b7.y;
}
if(_7b7.x+_7b7.w>_7b2){
_7b7.w=_7b2-_7b7.x;
}
}
var l=_7b5.x-_7b7.x,t=_7b5.y-_7b7.y,r=l+_7b5.w-_7b7.w,bot=t+_7b5.h-_7b7.h;
var s,old;
if(r*l>0&&(!!el.scrollLeft||el==_7b4||el.scrollWidth>el.offsetHeight)){
s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_7b1)||isIE>=9)){
s=-s;
}
old=el.scrollLeft;
el.scrollLeft+=s;
s=el.scrollLeft-old;
_7b5.x-=s;
}
if(bot*t>0&&(!!el.scrollTop||el==_7b4||el.scrollHeight>el.offsetHeight)){
s=Math.ceil(Math[t<0?"max":"min"](t,bot));
old=el.scrollTop;
el.scrollTop+=s;
s=el.scrollTop-old;
_7b5.y-=s;
}
el=(el!=_7b4)&&!_7b8&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
}};
1&&lang.setObject("dojo.window",_7ad);
return _7ad;
});
},"dijit/_FocusMixin":function(){
define(["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_7bb,_7bc,_7bd,lang){
lang.extend(_7bc,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _7bd("dijit._FocusMixin",null,{_focusManager:_7bb});
});
},"dijit/_WidgetsInTemplateMixin":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/_base/lang","dojo/parser"],function(_7be,_7bf,_7c0,lang,_7c1){
return _7c0("dijit._WidgetsInTemplateMixin",null,{_earlyTemplatedStartup:false,widgetsInTemplate:true,contextRequire:null,_beforeFillContent:function(){
if(this.widgetsInTemplate){
var node=this.domNode;
if(this.containerNode&&!this.searchContainerNode){
this.containerNode.stopParser=true;
}
_7c1.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang,textDir:this.textDir},propsThis:this,contextRequire:this.contextRequire,scope:"dojo"}).then(lang.hitch(this,function(_7c2){
this._startupWidgets=_7c2;
for(var i=0;i<_7c2.length;i++){
this._processTemplateNode(_7c2[i],function(n,p){
return n[p];
},function(_7c3,type,_7c4){
if(type in _7c3){
return _7c3.connect(_7c3,type,_7c4);
}else{
return _7c3.on(type,_7c4,true);
}
});
}
if(this.containerNode&&this.containerNode.stopParser){
delete this.containerNode.stopParser;
}
}));
if(!this._startupWidgets){
throw new Error(this.declaredClass+": parser returned unfilled promise (probably waiting for module auto-load), "+"unsupported by _WidgetsInTemplateMixin.   Must pre-load all supporting widgets before instantiation.");
}
}
},_processTemplateNode:function(_7c5,_7c6,_7c7){
if(_7c6(_7c5,"dojoType")||_7c6(_7c5,"data-dojo-type")){
return true;
}
return this.inherited(arguments);
},startup:function(){
_7be.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this._startupWidgets=null;
this.inherited(arguments);
}});
});
},"dijit/form/FilteringSelect":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/when","./MappedTextBox","./ComboBoxMixin"],function(_7c8,lang,when,_7c9,_7ca){
return _7c8("dijit.form.FilteringSelect",[_7c9,_7ca],{required:true,_lastDisplayedValue:"",_isValidSubset:function(){
return this._opened;
},isValid:function(){
return !!this.item||(!this.required&&this.get("displayedValue")=="");
},_refreshState:function(){
if(!this.searchTimer){
this.inherited(arguments);
}
},_callbackSetLabel:function(_7cb,_7cc,_7cd,_7ce){
if((_7cc&&_7cc[this.searchAttr]!==this._lastQuery)||(!_7cc&&_7cb.length&&this.store.getIdentity(_7cb[0])!=this._lastQuery)){
return;
}
if(!_7cb.length){
this.set("value","",_7ce||(_7ce===undefined&&!this.focused),this.textbox.value,null);
}else{
this.set("item",_7cb[0],_7ce);
}
},_openResultList:function(_7cf,_7d0,_7d1){
if(_7d0[this.searchAttr]!==this._lastQuery){
return;
}
this.inherited(arguments);
if(this.item===undefined){
this.validate(true);
}
},_getValueAttr:function(){
return this.valueNode.value;
},_getValueField:function(){
return "value";
},_setValueAttr:function(_7d2,_7d3,_7d4,item){
if(!this._onChangeActive){
_7d3=null;
}
if(item===undefined){
if(_7d2===null||_7d2===""){
_7d2="";
if(!lang.isString(_7d4)){
this._setDisplayedValueAttr(_7d4||"",_7d3);
return;
}
}
var self=this;
this._lastQuery=_7d2;
when(this.store.get(_7d2),function(item){
self._callbackSetLabel(item?[item]:[],undefined,undefined,_7d3);
});
}else{
this.valueNode.value=_7d2;
this.inherited(arguments);
}
},_setItemAttr:function(item,_7d5,_7d6){
this.inherited(arguments);
this._lastDisplayedValue=this.textbox.value;
},_getDisplayQueryString:function(text){
return text.replace(/([\\\*\?])/g,"\\$1");
},_setDisplayedValueAttr:function(_7d7,_7d8){
if(_7d7==null){
_7d7="";
}
if(!this._created){
if(!("displayedValue" in this.params)){
return;
}
_7d8=false;
}
if(this.store){
this.closeDropDown();
var _7d9=lang.clone(this.query);
var qs=this._getDisplayQueryString(_7d7),q;
if(this.store._oldAPI){
q=qs;
}else{
q=this._patternToRegExp(qs);
q.toString=function(){
return qs;
};
}
this._lastQuery=_7d9[this.searchAttr]=q;
this.textbox.value=_7d7;
this._lastDisplayedValue=_7d7;
this._set("displayedValue",_7d7);
var _7da=this;
var _7db={queryOptions:{ignoreCase:this.ignoreCase,deep:true}};
lang.mixin(_7db,this.fetchProperties);
this._fetchHandle=this.store.query(_7d9,_7db);
when(this._fetchHandle,function(_7dc){
_7da._fetchHandle=null;
_7da._callbackSetLabel(_7dc||[],_7d9,_7db,_7d8);
},function(err){
_7da._fetchHandle=null;
if(!_7da._cancelingQuery){
console.error("dijit.form.FilteringSelect: "+err.toString());
}
});
}
},undo:function(){
this.set("displayedValue",this._lastDisplayedValue);
}});
});
},"dijit/form/_ButtonMixin":function(){
define(["dojo/_base/declare","dojo/dom","dojo/has","../registry"],function(_7dd,dom,has,_7de){
var _7df=_7dd("dijit.form._ButtonMixin"+(has("dojo-bidi")?"_NoBidi":""),null,{label:"",type:"button",__onClick:function(e){
e.stopPropagation();
e.preventDefault();
if(!this.disabled){
this.valueNode.click(e);
}
return false;
},_onClick:function(e){
if(this.disabled){
e.stopPropagation();
e.preventDefault();
return false;
}
if(this.onClick(e)===false){
e.preventDefault();
}
var _7e0=e.defaultPrevented;
if(!_7e0&&this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _7e1=_7de.byNode(node);
if(_7e1&&typeof _7e1._onSubmit=="function"){
_7e1._onSubmit(e);
e.preventDefault();
_7e0=true;
break;
}
}
}
return !_7e0;
},postCreate:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},onClick:function(){
return true;
},_setLabelAttr:function(_7e2){
this._set("label",_7e2);
var _7e3=this.containerNode||this.focusNode;
_7e3.innerHTML=_7e2;
}});
if(has("dojo-bidi")){
_7df=_7dd("dijit.form._ButtonMixin",_7df,{_setLabelAttr:function(){
this.inherited(arguments);
var _7e4=this.containerNode||this.focusNode;
this.applyTextDir(_7e4);
}});
}
return _7df;
});
},"dojo/colors":function(){
define(["./_base/kernel","./_base/lang","./_base/Color","./_base/array"],function(dojo,lang,_7e5,_7e6){
var _7e7={};
lang.setObject("dojo.colors",_7e7);
var _7e8=function(m1,m2,h){
if(h<0){
++h;
}
if(h>1){
--h;
}
var h6=6*h;
if(h6<1){
return m1+(m2-m1)*h6;
}
if(2*h<1){
return m2;
}
if(3*h<2){
return m1+(m2-m1)*(2/3-h)*6;
}
return m1;
};
dojo.colorFromRgb=_7e5.fromRgb=function(_7e9,obj){
var m=_7e9.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(m){
var c=m[2].split(/\s*,\s*/),l=c.length,t=m[1],a;
if((t=="rgb"&&l==3)||(t=="rgba"&&l==4)){
var r=c[0];
if(r.charAt(r.length-1)=="%"){
a=_7e6.map(c,function(x){
return parseFloat(x)*2.56;
});
if(l==4){
a[3]=c[3];
}
return _7e5.fromArray(a,obj);
}
return _7e5.fromArray(c,obj);
}
if((t=="hsl"&&l==3)||(t=="hsla"&&l==4)){
var H=((parseFloat(c[0])%360)+360)%360/360,S=parseFloat(c[1])/100,L=parseFloat(c[2])/100,m2=L<=0.5?L*(S+1):L+S-L*S,m1=2*L-m2;
a=[_7e8(m1,m2,H+1/3)*256,_7e8(m1,m2,H)*256,_7e8(m1,m2,H-1/3)*256,1];
if(l==4){
a[3]=c[3];
}
return _7e5.fromArray(a,obj);
}
}
return null;
};
var _7ea=function(c,low,high){
c=Number(c);
return isNaN(c)?high:c<low?low:c>high?high:c;
};
_7e5.prototype.sanitize=function(){
var t=this;
t.r=Math.round(_7ea(t.r,0,255));
t.g=Math.round(_7ea(t.g,0,255));
t.b=Math.round(_7ea(t.b,0,255));
t.a=_7ea(t.a,0,1);
return this;
};
_7e7.makeGrey=_7e5.makeGrey=function(g,a){
return _7e5.fromArray([g,g,g,a]);
};
lang.mixin(_7e5.named,{"aliceblue":[240,248,255],"antiquewhite":[250,235,215],"aquamarine":[127,255,212],"azure":[240,255,255],"beige":[245,245,220],"bisque":[255,228,196],"blanchedalmond":[255,235,205],"blueviolet":[138,43,226],"brown":[165,42,42],"burlywood":[222,184,135],"cadetblue":[95,158,160],"chartreuse":[127,255,0],"chocolate":[210,105,30],"coral":[255,127,80],"cornflowerblue":[100,149,237],"cornsilk":[255,248,220],"crimson":[220,20,60],"cyan":[0,255,255],"darkblue":[0,0,139],"darkcyan":[0,139,139],"darkgoldenrod":[184,134,11],"darkgray":[169,169,169],"darkgreen":[0,100,0],"darkgrey":[169,169,169],"darkkhaki":[189,183,107],"darkmagenta":[139,0,139],"darkolivegreen":[85,107,47],"darkorange":[255,140,0],"darkorchid":[153,50,204],"darkred":[139,0,0],"darksalmon":[233,150,122],"darkseagreen":[143,188,143],"darkslateblue":[72,61,139],"darkslategray":[47,79,79],"darkslategrey":[47,79,79],"darkturquoise":[0,206,209],"darkviolet":[148,0,211],"deeppink":[255,20,147],"deepskyblue":[0,191,255],"dimgray":[105,105,105],"dimgrey":[105,105,105],"dodgerblue":[30,144,255],"firebrick":[178,34,34],"floralwhite":[255,250,240],"forestgreen":[34,139,34],"gainsboro":[220,220,220],"ghostwhite":[248,248,255],"gold":[255,215,0],"goldenrod":[218,165,32],"greenyellow":[173,255,47],"grey":[128,128,128],"honeydew":[240,255,240],"hotpink":[255,105,180],"indianred":[205,92,92],"indigo":[75,0,130],"ivory":[255,255,240],"khaki":[240,230,140],"lavender":[230,230,250],"lavenderblush":[255,240,245],"lawngreen":[124,252,0],"lemonchiffon":[255,250,205],"lightblue":[173,216,230],"lightcoral":[240,128,128],"lightcyan":[224,255,255],"lightgoldenrodyellow":[250,250,210],"lightgray":[211,211,211],"lightgreen":[144,238,144],"lightgrey":[211,211,211],"lightpink":[255,182,193],"lightsalmon":[255,160,122],"lightseagreen":[32,178,170],"lightskyblue":[135,206,250],"lightslategray":[119,136,153],"lightslategrey":[119,136,153],"lightsteelblue":[176,196,222],"lightyellow":[255,255,224],"limegreen":[50,205,50],"linen":[250,240,230],"magenta":[255,0,255],"mediumaquamarine":[102,205,170],"mediumblue":[0,0,205],"mediumorchid":[186,85,211],"mediumpurple":[147,112,219],"mediumseagreen":[60,179,113],"mediumslateblue":[123,104,238],"mediumspringgreen":[0,250,154],"mediumturquoise":[72,209,204],"mediumvioletred":[199,21,133],"midnightblue":[25,25,112],"mintcream":[245,255,250],"mistyrose":[255,228,225],"moccasin":[255,228,181],"navajowhite":[255,222,173],"oldlace":[253,245,230],"olivedrab":[107,142,35],"orange":[255,165,0],"orangered":[255,69,0],"orchid":[218,112,214],"palegoldenrod":[238,232,170],"palegreen":[152,251,152],"paleturquoise":[175,238,238],"palevioletred":[219,112,147],"papayawhip":[255,239,213],"peachpuff":[255,218,185],"peru":[205,133,63],"pink":[255,192,203],"plum":[221,160,221],"powderblue":[176,224,230],"rosybrown":[188,143,143],"royalblue":[65,105,225],"saddlebrown":[139,69,19],"salmon":[250,128,114],"sandybrown":[244,164,96],"seagreen":[46,139,87],"seashell":[255,245,238],"sienna":[160,82,45],"skyblue":[135,206,235],"slateblue":[106,90,205],"slategray":[112,128,144],"slategrey":[112,128,144],"snow":[255,250,250],"springgreen":[0,255,127],"steelblue":[70,130,180],"tan":[210,180,140],"thistle":[216,191,216],"tomato":[255,99,71],"turquoise":[64,224,208],"violet":[238,130,238],"wheat":[245,222,179],"whitesmoke":[245,245,245],"yellowgreen":[154,205,50]});
return _7e5;
});
},"dijit/registry":function(){
define(["dojo/_base/array","dojo/sniff","dojo/_base/window","./main"],function(_7eb,has,win,_7ec){
var _7ed={},hash={};
var _7ee={length:0,add:function(_7ef){
if(hash[_7ef.id]){
throw new Error("Tried to register widget with id=="+_7ef.id+" but that id is already registered");
}
hash[_7ef.id]=_7ef;
this.length++;
},remove:function(id){
if(hash[id]){
delete hash[id];
this.length--;
}
},byId:function(id){
return typeof id=="string"?hash[id]:id;
},byNode:function(node){
return hash[node.getAttribute("widgetId")];
},toArray:function(){
var ar=[];
for(var id in hash){
ar.push(hash[id]);
}
return ar;
},getUniqueId:function(_7f0){
var id;
do{
id=_7f0+"_"+(_7f0 in _7ed?++_7ed[_7f0]:_7ed[_7f0]=0);
}while(hash[id]);
return _7ec._scopeName=="dijit"?id:_7ec._scopeName+"_"+id;
},findWidgets:function(root,_7f1){
var _7f2=[];
function _7f3(root){
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _7f4=node.getAttribute("widgetId");
if(_7f4){
var _7f5=hash[_7f4];
if(_7f5){
_7f2.push(_7f5);
}
}else{
if(node!==_7f1){
_7f3(node);
}
}
}
}
};
_7f3(root);
return _7f2;
},_destroyAll:function(){
_7ec._curFocus=null;
_7ec._prevFocus=null;
_7ec._activeStack=[];
_7eb.forEach(_7ee.findWidgets(win.body()),function(_7f6){
if(!_7f6._destroyed){
if(_7f6.destroyRecursive){
_7f6.destroyRecursive();
}else{
if(_7f6.destroy){
_7f6.destroy();
}
}
}
});
},getEnclosingWidget:function(node){
while(node){
var id=node.nodeType==1&&node.getAttribute("widgetId");
if(id){
return hash[id];
}
node=node.parentNode;
}
return null;
},_hash:hash};
_7ec.registry=_7ee;
return _7ee;
});
},"dijit/tree/_dndContainer":function(){
define(["dojo/aspect","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/on","dojo/touch"],function(_7f7,_7f8,_7f9,lang,on,_7fa){
return _7f8("dijit.tree._dndContainer",null,{constructor:function(tree,_7fb){
this.tree=tree;
this.node=tree.domNode;
lang.mixin(this,_7fb);
this.containerState="";
_7f9.add(this.node,"dojoDndContainer");
this.events=[on(this.node,_7fa.enter,lang.hitch(this,"onOverEvent")),on(this.node,_7fa.leave,lang.hitch(this,"onOutEvent")),_7f7.after(this.tree,"_onNodeMouseEnter",lang.hitch(this,"onMouseOver"),true),_7f7.after(this.tree,"_onNodeMouseLeave",lang.hitch(this,"onMouseOut"),true),on(this.node,"dragstart, selectstart",function(evt){
evt.preventDefault();
})];
},destroy:function(){
var h;
while(h=this.events.pop()){
h.remove();
}
this.node=this.parent=null;
},onMouseOver:function(_7fc){
this.current=_7fc;
},onMouseOut:function(){
this.current=null;
},_changeState:function(type,_7fd){
var _7fe="dojoDnd"+type;
var _7ff=type.toLowerCase()+"State";
_7f9.replace(this.node,_7fe+_7fd,_7fe+this[_7ff]);
this[_7ff]=_7fd;
},_addItemClass:function(node,type){
_7f9.add(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
_7f9.remove(node,"dojoDndItem"+type);
},onOverEvent:function(){
this._changeState("Container","Over");
},onOutEvent:function(){
this._changeState("Container","");
}});
});
},"dijit/_base/wai":function(){
define(["dojo/dom-attr","dojo/_base/lang","../main","../hccss"],function(_800,lang,_801){
var _802={hasWaiRole:function(elem,role){
var _803=this.getWaiRole(elem);
return role?(_803.indexOf(role)>-1):(_803.length>0);
},getWaiRole:function(elem){
return lang.trim((_800.get(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
_800.set(elem,"role",role);
},removeWaiRole:function(elem,role){
var _804=_800.get(elem,"role");
if(!_804){
return;
}
if(role){
var t=lang.trim((" "+_804+" ").replace(" "+role+" "," "));
_800.set(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_805){
return elem.hasAttribute?elem.hasAttribute("aria-"+_805):!!elem.getAttribute("aria-"+_805);
},getWaiState:function(elem,_806){
return elem.getAttribute("aria-"+_806)||"";
},setWaiState:function(elem,_807,_808){
elem.setAttribute("aria-"+_807,_808);
},removeWaiState:function(elem,_809){
elem.removeAttribute("aria-"+_809);
}};
lang.mixin(_801,_802);
return _801;
});
},"dijit/_editor/range":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/_base/lang"],function(_80a,_80b,lang){
var _80c={getIndex:function(node,_80d){
var ret=[],retR=[];
var _80e=node;
var _80f,n;
while(node!=_80d){
var i=0;
_80f=node.parentNode;
while((n=_80f.childNodes[i++])){
if(n===node){
--i;
break;
}
}
ret.unshift(i);
retR.unshift(i-_80f.childNodes.length);
node=_80f;
}
if(ret.length>0&&_80e.nodeType==3){
n=_80e.previousSibling;
while(n&&n.nodeType==3){
ret[ret.length-1]--;
n=n.previousSibling;
}
n=_80e.nextSibling;
while(n&&n.nodeType==3){
retR[retR.length-1]++;
n=n.nextSibling;
}
}
return {o:ret,r:retR};
},getNode:function(_810,_811){
if(!lang.isArray(_810)||_810.length==0){
return _811;
}
var node=_811;
_80a.every(_810,function(i){
if(i>=0&&i<node.childNodes.length){
node=node.childNodes[i];
}else{
node=null;
return false;
}
return true;
});
return node;
},getCommonAncestor:function(n1,n2,root){
root=root||n1.ownerDocument.body;
var _812=function(n){
var as=[];
while(n){
as.unshift(n);
if(n!==root){
n=n.parentNode;
}else{
break;
}
}
return as;
};
var n1as=_812(n1);
var n2as=_812(n2);
var m=Math.min(n1as.length,n2as.length);
var com=n1as[0];
for(var i=1;i<m;i++){
if(n1as[i]===n2as[i]){
com=n1as[i];
}else{
break;
}
}
return com;
},getAncestor:function(node,_813,root){
root=root||node.ownerDocument.body;
while(node&&node!==root){
var name=node.nodeName.toUpperCase();
if(_813.test(name)){
return node;
}
node=node.parentNode;
}
return null;
},BlockTagNames:/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/,getBlockAncestor:function(node,_814,root){
root=root||node.ownerDocument.body;
_814=_814||_80c.BlockTagNames;
var _815=null,_816;
while(node&&node!==root){
var name=node.nodeName.toUpperCase();
if(!_815&&_814.test(name)){
_815=node;
}
if(!_816&&(/^(?:BODY|TD|TH|CAPTION)$/).test(name)){
_816=node;
}
node=node.parentNode;
}
return {blockNode:_815,blockContainer:_816||node.ownerDocument.body};
},atBeginningOfContainer:function(_817,node,_818){
var _819=false;
var _81a=(_818==0);
if(!_81a&&node.nodeType==3){
if(/^[\s\xA0]+$/.test(node.nodeValue.substr(0,_818))){
_81a=true;
}
}
if(_81a){
var _81b=node;
_819=true;
while(_81b&&_81b!==_817){
if(_81b.previousSibling){
_819=false;
break;
}
_81b=_81b.parentNode;
}
}
return _819;
},atEndOfContainer:function(_81c,node,_81d){
var _81e=false;
var _81f=(_81d==(node.length||node.childNodes.length));
if(!_81f&&node.nodeType==3){
if(/^[\s\xA0]+$/.test(node.nodeValue.substr(_81d))){
_81f=true;
}
}
if(_81f){
var _820=node;
_81e=true;
while(_820&&_820!==_81c){
if(_820.nextSibling){
_81e=false;
break;
}
_820=_820.parentNode;
}
}
return _81e;
},adjacentNoneTextNode:function(_821,next){
var node=_821;
var len=(0-_821.length)||0;
var prop=next?"nextSibling":"previousSibling";
while(node){
if(node.nodeType!=3){
break;
}
len+=node.length;
node=node[prop];
}
return [node,len];
},create:function(win){
win=win||window;
if(win.getSelection){
return win.document.createRange();
}else{
return new _822();
}
},getSelection:function(_823,_824){
if(_823.getSelection){
return _823.getSelection();
}else{
var s=new ie.selection(_823);
if(!_824){
s._getCurrentSelection();
}
return s;
}
}};
if(!window.getSelection){
var ie=_80c.ie={cachedSelection:{},selection:function(_825){
this._ranges=[];
this.addRange=function(r,_826){
this._ranges.push(r);
if(!_826){
r._select();
}
this.rangeCount=this._ranges.length;
};
this.removeAllRanges=function(){
this._ranges=[];
this.rangeCount=0;
};
var _827=function(){
var r=_825.document.selection.createRange();
var type=_825.document.selection.type.toUpperCase();
if(type=="CONTROL"){
return new _822(ie.decomposeControlRange(r));
}else{
return new _822(ie.decomposeTextRange(r));
}
};
this.getRangeAt=function(i){
return this._ranges[i];
};
this._getCurrentSelection=function(){
this.removeAllRanges();
var r=_827();
if(r){
this.addRange(r,true);
this.isCollapsed=r.collapsed;
}else{
this.isCollapsed=true;
}
};
},decomposeControlRange:function(_828){
var _829=_828.item(0),_82a=_828.item(_828.length-1);
var _82b=_829.parentNode,_82c=_82a.parentNode;
var _82d=_80c.getIndex(_829,_82b).o[0];
var _82e=_80c.getIndex(_82a,_82c).o[0]+1;
return [_82b,_82d,_82c,_82e];
},getEndPoint:function(_82f,end){
var _830=_82f.duplicate();
_830.collapse(!end);
var _831="EndTo"+(end?"End":"Start");
var _832=_830.parentElement();
var _833,_834,_835;
if(_832.childNodes.length>0){
_80a.every(_832.childNodes,function(node,i){
var _836;
if(node.nodeType!=3){
_830.moveToElementText(node);
if(_830.compareEndPoints(_831,_82f)>0){
if(_835&&_835.nodeType==3){
_833=_835;
_836=true;
}else{
_833=_832;
_834=i;
return false;
}
}else{
if(i==_832.childNodes.length-1){
_833=_832;
_834=_832.childNodes.length;
return false;
}
}
}else{
if(i==_832.childNodes.length-1){
_833=node;
_836=true;
}
}
if(_836&&_833){
var _837=_80c.adjacentNoneTextNode(_833)[0];
if(_837){
_833=_837.nextSibling;
}else{
_833=_832.firstChild;
}
var _838=_80c.adjacentNoneTextNode(_833);
_837=_838[0];
var _839=_838[1];
if(_837){
_830.moveToElementText(_837);
_830.collapse(false);
}else{
_830.moveToElementText(_832);
}
_830.setEndPoint(_831,_82f);
_834=_830.text.length-_839;
return false;
}
_835=node;
return true;
});
}else{
_833=_832;
_834=0;
}
if(!end&&_833.nodeType==1&&_834==_833.childNodes.length){
var _83a=_833.nextSibling;
if(_83a&&_83a.nodeType==3){
_833=_83a;
_834=0;
}
}
return [_833,_834];
},setEndPoint:function(_83b,_83c,_83d){
var _83e=_83b.duplicate(),node,len;
if(_83c.nodeType!=3){
if(_83d>0){
node=_83c.childNodes[_83d-1];
if(node){
if(node.nodeType==3){
_83c=node;
_83d=node.length;
}else{
if(node.nextSibling&&node.nextSibling.nodeType==3){
_83c=node.nextSibling;
_83d=0;
}else{
_83e.moveToElementText(node.nextSibling?node:_83c);
var _83f=node.parentNode;
var _840=_83f.insertBefore(node.ownerDocument.createTextNode(" "),node.nextSibling);
_83e.collapse(false);
_83f.removeChild(_840);
}
}
}
}else{
_83e.moveToElementText(_83c);
_83e.collapse(true);
}
}
if(_83c.nodeType==3){
var _841=_80c.adjacentNoneTextNode(_83c);
var _842=_841[0];
len=_841[1];
if(_842){
_83e.moveToElementText(_842);
_83e.collapse(false);
if(_842.contentEditable!="inherit"){
len++;
}
}else{
_83e.moveToElementText(_83c.parentNode);
_83e.collapse(true);
_83e.move("character",1);
_83e.move("character",-1);
}
_83d+=len;
if(_83d>0){
if(_83e.move("character",_83d)!=_83d){
console.error("Error when moving!");
}
}
}
return _83e;
},decomposeTextRange:function(_843){
var _844=ie.getEndPoint(_843);
var _845=_844[0],_846=_844[1];
var _847=_844[0],_848=_844[1];
if(_843.htmlText.length){
if(_843.htmlText==_843.text){
_848=_846+_843.text.length;
}else{
_844=ie.getEndPoint(_843,true);
_847=_844[0],_848=_844[1];
}
}
return [_845,_846,_847,_848];
},setRange:function(_849,_84a,_84b,_84c,_84d,_84e){
var _84f=ie.setEndPoint(_849,_84a,_84b);
_849.setEndPoint("StartToStart",_84f);
if(!_84e){
var end=ie.setEndPoint(_849,_84c,_84d);
}
_849.setEndPoint("EndToEnd",end||_84f);
return _849;
}};
var _822=_80c.W3CRange=_80b(null,{constructor:function(){
if(arguments.length>0){
this.setStart(arguments[0][0],arguments[0][1]);
this.setEnd(arguments[0][2],arguments[0][3]);
}else{
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true;
}
},_updateInternal:function(){
if(this.startContainer!==this.endContainer){
this.commonAncestorContainer=_80c.getCommonAncestor(this.startContainer,this.endContainer);
}else{
this.commonAncestorContainer=this.startContainer;
}
this.collapsed=(this.startContainer===this.endContainer)&&(this.startOffset==this.endOffset);
},setStart:function(node,_850){
_850=parseInt(_850);
if(this.startContainer===node&&this.startOffset==_850){
return;
}
delete this._cachedBookmark;
this.startContainer=node;
this.startOffset=_850;
if(!this.endContainer){
this.setEnd(node,_850);
}else{
this._updateInternal();
}
},setEnd:function(node,_851){
_851=parseInt(_851);
if(this.endContainer===node&&this.endOffset==_851){
return;
}
delete this._cachedBookmark;
this.endContainer=node;
this.endOffset=_851;
if(!this.startContainer){
this.setStart(node,_851);
}else{
this._updateInternal();
}
},setStartAfter:function(node,_852){
this._setPoint("setStart",node,_852,1);
},setStartBefore:function(node,_853){
this._setPoint("setStart",node,_853,0);
},setEndAfter:function(node,_854){
this._setPoint("setEnd",node,_854,1);
},setEndBefore:function(node,_855){
this._setPoint("setEnd",node,_855,0);
},_setPoint:function(what,node,_856,ext){
var _857=_80c.getIndex(node,node.parentNode).o;
this[what](node.parentNode,_857.pop()+ext);
},_getIERange:function(){
var r=(this._body||this.endContainer.ownerDocument.body).createTextRange();
ie.setRange(r,this.startContainer,this.startOffset,this.endContainer,this.endOffset,this.collapsed);
return r;
},getBookmark:function(){
this._getIERange();
return this._cachedBookmark;
},_select:function(){
var r=this._getIERange();
r.select();
},deleteContents:function(){
var s=this.startContainer,r=this._getIERange();
if(s.nodeType===3&&!this.startOffset){
this.setStartBefore(s);
}
r.pasteHTML("");
this.endContainer=this.startContainer;
this.endOffset=this.startOffset;
this.collapsed=true;
},cloneRange:function(){
var r=new _822([this.startContainer,this.startOffset,this.endContainer,this.endOffset]);
r._body=this._body;
return r;
},detach:function(){
this._body=null;
this.commonAncestorContainer=null;
this.startContainer=null;
this.startOffset=0;
this.endContainer=null;
this.endOffset=0;
this.collapsed=true;
}});
}
lang.setObject("dijit.range",_80c);
return _80c;
});
},"dijit/_KeyNavMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/keys","dojo/_base/lang","dojo/on","dijit/registry","dijit/_FocusMixin"],function(_858,_859,_85a,keys,lang,on,_85b,_85c){
return _859("dijit._KeyNavMixin",_85c,{tabIndex:"0",childSelector:null,postCreate:function(){
this.inherited(arguments);
_85a.set(this.domNode,"tabIndex",this.tabIndex);
if(!this._keyNavCodes){
var _85d=this._keyNavCodes={};
_85d[keys.HOME]=lang.hitch(this,"focusFirstChild");
_85d[keys.END]=lang.hitch(this,"focusLastChild");
_85d[this.isLeftToRight()?keys.LEFT_ARROW:keys.RIGHT_ARROW]=lang.hitch(this,"_onLeftArrow");
_85d[this.isLeftToRight()?keys.RIGHT_ARROW:keys.LEFT_ARROW]=lang.hitch(this,"_onRightArrow");
_85d[keys.UP_ARROW]=lang.hitch(this,"_onUpArrow");
_85d[keys.DOWN_ARROW]=lang.hitch(this,"_onDownArrow");
}
var self=this,_85e=typeof this.childSelector=="string"?this.childSelector:lang.hitch(this,"childSelector");
this.own(on(this.domNode,"keypress",lang.hitch(this,"_onContainerKeypress")),on(this.domNode,"keydown",lang.hitch(this,"_onContainerKeydown")),on(this.domNode,"focus",lang.hitch(this,"_onContainerFocus")),on(this.containerNode,on.selector(_85e,"focusin"),function(evt){
self._onChildFocus(_85b.getEnclosingWidget(this),evt);
}));
},_onLeftArrow:function(){
},_onRightArrow:function(){
},_onUpArrow:function(){
},_onDownArrow:function(){
},focus:function(){
this.focusFirstChild();
},_getFirstFocusableChild:function(){
return this._getNextFocusableChild(null,1);
},_getLastFocusableChild:function(){
return this._getNextFocusableChild(null,-1);
},focusFirstChild:function(){
this.focusChild(this._getFirstFocusableChild());
},focusLastChild:function(){
this.focusChild(this._getLastFocusableChild());
},focusChild:function(_85f,last){
if(!_85f){
return;
}
if(this.focusedChild&&_85f!==this.focusedChild){
this._onChildBlur(this.focusedChild);
}
_85f.set("tabIndex",this.tabIndex);
_85f.focus(last?"end":"start");
},_onContainerFocus:function(evt){
if(evt.target!==this.domNode||this.focusedChild){
return;
}
this.focus();
},_onFocus:function(){
_85a.set(this.domNode,"tabIndex","-1");
this.inherited(arguments);
},_onBlur:function(evt){
_85a.set(this.domNode,"tabIndex",this.tabIndex);
if(this.focusedChild){
this.focusedChild.set("tabIndex","-1");
this.lastFocusedChild=this.focusedChild;
this._set("focusedChild",null);
}
this.inherited(arguments);
},_onChildFocus:function(_860){
if(_860&&_860!=this.focusedChild){
if(this.focusedChild&&!this.focusedChild._destroyed){
this.focusedChild.set("tabIndex","-1");
}
_860.set("tabIndex",this.tabIndex);
this.lastFocused=_860;
this._set("focusedChild",_860);
}
},_searchString:"",multiCharSearchDuration:1000,onKeyboardSearch:function(item,evt,_861,_862){
if(item){
this.focusChild(item);
}
},_keyboardSearchCompare:function(item,_863){
var _864=item.domNode,text=item.label||(_864.focusNode?_864.focusNode.label:"")||_864.innerText||_864.textContent||"",_865=text.replace(/^\s+/,"").substr(0,_863.length).toLowerCase();
return (!!_863.length&&_865==_863)?-1:0;
},_onContainerKeydown:function(evt){
var func=this._keyNavCodes[evt.keyCode];
if(func){
func(evt,this.focusedChild);
evt.stopPropagation();
evt.preventDefault();
this._searchString="";
}else{
if(evt.keyCode==keys.SPACE&&this._searchTimer&&!(evt.ctrlKey||evt.altKey||evt.metaKey)){
evt.stopImmediatePropagation();
evt.preventDefault();
this._keyboardSearch(evt," ");
}
}
},_onContainerKeypress:function(evt){
if(evt.charCode<keys.SPACE||evt.ctrlKey||evt.altKey||evt.metaKey||(evt.charCode==keys.SPACE&&this._searchTimer)){
return;
}
evt.preventDefault();
evt.stopPropagation();
this._keyboardSearch(evt,String.fromCharCode(evt.charCode).toLowerCase());
},_keyboardSearch:function(evt,_866){
var _867=null,_868,_869=0,_86a=lang.hitch(this,function(){
if(this._searchTimer){
this._searchTimer.remove();
}
this._searchString+=_866;
var _86b=/^(.)\1*$/.test(this._searchString);
var _86c=_86b?1:this._searchString.length;
_868=this._searchString.substr(0,_86c);
this._searchTimer=this.defer(function(){
this._searchTimer=null;
this._searchString="";
},this.multiCharSearchDuration);
var _86d=this.focusedChild||null;
if(_86c==1||!_86d){
_86d=this._getNextFocusableChild(_86d,1);
if(!_86d){
return;
}
}
var stop=_86d;
do{
var rc=this._keyboardSearchCompare(_86d,_868);
if(!!rc&&_869++==0){
_867=_86d;
}
if(rc==-1){
_869=-1;
break;
}
_86d=this._getNextFocusableChild(_86d,1);
}while(_86d!=stop);
});
_86a();
this.onKeyboardSearch(_867,evt,_868,_869);
},_onChildBlur:function(){
},_getNextFocusableChild:function(_86e,dir){
var _86f=_86e;
do{
if(!_86e){
_86e=this[dir>0?"_getFirst":"_getLast"]();
if(!_86e){
break;
}
}else{
_86e=this._getNext(_86e,dir);
}
if(_86e!=null&&_86e!=_86f&&_86e.isFocusable()){
return _86e;
}
}while(_86e!=_86f);
return null;
},_getFirst:function(){
return null;
},_getLast:function(){
return null;
},_getNext:function(_870,dir){
if(_870){
_870=_870.domNode;
while(_870){
_870=_870[dir<0?"previousSibling":"nextSibling"];
if(_870&&"getAttribute" in _870){
var w=_85b.byNode(_870);
if(w){
return w;
}
}
}
}
return null;
}});
});
},"dojo/store/util/QueryResults":function(){
define(["../../_base/array","../../_base/lang","../../when"],function(_871,lang,when){
var _872=function(_873){
if(!_873){
return _873;
}
if(_873.then){
_873=lang.delegate(_873);
}
function _874(_875){
if(!_873[_875]){
_873[_875]=function(){
var args=arguments;
return when(_873,function(_876){
Array.prototype.unshift.call(args,_876);
return _872(_871[_875].apply(_871,args));
});
};
}
};
_874("forEach");
_874("filter");
_874("map");
if(!_873.total){
_873.total=when(_873,function(_877){
return _877.length;
});
}
return _873;
};
lang.setObject("dojo.store.util.QueryResults",_872);
return _872;
});
},"dijit/form/_ListBase":function(){
define(["dojo/_base/declare","dojo/on","dojo/window"],function(_878,on,_879){
return _878("dijit.form._ListBase",null,{selected:null,_listConnect:function(_87a,_87b){
var self=this;
return self.own(on(self.containerNode,on.selector(function(_87c,_87d,_87e){
return _87c.parentNode==_87e;
},_87a),function(evt){
if(!/^touch/.test(evt.type)){
evt.preventDefault();
}
self[_87b](evt,this);
}));
},selectFirstNode:function(){
var _87f=this.containerNode.firstChild;
while(_87f&&_87f.style.display=="none"){
_87f=_87f.nextSibling;
}
this._setSelectedAttr(_87f);
},selectLastNode:function(){
var last=this.containerNode.lastChild;
while(last&&last.style.display=="none"){
last=last.previousSibling;
}
this._setSelectedAttr(last);
},selectNextNode:function(){
var _880=this.selected;
if(!_880){
this.selectFirstNode();
}else{
var next=_880.nextSibling;
while(next&&next.style.display=="none"){
next=next.nextSibling;
}
if(!next){
this.selectFirstNode();
}else{
this._setSelectedAttr(next);
}
}
},selectPreviousNode:function(){
var _881=this.selected;
if(!_881){
this.selectLastNode();
}else{
var prev=_881.previousSibling;
while(prev&&prev.style.display=="none"){
prev=prev.previousSibling;
}
if(!prev){
this.selectLastNode();
}else{
this._setSelectedAttr(prev);
}
}
},_setSelectedAttr:function(node){
if(this.selected!=node){
var _882=this.selected;
if(_882){
this.onDeselect(_882);
}
if(node){
_879.scrollIntoView(node);
this.onSelect(node);
}
this._set("selected",node);
}else{
if(node){
this.onSelect(node);
}
}
}});
});
},"dijit/form/_FormWidget":function(){
define(["dojo/_base/declare","dojo/sniff","dojo/_base/kernel","dojo/ready","../_Widget","../_CssStateMixin","../_TemplatedMixin","./_FormWidgetMixin"],function(_883,has,_884,_885,_886,_887,_888,_889){
if(has("dijit-legacy-requires")){
_885(0,function(){
var _88a=["dijit/form/_FormValueWidget"];
require(_88a);
});
}
return _883("dijit.form._FormWidget",[_886,_888,_887,_889],{setDisabled:function(_88b){
_884.deprecated("setDisabled("+_88b+") is deprecated. Use set('disabled',"+_88b+") instead.","","2.0");
this.set("disabled",_88b);
},setValue:function(_88c){
_884.deprecated("dijit.form._FormWidget:setValue("+_88c+") is deprecated.  Use set('value',"+_88c+") instead.","","2.0");
this.set("value",_88c);
},getValue:function(){
_884.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},postMixInProperties:function(){
this.nameAttrSetting=(this.name&&!has("msapp"))?("name=\""+this.name.replace(/"/g,"&quot;")+"\""):"";
this.inherited(arguments);
},_setTypeAttr:null});
});
},"dojo/dnd/common":function(){
define(["../sniff","../_base/kernel","../_base/lang","../dom"],function(has,_88d,lang,dom){
var _88e=lang.getObject("dojo.dnd",true);
_88e.getCopyKeyState=function(evt){
return evt[has("mac")?"metaKey":"ctrlKey"];
};
_88e._uniqueId=0;
_88e.getUniqueId=function(){
var id;
do{
id=_88d._scopeName+"Unique"+(++_88e._uniqueId);
}while(dom.byId(id));
return id;
};
_88e._empty={};
_88e.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " a button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
return _88e;
});
},"dijit/CheckedMenuItem":function(){
define(["dojo/_base/declare","dojo/dom-class","./MenuItem","dojo/text!./templates/CheckedMenuItem.html","./hccss"],function(_88f,_890,_891,_892){
return _88f("dijit.CheckedMenuItem",_891,{baseClass:"dijitMenuItem dijitCheckedMenuItem",templateString:_892,checked:false,_setCheckedAttr:function(_893){
this.domNode.setAttribute("aria-checked",_893?"true":"false");
this._set("checked",_893);
},iconClass:"",role:"menuitemcheckbox",checkedChar:"&#10003;",onChange:function(){
},_onClick:function(evt){
if(!this.disabled){
this.set("checked",!this.checked);
this.onChange(this.checked);
}
this.onClick(evt);
}});
});
},"dijit/Viewport":function(){
define(["dojo/Evented","dojo/on","dojo/domReady","dojo/sniff","dojo/window"],function(_894,on,_895,has,_896){
var _897=new _894();
var _898;
_895(function(){
var _899=_896.getBox();
_897._rlh=on(window,"resize",function(){
var _89a=_896.getBox();
if(_899.h==_89a.h&&_899.w==_89a.w){
return;
}
_899=_89a;
_897.emit("resize");
});
if(has("ie")==8){
var _89b=screen.deviceXDPI;
setInterval(function(){
if(screen.deviceXDPI!=_89b){
_89b=screen.deviceXDPI;
_897.emit("resize");
}
},500);
}
if(has("ios")){
on(document,"focusin",function(evt){
_898=evt.target;
});
on(document,"focusout",function(evt){
_898=null;
});
}
});
_897.getEffectiveBox=function(doc){
var box=_896.getBox(doc);
var tag=_898&&_898.tagName&&_898.tagName.toLowerCase();
if(has("ios")&&_898&&!_898.readOnly&&(tag=="textarea"||(tag=="input"&&/^(color|email|number|password|search|tel|text|url)$/.test(_898.type)))){
box.h*=(orientation==0||orientation==180?0.66:0.4);
var rect=_898.getBoundingClientRect();
box.h=Math.max(box.h,rect.top+rect.height);
}
return box;
};
return _897;
});
},"dijit/_base/place":function(){
define(["dojo/_base/array","dojo/_base/lang","dojo/window","../place","../main"],function(_89c,lang,_89d,_89e,_89f){
var _8a0={};
_8a0.getViewport=function(){
return _89d.getBox();
};
_8a0.placeOnScreen=_89e.at;
_8a0.placeOnScreenAroundElement=function(node,_8a1,_8a2,_8a3){
var _8a4;
if(lang.isArray(_8a2)){
_8a4=_8a2;
}else{
_8a4=[];
for(var key in _8a2){
_8a4.push({aroundCorner:key,corner:_8a2[key]});
}
}
return _89e.around(node,_8a1,_8a4,true,_8a3);
};
_8a0.placeOnScreenAroundNode=_8a0.placeOnScreenAroundElement;
_8a0.placeOnScreenAroundRectangle=_8a0.placeOnScreenAroundElement;
_8a0.getPopupAroundAlignment=function(_8a5,_8a6){
var _8a7={};
_89c.forEach(_8a5,function(pos){
var ltr=_8a6;
switch(pos){
case "after":
_8a7[_8a6?"BR":"BL"]=_8a6?"BL":"BR";
break;
case "before":
_8a7[_8a6?"BL":"BR"]=_8a6?"BR":"BL";
break;
case "below-alt":
ltr=!ltr;
case "below":
_8a7[ltr?"BL":"BR"]=ltr?"TL":"TR";
_8a7[ltr?"BR":"BL"]=ltr?"TR":"TL";
break;
case "above-alt":
ltr=!ltr;
case "above":
default:
_8a7[ltr?"TL":"TR"]=ltr?"BL":"BR";
_8a7[ltr?"TR":"TL"]=ltr?"BR":"BL";
break;
}
});
return _8a7;
};
lang.mixin(_89f,_8a0);
return _89f;
});
},"dijit/form/_ComboBoxMenu":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/dom-style","dojo/keys","../_WidgetBase","../_TemplatedMixin","./_ComboBoxMenuMixin","./_ListMouseMixin"],function(_8a8,_8a9,_8aa,keys,_8ab,_8ac,_8ad,_8ae){
return _8a8("dijit.form._ComboBoxMenu",[_8ab,_8ac,_8ae,_8ad],{templateString:"<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;' role='listbox'>"+"<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>"+"<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>"+"</div>",baseClass:"dijitComboBoxMenu",postCreate:function(){
this.inherited(arguments);
if(!this.isLeftToRight()){
_8a9.add(this.previousButton,"dijitMenuItemRtl");
_8a9.add(this.nextButton,"dijitMenuItemRtl");
}
this.containerNode.setAttribute("role","listbox");
},_createMenuItem:function(){
var item=this.ownerDocument.createElement("div");
item.className="dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl");
item.setAttribute("role","option");
return item;
},onHover:function(node){
_8a9.add(node,"dijitMenuItemHover");
},onUnhover:function(node){
_8a9.remove(node,"dijitMenuItemHover");
},onSelect:function(node){
_8a9.add(node,"dijitMenuItemSelected");
},onDeselect:function(node){
_8a9.remove(node,"dijitMenuItemSelected");
},_page:function(up){
var _8af=0;
var _8b0=this.domNode.scrollTop;
var _8b1=_8aa.get(this.domNode,"height");
if(!this.getHighlightedOption()){
this.selectNextNode();
}
while(_8af<_8b1){
var _8b2=this.getHighlightedOption();
if(up){
if(!_8b2.previousSibling||_8b2.previousSibling.style.display=="none"){
break;
}
this.selectPreviousNode();
}else{
if(!_8b2.nextSibling||_8b2.nextSibling.style.display=="none"){
break;
}
this.selectNextNode();
}
var _8b3=this.domNode.scrollTop;
_8af+=(_8b3-_8b0)*(up?-1:1);
_8b0=_8b3;
}
},handleKey:function(evt){
switch(evt.keyCode){
case keys.DOWN_ARROW:
this.selectNextNode();
return false;
case keys.PAGE_DOWN:
this._page(false);
return false;
case keys.UP_ARROW:
this.selectPreviousNode();
return false;
case keys.PAGE_UP:
this._page(true);
return false;
default:
return true;
}
}});
});
},"dijit/Dialog":function(){
define(["require","dojo/_base/array","dojo/aspect","dojo/_base/declare","dojo/Deferred","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/i18n","dojo/keys","dojo/_base/lang","dojo/on","dojo/ready","dojo/sniff","dojo/window","dojo/dnd/Moveable","dojo/dnd/TimedMoveable","./focus","./_base/manager","./_Widget","./_TemplatedMixin","./_CssStateMixin","./form/_FormMixin","./_DialogMixin","./DialogUnderlay","./layout/ContentPane","dojo/text!./templates/Dialog.html","dojo/i18n!./nls/common"],function(_8b4,_8b5,_8b6,_8b7,_8b8,dom,_8b9,_8ba,_8bb,fx,i18n,keys,lang,on,_8bc,has,_8bd,_8be,_8bf,_8c0,_8c1,_8c2,_8c3,_8c4,_8c5,_8c6,_8c7,_8c8,_8c9){
var _8ca=_8b7("dijit._DialogBase"+(has("dojo-bidi")?"_NoBidi":""),[_8c3,_8c5,_8c6,_8c4],{templateString:_8c9,baseClass:"dijitDialog",cssStateNodes:{closeButtonNode:"dijitDialogCloseIcon"},_setTitleAttr:{node:"titleNode",type:"innerHTML"},open:false,duration:_8c1.defaultDuration,refocus:true,autofocus:true,_firstFocusItem:null,_lastFocusItem:null,doLayout:false,draggable:true,_setDraggableAttr:function(val){
this._set("draggable",val);
},maxRatio:0.9,closable:true,_setClosableAttr:function(val){
this.closeButtonNode.style.display=val?"":"none";
this._set("closable",val);
},postMixInProperties:function(){
var _8cb=i18n.getLocalization("dijit","common");
lang.mixin(this,_8cb);
this.inherited(arguments);
},postCreate:function(){
_8bb.set(this.domNode,{display:"none",position:"absolute"});
this.ownerDocumentBody.appendChild(this.domNode);
this.inherited(arguments);
_8b6.after(this,"onExecute",lang.hitch(this,"hide"),true);
_8b6.after(this,"onCancel",lang.hitch(this,"hide"),true);
this._modalconnects=[];
},onLoad:function(){
this._size();
this._position();
if(this.autofocus&&_8cc.isTop(this)){
this._getFocusItems(this.domNode);
_8c0.focus(this._firstFocusItem);
}
this.inherited(arguments);
},focus:function(){
this._getFocusItems(this.domNode);
_8c0.focus(this._firstFocusItem);
},_endDrag:function(){
var _8cd=_8ba.position(this.domNode),_8ce=_8bd.getBox(this.ownerDocument);
_8cd.y=Math.min(Math.max(_8cd.y,0),(_8ce.h-_8cd.h));
_8cd.x=Math.min(Math.max(_8cd.x,0),(_8ce.w-_8cd.w));
this._relativePosition=_8cd;
this._position();
},_setup:function(){
var node=this.domNode;
if(this.titleBar&&this.draggable){
this._moveable=new ((has("ie")==6)?_8bf:_8be)(node,{handle:this.titleBar});
_8b6.after(this._moveable,"onMoveStop",lang.hitch(this,"_endDrag"),true);
}else{
_8b9.add(node,"dijitDialogFixed");
}
this.underlayAttrs={dialogId:this.id,"class":_8b5.map(this["class"].split(/\s/),function(s){
return s+"_underlay";
}).join(" "),_onKeyDown:lang.hitch(this,"_onKey"),ownerDocument:this.ownerDocument};
},_size:function(){
this._checkIfSingleChild();
if(this._singleChild){
if(typeof this._singleChildOriginalStyle!="undefined"){
this._singleChild.domNode.style.cssText=this._singleChildOriginalStyle;
delete this._singleChildOriginalStyle;
}
}else{
_8bb.set(this.containerNode,{width:"auto",height:"auto"});
}
var bb=_8ba.position(this.domNode);
var _8cf=_8bd.getBox(this.ownerDocument);
_8cf.w*=this.maxRatio;
_8cf.h*=this.maxRatio;
if(bb.w>=_8cf.w||bb.h>=_8cf.h){
var _8d0=_8ba.position(this.containerNode),w=Math.min(bb.w,_8cf.w)-(bb.w-_8d0.w),h=Math.min(bb.h,_8cf.h)-(bb.h-_8d0.h);
if(this._singleChild&&this._singleChild.resize){
if(typeof this._singleChildOriginalStyle=="undefined"){
this._singleChildOriginalStyle=this._singleChild.domNode.style.cssText;
}
this._singleChild.resize({w:w,h:h});
}else{
_8bb.set(this.containerNode,{width:w+"px",height:h+"px",overflow:"auto",position:"relative"});
}
}else{
if(this._singleChild&&this._singleChild.resize){
this._singleChild.resize();
}
}
},_position:function(){
if(!_8b9.contains(this.ownerDocumentBody,"dojoMove")){
var node=this.domNode,_8d1=_8bd.getBox(this.ownerDocument),p=this._relativePosition,bb=p?null:_8ba.position(node),l=Math.floor(_8d1.l+(p?p.x:(_8d1.w-bb.w)/2)),t=Math.floor(_8d1.t+(p?p.y:(_8d1.h-bb.h)/2));
_8bb.set(node,{left:l+"px",top:t+"px"});
}
},_onKey:function(evt){
if(evt.keyCode==keys.TAB){
this._getFocusItems(this.domNode);
var node=evt.target;
if(this._firstFocusItem==this._lastFocusItem){
evt.stopPropagation();
evt.preventDefault();
}else{
if(node==this._firstFocusItem&&evt.shiftKey){
_8c0.focus(this._lastFocusItem);
evt.stopPropagation();
evt.preventDefault();
}else{
if(node==this._lastFocusItem&&!evt.shiftKey){
_8c0.focus(this._firstFocusItem);
evt.stopPropagation();
evt.preventDefault();
}
}
}
}else{
if(this.closable&&evt.keyCode==keys.ESCAPE){
this.onCancel();
evt.stopPropagation();
evt.preventDefault();
}
}
},show:function(){
if(this.open){
return;
}
if(!this._started){
this.startup();
}
if(!this._alreadyInitialized){
this._setup();
this._alreadyInitialized=true;
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
_8cc.hide(this);
}
var win=_8bd.get(this.ownerDocument);
this._modalconnects.push(on(win,"scroll",lang.hitch(this,"resize")));
this._modalconnects.push(on(this.domNode,"keydown",lang.hitch(this,"_onKey")));
_8bb.set(this.domNode,{opacity:0,display:""});
this._set("open",true);
this._onShow();
this._size();
this._position();
var _8d2;
this._fadeInDeferred=new _8b8(lang.hitch(this,function(){
_8d2.stop();
delete this._fadeInDeferred;
}));
var _8d3=this._fadeInDeferred.promise;
_8d2=fx.fadeIn({node:this.domNode,duration:this.duration,beforeBegin:lang.hitch(this,function(){
_8cc.show(this,this.underlayAttrs);
}),onEnd:lang.hitch(this,function(){
if(this.autofocus&&_8cc.isTop(this)){
this._getFocusItems(this.domNode);
_8c0.focus(this._firstFocusItem);
}
this._fadeInDeferred.resolve(true);
delete this._fadeInDeferred;
})}).play();
return _8d3;
},hide:function(){
if(!this._alreadyInitialized||!this.open){
return;
}
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
var _8d4;
this._fadeOutDeferred=new _8b8(lang.hitch(this,function(){
_8d4.stop();
delete this._fadeOutDeferred;
}));
this._fadeOutDeferred.then(lang.hitch(this,"onHide"));
var _8d5=this._fadeOutDeferred.promise;
_8d4=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:lang.hitch(this,function(){
this.domNode.style.display="none";
_8cc.hide(this);
this._fadeOutDeferred.resolve(true);
delete this._fadeOutDeferred;
})}).play();
if(this._scrollConnected){
this._scrollConnected=false;
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
if(this._relativePosition){
delete this._relativePosition;
}
this._set("open",false);
return _8d5;
},resize:function(){
if(this.domNode.style.display!="none"){
this._size();
if(!has("touch")){
this._position();
}
}
},destroy:function(){
if(this._fadeInDeferred){
this._fadeInDeferred.cancel();
}
if(this._fadeOutDeferred){
this._fadeOutDeferred.cancel();
}
if(this._moveable){
this._moveable.destroy();
}
var h;
while(h=this._modalconnects.pop()){
h.remove();
}
_8cc.hide(this);
this.inherited(arguments);
}});
if(has("dojo-bidi")){
_8ca=_8b7("dijit._DialogBase",_8ca,{_setTitleAttr:function(_8d6){
this._set("title",_8d6);
this.titleNode.innerHTML=_8d6;
this.applyTextDir(this.titleNode);
},_setTextDirAttr:function(_8d7){
if(this._created&&this.textDir!=_8d7){
this._set("textDir",_8d7);
this.set("title",this.title);
}
}});
}
var _8d8=_8b7("dijit.Dialog",[_8c8,_8ca],{});
_8d8._DialogBase=_8ca;
var _8cc=_8d8._DialogLevelManager={_beginZIndex:950,show:function(_8d9,_8da){
ds[ds.length-1].focus=_8c0.curNode;
var _8db=ds[ds.length-1].dialog?ds[ds.length-1].zIndex+2:_8d8._DialogLevelManager._beginZIndex;
_8bb.set(_8d9.domNode,"zIndex",_8db);
_8c7.show(_8da,_8db-1);
ds.push({dialog:_8d9,underlayAttrs:_8da,zIndex:_8db});
},hide:function(_8dc){
if(ds[ds.length-1].dialog==_8dc){
ds.pop();
var pd=ds[ds.length-1];
if(ds.length==1){
_8c7.hide();
}else{
_8c7.show(pd.underlayAttrs,pd.zIndex-1);
}
if(_8dc.refocus){
var _8dd=pd.focus;
if(pd.dialog&&(!_8dd||!dom.isDescendant(_8dd,pd.dialog.domNode))){
pd.dialog._getFocusItems(pd.dialog.domNode);
_8dd=pd.dialog._firstFocusItem;
}
if(_8dd){
try{
_8dd.focus();
}
catch(e){
}
}
}
}else{
var idx=_8b5.indexOf(_8b5.map(ds,function(elem){
return elem.dialog;
}),_8dc);
if(idx!=-1){
ds.splice(idx,1);
}
}
},isTop:function(_8de){
return ds[ds.length-1].dialog==_8de;
}};
var ds=_8d8._dialogStack=[{dialog:null,focus:null,underlayAttrs:null}];
_8c0.watch("curNode",function(attr,_8df,node){
var _8e0=ds[ds.length-1].dialog;
if(node&&_8e0&&!_8e0._fadeOutDeferred&&node.ownerDocument==_8e0.ownerDocument){
do{
if(node==_8e0.domNode||_8b9.contains(node,"dijitPopup")){
return;
}
}while(node=node.parentNode);
_8e0.focus();
}
});
if(has("dijit-legacy-requires")){
_8bc(0,function(){
var _8e1=["dijit/TooltipDialog"];
_8b4(_8e1);
});
}
return _8d8;
});
},"dijit/_base/focus":function(){
define(["dojo/_base/array","dojo/dom","dojo/_base/lang","dojo/topic","dojo/_base/window","../focus","../selection","../main"],function(_8e2,dom,lang,_8e3,win,_8e4,_8e5,_8e6){
var _8e7={_curFocus:null,_prevFocus:null,isCollapsed:function(){
return _8e6.getBookmark().isCollapsed;
},getBookmark:function(){
var sel=win.global==window?_8e5:new _8e5.SelectionManager(win.global);
return sel.getBookmark();
},moveToBookmark:function(_8e8){
var sel=win.global==window?_8e5:new _8e5.SelectionManager(win.global);
return sel.moveToBookmark(_8e8);
},getFocus:function(menu,_8e9){
var node=!_8e4.curNode||(menu&&dom.isDescendant(_8e4.curNode,menu.domNode))?_8e6._prevFocus:_8e4.curNode;
return {node:node,bookmark:node&&(node==_8e4.curNode)&&win.withGlobal(_8e9||win.global,_8e6.getBookmark),openedForWindow:_8e9};
},_activeStack:[],registerIframe:function(_8ea){
return _8e4.registerIframe(_8ea);
},unregisterIframe:function(_8eb){
_8eb&&_8eb.remove();
},registerWin:function(_8ec,_8ed){
return _8e4.registerWin(_8ec,_8ed);
},unregisterWin:function(_8ee){
_8ee&&_8ee.remove();
}};
_8e4.focus=function(_8ef){
if(!_8ef){
return;
}
var node="node" in _8ef?_8ef.node:_8ef,_8f0=_8ef.bookmark,_8f1=_8ef.openedForWindow,_8f2=_8f0?_8f0.isCollapsed:false;
if(node){
var _8f3=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_8f3&&_8f3.focus){
try{
_8f3.focus();
}
catch(e){
}
}
_8e4._onFocusNode(node);
}
if(_8f0&&win.withGlobal(_8f1||win.global,_8e6.isCollapsed)&&!_8f2){
if(_8f1){
_8f1.focus();
}
try{
win.withGlobal(_8f1||win.global,_8e6.moveToBookmark,null,[_8f0]);
}
catch(e2){
}
}
};
_8e4.watch("curNode",function(name,_8f4,_8f5){
_8e6._curFocus=_8f5;
_8e6._prevFocus=_8f4;
if(_8f5){
_8e3.publish("focusNode",_8f5);
}
});
_8e4.watch("activeStack",function(name,_8f6,_8f7){
_8e6._activeStack=_8f7;
});
_8e4.on("widget-blur",function(_8f8,by){
_8e3.publish("widgetBlur",_8f8,by);
});
_8e4.on("widget-focus",function(_8f9,by){
_8e3.publish("widgetFocus",_8f9,by);
});
lang.mixin(_8e6,_8e7);
return _8e6;
});
},"dijit/a11y":function(){
define(["dojo/_base/array","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/sniff","./main"],function(_8fa,dom,_8fb,_8fc,lang,has,_8fd){
var _8fe;
var a11y={_isElementShown:function(elem){
var s=_8fc.get(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_8fb.get(elem,"type")!="hidden");
},hasDefaultTabStop:function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _8fb.has(elem,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var body;
try{
var _8ff=elem.contentDocument;
if("designMode" in _8ff&&_8ff.designMode=="on"){
return true;
}
body=_8ff.body;
}
catch(e1){
try{
body=elem.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return body&&(body.contentEditable=="true"||(body.firstChild&&body.firstChild.contentEditable=="true"));
default:
return elem.contentEditable=="true";
}
},effectiveTabIndex:function(elem){
if(_8fb.get(elem,"disabled")){
return _8fe;
}else{
if(_8fb.has(elem,"tabIndex")){
return +_8fb.get(elem,"tabIndex");
}else{
return a11y.hasDefaultTabStop(elem)?0:_8fe;
}
}
},isTabNavigable:function(elem){
return a11y.effectiveTabIndex(elem)>=0;
},isFocusable:function(elem){
return a11y.effectiveTabIndex(elem)>=-1;
},_getTabNavigable:function(root){
var _900,last,_901,_902,_903,_904,_905={};
function _906(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _907=a11y._isElementShown,_908=a11y.effectiveTabIndex;
var _909=function(_90a){
for(var _90b=_90a.firstChild;_90b;_90b=_90b.nextSibling){
if(_90b.nodeType!=1||(has("ie")<=9&&_90b.scopeName!=="HTML")||!_907(_90b)){
continue;
}
var _90c=_908(_90b);
if(_90c>=0){
if(_90c==0){
if(!_900){
_900=_90b;
}
last=_90b;
}else{
if(_90c>0){
if(!_901||_90c<_902){
_902=_90c;
_901=_90b;
}
if(!_903||_90c>=_904){
_904=_90c;
_903=_90b;
}
}
}
var rn=_906(_90b);
if(_8fb.get(_90b,"checked")&&rn){
_905[rn]=_90b;
}
}
if(_90b.nodeName.toUpperCase()!="SELECT"){
_909(_90b);
}
}
};
if(_907(root)){
_909(root);
}
function rs(node){
return _905[_906(node)]||node;
};
return {first:rs(_900),last:rs(last),lowest:rs(_901),highest:rs(_903)};
},getFirstInTabbingOrder:function(root,doc){
var _90d=a11y._getTabNavigable(dom.byId(root,doc));
return _90d.lowest?_90d.lowest:_90d.first;
},getLastInTabbingOrder:function(root,doc){
var _90e=a11y._getTabNavigable(dom.byId(root,doc));
return _90e.last?_90e.last:_90e.highest;
}};
1&&lang.mixin(_8fd,a11y);
return a11y;
});
},"dijit/form/_ToggleButtonMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr"],function(_90f,_910){
return _90f("dijit.form._ToggleButtonMixin",null,{checked:false,_aria_attr:"aria-pressed",_onClick:function(evt){
var _911=this.checked;
this._set("checked",!_911);
var ret=this.inherited(arguments);
this.set("checked",ret?this.checked:_911);
return ret;
},_setCheckedAttr:function(_912,_913){
this._set("checked",_912);
var node=this.focusNode||this.domNode;
if(this._created){
if(_910.get(node,"checked")!=!!_912){
_910.set(node,"checked",!!_912);
}
}
node.setAttribute(this._aria_attr,String(_912));
this._handleOnChange(_912,_913);
},postCreate:function(){
this.inherited(arguments);
var node=this.focusNode||this.domNode;
if(this.checked){
node.setAttribute("checked","checked");
}
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
});
},"dijit/_Widget":function(){
define(["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/has","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_914,_915,_916,_917,has,_918,lang,_919,_91a,_91b,_91c,_91d,_91e){
function _91f(){
};
function _920(_921){
return function(obj,_922,_923,_924){
if(obj&&typeof _922=="string"&&obj[_922]==_91f){
return obj.on(_922.substring(2).toLowerCase(),lang.hitch(_923,_924));
}
return _921.apply(_916,arguments);
};
};
_914.around(_916,"connect",_920);
if(_918.connect){
_914.around(_918,"connect",_920);
}
var _925=_917("dijit._Widget",[_91c,_91d,_91e],{onClick:_91f,onDblClick:_91f,onKeyDown:_91f,onKeyPress:_91f,onKeyUp:_91f,onMouseDown:_91f,onMouseMove:_91f,onMouseOut:_91f,onMouseOver:_91f,onMouseLeave:_91f,onMouseEnter:_91f,onMouseUp:_91f,constructor:function(_926){
this._toConnect={};
for(var name in _926){
if(this[name]===_91f){
this._toConnect[name.replace(/^on/,"").toLowerCase()]=_926[name];
delete _926[name];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var name in this._toConnect){
this.on(name,this._toConnect[name]);
}
delete this._toConnect;
},on:function(type,func){
if(this[this._onMap(type)]===_91f){
return _916.connect(this.domNode,type.toLowerCase(),this,func);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(attr,_927){
_918.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_927);
},attr:function(name,_928){
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},getDescendants:function(){
_918.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_919("[widgetId]",this.containerNode).map(_91b.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(has("dijit-legacy-requires")){
_91a(0,function(){
var _929=["dijit/_base"];
require(_929);
});
}
return _925;
});
},"dojo/touch":function(){
define(["./_base/kernel","./aspect","./dom","./dom-class","./_base/lang","./on","./has","./mouse","./domReady","./_base/window"],function(dojo,_92a,dom,_92b,lang,on,has,_92c,_92d,win){
var _92e=has("touch");
var ios4=has("ios")<5;
var _92f=navigator.pointerEnabled||navigator.msPointerEnabled,_930=(function(){
var _931={};
for(var type in {down:1,move:1,up:1,cancel:1,over:1,out:1}){
_931[type]=!navigator.pointerEnabled?"MSPointer"+type.charAt(0).toUpperCase()+type.slice(1):"pointer"+type;
}
return _931;
})();
var _932,_933,_934,_935,_936,_937,_938,_939;
var _93a;
function _93b(_93c,_93d,_93e){
if(_92f&&_93e){
return function(node,_93f){
return on(node,_93e,_93f);
};
}else{
if(_92e){
return function(node,_940){
var _941=on(node,_93d,_940),_942=on(node,_93c,function(evt){
if(!_93a||(new Date()).getTime()>_93a+1000){
_940.call(this,evt);
}
});
return {remove:function(){
_941.remove();
_942.remove();
}};
};
}else{
return function(node,_943){
return on(node,_93c,_943);
};
}
}
};
function _944(node){
do{
if(node.dojoClick!==undefined){
return node.dojoClick;
}
}while(node=node.parentNode);
};
function _945(e,_946,_947){
_933=!e.target.disabled&&_944(e.target);
if(_933){
_934=e.target;
_935=e.touches?e.touches[0].pageX:e.clientX;
_936=e.touches?e.touches[0].pageY:e.clientY;
_937=(typeof _933=="object"?_933.x:(typeof _933=="number"?_933:0))||4;
_938=(typeof _933=="object"?_933.y:(typeof _933=="number"?_933:0))||4;
if(!_932){
_932=true;
win.doc.addEventListener(_946,function(e){
_933=_933&&e.target==_934&&Math.abs((e.touches?e.touches[0].pageX:e.clientX)-_935)<=_937&&Math.abs((e.touches?e.touches[0].pageY:e.clientY)-_936)<=_938;
},true);
win.doc.addEventListener(_947,function(e){
if(_933){
_939=(new Date()).getTime();
var _948=e.target;
if(_948.tagName==="LABEL"){
_948=dom.byId(_948.getAttribute("for"))||_948;
}
setTimeout(function(){
on.emit(_948,"click",{bubbles:true,cancelable:true,_dojo_click:true});
});
}
},true);
function _949(type){
win.doc.addEventListener(type,function(e){
if(!e._dojo_click&&(new Date()).getTime()<=_939+1000&&!(e.target.tagName=="INPUT"&&_92b.contains(e.target,"dijitOffScreen"))){
e.stopPropagation();
e.stopImmediatePropagation&&e.stopImmediatePropagation();
if(type=="click"&&(e.target.tagName!="INPUT"||e.target.type=="radio"||e.target.type=="checkbox")&&e.target.tagName!="TEXTAREA"&&e.target.tagName!="AUDIO"&&e.target.tagName!="VIDEO"){
e.preventDefault();
}
}
},true);
};
_949("click");
_949("mousedown");
_949("mouseup");
}
}
};
var _94a;
if(_92e){
if(_92f){
_92d(function(){
win.doc.addEventListener(_930.down,function(evt){
_945(evt,_930.move,_930.up);
},true);
});
}else{
_92d(function(){
_94a=win.body();
win.doc.addEventListener("touchstart",function(evt){
_93a=(new Date()).getTime();
var _94b=_94a;
_94a=evt.target;
on.emit(_94b,"dojotouchout",{relatedTarget:_94a,bubbles:true});
on.emit(_94a,"dojotouchover",{relatedTarget:_94b,bubbles:true});
_945(evt,"touchmove","touchend");
},true);
function _94c(evt){
var _94d=lang.delegate(evt,{bubbles:true});
if(has("ios")>=6){
_94d.touches=evt.touches;
_94d.altKey=evt.altKey;
_94d.changedTouches=evt.changedTouches;
_94d.ctrlKey=evt.ctrlKey;
_94d.metaKey=evt.metaKey;
_94d.shiftKey=evt.shiftKey;
_94d.targetTouches=evt.targetTouches;
}
return _94d;
};
on(win.doc,"touchmove",function(evt){
_93a=(new Date()).getTime();
var _94e=win.doc.elementFromPoint(evt.pageX-(ios4?0:win.global.pageXOffset),evt.pageY-(ios4?0:win.global.pageYOffset));
if(_94e){
if(_94a!==_94e){
on.emit(_94a,"dojotouchout",{relatedTarget:_94e,bubbles:true});
on.emit(_94e,"dojotouchover",{relatedTarget:_94a,bubbles:true});
_94a=_94e;
}
if(!on.emit(_94e,"dojotouchmove",_94c(evt))){
evt.preventDefault();
}
}
});
on(win.doc,"touchend",function(evt){
_93a=(new Date()).getTime();
var node=win.doc.elementFromPoint(evt.pageX-(ios4?0:win.global.pageXOffset),evt.pageY-(ios4?0:win.global.pageYOffset))||win.body();
on.emit(node,"dojotouchend",_94c(evt));
});
});
}
}
var _94f={press:_93b("mousedown","touchstart",_930.down),move:_93b("mousemove","dojotouchmove",_930.move),release:_93b("mouseup","dojotouchend",_930.up),cancel:_93b(_92c.leave,"touchcancel",_92e?_930.cancel:null),over:_93b("mouseover","dojotouchover",_930.over),out:_93b("mouseout","dojotouchout",_930.out),enter:_92c._eventHandler(_93b("mouseover","dojotouchover",_930.over)),leave:_92c._eventHandler(_93b("mouseout","dojotouchout",_930.out))};
1&&(dojo.touch=_94f);
return _94f;
});
},"dojo/fx":function(){
define(["./_base/lang","./Evented","./_base/kernel","./_base/array","./aspect","./_base/fx","./dom","./dom-style","./dom-geometry","./ready","require"],function(lang,_950,dojo,_951,_952,_953,dom,_954,geom,_955,_956){
if(!dojo.isAsync){
_955(0,function(){
var _957=["./fx/Toggler"];
_956(_957);
});
}
var _958=dojo.fx={};
var _959={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _95a=function(_95b){
this._index=-1;
this._animations=_95b||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
_951.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
_95a.prototype=new _950();
lang.extend(_95a,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
this._onAnimateCtx.remove();
this._onEndCtx.remove();
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=_952.after(this._current,"onAnimate",lang.hitch(this,"_onAnimate"),true);
this._onEndCtx=_952.after(this._current,"onEnd",lang.hitch(this,"_onEnd"),true);
this._current.play(0,true);
}
},play:function(_95c,_95d){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_95d&&this._current.status()=="playing"){
return this;
}
var _95e=_952.after(this._current,"beforeBegin",lang.hitch(this,function(){
this._fire("beforeBegin");
}),true),_95f=_952.after(this._current,"onBegin",lang.hitch(this,function(arg){
this._fire("onBegin",arguments);
}),true),_960=_952.after(this._current,"onPlay",lang.hitch(this,function(arg){
this._fire("onPlay",arguments);
_95e.remove();
_95f.remove();
_960.remove();
}));
if(this._onAnimateCtx){
this._onAnimateCtx.remove();
}
this._onAnimateCtx=_952.after(this._current,"onAnimate",lang.hitch(this,"_onAnimate"),true);
if(this._onEndCtx){
this._onEndCtx.remove();
}
this._onEndCtx=_952.after(this._current,"onEnd",lang.hitch(this,"_onEnd"),true);
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=_952.after(this._current,"onPause",lang.hitch(this,function(arg){
this._fire("onPause",arguments);
e.remove();
}),true);
this._current.pause();
}
return this;
},gotoPercent:function(_961,_962){
this.pause();
var _963=this.duration*_961;
this._current=null;
_951.some(this._animations,function(a){
if(a.duration<=_963){
this._current=a;
return true;
}
_963-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_963/this._current.duration,_962);
}
return this;
},stop:function(_964){
if(this._current){
if(_964){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=_952.after(this._current,"onStop",lang.hitch(this,function(arg){
this._fire("onStop",arguments);
e.remove();
}),true);
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
this._onAnimateCtx.remove();
}
if(this._onEndCtx){
this._onEndCtx.remove();
}
}});
lang.extend(_95a,_959);
_958.chain=function(_965){
return new _95a(_965);
};
var _966=function(_967){
this._animations=_967||[];
this._connects=[];
this._finished=0;
this.duration=0;
_951.forEach(_967,function(a){
var _968=a.duration;
if(a.delay){
_968+=a.delay;
}
if(this.duration<_968){
this.duration=_968;
}
this._connects.push(_952.after(a,"onEnd",lang.hitch(this,"_onEnd"),true));
},this);
this._pseudoAnimation=new _953.Animation({curve:[0,1],duration:this.duration});
var self=this;
_951.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(_952.after(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
},true));
});
};
lang.extend(_966,{_doAction:function(_969,args){
_951.forEach(this._animations,function(a){
a[_969].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_96a,args){
var t=this._pseudoAnimation;
t[_96a].apply(t,args);
},play:function(_96b,_96c){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_96d,_96e){
var ms=this.duration*_96d;
_951.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_96e);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_96f){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
_951.forEach(this._connects,function(_970){
_970.remove();
});
}});
lang.extend(_966,_959);
_958.combine=function(_971){
return new _966(_971);
};
_958.wipeIn=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_953.animateProperty(lang.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _972=_954.get(node,"height");
return Math.max(_972,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
var fini=function(){
s.height="auto";
s.overflow=o;
};
_952.after(anim,"onStop",fini,true);
_952.after(anim,"onEnd",fini,true);
return anim;
};
_958.wipeOut=function(args){
var node=args.node=dom.byId(args.node),s=node.style,o;
var anim=_953.animateProperty(lang.mixin({properties:{height:{end:1}}},args));
_952.after(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
},true);
var fini=function(){
s.overflow=o;
s.height="auto";
s.display="none";
};
_952.after(anim,"onStop",fini,true);
_952.after(anim,"onEnd",fini,true);
return anim;
};
_958.slideTo=function(args){
var node=args.node=dom.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=_954.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=geom.position(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=_953.animateProperty(lang.mixin({properties:{top:args.top||0,left:args.left||0}},args));
_952.after(anim,"beforeBegin",init,true);
return anim;
};
return _958;
});
},"dojo/request":function(){
define(["./request/default!"],function(_973){
return _973;
});
},"dijit/_DialogMixin":function(){
define(["dojo/_base/declare","./a11y"],function(_974,a11y){
return _974("dijit._DialogMixin",null,{execute:function(){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var _975=a11y._getTabNavigable(this.containerNode);
this._firstFocusItem=_975.lowest||_975.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_975.last||_975.highest||this._firstFocusItem;
}});
});
},"dijit/Tree":function(){
define(["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/cookie","dojo/_base/declare","dojo/Deferred","dojo/promise/all","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/errors/create","dojo/fx","dojo/has","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/topic","dojo/touch","dojo/when","./a11yclick","./focus","./registry","./_base/manager","./_Widget","./_TemplatedMixin","./_Container","./_Contained","./_CssStateMixin","./_KeyNavMixin","dojo/text!./templates/TreeNode.html","dojo/text!./templates/Tree.html","./tree/TreeStoreModel","./tree/ForestStoreModel","./tree/_dndSelector","dojo/query!css2"],function(_976,_977,_978,_979,_97a,_97b,all,dom,_97c,_97d,_97e,_97f,_980,has,_981,keys,lang,on,_982,_983,when,_984,_985,_986,_987,_988,_989,_98a,_98b,_98c,_98d,_98e,_98f,_990,_991,_992){
function _993(d){
return lang.delegate(d.promise||d,{addCallback:function(_994){
this.then(_994);
},addErrback:function(_995){
this.otherwise(_995);
}});
};
var _996=_97a("dijit._TreeNode",[_988,_989,_98a,_98b,_98c],{item:null,isTreeNode:true,label:"",_setLabelAttr:function(val){
this.labelNode[this.labelType=="html"?"innerHTML":"innerText" in this.labelNode?"innerText":"textContent"]=val;
this._set("label",val);
},labelType:"text",isExpandable:null,isExpanded:false,state:"NotLoaded",templateString:_98e,baseClass:"dijitTreeNode",cssStateNodes:{rowNode:"dijitTreeRow"},_setTooltipAttr:{node:"rowNode",type:"attribute",attribute:"title"},buildRendering:function(){
this.inherited(arguments);
this._setExpando();
this._updateItemClasses(this.item);
if(this.isExpandable){
this.labelNode.setAttribute("aria-expanded",this.isExpanded);
}
this.setSelected(false);
},_setIndentAttr:function(_997){
var _998=(Math.max(_997,0)*this.tree._nodePixelIndent)+"px";
_97e.set(this.domNode,"backgroundPosition",_998+" 0px");
_97e.set(this.rowNode,this.isLeftToRight()?"paddingLeft":"paddingRight",_998);
_976.forEach(this.getChildren(),function(_999){
_999.set("indent",_997+1);
});
this._set("indent",_997);
},markProcessing:function(){
this.state="Loading";
this._setExpando(true);
},unmarkProcessing:function(){
this._setExpando(false);
},_updateItemClasses:function(item){
var tree=this.tree,_99a=tree.model;
if(tree._v10Compat&&item===_99a.root){
item=null;
}
this._applyClassAndStyle(item,"icon","Icon");
this._applyClassAndStyle(item,"label","Label");
this._applyClassAndStyle(item,"row","Row");
this.tree._startPaint(true);
},_applyClassAndStyle:function(item,_99b,_99c){
var _99d="_"+_99b+"Class";
var _99e=_99b+"Node";
var _99f=this[_99d];
this[_99d]=this.tree["get"+_99c+"Class"](item,this.isExpanded);
_97c.replace(this[_99e],this[_99d]||"",_99f||"");
_97e.set(this[_99e],this.tree["get"+_99c+"Style"](item,this.isExpanded)||{});
},_updateLayout:function(){
var _9a0=this.getParent();
if(!_9a0||!_9a0.rowNode||_9a0.rowNode.style.display=="none"){
_97c.add(this.domNode,"dijitTreeIsRoot");
}else{
_97c.toggle(this.domNode,"dijitTreeIsLast",!this.getNextSibling());
}
},_setExpando:function(_9a1){
var _9a2=["dijitTreeExpandoLoading","dijitTreeExpandoOpened","dijitTreeExpandoClosed","dijitTreeExpandoLeaf"],_9a3=["*","-","+","*"],idx=_9a1?0:(this.isExpandable?(this.isExpanded?1:2):3);
_97c.replace(this.expandoNode,_9a2[idx],_9a2);
this.expandoNodeText.innerHTML=_9a3[idx];
},expand:function(){
if(this._expandDeferred){
return _993(this._expandDeferred);
}
if(this._collapseDeferred){
this._collapseDeferred.cancel();
delete this._collapseDeferred;
}
this.isExpanded=true;
this.labelNode.setAttribute("aria-expanded","true");
if(this.tree.showRoot||this!==this.tree.rootNode){
this.containerNode.setAttribute("role","group");
}
_97c.add(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","true");
}
var _9a4=_980.wipeIn({node:this.containerNode,duration:_987.defaultDuration});
var def=(this._expandDeferred=new _97b(function(){
_9a4.stop();
}));
_977.after(_9a4,"onEnd",function(){
def.resolve(true);
},true);
_9a4.play();
return _993(def);
},collapse:function(){
if(this._collapseDeferred){
return _993(this._collapseDeferred);
}
if(this._expandDeferred){
this._expandDeferred.cancel();
delete this._expandDeferred;
}
this.isExpanded=false;
this.labelNode.setAttribute("aria-expanded","false");
if(this==this.tree.rootNode&&this.tree.showRoot){
this.tree.domNode.setAttribute("aria-expanded","false");
}
_97c.remove(this.contentNode,"dijitTreeContentExpanded");
this._setExpando();
this._updateItemClasses(this.item);
var _9a5=_980.wipeOut({node:this.containerNode,duration:_987.defaultDuration});
var def=(this._collapseDeferred=new _97b(function(){
_9a5.stop();
}));
_977.after(_9a5,"onEnd",function(){
def.resolve(true);
},true);
_9a5.play();
return _993(def);
},indent:0,setChildItems:function(_9a6){
var tree=this.tree,_9a7=tree.model,defs=[];
var _9a8=this.getChildren();
_976.forEach(_9a8,function(_9a9){
_98a.prototype.removeChild.call(this,_9a9);
},this);
this.defer(function(){
_976.forEach(_9a8,function(node){
if(!node._destroyed&&!node.getParent()){
tree.dndController.removeTreeNode(node);
function _9aa(node){
var id=_9a7.getIdentity(node.item),ary=tree._itemNodesMap[id];
if(ary.length==1){
delete tree._itemNodesMap[id];
}else{
var _9ab=_976.indexOf(ary,node);
if(_9ab!=-1){
ary.splice(_9ab,1);
}
}
_976.forEach(node.getChildren(),_9aa);
};
_9aa(node);
if(tree.persist){
var _9ac=_976.map(node.getTreePath(),function(item){
return tree.model.getIdentity(item);
}).join("/");
for(var path in tree._openedNodes){
if(path.substr(0,_9ac.length)==_9ac){
delete tree._openedNodes[path];
}
}
tree._saveExpandedNodes();
}
node.destroyRecursive();
}
});
});
this.state="Loaded";
if(_9a6&&_9a6.length>0){
this.isExpandable=true;
_976.forEach(_9a6,function(item){
var id=_9a7.getIdentity(item),_9ad=tree._itemNodesMap[id],node;
if(_9ad){
for(var i=0;i<_9ad.length;i++){
if(_9ad[i]&&!_9ad[i].getParent()){
node=_9ad[i];
node.set("indent",this.indent+1);
break;
}
}
}
if(!node){
node=this.tree._createTreeNode({item:item,tree:tree,isExpandable:_9a7.mayHaveChildren(item),label:tree.getLabel(item),labelType:(tree.model&&tree.model.labelType)||"text",tooltip:tree.getTooltip(item),ownerDocument:tree.ownerDocument,dir:tree.dir,lang:tree.lang,textDir:tree.textDir,indent:this.indent+1});
if(_9ad){
_9ad.push(node);
}else{
tree._itemNodesMap[id]=[node];
}
}
this.addChild(node);
if(this.tree.autoExpand||this.tree._state(node)){
defs.push(tree._expandNode(node));
}
},this);
_976.forEach(this.getChildren(),function(_9ae){
_9ae._updateLayout();
});
}else{
this.isExpandable=false;
}
if(this._setExpando){
this._setExpando(false);
}
this._updateItemClasses(this.item);
var def=all(defs);
this.tree._startPaint(def);
return _993(def);
},getTreePath:function(){
var node=this;
var path=[];
while(node&&node!==this.tree.rootNode){
path.unshift(node.item);
node=node.getParent();
}
path.unshift(this.tree.rootNode.item);
return path;
},getIdentity:function(){
return this.tree.model.getIdentity(this.item);
},removeChild:function(node){
this.inherited(arguments);
var _9af=this.getChildren();
if(_9af.length==0){
this.isExpandable=false;
this.collapse();
}
_976.forEach(_9af,function(_9b0){
_9b0._updateLayout();
});
},makeExpandable:function(){
this.isExpandable=true;
this._setExpando(false);
},setSelected:function(_9b1){
this.labelNode.setAttribute("aria-selected",_9b1?"true":"false");
_97c.toggle(this.rowNode,"dijitTreeRowSelected",_9b1);
},focus:function(){
_985.focus(this.focusNode);
}});
if(has("dojo-bidi")){
_996.extend({_setTextDirAttr:function(_9b2){
if(_9b2&&((this.textDir!=_9b2)||!this._created)){
this._set("textDir",_9b2);
this.applyTextDir(this.labelNode);
_976.forEach(this.getChildren(),function(_9b3){
_9b3.set("textDir",_9b2);
},this);
}
}});
}
var Tree=_97a("dijit.Tree",[_988,_98d,_989,_98c],{baseClass:"dijitTree",store:null,model:null,query:null,label:"",showRoot:true,childrenAttr:["children"],paths:[],path:[],selectedItems:null,selectedItem:null,openOnClick:false,openOnDblClick:false,templateString:_98f,persist:false,autoExpand:false,dndController:_992,dndParams:["onDndDrop","itemCreator","onDndCancel","checkAcceptance","checkItemAcceptance","dragThreshold","betweenThreshold"],onDndDrop:null,itemCreator:null,onDndCancel:null,checkAcceptance:null,checkItemAcceptance:null,dragThreshold:5,betweenThreshold:0,_nodePixelIndent:19,_publish:function(_9b4,_9b5){
_982.publish(this.id,lang.mixin({tree:this,event:_9b4},_9b5||{}));
},postMixInProperties:function(){
this.tree=this;
if(this.autoExpand){
this.persist=false;
}
this._itemNodesMap={};
if(!this.cookieName&&this.id){
this.cookieName=this.id+"SaveStateCookie";
}
this.expandChildrenDeferred=new _97b();
this.pendingCommandsPromise=this.expandChildrenDeferred.promise;
this.inherited(arguments);
},postCreate:function(){
this._initState();
var self=this;
this.own(on(this.containerNode,on.selector(".dijitTreeNode",_983.enter),function(evt){
self._onNodeMouseEnter(_986.byNode(this),evt);
}),on(this.containerNode,on.selector(".dijitTreeNode",_983.leave),function(evt){
self._onNodeMouseLeave(_986.byNode(this),evt);
}),on(this.containerNode,on.selector(".dijitTreeRow",_984.press),function(evt){
self._onNodePress(_986.getEnclosingWidget(this),evt);
}),on(this.containerNode,on.selector(".dijitTreeRow",_984),function(evt){
self._onClick(_986.getEnclosingWidget(this),evt);
}),on(this.containerNode,on.selector(".dijitTreeRow","dblclick"),function(evt){
self._onDblClick(_986.getEnclosingWidget(this),evt);
}));
if(!this.model){
this._store2model();
}
this.own(_977.after(this.model,"onChange",lang.hitch(this,"_onItemChange"),true),_977.after(this.model,"onChildrenChange",lang.hitch(this,"_onItemChildrenChange"),true),_977.after(this.model,"onDelete",lang.hitch(this,"_onItemDelete"),true));
this.inherited(arguments);
if(this.dndController){
if(lang.isString(this.dndController)){
this.dndController=lang.getObject(this.dndController);
}
var _9b6={};
for(var i=0;i<this.dndParams.length;i++){
if(this[this.dndParams[i]]){
_9b6[this.dndParams[i]]=this[this.dndParams[i]];
}
}
this.dndController=new this.dndController(this,_9b6);
}
this._load();
this.onLoadDeferred=_993(this.pendingCommandsPromise);
this.onLoadDeferred.then(lang.hitch(this,"onLoad"));
},_store2model:function(){
this._v10Compat=true;
_981.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
var _9b7={id:this.id+"_ForestStoreModel",store:this.store,query:this.query,childrenAttrs:this.childrenAttr};
if(this.params.mayHaveChildren){
_9b7.mayHaveChildren=lang.hitch(this,"mayHaveChildren");
}
if(this.params.getItemChildren){
_9b7.getChildren=lang.hitch(this,function(item,_9b8,_9b9){
this.getItemChildren((this._v10Compat&&item===this.model.root)?null:item,_9b8,_9b9);
});
}
this.model=new _991(_9b7);
this.showRoot=Boolean(this.label);
},onLoad:function(){
},_load:function(){
this.model.getRoot(lang.hitch(this,function(item){
var rn=(this.rootNode=this.tree._createTreeNode({item:item,tree:this,isExpandable:true,label:this.label||this.getLabel(item),labelType:this.model.labelType||"text",textDir:this.textDir,indent:this.showRoot?0:-1}));
if(!this.showRoot){
rn.rowNode.style.display="none";
this.domNode.setAttribute("role","presentation");
this.domNode.removeAttribute("aria-expanded");
this.domNode.removeAttribute("aria-multiselectable");
if(this["aria-label"]){
rn.containerNode.setAttribute("aria-label",this["aria-label"]);
this.domNode.removeAttribute("aria-label");
}else{
if(this["aria-labelledby"]){
rn.containerNode.setAttribute("aria-labelledby",this["aria-labelledby"]);
this.domNode.removeAttribute("aria-labelledby");
}
}
rn.labelNode.setAttribute("role","presentation");
rn.containerNode.setAttribute("role","tree");
rn.containerNode.setAttribute("aria-expanded","true");
rn.containerNode.setAttribute("aria-multiselectable",!this.dndController.singular);
}else{
this.domNode.setAttribute("aria-multiselectable",!this.dndController.singular);
this.rootLoadingIndicator.style.display="none";
}
this.containerNode.appendChild(rn.domNode);
var _9ba=this.model.getIdentity(item);
if(this._itemNodesMap[_9ba]){
this._itemNodesMap[_9ba].push(rn);
}else{
this._itemNodesMap[_9ba]=[rn];
}
rn._updateLayout();
this._expandNode(rn).then(lang.hitch(this,function(){
this.rootLoadingIndicator.style.display="none";
this.expandChildrenDeferred.resolve(true);
}));
}),lang.hitch(this,function(err){
console.error(this,": error loading root: ",err);
}));
},getNodesByItem:function(item){
if(!item){
return [];
}
var _9bb=lang.isString(item)?item:this.model.getIdentity(item);
return [].concat(this._itemNodesMap[_9bb]);
},_setSelectedItemAttr:function(item){
this.set("selectedItems",[item]);
},_setSelectedItemsAttr:function(_9bc){
var tree=this;
return this.pendingCommandsPromise=this.pendingCommandsPromise.always(lang.hitch(this,function(){
var _9bd=_976.map(_9bc,function(item){
return (!item||lang.isString(item))?item:tree.model.getIdentity(item);
});
var _9be=[];
_976.forEach(_9bd,function(id){
_9be=_9be.concat(tree._itemNodesMap[id]||[]);
});
this.set("selectedNodes",_9be);
}));
},_setPathAttr:function(path){
if(path.length){
return _993(this.set("paths",[path]).then(function(_9bf){
return _9bf[0];
}));
}else{
return _993(this.set("paths",[]).then(function(_9c0){
return _9c0[0];
}));
}
},_setPathsAttr:function(_9c1){
var tree=this;
function _9c2(path,_9c3){
var _9c4=path.shift();
var _9c5=_976.filter(_9c3,function(node){
return node.getIdentity()==_9c4;
})[0];
if(!!_9c5){
if(path.length){
return tree._expandNode(_9c5).then(function(){
return _9c2(path,_9c5.getChildren());
});
}else{
return _9c5;
}
}else{
throw new Tree.PathError("Could not expand path at "+_9c4);
}
};
return _993(this.pendingCommandsPromise=this.pendingCommandsPromise.always(function(){
return all(_976.map(_9c1,function(path){
path=_976.map(path,function(item){
return lang.isString(item)?item:tree.model.getIdentity(item);
});
if(path.length){
return _9c2(path,[tree.rootNode]);
}else{
throw new Tree.PathError("Empty path");
}
}));
}).then(function setNodes(_9c6){
tree.set("selectedNodes",_9c6);
return tree.paths;
}));
},_setSelectedNodeAttr:function(node){
this.set("selectedNodes",[node]);
},_setSelectedNodesAttr:function(_9c7){
this.dndController.setSelection(_9c7);
},expandAll:function(){
var _9c8=this;
function _9c9(node){
return _9c8._expandNode(node).then(function(){
var _9ca=_976.filter(node.getChildren()||[],function(node){
return node.isExpandable;
});
return all(_976.map(_9ca,_9c9));
});
};
return _993(_9c9(this.rootNode));
},collapseAll:function(){
var _9cb=this;
function _9cc(node){
var _9cd=_976.filter(node.getChildren()||[],function(node){
return node.isExpandable;
}),defs=all(_976.map(_9cd,_9cc));
if(!node.isExpanded||(node==_9cb.rootNode&&!_9cb.showRoot)){
return defs;
}else{
return defs.then(function(){
return _9cb._collapseNode(node);
});
}
};
return _993(_9cc(this.rootNode));
},mayHaveChildren:function(){
},getItemChildren:function(){
},getLabel:function(item){
return this.model.getLabel(item);
},getIconClass:function(item,_9ce){
return (!item||this.model.mayHaveChildren(item))?(_9ce?"dijitFolderOpened":"dijitFolderClosed"):"dijitLeaf";
},getLabelClass:function(){
},getRowClass:function(){
},getIconStyle:function(){
},getLabelStyle:function(){
},getRowStyle:function(){
},getTooltip:function(){
return "";
},_onDownArrow:function(evt,node){
var _9cf=this._getNext(node);
if(_9cf&&_9cf.isTreeNode){
this.focusNode(_9cf);
}
},_onUpArrow:function(evt,node){
var _9d0=node.getPreviousSibling();
if(_9d0){
node=_9d0;
while(node.isExpandable&&node.isExpanded&&node.hasChildren()){
var _9d1=node.getChildren();
node=_9d1[_9d1.length-1];
}
}else{
var _9d2=node.getParent();
if(!(!this.showRoot&&_9d2===this.rootNode)){
node=_9d2;
}
}
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_onRightArrow:function(evt,node){
if(node.isExpandable&&!node.isExpanded){
this._expandNode(node);
}else{
if(node.hasChildren()){
node=node.getChildren()[0];
if(node&&node.isTreeNode){
this.focusNode(node);
}
}
}
},_onLeftArrow:function(evt,node){
if(node.isExpandable&&node.isExpanded){
this._collapseNode(node);
}else{
var _9d3=node.getParent();
if(_9d3&&_9d3.isTreeNode&&!(!this.showRoot&&_9d3===this.rootNode)){
this.focusNode(_9d3);
}
}
},focusLastChild:function(){
var node=this._getLast();
if(node&&node.isTreeNode){
this.focusNode(node);
}
},_getFirst:function(){
return this.showRoot?this.rootNode:this.rootNode.getChildren()[0];
},_getLast:function(){
var node=this.rootNode;
while(node.isExpanded){
var c=node.getChildren();
if(!c.length){
break;
}
node=c[c.length-1];
}
return node;
},_getNext:function(node){
if(node.isExpandable&&node.isExpanded&&node.hasChildren()){
return node.getChildren()[0];
}else{
while(node&&node.isTreeNode){
var _9d4=node.getNextSibling();
if(_9d4){
return _9d4;
}
node=node.getParent();
}
return null;
}
},childSelector:".dijitTreeRow",isExpandoNode:function(node,_9d5){
return dom.isDescendant(node,_9d5.expandoNode)||dom.isDescendant(node,_9d5.expandoNodeText);
},_onNodePress:function(_9d6,e){
_9d6.focus();
},__click:function(_9d7,e,_9d8,func){
var _9d9=e.target,_9da=this.isExpandoNode(_9d9,_9d7);
if(_9d7.isExpandable&&(_9d8||_9da)){
this._onExpandoClick({node:_9d7});
}else{
this._publish("execute",{item:_9d7.item,node:_9d7,evt:e});
this[func](_9d7.item,_9d7,e);
this.focusNode(_9d7);
}
e.stopPropagation();
e.preventDefault();
},_onClick:function(_9db,e){
this.__click(_9db,e,this.openOnClick,"onClick");
},_onDblClick:function(_9dc,e){
this.__click(_9dc,e,this.openOnDblClick,"onDblClick");
},_onExpandoClick:function(_9dd){
var node=_9dd.node;
this.focusNode(node);
if(node.isExpanded){
this._collapseNode(node);
}else{
this._expandNode(node);
}
},onClick:function(){
},onDblClick:function(){
},onOpen:function(){
},onClose:function(){
},_getNextNode:function(node){
_981.deprecated(this.declaredClass+"::_getNextNode(node) is deprecated. Use _getNext(node) instead.","","2.0");
return this._getNext(node);
},_getRootOrFirstNode:function(){
_981.deprecated(this.declaredClass+"::_getRootOrFirstNode() is deprecated. Use _getFirst() instead.","","2.0");
return this._getFirst();
},_collapseNode:function(node){
if(node._expandNodeDeferred){
delete node._expandNodeDeferred;
}
if(node.state=="Loading"){
return;
}
if(node.isExpanded){
var ret=node.collapse();
this.onClose(node.item,node);
this._state(node,false);
this._startPaint(ret);
return ret;
}
},_expandNode:function(node){
if(node._expandNodeDeferred){
return node._expandNodeDeferred;
}
var _9de=this.model,item=node.item,_9df=this;
if(!node._loadDeferred){
node.markProcessing();
node._loadDeferred=new _97b();
_9de.getChildren(item,function(_9e0){
node.unmarkProcessing();
node.setChildItems(_9e0).then(function(){
node._loadDeferred.resolve(_9e0);
});
},function(err){
console.error(_9df,": error loading "+node.label+" children: ",err);
node._loadDeferred.reject(err);
});
}
var def=node._loadDeferred.then(lang.hitch(this,function(){
var def2=node.expand();
this.onOpen(node.item,node);
this._state(node,true);
return def2;
}));
this._startPaint(def);
return def;
},focusNode:function(node){
this.focusChild(node);
},_onNodeMouseEnter:function(){
},_onNodeMouseLeave:function(){
},_onItemChange:function(item){
var _9e1=this.model,_9e2=_9e1.getIdentity(item),_9e3=this._itemNodesMap[_9e2];
if(_9e3){
var _9e4=this.getLabel(item),_9e5=this.getTooltip(item);
_976.forEach(_9e3,function(node){
node.set({item:item,label:_9e4,tooltip:_9e5});
node._updateItemClasses(item);
});
}
},_onItemChildrenChange:function(_9e6,_9e7){
var _9e8=this.model,_9e9=_9e8.getIdentity(_9e6),_9ea=this._itemNodesMap[_9e9];
if(_9ea){
_976.forEach(_9ea,function(_9eb){
_9eb.setChildItems(_9e7);
});
}
},_onItemDelete:function(item){
var _9ec=this.model,_9ed=_9ec.getIdentity(item),_9ee=this._itemNodesMap[_9ed];
if(_9ee){
_976.forEach(_9ee,function(node){
this.dndController.removeTreeNode(node);
var _9ef=node.getParent();
if(_9ef){
_9ef.removeChild(node);
}
node.destroyRecursive();
},this);
delete this._itemNodesMap[_9ed];
}
},_initState:function(){
this._openedNodes={};
if(this.persist&&this.cookieName){
var oreo=_979(this.cookieName);
if(oreo){
_976.forEach(oreo.split(","),function(item){
this._openedNodes[item]=true;
},this);
}
}
},_state:function(node,_9f0){
if(!this.persist){
return false;
}
var path=_976.map(node.getTreePath(),function(item){
return this.model.getIdentity(item);
},this).join("/");
if(arguments.length===1){
return this._openedNodes[path];
}else{
if(_9f0){
this._openedNodes[path]=true;
}else{
delete this._openedNodes[path];
}
this._saveExpandedNodes();
}
},_saveExpandedNodes:function(){
if(this.persist&&this.cookieName){
var ary=[];
for(var id in this._openedNodes){
ary.push(id);
}
_979(this.cookieName,ary.join(","),{expires:365});
}
},destroy:function(){
if(this._curSearch){
this._curSearch.timer.remove();
delete this._curSearch;
}
if(this.rootNode){
this.rootNode.destroyRecursive();
}
if(this.dndController&&!lang.isString(this.dndController)){
this.dndController.destroy();
}
this.rootNode=null;
this.inherited(arguments);
},destroyRecursive:function(){
this.destroy();
},resize:function(_9f1){
if(_9f1){
_97d.setMarginBox(this.domNode,_9f1);
}
this._nodePixelIndent=_97d.position(this.tree.indentDetector).w||this._nodePixelIndent;
this.expandChildrenDeferred.then(lang.hitch(this,function(){
this.rootNode.set("indent",this.showRoot?0:-1);
this._adjustWidths();
}));
},_outstandingPaintOperations:0,_startPaint:function(p){
this._outstandingPaintOperations++;
if(this._adjustWidthsTimer){
this._adjustWidthsTimer.remove();
delete this._adjustWidthsTimer;
}
var oc=lang.hitch(this,function(){
this._outstandingPaintOperations--;
if(this._outstandingPaintOperations<=0&&!this._adjustWidthsTimer&&this._started){
this._adjustWidthsTimer=this.defer("_adjustWidths");
}
});
when(p,oc,oc);
},_adjustWidths:function(){
if(this._adjustWidthsTimer){
this._adjustWidthsTimer.remove();
delete this._adjustWidthsTimer;
}
this.containerNode.style.width="auto";
this.containerNode.style.width=this.domNode.scrollWidth>this.domNode.offsetWidth?"auto":"100%";
},_createTreeNode:function(args){
return new _996(args);
},focus:function(){
if(this.lastFocusedChild){
this.focusNode(this.lastFocusedChild);
}else{
this.focusFirstChild();
}
}});
if(has("dojo-bidi")){
Tree.extend({_setTextDirAttr:function(_9f2){
if(_9f2&&this.textDir!=_9f2){
this._set("textDir",_9f2);
this.rootNode.set("textDir",_9f2);
}
}});
}
Tree.PathError=_97f("TreePathError");
Tree._TreeNode=_996;
return Tree;
});
},"dijit/form/_FormValueWidget":function(){
define(["dojo/_base/declare","dojo/sniff","./_FormWidget","./_FormValueMixin"],function(_9f3,has,_9f4,_9f5){
return _9f3("dijit.form._FormValueWidget",[_9f4,_9f5],{_layoutHackIE7:function(){
if(has("ie")==7){
var _9f6=this.domNode;
var _9f7=_9f6.parentNode;
var _9f8=_9f6.firstChild||_9f6;
var _9f9=_9f8.style.filter;
var _9fa=this;
while(_9f7&&_9f7.clientHeight==0){
(function ping(){
var _9fb=_9fa.connect(_9f7,"onscroll",function(){
_9fa.disconnect(_9fb);
_9f8.style.filter=(new Date()).getMilliseconds();
_9fa.defer(function(){
_9f8.style.filter=_9f9;
});
});
})();
_9f7=_9f7.parentNode;
}
}
}});
});
},"url:dijit/form/templates/Button.html":"<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:__onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\tdata-dojo-attach-event=\"onclick:_onClick\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n","url:dijit/templates/MenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,textDirNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<span data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<span class=\"dijitInline dijitIcon dijitMenuExpand\"></span>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</span>\n\t</td>\n</tr>\n","url:dijit/templates/TooltipDialog.html":"<div role=\"alertdialog\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class=\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\" data-dojo-attach-point=\"connectorNode\"></div>\n</div>\n","url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","url:dijit/form/templates/ValidationTextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n","url:dijit/templates/CheckedMenuItem.html":"<tr class=\"dijitReset dijitMenuItem\" data-dojo-attach-point=\"focusNode\" role=\"${role}\" tabIndex=\"-1\" aria-checked=\"${checked}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<span class=\"dijitInline dijitIcon dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t\t<span class=\"dijitMenuItemIconChar dijitCheckedMenuItemIconChar\">${checkedChar}</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode,textDirNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n","url:dijit/form/templates/DropDownBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\taria-haspopup=\"true\"\n\tdata-dojo-attach-point=\"_popupStateNode\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"button presentation\" aria-hidden=\"true\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\"\n\t/></div\n></div>\n","url:dijit/templates/Menu.html":"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n","url:dijit/templates/TreeNode.html":"<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow\" role=\"presentation\"\n\t\t><span data-dojo-attach-point=\"expandoNode\" class=\"dijitInline dijitTreeExpando\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitTreeIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span data-dojo-attach-point=\"labelNode,focusNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeNodeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n","url:dijit/form/templates/DropDownButton.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:__onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode,_popupStateNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onclick:_onClick\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n","url:dijit/templates/MenuBarItem.html":"<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\"\n\t \trole=\"menuitem\" tabIndex=\"-1\">\n\t<span data-dojo-attach-point=\"containerNode,textDirNode\"></span>\n</div>\n","url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n></div>\n","url:dijit/templates/MenuBar.html":"<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\" role=\"menubar\" tabIndex=\"${tabIndex}\"\n\t ></div>\n","url:dijit/templates/Dialog.html":"<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"\n\t\t\t\trole=\"heading\" level=\"1\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabindex=\"0\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n","url:dijit/templates/ColorPalette.html":"<div class=\"dijitInline dijitColorPalette\" role=\"grid\">\n\t<table dojoAttachPoint=\"paletteTableNode\" class=\"dijitPaletteTable\" cellSpacing=\"0\" cellPadding=\"0\" role=\"presentation\">\n\t\t<tbody data-dojo-attach-point=\"gridNode\"></tbody>\n\t</table>\n</div>\n","url:dijit/templates/Tree.html":"<div role=\"tree\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n\t<div class=\"dijitTreeExpando dijitTreeExpandoLoading\" data-dojo-attach-point=\"rootLoadingIndicator\"></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\">\n\t</div>\n</div>\n","*now":function(r){
r(["dojo/i18n!*preload*dojo/layers/nls/dijit*[\"en\",\"pt\",\"pt-br\",\"ROOT\"]"]);
}}});
define("dojo/layers/dijit",[],1);
