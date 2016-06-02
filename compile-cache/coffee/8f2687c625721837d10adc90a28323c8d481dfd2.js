(function() {
  var BranchListView, OutputViewManager, PullBranchListView, git, notifier,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  git = require('../git');

  OutputViewManager = require('../output-view-manager');

  notifier = require('../notifier');

  BranchListView = require('./branch-list-view');

  module.exports = PullBranchListView = (function(_super) {
    __extends(PullBranchListView, _super);

    function PullBranchListView() {
      return PullBranchListView.__super__.constructor.apply(this, arguments);
    }

    PullBranchListView.prototype.initialize = function(repo, data, remote, extraArgs) {
      this.repo = repo;
      this.data = data;
      this.remote = remote;
      this.extraArgs = extraArgs;
      PullBranchListView.__super__.initialize.apply(this, arguments);
      return this.result = new Promise((function(_this) {
        return function(resolve, reject) {
          _this.resolve = resolve;
          return _this.reject = reject;
        };
      })(this));
    };

    PullBranchListView.prototype.parseData = function() {
      var branches, currentBranch, items;
      this.currentBranchString = '== Current ==';
      currentBranch = {
        name: this.currentBranchString
      };
      items = this.data.split("\n");
      branches = items.filter(function(item) {
        return item !== '';
      }).map(function(item) {
        return {
          name: item.replace(/\s/g, '')
        };
      });
      if (branches.length === 1) {
        this.confirmed(branches[0]);
      } else {
        this.setItems([currentBranch].concat(branches));
      }
      return this.focusFilterEditor();
    };

    PullBranchListView.prototype.confirmed = function(_arg) {
      var name;
      name = _arg.name;
      if (name === this.currentBranchString) {
        this.pull();
      } else {
        this.pull(name.substring(name.indexOf('/') + 1));
      }
      return this.cancel();
    };

    PullBranchListView.prototype.pull = function(remoteBranch) {
      var args, startMessage, view;
      if (remoteBranch == null) {
        remoteBranch = '';
      }
      view = OutputViewManager["new"]();
      startMessage = notifier.addInfo("Pulling...", {
        dismissable: true
      });
      args = ['pull'].concat(this.extraArgs, this.remote, remoteBranch).filter(function(arg) {
        return arg !== '';
      });
      return git.cmd(args, {
        cwd: this.repo.getWorkingDirectory()
      }).then((function(_this) {
        return function(data) {
          _this.resolve();
          view.addLine(data).finish();
          return startMessage.dismiss();
        };
      })(this))["catch"]((function(_this) {
        return function(error) {
          view.addLine(error).finish();
          return startMessage.dismiss();
        };
      })(this));
    };

    return PullBranchListView;

  })(BranchListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL3ZpZXdzL3B1bGwtYnJhbmNoLWxpc3Qtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsb0VBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUFOLENBQUE7O0FBQUEsRUFDQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsd0JBQVIsQ0FEcEIsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsR0FBVyxPQUFBLENBQVEsYUFBUixDQUZYLENBQUE7O0FBQUEsRUFHQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxvQkFBUixDQUhqQixDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FHUTtBQUNKLHlDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxpQ0FBQSxVQUFBLEdBQVksU0FBRSxJQUFGLEVBQVMsSUFBVCxFQUFnQixNQUFoQixFQUF5QixTQUF6QixHQUFBO0FBQ1YsTUFEVyxJQUFDLENBQUEsT0FBQSxJQUNaLENBQUE7QUFBQSxNQURrQixJQUFDLENBQUEsT0FBQSxJQUNuQixDQUFBO0FBQUEsTUFEeUIsSUFBQyxDQUFBLFNBQUEsTUFDMUIsQ0FBQTtBQUFBLE1BRGtDLElBQUMsQ0FBQSxZQUFBLFNBQ25DLENBQUE7QUFBQSxNQUFBLG9EQUFBLFNBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLE9BQUEsQ0FBUSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxPQUFELEVBQVUsTUFBVixHQUFBO0FBQ3BCLFVBQUEsS0FBQyxDQUFBLE9BQUQsR0FBVyxPQUFYLENBQUE7aUJBQ0EsS0FBQyxDQUFBLE1BQUQsR0FBVSxPQUZVO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFB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

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/views/pull-branch-list-view.coffee
