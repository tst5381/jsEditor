define([
	'jquery',
	'underscore',
	'backbone',
	'models/requirement',
	'collections/row_collection_base',
	'vent',
	'models/session'
], function($, _, Backbone, Requirement, RowCollectionBase, vent, Session) {
	return RowCollectionBase.extend({

		model: Requirement,


		url: function() {
			var session = new Session;

			// hard coded for location temporarily
			return "http://arisgames.org/server/json.php/v1.requirements.getRequirementsForObject/"+this.parent.get('game_id')+"/Location/"+this.parent.get('location_id')+"/"+session.editor_id()+"/"+session.auth_token();
		},
	});
});
