(function() {
  var KeyboardLocalization, fs, path;

  path = require('path');

  fs = require('fs');

  KeyboardLocalization = require('../lib/keyboard-localization.coffee');

  describe('KeyboardLocalization', function() {
    var pkg;
    pkg = [];
    beforeEach(function() {
      return pkg = new KeyboardLocalization();
    });
    return describe('when the package loads', function() {
      return it('should be an keymap-locale-file available for every config entry', function() {
        return pkg.config.useKeyboardLayout["enum"].forEach(function(localeString) {
          var pathToKeymapFile;
          pathToKeymapFile = path.join(__dirname, '..', 'lib', 'keymaps', localeString + '.json');
          return expect(fs.existsSync(pathToKeymapFile)).toBe(true);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMva2V5Ym9hcmQtbG9jYWxpemF0aW9uL3NwZWMva2V5Ym9hcmQtbG9jYWxpemF0aW9uLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhCQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQURMLENBQUE7O0FBQUEsRUFFQSxvQkFBQSxHQUF1QixPQUFBLENBQVEscUNBQVIsQ0FGdkIsQ0FBQTs7QUFBQSxFQUlBLFFBQUEsQ0FBUyxzQkFBVCxFQUFpQyxTQUFBLEdBQUE7QUFDL0IsUUFBQSxHQUFBO0FBQUEsSUFBQSxHQUFBLEdBQU0sRUFBTixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO2FBQ1QsR0FBQSxHQUFVLElBQUEsb0JBQUEsQ0FBQSxFQUREO0lBQUEsQ0FBWCxDQUZBLENBQUE7V0FLQSxRQUFBLENBQVMsd0JBQVQsRUFBbUMsU0FBQSxHQUFBO2FBQ2pDLEVBQUEsQ0FBRyxrRUFBSCxFQUF1RSxTQUFBLEdBQUE7ZUFDckUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFELENBQUssQ0FBQyxPQUFsQyxDQUEwQyxTQUFDLFlBQUQsR0FBQTtBQUN4QyxjQUFBLGdCQUFBO0FBQUEsVUFBQSxnQkFBQSxHQUFtQixJQUFJLENBQUMsSUFBTCxDQUFVLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsS0FBM0IsRUFBa0MsU0FBbEMsRUFBNkMsWUFBQSxHQUFlLE9BQTVELENBQW5CLENBQUE7aUJBQ0EsTUFBQSxDQUFPLEVBQUUsQ0FBQyxVQUFILENBQWMsZ0JBQWQsQ0FBUCxDQUF1QyxDQUFDLElBQXhDLENBQTZDLElBQTdDLEVBRndDO1FBQUEsQ0FBMUMsRUFEcUU7TUFBQSxDQUF2RSxFQURpQztJQUFBLENBQW5DLEVBTitCO0VBQUEsQ0FBakMsQ0FKQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/jakob/.atom/packages/keyboard-localization/spec/keyboard-localization-spec.coffee
