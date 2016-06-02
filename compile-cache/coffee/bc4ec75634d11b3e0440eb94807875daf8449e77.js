(function() {
  var $, BranchListView, CompositeDisposable, InputView, RemoteBranchListView, TextEditorView, View, git, notifier, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  _ref = require('atom-space-pen-views'), $ = _ref.$, TextEditorView = _ref.TextEditorView, View = _ref.View;

  git = require('../git');

  notifier = require('../notifier');

  BranchListView = require('../views/branch-list-view');

  RemoteBranchListView = require('../views/remote-branch-list-view');

  InputView = (function(_super) {
    __extends(InputView, _super);

    function InputView() {
      return InputView.__super__.constructor.apply(this, arguments);
    }

    InputView.content = function() {
      return this.div((function(_this) {
        return function() {
          return _this.subview('branchEditor', new TextEditorView({
            mini: true,
            placeholderText: 'New branch name'
          }));
        };
      })(this));
    };

    InputView.prototype.initialize = function(repo) {
      this.repo = repo;
      this.disposables = new CompositeDisposable;
      this.currentPane = atom.workspace.getActivePane();
      this.panel = atom.workspace.addModalPanel({
        item: this
      });
      this.panel.show();
      this.branchEditor.focus();
      this.disposables.add(atom.commands.add('atom-text-editor', {
        'core:cancel': (function(_this) {
          return function(event) {
            return _this.destroy();
          };
        })(this)
      }));
      return this.disposables.add(atom.commands.add('atom-text-editor', {
        'core:confirm': (function(_this) {
          return function(event) {
            return _this.createBranch();
          };
        })(this)
      }));
    };

    InputView.prototype.destroy = function() {
      this.panel.destroy();
      this.disposables.dispose();
      return this.currentPane.activate();
    };

    InputView.prototype.createBranch = function() {
      var name;
      this.destroy();
      name = this.branchEditor.getModel().getText();
      if (name.length > 0) {
        return git.cmd(['checkout', '-b', name], {
          cwd: this.repo.getWorkingDirectory()
        }).then(function(message) {
          notifier.addSuccess(message);
          return git.refresh();
        })["catch"]((function(_this) {
          return function(err) {
            return notifier.addError(err);
          };
        })(this));
      }
    };

    return InputView;

  })(View);

  module.exports.newBranch = function(repo) {
    return new InputView(repo);
  };

  module.exports.gitBranches = function(repo) {
    return git.cmd(['branch'], {
      cwd: repo.getWorkingDirectory()
    }).then(function(data) {
      return new BranchListView(repo, data);
    });
  };

  module.exports.gitRemoteBranches = function(repo) {
    return git.cmd(['branch', '-r'], {
      cwd: repo.getWorkingDirectory()
    }).then(function(data) {
      return new RemoteBranchListView(repo, data);
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL21vZGVscy9naXQtYnJhbmNoLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxrSEFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxPQUE0QixPQUFBLENBQVEsc0JBQVIsQ0FBNUIsRUFBQyxTQUFBLENBQUQsRUFBSSxzQkFBQSxjQUFKLEVBQW9CLFlBQUEsSUFEcEIsQ0FBQTs7QUFBQSxFQUdBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUhOLENBQUE7O0FBQUEsRUFJQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FKWCxDQUFBOztBQUFBLEVBS0EsY0FBQSxHQUFpQixPQUFBLENBQVEsMkJBQVIsQ0FMakIsQ0FBQTs7QUFBQSxFQU1BLG9CQUFBLEdBQXVCLE9BQUEsQ0FBUSxrQ0FBUixDQU52QixDQUFBOztBQUFBLEVBUU07QUFDSixnQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxTQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUssQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDSCxLQUFDLENBQUEsT0FBRCxDQUFTLGNBQVQsRUFBNkIsSUFBQSxjQUFBLENBQWU7QUFBQSxZQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsWUFBWSxlQUFBLEVBQWlCLGlCQUE3QjtXQUFmLENBQTdCLEVBREc7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFMLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsd0JBSUEsVUFBQSxHQUFZLFNBQUUsSUFBRixHQUFBO0FBQ1YsTUFE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

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/models/git-branch.coffee
