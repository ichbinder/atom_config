(function() {
  var CompositeDisposable, MinimapGitDiffBinding, repositoryForPath,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CompositeDisposable = require('atom').CompositeDisposable;

  repositoryForPath = require('./helpers').repositoryForPath;

  module.exports = MinimapGitDiffBinding = (function() {
    MinimapGitDiffBinding.prototype.active = false;

    function MinimapGitDiffBinding(minimap) {
      var repository;
      this.minimap = minimap;
      this.destroy = __bind(this.destroy, this);
      this.updateDiffs = __bind(this.updateDiffs, this);
      this.decorations = {};
      this.markers = null;
      this.subscriptions = new CompositeDisposable;
      if (this.minimap == null) {
        return console.warn('minimap-git-diff binding created without a minimap');
      }
      this.editor = this.minimap.getTextEditor();
      this.subscriptions.add(this.minimap.onDidDestroy(this.destroy));
      if (repository = this.getRepo()) {
        this.subscriptions.add(this.editor.getBuffer().onDidStopChanging(this.updateDiffs));
        this.subscriptions.add(repository.onDidChangeStatuses((function(_this) {
          return function() {
            return _this.scheduleUpdate();
          };
        })(this)));
        this.subscriptions.add(repository.onDidChangeStatus((function(_this) {
          return function(changedPath) {
            if (changedPath === _this.editor.getPath()) {
              return _this.scheduleUpdate();
            }
          };
        })(this)));
        this.subscriptions.add(repository.onDidDestroy((function(_this) {
          return function() {
            return _this.destroy();
          };
        })(this)));
        this.subscriptions.add(atom.config.observe('minimap-git-diff.useGutterDecoration', (function(_this) {
          return function(useGutterDecoration) {
            _this.useGutterDecoration = useGutterDecoration;
            return _this.scheduleUpdate();
          };
        })(this)));
      }
      this.scheduleUpdate();
    }

    MinimapGitDiffBinding.prototype.cancelUpdate = function() {
      return clearImmediate(this.immediateId);
    };

    MinimapGitDiffBinding.prototype.scheduleUpdate = function() {
      this.cancelUpdate();
      return this.immediateId = setImmediate(this.updateDiffs);
    };

    MinimapGitDiffBinding.prototype.updateDiffs = function() {
      this.removeDecorations();
      if (this.getPath() && (this.diffs = this.getDiffs())) {
        return this.addDecorations(this.diffs);
      }
    };

    MinimapGitDiffBinding.prototype.addDecorations = function(diffs) {
      var endRow, newLines, newStart, oldLines, oldStart, startRow, _i, _len, _ref, _results;
      _results = [];
      for (_i = 0, _len = diffs.length; _i < _len; _i++) {
        _ref = diffs[_i], oldStart = _ref.oldStart, newStart = _ref.newStart, oldLines = _ref.oldLines, newLines = _ref.newLines;
        startRow = newStart - 1;
        endRow = newStart + newLines - 2;
        if (oldLines === 0 && newLines > 0) {
          _results.push(this.markRange(startRow, endRow, '.git-line-added'));
        } else if (newLines === 0 && oldLines > 0) {
          _results.push(this.markRange(startRow, startRow, '.git-line-removed'));
        } else {
          _results.push(this.markRange(startRow, endRow, '.git-line-modified'));
        }
      }
      return _results;
    };

    MinimapGitDiffBinding.prototype.removeDecorations = function() {
      var marker, _i, _len, _ref;
      if (this.markers == null) {
        return;
      }
      _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        marker.destroy();
      }
      return this.markers = null;
    };

    MinimapGitDiffBinding.prototype.markRange = function(startRow, endRow, scope) {
      var marker, type;
      if (this.editor.isDestroyed()) {
        return;
      }
      marker = this.editor.markBufferRange([[startRow, 0], [endRow, Infinity]], {
        invalidate: 'never'
      });
      type = this.useGutterDecoration ? 'gutter' : 'line';
      this.minimap.decorateMarker(marker, {
        type: type,
        scope: ".minimap ." + type + " " + scope,
        plugin: 'git-diff'
      });
      if (this.markers == null) {
        this.markers = [];
      }
      return this.markers.push(marker);
    };

    MinimapGitDiffBinding.prototype.destroy = function() {
      this.removeDecorations();
      this.subscriptions.dispose();
      this.diffs = null;
      return this.minimap = null;
    };

    MinimapGitDiffBinding.prototype.getPath = function() {
      var _ref;
      return (_ref = this.editor.getBuffer()) != null ? _ref.getPath() : void 0;
    };

    MinimapGitDiffBinding.prototype.getRepositories = function() {
      return atom.project.getRepositories().filter(function(repo) {
        return repo != null;
      });
    };

    MinimapGitDiffBinding.prototype.getRepo = function() {
      return this.repository != null ? this.repository : this.repository = repositoryForPath(this.editor.getPath());
    };

    MinimapGitDiffBinding.prototype.getDiffs = function() {
      var e, _ref;
      try {
        return (_ref = this.getRepo()) != null ? _ref.getLineDiffs(this.getPath(), this.editor.getBuffer().getText()) : void 0;
      } catch (_error) {
        e = _error;
        return null;
      }
    };

    return MinimapGitDiffBinding;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvbWluaW1hcC1naXQtZGlmZi9saWIvbWluaW1hcC1naXQtZGlmZi1iaW5kaW5nLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw2REFBQTtJQUFBLGtGQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQyxvQkFBcUIsT0FBQSxDQUFRLFdBQVIsRUFBckIsaUJBREQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSixvQ0FBQSxNQUFBLEdBQVEsS0FBUixDQUFBOztBQUVhLElBQUEsK0JBQUUsT0FBRixHQUFBO0FBQ1gsVUFBQSxVQUFBO0FBQUEsTUFEWSxJQUFDLENBQUEsVUFBQSxPQUNiLENBQUE7QUFBQSwrQ0FBQSxDQUFBO0FBQUEsdURBQUEsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxFQUFmLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFEWCxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBRmpCLENBQUE7QUFJQSxNQUFBLElBQU8sb0JBQVA7QUFDRSxlQUFPLE9BQU8sQ0FBQyxJQUFSLENBQWEsb0RBQWIsQ0FBUCxDQURGO09BSkE7QUFBQSxNQU9BLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLE9BQU8sQ0FBQyxhQUFULENBQUEsQ0FQVixDQUFBO0FBQUEsTUFTQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULENBQXNCLElBQUMsQ0FBQSxPQUF2QixDQUFuQixDQVRBLENBQUE7QUFXQSxNQUFBLElBQUcsVUFBQSxHQUFhLElBQUMs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

//# sourceURL=/home/jakob/.atom/packages/minimap-git-diff/lib/minimap-git-diff-binding.coffee
