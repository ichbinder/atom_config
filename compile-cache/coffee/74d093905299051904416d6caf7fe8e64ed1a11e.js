(function() {
  var $$, GitLogView, InfoPanelView, MainPanelView, ScrollView, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $$ = _ref.$$, ScrollView = _ref.ScrollView, View = _ref.View;

  module.exports = GitLogView = (function(_super) {
    __extends(GitLogView, _super);

    GitLogView.content = function() {
      return this.div({
        "class": 'git-log',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.subview('main_panel', new MainPanelView);
          return _this.subview('info_panel', new InfoPanelView);
        };
      })(this));
    };

    function GitLogView() {
      GitLogView.__super__.constructor.apply(this, arguments);
    }

    return GitLogView;

  })(View);

  MainPanelView = (function(_super) {
    __extends(MainPanelView, _super);

    function MainPanelView() {
      return MainPanelView.__super__.constructor.apply(this, arguments);
    }

    MainPanelView.content = function() {
      return this.div({
        "class": 'main panels',
        cellpadding: 0,
        cellspacing: 0,
        border: 0,
        outlet: 'main_panel'
      }, (function(_this) {
        return function() {
          return _this.table(function() {
            _this.div({
              "class": 'graph',
              outlet: 'graph'
            });
            _this.thead(function() {
              return _this.tr(function() {
                _this.th({
                  "class": 'graph-col'
                }, function() {
                  return _this.p('Graph');
                });
                _this.th({
                  "class": 'comments',
                  outlet: 'comments'
                }, function() {
                  return _this.p('Description');
                });
                _this.th({
                  "class": 'commit',
                  outlet: 'commit'
                }, function() {
                  return _this.p('Commit');
                });
                _this.th({
                  "class": 'date',
                  outlet: 'date'
                }, function() {
                  return _this.p('Date');
                });
                return _this.th({
                  "class": 'author',
                  outlet: 'author'
                }, function() {
                  return _this.p('Author');
                });
              });
            });
            return _this.tbody({
              outlet: 'body'
            });
          });
        };
      })(this));
    };

    MainPanelView.prototype.initialize = function() {
      return MainPanelView.__super__.initialize.apply(this, arguments);
    };

    return MainPanelView;

  })(ScrollView);

  InfoPanelView = (function(_super) {
    __extends(InfoPanelView, _super);

    function InfoPanelView() {
      return InfoPanelView.__super__.constructor.apply(this, arguments);
    }

    InfoPanelView.content = function() {
      return this.div({
        "class": 'info panels'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'info-data',
            outlet: 'info_data'
          });
          _this.div({
            "class": 'info-image',
            outlet: 'info_image'
          });
          return _this.div({
            "class": 'info-file',
            outlet: 'info_file'
          }, function() {
            return _this.table(function() {
              _this.thead(function() {
                return _this.tr(function() {
                  _this.th({
                    "class": 'stat',
                    outlet: 'status'
                  }, function() {
                    return _this.p('Status');
                  });
                  _this.th({
                    "class": 'file',
                    outlet: 'name'
                  }, function() {
                    return _this.p('Filename');
                  });
                  _this.th({
                    "class": 'path',
                    outlet: 'path'
                  }, function() {
                    return _this.p('Path');
                  });
                  _this.th({
                    "class": 'add',
                    outlet: 'addition'
                  }, function() {
                    return _this.p('Addition');
                  });
                  return _this.th({
                    "class": 'del',
                    outlet: 'deletion'
                  }, function() {
                    return _this.p('Deletion');
                  });
                });
              });
              return _this.tbody({
                outlet: 'body'
              });
            });
          });
        };
      })(this));
    };

    InfoPanelView.prototype.add_content = function(head, content) {
      return this.info_data.append($$(function() {
        return this.h2((function(_this) {
          return function() {
            _this.text(head);
            return _this.span(content);
          };
        })(this));
      }));
    };

    return InfoPanelView;

  })(ScrollView);


  /*
  class MainPanelView extends ScrollView
      @content:->
          @div class: 'main panels', =>
                  @subview 'graph', new ColumnView('Graph', 'graph')
                  @div class: 'table', outlet: 'table', =>
                      @subview 'comments', new ColumnView('Description', 'comments', true)
                      @subview 'commit', new ColumnView('Commit', 'commit', true)
                      @subview 'date', new ColumnView('Date', 'date', true)
                      @subview 'author', new ColumnView('Author', 'author')
  
  
  class InfoPanelView extends ScrollView
      @content: ->
          @div class: 'info panels', =>
              @div class: 'info-data', outlet: 'info_data'
              @div class: 'info-image', outlet: 'info_image'
              @div class:'info-file', outlet: 'info_file', =>
                  @subview 'status', new ColumnView('Status', 'status')
                  @subview 'name', new ColumnView('Filename', 'file')
                  @subview 'path', new ColumnView('Path', 'path')
                  @subview 'addition', new ColumnView('Addition', 'add')
                  @subview 'deletion', new ColumnView('Deletion', 'del')
  
      add_content: (head, content) ->
          @info_data.append $$ ->
              @h2 =>
                  @text head
                  @span content
  
  
  class ColumnView extends View
      @content: (title, class_name, resizable) ->
          @div class: 'column ' + class_name, =>
              @div class: 'list-head', =>
                  @h2 title
                  @div class:'resize-handle' if resizable
              @div class: 'list', outlet: 'list'
  
      add_content: (content) ->
          @list.append $$ ->
              @p =>
                  @span content
   */

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LWxvZy9saWIvZ2l0LWxvZy1jbGFzcy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsb0VBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLE9BQXlCLE9BQUEsQ0FBUSxzQkFBUixDQUF6QixFQUFDLFVBQUEsRUFBRCxFQUFLLGtCQUFBLFVBQUwsRUFBaUIsWUFBQSxJQUFqQixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FFTTtBQUNGLGlDQUFBLENBQUE7O0FBQUEsSUFBQSxVQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNOLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxTQUFQO0FBQUEsUUFBa0IsUUFBQSxFQUFVLENBQUEsQ0FBNUI7T0FBTCxFQUFxQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ2pDLFVBQUEsS0FBQyxDQUFBLE9BQUQsQ0FBUyxZQUFULEVBQXVCLEdBQUEsQ0FBQSxhQUF2QixDQUFBLENBQUE7aUJBQ0EsS0FBQyxDQUFBLE9BQUQsQ0FBUyxZQUFULEVBQXVCLEdBQUEsQ0FBQSxhQUF2QixFQUZpQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXJDLEVBRE07SUFBQSxDQUFWLENBQUE7O0FBS2EsSUFBQSxvQkFBQSxHQUFBO0FBQ1QsTUFBQSw2Q0FBQSxTQUFBLENBQUEsQ0FEUztJQUFBLENBTGI7O3NCQUFBOztLQURxQixLQUp6QixDQUFBOztBQUFBLEVBY007QUFDRixvQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxhQUFDLENBQUEsT0FBRCxHQUFTLFNBQUEsR0FBQTthQUNMLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEs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

//# sourceURL=/home/jakob/.atom/packages/git-log/lib/git-log-class.coffee
