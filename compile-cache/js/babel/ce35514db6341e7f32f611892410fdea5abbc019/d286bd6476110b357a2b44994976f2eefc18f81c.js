Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

'use babel';

var markerTypeConfigKey = 'minimap-linter.markerType';

var MinimapBookmarksBinding = (function () {
  function MinimapBookmarksBinding(editorMinimap) {
    var _this = this;

    _classCallCheck(this, MinimapBookmarksBinding);

    this.markerType = atom.config.get('minimap-linter.markerType') || 'highlight-over';
    this.editorMinimap = editorMinimap;
    this.subscriptions = new _atom.CompositeDisposable();
    this.editor = this.editorMinimap.getTextEditor();
    this.decorations = [];
    this.reloadDecorations();

    atom.config.onDidChange(markerTypeConfigKey, function (_ref) {
      var newValue = _ref.newValue;

      _this.markerType = newValue;
      _this.reloadDecorations();
    });

    this.subscriptions.add(this.editor.displayBuffer.onDidAddDecoration(function (decoration) {
      return _this.processDecoration(decoration);
    }));
  }

  _createClass(MinimapBookmarksBinding, [{
    key: 'reloadDecorations',
    value: function reloadDecorations() {
      this.removeDecorations();
      for (var decorationId in this.editor.displayBuffer.decorationsById) {
        this.processDecoration(this.editor.displayBuffer.decorationsById[decorationId]);
      }
    }
  }, {
    key: 'processDecoration',
    value: function processDecoration(linterDecoration) {
      if (linterDecoration.properties && linterDecoration.properties['class'] && linterDecoration.properties['class'].indexOf('linter-') === 0) {
        var minimapDecoration = this.editorMinimap.decorateMarker(linterDecoration.marker, {
          type: this.markerType,
          'class': linterDecoration.properties['class']
        });
        this.decorations.push(minimapDecoration);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.removeDecorations();
      return this.subscriptions.dispose();
    }
  }, {
    key: 'removeDecorations',
    value: function removeDecorations() {
      if (this.decorations.length === 0) return;
      this.decorations.forEach(function (decoration) {
        return decoration.destroy();
      });
      this.decorations = [];
    }
  }]);

  return MinimapBookmarksBinding;
})();

exports['default'] = MinimapBookmarksBinding;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL21pbmltYXAtbGludGVyL2xpYi9taW5pbWFwLWxpbnRlci1iaW5kaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUNvQyxNQUFNOztBQUQxQyxXQUFXLENBQUM7O0FBR1osSUFBTSxtQkFBbUIsR0FBRywyQkFBMkIsQ0FBQzs7SUFFbkMsdUJBQXVCO0FBQy9CLFdBRFEsdUJBQXVCLENBQzlCLGFBQWEsRUFBRTs7OzBCQURSLHVCQUF1Qjs7QUFFeEMsUUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLGdCQUFnQixDQUFDO0FBQ25GLFFBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ25DLFFBQUksQ0FBQyxhQUFhLEdBQUcsK0JBQXlCLENBQUM7QUFDL0MsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ2pELFFBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOztBQUV6QixRQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLElBQVksRUFBSztVQUFmLFFBQVEsR0FBVixJQUFZLENBQVYsUUFBUTs7QUFDdEQsWUFBSyxVQUFVLEdBQUcsUUFBUSxDQUFDO0FBQzNCLFlBQUssaUJBQWlCLEVBQUUsQ0FBQztLQUMxQixDQUFDLENBQUM7O0FBRUgsUUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsVUFBQSxVQUFVO2FBQUksTUFBSyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7S0FBQSxDQUFDLENBQUMsQ0FBQztHQUN4SDs7ZUFma0IsdUJBQXVCOztXQWlCekIsNkJBQUc7QUFDbEIsVUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDekIsV0FBSyxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUU7QUFDbEUsWUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO09BQ2pGO0tBQ0Y7OztXQUVpQiwyQkFBQyxnQkFBZ0IsRUFBRTtBQUNuQyxVQUFJLGdCQUFnQixDQUFDLFVBQVUsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLFNBQU0sSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLFNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2xJLFlBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0FBQ2pGLGNBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtBQUNyQixtQkFBTyxnQkFBZ0IsQ0FBQyxVQUFVLFNBQU07U0FDekMsQ0FBQyxDQUFDO0FBQ0gsWUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztPQUMxQztLQUNGOzs7V0FFTSxtQkFBRztBQUNSLFVBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0FBQ3pCLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNyQzs7O1dBRWdCLDZCQUFHO0FBQ2xCLFVBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLE9BQU87QUFDMUMsVUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO2VBQUksVUFBVSxDQUFDLE9BQU8sRUFBRTtPQUFBLENBQUMsQ0FBQztBQUM3RCxVQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztLQUN2Qjs7O1NBM0NrQix1QkFBdUI7OztxQkFBdkIsdUJBQXVCIiwiZmlsZSI6Ii9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL21pbmltYXAtbGludGVyL2xpYi9taW5pbWFwLWxpbnRlci1iaW5kaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5cbmNvbnN0IG1hcmtlclR5cGVDb25maWdLZXkgPSAnbWluaW1hcC1saW50ZXIubWFya2VyVHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmltYXBCb29rbWFya3NCaW5kaW5nIHtcbiAgY29uc3RydWN0b3IoZWRpdG9yTWluaW1hcCkge1xuICAgIHRoaXMubWFya2VyVHlwZSA9IGF0b20uY29uZmlnLmdldCgnbWluaW1hcC1saW50ZXIubWFya2VyVHlwZScpIHx8ICdoaWdobGlnaHQtb3Zlcic7XG4gICAgdGhpcy5lZGl0b3JNaW5pbWFwID0gZWRpdG9yTWluaW1hcDtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZWRpdG9yID0gdGhpcy5lZGl0b3JNaW5pbWFwLmdldFRleHRFZGl0b3IoKTtcbiAgICB0aGlzLmRlY29yYXRpb25zID0gW107XG4gICAgdGhpcy5yZWxvYWREZWNvcmF0aW9ucygpO1xuXG4gICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UobWFya2VyVHlwZUNvbmZpZ0tleSwgKHsgbmV3VmFsdWUgfSkgPT4ge1xuICAgICAgdGhpcy5tYXJrZXJUeXBlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLnJlbG9hZERlY29yYXRpb25zKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHRoaXMuZWRpdG9yLmRpc3BsYXlCdWZmZXIub25EaWRBZGREZWNvcmF0aW9uKGRlY29yYXRpb24gPT4gdGhpcy5wcm9jZXNzRGVjb3JhdGlvbihkZWNvcmF0aW9uKSkpO1xuICB9XG5cbiAgcmVsb2FkRGVjb3JhdGlvbnMoKSB7XG4gICAgdGhpcy5yZW1vdmVEZWNvcmF0aW9ucygpO1xuICAgIGZvciAobGV0IGRlY29yYXRpb25JZCBpbiB0aGlzLmVkaXRvci5kaXNwbGF5QnVmZmVyLmRlY29yYXRpb25zQnlJZCkge1xuICAgICAgdGhpcy5wcm9jZXNzRGVjb3JhdGlvbih0aGlzLmVkaXRvci5kaXNwbGF5QnVmZmVyLmRlY29yYXRpb25zQnlJZFtkZWNvcmF0aW9uSWRdKTtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzRGVjb3JhdGlvbiAobGludGVyRGVjb3JhdGlvbikge1xuICAgIGlmIChsaW50ZXJEZWNvcmF0aW9uLnByb3BlcnRpZXMgJiYgbGludGVyRGVjb3JhdGlvbi5wcm9wZXJ0aWVzLmNsYXNzICYmIGxpbnRlckRlY29yYXRpb24ucHJvcGVydGllcy5jbGFzcy5pbmRleE9mKCdsaW50ZXItJykgPT09IDApIHtcbiAgICAgIGxldCBtaW5pbWFwRGVjb3JhdGlvbiA9IHRoaXMuZWRpdG9yTWluaW1hcC5kZWNvcmF0ZU1hcmtlcihsaW50ZXJEZWNvcmF0aW9uLm1hcmtlciwge1xuICAgICAgICB0eXBlOiB0aGlzLm1hcmtlclR5cGUsXG4gICAgICAgIGNsYXNzOiBsaW50ZXJEZWNvcmF0aW9uLnByb3BlcnRpZXMuY2xhc3NcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kZWNvcmF0aW9ucy5wdXNoKG1pbmltYXBEZWNvcmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlRGVjb3JhdGlvbnMoKTtcbiAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIHJlbW92ZURlY29yYXRpb25zKCkge1xuICAgIGlmICh0aGlzLmRlY29yYXRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIHRoaXMuZGVjb3JhdGlvbnMuZm9yRWFjaChkZWNvcmF0aW9uID0+IGRlY29yYXRpb24uZGVzdHJveSgpKTtcbiAgICB0aGlzLmRlY29yYXRpb25zID0gW107XG4gIH1cbn1cbiJdfQ==
//# sourceURL=/home/jakob/.atom/packages/minimap-linter/lib/minimap-linter-binding.js
