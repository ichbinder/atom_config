(function() {
  var GitTimeMachine;

  GitTimeMachine = require('../lib/git-time-machine');

  describe("GitTimeMachine", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('git-time-machine');
    });
    return describe("when the git-time-machine:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.git-time-machine')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'git-time-machine:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var gitTimeMachineElement, gitTimeMachinePanel;
          expect(workspaceElement.querySelector('.git-time-machine')).toExist();
          gitTimeMachineElement = workspaceElement.querySelector('.git-time-machine');
          expect(gitTimeMachineElement).toExist();
          gitTimeMachinePanel = atom.workspace.panelForItem(gitTimeMachineElement);
          expect(gitTimeMachinePanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'git-time-machine:toggle');
          return expect(gitTimeMachinePanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.git-time-machine')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'git-time-machine:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var gitTimeMachineElement;
          gitTimeMachineElement = workspaceElement.querySelector('.git-time-machine');
          expect(gitTimeMachineElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'git-time-machine:toggle');
          return expect(gitTimeMachineElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXRpbWUtbWFjaGluZS9zcGVjL2dpdC10aW1lLW1hY2hpbmUtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsY0FBQTs7QUFBQSxFQUFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLHlCQUFSLENBQWpCLENBQUE7O0FBQUEsRUFPQSxRQUFBLENBQVMsZ0JBQVQsRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLFFBQUEseUNBQUE7QUFBQSxJQUFBLE9BQXdDLEVBQXhDLEVBQUMsMEJBQUQsRUFBbUIsMkJBQW5CLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGdCQUFBLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEIsQ0FBbkIsQ0FBQTthQUNBLGlCQUFBLEdBQW9CLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixrQkFBOUIsRUFGWDtJQUFBLENBQVgsQ0FGQSxDQUFBO1dBTUEsUUFBQSxDQUFTLHFEQUFULEVBQWdFLFNBQUEsR0FBQTtBQUM5RCxNQUFBLEVBQUEsQ0FBRyxpQ0FBSCxFQUFzQyxTQUFBLEdBQUE7QUFHcEMsUUFBQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsbUJBQS9CLENBQVAsQ0FBMkQsQ0FBQyxHQUFHLENBQUMsT0FBaEUsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUlBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMseUJBQXpDLENBSkEsQ0FBQTtBQUFBLFFBTUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2Qsa0JBRGM7UUFBQSxDQUFoQixDQU5BLENBQUE7ZUFTQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsY0FBQSwwQ0FBQTtBQUFBLFVBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLG1CQUEvQixDQUFQLENBQTJELENBQUMsT0FBNUQsQ0FBQSxDQUFBLENBQUE7QUFBQSxVQUVBLHFCQUFBLEdBQXdCLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLG1CQUEvQixDQUZ4QixDQUFBO0FBQUEsVUFHQSxNQUFBLENBQU8scUJBQVAsQ0FBNkIsQ0FBQyxPQUE5QixDQUFBLENBSEEsQ0FBQTtBQUFBLFVBS0EsbUJBQUEsR0FBc0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFmLENBQTRCLHFCQUE1QixDQUx0QixDQUFBO0FBQUEsVUFNQSxNQUFBLENBQU8sbUJBQW1CLENBQUMsU0FBcEIsQ0FBQSxDQUFQLENBQXVDLENBQUMsSUFBeEMsQ0FBNkMsSUFBN0MsQ0FOQSxDQUFBO0FBQUEsVUFPQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLHlCQUF6QyxDQVBBLENBQUE7aUJBUUEsTUFBQSxDQUFPLG1CQUFtQixDQUFDLFNBQXBCLENBQUEsQ0FBUCxDQUF1QyxDQUFDLElBQXhDLENBQTZDLEtBQTdDLEVBVEc7UUFBQSxDQUFMLEVBWm9DO01BQUEsQ0FBdEMsQ0FBQSxDQUFBO2FBdUJBLEVBQUEsQ0FBRywwQkFBSCxFQUErQixTQUFBLEdBQUE7QUFPN0IsUUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixnQkFBcEIsQ0FBQSxDQUFBO0FBQUEsUUFFQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsbUJBQS9CLENBQVAsQ0FBMkQsQ0FBQyxHQUFHLENBQUMsT0FBaEUsQ0FBQSxDQUZBLENBQUE7QUFBQSxRQU1BLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMseUJBQXpDLENBTkEsQ0FBQTtBQUFBLFFBUUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2Qsa0JBRGM7UUFBQSxDQUFoQixDQVJBLENBQUE7ZUFXQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBRUgsY0FBQSxxQkFBQTtBQUFBLFVBQUEscUJBQUEsR0FBd0IsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsbUJBQS9CLENBQXhCLENBQUE7QUFBQSxVQUNBLE1BQUEsQ0FBTyxxQkFBUCxDQUE2QixDQUFDLFdBQTlCLENBQUEsQ0FEQSxDQUFBO0FBQUEsVUFFQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLHlCQUF6QyxDQUZBLENBQUE7aUJBR0EsTUFBQSxDQUFPLHFCQUFQLENBQTZCLENBQUMsR0FBRyxDQUFDLFdBQWxDLENBQUEsRUFMRztRQUFBLENBQUwsRUFsQjZCO01BQUEsQ0FBL0IsRUF4QjhEO0lBQUEsQ0FBaEUsRUFQeUI7RUFBQSxDQUEzQixDQVBBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/jakob/.atom/packages/git-time-machine/spec/git-time-machine-spec.coffee
