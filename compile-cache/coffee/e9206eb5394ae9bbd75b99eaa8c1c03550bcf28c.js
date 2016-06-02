(function() {
  var atomRefresh, callGit, cwd, fs, getBranches, git, logcb, noop, parseDefault, parseDiff, parseStatus, path, projectIndex, q, repo, setProjectIndex;

  fs = require('fs');

  path = require('path');

  git = require('git-promise');

  q = require('q');

  logcb = function(log, error) {
    return console[error ? 'error' : 'log'](log);
  };

  repo = void 0;

  cwd = void 0;

  projectIndex = 0;

  noop = function() {
    return q.fcall(function() {
      return true;
    });
  };

  atomRefresh = function() {
    repo.refreshStatus();
  };

  getBranches = function() {
    return q.fcall(function() {
      var branches, h, refs, _i, _j, _len, _len1, _ref, _ref1;
      branches = {
        local: [],
        remote: [],
        tags: []
      };
      refs = repo.getReferences();
      _ref = refs.heads;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        h = _ref[_i];
        branches.local.push(h.replace('refs/heads/', ''));
      }
      _ref1 = refs.remotes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        h = _ref1[_j];
        branches.remote.push(h.replace('refs/remotes/', ''));
      }
      return branches;
    });
  };

  setProjectIndex = function(index) {
    repo = void 0;
    cwd = void 0;
    projectIndex = index;
    if (atom.project) {
      repo = atom.project.getRepositories()[index];
      cwd = repo ? repo.getWorkingDirectory() : void 0;
    }
  };

  setProjectIndex(projectIndex);

  parseDiff = function(data) {
    return q.fcall(function() {
      var diff, diffs, line, _i, _len, _ref;
      diffs = [];
      diff = {};
      _ref = data.split('\n');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        if (line.length) {
          switch (false) {
            case !/^diff --git /.test(line):
              diff = {
                lines: [],
                added: 0,
                removed: 0
              };
              diff['diff'] = line.replace(/^diff --git /, '');
              diffs.push(diff);
              break;
            case !/^index /.test(line):
              diff['index'] = line.replace(/^index /, '');
              break;
            case !/^--- /.test(line):
              diff['---'] = line.replace(/^--- [a|b]\//, '');
              break;
            case !/^\+\+\+ /.test(line):
              diff['+++'] = line.replace(/^\+\+\+ [a|b]\//, '');
              break;
            default:
              diff['lines'].push(line);
              if (/^\+/.test(line)) {
                diff['added']++;
              }
              if (/^-/.test(line)) {
                diff['removed']++;
              }
          }
        }
      }
      return diffs;
    });
  };

  parseStatus = function(data) {
    return q.fcall(function() {
      var files, line, name, type, _i, _len, _ref, _ref1;
      files = [];
      _ref = data.split('\n');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        if (!line.length) {
          continue;
        }
        _ref1 = line.replace(/\ \ /g, ' ').trim().split(' '), type = _ref1[0], name = _ref1[1];
        files.push({
          name: name,
          selected: (function() {
            switch (type[type.length - 1]) {
              case 'C':
              case 'M':
              case 'R':
              case 'D':
              case 'A':
                return true;
              default:
                return false;
            }
          })(),
          type: (function() {
            switch (type[type.length - 1]) {
              case 'A':
                return 'added';
              case 'C':
                return 'modified';
              case 'D':
                return 'deleted';
              case 'M':
                return 'modified';
              case 'R':
                return 'modified';
              case 'U':
                return 'conflict';
              case '?':
                return 'new';
              default:
                return 'unknown';
            }
          })()
        });
      }
      return files;
    });
  };

  parseDefault = function(data) {
    return q.fcall(function() {
      return true;
    });
  };

  callGit = function(cmd, parser, nodatalog) {
    logcb("> git " + cmd);
    return git(cmd, {
      cwd: cwd
    }).then(function(data) {
      if (!nodatalog) {
        logcb(data);
      }
      return parser(data);
    }).fail(function(e) {
      logcb(e.stdout, true);
      logcb(e.message, true);
    });
  };

  module.exports = {
    isInitialised: function() {
      return cwd;
    },
    alert: function(text) {
      logcb(text);
    },
    setLogger: function(cb) {
      logcb = cb;
    },
    setProjectIndex: setProjectIndex,
    getProjectIndex: function() {
      return projectIndex;
    },
    getRepository: function() {
      return repo;
    },
    count: function(branch) {
      return repo.getAheadBehindCount(branch);
    },
    getLocalBranch: function() {
      return repo.getShortHead();
    },
    getRemoteBranch: function() {
      return repo.getUpstreamBranch();
    },
    isMerging: function() {
      return fs.existsSync(path.join(repo.path, 'MERGE_HEAD'));
    },
    getBranches: getBranches,
    hasRemotes: function() {
      var refs;
      refs = repo.getReferences();
      return refs && refs.remotes && refs.remotes.length;
    },
    hasOrigin: function() {
      return repo.getOriginURL() !== null;
    },
    add: function(files) {
      if (!files.length) {
        return noop();
      }
      return callGit("add -- " + (files.join(' ')), function(data) {
        atomRefresh();
        return parseDefault(data);
      });
    },
    commit: function(message) {
      message = message || Date.now();
      message = message.replace(/"/g, '\\"');
      return callGit("commit -m \"" + message + "\"", function(data) {
        atomRefresh();
        return parseDefault(data);
      });
    },
    checkout: function(branch, remote) {
      return callGit("checkout " + (remote ? '--track ' : '') + branch, function(data) {
        atomRefresh();
        return parseDefault(data);
      });
    },
    createBranch: function(branch) {
      return callGit("branch " + branch, function(data) {
        return callGit("checkout " + branch, function(data) {
          atomRefresh();
          return parseDefault(data);
        });
      });
    },
    deleteBranch: function(branch) {
      return callGit("branch -d " + branch, function(data) {
        atomRefresh();
        return parseDefault;
      });
    },
    forceDeleteBranch: function(branch) {
      return callGit("branch -D " + branch, function(data) {
        atomRefresh();
        return parseDefault;
      });
    },
    diff: function(file) {
      return callGit("--no-pager diff " + (file || ''), parseDiff, true);
    },
    fetch: function() {
      return callGit("fetch --prune", parseDefault);
    },
    merge: function(branch, noff) {
      var noffOutput;
      noffOutput = noff ? "--no-ff" : "";
      return callGit("merge " + noffOutput + " " + branch, function(data) {
        atomRefresh();
        return parseDefault(data);
      });
    },
    pullup: function() {
      return callGit("pull upstream $(git branch | grep '^\*' | sed -n 's/\*[ ]*//p')", function(data) {
        atomRefresh();
        return parseDefault(data);
      });
    },
    pull: function() {
      return callGit("pull", function(data) {
        atomRefresh();
        return parseDefault(data);
      });
    },
    flow: function(type, action, branch) {
      return callGit("flow " + type + " " + action + " " + branch, function(data) {
        atomRefresh();
        return parseDefault(data);
      });
    },
    push: function(remote, branch) {
      var cmd;
      cmd = "-c push.default=simple push " + remote + " " + branch + " --porcelain";
      return callGit(cmd, function(data) {
        atomRefresh();
        return parseDefault(data);
      });
    },
    log: function(branch) {
      return callGit("log origin/" + (repo.getUpstreamBranch() || 'master') + ".." + branch, parseDefault);
    },
    reset: function(files) {
      return callGit("checkout -- " + (files.join(' ')), function(data) {
        atomRefresh();
        return parseDefault(data);
      });
    },
    remove: function(files) {
      if (!files.length) {
        return noop();
      }
      return callGit("rm -- " + (files.join(' ')), function(data) {
        atomRefresh();
        return parseDefault(true);
      });
    },
    status: function() {
      return callGit('status --porcelain --untracked-files=all', parseStatus);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LWNvbnRyb2wvbGliL2dpdC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0pBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUdBLEdBQUEsR0FBTSxPQUFBLENBQVEsYUFBUixDQUhOLENBQUE7O0FBQUEsRUFJQSxDQUFBLEdBQUksT0FBQSxDQUFRLEdBQVIsQ0FKSixDQUFBOztBQUFBLEVBTUEsS0FBQSxHQUFRLFNBQUMsR0FBRCxFQUFNLEtBQU4sR0FBQTtXQUNOLE9BQVEsQ0FBRyxLQUFILEdBQWMsT0FBZCxHQUEyQixLQUEzQixDQUFSLENBQTBDLEdBQTFDLEVBRE07RUFBQSxDQU5SLENBQUE7O0FBQUEsRUFTQSxJQUFBLEdBQU8sTUFUUCxDQUFBOztBQUFBLEVBVUEsR0FBQSxHQUFNLE1BVk4sQ0FBQTs7QUFBQSxFQVdBLFlBQUEsR0FBZSxDQVhmLENBQUE7O0FBQUEsRUFhQSxJQUFBLEdBQU8sU0FBQSxHQUFBO1dBQUcsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxTQUFBLEdBQUE7YUFBRyxLQUFIO0lBQUEsQ0FBUixFQUFIO0VBQUEsQ0FiUCxDQUFBOztBQUFBLEVBZUEsV0FBQSxHQUFjLFNBQUEsR0FBQTtBQUNaLElBQUEsSUFBSSxDQUFDLGFBQUwsQ0FBQSxDQUFBLENBRFk7RUFBQSxDQWZkLENBQUE7O0FBQUEsRUFtQkEsV0FBQSxHQUFjLFNBQUEsR0FBQTtXQUFHLENBQUMsQ0FBQyxLQUFGLENBQVEsU0FBQSxHQUFBO0FBQ3ZCLFVBQUEsbURBQUE7QUFBQSxNQUFBLFFBQUEsR0FBVztBQUFBLFFBQUEsS0FBQSxFQUFP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

//# sourceURL=/home/jakob/.atom/packages/git-control/lib/git.coffee
