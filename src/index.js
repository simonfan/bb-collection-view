//     bb-collection-view
//     (c) simonfan
//     bb-collection-view is licensed under the MIT terms.

/**
 * Object that connects data to the html.
 *
 * @module bb-collection-view
 */

define(function (require, exports, module) {
	'use strict';

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
