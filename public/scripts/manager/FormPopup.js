//>>built
define("manager/FormPopup",["dojo/_base/declare"],function(g){return g("Manager.FormPopup",[],{context:null,url:"",constructor:function(){this.obj=this},setContext:function(a){this.context=a},start:function(){this.url=this.context.action+"?__popupName\x3d"+this.context.name;if(""!=this.context.filter)for(var a=this.context.filter.split(","),c=0;c<a.length;c++){var b=a[c];(field=dijit.byId(b))?b=field.get("value"):(field=manager.getElementById(b),b=escape(field.value));this.url=this.url+"\x26"+("filter"+
c)+"\x3d"+b}dojo.subscribe("windowActionClose",this,this.close);this.open()},open:function(){manager.getWindow(this.context.name)||manager.addWindow(this.context.name);manager.getWindow(this.context.name).setHref(this.url);manager.getWindow(this.context.name).open()},close:function(a){a==this.context.name&&(a=dojo.query("#"+a+" form"),dijit.byId(a[0].id).getValues(),this.deliver(a[0].id))},deliver:function(a){related=this.obj.context.related;a=/(.*):([^:]*)/;for(var c=related.split(","),b=0;b<c.length;b++){c[b]=
c[b].replace(/::/g,"!");var e=a.exec(c[b])||[c[b],c[b]],f=e[2]?e[2]:e[1],f=f.replace(/\!/g,"::"),f=manager.getElementById(f).value;e[1]=e[1].replace("!","::");var d=dijit.byId(e[1]);d?d.set("value",f):(d=manager.getElementById(e[1]),null!=d&&(d.value=f,d=manager.getElementById(d.name+"_sel"),null!=d&&(d.value=f)))}}})});
//@ sourceMappingURL=FormPopup.js.map