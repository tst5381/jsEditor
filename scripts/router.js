define([
  'jquery',
  'underscore',
  'backbone',
  'views/login',
  'views/games_layout',
  'views/games',
  'views/migration_games',
  'views/migration_link_user',
  'views/scenes',
  'views/game_nav_menu',
  'views/locations',
  'views/quests',
  'views/media_editor',
  'views/edit_json_model',
  'views/game_editor',
  'views/editors',
  'views/game_objects_organizer',
  'views/locations_organizer',
  'views/media_organizer',
  'views/conversations',
  'views/tabs',
  'views/groups',
  'views/tags',
  'views/notes',
  'collections/migration_games',
  'collections/editors',
  'collections/game_triggers',
  'collections/notes',
  'models/game',
  'vent',
  'models/session',
  'storage',
  'newfangled/app_model',
],
function(
  $,
  _,
  Backbone,
  LoginView,
  GamesLayoutView,
  GamesView,
  MigrationGamesView,
  MigrationLinkUserView,
  ScenesView,
  GameNavMenu,
  LocationsView,
  QuestsView,
  MediaEditorView,
  EditJsonModelView,
  GameEditorView,
  EditorSharingView,
  GameObjectsOrganizerView,
  LocationsOrganizerView,
  MediaOrganizerView,
  ConversationsView,
  TabsView,
  GroupsView,
  TagsView,
  NotesView,
  MigrationGameCollection,
  EditorsCollection,
  GameTriggersCollection,
  NotesCollection,
  Game,
  vent,
  session,
  storage,
  AppModel
)
{
  return Backbone.Router.extend(
  {
    initialize:function()
    {
      this.bind('route', this._pageView);
    },

    // Hash based url tracking
    _pageView: function()
    {
      if(typeof ga != 'undefined')
      {
        var path = Backbone.history.getFragment();
        ga('send', 'pageview', {page: "/" + path})
      }
    },

    populateStorageAnd: function(game_id,callback)
    {
      AppModel.loadDataForGameId(game_id,{success:function(){console.log('succeed');},fail:function(){console.log('fail');}});

      var game = storage.games.retrieve(game_id);
      storage.for(game);

      $.when(
        game.fetch(),
        storage.groups.fetch(),
        storage.tags.fetch(),
        storage.tabs.fetch(),
        storage.scenes.fetch(),
        storage.instances.fetch(),
        storage.triggers.fetch(),
        storage.plaques.fetch(),
        storage.items.fetch(),
        storage.dialogs.fetch(),
        storage.dialog_scripts.fetch(),
        storage.dialog_options.fetch(),
        storage.dialog_characters.fetch(),
        storage.web_pages.fetch(),
        storage.event_packages.fetch(),
        storage.factories.fetch(),
        storage.media.fetch()
      ).done(
        callback()
      );
    },

    routes:
    {
      "": "listGames",
      "login": "showLogin",

      "games":                 "listGames",
      "games/:game_id/edit":   "editGame",
      "games/:game_id/share":  "editSharing",
      "games/:game_id/tabs":   "editTabs",
      "games/:game_id/groups": "editGroups",
      "games/:game_id/tags":   "editTags",
      "games/:game_id/notes":  "editNotes",

      "games/:game_id/scenes":       "showSceneEditor",
      "games/:game_id/locations":    "listLocations",
      "games/:game_id/quests":       "listQuests",
      "games/:game_id/media":        "listMedia",
      "games/:game_id/conversations":"listConversations",

      "*nomatch": function(url) { throw "Route not found: "+url; },
    },

    showLogin: function()
    {
      vent.trigger("application.show", new LoginView);
    },

    /* Game Routes ************************/

    listGames: function()
    {
      // FIXME hack to prevent clicking the logo going to blank area when database is empty
      if(!session.logged_in()) { return false; }

      var games           = storage.games;
      var migration_games = new MigrationGameCollection;

      var games_layout    = new GamesLayoutView();
      var games_view      = new GamesView({collection: games});

      vent.trigger("application.show", games_layout);

      games_layout.games.show(games_view);

      vent.trigger("application:nav:hide" );
      vent.trigger("application:info:hide");
      vent.trigger("application:list:hide");

      // Conditionally add migration table.
      var migration_list_added = false;
      migration_games.on(
        "add",
        function()
        {
          if(migration_list_added) return;

          var migrations_view = new MigrationGamesView({collection: migration_games});
          games_layout.migration_games.show(migrations_view);
          migration_list_added = true;
        }
      );

      // Conditionally add link user fields.
      migration_games.fetch(
      {
        amf_error: function(code, description)
        {
          if(code === 2)
          {
            var link_user_view = new MigrationLinkUserView();
            games_layout.migration_games.show(link_user_view);

            // Display game list once migrated
            vent.on(
              "application:user_migrated",
              function()
              {
                migration_games.fetch();

                var migrations_view = new MigrationGamesView({collection: migration_games});
                games_layout.migration_games.show(migrations_view);
                migration_list_added = true;
              }
            );
          }
        }
      });
      games.fetch();
    },

    showSceneEditor: function(game_id)
    {
      var self = this;
      self.populateStorageAnd(game_id,
        function()
        {
          var game = storage.games.retrieve(game_id);
          var intro_scene = storage.scenes.get(game.get("intro_scene_id"));

          vent.trigger("application.show",      new ScenesView  ({ model:game, collection:storage.scenes }));
          vent.trigger("application:nav:show",  new GameNavMenu ({ model:game, active:".scenes" }));
          vent.trigger("application:list:show", new GameObjectsOrganizerView({}));
          vent.trigger("application:info:hide");
        }
      );
    },

    editGame: function(game_id)
    {
      var self = this;
      self.populateStorageAnd(game_id,
        function()
        {
          var game = storage.games.retrieve(game_id);
          vent.trigger("application.show",     new GameEditorView ({model:game, scenes:storage.scenes}));
          vent.trigger("application:nav:show", new GameNavMenu    ({model:game, active:".game"}));
          vent.trigger("application:info:hide");
          vent.trigger("application:list:hide");
        }
      );
    },

    editSharing: function(game_id)
    {
      var self = this;
      self.populateStorageAnd(game_id,
        function()
        {
          var game = storage.games.retrieve(game_id);
          editors.invoke('set', 'game_id', game.id);

          vent.trigger("application.show",     new EditorSharingView ({model: game, collection: editors}));
          vent.trigger("application:nav:show", new GameNavMenu       ({model: game, active: ".game"}));
          vent.trigger("application:info:hide");
          vent.trigger("application:list:hide");
        }
      );
    },

    editTabs: function(game_id)
    {
      var self = this;
      self.populateStorageAnd(game_id,
        function()
        {
          var game = storage.games.retrieve(game_id);
          vent.trigger("application.show",     new TabsView    ({model: game, collection: storage.tabs}));
          vent.trigger("application:nav:show", new GameNavMenu ({model: game, active: ".game"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },

    editGroups: function(game_id)
    {
      var self = this;
      self.populateStorageAnd(game_id,
        function()
        {
          var game = storage.games.retrieve(game_id);
          vent.trigger("application.show",     new GroupsView  ({model: game, collection: storage.groups}));
          vent.trigger("application:nav:show", new GameNavMenu ({model: game, active: ".game"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },

    editTags: function(game_id)
    {
      var self = this;
      self.populateStorageAnd(game_id,
        function()
        {
          var game = storage.games.retrieve(game_id);
          vent.trigger("application.show",     new TagsView    ({model: game, collection: storage.tags}));
          vent.trigger("application:nav:show", new GameNavMenu ({model: game, active: ".game"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },

    editNotes: function(game_id)
    {
      var self = this;
      self.populateStorageAnd(game_id,
        function()
        {
          var game = storage.games.retrieve(game_id);
          vent.trigger("application.show",     new NotesView   ({model: game, collection: notes}));
          vent.trigger("application:nav:show", new GameNavMenu ({model: game, active: ".notes"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },

    listLocations: function(game_id)
    {
      var self = this;
      self.populateStorageAnd(game_id,
        function()
        {
          var game = storage.games.retrieve(game_id);
          var location_selection = storage.triggers.filter(function(trigger)
          {
            return trigger.get("type") === "LOCATION" && trigger.instance().get("object_type") !== "NOTE";
          });
          var locations = new GameTriggersCollection(location_selection, {parent: game});

          vent.trigger("application.show",      new LocationsView ({model: game, collection: locations}));
          vent.trigger("application:nav:show",  new GameNavMenu   ({model: game, active: ".locations"}));
          vent.trigger("application:list:show", new LocationsOrganizerView({locations: locations, instances: storage.instances}));
          vent.trigger("application:info:hide");
        }
      );
    },

    listQuests: function(game_id)
    {
      var self = this;
      self.populateStorageAnd(game_id,
        function()
        {
          var game = storage.games.retrieve(game_id);
          vent.trigger("application.show",     new QuestsView  ({model: game, collection: storage.quests}));
          vent.trigger("application:nav:show", new GameNavMenu ({model: game, active: ".quests"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },

    listMedia: function(game_id)
    {
      var self = this;
      self.populateStorageAnd(game_id,
        function()
        {
          var game = storage.games.retrieve(game_id);
          vent.trigger("application.show",      new MediaEditorView ({model: game, collection: storage.media}));
          vent.trigger("application:nav:show",  new GameNavMenu     ({model: game, active: ".media"}));
          vent.trigger("application:list:show", new MediaOrganizerView({collection: storage.media}));
          vent.trigger("application:info:hide");
        }
      );
    },

    listConversations: function(game_id)
    {
      var self = this;
      self.populateStorageAnd(game_id,
        function()
        {
          var game = storage.games.retrieve(game_id);
          vent.trigger("application.show",      new ConversationsView ({model: game, collection: storage.dialogs}));
          vent.trigger("application:nav:show",  new GameNavMenu       ({model: game, active: ".conversations"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },
  });
});

