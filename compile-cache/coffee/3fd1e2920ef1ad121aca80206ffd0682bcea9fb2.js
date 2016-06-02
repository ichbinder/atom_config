(function() {
  var CompositeDisposable, Path, cleanup, cleanupUnstagedText, commit, destroyCommitEditor, diffFiles, dir, disposables, fs, getGitStatus, getStagedFiles, git, notifier, parse, prepFile, prettifyFileStatuses, prettifyStagedFiles, prettyifyPreviousFile, showFile,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  CompositeDisposable = require('atom').CompositeDisposable;

  fs = require('fs-plus');

  Path = require('flavored-path');

  git = require('../git');

  notifier = require('../notifier');

  disposables = new CompositeDisposable;

  prettifyStagedFiles = function(data) {
    var i, mode;
    if (data === '') {
      return [];
    }
    data = data.split(/\0/).slice(0, -1);
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = data.length; _i < _len; i = _i += 2) {
        mode = data[i];
        _results.push({
          mode: mode,
          path: data[i + 1]
        });
      }
      return _results;
    })();
  };

  prettyifyPreviousFile = function(data) {
    return {
      mode: data[0],
      path: data.substring(1).trim()
    };
  };

  prettifyFileStatuses = function(files) {
    return files.map(function(_arg) {
      var mode, path;
      mode = _arg.mode, path = _arg.path;
      switch (mode) {
        case 'M':
          return "modified:   " + path;
        case 'A':
          return "new file:   " + path;
        case 'D':
          return "deleted:   " + path;
        case 'R':
          return "renamed:   " + path;
      }
    });
  };

  getStagedFiles = function(repo) {
    return git.stagedFiles(repo).then(function(files) {
      var args;
      if (files.length >= 1) {
        args = ['diff-index', '--cached', 'HEAD', '--name-status', '-z'];
        return git.cmd(args, {
          cwd: repo.getWorkingDirectory()
        }).then(function(data) {
          return prettifyStagedFiles(data);
        });
      } else {
        return Promise.resolve([]);
      }
    });
  };

  getGitStatus = function(repo) {
    return git.cmd(['status'], {
      cwd: repo.getWorkingDirectory()
    });
  };

  diffFiles = function(previousFiles, currentFiles) {
    var currentPaths;
    previousFiles = previousFiles.map(function(p) {
      return prettyifyPreviousFile(p);
    });
    currentPaths = currentFiles.map(function(_arg) {
      var path;
      path = _arg.path;
      return path;
    });
    return previousFiles.filter(function(p) {
      var _ref;
      return (_ref = p.path, __indexOf.call(currentPaths, _ref) >= 0) === false;
    });
  };

  parse = function(prevCommit) {
    var indexOfStatus, lines, message, prevChangedFiles, prevMessage, statusRegex;
    lines = prevCommit.split(/\n/).filter(function(line) {
      return line !== '/n';
    });
    statusRegex = /(([ MADRCU?!])\s(.*))/;
    indexOfStatus = lines.findIndex(function(line) {
      return statusRegex.test(line);
    });
    prevMessage = lines.splice(0, indexOfStatus - 1);
    prevMessage.reverse();
    if (prevMessage[0] === '') {
      prevMessage.shift();
    }
    prevMessage.reverse();
    prevChangedFiles = lines.filter(function(line) {
      return line !== '';
    });
    message = prevMessage.join('\n');
    return {
      message: message,
      prevChangedFiles: prevChangedFiles
    };
  };

  cleanupUnstagedText = function(status) {
    var text, unstagedFiles;
    unstagedFiles = status.indexOf("Changes not staged for commit:");
    if (unstagedFiles >= 0) {
      text = status.substring(unstagedFiles);
      return status = "" + (status.substring(0, unstagedFiles - 1)) + "\n" + (text.replace(/\s*\(.*\)\n/g, ""));
    } else {
      return status;
    }
  };

  prepFile = function(_arg) {
    var filePath, message, prevChangedFiles, status;
    message = _arg.message, prevChangedFiles = _arg.prevChangedFiles, status = _arg.status, filePath = _arg.filePath;
    return git.getConfig('core.commentchar', Path.dirname(filePath)).then(function(commentchar) {
      var currentChanges, nothingToCommit, replacementText, textToReplace;
      commentchar = commentchar.length > 0 ? commentchar.trim() : '#';
      status = cleanupUnstagedText(status);
      status = status.replace(/\s*\(.*\)\n/g, "\n").replace(/\n/g, "\n" + commentchar + " ");
      if (prevChangedFiles.length > 0) {
        nothingToCommit = "nothing to commit, working directory clean";
        currentChanges = "committed:\n" + commentchar;
        textToReplace = null;
        if (status.indexOf(nothingToCommit) > -1) {
          textToReplace = nothingToCommit;
        } else if (status.indexOf(currentChanges) > -1) {
          textToReplace = currentChanges;
        }
        replacementText = "committed:\n" + (prevChangedFiles.map(function(f) {
          return "" + commentchar + "   " + f;
        }).join("\n"));
        status = status.replace(textToReplace, replacementText);
      }
      return fs.writeFileSync(filePath, "" + message + "\n" + commentchar + " Please enter the commit message for your changes. Lines starting\n" + commentchar + " with '" + commentchar + "' will be ignored, and an empty message aborts the commit.\n" + commentchar + "\n" + commentchar + " " + status);
    });
  };

  showFile = function(filePath) {
    var splitDirection;
    if (atom.config.get('git-plus.openInPane')) {
      splitDirection = atom.config.get('git-plus.splitPane');
      atom.workspace.getActivePane()["split" + splitDirection]();
    }
    return atom.workspace.open(filePath);
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

  dir = function(repo) {
    return (git.getSubmodule() || repo).getWorkingDirectory();
  };

  commit = function(directory, filePath) {
    var args;
    args = ['commit', '--amend', '--cleanup=strip', "--file=" + filePath];
    return git.cmd(args, {
      cwd: directory
    }).then(function(data) {
      notifier.addSuccess(data);
      destroyCommitEditor();
      return git.refresh();
    });
  };

  cleanup = function(currentPane, filePath) {
    if (currentPane.isAlive()) {
      currentPane.activate();
    }
    disposables.dispose();
    return fs.unlink(filePath);
  };

  module.exports = function(repo) {
    var currentPane, cwd, filePath;
    currentPane = atom.workspace.getActivePane();
    filePath = Path.join(repo.getPath(), 'COMMIT_EDITMSG');
    cwd = repo.getWorkingDirectory();
    return git.cmd(['whatchanged', '-1', '--name-status', '--format=%B'], {
      cwd: cwd
    }).then(function(amend) {
      return parse(amend);
    }).then(function(_arg) {
      var message, prevChangedFiles;
      message = _arg.message, prevChangedFiles = _arg.prevChangedFiles;
      return getStagedFiles(repo).then(function(files) {
        prevChangedFiles = prettifyFileStatuses(diffFiles(prevChangedFiles, files));
        return {
          message: message,
          prevChangedFiles: prevChangedFiles
        };
      });
    }).then(function(_arg) {
      var message, prevChangedFiles;
      message = _arg.message, prevChangedFiles = _arg.prevChangedFiles;
      return getGitStatus(repo).then(function(status) {
        return prepFile({
          message: message,
          prevChangedFiles: prevChangedFiles,
          status: status,
          filePath: filePath
        });
      }).then(function() {
        return showFile(filePath);
      });
    }).then(function(textEditor) {
      disposables.add(textEditor.onDidSave(function() {
        return commit(dir(repo), filePath);
      }));
      return disposables.add(textEditor.onDidDestroy(function() {
        return cleanup(currentPane, filePath);
      }));
    })["catch"](function(msg) {
      return notifier.addInfo(msg);
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL21vZGVscy9naXQtY29tbWl0LWFtZW5kLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwrUEFBQTtJQUFBLHFKQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FETCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxlQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUdBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUhOLENBQUE7O0FBQUEsRUFJQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FKWCxDQUFBOztBQUFBLEVBTUEsV0FBQSxHQUFjLEdBQUEsQ0FBQSxtQkFOZCxDQUFBOztBQUFBLEVBUUEsbUJBQUEsR0FBc0IsU0FBQyxJQUFELEdBQUE7QUFDcEIsUUFBQSxPQUFBO0FBQUEsSUFBQSxJQUFhLElBQUEsS0FBUSxFQUFyQjtBQUFBLGFBQU8sRUFBUCxDQUFBO0tBQUE7QUFBQSxJQUNBLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLElBQVgsQ0FBaUIsYUFEeEIsQ0FBQTs7O0FBRUs7V0FBQSxzREFBQTt1QkFBQTtBQUNILHNCQUFBO0FBQUEsVUFBQyxNQUFBLElBQUQ7QUFBQSxVQUFPLElBQUEsRUFBTSxJQUFLLENBQUEsQ0FBQSxHQUFFLENBQUYsQ0FBbEI7VUFBQSxDQURHO0FBQUE7O1NBSGU7RUFBQSxDQVJ0QixDQUFBOztBQUFBLEVBY0EscUJBQUEsR0FBd0IsU0FBQyxJQUFELEdBQUE7V0FDdEI7QUFBQSxNQUFBLElBQUEsRUFBTSxJQUFLLENBQUEsQ0FBQSxDQUFYO0FBQUEsTUFDQSxJQUFB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

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/models/git-commit-amend.coffee
