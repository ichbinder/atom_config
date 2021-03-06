(function() {
  var CMD_TOGGLE, CompositeDisposable, EVT_SWITCH, GitControl, GitControlView, item, pane, view, views;

  GitControlView = require('./git-control-view');

  CompositeDisposable = require('atom').CompositeDisposable;

  CMD_TOGGLE = 'git-control:toggle';

  EVT_SWITCH = 'pane-container:active-pane-item-changed';

  views = [];

  view = void 0;

  pane = void 0;

  item = void 0;

  module.exports = GitControl = {
    activate: function(state) {
      console.log('GitControl: activate');
      atom.commands.add('atom-workspace', CMD_TOGGLE, (function(_this) {
        return function() {
          return _this.toggleView();
        };
      })(this));
      atom.workspace.onDidChangeActivePaneItem((function(_this) {
        return function(item) {
          return _this.updateViews();
        };
      })(this));
    },
    deactivate: function() {
      console.log('GitControl: deactivate');
    },
    toggleView: function() {
      console.log('GitControl: toggle');
      if (!(view && view.active)) {
        view = new GitControlView();
        views.push(view);
        pane = atom.workspace.getActivePane();
        item = pane.addItem(view, 0);
        pane.activateItem(item);
      } else {
        pane.destroyItem(item);
      }
    },
    updateViews: function() {
      var activeView, v, _i, _len;
      activeView = atom.workspace.getActivePane().getActiveItem();
      for (_i = 0, _len = views.length; _i < _len; _i++) {
        v = views[_i];
        if (v === activeView) {
          v.update();
        }
      }
    },
    serialize: function() {},
    config: {
      showGitFlowButton: {
        title: 'Show GitFlow button',
        description: 'Show the GitFlow button in the Git Control toolbar',
        type: 'boolean',
        "default": true
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LWNvbnRyb2wvbGliL2dpdC1jb250cm9sLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnR0FBQTs7QUFBQSxFQUFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG9CQUFSLENBQWpCLENBQUE7O0FBQUEsRUFDQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBREQsQ0FBQTs7QUFBQSxFQUdBLFVBQUEsR0FBYSxvQkFIYixDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFhLHlDQUpiLENBQUE7O0FBQUEsRUFNQSxLQUFBLEdBQVEsRUFOUixDQUFBOztBQUFBLEVBT0EsSUFBQSxHQUFPLE1BUFAsQ0FBQTs7QUFBQSxFQVFBLElBQUEsR0FBTyxNQVJQLENBQUE7O0FBQUEsRUFTQSxJQUFBLEdBQU8sTUFUUCxDQUFBOztBQUFBLEVBV0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsVUFBQSxHQUVmO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksc0JBQVosQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DLFVBQXBDLEVBQWdELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLFVBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEQsQ0FGQSxDQUFBO0FBQUEsTUFHQSxJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUFmLENBQXlDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsR0FBQTtpQkFBVSxLQUFDLENBQUEsV0FBRCxDQUFBLEVBQVY7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QyxDQUhBLENBRFE7SUFBQSxDQUFWO0FBQUEsSUFPQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHdCQUFaLENBQUEsQ0FEVTtJQUFBLENBUFo7QUFBQSxJQVdBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQVosQ0FBQSxDQUFBO0FBRUEsTUFBQSxJQUFBLENBQUEsQ0FBTyxJQUFBLElBQVMsSUFBSSxDQUFDLE1BQXJCLENBQUE7QUFDRSxRQUFBLElBQUEsR0FBVyxJQUFBLGNBQUEsQ0FBQSxDQUFYLENBQUE7QUFBQSxRQUNBLEtBQUssQ0FBQyxJQUFOLENBQVcsSUFBWCxDQURBLENBQUE7QUFBQSxRQUdBLElBQUEsR0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBQSxDQUhQLENBQUE7QUFBQSxRQUlBLElBQUEsR0FBTyxJQUFJLENBQUMsT0FBTCxDQUFhLElBQWIsRUFBbUIsQ0FBbkIsQ0FKUCxDQUFBO0FBQUEsUUFNQSxJQUFJLENBQUMsWUFBTCxDQUFrQixJQUFsQixDQU5BLENBREY7T0FBQSxNQUFBO0FBVUUsUUFBQSxJQUFJLENBQUMsV0FBTCxDQUFpQixJQUFqQixDQUFBLENBVkY7T0FIVTtJQUFBLENBWFo7QUFBQSxJQTRCQSxXQUFBLEVBQWEsU0FBQSxHQUFBO0FBQ1gsVUFBQSx1QkFBQTtBQUFBLE1BQUEsVUFBQSxHQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBZixDQUFBLENBQThCLENBQUMsYUFBL0IsQ0FBQSxDQUFiLENBQUE7QUFDQSxXQUFBLDRDQUFBO3NCQUFBO1lBQW9CLENBQUEsS0FBSztBQUN2QixVQUFBLENBQUMsQ0FBQyxNQUFGLENBQUEsQ0FBQTtTQURGO0FBQUEsT0FGVztJQUFBLENBNUJiO0FBQUEsSUFrQ0EsU0FBQSxFQUFXLFNBQUEsR0FBQSxDQWxDWDtBQUFBLElBb0NBLE1BQUEsRUFDRTtBQUFBLE1BQUEsaUJBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLHFCQUFQO0FBQUEsUUFDQSxXQUFBLEVBQWEsb0RBRGI7QUFBQSxRQUVBLElBQUEsRUFBTSxTQUZOO0FBQUEsUUFHQSxTQUFBLEVBQVMsSUFIVDtPQURGO0tBckNGO0dBYkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/jakob/.atom/packages/git-control/lib/git-control.coffee
