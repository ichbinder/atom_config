Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = makeTreeViewGitRepository;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _atom = require('atom');

var _treeViewGitBranchListJs = require('./tree-view-git-branch-list.js');

var _treeViewGitBranchListJs2 = _interopRequireDefault(_treeViewGitBranchListJs);

var _utilsJs = require('./utils.js');

'use babel';

var repositoryProto = {
  initialize: function initialize(repository, treeViewEl) {
    this.repository = repository;
    this.projectRoot = this.getProjectRoot(treeViewEl);
    this.branches = (0, _treeViewGitBranchListJs2['default'])({
      repository: repository,
      icon: 'git-branch',
      title: 'branches [' + (0, _path.basename)((0, _path.dirname)(repository.getPath())) + ']'
    });

    this.update(treeViewEl);
  },

  destroy: function destroy() {
    this.branches.destroy();
    if (this.disposables) {
      this.disposables.dispose();
    }
    var _ref = [];
    this.branches = _ref[0];
    this.disposables = _ref[1];
    this.repository = _ref[2];
    this.projectRoot = _ref[3];
  },

  update: function update(treeViewEl) {
    var _this = this;

    switch (atom.config.get('tree-view-git-branch.location')) {
      case 'top':
        this.insertBefore(this.getFirstProjectRoot(treeViewEl));
        if (this.disposables) {
          this.disposables.dispose();
          this.disposables = null;
        }
        break;
      case 'before':
        this.insertBefore(this.projectRoot);
        if (this.disposables) {
          this.disposables.dispose();
          this.disposables = null;
        }
        break;
      case 'inside':
        this.insertBefore(this.getFirstDirectoryEl());

        if (!this.disposables) {
          this.disposables = new _atom.CompositeDisposable((0, _utilsJs.addEventListener)(this.projectRoot, 'click', function (event) {
            if (event.target.closest('li') != _this.projectRoot) {
              return;
            }

            process.nextTick(function () {
              if (!_this.projectRoot.classList.contains('collapsed')) {
                _this.insertBefore(_this.getFirstDirectoryEl());
              }
            });
          }), atom.commands.add(treeViewEl, {
            'tree-view:expand-item': function treeViewExpandItem() {
              _this.insertBefore(_this.getFirstDirectoryEl());
            },
            'tree-view:expand-recursive-directory': function treeViewExpandRecursiveDirectory() {
              _this.insertBefore(_this.getFirstDirectoryEl());
            }
          }));
        }
        break;
    }

    this.branches.setEntries(this.repository.getReferences().heads);
  },

  getProjectRoot: function getProjectRoot(treeViewEl) {
    var projectPath = (0, _path.dirname)(this.repository.getPath());
    return treeViewEl.querySelector('[data-path^="' + projectPath.replace(/\\/g, '\\\\') + '"]').closest('.project-root');
  },

  getFirstProjectRoot: function getFirstProjectRoot(treeViewEl) {
    return treeViewEl.querySelector('.project-root');
  },

  getFirstDirectoryEl: function getFirstDirectoryEl() {
    return this.projectRoot.querySelector('[is="tree-view-directory"]');
  },

  setSeparator: function setSeparator(show) {
    var addOrRemove = show && atom.config.get('tree-view-git-branch.separator') ? 'add' : 'remove';
    switch (atom.config.get('tree-view-git-branch.location')) {
      case 'top':
        this.branches.classList.remove('separator');
        this.projectRoot.classList.remove('separator');
        break;
      case 'before':
        this.branches.classList[addOrRemove]('separator');
        this.projectRoot.classList.remove('separator');
        break;
      case 'inside':
        this.projectRoot.classList[addOrRemove]('separator');
        this.branches.classList.remove('separator');
        break;
    }
  },

  insertBefore: function insertBefore(el) {
    el.parentNode.insertBefore(this.branches, el);
  }
};

