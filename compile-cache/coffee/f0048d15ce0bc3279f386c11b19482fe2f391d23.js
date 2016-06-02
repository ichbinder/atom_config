(function() {
  var BranchListView, DeleteBranchListView, git, notifier,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  git = require('../git');

  notifier = require('../notifier');

  BranchListView = require('./branch-list-view');

  module.exports = DeleteBranchListView = (function(_super) {
    __extends(DeleteBranchListView, _super);

    function DeleteBranchListView() {
      return DeleteBranchListView.__super__.constructor.apply(this, arguments);
    }

    DeleteBranchListView.prototype.initialize = function(repo, data, _arg) {
      this.repo = repo;
      this.data = data;
      this.isRemote = (_arg != null ? _arg : {}).isRemote;
      return DeleteBranchListView.__super__.initialize.apply(this, arguments);
    };

    DeleteBranchListView.prototype.confirmed = function(_arg) {
      var branch, name, remote;
      name = _arg.name;
      if (name.startsWith("*")) {
        name = name.slice(1);
      }
      if (!this.isRemote) {
        this["delete"](name);
      } else {
        branch = name.substring(name.indexOf('/') + 1);
        remote = name.substring(0, name.indexOf('/'));
        this["delete"](branch, remote);
      }
      return this.cancel();
    };

    DeleteBranchListView.prototype["delete"] = function(branch, remote) {
      var args;
      args = remote ? ['push', remote, '--delete'] : ['branch', '-D'];
      return git.cmd(args.concat(branch), {
        cwd: this.repo.getWorkingDirectory()
      }).then(function(message) {
        return notifier.addSuccess(message);
      })["catch"](function(error) {
        return notifier.addError(error);
      });
    };

    return DeleteBranchListView;

  })(BranchListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL3ZpZXdzL2RlbGV0ZS1icmFuY2gtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsbURBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUFOLENBQUE7O0FBQUEsRUFDQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FEWCxDQUFBOztBQUFBLEVBRUEsY0FBQSxHQUFpQixPQUFBLENBQVEsb0JBQVIsQ0FGakIsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBRVE7QUFDSiwyQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsbUNBQUEsVUFBQSxHQUFZLFNBQUUsSUFBRixFQUFTLElBQVQsRUFBZSxJQUFmLEdBQUE7QUFBa0MsTUFBakMsSUFBQyxDQUFBLE9BQUEsSUFBZ0MsQ0FBQTtBQUFBLE1BQTFCLElBQUMsQ0FBQSxPQUFBLElBQXlCLENBQUE7QUFBQSxNQUFsQixJQUFDLENBQUEsMkJBQUYsT0FBWSxJQUFWLFFBQWlCLENBQUE7YUFBQSxzREFBQSxTQUFBLEVBQWxDO0lBQUEsQ0FBWixDQUFBOztBQUFBLG1DQUVBLFNBQUEsR0FBVyxTQUFDLElBQUQsR0FBQTtBQUNULFVBQUEsb0JBQUE7QUFBQSxNQURXLE9BQUQsS0FBQyxJQUNYLENBQUE7QUFBQSxNQUFBLElBQXdCLElBQUksQ0FBQyxVQUFMLENBQWdCLEdBQWhCLENBQXhCO0FBQUEsUUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFYLENBQVAsQ0FBQTtPQUFBO0FBQ0EsTUFBQSxJQUFBLENBQUEsSUFBUSxDQUFBLFFBQVI7QUFDRSxRQUFBLElBQUMsQ0FBQSxRQUFBLENBQUQsQ0FBUSxJQUFSLENBQUEsQ0FERjtPQUFBLE1BQUE7QUFHRSxRQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBTCxDQUFlLElBQUksQ0FBQyxPQUFMLENBQWEsR0FBYixDQUFBLEdBQW9CLENBQW5DLENBQVQsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFMLENBQWUsQ0FBZixFQUFrQixJQUFJLENBQUMsT0FBTCxDQUFhLEdBQWIsQ0FBbEIsQ0FEVCxDQUFBO0FBQUEsUUFFQSxJQUFDLENBQUEsUUFBQSxDQUFELENBQVEsTUFBUixFQUFnQixNQUFoQixDQUZBLENBSEY7T0FEQTthQU9BLElBQUMsQ0FBQSxNQUFELENBQUEsRUFSUztJQUFBLENBRlgsQ0FBQTs7QUFBQSxtQ0FZQSxTQUFBLEdBQVEsU0FBQyxNQUFELEVBQVMsTUFBVCxHQUFBO0FBQ04sVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFBLEdBQVUsTUFBSCxHQUFlLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsVUFBakIsQ0FBZixHQUFpRCxDQUFDLFFBQUQsRUFBVyxJQUFYLENBQXhELENBQUE7YUFDQSxHQUFHLENBQUMsR0FBSixDQUFRLElBQUksQ0FBQyxNQUFMLENBQVksTUFBWixDQUFSLEVBQTZCO0FBQUEsUUFBQSxHQUFBLEVBQUssSUFBQyxDQUFBLElBQUksQ0FBQyxtQkFBTixDQUFBLENBQUw7T0FBN0IsQ0FDQSxDQUFDLElBREQsQ0FDTSxTQUFDLE9BQUQsR0FBQTtlQUFhLFFBQVEsQ0FBQyxVQUFULENBQW9CLE9BQXBCLEVBQWI7TUFBQSxDQUROLENBRUEsQ0FBQyxPQUFELENBRkEsQ0FFTyxTQUFDLEtBQUQsR0FBQTtlQUFXLFFBQVEsQ0FBQyxRQUFULENBQWtCLEtBQWxCLEVBQVg7TUFBQSxDQUZQLEVBRk07SUFBQSxDQVpSLENBQUE7O2dDQUFBOztLQURpQyxlQU5yQyxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/views/delete-branch-view.coffee
