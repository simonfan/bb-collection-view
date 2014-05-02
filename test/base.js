(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'bb-collection-view',
		// dependencies for the test
		deps = [mod, 'should', 'jquery', 'backbone', 'q'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(collectionView, should, $, Backbone, Q) {
	'use strict';

	describe('collectionView', function () {
		beforeEach(function () {
			this.$fixture = $('<div id="fixture"></div>').appendTo($('body'));
		});

		afterEach(function () {
			this.$fixture.remove();
		})


		it('is fine (:', function () {

			var view = collectionView({ el: this.$fixture });

			// view instantiation
			view.should.be.type('object');
		});

		it('presents attached collections on attachment', function (done) {

			var view = collectionView({ el: this.$fixture });

			var fruits = new Backbone.Collection([
				{ name: 'Banana', id: 0 },
				{ name: 'Apple', id: 2 }
			]);

			view.attach(fruits);

			setTimeout(_.bind(function () {
				this.$fixture.children().length.should.eql(2);
				done();
			}, this), 0);
		})


		/**
		 * ITEM
		 */
		describe('item', function () {
			beforeEach(function (done) {
				this.view = collectionView({ el: this.$fixture });

				this.fruits = new Backbone.Collection();

				// attach
				this.view.attach(this.fruits);

				// add
				this.fruits.add([
					{ id: 1, name: 'Banana' },
					{ id: 2, name: 'Apple' },
					{ id: 3, name: 'Watermelon' }
				]);

				// run at next tick.
				setTimeout(done, 10);
			});
		});




		/**
		 *
		 * Handle Add
		 *
		 *
		 */
		describe('handleAdd', function () {

			beforeEach(function () {
				this.view = collectionView({ el: this.$fixture });
			})

			it('handles adding', function () {

				var d = this.view;

				var fruits = new Backbone.Collection();

				d.attach(fruits);

				// add a model on the collection
				fruits.add({
					id: 1,
					name: 'Banana'
				});


				this.$fixture.children().length.should.eql(1);


				fruits.add([
					{ id: 2, name: 'Apple' },
					{ id: 3, name: 'Watermelon' }
				]);

				this.$fixture.children().length.should.eql(3);

			});
		});



		/**
		 *
		 * Handle remove
		 *
		 *
		 */
		describe('handleRemove', function () {
			beforeEach(function (done) {
				this.view = collectionView({ el: this.$fixture });

				this.fruits = new Backbone.Collection();

				// attach
				this.view.attach(this.fruits);

				// add
				this.fruits.add([
					{ id: 1, name: 'Banana' },
					{ id: 2, name: 'Apple' },
					{ id: 3, name: 'Watermelon' }
				]);

				// next tick
				setTimeout(done, 100);
			});

			it('handles removal', function (done) {

				this.fruits.remove(this.fruits.get(3));

				// test on next tick
				setTimeout(_.bind(function () {
					this.$fixture.children().length.should.eql(2);

					done();
				}, this), 0);

			})
		});
	});
});
