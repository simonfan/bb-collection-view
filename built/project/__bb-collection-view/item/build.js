define(["require","exports","module","lodash","jquery","lowercase-backbone","./multi-view"],function(e,t,n){var r=e("lodash"),i=e("jquery"),s=e("lowercase-backbone"),o=e("./multi-view");t.itemTemplate='<div>bb-collection-view item replace "itemTemplate" property</div>',t.itemAppend=function(t,n){var r=this.getViewAt(t-1);r?n.insertAfter(r.$el):n.appendTo(this.$el)},t.itemView=s.view,t.buildItemView=function(t){var n=r.isFunction(this.itemTemplate)?this.itemTemplate(t.attributes):this.itemTemplate,s=i(n),u=this.collection.indexOf(t);this.itemAppend(u,s);var a={el:s,model:t,index:u,collection:this.collection,collectionView:this},f=this.itemView,l;return r.isFunction(f)?l=f(a):r.isArray(f)&&(l=o(a,f)),this.byIndex.splice(u,0,l),l}});