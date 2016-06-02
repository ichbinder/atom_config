(function() {
  var CompositeDisposable, MinimapFindAndReplaceBinding;

  CompositeDisposable = require('atom').CompositeDisposable;

  MinimapFindAndReplaceBinding = null;

  module.exports = {
    active: false,
    bindingsById: {},
    subscriptionsById: {},
    isActive: function() {
      return this.active;
    },
    activate: function(state) {
      return this.subscriptions = new CompositeDisposable;
    },
    consumeMinimapServiceV1: function(minimap) {
      this.minimap = minimap;
      return this.minimap.registerPlugin('find-and-replace', this);
    },
    deactivate: function() {
      this.minimap.unregisterPlugin('find-and-replace');
      return this.minimap = null;
    },
    activatePlugin: function() {
      var fnrHasServiceAPI, fnrVersion;
      if (this.active) {
        return;
      }
      this.active = true;
      fnrVersion = atom.packages.getLoadedPackage('find-and-replace').metadata.version;
      fnrHasServiceAPI = parseFloat(fnrVersion) >= 0.194;
      if (fnrHasServiceAPI) {
        this.initializeServiceAPI();
      } else {
        this.initializeLegacyAPI();
      }
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'find-and-replace:show': (function(_this) {
          return function() {
            return _this.discoverMarkers();
          };
        })(this),
        'find-and-replace:toggle': (function(_this) {
          return function() {
            return _this.discoverMarkers();
          };
        })(this),
        'find-and-replace:show-replace': (function(_this) {
          return function() {
            return _this.discoverMarkers();
          };
        })(this),
        'core:cancel': (function(_this) {
          return function() {
            return _this.clearBindings();
          };
        })(this),
        'core:close': (function(_this) {
          return function() {
            return _this.clearBindings();
          };
        })(this)
      }));
    },
    initializeServiceAPI: function() {
      return atom.packages.serviceHub.consume('find-and-replace', '0.0.1', (function(_this) {
        return function(fnr) {
          return _this.subscriptions.add(_this.minimap.observeMinimaps(function(minimap) {
            var binding, id;
            if (MinimapFindAndReplaceBinding == null) {
              MinimapFindAndReplaceBinding = require('./minimap-find-and-replace-binding');
            }
            id = minimap.id;
            binding = new MinimapFindAndReplaceBinding(minimap, fnr);
            _this.bindingsById[id] = binding;
            return _this.subscriptionsById[id] = minimap.onDidDestroy(function() {
              var _ref, _ref1;
              if ((_ref = _this.subscriptionsById[id]) != null) {
                _ref.dispose();
              }
              if ((_ref1 = _this.bindingsById[id]) != null) {
                _ref1.destroy();
              }
              delete _this.bindingsById[id];
              return delete _this.subscriptionsById[id];
            });
          }));
        };
      })(this));
    },
    initializeLegacyAPI: function() {
      return this.subscriptions.add(this.minimap.observeMinimaps((function(_this) {
        return function(minimap) {
          var binding, id;
          if (MinimapFindAndReplaceBinding == null) {
            MinimapFindAndReplaceBinding = require('./minimap-find-and-replace-binding');
          }
          id = minimap.id;
          binding = new MinimapFindAndReplaceBinding(minimap);
          _this.bindingsById[id] = binding;
          return _this.subscriptionsById[id] = minimap.onDidDestroy(function() {
            var _ref, _ref1;
            if ((_ref = _this.subscriptionsById[id]) != null) {
              _ref.dispose();
            }
            if ((_ref1 = _this.bindingsById[id]) != null) {
              _ref1.destroy();
            }
            delete _this.bindingsById[id];
            return delete _this.subscriptionsById[id];
          });
        };
      })(this)));
    },
    deactivatePlugin: function() {
      var binding, id, sub, _ref, _ref1;
      if (!this.active) {
        return;
      }
      this.active = false;
      this.subscriptions.dispose();
      _ref = this.subscriptionsById;
      for (id in _ref) {
        sub = _ref[id];
        sub.dispose();
      }
      _ref1 = this.bindingsById;
      for (id in _ref1) {
        binding = _ref1[id];
        binding.destroy();
      }
      this.bindingsById = {};
      return this.subscriptionsById = {};
    },
    discoverMarkers: function() {
      var binding, id, _ref, _results;
      _ref = this.bindingsById;
      _results = [];
      for (id in _ref) {
        binding = _ref[id];
        _results.push(binding.discoverMarkers());
      }
      return _results;
    },
    clearBindings: function() {
      var binding, id, _ref, _results;
      _ref = this.bindingsById;
      _results = [];
      for (id in _ref) {
        binding = _ref[id];
        _results.push(binding.clear());
      }
      return _results;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvbWluaW1hcC1maW5kLWFuZC1yZXBsYWNlL2xpYi9taW5pbWFwLWZpbmQtYW5kLXJlcGxhY2UuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlEQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSw0QkFBQSxHQUErQixJQUQvQixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUFRLEtBQVI7QUFBQSxJQUNBLFlBQUEsRUFBYyxFQURkO0FBQUEsSUFFQSxpQkFBQSxFQUFtQixFQUZuQjtBQUFBLElBSUEsUUFBQSxFQUFVLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxPQUFKO0lBQUEsQ0FKVjtBQUFBLElBTUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG9CQURUO0lBQUEsQ0FOVjtBQUFBLElBU0EsdUJBQUEsRUFBeUIsU0FBRSxPQUFGLEdBQUE7QUFDdkIsTUFEd0IsSUFBQyxDQUFBLFVBQUEsT0FDekIsQ0FBQTthQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsY0FBVCxDQUF3QixrQkFBeEIsRUFBNEMsSUFBNUMsRUFEdUI7SUFBQSxDQVR6QjtBQUFBLElBWUEsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxnQkFBVCxDQUEwQixrQkFBMUIsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxLQUZEO0lBQUEsQ0FaWjtBQUFBLElBZ0JBLGNBQUEsRUFBZ0IsU0FBQSxHQUFBO0FBQ2QsVUFBQSw0QkFBQTtBQUFBLE1BQUEsSUFBVSxJQUFD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

//# sourceURL=/home/jakob/.atom/packages/minimap-find-and-replace/lib/minimap-find-and-replace.coffee
