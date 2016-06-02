(function() {
  var $$, RepoListView, SelectListView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $$ = _ref.$$, SelectListView = _ref.SelectListView;

  module.exports = RepoListView = (function(_super) {
    __extends(RepoListView, _super);

    function RepoListView() {
      return RepoListView.__super__.constructor.apply(this, arguments);
    }

    RepoListView.prototype.initialize = function(listOfItems) {
      this.listOfItems = listOfItems;
      RepoListView.__super__.initialize.apply(this, arguments);
      this.addClass('modal overlay from-top');
      this.storeFocusedElement();
      this.panel = atom.workspace.addModalPanel({
        item: this,
        visible: true
      });
      this.panel.show();
      this.setItems(this.listOfItems);
      return this.focusFilterEditor();
    };

    RepoListView.prototype.getFilterKey = function() {
      return 'repo_name';
    };

    RepoListView.prototype.viewForItem = function(item) {
      return $$(function() {
        return this.li(item.repo_name);
      });
    };

    RepoListView.prototype.cancelled = function() {
      this.panel.hide();
      return this.panel.destroy();
    };

    RepoListView.prototype.confirmed = function(item) {
      var old_pane, options, uri;
      this.cancel();
      options = {
        'repo': item
      };
      uri = "git-log://" + item.repo_name;
      old_pane = atom.workspace.paneForURI(uri);
      if (old_pane) {
        old_pane.destroyItem(old_pane.itemForURI(uri));
      }
      return atom.workspace.open(uri, options);
    };

    return RepoListView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LWxvZy9saWIvZ2l0LXJlcG8tbGlzdC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsc0NBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLE9BQXVCLE9BQUEsQ0FBUSxzQkFBUixDQUF2QixFQUFDLFVBQUEsRUFBRCxFQUFLLHNCQUFBLGNBQUwsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBRU07QUFDRixtQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsMkJBQUEsVUFBQSxHQUFZLFNBQUUsV0FBRixHQUFBO0FBQ1IsTUFEUyxJQUFDLENBQUEsY0FBQSxXQUNWLENBQUE7QUFBQSxNQUFBLDhDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLHdCQUFWLENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLG1CQUFELENBQUEsQ0FGQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBZixDQUE2QjtBQUFBLFFBQUEsSUFBQSxFQUFNLElBQU47QUFBQSxRQUFZLE9BQUEsRUFBUyxJQUFyQjtPQUE3QixDQUhULENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFBLENBSkEsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsV0FBWCxDQUxBLENBQUE7YUFNQSxJQUFDLENBQUEsaUJBQUQsQ0FBQSxFQVBRO0lBQUEsQ0FBWixDQUFBOztBQUFBLDJCQVNBLFlBQUEsR0FBYyxTQUFBLEdBQUE7YUFDVixZQURVO0lBQUEsQ0FUZCxDQUFBOztBQUFBLDJCQVlBLFdBQUEsR0FBYSxTQUFDLElBQUQsR0FBQTthQUNULEVBQUEsQ0FBRyxTQUFBLEdBQUE7ZUFBRyxJQUFDLENBQUEsRUFBRCxDQUFJLElBQUksQ0FBQyxTQUFULEVBQUg7TUFBQSxDQUFILEVBRFM7SUFBQSxDQVpiLENBQUE7O0FBQUEsMkJBZUEsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNQLE1BQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQUEsRUFGTztJQUFBLENBZlgsQ0FBQTs7QUFBQSwyQkFtQkEsU0FBQSxHQUFXLFNBQUMsSUFBRCxHQUFBO0FBQ1AsVUFBQSxzQkFBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLE9BQUEsR0FBUztBQUFBLFFBQ0wsTUFBQSxFQUFRLElBREg7T0FEVCxDQUFBO0FBQUEsTUFJQSxHQUFBLEdBQU0sWUFBQSxHQUFlLElBQUksQ0FBQyxTQUoxQixDQUFBO0FBQUEsTUFLQSxRQUFBLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFmLENBQTBCLEdBQTFCLENBTFgsQ0FBQTtBQU1BLE1BQUEsSUFBa0QsUUFBbEQ7QUFBQSxRQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLFFBQVEsQ0FBQyxVQUFULENBQW9CLEdBQXBCLENBQXJCLENBQUEsQ0FBQTtPQU5BO2FBT0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLEdBQXBCLEVBQXlCLE9BQXpCLEVBUk87SUFBQSxDQW5CWCxDQUFBOzt3QkFBQTs7S0FEdUIsZUFMM0IsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/jakob/.atom/packages/git-log/lib/git-repo-list.coffee
