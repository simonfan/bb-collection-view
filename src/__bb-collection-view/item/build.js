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
		var index = this.dock.indexOf(model);

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
