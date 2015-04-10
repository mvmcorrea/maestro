//>>built
require(["dojo/_base/declare","dojo/parser","dijit/form/Form","dijit/form/SimpleTextarea","dijit/form/ValidationTextBox"],function(a,d,e,b,c){return a("Manager.ValidationTextarea",[c,b],{regExp:"(.|\\s)*",onBlur:function(){this.isValid()||this.displayMessage(this.getErrorMessage())}})});
//@ sourceMappingURL=ValidationTextarea.js.map