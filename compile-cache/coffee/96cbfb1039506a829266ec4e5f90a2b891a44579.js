(function() {
  var $, GitTimeMachineView, Path, View, _ref;

  _ref = require("atom-space-pen-views"), $ = _ref.$, View = _ref.View;

  Path = require('path');

  GitTimeMachineView = require('../lib/git-time-machine-view');

  describe("GitTimeMachineView", function() {
    return describe("when open", function() {
      var activationPromise, timeMachineElement, workspaceElement, _ref1;
      _ref1 = [], workspaceElement = _ref1[0], activationPromise = _ref1[1], timeMachineElement = _ref1[2];
      beforeEach(function() {
        activationPromise = atom.packages.activatePackage('git-time-machine');
        workspaceElement = atom.views.getView(atom.workspace);
        atom.commands.dispatch(workspaceElement, 'git-time-machine:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          return timeMachineElement = workspaceElement.querySelector('.git-time-machine');
        });
      });
      it("should not show timeplot if no file loaded", function() {
        return expect(timeMachineElement.innerHTML).toEqual("");
      });
      return describe("after opening a known file", function() {
        beforeEach(function() {
          var openPromise;
          openPromise = atom.workspace.open("" + __dirname + "/test-data/fiveCommits.txt");
          waitsForPromise(function() {
            return openPromise;
          });
          return runs(function() {
            timeMachineElement = workspaceElement.querySelector('.git-time-machine');
          });
        });
        it("should not be showing placeholder", function() {
          return expect(timeMachineElement.querySelector('.placeholder')).not.toExist();
        });
        it("should be showing timeline", function() {
          return expect(timeMachineElement.querySelector('.timeplot')).toExist();
        });
        return it("total-commits should be five", function() {
          var totalCommits;
          totalCommits = $(timeMachineElement).find('.total-commits').text();
          return expect(totalCommits).toEqual("5");
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXRpbWUtbWFjaGluZS9zcGVjL2dpdC10aW1lLW1hY2hpbmUtdmlldy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSx1Q0FBQTs7QUFBQSxFQUFBLE9BQVksT0FBQSxDQUFRLHNCQUFSLENBQVosRUFBQyxTQUFBLENBQUQsRUFBSSxZQUFBLElBQUosQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFHQSxrQkFBQSxHQUFxQixPQUFBLENBQVEsOEJBQVIsQ0FIckIsQ0FBQTs7QUFBQSxFQU1BLFFBQUEsQ0FBUyxvQkFBVCxFQUErQixTQUFBLEdBQUE7V0FFN0IsUUFBQSxDQUFTLFdBQVQsRUFBc0IsU0FBQSxHQUFBO0FBQ3BCLFVBQUEsOERBQUE7QUFBQSxNQUFBLFFBQTRELEVBQTVELEVBQUMsMkJBQUQsRUFBbUIsNEJBQW5CLEVBQXNDLDZCQUF0QyxDQUFBO0FBQUEsTUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsUUFBQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsa0JBQTlCLENBQXBCLENBQUE7QUFBQSxRQUNBLGdCQUFBLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEIsQ0FEbkIsQ0FBQTtBQUFBLFFBRUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5Qyx5QkFBekMsQ0FGQSxDQUFBO0FBQUEsUUFHQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBSEEsQ0FBQTtlQUtBLElBQUEsQ0FBSyxTQUFBLEdBQUE7aUJBQ0gsa0JBQUEsR0FBcUIsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsbUJBQS9CLEVBRGxCO1FBQUEsQ0FBTCxFQU5TO01BQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxNQWlCQSxFQUFBLENBQUcsNENBQUgsRUFBaUQsU0FBQSxHQUFBO2VBQy9DLE1BQUEsQ0FBTyxrQkFBa0IsQ0FBQyxTQUExQixDQUFvQyxDQUFDLE9BQXJDLENBQTZDLEVBQTdDLEVBRCtDO01BQUEsQ0FBakQsQ0FqQkEsQ0FBQTthQW9CQSxRQUFBLENBQVMsNEJBQVQsRUFBdUMsU0FBQSxHQUFBO0FBQ3JDLFFBQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUdULGNBQUEsV0FBQTtBQUFBLFVBQUEsV0FBQSxHQUFjLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixFQUFBLEdBQUcsU0FBSCxHQUFhLDRCQUFqQyxDQUFkLENBQUE7QUFBQSxVQUNBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO0FBQ2QsbUJBQU8sV0FBUCxDQURjO1VBQUEsQ0FBaEIsQ0FEQSxDQUFBO2lCQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxZQUFBLGtCQUFBLEdBQXFCLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLG1CQUEvQixDQUFyQixDQURHO1VBQUEsQ0FBTCxFQU5TO1FBQUEsQ0FBWCxDQUFBLENBQUE7QUFBQSxRQVVBLEVBQUEsQ0FBRyxtQ0FBSCxFQUF3QyxTQUFBLEdBQUE7aUJBQ3RDLE1BQUEsQ0FBTyxrQkFBa0IsQ0FBQyxhQUFuQixDQUFpQyxjQUFqQyxDQUFQLENBQXdELENBQUMsR0FBRyxDQUFDLE9BQTdELENBQUEsRUFEc0M7UUFBQSxDQUF4QyxDQVZBLENBQUE7QUFBQSxRQWFBLEVBQUEsQ0FBRyw0QkFBSCxFQUFpQyxTQUFBLEdBQUE7aUJBQy9CLE1BQUEsQ0FBTyxrQkFBa0IsQ0FBQyxhQUFuQixDQUFpQyxXQUFqQyxDQUFQLENBQXFELENBQUMsT0FBdEQsQ0FBQSxFQUQrQjtRQUFBLENBQWpDLENBYkEsQ0FBQTtlQWdCQSxFQUFBLENBQUcsOEJBQUgsRUFBbUMsU0FBQSxHQUFBO0FBQ2pDLGNBQUEsWUFBQTtBQUFBLFVBQUEsWUFBQSxHQUFlLENBQUEsQ0FBRSxrQkFBRixDQUFxQixDQUFDLElBQXRCLENBQTJCLGdCQUEzQixDQUE0QyxDQUFDLElBQTdDLENBQUEsQ0FBZixDQUFBO2lCQUNBLE1BQUEsQ0FBTyxZQUFQLENBQW9CLENBQUMsT0FBckIsQ0FBNkIsR0FBN0IsRUFGaUM7UUFBQSxDQUFuQyxFQWpCcUM7TUFBQSxDQUF2QyxFQXJCb0I7SUFBQSxDQUF0QixFQUY2QjtFQUFBLENBQS9CLENBTkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/jakob/.atom/packages/git-time-machine/spec/git-time-machine-view-spec.coffee
