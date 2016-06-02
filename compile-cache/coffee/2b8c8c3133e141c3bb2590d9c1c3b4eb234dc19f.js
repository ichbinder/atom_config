(function() {
  var $, $$, SelectListMultipleView, SelectStageFilesView, git, notifier, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $ = _ref.$, $$ = _ref.$$;

  git = require('../git');

  notifier = require('../notifier');

  SelectListMultipleView = require('./select-list-multiple-view');

  module.exports = SelectStageFilesView = (function(_super) {
    __extends(SelectStageFilesView, _super);

    function SelectStageFilesView() {
      return SelectStageFilesView.__super__.constructor.apply(this, arguments);
    }

    SelectStageFilesView.prototype.initialize = function(repo, items) {
      this.repo = repo;
      SelectStageFilesView.__super__.initialize.apply(this, arguments);
      this.show();
      this.setItems(items);
      return this.focusFilterEditor();
    };

    SelectStageFilesView.prototype.getFilterKey = function() {
      return 'path';
    };

    SelectStageFilesView.prototype.addButtons = function() {
      var viewButton;
      viewButton = $$(function() {
        return this.div({
          "class": 'select-list-buttons'
        }, (function(_this) {
          return function() {
            _this.div(function() {
              return _this.button({
                "class": 'btn btn-error inline-block-tight btn-cancel-button'
              }, 'Cancel');
            });
            return _this.div(function() {
              return _this.button({
                "class": 'btn btn-success inline-block-tight btn-unstage-button'
              }, 'Unstage');
            });
          };
        })(this));
      });
      viewButton.appendTo(this);
      return this.on('click', 'button', (function(_this) {
        return function(_arg) {
          var target;
          target = _arg.target;
          if ($(target).hasClass('btn-unstage-button')) {
            _this.complete();
          }
          if ($(target).hasClass('btn-cancel-button')) {
            return _this.cancel();
          }
        };
      })(this));
    };

    SelectStageFilesView.prototype.show = function() {
      if (this.panel == null) {
        this.panel = atom.workspace.addModalPanel({
          item: this
        });
      }
      this.panel.show();
      return this.storeFocusedElement();
    };

    SelectStageFilesView.prototype.cancelled = function() {
      return this.hide();
    };

    SelectStageFilesView.prototype.hide = function() {
      var _ref1;
      return (_ref1 = this.panel) != null ? _ref1.destroy() : void 0;
    };

    SelectStageFilesView.prototype.viewForItem = function(item, matchedStr) {
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.div({
              "class": 'pull-right'
            }, function() {
              return _this.span({
                "class": 'inline-block highlight'
              }, item.mode);
            });
            if (matchedStr != null) {
              return _this.raw(matchedStr);
            } else {
              return _this.span(item.path);
            }
          };
        })(this));
      });
    };

    SelectStageFilesView.prototype.completed = function(items) {
      var files, item;
      files = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          _results.push(item.path);
        }
        return _results;
      })();
      this.cancel();
      return git.cmd(['reset', 'HEAD', '--'].concat(files), {
        cwd: this.repo.getWorkingDirectory()
      }).then(function(msg) {
        return notifier.addSuccess(msg);
      })["catch"](function(msg) {
        return notifier.addError(msg);
      });
    };

    return SelectStageFilesView;

  })(SelectListMultipleView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL3ZpZXdzL3NlbGVjdC11bnN0YWdlLWZpbGVzLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdFQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFVLE9BQUEsQ0FBUSxzQkFBUixDQUFWLEVBQUMsU0FBQSxDQUFELEVBQUksVUFBQSxFQUFKLENBQUE7O0FBQUEsRUFFQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FGTixDQUFBOztBQUFBLEVBR0EsUUFBQSxHQUFXLE9BQUEsQ0FBUSxhQUFSLENBSFgsQ0FBQTs7QUFBQSxFQUlBLHNCQUFBLEdBQXlCLE9BQUEsQ0FBUSw2QkFBUixDQUp6QixDQUFBOztBQUFBLEVBTUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLDJDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxtQ0FBQSxVQUFBLEdBQVksU0FBRSxJQUFGLEVBQVEsS0FBUixHQUFBO0FBQ1YsTUFEVyxJQUFDLENBQUEsT0FBQSxJQUNaLENBQUE7QUFBQSxNQUFBLHNEQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsSUFBRCxDQUFBLENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxLQUFWLENBRkEsQ0FBQTthQUdBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBSlU7SUFBQSxDQUFaLENBQUE7O0FBQUEsbUNBTUEsWUFBQSxHQUFjLFNBQUEsR0FBQTthQUNaLE9BRFk7SUFBQSxDQU5kLENBQUE7O0FBQUEsbUNBU0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsVUFBQTtBQUFBLE1BQUEsVUFBQSxHQUFhLEVBQUEsQ0FBRyxTQUFBLEdBQUE7ZUFDZCxJQUFDLENBQUEsR0FBRCxDQUFL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

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/views/select-unstage-files-view.coffee
