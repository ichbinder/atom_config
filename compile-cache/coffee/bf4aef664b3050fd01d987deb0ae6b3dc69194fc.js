(function() {
  var PullBranchListView, git, options, repo;

  git = require('../../lib/git');

  PullBranchListView = require('../../lib/views/pull-branch-list-view');

  repo = require('../fixtures').repo;

  options = {
    cwd: repo.getWorkingDirectory()
  };

  describe("PullBranchListView", function() {
    beforeEach(function() {
      this.view = new PullBranchListView(repo, "branch1\nbranch2", "remote", '');
      return spyOn(git, 'cmd').andReturn(Promise.resolve('pulled'));
    });
    it("displays a list of branches and the first option is a special one for the current branch", function() {
      expect(this.view.items.length).toBe(3);
      return expect(this.view.items[0].name).toEqual('== Current ==');
    });
    it("has a property called result which is a promise", function() {
      expect(this.view.result).toBeDefined();
      expect(this.view.result.then).toBeDefined();
      return expect(this.view.result["catch"]).toBeDefined();
    });
    describe("when the special option is selected", function() {
      return it("calls git.cmd with ['pull'] and remote name", function() {
        this.view.confirmSelection();
        waitsFor(function() {
          return git.cmd.callCount > 0;
        });
        return runs(function() {
          return expect(git.cmd).toHaveBeenCalledWith(['pull', 'remote'], options);
        });
      });
    });
    describe("when a branch option is selected", function() {
      return it("calls git.cmd with ['pull'], the remote name, and branch name", function() {
        this.view.selectNextItemView();
        this.view.confirmSelection();
        waitsFor(function() {
          return git.cmd.callCount > 0;
        });
        return runs(function() {
          return expect(git.cmd).toHaveBeenCalledWith(['pull', 'remote', 'branch1'], options);
        });
      });
    });
    return describe("when '--rebase' is passed as extraArgs", function() {
      return it("calls git.cmd with ['pull', '--rebase'], the remote name", function() {
        var view;
        view = new PullBranchListView(repo, "branch1\nbranch2", "remote", '--rebase');
        view.confirmSelection();
        waitsFor(function() {
          return git.cmd.callCount > 0;
        });
        return runs(function() {
          return expect(git.cmd).toHaveBeenCalledWith(['pull', '--rebase', 'remote'], options);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvc3BlYy92aWV3cy9wdWxsLWJyYW5jaC1saXN0LXZpZXctc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsc0NBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLGVBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0Esa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHVDQUFSLENBRHJCLENBQUE7O0FBQUEsRUFFQyxPQUFRLE9BQUEsQ0FBUSxhQUFSLEVBQVIsSUFGRCxDQUFBOztBQUFBLEVBR0EsT0FBQSxHQUFVO0FBQUEsSUFBQSxHQUFBLEVBQUssSUFBSSxDQUFDLG1CQUFMLENBQUEsQ0FBTDtHQUhWLENBQUE7O0FBQUEsRUFLQSxRQUFBLENBQVMsb0JBQVQsRUFBK0IsU0FBQSxHQUFBO0FBQzdCLElBQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsSUFBQyxDQUFBLElBQUQsR0FBWSxJQUFBLGtCQUFBLENBQW1CLElBQW5CLEVBQXlCLGtCQUF6QixFQUE2QyxRQUE3QyxFQUF1RCxFQUF2RCxDQUFaLENBQUE7YUFDQSxLQUFBLENBQU0sR0FBTixFQUFXLEtBQVgsQ0FBaUIsQ0FBQyxTQUFsQixDQUE0QixPQUFPLENBQUMsT0FBUixDQUFnQixRQUFoQixDQUE1QixFQUZTO0lBQUEsQ0FBWCxDQUFBLENBQUE7QUFBQSxJQUlBLEVBQUEsQ0FBRywwRkFBSCxFQUErRixTQUFBLEdBQUE7QUFDN0YsTUFBQSxNQUFBLENBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBbkIsQ0FBMEIsQ0FBQyxJQUEzQixDQUFnQyxDQUFoQyxDQUFBLENBQUE7YUFDQSxNQUFBLENBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFNLENBQUEsQ0FB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

//# sourceURL=/home/jakob/.atom/packages/git-plus/spec/views/pull-branch-list-view-spec.coffee
