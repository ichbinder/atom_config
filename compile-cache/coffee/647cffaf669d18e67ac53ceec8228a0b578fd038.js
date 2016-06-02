(function() {
  var TreeViewGitStatusTooltip, path;

  path = require('path');

  module.exports = TreeViewGitStatusTooltip = (function() {
    TreeViewGitStatusTooltip.prototype.tooltip = null;

    TreeViewGitStatusTooltip.prototype.root = null;

    TreeViewGitStatusTooltip.prototype.repo = null;

    TreeViewGitStatusTooltip.prototype.mouseEnterSubscription = null;

    function TreeViewGitStatusTooltip(root, repo) {
      this.root = root;
      this.repo = repo;
      root.header.addEventListener('mouseenter', (function(_this) {
        return function() {
          return _this.onMouseEnter();
        };
      })(this));
      this.mouseEnterSubscription = {
        dispose: (function(_this) {
          return function() {
            _this.root.header.removeEventListener('mouseenter', function() {
              return _this.onMouseEnter();
            });
            return _this.mouseEnterSubscription = null;
          };
        })(this)
      };
    }

    TreeViewGitStatusTooltip.prototype.destruct = function() {
      var repo, root, tooltip, _ref;
      this.destroyTooltip();
      if ((_ref = this.mouseEnterSubscription) != null) {
        _ref.dispose();
      }
      tooltip = null;
      root = null;
      return repo = null;
    };

    TreeViewGitStatusTooltip.prototype.destroyTooltip = function() {
      var _ref;
      return (_ref = this.tooltip) != null ? _ref.dispose() : void 0;
    };

    TreeViewGitStatusTooltip.prototype.generateTooltipContent = function() {
      var branch, container, item, itemElem, itemsContainer, originURL, titleElem, titlesContainer, tooltipItems, workingDir, _base, _base1, _i, _len, _ref, _ref1, _ref2;
      tooltipItems = [];
      branch = (_ref = this.repo.branch) != null ? _ref : null;
      originURL = (_ref1 = typeof (_base = this.repo).getOriginURL === "function" ? _base.getOriginURL() : void 0) != null ? _ref1 : null;
      workingDir = (_ref2 = typeof (_base1 = this.repo).getWorkingDirectory === "function" ? _base1.getWorkingDirectory() : void 0) != null ? _ref2 : null;
      if (branch != null) {
        tooltipItems.push({
          'title': 'Head',
          'content': branch
        });
      }
      if (originURL != null) {
        tooltipItems.push({
          'title': 'Origin',
          'content': originURL
        });
      }
      if (workingDir != null) {
        tooltipItems.push({
          'title': 'Path',
          'content': this.shortenPath(path.normalize(workingDir))
        });
      }
      container = document.createElement('div');
      container.classList.add('git-status-tooltip');
      titlesContainer = document.createElement('div');
      titlesContainer.classList.add('titles-container');
      itemsContainer = document.createElement('div');
      itemsContainer.classList.add('items-container');
      for (_i = 0, _len = tooltipItems.length; _i < _len; _i++) {
        item = tooltipItems[_i];
        titleElem = document.createElement('span');
        titleElem.classList.add('title');
        titleElem.innerText = item.title;
        titlesContainer.appendChild(titleElem);
        if (typeof item.content === 'string') {
          itemElem = document.createElement('span');
          itemElem.classList.add('item');
          itemElem.innerText = item.content;
          itemsContainer.appendChild(itemElem);
        } else if (item.content instanceof HTMLElement) {
          itemsContainer.appendChild(item.content);
        }
      }
      container.appendChild(titlesContainer);
      container.appendChild(itemsContainer);
      return container;
    };

    TreeViewGitStatusTooltip.prototype.onMouseEnter = function() {
      var _ref;
      this.destroyTooltip();
      if (((_ref = this.repo) != null ? _ref.repo : void 0) != null) {
        return this.tooltip = atom.tooltips.add(this.root.header, {
          title: this.generateTooltipContent(),
          html: true,
          placement: 'bottom'
        });
      }
    };

    TreeViewGitStatusTooltip.prototype.shortenPath = function(dirPath) {
      var normRootPath, userHome;
      if (process.platform === 'win32') {
        userHome = process.env.USERPROFILE;
      } else {
        userHome = process.env.HOME;
      }
      normRootPath = path.normalize(dirPath);
      if (normRootPath.indexOf(userHome) === 0) {
        return '~' + normRootPath.substring(userHome.length);
      } else {
        return dirPath;
      }
    };

    return TreeViewGitStatusTooltip;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvdHJlZS12aWV3LWdpdC1zdGF0dXMvbGliL3Rvb2x0aXAuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxNQUFBLDhCQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0FBQ3JCLHVDQUFBLE9BQUEsR0FBUyxJQUFULENBQUE7O0FBQUEsdUNBQ0EsSUFBQSxHQUFNLElBRE4sQ0FBQTs7QUFBQSx1Q0FFQSxJQUFBLEdBQU0sSUFGTixDQUFBOztBQUFBLHVDQUdBLHNCQUFBLEdBQXdCLElBSHhCLENBQUE7O0FBS2EsSUFBQSxrQ0FBRSxJQUFGLEVBQVMsSUFBVCxHQUFBO0FBQ1gsTUFEWSxJQUFDLENBQUEsT0FBQSxJQUNiLENBQUE7QUFBQSxNQURtQixJQUFDLENBQUEsT0FBQSxJQUNwQixDQUFBO0FBQUEsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFaLENBQTZCLFlBQTdCLEVBQTJDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQU0sS0FBQyxDQUFBLFlBQUQsQ0FBQSxFQUFOO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0MsQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsc0JBQUQsR0FBMEI7QUFBQSxRQUFBLE9BQUEsRUFBUyxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUNqQyxZQUFBLEtBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFiLENBQWlDLFlBQWpDLEVBQStDLFNBQUEsR0FBQTtxQkFBTSxLQUFDLENBQUEsWUFBRCxDQUFBLEVBQU47WUFBQSxDQUEvQyxDQUFBLENBQUE7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

//# sourceURL=/home/jakob/.atom/packages/tree-view-git-status/lib/tooltip.coffee
