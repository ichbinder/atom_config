(function() {
  var TagCreateView, git, repo;

  git = require('../../lib/git');

  repo = require('../fixtures').repo;

  TagCreateView = require('../../lib/views/tag-create-view');

  describe("TagCreateView", function() {
    return describe("when there are two tags", function() {
      beforeEach(function() {
        return this.view = new TagCreateView(repo);
      });
      it("displays inputs for tag name and message", function() {
        expect(this.view.tagName).toBeDefined();
        return expect(this.view.tagMessage).toBeDefined();
      });
      return it("creates a tag with the given name and message", function() {
        var cwd;
        spyOn(git, 'cmd').andReturn(Promise.resolve(0));
        cwd = repo.getWorkingDirectory();
        this.view.tagName.setText('tag1');
        this.view.tagMessage.setText('tag1 message');
        this.view.find('.gp-confirm-button').click();
        return expect(git.cmd).toHaveBeenCalledWith(['tag', '-a', 'tag1', '-m', 'tag1 message'], {
          cwd: cwd
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvc3BlYy92aWV3cy90YWctY3JlYXRlLXZpZXctc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsd0JBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLGVBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0MsT0FBUSxPQUFBLENBQVEsYUFBUixFQUFSLElBREQsQ0FBQTs7QUFBQSxFQUVBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLGlDQUFSLENBRmhCLENBQUE7O0FBQUEsRUFJQSxRQUFBLENBQVMsZUFBVCxFQUEwQixTQUFBLEdBQUE7V0FDeEIsUUFBQSxDQUFTLHlCQUFULEVBQW9DLFNBQUEsR0FBQTtBQUNsQyxNQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7ZUFDVCxJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsYUFBQSxDQUFjLElBQWQsRUFESDtNQUFBLENBQVgsQ0FBQSxDQUFBO0FBQUEsTUFHQSxFQUFBLENBQUcsMENBQUgsRUFBK0MsU0FBQSxHQUFBO0FBQzdDLFFBQUEsTUFBQSxDQUFPLElBQUMsQ0FBQSxJQUFJLENBQUMsT0FBYixDQUFxQixDQUFDLFdBQXRCLENBQUEsQ0FBQSxDQUFBO2VBQ0EsTUFBQSxDQUFPLElBQUMsQ0FBQSxJQUFJLENBQUMsVUFBYixDQUF3QixDQUFDLFdBQXpCLENBQUEsRUFGNkM7TUFBQSxDQUEvQyxDQUhBLENBQUE7YUFPQSxFQUFBLENBQUcsK0NBQUgsRUFBb0QsU0FBQSxHQUFBO0FBQ2xELFlBQUEsR0FBQTtBQUFBLFFBQUEsS0FBQSxDQUFNLEdBQU4sRUFBVyxLQUFYLENBQWlCLENBQUMsU0FBbEIsQ0FBNEIsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsQ0FBaEIsQ0FBNUIsQ0FBQSxDQUFBO0FBQUEsUUFDQSxHQUFBLEdBQU0sSUFBSSxDQUFDLG1CQUFMLENBQUEsQ0FETixDQUFBO0FBQUEsUUFFQSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFkLENBQXNCLE1BQXRCLENBRkEsQ0FBQTtBQUFBLFFBR0EsSUFBQyxDQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBakIsQ0FBeUIsY0FBekIsQ0FIQSxDQUFBO0FBQUEsUUFJQSxJQUFDLENBQUEsSUFBSSxDQUFDLElBQU4sQ0FBVyxvQkFBWCxDQUFnQyxDQUFDLEtBQWpDLENBQUEsQ0FKQSxDQUFBO2VBS0EsTUFBQSxDQUFPLEdBQUcsQ0FBQyxHQUFYLENBQWUsQ0FBQyxvQkFBaEIsQ0FBcUMsQ0FBQyxLQUFELEVBQVEsSUFBUixFQUFjLE1BQWQsRUFBc0IsSUFBdEIsRUFBNEIsY0FBNUIsQ0FBckMsRUFBa0Y7QUFBQSxVQUFDLEtBQUEsR0FBRDtTQUFsRixFQU5rRDtNQUFBLENBQXBELEVBUmtDO0lBQUEsQ0FBcEMsRUFEd0I7RUFBQSxDQUExQixDQUpBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/jakob/.atom/packages/git-plus/spec/views/tag-create-view-spec.coffee
