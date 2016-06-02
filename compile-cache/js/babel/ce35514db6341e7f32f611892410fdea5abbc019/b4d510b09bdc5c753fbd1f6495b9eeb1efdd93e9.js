Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _minimapLinterBinding = require('./minimap-linter-binding');

var _minimapLinterBinding2 = _interopRequireDefault(_minimapLinterBinding);

var _minimapLinterConfig = require('./minimap-linter-config');

var _minimapLinterConfig2 = _interopRequireDefault(_minimapLinterConfig);

'use babel';

var MinimapLinter = (function () {
  function MinimapLinter() {
    _classCallCheck(this, MinimapLinter);

    this.config = _minimapLinterConfig2['default'];
    this.bindings = [];
  }

  // Atom package lifecycle events start

  _createClass(MinimapLinter, [{
    key: 'activate',
    value: function activate() {
      this.subscriptions = new _atom.CompositeDisposable();
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.minimapProvider.unregisterPlugin('linter');
      this.minimapProvider = null;
    }

    // Atom package lifecycle events end

    // Package dependencies provisioning start
  }, {
    key: 'consumeMinimapServiceV1',
    value: function consumeMinimapServiceV1(minimapProvider) {
      this.minimapProvider = minimapProvider;
      this.minimapProvider.registerPlugin('linter', this);
    }

    // Package dependencies provisioning end

    // Minimap plugin lifecycle events start
  }, {
    key: 'isActive',
    value: function isActive() {
      return this.minimapsSubscription !== undefined && !this.minimapsSubscription.disposed;
    }
  }, {
    key: 'activatePlugin',
    value: function activatePlugin() {
      var _this = this;

      if (this.isActive()) return;

      // Handle each minimap
      this.minimapsSubscription = this.minimapProvider.observeMinimaps(function (editorMinimap) {
        var subscription = undefined,
            binding = undefined;
        _this.bindings.push(binding = new _minimapLinterBinding2['default'](editorMinimap));

        // minimap destroyed
        return _this.subscriptions.add(subscription = editorMinimap.onDidDestroy(function () {
          binding.destroy();
          _this.subscriptions.remove(subscription);
          return subscription.dispose();
        }));
      });
    }
  }, {
    key: 'deactivatePlugin',
    value: function deactivatePlugin() {
      this.bindings.forEach(function (binding) {
        return binding.destroy();
      });
      this.bindings = [];
      this.minimapsSubscription.dispose();
      return this.subscriptions.dispose();
    }

    // Minimap plugin lifecycle events end
  }]);

  return MinimapLinter;
})();

