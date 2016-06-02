Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = makeTreeViewGitBranchList;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('object-assign-shim');

require('array.from');

var _atom = require('atom');

var _treeViewGitBranchJs = require('./tree-view-git-branch.js');

var _treeViewGitBranchJs2 = _interopRequireDefault(_treeViewGitBranchJs);

var _utilsJs = require('./utils.js');

'use babel';

document.registerElement('tree-view-git-branch-list', {
  'extends': 'li',
  prototype: Object.assign(Object.create(HTMLElement.prototype), {
    createdCallback: function createdCallback() {
      var _this = this;

      this.classList.add('list-nested-item', 'entry', 'directory');

      this.header = this.appendChild(document.createElement('div'));
      this.header.classList.add('header', 'list-item');

      this.label = this.header.appendChild(document.createElement('span'));
      this.label.classList.add('name', 'icon');

      this.entriesByReference = {};
      this.entries = this.appendChild(document.createElement('ol'));
      this.entries.classList.add('list-tree', 'entries');
      this.collapse();

      this.disposables = new _atom.CompositeDisposable((0, _utilsJs.addEventListener)(this.header, 'click', function () {
        return _this.toggleExpansion();
      }));
    },

    initialize: function initialize(_ref) {
      var icon = _ref.icon;
      var title = _ref.title;
      var repository = _ref.repository;
      var entries = _ref.entries;

      this.repository = repository;
      this.setIcon(icon);
      this.setTitle(title);
      this.setEntries(entries);
    },

    destroy: function destroy() {
      this.remove();
      this.disposables.dispose();
      var _ref2 = [];
      this.disposables = _ref2[0];
      this.repository = _ref2[1];
    },

    setIcon: function setIcon(icon) {
      if (!icon) {
        return;
      }
      this.label.className.replace(/\bicon-[^\s]+/, '');
      this.label.classList.add('icon-' + icon);
    },

    setTitle: function setTitle(title) {
      this.title = title;
      this.label.innerHTML = title;
    },

    setEntries: function setEntries() {
      var references = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      for (var child of Array.from(this.entries.children)) {
        child.destroy();
      }

      this.entries.innerHTML = '';
      for (var ref of references) {
        this.entries.appendChild((0, _treeViewGitBranchJs2['default'])({
          repository: this.repository,
          ref: ref
        }));
      }
    },

    expand: function expand() {
      if (!this.collapsed) {
        return;
      }
      this.collapsed = false;
      this.classList.add('expanded');
      this.classList.remove('collapsed');

      this.entries.style.display = '';
    },

    collapse: function collapse() {
      if (this.collapsed) {
        return;
      }
      this.collapsed = true;
      this.classList.remove('expanded');
      this.classList.add('collapsed');

      this.entries.style.display = 'none';
    },

    toggleExpansion: function toggleExpansion() {
      if (this.collapsed) {
        this.expand();
      } else {
        this.collapse();
      }
    },

    getPath: function getPath() {
      return this.repository.getPath().replace('/.git', '') + ':git-branches';
    },

    isPathEqual: function isPathEqual(path) {
      return path == this.getPath();
    }
  })
});

