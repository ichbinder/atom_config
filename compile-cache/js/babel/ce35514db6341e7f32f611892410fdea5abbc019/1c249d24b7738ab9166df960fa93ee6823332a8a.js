Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.activate = activate;
exports.deactivate = deactivate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _atom = require('atom');

var _treeViewGitRepositoryJs = require('./tree-view-git-repository.js');

var _treeViewGitRepositoryJs2 = _interopRequireDefault(_treeViewGitRepositoryJs);

/* eslint-disable vars-on-top */
'use babel';
var config = {
  location: {
    description: 'Location of the items in the tree view.<br>Top: all at the top of the tree view.<br>Before: before the corresponding project directory.<br>Inside: as the first item in the corresponding project directory, this is the default.',
    type: 'string',
    'default': 'inside',
    'enum': ['top', 'before', 'inside']
  },
  separator: {
    description: 'Draw a separator between a project and the next branch list. Does nothing when the "location" setting is "top".',
    type: 'boolean',
    'default': false
  }
};

exports.config = config;
var disposables;

// maps repositories to their respective view
var treeViewGitRepositories = new Map();
/* eslint-enable vars-on-top */

// remove old repositories
function removeOldRepositories(currentRepositories) {
  for (var repository of treeViewGitRepositories.keys()) {
    if (currentRepositories.indexOf(repository) == -1) {
      treeViewGitRepositories.get(repository).destroy();
      treeViewGitRepositories['delete'](repository);
    }
  }
}

// update tracked repositories and add new ones
function updateRepositories(currentRepositories, treeViewEl) {
  currentRepositories.forEach(function (repository, i) {
    var treeViewGitRepository = undefined;

    // skip if project root isn't a git repository
    if (!repository) {
      return;
    }

    try {
      treeViewGitRepository = treeViewGitRepositories.get(repository);
      treeViewGitRepository.update(treeViewEl);
    } catch (e) {
      treeViewGitRepository = (0, _treeViewGitRepositoryJs2['default'])(repository, treeViewEl);
      treeViewGitRepositories.set(repository, treeViewGitRepository);
    }

    treeViewGitRepository.setSeparator(i);
  });
}

function update(treeViewEl) {
  Promise.all(atom.project.getDirectories().map(atom.project.repositoryForDirectory.bind(atom.project))).then(function (repositories) {
    removeOldRepositories(repositories);
    updateRepositories(repositories, treeViewEl);
  });
}

function activate() {
  // resolves with the tree view package
  // object if and when it is loaded, or
  // with false if it isn't
  Promise.resolve(atom.packages.isPackageLoaded('tree-view') && atom.packages.activatePackage('tree-view')).then(function (treeViewPkg) {
    var treeViewEl = atom.views.getView(treeViewPkg.mainModule.createView());

    // do nothing if the tree view packages isn't loaded
    if (!treeViewPkg) {
      atom.notifications.addError('tree-view package not loaded', {
        detail: 'tree-view-git-branch requires the tree view package to be loaded'
      });
      return;
    }

    disposables = new _atom.CompositeDisposable(atom.project.onDidChangePaths(function () {
      return update(treeViewEl);
    }), atom.commands.add('atom-workspace', 'tree-view-git-branch:reload', function () {
      return update(treeViewEl);
    }), atom.config.onDidChange('tree-view-git-branch.location', function () {
      return update(treeViewEl);
    }), atom.config.onDidChange('tree-view-git-branch.separator', function () {
      return update(treeViewEl);
    }));

    update(treeViewEl);
  })['catch'](function (error) {
    return console.error(error.message, error.stack);
  });
}

