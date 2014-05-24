define([
	'backbone',
	'text!../../templates/character_chooser_item.tpl',
	'views/character_creator',
	'vent'
], function(Backbone, Template, CharacterCreatorView, vent) {

	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',


		events: {
			"click .new-instance": "onClickNewInstance",
		},


		// TODO how to bubble up? or get scene passed to us
		onClickNewInstance: function() {
			//var character_instance = new CharacterInstance({game_id: this.model.get("game_id")});

			//var character_creator  = new CharacterCreatorView({scene: this.options.parent, character: this.model, character_instance: character_instance});
			//vent.trigger("application:info:show", character_creator);
		}
	});
});

