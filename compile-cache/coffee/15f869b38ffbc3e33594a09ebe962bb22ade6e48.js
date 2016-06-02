(function() {
  var GitMerge, git, repo;

  repo = require('../fixtures').repo;

  git = require('../../lib/git');

  GitMerge = require('../../lib/models/git-merge');

  describe("GitMerge", function() {
    describe("when called with no options", function() {
      return it("calls git.cmd with 'branch'", function() {
        spyOn(git, 'cmd').andReturn(Promise.resolve(''));
        GitMerge(repo);
        return expect(git.cmd).toHaveBeenCalledWith(['branch'], {
          cwd: repo.getWorkingDirectory()
        });
      });
    });
    return describe("when called with { remote: true } option", function() {
      return it("calls git.cmd with 'remote branch'", function() {
        spyOn(git, 'cmd').andReturn(Promise.resolve(''));
        GitMerge(repo, {
          remote: true
        });
        return expect(git.cmd).toHaveBeenCalledWith(['branch', '-r'], {
          cwd: repo.getWorkingDirectory()
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvc3BlYy9tb2RlbHMvZ2l0LW1lcmdlLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1CQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsYUFBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUNBLEdBQUEsR0FBTSxPQUFBLENBQVEsZUFBUixDQUROLENBQUE7O0FBQUEsRUFFQSxRQUFBLEdBQVcsT0FBQSxDQUFRLDRCQUFSLENBRlgsQ0FBQTs7QUFBQSxFQUlBLFFBQUEsQ0FBUyxVQUFULEVBQXFCLFNBQUEsR0FBQTtBQUNuQixJQUFBLFFBQUEsQ0FBUyw2QkFBVCxFQUF3QyxTQUFBLEdBQUE7YUFDdEMsRUFBQSxDQUFHLDZCQUFILEVBQWtDLFNBQUEsR0FBQTtBQUNoQyxRQUFBLEtBQUEsQ0FBTSxHQUFOLEVBQVcsS0FBWCxDQUFpQixDQUFDLFNBQWxCLENBQTRCLE9BQU8sQ0FBQyxPQUFSLENBQWdCLEVBQWhCLENBQTVCLENBQUEsQ0FBQTtBQUFBLFFBQ0EsUUFBQSxDQUFTLElBQVQsQ0FEQSxDQUFBO2VBRUEsTUFBQSxDQUFPLEdBQUcsQ0FBQyxHQUFYLENBQWUsQ0FBQyxvQkFBaEIsQ0FBcUMsQ0FBQyxRQUFELENBQXJDLEVBQWlEO0FBQUEsVUFBQSxHQUFBLEVBQUssSUFBSSxDQUFDLG1CQUFMLENBQUEsQ0FBTDtTQUFqRCxFQUhnQztNQUFBLENBQWxDLEVBRHNDO0lBQUEsQ0FBeEMsQ0FBQSxDQUFBO1dBTUEsUUFBQSxDQUFTLDBDQUFULEVBQXFELFNBQUEsR0FBQTthQUNuRCxFQUFBLENBQUcsb0NBQUgsRUFBeUMsU0FBQSxHQUFBO0FBQ3ZDLFFBQUEsS0FBQSxDQUFNLEdBQU4sRUFBVyxLQUFYLENBQWlCLENBQUMsU0FBbEIsQ0FBNEIsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsRUFBaEIsQ0FBNUIsQ0FBQSxDQUFBO0FBQUEsUUFDQSxRQUFBLENBQVMsSUFBVCxFQUFlO0FBQUEsVUFBQSxNQUFBLEVBQVEsSUFBUjtTQUFmLENBREEsQ0FBQTtlQUVBLE1BQUEsQ0FBTyxHQUFHLENBQUMsR0FBWCxDQUFlLENBQUMsb0JBQWhCLENBQXFDLENBQUMsUUFBRCxFQUFXLElBQVgsQ0FBckMsRUFBdUQ7QUFBQSxVQUFBLEdBQUEsRUFBSyxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQUFMO1NBQXZELEVBSHVDO01BQUEsQ0FBekMsRUFEbUQ7SUFBQSxDQUFyRCxFQVBtQjtFQUFBLENBQXJCLENBSkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/jakob/.atom/packages/git-plus/spec/models/git-merge-spec.coffee
