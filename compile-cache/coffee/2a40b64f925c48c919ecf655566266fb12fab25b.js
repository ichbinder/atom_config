(function() {
  var padZero,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  padZero = function(strToPad, size) {
    while (strToPad.length < size) {
      strToPad = '0' + strToPad;
    }
    return strToPad;
  };

  exports.charCodeFromKeyIdentifier = function(keyIdentifier) {
    if (keyIdentifier.indexOf('U+') === 0) {
      return parseInt(keyIdentifier.slice(2), 16);
    }
  };

  exports.charCodeToKeyIdentifier = function(charCode) {
    return 'U+' + padZero(charCode.toString(16).toUpperCase(), 4);
  };

  exports.vimModeActive = function(editor) {
    if ((editor != null) && (__indexOf.call(editor.classList, 'vim-mode') >= 0 || __indexOf.call(editor.classList, 'vim-mode-plus') >= 0)) {
      if (__indexOf.call(editor.classList, 'operator-pending-mode') >= 0) {
        return true;
      }
      if (__indexOf.call(editor.classList, 'normal-mode') >= 0) {
        return true;
      }
      if (__indexOf.call(editor.classList, 'visual-mode') >= 0) {
        return true;
      }
    }
    return false;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMva2V5Ym9hcmQtbG9jYWxpemF0aW9uL2xpYi9oZWxwZXJzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxPQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQSxPQUFBLEdBQVUsU0FBQyxRQUFELEVBQVcsSUFBWCxHQUFBO0FBQ1IsV0FBTSxRQUFRLENBQUMsTUFBVCxHQUFrQixJQUF4QixHQUFBO0FBQ0UsTUFBQSxRQUFBLEdBQVcsR0FBQSxHQUFNLFFBQWpCLENBREY7SUFBQSxDQUFBO0FBRUEsV0FBTyxRQUFQLENBSFE7RUFBQSxDQUFWLENBQUE7O0FBQUEsRUFNQSxPQUFPLENBQUMseUJBQVIsR0FBb0MsU0FBQyxhQUFELEdBQUE7QUFDbEMsSUFBQSxJQUFvQyxhQUFhLENBQUMsT0FBZCxDQUFzQixJQUF0QixDQUFBLEtBQStCLENBQW5FO2FBQUEsUUFBQSxDQUFTLGFBQWMsU0FBdkIsRUFBNkIsRUFBN0IsRUFBQTtLQURrQztFQUFBLENBTnBDLENBQUE7O0FBQUEsRUFTQSxPQUFPLENBQUMsdUJBQVIsR0FBa0MsU0FBQyxRQUFELEdBQUE7QUFDaEMsV0FBTyxJQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVEsQ0FBQyxRQUFULENBQWtCLEVBQWxCLENBQXFCLENBQUMsV0FBdEIsQ0FBQSxDQUFSLEVBQTZDLENBQTdDLENBQWQsQ0FEZ0M7RUFBQSxDQVRsQyxDQUFBOztBQUFBLEVBWUEsT0FBTyxDQUFDLGFBQVIsR0FBd0IsU0FBQyxNQUFELEdBQUE7QUFDdEIsSUFBQSxJQUFHLGdCQUFBLElBQVksQ0FBQyxlQUFjLE1BQU0sQ0FBQyxTQUFyQixFQUFBLFVBQUEsTUFBQSxJQUFrQyxlQUFtQixNQUFNLENBQUMsU0FBMUIsRUFBQSxlQUFBLE1BQW5DLENBQWY7QUFDRSxNQUFBLElBQWUsZUFBMkIsTUFBTSxDQUFDLFNBQWxDLEVBQUEsdUJBQUEsTUFBZjtBQUFBLGVBQU8sSUFBUCxDQUFBO09BQUE7QUFDQSxNQUFBLElBQWUsZUFBaUIsTUFBTSxDQUFDLFNBQXhCLEVBQUEsYUFBQSxNQUFmO0FBQUEsZUFBTyxJQUFQLENBQUE7T0FEQTtBQUVBLE1BQUEsSUFBZSxlQUFpQixNQUFNLENBQUMsU0FBeEIsRUFBQSxhQUFBLE1BQWY7QUFBQSxlQUFPLElBQVAsQ0FBQTtPQUhGO0tBQUE7QUFJQSxXQUFPLEtBQVAsQ0FMc0I7RUFBQSxDQVp4QixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/jakob/.atom/packages/keyboard-localization/lib/helpers.coffee
