<div class="shrink-center well well-lg game-settings" style="min-width: 430px; width: 75%;">
	<form class="form" role="form" onsubmit="return false;">
	<h4>
		Edit Game <span class="object-id text-muted"><%= game_id %></span>
	</h4>

	<div class="form-group row">
		<div class="col-xs-12 col-md-8 padded">

	<div class="form-group">
		<label for="game-name">Name</label>
		<input type="text" autofocus class="form-control" id="game-name" placeholder="Name" value="<%= name %>">
	</div>

	<div class="form-group">
		<label for="game-description">Description</label>
		<textarea class="form-control" id="game-description" placeholder="Description" rows=4><%= description %></textarea>
	</div>

	<div class="form-group">
		<label for="game-intro_scene_id">Intro Scene</label>

		<select class="form-control" id="game-intro_scene_id">
			<option value="0" selected disabled>- Select One -</option>

			<% scenes.each(function(scene) { %>
				<option value="<%= scene.id %>" <%= option_selected(intro_scene_id === scene.id) %>><%= scene.get("name") %></option>
			<% }); %>
		</select>
	</div>

	<div class="form-group">
		<div class="btn-group btn-group-lg btn-group-justified published-toggle">
			<label class="btn btn-success">
				<input type="radio" name="game-published" value="1" <%= radio_selected(published === "1") %>>
				<span class="glyphicon glyphicon-saved"></span>
				Published
			</label>
			<label class="btn btn-warning">
				<input type="radio" name="game-published" value="0" <%= radio_selected(published === "0") %>>
				<span class="glyphicon glyphicon-pencil"></span>
				In Development
			</label>

		</div>
	</div>

	<div class="form-group">
		<div class="alert alert-info">
			<span class="glyphicon glyphicon-info-sign"></span>
			If published your game will be listed as playable on the ARIS client. If not, your game will not be playable unless the "show games in development" switch is flipped in the ARIS client settings.
		</div>
	</div>

		</div>

		<div class="col-xs-12 col-md-4 padded">


	<div class="form-group">
		<label>Appearance</label>

		<div class="thumbnail change-icon">
			<img src=<%= icon_thumbnail_url %>>
			<div class="caption">
				<button type="button" class="btn btn-link btn-info btn-block change-icon">
					<span class="glyphicon glyphicon-picture"></span>
					Icon
				</button>
			</div>
		</div>

		<div class="thumbnail change-media">
			<img src=<%= media_thumbnail_url %>>
			<div class="caption">
				<button type="button" class="btn btn-link btn-info btn-block change-media">
					<span class="glyphicon glyphicon-facetime-video"></span>
					Media
				</button>
			</div>
		</div>
	</div>




		</div>
	</div>




	<!-- Advanced Section -->

	<div class="panel panel-warning">
		<div class="panel-heading">
			<h5 class="panel-title collapsed" data-toggle="collapse" data-target="#advanced-settings">
				<a>
					Advanced Settings
				</a>
			</h5>
		</div>
	</div>


	<div id="advanced-settings" class="collapse">
		<div class="form-group">
			<label for="type">Game Category</label>

			<select class="form-control" id="game-type">
				<option value="LOCATION" <%= option_selected(type === "LOCATION") %>>To be played around a specific location</option>
				<option value="ANYWHERE" <%= option_selected(type === "ANYWHERE") %>>Can be played anywhere</option>
				<option value="QR"       <%= option_selected(type === "QR")       %>>Intended for play with QR Codes</option>
			</select>
		</div>


		<div class="panel panel-default">
			<div class="panel-heading">
				<h4>Map</h4>
			</div>
			<div class="panel-body">
				<div class="form-group">
					<label for="map_type">Type</label>

					<select class="form-control" id="game-map_type">
						<option value="STREET"    <%= option_selected(map_type === "STREET")    %>>Street</option>
						<option value="SATELLITE" <%= option_selected(map_type === "SATELLITE") %>>Satellite</option>
						<option value="HYBRID"    <%= option_selected(map_type === "HYBRID")    %>>Hybrid</option>
					</select>
				</div>

				<div class="form-group">
					<label for="game-map_latitude">Latitude</label>
					<input type="text" class="form-control" id="game-map_latitude" placeholder="0.0" value="<%= map_latitude %>">
				</div>

				<div class="form-group">
					<label for="game-map_longitude">Longitude</label>
					<input type="text" class="form-control" id="game-map_longitude" placeholder="0.0" value="<%= map_longitude %>">
				</div>

				<div class="form-group">
					<label for="game-map_zoom_level">Zoom</label>
					<input type="text" class="form-control" id="game-map_zoom_level" placeholder="0" value="<%= map_zoom_level %>">
				</div>

				<div class="form-group">
					<div class="checkbox">
						<label>
							<input type="checkbox" id="game-map_show_player" <%= is_checked(map_show_player) %>>
							Show Player Location Dot
						</label>
					</div>
				</div>

				<div class="form-group">
					<div class="checkbox">
						<label>
							<input type="checkbox" id="game-map_show_players" <%= is_checked(map_show_players) %>>
							Show Other Players' Locations
						</label>
					</div>
				</div>

				<div class="form-group">
					<div class="checkbox">
						<label>
							<input type="checkbox" id="game-map_offsite_mode" <%= is_checked(map_offsite_mode) %>>
							Offsite Mode (All locations temporarily infinite range)
						</label>
					</div>
					<div class="alert alert-info">
						<span class="glyphicon glyphicon-info-sign"></span>
						When checked, all locations will be accessible from anywhere on the map. Useful for off-site debugging.
					</div>
				</div>
			</div>
		</div> <!-- /map -->

		<div class="panel panel-default">
			<div class="panel-heading">
				<h4>Notebook</h4>
			</div>
			<div class="panel-body">
				<div class="form-group">
					<label>
						<input type="checkbox" id="game-notebook_allow_comments" <%= is_checked(notebook_allow_comments) %>>
						Comments Allowed
					</label>
				</div>

				<div class="form-group">
					<label>
						<input type="checkbox" id="game-notebook_allow_likes" <%= is_checked(notebook_allow_likes) %>>
						Likes Allowed
					</label>
				</div>

				<div class="form-group">
					<label>
						<input type="checkbox" id="game-notebook_allow_player_tags" <%= is_checked(notebook_allow_player_tags) %>>
						Player Created Tags Allowed
					</label>
					<div class="alert alert-info">
						<span class="glyphicon glyphicon-info-sign"></span>
						If checked, allows players to define their own labels for notes.
					</div>
				</div>
			</div>
		</div> <!-- /notebook -->


		<div class="panel panel-default">
			<div class="panel-heading">
				<h4>Player Inventory</h4>
			</div>
			<div class="panel-body">
				<div class="form-group">
					<label for="game-inventory_weight_cap">Weight Cap (0 = no weight cap)</label>
					<input type="text" class="form-control" id="game-inventory_weight_cap" placeholder="0" value="<%= inventory_weight_cap %>">
				</div>
				<div class="alert alert-info">
					<span class="glyphicon glyphicon-info-sign"></span>
					Items can be assigned a weight. Setting a cap will prevent players from holding an inventory with sum weight total greater than this cap.
				</div>
			</div>
		</div> <!-- /inventory -->


	</div> <!-- /advanced -->

	<div class="form-group">
		<button type="submit" class="btn btn-primary save">
			Save
		</button>
		<button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
	</div>
	</form>
</div>
