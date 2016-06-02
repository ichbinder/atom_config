(function() {
  var MinimapFindAndReplace, WorkspaceView;

  MinimapFindAndReplace = require('../lib/minimap-find-and-replace');

  WorkspaceView = require('atom').WorkspaceView;

  describe("MinimapFindAndReplace", function() {
    beforeEach(function() {
      runs(function() {
        atom.workspaceView = new WorkspaceView;
        return atom.workspaceView.openSync('sample.js');
      });
      runs(function() {
        var editorView;
        atom.workspaceView.attachToDom();
        editorView = atom.workspaceView.getActiveView();
        return editorView.setText("This is the file content");
      });
      waitsForPromise(function() {
        var promise;
        promise = atom.packages.activatePackage('minimap');
        atom.workspaceView.trigger('minimap:toggle');
        return promise;
      });
      return waitsForPromise(function() {
        var promise;
        promise = atom.packages.activatePackage('find-and-replace');
        atom.workspaceView.trigger('find-and-replace:show');
        return promise;
      });
    });
    return describe("when the toggle event is triggered", function() {
      beforeEach(function() {
        return waitsForPromise(function() {
          var promise;
          promise = atom.packages.activatePackage('minimap-find-and-replace');
          atom.workspaceView.trigger('minimap-find-and-replace:toggle');
          return promise;
        });
      });
      return it('should exist', function() {
        return expect();
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvbWluaW1hcC1maW5kLWFuZC1yZXBsYWNlL3NwZWMvbWluaW1hcC1maW5kLWFuZC1yZXBsYWNlLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9DQUFBOztBQUFBLEVBQUEscUJBQUEsR0FBd0IsT0FBQSxDQUFRLGlDQUFSLENBQXhCLENBQUE7O0FBQUEsRUFDQyxnQkFBaUIsT0FBQSxDQUFRLE1BQVIsRUFBakIsYUFERCxDQUFBOztBQUFBLEVBR0EsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTtBQUNoQyxJQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxRQUFBLElBQUksQ0FBQyxhQUFMLEdBQXFCLEdBQUEsQ0FBQSxhQUFyQixDQUFBO2VBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFuQixDQUE0QixXQUE1QixFQUZHO01BQUEsQ0FBTCxDQUFBLENBQUE7QUFBQSxNQUlBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxZQUFBLFVBQUE7QUFBQSxRQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBbkIsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLFVBQUEsR0FBYSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQW5CLENBQUEsQ0FEYixDQUFBO2VBRUEsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsMEJBQW5CLEVBSEc7TUFBQSxDQUFMLENBSkEsQ0FBQTtBQUFBLE1BU0EsZUFBQSxDQUFnQixTQUFBLEdBQUE7QUFDZCxZQUFBLE9BQUE7QUFBQSxRQUFBLE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsU0FBOUIsQ0FBVixDQUFBO0FBQUEsUUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGdCQUEzQixDQURBLENBQUE7ZUFFQSxRQUhjO01BQUEsQ0FBaEIsQ0FUQSxDQUFBO2FBY0EsZUFBQSxDQUFnQixTQUFBLEdBQUE7QUFDZCxZQUFBLE9BQUE7QUFBQSxRQUFBLE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsa0JBQTlCLENBQVYsQ0FBQTtBQUFBLFFBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQix1QkFBM0IsQ0FEQSxDQUFBO2VBRUEsUUFIYztNQUFBLENBQWhCLEVBZlM7SUFBQSxDQUFYLENBQUEsQ0FBQTtXQW9CQSxRQUFBLENBQVMsb0NBQVQsRUFBK0MsU0FBQSxHQUFBO0FBQzdDLE1BQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtlQUNULGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO0FBQ2QsY0FBQSxPQUFBO0FBQUEsVUFBQSxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLDBCQUE5QixDQUFWLENBQUE7QUFBQSxVQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsaUNBQTNCLENBREEsQ0FBQTtpQkFFQSxRQUhjO1FBQUEsQ0FBaEIsRUFEUztNQUFBLENBQVgsQ0FBQSxDQUFBO2FBTUEsRUFBQSxDQUFHLGNBQUgsRUFBbUIsU0FBQSxHQUFBO2VBQ2pCLE1BQUEsQ0FBQSxFQURpQjtNQUFBLENBQW5CLEVBUDZDO0lBQUEsQ0FBL0MsRUFyQmdDO0VBQUEsQ0FBbEMsQ0FIQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/jakob/.atom/packages/minimap-find-and-replace/spec/minimap-find-and-replace-spec.coffee
