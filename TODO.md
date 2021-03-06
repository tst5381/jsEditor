Approach
========

Install RequireJS, along with AMD friendly backbone, marionette, underscore, jquery, less.
(Avoid bower/jam/grunt/r.js for now)


Future security thoughts:
XSS  (others invoking code on your views)
CSRF (secret between your session and the server passed in all forms)


FLOW
----

- Application start
- Store destination url
- Check logged in cookie
- Present login OR Navigate

- Navigation triggers route
- Route triggers controller (TODO)
- Controller loads views into different parts of layout
- Views remove when needed
- Events to decouple code


TODO
----
- Remove synchronous events if possible? Let collections be referenced, and views re-drawn if things are added (which needs to be handled anyways)
- Organize view files into folders
- fix media resetting values in view due to re-render without setting the values on model
- Move trigger between scenes
- Visual helper to see active edited object/instance
- separate views that operate on two models into multiple (scene instance trigger, dialog trigger)
- object unique reference lookup (so events always trigger everywhere)
- Field validation/cleaner user errors, like password
- Remove redundant defaults/amf fields?
- Subclass views so they all inject i18n and avoid redundant requires
- Add child view event forwarding to avoid passing extra info to table rows?
- Controller to clean up view transition situations where sidebar is occupied
- Clean up 'no save' situation, ie how scene drops into view while unsaved (or have it save)
- Event decoupling for click events (to avoid calling navigate everywhere)
  (And how to do best.. events on views, on models, through vent?)
  Probably with controllers that can listen to events, and the router or the rest of the app triggers them.
- Navigation prevention (warning) on changed forms
- codeception tests and unit tests
- Form builder for rendering out all fields with i18n and bootstrap classes and validation
- _.result to clean up where hash or function returning a hash is passed to base
- Add controllers/events to remove dependencies inside the views
- Requirements editor for different objects

DOING
-----
- Select characters
- Create characters
- Listen to field changes for locations pane.
- Fix clickable region for all lists (so its the whole thing)
- non image media players
- media list of references
- fix events for tracking changes on models between the 3 main areas affected by adding plaques/items
- media show references to itself (and can remove them/add more)

JS THINGS
---------
- return false in an event is the same as event.preventDefault();
- backbone wraps all its views in DIVS. some views set tagName to style Bootstrap or avoid invalid HTML.
- return null in a map function excludes that item :(
