(function() {
  var $, $$, BranchDialog, BranchView, CommitDialog, ConfirmDialog, DeleteDialog, DiffView, FileView, FlowDialog, GitControlView, LogView, MenuView, MergeDialog, ProjectDialog, PushDialog, View, git, gitWorkspaceTitle, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), View = _ref.View, $ = _ref.$, $$ = _ref.$$;

  git = require('./git');

  BranchView = require('./views/branch-view');

  DiffView = require('./views/diff-view');

  FileView = require('./views/file-view');

  LogView = require('./views/log-view');

  MenuView = require('./views/menu-view');

  ProjectDialog = require('./dialogs/project-dialog');

  BranchDialog = require('./dialogs/branch-dialog');

  CommitDialog = require('./dialogs/commit-dialog');

  ConfirmDialog = require('./dialogs/confirm-dialog');

  DeleteDialog = require('./dialogs/delete-dialog');

  MergeDialog = require('./dialogs/merge-dialog');

  FlowDialog = require('./dialogs/flow-dialog');

  PushDialog = require('./dialogs/push-dialog');

  gitWorkspaceTitle = '';

  module.exports = GitControlView = (function(_super) {
    __extends(GitControlView, _super);

    function GitControlView() {
      this.flow = __bind(this.flow, this);
      this.merge = __bind(this.merge, this);
      return GitControlView.__super__.constructor.apply(this, arguments);
    }

    GitControlView.content = function() {
      if (git.isInitialised()) {
        return this.div({
          "class": 'git-control'
        }, (function(_this) {
          return function() {
            _this.subview('menuView', new MenuView());
            _this.div({
              "class": 'content',
              outlet: 'contentView'
            }, function() {
              _this.div({
                "class": 'sidebar'
              }, function() {
                _this.subview('filesView', new FileView());
                _this.subview('localBranchView', new BranchView({
                  name: 'Local',
                  local: true
                }));
                return _this.subview('remoteBranchView', new BranchView({
                  name: 'Remote'
                }));
              });
              _this.div({
                "class": 'domain'
              }, function() {
                return _this.subview('diffView', new DiffView());
              });
              _this.subview('projectDialog', new ProjectDialog());
              _this.subview('branchDialog', new BranchDialog());
              _this.subview('commitDialog', new CommitDialog());
              _this.subview('mergeDialog', new MergeDialog());
              _this.subview('flowDialog', new FlowDialog());
              return _this.subview('pushDialog', new PushDialog());
            });
            return _this.subview('logView', new LogView());
          };
        })(this));
      } else {
        return this.div({
          "class": 'git-control'
        }, (function(_this) {
          return function() {
            return _this.subview('logView', new LogView());
          };
        })(this));
      }
    };

    GitControlView.prototype.serialize = function() {};

    GitControlView.prototype.initialize = function() {
      console.log('GitControlView: initialize');
      git.setLogger((function(_this) {
        return function(log, iserror) {
          return _this.logView.log(log, iserror);
        };
      })(this));
      this.active = true;
      this.branchSelected = null;
      if (!git.isInitialised()) {
        git.alert("> This project is not a git repository. Either open another project or create a repository.");
      } else {
        this.setWorkspaceTitle(git.getRepository().path.split('/').reverse()[1]);
      }
      this.update(true);
    };

    GitControlView.prototype.destroy = function() {
      console.log('GitControlView: destroy');
      this.active = false;
    };

    GitControlView.prototype.setWorkspaceTitle = function(title) {
      return gitWorkspaceTitle = title;
    };

    GitControlView.prototype.getTitle = function() {
      return 'git:control';
    };

    GitControlView.prototype.update = function(nofetch) {
      if (git.isInitialised()) {
        this.loadBranches();
        this.showStatus();
        this.filesView.setWorkspaceTitle(gitWorkspaceTitle);
        if (!nofetch) {
          this.fetchMenuClick();
          if (this.diffView) {
            this.diffView.clearAll();
          }
        }
      }
    };

    GitControlView.prototype.loadLog = function() {
      git.log(this.selectedBranch).then(function(logs) {
        console.log('git.log', logs);
      });
    };

    GitControlView.prototype.checkoutBranch = function(branch, remote) {
      git.checkout(branch, remote).then((function(_this) {
        return function() {
          return _this.update();
        };
      })(this));
    };

    GitControlView.prototype.branchCount = function(count) {
      var remotes;
      if (git.isInitialised()) {
        remotes = git.hasOrigin();
        this.menuView.activate('upstream', remotes && count.behind);
        this.menuView.activate('downstream', remotes && (count.ahead || !git.getRemoteBranch()));
        this.menuView.activate('remote', remotes);
      }
    };

    GitControlView.prototype.loadBranches = function() {
      if (git.isInitialised()) {
        this.selectedBranch = git.getLocalBranch();
        git.getBranches().then((function(_this) {
          return function(branches) {
            _this.branches = branches;
            _this.remoteBranchView.addAll(branches.remote);
            _this.localBranchView.addAll(branches.local, true);
          };
        })(this));
      }
    };

    GitControlView.prototype.showSelectedFiles = function() {
      this.menuView.activate('file', this.filesView.hasSelected());
      this.menuView.activate('file.merging', this.filesView.hasSelected() || git.isMerging());
    };

    GitControlView.prototype.showStatus = function() {
      git.status().then((function(_this) {
        return function(files) {
          _this.filesView.addAll(files);
        };
      })(this));
    };

    GitControlView.prototype.projectMenuClick = function() {
      this.projectDialog.activate();
    };

    GitControlView.prototype.branchMenuClick = function() {
      this.branchDialog.activate();
    };

    GitControlView.prototype.compareMenuClick = function() {
      git.diff(this.filesView.getSelected().all.join(' ')).then((function(_this) {
        return function(diffs) {
          return _this.diffView.addAll(diffs);
        };
      })(this));
    };

    GitControlView.prototype.commitMenuClick = function() {
      if (!(this.filesView.hasSelected() || git.isMerging())) {
        return;
      }
      this.commitDialog.activate();
    };

    GitControlView.prototype.commit = function() {
      var files, msg;
      if (!this.filesView.hasSelected()) {
        return;
      }
      msg = this.commitDialog.getMessage();
      files = this.filesView.getSelected();
      this.filesView.unselectAll();
      git.add(files.add).then(function() {
        return git.remove(files.rem);
      }).then(function() {
        return git.commit(msg);
      }).then((function(_this) {
        return function() {
          return _this.update();
        };
      })(this));
    };

    GitControlView.prototype.createBranch = function(branch) {
      git.createBranch(branch).then((function(_this) {
        return function() {
          return _this.update();
        };
      })(this));
    };

    GitControlView.prototype.deleteBranch = function(branch) {
      var confirmCb, forceDeleteCallback;
      confirmCb = (function(_this) {
        return function(params) {
          git.deleteBranch(params.branch).then(function() {
            return _this.update();
          });
        };
      })(this);
      forceDeleteCallback = (function(_this) {
        return function(params) {
          return git.forceDeleteBranch(params.branch).then(function() {
            return _this.update();
          });
        };
      })(this);
      this.contentView.append(new DeleteDialog({
        hdr: 'Delete Branch',
        msg: "Are you sure you want to delete the local branch '" + branch + "'?",
        cb: confirmCb,
        fdCb: forceDeleteCallback,
        branch: branch
      }));
    };

    GitControlView.prototype.fetchMenuClick = function() {
      if (git.isInitialised()) {
        if (!git.hasOrigin()) {
          return;
        }
      }
      git.fetch().then((function(_this) {
        return function() {
          return _this.loadBranches();
        };
      })(this));
    };

    GitControlView.prototype.mergeMenuClick = function() {
      this.mergeDialog.activate(this.branches.local);
    };

    GitControlView.prototype.merge = function(branch, noff) {
      git.merge(branch, noff).then((function(_this) {
        return function() {
          return _this.update();
        };
      })(this));
    };

    GitControlView.prototype.flowMenuClick = function() {
      this.flowDialog.activate(this.branches.local);
    };

    GitControlView.prototype.flow = function(type, action, branch) {
      git.flow(type, action, branch).then((function(_this) {
        return function() {
          return _this.update();
        };
      })(this));
    };

    GitControlView.prototype.pullMenuClick = function() {
      git.pull().then((function(_this) {
        return function() {
          return _this.update(true);
        };
      })(this));
    };

    GitControlView.prototype.pullupMenuClick = function() {
      git.pullup().then((function(_this) {
        return function() {
          return _this.update(true);
        };
      })(this));
    };

    GitControlView.prototype.pushMenuClick = function() {
      git.getBranches().then((function(_this) {
        return function(branches) {
          return _this.pushDialog.activate(branches.remote);
        };
      })(this));
    };

    GitControlView.prototype.push = function(remote, branches) {
      return git.push(remote, branches).then((function(_this) {
        return function() {
          return _this.update();
        };
      })(this));
    };

    GitControlView.prototype.resetMenuClick = function() {
      var files;
      if (!this.filesView.hasSelected()) {
        return;
      }
      files = this.filesView.getSelected();
      return atom.confirm({
        message: "Reset will erase changes since the last commit in the selected files. Are you sure?",
        buttons: {
          Cancel: (function(_this) {
            return function() {};
          })(this),
          Reset: (function(_this) {
            return function() {
              git.reset(files.all).then(function() {
                return _this.update();
              });
            };
          })(this)
        }
      });
    };

    return GitControlView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LWNvbnRyb2wvbGliL2dpdC1jb250cm9sLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlOQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBZ0IsT0FBQSxDQUFRLHNCQUFSLENBQWhCLEVBQUMsWUFBQSxJQUFELEVBQU8sU0FBQSxDQUFQLEVBQVUsVUFBQSxFQUFWLENBQUE7O0FBQUEsRUFFQSxHQUFBLEdBQU0sT0FBQSxDQUFRLE9BQVIsQ0FGTixDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUixDQUpiLENBQUE7O0FBQUEsRUFLQSxRQUFBLEdBQVcsT0FBQSxDQUFRLG1CQUFSLENBTFgsQ0FBQTs7QUFBQSxFQU1BLFFBQUEsR0FBVyxPQUFBLENBQVEsbUJBQVIsQ0FOWCxDQUFBOztBQUFBLEVBT0EsT0FBQSxHQUFVLE9BQUEsQ0FBUSxrQkFBUixDQVBWLENBQUE7O0FBQUEsRUFRQSxRQUFBLEdBQVcsT0FBQSxDQUFRLG1CQUFSLENBUlgsQ0FBQTs7QUFBQSxFQVVBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLDBCQUFSLENBVmhCLENBQUE7O0FBQUEsRUFXQSxZQUFBLEdBQWUsT0FBQSxDQUFRLHlCQUFSLENBWGYsQ0FBQTs7QUFBQSxFQVlBLFlBQUEsR0FBZSxPQUFBLENBQVEseUJBQVIsQ0FaZixDQUFBOztBQUFBLEVBYUEsYUFBQSxHQUFnQixPQUFBLENBQVEsMEJBQVIsQ0FiaEIsQ0FBQTs7QUFBQSxFQWNBLFlBQUEsR0FBZSxPQUFBLENBQVEseUJBQVIsQ0FkZixDQUFBOztBQUFBLEVBZUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSx3QkFBUixDQWZkLENBQUE7O0FBQUEsRUFnQkEsVUFBQSxHQUFhLE9BQUEsQ0FBUSx1QkFB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

//# sourceURL=/home/jakob/.atom/packages/git-control/lib/git-control-view.coffee
