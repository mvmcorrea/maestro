//>>built
define("manager/ElementPane",["dojo/_base/declare","dojo/query","dojox/layout/ContentPane"],function(b,c,d){return b("Manager.ElementPane",[d],{executeScripts:!0,baseClass:"mElement",onLoad:function(){var a=c("#"+this.id+" div.mScripts");a.length&&(manager.onLoad[a[0].id].apply(),manager.onLoad[a[0].id]=null)},cleanContent:!0})});
//@ sourceMappingURL=ElementPane.js.map