(function() {
  var $, CompositeDisposable, GitAdd, GitBranch, GitCheckoutAllFiles, GitCheckoutCurrentFile, GitCherryPick, GitCommit, GitCommitAmend, GitDeleteLocalBranch, GitDeleteRemoteBranch, GitDiff, GitDiffAll, GitDifftool, GitFetch, GitFetchPrune, GitInit, GitLog, GitMerge, GitPaletteView, GitPull, GitPush, GitRebase, GitRemove, GitRun, GitShow, GitStageFiles, GitStageHunk, GitStashApply, GitStashDrop, GitStashPop, GitStashSave, GitStashSaveMessage, GitStatus, GitTags, GitUnstageFiles, OutputViewManager, currentFile, git;

  CompositeDisposable = require('atom').CompositeDisposable;

  $ = require('atom-space-pen-views').$;

  git = require('./git');

  OutputViewManager = require('./output-view-manager');

  GitPaletteView = require('./views/git-palette-view');

  GitAdd = require('./models/git-add');

  GitBranch = require('./models/git-branch');

  GitDeleteLocalBranch = require('./models/git-delete-local-branch.coffee');

  GitDeleteRemoteBranch = require('./models/git-delete-remote-branch.coffee');

  GitCheckoutAllFiles = require('./models/git-checkout-all-files');

  GitCheckoutCurrentFile = require('./models/git-checkout-current-file');

  GitCherryPick = require('./models/git-cherry-pick');

  GitCommit = require('./models/git-commit');

  GitCommitAmend = require('./models/git-commit-amend');

  GitDiff = require('./models/git-diff');

  GitDifftool = require('./models/git-difftool');

  GitDiffAll = require('./models/git-diff-all');

  GitFetch = require('./models/git-fetch');

  GitFetchPrune = require('./models/git-fetch-prune.coffee');

  GitInit = require('./models/git-init');

  GitLog = require('./models/git-log');

  GitPull = require('./models/git-pull');

  GitPush = require('./models/git-push');

  GitRemove = require('./models/git-remove');

  GitShow = require('./models/git-show');

  GitStageFiles = require('./models/git-stage-files');

  GitStageHunk = require('./models/git-stage-hunk');

  GitStashApply = require('./models/git-stash-apply');

  GitStashDrop = require('./models/git-stash-drop');

  GitStashPop = require('./models/git-stash-pop');

  GitStashSave = require('./models/git-stash-save');

  GitStashSaveMessage = require('./models/git-stash-save-message');

  GitStatus = require('./models/git-status');

  GitTags = require('./models/git-tags');

  GitUnstageFiles = require('./models/git-unstage-files');

  GitRun = require('./models/git-run');

  GitMerge = require('./models/git-merge');

  GitRebase = require('./models/git-rebase');

  currentFile = function(repo) {
    var _ref;
    return repo.relativize((_ref = atom.workspace.getActiveTextEditor()) != null ? _ref.getPath() : void 0);
  };

  module.exports = {
    config: {
      includeStagedDiff: {
        title: 'Include staged diffs?',
        type: 'boolean',
        "default": true
      },
      openInPane: {
        type: 'boolean',
        "default": true,
        description: 'Allow commands to open new panes'
      },
      splitPane: {
        title: 'Split pane direction',
        type: 'string',
        "default": 'Down',
        description: 'Where should new panes go? (Defaults to Right)',
        "enum": ['Up', 'Right', 'Down', 'Left']
      },
      wordDiff: {
        type: 'boolean',
        "default": true,
        description: 'Should word diffs be highlighted in diffs?'
      },
      amountOfCommitsToShow: {
        type: 'integer',
        "default": 25,
        minimum: 1
      },
      gitPath: {
        type: 'string',
        "default": 'git',
        description: 'Where is your git?'
      },
      messageTimeout: {
        type: 'integer',
        "default": 5,
        description: 'How long should success/error messages be shown?'
      },
      pullBeforePush: {
        description: 'Pull from remote before pushing',
        type: 'string',
        "default": 'no',
        "enum": ['no', 'pull', 'pull --rebase']
      }
    },
    subscriptions: null,
    activate: function(state) {
      var repos;
      this.subscriptions = new CompositeDisposable;
      repos = atom.project.getRepositories().filter(function(r) {
        return r != null;
      });
      if (repos.length === 0) {
        this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:init', function() {
          return GitInit();
        }));
      }
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:menu', function() {
        return new GitPaletteView();
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:add', function() {
        return git.getRepo().then(function(repo) {
          return GitAdd(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:add-all', function() {
        return git.getRepo().then(function(repo) {
          return GitAdd(repo, {
            addAll: true
          });
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:commit', function() {
        return git.getRepo().then(function(repo) {
          return GitCommit(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:commit-all', function() {
        return git.getRepo().then(function(repo) {
          return GitCommit(repo, {
            stageChanges: true
          });
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:commit-amend', function() {
        return git.getRepo().then(function(repo) {
          return new GitCommitAmend(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:add-and-commit', function() {
        return git.getRepo().then(function(repo) {
          return git.add(repo, {
            file: currentFile(repo)
          }).then(function() {
            return GitCommit(repo);
          });
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:add-all-and-commit', function() {
        return git.getRepo().then(function(repo) {
          return git.add(repo).then(function() {
            return GitCommit(repo);
          });
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:add-all-commit-and-push', function() {
        return git.getRepo().then(function(repo) {
          return git.add(repo).then(function() {
            return GitCommit(repo, {
              andPush: true
            });
          });
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:checkout', function() {
        return git.getRepo().then(function(repo) {
          return GitBranch.gitBranches(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:checkout-remote', function() {
        return git.getRepo().then(function(repo) {
          return GitBranch.gitRemoteBranches(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:checkout-current-file', function() {
        return git.getRepo().then(function(repo) {
          return GitCheckoutCurrentFile(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:checkout-all-files', function() {
        return git.getRepo().then(function(repo) {
          return GitCheckoutAllFiles(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:new-branch', function() {
        return git.getRepo().then(function(repo) {
          return GitBranch.newBranch(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:delete-local-branch', function() {
        return git.getRepo().then(function(repo) {
          return GitDeleteLocalBranch(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:delete-remote-branch', function() {
        return git.getRepo().then(function(repo) {
          return GitDeleteRemoteBranch(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:cherry-pick', function() {
        return git.getRepo().then(function(repo) {
          return GitCherryPick(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:diff', function() {
        return git.getRepo().then(function(repo) {
          return GitDiff(repo, {
            file: currentFile(repo)
          });
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:difftool', function() {
        return git.getRepo().then(function(repo) {
          return GitDifftool(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:diff-all', function() {
        return git.getRepo().then(function(repo) {
          return GitDiffAll(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:fetch', function() {
        return git.getRepo().then(function(repo) {
          return GitFetch(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:fetch-prune', function() {
        return git.getRepo().then(function(repo) {
          return GitFetchPrune(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:pull', function() {
        return git.getRepo().then(function(repo) {
          return GitPull(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:pull-using-rebase', function() {
        return git.getRepo().then(function(repo) {
          return GitPull(repo, {
            rebase: true
          });
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:push', function() {
        return git.getRepo().then(function(repo) {
          return GitPush(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:remove', function() {
        return git.getRepo().then(function(repo) {
          return GitRemove(repo, {
            showSelector: true
          });
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:remove-current-file', function() {
        return git.getRepo().then(function(repo) {
          return GitRemove(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:reset', function() {
        return git.getRepo().then(function(repo) {
          return git.reset(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:show', function() {
        return git.getRepo().then(function(repo) {
          return GitShow(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:log', function() {
        return git.getRepo().then(function(repo) {
          return GitLog(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:log-current-file', function() {
        return git.getRepo().then(function(repo) {
          return GitLog(repo, {
            onlyCurrentFile: true
          });
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:stage-files', function() {
        return git.getRepo().then(function(repo) {
          return GitStageFiles(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:unstage-files', function() {
        return git.getRepo().then(function(repo) {
          return GitUnstageFiles(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:stage-hunk', function() {
        return git.getRepo().then(function(repo) {
          return GitStageHunk(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:stash-save', function() {
        return git.getRepo().then(function(repo) {
          return GitStashSave(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:stash-save-message', function() {
        return git.getRepo().then(function(repo) {
          return GitStashSaveMessage(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:stash-pop', function() {
        return git.getRepo().then(function(repo) {
          return GitStashPop(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:stash-apply', function() {
        return git.getRepo().then(function(repo) {
          return GitStashApply(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:stash-delete', function() {
        return git.getRepo().then(function(repo) {
          return GitStashDrop(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:status', function() {
        return git.getRepo().then(function(repo) {
          return GitStatus(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:tags', function() {
        return git.getRepo().then(function(repo) {
          return GitTags(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:run', function() {
        return git.getRepo().then(function(repo) {
          return new GitRun(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:merge', function() {
        return git.getRepo().then(function(repo) {
          return GitMerge(repo);
        });
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:merge-remote', function() {
        return git.getRepo().then(function(repo) {
          return GitMerge(repo, {
            remote: true
          });
        });
      }));
      return this.subscriptions.add(atom.commands.add('atom-workspace', 'git-plus:rebase', function() {
        return git.getRepo().then(function(repo) {
          return GitRebase(repo);
        });
      }));
    },
    deactivate: function() {
      var _ref;
      this.subscriptions.dispose();
      if ((_ref = this.statusBarTile) != null) {
        _ref.destroy();
      }
      return delete this.statusBarTile;
    },
    consumeStatusBar: function(statusBar) {
      this.setupBranchesMenuToggle(statusBar);
      return this.setupOutputViewToggle(statusBar);
    },
    setupOutputViewToggle: function(statusBar) {
      var div, icon, link;
      div = document.createElement('div');
      div.classList.add('inline-block');
      icon = document.createElement('span');
      icon.classList.add('icon', 'icon-pin');
      link = document.createElement('a');
      link.appendChild(icon);
      link.onclick = function(e) {
        return OutputViewManager.getView().toggle();
      };
      link.title = "Toggle Output Console";
      div.appendChild(link);
      return this.statusBarTile = statusBar.addRightTile({
        item: div,
        priority: 0
      });
    },
    setupBranchesMenuToggle: function(statusBar) {
      return statusBar.getRightTiles().some((function(_this) {
        return function(_arg) {
          var item, _ref;
          item = _arg.item;
          if (item != null ? (_ref = item.classList) != null ? typeof _ref.contains === "function" ? _ref.contains('git-view') : void 0 : void 0 : void 0) {
            $(item).find('.git-branch').on('click', function(e) {
              return atom.commands.dispatch(document.querySelector('atom-workspace'), 'git-plus:checkout');
            });
            return true;
          }
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL2dpdC1wbHVzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnZ0JBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNDLElBQUssT0FBQSxDQUFRLHNCQUFSLEVBQUwsQ0FERCxDQUFBOztBQUFBLEVBRUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxPQUFSLENBRk4sQ0FBQTs7QUFBQSxFQUdBLGlCQUFBLEdBQXlCLE9BQUEsQ0FBUSx1QkFBUixDQUh6QixDQUFBOztBQUFBLEVBSUEsY0FBQSxHQUF5QixPQUFBLENBQVEsMEJBQVIsQ0FKekIsQ0FBQTs7QUFBQSxFQUtBLE1BQUEsR0FBeUIsT0FBQSxDQUFRLGtCQUFSLENBTHpCLENBQUE7O0FBQUEsRUFNQSxTQUFBLEdBQXlCLE9BQUEsQ0FBUSxxQkFBUixDQU56QixDQUFBOztBQUFBLEVBT0Esb0JBQUEsR0FBeUIsT0FBQSxDQUFRLHlDQUFSLENBUHpCLENBQUE7O0FBQUEsRUFRQSxxQkFBQSxHQUF5QixPQUFBLENBQVEsMENBQVIsQ0FSekIsQ0FBQTs7QUFBQSxFQVNBLG1CQUFBLEdBQXlCLE9BQUEsQ0FBUSxpQ0FBUixDQVR6QixDQUFBOztBQUFBLEVBVUEsc0JBQUEsR0FBeUIsT0FBQSxDQUFRLG9DQUFSLENBVnpCLENBQUE7O0FBQUEsRUFXQSxhQUFBLEdBQXlCLE9BQUEsQ0FBUSwwQkFBUixDQVh6QixDQUFBOztBQUFBLEVBWUEsU0FBQSxHQUF5QixPQUFBLENBQVEscUJBQVIsQ0FaekIsQ0FBQTs7QUFBQSxFQWFBLGNBQUEsR0FBeUIsT0FBQSxDQUFRLDJCQUFSLENBYnpCLENBQUE7O0FBQUEsRUFjQSxPQUFBLEdBQXlCLE9BQUEs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

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/git-plus.coffee
