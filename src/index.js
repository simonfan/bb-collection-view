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
			_.bindAll(this, 'handleAdd', 'handleRemove', 'handleReset', 'handleResort');
			this.listenTo(dock, 'add', this.handleAdd)
				.listenTo(dock, 'remove', this.handleRemove)
				.listenTo(dock, 'reset attach', this.handleReset)
				.listenTo(dock, this.resortEvent, this.handleResort);

			// [4] start.
			if (typeof options.collection === 'object') {
				dock.attach(options.collection);
			}
		},

		attach: function (collection, options) {

			this.dock.attach(collection, options);
			return this;
		},

		detach: function (options) {
			this.dock.detach(options);

			return this;
		}
	});

	dock.proto(require('./__bb-collection-view/iterators'));


	dock.proto(require('./__bb-collection-view/event-handlers'));
	dock.proto(require('./__bb-collection-view/item/build'));
	dock.proto(require('./__bb-collection-view/item/storage'));
});
