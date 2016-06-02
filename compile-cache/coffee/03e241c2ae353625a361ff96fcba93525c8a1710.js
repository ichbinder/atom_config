(function() {
  var fs, path;

  fs = require("fs-plus");

  path = require("path");

  module.exports = {
    repositoryForPath: function(goalPath) {
      var directory, i, _i, _len, _ref;
      _ref = atom.project.getDirectories();
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        directory = _ref[i];
        if (goalPath === directory.getPath() || directory.contains(goalPath)) {
          return atom.project.getRepositories()[i];
        }
      }
      return null;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvbWluaW1hcC1naXQtZGlmZi9saWIvaGVscGVycy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsUUFBQTs7QUFBQSxFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUFMLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FEUCxDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsaUJBQUEsRUFBbUIsU0FBQyxRQUFELEdBQUE7QUFDakIsVUFBQSw0QkFBQTtBQUFBO0FBQUEsV0FBQSxtREFBQTs0QkFBQTtBQUNFLFFBQUEsSUFBRyxRQUFBLEtBQVksU0FBUyxDQUFDLE9BQVYsQ0FBQSxDQUFaLElBQW1DLFNBQVMsQ0FBQyxRQUFWLENBQW1CLFFBQW5CLENBQXRDO0FBQ0UsaUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFiLENBQUEsQ0FBK0IsQ0FBQSxDQUFBLENBQXRDLENBREY7U0FERjtBQUFBLE9BQUE7YUFHQSxLQUppQjtJQUFBLENBQW5CO0dBSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/jakob/.atom/packages/minimap-git-diff/lib/helpers.coffee
