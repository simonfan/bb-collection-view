define(function (require, exports, module) {

	var backbone = require('lowercase-backbone'),
		q        = require('q');

	module.exports = backbone.view.extend({
		/**
		 * Takes an options hash and an array of views.
		 *
		 * @method initialize
		 * @param  {[type]} options  [description]
		 * @param  {[type]} subviews [description]
		 * @return {[type]}          [description]
		 */
		initialize: function initializeMultiView(options, subviews) {

			// initialize normal backbone.view
			backbone.view.prototype.initialize.call(this, options);

			this.subviews = _.map(subviews, function (view, index) {
				return view(options);
			});
		},

		/**
		 * Invokes the removal method
		 * for all the subviews
		 * @method remove
		 * @return {[type]} [description]
		 */
		remove: function removeMultiViews() {

			var removals = _.map(this.subviews, function (view, index) {
				return view.remove();
			});

			return q.all(removals);
		},
	});
});
