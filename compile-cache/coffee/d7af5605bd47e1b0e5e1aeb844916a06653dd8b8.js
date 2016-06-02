(function() {
  var KeyMapper, KeyboardLocalization, KeymapGeneratorUri, KeymapGeneratorView, KeymapLoader, ModifierStateHandler, createKeymapGeneratorView, util, vimModeActive;

  util = require('util');

  KeymapLoader = require('./keymap-loader');

  KeyMapper = require('./key-mapper');

  ModifierStateHandler = require('./modifier-state-handler');

  vimModeActive = require('./helpers').vimModeActive;

  KeymapGeneratorView = null;

  KeymapGeneratorUri = 'atom://keyboard-localization/keymap-manager';

  createKeymapGeneratorView = function(state) {
    if (KeymapGeneratorView == null) {
      KeymapGeneratorView = require('./views/keymap-generator-view');
    }
    return new KeymapGeneratorView(state);
  };

  atom.deserializers.add({
    name: 'KeymapGeneratorView',
    deserialize: function(state) {
      return createKeymapGeneratorView(state);
    }
  });

  KeyboardLocalization = {
    pkg: 'keyboard-localization',
    keystrokeForKeyboardEventCb: null,
    keymapLoader: null,
    keyMapper: null,
    modifierStateHandler: null,
    keymapGeneratorView: null,
    config: {
      useKeyboardLayout: {
        type: 'string',
        "default": 'de_DE',
        "enum": ['cs_CZ-qwerty', 'cs_CZ', 'da_DK', 'de_CH', 'de_DE-neo', 'de_DE', 'en_GB', 'es_ES', 'es_LA', 'et_EE', 'fr_BE', 'fr_CH', 'fr_FR', 'fr_FR-bepo', 'fr_CA', 'fi_FI', 'fi_FI-mac', 'hu_HU', 'it_IT', 'ja_JP', 'lv_LV', 'nb_NO', 'pl_PL', 'pt_BR', 'pt_PT', 'ro_RO', 'ru_RU', 'sl_SL', 'sr_RS', 'sv_SE', 'tr_TR', 'uk_UA'],
        description: 'Pick your locale'
      },
      useKeyboardLayoutFromPath: {
        type: 'string',
        "default": '',
        description: 'Provide an absolute path to your keymap-json file'
      }
    },
    activate: function(state) {
      atom.workspace.addOpener(function(filePath) {
        if (filePath === KeymapGeneratorUri) {
          return createKeymapGeneratorView({
            uri: KeymapGeneratorUri
          });
        }
      });
      atom.commands.add('atom-workspace', {
        'keyboard-localization:keymap-generator': function() {
          return atom.workspace.open(KeymapGeneratorUri);
        }
      });
      this.keymapLoader = new KeymapLoader();
      this.keymapLoader.loadKeymap();
      this.keyMapper = KeyMapper.getInstance();
      this.modifierStateHandler = new ModifierStateHandler();
      this.changeUseKeyboardLayout = atom.config.onDidChange([this.pkg, 'useKeyboardLayout'].join('.'), (function(_this) {
        return function() {
          _this.keymapLoader.loadKeymap();
          if (_this.keymapLoader.isLoaded()) {
            return _this.keyMapper.setKeymap(_this.keymapLoader.getKeymap());
          }
        };
      })(this));
      this.changeUseKeyboardLayoutFromPath = atom.config.onDidChange([this.pkg, 'useKeyboardLayoutFromPath'].join('.'), (function(_this) {
        return function() {
          _this.keymapLoader.loadKeymap();
          if (_this.keymapLoader.isLoaded()) {
            return _this.keyMapper.setKeymap(_this.keymapLoader.getKeymap());
          }
        };
      })(this));
      if (this.keymapLoader.isLoaded()) {
        this.keyMapper.setKeymap(this.keymapLoader.getKeymap());
        this.keyMapper.setModifierStateHandler(this.modifierStateHandler);
        this.orginalKeyEvent = atom.keymaps.keystrokeForKeyboardEvent;
        return atom.keymaps.keystrokeForKeyboardEvent = (function(_this) {
          return function(event) {
            return _this.onKeyEvent(event);
          };
        })(this);
      }
    },
    deactivate: function() {
      var _ref;
      if (this.keymapLoader.isLoaded()) {
        atom.keymaps.keystrokeForKeyboardEvent = this.orginalKeyEvent;
        this.orginalKeyEvent = null;
      }
      this.changeUseKeyboardLayout.dispose();
      this.changeUseKeyboardLayoutFromPath.dispose();
      if ((_ref = this.keymapGeneratorView) != null) {
        _ref.destroy();
      }
      this.modifierStateHandler = null;
      this.keymapLoader = null;
      this.keyMapper = null;
      return this.keymapGeneratorView = null;
    },
    onKeyEvent: function(event) {
      var character;
      if (!event) {
        return '';
      }
      this.modifierStateHandler.handleKeyEvent(event);
      if (event.type === 'keydown' && (event.translated || this.keyMapper.remap(event))) {
        character = String.fromCharCode(event.keyCode);
        if (vimModeActive(event.target)) {
          if (this.modifierStateHandler.isAltGr() || this.modifierStateHandler.isShift()) {
            return character;
          }
        }
        return this.modifierStateHandler.getStrokeSequence(character);
      } else {
        return this.orginalKeyEvent(event);
      }
    }
  };

  module.exports = KeyboardLocalization;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMva2V5Ym9hcmQtbG9jYWxpemF0aW9uL2xpYi9rZXlib2FyZC1sb2NhbGl6YXRpb24uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRKQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FEZixDQUFBOztBQUFBLEVBRUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxjQUFSLENBRlosQ0FBQTs7QUFBQSxFQUdBLG9CQUFBLEdBQXVCLE9BQUEsQ0FBUSwwQkFBUixDQUh2QixDQUFBOztBQUFBLEVBSUMsZ0JBQWlCLE9BQUEsQ0FBUSxXQUFSLEVBQWpCLGFBSkQsQ0FBQTs7QUFBQSxFQU1BLG1CQUFBLEdBQXNCLElBTnRCLENBQUE7O0FBQUEsRUFPQSxrQkFBQSxHQUFxQiw2Q0FQckIsQ0FBQTs7QUFBQSxFQVNBLHlCQUFBLEdBQTRCLFNBQUMsS0FBRCxHQUFBOztNQUMxQixzQkFBdUIsT0FBQSxDQUFRLCtCQUFSO0tBQXZCO1dBQ0ksSUFBQSxtQkFBQSxDQUFvQixLQUFwQixFQUZzQjtFQUFBLENBVDVCLENBQUE7O0FBQUEsRUFhQSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQW5CLENBQ0U7QUFBQSxJQUFBLElBQUEsRUFBTSxxQkFBTjtBQUFBLElBQ0EsV0FBQSxFQUFhLFNBQUMsS0FBRCxHQUFBO2FBQVcseUJBQUEsQ0FBMEIsS0FBMUIsRUFBWDtJQUFBLENBRGI7R0FERixDQWJBLENBQUE7O0FBQUEsRUFpQkEsb0JBQUEsR0FDRTtBQUFBLElBQUEsR0FBQSxFQUFLLHVCQUFMO0FBQUEsSUFDQSwyQkFBQSxFQUE2QixJQUQ3QjtBQUFBLElBRUEsWUFBQSxFQUFjLElBRmQ7QUFBQSxJQUdBLFNBQUEsRUFBVyxJQUhYO0FBQUEsSUFJQSxvQkFBQSxFQUFzQixJQUp0QjtBQUFBLElBS0EsbUJBQUEsRUFBcUIsSUFMckI7QUFBQSxJQU9BLE1BQUEsRUFDRTtBQUFBLE1BQUEsaUJBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxPQURUO0FBQUEsUUFFQSxNQUFBLEVBQU0sQ0FDSixjQURJLEVBRUosT0FGSSxFQUdKLE9BSEksRUFJSixPQUpJLEVBS0osV0FMSSxFQU1KLE9BTkksRUFPSixPQVBJLEVBUUosT0FSSSxFQVNKLE9BVEksRUFVSixPQVZJLEVBV0osT0FYSSxFQVlKLE9BWkksRUFhSixPQWJJLEVBY0osWUFkSSxFQWVKLE9BZkksRUFnQkosT0FoQkksRUFpQkosV0FqQkksRUFrQkosT0FsQkksRUFtQkosT0FuQkksRUFvQkosT0FwQkksRUFxQkosT0FyQkksRUFzQkosT0F0QkksRUF1QkosT0F2QkksRUF3QkosT0F4QkksRUF5QkosT0F6QkksRUEwQkosT0ExQkksRUEyQkosT0EzQkksRUE0QkosT0E1QkksRUE2QkosT0E3QkksRUE4QkosT0E5QkksRUErQkosT0EvQkksRUFnQ0osT0FoQ0ksQ0FGTjtBQUFBLFFBb0NBLFdBQUEsRUFBYSxrQkFwQ2I7T0FERjtBQUFBLE1Bc0NBLHlCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsRUFEVDtBQUFBLFFBRUEsV0FBQSxFQUFhLG1EQUZiO09BdkNGO0tBUkY7QUFBQSxJQW1EQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBZixDQUF5QixTQUFDLFFBQUQsR0FBQTtBQUN2QixRQUFBLElBQXNELFFBQUEsS0FBWSxrQkFBbEU7aUJBQUEseUJBQUEsQ0FBMEI7QUFBQSxZQUFBLEdBQUEsRUFBSyxrQkFBTDtXQUExQixFQUFBO1NBRHVCO01BQUEsQ0FBekIsQ0FBQSxDQUFBO0FBQUEsTUFHQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQ0U7QUFBQSxRQUFBLHdDQUFBLEVBQTBDLFNBQUEsR0FBQTtpQkFBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0Isa0JBQXBCLEVBQUg7UUFBQSxDQUExQztPQURGLENBSEEsQ0FBQTtBQUFBLE1BTUEsSUFBQyxDQUFBLFlBQUQsR0FBb0IsSUFBQSxZQUFBLENBQUEsQ0FOcEIsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFBLFlBQVksQ0FBQyxVQUFkLENBQUEsQ0FQQSxDQUFBO0FBQUEsTUFRQSxJQUFDLENBQUEsU0FBRCxHQUFhLFNBQVMsQ0FBQyxXQUFWLENBQUEsQ0FSYixDQUFBO0FBQUEsTUFTQSxJQUFDLENBQUEsb0JBQUQsR0FBNEIsSUFBQSxvQkFBQSxDQUFBLENBVDVCLENBQUE7QUFBQSxNQVlBLElBQUMsQ0FBQSx1QkFBRCxHQUEyQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0IsQ0FBQyxJQUFDLENBQUEsR0FBRixFQUFPLG1CQUFQLENBQTJCLENBQUMsSUFBNUIsQ0FBaUMsR0FBakMsQ0FBeEIsRUFBK0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN4RixVQUFBLEtBQUMsQ0FBQSxZQUFZLENBQUMsVUFBZCxDQUFBLENBQUEsQ0FBQTtBQUNBLFVBQUEsSUFBRyxLQUFDLENBQUEsWUFBWSxDQUFDLFFBQWQsQ0FBQSxDQUFIO21CQUNFLEtBQUMsQ0FBQSxTQUFTLENBQUMsU0FBWCxDQUFxQixLQUFDLENBQUEsWUFBWSxDQUFDLFNBQWQsQ0FBQSxDQUFyQixFQURGO1dBRndGO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0QsQ0FaM0IsQ0FBQTtBQUFBLE1BZ0JBLElBQUMsQ0FBQSwrQkFBRCxHQUFtQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0IsQ0FBQyxJQUFDLENBQUEsR0FBRixFQUFPLDJCQUFQLENBQW1DLENBQUMsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBeEIsRUFBdUUsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN4RyxVQUFBLEtBQUMsQ0FBQSxZQUFZLENBQUMsVUFBZCxDQUFBLENBQUEsQ0FBQTtBQUNBLFVBQUEsSUFBRyxLQUFDLENBQUEsWUFBWSxDQUFDLFFBQWQsQ0FBQSxDQUFIO21CQUNFLEtBQUMsQ0FBQSxTQUFTLENBQUMsU0FBWCxDQUFxQixLQUFDLENBQUEsWUFBWSxDQUFDLFNBQWQsQ0FBQSxDQUFyQixFQURGO1dBRndHO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdkUsQ0FoQm5DLENBQUE7QUFxQkEsTUFBQSxJQUFHLElBQUMsQ0FBQSxZQUFZLENBQUMsUUFBZCxDQUFBLENBQUg7QUFDRSxRQUFBLElBQUMsQ0FBQSxTQUFTLENBQUMsU0FBWCxDQUFxQixJQUFDLENBQUEsWUFBWSxDQUFDLFNBQWQsQ0FBQSxDQUFyQixDQUFBLENBQUE7QUFBQSxRQUNBLElBQUMsQ0FBQSxTQUFTLENBQUMsdUJBQVgsQ0FBbUMsSUFBQyxDQUFBLG9CQUFwQyxDQURBLENBQUE7QUFBQSxRQUtBLElBQUMsQ0FBQSxlQUFELEdBQW1CLElBQUksQ0FBQyxPQUFPLENBQUMseUJBTGhDLENBQUE7ZUFNQSxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUFiLEdBQXlDLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxLQUFELEdBQUE7bUJBQ3ZDLEtBQUMsQ0FBQSxVQUFELENBQVksS0FBWixFQUR1QztVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLEVBUDNDO09BdEJRO0lBQUEsQ0FuRFY7QUFBQSxJQW1GQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFHLElBQUMsQ0FBQSxZQUFZLENBQUMsUUFBZCxDQUFBLENBQUg7QUFDRSxRQUFBLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQWIsR0FBeUMsSUFBQyxDQUFBLGVBQTFDLENBQUE7QUFBQSxRQUNBLElBQUMsQ0FBQSxlQUFELEdBQW1CLElBRG5CLENBREY7T0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLHVCQUF1QixDQUFDLE9BQXpCLENBQUEsQ0FKQSxDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsK0JBQStCLENBQUMsT0FBakMsQ0FBQSxDQUxBLENBQUE7O1lBT29CLENBQUUsT0FBdEIsQ0FBQTtPQVBBO0FBQUEsTUFTQSxJQUFDLENBQUEsb0JBQUQsR0FBd0IsSUFUeEIsQ0FBQTtBQUFBLE1BVUEsSUFBQyxDQUFBLFlBQUQsR0FBZ0IsSUFWaEIsQ0FBQTtBQUFBLE1BV0EsSUFBQyxDQUFBLFNBQUQsR0FBYSxJQVhiLENBQUE7YUFZQSxJQUFDLENBQUEsbUJBQUQsR0FBdUIsS0FiYjtJQUFBLENBbkZaO0FBQUEsSUFrR0EsVUFBQSxFQUFZLFNBQUMsS0FBRCxHQUFBO0FBQ1YsVUFBQSxTQUFBO0FBQUEsTUFBQSxJQUFBLENBQUEsS0FBQTtBQUFBLGVBQU8sRUFBUCxDQUFBO09BQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxvQkFBb0IsQ0FBQyxjQUF0QixDQUFxQyxLQUFyQyxDQURBLENBQUE7QUFLQSxNQUFBLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxTQUFkLElBQTJCLENBQUMsS0FBSyxDQUFDLFVBQU4sSUFBb0IsSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUFYLENBQWlCLEtBQWpCLENBQXJCLENBQTlCO0FBQ0UsUUFBQSxTQUFBLEdBQVksTUFBTSxDQUFDLFlBQVAsQ0FBb0IsS0FBSyxDQUFDLE9BQTFCLENBQVosQ0FBQTtBQUNBLFFBQUEsSUFBRyxhQUFBLENBQWMsS0FBSyxDQUFDLE1BQXBCLENBQUg7QUFFRSxVQUFBLElBQUcsSUFBQyxDQUFBLG9CQUFvQixDQUFDLE9BQXRCLENBQUEsQ0FBQSxJQUFtQyxJQUFDLENBQUEsb0JBQW9CLENBQUMsT0FBdEIsQ0FBQSxDQUF0QztBQUNFLG1CQUFPLFNBQVAsQ0FERjtXQUZGO1NBREE7QUFLQSxlQUFPLElBQUMsQ0FBQSxvQkFBb0IsQ0FBQyxpQkFBdEIsQ0FBd0MsU0FBeEMsQ0FBUCxDQU5GO09BQUEsTUFBQTtBQVFFLGVBQU8sSUFBQyxDQUFBLGVBQUQsQ0FBaUIsS0FBakIsQ0FBUCxDQVJGO09BTlU7SUFBQSxDQWxHWjtHQWxCRixDQUFBOztBQUFBLEVBb0lBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLG9CQXBJakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/jakob/.atom/packages/keyboard-localization/lib/keyboard-localization.coffee
