(function() {
  var $, Disposable, KeyEventView, KeyMapper, KeymapGeneratorView, KeymapTableView, ModifierStateHandler, ModifierView, ScrollView, TextEditorView, util, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Disposable = require('atom').Disposable;

  _ref = require('atom-space-pen-views'), ScrollView = _ref.ScrollView, TextEditorView = _ref.TextEditorView, $ = _ref.$;

  util = require('util');

  KeyMapper = require('../key-mapper');

  ModifierStateHandler = require('../modifier-state-handler');

  ModifierView = require('./modifier-view');

  KeyEventView = require('./key-event-view');

  KeymapTableView = require('./keymap-table-view');

  module.exports = KeymapGeneratorView = (function(_super) {
    __extends(KeymapGeneratorView, _super);

    function KeymapGeneratorView() {
      return KeymapGeneratorView.__super__.constructor.apply(this, arguments);
    }

    KeymapGeneratorView.prototype.previousMapping = null;

    KeymapGeneratorView.prototype.modifierStateHandler = null;

    KeymapGeneratorView.prototype.keyMapper = null;

    KeymapGeneratorView.content = function() {
      return this.div({
        "class": 'keymap-generator'
      }, (function(_this) {
        return function() {
          _this.header({
            "class": 'header'
          }, function() {
            return _this.h1({
              "class": 'title'
            }, 'Build a Keymap for your foreign keyboard layout');
          });
          _this.section({
            "class": 'keys-events-panel'
          }, function() {
            _this.subview('keyDownView', new KeyEventView({
              title: 'KeyDown Event'
            }));
            return _this.subview('keyPressView', new KeyEventView({
              title: 'KeyPress Event'
            }));
          });
          _this.section({
            "class": 'modifier-bar-panel'
          }, function() {
            _this.subview('ctrlView', new ModifierView({
              label: 'Ctrl'
            }));
            _this.subview('altView', new ModifierView({
              label: 'Alt'
            }));
            _this.subview('shiftView', new ModifierView({
              label: 'Shift'
            }));
            return _this.subview('altgrView', new ModifierView({
              label: 'AltGr'
            }));
          });
          _this.section({
            "class": 'key-input-panel'
          }, function() {
            _this.div({
              "class": 'key-label'
            }, 'Capture Key-Events from input and create Key-Mappings');
            return _this.input({
              "class": 'key-input',
              type: 'text',
              focus: 'clearInput',
              keydown: 'onKeyDown',
              keypress: 'onKeyPress',
              keyup: 'onKeyUp',
              outlet: 'keyInput'
            });
          });
          _this.section({
            "class": 'test-key-panel'
          }, function() {
            _this.div({
              "class": 'test-key-label'
            }, 'Test your generated Key-Mappings');
            return _this.subview('testKeyInput', new TextEditorView({
              mini: true
            }));
          });
          return _this.subview('keymapTableView', new KeymapTableView());
        };
      })(this));
    };

    KeymapGeneratorView.prototype.attached = function() {
      this.keyMapper = KeyMapper.getInstance();
      this.modifierStateHandler = new ModifierStateHandler();
      this.previousMapping = this.keyMapper.getKeymap();
      this.keymapTableView.onKeymapChange((function(_this) {
        return function(keymap) {
          return _this.keyMapper.setKeymap(keymap);
        };
      })(this));
      this.keymapTableView.clear();
      return this.keymapTableView.render();
    };

    KeymapGeneratorView.prototype.detached = function() {
      if (this.previousMapping !== null) {
        this.keyMapper.setKeymap(this.previousMapping);
      }
      this.keyMapper = null;
      return this.modifierStateHandler = null;
    };

    KeymapGeneratorView.prototype.updateModifiers = function(modifierState) {
      this.ctrlView.setActive(modifierState.ctrl);
      this.altView.setActive(modifierState.alt);
      this.shiftView.setActive(modifierState.shift);
      return this.altgrView.setActive(modifierState.altgr);
    };

    KeymapGeneratorView.prototype.addMapping = function() {
      var down, modifier, press;
      down = this.keyDownView.getKey();
      modifier = this.keyDownView.getModifiers();
      press = this.keyPressView.getKey();
      if (press !== null && down.char !== press.char) {
        this.keymapTableView.addKeyMapping(down, modifier, press, this.keyInput.val().length > 1);
        return this.keyMapper.setKeymap(this.keymapTableView.getKeymap());
      }
    };

    KeymapGeneratorView.prototype.clearInput = function() {
      return this.keyInput.val('');
    };

    KeymapGeneratorView.prototype.onKeyDown = function(event) {
      var modifierState, originalEvent;
      this.clearInput();
      this.keyDownView.clear();
      this.keyPressView.clear();
      originalEvent = $.extend({}, event.originalEvent);
      this.modifierStateHandler.handleKeyEvent(originalEvent);
      modifierState = this.modifierStateHandler.getState();
      this.updateModifiers(modifierState);
      return this.keyDownView.setKey(originalEvent, modifierState);
    };

    KeymapGeneratorView.prototype.onKeyPress = function(event) {
      var originalEvent;
      originalEvent = $.extend({}, event.originalEvent);
      return this.keyPressView.setKey(originalEvent, this.modifierStateHandler.getState());
    };

    KeymapGeneratorView.prototype.onKeyUp = function(event) {
      var originalEvent;
      originalEvent = $.extend({}, event.originalEvent);
      this.modifierStateHandler.handleKeyEvent(originalEvent);
      this.addMapping();
      return setTimeout((function(_this) {
        return function() {
          var modifierState;
          modifierState = _this.modifierStateHandler.getState();
          return _this.updateModifiers(modifierState);
        };
      })(this), 50);
    };

    KeymapGeneratorView.deserialize = function(options) {
      if (options == null) {
        options = {};
      }
      return new KeymapGeneratorView(options);
    };

    KeymapGeneratorView.prototype.serialize = function() {
      return {
        deserializer: this.constructor.name,
        uri: this.getURI()
      };
    };

    KeymapGeneratorView.prototype.getURI = function() {
      return this.uri;
    };

    KeymapGeneratorView.prototype.getTitle = function() {
      return "Keymap-Generator";
    };

    KeymapGeneratorView.prototype.onDidChangeTitle = function() {
      return new Disposable(function() {});
    };

    KeymapGeneratorView.prototype.onDidChangeModified = function() {
      return new Disposable(function() {});
    };

    KeymapGeneratorView.prototype.isEqual = function(other) {
      return other instanceof KeymapGeneratorView;
    };

    return KeymapGeneratorView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMva2V5Ym9hcmQtbG9jYWxpemF0aW9uL2xpYi92aWV3cy9rZXltYXAtZ2VuZXJhdG9yLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdKQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsT0FBa0MsT0FBQSxDQUFRLHNCQUFSLENBQWxDLEVBQUMsa0JBQUEsVUFBRCxFQUFhLHNCQUFBLGNBQWIsRUFBNkIsU0FBQSxDQUQ3QixDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUlBLFNBQUEsR0FBWSxPQUFBLENBQVEsZUFBUixDQUpaLENBQUE7O0FBQUEsRUFLQSxvQkFBQSxHQUF1QixPQUFBLENBQVEsMkJBQVIsQ0FMdkIsQ0FBQTs7QUFBQSxFQU9BLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FQZixDQUFBOztBQUFBLEVBUUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxrQkFBUixDQVJmLENBQUE7O0FBQUEsRUFTQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxxQkFBUixDQVRsQixDQUFBOztBQUFBLEVBV0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLDBDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxrQ0FBQSxlQUFBLEdBQWlCLElBQWpCLENBQUE7O0FBQUEsa0NBQ0Esb0JBQUEsR0FBc0IsSUFEdEIsQ0FBQTs7QUFBQSxrQ0FFQSxTQUFBLEdBQVcsSUFGWCxDQUFBOztBQUFBLElBSUEsbUJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLGtCQUFQ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

//# sourceURL=/home/jakob/.atom/packages/keyboard-localization/lib/views/keymap-generator-view.coffee