function deactivate() {
  disposables.dispose();
  disposables = null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL3RyZWUtdmlldy1naXQtYnJhbmNoL2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUNrQyxNQUFNOzt1Q0FDRiwrQkFBK0I7Ozs7O0FBRnJFLFdBQVcsQ0FBQztBQUtMLElBQUksTUFBTSxHQUFHO0FBQ2xCLFVBQVEsRUFBRTtBQUNSLGVBQVcsRUFBRSxtT0FBbU87QUFDaFAsUUFBSSxFQUFFLFFBQVE7QUFDZCxlQUFTLFFBQVE7QUFDakIsWUFBTSxDQUNKLEtBQUssRUFDTCxRQUFRLEVBQ1IsUUFBUSxDQUNUO0dBQ0Y7QUFDRCxXQUFTLEVBQUU7QUFDVCxlQUFXLEVBQUUsaUhBQWlIO0FBQzlILFFBQUksRUFBRSxTQUFTO0FBQ2YsZUFBUyxLQUFLO0dBQ2Y7Q0FDRixDQUFDOzs7QUFFRixJQUFJLFdBQVcsQ0FBQzs7O0FBR2hCLElBQUksdUJBQXVCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7OztBQUl4QyxTQUFTLHFCQUFxQixDQUFDLG1CQUFtQixFQUFFO0FBQ2xELE9BQUssSUFBSSxVQUFVLElBQUksdUJBQXVCLENBQUMsSUFBSSxFQUFFLEVBQUU7QUFDckQsUUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDakQsNkJBQXVCLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xELDZCQUF1QixVQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUM7R0FDRjtDQUNGOzs7QUFHRCxTQUFTLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFLFVBQVUsRUFBRTtBQUMzRCxxQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFLO0FBQzdDLFFBQUkscUJBQXFCLFlBQUEsQ0FBQzs7O0FBRzFCLFFBQUksQ0FBQyxVQUFVLEVBQUU7QUFDZixhQUFPO0tBQ1I7O0FBRUQsUUFBSTtBQUNGLDJCQUFxQixHQUFHLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNoRSwyQkFBcUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDMUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNWLDJCQUFxQixHQUFHLDBDQUEwQixVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDMUUsNkJBQXVCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0tBQ2hFOztBQUVELHlCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUN2QyxDQUFDLENBQUM7Q0FDSjs7QUFFRCxTQUFTLE1BQU0sQ0FBQyxVQUFVLEVBQUU7QUFDMUIsU0FBTyxDQUFDLEdBQUcsQ0FDVCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLEdBQUcsQ0FDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUN2RCxDQUNGLENBQUMsSUFBSSxDQUFDLFVBQUEsWUFBWSxFQUFJO0FBQ3JCLHlCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BDLHNCQUFrQixDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztHQUM5QyxDQUFDLENBQUM7Q0FDSjs7QUFFTSxTQUFTLFFBQVEsR0FBRzs7OztBQUl6QixTQUFPLENBQUMsT0FBTyxDQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FDM0MsQ0FBQyxJQUFJLENBQUMsVUFBQSxXQUFXLEVBQUk7QUFDcEIsUUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDOzs7QUFHekUsUUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNoQixVQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRTtBQUMxRCxjQUFNLEVBQUUsa0VBQWtFO09BQzNFLENBQUMsQ0FBQztBQUNILGFBQU87S0FDUjs7QUFFRCxlQUFXLEdBQUcsOEJBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQzthQUM1QixNQUFNLENBQUMsVUFBVSxDQUFDO0tBQUEsQ0FDbkIsRUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSw2QkFBNkIsRUFBRTthQUNqRSxNQUFNLENBQUMsVUFBVSxDQUFDO0tBQUEsQ0FDbkIsRUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRTthQUN2RCxNQUFNLENBQUMsVUFBVSxDQUFDO0tBQUEsQ0FDbkIsRUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQ0FBZ0MsRUFBRTthQUN4RCxNQUFNLENBQUMsVUFBVSxDQUFDO0tBQUEsQ0FDbkIsQ0FDRixDQUFDOztBQUVGLFVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztHQUNwQixDQUFDLFNBQU0sQ0FBQyxVQUFBLEtBQUs7V0FDWixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQztHQUFBLENBQzFDLENBQUM7Q0FDSDs7QUFFTSxTQUFTLFVBQVUsR0FBRztBQUMzQixhQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdEIsYUFBVyxHQUFHLElBQUksQ0FBQztDQUNwQiIsImZpbGUiOiIvaG9tZS9qYWtvYi8uYXRvbS9wYWNrYWdlcy90cmVlLXZpZXctZ2l0LWJyYW5jaC9saWIvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tICdhdG9tJztcbmltcG9ydCBtYWtlVHJlZVZpZXdHaXRSZXBvc2l0b3J5IGZyb20gJy4vdHJlZS12aWV3LWdpdC1yZXBvc2l0b3J5LmpzJztcblxuLyogZXNsaW50LWRpc2FibGUgdmFycy1vbi10b3AgKi9cbmV4cG9ydCB2YXIgY29uZmlnID0ge1xuICBsb2NhdGlvbjoge1xuICAgIGRlc2NyaXB0aW9uOiAnTG9jYXRpb24gb2YgdGhlIGl0ZW1zIGluIHRoZSB0cmVlIHZpZXcuPGJyPlRvcDogYWxsIGF0IHRoZSB0b3Agb2YgdGhlIHRyZWUgdmlldy48YnI+QmVmb3JlOiBiZWZvcmUgdGhlIGNvcnJlc3BvbmRpbmcgcHJvamVjdCBkaXJlY3RvcnkuPGJyPkluc2lkZTogYXMgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIGNvcnJlc3BvbmRpbmcgcHJvamVjdCBkaXJlY3RvcnksIHRoaXMgaXMgdGhlIGRlZmF1bHQuJyxcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnaW5zaWRlJyxcbiAgICBlbnVtOiBbXG4gICAgICAndG9wJyxcbiAgICAgICdiZWZvcmUnLFxuICAgICAgJ2luc2lkZScsXG4gICAgXSxcbiAgfSxcbiAgc2VwYXJhdG9yOiB7XG4gICAgZGVzY3JpcHRpb246ICdEcmF3IGEgc2VwYXJhdG9yIGJldHdlZW4gYSBwcm9qZWN0IGFuZCB0aGUgbmV4dCBicmFuY2ggbGlzdC4gRG9lcyBub3RoaW5nIHdoZW4gdGhlIFwibG9jYXRpb25cIiBzZXR0aW5nIGlzIFwidG9wXCIuJyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gIH0sXG59O1xuXG52YXIgZGlzcG9zYWJsZXM7XG5cbi8vIG1hcHMgcmVwb3NpdG9yaWVzIHRvIHRoZWlyIHJlc3BlY3RpdmUgdmlld1xudmFyIHRyZWVWaWV3R2l0UmVwb3NpdG9yaWVzID0gbmV3IE1hcCgpO1xuLyogZXNsaW50LWVuYWJsZSB2YXJzLW9uLXRvcCAqL1xuXG4vLyByZW1vdmUgb2xkIHJlcG9zaXRvcmllc1xuZnVuY3Rpb24gcmVtb3ZlT2xkUmVwb3NpdG9yaWVzKGN1cnJlbnRSZXBvc2l0b3JpZXMpIHtcbiAgZm9yIChsZXQgcmVwb3NpdG9yeSBvZiB0cmVlVmlld0dpdFJlcG9zaXRvcmllcy5rZXlzKCkpIHtcbiAgICBpZiAoY3VycmVudFJlcG9zaXRvcmllcy5pbmRleE9mKHJlcG9zaXRvcnkpID09IC0xKSB7XG4gICAgICB0cmVlVmlld0dpdFJlcG9zaXRvcmllcy5nZXQocmVwb3NpdG9yeSkuZGVzdHJveSgpO1xuICAgICAgdHJlZVZpZXdHaXRSZXBvc2l0b3JpZXMuZGVsZXRlKHJlcG9zaXRvcnkpO1xuICAgIH1cbiAgfVxufVxuXG4vLyB1cGRhdGUgdHJhY2tlZCByZXBvc2l0b3JpZXMgYW5kIGFkZCBuZXcgb25lc1xuZnVuY3Rpb24gdXBkYXRlUmVwb3NpdG9yaWVzKGN1cnJlbnRSZXBvc2l0b3JpZXMsIHRyZWVWaWV3RWwpIHtcbiAgY3VycmVudFJlcG9zaXRvcmllcy5mb3JFYWNoKChyZXBvc2l0b3J5LCBpKSA9PiB7XG4gICAgbGV0IHRyZWVWaWV3R2l0UmVwb3NpdG9yeTtcblxuICAgIC8vIHNraXAgaWYgcHJvamVjdCByb290IGlzbid0IGEgZ2l0IHJlcG9zaXRvcnlcbiAgICBpZiAoIXJlcG9zaXRvcnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdHJlZVZpZXdHaXRSZXBvc2l0b3J5ID0gdHJlZVZpZXdHaXRSZXBvc2l0b3JpZXMuZ2V0KHJlcG9zaXRvcnkpO1xuICAgICAgdHJlZVZpZXdHaXRSZXBvc2l0b3J5LnVwZGF0ZSh0cmVlVmlld0VsKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0cmVlVmlld0dpdFJlcG9zaXRvcnkgPSBtYWtlVHJlZVZpZXdHaXRSZXBvc2l0b3J5KHJlcG9zaXRvcnksIHRyZWVWaWV3RWwpO1xuICAgICAgdHJlZVZpZXdHaXRSZXBvc2l0b3JpZXMuc2V0KHJlcG9zaXRvcnksIHRyZWVWaWV3R2l0UmVwb3NpdG9yeSk7XG4gICAgfVxuXG4gICAgdHJlZVZpZXdHaXRSZXBvc2l0b3J5LnNldFNlcGFyYXRvcihpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSh0cmVlVmlld0VsKSB7XG4gIFByb21pc2UuYWxsKFxuICAgIGF0b20ucHJvamVjdC5nZXREaXJlY3RvcmllcygpLm1hcChcbiAgICAgIGF0b20ucHJvamVjdC5yZXBvc2l0b3J5Rm9yRGlyZWN0b3J5LmJpbmQoYXRvbS5wcm9qZWN0KVxuICAgIClcbiAgKS50aGVuKHJlcG9zaXRvcmllcyA9PiB7XG4gICAgcmVtb3ZlT2xkUmVwb3NpdG9yaWVzKHJlcG9zaXRvcmllcyk7XG4gICAgdXBkYXRlUmVwb3NpdG9yaWVzKHJlcG9zaXRvcmllcywgdHJlZVZpZXdFbCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gIC8vIHJlc29sdmVzIHdpdGggdGhlIHRyZWUgdmlldyBwYWNrYWdlXG4gIC8vIG9iamVjdCBpZiBhbmQgd2hlbiBpdCBpcyBsb2FkZWQsIG9yXG4gIC8vIHdpdGggZmFsc2UgaWYgaXQgaXNuJ3RcbiAgUHJvbWlzZS5yZXNvbHZlKFxuICAgIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlTG9hZGVkKCd0cmVlLXZpZXcnKSAmJlxuICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCd0cmVlLXZpZXcnKVxuICApLnRoZW4odHJlZVZpZXdQa2cgPT4ge1xuICAgIHZhciB0cmVlVmlld0VsID0gYXRvbS52aWV3cy5nZXRWaWV3KHRyZWVWaWV3UGtnLm1haW5Nb2R1bGUuY3JlYXRlVmlldygpKTtcblxuICAgIC8vIGRvIG5vdGhpbmcgaWYgdGhlIHRyZWUgdmlldyBwYWNrYWdlcyBpc24ndCBsb2FkZWRcbiAgICBpZiAoIXRyZWVWaWV3UGtnKSB7XG4gICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoJ3RyZWUtdmlldyBwYWNrYWdlIG5vdCBsb2FkZWQnLCB7XG4gICAgICAgIGRldGFpbDogJ3RyZWUtdmlldy1naXQtYnJhbmNoIHJlcXVpcmVzIHRoZSB0cmVlIHZpZXcgcGFja2FnZSB0byBiZSBsb2FkZWQnLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZShcbiAgICAgIGF0b20ucHJvamVjdC5vbkRpZENoYW5nZVBhdGhzKCgpID0+XG4gICAgICAgIHVwZGF0ZSh0cmVlVmlld0VsKVxuICAgICAgKSxcblxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywgJ3RyZWUtdmlldy1naXQtYnJhbmNoOnJlbG9hZCcsICgpID0+XG4gICAgICAgIHVwZGF0ZSh0cmVlVmlld0VsKVxuICAgICAgKSxcblxuICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ3RyZWUtdmlldy1naXQtYnJhbmNoLmxvY2F0aW9uJywgKCkgPT5cbiAgICAgICAgdXBkYXRlKHRyZWVWaWV3RWwpXG4gICAgICApLFxuXG4gICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgndHJlZS12aWV3LWdpdC1icmFuY2guc2VwYXJhdG9yJywgKCkgPT5cbiAgICAgICAgdXBkYXRlKHRyZWVWaWV3RWwpXG4gICAgICApXG4gICAgKTtcblxuICAgIHVwZGF0ZSh0cmVlVmlld0VsKTtcbiAgfSkuY2F0Y2goZXJyb3IgPT5cbiAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UsIGVycm9yLnN0YWNrKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICBkaXNwb3NhYmxlcyA9IG51bGw7XG59XG4iXX0=
//# sourceURL=/home/jakob/.atom/packages/tree-view-git-branch/lib/main.js