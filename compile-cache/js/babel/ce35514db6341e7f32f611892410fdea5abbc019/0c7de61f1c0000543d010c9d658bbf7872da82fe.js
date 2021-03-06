function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _workerHelpers = require('./worker-helpers');

var Helpers = _interopRequireWildcard(_workerHelpers);

var _processCommunication = require('process-communication');

var _atomLinter = require('atom-linter');

'use babel';
// Note: 'use babel' doesn't work in forked processes
process.title = 'linter-eslint helper';

var ignoredMessageV1 = 'File ignored because of your .eslintignore file. Use --no-ignore to override.';
var ignoredMessageV2 = 'File ignored because of a matching ignore pattern. Use --no-ignore to override.';

function lintJob(argv, contents, eslint, configPath, config) {
  if (configPath === null && config.disableWhenNoEslintConfig) {
    return [];
  }
  eslint.execute(argv, contents);
  return global.__LINTER_ESLINT_RESPONSE.filter(function (e) {
    return e.message !== ignoredMessageV1;
  }).filter(function (e) {
    return e.message !== ignoredMessageV2;
  });
}
function fixJob(argv, eslint) {
  try {
    eslint.execute(argv);
    return 'Linter-ESLint: Fix Complete';
  } catch (err) {
    throw new Error('Linter-ESLint: Fix Attempt Completed, Linting Errors Remain');
  }
}

(0, _processCommunication.create)().onRequest('job', function (_ref, job) {
  var contents = _ref.contents;
  var type = _ref.type;
  var config = _ref.config;
  var filePath = _ref.filePath;

  global.__LINTER_ESLINT_RESPONSE = [];

  if (config.disableFSCache) {
    _atomLinter.FindCache.clear();
  }

  var fileDir = _path2['default'].dirname(filePath);
  var eslint = Helpers.getESLintInstance(fileDir, config);
  var configPath = Helpers.getConfigPath(fileDir);
  var relativeFilePath = Helpers.getRelativePath(fileDir, filePath, config);

  var argv = Helpers.getArgv(type, config, relativeFilePath, fileDir, configPath);

  if (type === 'lint') {
    job.response = lintJob(argv, contents, eslint, configPath, config);
  } else if (type === 'fix') {
    job.response = fixJob(argv, eslint);
  }
});

