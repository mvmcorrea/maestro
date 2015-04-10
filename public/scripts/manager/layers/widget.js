//>>built
require({cache:{"manager/ValidationTextarea":function(){
require(["dojo/_base/declare","dojo/parser","dijit/form/Form","dijit/form/SimpleTextarea","dijit/form/ValidationTextBox"],function(_1,_2,_3,_4,_5){
return _1("Manager.ValidationTextarea",[_5,_4],{regExp:"(.|\\s)*",onBlur:function(){
if(!this.isValid()){
this.displayMessage(this.getErrorMessage());
}
}});
});
},"manager/Grid":function(){
define("manager/Grid",["dojo/_base/declare","dojo/store/Memory"],function(_6,_7){
return _6("Manager.Grid",[],{constructor:function(_8,_9){
this.name=_8;
this.page=_9;
this.idSelect=this.name+"_SELECT_CHECKED";
this.firstIndex=0;
this.data=null;
this.goPageStore=new _7();
this.hover();
},hover:function(){
var _a="table#"+this.name+" tbody tr";
dojo.query(_a).forEach(function(_b,_c,_d){
manager.hover(_b.id,function(_e){
_e.currentTarget.originalClassName="row"+(_c%2);
_e.currentTarget.className=_e.currentTarget.className.replace(_e.currentTarget.originalClassName,"rowenter");
},function(_f){
_f.currentTarget.className=_f.currentTarget.className.replace("rowenter",_f.currentTarget.originalClassName);
});
});
},selectRow:function(_10){
var arg="table#"+this.name+" tbody tr";
dojo.query(arg).forEach(function(_11,_12,arr){
_11.index=_12;
dojo.connect(_11,"ondblclick",function(_13){
_10(_13.currentTarget.index);
});
});
},setData:function(_14){
this.data=_14;
},addGoPage:function(_15){
for(var i=0;i<_15.length;i++){
this.goPageStore.add(_15[i]);
}
},getGoPage:function(){
return this.goPageStore;
},changeRow:function(_16){
var div=manager.byId(this.name+"-row-"+_16);
if(!div){
div=manager.byId(this.name+"DGrid-row-"+_16);
}
var _17=dijit.byId(this.name+"_SELECT"+"["+_16+"]");
var _18=div.originalClassName?div.originalClassName:div.className;
if(_17.get("checked")){
div.className=_18+"Checked";
}else{
div.className=_18.replace("Checked","");
}
},check:function(_19,_1a){
var _1b=dijit.byId(this.name+"_SELECT"+"["+_19+"]");
var _1c=manager.getElementById(this.idSelect);
if(_1b.get("checked")){
_1c.value=(_1c.value!=""?_1c.value+":":"")+_1a;
}else{
var _1d=new RegExp("^"+_1a+":?|"+_1a+":?|:?"+_1a+"$");
_1c.value=_1c.value.replace(_1d,"");
}
this.changeRow(_19);
},checkAll:function(n){
var _1e=dijit.byId(this.name+"chkAll");
for(var i=0;i<n;i++){
var _1f=this.firstIndex+i;
var _20=dijit.byId(this.name+"_SELECT"+"["+_1f+"]");
if(_1e.checked!=_20.checked){
if(_20.checked){
value=_20.get("value");
_20.set("checked",false);
}else{
_20.set("checked",true);
value=_20.get("value");
}
this.check(_1f,value);
}
}
},checkEachRow:function(n){
for(var i=0;i<n;i++){
var _21=this.firstIndex+i;
this.changeRow(_21);
}
},goPage:function(_22){
manager.setElementValueById(this.name+"_PAGING","yes");
manager.setElementValueById(this.name+"_PAGE",this.page);
manager.setElementValueById(this.name+"_GOPAGE",_22);
manager.doPostBack(this.name);
}});
});
},"manager/ComboBox":function(){
define("manager/ComboBox",["dojo/_base/declare"],function(_23){
return _23("Manager.ComboBox",[],{constructor:function(_24){
this.name=_24;
},onTextChange:function(_25,_26,_27){
var tf=dijit.byId(_26);
var sl=dijit.byId(_27);
var _28=tf.value;
sl.valueNode.value=_28;
if(sl.textbox.value==""){
alert("!!! ATENÇÃO!!!\n\não existe uma opção correspondente ao valor '"+_28+"'\ndo campo '"+_25+"'!");
tf.value="";
tf.focus();
}
},onSelectionChange:function(_29,_2a,_2b){
var tf=dijit.byId(_2b);
var sl=dijit.byId(_2a);
var _2c=sl.selectedIndex;
if(_2c!=-1){
tf.value=String(sl.options[_2c].value);
}
}});
});
},"manager/DateTextBox":function(){
define("manager/DateTextBox",["dojo/_base/declare","dijit/form/DateTextBox"],function(_2d,_2e){
return _2d("Manager.DateTextBox",[_2e],{managerFormat:{selector:"date",datePattern:"dd/MM/yyyy"},value:"",postMixInProperties:function(){
this.inherited(arguments);
this.value=dojo.date.locale.parse(this.value,this.managerFormat);
},serialize:function(_2f,_30){
return dojo.date.locale.format(_2f,this.managerFormat).toUpperCase();
}});
});
},"manager/DGrid":function(){
define("manager/DGrid",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/_base/Deferred","dojo/parser","dojo/aspect","dojo/dom-construct","dojo/dom-class","dojo/store/Memory","dojo/store/JsonRest","dijit/registry","dojo/store/util/QueryResults","dojo/store/Observable","dojo/store/Cache","dgrid/Grid","dgrid/OnDemandGrid","dgrid/extensions/Pagination"],function(_31,_32,_33,_34,_35,_36,_37,_38,_39,_3a,_3b,_3c,_3d,_3e,_3f,_40,_41,_42){
return _31("Manager.DGrid",[],{constructor:function(_43,_44,_45){
this.name=_43;
this.firstIndex=_44;
this.data=null;
this.columns=null;
this.widgets=[];
this.dgrid=null;
this.dgridType=_45;
this.store=null;
this.arrayData=[];
this.arrayColumns=[];
this.actionData="";
},startup:function(){
_33.forEach(this.data,_32.hitch(this,function(row,i){
var o={};
var id=i+this.firstIndex;
var arr=_33.map(row,function(_46,_47){
o["id"]=id;
o["widgets"]=[];
o["field"+_47]=_46;
});
this.arrayData[i++]=o;
}));
this.store=_3e(_3f(_3b({baseTarget:this.actionData,idProperty:"idPessoa",query:function(_48,_49){
var _4a,def,_4b;
this.target=this.baseTarget+"?start="+_49.start+"&count="+_49.count;
var r=_3b.prototype.query.call(this,_48,_49);
return r;
}}),_3a()));
this.store.getChildren=function(_4c,_4d){
return this.store.query({parent:_4c.id},_4d);
};
var arr=_33.map(this.columns,_32.hitch(this,function(_4e,i){
var _4f=_38.toDom(_4e.label);
this.arrayColumns[i]={label:_4e.label,field:_4e.field,className:_4e.className,sortable:_4e.sortable,renderHeaderCell:function(_50){
if(_4e.label.charAt(0)=="<"){
var _51=_38.toDom(_4e.label);
_38.place(_51,_50);
_36.parse(_50);
}else{
_50.appendChild(document.createTextNode(_4e.label));
}
},renderCell:function(_52,_53,_54){
_54.appendChild(document.createTextNode(_53));
}};
}));
if(this.dgridType=="demand"){
this.dgridOnDemand();
}else{
this.dgridPagination();
}
},dgridOnDemand:function(){
this.dgrid=new _41({},this.name);
this.dgrid.set("minRowsPerPage",16);
this.dgrid.set("store",this.store);
this.dgrid.set("columns",this.arrayColumns);
this.dgrid.startup();
},dgridPagination:function(){
var _55=_31([_40,_42]);
this.dgrid=new _55({pagingLinks:1,pagingTextBox:true,firstLastArrows:true,pageSizeOptions:[10,15,25]},this.name);
_37.after(this.dgrid,"renderArray",function(_56){
for(var i=0;i<_56.length;i++){
_36.parse(_56[i].id);
}
return _56;
});
_37.before(this.dgrid,"renderRow",function(_57){
for(var i=0;i<_57.widgets.length;i++){
var _58=_3c.byId(_57.widgets[i]);
if(_58){
_58.destroyRecursive();
}
}
},true);
this.dgrid.set("store",this.store);
this.dgrid.set("columns",this.arrayColumns);
this.dgrid.startup();
}});
});
},"manager/TransferBox":function(){
define("manager/TransferBox",["dojo/_base/declare","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dgrid/OnDemandList","dgrid/Selection","dgrid/Keyboard","dojo/dom-construct","dojo/text!./templates/TransferBox.html","dijit/form/Button"],function(_59,_5a,_5b,_5c,_5d,_5e,_5f,_60,_61){
var _62=_59([_5d,_5e,_5f]);
function _63(_64,_65){
var _66=0;
_64.on("dgrid-select",function(e){
_66+=e.rows.length;
_65.set("disabled",!_66);
});
_64.on("dgrid-deselect",function(e){
_66-=e.rows.length;
_65.set("disabled",!_66);
});
};
return _59("Manager.TransferBox",[_5a,_5b,_5c],{templateString:_61,baseClass:"TransferBox",sortProperty:"id",selectionMode:"extended",postCreate:function(){
this.inherited(arguments);
this.addButton.set("disabled",true);
this.removeButton.set("disabled",true);
var _67=this.from=new _62({store:this.store,selectionMode:this.selectionMode,query:function(_68){
return !_68.__selected;
},sort:this.sortProperty,renderRow:this.renderItem},this.fromNode);
_63(_67,this.addButton);
var to=this.to=new _62({store:this.store,selectionMode:this.selectionMode,query:function(_69){
return _69.__selected;
},sort:this.sortProperty,renderRow:this.renderItem},this.toNode);
_63(to,this.removeButton);
},_setValueAttr:function(_6a){
var _6b=!this.from||!this.from._started;
for(var i=0;i<_6a.length;i++){
var _6c=this.store.get(_6a[i]);
if(!_6c){
continue;
}
_6c.__selected=true;
_6b&&this.store.put(_6c);
this.input(_6c.id,"add");
}
},_getValueAttr:function(){
var _6d=this.store;
return _6d.query(function(_6e){
return _6e.__selected;
}).map(function(_6f){
return _6d.getIdentity(_6f);
});
},add:function(){
for(var id in this.from.selection){
var row=this.from.row(id);
row.data.__selected=true;
this.store.put(row.data);
this.input(id,"add");
}
},remove:function(){
for(var id in this.to.selection){
var row=this.to.row(id);
row.data.__selected=false;
this.store.put(row.data);
this.input(id,"del");
}
},input:function(id,op){
var _70=this.idHidden+"["+id+"]";
if(op=="add"){
var _71=_60.create("input",{type:"hidden",id:_70,name:_70,value:id},manager.getParentForm(this.id));
}else{
if(op=="del"){
_60.destroy(_70);
}
}
},renderItem:function(_72){
return _60.create("div",{innerHTML:_72.name});
}});
});
},"manager/MultiSelection":function(){
define("manager/MultiSelection",["dojo/_base/declare","manager/MultiTextField2"],function(_73,_74){
return _73("Manager.MultiSelection",[],{add:function(n){
var _75=manager.getElementById(this.mtfName+this.emptyField);
var _76=manager.getElementById(this.mtfName+"_options"+n);
var n=_75.length;
var i=0;
var _77=false;
var _78=_76.options[_76.selectedIndex].text;
for(i=0;i<n;i++){
if(_75.options[i].text==_78){
_77=true;
}
}
if(_77){
alert("Item jÃ¡ estÃ¡ na lista!");
}else{
_75.options[n]=new Option(_78);
_75.selectedIndex=n;
}
}});
});
},"manager/GridInput":function(){
define("manager/GridInput",["dojo/_base/declare","dojo/store/Memory","dojo/store/Observable","dojo/json"],function(_79,_7a,_7b,_7c){
return _79("Manager.GridInput",[],{constructor:function(id,_7d,_7e){
this.idGridInput=id;
this.fields=_7d;
this.actionGrid=_7e;
this.table=manager.getElementById(id+"_gridInput");
this.rowCount=0;
this.gridInputStore=new _7a();
this.gridInputStore=_7b(this.gridInputStore);
this.gridInputQuery=this.gridInputStore.query();
this.gridInputQuery.observe(function(row,_7f,_80){
if(_80>-1){
}
});
},setData:function(){
var _81=manager.getElementById(this.idGridInput+"_data");
_81.value=_7c.stringify(this.gridInputStore.data);
},loadData:function(_82){
for(var _83 in _82){
_82[_83].id=++this.rowCount;
this.gridInputStore.add(_82[_83]);
}
this.setData();
manager.doAjaxText(this.actionGrid,this.idGridInput+"_divGrid",this.idGridInput+"_divGrid");
},getInput:function(){
var _84=this.fields;
var _85=_84.split(",");
var _86={};
for(var i=0;i<_85.length;i++){
var id=_85[i];
var _87=dijit.byId(id);
if(_87!=null){
_86[id]=_87.get("value");
if(_87.get("displayedValue")!=_87.get("value")){
_86[id+"_text"]=_87.get("displayedValue");
}
}else{
var _87=manager.getElementById(_85[i]);
_86[id]=_87.value;
}
}
return _86;
},select:function(_88){
},add:function(){
var row=this.getInput();
row.id=++this.rowCount;
this.gridInputStore.add(row);
this.setData();
manager.doAjaxText(this.actionGrid,this.idGridInput+"_divGrid",this.idGridInput+"_divGrid");
},remove:function(){
var div=manager.getElementById(this.idGridInput+"_divGrid");
var _89=manager.getElementsByTagName("TBODY",div).item(0);
var _8a=manager.getElementsByTagName("TR",_89);
for(var i=0;i<_8a.length;i++){
var _8b=manager.getElementsByTagName("INPUT",_8a[i]);
if(_8b[0].type=="checkbox"){
if(_8b[0].checked){
var id=_8b[0].value;
this.gridInputStore.remove(id);
}
}
}
this.setData();
manager.doAjaxText(this.actionGrid,this.idGridInput+"_divGrid",this.idGridInput+"_divGrid");
}});
});
},"manager/BoxPane":function(){
require({cache:{"url:manager/templates/BoxPane.html":"<div class=\"mBoxPane\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"mBoxPaneTitleBar ${classTitle}\" id=\"${id}_titleBar\">\n\t<span data-dojo-attach-point=\"titleNode\" class=\"mBoxPaneTitle\" id=\"${id}_title\"></span>\n\t<div data-dojo-attach-point=\"toolBarNode\" class=\"mBoxPaneToolBar\"></div>\n\t</div>\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"mBoxPaneContent\"></div>\n</div>\n"}});
define("manager/BoxPane",["dojo/_base/declare","dojox/layout/ContentPane","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_CssStateMixin","dijit/form/_FormMixin","dojo/text!./templates/BoxPane.html"],function(_8c,_8d,_8e,_8f,_90,_91,_92){
return _8c("Manager.BoxPane",[_8d,_8e,_8f,_91,_90],{templateString:_92,baseClass:"mBoxPane",classTitle:"",toolBar:"",cssStateNodes:{toolBarNode:"toolIcon"},focus:function(){
},attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[{node:"titleNode",type:"innerHTML"},{node:"titleBar",type:"attribute"}],"aria-describedby":""}),onCancel:function(){
},startup:function(){
if(this.toolBar!=""){
this.toolBarNode.appendChild(dojo.byId(this.toolBar));
}
this.inherited(arguments);
}});
});
},"manager/Lookup":function(){
define("manager/Lookup",["dojo/_base/declare"],function(_93){
return _93("Manager.Lookup",[],{context:null,url:"",handle:null,constructor:function(){
this.obj=this;
},setContext:function(_94){
this.context=_94;
},start:function(){
this.url=this.context.action+"?__lookupName="+this.context.name;
if(this.context.filter!=""){
var _95=this.context.filter.split(",");
for(var i=0;i<_95.length;i++){
var id=_95[i];
if(id!="none"){
if(field=dijit.byId(id)){
var _96=field.get("value");
}else{
field=manager.getElementById(id);
var _96=escape(field.value);
}
var _97=id;
this.url=this.url+"&"+_97+"="+_96;
}
}
}
this.handle=dojo.subscribe(this.context.name,this,this.deliver);
if(this.context.autocomplete){
this.autocomplete();
}else{
this.open();
}
},open:function(){
var _98=this.context.name;
var _99=manager.getWindow(_98);
if(!_99){
manager.addWindow(_98);
}
manager.getWindow(_98).setHref(this.url);
manager.getWindow(_98).open();
},autocomplete:function(){
var _9a=new manager.Ajax({url:this.url,response_type:"TEXT",parameters:{name:this.context.name,__ISAJAXCALL:"yes"},callback_function:function(_9b,_9c){
var _9d=_9b;
var _9e=_9c.args.content.name;
var _9f=eval(_9e);
_9f.deliver(_9e,0,_9d);
}});
_9a.call();
},deliver:function(_a0){
related=this.obj.context.related;
var _a1=/(.*):([^:]*)/;
var _a2=related.split(",");
for(var i=0;i<_a2.length;i++){
var aId=_a1.exec(_a2[i])||Array(_a2[i],_a2[i]);
var _a3=(aId[2]?aId[2]:aId[1]);
var _a4=_a0[_a3];
if(aId[1]!="none"){
var _a5=dijit.byId(aId[1]);
if(_a5!=null){
if(_a5.declaredClass==="Manager.DateTextBox"){
var _a6=_a4.split("/");
_a5.set("value",_a6[2]+"-"+_a6[1]+"-"+_a6[0]);
}else{
_a5.set("value",_a4);
}
}else{
_a5=manager.getElementById(aId[1]);
if(_a5!=null){
_a5.value=_a4;
_a5=manager.getElementById(_a5.name+"_sel");
if(_a5!=null){
_a5.value=_a4;
}
}
}
}
}
dojo.unsubscribe(this.handle);
manager.getWindow(this.obj.context.name).close();
}});
});
},"manager/GridPages":function(){
define("manager/GridPages",["dojo/_base/declare"],function(_a7){
return _a7("Manager.GridPages",[],{templateString:dojo.cache("../../manager","templates/GridPages.html"),baseClass:"mGridPages",from:0,to:0,selected:0,grid:"",postCreate:function(){
var _a8=[];
_a8[0]=document.createElement("span");
_a8[0].appendChild(document.createTextNode("Páginas:"));
_a8[0].className="text";
this.containerNode.appendChild(_a8[0]);
for(var i=this.from;i<=this.to;i++){
_a8[i]=document.createElement("span");
_a8[i].appendChild(document.createTextNode(i));
_a8[i].className=(i==this.selected)?"selected":"link";
this.containerNode.appendChild(_a8[i]);
}
},onClick:function(_a9){
}});
});
},"manager/Validate":function(){
require(["dojox/validate/_base","dojo/_base/lang","dijit/registry"],function(_aa,_ab,_ac){
Manager.Validate={isValidCpf:function(_ad,_ae){
var _af=_ac.byId(_ae);
if(_af){
if(!_af.required&&(_af._isEmpty(_ad)||(_ad=="___.___.___-__"))){
return true;
}
}
if(!_ab.isString(_ad)){
if(!_ad){
return false;
}
_ad=_ad+"";
while(_ad.length<11){
_ad="0"+_ad;
}
}
var _b0={format:["###.###.###-##","#########-##","###########","###.###.###-YY"]};
if(_aa.isNumberFormat(_ad,_b0)){
_ad=_ad.replace("-","").replace(/\./g,"");
var cpf=[];
var dv=[];
var i,j,tmp;
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_ad.length;j++){
tmp+=""+i;
}
if(_ad===tmp){
return false;
}
}
for(i=0;i<9;i++){
cpf.push(parseInt(_ad.charAt(i),10));
}
for(i=9;i<12;i++){
dv.push(parseInt(_ad.charAt(i),10));
}
var _b1=[10,9,8,7,6,5,4,3,2];
var sum=0;
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*_b1[i];
}
var dv0=(sum%11)<2?0:11-(sum%11);
if(dv0==dv[0]){
sum=0;
_b1=[11,10,9,8,7,6,5,4,3,2];
cpf.push(dv0);
for(i=0;i<cpf.length;i++){
sum+=cpf[i]*_b1[i];
}
var dv1=(sum%11)<2?0:11-(sum%11);
if(dv1===dv[1]){
return true;
}
}
}if(_ad.slice(-2)==='YY')
return true;
return false;
},isValidCnpj:function(_b2,_b3){
var _b4=_ac.byId(_b3);
if(_b4){
if(!_b4.required&&(_b4._isEmpty(_b2)||(_b2=="__.___.___/____-__"))){
return true;
}
}
if(!_ab.isString(_b2)){
if(!_b2){
return false;
}
_b2=_b2+"";
while(_b2.length<14){
_b2="0"+_b2;
}
}
var _b5={format:["##.###.###/####-##","########/####-##","############-##","##############"]};
if(_aa.isNumberFormat(_b2,_b5)){
_b2=_b2.replace("/","").replace(/\./g,"").replace("-","");
var cgc=[];
var dv=[];
var i,j,tmp;
for(i=0;i<10;i++){
tmp="";
for(j=0;j<_b2.length;j++){
tmp+=""+i;
}
if(_b2===tmp){
return false;
}
}
for(i=0;i<12;i++){
cgc.push(parseInt(_b2.charAt(i),10));
}
for(i=12;i<14;i++){
dv.push(parseInt(_b2.charAt(i),10));
}
var _b6=[5,4,3,2,9,8,7,6,5,4,3,2];
var sum=0;
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*_b6[i];
}
var dv0=(sum%11)<2?0:11-(sum%11);
if(dv0==dv[0]){
sum=0;
_b6=[6,5,4,3,2,9,8,7,6,5,4,3,2];
cgc.push(dv0);
for(i=0;i<cgc.length;i++){
sum+=cgc[i]*_b6[i];
}
var dv1=(sum%11)<2?0:11-(sum%11);
if(dv1===dv[1]){
return true;
}
}
}
},isValidNIT:function(_b7,_b8){
var _b9=_ac.byId(_b8);
if(_b9){
if(!_b9.required&&(_b9._isEmpty(_b7)||(_b7=="___._____.__-_"))){
return true;
}
}
if(!_ab.isString(_b7)){
if(!_b7){
return false;
}
_b7=_b7+"";
while(_b7.length<14){
_b7="0"+_b7;
}
}
var _ba={format:["###.#####.##-#","###########"]};
if(_aa.isNumberFormat(_b7,_ba)){
_b7=_b7.replace(/\./g,"").replace("-","");
var nit=[];
var dv=[];
var i,j,tmp;
for(i=0;i<11;i++){
tmp="";
for(j=0;j<_b7.length;j++){
tmp+=""+i;
}
if(_b7===tmp){
return false;
}
}
for(i=0;i<10;i++){
nit.push(parseInt(_b7.charAt(i),10));
}
for(i=10;i<11;i++){
dv.push(parseInt(_b7.charAt(i),10));
}
var _bb=[3,2,9,8,7,6,5,4,3,2];
var sum=0;
for(i=0;i<nit.length;i++){
sum+=nit[i]*_bb[i];
}
var dv0=11-(sum%11);
if((dv0==10)||(dv0==11)){
dv0=0;
}
if(dv0==dv[0]){
return true;
}
}
return false;
}};
});
},"manager/DataGrid":function(){
define("manager/DataGrid",["dojo/_base/declare","dojox/grid/DataGrid"],function(_bc,_bd){
return _bc("Manager.DataGrid",[_bd],{constructor:function(_be,_bf){
this.obj=this;
this.name=_be;
this.page=_bf;
this.widget=null;
},canSort:function(i){
return (i!=3);
},get:function(_c0){
return [this.index,_c0].join(", ");
},removeEscape:function(_c1){
return _c1?_c1.replace("&lt","<"):"";
},goPage:function(_c2){
manager.setElementValueById("_PAGING","yes");
manager.setElementValueById(this.name+"_PAGE",this.page);
manager.setElementValueById(this.name+"_GOPAGE",_c2);
manager.setElementValueById("_GRIDNAME",this.name);
manager.doPostBack(this.name);
}});
});
},"manager/Tree":function(){
define("manager/Tree",["dojo/_base/declare","dojo/_base/window","dojo/store/Memory","dijit/tree/ObjectStoreModel","dijit/Tree"],function(_c3,_c4,_c5,_c6,_c7){
return _c3("Manager.Tree",[_c7],{constructor:function(obj){
this.root=(obj.root?obj.root:"root");
this.store=new _c5({data:obj.data,getChildren:function(_c8){
return this.query({parent:_c8.id});
}});
this.model=new _c6({store:this.store,mayHaveChildren:function(_c9){
return (_c9.type=="folder");
},query:{id:this.root}});
this.layout=obj.layout;
this.onClick=obj.selectEvent;
this.iconFolderOpened=(obj.iconFolderOpened?obj.iconFolderOpened:"iconFolderOpened");
this.iconFolderClosed=(obj.iconFolderClosed?obj.iconFolderClosed:"iconFolderClosed");
this.iconLeaf=(obj.iconLeaf?obj.iconLeaf:"iconLeaf");
},store:null,model:null,getIconClass:function(_ca,_cb){
var cls=(!_ca||(_ca.type=="folder"))?_cb?this.iconFolderOpened:this.iconFolderClosed:this.iconLeaf;
return cls+this.layout;
},showRoot:false});
});
},"manager/MultiTextField2":function(){
define("manager/MultiTextField2",["dojo/_base/declare"],function(_cc){
return _cc("Manager.MultiTextField2",[],{mtfName:"",constructor:function(_cd){
this.mtfName=_cd;
this.leftSeparator="[";
this.rightSeparator="]";
this.separator=this.rightSeparator+" "+this.leftSeparator;
this.emptyField=this.leftSeparator+this.rightSeparator;
},onSubmit:function(_ce,_cf){
var _d0=manager.getElementById(this.mtfName+this.emptyField);
if(_d0!=null&&_d0.options!=null){
for(var i=0;i<_d0.length;i++){
_d0.options[i].value=_d0.options[i].text;
_d0.options[i].selected=true;
}
}
return true;
},split:function(_d1){
return _d1.substring(1,_d1.length-1).split(this.separator);
},join:function(_d2){
var _d3=this.leftSeparator;
for(var i=0;i<_d2.length;i++){
if(i>0){
_d3+=this.separator;
}
_d3+=_d2[i];
}
_d3+=this.rightSeparator;
return _d3;
},onKeyDown:function(_d4,_d5,_d6,_d7,_d8){
var key=(document.all!=null)?_d7.keyCode:_d7.which;
var _d9=_d6+"_text";
var len=_d9.length;
if(_d4.name.substring(0,len)==_d9){
if(key==13){
this.add(_d5,_d6,_d8);
return false;
}
}else{
if(_d4.name==_d6+this.emptyField){
if(key==46){
this.remove(_d5,_d6,_d8);
return false;
}
}
}
},onSelect:function(_da){
var _db=manager.getElementById(this.mtfName+this.emptyField);
var i=_db.selectedIndex;
if(i!=-1){
var a=this.split(_db.options[i].text);
for(var j=1;j<=_da;j++){
var tf=manager.getElementById(this.mtfName+"_text"+j);
if(tf!=null){
tf.value=a[j-1];
}else{
var op=manager.getElementById(this.mtfName+"_options"+j);
if(op!=null){
for(var n=0;n<op.options.length;n++){
if(op.options[n].text==a[j-1]){
op.selectedIndex=n;
break;
}
}
}
}
}
}else{
for(var j=1;j<=_da;j++){
var tf=manager.getElementById(this.mtfName+"_text"+j);
if(tf!=null){
tf.value="";
}else{
var op=manager.getElementById(this.mtfName+"_options"+j);
if(op!=null){
op.selectedIndex=-1;
}
}
}
}
},getInput:function(_dc){
var _dd=manager.getElementById(this.mtfName+this.emptyField);
var _de=new Array(_dc);
var _df="";
for(var i=1;i<=_dc;i++){
var tf=manager.getElementById(this.mtfName+"_text"+i);
_de[i-1]="";
if(tf!=null){
_de[i-1]=tf.value;
}else{
var _dd=manager.getElementById(this.mtfName+"_options"+i);
if(_dd!=null){
_de[i-1]=_dd.options[_dd.selectedIndex].text;
}
}
}
return this.join(_de);
},add:function(_e0){
var _e1=manager.getElementById(this.mtfName+this.emptyField);
var i=_e1.length;
_e1.options[i]=new Option(this.getInput(_e0));
_e1.selectedIndex=i;
},remove:function(_e2){
var _e3=manager.getElementById(this.mtfName+this.emptyField);
for(var i=0;i<_e3.length;i++){
if(_e3.options[i].selected){
_e3.options[i]=null;
if(i>=_e3.length){
i=_e3.length-1;
}
if(i>=0){
_e3.options[i].selected=true;
}
break;
}
}
},modify:function(_e4){
var _e5=manager.getElementById(this.mtfName+this.emptyField);
var i=_e5.selectedIndex;
if(i!=-1){
_e5.options[i].text=this.getInput(_e4);
}else{
alert("É preciso selecionar o item a ser modificado!");
}
},moveUp:function(_e6){
var _e7=manager.getElementById(this.mtfName+this.emptyField);
var i=_e7.selectedIndex;
if(i!=-1){
if(i>0){
var u=_e7.options[i-1].text;
_e7.options[i-1].text=_e7.options[i].text;
_e7.options[i-1].selected=true;
_e7.options[i].text=u;
_e7.options[i].selected=false;
_e7.selectedIndex=i-1;
}
}else{
alert("É preciso selecionar o item a ser modificado!");
}
},moveDown:function(_e8){
var _e9=manager.getElementById(this.mtfName+this.emptyField);
var i=_e9.selectedIndex;
if(i!=-1){
if(i<_e9.options.length-1){
var u=_e9.options[i+1].text;
_e9.options[i+1].text=_e9.options[i].text;
_e9.options[i+1].selected=true;
_e9.options[i].text=u;
_e9.options[i].selected=false;
_e9.selectedIndex=i+1;
}
}else{
alert("É preciso selecionar o item a ser modificado!");
}
}});
});
},"manager/EditMask":function(){
define("manager/EditMask",["dojo/_base/declare"],function(_ea){
return _ea("Manager.EditMask",[],{version:"0.1",h1:null,h2:null,h3:null,h4:null,constructor:function(_eb,_ec,_ed,_ee){
this.element=manager.getElementById(_eb);
if(this.element!=null){
this.mask=_ec;
this.errMsg=_ee!=""?_ee:"Caracter inválido!";
this.optional=_ed;
var _ef=this.element.value?this.filterStrip(this.element.value):"";
this.element.value=this.fillMask(_ef);
this.fcolor=this.element.style.color==""?"black":_eb.style.color;
this.first=true;
this.element.editMask=this;
this.h1=dojo.connect(this.element,"keypress",this,this.process);
this.h2=dojo.connect(this.element,"focus",this,this.onEnter);
this.h3=dojo.connect(this.element,"submit",this,this.onSubmit);
}
},onEnter:function(_f0){
element=_f0.target;
element.editMask.color=element.style.color;
element.editMask.first=true;
var _f1=element.value?element.editMask.filterStrip(element.value):"";
element.value=element.editMask.fillMask(_f1);
},onExit:function(_f2){
element=_f2.target;
var ok=element.editMask.canBlur(element);
if(ok){
dojo.disconnect(element.editMask.h4);
element.editMask.first=true;
}else{
element.focus();
}
return ok;
},canBlur:function(_f3){
var _f4=_f3.editMask.filterExit(_f3.value);
var ok=true;
if(!_f3.editMask.optional){
ok=(_f4.length==_f3.editMask.mask.length);
}
if(ok){
_f3.value=_f4;
_f3.style.color=_f3.editMask.fcolor;
}else{
_f3.style.color="red";
_f3.focus();
}
return ok;
},onError:function(_f5){
alert(_f5);
},onSubmit:function(){
this.element.value=this.filterExit(this.element.value);
return true;
},process:function(_f6){
element=_f6.target;
keyCode=_f6.charCode!=0?_f6.charCode:_f6.keyCode;
editMask=element.editMask;
if(element.editMask.first){
element.editMask.h4=dojo.connect(element,"blur",element.editMask,element.editMask.onExit);
element.editMask.first=false;
}
filter=editMask.filterStrip(element.value);
var _f7="";
if(keyCode==9){
return true;
}else{
if(keyCode==8&&filter.length!=0){
filter=filter.substring(0,filter.length-1);
}else{
if(((keyCode>47&&keyCode<122))&&filter.length<editMask.filterMax()){
_f7=filter+String.fromCharCode(keyCode);
}else{
_f7=filter;
}
}
}
var _f8="";
var _f9=editMask.validateMask(_f7);
if(_f9){
_f8=editMask.fillMask(_f9);
}else{
_f8=editMask.fillMask(filter);
}
element.value=_f8;
_f6.preventDefault();
return false;
},filterStrip:function(_fa){
mask=this.mask;
for(var _fb=0;_fb<mask.length++;_fb++){
var c=mask.charAt(_fb);
if(this.isEditChar(c)){
mask=this.filterReplace(mask,mask.substring(_fb,_fb+1),"");
}
}
filterMask=mask+"_";
for(var _fb=0;_fb<filterMask.length++;_fb++){
_fa=this.filterReplace(_fa,filterMask.substring(_fb,_fb+1),"");
}
return _fa;
},filterMask:function(_fc){
filterMask="_";
for(var _fd=0;_fd<filterMask.length++;_fd++){
_fc=this.filterReplace(_fc,filterMask.substring(_fd,_fd+1),"");
}
return _fc;
},filterMax:function(){
filterTemp=this.mask;
for(var _fe=0;_fe<(this.mask.length+1);_fe++){
var c=this.mask.charAt(_fe);
if(!this.isEditChar(c)){
filterTemp=this.filterReplace(filterTemp,c,"");
}
}
return filterTemp.length;
},filterExit:function(_ff){
mask=this.mask+"_";
var _100=true;
for(var i=0;i<_ff.length;i++){
_100=_100&&(_ff.charAt(i)!="_");
}
if(!_100){
while((_ff.length>0)&&(mask.indexOf(_ff.charAt(0))>-1)){
_ff=_ff.substr(1);
}
}
return _ff;
},filterReplace:function(_101,text,by){
var _102=_101.length,_103=text.length;
if((_102==0)||(_103==0)){
return _101;
}
var i=_101.indexOf(text);
if((!i)&&(text!=_101.substring(0,_103))){
return _101;
}
if(i==-1){
return _101;
}
var _104=_101.substring(0,i)+by;
if(i+_103<_102){
_104+=this.filterReplace(_101.substring(i+_103,_102),text,by);
}
return _104;
},isEditChar:function(c){
switch(c){
case "_":
case "#":
case "a":
case "A":
case "l":
case "L":
return true;
default:
return false;
}
return false;
},displayMaskChar:function(c){
if(this.isEditChar(c)){
return "_";
}else{
return c;
}
},displayMask:function(mask){
var d="";
for(var i=0;i<mask.length;i++){
d+=this.displayMaskChar(mask.substr(i,1));
}
return d;
},validateMask:function(_105){
var ok=true;
var _106=this.mask.length-1;
var pos=posmask=0;
var n=_105.length-1;
var _107="";
while((pos<=n)&&(posmask<=_106)){
var m=this.mask.charAt(posmask);
var c=_105.charCodeAt(pos);
if(this.isEditChar(m)){
var code=this.isInsertOK(c,m);
if(ok=ok&&(code!=null)){
_107=_107+String.fromCharCode(code);
}else{
this.onError(this.errMsg);
}
pos+=1;
}
posmask+=1;
}
return ok?_107:null;
},fillMask:function(_108){
var _109="";
var n=_108.length-1;
var _10a=this.mask.length-1;
var pos=n;
var _10b=_10a;
while(_10b>=0){
var m=this.mask.charAt(_10b);
if(pos>=0){
var c=_108.charAt(pos);
if(this.isEditChar(m)){
_109=c+_109;
pos-=1;
}else{
_109=m+_109;
}
}else{
if(this.isEditChar(m)){
_109="_"+_109;
}else{
_109=m+_109;
}
}
_10b-=1;
}
return _109;
},isInsertOK:function(code,_10c){
switch(_10c){
case "_":
return true;
break;
case "#":
return this.checkDigit(code);
break;
case "a":
return this.checkAlphaNumeric(code);
break;
case "A":
return this.checkUpCaseAlphaNumeric(code);
break;
case "l":
return this.checkAlpha(code);
break;
case "L":
return this.checkUpCaseAlpha(code);
break;
}
return false;
},checkDigit:function(code){
if((code>=48)&&(code<=57)){
return code;
}else{
return null;
}
},checkAlpha:function(code){
if(((code>=65)&&(code<=90))||((code>=97)&&(code<=122))){
return code;
}else{
return null;
}
},checkUpCaseAlpha:function(code){
if((code>=65)&&(code<=90)){
return code;
}else{
if((code>=97)&&(code<=122)){
return code-32;
}else{
return null;
}
}
},checkAlphaNumeric:function(code){
if(((code>=65)&&(code<=90))||((code>=97)&&(code<=122))||((code>=48)&&(code<=57))){
return code;
}else{
return null;
}
},checkUpCaseAlphaNumeric:function(code){
if((code>=65)&&(code<=90)){
return code;
}else{
if((code>=97)&&(code<=122)){
return code-32;
}else{
if((code>=48)&&(code<=57)){
return code;
}else{
return null;
}
}
}
}});
});
},"manager/TextTable":function(){
define("manager/TextTable",["dojo/_base/declare"],function(_10d){
return _10d("Manager.TextTable",[],{constructor:function(id,_10e,cols){
this.id=id;
this.table=manager.getElementById(id);
this.rowSelected="";
this.lastRow=manager.getElementsByTagName("TR",this.table).length;
this.onmouse=true;
this.zebra=true;
this.data=new Array();
this.textTable=this;
this.cols=cols;
this.iterate(this.init);
this.reorder();
},setRowClass:function(obj,_10f,r){
obj.className=this.zebra?"row"+(r%2):"row0";
obj.baseClassName=this.oldClassName=obj.className;
},setRowId:function(obj,r){
var tbl=obj.parentNode.parentNode;
obj.id=tbl.id+"row"+r;
},init:function(obj,_110,r,c,data,tbl,_111){
if(_110){
obj.textTable=_111;
_111.setRowId(obj,r);
_111.setRowClass(obj,_110,r);
obj.onclick=function(){
var tbl=this.textTable;
tbl.select(this.id);
};
if(_111.onmouse){
obj.onmouseover=function(){
this.oldClassName=this.className;
this.className="hover";
};
obj.onmouseout=function(){
this.className=this.oldClassName;
};
}
}
},iterate:function(_112,data){
var r,c;
if(!_112){
return;
}
for(r=0;r<this.table.rows.length;++r){
if(false==_112(this.table.rows[r],true,r,c,data,this.table,this)){
return;
}
for(c=0;c<this.table.rows[r].cells.length;++c){
if(false==_112(this.table.rows[r].cells[c],false,r,c,data,this.table,this)){
return;
}
}
}
},add:function(_113){
var _114=manager.getElementsByTagName("TBODY",this.table).item(0);
var rows=manager.getElementsByTagName("TR",_114);
if(_113.length>0){
var r=document.createElement("TR");
_114.insertBefore(r,_114.firstChild);
for(var i=0;i<_113.length;i++){
var c=document.createElement("TD");
r.appendChild(c);
var t=document.createTextNode(_113[i]);
c.appendChild(t);
}
var _115=this.lastRow++;
this.init(r,true,_115,null,null,null,this);
}
},drop:function(_116){
var _117=manager.getElementsByTagName("TBODY",this.table).item(0);
var row=manager.getElementById(_116);
if(row){
_117.removeChild(row);
this.reorder();
this.lastRow--;
this.rowSelected="";
}
},modify:function(_118,_119){
var row=manager.getElementById(_118);
if(_119.length>0){
var cols=manager.getElementsByTagName("TD",row);
if(cols.length>0){
for(var i=0;i<cols.length;i++){
cols[i].innerHTML=_119[i];
}
}
}
},select:function(_11a){
var row=manager.getElementById(_11a);
if(_11a==this.rowSelected){
row.className=row.baseClassName;
row.oldClassName=row.baseClassName;
this.rowSelected="";
}else{
row.oldClassName=row.className;
row.className="hover";
if(this.rowSelected!=""){
row=manager.getElementById(this.rowSelected);
row.className=row.baseClassName;
}
this.rowSelected=_11a;
this.customSelect();
}
},get:function(_11b){
var row=manager.getElementById(_11b);
var cols=manager.getElementsByTagName("TD",row);
var text=new Array(cols.length);
if(cols.length>0){
for(var i=0;i<cols.length;i++){
text[i]=cols[i].firstChild?cols[i].innerHTML:"";
}
}
return text;
},setdata:function(){
var r,c;
for(r=0;r<this.table.rows.length;++r){
this.data[r]=new Array();
for(c=0;c<this.table.rows[r].cells.length;++c){
this.data[r][c]=this.table.rows[r].cells[c].innerHTML;
}
}
},getdata:function(){
this.setdata();
return this.data;
},customSelect:function(){
},reorder:function(){
var _11c=this.table.rows.length;
var _11d=_11c;
for(row=0;row<_11c;++row){
_11d--;
this.setRowClass(this.table.rows[row],true,_11d);
this.setRowId(this.table.rows[row],_11d);
}
},unload:function(){
this.iterate(function(o){
o.onmouseover=o.onmouseout=null;
});
}});
});
},"manager/MultiTextField":function(){
define("manager/MultiTextField",["dojo/_base/declare"],function(_11e){
return _11e("Manager.MultiTextField",[],{mtfName:"",constructor:function(_11f){
this.mtfName=_11f;
this.leftSeparator="[";
this.rightSeparator="]";
this.separator=this.rightSeparator+" "+this.leftSeparator;
this.emptyField=this.leftSeparator+this.rightSeparator;
},getTable:function(){
return eval(this.mtfName+"_table");
},split:function(_120){
return _120.substring(1,_120.length-1).split(this.separator);
},join:function(_121){
var _122=this.leftSeparator;
for(var i=0;i<_121.length;i++){
if(i>0){
_122+=this.separator;
}
_122+=_121[i];
}
_122+=this.rightSeparator;
return _122;
},onSubmit:function(_123){
var name=this.mtfName;
var form=dojo.byId(manager.getParentForm(name));
while(manager.getElementById(name+"[]")){
dojo._destroyElement(name+"[]");
}
var tbl=this.getTable();
data=tbl.getdata();
var _124="";
var _125=_123.split(",");
for(var i=0;i<data.length;i++){
for(var j=0;j<data[i].length;j++){
var list=document.createElement("INPUT");
list.id=name+"["+i+"]"+"["+j+"]";
list.name=name+"["+i+"]"+"["+j+"]";
list.type="hidden";
var _126=dijit.byId(_125[j]);
if(_126.store){
_126.store.query({name:data[i][j]}).forEach(function(_127){
_124=_127.id;
});
}else{
_124=data[i][j];
}
list.value=_124;
form.appendChild(list);
}
}
return true;
},onSelect:function(_128){
var tbl=this.getTable();
tbl.onmouse=false;
tbl.customSelect=function(){
var _129=_128.split(",");
var _12a=new Array(_129.length);
var text=this.get(tbl.rowSelected);
for(var i=0;i<text.length;i++){
var _12b=dijit.byId(_129[i]);
if(_12b.store){
_12b.store.query({name:text[i]}).forEach(function(_12c){
_12b.setValue(_12c.id);
});
}else{
if(_12b.options!=null){
for(var n=0;n<_12b.options.length;n++){
if(_12b.options[n].text==text[i]){
_12b.selectedIndex=n;
break;
}
}
}else{
if(text[i]!==""){
_12b.textbox.value=text[i];
}
}
}
}
};
},getInput:function(_12d){
var _12e=_12d.split(",");
var _12f=new Array(_12e.length);
for(var i=0;i<_12e.length;i++){
var _130=manager.getElementById(_12e[i]);
if(_130.options!=null){
_12f[i]=_130.options[_130.selectedIndex].text;
}else{
_12f[i]=_130.value;
}
}
return _12f;
},add:function(_131){
var tbl=this.getTable();
tbl.add(this.getInput(_131));
},remove:function(_132){
var tbl=this.getTable();
if(this.isSelected()){
tbl.drop(tbl.rowSelected);
}
},modify:function(_133){
var tbl=this.getTable();
if(this.isSelected()){
tbl.modify(tbl.rowSelected,this.getInput(_133));
}
},isSelected:function(){
var tbl=this.getTable();
if(tbl.rowSelected==""){
alert("Nenhum item selecionado!");
return false;
}else{
return true;
}
}});
});
},"manager/Currency":function(){
define("manager/Currency",["dojo/_base/declare"],function(_134){
return _134("Manager.Currency",[],{constructor:function(){
},format:function(_135){
var _136=_135.value;
var v="";
for(var i=0;i<_136.length;i++){
var c=_136.charAt(i);
if((c>="0")&&(c<="9")){
v+=c;
}
}
var l=v.length;
if(l==0){
return true;
}
if(l<3){
alert("DÃgitos insuficientes para valor monetÃ¡rio!");
_135.focus();
return true;
}
v=v.slice(0,l-2)+","+v.slice(l-2,l);
v=this.add(v);
_135.value=v;
},remove:function(_137){
var _138=/\(/;
var _139="";
if(_138.test(_137)){
_139="-";
}
_138=/\)|\(|[\.]/g;
_137=_137.replace(_138,"");
if(_137.indexOf("$")>=0){
_137=_137.substring(1,_137.length);
}
return _139+_137;
},add:function(_13a){
var _13b=/-?[0-9]+\,[0-9]{2}$/;
if(_13b.test(_13a)){
_13b.compile("^-");
_13a=addDecimalPoints(_13a);
if(_13b.test(_13a)){
_13a="("+_13a.replace(_13b,"")+")";
}
}
return _13a;
}});
});
},"manager/DnD":function(){
define("manager/DnD",["dojo/_base/declare"],function(_13c){
return _13c("Manager.Dnd",[],{id:"",dropped:null,constructor:function(id){
this.id=id;
this.dropped=new Array();
},onDrop:function(_13d,s,n,c){
var sid=s.node.id;
var obj=this;
dojo.forEach(n,function(e,i,a){
obj.dropped.push(e.id+"="+_13d);
});
},onSubmit:function(){
var s="";
dojo.forEach(this.dropped,function(e,i,a){
s=s+((s=="")?"":"&")+e;
});
dojo.byId(this.id).value=s;
return true;
}});
});
},"manager/FormPopup":function(){
define("manager/FormPopup",["dojo/_base/declare"],function(_13e){
return _13e("Manager.FormPopup",[],{context:null,url:"",constructor:function(){
this.obj=this;
},setContext:function(_13f){
this.context=_13f;
},start:function(){
this.url=this.context.action+"?__popupName="+this.context.name;
if(this.context.filter!=""){
var _140=this.context.filter.split(",");
for(var i=0;i<_140.length;i++){
var id=_140[i];
if(field=dijit.byId(id)){
var _141=field.get("value");
}else{
field=manager.getElementById(id);
var _141=escape(field.value);
}
var _142="filter"+i;
this.url=this.url+"&"+_142+"="+_141;
}
}
dojo.subscribe("windowActionClose",this,this.close);
this.open();
},open:function(){
var _143=manager.getWindow(this.context.name);
if(!_143){
manager.addWindow(this.context.name);
}
manager.getWindow(this.context.name).setHref(this.url);
manager.getWindow(this.context.name).open();
},close:function(id){
if(id==this.context.name){
var form=dojo.query("#"+id+" form");
var _144=dijit.byId(form[0].id).getValues();
this.deliver(form[0].id);
}
},deliver:function(_145){
related=this.obj.context.related;
var _146=/(.*):([^:]*)/;
var _147=related.split(",");
for(var i=0;i<_147.length;i++){
_147[i]=_147[i].replace(/::/g,"!");
var aId=_146.exec(_147[i])||Array(_147[i],_147[i]);
var _148=(aId[2]?aId[2]:aId[1]);
_148=_148.replace(/\!/g,"::");
var node=manager.getElementById(_148);
var _149=node.value;
aId[1]=aId[1].replace("!","::");
var _14a=dijit.byId(aId[1]);
if(_14a){
_14a.set("value",_149);
}else{
_14a=manager.getElementById(aId[1]);
if(_14a!=null){
_14a.value=_149;
_14a=manager.getElementById(_14a.name+"_sel");
if(_14a!=null){
_14a.value=_149;
}
}
}
}
}});
});
}}});
define("manager/layers/widget",[],1);
