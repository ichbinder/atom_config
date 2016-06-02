(function() {
  var $, $$, GitInit, GitPaletteView, GitPlusCommands, SelectListView, fuzzyFilter, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('underscore-plus');

  _ref = require('atom-space-pen-views'), $ = _ref.$, $$ = _ref.$$, SelectListView = _ref.SelectListView;

  GitPlusCommands = require('../git-plus-commands');

  GitInit = require('../models/git-init');

  fuzzyFilter = require('fuzzaldrin').filter;

  module.exports = GitPaletteView = (function(_super) {
    __extends(GitPaletteView, _super);

    function GitPaletteView() {
      return GitPaletteView.__super__.constructor.apply(this, arguments);
    }

    GitPaletteView.prototype.initialize = function() {
      GitPaletteView.__super__.initialize.apply(this, arguments);
      this.addClass('git-palette');
      return this.toggle();
    };

    GitPaletteView.prototype.getFilterKey = function() {
      return 'description';
    };

    GitPaletteView.prototype.cancelled = function() {
      return this.hide();
    };

    GitPaletteView.prototype.toggle = function() {
      var _ref1;
      if ((_ref1 = this.panel) != null ? _ref1.isVisible() : void 0) {
        return this.cancel();
      } else {
        return this.show();
      }
    };

    GitPaletteView.prototype.show = function() {
      if (this.panel == null) {
        this.panel = atom.workspace.addModalPanel({
          item: this
        });
      }
      this.storeFocusedElement();
      if (this.previouslyFocusedElement[0] && this.previouslyFocusedElement[0] !== document.body) {
        this.commandElement = this.previouslyFocusedElement;
      } else {
        this.commandElement = atom.views.getView(atom.workspace);
      }
      this.keyBindings = atom.keymaps.findKeyBindings({
        target: this.commandElement[0]
      });
      return GitPlusCommands().then((function(_this) {
        return function(commands) {
          commands = commands.map(function(c) {
            return {
              name: c[0],
              description: c[1],
              func: c[2]
            };
          });
          commands = _.sortBy(commands, 'name');
          _this.setItems(commands);
          _this.panel.show();
          return _this.focusFilterEditor();
        };
      })(this))["catch"]((function(_this) {
        return function(err) {
          var commands;
          (commands = []).push({
            name: 'git-plus:init',
            description: 'Init',
            func: function() {
              return GitInit();
            }
          });
          _this.setItems(commands);
          _this.panel.show();
          return _this.focusFilterEditor();
        };
      })(this));
    };

    GitPaletteView.prototype.populateList = function() {
      var filterQuery, filteredItems, i, item, itemView, options, _i, _ref1, _ref2, _ref3;
      if (this.items == null) {
        return;
      }
      filterQuery = this.getFilterQuery();
      if (filterQuery.length) {
        options = {
          key: this.getFilterKey()
        };
        filteredItems = fuzzyFilter(this.items, filterQuery, options);
      } else {
        filteredItems = this.items;
      }
      this.list.empty();
      if (filteredItems.length) {
        this.setError(null);
        for (i = _i = 0, _ref1 = Math.min(filteredItems.length, this.maxItems); 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
          item = (_ref2 = filteredItems[i].original) != null ? _ref2 : filteredItems[i];
          itemView = $(this.viewForItem(item, (_ref3 = filteredItems[i].string) != null ? _ref3 : null));
          itemView.data('select-list-item', item);
          this.list.append(itemView);
        }
        return this.selectItemView(this.list.find('li:first'));
      } else {
        return this.setError(this.getEmptyMessage(this.items.length, filteredItems.length));
      }
    };

    GitPaletteView.prototype.hide = function() {
      var _ref1;
      return (_ref1 = this.panel) != null ? _ref1.destroy() : void 0;
    };

    GitPaletteView.prototype.viewForItem = function(_arg, matchedStr) {
      var description, name;
      name = _arg.name, description = _arg.description;
      return $$(function() {
        return this.li({
          "class": 'command',
          'data-command-name': name
        }, (function(_this) {
          return function() {
            if (matchedStr != null) {
              return _this.raw(matchedStr);
            } else {
              return _this.span(description);
            }
          };
        })(this));
      });
    };

    GitPaletteView.prototype.confirmed = function(_arg) {
      var func;
      func = _arg.func;
      this.cancel();
      return func();
    };

    return GitPaletteView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvbGliL3ZpZXdzL2dpdC1wYWxldHRlLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFGQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBQUosQ0FBQTs7QUFBQSxFQUNBLE9BQTBCLE9BQUEsQ0FBUSxzQkFBUixDQUExQixFQUFDLFNBQUEsQ0FBRCxFQUFJLFVBQUEsRUFBSixFQUFRLHNCQUFBLGNBRFIsQ0FBQTs7QUFBQSxFQUVBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHNCQUFSLENBRmxCLENBQUE7O0FBQUEsRUFHQSxPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSLENBSFYsQ0FBQTs7QUFBQSxFQUlBLFdBQUEsR0FBYyxPQUFBLENBQVEsWUFBUixDQUFxQixDQUFDLE1BSnBDLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUoscUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLDZCQUFBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixNQUFBLGdEQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLGFBQVYsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUhVO0lBQUEsQ0FBWixDQUFBOztBQUFBLDZCQUtBLFlBQUEsR0FBYyxTQUFBLEdBQUE7YUFDWixjQURZO0lBQUEsQ0FMZCxDQUFBOztBQUFBLDZCQVFBLFNBQUEsR0FBVyxTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsSUFBRCxDQUFBLEVBQUg7SUFBQSxDQVJYLENBQUE7O0FBQUEsNkJBVUEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLFVBQUEsS0FBQTtBQUFBLE1BQUEs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

//# sourceURL=/home/jakob/.atom/packages/git-plus/lib/views/git-palette-view.coffee
