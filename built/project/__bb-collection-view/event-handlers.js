define(["require","exports","module","lodash","jquery"],function(e,t,n){var r=e("lodash"),i=e("jquery");t.handleAdd=function(t){this.buildItemView(t)},t.handleRemove=function(t){this.removeView(t.cid)},t.handleReset=function(t,n){this.$el.html(""),t.each(this.handleRemove),t.each(this.handleAdd)},t.handleResort=function(t,n){this.handleReset(t,n)}});