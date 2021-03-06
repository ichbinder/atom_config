(function() {
  var $$, ListView, OutputViewManager, SelectListView, fs, git, notifier, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  fs = require('fs-plus');

  _ref = require('atom-space-pen-views'), $$ = _ref.$$, SelectListView = _ref.SelectListView;

  git = require('../git');

  notifier = require('../notifier');

  OutputViewManager = require('../output-view-manager');

  module.exports = ListView = (function(_super) {
    __extends(ListView, _super);

    function ListView() {
      return ListView.__super__.constructor.apply(this, arguments);
    }

    ListView.prototype.initialize = function(repo, data) {
      this.repo = repo;
      this.data = data;
      ListView.__super__.initialize.apply(this, arguments);
      this.show();
      return this.parseData();
    };

    ListView.prototype.parseData = function() {
      var branches, item, items, _i, _len;
      items = this.data.split("\n");
      branches = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        item = item.replace(/\s/g, '');
        if (item !== '') {
          branches.push({
            name: item
          });
        }
      }
      this.setItems(branches);
      return this.focusFilterEditor();
    };

    ListView.prototype.getFilterKey = function() {
      return 'name';
    };

    ListView.prototype.show = function() {
      if (this.panel == null) {
        this.panel = atom.workspace.addModalPanel({
          item: this
        });
      }
      this.panel.show();
      return this.storeFocusedElement();
    };

    ListView.prototype.cancelled = function() {
      return this.hide();
    };

    ListView.prototype.hide = function() {
      var _ref1;
      return (_ref1 = this.panel) != null ? _ref1.destroy() : void 0;
    };

    ListView.prototype.viewForItem = function(_arg) {
      var current, name;
      name = _arg.name;
      current = false;
      if (name.startsWith("*")) {
        name = name.slice(1);
        current = true;
      }
      return $$(function() {
        return this.li(name, (function(_this) {
          return function() {
            return _this.div({
              "class": 'pull-right'
            }, function() {
              if (current) {
                return _this.span('Current');
              }
            });
          };
        })(this));
      });
    };

    ListView.prototype.confirmed = function(_arg) {
      var name;
      name = _arg.name;
      this.rebase(name.match(/\*?(.*)/)[1]);
      return this.cancel();
    };

    ListView.prototype.rebase = function(branch) {
      return git.cmd(['rebase', branch], {
        cwd: this.repo.getWorkingDirectory()
      }).then(function(msg) {
        OutputViewManager["new"]().addLine(msg).finish();
        atom.workspace.getTextEditors().forEach(function(editor) {
          return fs.exists(editor.getPath(), function(exist) {
            if (!exist) {
              return editor.destroy();
            }
          });
        });
        return git.refresh();
      })["catch"]((function(_this) {
        return function(msg) {
          notifier.addError(msg);
          return git.refresh();
        };
      })(this));
    };

    return ListView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL3ZpZXdzL3JlYmFzZS1saXN0LXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdFQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsT0FBdUIsT0FBQSxDQUFRLHNCQUFSLENBQXZCLEVBQUMsVUFBQSxFQUFELEVBQUssc0JBQUEsY0FETCxDQUFBOztBQUFBLEVBRUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBRk4sQ0FBQTs7QUFBQSxFQUdBLFFBQUEsR0FBVyxPQUFBLENBQVEsYUFBUixDQUhYLENBQUE7O0FBQUEsRUFJQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsd0JBQVIsQ0FKcEIsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ1E7QUFDSiwrQkFBQSxDQUFBOzs7O0tBQUE7O0FBQUEsdUJBQUEsVUFBQSxHQUFZLFNBQUUsSUFBRixFQUFTLElBQVQsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLE9BQUEsSUFDWixDQUFBO0FBQUEsTUFEa0IsSUFBQyxDQUFBLE9BQUEsSUFDbkIsQ0FBQTtBQUFBLE1BQUEsMENBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxJQUFELENBQUEsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLFNBQUQsQ0FBQSxFQUhVO0lBQUEsQ0FBWixDQUFBOztBQUFBLHVCQUtBLFNBQUEsR0FBVyxTQUFBLEdBQUE7QUFDVCxVQUFBLCtCQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLENBQVksSUFBWixDQUFSLENBQUE7QUFBQSxNQUNBLFFBQUEsR0FBVyxFQURY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

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/views/rebase-list-view.coffee
