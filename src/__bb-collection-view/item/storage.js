/**
 * Defines methods that generate item-related templates and data.
 * Methods here should be overwritten for custom behaviour.
 *
 * @module collection-dock
 * @submodule item
 */
define(function (require, exports, module) {
	'use strict';

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
