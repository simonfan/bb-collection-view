//     bb-dock
//     (c) simonfan
//     bb-dock is licensed under the MIT terms.

define("bb-dock",["require","exports","module","lodash","subject","backbone"],function(t,e,i){var a=t("lodash"),n=t("subject"),r=t("backbone"),s=i.exports=n({initialize:function(t){this.initializeBbDock(t)},initializeBbDock:function(t){t&&t.attach&&this.attach(t.attach)},invoke:function(t){if(this.attachment){var e=Array.prototype.slice.call(arguments,1);return this.attachment[t].apply(this.attachment,e)}throw new Error("No attachment attached to dock. Unable to invoke "+t)},retrieve:function(t){if(this.attachment)return this.attachment[t];throw new Error("No attachment attached to dock. Unable to retrieve "+t)},attach:function(t,e){return this.detach(),this.attachment=t,this.listenTo(t,"all",this.trigger),e&&e.silent||this.trigger("attach",t),this},detach:function(t){if(this.attachment){var e=this.attachment;this.stopListening(e),delete this.attachment,t&&t.silent||this.trigger("detach",e)}return this}});s.extendProxyMethods=function(t){var e={};return a.each(t,function(t){e[t]=a.partial(s.prototype.invoke,t)}),this.extend(e)},s.proto(r.Events);var o=s.extendProxyMethods(["get","set","escape","has","unset","clear","toJSON","sync","fetch","save","destroy","validate","isValid","url","parse","clone","isNew","hasChanged","changedAttributes","previous","previousAttributes","keys","values","pairs","invert","pick","omit"]);s.model=o;var c=s.extendProxyMethods(["toJSON","sync","add","remove","reset","set","get","at","push","pop","unshift","shift","slice","sort","pluck","where","findWhere","parse","clone","fetch","create","forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample","partition"]);s.collection=c});
/**
 * Proxies methods to the collection, if it is present.
 *
 * @module collection-dock
 * @submodule proxy
 */
define('__bb-collection-view/iterators',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	// events
	exports.onViews = function onViews() {
		var args = Array.prototype.slice.call(arguments);

		_.each(this.byIndex, function (view) {
			view.on.apply(view, args);
		});

		return this;
	};

	// Underscore methods that we want to implement on the Collection.
	// 90% of the core usefulness of Backbone Collections is actually implemented
	// right here:
	var _methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
	'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
	'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
	'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
	'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
	'lastIndexOf', 'isEmpty', 'chain', 'sample', 'partition'];

	_.each(_methods, function (method) {
		exports[method] = function () {

			var args = Array.prototype.slice.call(arguments);

			// add byIndex
			args.unshift(this.byIndex);

			return _[method].apply(_, args);
		};
	});

});

/**
 * Defines the event handler for 'add' events on the collection.
 *
 * @module collection-dock
 * @submodule event-hanlders
 */
define('__bb-collection-view/event-handlers',['require','exports','module','lodash','jquery'],function (require, exports, module) {
	

	// external
	var _ = require('lodash'),
		$ = require('jquery');

	/**
	 * Handles add events on the collection.
	 *
	 * @method handleAdd
	 * @private
	 * @param model {model Object}
	 */
	exports.handleAdd = function handleAdd(model) {
		var view = this.buildItemView(model);
	};

	/**
	 * Handles remove events on the collection.
	 *
	 * @method handleRemove
	 * @private
	 * @param model {model Object}
	 */
	exports.handleRemove = function handleRemove(model) {
		this.removeView(model.cid);
	};

	/**
	 * Handles reset events on the collection.
	 *
	 * @method handleReset
	 * @private
	 * @param model {model Object}
	 */
	exports.handleReset = function handleReset(collection, options) {

		// This is just to be faster: remove everything at once!
		this.$container.html('');

		this.collection.each(this.handleRemove);

		this.collection.each(this.handleAdd);
	};


	/**
	 * Handles resort events on the collection.
	 *
	 * @method handleResort
	 * @private
	 * @param model {model Object}
	 */
	exports.handleResort = function handleResort(collection, options) {
		this.handleReset(collection, this.$container);
	};

});

/**
 * Defines methods that generate item-related templates and data.
 * Methods here should be overwritten for custom behaviour.
 *
 * @module collection-dock
 * @submodule item
 */
