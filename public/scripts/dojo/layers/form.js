//>>built
require({cache:{"dijit/CalendarLite":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/cldr/supplemental","dojo/date","dojo/date/locale","dojo/date/stamp","dojo/dom","dojo/dom-class","dojo/_base/lang","dojo/on","dojo/sniff","dojo/string","./_WidgetBase","./_TemplatedMixin","dojo/text!./templates/Calendar.html","./a11yclick","./hccss"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,on,_a,_b,_c,_d,_e){
var _f=_2("dijit.CalendarLite",[_c,_d],{templateString:_e,dowTemplateString:"<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\" scope=\"col\"><span class=\"dijitCalendarDayLabel\">${d}</span></th>",dateTemplateString:"<td class=\"dijitReset\" role=\"gridcell\" data-dojo-attach-point=\"dateCells\"><span class=\"dijitCalendarDateLabel\" data-dojo-attach-point=\"dateLabels\"></span></td>",weekTemplateString:"<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">${d}${d}${d}${d}${d}${d}${d}</tr>",value:new Date(""),datePackage:"",dayWidth:"narrow",tabIndex:"0",currentFocus:new Date(),_setSummaryAttr:"gridNode",baseClass:"dijitCalendar",_isValidDate:function(_10){
return _10&&!isNaN(_10)&&typeof _10=="object"&&_10.toString()!=this.constructor.prototype.value.toString();
},_getValueAttr:function(){
var _11=this._get("value");
if(_11&&!isNaN(_11)){
var _12=new this.dateClassObj(_11);
_12.setHours(0,0,0,0);
if(_12.getDate()<_11.getDate()){
_12=this.dateModule.add(_12,"hour",1);
}
return _12;
}else{
return null;
}
},_setValueAttr:function(_13,_14){
if(typeof _13=="string"){
_13=_6.fromISOString(_13);
}
_13=this._patchDate(_13);
if(this._isValidDate(_13)&&!this.isDisabledDate(_13,this.lang)){
this._set("value",_13);
this.set("currentFocus",_13);
this._markSelectedDates([_13]);
if(this._created&&(_14||typeof _14=="undefined")){
this.onChange(this.get("value"));
}
}else{
this._set("value",null);
this._markSelectedDates([]);
}
},_patchDate:function(_15){
if(_15){
_15=new this.dateClassObj(_15);
_15.setHours(1,0,0,0);
}
return _15;
},_setText:function(_16,_17){
while(_16.firstChild){
_16.removeChild(_16.firstChild);
}
_16.appendChild(_16.ownerDocument.createTextNode(_17));
},_populateGrid:function(){
var _18=new this.dateClassObj(this.currentFocus);
_18.setDate(1);
var _19=_18.getDay(),_1a=this.dateModule.getDaysInMonth(_18),_1b=this.dateModule.getDaysInMonth(this.dateModule.add(_18,"month",-1)),_1c=new this.dateClassObj(),_1d=_3.getFirstDayOfWeek(this.lang);
if(_1d>_19){
_1d-=7;
}
if(!this.summary){
var _1e=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_18);
this.gridNode.setAttribute("summary",_1e[_18.getMonth()]);
}
this._date2cell={};
_1.forEach(this.dateCells,function(_1f,idx){
var i=idx+_1d;
var _20=new this.dateClassObj(_18),_21,_22="dijitCalendar",adj=0;
if(i<_19){
_21=_1b-_19+i+1;
adj=-1;
_22+="Previous";
}else{
if(i>=(_19+_1a)){
_21=i-_19-_1a+1;
adj=1;
_22+="Next";
}else{
_21=i-_19+1;
_22+="Current";
}
}
if(adj){
_20=this.dateModule.add(_20,"month",adj);
}
_20.setDate(_21);
if(!this.dateModule.compare(_20,_1c,"date")){
_22="dijitCalendarCurrentDate "+_22;
}
if(this.isDisabledDate(_20,this.lang)){
_22="dijitCalendarDisabledDate "+_22;
_1f.setAttribute("aria-disabled","true");
}else{
_22="dijitCalendarEnabledDate "+_22;
_1f.removeAttribute("aria-disabled");
_1f.setAttribute("aria-selected","false");
}
var _23=this.getClassForDate(_20,this.lang);
if(_23){
_22=_23+" "+_22;
}
_1f.className=_22+"Month dijitCalendarDateTemplate";
var _24=_20.valueOf();
this._date2cell[_24]=_1f;
_1f.dijitDateValue=_24;
this._setText(this.dateLabels[idx],_20.getDateLocalized?_20.getDateLocalized(this.lang):_20.getDate());
},this);
},_populateControls:function(){
var _25=new this.dateClassObj(this.currentFocus);
_25.setDate(1);
this.monthWidget.set("month",_25);
var y=_25.getFullYear()-1;
var d=new this.dateClassObj();
_1.forEach(["previous","current","next"],function(_26){
d.setFullYear(y++);
this._setText(this[_26+"YearLabelNode"],this.dateLocaleModule.format(d,{selector:"year",locale:this.lang}));
},this);
},goToToday:function(){
this.set("value",new this.dateClassObj());
},constructor:function(_27){
this.dateModule=_27.datePackage?_9.getObject(_27.datePackage,false):_4;
this.dateClassObj=this.dateModule.Date||Date;
this.dateLocaleModule=_27.datePackage?_9.getObject(_27.datePackage+".locale",false):_5;
},_createMonthWidget:function(){
return _f._MonthWidget({id:this.id+"_mddb",lang:this.lang,dateLocaleModule:this.dateLocaleModule},this.monthNode);
},buildRendering:function(){
var d=this.dowTemplateString,_28=this.dateLocaleModule.getNames("days",this.dayWidth,"standAlone",this.lang),_29=_3.getFirstDayOfWeek(this.lang);
this.dayCellsHtml=_b.substitute([d,d,d,d,d,d,d].join(""),{d:""},function(){
return _28[_29++%7];
});
var r=_b.substitute(this.weekTemplateString,{d:this.dateTemplateString});
this.dateRowsHtml=[r,r,r,r,r,r].join("");
this.dateCells=[];
this.dateLabels=[];
this.inherited(arguments);
_7.setSelectable(this.domNode,false);
var _2a=new this.dateClassObj(this.currentFocus);
this.monthWidget=this._createMonthWidget();
this.set("currentFocus",_2a,false);
},postCreate:function(){
this.inherited(arguments);
this._connectControls();
},_connectControls:function(){
var _2b=_9.hitch(this,function(_2c,_2d,_2e){
return on(this[_2c],"click",_9.hitch(this,function(){
this._setCurrentFocusAttr(this.dateModule.add(this.currentFocus,_2d,_2e));
}));
});
this.own(_2b("incrementMonth","month",1),_2b("decrementMonth","month",-1),_2b("nextYearLabelNode","year",1),_2b("previousYearLabelNode","year",-1));
},_setCurrentFocusAttr:function(_2f,_30){
var _31=this.currentFocus,_32=this._getNodeByDate(_31);
_2f=this._patchDate(_2f);
this._set("currentFocus",_2f);
if(!this._date2cell||this.dateModule.difference(_31,_2f,"month")!=0){
this._populateGrid();
this._populateControls();
this._markSelectedDates([this.value]);
}
var _33=this._getNodeByDate(_2f);
_33.setAttribute("tabIndex",this.tabIndex);
if(this.focused||_30){
_33.focus();
}
if(_32&&_32!=_33){
if(_a("webkit")){
_32.setAttribute("tabIndex","-1");
}else{
_32.removeAttribute("tabIndex");
}
}
},focus:function(){
this._setCurrentFocusAttr(this.currentFocus,true);
},_onDayClick:function(evt){
evt.stopPropagation();
evt.preventDefault();
for(var _34=evt.target;_34&&!_34.dijitDateValue;_34=_34.parentNode){
}
if(_34&&!_8.contains(_34,"dijitCalendarDisabledDate")){
this.set("value",_34.dijitDateValue);
}
},_getNodeByDate:function(_35){
_35=this._patchDate(_35);
return _35&&this._date2cell?this._date2cell[_35.valueOf()]:null;
},_markSelectedDates:function(_36){
function _37(_38,_39){
_8.toggle(_39,"dijitCalendarSelectedDate",_38);
_39.setAttribute("aria-selected",_38?"true":"false");
};
_1.forEach(this._selectedCells||[],_9.partial(_37,false));
this._selectedCells=_1.filter(_1.map(_36,this._getNodeByDate,this),function(n){
return n;
});
_1.forEach(this._selectedCells,_9.partial(_37,true));
},onChange:function(){
},isDisabledDate:function(){
},getClassForDate:function(){
}});
_f._MonthWidget=_2("dijit.CalendarLite._MonthWidget",_c,{_setMonthAttr:function(_3a){
var _3b=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_3a),_3c=(_a("ie")==6?"":"<div class='dijitSpacer'>"+_1.map(_3b,function(s){
return "<div>"+s+"</div>";
}).join("")+"</div>");
this.domNode.innerHTML=_3c+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_3b[_3a.getMonth()]+"</div>";
}});
return _f;
});
},"dijit/form/_RadioButtonMixin":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/_base/lang","dojo/query","../registry"],function(_3d,_3e,_3f,_40,_41,_42){
return _3e("dijit.form._RadioButtonMixin",null,{type:"radio",_getRelatedWidgets:function(){
var ary=[];
_41("input[type=radio]",this.focusNode.form||this.ownerDocument).forEach(_40.hitch(this,function(_43){
if(_43.name==this.name&&_43.form==this.focusNode.form){
var _44=_42.getEnclosingWidget(_43);
if(_44){
ary.push(_44);
}
}
}));
return ary;
},_setCheckedAttr:function(_45){
this.inherited(arguments);
if(!this._created){
return;
}
if(_45){
_3d.forEach(this._getRelatedWidgets(),_40.hitch(this,function(_46){
if(_46!=this&&_46.checked){
_46.set("checked",false);
}
}));
}
},_getSubmitValue:function(_47){
return _47==null?"on":_47;
},_onClick:function(e){
if(this.checked||this.disabled){
e.stopPropagation();
e.preventDefault();
return false;
}
if(this.readOnly){
e.stopPropagation();
e.preventDefault();
_3d.forEach(this._getRelatedWidgets(),_40.hitch(this,function(_48){
_3f.set(this.focusNode||this.domNode,"checked",_48.checked);
}));
return false;
}
return this.inherited(arguments);
}});
});
},"dijit/Calendar":function(){
define(["dojo/_base/array","dojo/date","dojo/date/locale","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/on","dojo/sniff","./CalendarLite","./_Widget","./_CssStateMixin","./_TemplatedMixin","./form/DropDownButton"],function(_49,_4a,_4b,_4c,_4d,_4e,_4f,_50,_51,on,has,_52,_53,_54,_55,_56){
var _57=_4c("dijit.Calendar",[_52,_53,_54],{cssStateNodes:{"decrementMonth":"dijitCalendarArrow","incrementMonth":"dijitCalendarArrow","previousYearLabelNode":"dijitCalendarPreviousYear","nextYearLabelNode":"dijitCalendarNextYear"},setValue:function(_58){
_4f.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_58);
},_createMonthWidget:function(){
return new _57._MonthDropDownButton({id:this.id+"_mddb",tabIndex:-1,onMonthSelect:_51.hitch(this,"_onMonthSelect"),lang:this.lang,dateLocaleModule:this.dateLocaleModule},this.monthNode);
},postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,"keydown",_51.hitch(this,"_onKeyDown")),on(this.dateRowsNode,"mouseover",_51.hitch(this,"_onDayMouseOver")),on(this.dateRowsNode,"mouseout",_51.hitch(this,"_onDayMouseOut")),on(this.dateRowsNode,"mousedown",_51.hitch(this,"_onDayMouseDown")),on(this.dateRowsNode,"mouseup",_51.hitch(this,"_onDayMouseUp")));
},_onMonthSelect:function(_59){
var _5a=new this.dateClassObj(this.currentFocus);
_5a.setDate(1);
_5a.setMonth(_59);
var _5b=this.dateModule.getDaysInMonth(_5a);
var _5c=this.currentFocus.getDate();
_5a.setDate(Math.min(_5c,_5b));
this._setCurrentFocusAttr(_5a);
},_onDayMouseOver:function(evt){
var _5d=_4e.contains(evt.target,"dijitCalendarDateLabel")?evt.target.parentNode:evt.target;
if(_5d&&((_5d.dijitDateValue&&!_4e.contains(_5d,"dijitCalendarDisabledDate"))||_5d==this.previousYearLabelNode||_5d==this.nextYearLabelNode)){
_4e.add(_5d,"dijitCalendarHoveredDate");
this._currentNode=_5d;
}
},_onDayMouseOut:function(evt){
if(!this._currentNode){
return;
}
if(evt.relatedTarget&&evt.relatedTarget.parentNode==this._currentNode){
return;
}
var cls="dijitCalendarHoveredDate";
if(_4e.contains(this._currentNode,"dijitCalendarActiveDate")){
cls+=" dijitCalendarActiveDate";
}
_4e.remove(this._currentNode,cls);
this._currentNode=null;
},_onDayMouseDown:function(evt){
var _5e=evt.target.parentNode;
if(_5e&&_5e.dijitDateValue&&!_4e.contains(_5e,"dijitCalendarDisabledDate")){
_4e.add(_5e,"dijitCalendarActiveDate");
this._currentNode=_5e;
}
},_onDayMouseUp:function(evt){
var _5f=evt.target.parentNode;
if(_5f&&_5f.dijitDateValue){
_4e.remove(_5f,"dijitCalendarActiveDate");
}
},handleKey:function(evt){
var _60=-1,_61,_62=this.currentFocus;
switch(evt.keyCode){
case _50.RIGHT_ARROW:
_60=1;
case _50.LEFT_ARROW:
_61="day";
if(!this.isLeftToRight()){
_60*=-1;
}
break;
case _50.DOWN_ARROW:
_60=1;
case _50.UP_ARROW:
_61="week";
break;
case _50.PAGE_DOWN:
_60=1;
case _50.PAGE_UP:
_61=evt.ctrlKey||evt.altKey?"year":"month";
break;
case _50.END:
_62=this.dateModule.add(_62,"month",1);
_61="day";
case _50.HOME:
_62=new this.dateClassObj(_62);
_62.setDate(1);
break;
default:
return true;
}
if(_61){
_62=this.dateModule.add(_62,_61,_60);
}
this._setCurrentFocusAttr(_62);
return false;
},_onKeyDown:function(evt){
if(!this.handleKey(evt)){
evt.stopPropagation();
evt.preventDefault();
}
},onValueSelected:function(){
},onChange:function(_63){
this.onValueSelected(_63);
},getClassForDate:function(){
}});
_57._MonthDropDownButton=_4c("dijit.Calendar._MonthDropDownButton",_56,{onMonthSelect:function(){
},postCreate:function(){
this.inherited(arguments);
this.dropDown=new _57._MonthDropDown({id:this.id+"_mdd",onChange:this.onMonthSelect});
},_setMonthAttr:function(_64){
var _65=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_64);
this.dropDown.set("months",_65);
this.containerNode.innerHTML=(has("ie")==6?"":"<div class='dijitSpacer'>"+this.dropDown.domNode.innerHTML+"</div>")+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_65[_64.getMonth()]+"</div>";
}});
_57._MonthDropDown=_4c("dijit.Calendar._MonthDropDown",[_53,_55],{months:[],templateString:"<div class='dijitCalendarMonthMenu dijitMenu' "+"data-dojo-attach-event='onclick:_onClick,onmouseover:_onMenuHover,onmouseout:_onMenuHover'></div>",_setMonthsAttr:function(_66){
this.domNode.innerHTML=_49.map(_66,function(_67,idx){
return _67?"<div class='dijitCalendarMonthLabel' month='"+idx+"'>"+_67+"</div>":"";
}).join("");
},_onClick:function(evt){
this.onChange(_4d.get(evt.target,"month"));
},onChange:function(){
},_onMenuHover:function(evt){
_4e.toggle(evt.target,"dijitCalendarMonthLabelHover",evt.type=="mouseover");
}});
return _57;
});
},"dijit/form/Select":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-class","dojo/dom-geometry","dojo/i18n","dojo/_base/lang","dojo/on","dojo/sniff","./_FormSelectWidget","../_HasDropDown","../DropDownMenu","../MenuItem","../MenuSeparator","../Tooltip","../_KeyNavMixin","../registry","dojo/text!./templates/Select.html","dojo/i18n!./nls/validate"],function(_68,_69,_6a,_6b,_6c,_6d,_6e,on,has,_6f,_70,_71,_72,_73,_74,_75,_76,_77){
var _78=_69("dijit.form._SelectMenu",_71,{autoFocus:true,buildRendering:function(){
this.inherited(arguments);
this.domNode.setAttribute("role","listbox");
},postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,"selectstart",function(evt){
evt.preventDefault();
evt.stopPropagation();
}));
},focus:function(){
var _79=false,val=this.parentWidget.value;
if(_6e.isArray(val)){
val=val[val.length-1];
}
if(val){
_68.forEach(this.parentWidget._getChildren(),function(_7a){
if(_7a.option&&(val===_7a.option.value)){
_79=true;
this.focusChild(_7a,false);
}
},this);
}
if(!_79){
this.inherited(arguments);
}
}});
var _7b=_69("dijit.form.Select"+(has("dojo-bidi")?"_NoBidi":""),[_6f,_70,_75],{baseClass:"dijitSelect dijitValidationTextBox",templateString:_77,_buttonInputDisabled:has("ie")?"disabled":"",required:false,state:"",message:"",tooltipPosition:[],emptyLabel:"&#160;",_isLoaded:false,_childrenLoaded:false,_fillContent:function(){
this.inherited(arguments);
if(this.options.length&&!this.value&&this.srcNodeRef){
var si=this.srcNodeRef.selectedIndex||0;
this._set("value",this.options[si>=0?si:0].value);
}
this.dropDown=new _78({id:this.id+"_menu",parentWidget:this});
_6b.add(this.dropDown.domNode,this.baseClass.replace(/\s+|$/g,"Menu "));
},_getMenuItemForOption:function(_7c){
if(!_7c.value&&!_7c.label){
return new _73({ownerDocument:this.ownerDocument});
}else{
var _7d=_6e.hitch(this,"_setValueAttr",_7c);
var _7e=new _72({option:_7c,label:_7c.label||this.emptyLabel,onClick:_7d,ownerDocument:this.ownerDocument,dir:this.dir,textDir:this.textDir,disabled:_7c.disabled||false});
_7e.focusNode.setAttribute("role","option");
return _7e;
}
},_addOptionItem:function(_7f){
if(this.dropDown){
this.dropDown.addChild(this._getMenuItemForOption(_7f));
}
},_getChildren:function(){
if(!this.dropDown){
return [];
}
return this.dropDown.getChildren();
},focus:function(){
if(!this.disabled&&this.focusNode.focus){
try{
this.focusNode.focus();
}
catch(e){
}
}
},focusChild:function(_80){
if(_80){
this.set("value",_80.option);
}
},_getFirst:function(){
var _81=this._getChildren();
return _81.length?_81[0]:null;
},_getLast:function(){
var _82=this._getChildren();
return _82.length?_82[_82.length-1]:null;
},childSelector:function(_83){
var _83=_76.byNode(_83);
return _83&&_83.getParent()==this.dropDown;
},onKeyboardSearch:function(_84,evt,_85,_86){
if(_84){
this.focusChild(_84);
}
},_loadChildren:function(_87){
if(_87===true){
if(this.dropDown){
delete this.dropDown.focusedChild;
this.focusedChild=null;
}
if(this.options.length){
this.inherited(arguments);
}else{
_68.forEach(this._getChildren(),function(_88){
_88.destroyRecursive();
});
var _89=new _72({ownerDocument:this.ownerDocument,label:this.emptyLabel});
this.dropDown.addChild(_89);
}
}else{
this._updateSelection();
}
this._isLoaded=false;
this._childrenLoaded=true;
if(!this._loadingStore){
this._setValueAttr(this.value,false);
}
},_refreshState:function(){
if(this._started){
this.validate(this.focused);
}
},startup:function(){
this.inherited(arguments);
this._refreshState();
},_setValueAttr:function(_8a){
this.inherited(arguments);
_6a.set(this.valueNode,"value",this.get("value"));
this._refreshState();
},_setNameAttr:"valueNode",_setDisabledAttr:function(_8b){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_8c){
this._set("required",_8c);
this.focusNode.setAttribute("aria-required",_8c);
this._refreshState();
},_setOptionsAttr:function(_8d){
this._isLoaded=false;
this._set("options",_8d);
},_setDisplay:function(_8e){
var lbl=_8e||this.emptyLabel;
this.containerNode.innerHTML="<span role=\"option\" class=\"dijitReset dijitInline "+this.baseClass.replace(/\s+|$/g,"Label ")+"\">"+lbl+"</span>";
},validate:function(_8f){
var _90=this.disabled||this.isValid(_8f);
this._set("state",_90?"":(this._hasBeenBlurred?"Error":"Incomplete"));
this.focusNode.setAttribute("aria-invalid",_90?"false":"true");
var _91=_90?"":this._missingMsg;
if(_91&&this.focused&&this._hasBeenBlurred){
_74.show(_91,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}else{
_74.hide(this.domNode);
}
this._set("message",_91);
return _90;
},isValid:function(){
return (!this.required||this.value===0||!(/^\s*$/.test(this.value||"")));
},reset:function(){
this.inherited(arguments);
_74.hide(this.domNode);
this._refreshState();
},postMixInProperties:function(){
this.inherited(arguments);
this._missingMsg=_6d.getLocalization("dijit.form","validate",this.lang).missingMessage;
},postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,"selectstart",function(evt){
evt.preventDefault();
evt.stopPropagation();
}));
this.domNode.setAttribute("aria-expanded","false");
if(has("ie")<9){
this.defer(function(){
try{
var s=domStyle.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _92=this.domNode.getElementsByTagName("INPUT");
if(_92){
for(var i=0;i<_92.length;i++){
_92[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
});
}
},_setStyleAttr:function(_93){
this.inherited(arguments);
_6b.toggle(this.domNode,this.baseClass.replace(/\s+|$/g,"FixedWidth "),!!this.domNode.style.width);
},isLoaded:function(){
return this._isLoaded;
},loadDropDown:function(_94){
this._loadChildren(true);
this._isLoaded=true;
_94();
},destroy:function(_95){
if(this.dropDown&&!this.dropDown._destroyed){
this.dropDown.destroyRecursive(_95);
delete this.dropDown;
}
this.inherited(arguments);
},_onFocus:function(){
this.validate(true);
},_onBlur:function(){
_74.hide(this.domNode);
this.inherited(arguments);
this.validate(false);
}});
if(has("dojo-bidi")){
_7b=_69("dijit.form.Select",_7b,{_setDisplay:function(_96){
this.inherited(arguments);
this.applyTextDir(this.containerNode);
}});
}
_7b._Menu=_78;
function _97(_98){
return function(evt){
if(!this._isLoaded){
this.loadDropDown(_6e.hitch(this,_98,evt));
}else{
this.inherited(_98,arguments);
}
};
};
_7b.prototype._onContainerKeydown=_97("_onContainerKeydown");
_7b.prototype._onContainerKeypress=_97("_onContainerKeypress");
return _7b;
});
},"dojo/date":function(){
define(["./has","./_base/lang"],function(has,_99){
var _9a={};
_9a.getDaysInMonth=function(_9b){
var _9c=_9b.getMonth();
var _9d=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_9c==1&&_9a.isLeapYear(_9b)){
return 29;
}
return _9d[_9c];
};
_9a.isLeapYear=function(_9e){
var _9f=_9e.getFullYear();
return !(_9f%400)||(!(_9f%4)&&!!(_9f%100));
};
_9a.getTimezoneName=function(_a0){
var str=_a0.toString();
var tz="";
var _a1;
var pos=str.indexOf("(");
if(pos>-1){
tz=str.substring(++pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((_a1=str.match(pat))){
tz=_a1[1];
}else{
str=_a0.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_a1=str.match(pat))){
tz=_a1[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
_9a.compare=function(_a2,_a3,_a4){
_a2=new Date(+_a2);
_a3=new Date(+(_a3||new Date()));
if(_a4=="date"){
_a2.setHours(0,0,0,0);
_a3.setHours(0,0,0,0);
}else{
if(_a4=="time"){
_a2.setFullYear(0,0,0);
_a3.setFullYear(0,0,0);
}
}
if(_a2>_a3){
return 1;
}
if(_a2<_a3){
return -1;
}
return 0;
};
_9a.add=function(_a5,_a6,_a7){
var sum=new Date(+_a5);
var _a8=false;
var _a9="Date";
switch(_a6){
case "day":
break;
case "weekday":
var _aa,_ab;
var mod=_a7%5;
if(!mod){
_aa=(_a7>0)?5:-5;
_ab=(_a7>0)?((_a7-5)/5):((_a7+5)/5);
}else{
_aa=mod;
_ab=parseInt(_a7/5);
}
var _ac=_a5.getDay();
var adj=0;
if(_ac==6&&_a7>0){
adj=1;
}else{
if(_ac==0&&_a7<0){
adj=-1;
}
}
var _ad=_ac+_aa;
if(_ad==0||_ad==6){
adj=(_a7>0)?2:-2;
}
_a7=(7*_ab)+_aa+adj;
break;
case "year":
_a9="FullYear";
_a8=true;
break;
case "week":
_a7*=7;
break;
case "quarter":
_a7*=3;
case "month":
_a8=true;
_a9="Month";
break;
default:
_a9="UTC"+_a6.charAt(0).toUpperCase()+_a6.substring(1)+"s";
}
if(_a9){
sum["set"+_a9](sum["get"+_a9]()+_a7);
}
if(_a8&&(sum.getDate()<_a5.getDate())){
sum.setDate(0);
}
return sum;
};
_9a.difference=function(_ae,_af,_b0){
_af=_af||new Date();
_b0=_b0||"day";
var _b1=_af.getFullYear()-_ae.getFullYear();
var _b2=1;
switch(_b0){
case "quarter":
var m1=_ae.getMonth();
var m2=_af.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_b1*4);
_b2=q2-q1;
break;
case "weekday":
var _b3=Math.round(_9a.difference(_ae,_af,"day"));
var _b4=parseInt(_9a.difference(_ae,_af,"week"));
var mod=_b3%7;
if(mod==0){
_b3=_b4*5;
}else{
var adj=0;
var _b5=_ae.getDay();
var _b6=_af.getDay();
_b4=parseInt(_b3/7);
mod=_b3%7;
var _b7=new Date(_ae);
_b7.setDate(_b7.getDate()+(_b4*7));
var _b8=_b7.getDay();
if(_b3>0){
switch(true){
case _b5==6:
adj=-1;
break;
case _b5==0:
adj=0;
break;
case _b6==6:
adj=-1;
break;
case _b6==0:
adj=-2;
break;
case (_b8+mod)>5:
adj=-2;
}
}else{
if(_b3<0){
switch(true){
case _b5==6:
adj=0;
break;
case _b5==0:
adj=1;
break;
case _b6==6:
adj=2;
break;
case _b6==0:
adj=1;
break;
case (_b8+mod)<0:
adj=2;
}
}
}
_b3+=adj;
_b3-=(_b4*2);
}
_b2=_b3;
break;
case "year":
_b2=_b1;
break;
case "month":
_b2=(_af.getMonth()-_ae.getMonth())+(_b1*12);
break;
case "week":
_b2=parseInt(_9a.difference(_ae,_af,"day")/7);
break;
case "day":
_b2/=24;
case "hour":
_b2/=60;
case "minute":
_b2/=60;
case "second":
_b2/=1000;
case "millisecond":
_b2*=_af.getTime()-_ae.getTime();
}
return Math.round(_b2);
};
1&&_99.mixin(_99.getObject("dojo.date",true),_9a);
return _9a;
});
},"dijit/_TimePicker":function(){
define(["dojo/_base/array","dojo/date","dojo/date/locale","dojo/date/stamp","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/_base/kernel","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/query","dojo/mouse","dojo/on","./_WidgetBase","./form/_ListMouseMixin"],function(_b9,_ba,_bb,_bc,_bd,_be,_bf,_c0,_c1,_c2,has,_c3,_c4,on,_c5,_c6){
var _c7=_bd("dijit._TimePicker",[_c5,_c6],{baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:_bc.toISOString,buildRendering:function(){
this.inherited(arguments);
this.containerNode=this.domNode;
this.timeMenu=this.domNode;
},setValue:function(_c8){
_c0.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_c8);
},_setValueAttr:function(_c9){
this._set("value",_c9);
this._showText();
},_setFilterStringAttr:function(val){
this._set("filterString",val);
this._showText();
},isDisabledDate:function(){
return false;
},_getFilteredNodes:function(_ca,_cb,_cc,_cd){
var _ce=[];
for(var i=0;i<this._maxIncrement;i++){
var n=this._createOption(i);
if(n){
_ce.push(n);
}
}
return _ce;
},_showText:function(){
var _cf=_bc.fromISOString;
this.domNode.innerHTML="";
this._clickableIncrementDate=_cf(this.clickableIncrement);
this._visibleIncrementDate=_cf(this.visibleIncrement);
var _d0=function(_d1){
return _d1.getHours()*60*60+_d1.getMinutes()*60+_d1.getSeconds();
},_d2=_d0(this._clickableIncrementDate),_d3=_d0(this._visibleIncrementDate),_d4=(this.value||this.currentFocus).getTime();
this._refDate=_cf("T00:00:00");
this._refDate.setFullYear(1970,0,1);
this._clickableIncrement=1;
this._visibleIncrement=_d3/_d2;
this._maxIncrement=(60*60*24)/_d2;
var _d5=this._getFilteredNodes();
_b9.forEach(_d5,function(n){
this.domNode.appendChild(n);
},this);
if(!_d5.length&&this.filterString){
this.filterString="";
this._showText();
}
},constructor:function(){
this.constraints={};
},postMixInProperties:function(){
this.inherited(arguments);
this._setConstraintsAttr(this.constraints);
},_setConstraintsAttr:function(_d6){
for(var key in {clickableIncrement:1,visibleIncrement:1}){
if(key in _d6){
this[key]=_d6[key];
}
}
if(!_d6.locale){
_d6.locale=this.lang;
}
},_createOption:function(_d7){
var _d8=new Date(this._refDate);
var _d9=this._clickableIncrementDate;
_d8.setHours(_d8.getHours()+_d9.getHours()*_d7,_d8.getMinutes()+_d9.getMinutes()*_d7,_d8.getSeconds()+_d9.getSeconds()*_d7);
if(this.constraints.selector=="time"){
_d8.setFullYear(1970,0,1);
}
var _da=_bb.format(_d8,this.constraints);
if(this.filterString&&_da.toLowerCase().indexOf(this.filterString)!==0){
return null;
}
var div=this.ownerDocument.createElement("div");
div.className=this.baseClass+"Item";
div.date=_d8;
div.idx=_d7;
_bf.create("div",{"class":this.baseClass+"ItemInner",innerHTML:_da},div);
if(_d7%this._visibleIncrement<1&&_d7%this._visibleIncrement>-1){
_be.add(div,this.baseClass+"Marker");
}else{
if(!(_d7%this._clickableIncrement)){
_be.add(div,this.baseClass+"Tick");
}
}
if(this.isDisabledDate(_d8)){
_be.add(div,this.baseClass+"ItemDisabled");
}
if(this.value&&!_ba.compare(this.value,_d8,this.constraints.selector)){
div.selected=true;
_be.add(div,this.baseClass+"ItemSelected");
this._selectedDiv=div;
if(_be.contains(div,this.baseClass+"Marker")){
_be.add(div,this.baseClass+"MarkerSelected");
}else{
_be.add(div,this.baseClass+"TickSelected");
}
this._highlightOption(div,true);
}
return div;
},onOpen:function(){
this.inherited(arguments);
this.set("selected",this._selectedDiv);
},_onOptionSelected:function(tgt){
var _db=tgt.target.date||tgt.target.parentNode.date;
if(!_db||this.isDisabledDate(_db)){
return;
}
this._highlighted_option=null;
this.set("value",_db);
this.onChange(_db);
},onChange:function(){
},_highlightOption:function(_dc,_dd){
if(!_dc){
return;
}
if(_dd){
if(this._highlighted_option){
this._highlightOption(this._highlighted_option,false);
}
this._highlighted_option=_dc;
}else{
if(this._highlighted_option!==_dc){
return;
}else{
this._highlighted_option=null;
}
}
_be.toggle(_dc,this.baseClass+"ItemHover",_dd);
if(_be.contains(_dc,this.baseClass+"Marker")){
_be.toggle(_dc,this.baseClass+"MarkerHover",_dd);
}else{
_be.toggle(_dc,this.baseClass+"TickHover",_dd);
}
},handleKey:function(e){
if(e.keyCode==_c1.DOWN_ARROW){
this.selectNextNode();
e.stopPropagation();
e.preventDefault();
return false;
}else{
if(e.keyCode==_c1.UP_ARROW){
this.selectPreviousNode();
e.stopPropagation();
e.preventDefault();
return false;
}else{
if(e.keyCode==_c1.ENTER||e.keyCode===_c1.TAB){
if(!this._keyboardSelected&&e.keyCode===_c1.TAB){
return true;
}
if(this._highlighted_option){
this._onOptionSelected({target:this._highlighted_option});
}
return e.keyCode===_c1.TAB;
}
}
}
return undefined;
},onHover:function(_de){
this._highlightOption(_de,true);
},onUnhover:function(_df){
this._highlightOption(_df,false);
},onSelect:function(_e0){
this._highlightOption(_e0,true);
},onDeselect:function(_e1){
this._highlightOption(_e1,false);
},onClick:function(_e2){
this._onOptionSelected({target:_e2});
}});
return _c7;
});
},"dijit/form/DateTextBox":function(){
define(["dojo/_base/declare","../Calendar","./_DateTimeTextBox"],function(_e3,_e4,_e5){
return _e3("dijit.form.DateTextBox",_e5,{baseClass:"dijitTextBox dijitComboBox dijitDateTextBox",popupClass:_e4,_selector:"date",maxHeight:Infinity,value:new Date("")});
});
},"dojo/cldr/supplemental":function(){
define(["../_base/lang","../i18n"],function(_e6,_e7){
var _e8={};
_e6.setObject("dojo.cldr.supplemental",_e8);
_e8.getFirstDayOfWeek=function(_e9){
var _ea={bd:5,mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,iq:6,ir:6,jo:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,sy:6,ye:6,ag:0,ar:0,as:0,au:0,br:0,bs:0,bt:0,bw:0,by:0,bz:0,ca:0,cn:0,co:0,dm:0,"do":0,et:0,gt:0,gu:0,hk:0,hn:0,id:0,ie:0,il:0,"in":0,jm:0,jp:0,ke:0,kh:0,kr:0,la:0,mh:0,mm:0,mo:0,mt:0,mx:0,mz:0,ni:0,np:0,nz:0,pa:0,pe:0,ph:0,pk:0,pr:0,py:0,sg:0,sv:0,th:0,tn:0,tt:0,tw:0,um:0,us:0,ve:0,vi:0,ws:0,za:0,zw:0};
var _eb=_e8._region(_e9);
var dow=_ea[_eb];
return (dow===undefined)?1:dow;
};
_e8._region=function(_ec){
_ec=_e7.normalizeLocale(_ec);
var _ed=_ec.split("-");
var _ee=_ed[1];
if(!_ee){
_ee={aa:"et",ab:"ge",af:"za",ak:"gh",am:"et",ar:"eg",as:"in",av:"ru",ay:"bo",az:"az",ba:"ru",be:"by",bg:"bg",bi:"vu",bm:"ml",bn:"bd",bo:"cn",br:"fr",bs:"ba",ca:"es",ce:"ru",ch:"gu",co:"fr",cr:"ca",cs:"cz",cv:"ru",cy:"gb",da:"dk",de:"de",dv:"mv",dz:"bt",ee:"gh",el:"gr",en:"us",es:"es",et:"ee",eu:"es",fa:"ir",ff:"sn",fi:"fi",fj:"fj",fo:"fo",fr:"fr",fy:"nl",ga:"ie",gd:"gb",gl:"es",gn:"py",gu:"in",gv:"gb",ha:"ng",he:"il",hi:"in",ho:"pg",hr:"hr",ht:"ht",hu:"hu",hy:"am",ia:"fr",id:"id",ig:"ng",ii:"cn",ik:"us","in":"id",is:"is",it:"it",iu:"ca",iw:"il",ja:"jp",ji:"ua",jv:"id",jw:"id",ka:"ge",kg:"cd",ki:"ke",kj:"na",kk:"kz",kl:"gl",km:"kh",kn:"in",ko:"kr",ks:"in",ku:"tr",kv:"ru",kw:"gb",ky:"kg",la:"va",lb:"lu",lg:"ug",li:"nl",ln:"cd",lo:"la",lt:"lt",lu:"cd",lv:"lv",mg:"mg",mh:"mh",mi:"nz",mk:"mk",ml:"in",mn:"mn",mo:"ro",mr:"in",ms:"my",mt:"mt",my:"mm",na:"nr",nb:"no",nd:"zw",ne:"np",ng:"na",nl:"nl",nn:"no",no:"no",nr:"za",nv:"us",ny:"mw",oc:"fr",om:"et",or:"in",os:"ge",pa:"in",pl:"pl",ps:"af",pt:"br",qu:"pe",rm:"ch",rn:"bi",ro:"ro",ru:"ru",rw:"rw",sa:"in",sd:"in",se:"no",sg:"cf",si:"lk",sk:"sk",sl:"si",sm:"ws",sn:"zw",so:"so",sq:"al",sr:"rs",ss:"za",st:"za",su:"id",sv:"se",sw:"tz",ta:"in",te:"in",tg:"tj",th:"th",ti:"et",tk:"tm",tl:"ph",tn:"za",to:"to",tr:"tr",ts:"za",tt:"ru",ty:"pf",ug:"cn",uk:"ua",ur:"pk",uz:"uz",ve:"za",vi:"vn",wa:"be",wo:"sn",xh:"za",yi:"il",yo:"ng",za:"cn",zh:"cn",zu:"za",ace:"id",ady:"ru",agq:"cm",alt:"ru",amo:"ng",asa:"tz",ast:"es",awa:"in",bal:"pk",ban:"id",bas:"cm",bax:"cm",bbc:"id",bem:"zm",bez:"tz",bfq:"in",bft:"pk",bfy:"in",bhb:"in",bho:"in",bik:"ph",bin:"ng",bjj:"in",bku:"ph",bqv:"ci",bra:"in",brx:"in",bss:"cm",btv:"pk",bua:"ru",buc:"yt",bug:"id",bya:"id",byn:"er",cch:"ng",ccp:"in",ceb:"ph",cgg:"ug",chk:"fm",chm:"ru",chp:"ca",chr:"us",cja:"kh",cjm:"vn",ckb:"iq",crk:"ca",csb:"pl",dar:"ru",dav:"ke",den:"ca",dgr:"ca",dje:"ne",doi:"in",dsb:"de",dua:"cm",dyo:"sn",dyu:"bf",ebu:"ke",efi:"ng",ewo:"cm",fan:"gq",fil:"ph",fon:"bj",fur:"it",gaa:"gh",gag:"md",gbm:"in",gcr:"gf",gez:"et",gil:"ki",gon:"in",gor:"id",grt:"in",gsw:"ch",guz:"ke",gwi:"ca",haw:"us",hil:"ph",hne:"in",hnn:"ph",hoc:"in",hoj:"in",ibb:"ng",ilo:"ph",inh:"ru",jgo:"cm",jmc:"tz",kaa:"uz",kab:"dz",kaj:"ng",kam:"ke",kbd:"ru",kcg:"ng",kde:"tz",kdt:"th",kea:"cv",ken:"cm",kfo:"ci",kfr:"in",kha:"in",khb:"cn",khq:"ml",kht:"in",kkj:"cm",kln:"ke",kmb:"ao",koi:"ru",kok:"in",kos:"fm",kpe:"lr",krc:"ru",kri:"sl",krl:"ru",kru:"in",ksb:"tz",ksf:"cm",ksh:"de",kum:"ru",lag:"tz",lah:"pk",lbe:"ru",lcp:"cn",lep:"in",lez:"ru",lif:"np",lis:"cn",lki:"ir",lmn:"in",lol:"cd",lua:"cd",luo:"ke",luy:"ke",lwl:"th",mad:"id",mag:"in",mai:"in",mak:"id",man:"gn",mas:"ke",mdf:"ru",mdh:"ph",mdr:"id",men:"sl",mer:"ke",mfe:"mu",mgh:"mz",mgo:"cm",min:"id",mni:"in",mnk:"gm",mnw:"mm",mos:"bf",mua:"cm",mwr:"in",myv:"ru",nap:"it",naq:"na",nds:"de","new":"np",niu:"nu",nmg:"cm",nnh:"cm",nod:"th",nso:"za",nus:"sd",nym:"tz",nyn:"ug",pag:"ph",pam:"ph",pap:"bq",pau:"pw",pon:"fm",prd:"ir",raj:"in",rcf:"re",rej:"id",rjs:"np",rkt:"in",rof:"tz",rwk:"tz",saf:"gh",sah:"ru",saq:"ke",sas:"id",sat:"in",saz:"in",sbp:"tz",scn:"it",sco:"gb",sdh:"ir",seh:"mz",ses:"ml",shi:"ma",shn:"mm",sid:"et",sma:"se",smj:"se",smn:"fi",sms:"fi",snk:"ml",srn:"sr",srr:"sn",ssy:"er",suk:"tz",sus:"gn",swb:"yt",swc:"cd",syl:"bd",syr:"sy",tbw:"ph",tcy:"in",tdd:"cn",tem:"sl",teo:"ug",tet:"tl",tig:"er",tiv:"ng",tkl:"tk",tmh:"ne",tpi:"pg",trv:"tw",tsg:"ph",tts:"th",tum:"mw",tvl:"tv",twq:"ne",tyv:"ru",tzm:"ma",udm:"ru",uli:"fm",umb:"ao",unr:"in",unx:"in",vai:"lr",vun:"tz",wae:"ch",wal:"et",war:"ph",xog:"ug",xsr:"np",yao:"mz",yap:"fm",yav:"cm",zza:"tr"}[_ed[0]];
}else{
if(_ee.length==4){
_ee=_ed[2];
}
}
return _ee;
};
_e8.getWeekend=function(_ef){
var _f0={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5},_f1={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6},_f2=_e8._region(_ef),_f3=_f0[_f2],end=_f1[_f2];
if(_f3===undefined){
_f3=6;
}
if(end===undefined){
end=0;
}
return {start:_f3,end:end};
};
return _e8;
});
},"dijit/form/SimpleTextarea":function(){
define(["dojo/_base/declare","dojo/dom-class","dojo/sniff","./TextBox"],function(_f4,_f5,has,_f6){
return _f4("dijit.form.SimpleTextarea",_f6,{baseClass:"dijitTextBox dijitTextArea",rows:"3",cols:"20",templateString:"<textarea ${!nameAttrSetting} data-dojo-attach-point='focusNode,containerNode,textbox' autocomplete='off'></textarea>",postMixInProperties:function(){
if(!this.value&&this.srcNodeRef){
this.value=this.srcNodeRef.value;
}
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
if(has("ie")&&this.cols){
_f5.add(this.textbox,"dijitTextAreaCols");
}
},filter:function(_f7){
if(_f7){
_f7=_f7.replace(/\r/g,"");
}
return this.inherited(arguments);
},_onInput:function(e){
if(this.maxLength){
var _f8=parseInt(this.maxLength);
var _f9=this.textbox.value.replace(/\r/g,"");
var _fa=_f9.length-_f8;
if(_fa>0){
var _fb=this.textbox;
if(_fb.selectionStart){
var pos=_fb.selectionStart;
var cr=0;
if(has("opera")){
cr=(this.textbox.value.substring(0,pos).match(/\r/g)||[]).length;
}
this.textbox.value=_f9.substring(0,pos-_fa-cr)+_f9.substring(pos-cr);
_fb.setSelectionRange(pos-_fa,pos-_fa);
}else{
if(this.ownerDocument.selection){
_fb.focus();
var _fc=this.ownerDocument.selection.createRange();
_fc.moveStart("character",-_fa);
_fc.text="";
_fc.select();
}
}
}
}
this.inherited(arguments);
}});
});
},"dijit/form/_DateTimeTextBox":function(){
define(["dojo/date","dojo/date/locale","dojo/date/stamp","dojo/_base/declare","dojo/_base/lang","./RangeBoundTextBox","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(_fd,_fe,_ff,_100,lang,_101,_102,_103){
new Date("X");
var _104=_100("dijit.form._DateTimeTextBox",[_101,_102],{templateString:_103,hasDownArrow:true,cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},pattern:_fe.regexp,datePackage:"",postMixInProperties:function(){
this.inherited(arguments);
this._set("type","text");
},compare:function(val1,val2){
var _105=this._isInvalidDate(val1);
var _106=this._isInvalidDate(val2);
return _105?(_106?0:-1):(_106?1:_fd.compare(val1,val2,this._selector));
},autoWidth:true,format:function(_107,_108){
if(!_107){
return "";
}
return this.dateLocaleModule.format(_107,_108);
},"parse":function(_109,_10a){
return this.dateLocaleModule.parse(_109,_10a)||(this._isEmpty(_109)?null:undefined);
},serialize:function(val,_10b){
if(val.toGregorian){
val=val.toGregorian();
}
return _ff.toISOString(val,_10b);
},dropDownDefaultValue:new Date(),value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(_10c){
this.dateModule=_10c.datePackage?lang.getObject(_10c.datePackage,false):_fd;
this.dateClassObj=this.dateModule.Date||Date;
this.dateLocaleModule=_10c.datePackage?lang.getObject(_10c.datePackage+".locale",false):_fe;
this._set("pattern",this.dateLocaleModule.regexp);
this._invalidDate=this.constructor.prototype.value.toString();
},buildRendering:function(){
this.inherited(arguments);
if(!this.hasDownArrow){
this._buttonNode.style.display="none";
}
if(!this.hasDownArrow){
this._buttonNode=this.domNode;
this.baseClass+=" dijitComboBoxOpenOnClick";
}
},_setConstraintsAttr:function(_10d){
_10d.selector=this._selector;
_10d.fullYear=true;
var _10e=_ff.fromISOString;
if(typeof _10d.min=="string"){
_10d.min=_10e(_10d.min);
}
if(typeof _10d.max=="string"){
_10d.max=_10e(_10d.max);
}
this.inherited(arguments);
},_isInvalidDate:function(_10f){
return !_10f||isNaN(_10f)||typeof _10f!="object"||_10f.toString()==this._invalidDate;
},_setValueAttr:function(_110,_111,_112){
if(_110!==undefined){
if(typeof _110=="string"){
_110=_ff.fromISOString(_110);
}
if(this._isInvalidDate(_110)){
_110=null;
}
if(_110 instanceof Date&&!(this.dateClassObj instanceof Date)){
_110=new this.dateClassObj(_110);
}
}
this.inherited(arguments);
if(this.value instanceof Date){
this.filterString="";
}
if(this.dropDown){
this.dropDown.set("value",_110,false);
}
},_set:function(attr,_113){
var _114=this._get("value");
if(attr=="value"&&_114 instanceof Date&&this.compare(_113,_114)==0){
return;
}
this.inherited(arguments);
},_setDropDownDefaultValueAttr:function(val){
if(this._isInvalidDate(val)){
val=new this.dateClassObj();
}
this._set("dropDownDefaultValue",val);
},openDropDown:function(_115){
if(this.dropDown){
this.dropDown.destroy();
}
var _116=lang.isString(this.popupClass)?lang.getObject(this.popupClass,false):this.popupClass,_117=this,_118=this.get("value");
this.dropDown=new _116({onChange:function(_119){
_117.set("value",_119,true);
},id:this.id+"_popup",dir:_117.dir,lang:_117.lang,value:_118,textDir:_117.textDir,currentFocus:!this._isInvalidDate(_118)?_118:this.dropDownDefaultValue,constraints:_117.constraints,filterString:_117.filterString,datePackage:_117.params.datePackage,isDisabledDate:function(date){
return !_117.rangeCheck(date,_117.constraints);
}});
this.inherited(arguments);
},_getDisplayedValueAttr:function(){
return this.textbox.value;
},_setDisplayedValueAttr:function(_11a,_11b){
this._setValueAttr(this.parse(_11a,this.constraints),_11b,_11a);
}});
return _104;
});
},"dojo/number":function(){
define(["./_base/lang","./i18n","./i18n!./cldr/nls/number","./string","./regexp"],function(lang,i18n,_11c,_11d,_11e){
var _11f={};
lang.setObject("dojo.number",_11f);
_11f.format=function(_120,_121){
_121=lang.mixin({},_121||{});
var _122=i18n.normalizeLocale(_121.locale),_123=i18n.getLocalization("dojo.cldr","number",_122);
_121.customs=_123;
var _124=_121.pattern||_123[(_121.type||"decimal")+"Format"];
if(isNaN(_120)||Math.abs(_120)==Infinity){
return null;
}
return _11f._applyPattern(_120,_124,_121);
};
_11f._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
_11f._applyPattern=function(_125,_126,_127){
_127=_127||{};
var _128=_127.customs.group,_129=_127.customs.decimal,_12a=_126.split(";"),_12b=_12a[0];
_126=_12a[(_125<0)?1:0]||("-"+_12b);
if(_126.indexOf("%")!=-1){
_125*=100;
}else{
if(_126.indexOf("‰")!=-1){
_125*=1000;
}else{
if(_126.indexOf("¤")!=-1){
_128=_127.customs.currencyGroup||_128;
_129=_127.customs.currencyDecimal||_129;
_126=_126.replace(/\u00a4{1,3}/,function(_12c){
var prop=["symbol","currency","displayName"][_12c.length-1];
return _127[prop]||_127.currency||"";
});
}else{
if(_126.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _12d=_11f._numberPatternRE;
var _12e=_12b.match(_12d);
if(!_12e){
throw new Error("unable to find a number expression in pattern: "+_126);
}
if(_127.fractional===false){
_127.places=0;
}
return _126.replace(_12d,_11f._formatAbsolute(_125,_12e[0],{decimal:_129,group:_128,places:_127.places,round:_127.round}));
};
_11f.round=function(_12f,_130,_131){
var _132=10/(_131||10);
return (_132*+_12f).toFixed(_130)/_132;
};
if((0.9).toFixed()==0){
var _133=_11f.round;
_11f.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d){
d=0;
}else{
a/=d;
if(a<0.5||a>=0.95){
d=0;
}
}
return _133(v,p,m)+(v>0?d:-d);
};
}
_11f._formatAbsolute=function(_134,_135,_136){
_136=_136||{};
if(_136.places===true){
_136.places=0;
}
if(_136.places===Infinity){
_136.places=6;
}
var _137=_135.split("."),_138=typeof _136.places=="string"&&_136.places.indexOf(","),_139=_136.places;
if(_138){
_139=_136.places.substring(_138+1);
}else{
if(!(_139>=0)){
_139=(_137[1]||[]).length;
}
}
if(!(_136.round<0)){
_134=_11f.round(_134,_139,_136.round);
}
var _13a=String(Math.abs(_134)).split("."),_13b=_13a[1]||"";
if(_137[1]||_136.places){
if(_138){
_136.places=_136.places.substring(0,_138);
}
var pad=_136.places!==undefined?_136.places:(_137[1]&&_137[1].lastIndexOf("0")+1);
if(pad>_13b.length){
_13a[1]=_11d.pad(_13b,pad,"0",true);
}
if(_139<_13b.length){
_13a[1]=_13b.substr(0,_139);
}
}else{
if(_13a[1]){
_13a.pop();
}
}
var _13c=_137[0].replace(",","");
pad=_13c.indexOf("0");
if(pad!=-1){
pad=_13c.length-pad;
if(pad>_13a[0].length){
_13a[0]=_11d.pad(_13a[0],pad);
}
if(_13c.indexOf("#")==-1){
_13a[0]=_13a[0].substr(_13a[0].length-pad);
}
}
var _13d=_137[0].lastIndexOf(","),_13e,_13f;
if(_13d!=-1){
_13e=_137[0].length-_13d-1;
var _140=_137[0].substr(0,_13d);
_13d=_140.lastIndexOf(",");
if(_13d!=-1){
_13f=_140.length-_13d-1;
}
}
var _141=[];
for(var _142=_13a[0];_142;){
var off=_142.length-_13e;
_141.push((off>0)?_142.substr(off):_142);
_142=(off>0)?_142.slice(0,off):"";
if(_13f){
_13e=_13f;
delete _13f;
}
}
_13a[0]=_141.reverse().join(_136.group||",");
return _13a.join(_136.decimal||".");
};
_11f.regexp=function(_143){
return _11f._parseInfo(_143).regexp;
};
_11f._parseInfo=function(_144){
_144=_144||{};
var _145=i18n.normalizeLocale(_144.locale),_146=i18n.getLocalization("dojo.cldr","number",_145),_147=_144.pattern||_146[(_144.type||"decimal")+"Format"],_148=_146.group,_149=_146.decimal,_14a=1;
if(_147.indexOf("%")!=-1){
_14a/=100;
}else{
if(_147.indexOf("‰")!=-1){
_14a/=1000;
}else{
var _14b=_147.indexOf("¤")!=-1;
if(_14b){
_148=_146.currencyGroup||_148;
_149=_146.currencyDecimal||_149;
}
}
}
var _14c=_147.split(";");
if(_14c.length==1){
_14c.push("-"+_14c[0]);
}
var re=_11e.buildGroupRE(_14c,function(_14d){
_14d="(?:"+_11e.escapeString(_14d,".")+")";
return _14d.replace(_11f._numberPatternRE,function(_14e){
var _14f={signed:false,separator:_144.strict?_148:[_148,""],fractional:_144.fractional,decimal:_149,exponent:false},_150=_14e.split("."),_151=_144.places;
if(_150.length==1&&_14a!=1){
_150[1]="###";
}
if(_150.length==1||_151===0){
_14f.fractional=false;
}else{
if(_151===undefined){
_151=_144.pattern?_150[1].lastIndexOf("0")+1:Infinity;
}
if(_151&&_144.fractional==undefined){
_14f.fractional=true;
}
if(!_144.places&&(_151<_150[1].length)){
_151+=","+_150[1].length;
}
_14f.places=_151;
}
var _152=_150[0].split(",");
if(_152.length>1){
_14f.groupSize=_152.pop().length;
if(_152.length>1){
_14f.groupSize2=_152.pop().length;
}
}
return "("+_11f._realNumberRegexp(_14f)+")";
});
},true);
if(_14b){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_153,_154,_155,_156){
var prop=["symbol","currency","displayName"][_155.length-1],_157=_11e.escapeString(_144[prop]||_144.currency||"");
_154=_154?"[\\s\\xa0]":"";
_156=_156?"[\\s\\xa0]":"";
if(!_144.strict){
if(_154){
_154+="*";
}
if(_156){
_156+="*";
}
return "(?:"+_154+_157+_156+")?";
}
return _154+_157+_156;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_148,decimal:_149,factor:_14a};
};
_11f.parse=function(_158,_159){
var info=_11f._parseInfo(_159),_15a=(new RegExp("^"+info.regexp+"$")).exec(_158);
if(!_15a){
return NaN;
}
var _15b=_15a[1];
if(!_15a[1]){
if(!_15a[2]){
return NaN;
}
_15b=_15a[2];
info.factor*=-1;
}
_15b=_15b.replace(new RegExp("["+info.group+"\\s\\xa0"+"]","g"),"").replace(info.decimal,".");
return _15b*info.factor;
};
_11f._realNumberRegexp=function(_15c){
_15c=_15c||{};
if(!("places" in _15c)){
_15c.places=Infinity;
}
if(typeof _15c.decimal!="string"){
_15c.decimal=".";
}
if(!("fractional" in _15c)||/^0/.test(_15c.places)){
_15c.fractional=[true,false];
}
if(!("exponent" in _15c)){
_15c.exponent=[true,false];
}
if(!("eSigned" in _15c)){
_15c.eSigned=[true,false];
}
var _15d=_11f._integerRegexp(_15c),_15e=_11e.buildGroupRE(_15c.fractional,function(q){
var re="";
if(q&&(_15c.places!==0)){
re="\\"+_15c.decimal;
if(_15c.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_15c.places+"}";
}
}
return re;
},true);
var _15f=_11e.buildGroupRE(_15c.exponent,function(q){
if(q){
return "([eE]"+_11f._integerRegexp({signed:_15c.eSigned})+")";
}
return "";
});
var _160=_15d+_15e;
if(_15e){
_160="(?:(?:"+_160+")|(?:"+_15e+"))";
}
return _160+_15f;
};
_11f._integerRegexp=function(_161){
_161=_161||{};
if(!("signed" in _161)){
_161.signed=[true,false];
}
if(!("separator" in _161)){
_161.separator="";
}else{
if(!("groupSize" in _161)){
_161.groupSize=3;
}
}
var _162=_11e.buildGroupRE(_161.signed,function(q){
return q?"[-+]":"";
},true);
var _163=_11e.buildGroupRE(_161.separator,function(sep){
if(!sep){
return "(?:\\d+)";
}
sep=_11e.escapeString(sep);
if(sep==" "){
sep="\\s";
}else{
if(sep==" "){
sep="\\s\\xa0";
}
}
var grp=_161.groupSize,grp2=_161.groupSize2;
if(grp2){
var _164="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-grp2)>0)?"(?:"+_164+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_164;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _162+_163;
};
return _11f;
});
},"dijit/form/NumberSpinner":function(){
define(["dojo/_base/declare","dojo/keys","./_Spinner","./NumberTextBox"],function(_165,keys,_166,_167){
return _165("dijit.form.NumberSpinner",[_166,_167.Mixin],{baseClass:"dijitTextBox dijitSpinner dijitNumberTextBox",adjust:function(val,_168){
var tc=this.constraints,v=isNaN(val),_169=!isNaN(tc.max),_16a=!isNaN(tc.min);
if(v&&_168!=0){
val=(_168>0)?_16a?tc.min:_169?tc.max:0:_169?this.constraints.max:_16a?tc.min:0;
}
var _16b=val+_168;
if(v||isNaN(_16b)){
return val;
}
if(_169&&(_16b>tc.max)){
_16b=tc.max;
}
if(_16a&&(_16b<tc.min)){
_16b=tc.min;
}
return _16b;
},_onKeyDown:function(e){
if(this.disabled||this.readOnly){
return;
}
if((e.keyCode==keys.HOME||e.keyCode==keys.END)&&!(e.ctrlKey||e.altKey||e.metaKey)&&typeof this.get("value")!="undefined"){
var _16c=this.constraints[(e.keyCode==keys.HOME?"min":"max")];
if(typeof _16c=="number"){
this._setValueAttr(_16c,false);
}
e.stopPropagation();
e.preventDefault();
}
}});
});
},"dijit/form/RadioButton":function(){
define(["dojo/_base/declare","./CheckBox","./_RadioButtonMixin"],function(_16d,_16e,_16f){
return _16d("dijit.form.RadioButton",[_16e,_16f],{baseClass:"dijitRadio"});
});
},"dojo/data/util/sorter":function(){
define(["../../_base/lang"],function(lang){
var _170={};
lang.setObject("dojo.data.util.sorter",_170);
_170.basicComparator=function(a,b){
var r=-1;
if(a===null){
a=undefined;
}
if(b===null){
b=undefined;
}
if(a==b){
r=0;
}else{
if(a>b||a==null){
r=1;
}
}
return r;
};
_170.createSortFunction=function(_171,_172){
var _173=[];
function _174(attr,dir,comp,s){
return function(_175,_176){
var a=s.getValue(_175,attr);
var b=s.getValue(_176,attr);
return dir*comp(a,b);
};
};
var _177;
var map=_172.comparatorMap;
var bc=_170.basicComparator;
for(var i=0;i<_171.length;i++){
_177=_171[i];
var attr=_177.attribute;
if(attr){
var dir=(_177.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_173.push(_174(attr,dir,comp,_172));
}
}
return function(rowA,rowB){
var i=0;
while(i<_173.length){
var ret=_173[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
return _170;
});
},"dijit/form/ComboBox":function(){
define(["dojo/_base/declare","./ValidationTextBox","./ComboBoxMixin"],function(_178,_179,_17a){
return _178("dijit.form.ComboBox",[_179,_17a],{});
});
},"dijit/form/TimeTextBox":function(){
define(["dojo/_base/declare","dojo/keys","dojo/_base/lang","../_TimePicker","./_DateTimeTextBox"],function(_17b,keys,lang,_17c,_17d){
return _17b("dijit.form.TimeTextBox",_17d,{baseClass:"dijitTextBox dijitComboBox dijitTimeTextBox",popupClass:_17c,_selector:"time",value:new Date(""),maxHeight:-1,_onKey:function(evt){
if(this.disabled||this.readOnly){
return;
}
this.inherited(arguments);
switch(evt.keyCode){
case keys.ENTER:
case keys.TAB:
case keys.ESCAPE:
case keys.DOWN_ARROW:
case keys.UP_ARROW:
break;
default:
this.defer(function(){
var val=this.get("displayedValue");
this.filterString=(val&&!this.parse(val,this.constraints))?val.toLowerCase():"";
if(this._opened){
this.closeDropDown();
}
this.openDropDown();
});
}
}});
});
},"dijit/form/_CheckBoxMixin":function(){
define(["dojo/_base/declare","dojo/dom-attr"],function(_17e,_17f){
return _17e("dijit.form._CheckBoxMixin",null,{type:"checkbox",value:"on",readOnly:false,_aria_attr:"aria-checked",_setReadOnlyAttr:function(_180){
this._set("readOnly",_180);
_17f.set(this.focusNode,"readOnly",_180);
},_setLabelAttr:undefined,_getSubmitValue:function(_181){
return (_181==null||_181==="")?"on":_181;
},_setValueAttr:function(_182){
_182=this._getSubmitValue(_182);
this._set("value",_182);
_17f.set(this.focusNode,"value",_182);
},reset:function(){
this.inherited(arguments);
this._set("value",this._getSubmitValue(this.params.value));
_17f.set(this.focusNode,"value",this.value);
},_onClick:function(e){
if(this.readOnly){
e.stopPropagation();
e.preventDefault();
return false;
}
return this.inherited(arguments);
}});
});
},"dijit/MenuSeparator":function(){
define(["dojo/_base/declare","dojo/dom","./_WidgetBase","./_TemplatedMixin","./_Contained","dojo/text!./templates/MenuSeparator.html"],function(_183,dom,_184,_185,_186,_187){
return _183("dijit.MenuSeparator",[_184,_185,_186],{templateString:_187,buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.domNode,false);
},isFocusable:function(){
return false;
}});
});
},"dijit/form/CheckBox":function(){
define(["require","dojo/_base/declare","dojo/dom-attr","dojo/has","dojo/query","dojo/ready","./ToggleButton","./_CheckBoxMixin","dojo/text!./templates/CheckBox.html","dojo/NodeList-dom","../a11yclick"],function(_188,_189,_18a,has,_18b,_18c,_18d,_18e,_18f){
if(has("dijit-legacy-requires")){
_18c(0,function(){
var _190=["dijit/form/RadioButton"];
_188(_190);
});
}
return _189("dijit.form.CheckBox",[_18d,_18e],{templateString:_18f,baseClass:"dijitCheckBox",_setValueAttr:function(_191,_192){
if(typeof _191=="string"){
this.inherited(arguments);
_191=true;
}
if(this._created){
this.set("checked",_191,_192);
}
},_getValueAttr:function(){
return this.checked&&this._get("value");
},_setIconClassAttr:null,_setNameAttr:"focusNode",postMixInProperties:function(){
this.inherited(arguments);
this.checkedAttrSetting="";
},_fillContent:function(){
},_onFocus:function(){
if(this.id){
_18b("label[for='"+this.id+"']").addClass("dijitFocusedLabel");
}
this.inherited(arguments);
},_onBlur:function(){
if(this.id){
_18b("label[for='"+this.id+"']").removeClass("dijitFocusedLabel");
}
this.inherited(arguments);
}});
});
},"dijit/form/Form":function(){
define(["dojo/_base/declare","dojo/dom-attr","dojo/_base/kernel","dojo/sniff","../_Widget","../_TemplatedMixin","./_FormMixin","../layout/_ContentPaneResizeMixin"],function(_193,_194,_195,has,_196,_197,_198,_199){
return _193("dijit.form.Form",[_196,_197,_198,_199],{name:"",action:"",method:"",encType:"","accept-charset":"",accept:"",target:"",templateString:"<form data-dojo-attach-point='containerNode' data-dojo-attach-event='onreset:_onReset,onsubmit:_onSubmit' ${!nameAttrSetting}></form>",postMixInProperties:function(){
this.nameAttrSetting=this.name?("name='"+this.name+"'"):"";
this.inherited(arguments);
},execute:function(){
},onExecute:function(){
},_setEncTypeAttr:function(_19a){
_194.set(this.domNode,"encType",_19a);
if(has("ie")){
this.domNode.encoding=_19a;
}
this._set("encType",_19a);
},reset:function(e){
var faux={returnValue:true,preventDefault:function(){
this.returnValue=false;
},stopPropagation:function(){
},currentTarget:e?e.target:this.domNode,target:e?e.target:this.domNode};
if(!(this.onReset(faux)===false)&&faux.returnValue){
this.inherited(arguments,[]);
}
},onReset:function(){
return true;
},_onReset:function(e){
this.reset(e);
e.stopPropagation();
e.preventDefault();
return false;
},_onSubmit:function(e){
var fp=this.constructor.prototype;
if(this.execute!=fp.execute||this.onExecute!=fp.onExecute){
_195.deprecated("dijit.form.Form:execute()/onExecute() are deprecated. Use onSubmit() instead.","","2.0");
this.onExecute();
this.execute(this.getValues());
}
if(this.onSubmit(e)===false){
e.stopPropagation();
e.preventDefault();
}
},onSubmit:function(){
return this.isValid();
},submit:function(){
if(!(this.onSubmit()===false)){
this.containerNode.submit();
}
}});
});
},"dijit/form/nls/pt/validate":function(){
define(({invalidMessage:"O valor inserido não é válido.",missingMessage:"Este valor é necessário.",rangeMessage:"Este valor está fora do intervalo. "}));
},"dijit/form/MultiSelect":function(){
define(["dojo/_base/array","dojo/_base/declare","dojo/dom-geometry","dojo/has","dojo/query","./_FormValueWidget"],function(_19b,_19c,_19d,has,_19e,_19f){
var _1a0=_19c("dijit.form.MultiSelect"+(has("dojo-bidi")?"_NoBidi":""),_19f,{size:7,baseClass:"dijitMultiSelect",templateString:"<select multiple='true' ${!nameAttrSetting} data-dojo-attach-point='containerNode,focusNode' data-dojo-attach-event='onchange: _onChange'></select>",addSelected:function(_1a1){
_1a1.getSelected().forEach(function(n){
this.containerNode.appendChild(n);
this.domNode.scrollTop=this.domNode.offsetHeight;
var _1a2=_1a1.domNode.scrollTop;
_1a1.domNode.scrollTop=0;
_1a1.domNode.scrollTop=_1a2;
},this);
this._set("value",this.get("value"));
},getSelected:function(){
return _19e("option",this.containerNode).filter(function(n){
return n.selected;
});
},_getValueAttr:function(){
return _19b.map(this.getSelected(),function(n){
return n.value;
});
},multiple:true,_setValueAttr:function(_1a3,_1a4){
_19e("option",this.containerNode).forEach(function(n){
n.selected=(_19b.indexOf(_1a3,n.value)!=-1);
});
this.inherited(arguments);
},invertSelection:function(_1a5){
var val=[];
_19e("option",this.containerNode).forEach(function(n){
if(!n.selected){
val.push(n.value);
}
});
this._setValueAttr(val,!(_1a5===false||_1a5==null));
},_onChange:function(){
this._handleOnChange(this.get("value"),true);
},resize:function(size){
if(size){
_19d.setMarginBox(this.domNode,size);
}
},postCreate:function(){
this._set("value",this.get("value"));
this.inherited(arguments);
}});
if(has("dojo-bidi")){
_1a0=_19c("dijit.form.MultiSelect",_1a0,{addSelected:function(_1a6){
_1a6.getSelected().forEach(function(n){
n.text=this.enforceTextDirWithUcc(this.restoreOriginalText(n),n.text);
},this);
this.inherited(arguments);
},_setTextDirAttr:function(_1a7){
if((this.textDir!=_1a7||!this._created)&&this.enforceTextDirWithUcc){
this._set("textDir",_1a7);
_19e("option",this.containerNode).forEach(function(_1a8){
if(!this._created&&_1a8.value===_1a8.text){
_1a8.value=_1a8.text;
}
_1a8.text=this.enforceTextDirWithUcc(_1a8,_1a8.originalText||_1a8.text);
},this);
}
}});
}
return _1a0;
});
},"dijit/form/RangeBoundTextBox":function(){
define(["dojo/_base/declare","dojo/i18n","./MappedTextBox"],function(_1a9,i18n,_1aa){
var _1ab=_1a9("dijit.form.RangeBoundTextBox",_1aa,{rangeMessage:"",rangeCheck:function(_1ac,_1ad){
return ("min" in _1ad?(this.compare(_1ac,_1ad.min)>=0):true)&&("max" in _1ad?(this.compare(_1ac,_1ad.max)<=0):true);
},isInRange:function(){
return this.rangeCheck(this.get("value"),this.constraints);
},_isDefinitelyOutOfRange:function(){
var val=this.get("value");
if(val==null){
return false;
}
var _1ae=false;
if("min" in this.constraints){
var min=this.constraints.min;
_1ae=this.compare(val,((typeof min=="number")&&min>=0&&val!=0)?0:min)<0;
}
if(!_1ae&&("max" in this.constraints)){
var max=this.constraints.max;
_1ae=this.compare(val,((typeof max!="number")||max>0)?max:0)>0;
}
return _1ae;
},_isValidSubset:function(){
return this.inherited(arguments)&&!this._isDefinitelyOutOfRange();
},isValid:function(_1af){
return this.inherited(arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_1af));
},getErrorMessage:function(_1b0){
var v=this.get("value");
if(v!=null&&v!==""&&(typeof v!="number"||!isNaN(v))&&!this.isInRange(_1b0)){
return this.rangeMessage;
}
return this.inherited(arguments);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.rangeMessage){
this.messages=i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage;
}
}});
return _1ab;
});
},"dijit/form/ComboButton":function(){
define(["dojo/_base/declare","dojo/keys","../focus","./DropDownButton","dojo/text!./templates/ComboButton.html"],function(_1b1,keys,_1b2,_1b3,_1b4){
return _1b1("dijit.form.ComboButton",_1b3,{templateString:_1b4,_setIdAttr:"",_setTabIndexAttr:["focusNode","titleNode"],_setTitleAttr:"titleNode",optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyDown:function(evt){
if(evt.keyCode==keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
_1b2.focus(this._popupStateNode);
evt.stopPropagation();
evt.preventDefault();
}
},_onArrowKeyDown:function(evt){
if(evt.keyCode==keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
_1b2.focus(this.titleNode);
evt.stopPropagation();
evt.preventDefault();
}
},focus:function(_1b5){
if(!this.disabled){
_1b2.focus(_1b5=="start"?this.titleNode:this._popupStateNode);
}
}});
});
},"dijit/form/_FormSelectWidget":function(){
define(["dojo/_base/array","dojo/_base/Deferred","dojo/aspect","dojo/data/util/sorter","dojo/_base/declare","dojo/dom","dojo/dom-class","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/when","dojo/store/util/QueryResults","./_FormValueWidget"],function(_1b6,_1b7,_1b8,_1b9,_1ba,dom,_1bb,_1bc,lang,_1bd,when,_1be,_1bf){
var _1c0=_1ba("dijit.form._FormSelectWidget",_1bf,{multiple:false,options:null,store:null,query:null,queryOptions:null,labelAttr:"",onFetch:null,sortByLabel:true,loadChildrenOnOpen:false,onLoadDeferred:null,getOptions:function(_1c1){
var opts=this.options||[];
if(_1c1==null){
return opts;
}
if(lang.isArray(_1c1)){
return _1b6.map(_1c1,"return this.getOptions(item);",this);
}
if(lang.isString(_1c1)){
_1c1={value:_1c1};
}
if(lang.isObject(_1c1)){
if(!_1b6.some(opts,function(_1c2,idx){
for(var a in _1c1){
if(!(a in _1c2)||_1c2[a]!=_1c1[a]){
return false;
}
}
_1c1=idx;
return true;
})){
_1c1=-1;
}
}
if(_1c1>=0&&_1c1<opts.length){
return opts[_1c1];
}
return null;
},addOption:function(_1c3){
_1b6.forEach(lang.isArray(_1c3)?_1c3:[_1c3],function(i){
if(i&&lang.isObject(i)){
this.options.push(i);
}
},this);
this._loadChildren();
},removeOption:function(_1c4){
var _1c5=this.getOptions(lang.isArray(_1c4)?_1c4:[_1c4]);
_1b6.forEach(_1c5,function(_1c6){
if(_1c6){
this.options=_1b6.filter(this.options,function(node){
return (node.value!==_1c6.value||node.label!==_1c6.label);
});
this._removeOptionItem(_1c6);
}
},this);
this._loadChildren();
},updateOption:function(_1c7){
_1b6.forEach(lang.isArray(_1c7)?_1c7:[_1c7],function(i){
var _1c8=this.getOptions({value:i.value}),k;
if(_1c8){
for(k in i){
_1c8[k]=i[k];
}
}
},this);
this._loadChildren();
},setStore:function(_1c9,_1ca,_1cb){
var _1cc=this.store;
_1cb=_1cb||{};
if(_1cc!==_1c9){
var h;
while((h=this._notifyConnections.pop())){
h.remove();
}
if(!_1c9.get){
lang.mixin(_1c9,{_oldAPI:true,get:function(id){
var _1cd=new _1b7();
this.fetchItemByIdentity({identity:id,onItem:function(_1ce){
_1cd.resolve(_1ce);
},onError:function(_1cf){
_1cd.reject(_1cf);
}});
return _1cd.promise;
},query:function(_1d0,_1d1){
var _1d2=new _1b7(function(){
if(_1d3.abort){
_1d3.abort();
}
});
_1d2.total=new _1b7();
var _1d3=this.fetch(lang.mixin({query:_1d0,onBegin:function(_1d4){
_1d2.total.resolve(_1d4);
},onComplete:function(_1d5){
_1d2.resolve(_1d5);
},onError:function(_1d6){
_1d2.reject(_1d6);
}},_1d1));
return new _1be(_1d2);
}});
if(_1c9.getFeatures()["dojo.data.api.Notification"]){
this._notifyConnections=[_1b8.after(_1c9,"onNew",lang.hitch(this,"_onNewItem"),true),_1b8.after(_1c9,"onDelete",lang.hitch(this,"_onDeleteItem"),true),_1b8.after(_1c9,"onSet",lang.hitch(this,"_onSetItem"),true)];
}
}
this._set("store",_1c9);
}
if(this.options&&this.options.length){
this.removeOption(this.options);
}
if(this._queryRes&&this._queryRes.close){
this._queryRes.close();
}
if(this._observeHandle&&this._observeHandle.remove){
this._observeHandle.remove();
this._observeHandle=null;
}
if(_1cb.query){
this._set("query",_1cb.query);
this._set("queryOptions",_1cb.queryOptions);
}
if(_1c9){
this._loadingStore=true;
this.onLoadDeferred=new _1b7();
this._queryRes=_1c9.query(this.query,this.queryOptions);
when(this._queryRes,lang.hitch(this,function(_1d7){
if(this.sortByLabel&&!_1cb.sort&&_1d7.length){
if(_1c9.getValue){
_1d7.sort(_1b9.createSortFunction([{attribute:_1c9.getLabelAttributes(_1d7[0])[0]}],_1c9));
}else{
var _1d8=this.labelAttr;
_1d7.sort(function(a,b){
return a[_1d8]>b[_1d8]?1:b[_1d8]>a[_1d8]?-1:0;
});
}
}
if(_1cb.onFetch){
_1d7=_1cb.onFetch.call(this,_1d7,_1cb);
}
_1b6.forEach(_1d7,function(i){
this._addOptionForItem(i);
},this);
if(this._queryRes.observe){
this._observeHandle=this._queryRes.observe(lang.hitch(this,function(_1d9,_1da,_1db){
if(_1da==_1db){
this._onSetItem(_1d9);
}else{
if(_1da!=-1){
this._onDeleteItem(_1d9);
}
if(_1db!=-1){
this._onNewItem(_1d9);
}
}
}),true);
}
this._loadingStore=false;
this.set("value","_pendingValue" in this?this._pendingValue:_1ca);
delete this._pendingValue;
if(!this.loadChildrenOnOpen){
this._loadChildren();
}else{
this._pseudoLoadChildren(_1d7);
}
this.onLoadDeferred.resolve(true);
this.onSetStore();
}),function(err){
console.error("dijit.form.Select: "+err.toString());
this.onLoadDeferred.reject(err);
});
}
return _1cc;
},_setValueAttr:function(_1dc,_1dd){
if(!this._onChangeActive){
_1dd=null;
}
if(this._loadingStore){
this._pendingValue=_1dc;
return;
}
if(_1dc==null){
return;
}
if(lang.isArray(_1dc)){
_1dc=_1b6.map(_1dc,function(_1de){
return lang.isObject(_1de)?_1de:{value:_1de};
});
}else{
if(lang.isObject(_1dc)){
_1dc=[_1dc];
}else{
_1dc=[{value:_1dc}];
}
}
_1dc=_1b6.filter(this.getOptions(_1dc),function(i){
return i&&i.value;
});
var opts=this.getOptions()||[];
if(!this.multiple&&(!_1dc[0]||!_1dc[0].value)&&!!opts.length){
_1dc[0]=opts[0];
}
_1b6.forEach(opts,function(opt){
opt.selected=_1b6.some(_1dc,function(v){
return v.value===opt.value;
});
});
var val=_1b6.map(_1dc,function(opt){
return opt.value;
});
if(typeof val=="undefined"||typeof val[0]=="undefined"){
return;
}
var disp=_1b6.map(_1dc,function(opt){
return opt.label;
});
this._setDisplay(this.multiple?disp:disp[0]);
this.inherited(arguments,[this.multiple?val:val[0],_1dd]);
this._updateSelection();
},_getDisplayedValueAttr:function(){
var ret=_1b6.map([].concat(this.get("selectedOptions")),function(v){
if(v&&"label" in v){
return v.label;
}else{
if(v){
return v.value;
}
}
return null;
},this);
return this.multiple?ret:ret[0];
},_setDisplayedValueAttr:function(_1df){
this.set("value",this.getOptions(typeof _1df=="string"?{label:_1df}:_1df));
},_loadChildren:function(){
if(this._loadingStore){
return;
}
_1b6.forEach(this._getChildren(),function(_1e0){
_1e0.destroyRecursive();
});
_1b6.forEach(this.options,this._addOptionItem,this);
this._updateSelection();
},_updateSelection:function(){
this.focusedChild=null;
this._set("value",this._getValueFromOpts());
var val=[].concat(this.value);
if(val&&val[0]){
var self=this;
_1b6.forEach(this._getChildren(),function(_1e1){
var _1e2=_1b6.some(val,function(v){
return _1e1.option&&(v===_1e1.option.value);
});
if(_1e2&&!self.multiple){
self.focusedChild=_1e1;
}
_1bb.toggle(_1e1.domNode,this.baseClass.replace(/\s+|$/g,"SelectedOption "),_1e2);
_1e1.domNode.setAttribute("aria-selected",_1e2?"true":"false");
},this);
}
},_getValueFromOpts:function(){
var opts=this.getOptions()||[];
if(!this.multiple&&opts.length){
var opt=_1b6.filter(opts,function(i){
return i.selected;
})[0];
if(opt&&opt.value){
return opt.value;
}else{
opts[0].selected=true;
return opts[0].value;
}
}else{
if(this.multiple){
return _1b6.map(_1b6.filter(opts,function(i){
return i.selected;
}),function(i){
return i.value;
})||[];
}
}
return "";
},_onNewItem:function(item,_1e3){
if(!_1e3||!_1e3.parent){
this._addOptionForItem(item);
}
},_onDeleteItem:function(item){
var _1e4=this.store;
this.removeOption({value:_1e4.getIdentity(item)});
},_onSetItem:function(item){
this.updateOption(this._getOptionObjForItem(item));
},_getOptionObjForItem:function(item){
var _1e5=this.store,_1e6=(this.labelAttr&&this.labelAttr in item)?item[this.labelAttr]:_1e5.getLabel(item),_1e7=(_1e6?_1e5.getIdentity(item):null);
return {value:_1e7,label:_1e6,item:item};
},_addOptionForItem:function(item){
var _1e8=this.store;
if(_1e8.isItemLoaded&&!_1e8.isItemLoaded(item)){
_1e8.loadItem({item:item,onItem:function(i){
this._addOptionForItem(i);
},scope:this});
return;
}
var _1e9=this._getOptionObjForItem(item);
this.addOption(_1e9);
},constructor:function(_1ea){
this._oValue=(_1ea||{}).value||null;
this._notifyConnections=[];
},buildRendering:function(){
this.inherited(arguments);
dom.setSelectable(this.focusNode,false);
},_fillContent:function(){
if(!this.options){
this.options=this.srcNodeRef?_1bd("> *",this.srcNodeRef).map(function(node){
if(node.getAttribute("type")==="separator"){
return {value:"",label:"",selected:false,disabled:false};
}
return {value:(node.getAttribute("data-"+_1bc._scopeName+"-value")||node.getAttribute("value")),label:String(node.innerHTML),selected:node.getAttribute("selected")||false,disabled:node.getAttribute("disabled")||false};
},this):[];
}
if(!this.value){
this._set("value",this._getValueFromOpts());
}else{
if(this.multiple&&typeof this.value=="string"){
this._set("value",this.value.split(","));
}
}
},postCreate:function(){
this.inherited(arguments);
_1b8.after(this,"onChange",lang.hitch(this,"_updateSelection"));
var _1eb=this.store;
if(_1eb&&(_1eb.getIdentity||_1eb.getFeatures()["dojo.data.api.Identity"])){
this.store=null;
this.setStore(_1eb,this._oValue);
}
},startup:function(){
this._loadChildren();
this.inherited(arguments);
},destroy:function(){
var h;
while((h=this._notifyConnections.pop())){
h.remove();
}
if(this._queryRes&&this._queryRes.close){
this._queryRes.close();
}
if(this._observeHandle&&this._observeHandle.remove){
this._observeHandle.remove();
this._observeHandle=null;
}
this.inherited(arguments);
},_addOptionItem:function(){
},_removeOptionItem:function(){
},_setDisplay:function(){
},_getChildren:function(){
return [];
},_getSelectedOptionsAttr:function(){
return this.getOptions({selected:true});
},_pseudoLoadChildren:function(){
},onSetStore:function(){
}});
return _1c0;
});
},"dijit/form/CurrencyTextBox":function(){
define(["dojo/currency","dojo/_base/declare","dojo/_base/lang","./NumberTextBox"],function(_1ec,_1ed,lang,_1ee){
return _1ed("dijit.form.CurrencyTextBox",_1ee,{currency:"",baseClass:"dijitTextBox dijitCurrencyTextBox",_formatter:_1ec.format,_parser:_1ec.parse,_regExpGenerator:_1ec.regexp,parse:function(_1ef,_1f0){
var v=this.inherited(arguments);
if(isNaN(v)&&/\d+/.test(_1ef)){
v=lang.hitch(lang.delegate(this,{_parser:_1ee.prototype._parser}),"inherited")(arguments);
}
return v;
},_setConstraintsAttr:function(_1f1){
if(!_1f1.currency&&this.currency){
_1f1.currency=this.currency;
}
this.inherited(arguments,[_1ec._mixInDefaults(lang.mixin(_1f1,{exponent:false}))]);
}});
});
},"dojo/date/locale":function(){
define(["../_base/lang","../_base/array","../date","../cldr/supplemental","../i18n","../regexp","../string","../i18n!../cldr/nls/gregorian","module"],function(lang,_1f2,date,_1f3,i18n,_1f4,_1f5,_1f6,_1f7){
var _1f8={};
lang.setObject(_1f7.id.replace(/\//g,"."),_1f8);
function _1f9(_1fa,_1fb,_1fc,_1fd){
return _1fd.replace(/([a-z])\1*/ig,function(_1fe){
var s,pad,c=_1fe.charAt(0),l=_1fe.length,_1ff=["abbr","wide","narrow"];
switch(c){
case "G":
s=_1fb[(l<4)?"eraAbbr":"eraNames"][_1fa.getFullYear()<0?0:1];
break;
case "y":
s=_1fa.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_1fc.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
pad=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_1fa.getMonth()+1)/3);
pad=true;
break;
case "M":
case "L":
var m=_1fa.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _200=["months",c=="L"?"standAlone":"format",_1ff[l-3]].join("-");
s=_1fb[_200][m];
}
break;
case "w":
var _201=0;
s=_1f8._getWeekOfYear(_1fa,_201);
pad=true;
break;
case "d":
s=_1fa.getDate();
pad=true;
break;
case "D":
s=_1f8._getDayOfYear(_1fa);
pad=true;
break;
case "e":
case "c":
var d=_1fa.getDay();
if(l<2){
s=(d-_1f3.getFirstDayOfWeek(_1fc.locale)+8)%7;
break;
}
case "E":
d=_1fa.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _202=["days",c=="c"?"standAlone":"format",_1ff[l-3]].join("-");
s=_1fb[_202][d];
}
break;
case "a":
var _203=_1fa.getHours()<12?"am":"pm";
s=_1fc[_203]||_1fb["dayPeriods-format-wide-"+_203];
break;
case "h":
case "H":
case "K":
case "k":
var h=_1fa.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
pad=true;
break;
case "m":
s=_1fa.getMinutes();
pad=true;
break;
case "s":
s=_1fa.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_1fa.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=_1f8._getZone(_1fa,true,_1fc);
if(s){
break;
}
l=4;
case "Z":
var _204=_1f8._getZone(_1fa,false,_1fc);
var tz=[(_204<=0?"+":"-"),_1f5.pad(Math.floor(Math.abs(_204)/60),2),_1f5.pad(Math.abs(_204)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_1fd);
}
if(pad){
s=_1f5.pad(s,l);
}
return s;
});
};
_1f8._getZone=function(_205,_206,_207){
if(_206){
return date.getTimezoneName(_205);
}else{
return _205.getTimezoneOffset();
}
};
_1f8.format=function(_208,_209){
_209=_209||{};
var _20a=i18n.normalizeLocale(_209.locale),_20b=_209.formatLength||"short",_20c=_1f8._getGregorianBundle(_20a),str=[],_20d=lang.hitch(this,_1f9,_208,_20c,_209);
if(_209.selector=="year"){
return _20e(_20c["dateFormatItem-yyyy"]||"yyyy",_20d);
}
var _20f;
if(_209.selector!="date"){
_20f=_209.timePattern||_20c["timeFormat-"+_20b];
if(_20f){
str.push(_20e(_20f,_20d));
}
}
if(_209.selector!="time"){
_20f=_209.datePattern||_20c["dateFormat-"+_20b];
if(_20f){
str.push(_20e(_20f,_20d));
}
}
return str.length==1?str[0]:_20c["dateTimeFormat-"+_20b].replace(/\'/g,"").replace(/\{(\d+)\}/g,function(_210,key){
return str[key];
});
};
_1f8.regexp=function(_211){
return _1f8._parseInfo(_211).regexp;
};
_1f8._parseInfo=function(_212){
_212=_212||{};
var _213=i18n.normalizeLocale(_212.locale),_214=_1f8._getGregorianBundle(_213),_215=_212.formatLength||"short",_216=_212.datePattern||_214["dateFormat-"+_215],_217=_212.timePattern||_214["timeFormat-"+_215],_218;
if(_212.selector=="date"){
_218=_216;
}else{
if(_212.selector=="time"){
_218=_217;
}else{
_218=_214["dateTimeFormat-"+_215].replace(/\{(\d+)\}/g,function(_219,key){
return [_217,_216][key];
});
}
}
var _21a=[],re=_20e(_218,lang.hitch(this,_21b,_21a,_214,_212));
return {regexp:re,tokens:_21a,bundle:_214};
};
_1f8.parse=function(_21c,_21d){
var _21e=/[\u200E\u200F\u202A\u202E]/g,info=_1f8._parseInfo(_21d),_21f=info.tokens,_220=info.bundle,re=new RegExp("^"+info.regexp.replace(_21e,"")+"$",info.strict?"":"i"),_221=re.exec(_21c&&_21c.replace(_21e,""));
if(!_221){
return null;
}
var _222=["abbr","wide","narrow"],_223=[1970,0,1,0,0,0,0],amPm="",_224=_1f2.every(_221,function(v,i){
if(!i){
return true;
}
var _225=_21f[i-1],l=_225.length,c=_225.charAt(0);
switch(c){
case "y":
if(l!=2&&_21d.strict){
_223[0]=v;
}else{
if(v<100){
v=Number(v);
var year=""+new Date().getFullYear(),_226=year.substring(0,2)*100,_227=Math.min(Number(year.substring(2,4))+20,99);
_223[0]=(v<_227)?_226+v:_226-100+v;
}else{
if(_21d.strict){
return false;
}
_223[0]=v;
}
}
break;
case "M":
case "L":
if(l>2){
var _228=_220["months-"+(c=="L"?"standAlone":"format")+"-"+_222[l-3]].concat();
if(!_21d.strict){
v=v.replace(".","").toLowerCase();
_228=_1f2.map(_228,function(s){
return s.replace(".","").toLowerCase();
});
}
v=_1f2.indexOf(_228,v);
if(v==-1){
return false;
}
}else{
v--;
}
_223[1]=v;
break;
case "E":
case "e":
case "c":
var days=_220["days-"+(c=="c"?"standAlone":"format")+"-"+_222[l-3]].concat();
if(!_21d.strict){
v=v.toLowerCase();
days=_1f2.map(days,function(d){
return d.toLowerCase();
});
}
v=_1f2.indexOf(days,v);
if(v==-1){
return false;
}
break;
case "D":
_223[1]=0;
case "d":
_223[2]=v;
break;
case "a":
var am=_21d.am||_220["dayPeriods-format-wide-am"],pm=_21d.pm||_220["dayPeriods-format-wide-pm"];
if(!_21d.strict){
var _229=/\./g;
v=v.replace(_229,"").toLowerCase();
am=am.replace(_229,"").toLowerCase();
pm=pm.replace(_229,"").toLowerCase();
}
if(_21d.strict&&v!=am&&v!=pm){
return false;
}
amPm=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_223[3]=v;
break;
case "m":
_223[4]=v;
break;
case "s":
_223[5]=v;
break;
case "S":
_223[6]=v;
}
return true;
});
var _22a=+_223[3];
if(amPm==="p"&&_22a<12){
_223[3]=_22a+12;
}else{
if(amPm==="a"&&_22a==12){
_223[3]=0;
}
}
var _22b=new Date(_223[0],_223[1],_223[2],_223[3],_223[4],_223[5],_223[6]);
if(_21d.strict){
_22b.setFullYear(_223[0]);
}
var _22c=_21f.join(""),_22d=_22c.indexOf("d")!=-1,_22e=_22c.indexOf("M")!=-1;
if(!_224||(_22e&&_22b.getMonth()>_223[1])||(_22d&&_22b.getDate()>_223[2])){
return null;
}
if((_22e&&_22b.getMonth()<_223[1])||(_22d&&_22b.getDate()<_223[2])){
_22b=date.add(_22b,"hour",1);
}
return _22b;
};
function _20e(_22f,_230,_231,_232){
var _233=function(x){
return x;
};
_230=_230||_233;
_231=_231||_233;
_232=_232||_233;
var _234=_22f.match(/(''|[^'])+/g),_235=_22f.charAt(0)=="'";
_1f2.forEach(_234,function(_236,i){
if(!_236){
_234[i]="";
}else{
_234[i]=(_235?_231:_230)(_236.replace(/''/g,"'"));
_235=!_235;
}
});
return _232(_234.join(""));
};
function _21b(_237,_238,_239,_23a){
_23a=_1f4.escapeString(_23a);
if(!_239.strict){
_23a=_23a.replace(" a"," ?a");
}
return _23a.replace(/([a-z])\1*/ig,function(_23b){
var s,c=_23b.charAt(0),l=_23b.length,p2="",p3="";
if(_239.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
case "L":
s=(l>2)?"\\S+?":"1[0-2]|"+p2+"[1-9]";
break;
case "D":
s="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+p2+"[1-9][0-9]|"+p3+"[1-9]";
break;
case "d":
s="3[01]|[12]\\d|"+p2+"[1-9]";
break;
case "w":
s="[1-4][0-9]|5[0-3]|"+p2+"[1-9]";
break;
case "E":
case "e":
case "c":
s=".+?";
break;
case "h":
s="1[0-2]|"+p2+"[1-9]";
break;
case "k":
s="1[01]|"+p2+"\\d";
break;
case "H":
s="1\\d|2[0-3]|"+p2+"\\d";
break;
case "K":
s="1\\d|2[0-4]|"+p2+"[1-9]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_239.am||_238["dayPeriods-format-wide-am"],pm=_239.pm||_238["dayPeriods-format-wide-pm"];
s=am+"|"+pm;
if(!_239.strict){
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_237){
_237.push(_23b);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
var _23c=[];
_1f8.addCustomFormats=function(_23d,_23e){
_23c.push({pkg:_23d,name:_23e});
};
_1f8._getGregorianBundle=function(_23f){
var _240={};
_1f2.forEach(_23c,function(desc){
var _241=i18n.getLocalization(desc.pkg,desc.name,_23f);
_240=lang.mixin(_240,_241);
},this);
return _240;
};
_1f8.addCustomFormats(_1f7.id.replace(/\/date\/locale$/,".cldr"),"gregorian");
_1f8.getNames=function(item,type,_242,_243){
var _244,_245=_1f8._getGregorianBundle(_243),_246=[item,_242,type];
if(_242=="standAlone"){
var key=_246.join("-");
_244=_245[key];
if(_244[0]==1){
_244=undefined;
}
}
_246[1]="format";
return (_244||_245[_246.join("-")]).concat();
};
_1f8.isWeekend=function(_247,_248){
var _249=_1f3.getWeekend(_248),day=(_247||new Date()).getDay();
if(_249.end<_249.start){
_249.end+=7;
if(day<_249.start){
day+=7;
}
}
return day>=_249.start&&day<=_249.end;
};
_1f8._getDayOfYear=function(_24a){
return date.difference(new Date(_24a.getFullYear(),0,1,_24a.getHours()),_24a)+1;
};
_1f8._getWeekOfYear=function(_24b,_24c){
if(arguments.length==1){
_24c=0;
}
var _24d=new Date(_24b.getFullYear(),0,1).getDay(),adj=(_24d-_24c+7)%7,week=Math.floor((_1f8._getDayOfYear(_24b)+adj-1)/7);
if(_24d==_24c){
week++;
}
return week;
};
return _1f8;
});
},"dojo/cldr/monetary":function(){
define(["../_base/kernel","../_base/lang"],function(dojo,lang){
var _24e={};
lang.setObject("dojo.cldr.monetary",_24e);
_24e.getData=function(code){
var _24f={ADP:0,AFN:0,ALL:0,AMD:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,COP:0,CRC:0,DJF:0,ESP:0,GNF:0,GYD:0,HUF:0,IDR:0,IQD:0,IRR:3,ISK:0,ITL:0,JOD:3,JPY:0,KMF:0,KPW:0,KRW:0,KWD:3,LAK:0,LBP:0,LUF:0,LYD:3,MGA:0,MGF:0,MMK:0,MNT:0,MRO:0,MUR:0,OMR:3,PKR:0,PYG:0,RSD:0,RWF:0,SLL:0,SOS:0,STD:0,SYP:0,TMM:0,TND:3,TRL:0,TZS:0,UGX:0,UZS:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,YER:0,ZMK:0,ZWD:0};
var _250={};
var _251=_24f[code],_252=_250[code];
if(typeof _251=="undefined"){
_251=2;
}
if(typeof _252=="undefined"){
_252=0;
}
return {places:_251,round:_252};
};
return _24e;
});
},"dijit/form/_Spinner":function(){
define(["dojo/_base/declare","dojo/keys","dojo/_base/lang","dojo/sniff","dojo/mouse","dojo/on","../typematic","./RangeBoundTextBox","dojo/text!./templates/Spinner.html","./_TextBoxMixin"],function(_253,keys,lang,has,_254,on,_255,_256,_257,_258){
return _253("dijit.form._Spinner",_256,{defaultTimeout:500,minimumTimeout:10,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:_257,baseClass:"dijitTextBox dijitSpinner",cssStateNodes:{"upArrowNode":"dijitUpArrowButton","downArrowNode":"dijitDownArrowButton"},adjust:function(val){
return val;
},_arrowPressed:function(_259,_25a,_25b){
if(this.disabled||this.readOnly){
return;
}
this._setValueAttr(this.adjust(this.get("value"),_25a*_25b),false);
_258.selectInputText(this.textbox,this.textbox.value.length);
},_arrowReleased:function(){
this._wheelTimer=null;
},_typematicCallback:function(_25c,node,evt){
var inc=this.smallDelta;
if(node==this.textbox){
var key=evt.keyCode;
inc=(key==keys.PAGE_UP||key==keys.PAGE_DOWN)?this.largeDelta:this.smallDelta;
node=(key==keys.UP_ARROW||key==keys.PAGE_UP)?this.upArrowNode:this.downArrowNode;
}
if(_25c==-1){
this._arrowReleased(node);
}else{
this._arrowPressed(node,(node==this.upArrowNode)?1:-1,inc);
}
},_wheelTimer:null,_mouseWheeled:function(evt){
evt.stopPropagation();
evt.preventDefault();
var _25d=evt.wheelDelta/120;
if(Math.floor(_25d)!=_25d){
_25d=evt.wheelDelta>0?1:-1;
}
var _25e=evt.detail?(evt.detail*-1):_25d;
if(_25e!==0){
var node=this[(_25e>0?"upArrowNode":"downArrowNode")];
this._arrowPressed(node,_25e,this.smallDelta);
if(this._wheelTimer){
this._wheelTimer.remove();
}
this._wheelTimer=this.defer(function(){
this._arrowReleased(node);
},50);
}
},_setConstraintsAttr:function(_25f){
this.inherited(arguments);
if(this.focusNode){
if(this.constraints.min!==undefined){
this.focusNode.setAttribute("aria-valuemin",this.constraints.min);
}else{
this.focusNode.removeAttribute("aria-valuemin");
}
if(this.constraints.max!==undefined){
this.focusNode.setAttribute("aria-valuemax",this.constraints.max);
}else{
this.focusNode.removeAttribute("aria-valuemax");
}
}
},_setValueAttr:function(_260,_261){
this.focusNode.setAttribute("aria-valuenow",_260);
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
this.own(on(this.domNode,_254.wheel,lang.hitch(this,"_mouseWheeled")),_255.addListener(this.upArrowNode,this.textbox,{keyCode:keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout),_255.addListener(this.downArrowNode,this.textbox,{keyCode:keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout),_255.addListener(this.upArrowNode,this.textbox,{keyCode:keys.PAGE_UP,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout),_255.addListener(this.downArrowNode,this.textbox,{keyCode:keys.PAGE_DOWN,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
}});
});
},"dojo/currency":function(){
define(["./_base/array","./_base/lang","./number","./i18n","./i18n!./cldr/nls/currency","./cldr/monetary"],function(_262,lang,_263,i18n,_264,_265){
var _266={};
lang.setObject("dojo.currency",_266);
_266._mixInDefaults=function(_267){
_267=_267||{};
_267.type="currency";
var _268=i18n.getLocalization("dojo.cldr","currency",_267.locale)||{};
var iso=_267.currency;
var data=_265.getData(iso);
_262.forEach(["displayName","symbol","group","decimal"],function(prop){
data[prop]=_268[iso+"_"+prop];
});
data.fractional=[true,false];
return lang.mixin(data,_267);
};
_266.format=function(_269,_26a){
return _263.format(_269,_266._mixInDefaults(_26a));
};
_266.regexp=function(_26b){
return _263.regexp(_266._mixInDefaults(_26b));
};
_266.parse=function(_26c,_26d){
return _263.parse(_26c,_266._mixInDefaults(_26d));
};
return _266;
});
},"dijit/form/NumberTextBox":function(){
define(["dojo/_base/declare","dojo/_base/lang","dojo/number","./RangeBoundTextBox"],function(_26e,lang,_26f,_270){
var _271=_26e("dijit.form.NumberTextBoxMixin",null,{pattern:function(_272){
return "("+(this.focused&&this.editOptions?this._regExpGenerator(lang.delegate(_272,this.editOptions))+"|":"")+this._regExpGenerator(_272)+")";
},value:NaN,editOptions:{pattern:"#.######"},_formatter:_26f.format,_regExpGenerator:_26f.regexp,postMixInProperties:function(){
this.inherited(arguments);
this._set("type","text");
},_setConstraintsAttr:function(_273){
var _274=typeof _273.places=="number"?_273.places:0;
if(_274){
_274++;
}
if(typeof _273.max!="number"){
_273.max=9*Math.pow(10,15-_274);
}
if(typeof _273.min!="number"){
_273.min=-9*Math.pow(10,15-_274);
}
this.inherited(arguments,[_273]);
if(this.focusNode&&this.focusNode.value&&!isNaN(this.value)){
this.set("value",this.value);
}
},_onFocus:function(){
if(this.disabled||this.readOnly){
return;
}
var val=this.get("value");
if(typeof val=="number"&&!isNaN(val)){
var _275=this.format(val,this.constraints);
if(_275!==undefined){
this.textbox.value=_275;
}
}
this.inherited(arguments);
},format:function(_276,_277){
var _278=String(_276);
if(typeof _276!="number"){
return _278;
}
if(isNaN(_276)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_276,_277))&&_277.exponent!==false&&/\de[-+]?\d/i.test(_278)){
return _278;
}
if(this.editOptions&&this.focused){
_277=lang.mixin({},_277,this.editOptions);
}
return this._formatter(_276,_277);
},_parser:_26f.parse,parse:function(_279,_27a){
var v=this._parser(_279,lang.mixin({},_27a,(this.editOptions&&this.focused)?this.editOptions:{}));
if(this.editOptions&&this.focused&&isNaN(v)){
v=this._parser(_279,_27a);
}
return v;
},_getDisplayedValueAttr:function(){
var v=this.inherited(arguments);
return isNaN(v)?this.textbox.value:v;
},filter:function(_27b){
return (_27b==null||_27b==="")?NaN:this.inherited(arguments);
},serialize:function(_27c,_27d){
return (typeof _27c!="number"||isNaN(_27c))?"":this.inherited(arguments);
},_setBlurValue:function(){
var val=lang.hitch(lang.delegate(this,{focused:true}),"get")("value");
this._setValueAttr(val,true);
},_setValueAttr:function(_27e,_27f,_280){
if(_27e!==undefined&&_280===undefined){
_280=String(_27e);
if(typeof _27e=="number"){
if(isNaN(_27e)){
_280="";
}else{
if(("rangeCheck" in this&&this.rangeCheck(_27e,this.constraints))||this.constraints.exponent===false||!/\de[-+]?\d/i.test(_280)){
_280=undefined;
}
}
}else{
if(!_27e){
_280="";
_27e=NaN;
}else{
_27e=undefined;
}
}
}
this.inherited(arguments,[_27e,_27f,_280]);
},_getValueAttr:function(){
var v=this.inherited(arguments);
if(isNaN(v)&&this.textbox.value!==""){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)&&(new RegExp("^"+_26f._realNumberRegexp(lang.delegate(this.constraints))+"$").test(this.textbox.value))){
var n=Number(this.textbox.value);
return isNaN(n)?undefined:n;
}else{
return undefined;
}
}else{
return v;
}
},isValid:function(_281){
if(!this.focused||this._isEmpty(this.textbox.value)){
return this.inherited(arguments);
}else{
var v=this.get("value");
if(!isNaN(v)&&this.rangeCheck(v,this.constraints)){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)){
return true;
}else{
return this.inherited(arguments);
}
}else{
return false;
}
}
}});
var _282=_26e("dijit.form.NumberTextBox",[_270,_271],{baseClass:"dijitTextBox dijitNumberTextBox"});
_282.Mixin=_271;
return _282;
});
},"url:dijit/form/templates/Spinner.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\n\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t/><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\"\n\t\t\tdata-dojo-attach-point=\"upArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\tdata-dojo-attach-point=\"downArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' data-dojo-attach-point=\"textbox,focusNode\" type=\"${type}\" data-dojo-attach-event=\"onkeydown:_onKeyDown\"\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\n\t/></div\n></div>\n","url:dijit/form/templates/Select.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode,_popupStateNode\" cellspacing='0' cellpadding='0'\n\trole=\"listbox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitInputField dijitButtonText\"  data-dojo-attach-point=\"containerNode,textDirNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitValidationContainer\"\n\t\t\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t/></div\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td\n\t\t><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer\"\n\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t${_buttonInputDisabled}\n\t\t/></td\n\t></tr></tbody\n></table>\n","url:dijit/form/templates/ComboButton.html":"<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:__onClick,onkeydown:_onButtonKeyDown\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeydown:_onArrowKeyDown\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\" role=\"presentation\"\n\t\t\t\tdata-dojo-attach-event=\"onclick:_onClick\"\n\t\t/></td></tr></tbody\n></table>\n","url:dijit/templates/MenuSeparator.html":"<tr class=\"dijitMenuSeparator\" role=\"separator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n","url:dijit/form/templates/CheckBox.html":"<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" role=\"${type}\" aria-checked=\"false\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdata-dojo-attach-point=\"focusNode\"\n\t \tdata-dojo-attach-event=\"ondijitclick:_onClick\"\n/></div>\n","url:dijit/templates/Calendar.html":"<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" aria-labelledby=\"${id}_mddb ${id}_year\" data-dojo-attach-point=\"gridNode\">\n\t<thead>\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"decrementMonth\" scope=\"col\">\n\t\t\t\t<span class=\"dijitInline dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"></span>\n\t\t\t\t<span data-dojo-attach-point=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t\t</th>\n\t\t\t<th class='dijitReset' colspan=\"5\" scope=\"col\">\n\t\t\t\t<div data-dojo-attach-point=\"monthNode\">\n\t\t\t\t</div>\n\t\t\t</th>\n\t\t\t<th class='dijitReset dijitCalendarArrow' scope=\"col\" data-dojo-attach-point=\"incrementMonth\">\n\t\t\t\t<span class=\"dijitInline dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"></span>\n\t\t\t\t<span data-dojo-attach-point=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr role=\"row\">\n\t\t\t${!dayCellsHtml}\n\t\t</tr>\n\t</thead>\n\t<tbody data-dojo-attach-point=\"dateRowsNode\" data-dojo-attach-event=\"ondijitclick: _onDayClick\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t\t${!dateRowsHtml}\n\t</tbody>\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\">\n\t\t<tr>\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\" role=\"presentation\">\n\t\t\t\t<div class=\"dijitCalendarYearLabel\">\n\t\t\t\t\t<span data-dojo-attach-point=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\" role=\"button\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" role=\"button\" id=\"${id}_year\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\" role=\"button\"></span>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\n","*now":function(r){
r(["dojo/i18n!*preload*dojo/layers/nls/form*[\"en\",\"pt\",\"pt-br\",\"ROOT\"]"]);
}}});
define("dojo/layers/form",[],1);