process.exit = function () {/* Stop eslint from closing the daemon */};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1lc2xpbnQvc3JjL3dvcmtlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O29CQUlpQixNQUFNOzs7OzZCQUNFLGtCQUFrQjs7SUFBL0IsT0FBTzs7b0NBQ0ksdUJBQXVCOzswQkFDcEIsYUFBYTs7QUFQdkMsV0FBVyxDQUFBOztBQUVYLE9BQU8sQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUE7O0FBT3RDLElBQU0sZ0JBQWdCLEdBQ3BCLCtFQUErRSxDQUFBO0FBQ2pGLElBQU0sZ0JBQWdCLEdBQ3BCLGlGQUFpRixDQUFBOztBQUVuRixTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFO0FBQzNELE1BQUksVUFBVSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMseUJBQXlCLEVBQUU7QUFDM0QsV0FBTyxFQUFFLENBQUE7R0FDVjtBQUNELFFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQzlCLFNBQU8sTUFBTSxDQUFDLHdCQUF3QixDQUNuQyxNQUFNLENBQUMsVUFBQSxDQUFDO1dBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxnQkFBZ0I7R0FBQSxDQUFDLENBQzNDLE1BQU0sQ0FBQyxVQUFBLENBQUM7V0FBSSxDQUFDLENBQUMsT0FBTyxLQUFLLGdCQUFnQjtHQUFBLENBQUMsQ0FBQTtDQUMvQztBQUNELFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDNUIsTUFBSTtBQUNGLFVBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDcEIsV0FBTyw2QkFBNkIsQ0FBQTtHQUNyQyxDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ1osVUFBTSxJQUFJLEtBQUssQ0FBQyw2REFBNkQsQ0FBQyxDQUFBO0dBQy9FO0NBQ0Y7O0FBRUQsbUNBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBb0MsRUFBRSxHQUFHLEVBQUs7TUFBNUMsUUFBUSxHQUFWLElBQW9DLENBQWxDLFFBQVE7TUFBRSxJQUFJLEdBQWhCLElBQW9DLENBQXhCLElBQUk7TUFBRSxNQUFNLEdBQXhCLElBQW9DLENBQWxCLE1BQU07TUFBRSxRQUFRLEdBQWxDLElBQW9DLENBQVYsUUFBUTs7QUFDM0QsUUFBTSxDQUFDLHdCQUF3QixHQUFHLEVBQUUsQ0FBQTs7QUFFcEMsTUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO0FBQ3pCLDBCQUFVLEtBQUssRUFBRSxDQUFBO0dBQ2xCOztBQUVELE1BQU0sT0FBTyxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUN0QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ3pELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDakQsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRTNFLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUE7O0FBRWpGLE1BQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtBQUNuQixPQUFHLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUE7R0FDbkUsTUFBTSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7QUFDekIsT0FBRyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0dBQ3BDO0NBQ0YsQ0FBQyxDQUFBOztBQUVGLE9BQU8sQ0FBQyxJQUFJLEdBQUcsWUFBWSwyQ0FBNkMsQ0FBQSIsImZpbGUiOiIvaG9tZS9qYWtvYi8uYXRvbS9wYWNrYWdlcy9saW50ZXItZXNsaW50L3NyYy93b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuLy8gTm90ZTogJ3VzZSBiYWJlbCcgZG9lc24ndCB3b3JrIGluIGZvcmtlZCBwcm9jZXNzZXNcbnByb2Nlc3MudGl0bGUgPSAnbGludGVyLWVzbGludCBoZWxwZXInXG5cbmltcG9ydCBQYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgKiBhcyBIZWxwZXJzIGZyb20gJy4vd29ya2VyLWhlbHBlcnMnXG5pbXBvcnQgeyBjcmVhdGUgfSBmcm9tICdwcm9jZXNzLWNvbW11bmljYXRpb24nXG5pbXBvcnQgeyBGaW5kQ2FjaGUgfSBmcm9tICdhdG9tLWxpbnRlcidcblxuY29uc3QgaWdub3JlZE1lc3NhZ2VWMSA9XG4gICdGaWxlIGlnbm9yZWQgYmVjYXVzZSBvZiB5b3VyIC5lc2xpbnRpZ25vcmUgZmlsZS4gVXNlIC0tbm8taWdub3JlIHRvIG92ZXJyaWRlLidcbmNvbnN0IGlnbm9yZWRNZXNzYWdlVjIgPVxuICAnRmlsZSBpZ25vcmVkIGJlY2F1c2Ugb2YgYSBtYXRjaGluZyBpZ25vcmUgcGF0dGVybi4gVXNlIC0tbm8taWdub3JlIHRvIG92ZXJyaWRlLidcblxuZnVuY3Rpb24gbGludEpvYihhcmd2LCBjb250ZW50cywgZXNsaW50LCBjb25maWdQYXRoLCBjb25maWcpIHtcbiAgaWYgKGNvbmZpZ1BhdGggPT09IG51bGwgJiYgY29uZmlnLmRpc2FibGVXaGVuTm9Fc2xpbnRDb25maWcpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICBlc2xpbnQuZXhlY3V0ZShhcmd2LCBjb250ZW50cylcbiAgcmV0dXJuIGdsb2JhbC5fX0xJTlRFUl9FU0xJTlRfUkVTUE9OU0VcbiAgICAuZmlsdGVyKGUgPT4gZS5tZXNzYWdlICE9PSBpZ25vcmVkTWVzc2FnZVYxKVxuICAgIC5maWx0ZXIoZSA9PiBlLm1lc3NhZ2UgIT09IGlnbm9yZWRNZXNzYWdlVjIpXG59XG5mdW5jdGlvbiBmaXhKb2IoYXJndiwgZXNsaW50KSB7XG4gIHRyeSB7XG4gICAgZXNsaW50LmV4ZWN1dGUoYXJndilcbiAgICByZXR1cm4gJ0xpbnRlci1FU0xpbnQ6IEZpeCBDb21wbGV0ZSdcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdMaW50ZXItRVNMaW50OiBGaXggQXR0ZW1wdCBDb21wbGV0ZWQsIExpbnRpbmcgRXJyb3JzIFJlbWFpbicpXG4gIH1cbn1cblxuY3JlYXRlKCkub25SZXF1ZXN0KCdqb2InLCAoeyBjb250ZW50cywgdHlwZSwgY29uZmlnLCBmaWxlUGF0aCB9LCBqb2IpID0+IHtcbiAgZ2xvYmFsLl9fTElOVEVSX0VTTElOVF9SRVNQT05TRSA9IFtdXG5cbiAgaWYgKGNvbmZpZy5kaXNhYmxlRlNDYWNoZSkge1xuICAgIEZpbmRDYWNoZS5jbGVhcigpXG4gIH1cblxuICBjb25zdCBmaWxlRGlyID0gUGF0aC5kaXJuYW1lKGZpbGVQYXRoKVxuICBjb25zdCBlc2xpbnQgPSBIZWxwZXJzLmdldEVTTGludEluc3RhbmNlKGZpbGVEaXIsIGNvbmZpZylcbiAgY29uc3QgY29uZmlnUGF0aCA9IEhlbHBlcnMuZ2V0Q29uZmlnUGF0aChmaWxlRGlyKVxuICBjb25zdCByZWxhdGl2ZUZpbGVQYXRoID0gSGVscGVycy5nZXRSZWxhdGl2ZVBhdGgoZmlsZURpciwgZmlsZVBhdGgsIGNvbmZpZylcblxuICBjb25zdCBhcmd2ID0gSGVscGVycy5nZXRBcmd2KHR5cGUsIGNvbmZpZywgcmVsYXRpdmVGaWxlUGF0aCwgZmlsZURpciwgY29uZmlnUGF0aClcblxuICBpZiAodHlwZSA9PT0gJ2xpbnQnKSB7XG4gICAgam9iLnJlc3BvbnNlID0gbGludEpvYihhcmd2LCBjb250ZW50cywgZXNsaW50LCBjb25maWdQYXRoLCBjb25maWcpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2ZpeCcpIHtcbiAgICBqb2IucmVzcG9uc2UgPSBmaXhKb2IoYXJndiwgZXNsaW50KVxuICB9XG59KVxuXG5wcm9jZXNzLmV4aXQgPSBmdW5jdGlvbiAoKSB7IC8qIFN0b3AgZXNsaW50IGZyb20gY2xvc2luZyB0aGUgZGFlbW9uICovIH1cbiJdfQ==
//# sourceURL=/home/jakob/.atom/packages/linter-eslint/src/worker.js
