(function() {
  var KeymapTableView, ScrollView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ScrollView = require('atom-space-pen-views').ScrollView;

  module.exports = KeymapTableView = (function(_super) {
    __extends(KeymapTableView, _super);

    function KeymapTableView() {
      return KeymapTableView.__super__.constructor.apply(this, arguments);
    }

    KeymapTableView.prototype.mapTable = {};

    KeymapTableView.prototype.keymapChangeCallback = null;

    KeymapTableView.content = function() {
      return this.section({
        "class": 'map-table-panel'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'section-heading pull-left icon icon-code'
          }, 'Key-Mappings');
          _this.div({
            "class": 'btn-group pull-right'
          }, function() {
            _this.div({
              "class": 'btn btn-clipboard icon-clippy',
              click: 'saveToClipboard'
            }, ' clipboard');
            return _this.div({
              "class": 'btn btn-clear icon icon-trashcan',
              click: 'clear'
            }, 'clear');
          });
          return _this.pre({
            "class": 'map-table',
            outlet: 'mapTableView'
          });
        };
      })(this));
    };

    KeymapTableView.prototype.addKeyMapping = function(down, modifier, press, isAccentKey) {
      var modIdentifier;
      modIdentifier = 'unshifted';
      if (modifier.shift) {
        modIdentifier = 'shifted';
      }
      if (modifier.altgr) {
        modIdentifier = 'alted';
      }
      if (modifier.shift && modifier.altgr) {
        modIdentifier = 'altshifted';
      }
      if (this.mapTable[down.code] == null) {
        this.mapTable[down.code] = {};
      }
      if (isAccentKey) {
        this.mapTable[down.code]['accent'] = true;
      }
      this.mapTable[down.code][modIdentifier] = press.code;
      if (this.keymapChangeCallback) {
        this.keymapChangeCallback(this.mapTable);
      }
      return this.render();
    };

    KeymapTableView.prototype.render = function() {
      return this.mapTableView.text(JSON.stringify(this.mapTable, void 0, 4));
    };

    KeymapTableView.prototype.getKeymap = function() {
      return this.mapTable;
    };

    KeymapTableView.prototype.saveToClipboard = function() {
      var input;
      console.log('clipboard');
      input = document.createElement('textarea');
      document.body.appendChild(input);
      input.value = JSON.stringify(this.mapTable, void 0, 4);
      input.focus();
      input.select();
      document.execCommand('Copy');
      return input.remove();
    };


    /*
    saveToFile: ->
      console.log 'save'
    
    saveToGithub: ->
      console.log 'github'
     */

    KeymapTableView.prototype.onKeymapChange = function(keymapChangeCallback) {
      return this.keymapChangeCallback = keymapChangeCallback;
    };

    KeymapTableView.prototype.clear = function() {
      this.mapTable = {};
      this.render();
      if (this.keymapChangeCallback) {
        return this.keymapChangeCallback(this.mapTable);
      }
    };

    return KeymapTableView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMva2V5Ym9hcmQtbG9jYWxpemF0aW9uL2xpYi92aWV3cy9rZXltYXAtdGFibGUtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMkJBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLGFBQWMsT0FBQSxDQUFRLHNCQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHNDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSw4QkFBQSxRQUFBLEdBQVUsRUFBVixDQUFBOztBQUFBLDhCQUNBLG9CQUFBLEdBQXNCLElBRHRCLENBQUE7O0FBQUEsSUFHQSxlQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxPQUFELENBQVM7QUFBQSxRQUFBLE9BQUEsRUFBTSxpQkFBTjtPQUFULEVBQWtDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDaEMsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sMENBQVA7V0FBTCxFQUF3RCxjQUF4RCxDQUFBLENBQUE7QUFBQSxVQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTSxzQkFBTjtXQUFMLEVBQW1DLFNBQUEsR0FBQTtBQUVqQyxZQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTSwrQkFBTjtBQUFBLGNBQXVDLEtBQUEsRUFBTSxpQkFBN0M7YUFBTCxFQUFxRSxZQUFyRSxDQUFBLENBQUE7bUJBRUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGNBQUEsT0FBQSxFQUFNLGtDQUFOO0FBQUEsY0FBMEMsS0FBQSxFQUFNLE9BQWhEO2FBQUwsRUFBOEQsT0FBOUQs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

//# sourceURL=/home/jakob/.atom/packages/keyboard-localization/lib/views/keymap-table-view.coffee
