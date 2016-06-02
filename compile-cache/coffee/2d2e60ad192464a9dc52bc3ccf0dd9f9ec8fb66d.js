(function() {
  var LogListView, LogViewURI, git;

  git = require('../git');

  LogListView = require('../views/log-list-view');

  LogViewURI = 'atom://git-plus:log';

  module.exports = function(repo, _arg) {
    var currentFile, onlyCurrentFile, _ref;
    onlyCurrentFile = (_arg != null ? _arg : {}).onlyCurrentFile;
    atom.workspace.addOpener(function(uri) {
      if (uri === LogViewURI) {
        return new LogListView;
      }
    });
    currentFile = repo.relativize((_ref = atom.workspace.getActiveTextEditor()) != null ? _ref.getPath() : void 0);
    return atom.workspace.open(LogViewURI).then(function(view) {
      if (onlyCurrentFile) {
        return view.currentFileLog(repo, currentFile);
      } else {
        return view.branchLog(repo);
      }
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL21vZGVscy9naXQtbG9nLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw0QkFBQTs7QUFBQSxFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUFOLENBQUE7O0FBQUEsRUFDQSxXQUFBLEdBQWMsT0FBQSxDQUFRLHdCQUFSLENBRGQsQ0FBQTs7QUFBQSxFQUVBLFVBQUEsR0FBYSxxQkFGYixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxJQUFELEVBQU8sSUFBUCxHQUFBO0FBQ2YsUUFBQSxrQ0FBQTtBQUFBLElBRHVCLGtDQUFELE9BQWtCLElBQWpCLGVBQ3ZCLENBQUE7QUFBQSxJQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBZixDQUF5QixTQUFDLEdBQUQsR0FBQTtBQUN2QixNQUFBLElBQTBCLEdBQUEsS0FBTyxVQUFqQztBQUFBLGVBQU8sR0FBQSxDQUFBLFdBQVAsQ0FBQTtPQUR1QjtJQUFBLENBQXpCLENBQUEsQ0FBQTtBQUFBLElBR0EsV0FBQSxHQUFjLElBQUksQ0FBQyxVQUFMLDZEQUFvRCxDQUFFLE9BQXRDLENBQUEsVUFBaEIsQ0FIZCxDQUFBO1dBSUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLFVBQXBCLENBQStCLENBQUMsSUFBaEMsQ0FBcUMsU0FBQyxJQUFELEdBQUE7QUFDbkMsTUFBQSxJQUFHLGVBQUg7ZUFDRSxJQUFJLENBQUMsY0FBTCxDQUFvQixJQUFwQixFQUEwQixXQUExQixFQURGO09BQUEsTUFBQTtlQUdFLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZixFQUhGO09BRG1DO0lBQUEsQ0FBckMsRUFMZTtFQUFBLENBSmpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/models/git-log.coffee
