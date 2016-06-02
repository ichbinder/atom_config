(function() {
  var Path, head, mocks, pathToRepoFile;

  Path = require('flavored-path');

  pathToRepoFile = Path.get("~/some/repository/directory/file");

  head = jasmine.createSpyObj('head', ['replace']);

  module.exports = mocks = {
    pathToRepoFile: pathToRepoFile,
    repo: {
      getPath: function() {
        return Path.join(this.getWorkingDirectory(), ".git");
      },
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
      getReferences: function() {
        return {
          heads: [head]
        };
      },
      getShortHead: function() {
        return 'short head';
      },
      isPathModified: function() {
        return false;
      },
      repo: {
        submoduleForPath: function(path) {
          return void 0;
        }
      }
    },
    currentPane: {
      isAlive: function() {
        return true;
      },
      activate: function() {
        return void 0;
      },
      destroy: function() {
        return void 0;
      },
      getItems: function() {
        return [
          {
            getURI: function() {
              return pathToRepoFile;
            }
          }
        ];
      }
    },
    commitPane: {
      isAlive: function() {
        return true;
      },
      destroy: function() {
        return mocks.textEditor.destroy();
      },
      splitRight: function() {
        return void 0;
      },
      getItems: function() {
        return [
          {
            getURI: function() {
              return Path.join(mocks.repo.getPath(), 'COMMIT_EDITMSG');
            }
          }
        ];
      }
    },
    textEditor: {
      getPath: function() {
        return pathToRepoFile;
      },
      getURI: function() {
        return pathToRepoFile;
      },
      onDidDestroy: function(destroy) {
        this.destroy = destroy;
        return {
          dispose: function() {}
        };
      },
      onDidSave: function(save) {
        this.save = save;
        return {
          dispose: function() {
            return void 0;
          }
        };
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvc3BlYy9maXh0dXJlcy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsaUNBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLGVBQVIsQ0FBUCxDQUFBOztBQUFBLEVBRUEsY0FBQSxHQUFpQixJQUFJLENBQUMsR0FBTCxDQUFTLGtDQUFULENBRmpCLENBQUE7O0FBQUEsRUFJQSxJQUFBLEdBQU8sT0FBTyxDQUFDLFlBQVIsQ0FBcUIsTUFBckIsRUFBNkIsQ0FBQyxTQUFELENBQTdCLENBSlAsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLEtBQUEsR0FDZjtBQUFBLElBQUEsY0FBQSxFQUFnQixjQUFoQjtBQUFBLElBRUEsSUFBQSxFQUNFO0FBQUEsTUFBQSxPQUFBLEVBQVMsU0FBQSxHQUFBO2VBQUcsSUFBSSxDQUFDLElBQUwsQ0FBVSxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQUFWLEVBQXNDLE1BQXRDLEVBQUg7TUFBQSxDQUFUO0FBQUEsTUFDQSxtQkFBQSxFQUFxQixTQUFBLEdBQUE7ZUFBRyxJQUFJLENBQUMsR0FBTCxDQUFTLG1CQUFULEVBQUg7TUFBQSxDQURyQjtBQUFBLE1BRUEsYUFBQSxFQUFlLFNBQUEsR0FBQTtlQUFHLE9BQUg7TUFBQSxDQUZmO0FBQUEsTUFHQSxVQUFBLEVBQVksU0FBQyxJQUFELEdBQUE7QUFBVSxRQUFBLElBQW9CLElBQUEsS0FBUSxjQUE1QjtpQkFBQSxpQkFBQTtTQUFWO01BQUEsQ0FIWjtBQUFBLE1BSUEsYUFBQSxFQUFlLFNBQUEsR0FBQTtlQUNiO0FBQUEsVUFBQSxLQUFBLEVBQU8sQ0FBQyxJQUFELENBQVA7VUFEYTtNQUFBLENBSmY7QUFBQSxNQU1BLFlBQUEsRUFBYyxTQUFBLEdBQUE7ZUFBRyxhQUFIO01BQUEsQ0FOZDtBQUFBLE1BT0EsY0FBQSxFQUFnQixTQUFBLEdBQUE7ZUFBRyxNQUFIO01BQUEsQ0FQaEI7QUFBQSxNQVFBLElBQUEsRUFDRTtBQUFBLFFBQUEsZ0JBQUEsRUFBa0IsU0FBQyxJQUFELEdBQUE7aUJBQVUsT0FBVjtRQUFBLENBQWxCO09BVEY7S0FIRjtBQUFBLElBY0EsV0FBQSxFQUNFO0FBQUEsTUFBQSxPQUFBLEVBQVMsU0FBQSxHQUFBO2VBQUcsS0FBSDtNQUFBLENBQVQ7QUFBQSxNQUNBLFFBQUEsRUFBVSxTQUFBLEdBQUE7ZUFBRyxPQUFIO01BQUEsQ0FEVjtBQUFBLE1BRUEsT0FBQSxFQUFTLFNBQUEsR0FBQTtlQUFHLE9BQUg7TUFBQSxDQUZUO0FBQUEsTUFHQSxRQUFBLEVBQVUsU0FBQSxHQUFBO2VBQUc7VUFDWDtBQUFBLFlBQUEsTUFBQSxFQUFRLFNBQUEsR0FBQTtxQkFBRyxlQUFIO1lBQUEsQ0FBUjtXQURXO1VBQUg7TUFBQSxDQUhWO0tBZkY7QUFBQSxJQXNCQSxVQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBUyxTQUFBLEdBQUE7ZUFBRyxLQUFIO01BQUEsQ0FBVDtBQUFBLE1BQ0EsT0FBQSxFQUFTLFNBQUEsR0FBQTtlQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBakIsQ0FBQSxFQUFIO01BQUEsQ0FEVDtBQUFBLE1BRUEsVUFBQSxFQUFZLFNBQUEsR0FBQTtlQUFHLE9BQUg7TUFBQSxDQUZaO0FBQUEsTUFHQSxRQUFBLEVBQVUsU0FBQSxHQUFBO2VBQUc7VUFDWDtBQUFBLFlBQUEsTUFBQSxFQUFRLFNBQUEsR0FBQTtxQkFBRyxJQUFJLENBQUMsSUFBTCxDQUFVLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBWCxDQUFBLENBQVYsRUFBZ0MsZ0JBQWhDLEVBQUg7WUFBQSxDQUFSO1dBRFc7VUFBSDtNQUFBLENBSFY7S0F2QkY7QUFBQSxJQThCQSxVQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBUyxTQUFBLEdBQUE7ZUFBRyxlQUFIO01BQUEsQ0FBVDtBQUFBLE1BQ0EsTUFBQSxFQUFRLFNBQUEsR0FBQTtlQUFHLGVBQUg7TUFBQSxDQURSO0FBQUEsTUFFQSxZQUFBLEVBQWMsU0FBRSxPQUFGLEdBQUE7QUFDWixRQURhLElBQUMsQ0FBQSxVQUFBLE9BQ2QsQ0FBQTtlQUFBO0FBQUEsVUFBQSxPQUFBLEVBQVMsU0FBQSxHQUFBLENBQVQ7VUFEWTtNQUFBLENBRmQ7QUFBQSxNQUlBLFNBQUEsRUFBVyxTQUFFLElBQUYsR0FBQTtBQUNULFFBRFUsSUFBQyxDQUFBLE9BQUEsSUFDWCxDQUFBO2VBQUE7QUFBQSxVQUFBLE9BQUEsRUFBUyxTQUFBLEdBQUE7bUJBQUcsT0FBSDtVQUFBLENBQVQ7VUFEUztNQUFBLENBSlg7S0EvQkY7R0FQRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/jakob/.atom/packages/git-plus/spec/fixtures.coffee
