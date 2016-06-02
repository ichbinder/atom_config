(function() {
  var CompositeDisposable, TreeViewGitStatus, TreeViewGitStatusTooltip, fs, path;

  CompositeDisposable = require('atom').CompositeDisposable;

  path = require('path');

  fs = require('fs-plus');

  TreeViewGitStatusTooltip = require('./tooltip');

  module.exports = TreeViewGitStatus = {
    config: {
      autoToggle: {
        type: 'boolean',
        "default": true
      },
      showProjectModifiedStatus: {
        type: 'boolean',
        "default": true,
        description: 'Mark project folder as modified in case there are any ' + 'uncommited changes'
      },
      showBranchLabel: {
        type: 'boolean',
        "default": true
      },
      showCommitsAheadLabel: {
        type: 'boolean',
        "default": true
      },
      showCommitsBehindLabel: {
        type: 'boolean',
        "default": true
      }
    },
    subscriptions: null,
    repositorySubscriptions: null,
    repositoryMap: null,
    treeView: null,
    treeViewRootsMap: null,
    roots: null,
    showProjectModifiedStatus: true,
    showBranchLabel: true,
    showCommitsAheadLabel: true,
    showCommitsBehindLabel: true,
    subscriptionsOfCommands: null,
    active: false,
    ignoredRepositories: null,
    activate: function() {
      this.active = true;
      this.showProjectModifiedStatus = atom.config.get('tree-view-git-status.showProjectModifiedStatus');
      this.showBranchLabel = atom.config.get('tree-view-git-status.showBranchLabel');
      this.showCommitsAheadLabel = atom.config.get('tree-view-git-status.showCommitsAheadLabel');
      this.showCommitsBehindLabel = atom.config.get('tree-view-git-status.showCommitsBehindLabel');
      this.subscriptionsOfCommands = new CompositeDisposable;
      this.subscriptionsOfCommands.add(atom.commands.add('atom-workspace', {
        'tree-view-git-status:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
      this.subscriptions = new CompositeDisposable;
      this.treeViewRootsMap = new Map;
      this.ignoredRepositories = new Map;
      if (atom.config.get('tree-view-git-status.autoToggle')) {
        return this.toggle();
      }
    },
    deactivate: function() {
      var _ref, _ref1, _ref2, _ref3, _ref4;
      if ((_ref = this.subscriptions) != null) {
        _ref.dispose();
      }
      if ((_ref1 = this.repositorySubscriptions) != null) {
        _ref1.dispose();
      }
      if ((_ref2 = this.subscriptionsOfCommands) != null) {
        _ref2.dispose();
      }
      if (this.treeView != null) {
        this.clearTreeViewRootMap();
      }
      if ((_ref3 = this.repositoryMap) != null) {
        _ref3.clear();
      }
      if ((_ref4 = this.ignoredRepositories) != null) {
        _ref4.clear();
      }
      this.treeViewRootsMap = null;
      this.subscriptions = null;
      this.treeView = null;
      this.repositorySubscriptions = null;
      this.treeViewRootsMap = null;
      this.repositoryMap = null;
      this.ignoredRepositories = null;
      this.active = false;
      return this.toggled = false;
    },
    toggle: function() {
      var _ref, _ref1, _ref2;
      if (!this.active) {
        return;
      }
      if (this.toggled) {
        this.toggled = false;
        if ((_ref = this.subscriptions) != null) {
          _ref.dispose();
        }
        if ((_ref1 = this.repositorySubscriptions) != null) {
          _ref1.dispose();
        }
        if (this.treeView != null) {
          this.clearTreeViewRootMap();
        }
        return (_ref2 = this.repositoryMap) != null ? _ref2.clear() : void 0;
      } else {
        this.toggled = true;
        this.subscriptions.add(atom.project.onDidChangePaths((function(_this) {
          return function() {
            return _this.subscribeUpdateRepositories();
          };
        })(this)));
        this.subscribeUpdateRepositories();
        this.subscribeUpdateConfigurations();
        return atom.packages.activatePackage('tree-view').then((function(_this) {
          return function(treeViewPkg) {
            if (!(_this.active && _this.toggled)) {
              return;
            }
            _this.treeView = treeViewPkg.mainModule.createView();
            _this.subscribeUpdateTreeView();
            return _this.updateRoots(true);
          };
        })(this))["catch"](function(error) {
          return console.error(error, error.stack);
        });
      }
    },
    clearTreeViewRootMap: function() {
      var _ref, _ref1;
      if ((_ref = this.treeViewRootsMap) != null) {
        _ref.forEach(function(root, rootPath) {
          var customElements, _ref1, _ref2, _ref3, _ref4;
          if ((_ref1 = root.root) != null) {
            if ((_ref2 = _ref1.classList) != null) {
              _ref2.remove('status-modified', 'status-added');
            }
          }
          customElements = root.customElements;
          if ((customElements != null ? customElements.headerGitStatus : void 0) != null) {
            if ((_ref3 = root.root) != null) {
              if ((_ref4 = _ref3.header) != null) {
                _ref4.removeChild(customElements.headerGitStatus);
              }
            }
            customElements.headerGitStatus = null;
          }
          if ((customElements != null ? customElements.tooltip : void 0) != null) {
            customElements.tooltip.destruct();
            return customElements.tooltip = null;
          }
        });
      }
      return (_ref1 = this.treeViewRootsMap) != null ? _ref1.clear() : void 0;
    },
    subscribeUpdateConfigurations: function() {
      atom.config.observe('tree-view-git-status.showProjectModifiedStatus', (function(_this) {
        return function(newValue) {
          if (_this.showProjectModifiedStatus !== newValue) {
            _this.showProjectModifiedStatus = newValue;
            return _this.updateRoots();
          }
        };
      })(this));
      atom.config.observe('tree-view-git-status.showBranchLabel', (function(_this) {
        return function(newValue) {
          if (_this.showBranchLabel !== newValue) {
            _this.showBranchLabel = newValue;
            return _this.updateRoots();
          }
        };
      })(this));
      atom.config.observe('tree-view-git-status.showCommitsAheadLabel', (function(_this) {
        return function(newValue) {
          if (_this.showCommitsAheadLabel !== newValue) {
            _this.showCommitsAheadLabel = newValue;
            return _this.updateRoots();
          }
        };
      })(this));
      return atom.config.observe('tree-view-git-status.showCommitsBehindLabel', (function(_this) {
        return function(newValue) {
          if (_this.showCommitsBehindLabel !== newValue) {
            _this.showCommitsBehindLabel = newValue;
            return _this.updateRoots();
          }
        };
      })(this));
    },
    subscribeUpdateTreeView: function() {
      this.subscriptions.add(atom.project.onDidChangePaths((function(_this) {
        return function() {
          return _this.updateRoots(true);
        };
      })(this)));
      this.subscriptions.add(atom.config.onDidChange('tree-view.hideVcsIgnoredFiles', (function(_this) {
        return function() {
          return _this.updateRoots(true);
        };
      })(this)));
      this.subscriptions.add(atom.config.onDidChange('tree-view.hideIgnoredNames', (function(_this) {
        return function() {
          return _this.updateRoots(true);
        };
      })(this)));
      this.subscriptions.add(atom.config.onDidChange('core.ignoredNames', (function(_this) {
        return function() {
          if (atom.config.get('tree-view.hideIgnoredNames')) {
            return _this.updateRoots(true);
          }
        };
      })(this)));
      return this.subscriptions.add(atom.config.onDidChange('tree-view.sortFoldersBeforeFiles', (function(_this) {
        return function() {
          return _this.updateRoots(true);
        };
      })(this)));
    },
    subscribeUpdateRepositories: function() {
      var repo, _i, _len, _ref, _ref1, _results;
      if ((_ref = this.repositorySubscriptions) != null) {
        _ref.dispose();
      }
      this.repositorySubscriptions = new CompositeDisposable;
      this.repositoryMap = new Map();
      _ref1 = atom.project.getRepositories();
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        repo = _ref1[_i];
        if (repo != null) {
          if ((repo.getShortHead != null) && typeof repo.getShortHead() === 'string' && (repo.getWorkingDirectory != null) && typeof repo.getWorkingDirectory() === 'string' && (repo.statuses != null) && !this.isRepositoryIgnored(repo.getWorkingDirectory())) {
            this.repositoryMap.set(this.normalizePath(repo.getWorkingDirectory()), repo);
            _results.push(this.subscribeToRepo(repo));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    },
    subscribeToRepo: function(repo) {
      this.repositorySubscriptions.add(repo.onDidChangeStatuses((function(_this) {
        return function() {
          return _this.updateRootForRepo(repo);
        };
      })(this)));
      return this.repositorySubscriptions.add(repo.onDidChangeStatus((function(_this) {
        return function() {
          return _this.updateRootForRepo(repo);
        };
      })(this)));
    },
    updateRoots: function(reset) {
      var repoForRoot, repoSubPath, root, rootPath, rootPathHasGitFolder, _i, _len, _ref, _results;
      if (this.treeView != null) {
        this.roots = this.treeView.roots;
        if (reset) {
          this.clearTreeViewRootMap();
        }
        _ref = this.roots;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          root = _ref[_i];
          rootPath = this.normalizePath(root.directoryName.dataset.path);
          if (reset) {
            this.treeViewRootsMap.set(rootPath, {
              root: root,
              customElements: {}
            });
          }
          repoForRoot = null;
          repoSubPath = null;
          rootPathHasGitFolder = fs.existsSync(path.join(rootPath, '.git'));
          this.repositoryMap.forEach(function(repo, repoPath) {
            if ((repoForRoot == null) && ((rootPath === repoPath) || (rootPath.indexOf(repoPath) === 0 && !rootPathHasGitFolder))) {
              repoSubPath = path.relative(repoPath, rootPath);
              return repoForRoot = repo;
            }
          });
          if (repoForRoot != null) {
            if ((repoForRoot != null ? repoForRoot.repo : void 0) == null) {
              repoForRoot = null;
            }
            _results.push(this.doUpdateRootNode(root, repoForRoot, rootPath, repoSubPath));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    },
    updateRootForRepo: function(repo) {
      var repoPath;
      if ((this.treeView != null) && (this.treeViewRootsMap != null)) {
        repoPath = this.normalizePath(repo.getWorkingDirectory());
        return this.treeViewRootsMap.forEach((function(_this) {
          return function(root, rootPath) {
            var repoSubPath;
            if (rootPath.indexOf(repoPath) === 0) {
              repoSubPath = path.relative(repoPath, rootPath);
              if ((repo != null ? repo.repo : void 0) == null) {
                repo = null;
              }
              if (root.root != null) {
                return _this.doUpdateRootNode(root.root, repo, rootPath, repoSubPath);
              }
            }
          };
        })(this));
      }
    },
    doUpdateRootNode: function(root, repo, rootPath, repoSubPath) {
      var convStatus, customElements, headerGitStatus, showHeaderGitStatus, status;
      customElements = this.treeViewRootsMap.get(rootPath).customElements;
      if (this.showProjectModifiedStatus && (repo != null)) {
        if (repoSubPath !== '') {
          status = repo.getDirectoryStatus(repoSubPath);
        } else {
          status = this.getRootDirectoryStatus(repo);
        }
      }
      convStatus = this.convertDirectoryStatus(repo, status);
      root.classList.remove('status-modified', 'status-added');
      if (convStatus != null) {
        root.classList.add("status-" + convStatus);
      }
      showHeaderGitStatus = this.showBranchLabel || this.showCommitsAheadLabel || this.showCommitsBehindLabel;
      if (showHeaderGitStatus && (repo != null) && (customElements.headerGitStatus == null)) {
        headerGitStatus = document.createElement('span');
        headerGitStatus.classList.add('tree-view-git-status');
        this.generateGitStatusText(headerGitStatus, repo);
        root.header.insertBefore(headerGitStatus, root.directoryName.nextSibling);
        customElements.headerGitStatus = headerGitStatus;
      } else if (showHeaderGitStatus && (customElements.headerGitStatus != null)) {
        this.generateGitStatusText(customElements.headerGitStatus, repo);
      } else if (customElements.headerGitStatus != null) {
        root.header.removeChild(customElements.headerGitStatus);
        customElements.headerGitStatus = null;
      }
      if ((repo != null) && (customElements.tooltip == null)) {
        return customElements.tooltip = new TreeViewGitStatusTooltip(root, repo);
      }
    },
    generateGitStatusText: function(container, repo) {
      var ahead, behind, branchLabel, commitsAhead, commitsBehind, display, head, _ref, _ref1;
      display = false;
      head = repo != null ? repo.getShortHead() : void 0;
      ahead = behind = 0;
      if (repo.getCachedUpstreamAheadBehindCount != null) {
        _ref1 = (_ref = repo.getCachedUpstreamAheadBehindCount()) != null ? _ref : {}, ahead = _ref1.ahead, behind = _ref1.behind;
      }
      if (this.showBranchLabel && (head != null)) {
        branchLabel = document.createElement('span');
        branchLabel.classList.add('branch-label');
        branchLabel.textContent = head;
        display = true;
      }
      if (this.showCommitsAheadLabel && ahead > 0) {
        commitsAhead = document.createElement('span');
        commitsAhead.classList.add('commits-ahead-label');
        commitsAhead.textContent = ahead;
        display = true;
      }
      if (this.showCommitsBehindLabel && behind > 0) {
        commitsBehind = document.createElement('span');
        commitsBehind.classList.add('commits-behind-label');
        commitsBehind.textContent = behind;
        display = true;
      }
      if (display) {
        container.classList.remove('hide');
      } else {
        container.classList.add('hide');
      }
      container.innerHTML = '';
      if (branchLabel != null) {
        container.appendChild(branchLabel);
      }
      if (commitsAhead != null) {
        container.appendChild(commitsAhead);
      }
      if (commitsBehind != null) {
        return container.appendChild(commitsBehind);
      }
    },
    convertDirectoryStatus: function(repo, status) {
      var newStatus;
      newStatus = null;
      if (repo.isStatusModified(status)) {
        newStatus = 'modified';
      } else if (repo.isStatusNew(status)) {
        newStatus = 'added';
      }
      return newStatus;
    },
    getRootDirectoryStatus: function(repo) {
      var directoryStatus, filePath, status, _ref;
      directoryStatus = 0;
      _ref = repo.statuses;
      for (filePath in _ref) {
        status = _ref[filePath];
        directoryStatus |= status;
      }
      return directoryStatus;
    },
    ignoreRepository: function(repoPath) {
      this.ignoredRepositories.set(repoPath, true);
      this.subscribeUpdateRepositories();
      return this.updateRoots(true);
    },
    isRepositoryIgnored: function(repoPath) {
      return this.ignoredRepositories.has(repoPath);
    },
    normalizePath: function(repoPath) {
      var normPath;
      normPath = path.normalize(repoPath);
      if (process.platform === 'darwin') {
        normPath = normPath.replace(/^\/private/, '');
      }
      return normPath;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvdHJlZS12aWV3LWdpdC1zdGF0dXMvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBFQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FEUCxDQUFBOztBQUFBLEVBRUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBRkwsQ0FBQTs7QUFBQSxFQUdBLHdCQUFBLEdBQTJCLE9BQUEsQ0FBUSxXQUFSLENBSDNCLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUFpQixpQkFBQSxHQUNmO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLFVBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO09BREY7QUFBQSxNQUdBLHlCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtBQUFBLFFBRUEsV0FBQSxFQUNFLHdEQUFBLEdBQ0Esb0JBSkY7T0FKRjtBQUFBLE1BU0EsZUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7T0FWRjtBQUFBLE1BWUEscUJBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO09BYkY7QUFBQSxNQWVBLHNCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtPQWhCRjtLQURGO0FBQUEsSUFvQkEsYUFBQSxFQUFlLElBcEJmO0FBQUEs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

//# sourceURL=/home/jakob/.atom/packages/tree-view-git-status/lib/main.coffee
