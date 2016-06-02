Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = makeTreeViewGitBranch;

require('object-assign-shim');

require('array.from');

var _atom = require('atom');

var _utilsJs = require('./utils.js');

'use babel';

document.registerElement('tree-view-git-branch', {
  'extends': 'li',
  prototype: Object.assign(Object.create(HTMLElement.prototype), {
    createdCallback: function createdCallback() {
      this.classList.add('list-item', 'entry', 'file');

      this.label = this.appendChild(document.createElement('span'));
      this.label.classList.add('name', 'icon');
    },

    initialize: function initialize(_ref) {
      var _this = this;

      var icon = _ref.icon;
      var ref = _ref.ref;
      var repository = _ref.repository;

      this.repository = repository;
      this.setIcon(icon);
      this.setRef(ref);

      this.disposables = new _atom.CompositeDisposable((0, _utilsJs.addEventListener)(this, 'click', function (event) {
        // only checkout branch on double click
        if (event.detail != 2) {
          return;
        }
        _this.checkout();
      }));
    },

    destroy: function destroy() {
      this.disposables.dispose();
      var _ref2 = [];
      this.disposables = _ref2[0];
      this.repository = _ref2[1];
    },

    setIcon: function setIcon(icon) {
      if (!icon) {
        return;
      }
      this.label.className.replace(/\bicon-[^\s]+/, 'icon-' + icon);
    },

    setRef: function setRef(ref) {
      var _ref$match = ref.match(/refs\/heads\/(.+)/);

      var _ref$match2 = _slicedToArray(_ref$match, 2);

      var shortRef = _ref$match2[1];

      this.setAttribute('data-ref', ref);
      this.label.innerHTML = shortRef;

      if (shortRef != this.repository.getShortHead()) {
        this.classList.add('status-ignored');
      }
    },

    checkout: function checkout() {
      var ref = this.getAttribute('data-ref');

      if (this.repository.checkoutReference(ref)) {
        atom.notifications.addSuccess('Checkout ' + ref + '.');

        for (var element of Array.from(this.parentNode.childNodes)) {
          element.classList.add('status-ignored');
        }
        this.classList.remove('status-ignored');
      } else {
        atom.notifications.addError('Checkout of ' + ref + ' failed.');
      }
    },

    getPath: function getPath() {
      var path = this.repository.getPath().replace('/.git', '');
      var ref = this.getAttribute('data-ref');
      return path + ':git-branches/' + ref;
    },

    isPathEqual: function isPathEqual(path) {
      return path == this.getPath();
    }

  })
});

