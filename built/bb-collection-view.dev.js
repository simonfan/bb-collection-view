/**
 * Proxies methods to the collection, if it is present.
 *
 * @module collection-dock
 * @submodule proxy
 */
define('__bb-collection-view/iterators',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	// events
	exports.onItemViews = function onItemViews() {
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

		this.buildItemView(model);
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
		this.$el.html('');

		collection.each(this.handleRemove);

		collection.each(this.handleAdd);
	};


	/**
	 * Handles resort events on the collection.
	 *
	 * @method handleResort
	 * @private
	 * @param model {model Object}
	 */
	exports.handleResort = function handleResort(collection, options) {
		this.handleReset(collection, options);
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
		var viewBefore = this.getViewAt(index - 1);

		if (viewBefore) {
			// if htere is a view before,
			// insert this.$el after that view's $el
			$el.insertAfter(viewBefore.$el);

		} else {
			// otherwise, the collectionView is still empty,
			// thus just append to the container
			$el.appendTo(this.$el);

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
		var index = this.collection.indexOf(model);

		// [3] place
		this.itemAppend(index, $el);


		// [4] build the view
		var view = this.itemView({
			el: $el,
			model: model,
			index: index,
			collection: this.collection,
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
		if (removed) {
			removed.remove();
		}

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

define('bb-collection-view',['require','exports','module','lodash','lowercase-backbone','./__bb-collection-view/iterators','./__bb-collection-view/event-handlers','./__bb-collection-view/item/build','./__bb-collection-view/item/storage'],function (require, exports, module) {
	

	var _ = require('lodash'),
		backbone = require('lowercase-backbone');

	/**
	 * @class collectionDock
	 * @constructor
	 * @param extensions {Object}
	 */
	var bbCollectionView = module.exports = backbone.view.extend({
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

			// Make sure there is a collection
			var collection = this.collection = options.collection || backbone.collection();

			// events
			_.bindAll(this, 'handleAdd', 'handleRemove', 'handleReset', 'handleResort');
			this.listenTo(collection, 'add', this.handleAdd)
				.listenTo(collection, 'remove', this.handleRemove)
				.listenTo(collection, 'reset', this.handleReset)
				.listenTo(collection, this.resortEvent, this.handleResort);

			this.handleReset(collection);
		},
	});

	bbCollectionView.proto(require('./__bb-collection-view/iterators'));


	bbCollectionView.proto(require('./__bb-collection-view/event-handlers'));
	bbCollectionView.proto(require('./__bb-collection-view/item/build'));
	bbCollectionView.proto(require('./__bb-collection-view/item/storage'));
});

