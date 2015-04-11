//>>built
define("dojox/charting/plot2d/Bubble","dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/has ./CartesianBase ./_PlotEvents ./common dojox/lang/functional dojox/lang/functional/reversed dojox/lang/utils dojox/gfx/fx".split(" "),function(p,t,f,y,z,A,B,C,D,s,E){var F=D.lambda("item.purgeGroup()");return t("dojox.charting.plot2d.Bubble",[z,A],{defaultParams:{animate:null},optionalParams:{stroke:{},outline:{},shadow:{},fill:{},filter:{},styleFunc:null,font:"",fontColor:"",labelFunc:null},constructor:function(g,
e){this.opt=p.clone(p.mixin(this.opt,this.defaultParams));s.updateWithObject(this.opt,e);s.updateWithPattern(this.opt,e,this.optionalParams);this.opt.labelFunc||(this.opt.labelFunc=function(e,g,f){return this._getLabel(e.size,g,f)});this.animate=this.opt.animate},render:function(g,e){var h;if(this.zoom&&!this.isDataDirty())return this.performZoom(g,e);this.resetEvents();if(this.dirty=this.isDirty())f.forEach(this.series,F),this._eventSeries={},this.cleanGroup(),h=this.getGroup(),C.forEachRev(this.series,
function(a){a.cleanGroup(h)});for(var q=this.chart.theme,p=this._hScaler.scaler.getTransformerFromModel(this._hScaler),s=this._vScaler.scaler.getTransformerFromModel(this._vScaler),t=this.events(),u=this.series.length-1;0<=u;--u){var c=this.series[u];if(!this.dirty&&!c.dirty)q.skip(),this._reconnectEvents(c.name);else if(c.cleanGroup(),c.data.length)if("number"==typeof c.data[0])console.warn("dojox.charting.plot2d.Bubble: the data in the following series cannot be rendered as a bubble chart; ",c);
else{h=c.group;var r=q.next("circle",[this.opt,c]),k=f.map(c.data,function(a){return a?{x:p(a.x)+e.l,y:g.height-e.b-s(a.y),radius:this._vScaler.bounds.scale*(a.size/2)}:null},this),b=null,l=null,m=null,w=this.opt.styleFunc,v=function(a){return w?q.addMixin(r,"circle",[a,w(a)],!0):q.addMixin(r,"circle",a,!0)};r.series.shadow&&(m=f.map(k,function(a,n){if(null!==a){var d=v(c.data[n]).series.shadow,d=h.createCircle({cx:a.x+d.dx,cy:a.y+d.dy,r:a.radius}).setStroke(d).setFill(d.color);this.animate&&this._animateBubble(d,
g.height-e.b,a.radius);return d}return null},this),m.length&&(c.dyn.shadow=m[m.length-1].getStroke()));r.series.outline&&(l=f.map(k,function(a,n){if(null!==a){var d=v(c.data[n]),d=B.makeStroke(d.series.outline);d.width=2*d.width+r.series.stroke.width;d=h.createCircle({cx:a.x,cy:a.y,r:a.radius}).setStroke(d);this.animate&&this._animateBubble(d,g.height-e.b,a.radius);return d}return null},this),l.length&&(c.dyn.outline=l[l.length-1].getStroke()));b=f.map(k,function(a,n){if(null!==a){var d=v(c.data[n]),
f={x:a.x-a.radius,y:a.y-a.radius,width:2*a.radius,height:2*a.radius},b=this._plotFill(d.series.fill,g,e),b=this._shapeFill(b,f),b=h.createCircle({cx:a.x,cy:a.y,r:a.radius}).setFill(b).setStroke(d.series.stroke);b.setFilter&&d.series.filter&&b.setFilter(d.series.filter);this.animate&&this._animateBubble(b,g.height-e.b,a.radius);this.createLabel(h,c.data[n],f,d);return b}return null},this);b.length&&(c.dyn.fill=b[b.length-1].getFill(),c.dyn.stroke=b[b.length-1].getStroke());if(t){var x=Array(b.length);
f.forEach(b,function(a,b){if(null!==a){var d={element:"circle",index:b,run:c,shape:a,outline:l&&l[b]||null,shadow:m&&m[b]||null,x:c.data[b].x,y:c.data[b].y,r:c.data[b].size/2,cx:k[b].x,cy:k[b].y,cr:k[b].radius};this._connectEvents(d);x[b]=d}},this);this._eventSeries[c.name]=x}else delete this._eventSeries[c.name];c.dirty=!1}else c.dirty=!1,q.skip()}this.dirty=!1;y("dojo-bidi")&&this._checkOrientation(this.group,g,e);return this},_animateBubble:function(g,e,f){E.animateTransform(p.delegate({shape:g,
duration:1200,transform:[{name:"translate",start:[0,e],end:[0,0]},{name:"scale",start:[0,1/f],end:[1,1]},{name:"original"}]},this.animate)).play()}})});
//@ sourceMappingURL=Bubble.js.map