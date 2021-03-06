<form class="form object-editor" role="form" onsubmit="return false;">

  <h4 style="float:right; width: 3em; text-align: right; margin-top: 0;">
    <span class="object-id text-muted"><%= is_new ? "" : plaque_id %></span>
  </h4>

  <div class="form-group">
    <label for="plaque-name">Name</label>
    <input type="text" autofocus class="form-control" id="plaque-name" placeholder="Name" value="<%= name %>">
  </div>

  <div class="form-group">
    <label for="plaque-description">Text</label>
    <textarea class="form-control" id="plaque-description" rows=2 placeholder="Description"><%= description %></textarea>
  </div>

  <div class="row">
    <div class="col-xs-6 padded">
      <div class="thumbnail change-icon">
        <img src=<%= icon_thumbnail_url %>>
        <div class="caption">
          <button type="button" class="btn btn-link btn-info btn-block change-icon">
            <span class="glyphicon glyphicon-picture"></span>
            Icon
          </button>
        </div>
      </div>
    </div>

    <div class="col-xs-6 padded">
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

  <div class="form-group">
    <button type="button" class="btn btn-info btn-block edit-events">
      <span class="glyphicon glyphicon-user"></span>
        Edit Events
    </button>
  </div>

  <div class="complete-function-box">
    <label for="continue-function">Continue Button Function</label>

    <select class="form-control" id="continue-function">
      <% _.each(function_types, function(name, value) { %>
        <option value="<%= value %>" <%= option_selected(continue_function === value) %>><%= name %></option>
      <% }) %>
    </select>
  </div>

  <div style="height:20px;">
  </div>


  <button type="submit" class="btn btn-primary save">
    Save
  </button>

  <% if(!is_new) { %>
    <button type="button" class="btn btn-danger delete">
      Delete
    </button>
  <% } %>

  <button type="button" class="btn btn-default cancel" data-dismiss="modal">
    Cancel
  </button>

</form>

