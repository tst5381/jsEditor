define([
	'underscore',
	'backbone',
	'text!templates/quest_row.tpl',
	'views/quest_editor',
	'models/media',
	'vent'
], function(_, Backbone, Template, QuestEditorView, Media, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item",

		events: {
			"click .edit": "onClickEdit"
		},

		modelEvents: {
			"change": "render"
		},

		onClickEdit: function() {
		}

	});
});