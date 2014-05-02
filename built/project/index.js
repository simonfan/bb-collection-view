//     bb-collection-view
//     (c) simonfan
//     bb-collection-view is licensed under the MIT terms.

define(["require","exports","module","lodash","lowercase-backbone","bb-dock","./__bb-collection-view/iterators","./__bb-collection-view/event-handlers","./__bb-collection-view/item/build","./__bb-collection-view/item/storage"],function(e,t,n){var r=e("lodash"),i=e("lowercase-backbone"),s=e("bb-dock").collection,o=n.exports=i.view.extend({initialize:function(e){i.view.prototype.initialize.call(this,e),this.initializeCollectionView.call(this,e)},resortEvent:"resort",initializeCollectionView:function(t){t=t||{},this.resortEvent=t.resortEvent||this.resortEvent,this.byIndex=[];var n=this.dock=t.dock||s();this.listenTo(n,"add",this.handleAdd).listenTo(n,"remove",this.handleRemove).listenTo(n,"reset",this.handleReset).listenTo(this.resortEvent,this.handleResort),typeof t.collection=="object"&&n.attach(t.collection)}});o.proto(e("./__bb-collection-view/iterators")),o.proto(e("./__bb-collection-view/event-handlers")),o.proto(e("./__bb-collection-view/item/build")),o.proto(e("./__bb-collection-view/item/storage"))});