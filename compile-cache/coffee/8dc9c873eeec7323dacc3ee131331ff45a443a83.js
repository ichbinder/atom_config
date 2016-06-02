(function() {
  var BranchListView, git, repo;

  git = require('../../lib/git');

  repo = require('../fixtures').repo;

  BranchListView = require('../../lib/views/branch-list-view');

  describe("BranchListView", function() {
    beforeEach(function() {
      this.view = new BranchListView(repo, "branch1\nbranch2");
      return spyOn(git, 'cmd').andCallFake(function() {
        return Promise.reject('blah');
      });
    });
    it("displays a list of branches", function() {
      return expect(this.view.items.length).toBe(2);
    });
    return it("checkouts the selected branch", function() {
      this.view.confirmSelection();
      this.view.checkout('branch1');
      waitsFor(function() {
        return git.cmd.callCount > 0;
      });
      return runs(function() {
        return expect(git.cmd).toHaveBeenCalledWith(['checkout', 'branch1'], {
          cwd: repo.getWorkingDirectory()
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvc3BlYy92aWV3cy9icmFuY2gtbGlzdC12aWV3LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxlQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNDLE9BQVEsT0FBQSxDQUFRLGFBQVIsRUFBUixJQURELENBQUE7O0FBQUEsRUFFQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxrQ0FBUixDQUZqQixDQUFBOztBQUFBLEVBSUEsUUFBQSxDQUFTLGdCQUFULEVBQTJCLFNBQUEsR0FBQTtBQUN6QixJQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLElBQUMsQ0FBQSxJQUFELEdBQVksSUFBQSxjQUFBLENBQWUsSUFBZixFQUFxQixrQkFBckIsQ0FBWixDQUFBO2FBQ0EsS0FBQSxDQUFNLEdBQU4sRUFBVyxLQUFYLENBQWlCLENBQUMsV0FBbEIsQ0FBOEIsU0FBQSxHQUFBO2VBQzVCLE9BQU8sQ0FBQyxNQUFSLENBQWUsTUFBZixFQUQ0QjtNQUFBLENBQTlCLEVBRlM7SUFBQSxDQUFYLENBQUEsQ0FBQTtBQUFBLElBS0EsRUFBQSxDQUFHLDZCQUFILEVBQWtDLFNBQUEsR0FBQTthQUNoQyxNQUFBLENBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBbkIsQ0FBMEIsQ0FBQyxJQUEzQixDQUFnQyxDQUFoQyxFQURnQztJQUFBLENBQWxDLENBTEEsQ0FBQTtXQVFBLEVBQUEsQ0FBRywrQkFBSCxFQUFvQyxTQUFBLEdBQUE7QUFDbEMsTUFBQSxJQUFDLENBQUEsSUFBSSxDQUFDLGdCQUFOLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsSUFBSSxDQUFDLFFBQU4sQ0FBZSxTQUFmLENBREEsQ0FBQTtBQUFBLE1BRUEsUUFBQSxDQUFTLFNBQUEsR0FBQTtlQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUixHQUFvQixFQUF2QjtNQUFBLENBQVQsQ0FGQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE1BQUEsQ0FBTyxHQUFHLENBQUMsR0FBWCxDQUFlLENBQUMsb0JBQWhCLENBQXFDLENBQUMsVUFBRCxFQUFhLFNBQWIsQ0FBckMsRUFBOEQ7QUFBQSxVQUFBLEdBQUEsRUFBSyxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQUFMO1NBQTlELEVBREc7TUFBQSxDQUFMLEVBSmtDO0lBQUEsQ0FBcEMsRUFUeUI7RUFBQSxDQUEzQixDQUpBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/jakob/.atom/packages/git-plus/spec/views/branch-list-view-spec.coffee
