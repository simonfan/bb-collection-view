(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'bb-collection-view',
		// dependencies for the test
		deps = [mod, 'should', 'lowercase-backbone', 'q'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(collectionView, should, backbone, q) {
	'use strict';

	describe('collectionView asynch-removal', function () {
		beforeEach(function () {
			this.$fixture = $('<div id="fixture"></div>').appendTo($('body'));
		});

		afterEach(function () {
			this.$fixture.remove();
		});


		it('is fine (:', function (done) {

			var fruits = backbone.collection([
				{ name: 'Banana', id: 0 },
				{ name: 'Apple', id: 2 }
			]);


			var delayableView = backbone.view.extend({
				remove: function () {
					return q.delay(true, this.delay);
				}
			});

			var view = collectionView({
				el        : this.$fixture,
				collection: fruits,

				// multi-view
				itemView  : [
					delayableView.extend({ delay: 500 }),
					delayableView.extend({ delay: 1000 }),
					backbone.view
				]
			});



			setTimeout(function () {
				// run tests at next tick

				var removalTime = new Date();
				var removal = view.removeView(fruits.get(0));

				q.isPromise(removal).should.be.true;

				removal.done(function () {

					// check that time was taken
					var lapse = new Date() - removalTime;
					lapse.should.be.greaterThan(1000);
					lapse.should.be.lessThan(1150);
					done();
				});


			}, 0);

		});
	});
});