function makeTreeViewGitBranchList() {
  var obj = document.createElement('li', 'tree-view-git-branch-list');

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length) {
    obj.initialize.apply(obj, args);
  }
  return obj;
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL3RyZWUtdmlldy1naXQtYnJhbmNoL2xpYi90cmVlLXZpZXctZ2l0LWJyYW5jaC1saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkErR3dCLHlCQUF5Qjs7OztRQTlHMUMsb0JBQW9COztRQUNwQixZQUFZOztvQkFDZSxNQUFNOzttQ0FDTiwyQkFBMkI7Ozs7dUJBQzlCLFlBQVk7O0FBTDNDLFdBQVcsQ0FBQzs7QUFPWixRQUFRLENBQUMsZUFBZSxDQUFDLDJCQUEyQixFQUFFO0FBQ3BELGFBQVMsSUFBSTtBQUNiLFdBQVMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQzdELG1CQUFlLEVBQUEsMkJBQUc7OztBQUNoQixVQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7O0FBRTdELFVBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDOUQsVUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQzs7QUFFakQsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDckUsVUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFekMsVUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUM3QixVQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJ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VUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbEMsVUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRWhDLFVBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7S0FDckM7O0FBRUQsbUJBQWUsRUFBQSwyQkFBRztBQUNoQixVQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDbEIsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO09BQ2YsTUFBTTtBQUNMLFlBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztPQUNqQjtLQUNGOztBQUVELFdBQU8sRUFBQSxtQkFBRztBQUNSLGFBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxtQkFBZ0I7S0FDekU7O0FBRUQsZUFBVyxFQUFBLHFCQUFDLElBQUksRUFBRTtBQUNoQixhQUFPLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDL0I7R0FDRixDQUFDO0NBQ0gsQ0FBQyxDQUFDOztBQUVZLFNBQVMseUJBQXlCLEdBQVU7QUFDekQsTUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsMkJBQTJCLENBQUMsQ0FBQzs7b0NBRGpCLElBQUk7QUFBSixRQUFJOzs7QUFFdkQsTUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2YsT0FBRyxDQUFDLFVBQVUsTUFBQSxDQUFkLEdBQUcsRUFBZSxJQUFJLENBQUMsQ0FBQztHQUN6QjtBQUNELFNBQU8sR0FBRyxDQUFDO0NBQ1oiLCJmaWxlIjoiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvdHJlZS12aWV3LWdpdC1icmFuY2gvbGliL3RyZWUtdmlldy1naXQtYnJhbmNoLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbmltcG9ydCAnb2JqZWN0LWFzc2lnbi1zaGltJztcbmltcG9ydCAnYXJyYXkuZnJvbSc7XG5pbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gJ2F0b20nO1xuaW1wb3J0IG1ha2VUcmVlVmlld0dpdEJyYW5jaCBmcm9tICcuL3RyZWUtdmlldy1naXQtYnJhbmNoLmpzJztcbmltcG9ydCB7YWRkRXZlbnRMaXN0ZW5lcn0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgndHJlZS12aWV3LWdpdC1icmFuY2gtbGlzdCcsIHtcbiAgZXh0ZW5kczogJ2xpJyxcbiAgcHJvdG90eXBlOiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlKSwge1xuICAgIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbGlzdC1uZXN0ZWQtaXRlbScsICdlbnRyeScsICdkaXJlY3RvcnknKTtcblxuICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcicsICdsaXN0LWl0ZW0nKTtcblxuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XG4gICAgICB0aGlzLmxhYmVsLmNsYXNzTGlzdC5hZGQoJ25hbWUnLCAnaWNvbicpO1xuXG4gICAgICB0aGlzLmVudHJpZXNCeVJlZmVyZW5jZSA9IHt9O1xuICAgICAgdGhpcy5lbnRyaWVzID0gdGhpcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbCcpKTtcbiAgICAgIHRoaXMuZW50cmllcy5jbGFzc0xpc3QuYWRkKCdsaXN0LXRyZWUnLCAnZW50cmllcycpO1xuICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoXG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIodGhpcy5oZWFkZXIsICdjbGljaycsICgpID0+XG4gICAgICAgICAgdGhpcy50b2dnbGVFeHBhbnNpb24oKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBpbml0aWFsaXplKHtpY29uLCB0aXRsZSwgcmVwb3NpdG9yeSwgZW50cmllc30pIHtcbiAgICAgIHRoaXMucmVwb3NpdG9yeSA9IHJlcG9zaXRvcnk7XG4gICAgICB0aGlzLnNldEljb24oaWNvbik7XG4gICAgICB0aGlzLnNldFRpdGxlKHRpdGxlKTtcbiAgICAgIHRoaXMuc2V0RW50cmllcyhlbnRyaWVzKTtcbiAgICB9LFxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICAgIFt0aGlzLmRpc3Bvc2FibGVzLCB0aGlzLnJlcG9zaXRvcnldID0gW107XG4gICAgfSxcblxuICAgIHNldEljb24oaWNvbikge1xuICAgICAgaWYgKCFpY29uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMubGFiZWwuY2xhc3NOYW1lLnJlcGxhY2UoL1xcYmljb24tW15cXHNdKy8sICcnKTtcbiAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LmFkZChgaWNvbi0ke2ljb259YCk7XG4gICAgfSxcblxuICAgIHNldFRpdGxlKHRpdGxlKSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLmxhYmVsLmlubmVySFRNTCA9IHRpdGxlO1xuICAgIH0sXG5cbiAgICBzZXRFbnRyaWVzKHJlZmVyZW5jZXMgPSBbXSkge1xuICAgICAgZm9yIChsZXQgY2hpbGQgb2YgQXJyYXkuZnJvbSh0aGlzLmVudHJpZXMuY2hpbGRyZW4pKSB7XG4gICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbnRyaWVzLmlubmVySFRNTCA9ICcnO1xuICAgICAgZm9yIChsZXQgcmVmIG9mIHJlZmVyZW5jZXMpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzLmFwcGVuZENoaWxkKG1ha2VUcmVlVmlld0dpdEJyYW5jaCh7XG4gICAgICAgICAgcmVwb3NpdG9yeTogdGhpcy5yZXBvc2l0b3J5LFxuICAgICAgICAgIHJlZixcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBleHBhbmQoKSB7XG4gICAgICBpZiAoIXRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2V4cGFuZGVkJyk7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNlZCcpO1xuXG4gICAgICB0aGlzLmVudHJpZXMuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH0sXG5cbiAgICBjb2xsYXBzZSgpIHtcbiAgICAgIGlmICh0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZGVkJyk7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNlZCcpO1xuXG4gICAgICB0aGlzLmVudHJpZXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9LFxuXG4gICAgdG9nZ2xlRXhwYW5zaW9uKCkge1xuICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGdldFBhdGgoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5yZXBvc2l0b3J5LmdldFBhdGgoKS5yZXBsYWNlKCcvLmdpdCcsICcnKX06Z2l0LWJyYW5jaGVzYDtcbiAgICB9LFxuXG4gICAgaXNQYXRoRXF1YWwocGF0aCkge1xuICAgICAgcmV0dXJuIHBhdGggPT0gdGhpcy5nZXRQYXRoKCk7XG4gICAgfSxcbiAgfSksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZVRyZWVWaWV3R2l0QnJhbmNoTGlzdCguLi5hcmdzKSB7XG4gIHZhciBvYmogPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScsICd0cmVlLXZpZXctZ2l0LWJyYW5jaC1saXN0Jyk7XG4gIGlmIChhcmdzLmxlbmd0aCkge1xuICAgIG9iai5pbml0aWFsaXplKC4uLmFyZ3MpO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG4iXX0=
//# sourceURL=/home/jakob/.atom/packages/tree-view-git-branch/lib/tree-view-git-branch-list.js
