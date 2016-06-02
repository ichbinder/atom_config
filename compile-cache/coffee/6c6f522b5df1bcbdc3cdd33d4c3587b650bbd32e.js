(function() {
  var CompositeDisposable, baseUrl, errorCodeRegex, linkifyErrorCode;

  CompositeDisposable = require('atom').CompositeDisposable;

  baseUrl = "https://github.com/koalaman/shellcheck/wiki";

  errorCodeRegex = /SC\d{4}/;

  linkifyErrorCode = function(text) {
    return text.replace(errorCodeRegex, "<a href=\"" + baseUrl + "/$&\">$&</a>");
  };

  module.exports = {
    config: {
      shellcheckExecutablePath: {
        type: 'string',
        title: 'Shellcheck Executable Path',
        "default": 'shellcheck'
      },
      userParameters: {
        type: 'string',
        title: 'Additional Executable Parameters',
        description: 'Additional shellcheck parameters, for example `-x -e SC1090`.',
        "default": ''
      },
      enableNotice: {
        type: 'boolean',
        title: 'Enable Notice Messages',
        "default": false
      }
    },
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.config.observe('linter-shellcheck.shellcheckExecutablePath', (function(_this) {
        return function(executablePath) {
          return _this.executablePath = executablePath;
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('linter-shellcheck.enableNotice', (function(_this) {
        return function(enableNotice) {
          return _this.enableNotice = enableNotice;
        };
      })(this)));
      return this.subscriptions.add(atom.config.observe('linter-shellcheck.userParameters', (function(_this) {
        return function(userParameters) {
          return _this.userParameters = userParameters.trim().split(' ').filter(Boolean);
        };
      })(this)));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    provideLinter: function() {
      var helpers, path, provider;
      helpers = require('atom-linter');
      path = require('path');
      return provider = {
        grammarScopes: ['source.shell'],
        scope: 'file',
        lintOnFly: true,
        lint: (function(_this) {
          return function(textEditor) {
            var cwd, filePath, parameters, showAll, text;
            filePath = textEditor.getPath();
            text = textEditor.getText();
            cwd = path.dirname(filePath);
            showAll = _this.enableNotice;
            parameters = [].concat(['-f', 'gcc'], _this.userParameters, ['-']);
            return helpers.exec(_this.executablePath, parameters, {
              stdin: text,
              cwd: cwd
            }).then(function(output) {
              var colEnd, colStart, lineEnd, lineStart, match, messages, regex;
              regex = /.+?:(\d+):(\d+):\s(\w+?):\s(.+)/g;
              messages = [];
              while ((match = regex.exec(output)) !== null) {
                if (showAll || match[3] === "warning" || match[3] === "error") {
                  lineStart = match[1] - 1;
                  colStart = match[2] - 1;
                  lineEnd = match[1] - 1;
                  colEnd = textEditor.getBuffer().lineLengthForRow(lineStart);
                  messages.push({
                    type: match[3],
                    filePath: filePath,
                    range: [[lineStart, colStart], [lineEnd, colEnd]],
                    html: linkifyErrorCode(match[4])
                  });
                }
              }
              return messages;
            });
          };
        })(this)
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvbGludGVyLXNoZWxsY2hlY2svbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhEQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFFQSxPQUFBLEdBQVUsNkNBRlYsQ0FBQTs7QUFBQSxFQUdBLGNBQUEsR0FBaUIsU0FIakIsQ0FBQTs7QUFBQSxFQUtBLGdCQUFBLEdBQW1CLFNBQUMsSUFBRCxHQUFBO1dBQ2pCLElBQUksQ0FBQyxPQUFMLENBQWEsY0FBYixFQUE4QixZQUFBLEdBQVksT0FBWixHQUFvQixjQUFsRCxFQURpQjtFQUFBLENBTG5CLENBQUE7O0FBQUEsRUFRQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLHdCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxLQUFBLEVBQU8sNEJBRFA7QUFBQSxRQUVBLFNBQUEsRUFBUyxZQUZUO09BREY7QUFBQSxNQUlBLGNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLEtBQUEsRUFBTyxrQ0FEUDtBQUFBLFFBRUEsV0FBQSxFQUNFLCtEQUhGO0FBQUEsUUFJQSxTQUFBLEVBQVMsRUFKVDtPQUxGO0FBQUEsTUFVQSxZQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxLQUFBLEVBQU8sd0JBRFA7QUFBQSxRQUVBLFNBQUEsRUFBUyxLQUZUO09BWEY7S0FERjtBQUFBLElBZ0JBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FBQTtB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

//# sourceURL=/home/jakob/.atom/packages/linter-shellcheck/lib/main.coffee
