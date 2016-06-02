(function() {
  var MergeListView, git;

  git = require('../git');

  MergeListView = require('../views/merge-list-view');

  module.exports = function(repo, _arg) {
    var args, remote;
    remote = (_arg != null ? _arg : {}).remote;
    args = ['branch'];
    if (remote) {
      args.push('-r');
    }
    return git.cmd(args, {
      cwd: repo.getWorkingDirectory()
    }).then(function(data) {
      return new MergeListView(repo, data);
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL21vZGVscy9naXQtbWVyZ2UuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLDBCQUFSLENBRGhCLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLElBQUQsRUFBTyxJQUFQLEdBQUE7QUFDZixRQUFBLFlBQUE7QUFBQSxJQUR1Qix5QkFBRCxPQUFTLElBQVIsTUFDdkIsQ0FBQTtBQUFBLElBQUEsSUFBQSxHQUFPLENBQUMsUUFBRCxDQUFQLENBQUE7QUFDQSxJQUFBLElBQWtCLE1BQWxCO0FBQUEsTUFBQSxJQUFJLENBQUMsSUFBTCxDQUFVLElBQVYsQ0FBQSxDQUFBO0tBREE7V0FFQSxHQUFHLENBQUMsR0FBSixDQUFRLElBQVIsRUFBYztBQUFBLE1BQUEsR0FBQSxFQUFLLElBQUksQ0FBQyxtQkFBTCxDQUFBLENBQUw7S0FBZCxDQUNBLENBQUMsSUFERCxDQUNNLFNBQUMsSUFBRCxHQUFBO2FBQWMsSUFBQSxhQUFBLENBQWMsSUFBZCxFQUFvQixJQUFwQixFQUFkO0lBQUEsQ0FETixFQUhlO0VBQUEsQ0FIakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/models/git-merge.coffee
