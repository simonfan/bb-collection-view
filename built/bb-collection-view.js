//     bb-collection-view
//     (c) simonfan
//     bb-collection-view is licensed under the MIT terms.

define("__bb-collection-view/iterators",["require","exports","module","lodash"],function(e,t){var i=e("lodash");t.onItemViews=function(){var e=Array.prototype.slice.call(arguments);return i.each(this.byIndex,function(t){t.on.apply(t,e)}),this};var n=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample","partition"];i.each(n,function(e){t[e]=function(){var t=Array.prototype.slice.call(arguments);return t.unshift(this.byIndex),i[e].apply(i,t)}})}),define("__bb-collection-view/event-handlers",["require","exports","module","lodash","jquery"],function(e,t){e("lodash"),e("jquery");t.handleAdd=function(e){this.buildItemView(e)},t.handleRemove=function(e){this.removeView(e.cid)},t.handleReset=function(e){this.$el.html(""),e.each(this.handleRemove),e.each(this.handleAdd)},t.handleResort=function(e,t){this.handleReset(e,t)}}),define("__bb-collection-view/item/build",["require","exports","module","lodash","jquery","lowercase-backbone"],function(e,t){var i=e("lodash"),n=e("jquery"),o=e("lowercase-backbone");t.itemTemplate="<div></div>",t.itemAppend=function(e,t){var i=this.getViewAt(e-1);i?t.insertAfter(i.$el):t.appendTo(this.$el)},t.itemView=o.view,t.buildItemView=function(e){var t=i.isFunction(this.itemTemplate)?this.itemTemplate(e.attributes):this.itemTemplate,o=n(t),l=this.collection.indexOf(e);this.itemAppend(l,o);var r=this.itemView({el:o,model:e,index:l,collection:this.collection,collectionView:this});return this.byIndex.splice(l,0,r),r}}),define("__bb-collection-view/item/storage",["require","exports","module","lodash"],function(e,t){var i=e("lodash");t.getViewAt=function(e){return this.byIndex[e]},t.removeViewAt=function(e){var t=this.byIndex.splice(e,1)[0];return t&&t.remove(),this},t.getView=function(e){return i.find(this.byIndex,function(t){return t.model.cid===e})},t.removeView=function(e){var t=i.findIndex(this.byIndex,function(t){return t.model.cid===e});return this.removeViewAt(t)}}),define("bb-collection-view",["require","exports","module","lodash","lowercase-backbone","./__bb-collection-view/iterators","./__bb-collection-view/event-handlers","./__bb-collection-view/item/build","./__bb-collection-view/item/storage"],function(e,t,i){var n=e("lodash"),o=e("lowercase-backbone"),l=i.exports=o.view.extend({initialize:function(e){o.view.prototype.initialize.call(this,e),this.initializeCollectionView.call(this,e)},resortEvent:"resort",initializeCollectionView:function(e){e=e||{},this.resortEvent=e.resortEvent||this.resortEvent,this.byIndex=[];var t=this.collection=e.collection||o.collection();n.bindAll(this,"handleAdd","handleRemove","handleReset","handleResort"),this.listenTo(t,"add",this.handleAdd).listenTo(t,"remove",this.handleRemove).listenTo(t,"reset",this.handleReset).listenTo(t,this.resortEvent,this.handleResort),this.handleReset(t)}});l.proto(e("./__bb-collection-view/iterators")),l.proto(e("./__bb-collection-view/event-handlers")),l.proto(e("./__bb-collection-view/item/build")),l.proto(e("./__bb-collection-view/item/storage"))});