define(["require","exports","module","lodash","jquery","lowercase-backbone"],function(e,t,n){var r=e("lodash"),i=e("jquery"),s=e("lowercase-backbone");t.itemTemplate='<div>bb-collection-view item replace "itemTemplate" property</div>',t.itemAppend=function(t,n){var r=this.getViewAt(t-1);r?n.insertAfter(r.$el):n.appendTo(this.$el)},t.itemView=s.view,t.buildItemView=function(t){var n=r.isFunction(this.itemTemplate)?this.itemTemplate(t.attributes):this.itemTemplate,s=i(n),o=this.collection.indexOf(t);this.itemAppend(o,s);var u={el:s,model:t,index:o,collection:this.collection,collectionView:this},a=this.itemView,f=a(u);return this.byIndex.splice(o,0,f),f}});