exports['default'] = new MinimapLinter();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL21pbmltYXAtbGludGVyL2xpYi9taW5pbWFwLWxpbnRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUNvQyxNQUFNOztvQ0FDVCwwQkFBMEI7Ozs7bUNBQ2xDLHlCQUF5Qjs7OztBQUhsRCxXQUFXLENBQUM7O0lBS04sYUFBYTtBQUNKLFdBRFQsYUFBYSxHQUNEOzBCQURaLGFBQWE7O0FBRWIsUUFBSSxDQUFDLE1BQU0sbUNBQWUsQ0FBQztBQUMzQixRQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztHQUNwQjs7OztlQUpDLGFBQWE7O1dBT1Asb0JBQUc7QUFDVCxVQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFDO0tBQ2hEOzs7V0FFUyxzQkFBRztBQUNYLFVBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEQsVUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7S0FDN0I7Ozs7Ozs7V0FJc0IsaUNBQUMsZUFBZSxFQUFFO0FBQ3ZDLFVBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQ3ZDLFVBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNyRDs7Ozs7OztXQUlPLG9CQUFHO0FBQ1QsYUFBTyxJQUFJLENBQUMsb0JBQW9CLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztLQUN2Rjs7O1dBRWEsMEJBQUc7OztBQUNmLFVBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU87OztBQUc1QixVQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsVUFBQyxhQUFhLEVBQUs7QUFDbEYsWUFBSSxZQUFZLFlBQUE7WUFBRSxPQUFPLFlBQUEsQ0FBQztBQUMxQixjQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLHNDQUF5QixhQUFhLENBQUMsQ0FBQyxDQUFDOzs7QUFHdEUsZUFBTyxNQUFLLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsWUFBTTtBQUM1RSxpQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCLGdCQUFLLGFBQWEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEMsaUJBQU8sWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQy9CLENBQUMsQ0FBQyxDQUFDO09BQ0wsQ0FBQyxDQUFDO0tBQ0o7OztXQUVlLDRCQUFHO0FBQ2pCLFVBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztlQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7T0FBQSxDQUFDLENBQUM7QUFDcEQsVUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbkIsVUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3BDLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNyQzs7Ozs7U0FuREMsYUFBYTs7O3FCQXVESixJQUFJLGFBQWEsRUFBRSIsImZpbGUiOiIvaG9tZS9qYWtvYi8uYXRvbS9wYWNrYWdlcy9taW5pbWFwLWxpbnRlci9saWIvbWluaW1hcC1saW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBNaW5pbWFwTGludGVyQmluZGluZyBmcm9tICcuL21pbmltYXAtbGludGVyLWJpbmRpbmcnO1xuaW1wb3J0IGNvbmZpZ1NjaGVtYSBmcm9tICcuL21pbmltYXAtbGludGVyLWNvbmZpZyc7XG5cbmNsYXNzIE1pbmltYXBMaW50ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5jb25maWcgPSBjb25maWdTY2hlbWE7XG4gICAgICB0aGlzLmJpbmRpbmdzID0gW107XG4gICAgfVxuXG4gICAgLy8gQXRvbSBwYWNrYWdlIGxpZmVjeWNsZSBldmVudHMgc3RhcnRcbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgfVxuXG4gICAgZGVhY3RpdmF0ZSgpIHtcbiAgICAgIHRoaXMubWluaW1hcFByb3ZpZGVyLnVucmVnaXN0ZXJQbHVnaW4oJ2xpbnRlcicpO1xuICAgICAgdGhpcy5taW5pbWFwUHJvdmlkZXIgPSBudWxsO1xuICAgIH1cbiAgICAvLyBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIGV2ZW50cyBlbmRcblxuICAgIC8vIFBhY2thZ2UgZGVwZW5kZW5jaWVzIHByb3Zpc2lvbmluZyBzdGFydFxuICAgIGNvbnN1bWVNaW5pbWFwU2VydmljZVYxKG1pbmltYXBQcm92aWRlcikge1xuICAgICAgdGhpcy5taW5pbWFwUHJvdmlkZXIgPSBtaW5pbWFwUHJvdmlkZXI7XG4gICAgICB0aGlzLm1pbmltYXBQcm92aWRlci5yZWdpc3RlclBsdWdpbignbGludGVyJywgdGhpcyk7XG4gICAgfVxuICAgIC8vIFBhY2thZ2UgZGVwZW5kZW5jaWVzIHByb3Zpc2lvbmluZyBlbmRcblxuICAgIC8vIE1pbmltYXAgcGx1Z2luIGxpZmVjeWNsZSBldmVudHMgc3RhcnRcbiAgICBpc0FjdGl2ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pbmltYXBzU3Vic2NyaXB0aW9uICE9PSB1bmRlZmluZWQgJiYgIXRoaXMubWluaW1hcHNTdWJzY3JpcHRpb24uZGlzcG9zZWQ7XG4gICAgfVxuXG4gICAgYWN0aXZhdGVQbHVnaW4oKSB7XG4gICAgICBpZiAodGhpcy5pc0FjdGl2ZSgpKSByZXR1cm47XG5cbiAgICAgIC8vIEhhbmRsZSBlYWNoIG1pbmltYXBcbiAgICAgIHRoaXMubWluaW1hcHNTdWJzY3JpcHRpb24gPSB0aGlzLm1pbmltYXBQcm92aWRlci5vYnNlcnZlTWluaW1hcHMoKGVkaXRvck1pbmltYXApID0+IHtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiwgYmluZGluZztcbiAgICAgICAgdGhpcy5iaW5kaW5ncy5wdXNoKGJpbmRpbmcgPSBuZXcgTWluaW1hcExpbnRlckJpbmRpbmcoZWRpdG9yTWluaW1hcCkpO1xuXG4gICAgICAgIC8vIG1pbmltYXAgZGVzdHJveWVkXG4gICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHN1YnNjcmlwdGlvbiA9IGVkaXRvck1pbmltYXAub25EaWREZXN0cm95KCgpID0+IHtcbiAgICAgICAgICBiaW5kaW5nLmRlc3Ryb3koKTtcbiAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucmVtb3ZlKHN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbi5kaXNwb3NlKCk7XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlYWN0aXZhdGVQbHVnaW4oKSB7XG4gICAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiBiaW5kaW5nLmRlc3Ryb3koKSk7XG4gICAgICB0aGlzLmJpbmRpbmdzID0gW107XG4gICAgICB0aGlzLm1pbmltYXBzU3Vic2NyaXB0aW9uLmRpc3Bvc2UoKTtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvLyBNaW5pbWFwIHBsdWdpbiBsaWZlY3ljbGUgZXZlbnRzIGVuZFxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTWluaW1hcExpbnRlcigpO1xuIl19
//# sourceURL=/home/jakob/.atom/packages/minimap-linter/lib/minimap-linter.js
