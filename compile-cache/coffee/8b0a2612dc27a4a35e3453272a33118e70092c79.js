(function() {
  var Path, commitPane, currentPane, fs, git, mockRepo, mockRepoWithSubmodule, mockSubmodule, notifier, pathToRepoFile, pathToSubmoduleFile, repo, textEditor, _ref;

  fs = require('fs-plus');

  Path = require('flavored-path');

  git = require('../lib/git');

  notifier = require('../lib/notifier');

  _ref = require('./fixtures'), repo = _ref.repo, pathToRepoFile = _ref.pathToRepoFile, textEditor = _ref.textEditor, commitPane = _ref.commitPane, currentPane = _ref.currentPane;

  pathToSubmoduleFile = Path.get("~/some/submodule/file");

  mockRepo = {
    getWorkingDirectory: function() {
      return Path.get("~/some/repository");
    },
    refreshStatus: function() {
      return void 0;
    },
    relativize: function(path) {
      if (path === pathToRepoFile) {
        return "directory/file";
      }
    },
    repo: {
      submoduleForPath: function(path) {
        return void 0;
      }
    }
  };

  mockSubmodule = {
    getWorkingDirectory: function() {
      return Path.get("~/some/submodule");
    },
    relativize: function(path) {
      if (path === pathToSubmoduleFile) {
        return "file";
      }
    }
  };

  mockRepoWithSubmodule = Object.create(mockRepo);

  mockRepoWithSubmodule.repo = {
    submoduleForPath: function(path) {
      if (path === pathToSubmoduleFile) {
        return mockSubmodule;
      }
    }
  };

  describe("Git-Plus git module", function() {
    describe("git.getConfig", function() {
      var args;
      args = ['config', '--get', 'user.name'];
      describe("when a repo file path isn't specified", function() {
        return it("spawns a command querying git for the given global setting", function() {
          spyOn(git, 'cmd').andReturn(Promise.resolve('akonwi'));
          waitsForPromise(function() {
            return git.getConfig('user.name');
          });
          return runs(function() {
            return expect(git.cmd).toHaveBeenCalledWith(args, {
              cwd: Path.get('~')
            });
          });
        });
      });
      describe("when a repo file path is specified", function() {
        return it("checks for settings in that repo", function() {
          spyOn(git, 'cmd').andReturn(Promise.resolve('akonwi'));
          waitsForPromise(function() {
            return git.getConfig('user.name', repo.getWorkingDirectory());
          });
          return runs(function() {
            return expect(git.cmd).toHaveBeenCalledWith(args, {
              cwd: repo.getWorkingDirectory()
            });
          });
        });
      });
      describe("when the command fails without an error message", function() {
        return it("resolves to ''", function() {
          spyOn(git, 'cmd').andReturn(Promise.reject(''));
          waitsForPromise(function() {
            return git.getConfig('user.name', repo.getWorkingDirectory()).then(function(result) {
              return expect(result).toEqual('');
            });
          });
          return runs(function() {
            return expect(git.cmd).toHaveBeenCalledWith(args, {
              cwd: repo.getWorkingDirectory()
            });
          });
        });
      });
      return describe("when the command fails with an error message", function() {
        return it("rejects with the error message", function() {
          spyOn(git, 'cmd').andReturn(Promise.reject('getConfig error'));
          spyOn(notifier, 'addError');
          return waitsForPromise(function() {
            return git.getConfig('user.name', 'bad working dir').then(function(result) {
              return fail("should have been rejected");
            })["catch"](function(error) {
              return expect(notifier.addError).toHaveBeenCalledWith('getConfig error');
            });
          });
        });
      });
    });
    describe("git.getRepo", function() {
      return it("returns a promise resolving to repository", function() {
        spyOn(atom.project, 'getRepositories').andReturn([repo]);
        return waitsForPromise(function() {
          return git.getRepo().then(function(actual) {
            return expect(actual.getWorkingDirectory()).toEqual(repo.getWorkingDirectory());
          });
        });
      });
    });
    describe("git.dir", function() {
      return it("returns a promise resolving to absolute path of repo", function() {
        spyOn(atom.workspace, 'getActiveTextEditor').andReturn(textEditor);
        spyOn(atom.project, 'getRepositories').andReturn([repo]);
        return git.dir().then(function(dir) {
          return expect(dir).toEqual(repo.getWorkingDirectory());
        });
      });
    });
    describe("git.getSubmodule", function() {
      it("returns undefined when there is no submodule", function() {
        return expect(git.getSubmodule(pathToRepoFile)).toBe(void 0);
      });
      return it("returns a submodule when given file is in a submodule of a project repo", function() {
        spyOn(atom.project, 'getRepositories').andCallFake(function() {
          return [mockRepoWithSubmodule];
        });
        return expect(git.getSubmodule(pathToSubmoduleFile).getWorkingDirectory()).toEqual(Path.get("~/some/submodule"));
      });
    });
    describe("git.relativize", function() {
      return it("returns relativized filepath for files in repo", function() {
        spyOn(atom.project, 'getRepositories').andCallFake(function() {
          return [mockRepo, mockRepoWithSubmodule];
        });
        expect(git.relativize(pathToRepoFile)).toBe('directory/file');
        return expect(git.relativize(pathToSubmoduleFile)).toBe("file");
      });
    });
    describe("git.cmd", function() {
      it("returns a promise", function() {
        return waitsForPromise(function() {
          var promise;
          promise = git.cmd();
          expect(promise["catch"]).toBeDefined();
          expect(promise.then).toBeDefined();
          return promise["catch"](function(output) {
            return expect(output).toContain('usage');
          });
        });
      });
      it("returns a promise that is fulfilled with stdout on success", function() {
        return waitsForPromise(function() {
          return git.cmd(['--version']).then(function(output) {
            return expect(output).toContain('git version');
          });
        });
      });
      it("returns a promise that is rejected with stderr on failure", function() {
        return waitsForPromise(function() {
          return git.cmd(['help', '--bogus-option'])["catch"](function(output) {
            return expect(output).toContain('unknown option');
          });
        });
      });
      return it("returns a promise that is fulfilled with stderr on success", function() {
        var cloneDir, initDir;
        initDir = 'git-plus-test-dir' + Math.random();
        cloneDir = initDir + '-clone';
        return waitsForPromise(function() {
          return git.cmd(['init', initDir]).then(function() {
            return git.cmd(['clone', '--progress', initDir, cloneDir]);
          }).then(function(output) {
            fs.removeSync(initDir);
            fs.removeSync(cloneDir);
            return expect(output).toContain('Cloning');
          });
        });
      });
    });
    describe("git.add", function() {
      it("calls git.cmd with ['add', '--all', {fileName}]", function() {
        spyOn(git, 'cmd').andCallFake(function() {
          return Promise.resolve(true);
        });
        return waitsForPromise(function() {
          return git.add(mockRepo, {
            file: pathToSubmoduleFile
          }).then(function(success) {
            return expect(git.cmd).toHaveBeenCalledWith(['add', '--all', pathToSubmoduleFile], {
              cwd: mockRepo.getWorkingDirectory()
            });
          });
        });
      });
      it("calls git.cmd with ['add', '--all', '.'] when no file is specified", function() {
        spyOn(git, 'cmd').andCallFake(function() {
          return Promise.resolve(true);
        });
        return waitsForPromise(function() {
          return git.add(mockRepo).then(function(success) {
            return expect(git.cmd).toHaveBeenCalledWith(['add', '--all', '.'], {
              cwd: mockRepo.getWorkingDirectory()
            });
          });
        });
      });
      it("calls git.cmd with ['add', '--update'...] when update option is true", function() {
        spyOn(git, 'cmd').andCallFake(function() {
          return Promise.resolve(true);
        });
        return waitsForPromise(function() {
          return git.add(mockRepo, {
            update: true
          }).then(function(success) {
            return expect(git.cmd).toHaveBeenCalledWith(['add', '--update', '.'], {
              cwd: mockRepo.getWorkingDirectory()
            });
          });
        });
      });
      return describe("when it fails", function() {
        return it("notifies of failure", function() {
          spyOn(git, 'cmd').andReturn(Promise.reject('git.add error'));
          spyOn(notifier, 'addError');
          return waitsForPromise(function() {
            return git.add(mockRepo).then(function(result) {
              return fail("should have been rejected");
            })["catch"](function(error) {
              return expect(notifier.addError).toHaveBeenCalledWith('git.add error');
            });
          });
        });
      });
    });
    describe("git.reset", function() {
      return it("resets and unstages all files", function() {
        spyOn(git, 'cmd').andCallFake(function() {
          return Promise.resolve(true);
        });
        return waitsForPromise(function() {
          return git.reset(mockRepo).then(function() {
            return expect(git.cmd).toHaveBeenCalledWith(['reset', 'HEAD'], {
              cwd: mockRepo.getWorkingDirectory()
            });
          });
        });
      });
    });
    describe("git.stagedFiles", function() {
      return it("returns an empty array when there are no staged files", function() {
        spyOn(git, 'cmd').andCallFake(function() {
          return Promise.resolve('');
        });
        return waitsForPromise(function() {
          return git.stagedFiles(mockRepo).then(function(files) {
            return expect(files.length).toEqual(0);
          });
        });
      });
    });
    describe("git.unstagedFiles", function() {
      return it("returns an empty array when there are no unstaged files", function() {
        spyOn(git, 'cmd').andCallFake(function() {
          return Promise.resolve('');
        });
        return waitsForPromise(function() {
          return git.unstagedFiles(mockRepo).then(function(files) {
            return expect(files.length).toEqual(0);
          });
        });
      });
    });
    describe("git.status", function() {
      return it("calls git.cmd with 'status' as the first argument", function() {
        spyOn(git, 'cmd').andCallFake(function() {
          var args;
          args = git.cmd.mostRecentCall.args;
          if (args[0][0] === 'status') {
            return Promise.resolve(true);
          }
        });
        return git.status(mockRepo).then(function() {
          return expect(true).toBeTruthy();
        });
      });
    });
    describe("git.refresh", function() {
      it("calls git.cmd with 'add' and '--refresh' arguments for each repo in project", function() {
        spyOn(git, 'cmd').andCallFake(function() {
          var args;
          args = git.cmd.mostRecentCall.args[0];
          expect(args[0]).toBe('add');
          return expect(args[1]).toBe('--refresh');
        });
        spyOn(mockRepo, 'getWorkingDirectory').andCallFake(function() {
          return expect(mockRepo.getWorkingDirectory.callCount).toBe(1);
        });
        return git.refresh();
      });
      return it("calls repo.refreshStatus for each repo in project", function() {
        spyOn(atom.project, 'getRepositories').andCallFake(function() {
          return [mockRepo];
        });
        spyOn(mockRepo, 'refreshStatus');
        spyOn(git, 'cmd').andCallFake(function() {
          return void 0;
        });
        git.refresh();
        return expect(mockRepo.refreshStatus.callCount).toBe(1);
      });
    });
    return describe("git.diff", function() {
      return it("calls git.cmd with ['diff', '-p', '-U1'] and the file path", function() {
        spyOn(git, 'cmd').andCallFake(function() {
          return Promise.resolve("string");
        });
        git.diff(mockRepo, pathToRepoFile);
        return expect(git.cmd).toHaveBeenCalledWith(['diff', '-p', '-U1', pathToRepoFile], {
          cwd: mockRepo.getWorkingDirectory()
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvc3BlYy9naXQtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNkpBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxlQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLEdBQUEsR0FBTSxPQUFBLENBQVEsWUFBUixDQUZOLENBQUE7O0FBQUEsRUFHQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGlCQUFSLENBSFgsQ0FBQTs7QUFBQSxFQUlBLE9BTUksT0FBQSxDQUFRLFlBQVIsQ0FOSixFQUNFLFlBQUEsSUFERixFQUVFLHNCQUFBLGNBRkYsRUFHRSxrQkFBQSxVQUhGLEVBSUUsa0JBQUEsVUFKRixFQUtFLG1CQUFBLFdBVEYsQ0FBQTs7QUFBQSxFQVdBLG1CQUFBLEdBQXNCLElBQUksQ0FBQyxHQUFMLENBQVMsdUJBQVQsQ0FYdEIsQ0FBQTs7QUFBQSxFQWFBLFFBQUEsR0FDRTtBQUFBLElBQUEsbUJBQUEsRUFBcUIsU0FBQSxHQUFBO2FBQUcsSUFBSSxDQUFDLEdBQUwsQ0FBUyxtQkFBVCxFQUFIO0lBQUEsQ0FBckI7QUFBQSxJQUNBLGFBQUEsRUFBZSxTQUFBLEdBQUE7YUFBRyxPQUFIO0lBQUEsQ0FEZjtBQUFBLElBRUEsVUFBQSxFQUFZLFNBQUMsSUFBRCxHQUFBO0FBQVUsTUFBQSxJQUFvQixJQUFBLEtBQVEsY0FBNUI7ZUFBQSxpQkFBQTtPQUFWO0lBQUEsQ0FGWjtBQUFBLElBR0EsSUFBQSxFQUNFO0FBQUEsTUFBQSxnQkFBQSxFQUFrQixTQUFDLElBQUQsR0FBQTtlQUFVLE9BQVY7TUFBQSxDQUFsQjtLQUpGO0dBZEYsQ0FBQTs7QUFBQSxFQW9CQSxh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

//# sourceURL=/home/jakob/.atom/packages/git-plus/spec/git-spec.coffee
