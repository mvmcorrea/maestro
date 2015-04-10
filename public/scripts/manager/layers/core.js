//>>built
require({cache:{"manager/DialogSimple":function(){
define("manager/DialogSimple",["dojo/_base/declare","manager/Dialog"],function(_1,_2){
return _1("Manager.DialogSimple",[_2],{});
});
},"manager/Form":function(){
define("manager/Form",["dojo/_base/declare"],function(_3){
return _3("Manager.Form",[],{id:null,onLoad:new Function(),onSubmit:new Function(),validators:null,connections:null,constructor:function(id){
this.id=id;
this.connections=[];
},setFocus:function(_4){
if(_4==""){
var _5=null;
var f=manager.getElementById(this.id);
var _6=f.getElementsByTagName("input");
if(_6.length==0){
var _6=f.getElementsByTagName("select");
if(_6.length>0){
_5=_6[0];
}
}else{
_5=_6[0];
}
}else{
var _5=manager.getElementById(_4);
}
if(_5!=null){
_5.focus();
}
},getInputs:function(){
var _7=new Object();
var f=manager.getElementById(this.id);
var _8=f.getElementsByTagName("input");
for(var i=0,_9=_8.length;i<_9;i++){
var _a=_8[i];
if((_a.type=="text")||(_a.type=="hidden")){
if(_7[_a.name]){
_7[_a.name]+="&"+_a.value;
}else{
_7[_a.name]=_a.value;
}
}
if(_a.type=="checkbox"){
if(_a.checked){
_7[_a.name]=(_a.value==""?"on":_a.value);
}
}
if(_a.type=="radio"){
if(_a.checked){
_7[_a.name]=_a.value;
}
}
}
var _8=f.getElementsByTagName("select");
for(var i=0,_9=_8.length;i<_9;i++){
var _a=_8[i];
_7[_a.name]=_a.options[_a.selectedIndex].value;
}
return _7;
},getForm:function(){
return manager.getElementById("frm_"+this.id);
},setAction:function(_b){
manager.getElementById("frm_"+this.id).action=_b;
},getAction:function(){
return manager.getElementById("frm_"+this.id).action;
},init:function(){
this.validators=null;
},submit:function(){
return manager.getElementById("frm_"+this.id).submit();
},connect:function(_c,_d,_e){
var _f=dojo.byId(_c);
if(!_f){
return;
}
this.connections.push(dojo.connect(_f,_d,_e));
},disconnect:function(){
dojo.forEach(this.connections,dojo.disconnect);
this.connections.length=0;
}});
});
},"manager/UTF8":function(){
define("manager/UTF8",["dojo/_base/declare"],function(_10){
return _10("Manager.UTF8",[],{constructor:function(id){
},encode:function(_11){
_11=_11.replace(/\r\n/g,"\n");
var _12="";
for(var n=0;n<_11.length;n++){
var c=_11.charCodeAt(n);
if(c<128){
_12+=String.fromCharCode(c);
}else{
if((c>127)&&(c<2048)){
_12+=String.fromCharCode((c>>6)|192);
_12+=String.fromCharCode((c&63)|128);
}else{
_12+=String.fromCharCode((c>>12)|224);
_12+=String.fromCharCode(((c>>6)&63)|128);
_12+=String.fromCharCode((c&63)|128);
}
}
}
return _12;
},decode:function(_13){
var _14="";
var i=0;
var c=c1=c2=0;
while(i<_13.length){
c=_13.charCodeAt(i);
if(c<128){
_14+=String.fromCharCode(c);
i++;
}else{
if((c>191)&&(c<224)){
c2=_13.charCodeAt(i+1);
_14+=String.fromCharCode(((c&31)<<6)|(c2&63));
i+=2;
}else{
c2=_13.charCodeAt(i+1);
c3=_13.charCodeAt(i+2);
_14+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
i+=3;
}
}
}
return _14;
}});
});
},"manager/ElementPane":function(){
define("manager/ElementPane",["dojo/_base/declare","dojo/query","dojox/layout/ContentPane"],function(_15,_16,_17){
return _15("Manager.ElementPane",[_17],{executeScripts:true,baseClass:"mElement",onLoad:function(){
var _18=_16("#"+this.id+" div.mScripts");
if(_18.length){
manager.onLoad[_18[0].id].apply();
manager.onLoad[_18[0].id]=null;
}
},cleanContent:true});
});
},"manager/Ajax":function(){
define("manager/Ajax",["dojo/_base/declare","dojo/_base/lang","dojo/request","dojo/request/iframe"],function(_19,_1a,_1b,_1c){
return _19("Manager.Ajax",[],{loading:"<img src=\"images/loading.gif\" border=\"0\" alt=\"\">",url:null,form:null,response_type:"JSON",updateElement:null,parameters:null,content:null,remote_method:"",load:null,sync:false,constructor:function(obj){
if(obj.url){
this.url=obj.url;
}
if(obj.form){
this.form=obj.form;
}
if(obj.content){
this.content=obj.content;
}
if(obj.response_type){
this.response_type=obj.response_type;
}
if(obj.updateElement){
this.updateElement=obj.updateElement;
}
if(obj.parameters){
this.parameters=obj.parameters;
}
if(obj.remote_method){
this.remote_method=obj.remote_method;
}
if(obj.callback_function){
this.callback_function=obj.callback_function;
}
if(obj.load){
this.load=obj.load;
}
if(obj.sync){
this.sync=obj.sync;
}
},update:function(_1d,_1e){
manager.getElementById(this.updateElement).innerHTML=_1d;
},error:function(_1f,_20){
if(errDiv=manager.getElementById("stdout")){
errDiv.innerHTML=_20.xhr.responseText;
}
},ioerror:function(_21,_22){
},getParameters:function(){
var _23={};
if(this.parameters!=null){
if(_1a.isFunction(this.parameters)){
_23=this.parameters();
if(!_1a.isObject(_23)){
_23={__EVENTARGUMENT:_23};
}
}else{
_23=this.parameters;
}
}
_23.__ISAJAXCALL="yes";
_23.__EVENTTARGETVALUE=this.remote_method;
_23.ajaxResponseType=response_type;
return _23;
},get:function(){
var _24=this.callback_function?this.callback_function:this.update;
var _25=this.response_type.toLowerCase();
var _26=this.url?this.url:manager.getCurrentURL();
var _27={};
_27.args={query:this.getParameters(),handleAs:_25,sync:this.sync};
_1b.get(_26,_27.args).then(function(_28){
_24(_28,_27);
});
},call:function(){
var _29=this.response_type.toLowerCase();
if(this.updateElement){
this.update(this.loading);
}
var _2a=this.url?this.url:manager.getAction();
var _2b=this.callback_function?this.callback_function:this.update;
var _2c={};
if(this.form!=null){
this.content.ajaxResponseType=_29;
_2c.args={form:this.form,data:this.content,content:this.content,handleAs:_29};
if(manager.page.fileUpload=="yes"){
_1c.post(_2a,_2c.args).then(function(_2d){
_2b(_2d,_2c);
});
}else{
_1b.post(_2a,_2c.args).then(function(_2e){
_2b(_2e,_2c);
});
}
}else{
_2c.args={updateElement:this.updateElement,data:this.content,content:this.content,handleAs:_29};
_1b.post(_2a,_2c.args).then(function(_2f){
_2b(_2f,_2c);
});
}
}});
});
},"manager/Utils":function(){
define(["dijit","dojo","dojox"],function(_30,_31,_32){
function _33(_34){
var _35=/^([\w\W]*)(\b\s*)$/;
if(_35.test(_34)){
_34=_34.replace(_35,"$1");
}
return _34;
};
function _36(_37){
var _38=/^(\s*)(\b[\w\W]*)$/;
if(_38.test(_37)){
_37=_37.replace(_38,"$2");
}
return _37;
};
function _39(_3a){
var _3b=/^(\s*)$/;
if(_3b.test(_3a)){
_3a=_3a.replace(_3b,"");
if(_3a.length==0){
return _3a;
}
}
_3b=/^(\s*)([\W\w]*)(\b\s*$)/;
if(_3b.test(_3a)){
_3a=_3a.replace(_3b,"$2");
}
return _3a;
};
function _3c(_3d){
var _3e=/,/g;
return _3d.replace(_3e,"");
};
function _3f(_40){
var _41=new RegExp("(-?[0-9]+)([0-9]{3})");
while(_41.test(_40)){
_40=_40.replace(_41,"$1,$2");
}
return _40;
};
function _42(_43){
var _44=new RegExp("(-?[0-9]+)([0-9]{3})");
while(_44.test(_43)){
_43=_43.replace(_44,"$1.$2");
}
return _43;
};
function _45(_46,_47){
var _48=new RegExp(_47,"gi");
return _46.replace(_48,"");
};
function _49(_4a){
_4a=_4a.replace(/\u2013/g,"-");
_4a=_4a.replace(/\u201A/g,"'");
_4a=_4a.replace(/\u201E/g,"\"");
_4a=_4a.replace(/\u02C6/g,"^");
_4a=_4a.replace(/\u2018/g,"'");
_4a=_4a.replace(/\u2019/g,"'");
_4a=_4a.replace(/\u201D/g,"\"");
_4a=_4a.replace(/\u201C/g,"\"");
_4a=_4a.replace(/\u2022/g,".");
_4a=_4a.replace(/\u2014/g,"-");
_4a=_4a.replace(/\u02DC/g,"~");
return _4a;
};
function _4b(id){
manager.getElementById(id).value=_49(manager.getElementById(id).value);
};
function _4c(_4d,_4e,_4f,_50){
var _51="",_52;
var _53=function(s,len){
var _54="",i;
while(_54.length<len){
_54+=s;
}
_54=_54.substr(0,len);
return _54;
};
_4d+="";
_4f=_4f!==undefined?_4f:" ";
if(_50!="STR_PAD_LEFT"&&_50!="STR_PAD_RIGHT"&&_50!="STR_PAD_BOTH"){
_50="STR_PAD_RIGHT";
}
if((_52=_4e-_4d.length)>0){
if(_50=="STR_PAD_LEFT"){
_4d=_53(_4f,_52)+_4d;
}else{
if(_50=="STR_PAD_RIGHT"){
_4d=_4d+_53(_4f,_52);
}else{
if(_50=="STR_PAD_BOTH"){
_51=_53(_4f,Math.ceil(_52/2));
_4d=_51+_4d+_51;
_4d=_4d.substr(0,_4e);
}
}
}
}
return _4d;
};
});
},"manager/Patches":function(){
define("manager/Patches",["dojo/_base/declare","dojo/cldr/supplemental"],function(_55,_56){
return _55("Manager.Patches",[],{constructor:function(){
_56.getFirstDayOfWeek=function(_57){
var _58={mv:5,br:0,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,sy:6,tn:6,ye:6,ar:0,as:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,il:0,"in":0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mn:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,zw:0};
var _59=_56._region(_57);
var dow=_58[_59];
return (dow===undefined)?1:dow;
};
}});
});
},"manager/Window":function(){
define("manager/Window",["dojo/_base/declare","dojo/_base/lang","dojo/on","dojo/topic","manager/Dialog","manager/DialogSimple"],function(_5a,_5b,on,_5c,_5d,_5e){
return _5a("Manager.Window",null,{id:"",title:"",href:"",parent:null,form:"",template:"",element:"",dialog:null,scripts:null,constructor:function(id){
this.obj=this;
this.id=id;
this.dialog=new _5d({id:id});
on(this.dialog,"load",_5b.hitch(this.dialog,function(){
this.enableDrag();
this._position();
}));
},setTitle:function(_5f){
this.title=_5f;
},setHref:function(_60){
this.href=_60;
},push:function(){
this.obj.template=manager.page.template;
this.obj.element=manager.page.element;
manager.pushWindow(this.obj);
},open:function(){
this.obj.push();
manager.page.get(this.obj.href,this.obj.id);
this.dialog.show();
_5c.publish("windowActionOpen",this.obj.id);
},show:function(){
this.dialog.show();
},hide:function(){
this.dialog.hide();
},setContent:function(_61){
this.dialog.set("content",_61);
},showContent:function(_62){
this.obj.push();
this.dialog.set("content",_62);
this.dialog.show();
},close:function(){
this.dialog.hide();
_5c.publish("windowActionClose",this.obj.id);
this.dialog.destroyDescendants();
this.obj.pop();
},pop:function(){
manager.page.template=this.obj.template;
manager.page.element=this.obj.element;
manager.popWindow();
}});
});
},"manager/Page":function(){
define("manager/Page",["dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/_base/array","dijit/registry","dojo/dom-construct","dojo/dom-form","dojo/i18n!./nls/messages","manager/Base64","dojox/widget/Standby"],function(_63,_64,_65,_66,_67,_68,_69,_6a,_6b,_6c){
return _63("Manager.Page",[],{version:"1.1",ajaxEvent:"no",fileUpload:"no",layout:"default",element:"",mainElement:"centerPane",template:"base",eventTarget:"",i18n:_6a,standby:"",callbackFunction:"",constructor:function(){
this.obj=this;
},getContent:function(_6d){
var _6e={__LAYOUT:manager.page.layout,__ELEMENT:manager.page.element,__TEMPLATE:manager.page.template,__ISFILEUPLOAD:manager.page.fileUpload,__ISAJAXEVENT:manager.page.ajaxEvent,__EVENTTARGET:manager.page.eventTarget};
var _6f={};
if(_6d){
_6f=_69.toObject(_6d);
}
return _64.mixin(_6e,_6f);
},get:function(url,_70){
if(_70==""){
_70=this.mainElement;
}
_67.byId(_70).set("href",url);
},page:function(url){
manager.disconnect();
_65.location=url;
},ajax:function(url,_71,_72){
var _73=this.fileUpload;
this.setBusy(_72);
this.ajaxEvent="yes";
this.template="ajax";
this.fileUpload="no";
this.callbackFunction=_71;
var _74=new Manager.Ajax({url:url,form:_72,content:manager.page.getContent(_72),response_type:"JSON",callback_function:manager.page.callbackFunction});
_74.call();
this.fileUpload=_73;
},ajaxText:function(url,_75,_76){
var _77=this.fileUpload;
this.setBusy(_76);
this.ajaxEvent="yes";
this.template="ajax";
this.fileUpload="no";
var _78=this.element;
this.element=_75;
var _79=new Manager.Ajax({url:url,form:_76,content:manager.page.getContent(_76),response_type:"JSON",callback_function:manager.page.callback});
_79.call();
this.element=_78;
this.fileUpload=_77;
},postback:function(_7a){
if(_7a){
this.setBusy(_7a);
this.element=manager.getLayoutElement(_7a);
var _7b=manager.getElementById("__ISFILEUPLOADPOST");
this.fileUpload=(_7b!=null)?_7b.value:this.fileUpload;
}
var url=_67.byId(_7a).get("action");
var _7c=new Manager.Ajax({url:url,form:_7a,content:manager.page.getContent(_7a),response_type:"JSON",callback_function:manager.page.callback});
_7c.call();
},callback:function(_7d,_7e){
var _7f=_7e.args.content.__ELEMENT;
manager.page.updateElement(_7f,_7d);
manager.page.clearBusy();
},updateElement:function(_80,_81){
if(_81.base64){
var _82=new _6b();
var _83=_82.decode(_81.base64);
_81=eval("("+_83+")");
}
if(_81.data){
var _84=_81.data;
var id=_81.id;
if(_81.type=="page"){
if(_80==""){
_80="__updateElement";
}
var _85=_67.byId(_80);
if(!_85){
var div=_68.create("div");
div.id=_80;
_68.place(div,_65.body(),"last");
_85=new Manager.ElementPane({content:_84},_80);
}
try{
_66.forEach(_85.getDescendants(),function(_86){
if(_67.byId(_86.id)){
_86.destroyRecursive();
}
});
_85.setContent(_84);
}
catch(err){
}
}
if(_81.type=="prompt"){
manager.doPrompt(id,_84);
}
if(_81.type=="window"){
manager.doWindow(_81.data);
}
if(_81.type=="file"){
manager.doFile(_81.data,id);
}
if(manager.onLoad[id]){
manager.onLoad[id].apply();
}
}
},setBusy:function(id){
var use=manager.getElementById("useSetBusy");
if(use&&(use.value=="no")){
return;
}
if(_67.byId("page_standby")){
this.clearBusy(id);
}
this.standby=new _6c({target:id,id:"page_standby",text:this.i18n.PLEASE_WAIT});
document.body.appendChild(this.standby.domNode);
this.standby.startup();
this.standby.show();
},clearBusy:function(){
if(_67.byId("page_standby")){
_67.byId("page_standby").hide();
_67.byId("page_standby").destroy();
}
}});
});
},"manager/Hash":function(){
define("manager/Hash",["dojo/_base/declare"],function(_87){
return _87("Manager.Hash",[],{length:0,items:new Array(),constructor:function(){
this.length=0;
},remove:function(_88){
var _89;
if(typeof (this.items[_88])!="undefined"){
this.length--;
var _89=this.items[_88];
delete this.items[_88];
}
return _89;
},get:function(_8a){
return this.items[_8a];
},set:function(_8b,_8c){
if(typeof (_8c)!="undefined"){
if(typeof (this.items[_8b])=="undefined"){
this.length++;
}
this.items[_8b]=_8c;
}
return _8c;
},has:function(_8d){
return typeof (this.items[_8d])!="undefined";
}});
});
},"manager/Dialog":function(){
require({cache:{"url:manager/templates/Dialog.html":"<div class=\"mBoxPaneDialog mElement\" role=\"dialog\" aria-labelledby=\"${id}_title\"  cleanContent=\"true\">\n    <div >\n\t<span></span>\n\t<span dojoAttachPoint=\"closeButtonNode\"></span>\n    </div>  \n<div  id=\"${id}_container\" dojoAttachPoint=\"containerNode\"></div>\n</div>\n"}});
define("manager/Dialog",["dojo/_base/declare","dojo/_base/window","dojo/_base/lang","dojo/aspect","dojo/dom-geometry","dojo/query","dojo/has","dojo/topic","dojo/dom-class","dojo/dom-style","dijit/Dialog","dojo/dnd/Moveable","manager/ElementPane","dojo/text!./templates/Dialog.html"],function(_8e,_8f,_90,_91,_92,_93,has,_94,_95,_96,_97,_98,_99,_9a){
return _8e("Manager.Dialog",[_97,_99],{widgetsInTemplate:true,templateString:_9a,enableDrag:function(){
var _9b=this.domNode;
var _9c=_93(" > form div div *",this.containerNode.id);
var _9d=_9c.shift();
if(_9d&&this.draggable){
this._moveable=new ((has("ie")==6)?TimedMoveable:_98)(_9b,{handle:_9d});
_91.after(this._moveable,"onMoveStop",_90.hitch(this,"_endDrag"),true);
}else{
_95.add(_9b,"dijitDialogFixed");
}
}});
});
},"manager/Base64":function(){
define("manager/Base64",["dojo/_base/declare"],function(_9e){
return _9e("Manager.Base64",[],{constructor:function(){
},_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(_9f){
var _a0="";
var _a1,_a2,_a3,_a4,_a5,_a6,_a7;
var i=0;
_9f=this._utf8_encode(_9f);
while(i<_9f.length){
_a1=_9f.charCodeAt(i++);
_a2=_9f.charCodeAt(i++);
_a3=_9f.charCodeAt(i++);
_a4=_a1>>2;
_a5=((_a1&3)<<4)|(_a2>>4);
_a6=((_a2&15)<<2)|(_a3>>6);
_a7=_a3&63;
if(isNaN(_a2)){
_a6=_a7=64;
}else{
if(isNaN(_a3)){
_a7=64;
}
}
_a0=_a0+this._keyStr.charAt(_a4)+this._keyStr.charAt(_a5)+this._keyStr.charAt(_a6)+this._keyStr.charAt(_a7);
}
return _a0;
},decode:function(_a8){
var _a9="";
var _aa,_ab,_ac;
var _ad,_ae,_af,_b0;
var i=0;
_a8=_a8.replace(/[^A-Za-z0-9\+\/\=]/g,"");
while(i<_a8.length){
_ad=this._keyStr.indexOf(_a8.charAt(i++));
_ae=this._keyStr.indexOf(_a8.charAt(i++));
_af=this._keyStr.indexOf(_a8.charAt(i++));
_b0=this._keyStr.indexOf(_a8.charAt(i++));
_aa=(_ad<<2)|(_ae>>4);
_ab=((_ae&15)<<4)|(_af>>2);
_ac=((_af&3)<<6)|_b0;
_a9=_a9+String.fromCharCode(_aa);
if(_af!=64){
_a9=_a9+String.fromCharCode(_ab);
}
if(_b0!=64){
_a9=_a9+String.fromCharCode(_ac);
}
}
_a9=this._utf8_decode(_a9);
return _a9;
},_utf8_encode:function(_b1){
_b1=_b1.replace(/\r\n/g,"\n");
var _b2="";
for(var n=0;n<_b1.length;n++){
var c=_b1.charCodeAt(n);
if(c<128){
_b2+=String.fromCharCode(c);
}else{
if((c>127)&&(c<2048)){
_b2+=String.fromCharCode((c>>6)|192);
_b2+=String.fromCharCode((c&63)|128);
}else{
_b2+=String.fromCharCode((c>>12)|224);
_b2+=String.fromCharCode(((c>>6)&63)|128);
_b2+=String.fromCharCode((c&63)|128);
}
}
}
return _b2;
},_utf8_decode:function(_b3){
var _b4="";
var i=0;
var c=c1=c2=0;
while(i<_b3.length){
c=_b3.charCodeAt(i);
if(c<128){
_b4+=String.fromCharCode(c);
i++;
}else{
if((c>191)&&(c<224)){
c2=_b3.charCodeAt(i+1);
_b4+=String.fromCharCode(((c&31)<<6)|(c2&63));
i+=2;
}else{
c2=_b3.charCodeAt(i+1);
c3=_b3.charCodeAt(i+2);
_b4+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
i+=3;
}
}
}
return _b4;
}});
});
},"manager/MD5":function(){
function _b5(n){
for(i=0;i<n;i++){
this[i]=0;
}
this.length=n;
};
define("manager/MD5",["dojo/_base/declare"],function(_b6){
return _b6("Manager.MD5",[],{constructor:function(){
},array:function(n){
var a;
for(i=0;i<n;i++){
a[i]=0;
}
a.length=n;
return a;
},integer:function(n){
return n%(4294967295+1);
},shr:function(a,b){
a=this.integer(a);
b=this.integer(b);
if(a-2147483648>=0){
a=a%2147483648;
a>>=b;
a+=1073741824>>(b-1);
}else{
a>>=b;
}
return a;
},shl1:function(a){
a=a%2147483648;
if(a&1073741824==1073741824){
a-=1073741824;
a*=2;
a+=2147483648;
}else{
a*=2;
}
return a;
},shl:function(a,b){
a=this.integer(a);
b=this.integer(b);
for(var i=0;i<b;i++){
a=this.shl1(a);
}
return a;
},and:function(a,b){
a=this.integer(a);
b=this.integer(b);
var t1=(a-2147483648);
var t2=(b-2147483648);
if(t1>=0){
if(t2>=0){
return ((t1&t2)+2147483648);
}else{
return (t1&b);
}
}else{
if(t2>=0){
return (a&t2);
}else{
return (a&b);
}
}
},or:function(a,b){
a=this.integer(a);
b=this.integer(b);
var t1=(a-2147483648);
var t2=(b-2147483648);
if(t1>=0){
if(t2>=0){
return ((t1|t2)+2147483648);
}else{
return ((t1|b)+2147483648);
}
}else{
if(t2>=0){
return ((a|t2)+2147483648);
}else{
return (a|b);
}
}
},xor:function(a,b){
a=this.integer(a);
b=this.integer(b);
var t1=(a-2147483648);
var t2=(b-2147483648);
if(t1>=0){
if(t2>=0){
return (t1^t2);
}else{
return ((t1^b)+2147483648);
}
}else{
if(t2>=0){
return ((a^t2)+2147483648);
}else{
return (a^b);
}
}
},not:function(a){
a=this.integer(a);
return (4294967295-a);
},state:new _b5(4),count:new _b5(2),buffer:new _b5(64),transformBuffer:new _b5(16),digestBits:new _b5(16),S11:7,S12:12,S13:17,S14:22,S21:5,S22:9,S23:14,S24:20,S31:4,S32:11,S33:16,S34:23,S41:6,S42:10,S43:15,S44:21,F:function(x,y,z){
return this.or(this.and(x,y),this.and(this.not(x),z));
},G:function(x,y,z){
return this.or(this.and(x,z),this.and(y,this.not(z)));
},H:function(x,y,z){
return this.xor(this.xor(x,y),z);
},I:function(x,y,z){
return this.xor(y,this.or(x,this.not(z)));
},rotateLeft:function(a,n){
return this.or(this.shl(a,n),(this.shr(a,(32-n))));
},FF:function(a,b,c,d,x,s,ac){
a=a+this.F(b,c,d)+x+ac;
a=this.rotateLeft(a,s);
a=a+b;
return a;
},GG:function(a,b,c,d,x,s,ac){
a=a+this.G(b,c,d)+x+ac;
a=this.rotateLeft(a,s);
a=a+b;
return a;
},HH:function(a,b,c,d,x,s,ac){
a=a+this.H(b,c,d)+x+ac;
a=this.rotateLeft(a,s);
a=a+b;
return a;
},II:function(a,b,c,d,x,s,ac){
a=a+this.I(b,c,d)+x+ac;
a=this.rotateLeft(a,s);
a=a+b;
return a;
},transform:function(buf,_b7){
var a=0,b=0,c=0,d=0;
var x=this.transformBuffer;
a=this.state[0];
b=this.state[1];
c=this.state[2];
d=this.state[3];
for(i=0;i<16;i++){
x[i]=this.and(buf[i*4+_b7],255);
for(j=1;j<4;j++){
x[i]+=this.shl(this.and(buf[i*4+j+_b7],255),j*8);
}
}
a=this.FF(a,b,c,d,x[0],this.S11,3614090360);
d=this.FF(d,a,b,c,x[1],this.S12,3905402710);
c=this.FF(c,d,a,b,x[2],this.S13,606105819);
b=this.FF(b,c,d,a,x[3],this.S14,3250441966);
a=this.FF(a,b,c,d,x[4],this.S11,4118548399);
d=this.FF(d,a,b,c,x[5],this.S12,1200080426);
c=this.FF(c,d,a,b,x[6],this.S13,2821735955);
b=this.FF(b,c,d,a,x[7],this.S14,4249261313);
a=this.FF(a,b,c,d,x[8],this.S11,1770035416);
d=this.FF(d,a,b,c,x[9],this.S12,2336552879);
c=this.FF(c,d,a,b,x[10],this.S13,4294925233);
b=this.FF(b,c,d,a,x[11],this.S14,2304563134);
a=this.FF(a,b,c,d,x[12],this.S11,1804603682);
d=this.FF(d,a,b,c,x[13],this.S12,4254626195);
c=this.FF(c,d,a,b,x[14],this.S13,2792965006);
b=this.FF(b,c,d,a,x[15],this.S14,1236535329);
a=this.GG(a,b,c,d,x[1],this.S21,4129170786);
d=this.GG(d,a,b,c,x[6],this.S22,3225465664);
c=this.GG(c,d,a,b,x[11],this.S23,643717713);
b=this.GG(b,c,d,a,x[0],this.S24,3921069994);
a=this.GG(a,b,c,d,x[5],this.S21,3593408605);
d=this.GG(d,a,b,c,x[10],this.S22,38016083);
c=this.GG(c,d,a,b,x[15],this.S23,3634488961);
b=this.GG(b,c,d,a,x[4],this.S24,3889429448);
a=this.GG(a,b,c,d,x[9],this.S21,568446438);
d=this.GG(d,a,b,c,x[14],this.S22,3275163606);
c=this.GG(c,d,a,b,x[3],this.S23,4107603335);
b=this.GG(b,c,d,a,x[8],this.S24,1163531501);
a=this.GG(a,b,c,d,x[13],this.S21,2850285829);
d=this.GG(d,a,b,c,x[2],this.S22,4243563512);
c=this.GG(c,d,a,b,x[7],this.S23,1735328473);
b=this.GG(b,c,d,a,x[12],this.S24,2368359562);
a=this.HH(a,b,c,d,x[5],this.S31,4294588738);
d=this.HH(d,a,b,c,x[8],this.S32,2272392833);
c=this.HH(c,d,a,b,x[11],this.S33,1839030562);
b=this.HH(b,c,d,a,x[14],this.S34,4259657740);
a=this.HH(a,b,c,d,x[1],this.S31,2763975236);
d=this.HH(d,a,b,c,x[4],this.S32,1272893353);
c=this.HH(c,d,a,b,x[7],this.S33,4139469664);
b=this.HH(b,c,d,a,x[10],this.S34,3200236656);
a=this.HH(a,b,c,d,x[13],this.S31,681279174);
d=this.HH(d,a,b,c,x[0],this.S32,3936430074);
c=this.HH(c,d,a,b,x[3],this.S33,3572445317);
b=this.HH(b,c,d,a,x[6],this.S34,76029189);
a=this.HH(a,b,c,d,x[9],this.S31,3654602809);
d=this.HH(d,a,b,c,x[12],this.S32,3873151461);
c=this.HH(c,d,a,b,x[15],this.S33,530742520);
b=this.HH(b,c,d,a,x[2],this.S34,3299628645);
a=this.II(a,b,c,d,x[0],this.S41,4096336452);
d=this.II(d,a,b,c,x[7],this.S42,1126891415);
c=this.II(c,d,a,b,x[14],this.S43,2878612391);
b=this.II(b,c,d,a,x[5],this.S44,4237533241);
a=this.II(a,b,c,d,x[12],this.S41,1700485571);
d=this.II(d,a,b,c,x[3],this.S42,2399980690);
c=this.II(c,d,a,b,x[10],this.S43,4293915773);
b=this.II(b,c,d,a,x[1],this.S44,2240044497);
a=this.II(a,b,c,d,x[8],this.S41,1873313359);
d=this.II(d,a,b,c,x[15],this.S42,4264355552);
c=this.II(c,d,a,b,x[6],this.S43,2734768916);
b=this.II(b,c,d,a,x[13],this.S44,1309151649);
a=this.II(a,b,c,d,x[4],this.S41,4149444226);
d=this.II(d,a,b,c,x[11],this.S42,3174756917);
c=this.II(c,d,a,b,x[2],this.S43,718787259);
b=this.II(b,c,d,a,x[9],this.S44,3951481745);
this.state[0]+=a;
this.state[1]+=b;
this.state[2]+=c;
this.state[3]+=d;
},init:function(){
this.count[0]=this.count[1]=0;
this.state[0]=1732584193;
this.state[1]=4023233417;
this.state[2]=2562383102;
this.state[3]=271733878;
for(i=0;i<this.digestBits.length;i++){
this.digestBits[i]=0;
}
},update:function(b){
var _b8,i;
_b8=this.and(this.shr(this.count[0],3),63);
if(this.count[0]<4294967295-7){
this.count[0]+=8;
}else{
this.count[1]++;
this.count[0]-=4294967295+1;
this.count[0]+=8;
}
this.buffer[_b8]=this.and(b,255);
if(_b8>=63){
this.transform(this.buffer,0);
}
},finish:function(){
var _b9=new _b5(8);
var _ba;
var i=0,_bb=0,_bc=0;
for(i=0;i<4;i++){
_b9[i]=this.and(this.shr(this.count[0],(i*8)),255);
}
for(i=0;i<4;i++){
_b9[i+4]=this.and(this.shr(this.count[1],(i*8)),255);
}
_bb=this.and(this.shr(this.count[0],3),63);
_bc=(_bb<56)?(56-_bb):(120-_bb);
_ba=new _b5(64);
_ba[0]=128;
for(i=0;i<_bc;i++){
this.update(_ba[i]);
}
for(i=0;i<8;i++){
this.update(_b9[i]);
}
for(i=0;i<4;i++){
for(j=0;j<4;j++){
this.digestBits[i*4+j]=this.and(this.shr(this.state[i],(j*8)),255);
}
}
},hexa:function(n){
var _bd="0123456789abcdef";
var _be="";
var _bf=n;
for(hexa_i=0;hexa_i<8;hexa_i++){
_be=_bd.charAt(Math.abs(_bf)%16)+_be;
_bf=Math.floor(_bf/16);
}
return _be;
},ascii:"01234567890123456789012345678901"+" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",MD5:function(_c0){
var l,s,k,ka,kb,kc,kd;
this.init();
for(k=0;k<_c0.length;k++){
l=_c0.charAt(k);
this.update(this.ascii.lastIndexOf(l));
}
this.finish();
ka=kb=kc=kd=0;
for(i=0;i<4;i++){
ka+=this.shl(this.digestBits[15-i],(i*8));
}
for(i=4;i<8;i++){
kb+=this.shl(this.digestBits[15-i],((i-4)*8));
}
for(i=8;i<12;i++){
kc+=this.shl(this.digestBits[15-i],((i-8)*8));
}
for(i=12;i<16;i++){
kd+=this.shl(this.digestBits[15-i],((i-12)*8));
}
s=this.hexa(kd)+this.hexa(kc)+this.hexa(kb)+this.hexa(ka);
return s;
}});
});
},"manager/Core":function(){
define("manager/Core",["dojo/_base/declare","dojo/_base/array","dojo/dom","dojo/dom-class","dojo/dom-style","dojo/on","dojo/parser","dijit/registry","dojo/i18n!./nls/messages","manager/MD5","manager/Window","manager/Form","manager/DialogSimple","manager/Page","manager/Ajax"],function(_c1,_c2,dom,_c3,_c4,on,_c5,_c6,_c7,MD5,Win,_c8,_c9,_ca,_cb){
return {version:"Manager 1.1",md5:new MD5(),grid:null,webForm:null,connections:[],onSubmit:[],onLoad:[],i18n:_c7,action:"",page:new _ca(),windows:{handle:[],sufix:0,base:window},type:function(o){
return !!o&&Object.prototype.toString.call(o).match(/(\w+)\]/)[1];
},getAction:function(){
return this.action;
},setAction:function(_cc,_cd){
this.action=_cd;
if(_cc){
_c6.byId(_cc).set("action",_cd);
}
return _cd;
},getWindow:function(_ce){
return this.windows.handle[(_ce!=""?_ce:"current")];
},addWindow:function(_cf){
var _d0=_c6.byId(_cf);
if(!_d0){
this.windows.handle[_cf]=new Win(_cf);
}
return this.windows.handle[_cf];
},setWindow:function(_d1){
this.windows.handle["current"]=_d1;
},pushWindow:function(_d2){
var win=this.windows.handle["current"];
_d2.parent=win;
this.windows.handle["current"]=_d2;
},popWindow:function(){
var win=this.windows.handle["current"];
this.windows.handle["current"]=win.parent;
},forms:{handle:[]},getForm:function(_d3){
return this.forms.handle[_d3];
},addForm:function(_d4){
this.forms.handle[_d4]=new _c8(_d4);
return this.forms.handle[_d4];
},setForm:function(_d5){
var _d6=this.getForm(_d5);
this.webForm=(_d6?_d6:this.addForm(_d5));
},getElementById:function(e){
if(typeof (e)!="string"){
return e;
}
if(document.getElementById){
e=dom.byId(e);
}else{
if(document.all){
e=document.all[e];
}else{
e=null;
}
}
return e;
},byId:function(id){
var _d7=_c6.byId(id);
if(_d7){
var _d8=_d7;
}else{
var _d8=dom.byId(id);
}
return _d8;
},getElementsByTagName:function(_d9,p){
var _da=null;
_d9=_d9||"*";
p=p||document;
if(p.getElementsByTagName){
_da=p.getElementsByTagName(_d9);
}
return _da||new Array();
},setElementValueById:function(e,_db){
var _dc=this.getElementById(e);
if(_dc!=null){
_dc.value=_db;
}
},getElementValueById:function(e){
var _dd=this.getElementById(e);
if(_dd!=null){
return _dd.value;
}
return null;
},getParentForm:function(_de){
var _df=dom.byId(_de);
root=dojo.doc;
while(_df&&_df!==root){
if(_df.action!==undefined){
return _df.id;
}
_df=_df.parentNode;
}
return null;
},getLayoutElement:function(_e0){
var _e1=dom.byId(_e0);
root=dojo.doc;
while(_e1&&_e1!==root){
if(_c3.contains(_e1,"mElement")){
return _e1.id;
}
_e1=_e1.parentNode;
}
return null;
},parse:function(id){
try{
var _e2=dom.byId(id);
if(_e2){
_c5.parse(_e2);
}
}
catch(e){
}
},isHandler:function(url){
return (url.indexOf("index.php")>-1);
},registerEvents:function(_e3){
_c2.forEach(_e3,function(_e4){
manager.registerEvent(_e4[0],_e4[1],_e4[2],_e4[3],_e4[4]);
});
},registerEvent:function(id,_e5,_e6,_e7,_e8){
try{
if(this.type(_e6)=="Function"){
var _e9=_e6;
}else{
var _e9=new Function("event",_e6+(_e7?" event.preventDefault();":""));
}
node=this.byId(id);
if(!node){
console.error("registerEvent "+id+":"+_e5+". Error: node not found!");
return null;
}
var _ea=this.getLayoutElement(id);
this.connectionPush(_ea,on(node,_e5,_e9));
}
catch(e){
console.error("registerEvent "+id+":"+_e5+". Error: "+e);
}
},connectionPush:function(_eb,_ec){
if(!this.connections[_eb]){
this.connections[_eb]=[];
}
this.connections[_eb].push(_ec);
},connect:function(_ed,_ee,_ef,_f0,_f1,_f2){
var _f3=this.getLayoutElement(_ed);
this.connectionPush(_f3,on(_ed,_ee,_ef,_f0,_f1,_f2));
},disconnect:function(_f4){
if(_f4!=""){
_c2.forEach(this.connections[_f4],function(_f5){
_f5.remove;
});
this.connections[_f4].length=0;
}
},submit:function(_f6){
if(_f6){
if(this.onSubmit[_f6]()){
this.page.postback(_f6);
}
}else{
this.page.postback();
}
},doPost:function(_f7){
this.submit(_f7);
},doPostBack:function(_f8){
var _f9=this.getParentForm(_f8);
this.page.eventTarget=_f8;
this.submit(_f9);
},doLinkButton:function(url,_fa){
var _fb=this.getParentForm(_fa);
this.setAction(_fb,url);
this.page.eventTarget=_fa;
this.submit(_fb);
},doAjax:function(url,_fc,_fd){
var _fe=this.getParentForm(_fd);
this.page.ajax(url,_fc,_fe);
},doAjaxText:function(url,_ff,_100){
var _101=this.getParentForm(_100);
this.page.ajaxText(url,_ff,_101);
},doRedirect:function(url){
window.location=url;
},doGet:function(url,_102){
this.disconnect(_102);
this.page.get(url,_102);
},doDialog:function(_103,url){
var _104=this.getWindow(_103);
if(!_104){
this.addWindow(_103);
}
this.getWindow(_103).setHref(url);
this.getWindow(_103).open();
},doPrintForm:function(url){
var w=screen.width*0.75;
var h=screen.height*0.6;
var _105=window.open(url,"print","toolbar=no,width="+w+",height="+h+",scrollbars=yes,"+"top=0,left=0,statusbar=yes,resizeable=yes");
},doPrintFile:function(id){
var ok=confirm(this.i18n.PRINT_FILE);
if(ok){
this.doPostBack(id);
}
},doShowPDF:function(id){
var ok=confirm(this.i18n.SHOW_PDF);
if(ok){
this.doPostBack(id);
}
},doWindow:function(url,_106){
if((_106==null)||(_106=="")){
_106="managerWindow";
}
var w=screen.width*0.95;
var h=screen.height*0.8;
var wnd=window.open(url,_106,"toolbar=no,width="+w+",height="+h+",scrollbars=yes,"+"top=0,left=0,statusbar=yes,resizeable=yes");
},doFile:function(url,_107){
url=url+"?filename="+(_107?_107:"download");
window.location.replace(url);
},doPrintURL:function(url){
var ok=confirm(this.i18n.PRINT_URL);
if(ok){
var tg=window.name;
var form=document.forms[0];
var w=screen.width*0.95;
var h=screen.height*0.8;
var _108=window.open(url,"print","toolbar=no,width="+w+",height="+h+",scrollbars=yes,"+"top=0,left=0,statusbar=yes,resizeable=yes");
_108.focus();
window.print();
form.target=tg;
}
},doPrompt:function(_109,html){
var _10a=_c6.byId(_109);
if(!_10a){
_10a=new _c9({id:_109});
}
if(html){
_10a.set("content",html);
}
_10a.show();
},hover:function(id,over,out){
var _10b=this.byId(id);
on(_10b,"onmouseenter",over);
on(_10b,"onmouseleave",out);
},hide:function(id){
if(_c4.get(this.byId(id),"display")!="none"){
_c4.set(this.byId(id),"display","none");
}
},show:function(id){
if(_c4.get(this.byId(id),"display")=="none"){
_c4.set(this.byId(id),"display","block");
}
},toggle:function(id){
if(_c4.get(this.byId(id),"display")=="none"){
_c4.set(this.byId(id),"display","block");
}else{
_c4.set(this.byId(id),"display","none");
}
}};
});
}}});
define("manager/layers/core",[],1);
