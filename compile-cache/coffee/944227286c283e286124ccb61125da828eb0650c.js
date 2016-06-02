(function() {
  var KeyMapper, fs, path;

  path = require('path');

  fs = require('fs-plus');

  module.exports = KeyMapper = (function() {
    function KeyMapper() {}

    KeyMapper.prototype.pkg = 'keyboard-localization';

    KeyMapper.prototype.translationTable = null;

    KeyMapper.prototype.keymapName = '';

    KeyMapper.prototype.loaded = false;

    KeyMapper.prototype.destroy = function() {
      return this.translationTable = null;
    };

    KeyMapper.prototype.loadKeymap = function() {
      var customPath, pathToTransTable, tansTableContentJson, useKeyboardLayout, useKeyboardLayoutFromPath;
      this.loaded = false;
      this.keymapName = '';
      useKeyboardLayout = atom.config.get([this.pkg, 'useKeyboardLayout'].join('.'));
      if (useKeyboardLayout != null) {
        pathToTransTable = path.join(__dirname, 'keymaps', useKeyboardLayout + '.json');
      }
      useKeyboardLayoutFromPath = atom.config.get([this.pkg, 'useKeyboardLayoutFromPath'].join('.'));
      if (useKeyboardLayoutFromPath != null) {
        customPath = path.normalize(useKeyboardLayoutFromPath);
        if (fs.isFileSync(customPath)) {
          pathToTransTable = customPath;
        }
      }
      if (fs.isFileSync(pathToTransTable)) {
        tansTableContentJson = fs.readFileSync(pathToTransTable, 'utf8');
        this.translationTable = JSON.parse(tansTableContentJson);
        console.log(this.pkg, 'Keymap loaded "' + pathToTransTable + '"');
        this.keymapName = path.basename(pathToTransTable, '.json');
        return this.loaded = true;
      } else {
        return console.log(this.pkg, 'Error loading keymap "' + pathToTransTable + '"');
      }
    };

    KeyMapper.prototype.isLoaded = function() {
      return this.loaded;
    };

    KeyMapper.prototype.getKeymapName = function() {
      return this.keymapName;
    };

    KeyMapper.prototype.getKeymap = function() {
      return this.translationTable;
    };

    return KeyMapper;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMva2V5Ym9hcmQtbG9jYWxpemF0aW9uL2xpYi9rZXltYXAtbG9hZGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxtQkFBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FETCxDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDTTsyQkFDSjs7QUFBQSx3QkFBQSxHQUFBLEdBQUssdUJBQUwsQ0FBQTs7QUFBQSx3QkFDQSxnQkFBQSxHQUFrQixJQURsQixDQUFBOztBQUFBLHdCQUVBLFVBQUEsR0FBWSxFQUZaLENBQUE7O0FBQUEsd0JBR0EsTUFBQSxHQUFRLEtBSFIsQ0FBQTs7QUFBQSx3QkFLQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLGdCQUFELEdBQW9CLEtBRGI7SUFBQSxDQUxULENBQUE7O0FBQUEsd0JBUUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsZ0dBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FBVixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsVUFBRCxHQUFjLEVBRGQsQ0FBQTtBQUFBLE1BR0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLENBQUMsSUFBQyxDQUFBLEdBQUYsRUFBTyxtQkFBUCxDQUEyQixDQUFDLElBQTVCLENBQWlDLEdBQWpDLENBQWhCLENBSHBCLENBQUE7QUFJQSxNQUFBLElBQUcseUJBQUg7QUFDRSxRQUFBLGdCQUFBLEdBQW1CLElBQUksQ0FBQyxJQUFMLENBQ2pCLFNBRGlCLEVBRWpCLFNBRmlCLEVBR2pCLGlCQUFBLEdBQW9CLE9BSEgsQ0FBbkIsQ0FERjtPQUpBO0FBQUEsTUFXQSx5QkFBQSxHQUE0QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsQ0FBQyxJQUFDLENBQUEsR0FBRixFQUFPLDJCQUFQLENBQW1DLENBQUMsSUFBcEMsQ0FBeUMsR0FBekMsQ0FBaEIsQ0FYNUIsQ0FBQTtBQVlBLE1BQUEsSUFBRyxpQ0FBSDtBQUNFLFFBQUEsVUFBQSxHQUFhLElBQUksQ0FBQyxTQUFMLENBQWUseUJBQWYsQ0FBYixDQUFBO0FBQ0EsUUFBQSxJQUFHLEVBQUUsQ0FBQyxVQUFILENBQWMsVUFBZCxDQUFIO0FBQ0UsVUFBQSxnQkFBQSxHQUFtQixVQUFuQixDQURGO1NBRkY7T0FaQTtBQWlCQSxNQUFBLElBQUcsRUFBRSxDQUFDLFVBQUgsQ0FBYyxnQkFBZCxDQUFIO0FBQ0UsUUFBQSxvQkFBQSxHQUF1QixFQUFFLENBQUMsWUFBSCxDQUFnQixnQkFBaEIsRUFBa0MsTUFBbEMsQ0FBdkIsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLGdCQUFELEdBQW9CLElBQUksQ0FBQyxLQUFMLENBQVcsb0JBQVgsQ0FEcEIsQ0FBQTtBQUFBLFFBRUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsR0FBYixFQUFrQixpQkFBQSxHQUFvQixnQkFBcEIsR0FBdUMsR0FBekQsQ0FGQSxDQUFBO0FBQUEsUUFHQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUksQ0FBQyxRQUFMLENBQWMsZ0JBQWQsRUFBZ0MsT0FBaEMsQ0FIZCxDQUFBO2VBSUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxLQUxaO09BQUEsTUFBQTtlQU9FLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBQyxDQUFBLEdBQWIsRUFBa0Isd0JBQUEsR0FBMkIsZ0JBQTNCLEdBQThDLEdBQWhFLEVBUEY7T0FsQlU7SUFBQSxDQVJaLENBQUE7O0FBQUEsd0JBbUNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixhQUFPLElBQUMsQ0FBQSxNQUFSLENBRFE7SUFBQSxDQW5DVixDQUFBOztBQUFBLHdCQXNDQSxhQUFBLEdBQWUsU0FBQSxHQUFBO0FBQ2IsYUFBTyxJQUFDLENBQUEsVUFBUixDQURhO0lBQUEsQ0F0Q2YsQ0FBQTs7QUFBQSx3QkF5Q0EsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNULGFBQU8sSUFBQyxDQUFBLGdCQUFSLENBRFM7SUFBQSxDQXpDWCxDQUFBOztxQkFBQTs7TUFMRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/jakob/.atom/packages/keyboard-localization/lib/keymap-loader.coffee