function makeTreeViewGitRepository() {
  var obj = Object.create(repositoryProto);
  obj.initialize.apply(obj, arguments);
  return obj;
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL3RyZWUtdmlldy1naXQtYnJhbmNoL2xpYi90cmVlLXZpZXctZ2l0LXJlcG9zaXRvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQW1Id0IseUJBQXlCOzs7O29CQWxIakIsTUFBTTs7b0JBQ0osTUFBTTs7dUNBQ0YsZ0NBQWdDOzs7O3VCQUN2QyxZQUFZOztBQUozQyxXQUFXLENBQUM7O0FBTVosSUFBSSxlQUFlLEdBQUc7QUFDcEIsWUFBVSxFQUFBLG9CQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUU7QUFDakMsUUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDN0IsUUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25ELFFBQUksQ0FBQyxRQUFRLEdBQUcsMENBQTBCO0FBQ3hDLGdCQUFVLEVBQUUsVUFBVTtBQUN0QixVQUFJLEVBQUUsWUFBWTtBQUNsQixXQUFLLGlCQUFlLG9CQUFTLG1CQUFRLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQUc7S0FDL0QsQ0FBQyxDQUFDOztBQUVILFFBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7R0FDekI7O0FBRUQsU0FBTyxFQUFBLG1CQUFHO0FBQ1IsUUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN4QixRQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDcEIsVUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUM1QjtlQUVzQyxFQUFFO0FBRHhDLFFBQUksQ0FBQyxRQUFRO0FBQUUsUUFBSSxDQUFDLFdBQVc7QUFDOUIsUUFBSSxDQUFDLFVBQVU7QUFBRSxRQUFJLENBQUMsV0FBVztHQUNwQzs7QUFFRCxRQUFNLEVBQUEsZ0JBQUMsVUFBVSxFQUFFOzs7QUFDakIsWUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywr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S0FBSztBQUNSLFlBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM1QyxZQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDL0MsY0FBTTtBQUFBLEFBQ1IsV0FBSyxRQUFRO0FBQ1gsWUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEQsWUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQy9DLGNBQU07QUFBQSxBQUNSLFdBQUssUUFBUTtBQUNYLFlBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JELFlBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM1QyxjQUFNO0FBQUEsS0FDUDtHQUNGOztBQUVELGNBQVksRUFBQSxzQkFBQyxFQUFFLEVBQUU7QUFDZixNQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0dBQy9DO0NBQ0YsQ0FBQzs7QUFFYSxTQUFTLHlCQUF5QixHQUFVO0FBQ3pELE1BQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekMsS0FBRyxDQUFDLFVBQVUsTUFBQSxDQUFkLEdBQUcsWUFBb0IsQ0FBQztBQUN4QixTQUFPLEdBQUcsQ0FBQztDQUNaIiwiZmlsZSI6Ii9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL3RyZWUtdmlldy1naXQtYnJhbmNoL2xpYi90cmVlLXZpZXctZ2l0LXJlcG9zaXRvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbmltcG9ydCB7YmFzZW5hbWUsIGRpcm5hbWV9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tICdhdG9tJztcbmltcG9ydCBtYWtlVHJlZVZpZXdHaXRCcmFuY2hMaXN0IGZyb20gJy4vdHJlZS12aWV3LWdpdC1icmFuY2gtbGlzdC5qcyc7XG5pbXBvcnQge2FkZEV2ZW50TGlzdGVuZXJ9IGZyb20gJy4vdXRpbHMuanMnO1xuXG52YXIgcmVwb3NpdG9yeVByb3RvID0ge1xuICBpbml0aWFsaXplKHJlcG9zaXRvcnksIHRyZWVWaWV3RWwpIHtcbiAgICB0aGlzLnJlcG9zaXRvcnkgPSByZXBvc2l0b3J5O1xuICAgIHRoaXMucHJvamVjdFJvb3QgPSB0aGlzLmdldFByb2plY3RSb290KHRyZWVWaWV3RWwpO1xuICAgIHRoaXMuYnJhbmNoZXMgPSBtYWtlVHJlZVZpZXdHaXRCcmFuY2hMaXN0KHtcbiAgICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXG4gICAgICBpY29uOiAnZ2l0LWJyYW5jaCcsXG4gICAgICB0aXRsZTogYGJyYW5jaGVzIFske2Jhc2VuYW1lKGRpcm5hbWUocmVwb3NpdG9yeS5nZXRQYXRoKCkpKX1dYCxcbiAgICB9KTtcblxuICAgIHRoaXMudXBkYXRlKHRyZWVWaWV3RWwpO1xuICB9LFxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5icmFuY2hlcy5kZXN0cm95KCk7XG4gICAgaWYgKHRoaXMuZGlzcG9zYWJsZXMpIHtcbiAgICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBbdGhpcy5icmFuY2hlcywgdGhpcy5kaXNwb3NhYmxlcyxcbiAgICAgIHRoaXMucmVwb3NpdG9yeSwgdGhpcy5wcm9qZWN0Um9vdF0gPSBbXTtcbiAgfSxcblxuICB1cGRhdGUodHJlZVZpZXdFbCkge1xuICAgIHN3aXRjaCAoYXRvbS5jb25maWcuZ2V0KCd0cmVlLXZpZXctZ2l0LWJyYW5jaC5sb2NhdGlvbicpKSB7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIHRoaXMuaW5zZXJ0QmVmb3JlKHRoaXMuZ2V0Rmlyc3RQcm9qZWN0Um9vdCh0cmVlVmlld0VsKSk7XG4gICAgICBpZiAodGhpcy5kaXNwb3NhYmxlcykge1xuICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5kaXNwb3NhYmxlcyA9IG51bGw7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiZWZvcmUnOlxuICAgICAgdGhpcy5pbnNlcnRCZWZvcmUodGhpcy5wcm9qZWN0Um9vdCk7XG4gICAgICBpZiAodGhpcy5kaXNwb3NhYmxlcykge1xuICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5kaXNwb3NhYmxlcyA9IG51bGw7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbnNpZGUnOlxuICAgICAgdGhpcy5pbnNlcnRCZWZvcmUodGhpcy5nZXRGaXJzdERpcmVjdG9yeUVsKCkpO1xuXG4gICAgICBpZiAoIXRoaXMuZGlzcG9zYWJsZXMpIHtcbiAgICAgICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKFxuICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIodGhpcy5wcm9qZWN0Um9vdCwgJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCdsaScpICE9IHRoaXMucHJvamVjdFJvb3QpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCF0aGlzLnByb2plY3RSb290LmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2VkJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydEJlZm9yZSh0aGlzLmdldEZpcnN0RGlyZWN0b3J5RWwoKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgYXRvbS5jb21tYW5kcy5hZGQodHJlZVZpZXdFbCwge1xuICAgICAgICAgICAgJ3RyZWUtdmlldzpleHBhbmQtaXRlbSc6ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbnNlcnRCZWZvcmUodGhpcy5nZXRGaXJzdERpcmVjdG9yeUVsKCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICd0cmVlLXZpZXc6ZXhwYW5kLXJlY3Vyc2l2ZS1kaXJlY3RvcnknOiAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5zZXJ0QmVmb3JlKHRoaXMuZ2V0Rmlyc3REaXJlY3RvcnlFbCgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuYnJhbmNoZXMuc2V0RW50cmllcyh0aGlzLnJlcG9zaXRvcnkuZ2V0UmVmZXJlbmNlcygpLmhlYWRzKTtcbiAgfSxcblxuICBnZXRQcm9qZWN0Um9vdCh0cmVlVmlld0VsKSB7XG4gICAgbGV0IHByb2plY3RQYXRoID0gZGlybmFtZSh0aGlzLnJlcG9zaXRvcnkuZ2V0UGF0aCgpKTtcbiAgICByZXR1cm4gdHJlZVZpZXdFbC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLXBhdGhePVwiJHtwcm9qZWN0UGF0aC5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpfVwiXWBcbiAgICApLmNsb3Nlc3QoJy5wcm9qZWN0LXJvb3QnKTtcbiAgfSxcblxuICBnZXRGaXJzdFByb2plY3RSb290KHRyZWVWaWV3RWwpIHtcbiAgICByZXR1cm4gdHJlZVZpZXdFbC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1yb290Jyk7XG4gIH0sXG5cbiAgZ2V0Rmlyc3REaXJlY3RvcnlFbCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0Um9vdC5xdWVyeVNlbGVjdG9yKCdbaXM9XCJ0cmVlLXZpZXctZGlyZWN0b3J5XCJdJyk7XG4gIH0sXG5cbiAgc2V0U2VwYXJhdG9yKHNob3cpIHtcbiAgICB2YXIgYWRkT3JSZW1vdmUgPSBzaG93ICYmIGF0b20uY29uZmlnLmdldCgndHJlZS12aWV3LWdpdC1icmFuY2guc2VwYXJhdG9yJykgPyAnYWRkJyA6ICdyZW1vdmUnO1xuICAgIHN3aXRjaCAoYXRvbS5jb25maWcuZ2V0KCd0cmVlLXZpZXctZ2l0LWJyYW5jaC5sb2NhdGlvbicpKSB7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIHRoaXMuYnJhbmNoZXMuY2xhc3NMaXN0LnJlbW92ZSgnc2VwYXJhdG9yJyk7XG4gICAgICB0aGlzLnByb2plY3RSb290LmNsYXNzTGlzdC5yZW1vdmUoJ3NlcGFyYXRvcicpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmVmb3JlJzpcbiAgICAgIHRoaXMuYnJhbmNoZXMuY2xhc3NMaXN0W2FkZE9yUmVtb3ZlXSgnc2VwYXJhdG9yJyk7XG4gICAgICB0aGlzLnByb2plY3RSb290LmNsYXNzTGlzdC5yZW1vdmUoJ3NlcGFyYXRvcicpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5zaWRlJzpcbiAgICAgIHRoaXMucHJvamVjdFJvb3QuY2xhc3NMaXN0W2FkZE9yUmVtb3ZlXSgnc2VwYXJhdG9yJyk7XG4gICAgICB0aGlzLmJyYW5jaGVzLmNsYXNzTGlzdC5yZW1vdmUoJ3NlcGFyYXRvcicpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9LFxuXG4gIGluc2VydEJlZm9yZShlbCkge1xuICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuYnJhbmNoZXMsIGVsKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VUcmVlVmlld0dpdFJlcG9zaXRvcnkoLi4uYXJncykge1xuICB2YXIgb2JqID0gT2JqZWN0LmNyZWF0ZShyZXBvc2l0b3J5UHJvdG8pO1xuICBvYmouaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgcmV0dXJuIG9iajtcbn1cbiJdfQ==
//# sourceURL=/home/jakob/.atom/packages/tree-view-git-branch/lib/tree-view-git-repository.js
