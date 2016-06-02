(function() {
  var ModifierView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  module.exports = ModifierView = (function(_super) {
    __extends(ModifierView, _super);

    function ModifierView() {
      return ModifierView.__super__.constructor.apply(this, arguments);
    }

    ModifierView.content = function() {
      return this.div({
        "class": 'modifier'
      });
    };

    ModifierView.prototype.initialize = function(params) {
      this.text(params.label);
      return this.addClass('modifier-' + params.label.toLowerCase());
    };

    ModifierView.prototype.setActive = function(active) {
      if (active) {
        return this.addClass('modifier-active');
      } else {
        return this.removeClass('modifier-active');
      }
    };

    return ModifierView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMva2V5Ym9hcmQtbG9jYWxpemF0aW9uL2xpYi92aWV3cy9tb2RpZmllci12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxrQkFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsc0JBQVIsRUFBUixJQUFELENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosbUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sVUFBUDtPQUFMLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsMkJBR0EsVUFBQSxHQUFZLFNBQUMsTUFBRCxHQUFBO0FBQ1YsTUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxLQUFiLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsV0FBQSxHQUFjLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBYixDQUFBLENBQXhCLEVBRlU7SUFBQSxDQUhaLENBQUE7O0FBQUEsMkJBT0EsU0FBQSxHQUFXLFNBQUMsTUFBRCxHQUFBO0FBQ1QsTUFBQSxJQUFHLE1BQUg7ZUFBZSxJQUFDLENBQUEsUUFBRCxDQUFVLGlCQUFWLEVBQWY7T0FBQSxNQUFBO2VBQWlELElBQUMsQ0FBQSxXQUFELENBQWEsaUJBQWIsRUFBakQ7T0FEUztJQUFBLENBUFgsQ0FBQTs7d0JBQUE7O0tBRnlCLEtBSDNCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/jakob/.atom/packages/keyboard-localization/lib/views/modifier-view.coffee
