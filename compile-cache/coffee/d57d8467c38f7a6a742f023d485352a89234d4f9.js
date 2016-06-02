(function() {
  var GitRemove, currentPane, git, pathToRepoFile, repo, textEditor, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  git = require('../../lib/git');

  _ref = require('../fixtures'), repo = _ref.repo, pathToRepoFile = _ref.pathToRepoFile, textEditor = _ref.textEditor, currentPane = _ref.currentPane;

  GitRemove = require('../../lib/models/git-remove');

  describe("GitRemove", function() {
    beforeEach(function() {
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn(textEditor);
      spyOn(atom.workspace, 'getActivePaneItem').andReturn(currentPane);
      return spyOn(git, 'cmd').andReturn(Promise.resolve(repo.relativize(pathToRepoFile)));
    });
    describe("when the file has been modified and user confirms", function() {
      beforeEach(function() {
        spyOn(window, 'confirm').andReturn(true);
        return spyOn(repo, 'isPathModified').andReturn(true);
      });
      describe("when there is a current file open", function() {
        return it("calls git.cmd with 'rm' and " + pathToRepoFile, function() {
          var args, _ref1;
          GitRemove(repo);
          args = git.cmd.mostRecentCall.args[0];
          expect(__indexOf.call(args, 'rm') >= 0).toBe(true);
          return expect((_ref1 = repo.relativize(pathToRepoFile), __indexOf.call(args, _ref1) >= 0)).toBe(true);
        });
      });
      return describe("when 'showSelector' is set to true", function() {
        return it("calls git.cmd with '*' instead of " + pathToRepoFile, function() {
          var args;
          GitRemove(repo, {
            showSelector: true
          });
          args = git.cmd.mostRecentCall.args[0];
          return expect(__indexOf.call(args, '*') >= 0).toBe(true);
        });
      });
    });
    return describe("when the file has not been modified and user doesn't need to confirm", function() {
      beforeEach(function() {
        spyOn(window, 'confirm').andReturn(false);
        return spyOn(repo, 'isPathModified').andReturn(false);
      });
      describe("when there is a current file open", function() {
        return it("calls git.cmd with 'rm' and " + pathToRepoFile, function() {
          var args, _ref1;
          GitRemove(repo);
          args = git.cmd.mostRecentCall.args[0];
          expect(__indexOf.call(args, 'rm') >= 0).toBe(true);
          expect((_ref1 = repo.relativize(pathToRepoFile), __indexOf.call(args, _ref1) >= 0)).toBe(true);
          return expect(window.confirm).not.toHaveBeenCalled();
        });
      });
      return describe("when 'showSelector' is set to true", function() {
        return it("calls git.cmd with '*' instead of " + pathToRepoFile, function() {
          var args;
          GitRemove(repo, {
            showSelector: true
          });
          args = git.cmd.mostRecentCall.args[0];
          return expect(__indexOf.call(args, '*') >= 0).toBe(true);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvc3BlYy9tb2RlbHMvZ2l0LXJlbW92ZS1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxtRUFBQTtJQUFBLHFKQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxlQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLE9BQWtELE9BQUEsQ0FBUSxhQUFSLENBQWxELEVBQUMsWUFBQSxJQUFELEVBQU8sc0JBQUEsY0FBUCxFQUF1QixrQkFBQSxVQUF2QixFQUFtQyxtQkFBQSxXQURuQyxDQUFBOztBQUFBLEVBRUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSw2QkFBUixDQUZaLENBQUE7O0FBQUEsRUFJQSxRQUFBLENBQVMsV0FBVCxFQUFzQixTQUFBLEdBQUE7QUFDcEIsSUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxLQUFBLENBQU0sSUFBSSxDQUFDLFNBQVgsRUFBc0IscUJBQXRCLENBQTRDLENBQUMsU0FBN0MsQ0FBdUQsVUFBdkQsQ0FBQSxDQUFBO0FBQUEsTUFDQSxLQUFBLENBQU0sSUFBSSxDQUFDLFNBQVgsRUFBc0IsbUJBQXRCLENBQTBDLENBQUMsU0FBM0MsQ0FBcUQsV0FBckQsQ0FEQSxDQUFBO2FBRUEsS0FBQSxDQUFNLEdBQU4sRUFBVyxLQUFYLENBQWlCLENBQUMsU0FBbEIsQ0FBNEIsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsSUFBSSxDQUFDLFVBQUwsQ0FBZ0IsY0FBaEIsQ0FBaEIsQ0FBNUIsRUFIUztJQUFBLENBQVgsQ0FBQSxDQUFBO0FBQUEsSUFLQSxRQUFBLENBQVMsbURBQVQsRUFBOEQsU0FBQSxHQUFBO0FBQzVELE1BQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULFFBQUEsS0FBQSxDQUFNLE1BQU4sRUFB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

//# sourceURL=/home/jakob/.atom/packages/git-plus/spec/models/git-remove-spec.coffee
