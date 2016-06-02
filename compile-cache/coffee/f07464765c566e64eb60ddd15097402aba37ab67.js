(function() {
  module.exports = {
    run: function() {
      var applyFont, body, fixer, fixerProto, triggerMeasurements;
      body = document.querySelector('body');
      triggerMeasurements = function(force) {
        atom.workspace.increaseFontSize();
        return atom.workspace.decreaseFontSize();
      };
      applyFont = function(font) {
        body.setAttribute('fonts-editor-font', font);
        return triggerMeasurements();
      };
      applyFont(atom.config.get('fonts.fontFamily'));
      atom.config.observe('fonts.fontFamily', function() {
        return applyFont(atom.config.get('fonts.fontFamily'));
      });
      setTimeout((function() {
        return triggerMeasurements();
      }), 500);
      fixerProto = Object.create(HTMLElement.prototype);
      fixerProto.createdCallback = function() {
        this.innerHTML = "regular<b>bold<i>italic</i></b><i>italic</i>";
      };
      fixer = document.registerElement("fonts-fixer", {
        prototype: fixerProto
      });
      return atom.views.getView(atom.workspace).appendChild(new fixer());
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZm9udHMvbGliL3J1bm5lci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsR0FBQSxFQUFLLFNBQUEsR0FBQTtBQUVILFVBQUEsdURBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixDQUFQLENBQUE7QUFBQSxNQUVBLG1CQUFBLEdBQXNCLFNBQUMsS0FBRCxHQUFBO0FBQ3BCLFFBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZixDQUFBLENBQUEsQ0FBQTtlQUNBLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWYsQ0FBQSxFQUZvQjtNQUFBLENBRnRCLENBQUE7QUFBQSxNQU1BLFNBQUEsR0FBWSxTQUFDLElBQUQsR0FBQTtBQUNWLFFBQUEsSUFBSSxDQUFDLFlBQUwsQ0FBa0IsbUJBQWxCLEVBQXVDLElBQXZDLENBQUEsQ0FBQTtlQUNBLG1CQUFBLENBQUEsRUFGVTtNQUFBLENBTlosQ0FBQTtBQUFBLE1BV0EsU0FBQSxDQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixrQkFBaEIsQ0FERixDQVhBLENBQUE7QUFBQSxNQWlCQSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0Isa0JBQXBCLEVBQXdDLFNBQUEsR0FBQTtlQUN0QyxTQUFBLENBQVUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGtCQUFoQixDQUFWLEVBRHNDO01BQUEsQ0FBeEMsQ0FqQkEsQ0FBQTtBQUFBLE1Bc0JBLFVBQUEsQ0FBVyxDQUFDLFNBQUEsR0FBQTtlQUNWLG1CQUFBLENBQUEsRUFEVTtNQUFBLENBQUQsQ0FBWCxFQUVHLEdBRkgsQ0F0QkEsQ0FBQTtBQUFBLE1BNEJBLFVBQUEsR0FBYSxNQUFNLENBQUMsTUFBUCxDQUFjLFdBQVcsQ0FBQSxTQUF6QixDQTVCYixDQUFBO0FBQUEsTUE2QkEsVUFBVSxDQUFDLGVBQVgsR0FBNkIsU0FBQSxHQUFBO0FBQzNCLFFBQUEsSUFBQyxDQUFBLFNBQUQsR0FBYSw4Q0FBYixDQUQyQjtNQUFBLENBN0I3QixDQUFBO0FBQUEsTUFpQ0EsS0FBQSxHQUFRLFFBQVEsQ0FBQyxlQUFULENBQXlCLGFBQXpCLEVBQ047QUFBQSxRQUFBLFNBQUEsRUFBVyxVQUFYO09BRE0sQ0FqQ1IsQ0FBQTthQXFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQWtDLENBQUMsV0FBbkMsQ0FBbUQsSUFBQSxLQUFBLENBQUEsQ0FBbkQsRUF2Q0c7SUFBQSxDQUFMO0dBREYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/jakob/.atom/packages/fonts/lib/runner.coffee
