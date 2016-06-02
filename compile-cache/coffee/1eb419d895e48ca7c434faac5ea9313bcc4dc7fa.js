(function() {
  var KeyEventView, View, charCodeFromKeyIdentifier,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  charCodeFromKeyIdentifier = require('../helpers').charCodeFromKeyIdentifier;

  module.exports = KeyEventView = (function(_super) {
    __extends(KeyEventView, _super);

    function KeyEventView() {
      return KeyEventView.__super__.constructor.apply(this, arguments);
    }

    KeyEventView.prototype.event = null;

    KeyEventView.prototype.modifiers = null;

    KeyEventView.content = function(params) {
      return this.div({
        "class": 'key-box'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'section-heading icon icon-keyboard'
          }, params.title);
          _this.div({
            "class": 'key-attribute-row'
          }, function() {
            _this.span('Identifier: ');
            return _this.span({
              outlet: 'identifier'
            });
          });
          _this.div({
            "class": 'key-attribute-row'
          }, function() {
            _this.span('Code: ');
            return _this.span({
              outlet: 'code'
            });
          });
          _this.div({
            "class": 'key-attribute-row'
          }, function() {
            _this.span('Char: ');
            return _this.span({
              outlet: 'char'
            });
          });
          return _this.div({
            "class": 'key-attribute-row'
          }, function() {
            _this.span('Modifier: ');
            return _this.span({
              outlet: 'modifier'
            });
          });
        };
      })(this));
    };

    KeyEventView.prototype.setKey = function(keyEvent, modifiers) {
      var k, modifierStack, v, _ref;
      this.event = keyEvent;
      this.modifiers = modifiers;
      this.event.code = charCodeFromKeyIdentifier(this.event.keyIdentifier) || this.event.keyCode || this.event.which;
      this.event.char = String.fromCharCode(this.event.code).toLowerCase();
      this.identifier.text(this.event.keyIdentifier);
      this.code.text(this.event.code);
      this.char.text(this.event.char);
      modifierStack = [];
      _ref = this.modifiers;
      for (k in _ref) {
        v = _ref[k];
        if (v === true) {
          modifierStack.push(k);
        }
      }
      return this.modifier.text(modifierStack.join(' '));
    };

    KeyEventView.prototype.getKey = function() {
      return this.event;
    };

    KeyEventView.prototype.getModifiers = function() {
      return this.modifiers;
    };

    KeyEventView.prototype.clear = function() {
      this.event = null;
      this.modifiers = null;
      this.identifier.text('');
      this.code.text('');
      this.char.text('');
      return this.modifier.text('');
    };

    return KeyEventView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMva2V5Ym9hcmQtbG9jYWxpemF0aW9uL2xpYi92aWV3cy9rZXktZXZlbnQtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNkNBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0MsNEJBQTZCLE9BQUEsQ0FBUSxZQUFSLEVBQTdCLHlCQURELENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osbUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLDJCQUFBLEtBQUEsR0FBTyxJQUFQLENBQUE7O0FBQUEsMkJBQ0EsU0FBQSxHQUFXLElBRFgsQ0FBQTs7QUFBQSxJQUdBLFlBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxNQUFELEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sU0FBUDtPQUFMLEVBQXVCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDckIsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sb0NBQVA7V0FBTCxFQUFrRCxNQUFNLENBQUMsS0FBekQsQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sbUJBQVA7V0FBTCxFQUFpQyxTQUFBLEdBQUE7QUFDL0IsWUFBQSxLQUFDLENBQUEsSUFBRCxDQUFNLGNBQU4sQ0FBQSxDQUFBO21CQUNBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxjQUFBLE1BQUEsRUFBUSxZQUFSO2FBQU4sRUFGK0I7VUFBQSxDQUFqQyxDQURBLENBQUE7QUFBQSxVQUlBLEtBQUMsQ0FBQSxH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

//# sourceURL=/home/jakob/.atom/packages/keyboard-localization/lib/views/key-event-view.coffee
