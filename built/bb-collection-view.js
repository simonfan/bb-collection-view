//     bb-collection-view
//     (c) simonfan
//     bb-collection-view is licensed under the MIT terms.

define("__bb-collection-view/iterators",["require","exports","module","lodash"],function(e,i){var t=e("lodash");i.onItemViews=function(){var e=Array.prototype.slice.call(arguments);return t.each(this.byIndex,function(i){i.on.apply(i,e)}),this};var n=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample","partition"];t.each(n,function(e){i[e]=function(){var i=Array.prototype.slice.call(arguments);return i.unshift(this.byIndex),t[e].apply(t,i)}})}),define("__bb-collection-view/event-handlers",["require","exports","module","lodash","jquery"],function(e,i){e("lodash"),e("jquery");i.handleAdd=function(e){this.buildItemView(e)},i.handleRemove=function(e){this.removeView(e.cid)},i.handleReset=function(e){this.$el.html(""),e.each(this.handleRemove),e.each(this.handleAdd)},i.handleResort=function(e,i){this.handleReset(e,i)}}),define("__bb-collection-view/item/build",["require","exports","module","lodash","jquery","lowercase-backbone"],function(e,i){var t=e("lodash"),n=e("jquery"),o=e("lowercase-backbone");i.itemTemplate='<div>bb-collection-view item replace "itemTemplate" property</div>',i.itemAppend=function(e,i){var t=this.getViewAt(e-1);t?i.insertAfter(t.$el):i.appendTo(this.$el)},i.itemView=o.view,i.buildItemView=function(e){var i=t.isFunction(this.itemTemplate)?this.itemTemplate(e.attributes):this.itemTemplate,o=n(i),l=this.collection.indexOf(e);this.itemAppend(l,o);var r={el:o,model:e,index:l,collection:this.collection,collectionView:this},c=this.itemView,s=c(r);return this.byIndex.splice(l,0,s),s}}),define("__bb-collection-view/item/storage",["require","exports","module","lodash","q"],function(e,i){var t=e("lodash"),n=e("q");i.getViewAt=function(e){return this.byIndex[e]},i.removeViewAt=function(e){var i=this.byIndex.splice(e,1)[0];if(i)var t=i.remove();return n(t)},i.getView=function(e){return e=t.isObject(e)?e.cid:e,t.find(this.byIndex,function(i){return i.model.cid===e})},i.removeView=function(e){e=t.isObject(e)?e.cid:e;var i=t.findIndex(this.byIndex,function(i){return i.model.cid===e});return this.removeViewAt(i)}}),define("bb-collection-view",["require","exports","module","lodash","lowercase-backbone","./__bb-collection-view/iterators","./__bb-collection-view/event-handlers","./__bb-collection-view/item/build","./__bb-collection-view/item/storage"],function(e,i,t){var n=e("lodash"),o=e("lowercase-backbone"),l=["resortEvent","itemTemplate","itemView"],r=t.exports=o.view.extend({initialize:function(e){o.view.prototype.initialize.call(this,e),this.initializeCollectionView.call(this,e)},resortEvent:"resort",initializeCollectionView:function(e){e=e||{},n.assign(this,n.pick(e,l)),this.byIndex=[];var i=this.collection=e.collection||this.collection||o.collection();n.bindAll(this,"handleAdd","handleRemove","handleReset","handleResort"),this.listenTo(i,"add",this.handleAdd).listenTo(i,"remove",this.handleRemove).listenTo(i,"reset",this.handleReset).listenTo(i,this.resortEvent,this.handleResort),this.handleReset(i)}});r.proto(e("./__bb-collection-view/iterators")),r.proto(e("./__bb-collection-view/event-handlers")),r.proto(e("./__bb-collection-view/item/build")),r.proto(e("./__bb-collection-view/item/storage"))});