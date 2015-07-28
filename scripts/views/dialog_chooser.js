define([
  'backbone',
  'text!templates/dialog_chooser.tpl',
  'models/dialog',
  'models/trigger',
  'models/instance',
  'models/media',
  'views/dialog_chooser_row',
  'views/trigger_creator',
  'vent',
],
function(
  Backbone,
  Template,
  Dialog,
  Trigger,
  Instance,
  Media,
  DialogChooserRowView,
  TriggerCreatorView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: DialogChooserRowView,
    itemViewContainer: ".dialogs",

    itemViewOptions: function(model, index)
    {
      return {
        parent: this.options.parent
      }
    },

    events: {
      "click .new-dialog": "onClickNewDialog"
    },

    /* TODO move complex sets like this into a controller */
    onClickNewDialog: function()
    {
      var dialog   = new Dialog   ({game_id: this.options.parent.get("game_id")});
      var trigger  = new Trigger  ({game_id: this.options.parent.get("game_id"),scene_id: this.options.parent.get("scene_id")});
      var instance = new Instance ({game_id: this.options.parent.get("game_id")});

      var trigger_creator = new TriggerCreatorView({scene: this.options.parent, game_object: dialog, instance: instance, model: trigger});
      vent.trigger("application:popup:show", trigger_creator, "Add Conversation to Scene");
    },

    // Marionette override
    appendBuffer: function(compositeView, buffer)
    {
      var $container = this.getItemViewContainer(compositeView);
      $container.find(".foot").before(buffer);
    },

    appendHtml: function(compositeView, itemView, index)
    {
      if (compositeView.isBuffering) {
        compositeView.elBuffer.appendChild(itemView.el);
      }
      else {
        // If we've already rendered the main collection, just
        // append the new items directly into the element.
        var $container = this.getItemViewContainer(compositeView);
        $container.find(".foot").before(itemView.el);
      }
    }

  });
});