function makeTreeViewGitBranch() {
  var obj = document.createElement('li', 'tree-view-git-branch');
  obj.initialize.apply(obj, arguments);
  return obj;
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL3RyZWUtdmlldy1naXQtYnJhbmNoL2xpYi90cmVlLXZpZXctZ2l0LWJyYW5jaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7cUJBbUZ3QixxQkFBcUI7O1FBbEZ0QyxvQkFBb0I7O1FBQ3BCLFlBQVk7O29CQUNlLE1BQU07O3VCQUNULFlBQVk7O0FBSjNDLFdBQVcsQ0FBQzs7QUFNWixRQUFRLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFO0FBQy9DLGFBQVMsSUFBSTtBQUNiLFdBQVMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQzdELG1CQUFlLEVBQUEsMkJBQUc7QUFDaEIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFakQsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM5RCxVQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzFDOztBQUVELGNBQVUsRUFBQSxvQkFBQyxJQUF1QixFQUFFOzs7VUFBeEIsSUFBSSxHQUFMLElBQXVCLENBQXRCLElBQUk7VUFBRSxHQUFHLEdBQVYsSUFBdUIsQ0FBaEIsR0FBRztVQUFFLFVBQVUsR0FBdEIsSUFBdUIsQ0FBWCxVQUFVOztBQUMvQixVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM3QixVQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25CLFVBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWpCLFVBQUksQ0FBQyxXQUFXLEdBQUcsOEJBQ2pCLCtCQUFpQixJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQUEsS0FBSyxFQUFJOztBQUV2QyxZQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQ3JCLGlCQUFPO1NBQ1I7QUFDRCxjQUFLLFFBQVEsRUFBRSxDQUFDO09BQ2pCLENBQUMsQ0FDSCxDQUFDO0tBQ0g7O0FBRUQsV0FBTyxFQUFBLG1CQUFHO0FBQ1IsVUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztrQkFDVyxFQUFFO0FBQXZDLFVBQUksQ0FBQyxXQUFXO0FBQUUsVUFBSSxDQUFDLFVBQVU7S0FDbkM7O0FBRUQsV0FBTyxFQUFBLGlCQUFDLElBQUksRUFBRTtBQUNaLFVBQUksQ0FBQyxJQUFJLEVBQUU7QUFDVCxlQUFPO09BQ1I7QUFDRCxVQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBZSxZQUFVLElBQUksQ0FBRyxDQUFDO0tBQy9EOztBQUVELFVBQU0sRUFBQSxnQkFBQyxHQUFHLEVBQUU7dUJBQ1MsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQzs7OztVQUExQyxRQUFROztBQUVmLFVBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLFVBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQzs7QUFFaEMsVUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsRUFBRTtBQUM5QyxZQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO09BQ3RDO0tBQ0Y7O0FBRUQsWUFBUSxFQUFBLG9CQUFHO0FBQ1QsVUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFeEMsVUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzFDLFlBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxlQUFhLEdBQUcsT0FBSSxDQUFDOztBQUVsRCxhQUFLLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUMxRCxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN6QztBQUNELFlBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7T0FDekMsTUFBTTtBQUNMLFlBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxrQkFBZ0IsR0FBRyxjQUFXLENBQUM7T0FDM0Q7S0FDRjs7QUFFRCxXQUFPLEVBQUEsbUJBQUc7QUFDUixVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUQsVUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN4QyxhQUFVLElBQUksc0JBQWlCLEdBQUcsQ0FBRztLQUN0Qzs7QUFFRCxlQUFXLEVBQUEscUJBQUMsSUFBSSxFQUFFO0FBQ2hCLGFBQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMvQjs7R0FFRixDQUFDO0NBQ0gsQ0FBQyxDQUFDOztBQUVZLFNBQVMscUJBQXFCLEdBQVU7QUFDckQsTUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUMvRCxLQUFHLENBQUMsVUFBVSxNQUFBLENBQWQsR0FBRyxZQUFvQixDQUFDO0FBQ3hCLFNBQU8sR0FBRyxDQUFDO0NBQ1oiLCJmaWxlIjoiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvdHJlZS12aWV3LWdpdC1icmFuY2gvbGliL3RyZWUtdmlldy1naXQtYnJhbmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5pbXBvcnQgJ29iamVjdC1hc3NpZ24tc2hpbSc7XG5pbXBvcnQgJ2FycmF5LmZyb20nO1xuaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tICdhdG9tJztcbmltcG9ydCB7YWRkRXZlbnRMaXN0ZW5lcn0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgndHJlZS12aWV3LWdpdC1icmFuY2gnLCB7XG4gIGV4dGVuZHM6ICdsaScsXG4gIHByb3RvdHlwZTogT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSksIHtcbiAgICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2xpc3QtaXRlbScsICdlbnRyeScsICdmaWxlJyk7XG5cbiAgICAgIHRoaXMubGFiZWwgPSB0aGlzLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XG4gICAgICB0aGlzLmxhYmVsLmNsYXNzTGlzdC5hZGQoJ25hbWUnLCAnaWNvbicpO1xuICAgIH0sXG5cbiAgICBpbml0aWFsaXplKHtpY29uLCByZWYsIHJlcG9zaXRvcnl9KSB7XG4gICAgICB0aGlzLnJlcG9zaXRvcnkgPSByZXBvc2l0b3J5O1xuICAgICAgdGhpcy5zZXRJY29uKGljb24pO1xuICAgICAgdGhpcy5zZXRSZWYocmVmKTtcblxuICAgICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKFxuICAgICAgICBhZGRFdmVudExpc3RlbmVyKHRoaXMsICdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAvLyBvbmx5IGNoZWNrb3V0IGJyYW5jaCBvbiBkb3VibGUgY2xpY2tcbiAgICAgICAgICBpZiAoZXZlbnQuZGV0YWlsICE9IDIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jaGVja291dCgpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgICAgW3RoaXMuZGlzcG9zYWJsZXMsIHRoaXMucmVwb3NpdG9yeV0gPSBbXTtcbiAgICB9LFxuXG4gICAgc2V0SWNvbihpY29uKSB7XG4gICAgICBpZiAoIWljb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5sYWJlbC5jbGFzc05hbWUucmVwbGFjZSgvXFxiaWNvbi1bXlxcc10rLywgYGljb24tJHtpY29ufWApO1xuICAgIH0sXG5cbiAgICBzZXRSZWYocmVmKSB7XG4gICAgICB2YXIgWywgc2hvcnRSZWZdID0gcmVmLm1hdGNoKC9yZWZzXFwvaGVhZHNcXC8oLispLyk7XG5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdkYXRhLXJlZicsIHJlZik7XG4gICAgICB0aGlzLmxhYmVsLmlubmVySFRNTCA9IHNob3J0UmVmO1xuXG4gICAgICBpZiAoc2hvcnRSZWYgIT0gdGhpcy5yZXBvc2l0b3J5LmdldFNob3J0SGVhZCgpKSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnc3RhdHVzLWlnbm9yZWQnKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tvdXQoKSB7XG4gICAgICB2YXIgcmVmID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVmJyk7XG5cbiAgICAgIGlmICh0aGlzLnJlcG9zaXRvcnkuY2hlY2tvdXRSZWZlcmVuY2UocmVmKSkge1xuICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkU3VjY2VzcyhgQ2hlY2tvdXQgJHtyZWZ9LmApO1xuXG4gICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgQXJyYXkuZnJvbSh0aGlzLnBhcmVudE5vZGUuY2hpbGROb2RlcykpIHtcbiAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3N0YXR1cy1pZ25vcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdzdGF0dXMtaWdub3JlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKGBDaGVja291dCBvZiAke3JlZn0gZmFpbGVkLmApO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRQYXRoKCkge1xuICAgICAgdmFyIHBhdGggPSB0aGlzLnJlcG9zaXRvcnkuZ2V0UGF0aCgpLnJlcGxhY2UoJy8uZ2l0JywgJycpO1xuICAgICAgdmFyIHJlZiA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXJlZicpO1xuICAgICAgcmV0dXJuIGAke3BhdGh9OmdpdC1icmFuY2hlcy8ke3JlZn1gO1xuICAgIH0sXG5cbiAgICBpc1BhdGhFcXVhbChwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aCA9PSB0aGlzLmdldFBhdGgoKTtcbiAgICB9LFxuXG4gIH0pLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VUcmVlVmlld0dpdEJyYW5jaCguLi5hcmdzKSB7XG4gIHZhciBvYmogPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScsICd0cmVlLXZpZXctZ2l0LWJyYW5jaCcpO1xuICBvYmouaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgcmV0dXJuIG9iajtcbn1cbiJdfQ==
//# sourceURL=/home/jakob/.atom/packages/tree-view-git-branch/lib/tree-view-git-branch.js
