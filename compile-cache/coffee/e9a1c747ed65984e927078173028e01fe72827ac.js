(function() {
  var OutputViewManager, Path, git, notifier;

  Path = require('flavored-path');

  git = require('../git');

  notifier = require('../notifier');

  OutputViewManager = require('../output-view-manager');

  module.exports = function(repo, _arg) {
    var file, _ref;
    file = (_arg != null ? _arg : {}).file;
    if (file == null) {
      file = repo.relativize((_ref = atom.workspace.getActiveTextEditor()) != null ? _ref.getPath() : void 0);
    }
    if (!file) {
      return notifier.addInfo("No open file. Select 'Diff All'.");
    }
    return git.getConfig('diff.tool', repo.getWorkingDirectory()).then(function(tool) {
      if (!tool) {
        return notifier.addInfo("You don't have a difftool configured.");
      } else {
        return git.cmd(['diff-index', 'HEAD', '-z'], {
          cwd: repo.getWorkingDirectory()
        }).then(function(data) {
          var args, diffIndex, diffsForCurrentFile, includeStagedDiff;
          diffIndex = data.split('\0');
          includeStagedDiff = atom.config.get('git-plus.includeStagedDiff');
          diffsForCurrentFile = diffIndex.map(function(line, i) {
            var path, staged;
            if (i % 2 === 0) {
              staged = !/^0{40}$/.test(diffIndex[i].split(' ')[3]);
              path = diffIndex[i + 1];
              if (path === file && (!staged || includeStagedDiff)) {
                return true;
              }
            } else {
              return void 0;
            }
          });
          if (diffsForCurrentFile.filter(function(diff) {
            return diff != null;
          })[0] != null) {
            args = ['difftool', '--no-prompt'];
            if (includeStagedDiff) {
              args.push('HEAD');
            }
            args.push(file);
            return git.cmd(args, {
              cwd: repo.getWorkingDirectory()
            })["catch"](function(msg) {
              return OutputViewManager["new"]().addLine(msg).finish();
            });
          } else {
            return notifier.addInfo('Nothing to show.');
          }
        });
      }
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL21vZGVscy9naXQtZGlmZnRvb2wuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNDQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxlQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUROLENBQUE7O0FBQUEsRUFFQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FGWCxDQUFBOztBQUFBLEVBR0EsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLHdCQUFSLENBSHBCLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLElBQUQsRUFBTyxJQUFQLEdBQUE7QUFDZixRQUFBLFVBQUE7QUFBQSxJQUR1Qix1QkFBRCxPQUFPLElBQU4sSUFDdkIsQ0FBQTs7TUFBQSxPQUFRLElBQUksQ0FBQyxVQUFMLDZEQUFvRCxDQUFFLE9BQXRDLENBQUEsVUFBaEI7S0FBUjtBQUNBLElBQUEsSUFBRyxDQUFBLElBQUg7QUFDRSxhQUFPLFFBQVEsQ0FBQyxPQUFULENBQWlCLGtDQUFqQixDQUFQLENBREY7S0FEQTtXQUtBLEdBQUcsQ0FBQyxTQUFKLENBQWMsV0FBZCxFQUEyQixJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQUEzQixDQUFzRCxDQUFDLElBQXZELENBQTRELFNBQUMsSUFBRCxHQUFBO0FBQzFELE1BQUEsSUFBQSxDQUFBLElBQUE7ZUFDRSxRQUFRLENBQUMsT0FBVCxDQUFpQix1Q0FBakIsRUFERjtPQUFBLE1BQUE7ZUFHRSxHQUFHLENBQUMsR0FBSixDQUFRLENBQUMsWUFBRCxFQUFlLE1BQWYsRUFBdUIsSUFBdkIsQ0FBUixFQUFzQztBQUFBLFVBQUEsR0FBQSxFQUFLLElBQUksQ0FBQyxtQkFBTCxDQUFBLENBQUw7U0FBdEMsQ0FDQSxDQUFDLElBREQsQ0FDTSxTQUFDLElBQUQsR0FBQTtBQUNKLGNBQUEsdURBQUE7QUFBQSxVQUFBLFNBQUEsR0FBWSxJQUFJLENBQUMsS0FBTCxDQUFXLElBQVgsQ0FBWixDQUFBO0FBQUEsVUFDQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsNEJBQWhCLENBRHBCLENBQUE7QUFBQSxVQUVBLG1CQUFBLEdBQXNCLFNBQVMsQ0FBQyxHQUFWLENBQWMsU0FBQyxJQUFELEVBQU8sQ0FBUCxHQUFBO0FBQ2xDLGdCQUFBLFlBQUE7QUFBQSxZQUFBLElBQUcsQ0FBQSxHQUFJLENBQUosS0FBUyxDQUFaO0FBQ0UsY0FBQSxNQUFBLEdBQVMsQ0FBQSxTQUFhLENBQUMsSUFBVixDQUFlLFNBQVUsQ0FBQSxDQUFBLENBQUUsQ0FBQyxLQUFiLENBQW1CLEdBQW5CLENBQXdCLENBQUEsQ0FBQSxDQUF2QyxDQUFiLENBQUE7QUFBQSxjQUNBLElBQUEsR0FBTyxTQUFVLENBQUEsQ0FBQSxHQUFFLENBQUYsQ0FEakIsQ0FBQTtBQUVBLGNBQUEsSUFBUSxJQUFBLEtBQVEsSUFBUixJQUFpQixDQUFDLENBQUEsTUFBQSxJQUFXLGlCQUFaLENBQXpCO3VCQUFBLEtBQUE7ZUFIRjthQUFBLE1BQUE7cUJBS0UsT0FMRjthQURrQztVQUFBLENBQWQsQ0FGdEIsQ0FBQTtBQVVBLFVBQUEsSUFBRzs7dUJBQUg7QUFDRSxZQUFBLElBQUEsR0FBTyxDQUFDLFVBQUQsRUFBYSxhQUFiLENBQVAsQ0FBQTtBQUNBLFlBQUEsSUFBb0IsaUJBQXBCO0FBQUEsY0FBQSxJQUFJLENBQUMsSUFBTCxDQUFVLE1BQVYsQ0FBQSxDQUFBO2FBREE7QUFBQSxZQUVBLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBVixDQUZBLENBQUE7bUJBR0EsR0FBRyxDQUFDLEdBQUosQ0FBUSxJQUFSLEVBQWM7QUFBQSxjQUFBLEdBQUEsRUFBSyxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQUFMO2FBQWQsQ0FDQSxDQUFDLE9BQUQsQ0FEQSxDQUNPLFNBQUMsR0FBRCxHQUFBO3FCQUFTLGlCQUFpQixDQUFDLEtBQUQsQ0FBakIsQ0FBQSxDQUF1QixDQUFDLE9BQXhCLENBQWdDLEdBQWhDLENBQW9DLENBQUMsTUFBckMsQ0FBQSxFQUFUO1lBQUEsQ0FEUCxFQUpGO1dBQUEsTUFBQTttQkFPRSxRQUFRLENBQUMsT0FBVCxDQUFpQixrQkFBakIsRUFQRjtXQVhJO1FBQUEsQ0FETixFQUhGO09BRDBEO0lBQUEsQ0FBNUQsRUFOZTtFQUFBLENBTGpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/models/git-difftool.coffee
