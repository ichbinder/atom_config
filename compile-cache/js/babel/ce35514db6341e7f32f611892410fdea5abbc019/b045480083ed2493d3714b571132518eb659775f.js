Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.activate = activate;
exports.provideLinter = provideLinter;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _atomLinter = require('atom-linter');

'use babel';

var GRAMMAR_SCOPES = ['text.html.angular', 'text.html.basic', 'text.html.erb', 'text.html.gohtml', 'text.html.jsp', 'text.html.mustache', 'text.html.handlebars', 'text.html.ruby'];

var config = {
  executablePath: {
    title: 'Executable Path',
    description: 'HTMLHint Node Script Path',
    type: 'string',
    'default': path.join(__dirname, '..', 'node_modules', 'htmlhint', 'bin', 'htmlhint')
  }
};

exports.config = config;
var executablePath = '';

function activate() {
  require('atom-package-deps').install('linter-htmlhint');

  executablePath = atom.config.get('linter-htmlhint.executablePath');

  atom.config.observe('linter-htmlhint.executablePath', function (newValue) {
    executablePath = newValue;
  });
}

function provideLinter() {
  return {
    name: 'htmlhint',
    grammarScopes: GRAMMAR_SCOPES,
    scope: 'file',
    lintOnFly: false,
    lint: function lint(editor) {
      var text = editor.getText();
      var filePath = editor.getPath();

      if (!text) {
        return Promise.resolve([]);
      }

      var parameters = [filePath, '--format', 'json'];
      var htmlhintrc = (0, _atomLinter.find)(path.dirname(filePath), '.htmlhintrc');

      if (htmlhintrc) {
        parameters.push('-c');
        parameters.push(htmlhintrc);
      }

      return (0, _atomLinter.execNode)(executablePath, parameters, {}).then(function (output) {
        var results = JSON.parse(output);

        if (!results.length) {
          return [];
        }

        var messages = results[0].messages;

        return messages.map(function (message) {
          return {
            range: (0, _atomLinter.rangeFromLineNumber)(editor, message.line - 1, message.col - 1),
            type: message.type,
            text: message.message,
            filePath: filePath
          };
        });
      });
    }
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1odG1saGludC9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBRXNCLE1BQU07O0lBQWhCLElBQUk7OzBCQUNvQyxhQUFhOztBQUhqRSxXQUFXLENBQUM7O0FBS1osSUFBTSxjQUFjLEdBQUcsQ0FDckIsbUJBQW1CLEVBQ25CLGlCQUFpQixFQUNqQixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixvQkFBb0IsRUFDcEIsc0JBQXNCLEVBQ3RCLGdCQUFnQixDQUNqQixDQUFDOztBQUVLLElBQU0sTUFBTSxHQUFHO0FBQ3BCLGdCQUFjLEVBQUU7QUFDZCxTQUFLLEVBQUUsaUJBQWlCO0FBQ3hCLGVBQVcsRUFBRSwyQkFBMkI7QUFDeEMsUUFBSSxFQUFFLFFBQVE7QUFDZCxlQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUM7R0FDbkY7Q0FDRixDQUFDOzs7QUFFRixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7O0FBRWpCLFNBQVMsUUFBUSxHQUFHO0FBQ3pCLFNBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUV4RCxnQkFBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7O0FBRW5FLE1BQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFFLFVBQUEsUUFBUSxFQUFJO0FBQ2hFLGtCQUFjLEdBQUcsUUFBUSxDQUFDO0dBQzNCLENBQUMsQ0FBQztDQUNKOztBQUVNLFNBQVMsYUFBYSxHQUFHO0FBQzlCLFNBQU87QUFDTCxRQUFJLEVBQUUsVUFBVTtBQUNoQixpQkFBYSxFQUFFLGNBQWM7QUFDN0IsU0FBSyxFQUFFLE1BQU07QUFDYixhQUFTLEVBQUUsS0FBSztBQUNoQixRQUFJLEVBQUUsY0FBQSxNQUFNLEVBQUk7QUFDZCxVQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDOUIsVUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUVsQyxVQUFJLENBQUMsSUFBSSxFQUFFO0FBQ1QsZUFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQzVCOztBQUVELFVBQU0sVUFBVSxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsRCxVQUFNLFVBQVUsR0FBRyxzQkFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDOztBQUUvRCxVQUFJLFVBQVUsRUFBRTtBQUNkLGtCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLGtCQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO09BQzdCOztBQUVELGFBQU8sMEJBQVMsY0FBYyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDN0QsWUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFbkMsWUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDbkIsaUJBQU8sRUFBRSxDQUFDO1NBQ1g7O0FBRUQsWUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQzs7QUFFckMsZUFBTyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztpQkFBSztBQUM5QixpQkFBSyxFQUFFLHFDQUFvQixNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDckUsZ0JBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtBQUNsQixnQkFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPO0FBQ3JCLG9CQUFRLEVBQVIsUUFBUTtXQUNUO1NBQUMsQ0FBQyxDQUFDO09BQ0wsQ0FBQyxDQUFDO0tBQ0o7R0FDRixDQUFDO0NBQ0giLCJmaWxlIjoiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvbGludGVyLWh0bWxoaW50L2xpYi9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZXhlY05vZGUsIGZpbmQsIHJhbmdlRnJvbUxpbmVOdW1iZXIgfSBmcm9tICdhdG9tLWxpbnRlcic7XG5cbmNvbnN0IEdSQU1NQVJfU0NPUEVTID0gW1xuICAndGV4dC5odG1sLmFuZ3VsYXInLFxuICAndGV4dC5odG1sLmJhc2ljJyxcbiAgJ3RleHQuaHRtbC5lcmInLFxuICAndGV4dC5odG1sLmdvaHRtbCcsXG4gICd0ZXh0Lmh0bWwuanNwJyxcbiAgJ3RleHQuaHRtbC5tdXN0YWNoZScsXG4gICd0ZXh0Lmh0bWwuaGFuZGxlYmFycycsXG4gICd0ZXh0Lmh0bWwucnVieSdcbl07XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGV4ZWN1dGFibGVQYXRoOiB7XG4gICAgdGl0bGU6ICdFeGVjdXRhYmxlIFBhdGgnLFxuICAgIGRlc2NyaXB0aW9uOiAnSFRNTEhpbnQgTm9kZSBTY3JpcHQgUGF0aCcsXG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgZGVmYXVsdDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ25vZGVfbW9kdWxlcycsICdodG1saGludCcsICdiaW4nLCAnaHRtbGhpbnQnKVxuICB9XG59O1xuXG5sZXQgZXhlY3V0YWJsZVBhdGggPSAnJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICByZXF1aXJlKCdhdG9tLXBhY2thZ2UtZGVwcycpLmluc3RhbGwoJ2xpbnRlci1odG1saGludCcpO1xuXG4gIGV4ZWN1dGFibGVQYXRoID0gYXRvbS5jb25maWcuZ2V0KCdsaW50ZXItaHRtbGhpbnQuZXhlY3V0YWJsZVBhdGgnKTtcblxuICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItaHRtbGhpbnQuZXhlY3V0YWJsZVBhdGgnLCBuZXdWYWx1ZSA9PiB7XG4gICAgZXhlY3V0YWJsZVBhdGggPSBuZXdWYWx1ZTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlTGludGVyKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdodG1saGludCcsXG4gICAgZ3JhbW1hclNjb3BlczogR1JBTU1BUl9TQ09QRVMsXG4gICAgc2NvcGU6ICdmaWxlJyxcbiAgICBsaW50T25GbHk6IGZhbHNlLFxuICAgIGxpbnQ6IGVkaXRvciA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gZWRpdG9yLmdldFRleHQoKTtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gZWRpdG9yLmdldFBhdGgoKTtcblxuICAgICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJhbWV0ZXJzID0gW2ZpbGVQYXRoLCAnLS1mb3JtYXQnLCAnanNvbiddO1xuICAgICAgY29uc3QgaHRtbGhpbnRyYyA9IGZpbmQocGF0aC5kaXJuYW1lKGZpbGVQYXRoKSwgJy5odG1saGludHJjJyk7XG5cbiAgICAgIGlmIChodG1saGludHJjKSB7XG4gICAgICAgIHBhcmFtZXRlcnMucHVzaCgnLWMnKTtcbiAgICAgICAgcGFyYW1ldGVycy5wdXNoKGh0bWxoaW50cmMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXhlY05vZGUoZXhlY3V0YWJsZVBhdGgsIHBhcmFtZXRlcnMsIHt9KS50aGVuKG91dHB1dCA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBKU09OLnBhcnNlKG91dHB1dCk7XG5cbiAgICAgICAgaWYgKCFyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gcmVzdWx0c1swXS5tZXNzYWdlcztcblxuICAgICAgICByZXR1cm4gbWVzc2FnZXMubWFwKG1lc3NhZ2UgPT4gKHtcbiAgICAgICAgICByYW5nZTogcmFuZ2VGcm9tTGluZU51bWJlcihlZGl0b3IsIG1lc3NhZ2UubGluZSAtIDEsIG1lc3NhZ2UuY29sIC0gMSksXG4gICAgICAgICAgdHlwZTogbWVzc2FnZS50eXBlLFxuICAgICAgICAgIHRleHQ6IG1lc3NhZ2UubWVzc2FnZSxcbiAgICAgICAgICBmaWxlUGF0aFxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXX0=
//# sourceURL=/home/jakob/.atom/packages/linter-htmlhint/lib/index.js
