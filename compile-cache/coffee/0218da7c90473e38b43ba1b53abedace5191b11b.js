(function() {
  var $, CompositeDisposable, GitStashSave, InputView, TextEditorView, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  _ref = require('atom-space-pen-views'), $ = _ref.$, TextEditorView = _ref.TextEditorView, View = _ref.View;

  GitStashSave = require('../models/git-stash-save');

  InputView = (function(_super) {
    __extends(InputView, _super);

    function InputView() {
      return InputView.__super__.constructor.apply(this, arguments);
    }

    InputView.content = function() {
      return this.div((function(_this) {
        return function() {
          return _this.subview('commandEditor', new TextEditorView({
            mini: true,
            placeholderText: 'Stash message'
          }));
        };
      })(this));
    };

    InputView.prototype.initialize = function(repo) {
      var currentPane, disposables, panel;
      disposables = new CompositeDisposable;
      currentPane = atom.workspace.getActivePane();
      panel = atom.workspace.addModalPanel({
        item: this
      });
      panel.show();
      this.commandEditor.focus();
      disposables.add(atom.commands.add('atom-text-editor', {
        'core:cancel': (function(_this) {
          return function(e) {
            if (panel != null) {
              panel.destroy();
            }
            currentPane.activate();
            return disposables.dispose();
          };
        })(this)
      }));
      return disposables.add(atom.commands.add('atom-text-editor', 'core:confirm', (function(_this) {
        return function(e) {
          disposables.dispose();
          if (panel != null) {
            panel.destroy();
          }
          GitStashSave(repo, {
            message: _this.commandEditor.getText()
          });
          return currentPane.activate();
        };
      })(this)));
    };

    return InputView;

  })(View);

  module.exports = InputView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL3ZpZXdzL3N0YXNoLW1lc3NhZ2Utdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMkVBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBQ0EsT0FBNEIsT0FBQSxDQUFRLHNCQUFSLENBQTVCLEVBQUMsU0FBQSxDQUFELEVBQUksc0JBQUEsY0FBSixFQUFvQixZQUFBLElBRHBCLENBQUE7O0FBQUEsRUFHQSxZQUFBLEdBQWUsT0FBQSxDQUFRLDBCQUFSLENBSGYsQ0FBQTs7QUFBQSxFQUtNO0FBQ0osZ0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsU0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ0gsS0FBQyxDQUFBLE9BQUQsQ0FBUyxlQUFULEVBQThCLElBQUEsY0FBQSxDQUFlO0FBQUEsWUFBQSxJQUFBLEVBQU0sSUFBTjtBQUFBLFlBQVksZUFBQSxFQUFpQixlQUE3QjtXQUFmLENBQTlCLEVBREc7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFMLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsd0JBSUEsVUFBQSxHQUFZLFNBQUMsSUFBRCxHQUFBO0FBQ1YsVUFBQSwrQkFBQTtBQUFBLE1BQUEsV0FBQSxHQUFjLEdBQUEsQ0FBQSxtQkFBZCxDQUFBO0FBQUEsTUFDQSxXQUFBLEdBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQUEsQ0FEZCxDQUFBO0FBQUEsTUFFQSxLQUFBLEdBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQTZCO0FBQUEsUUFBQSxJQUFBLEVBQU0sSUFBTjtPQUE3QixDQUZSLENBQUE7QUFBQSxNQUdBLEtBQUssQ0FBQyxJQUFOLENBQUEsQ0FIQSxDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUEsYUFBYSxDQUFDLEtBQWYsQ0FBQSxDQUpBLENBQUE7QUFBQSxNQU1BLFdBQVcsQ0FBQyxHQUFaLENBQWdCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixrQkFBbEIsRUFBc0M7QUFBQSxRQUFBLGFBQUEsRUFBZSxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUMsQ0FBRCxHQUFBOztjQUNuRSxLQUFLLENBQUUsT0FBUCxDQUFBO2FBQUE7QUFBQSxZQUNBLFdBQVcsQ0FBQyxRQUFaLENBQUEsQ0FEQSxDQUFBO21CQUVBLFdBQVcsQ0FBQyxPQUFaLENBQUEsRUFIbUU7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFmO09BQXRDLENBQWhCLENBTkEsQ0FBQTthQVdBLFdBQVcsQ0FBQyxHQUFaLENBQWdCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixrQkFBbEIsRUFBc0MsY0FBdEMsRUFBc0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsQ0FBRCxHQUFBO0FBQ3BFLFVBQUEsV0FBVyxDQUFDLE9BQVosQ0FBQSxDQUFBLENBQUE7O1lBQ0EsS0FBSyxDQUFFLE9BQVAsQ0FBQTtXQURBO0FBQUEsVUFFQSxZQUFBLENBQWEsSUFBYixFQUFtQjtBQUFBLFlBQUEsT0FBQSxFQUFTLEtBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBLENBQVQ7V0FBbkIsQ0FGQSxDQUFBO2lCQUdBLFdBQVcsQ0FBQyxRQUFaLENBQUEsRUFKb0U7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0RCxDQUFoQixFQVpVO0lBQUEsQ0FKWixDQUFBOztxQkFBQTs7S0FEc0IsS0FMeEIsQ0FBQTs7QUFBQSxFQTRCQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQTVCakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/views/stash-message-view.coffee
