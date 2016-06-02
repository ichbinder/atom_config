(function() {
  var KeyMapper, ModifierStateHandler, charCodeFromKeyIdentifier, charCodeToKeyIdentifier, getInstance, keyMapper, _ref;

  ModifierStateHandler = require('./modifier-state-handler');

  _ref = require('./helpers'), charCodeFromKeyIdentifier = _ref.charCodeFromKeyIdentifier, charCodeToKeyIdentifier = _ref.charCodeToKeyIdentifier;

  KeyMapper = (function() {
    function KeyMapper() {}

    KeyMapper.prototype.translationTable = null;

    KeyMapper.prototype.modifierStateHandler = null;

    KeyMapper.prototype.destroy = function() {
      this.translationTable = null;
      return this.modifierStateHandler = null;
    };

    KeyMapper.prototype.setModifierStateHandler = function(modifierStateHandler) {
      return this.modifierStateHandler = modifierStateHandler;
    };

    KeyMapper.prototype.setKeymap = function(keymap) {
      return this.translationTable = keymap;
    };

    KeyMapper.prototype.getKeymap = function() {
      return this.translationTable;
    };

    KeyMapper.prototype.translateKeyBinding = function(event) {
      var charCode, identifier, translation;
      identifier = charCodeFromKeyIdentifier(event.keyIdentifier);
      charCode = null;
      if ((this.translationTable != null) && (identifier != null) && (this.translationTable[identifier] != null) && (this.modifierStateHandler != null)) {
        if (translation = this.translationTable[identifier]) {
          if ((translation.altshifted != null) && this.modifierStateHandler.isShift() && this.modifierStateHandler.isAltGr()) {
            charCode = translation.altshifted;
          } else if ((translation.shifted != null) && this.modifierStateHandler.isShift()) {
            charCode = translation.shifted;
          } else if ((translation.alted != null) && this.modifierStateHandler.isAltGr()) {
            charCode = translation.alted;
          } else if (translation.unshifted != null) {
            charCode = translation.unshifted;
          }
        }
      }
      if (charCode != null) {
        Object.defineProperty(event, 'keyIdentifier', {
          get: function() {
            return charCodeToKeyIdentifier(charCode);
          }
        });
        Object.defineProperty(event, 'keyCode', {
          get: function() {
            return charCode;
          }
        });
        Object.defineProperty(event, 'which', {
          get: function() {
            return charCode;
          }
        });
        Object.defineProperty(event, 'translated', {
          get: function() {
            return true;
          }
        });
        Object.defineProperty(event, 'altKey', {
          get: function() {
            return false;
          }
        });
        Object.defineProperty(event, 'ctrlKey', {
          get: function() {
            return false;
          }
        });
        Object.defineProperty(event, 'shiftKey', {
          get: function() {
            return false;
          }
        });
        Object.defineProperty(event, 'metaKey', {
          get: function() {
            return false;
          }
        });
        if (this.modifierStateHandler.isAltGr() && !translation.accent) {
          return event.preventDefault();
        }
      }
    };

    KeyMapper.prototype.remap = function(event) {
      var translated;
      this.translateKeyBinding(event);
      translated = event.translated === true;
      delete event.translated;
      return translated;
    };

    return KeyMapper;

  })();

  keyMapper = null;

  getInstance = function() {
    if (keyMapper === null) {
      keyMapper = new KeyMapper();
    }
    return keyMapper;
  };

  module.exports = {
    getInstance: getInstance
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMva2V5Ym9hcmQtbG9jYWxpemF0aW9uL2xpYi9rZXktbWFwcGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxpSEFBQTs7QUFBQSxFQUFBLG9CQUFBLEdBQXVCLE9BQUEsQ0FBUSwwQkFBUixDQUF2QixDQUFBOztBQUFBLEVBQ0EsT0FBdUQsT0FBQSxDQUFRLFdBQVIsQ0FBdkQsRUFBQyxpQ0FBQSx5QkFBRCxFQUE0QiwrQkFBQSx1QkFENUIsQ0FBQTs7QUFBQSxFQUdNOzJCQUNKOztBQUFBLHdCQUFBLGdCQUFBLEdBQWtCLElBQWxCLENBQUE7O0FBQUEsd0JBQ0Esb0JBQUEsR0FBc0IsSUFEdEIsQ0FBQTs7QUFBQSx3QkFHQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxJQUFDLENBQUEsZ0JBQUQsR0FBb0IsSUFBcEIsQ0FBQTthQUNBLElBQUMsQ0FBQSxvQkFBRCxHQUF3QixLQUZqQjtJQUFBLENBSFQsQ0FBQTs7QUFBQSx3QkFPQSx1QkFBQSxHQUF5QixTQUFDLG9CQUFELEdBQUE7YUFDdkIsSUFBQyxDQUFBLG9CQUFELEdBQXdCLHFCQUREO0lBQUEsQ0FQekIsQ0FBQTs7QUFBQSx3QkFVQSxTQUFBLEdBQVcsU0FBQyxNQUFELEdBQUE7YUFDVCxJQUFDLENBQUEsZ0JBQUQsR0FBb0IsT0FEWDtJQUFBLENBVlgsQ0FBQTs7QUFBQSx3QkFhQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBQ1QsYUFBTyxJQUFDLENBQUEsZ0JBQVIsQ0FEUztJQUFBLENBYlgsQ0FBQTs7QUFBQSx3QkFnQkEsbUJBQUEsR0FBcUIsU0FBQyxLQUFELEdBQUE7QUFDbkIsVUFBQSxpQ0FBQTtBQUFBLE1BQUEsVUFBQSxHQUFhLHlCQUFBLENBQTBCLEtBQUssQ0FBQyxhQUFoQyxDQUFi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

//# sourceURL=/home/jakob/.atom/packages/keyboard-localization/lib/key-mapper.coffee
