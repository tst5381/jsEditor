define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/plaques.tpl',
	'collections/plaques',
	'views/plaque_item',
], function($, _, Backbone, Marionette, Template, PlaqueCollection, PlaqueItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: PlaqueItemView,

	    // Bootstrap wrapper
		tagName: "table",
		className: "table"
	});
});