//     bb-dock
//     (c) simonfan
//     bb-dock is licensed under the MIT terms.

//     bb-collection-view
//     (c) simonfan
//     bb-collection-view is licensed under the MIT terms.

define("bb-dock",["require","exports","module","lodash","subject","backbone"],function(e,t,i){var n=e("lodash"),o=e("subject"),r=e("backbone"),a=i.exports=o({initialize:function(e){this.initializeBbDock(e)},initializeBbDock:function(e){e&&e.attach&&this.attach(e.attach)},invoke:function(e){if(this.attachment){var t=Array.prototype.slice.call(arguments,1);return this.attachment[e].apply(this.attachment,t)}throw new Error("No attachment attached to dock. Unable to invoke "+e)},retrieve:function(e){if(this.attachment)return this.attachment[e];throw new Error("No attachment attached to dock. Unable to retrieve "+e)},attach:function(e,t){return this.detach(),this.attachment=e,this.listenTo(e,"all",this.trigger),t&&t.silent||this.trigger("attach",e),this},detach:function(e){if(this.attachment){var t=this.attachment;this.stopListening(t),delete this.attachment,e&&e.silent||this.trigger("detach",t)}return this}});a.extendProxyMethods=function(e){var t={};return n.each(e,function(e){t[e]=n.partial(a.prototype.invoke,e)}),this.extend(t)},a.proto(r.Events);var c=a.extendProxyMethods(["get","set","escape","has","unset","clear","toJSON","sync","fetch","save","destroy","validate","isValid","url","parse","clone","isNew","hasChanged","changedAttributes","previous","previousAttributes","keys","values","pairs","invert","pick","omit"]);a.model=c;var l=a.extendProxyMethods(["toJSON","sync","add","remove","reset","set","get","at","push","pop","unshift","shift","slice","sort","pluck","where","findWhere","parse","clone","fetch","create","forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample","partition"]);a.collection=l}),define("__bb-collection-view/iterators",["require","exports","module","lodash"],function(e,t){var i=e("lodash");t.onViews=function(){var e=Array.prototype.slice.call(arguments);return i.each(this.byIndex,function(t){t.on.apply(t,e)}),this};var n=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample","partition"];i.each(n,function(e){t[e]=function(){var t=Array.prototype.slice.call(arguments);return t.unshift(this.byIndex),i[e].apply(i,t)}})}),define("__bb-collection-view/event-handlers",["require","exports","module","lodash","jquery"],function(e,t){e("lodash"),e("jquery");t.handleAdd=function(e){this.buildItemView(e)},t.handleRemove=function(e){this.removeView(e.cid)},t.handleReset=function(){this.$container.html(""),this.collection.each(this.handleRemove),this.collection.each(this.handleAdd)},t.handleResort=function(e){this.handleReset(e,this.$container)}}),define("__bb-collection-view/item/build",["require","exports","module","lodash","jquery","lowercase-backbone"],function(e,t){var i=e("lodash"),n=e("jquery"),o=e("lowercase-backbone");t.itemTemplate="<div></div>",t.itemAppend=function(e,t){var i=this.collectionView.getViewAt(e-1);i?t.insertAfter(i.$el):t.appendTo(this.collectionView.$container)},t.itemView=o.view,t.buildItemView=function(e){var t=i.isFunction(this.itemTemplate)?this.itemTemplate(e.attributes):this.itemTemplate,o=n(t),r=this.dock.indexOf(a.model);this.itemAppend(r,o);var a=this.itemView({el:o,model:e,index:r,collection:this.dock.collection,collectionView:this});return this.byIndex.splice(r,0,a),a}}),define("__bb-collection-view/item/storage",["require","exports","module","lodash"],function(e,t){var i=e("lodash");t.getViewAt=function(e){return this.byIndex[e]},t.removeViewAt=function(e){var t=this.byIndex.splice(e,1)[0];return t.remove(),this},t.getView=function(e){return i.find(this.byIndex,function(t){return t.model.cid===e})},t.removeView=function(e){var t=i.findIndex(this.byIndex,function(t){return t.model.cid===e});return this.removeViewAt(t)}}),define("bb-collection-view",["require","exports","module","lodash","lowercase-backbone","bb-dock","./__bb-collection-view/iterators","./__bb-collection-view/event-handlers","./__bb-collection-view/item/build","./__bb-collection-view/item/storage"],function(e,t,i){var n=(e("lodash"),e("lowercase-backbone")),o=e("bb-dock").collection,r=i.exports=n.view.extend({initialize:function(e){n.view.prototype.initialize.call(this,e),this.initializeCollectionView.call(this,e)},resortEvent:"resort",initializeCollectionView:function(e){e=e||{},this.resortEvent=e.resortEvent||this.resortEvent,this.byIndex=[];var t=this.dock=e.dock||o();this.listenTo(t,"add",this.handleAdd).listenTo(t,"remove",this.handleRemove).listenTo(t,"reset",this.handleReset).listenTo(this.resortEvent,this.handleResort),"object"==typeof e.collection&&t.attach(e.collection)}});r.proto(e("./__bb-collection-view/iterators")),r.proto(e("./__bb-collection-view/event-handlers")),r.proto(e("./__bb-collection-view/item/build")),r.proto(e("./__bb-collection-view/item/storage"))});