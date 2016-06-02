(function() {
  var helpers, path;

  helpers = null;

  path = null;

  module.exports = {
    activate: function() {
      return require('atom-package-deps').install('linter-csslint');
    },
    provideLinter: function() {
      var provider;
      return provider = {
        name: 'CSSLint',
        grammarScopes: ['source.css', 'source.html'],
        scope: 'file',
        lintOnFly: true,
        lint: function(textEditor) {
          var cwd, exec, filePath, parameters, paths, text;
          if (helpers == null) {
            helpers = require('atom-linter');
          }
          if (path == null) {
            path = require('path');
          }
          filePath = textEditor.getPath();
          text = textEditor.getText();
          if (text.length === 0) {
            return Promise.resolve([]);
          }
          parameters = ['--format=json', '-'];
          exec = path.join(__dirname, '..', 'node_modules', 'atomlinter-csslint', 'cli.js');
          paths = atom.project.relativizePath(filePath);
          cwd = paths[0];
          if (!cwd) {
            cwd = path.dirname(textEditor.getPath());
          }
          return helpers.execNode(exec, parameters, {
            stdin: text,
            cwd: cwd
          }).then(function(output) {
            var col, data, line, lintResult, msg, toReturn, _i, _len, _ref;
            lintResult = JSON.parse(output);
            toReturn = [];
            if (lintResult.messages.length < 1) {
              return toReturn;
            }
            _ref = lintResult.messages;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              data = _ref[_i];
              msg = {};
              if (!(data.line && data.col)) {
                msg.range = helpers.rangeFromLineNumber(textEditor, 0);
              } else {
                line = data.line - 1;
                col = data.col - 1;
                msg.range = [[line, col], [line, col]];
              }
              msg.type = data.type.charAt(0).toUpperCase() + data.type.slice(1);
              msg.text = data.message;
              msg.filePath = filePath;
              if (data.rule.id && data.rule.desc) {
                msg.trace = [
                  {
                    type: "Trace",
                    text: '[' + data.rule.id + '] ' + data.rule.desc
                  }
                ];
              }
              toReturn.push(msg);
            }
            return toReturn;
          });
        }
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvbGludGVyLWNzc2xpbnQvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGFBQUE7O0FBQUEsRUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLElBRFAsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixPQUFBLENBQVEsbUJBQVIsQ0FBNEIsQ0FBQyxPQUE3QixDQUFxQyxnQkFBckMsRUFEUTtJQUFBLENBQVY7QUFBQSxJQUdBLGFBQUEsRUFBZSxTQUFBLEdBQUE7QUFDYixVQUFBLFFBQUE7YUFBQSxRQUFBLEdBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxhQUFBLEVBQWUsQ0FBQyxZQUFELEVBQWUsYUFBZixDQURmO0FBQUEsUUFFQSxLQUFBLEVBQU8sTUFGUDtBQUFBLFFBR0EsU0FBQSxFQUFXLElBSFg7QUFBQSxRQUlBLElBQUEsRUFBTSxTQUFDLFVBQUQsR0FBQTtBQUNKLGNBQUEsNENBQUE7O1lBQUEsVUFBVyxPQUFBLENBQVEsYUFBUjtXQUFYOztZQUNBLE9BQVEsT0FBQSxDQUFRLE1BQVI7V0FEUjtBQUFBLFVBRUEsUUFBQSxHQUFXLFVBQVUsQ0FBQyxPQUFYLENBQUEsQ0FGWCxDQUFBO0FBQUEsVUFHQSxJQUFBLEdBQU8sVUFBVSxDQUFDLE9BQVgsQ0FBQSxDQUhQLENBQUE7QUFJQSxVQUFBLElBQThCLElBQUksQ0FBQyxNQUFMLEtBQWUsQ0FBN0M7QUFBQSxtQkFBTyxPQUFPLENBQUMsT0FBUixDQUFnQixFQUFoQixDQUFQLENBQUE7V0FKQTtBQUFBLFVBS0EsVUFBQSxHQUFhLENBQUMsZUFBRCxFQUFrQixH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

//# sourceURL=/home/jakob/.atom/packages/linter-csslint/lib/main.coffee
