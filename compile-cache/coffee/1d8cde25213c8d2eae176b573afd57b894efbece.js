(function() {
  var CompositeDisposable, GitPull, GitPush, Path, cleanup, commit, destroyCommitEditor, dir, disposables, fs, getStagedFiles, getTemplate, git, notifier, prepFile, showFile;

  CompositeDisposable = require('atom').CompositeDisposable;

  fs = require('fs-plus');

  Path = require('flavored-path');

  git = require('../git');

  notifier = require('../notifier');

  GitPush = require('./git-push');

  GitPull = require('./git-pull');

  disposables = new CompositeDisposable;

  dir = function(repo) {
    return (git.getSubmodule() || repo).getWorkingDirectory();
  };

  getStagedFiles = function(repo) {
    return git.stagedFiles(repo).then(function(files) {
      if (files.length >= 1) {
        return git.cmd(['status'], {
          cwd: repo.getWorkingDirectory()
        });
      } else {
        return Promise.reject("Nothing to commit.");
      }
    });
  };

  getTemplate = function(cwd) {
    return git.getConfig('commit.template', cwd).then(function(filePath) {
      if (filePath) {
        return fs.readFileSync(Path.get(filePath.trim())).toString().trim();
      } else {
        return '';
      }
    });
  };

  prepFile = function(status, filePath) {
    var cwd;
    cwd = Path.dirname(filePath);
    return git.getConfig('core.commentchar', cwd).then(function(commentchar) {
      commentchar = commentchar ? commentchar.trim() : '#';
      status = status.replace(/\s*\(.*\)\n/g, "\n");
      status = status.trim().replace(/\n/g, "\n" + commentchar + " ");
      return getTemplate(cwd).then(function(template) {
        var content;
        content = "" + template + "\n" + commentchar + " Please enter the commit message for your changes. Lines starting\n" + commentchar + " with '" + commentchar + "' will be ignored, and an empty message aborts the commit.\n" + commentchar + "\n" + commentchar + " " + status;
        return fs.writeFileSync(filePath, content);
      });
    });
  };

  destroyCommitEditor = function() {
    var _ref;
    return (_ref = atom.workspace) != null ? _ref.getPanes().some(function(pane) {
      return pane.getItems().some(function(paneItem) {
        var _ref1;
        if (paneItem != null ? typeof paneItem.getURI === "function" ? (_ref1 = paneItem.getURI()) != null ? _ref1.includes('COMMIT_EDITMSG') : void 0 : void 0 : void 0) {
          if (pane.getItems().length === 1) {
            pane.destroy();
          } else {
            paneItem.destroy();
          }
          return true;
        }
      });
    }) : void 0;
  };

  commit = function(directory, filePath) {
    return git.cmd(['commit', "--cleanup=strip", "--file=" + filePath], {
      cwd: directory
    }).then(function(data) {
      notifier.addSuccess(data);
      destroyCommitEditor();
      return git.refresh();
    })["catch"](function(data) {
      return notifier.addError(data);
    });
  };

  cleanup = function(currentPane, filePath) {
    if (currentPane.isAlive()) {
      currentPane.activate();
    }
    disposables.dispose();
    return fs.unlink(filePath);
  };

  showFile = function(filePath) {
    var splitDirection;
    if (atom.config.get('git-plus.openInPane')) {
      splitDirection = atom.config.get('git-plus.splitPane');
      atom.workspace.getActivePane()["split" + splitDirection]();
    }
    return atom.workspace.open(filePath);
  };

  module.exports = function(repo, _arg) {
    var andPush, currentPane, filePath, init, stageChanges, startCommit, _ref;
    _ref = _arg != null ? _arg : {}, stageChanges = _ref.stageChanges, andPush = _ref.andPush;
    filePath = Path.join(repo.getPath(), 'COMMIT_EDITMSG');
    currentPane = atom.workspace.getActivePane();
    init = function() {
      return getStagedFiles(repo).then(function(status) {
        return prepFile(status, filePath);
      });
    };
    startCommit = function() {
      return showFile(filePath).then(function(textEditor) {
        disposables.add(textEditor.onDidSave(function() {
          return commit(dir(repo), filePath).then(function() {
            if (andPush) {
              return GitPush(repo);
            }
          });
        }));
        return disposables.add(textEditor.onDidDestroy(function() {
          return cleanup(currentPane, filePath);
        }));
      })["catch"](function(msg) {
        return notifier.addError(msg);
      });
    };
    if (stageChanges) {
      return git.add(repo, {
        update: stageChanges
      }).then(function() {
        return init();
      }).then(function() {
        return startCommit();
      });
    } else {
      return init().then(function() {
        return startCommit();
      })["catch"](function(message) {
        if (typeof message.includes === "function" ? message.includes('CRLF') : void 0) {
          return startCommit();
        } else {
          return notifier.addInfo(message);
        }
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL21vZGVscy9naXQtY29tbWl0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx1S0FBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsZUFBUixDQUZQLENBQUE7O0FBQUEsRUFJQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FKTixDQUFBOztBQUFBLEVBS0EsUUFBQSxHQUFXLE9BQUEsQ0FBUSxhQUFSLENBTFgsQ0FBQTs7QUFBQSxFQU1BLE9BQUEsR0FBVSxPQUFBLENBQVEsWUFBUixDQU5WLENBQUE7O0FBQUEsRUFPQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFlBQVIsQ0FQVixDQUFBOztBQUFBLEVBU0EsV0FBQSxHQUFjLEdBQUEsQ0FBQSxtQkFUZCxDQUFBOztBQUFBLEVBV0EsR0FBQSxHQUFNLFNBQUMsSUFBRCxHQUFBO1dBQ0osQ0FBQyxHQUFHLENBQUMsWUFBSixDQUFBLENBQUEsSUFBc0IsSUFBdkIsQ0FBNEIsQ0FBQyxtQkFBN0IsQ0FBQSxFQURJO0VBQUEsQ0FYTixDQUFBOztBQUFBLEVBY0EsY0FBQSxHQUFpQixTQUFDLElBQUQsR0FBQTtXQUNmLEdBQUcsQ0FBQyxXQUFKLENBQWdCLElBQWhCLENBQXFCLENBQUMsSUFBdEIsQ0FBMkIsU0FBQyxLQUFELEdBQUE7QUFDekIsTUFBQSxJQUFHLEtBQUssQ0FBQyxNQUFOLElBQWdCLENBQW5CO2VBQ0UsR0FBRyxDQUFDLEdBQUosQ0FBUSxDQUFDLFFBQUQsQ0FBUixFQUFvQjtBQUFBLFVBQUEsR0FBQSxF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

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/models/git-commit.coffee
