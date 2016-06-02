(function() {
  var $, FileItem, FileView, View, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = require('atom-space-pen-views'), View = _ref.View, $ = _ref.$;

  git = require('../git');

  FileItem = (function(_super) {
    __extends(FileItem, _super);

    function FileItem() {
      return FileItem.__super__.constructor.apply(this, arguments);
    }

    FileItem.content = function(file) {
      console.log('file', file);
      return this.div({
        "class": "file " + file.type,
        'data-name': file.name
      }, (function(_this) {
        return function() {
          _this.span({
            "class": 'clickable text',
            click: 'select',
            title: file.name
          }, file.name);
          _this.i({
            "class": 'icon check clickable',
            click: 'select'
          });
          return _this.i({
            "class": "icon " + (file.type === 'modified' ? 'clickable' : '') + " file-" + file.type,
            click: 'showFileDiff'
          });
        };
      })(this));
    };

    FileItem.prototype.initialize = function(file) {
      return this.file = file;
    };

    FileItem.prototype.showFileDiff = function() {
      if (this.file.type === 'modified') {
        return this.file.showFileDiff(this.file.name);
      }
    };

    FileItem.prototype.select = function() {
      return this.file.select(this.file.name);
    };

    return FileItem;

  })(View);

  module.exports = FileView = (function(_super) {
    __extends(FileView, _super);

    function FileView() {
      return FileView.__super__.constructor.apply(this, arguments);
    }

    FileView.content = function() {
      return this.div({
        "class": 'files'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'heading clickable'
          }, function() {
            _this.i({
              click: 'toggleBranch',
              "class": 'icon forked'
            });
            _this.span({
              click: 'toggleBranch'
            }, 'Workspace:');
            _this.span('', {
              outlet: 'workspaceTitle'
            });
            return _this.div({
              "class": 'action',
              click: 'selectAll'
            }, function() {
              _this.span('Select');
              _this.i({
                "class": 'icon check'
              });
              return _this.input({
                "class": 'invisible',
                type: 'checkbox',
                outlet: 'allCheckbox',
                checked: true
              });
            });
          });
          return _this.div({
            "class": 'placeholder'
          }, 'No local working copy changes detected');
        };
      })(this));
    };

    FileView.prototype.initialize = function() {
      this.files = {};
      this.arrayOfFiles = new Array;
      return this.hidden = false;
    };

    FileView.prototype.toggleBranch = function() {
      if (this.hidden) {
        this.addAll(this.arrayOfFiles);
      } else {
        this.clearAll();
      }
      return this.hidden = !this.hidden;
    };

    FileView.prototype.hasSelected = function() {
      var file, name, _ref1;
      _ref1 = this.files;
      for (name in _ref1) {
        file = _ref1[name];
        if (file.selected) {
          return true;
        }
      }
      return false;
    };

    FileView.prototype.getSelected = function() {
      var file, files, name, _ref1;
      files = {
        all: [],
        add: [],
        rem: []
      };
      _ref1 = this.files;
      for (name in _ref1) {
        file = _ref1[name];
        if (!file.selected) {
          continue;
        }
        files.all.push(name);
        switch (file.type) {
          case 'deleted':
            files.rem.push(name);
            break;
          default:
            files.add.push(name);
        }
      }
      return files;
    };

    FileView.prototype.showSelected = function() {
      var file, fnames, name, _ref1;
      fnames = [];
      this.arrayOfFiles = Object.keys(this.files).map((function(_this) {
        return function(file) {
          return _this.files[file];
        };
      })(this));
      this.find('.file').toArray().forEach((function(_this) {
        return function(div) {
          var f, name;
          f = $(div);
          if (name = f.attr('data-name')) {
            if (_this.files[name].selected) {
              fnames.push(name);
              f.addClass('active');
            } else {
              f.removeClass('active');
            }
          }
        };
      })(this));
      _ref1 = this.files;
      for (name in _ref1) {
        file = _ref1[name];
        if (__indexOf.call(fnames, name) < 0) {
          file.selected = false;
        }
      }
      this.parentView.showSelectedFiles();
    };

    FileView.prototype.clearAll = function() {
      this.find('>.file').remove();
    };

    FileView.prototype.addAll = function(files) {
      var file, fnames, name, select, showFileDiff, _ref1;
      fnames = [];
      this.clearAll();
      if (files.length) {
        this.removeClass('none');
        select = (function(_this) {
          return function(name) {
            return _this.selectFile(name);
          };
        })(this);
        showFileDiff = (function(_this) {
          return function(name) {
            return _this.showFileDiff(name);
          };
        })(this);
        files.forEach((function(_this) {
          return function(file) {
            var _base, _name;
            fnames.push(file.name);
            file.select = select;
            file.showFileDiff = showFileDiff;
            (_base = _this.files)[_name = file.name] || (_base[_name] = {
              name: file.name
            });
            _this.files[file.name].type = file.type;
            _this.files[file.name].selected = file.selected;
            _this.append(new FileItem(file));
          };
        })(this));
      } else {
        this.addClass('none');
      }
      _ref1 = this.files;
      for (name in _ref1) {
        file = _ref1[name];
        if (__indexOf.call(fnames, name) < 0) {
          file.selected = false;
        }
      }
      this.showSelected();
    };

    FileView.prototype.showFileDiff = function(name) {
      return git.diff(name).then((function(_this) {
        return function(diffs) {
          _this.parentView.diffView.clearAll();
          return _this.parentView.diffView.addAll(diffs);
        };
      })(this));
    };

    FileView.prototype.selectFile = function(name) {
      if (name) {
        this.files[name].selected = !!!this.files[name].selected;
      }
      this.allCheckbox.prop('checked', false);
      this.showSelected();
    };

    FileView.prototype.selectAll = function() {
      var file, name, val, _ref1;
      if (this.hidden) {
        return;
      }
      val = !!!this.allCheckbox.prop('checked');
      this.allCheckbox.prop('checked', val);
      _ref1 = this.files;
      for (name in _ref1) {
        file = _ref1[name];
        file.selected = val;
      }
      this.showSelected();
    };

    FileView.prototype.unselectAll = function() {
      var file, name, _i, _len, _ref1;
      _ref1 = this.files;
      for (file = _i = 0, _len = _ref1.length; _i < _len; file = ++_i) {
        name = _ref1[file];
        if (file.selected) {
          file.selected = false;
        }
      }
    };

    FileView.prototype.setWorkspaceTitle = function(title) {
      this.workspaceTitle.text(title);
    };

    return FileView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LWNvbnRyb2wvbGliL3ZpZXdzL2ZpbGUtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsc0NBQUE7SUFBQTs7eUpBQUE7O0FBQUEsRUFBQSxPQUFZLE9BQUEsQ0FBUSxzQkFBUixDQUFaLEVBQUMsWUFBQSxJQUFELEVBQU8sU0FBQSxDQUFQLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FETixDQUFBOztBQUFBLEVBR007QUFDSiwrQkFBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxRQUFDLENBQUEsT0FBRCxHQUFVLFNBQUMsSUFBRCxHQUFBO0FBQ1IsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLE1BQVosRUFBb0IsSUFBcEIsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFRLE9BQUEsR0FBTyxJQUFJLENBQUMsSUFBcEI7QUFBQSxRQUE0QixXQUFBLEVBQWEsSUFBSSxDQUFDLElBQTlDO09BQUwsRUFBeUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN2RCxVQUFBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxZQUFBLE9BQUEsRUFBTyxnQkFBUDtBQUFBLFlBQXlCLEtBQUEsRUFBTyxRQUFoQztBQUFBLFlBQTBDLEtBQUEsRUFBTyxJQUFJLENBQUMsSUFBdEQ7V0FBTixFQUFrRSxJQUFJLENBQUMsSUFBdkUsQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsQ0FBRCxDQUFHO0FBQUEsWUFBQSxPQUFBLEVBQU8sc0JBQVA7QUFBQSxZQUErQixLQUFBLEVBQU8sUUFBdEM7V0FBSCxDQURBLENBQUE7aUJBRUEsS0FBQyxDQUFBLENBQUQsQ0FBRztB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

//# sourceURL=/home/jakob/.atom/packages/git-control/lib/views/file-view.coffee
