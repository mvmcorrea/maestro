//>>built
require({cache:{"dojox/form/Uploader":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/window","dojo/dom-style","dojo/dom-class","dojo/dom-geometry","dojo/dom-attr","dojo/dom-construct","dojo/dom-form","dijit","dijit/form/Button","./uploader/_Base","./uploader/_HTML5","./uploader/_IFrame","./uploader/_Flash","dojo/i18n!./nls/Uploader","dojo/text!./resources/Uploader.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,res,_13){
return _2("dojox.form.Uploader",[_f,_e,_10,_11,_12],{uploadOnSelect:false,tabIndex:0,multiple:false,label:res.label,url:"",name:"uploadedfile",flashFieldName:"",force:"",uploadType:"",showInput:"",focusedClass:"dijitButtonHover",_nameIndex:0,templateString:_13,baseClass:"dijitUploader "+_e.prototype.baseClass,postMixInProperties:function(){
this._inputs=[];
this._cons=[];
this.force=this.force.toLowerCase();
if(this.supports("multiple")){
this.uploadType=this.force==="form"?"form":"html5";
}else{
this.uploadType=this.force==="flash"?"flash":"iframe";
}
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
_7.set(this.domNode,{overflow:"hidden",position:"relative"});
this._buildDisplay();
_a.set(this.titleNode,"tabIndex",-1);
},_buildDisplay:function(){
if(this.showInput){
this.displayInput=_b.create("input",{"class":"dijitUploadDisplayInput","tabIndex":-1,"autocomplete":"off","role":"presentation"},this.containerNode,this.showInput);
this._attachPoints.push("displayInput");
this.connect(this,"onChange",function(_14){
var i=0,l=_14.length,f,r=[];
while((f=_14[i++])){
if(f&&f.name){
r.push(f.name);
}
}
this.displayInput.value=r.join(", ");
});
this.connect(this,"reset",function(){
this.displayInput.value="";
});
}
},startup:function(){
if(this._buildInitialized){
return;
}
this._buildInitialized=true;
this._getButtonStyle(this.domNode);
this._setButtonStyle();
this.inherited(arguments);
},onChange:function(_15){
},onBegin:function(_16){
},onProgress:function(_17){
},onComplete:function(_18){
this.reset();
},onCancel:function(){
},onAbort:function(){
},onError:function(_19){
},upload:function(_1a){
_1a=_1a||{};
_1a.uploadType=this.uploadType;
this.inherited(arguments);
},submit:function(_1b){
_1b=!!_1b?_1b.tagName?_1b:this.getForm():this.getForm();
var _1c=_c.toObject(_1b);
_1c.uploadType=this.uploadType;
this.upload(_1c);
},reset:function(){
delete this._files;
this._disconnectButton();
_4.forEach(this._inputs,_b.destroy,dojo);
this._inputs=[];
this._nameIndex=0;
this._createInput();
},getFileList:function(){
var _1d=[];
if(this.supports("multiple")){
_4.forEach(this._files,function(f,i){
_1d.push({index:i,name:f.name,size:f.size,type:f.type});
},this);
}else{
_4.forEach(this._inputs,function(n,i){
if(n.value){
_1d.push({index:i,name:n.value.substring(n.value.lastIndexOf("\\")+1),size:0,type:n.value.substring(n.value.lastIndexOf(".")+1)});
}
},this);
}
return _1d;
},_getValueAttr:function(){
return this.getFileList();
},_setValueAttr:function(_1e){
console.error("Uploader value is read only");
},_setDisabledAttr:function(_1f){
if(this.disabled==_1f||!this.inputNode){
return;
}
this.inherited(arguments);
_7.set(this.inputNode,"display",_1f?"none":"");
},_getButtonStyle:function(_20){
this.btnSize={w:_7.get(_20,"width"),h:_7.get(_20,"height")};
},_setButtonStyle:function(){
this.inputNodeFontSize=Math.max(2,Math.max(Math.ceil(this.btnSize.w/60),Math.ceil(this.btnSize.h/15)));
this._createInput();
},_getFileFieldName:function(){
var _21;
if(this.supports("multiple")&&this.multiple){
_21=this.name+"s[]";
}else{
_21=this.name+(this.multiple?this._nameIndex:"");
}
return _21;
},_createInput:function(){
if(this._inputs.length){
_7.set(this.inputNode,{top:"500px"});
this._disconnectButton();
this._nameIndex++;
}
var _22=this._getFileFieldName();
this.focusNode=this.inputNode=_b.create("input",{type:"file",name:_22,"aria-labelledby":this.id+"_label"},this.domNode,"first");
if(this.supports("multiple")&&this.multiple){
_a.set(this.inputNode,"multiple",true);
}
this._inputs.push(this.inputNode);
_7.set(this.inputNode,{position:"absolute",fontSize:this.inputNodeFontSize+"em",top:"-3px",right:"-3px",opacity:0});
this._connectButton();
},_connectButton:function(){
this._cons.push(_5.connect(this.inputNode,"change",this,function(evt){
this._files=this.inputNode.files;
this.onChange(this.getFileList(evt));
if(!this.supports("multiple")&&this.multiple){
this._createInput();
}
}));
if(this.tabIndex>-1){
this.inputNode.tabIndex=this.tabIndex;
this._cons.push(_5.connect(this.inputNode,"focus",this,function(){
_8.add(this.domNode,this.focusedClass);
}));
this._cons.push(_5.connect(this.inputNode,"blur",this,function(){
_8.remove(this.domNode,this.focusedClass);
}));
}
},_disconnectButton:function(){
_4.forEach(this._cons,_5.disconnect);
this._cons.splice(0,this._cons.length);
}});
});
},"dojox/validate/web":function(){
define(["./_base","./regexp"],function(_23,_24){
_23.isIpAddress=function(_25,_26){
var re=new RegExp("^"+_24.ipAddress(_26)+"$","i");
return re.test(_25);
};
_23.isUrl=function(_27,_28){
var re=new RegExp("^"+_24.url(_28)+"$","i");
return re.test(_27);
};
_23.isEmailAddress=function(_29,_2a){
var re=new RegExp("^"+_24.emailAddress(_2a)+"$","i");
return re.test(_29);
};
_23.isEmailAddressList=function(_2b,_2c){
var re=new RegExp("^"+_24.emailAddressList(_2c)+"$","i");
return re.test(_2b);
};
_23.getEmailAddressList=function(_2d,_2e){
if(!_2e){
_2e={};
}
if(!_2e.listSeparator){
_2e.listSeparator="\\s;,";
}
if(_23.isEmailAddressList(_2d,_2e)){
return _2d.split(new RegExp("\\s*["+_2e.listSeparator+"]\\s*"));
}
return [];
};
return _23;
});
},"dojox/validate/br":function(){
define(["dojo/_base/lang","./_base"],function(_2f,_30){
var br=_2f.getObject("br",true,_30);
br.isValidCnpj=function(_31){
if(!_2f.isString(_31)){
if(!_31){
return false;
}
_31=_31+"";
while(_31.length<14){
_31="0"+_31;
}
}
var _32={format:["##.###.###/####-##","########/####-##","############-##","##############"]};
if(_30.isNumberFormat(_31,_32)){
_31=_31.replace("/","").replace(/\./g,"").replace("-","");
var cgc=[];
var dv=[];
var i,j,tmp;
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_31.length;j++){
tmp+=""+i;
}
if(_31===tmp){
return false;
}
}
for(i=0;i<12;i++){
cgc.push(parseInt(_31.charAt(i),10));
}
for(i=12;i<14;i++){
dv.push(parseInt(_31.charAt(i),10));
}
var _33=[9,8,7,6,5,4,3,2,9,8,7,6].reverse();
var sum=0;
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*_33[i];
}
var dv0=sum%11;
if(dv0==dv[0]){
sum=0;
_33=[9,8,7,6,5,4,3,2,9,8,7,6,5].reverse();
cgc.push(dv0);
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*_33[i];
}
var dv1=sum%11;
if(dv1===dv[1]){
return true;
}
}
}
return false;
};
br.computeCnpjDv=function(_34){
if(!_2f.isString(_34)){
if(!_34){
return "";
}
_34=_34+"";
while(_34.length<12){
_34="0"+_34;
}
}
var _35={format:["##.###.###/####","########/####","############"]};
if(_30.isNumberFormat(_34,_35)){
_34=_34.replace("/","").replace(/\./g,"");
var cgc=[];
var i,j,tmp;
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_34.length;j++){
tmp+=""+i;
}
if(_34===tmp){
return "";
}
}
for(i=0;i<_34.length;i++){
cgc.push(parseInt(_34.charAt(i),10));
}
var _36=[9,8,7,6,5,4,3,2,9,8,7,6].reverse();
var sum=0;
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*_36[i];
}
var dv0=sum%11;
sum=0;
_36=[9,8,7,6,5,4,3,2,9,8,7,6,5].reverse();
cgc.push(dv0);
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*_36[i];
}
var dv1=sum%11;
return (""+dv0)+dv1;
}
return "";
};
br.isValidCpf=function(_37){
if(!_2f.isString(_37)){
if(!_37){
return false;
}
_37=_37+"";
while(_37.length<11){
_37="0"+_37;
}
}
var _38={format:["###.###.###-##","#########-##","###########"]};
if(_30.isNumberFormat(_37,_38)){
_37=_37.replace("-","").replace(/\./g,"");
var cpf=[];
var dv=[];
var i,j,tmp;
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_37.length;j++){
tmp+=""+i;
}
if(_37===tmp){
return false;
}
}
for(i=0;i<9;i++){
cpf.push(parseInt(_37.charAt(i),10));
}
for(i=9;i<12;i++){
dv.push(parseInt(_37.charAt(i),10));
}
var _39=[9,8,7,6,5,4,3,2,1].reverse();
var sum=0;
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*_39[i];
}
var dv0=sum%11;
if(dv0==dv[0]){
sum=0;
_39=[9,8,7,6,5,4,3,2,1,0].reverse();
cpf.push(dv0);
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*_39[i];
}
var dv1=sum%11;
if(dv1===dv[1]){
return true;
}
}
}
return false;
};
br.computeCpfDv=function(_3a){
if(!_2f.isString(_3a)){
if(!_3a){
return "";
}
_3a=_3a+"";
while(_3a.length<9){
_3a="0"+_3a;
}
}
var _3b={format:["###.###.###","#########"]};
if(_30.isNumberFormat(_3a,_3b)){
_3a=_3a.replace(/\./g,"");
var cpf=[];
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_3a.length;j++){
tmp+=""+i;
}
if(_3a===tmp){
return "";
}
}
for(i=0;i<_3a.length;i++){
cpf.push(parseInt(_3a.charAt(i),10));
}
var _3c=[9,8,7,6,5,4,3,2,1].reverse();
var sum=0;
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*_3c[i];
}
var dv0=sum%11;
sum=0;
_3c=[9,8,7,6,5,4,3,2,1,0].reverse();
cpf.push(dv0);
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*_3c[i];
}
var dv1=sum%11;
return (""+dv0)+dv1;
}
return "";
};
return br;
});
},"dojox/form/uploader/_HTML5":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo"],function(_3d,_3e,_3f,_40){
return _3d("dojox.form.uploader._HTML5",[],{errMsg:"Error uploading files. Try checking permissions",uploadType:"html5",postMixInProperties:function(){
this.inherited(arguments);
if(this.uploadType==="html5"){
}
},postCreate:function(){
this.connectForm();
this.inherited(arguments);
if(this.uploadOnSelect){
this.connect(this,"onChange",function(_41){
this.upload(_41[0]);
});
}
},_drop:function(e){
_40.stopEvent(e);
var dt=e.dataTransfer;
this._files=dt.files;
this.onChange(this.getFileList());
},upload:function(_42){
this.onBegin(this.getFileList());
this.uploadWithFormData(_42);
},addDropTarget:function(_43,_44){
if(!_44){
this.connect(_43,"dragenter",_40.stopEvent);
this.connect(_43,"dragover",_40.stopEvent);
this.connect(_43,"dragleave",_40.stopEvent);
}
this.connect(_43,"drop","_drop");
},uploadWithFormData:function(_45){
if(!this.getUrl()){
console.error("No upload url found.",this);
return;
}
var fd=new FormData(),_46=this._getFileFieldName();
_3f.forEach(this._files,function(f,i){
fd.append(_46,f);
},this);
if(_45){
_45.uploadType=this.uploadType;
for(var nm in _45){
fd.append(nm,_45[nm]);
}
}
var xhr=this.createXhr();
xhr.send(fd);
},_xhrProgress:function(evt){
if(evt.lengthComputable){
var o={bytesLoaded:evt.loaded,bytesTotal:evt.total,type:evt.type,timeStamp:evt.timeStamp};
if(evt.type=="load"){
o.percent="100%";
o.decimal=1;
}else{
o.decimal=evt.loaded/evt.total;
o.percent=Math.ceil((evt.loaded/evt.total)*100)+"%";
}
this.onProgress(o);
}
},createXhr:function(){
var xhr=new XMLHttpRequest();
var _47;
xhr.upload.addEventListener("progress",_3e.hitch(this,"_xhrProgress"),false);
xhr.addEventListener("load",_3e.hitch(this,"_xhrProgress"),false);
xhr.addEventListener("error",_3e.hitch(this,function(evt){
this.onError(evt);
clearInterval(_47);
}),false);
xhr.addEventListener("abort",_3e.hitch(this,function(evt){
this.onAbort(evt);
clearInterval(_47);
}),false);
xhr.onreadystatechange=_3e.hitch(this,function(){
if(xhr.readyState===4){
clearInterval(_47);
try{
this.onComplete(JSON.parse(xhr.responseText.replace(/^\{\}&&/,"")));
}
catch(e){
var msg="Error parsing server result:";
console.error(msg,e);
console.error(xhr.responseText);
this.onError(msg,e);
}
}
});
xhr.open("POST",this.getUrl());
xhr.setRequestHeader("Accept","application/json");
_47=setInterval(_3e.hitch(this,function(){
try{
if(typeof (xhr.statusText)){
}
}
catch(e){
clearInterval(_47);
}
}),250);
return xhr;
}});
});
},"dojox/validate/_base":function(){
define(["dojo/_base/lang","dojo/regexp","dojo/number","./regexp"],function(_48,_49,_4a,_4b){
var _4c=_48.getObject("dojox.validate",true);
_4c.isText=function(_4d,_4e){
_4e=(typeof _4e=="object")?_4e:{};
if(/^\s*$/.test(_4d)){
return false;
}
if(typeof _4e.length=="number"&&_4e.length!=_4d.length){
return false;
}
if(typeof _4e.minlength=="number"&&_4e.minlength>_4d.length){
return false;
}
if(typeof _4e.maxlength=="number"&&_4e.maxlength<_4d.length){
return false;
}
return true;
};
_4c._isInRangeCache={};
_4c.isInRange=function(_4f,_50){
_4f=_4a.parse(_4f,_50);
if(isNaN(_4f)){
return false;
}
_50=(typeof _50=="object")?_50:{};
var max=(typeof _50.max=="number")?_50.max:Infinity,min=(typeof _50.min=="number")?_50.min:-Infinity,dec=(typeof _50.decimal=="string")?_50.decimal:".",_51=_4c._isInRangeCache,_52=_4f+"max"+max+"min"+min+"dec"+dec;
if(typeof _51[_52]!="undefined"){
return _51[_52];
}
_51[_52]=!(_4f<min||_4f>max);
return _51[_52];
};
_4c.isNumberFormat=function(_53,_54){
var re=new RegExp("^"+_4b.numberFormat(_54)+"$","i");
return re.test(_53);
};
_4c.isValidLuhn=function(_55){
var sum=0,_56,_57;
if(!_48.isString(_55)){
_55=String(_55);
}
_55=_55.replace(/[- ]/g,"");
_56=_55.length%2;
for(var i=0;i<_55.length;i++){
_57=parseInt(_55.charAt(i));
if(i%2==_56){
_57*=2;
}
if(_57>9){
_57-=9;
}
sum+=_57;
}
return !(sum%10);
};
return _4c;
});
},"dojox/layout/ContentPane":function(){
define(["dojo/_base/lang","dojo/_base/xhr","dijit/layout/ContentPane","dojox/html/_base","dojo/_base/declare"],function(_58,_59,_5a,_5b,_5c){
return _5c("dojox.layout.ContentPane",_5a,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,ioMethod:_59.get,ioArgs:{},onExecError:function(e){
},_setContent:function(_5d){
var _5e=this._contentSetter;
if(!(_5e&&_5e instanceof _5b._ContentSetter)){
_5e=this._contentSetter=new _5b._ContentSetter({node:this.containerNode,_onError:_58.hitch(this,this._onError),onContentError:_58.hitch(this,function(e){
var _5f=this.onContentError(e);
try{
this.containerNode.innerHTML=_5f;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
this._contentSetterParams={adjustPaths:Boolean(this.adjustPaths&&(this.href||this.referencePath)),referencePath:this.href||this.referencePath,renderStyles:this.renderStyles,executeScripts:this.executeScripts,scriptHasHooks:this.scriptHasHooks,scriptHookReplacement:"dijit.byId('"+this.id+"')"};
this.inherited("_setContent",arguments);
}});
});
},"dojox/form/uploader/FileList":function(){
define(["dojo/_base/fx","dojo/dom-style","dojo/dom-class","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dijit/_base/manager","dojox/form/uploader/_Base","dojo/text!../resources/UploaderFileList.html"],function(fx,_60,_61,_62,_63,_64,_65,_66,_67){
return _62("dojox.form.uploader.FileList",_66,{uploaderId:"",uploader:null,headerIndex:"#",headerType:"Type",headerFilename:"File Name",headerFilesize:"Size",_upCheckCnt:0,rowAmt:0,templateString:_67,postCreate:function(){
this.setUploader();
this.hideProgress();
},reset:function(){
for(var i=0;i<this.rowAmt;i++){
this.listNode.deleteRow(0);
}
this.rowAmt=0;
},setUploader:function(){
if(!this.uploaderId&&!this.uploader){
console.warn("uploaderId not passed to UploaderFileList");
}else{
if(this.uploaderId&&!this.uploader){
this.uploader=_65.byId(this.uploaderId);
}else{
if(this._upCheckCnt>4){
console.warn("uploader not found for ID ",this.uploaderId);
return;
}
}
}
if(this.uploader){
this.connect(this.uploader,"onChange","_onUploaderChange");
this.connect(this.uploader,"reset","reset");
this.connect(this.uploader,"onBegin",function(){
this.showProgress(true);
});
this.connect(this.uploader,"onProgress","_progress");
this.connect(this.uploader,"onComplete",function(){
setTimeout(_63.hitch(this,function(){
this.hideProgress(true);
}),1250);
});
if(!(this._fileSizeAvail={"html5":1,"flash":1}[this.uploader.uploadType])){
this.sizeHeader.style.display="none";
}
}else{
this._upCheckCnt++;
setTimeout(_63.hitch(this,"setUploader"),250);
}
},hideProgress:function(_68){
var o=_68?{ani:true,endDisp:"none",beg:15,end:0}:{endDisp:"none",ani:false};
this._hideShowProgress(o);
},showProgress:function(_69){
var o=_69?{ani:true,endDisp:"block",beg:0,end:15}:{endDisp:"block",ani:false};
this._hideShowProgress(o);
},_progress:function(_6a){
this.percentTextNode.innerHTML=_6a.percent;
_60.set(this.percentBarNode,"width",_6a.percent);
},_hideShowProgress:function(o){
var _6b=this.progressNode;
var _6c=function(){
_60.set(_6b,"display",o.endDisp);
};
if(o.ani){
_60.set(_6b,"display","block");
fx.animateProperty({node:_6b,properties:{height:{start:o.beg,end:o.end,units:"px"}},onEnd:_6c}).play();
}else{
_6c();
}
},_onUploaderChange:function(_6d){
this.reset();
_64.forEach(_6d,function(f,i){
this._addRow(i+1,this.getFileType(f.name),f.name,f.size);
},this);
},_addRow:function(_6e,_6f,_70,_71){
var c,r=this.listNode.insertRow(-1);
c=r.insertCell(-1);
_61.add(c,"dojoxUploaderIndex");
c.innerHTML=_6e;
c=r.insertCell(-1);
_61.add(c,"dojoxUploaderIcon");
c.innerHTML=_6f;
c=r.insertCell(-1);
_61.add(c,"dojoxUploaderFileName");
c.innerHTML=_70;
if(this._fileSizeAvail){
c=r.insertCell(-1);
_61.add(c,"dojoxUploaderSize");
c.innerHTML=this.convertBytes(_71).value;
}
this.rowAmt++;
}});
});
},"dojox/form/uploader/plugins/IFrame":function(){
define([],function(){
console.warn("dojox.form.uploader.plugins.IFrame has been removed. You can use Uploader directly and it will contain all necessary functionality.");
return {};
});
},"dojo/request/iframe":function(){
define(["module","require","./watch","./util","./handlers","../_base/lang","../io-query","../query","../has","../dom","../dom-construct","../_base/window","../NodeList-dom"],function(_72,_73,_74,_75,_76,_77,_78,_79,has,dom,_7a,win){
var mid=_72.id.replace(/[\/\.\-]/g,"_"),_7b=mid+"_onload";
if(!win.global[_7b]){
win.global[_7b]=function(){
var dfd=_7c._currentDfd;
if(!dfd){
_7c._fireNextRequest();
return;
}
var _7d=dfd.response,_7e=_7d.options,_7f=dom.byId(_7e.form)||dfd._tmpForm;
if(_7f){
var _80=dfd._contentToClean;
for(var i=0;i<_80.length;i++){
var key=_80[i];
for(var j=0;j<_7f.childNodes.length;j++){
var _81=_7f.childNodes[j];
if(_81.name===key){
_7a.destroy(_81);
break;
}
}
}
dfd._originalAction&&_7f.setAttribute("action",dfd._originalAction);
if(dfd._originalMethod){
_7f.setAttribute("method",dfd._originalMethod);
_7f.method=dfd._originalMethod;
}
if(dfd._originalTarget){
_7f.setAttribute("target",dfd._originalTarget);
_7f.target=dfd._originalTarget;
}
}
if(dfd._tmpForm){
_7a.destroy(dfd._tmpForm);
delete dfd._tmpForm;
}
dfd._finished=true;
};
}
function _82(_83,_84,uri){
if(win.global[_83]){
return win.global[_83];
}
if(win.global.frames[_83]){
return win.global.frames[_83];
}
if(!uri){
if(has("config-useXDomain")&&!has("config-dojoBlankHtmlUrl")){
console.warn("dojo/request/iframe: When using cross-domain Dojo builds,"+" please save dojo/resources/blank.html to your domain and set dojoConfig.dojoBlankHtmlUrl"+" to the path on your domain to blank.html");
}
uri=(has("config-dojoBlankHtmlUrl")||_73.toUrl("dojo/resources/blank.html"));
}
var _85=_7a.place("<iframe id=\""+_83+"\" name=\""+_83+"\" src=\""+uri+"\" onload=\""+_84+"\" style=\"position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden\">",win.body());
win.global[_83]=_85;
return _85;
};
function _86(_87,src,_88){
var _89=win.global.frames[_87.name];
if(_89.contentWindow){
_89=_89.contentWindow;
}
try{
if(!_88){
_89.location=src;
}else{
_89.location.replace(src);
}
}
catch(e){
}
};
function doc(_8a){
if(_8a.contentDocument){
return _8a.contentDocument;
}
var _8b=_8a.name;
if(_8b){
var _8c=win.doc.getElementsByTagName("iframe");
if(_8a.document&&_8c[_8b].contentWindow&&_8c[_8b].contentWindow.document){
return _8c[_8b].contentWindow.document;
}else{
if(win.doc.frames[_8b]&&win.doc.frames[_8b].document){
return win.doc.frames[_8b].document;
}
}
}
return null;
};
function _8d(){
return _7a.create("form",{name:mid+"_form",style:{position:"absolute",top:"-1000px",left:"-1000px"}},win.body());
};
function _8e(){
var dfd;
try{
if(_7c._currentDfd||!_7c._dfdQueue.length){
return;
}
do{
dfd=_7c._currentDfd=_7c._dfdQueue.shift();
}while(dfd&&(dfd.canceled||(dfd.isCanceled&&dfd.isCanceled()))&&_7c._dfdQueue.length);
if(!dfd||dfd.canceled||(dfd.isCanceled&&dfd.isCanceled())){
_7c._currentDfd=null;
return;
}
var _8f=dfd.response,_90=_8f.options,c2c=dfd._contentToClean=[],_91=dom.byId(_90.form),_92=_75.notify,_93=_90.data||null,_94;
if(!dfd._legacy&&_90.method==="POST"&&!_91){
_91=dfd._tmpForm=_8d();
}else{
if(_90.method==="GET"&&_91&&_8f.url.indexOf("?")>-1){
_94=_8f.url.slice(_8f.url.indexOf("?")+1);
_93=_77.mixin(_78.queryToObject(_94),_93);
}
}
if(_91){
if(!dfd._legacy){
var _95=_91;
do{
_95=_95.parentNode;
}while(_95!==win.doc.documentElement);
if(!_95){
_91.style.position="absolute";
_91.style.left="-1000px";
_91.style.top="-1000px";
win.body().appendChild(_91);
}
if(!_91.name){
_91.name=mid+"_form";
}
}
if(_93){
var _96=function(_97,_98){
_7a.create("input",{type:"hidden",name:_97,value:_98},_91);
c2c.push(_97);
};
for(var x in _93){
var val=_93[x];
if(_77.isArray(val)&&val.length>1){
for(var i=0;i<val.length;i++){
_96(x,val[i]);
}
}else{
if(!_91[x]){
_96(x,val);
}else{
_91[x].value=val;
}
}
}
}
var _99=_91.getAttributeNode("action"),_9a=_91.getAttributeNode("method"),_9b=_91.getAttributeNode("target");
if(_8f.url){
dfd._originalAction=_99?_99.value:null;
if(_99){
_99.value=_8f.url;
}else{
_91.setAttribute("action",_8f.url);
}
}
if(!dfd._legacy){
dfd._originalMethod=_9a?_9a.value:null;
if(_9a){
_9a.value=_90.method;
}else{
_91.setAttribute("method",_90.method);
}
}else{
if(!_9a||!_9a.value){
if(_9a){
_9a.value=_90.method;
}else{
_91.setAttribute("method",_90.method);
}
}
}
dfd._originalTarget=_9b?_9b.value:null;
if(_9b){
_9b.value=_7c._iframeName;
}else{
_91.setAttribute("target",_7c._iframeName);
}
_91.target=_7c._iframeName;
_92&&_92.emit("send",_8f,dfd.promise.cancel);
_7c._notifyStart(_8f);
_91.submit();
}else{
var _9c="";
if(_8f.options.data){
_9c=_8f.options.data;
if(typeof _9c!=="string"){
_9c=_78.objectToQuery(_9c);
}
}
var _9d=_8f.url+(_8f.url.indexOf("?")>-1?"&":"?")+_9c;
_92&&_92.emit("send",_8f,dfd.promise.cancel);
_7c._notifyStart(_8f);
_7c.setSrc(_7c._frame,_9d,true);
}
}
catch(e){
dfd.reject(e);
}
};
function _9e(_9f){
return !this.isFulfilled();
};
function _a0(_a1){
return !!this._finished;
};
function _a2(_a3,_a4){
if(!_a4){
try{
var _a5=_a3.options,doc=_7c.doc(_7c._frame),_a6=_a5.handleAs;
if(_a6!=="html"){
if(_a6==="xml"){
if(doc.documentElement.tagName.toLowerCase()==="html"){
_79("a",doc.documentElement).orphan();
var _a7=doc.documentElement.innerText;
_a7=_a7.replace(/>\s+</g,"><");
_a3.text=_77.trim(_a7);
}else{
_a3.data=doc;
}
}else{
_a3.text=doc.getElementsByTagName("textarea")[0].value;
}
_76(_a3);
}else{
_a3.data=doc;
}
}
catch(e){
_a4=e;
}
}
if(_a4){
this.reject(_a4);
}else{
if(this._finished){
this.resolve(_a3);
}else{
this.reject(new Error("Invalid dojo/request/iframe request state"));
}
}
};
function _a8(_a9){
this._callNext();
};
var _aa={method:"POST"};
function _7c(url,_ab,_ac){
var _ad=_75.parseArgs(url,_75.deepCreate(_aa,_ab),true);
url=_ad.url;
_ab=_ad.options;
if(_ab.method!=="GET"&&_ab.method!=="POST"){
throw new Error(_ab.method+" not supported by dojo/request/iframe");
}
if(!_7c._frame){
_7c._frame=_7c.create(_7c._iframeName,_7b+"();");
}
var dfd=_75.deferred(_ad,null,_9e,_a0,_a2,_a8);
dfd._callNext=function(){
if(!this._calledNext){
this._calledNext=true;
_7c._currentDfd=null;
_7c._fireNextRequest();
}
};
dfd._legacy=_ac;
_7c._dfdQueue.push(dfd);
_7c._fireNextRequest();
_74(dfd);
return _ac?dfd:dfd.promise;
};
_7c.create=_82;
_7c.doc=doc;
_7c.setSrc=_86;
_7c._iframeName=mid+"_IoIframe";
_7c._notifyStart=function(){
};
_7c._dfdQueue=[];
_7c._currentDfd=null;
_7c._fireNextRequest=_8e;
_75.addCommonMethods(_7c,["GET","POST"]);
return _7c;
});
},"dojox/form/uploader/_Base":function(){
define(["dojo/dom-form","dojo/dom-style","dojo/dom-construct","dojo/dom-attr","dojo/has","dojo/_base/declare","dojo/_base/event","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin"],function(_ae,_af,_b0,_b1,has,_b2,_b3,_b4,_b5,_b6){
has.add("FormData",function(){
return !!window.FormData;
});
has.add("xhr-sendAsBinary",function(){
var xhr=window.XMLHttpRequest&&new window.XMLHttpRequest();
return xhr&&!!xhr.sendAsBinary;
});
has.add("file-multiple",function(){
return !!({"true":1,"false":1}[_b1.get(document.createElement("input",{type:"file"}),"multiple")]);
});
return _b2("dojox.form.uploader._Base",[_b4,_b5,_b6],{getForm:function(){
if(!this.form){
var n=this.domNode;
while(n&&n.tagName&&n!==document.body){
if(n.tagName.toLowerCase()=="form"){
this.form=n;
break;
}
n=n.parentNode;
}
}
return this.form;
},getUrl:function(){
if(this.uploadUrl){
this.url=this.uploadUrl;
}
if(this.url){
return this.url;
}
if(this.getForm()){
this.url=this.form.action;
}
return this.url;
},connectForm:function(){
this.url=this.getUrl();
if(!this._fcon&&!!this.getForm()){
this._fcon=true;
this.connect(this.form,"onsubmit",function(evt){
_b3.stop(evt);
this.submit(this.form);
});
}
},supports:function(_b7){
switch(_b7){
case "multiple":
if(this.force=="flash"||this.force=="iframe"){
return false;
}
return has("file-multiple");
case "FormData":
return has(_b7);
case "sendAsBinary":
return has("xhr-sendAsBinary");
}
return false;
},getMimeType:function(){
return "application/octet-stream";
},getFileType:function(_b8){
return _b8.substring(_b8.lastIndexOf(".")+1).toUpperCase();
},convertBytes:function(_b9){
var kb=Math.round(_b9/1024*100000)/100000;
var mb=Math.round(_b9/1048576*100000)/100000;
var gb=Math.round(_b9/1073741824*100000)/100000;
var _ba=_b9;
if(kb>1){
_ba=kb.toFixed(1)+" kb";
}
if(mb>1){
_ba=mb.toFixed(1)+" mb";
}
if(gb>1){
_ba=gb.toFixed(1)+" gb";
}
return {kb:kb,mb:mb,gb:gb,bytes:_b9,value:_ba};
}});
});
},"dojox/html/styles":function(){
define(["dojo/_base/lang","dojo/_base/array","dojo/_base/window","dojo/_base/sniff"],function(_bb,_bc,_bd,has){
var dh=_bb.getObject("dojox.html",true);
var _be={};
var _bf={};
var _c0=[];
dh.insertCssRule=function(_c1,_c2,_c3){
var ss=dh.getDynamicStyleSheet(_c3);
var _c4=_c1+" {"+_c2+"}";
if(has("ie")){
ss.cssText+=_c4;
}else{
if(ss.sheet){
ss.sheet.insertRule(_c4,ss._indicies.length);
}else{
ss.appendChild(_bd.doc.createTextNode(_c4));
}
}
ss._indicies.push(_c1+" "+_c2);
return _c1;
};
dh.removeCssRule=function(_c5,_c6,_c7){
var ss;
var _c8=-1;
var nm;
var i;
for(nm in _be){
if(_c7&&_c7!==nm){
continue;
}
ss=_be[nm];
for(i=0;i<ss._indicies.length;i++){
if(_c5+" "+_c6===ss._indicies[i]){
_c8=i;
break;
}
}
if(_c8>-1){
break;
}
}
if(!ss){
console.warn("No dynamic style sheet has been created from which to remove a rule.");
return false;
}
if(_c8===-1){
console.warn("The css rule was not found and could not be removed.");
return false;
}
ss._indicies.splice(_c8,1);
if(has("ie")){
ss.removeRule(_c8);
}else{
if(ss.sheet){
ss.sheet.deleteRule(_c8);
}
}
return true;
};
dh.modifyCssRule=function(_c9,_ca,_cb){
};
dh.getStyleSheet=function(_cc){
if(_be[_cc||"default"]){
return _be[_cc||"default"];
}
if(!_cc){
return false;
}
var _cd=dh.getStyleSheets();
if(_cd[_cc]){
return dh.getStyleSheets()[_cc];
}
var nm;
for(nm in _cd){
if(_cd[nm].href&&_cd[nm].href.indexOf(_cc)>-1){
return _cd[nm];
}
}
return false;
};
dh.getDynamicStyleSheet=function(_ce){
if(!_ce){
_ce="default";
}
if(!_be[_ce]){
if(_bd.doc.createStyleSheet){
_be[_ce]=_bd.doc.createStyleSheet();
if(has("ie")<9){
_be[_ce].title=_ce;
}
}else{
_be[_ce]=_bd.doc.createElement("style");
_be[_ce].setAttribute("type","text/css");
_bd.doc.getElementsByTagName("head")[0].appendChild(_be[_ce]);
}
_be[_ce]._indicies=[];
}
return _be[_ce];
};
dh.enableStyleSheet=function(_cf){
var ss=dh.getStyleSheet(_cf);
if(ss){
if(ss.sheet){
ss.sheet.disabled=false;
}else{
ss.disabled=false;
}
}
};
dh.disableStyleSheet=function(_d0){
var ss=dh.getStyleSheet(_d0);
if(ss){
if(ss.sheet){
ss.sheet.disabled=true;
}else{
ss.disabled=true;
}
}
};
dh.activeStyleSheet=function(_d1){
var _d2=dh.getToggledStyleSheets();
var i;
if(arguments.length===1){
_bc.forEach(_d2,function(s){
s.disabled=(s.title===_d1)?false:true;
});
}else{
for(i=0;i<_d2.length;i++){
if(_d2[i].disabled===false){
return _d2[i];
}
}
}
return true;
};
dh.getPreferredStyleSheet=function(){
};
dh.getToggledStyleSheets=function(){
var nm;
if(!_c0.length){
var _d3=dh.getStyleSheets();
for(nm in _d3){
if(_d3[nm].title){
_c0.push(_d3[nm]);
}
}
}
return _c0;
};
dh.getStyleSheets=function(){
if(_bf.collected){
return _bf;
}
var _d4=_bd.doc.styleSheets;
_bc.forEach(_d4,function(n){
var s=(n.sheet)?n.sheet:n;
var _d5=s.title||s.href;
if(has("ie")){
if(s.cssText.indexOf("#default#VML")===-1){
if(s.href){
_bf[_d5]=s;
}else{
if(s.imports.length){
_bc.forEach(s.imports,function(si){
_bf[si.title||si.href]=si;
});
}else{
_bf[_d5]=s;
}
}
}
}else{
_bf[_d5]=s;
_bf[_d5].id=s.ownerNode.id;
_bc.forEach(s.cssRules,function(r){
if(r.href){
_bf[r.href]=r.styleSheet;
_bf[r.href].id=s.ownerNode.id;
}
});
}
});
_bf.collected=true;
return _bf;
};
return dh;
});
},"dojox/widget/Standby":function(){
define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/array","dojo/_base/event","dojo/_base/sniff","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/window","dojo/_base/window","dojo/_base/fx","dojo/fx","dijit/_Widget","dijit/_TemplatedMixin","dijit/registry"],function(_d6,_d7,_d8,_d9,has,dom,_da,_db,_dc,_dd,_de,_df,_e0,fx,_e1,_e2,_e3){
_d6.experimental("dojox.widget.Standby");
return _d7("dojox.widget.Standby",[_e1,_e2],{image:require.toUrl("dojox/widget/Standby/images/loading.gif").toString(),imageText:"Please Wait...",text:"Please wait...",centerIndicator:"image",target:"",color:"#C0C0C0",duration:500,zIndex:"auto",opacity:0.75,templateString:"<div>"+"<div style=\"display: none; opacity: 0; z-index: 9999; "+"position: absolute; cursor:wait;\" dojoAttachPoint=\"_underlayNode\"></div>"+"<img src=\"${image}\" style=\"opacity: 0; display: none; z-index: -10000; "+"position: absolute; top: 0px; left: 0px; cursor:wait;\" "+"dojoAttachPoint=\"_imageNode\">"+"<div style=\"opacity: 0; display: none; z-index: -10000; position: absolute; "+"top: 0px;\" dojoAttachPoint=\"_textNode\"></div>"+"</div>",_underlayNode:null,_imageNode:null,_textNode:null,_centerNode:null,_displayed:false,_resizeCheck:null,_started:false,_parent:null,startup:function(_e4){
if(!this._started){
if(typeof this.target==="string"){
var w=_e3.byId(this.target);
this.target=w?w.domNode:dom.byId(this.target);
}
if(this.text){
this._textNode.innerHTML=this.text;
}
if(this.centerIndicator==="image"){
this._centerNode=this._imageNode;
_da.set(this._imageNode,"src",this.image);
_da.set(this._imageNode,"alt",this.imageText);
}else{
this._centerNode=this._textNode;
}
_dd.set(this._underlayNode,{display:"none",backgroundColor:this.color});
_dd.set(this._centerNode,"display","none");
this.connect(this._underlayNode,"onclick","_ignore");
if(this.domNode.parentNode&&this.domNode.parentNode!=_df.body()){
_df.body().appendChild(this.domNode);
}
if(has("ie")==7){
this._ieFixNode=_db.create("div");
_dd.set(this._ieFixNode,{opacity:"0",zIndex:"-1000",position:"absolute",top:"-1000px"});
_df.body().appendChild(this._ieFixNode);
}
this.inherited(arguments);
}
},show:function(){
if(!this._displayed){
if(this._anim){
this._anim.stop();
delete this._anim;
}
this._displayed=true;
this._size();
this._disableOverflow();
this._fadeIn();
}
},hide:function(){
if(this._displayed){
if(this._anim){
this._anim.stop();
delete this._anim;
}
this._size();
this._fadeOut();
this._displayed=false;
if(this._resizeCheck!==null){
clearInterval(this._resizeCheck);
this._resizeCheck=null;
}
}
},isVisible:function(){
return this._displayed;
},onShow:function(){
},onHide:function(){
},uninitialize:function(){
this._displayed=false;
if(this._resizeCheck){
clearInterval(this._resizeCheck);
}
_dd.set(this._centerNode,"display","none");
_dd.set(this._underlayNode,"display","none");
if(has("ie")==7&&this._ieFixNode){
_df.body().removeChild(this._ieFixNode);
delete this._ieFixNode;
}
if(this._anim){
this._anim.stop();
delete this._anim;
}
this.target=null;
this._imageNode=null;
this._textNode=null;
this._centerNode=null;
this.inherited(arguments);
},_size:function(){
if(this._displayed){
var dir=_da.get(_df.body(),"dir");
if(dir){
dir=dir.toLowerCase();
}
var _e5;
var _e6=this._scrollerWidths();
var _e7=this.target;
var _e8=_dd.get(this._centerNode,"display");
_dd.set(this._centerNode,"display","block");
var box=_dc.position(_e7,true);
if(_e7===_df.body()||_e7===_df.doc){
box=_de.getBox();
box.x=box.l;
box.y=box.t;
}
var _e9=_dc.getMarginBox(this._centerNode);
_dd.set(this._centerNode,"display",_e8);
if(this._ieFixNode){
_e5=-this._ieFixNode.offsetTop/1000;
box.x=Math.floor((box.x+0.9)/_e5);
box.y=Math.floor((box.y+0.9)/_e5);
box.w=Math.floor((box.w+0.9)/_e5);
box.h=Math.floor((box.h+0.9)/_e5);
}
var zi=_dd.get(_e7,"zIndex");
var _ea=zi;
var _eb=zi;
if(this.zIndex==="auto"){
if(zi!="auto"){
_ea=parseInt(_ea,10)+1;
_eb=parseInt(_eb,10)+2;
}else{
var _ec=_e7.parentNode;
var _ed=-100000;
while(_ec&&_ec!==_df.body()){
zi=_dd.get(_ec,"zIndex");
if(!zi||zi==="auto"){
_ec=_ec.parentNode;
}else{
var _ee=parseInt(zi,10);
if(_ed<_ee){
_ed=_ee;
_ea=_ee+1;
_eb=_ee+2;
}
_ec=_ec.parentNode;
}
}
}
}else{
_ea=parseInt(this.zIndex,10)+1;
_eb=parseInt(this.zIndex,10)+2;
}
_dd.set(this._centerNode,"zIndex",_eb);
_dd.set(this._underlayNode,"zIndex",_ea);
var pn=_e7.parentNode;
if(pn&&pn!==_df.body()&&_e7!==_df.body()&&_e7!==_df.doc){
var obh=box.h;
var obw=box.w;
var _ef=_dc.position(pn,true);
if(this._ieFixNode){
_e5=-this._ieFixNode.offsetTop/1000;
_ef.x=Math.floor((_ef.x+0.9)/_e5);
_ef.y=Math.floor((_ef.y+0.9)/_e5);
_ef.w=Math.floor((_ef.w+0.9)/_e5);
_ef.h=Math.floor((_ef.h+0.9)/_e5);
}
_ef.w-=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_e6.v:0;
_ef.h-=pn.scrollWidth>pn.clientWidth&&pn.clientWidth>0?_e6.h:0;
if(dir==="rtl"){
if(has("opera")){
box.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_e6.v:0;
_ef.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_e6.v:0;
}else{
if(has("ie")){
_ef.x+=pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_e6.v:0;
}else{
if(has("webkit")){
}
}
}
}
if(_ef.w<box.w){
box.w=box.w-_ef.w;
}
if(_ef.h<box.h){
box.h=box.h-_ef.h;
}
var _f0=_ef.y;
var _f1=_ef.y+_ef.h;
var _f2=box.y;
var _f3=box.y+obh;
var _f4=_ef.x;
var _f5=_ef.x+_ef.w;
var _f6=box.x;
var _f7=box.x+obw;
var _f8;
if(_f3>_f0&&_f2<_f0){
box.y=_ef.y;
_f8=_f0-_f2;
var _f9=obh-_f8;
if(_f9<_ef.h){
box.h=_f9;
}else{
box.h-=2*(pn.scrollWidth>pn.clientWidth&&pn.clientWidth>0?_e6.h:0);
}
}else{
if(_f2<_f1&&_f3>_f1){
box.h=_f1-_f2;
}else{
if(_f3<=_f0||_f2>=_f1){
box.h=0;
}
}
}
if(_f7>_f4&&_f6<_f4){
box.x=_ef.x;
_f8=_f4-_f6;
var _fa=obw-_f8;
if(_fa<_ef.w){
box.w=_fa;
}else{
box.w-=2*(pn.scrollHeight>pn.clientHeight&&pn.clientHeight>0?_e6.w:0);
}
}else{
if(_f6<_f5&&_f7>_f5){
box.w=_f5-_f6;
}else{
if(_f7<=_f4||_f6>=_f5){
box.w=0;
}
}
}
}
if(box.h>0&&box.w>0){
_dd.set(this._underlayNode,{display:"block",width:box.w+"px",height:box.h+"px",top:box.y+"px",left:box.x+"px"});
var _fb=["borderRadius","borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"];
this._cloneStyles(_fb);
if(!has("ie")){
_fb=["MozBorderRadius","MozBorderRadiusTopleft","MozBorderRadiusTopright","MozBorderRadiusBottomleft","MozBorderRadiusBottomright","WebkitBorderRadius","WebkitBorderTopLeftRadius","WebkitBorderTopRightRadius","WebkitBorderBottomLeftRadius","WebkitBorderBottomRightRadius"];
this._cloneStyles(_fb,this);
}
var _fc=(box.h/2)-(_e9.h/2);
var _fd=(box.w/2)-(_e9.w/2);
if(box.h>=_e9.h&&box.w>=_e9.w){
_dd.set(this._centerNode,{top:(_fc+box.y)+"px",left:(_fd+box.x)+"px",display:"block"});
}else{
_dd.set(this._centerNode,"display","none");
}
}else{
_dd.set(this._underlayNode,"display","none");
_dd.set(this._centerNode,"display","none");
}
if(this._resizeCheck===null){
var _fe=this;
this._resizeCheck=setInterval(function(){
_fe._size();
},100);
}
}
},_cloneStyles:function(_ff){
_d8.forEach(_ff,function(s){
_dd.set(this._underlayNode,s,_dd.get(this.target,s));
},this);
},_fadeIn:function(){
var self=this;
var _100=_e0.animateProperty({duration:self.duration,node:self._underlayNode,properties:{opacity:{start:0,end:self.opacity}}});
var _101=_e0.animateProperty({duration:self.duration,node:self._centerNode,properties:{opacity:{start:0,end:1}},onEnd:function(){
self.onShow();
delete self._anim;
}});
this._anim=fx.combine([_100,_101]);
this._anim.play();
},_fadeOut:function(){
var self=this;
var _102=_e0.animateProperty({duration:self.duration,node:self._underlayNode,properties:{opacity:{start:self.opacity,end:0}},onEnd:function(){
_dd.set(this.node,{"display":"none","zIndex":"-1000"});
}});
var _103=_e0.animateProperty({duration:self.duration,node:self._centerNode,properties:{opacity:{start:1,end:0}},onEnd:function(){
_dd.set(this.node,{"display":"none","zIndex":"-1000"});
self.onHide();
self._enableOverflow();
delete self._anim;
}});
this._anim=fx.combine([_102,_103]);
this._anim.play();
},_ignore:function(e){
if(e){
_d9.stop(e);
}
},_scrollerWidths:function(){
var div=_db.create("div");
_dd.set(div,{position:"absolute",opacity:0,overflow:"hidden",width:"50px",height:"50px",zIndex:"-100",top:"-200px",padding:"0px",margin:"0px"});
var iDiv=_db.create("div");
_dd.set(iDiv,{width:"200px",height:"10px"});
div.appendChild(iDiv);
_df.body().appendChild(div);
var b=_dc.getContentBox(div);
_dd.set(div,"overflow","scroll");
var a=_dc.getContentBox(div);
_df.body().removeChild(div);
return {v:b.w-a.w,h:b.h-a.h};
},_setTextAttr:function(text){
this._textNode.innerHTML=text;
this.text=text;
},_setColorAttr:function(c){
_dd.set(this._underlayNode,"backgroundColor",c);
this.color=c;
},_setImageTextAttr:function(text){
_da.set(this._imageNode,"alt",text);
this.imageText=text;
},_setImageAttr:function(url){
_da.set(this._imageNode,"src",url);
this.image=url;
},_setCenterIndicatorAttr:function(_104){
this.centerIndicator=_104;
if(_104==="image"){
this._centerNode=this._imageNode;
_dd.set(this._textNode,"display","none");
}else{
this._centerNode=this._textNode;
_dd.set(this._imageNode,"display","none");
}
},_disableOverflow:function(){
if(this.target===_df.body()||this.target===_df.doc){
this._overflowDisabled=true;
var body=_df.body();
if(body.style&&body.style.overflow){
this._oldOverflow=_dd.get(body,"overflow");
}else{
this._oldOverflow="";
}
if(has("ie")&&!has("quirks")){
if(body.parentNode&&body.parentNode.style&&body.parentNode.style.overflow){
this._oldBodyParentOverflow=body.parentNode.style.overflow;
}else{
try{
this._oldBodyParentOverflow=_dd.get(body.parentNode,"overflow");
}
catch(e){
this._oldBodyParentOverflow="scroll";
}
}
_dd.set(body.parentNode,"overflow","hidden");
}
_dd.set(body,"overflow","hidden");
}
},_enableOverflow:function(){
if(this._overflowDisabled){
delete this._overflowDisabled;
var body=_df.body();
if(has("ie")&&!has("quirks")){
body.parentNode.style.overflow=this._oldBodyParentOverflow;
delete this._oldBodyParentOverflow;
}
_dd.set(body,"overflow",this._oldOverflow);
if(has("webkit")){
var div=_db.create("div",{style:{height:"2px"}});
body.appendChild(div);
setTimeout(function(){
body.removeChild(div);
},0);
}
delete this._oldOverflow;
}
}});
});
},"dojox/form/uploader/_Flash":function(){
define(["dojo/dom-form","dojo/dom-style","dojo/dom-construct","dojo/dom-attr","dojo/_base/declare","dojo/_base/config","dojo/_base/connect","dojo/_base/lang","dojo/_base/array","dojox/embed/Flash"],function(_105,_106,_107,_108,_109,_10a,_10b,lang,_10c,_10d){
return _109("dojox.form.uploader._Flash",[],{swfPath:_10a.uploaderPath||require.toUrl("dojox/form/resources/uploader.swf"),preventCache:true,skipServerCheck:true,serverTimeout:2000,isDebug:false,devMode:false,deferredUploading:0,postMixInProperties:function(){
if(this.uploadType==="flash"){
this._files=[];
this._fileMap={};
this._createInput=this._createFlashUploader;
this.getFileList=this.getFlashFileList;
this.reset=this.flashReset;
this.upload=this.uploadFlash;
this.fieldname="flashUploadFiles";
}
this.inherited(arguments);
},onReady:function(_10e){
},onLoad:function(_10f){
},onFileChange:function(_110){
},onFileProgress:function(_111){
},getFlashFileList:function(){
return this._files;
},flashReset:function(){
this.flashMovie.reset();
this._files=[];
this._fileMap={};
},uploadFlash:function(_112){
this.onBegin(this.getFileList());
_112=_112||{};
_112.returnType="F";
_112.uploadType=this.uploadType;
this.flashMovie.doUpload(_112);
},_change:function(_113){
this._files=this._files.concat(_113);
_10c.forEach(_113,function(f){
f.bytesLoaded=0;
f.bytesTotal=f.size;
this._fileMap[f.name+"_"+f.size]=f;
},this);
this.onChange(this._files);
this.onFileChange(_113);
},_complete:function(_114){
var o=this._getCustomEvent();
o.type="load";
this.onComplete(_114);
},_progress:function(f){
this._fileMap[f.name+"_"+f.bytesTotal].bytesLoaded=f.bytesLoaded;
var o=this._getCustomEvent();
this.onFileProgress(f);
this.onProgress(o);
},_error:function(err){
this.onError(err);
},_onFlashBlur:function(_115){
},_getCustomEvent:function(){
var o={bytesLoaded:0,bytesTotal:0,type:"progress",timeStamp:new Date().getTime()};
for(var nm in this._fileMap){
o.bytesTotal+=this._fileMap[nm].bytesTotal;
o.bytesLoaded+=this._fileMap[nm].bytesLoaded;
}
o.decimal=o.bytesLoaded/o.bytesTotal;
o.percent=Math.ceil((o.bytesLoaded/o.bytesTotal)*100)+"%";
return o;
},_connectFlash:function(){
this._subs=[];
this._cons=[];
var _116=lang.hitch(this,function(s,_117){
this._subs.push(_10b.subscribe(this.id+s,this,_117));
});
_116("/filesSelected","_change");
_116("/filesUploaded","_complete");
_116("/filesProgress","_progress");
_116("/filesError","_error");
_116("/filesCanceled","onCancel");
_116("/stageBlur","_onFlashBlur");
this.connect(this.domNode,"focus",function(){
this.flashMovie.focus();
this.flashMovie.doFocus();
});
if(this.tabIndex>=0){
_108.set(this.domNode,"tabIndex",this.tabIndex);
}
},_createFlashUploader:function(){
var w=this.btnSize.w;
var h=this.btnSize.h;
if(!w){
setTimeout(dojo.hitch(this,function(){
this._getButtonStyle(this.domNode);
this._createFlashUploader();
}),200);
return;
}
var url=this.getUrl();
if(url){
if(url.toLowerCase().indexOf("http")<0&&url.indexOf("/")!=0){
var loc=window.location.href.split("/");
loc.pop();
loc=loc.join("/")+"/";
url=loc+url;
}
}else{
console.warn("Warning: no uploadUrl provided.");
}
this.inputNode=_107.create("div",{className:"dojoxFlashNode"},this.domNode,"first");
_106.set(this.inputNode,{position:"absolute",top:"-2px",width:w+"px",height:h+"px",opacity:0});
var args={expressInstall:true,path:(this.swfPath.uri||this.swfPath)+((this.preventCache)?("?cb_"+(new Date().getTime())):""),width:w,height:h,allowScriptAccess:"always",allowNetworking:"all",vars:{uploadDataFieldName:this.flashFieldName||this.name+"Flash",uploadUrl:url,uploadOnSelect:this.uploadOnSelect,deferredUploading:this.deferredUploading||0,selectMultipleFiles:this.multiple,id:this.id,isDebug:this.isDebug,noReturnCheck:this.skipServerCheck,serverTimeout:this.serverTimeout},params:{scale:"noscale",wmode:"opaque",allowScriptAccess:"always",allowNetworking:"all"}};
this.flashObject=new _10d(args,this.inputNode);
this.flashObject.onError=lang.hitch(function(msg){
console.error("Flash Error: "+msg);
});
this.flashObject.onReady=lang.hitch(this,function(){
this.onReady(this);
});
this.flashObject.onLoad=lang.hitch(this,function(mov){
this.flashMovie=mov;
this.flashReady=true;
this.onLoad(this);
});
this._connectFlash();
}});
});
},"dojox/html/_base":function(){
define(["dojo/_base/declare","dojo/Deferred","dojo/dom-construct","dojo/html","dojo/_base/kernel","dojo/_base/lang","dojo/ready","dojo/_base/sniff","dojo/_base/url","dojo/_base/xhr","dojo/when","dojo/_base/window"],function(_118,_119,_11a,_11b,_11c,lang,_11d,has,_11e,_11f,when,_120){
var html=_11c.getObject("dojox.html",true);
if(has("ie")){
var _121=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g;
}
var _122=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
var _123=html._adjustCssPaths=function(_124,_125){
if(!_125||!_124){
return;
}
if(_121){
_125=_125.replace(_121,function(_126,pre,_127,url,post){
return pre+(new _11e(_124,"./"+url).toString())+post;
});
}
return _125.replace(_122,function(_128,_129,_12a,_12b,_12c,_12d){
if(_12a){
return "@import \""+(new _11e(_124,"./"+_12a).toString())+"\""+_12d;
}else{
return "url("+(new _11e(_124,"./"+_12c).toString())+")"+_12d;
}
});
};
var _12e=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
var _12f=html._adjustHtmlPaths=function(_130,cont){
var url=_130||"./";
return cont.replace(_12e,function(tag,_131,name,_132,_133,_134,_135,end){
return _131+(name?(name+"="+_132+(new _11e(url,_133).toString())+_132):("style="+_134+_123(url,_135)+_134))+end;
});
};
var _136=html._snarfStyles=function(_137,cont,_138){
_138.attributes=[];
cont=cont.replace(/<[!][-][-](.|\s)*?[-][-]>/g,function(_139){
return _139.replace(/<(\/?)style\b/ig,"&lt;$1Style").replace(/<(\/?)link\b/ig,"&lt;$1Link").replace(/@import "/ig,"@ import \"");
});
return cont.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(_13a,_13b,_13c,_13d,_13e,href){
var i,attr=(_13b||_13d||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(_13c){
i=_138.push(_137?_123(_137,_13c):_13c);
}else{
i=_138.push("@import \""+href+"\";");
attr=attr.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"");
}
if(attr){
attr=attr.split(/\s+/);
var _13f={},tmp;
for(var j=0,e=attr.length;j<e;j++){
tmp=attr[j].split("=");
_13f[tmp[0]]=tmp[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1");
}
_138.attributes[i-1]=_13f;
}
return "";
});
};
var _140=html._snarfScripts=function(cont,_141){
_141.code="";
cont=cont.replace(/<[!][-][-](.|\s)*?[-][-]>/g,function(_142){
return _142.replace(/<(\/?)script\b/ig,"&lt;$1Script");
});
function _143(src){
if(_141.downloadRemote){
src=src.replace(/&([a-z0-9#]+);/g,function(m,name){
switch(name){
case "amp":
return "&";
case "gt":
return ">";
case "lt":
return "<";
default:
return name.charAt(0)=="#"?String.fromCharCode(name.substring(1)):"&"+name+";";
}
});
_11f.get({url:src,sync:true,load:function(code){
_141.code+=code+";";
},error:_141.errBack});
}
};
return cont.replace(/<script\s*(?![^>]*type=['"]?(?:dojo\/|text\/html\b))[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?>([\s\S]*?)<\/script>/gi,function(_144,_145,src,code){
if(src){
_143(src);
}else{
_141.code+=code;
}
return "";
});
};
var _146=html.evalInGlobal=function(code,_147){
_147=_147||_120.doc.body;
var n=_147.ownerDocument.createElement("script");
n.type="text/javascript";
_147.appendChild(n);
n.text=code;
};
html._ContentSetter=_118(_11b._ContentSetter,{adjustPaths:false,referencePath:".",renderStyles:false,executeScripts:false,scriptHasHooks:false,scriptHookReplacement:null,_renderStyles:function(_148){
this._styleNodes=[];
var st,att,_149,doc=this.node.ownerDocument;
var head=doc.getElementsByTagName("head")[0];
for(var i=0,e=_148.length;i<e;i++){
_149=_148[i];
att=_148.attributes[i];
st=doc.createElement("style");
st.setAttribute("type","text/css");
for(var x in att){
st.setAttribute(x,att[x]);
}
this._styleNodes.push(st);
head.appendChild(st);
if(st.styleSheet){
st.styleSheet.cssText=_149;
}else{
st.appendChild(doc.createTextNode(_149));
}
}
},empty:function(){
this.inherited("empty",arguments);
this._styles=[];
},onBegin:function(){
this.inherited("onBegin",arguments);
var cont=this.content,node=this.node;
var _14a=this._styles;
if(lang.isString(cont)){
if(this.adjustPaths&&this.referencePath){
cont=_12f(this.referencePath,cont);
}
if(this.renderStyles||this.cleanContent){
cont=_136(this.referencePath,cont,_14a);
}
if(this.executeScripts){
var _14b=this;
var _14c={downloadRemote:true,errBack:function(e){
_14b._onError.call(_14b,"Exec","Error downloading remote script in \""+_14b.id+"\"",e);
}};
cont=_140(cont,_14c);
this._code=_14c.code;
}
}
this.content=cont;
},onEnd:function(){
var code=this._code,_14d=this._styles;
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
_11a.destroy(this._styleNodes.pop());
}
}
if(this.renderStyles&&_14d&&_14d.length){
this._renderStyles(_14d);
}
var d=new _119();
var _14e=this.getInherited(arguments),args=arguments,_14f=lang.hitch(this,function(){
_14e.apply(this,args);
when(this.parseDeferred,function(){
d.resolve();
});
});
if(this.executeScripts&&code){
if(this.cleanContent){
code=code.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"");
}
if(this.scriptHasHooks){
code=code.replace(/_container_(?!\s*=[^=])/g,this.scriptHookReplacement);
}
try{
_146(code,this.node);
}
catch(e){
this._onError("Exec","Error eval script in "+this.id+", "+e.message,e);
}
_11d(_14f);
}else{
_14f();
}
return d.promise;
},tearDown:function(){
this.inherited(arguments);
delete this._styles;
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
_11a.destroy(this._styleNodes.pop());
}
}
delete this._styleNodes;
lang.mixin(this,html._ContentSetter.prototype);
}});
html.set=function(node,cont,_150){
if(!_150){
return _11b._setNodeContent(node,cont,true);
}else{
var op=new html._ContentSetter(lang.mixin(_150,{content:cont,node:node}));
return op.set();
}
};
return html;
});
},"dojox/validate":function(){
define(["./validate/_base"],function(_151){
return _151;
});
},"dojox/main":function(){
define(["dojo/_base/kernel"],function(dojo){
return dojo.dojox;
});
},"dojox/embed/Flash":function(){
define(["dojo"],function(dojo){
var _152,_153;
var _154=9;
var _155="dojox-embed-flash-",_156=0;
var _157={expressInstall:false,width:320,height:240,swLiveConnect:"true",allowScriptAccess:"sameDomain",allowNetworking:"all",style:null,redirect:null};
function prep(_158){
_158=dojo.delegate(_157,_158);
if(!("path" in _158)){
console.error("dojox.embed.Flash(ctor):: no path reference to a Flash movie was provided.");
return null;
}
if(!("id" in _158)){
_158.id=(_155+_156++);
}
return _158;
};
if(dojo.isIE){
_152=function(_159){
_159=prep(_159);
if(!_159){
return null;
}
var p;
var path=_159.path;
if(_159.vars){
var a=[];
for(p in _159.vars){
a.push(p+"="+_159.vars[p]);
}
_159.params.FlashVars=a.join("&");
delete _159.vars;
}
var s="<object id=\""+_159.id+"\" "+"classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" "+"width=\""+_159.width+"\" "+"height=\""+_159.height+"\""+((_159.style)?" style=\""+_159.style+"\"":"")+">"+"<param name=\"movie\" value=\""+path+"\" />";
if(_159.params){
for(p in _159.params){
s+="<param name=\""+p+"\" value=\""+_159.params[p]+"\" />";
}
}
s+="</object>";
return {id:_159.id,markup:s};
};
_153=(function(){
var _15a=10,_15b=null;
while(!_15b&&_15a>7){
try{
_15b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_15a--);
}
catch(e){
}
}
if(_15b){
var v=_15b.GetVariable("$version").split(" ")[1].split(",");
return {major:(v[0]!=null)?parseInt(v[0]):0,minor:(v[1]!=null)?parseInt(v[1]):0,rev:(v[2]!=null)?parseInt(v[2]):0};
}
return {major:0,minor:0,rev:0};
})();
dojo.addOnWindowUnload(function(){
console.warn("***************UNLOAD");
var _15c=function(){
};
var objs=dojo.query("object").reverse().style("display","none").forEach(function(i){
for(var p in i){
if((p!="FlashVars")&&dojo.isFunction(i[p])){
try{
i[p]=_15c;
}
catch(e){
}
}
}
});
});
}else{
_152=function(_15d){
_15d=prep(_15d);
if(!_15d){
return null;
}
var p;
var path=_15d.path;
if(_15d.vars){
var a=[];
for(p in _15d.vars){
a.push(p+"="+_15d.vars[p]);
}
_15d.params.flashVars=a.join("&");
delete _15d.vars;
}
var s="<embed type=\"application/x-shockwave-flash\" "+"src=\""+path+"\" "+"id=\""+_15d.id+"\" "+"width=\""+_15d.width+"\" "+"height=\""+_15d.height+"\""+((_15d.style)?" style=\""+_15d.style+"\" ":"")+"pluginspage=\""+window.location.protocol+"//www.adobe.com/go/getflashplayer\" ";
if(_15d.params){
for(p in _15d.params){
s+=" "+p+"=\""+_15d.params[p]+"\"";
}
}
s+=" />";
return {id:_15d.id,markup:s};
};
_153=(function(){
var _15e=navigator.plugins["Shockwave Flash"];
if(_15e&&_15e.description){
var v=_15e.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split(".");
return {major:(v[0]!=null)?parseInt(v[0]):0,minor:(v[1]!=null)?parseInt(v[1]):0,rev:(v[2]!=null)?parseInt(v[2]):0};
}
return {major:0,minor:0,rev:0};
})();
}
var _15f=function(_160,node){
if(location.href.toLowerCase().indexOf("file://")>-1){
throw new Error("dojox.embed.Flash can't be run directly from a file. To instatiate the required SWF correctly it must be run from a server, like localHost.");
}
this.available=dojox.embed.Flash.available;
this.minimumVersion=_160.minimumVersion||_154;
this.id=null;
this.movie=null;
this.domNode=null;
if(node){
node=dojo.byId(node);
}
setTimeout(dojo.hitch(this,function(){
if(_160.expressInstall||this.available&&this.available>=this.minimumVersion){
if(_160&&node){
this.init(_160,node);
}else{
this.onError("embed.Flash was not provided with the proper arguments.");
}
}else{
if(!this.available){
this.onError("Flash is not installed.");
}else{
this.onError("Flash version detected: "+this.available+" is out of date. Minimum required: "+this.minimumVersion);
}
}
}),100);
};
dojo.extend(_15f,{onReady:function(_161){
},onLoad:function(_162){
},onError:function(msg){
},_onload:function(){
clearInterval(this._poller);
delete this._poller;
delete this._pollCount;
delete this._pollMax;
this.onLoad(this.movie);
},init:function(_163,node){
this.destroy();
node=dojo.byId(node||this.domNode);
if(!node){
throw new Error("dojox.embed.Flash: no domNode reference has been passed.");
}
var p=0,_164=false;
this._poller=null;
this._pollCount=0;
this._pollMax=15;
this.pollTime=100;
if(dojox.embed.Flash.initialized){
this.id=dojox.embed.Flash.place(_163,node);
this.domNode=node;
setTimeout(dojo.hitch(this,function(){
this.movie=this.byId(this.id,_163.doc);
this.onReady(this.movie);
this._poller=setInterval(dojo.hitch(this,function(){
try{
p=this.movie.PercentLoaded();
}
catch(e){
console.warn("this.movie.PercentLoaded() failed",e,this.movie);
}
if(p==100){
this._onload();
}else{
if(p==0&&this._pollCount++>this._pollMax){
clearInterval(this._poller);
throw new Error("Building SWF failed.");
}
}
}),this.pollTime);
}),1);
}
},_destroy:function(){
try{
this.domNode.removeChild(this.movie);
}
catch(e){
}
this.id=this.movie=this.domNode=null;
},destroy:function(){
if(!this.movie){
return;
}
var test=dojo.delegate({id:true,movie:true,domNode:true,onReady:true,onLoad:true});
for(var p in this){
if(!test[p]){
delete this[p];
}
}
if(this._poller){
dojo.connect(this,"onLoad",this,"_destroy");
}else{
this._destroy();
}
},byId:function(_165,doc){
doc=doc||document;
if(doc.embeds[_165]){
return doc.embeds[_165];
}
if(doc[_165]){
return doc[_165];
}
if(window[_165]){
return window[_165];
}
if(document[_165]){
return document[_165];
}
return null;
}});
dojo.mixin(_15f,{minSupported:8,available:_153.major,supported:(_153.major>=_153.required),minimumRequired:_153.required,version:_153,initialized:false,onInitialize:function(){
_15f.initialized=true;
},__ie_markup__:function(_166){
return _152(_166);
},proxy:function(obj,_167){
dojo.forEach((dojo.isArray(_167)?_167:[_167]),function(item){
this[item]=dojo.hitch(this,function(){
return (function(){
return eval(this.movie.CallFunction("<invoke name=\""+item+"\" returntype=\"javascript\">"+"<arguments>"+dojo.map(arguments,function(item){
return __flash__toXML(item);
}).join("")+"</arguments>"+"</invoke>"));
}).apply(this,arguments||[]);
});
},obj);
}});
_15f.place=function(_168,node){
var o=_152(_168);
node=dojo.byId(node);
if(!node){
node=dojo.doc.createElement("div");
node.id=o.id+"-container";
dojo.body().appendChild(node);
}
if(o){
node.innerHTML=o.markup;
return o.id;
}
return null;
};
_15f.onInitialize();
dojo.setObject("dojox.embed.Flash",_15f);
return _15f;
});
},"dojox/form/uploader/_IFrame":function(){
define(["dojo/query","dojo/dom-construct","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/dom-form","dojo/request/iframe"],function(_169,_16a,_16b,lang,_16c,_16d,_16e){
return _16b("dojox.form.uploader._IFrame",[],{postMixInProperties:function(){
this.inherited(arguments);
if(this.uploadType==="iframe"){
this.uploadType="iframe";
this.upload=this.uploadIFrame;
}
},uploadIFrame:function(data){
var _16f={},_170,form=this.getForm(),url=this.getUrl(),self=this;
data=data||{};
data.uploadType=this.uploadType;
_170=_16a.place("<form enctype=\"multipart/form-data\" method=\"post\"></form>",this.domNode);
_16c.forEach(this._inputs,function(n,i){
if(n.value!==""){
_170.appendChild(n);
_16f[n.name]=n.value;
}
},this);
if(data){
for(nm in data){
if(_16f[nm]===undefined){
_16a.create("input",{name:nm,value:data[nm],type:"hidden"},_170);
}
}
}
_16e.post(url,{form:_170,handleAs:"json",content:data}).then(function(_171){
_16a.destroy(_170);
if(data["ERROR"]||data["error"]){
self.onError(_171);
}else{
self.onComplete(_171);
}
},function(err){
console.error("error parsing server result",err);
_16a.destroy(_170);
self.onError(err);
});
}});
});
},"dojox/validate/regexp":function(){
define(["dojo/_base/lang","dojo/regexp","dojox/main"],function(lang,_172,_173){
var _174=lang.getObject("validate.regexp",true,_173);
_174=_173.validate.regexp={ipAddress:function(_175){
_175=(typeof _175=="object")?_175:{};
if(typeof _175.allowDottedDecimal!="boolean"){
_175.allowDottedDecimal=true;
}
if(typeof _175.allowDottedHex!="boolean"){
_175.allowDottedHex=true;
}
if(typeof _175.allowDottedOctal!="boolean"){
_175.allowDottedOctal=true;
}
if(typeof _175.allowDecimal!="boolean"){
_175.allowDecimal=true;
}
if(typeof _175.allowHex!="boolean"){
_175.allowHex=true;
}
if(typeof _175.allowIPv6!="boolean"){
_175.allowIPv6=true;
}
if(typeof _175.allowHybrid!="boolean"){
_175.allowHybrid=true;
}
var _176="((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var _177="(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]";
var _178="(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]";
var _179="(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|"+"4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])";
var _17a="0[xX]0*[\\da-fA-F]{1,8}";
var _17b="([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}";
var _17c="([\\da-fA-F]{1,4}\\:){6}"+"((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
var a=[];
if(_175.allowDottedDecimal){
a.push(_176);
}
if(_175.allowDottedHex){
a.push(_177);
}
if(_175.allowDottedOctal){
a.push(_178);
}
if(_175.allowDecimal){
a.push(_179);
}
if(_175.allowHex){
a.push(_17a);
}
if(_175.allowIPv6){
a.push(_17b);
}
if(_175.allowHybrid){
a.push(_17c);
}
var _17d="";
if(a.length>0){
_17d="("+a.join("|")+")";
}
return _17d;
},host:function(_17e){
_17e=(typeof _17e=="object")?_17e:{};
if(typeof _17e.allowIP!="boolean"){
_17e.allowIP=true;
}
if(typeof _17e.allowLocal!="boolean"){
_17e.allowLocal=false;
}
if(typeof _17e.allowPort!="boolean"){
_17e.allowPort=true;
}
if(typeof _17e.allowNamed!="boolean"){
_17e.allowNamed=false;
}
var _17f="(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)";
var _180="(?:[a-zA-Z](?:[-\\da-zA-Z]{0,6}[\\da-zA-Z])?)";
var _181=_17e.allowPort?"(\\:\\d+)?":"";
var _182="((?:"+_17f+"\\.)+"+_180+"\\.?)";
if(_17e.allowIP){
_182+="|"+_174.ipAddress(_17e);
}
if(_17e.allowLocal){
_182+="|localhost";
}
if(_17e.allowNamed){
_182+="|^[^-][a-zA-Z0-9_-]*";
}
return "("+_182+")"+_181;
},url:function(_183){
_183=(typeof _183=="object")?_183:{};
if(!("scheme" in _183)){
_183.scheme=[true,false];
}
var _184=_172.buildGroupRE(_183.scheme,function(q){
if(q){
return "(https?|ftps?)\\://";
}
return "";
});
var _185="(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]+(?:\\?[^?#\\s/]*)?(?:#[A-Za-z][\\w.:-]*)?)?)?";
return _184+_174.host(_183)+_185;
},emailAddress:function(_186){
_186=(typeof _186=="object")?_186:{};
if(typeof _186.allowCruft!="boolean"){
_186.allowCruft=false;
}
_186.allowPort=false;
var _187="([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+";
var _188=_187+"@"+_174.host(_186);
if(_186.allowCruft){
_188="<?(mailto\\:)?"+_188+">?";
}
return _188;
},emailAddressList:function(_189){
_189=(typeof _189=="object")?_189:{};
if(typeof _189.listSeparator!="string"){
_189.listSeparator="\\s;,";
}
var _18a=_174.emailAddress(_189);
var _18b="("+_18a+"\\s*["+_189.listSeparator+"]\\s*)*"+_18a+"\\s*["+_189.listSeparator+"]?\\s*";
return _18b;
},numberFormat:function(_18c){
_18c=(typeof _18c=="object")?_18c:{};
if(typeof _18c.format=="undefined"){
_18c.format="###-###-####";
}
var _18d=function(_18e){
return _172.escapeString(_18e,"?").replace(/\?/g,"\\d?").replace(/#/g,"\\d");
};
return _172.buildGroupRE(_18c.format,_18d);
},ca:{postalCode:function(){
return "([A-Z][0-9][A-Z] [0-9][A-Z][0-9])";
},province:function(){
return "(AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT)";
}},us:{state:function(_18f){
_18f=(typeof _18f=="object")?_18f:{};
if(typeof _18f.allowTerritories!="boolean"){
_18f.allowTerritories=true;
}
if(typeof _18f.allowMilitary!="boolean"){
_18f.allowMilitary=true;
}
var _190="AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|"+"NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY";
var _191="AS|FM|GU|MH|MP|PW|PR|VI";
var _192="AA|AE|AP";
if(_18f.allowTerritories){
_190+="|"+_191;
}
if(_18f.allowMilitary){
_190+="|"+_192;
}
return "("+_190+")";
}}};
return _174;
});
},"url:dojox/form/resources/UploaderFileList.html":"<div class=\"dojoxUploaderFileList\">\n\t<div data-dojo-attach-point=\"progressNode\" class=\"dojoxUploaderFileListProgress\">\n\t\t<div data-dojo-attach-point=\"percentBarNode\" class=\"dojoxUploaderFileListProgressBar\"></div>\n\t\t<div data-dojo-attach-point=\"percentTextNode\" class=\"dojoxUploaderFileListPercentText\">0%</div>\n\t</div>\n\t<table class=\"dojoxUploaderFileListTable\">\n\t\t<thead>\n\t\t\t<tr class=\"dojoxUploaderFileListHeader\">\n\t\t\t\t<th class=\"dojoxUploaderIndex\">${headerIndex}</th>\n\t\t\t\t<th class=\"dojoxUploaderIcon\">${headerType}</th>\n\t\t\t\t<th class=\"dojoxUploaderFileName\">${headerFilename}</th>\n\t\t\t\t<th class=\"dojoxUploaderFileSize\" data-dojo-attach-point=\"sizeHeader\">${headerFilesize}</th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody class=\"dojoxUploaderFileListContent\" data-dojo-attach-point=\"listNode\"></tbody>\n\t</table>\n<div>","url:dojox/form/resources/Uploader.html":"<span class=\"dijit dijitReset dijitInline\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:_onClick\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t> \n\t<input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\" data-dojo-attach-point=\"valueNode\" />\n</span>\n","*now":function(r){
r(["dojo/i18n!*preload*dojo/layers/nls/dojox*[\"en\",\"pt\",\"pt-br\",\"ROOT\"]"]);
}}});
define("dojo/layers/dojox",[],1);