define('__bb-collection-view/item/build',['require','exports','module','lodash','jquery','lowercase-backbone'],function (require, exports, module) {
	

	// external
	var _ = require('lodash'),
		$ = require('jquery'),
		backbone = require('lowercase-backbone');


	exports.itemTemplate = '<div></div>';


	exports.itemAppend = function itemAppend(index, $el) {

		// get the view that represents the model before this one.
		var viewBefore = this.collectionView.getViewAt(index - 1);

		if (viewBefore) {
			// if htere is a view before,
			// insert this.$el after that view's $el
			$el.insertAfter(viewBefore.$el);

		} else {
			// otherwise, the collectionView is still empty,
			// thus just append to the container
			$el.appendTo(this.collectionView.$container);

		}

	};



	/**
	 * Must return an view object with a 'remove' method.
	 * The itemView is responsible for actions
	 */
	exports.itemView = backbone.view;





	/**
	 * Builds the itemvieW.
	 *
	 * @method buildItemView
	 * @param options {Object}
	 */
	exports.buildItemView = function buildItemView(model) {

		// [1] render the template
		//     and get the $el.
		var html = _.isFunction(this.itemTemplate) ? this.itemTemplate(model.attributes) : this.itemTemplate,
			$el = $(html);

		// [2] get index
		var index = this.dock.indexOf(view.model);

		// [3] place
		this.itemAppend(index, $el);


		// [4] build the view
		var view = this.itemView({
			el: $el,
			model: model,
			index: index,
			collection: this.dock.collection,
			collectionView: this,
		});

		// [5] store
		this.byIndex.splice(index, 0, view);

		return view;
	};

});

/**
 * Defines methods that generate item-related templates and data.
 * Methods here should be overwritten for custom behaviour.
 *
 * @module collection-dock
 * @submodule item
 */
define('__bb-collection-view/item/storage',['require','exports','module','lodash'],function (require, exports, module) {
	

	// external
	var _ = require('lodash');



	// STORAGE

	/**
	 * Retrieves the view object at a given index.
	 *
	 * @method at
	 * @param index {Number}
	 */
	exports.getViewAt = function getViewAt(index) {
		return this.byIndex[index];
	};

	/**
	 * Removes the view from the 'byIndex' array
	 * AND invokes the view's 'remove' method.
	 *
	 * @method removeViewAt
	 * @param index {Number}
	 */
	exports.removeViewAt = function removeViewAt(index) {
		var removed = this.byIndex.splice(index, 1)[0];

		// invoke the remove method if present
		removed.remove();

		return this;
	};



	/**
	 * Retrieves the view for a given model/mcid
	 *
	 * @method getView
	 * @param mcid {Number}
	 */
	exports.getView = function getView(mcid) {
		return _.find(this.byIndex, function (view) {
			return view.model.cid === mcid;
		});
	};


	/**
	 * Deletes the view for a given model/mcid from the byIndex hash.
	 *
	 * @method getView
	 * @param mcid {Number}
	 */
	exports.removeView = function removeView(mcid) {

		var index = _.findIndex(this.byIndex, function (view) {
			return view.model.cid === mcid;
		});

		return this.removeViewAt(index);
	};

});

//     bb-collection-view
//     (c) simonfan
//     bb-collection-view is licensed under the MIT terms.

/**
 * Object that connects data to the html.
 *
 * @module bb-collection-view
 */

define('bb-collection-view',['require','exports','module','lodash','lowercase-backbone','bb-dock','./__bb-collection-view/iterators','./__bb-collection-view/event-handlers','./__bb-collection-view/item/build','./__bb-collection-view/item/storage'],function (require, exports, module) {
	

	var _ = require('lodash'),
		backbone = require('lowercase-backbone'),
		collectionDock = require('bb-dock').collection;

	/**
	 * @class collectionDock
	 * @constructor
	 * @param extensions {Object}
	 */
	var dock = module.exports = backbone.view.extend({
		initialize: function (options) {

			// initialize basic view
			backbone.view.prototype.initialize.call(this, options);

			// initialize collection-dock
			this.initializeCollectionView.call(this, options);
		},


		resortEvent: 'resort',

		/**
		 * Initialization logic for collectionDock
		 *
		 * @method initializeCollectionView
		 * @param options {Object}
		 */
		initializeCollectionView: function initializeCollectionView(options) {

			options = options || {};

			// the event that triggers resort.
			this.resortEvent = options.resortEvent || this.resortEvent;

			// views by index
			this.byIndex = [];

			// BUILD DOCK
			var dock = this.dock = options.dock || collectionDock();

			// events
			this.listenTo(dock, 'add', this.handleAdd)
				.listenTo(dock, 'remove', this.handleRemove)
				.listenTo(dock, 'reset', this.handleReset)
				.listenTo(this.resortEvent, this.handleResort);

			// [4] start.
			if (typeof options.collection === 'object') {
				dock.attach(options.collection);
			}
		},
	});

	dock.proto(require('./__bb-collection-view/iterators'));


	dock.proto(require('./__bb-collection-view/event-handlers'));
	dock.proto(require('./__bb-collection-view/item/build'));
	dock.proto(require('./__bb-collection-view/item/storage'));
});

