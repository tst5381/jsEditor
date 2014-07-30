<% if(!in_modal) { %>
	<h4>WebPage Trigger <span class="object-id text-muted"><%= is_new ? "" : web_page_id %></span></h4>
	<h5><%= name %></h5>
<% } %>

<form class="form" role="form" onsubmit="return false;">
<% if(visible_fields === "create_web_page_with_trigger" ) { %>

<!-- WebPage attributes -->

<div class="form-group">
	<label class="sr-only" for="web_page-name">WebPage Name</label>
	<input type="text" autofocus class="form-control" id="web_page-name" placeholder="Enter Name" value="<%= name %>">
</div>

<% } %>


<% if(visible_fields === "trigger") { %>

<!-- Edit Object -->

<div class="form-group">
	<button type="button" class="btn btn-primary btn-block edit-web_page">
		<span class="glyphicon glyphicon-globe"></span>
		Edit WebPage
	</button>
</div>

<!-- Edit Requirements -->

<div class="form-group">
	<button type="button" class="btn btn-info btn-block edit-requirements" disabled>
		<span class="glyphicon glyphicon-ok"></span>
		Edit Requirements
	</button>
</div>

<!-- Trigger Attributes -->

<div class="btn-group btn-group-sm btn-group-justified trigger-types">
	<label class="btn btn-info">
		<input type="radio" name="trigger-type" value="LOCATION"  <%= radio_selected(type === "LOCATION") %>>
		<span class="glyphicon glyphicon-map-marker"></span>
		Location
	</label>
	<label class="btn btn-info">
		<input type="radio" name="trigger-type" value="QR"        <%= radio_selected(type === "QR") %>>
		<span class="glyphicon glyphicon-qrcode"></span>
		QR Code
	</label>
	<label class="btn btn-info">
		<input type="radio" name="trigger-type" value="IMMEDIATE" <%= radio_selected(type === "IMMEDIATE") %>>
		<span class="glyphicon glyphicon-flash"></span>
		Immediate
	</label>
</div>

<br/>

<!-- Trigger by Location Attributes -->

<div id="LOCATION-fields" class="type-trigger-tab">

	<div class="map-canvas" style="height: 150px; width: 100%"></div>

	<br>

	<div class="form-group">
		<label for="trigger-title">Map Title</label>
		<input type="text" class="form-control" id="trigger-title" placeholder="Title" value="<%= title %>">
	</div>

	<div class="checkbox">
		<label>
			<input type="checkbox" id="trigger-show_title" <%= is_checked(show_title) %>>
			Show Title
		</label>
	</div>

	<div class="checkbox">
		<label>
			<input type="checkbox" id="trigger-wiggle" <%= is_checked(wiggle) %>>
			Animate Icon on Map
		</label>
	</div>

	<!-- Icon Selector -->
	<div class="form-group">
		<label for="item-description">Icon</label>
		<img src=<%= icon_thumbnail_url %>>
		<button type="button" class="btn btn-info change-icon">
			Select Icon
		</button>
	</div>


	<div class="form-group">
		<label>
			When in range, trigger:
		</label>
		<div class="btn-group btn-group-sm btn-group-justified trigger-trigger_on_enter">
			<label class="btn btn-info">
				<input type="radio" name="trigger-trigger_on_enter" value="1" <%= radio_selected(trigger_on_enter === "1") %>>
				<span class="glyphicon glyphicon-flash"></span>
				Immediately
			</label>
			<label class="btn btn-info">
				<input type="radio" name="trigger-trigger_on_enter" value="0" <%= radio_selected(trigger_on_enter === "0") %>>
				<span class="glyphicon glyphicon-hand-up"></span>
				By Touch
			</label>
		</div>
	</div>

	<div id="1-fields" class="enter-trigger-tab">
		<div class="checkbox">
			<label>
				<input type="checkbox" id="trigger-hidden" <%= is_checked(hidden) %>>
				Hidden from Map on Client
			</label>
		</div>
	</div>
</div>


<!-- Trigger by Code Attributes -->

<div id="QR-fields" class="type-trigger-tab">
	<div class="form-group">
		<label for="trigger-code">QR Code</label>
		<input type="text" class="form-control" id="trigger-code" placeholder="QR Code" value="<%= code %>">
		<div class="qr_image"></div>
	</div>
</div>


<!-- Trigger Immediate Attributes -->

<div id="IMMEDIATE-fields" class="type-trigger-tab">
	<div class="alert alert-info">
		<span class="glyphicon glyphicon-info-sign"></span>
		Will be triggered immediately when requirements are satisfied.
	</div>
</div>

<% } %> <!-- if visible fields == trigger -->

<!-- create vs update -->

<div class="form-group">
	<button type="submit" class="btn btn-primary save">
		Save
	</button>
	<% if(!is_new) { %>
		<button type="button" class="btn btn-danger delete">Delete</button>
	<% } %>
	<button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
</div>
</form>