(function() {
  var CompositeDisposable, Disposable, MinimapGitDiff, MinimapGitDiffBinding, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Disposable = _ref.Disposable;

  MinimapGitDiffBinding = null;

  MinimapGitDiff = (function() {
    MinimapGitDiff.prototype.config = {
      useGutterDecoration: {
        type: 'boolean',
        "default": false,
        description: 'When enabled the gif diffs will be displayed as thin vertical lines on the left side of the minimap.'
      }
    };

    MinimapGitDiff.prototype.pluginActive = false;

    function MinimapGitDiff() {
      this.destroyBindings = __bind(this.destroyBindings, this);
      this.createBindings = __bind(this.createBindings, this);
      this.activateBinding = __bind(this.activateBinding, this);
      this.subscriptions = new CompositeDisposable;
    }

    MinimapGitDiff.prototype.isActive = function() {
      return this.pluginActive;
    };

    MinimapGitDiff.prototype.activate = function() {
      return this.bindings = new WeakMap;
    };

    MinimapGitDiff.prototype.consumeMinimapServiceV1 = function(minimap) {
      this.minimap = minimap;
      return this.minimap.registerPlugin('git-diff', this);
    };

    MinimapGitDiff.prototype.deactivate = function() {
      this.destroyBindings();
      return this.minimap = null;
    };

    MinimapGitDiff.prototype.activatePlugin = function() {
      var e;
      if (this.pluginActive) {
        return;
      }
      try {
        this.activateBinding();
        this.pluginActive = true;
        this.subscriptions.add(this.minimap.onDidActivate(this.activateBinding));
        return this.subscriptions.add(this.minimap.onDidDeactivate(this.destroyBindings));
      } catch (_error) {
        e = _error;
        return console.log(e);
      }
    };

    MinimapGitDiff.prototype.deactivatePlugin = function() {
      if (!this.pluginActive) {
        return;
      }
      this.pluginActive = false;
      this.subscriptions.dispose();
      return this.destroyBindings();
    };

    MinimapGitDiff.prototype.activateBinding = function() {
      if (this.getRepositories().length > 0) {
        this.createBindings();
      }
      return this.subscriptions.add(atom.project.onDidChangePaths((function(_this) {
        return function() {
          if (_this.getRepositories().length > 0) {
            return _this.createBindings();
          } else {
            return _this.destroyBindings();
          }
        };
      })(this)));
    };

    MinimapGitDiff.prototype.createBindings = function() {
      MinimapGitDiffBinding || (MinimapGitDiffBinding = require('./minimap-git-diff-binding'));
      return this.subscriptions.add(this.minimap.observeMinimaps((function(_this) {
        return function(o) {
          var binding, editor, minimap, _ref1;
          minimap = (_ref1 = o.view) != null ? _ref1 : o;
          editor = minimap.getTextEditor();
          if (editor == null) {
            return;
          }
          binding = new MinimapGitDiffBinding(minimap);
          return _this.bindings.set(minimap, binding);
        };
      })(this)));
    };

    MinimapGitDiff.prototype.getRepositories = function() {
      return atom.project.getRepositories().filter(function(repo) {
        return repo != null;
      });
    };

    MinimapGitDiff.prototype.destroyBindings = function() {
      if (!((this.minimap != null) && (this.minimap.editorsMinimaps != null))) {
        return;
      }
      return this.minimap.editorsMinimaps.forEach((function(_this) {
        return function(minimap) {
          var _ref1;
          if ((_ref1 = _this.bindings.get(minimap)) != null) {
            _ref1.destroy();
          }
          return _this.bindings["delete"](minimap);
        };
      })(this));
    };

    return MinimapGitDiff;

  })();

  module.exports = new MinimapGitDiff;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvbWluaW1hcC1naXQtZGlmZi9saWIvbWluaW1hcC1naXQtZGlmZi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNEVBQUE7SUFBQSxrRkFBQTs7QUFBQSxFQUFBLE9BQW9DLE9BQUEsQ0FBUSxNQUFSLENBQXBDLEVBQUMsMkJBQUEsbUJBQUQsRUFBc0Isa0JBQUEsVUFBdEIsQ0FBQTs7QUFBQSxFQUVBLHFCQUFBLEdBQXdCLElBRnhCLENBQUE7O0FBQUEsRUFJTTtBQUVKLDZCQUFBLE1BQUEsR0FDRTtBQUFBLE1BQUEsbUJBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEsc0dBRmI7T0FERjtLQURGLENBQUE7O0FBQUEsNkJBTUEsWUFBQSxHQUFjLEtBTmQsQ0FBQTs7QUFPYSxJQUFBLHdCQUFBLEdBQUE7QUFDWCwrREFBQSxDQUFBO0FBQUEsNkRBQUEsQ0FBQTtBQUFBLCtEQUFBLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FEVztJQUFBLENBUGI7O0FBQUEsNkJBVUEsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxhQUFKO0lBQUEsQ0FWVixDQUFBOztBQUFBLDZCQVlBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsUUFBRCxHQUFZLEdBQUEsQ0FBQSxRQURKO0lBQUEsQ0FaVixDQUFBOztBQUFBLDZCQWVBLHVCQUFBLEdBQXlCLFNBQUUsT0FBRixHQUFBO0FBQ3ZCLE1BRHdCLElBQUMsQ0FBQSxVQUFBLE9BQ3pCLENBQUE7YUFBQSxJQUFDLENBQUEsT0FBTyxDQUFDLGNBQVQsQ0FBd0Is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

//# sourceURL=/home/jakob/.atom/packages/minimap-git-diff/lib/minimap-git-diff.coffee
