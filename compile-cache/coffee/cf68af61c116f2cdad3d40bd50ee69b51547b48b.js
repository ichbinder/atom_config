(function() {
  var CommitDialog, Dialog,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Dialog = require('./dialog');

  module.exports = CommitDialog = (function(_super) {
    __extends(CommitDialog, _super);

    function CommitDialog() {
      return CommitDialog.__super__.constructor.apply(this, arguments);
    }

    CommitDialog.content = function() {
      return this.div({
        "class": 'dialog'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'heading'
          }, function() {
            _this.i({
              "class": 'icon x clickable',
              click: 'cancel'
            });
            return _this.strong('Commit');
          });
          _this.div({
            "class": 'body'
          }, function() {
            _this.label('Commit Message');
            return _this.textarea({
              "class": 'native-key-bindings',
              outlet: 'msg',
              keyUp: 'colorLength'
            });
          });
          return _this.div({
            "class": 'buttons'
          }, function() {
            _this.button({
              "class": 'active',
              click: 'commit'
            }, function() {
              _this.i({
                "class": 'icon commit'
              });
              return _this.span('Commit');
            });
            return _this.button({
              click: 'cancel'
            }, function() {
              _this.i({
                "class": 'icon x'
              });
              return _this.span('Cancel');
            });
          });
        };
      })(this));
    };

    CommitDialog.prototype.activate = function() {
      this.msg.val('');
      return CommitDialog.__super__.activate.call(this);
    };

    CommitDialog.prototype.colorLength = function() {
      var i, line, too_long, _i, _len, _ref;
      too_long = false;
      _ref = this.msg.val().split("\n");
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        line = _ref[i];
        if ((i === 0 && line.length > 50) || (i > 0 && line.length > 80)) {
          too_long = true;
          break;
        }
      }
      if (too_long) {
        this.msg.addClass('over-fifty');
      } else {
        this.msg.removeClass('over-fifty');
      }
    };

    CommitDialog.prototype.commit = function() {
      this.deactivate();
      this.parentView.commit();
    };

    CommitDialog.prototype.getMessage = function() {
      return this.msg.val();
    };

    return CommitDialog;

  })(Dialog);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LWNvbnRyb2wvbGliL2RpYWxvZ3MvY29tbWl0LWRpYWxvZy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsb0JBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsVUFBUixDQUFULENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osbUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sUUFBUDtPQUFMLEVBQXNCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDcEIsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sU0FBUDtXQUFMLEVBQXVCLFNBQUEsR0FBQTtBQUNyQixZQUFBLEtBQUMsQ0FBQSxDQUFELENBQUc7QUFBQSxjQUFBLE9BQUEsRUFBTyxrQkFBUDtBQUFBLGNBQTJCLEtBQUEsRUFBTyxRQUFsQzthQUFILENBQUEsQ0FBQTttQkFDQSxLQUFDLENBQUEsTUFBRCxDQUFRLFFBQVIsRUFGcUI7VUFBQSxDQUF2QixDQUFBLENBQUE7QUFBQSxVQUdBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxNQUFQO1dBQUwsRUFBb0IsU0FBQSxHQUFBO0FBQ2xCLFlBQUEsS0FBQyxDQUFBLEtBQUQsQ0FBTyxnQkFBUCxDQUFBLENBQUE7bUJBQ0EsS0FBQyxDQUFBLFFBQUQsQ0FBVTtBQUFBLGNBQUEsT0FBQSxFQUFPLHFCQUFQO0FBQUEsY0FBOEIsTUFBQSxFQUFRLEtBQXRDO0FBQUEsY0FBNkMsS0FBQSxFQUFPLGFBQXBEO2FBQVYsRUFGa0I7VUFBQSxDQUFwQixDQUhBLENBQUE7aUJBTUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLFNBQVA7V0FBTCxFQUF1QixTQUFBLEdBQUE7QUFDckIsWUFBQSxLQUFDLENBQUEsTUFBRCxDQUFRO0FBQUEsY0FBQSxPQUFBLEVBQU8sUUFBUDtBQUFBLGNBQWlCLEtBQUEsRUFBTyxRQUF4QjthQUFSLEVBQTBDLFNBQUEsR0FBQTtBQUN4QyxjQUFBLEtBQUMsQ0FBQSxDQUFELENBQUc7QUFBQSxnQkFBQSxPQUFBLEVBQU8sYUFBUDtlQUFILENBQUEsQ0FBQTtxQkFDQSxLQUFDLENBQUEsSUFBRCxDQUFNLFFBQU4sRUFGd0M7WUFBQSxDQUExQyxDQUFBLENBQUE7bUJBR0EsS0FBQyxDQUFBLE1BQUQsQ0FBUTtBQUFBLGNBQUEsS0FBQSxFQUFPLFFBQVA7YUFBUixFQUF5QixTQUFBLEdBQUE7QUFDdkIsY0FBQSxLQUFDLENBQUEsQ0FBRCxDQUFHO0FBQUEsZ0JBQUEsT0FBQSxFQUFPLFFBQVA7ZUFBSCxDQUFBLENBQUE7cUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxRQUFOLEVBRnVCO1lBQUEsQ0FBekIsRUFKcUI7VUFBQSxDQUF2QixFQVBvQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXRCLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsMkJBZ0JBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsR0FBTCxDQUFTLEVBQVQsQ0FBQSxDQUFBO0FBQ0EsYUFBTyx5Q0FBQSxDQUFQLENBRlE7SUFBQSxDQWhCVixDQUFBOztBQUFBLDJCQW9CQSxXQUFBLEdBQWEsU0FBQSxHQUFBO0FBQ1gsVUFBQSxpQ0FBQTtBQUFBLE1BQUEsUUFBQSxHQUFXLEtBQVgsQ0FBQTtBQUNBO0FBQUEsV0FBQSxtREFBQTt1QkFBQTtBQUNFLFFBQUEsSUFBRyxDQUFDLENBQUEsS0FBSyxDQUFMLElBQVUsSUFBSSxDQUFDLE1BQUwsR0FBYyxFQUF6QixDQUFBLElBQWdDLENBQUMsQ0FBQSxHQUFJLENBQUosSUFBUyxJQUFJLENBQUMsTUFBTCxHQUFjLEVBQXhCLENBQW5DO0FBQ0UsVUFBQSxRQUFBLEdBQVcsSUFBWCxDQUFBO0FBQ0EsZ0JBRkY7U0FERjtBQUFBLE9BREE7QUFNQSxNQUFBLElBQUcsUUFBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLENBQWMsWUFBZCxDQUFBLENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsQ0FBaUIsWUFBakIsQ0FBQSxDQUhGO09BUFc7SUFBQSxDQXBCYixDQUFBOztBQUFBLDJCQWlDQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxJQUFDLENBQUEsVUFBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLENBQUEsQ0FEQSxDQURNO0lBQUEsQ0FqQ1IsQ0FBQTs7QUFBQSwyQkFzQ0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLGFBQU8sSUFBQyxDQUFBLEdBQUcsQ0FBQyxHQUFMLENBQUEsQ0FBUCxDQURVO0lBQUEsQ0F0Q1osQ0FBQTs7d0JBQUE7O0tBRHlCLE9BSDNCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/jakob/.atom/packages/git-control/lib/dialogs/commit-dialog.coffee
