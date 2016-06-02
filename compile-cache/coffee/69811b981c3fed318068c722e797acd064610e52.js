(function() {
  var GitCommitView;

  module.exports = GitCommitView = (function() {
    function GitCommitView(serializedState) {
      this.element = document.createElement('div');
      this.element.classList.add('git-commit');
    }

    GitCommitView.prototype.serialize = function() {};

    GitCommitView.prototype.destroy = function() {
      return this.element.remove();
    };

    GitCommitView.prototype.getElement = function() {
      return this.element;
    };

    return GitCommitView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LWNvbW1pdC9saWIvZ2l0LWNvbW1pdC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxhQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNTLElBQUEsdUJBQUMsZUFBRCxHQUFBO0FBRVgsTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCLENBQVgsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBbkIsQ0FBdUIsWUFBdkIsQ0FEQSxDQUZXO0lBQUEsQ0FBYjs7QUFBQSw0QkFNQSxTQUFBLEdBQVcsU0FBQSxHQUFBLENBTlgsQ0FBQTs7QUFBQSw0QkFTQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULENBQUEsRUFETztJQUFBLENBVFQsQ0FBQTs7QUFBQSw0QkFZQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFFBRFM7SUFBQSxDQVpaLENBQUE7O3lCQUFBOztNQUZGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/jakob/.atom/packages/git-commit/lib/git-commit-view.coffee
