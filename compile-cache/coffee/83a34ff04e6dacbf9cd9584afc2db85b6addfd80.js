(function() {
  var CompositeDisposable, FindAndReplace, MinimapFindAndReplaceBinding;

  CompositeDisposable = require('atom').CompositeDisposable;

  FindAndReplace = null;

  module.exports = MinimapFindAndReplaceBinding = (function() {
    function MinimapFindAndReplaceBinding(minimap, fnrAPI) {
      this.minimap = minimap;
      this.fnrAPI = fnrAPI;
      this.editor = this.minimap.getTextEditor();
      this.subscriptions = new CompositeDisposable;
      this.decorationsByMarkerId = {};
      this.subscriptionsByMarkerId = {};
      if (this.fnrAPI != null) {
        this.layer = this.fnrAPI.resultsMarkerLayerForTextEditor(this.editor);
        this.subscriptions.add(this.layer.onDidCreateMarker((function(_this) {
          return function(marker) {
            return _this.handleCreatedMarker(marker);
          };
        })(this)));
      } else {
        this.subscriptions.add(this.editor.displayBuffer.onDidCreateMarker((function(_this) {
          return function(marker) {
            return _this.handleCreatedMarker(marker);
          };
        })(this)));
      }
      this.discoverMarkers();
    }

    MinimapFindAndReplaceBinding.prototype.destroy = function() {
      var decoration, id, sub, _ref, _ref1;
      _ref = this.subscriptionsByMarkerId;
      for (id in _ref) {
        sub = _ref[id];
        sub.dispose();
      }
      _ref1 = this.decorationsByMarkerId;
      for (id in _ref1) {
        decoration = _ref1[id];
        decoration.destroy();
      }
      this.subscriptions.dispose();
      this.minimap = null;
      this.editor = null;
      this.decorationsByMarkerId = {};
      return this.subscriptionsByMarkerId = {};
    };

    MinimapFindAndReplaceBinding.prototype.clear = function() {
      var decoration, id, sub, _ref, _ref1, _results;
      _ref = this.subscriptionsByMarkerId;
      for (id in _ref) {
        sub = _ref[id];
        sub.dispose();
        delete this.subscriptionsByMarkerId[id];
      }
      _ref1 = this.decorationsByMarkerId;
      _results = [];
      for (id in _ref1) {
        decoration = _ref1[id];
        decoration.destroy();
        _results.push(delete this.decorationsByMarkerId[id]);
      }
      return _results;
    };

    MinimapFindAndReplaceBinding.prototype.findAndReplace = function() {
      return FindAndReplace != null ? FindAndReplace : FindAndReplace = atom.packages.getLoadedPackage('find-and-replace').mainModule;
    };

    MinimapFindAndReplaceBinding.prototype.discoverMarkers = function() {
      if (this.fnrAPI != null) {
        return this.layer.getMarkers().forEach((function(_this) {
          return function(marker) {
            return _this.createDecoration(marker);
          };
        })(this));
      } else {
        return this.editor.findMarkers({
          "class": 'find-result'
        }).forEach((function(_this) {
          return function(marker) {
            return _this.createDecoration(marker);
          };
        })(this));
      }
    };

    MinimapFindAndReplaceBinding.prototype.handleCreatedMarker = function(marker) {
      var _ref;
      if ((this.fnrAPI != null) || ((_ref = marker.getProperties()) != null ? _ref["class"] : void 0) === 'find-result') {
        return this.createDecoration(marker);
      }
    };

    MinimapFindAndReplaceBinding.prototype.createDecoration = function(marker) {
      var decoration, id;
      if (!this.findViewIsVisible()) {
        return;
      }
      if (this.decorationsByMarkerId[marker.id] != null) {
        return;
      }
      decoration = this.minimap.decorateMarker(marker, {
        type: 'highlight',
        scope: ".minimap .search-result",
        plugin: 'find-and-replace'
      });
      if (decoration == null) {
        return;
      }
      id = marker.id;
      this.decorationsByMarkerId[id] = decoration;
      return this.subscriptionsByMarkerId[id] = decoration.onDidDestroy((function(_this) {
        return function() {
          _this.subscriptionsByMarkerId[id].dispose();
          delete _this.decorationsByMarkerId[id];
          return delete _this.subscriptionsByMarkerId[id];
        };
      })(this));
    };

    MinimapFindAndReplaceBinding.prototype.findViewIsVisible = function() {
      var _ref, _ref1;
      return (_ref = this.findAndReplace()) != null ? (_ref1 = _ref.findView) != null ? _ref1.is(':visible') : void 0 : void 0;
    };

    return MinimapFindAndReplaceBinding;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvbWluaW1hcC1maW5kLWFuZC1yZXBsYWNlL2xpYi9taW5pbWFwLWZpbmQtYW5kLXJlcGxhY2UtYmluZGluZy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsaUVBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNBLGNBQUEsR0FBaUIsSUFEakIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDUyxJQUFBLHNDQUFFLE9BQUYsRUFBWSxNQUFaLEdBQUE7QUFDWCxNQURZLElBQUMsQ0FBQSxVQUFBLE9BQ2IsQ0FBQTtBQUFBLE1BRHNCLElBQUMsQ0FBQSxTQUFBLE1BQ3ZCLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLE9BQU8sQ0FBQyxhQUFULENBQUEsQ0FBVixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBRGpCLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxxQkFBRCxHQUF5QixFQUZ6QixDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsdUJBQUQsR0FBMkIsRUFIM0IsQ0FBQTtBQUtBLE1BQUEsSUFBRyxtQkFBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsTUFBTSxDQUFDLCtCQUFSLENBQXdDLElBQUMsQ0FBQSxNQUF6QyxDQUFULENBQUE7QUFBQSxRQUVBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFDLENBQUEsS0FBSyxDQUFDLGlCQUFQLENBQXlCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxNQUFELEdBQUE7bUJBQzFDLEtBQUMsQ0FBQSxtQkFB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

//# sourceURL=/home/jakob/.atom/packages/minimap-find-and-replace/lib/minimap-find-and-replace-binding.coffee
