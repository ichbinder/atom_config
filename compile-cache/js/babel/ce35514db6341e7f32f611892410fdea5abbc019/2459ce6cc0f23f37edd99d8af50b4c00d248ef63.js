Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getNodePrefixPath = getNodePrefixPath;
exports.getESLintFromDirectory = getESLintFromDirectory;
exports.refreshModulesPath = refreshModulesPath;
exports.getESLintInstance = getESLintInstance;
exports.getConfigPath = getConfigPath;
exports.getRelativePath = getRelativePath;
exports.getArgv = getArgv;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _resolveEnv = require('resolve-env');

var _resolveEnv2 = _interopRequireDefault(_resolveEnv);

var _atomLinter = require('atom-linter');

var _consistentPath = require('consistent-path');

var _consistentPath2 = _interopRequireDefault(_consistentPath);

'use babel';

var Cache = {
  ESLINT_LOCAL_PATH: _path2['default'].normalize(_path2['default'].join(__dirname, '..', 'node_modules', 'eslint')),
  NODE_PREFIX_PATH: null,
  LAST_MODULES_PATH: null
};

function getNodePrefixPath() {
  if (Cache.NODE_PREFIX_PATH === null) {
    var npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    try {
      Cache.NODE_PREFIX_PATH = _child_process2['default'].spawnSync(npmCommand, ['get', 'prefix'], {
        env: Object.assign(Object.assign({}, process.env), { PATH: (0, _consistentPath2['default'])() })
      }).output[1].toString().trim();
    } catch (e) {
      throw new Error('Unable to execute `npm get prefix`. Please make sure Atom is getting $PATH correctly');
    }
  }
  return Cache.NODE_PREFIX_PATH;
}

function getESLintFromDirectory(modulesDir, config) {
  var ESLintDirectory = null;

  if (config.useGlobalEslint) {
    var prefixPath = config.globalNodePath || getNodePrefixPath();
    if (process.platform === 'win32') {
      ESLintDirectory = _path2['default'].join(prefixPath, 'node_modules', 'eslint');
    } else {
      ESLintDirectory = _path2['default'].join(prefixPath, 'lib', 'node_modules', 'eslint');
    }
  } else {
    ESLintDirectory = _path2['default'].join(modulesDir || '', 'eslint');
  }
  try {
    return require(_path2['default'].join(ESLintDirectory, 'lib', 'cli.js'));
  } catch (e) {
    if (config.useGlobalEslint && e.code === 'MODULE_NOT_FOUND') {
      throw new Error('ESLint not found, Please install or make sure Atom is getting $PATH correctly');
    }
    return require(_path2['default'].join(Cache.ESLINT_LOCAL_PATH, 'lib', 'cli.js'));
  }
}

function refreshModulesPath(modulesDir) {
  if (Cache.LAST_MODULES_PATH !== modulesDir) {
    Cache.LAST_MODULES_PATH = modulesDir;
    process.env.NODE_PATH = modulesDir || '';
    require('module').Module._initPaths();
  }
}

function getESLintInstance(fileDir, config) {
  var modulesDir = _path2['default'].dirname((0, _atomLinter.findCached)(fileDir, 'node_modules/eslint'));
  refreshModulesPath(modulesDir);
  return getESLintFromDirectory(modulesDir, config);
}

function getConfigPath(fileDir) {
  var configFile = (0, _atomLinter.findCached)(fileDir, ['.eslintrc.js', '.eslintrc.yaml', '.eslintrc.yml', '.eslintrc.json', '.eslintrc']);
  if (configFile) {
    return configFile;
  }

  var packagePath = (0, _atomLinter.findCached)(fileDir, 'package.json');
  if (packagePath && Boolean(require(packagePath).eslintConfig)) {
    return packagePath;
  }
  return null;
}

function getRelativePath(fileDir, filePath, config) {
  var ignoreFile = config.disableEslintIgnore ? null : (0, _atomLinter.findCached)(fileDir, '.eslintignore');

  if (ignoreFile) {
    var ignoreDir = _path2['default'].dirname(ignoreFile);
    process.chdir(ignoreDir);
    return _path2['default'].relative(ignoreDir, filePath);
  }
  process.chdir(fileDir);
  return _path2['default'].basename(filePath);
}

function getArgv(type, config, filePath, fileDir, givenConfigPath) {
  var configPath = undefined;
  if (givenConfigPath === null) {
    configPath = config.eslintrcPath || null;
  } else configPath = givenConfigPath;

  var argv = [process.execPath, 'a-b-c' // dummy value for eslint executable
  ];
  if (type === 'lint') {
    argv.push('--stdin');
  }
  argv.push('--format', _path2['default'].join(__dirname, 'reporter.js'));

  var ignoreFile = config.disableEslintIgnore ? null : (0, _atomLinter.findCached)(fileDir, '.eslintignore');
  if (ignoreFile) {
    argv.push('--ignore-path', ignoreFile);
  }

  if (config.eslintRulesDir) {
    var rulesDir = (0, _resolveEnv2['default'])(config.eslintRulesDir);
    if (!_path2['default'].isAbsolute(rulesDir)) {
      rulesDir = (0, _atomLinter.findCached)(fileDir, rulesDir);
    }
    argv.push('--rulesdir', rulesDir);
  }
  if (configPath) {
    argv.push('--config', (0, _resolveEnv2['default'])(configPath));
  }
  if (config.disableEslintIgnore) {
    argv.push('--no-ignore');
  }
  if (type === 'lint') {
    argv.push('--stdin-filename', filePath);
  } else if (type === 'fix') {
    argv.push(filePath);
    argv.push('--fix');
  }

  return argv;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1lc2xpbnQvc3JjL3dvcmtlci1oZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7b0JBRWlCLE1BQU07Ozs7NkJBQ0UsZUFBZTs7OzswQkFDakIsYUFBYTs7OzswQkFDVCxhQUFhOzs4QkFDcEIsaUJBQWlCOzs7O0FBTnJDLFdBQVcsQ0FBQTs7QUFRWCxJQUFNLEtBQUssR0FBRztBQUNaLG1CQUFpQixFQUFFLGtCQUFLLFNBQVMsQ0FBQyxrQkFBSyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkYsa0JBQWdCLEVBQUUsSUFBSTtBQUN0QixtQkFBaUIsRUFBRSxJQUFJO0NBQ3hCLENBQUE7O0FBRU0sU0FBUyxpQkFBaUIsR0FBRztBQUNsQyxNQUFJLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLEVBQUU7QUFDbkMsUUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQTtBQUNuRSxRQUFJO0FBQ0YsV0FBSyxDQUFDLGdCQUFnQixHQUNwQiwyQkFBYSxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFFO0FBQ3BELFdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxrQ0FBUyxFQUFFLENBQUM7T0FDeEUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtLQUNqQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ1YsWUFBTSxJQUFJLEtBQUssQ0FDYixzRkFBc0YsQ0FDdkYsQ0FBQTtLQUNGO0dBQ0Y7QUFDRCxTQUFP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UUFBUSxDQUFDLEVBQUU7QUFDOUIsY0FBUSxHQUFHLDRCQUFXLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUN6QztBQUNELFFBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0dBQ2xDO0FBQ0QsTUFBSSxVQUFVLEVBQUU7QUFDZCxRQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSw2QkFBVyxVQUFVLENBQUMsQ0FBQyxDQUFBO0dBQzlDO0FBQ0QsTUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7QUFDOUIsUUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtHQUN6QjtBQUNELE1BQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtBQUNuQixRQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0dBQ3hDLE1BQU0sSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO0FBQ3pCLFFBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDbkIsUUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtHQUNuQjs7QUFFRCxTQUFPLElBQUksQ0FBQTtDQUNaIiwiZmlsZSI6Ii9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1lc2xpbnQvc3JjL3dvcmtlci1oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCdcblxuaW1wb3J0IFBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBDaGlsZFByb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2VzcydcbmltcG9ydCByZXNvbHZlRW52IGZyb20gJ3Jlc29sdmUtZW52J1xuaW1wb3J0IHsgZmluZENhY2hlZCB9IGZyb20gJ2F0b20tbGludGVyJ1xuaW1wb3J0IGdldFBhdGggZnJvbSAnY29uc2lzdGVudC1wYXRoJ1xuXG5jb25zdCBDYWNoZSA9IHtcbiAgRVNMSU5UX0xPQ0FMX1BBVEg6IFBhdGgubm9ybWFsaXplKFBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdub2RlX21vZHVsZXMnLCAnZXNsaW50JykpLFxuICBOT0RFX1BSRUZJWF9QQVRIOiBudWxsLFxuICBMQVNUX01PRFVMRVNfUEFUSDogbnVsbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9kZVByZWZpeFBhdGgoKSB7XG4gIGlmIChDYWNoZS5OT0RFX1BSRUZJWF9QQVRIID09PSBudWxsKSB7XG4gICAgY29uc3QgbnBtQ29tbWFuZCA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicgPyAnbnBtLmNtZCcgOiAnbnBtJ1xuICAgIHRyeSB7XG4gICAgICBDYWNoZS5OT0RFX1BSRUZJWF9QQVRIID1cbiAgICAgICAgQ2hpbGRQcm9jZXNzLnNwYXduU3luYyhucG1Db21tYW5kLCBbJ2dldCcsICdwcmVmaXgnXSwge1xuICAgICAgICAgIGVudjogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwcm9jZXNzLmVudiksIHsgUEFUSDogZ2V0UGF0aCgpIH0pXG4gICAgICAgIH0pLm91dHB1dFsxXS50b1N0cmluZygpLnRyaW0oKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1VuYWJsZSB0byBleGVjdXRlIGBucG0gZ2V0IHByZWZpeGAuIFBsZWFzZSBtYWtlIHN1cmUgQXRvbSBpcyBnZXR0aW5nICRQQVRIIGNvcnJlY3RseSdcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIENhY2hlLk5PREVfUFJFRklYX1BBVEhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVTTGludEZyb21EaXJlY3RvcnkobW9kdWxlc0RpciwgY29uZmlnKSB7XG4gIGxldCBFU0xpbnREaXJlY3RvcnkgPSBudWxsXG5cbiAgaWYgKGNvbmZpZy51c2VHbG9iYWxFc2xpbnQpIHtcbiAgICBjb25zdCBwcmVmaXhQYXRoID0gY29uZmlnLmdsb2JhbE5vZGVQYXRoIHx8IGdldE5vZGVQcmVmaXhQYXRoKClcbiAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICAgICAgRVNMaW50RGlyZWN0b3J5ID0gUGF0aC5qb2luKHByZWZpeFBhdGgsICdub2RlX21vZHVsZXMnLCAnZXNsaW50JylcbiAgICB9IGVsc2Uge1xuICAgICAgRVNMaW50RGlyZWN0b3J5ID0gUGF0aC5qb2luKHByZWZpeFBhdGgsICdsaWInLCAnbm9kZV9tb2R1bGVzJywgJ2VzbGludCcpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIEVTTGludERpcmVjdG9yeSA9IFBhdGguam9pbihtb2R1bGVzRGlyIHx8ICcnLCAnZXNsaW50JylcbiAgfVxuICB0cnkge1xuICAgIHJldHVybiByZXF1aXJlKFBhdGguam9pbihFU0xpbnREaXJlY3RvcnksICdsaWInLCAnY2xpLmpzJykpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoY29uZmlnLnVzZUdsb2JhbEVzbGludCAmJiBlLmNvZGUgPT09ICdNT0RVTEVfTk9UX0ZPVU5EJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnRVNMaW50IG5vdCBmb3VuZCwgUGxlYXNlIGluc3RhbGwgb3IgbWFrZSBzdXJlIEF0b20gaXMgZ2V0dGluZyAkUEFUSCBjb3JyZWN0bHknXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiByZXF1aXJlKFBhdGguam9pbihDYWNoZS5FU0xJTlRfTE9DQUxfUEFUSCwgJ2xpYicsICdjbGkuanMnKSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaE1vZHVsZXNQYXRoKG1vZHVsZXNEaXIpIHtcbiAgaWYgKENhY2hlLkxBU1RfTU9EVUxFU19QQVRIICE9PSBtb2R1bGVzRGlyKSB7XG4gICAgQ2FjaGUuTEFTVF9NT0RVTEVTX1BBVEggPSBtb2R1bGVzRGlyXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9QQVRIID0gbW9kdWxlc0RpciB8fCAnJ1xuICAgIHJlcXVpcmUoJ21vZHVsZScpLk1vZHVsZS5faW5pdFBhdGhzKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RVNMaW50SW5zdGFuY2UoZmlsZURpciwgY29uZmlnKSB7XG4gIGNvbnN0IG1vZHVsZXNEaXIgPSBQYXRoLmRpcm5hbWUoZmluZENhY2hlZChmaWxlRGlyLCAnbm9kZV9tb2R1bGVzL2VzbGludCcpKVxuICByZWZyZXNoTW9kdWxlc1BhdGgobW9kdWxlc0RpcilcbiAgcmV0dXJuIGdldEVTTGludEZyb21EaXJlY3RvcnkobW9kdWxlc0RpciwgY29uZmlnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZmlnUGF0aChmaWxlRGlyKSB7XG4gIGNvbnN0IGNvbmZpZ0ZpbGUgPVxuICAgIGZpbmRDYWNoZWQoZmlsZURpciwgW1xuICAgICAgJy5lc2xpbnRyYy5qcycsICcuZXNsaW50cmMueWFtbCcsICcuZXNsaW50cmMueW1sJywgJy5lc2xpbnRyYy5qc29uJywgJy5lc2xpbnRyYydcbiAgICBdKVxuICBpZiAoY29uZmlnRmlsZSkge1xuICAgIHJldHVybiBjb25maWdGaWxlXG4gIH1cblxuICBjb25zdCBwYWNrYWdlUGF0aCA9IGZpbmRDYWNoZWQoZmlsZURpciwgJ3BhY2thZ2UuanNvbicpXG4gIGlmIChwYWNrYWdlUGF0aCAmJiBCb29sZWFuKHJlcXVpcmUocGFja2FnZVBhdGgpLmVzbGludENvbmZpZykpIHtcbiAgICByZXR1cm4gcGFja2FnZVBhdGhcbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVsYXRpdmVQYXRoKGZpbGVEaXIsIGZpbGVQYXRoLCBjb25maWcpIHtcbiAgY29uc3QgaWdub3JlRmlsZSA9IGNvbmZpZy5kaXNhYmxlRXNsaW50SWdub3JlID8gbnVsbCA6IGZpbmRDYWNoZWQoZmlsZURpciwgJy5lc2xpbnRpZ25vcmUnKVxuXG4gIGlmIChpZ25vcmVGaWxlKSB7XG4gICAgY29uc3QgaWdub3JlRGlyID0gUGF0aC5kaXJuYW1lKGlnbm9yZUZpbGUpXG4gICAgcHJvY2Vzcy5jaGRpcihpZ25vcmVEaXIpXG4gICAgcmV0dXJuIFBhdGgucmVsYXRpdmUoaWdub3JlRGlyLCBmaWxlUGF0aClcbiAgfVxuICBwcm9jZXNzLmNoZGlyKGZpbGVEaXIpXG4gIHJldHVybiBQYXRoLmJhc2VuYW1lKGZpbGVQYXRoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXJndih0eXBlLCBjb25maWcsIGZpbGVQYXRoLCBmaWxlRGlyLCBnaXZlbkNvbmZpZ1BhdGgpIHtcbiAgbGV0IGNvbmZpZ1BhdGhcbiAgaWYgKGdpdmVuQ29uZmlnUGF0aCA9PT0gbnVsbCkge1xuICAgIGNvbmZpZ1BhdGggPSBjb25maWcuZXNsaW50cmNQYXRoIHx8IG51bGxcbiAgfSBlbHNlIGNvbmZpZ1BhdGggPSBnaXZlbkNvbmZpZ1BhdGhcblxuICBjb25zdCBhcmd2ID0gW1xuICAgIHByb2Nlc3MuZXhlY1BhdGgsXG4gICAgJ2EtYi1jJyAvLyBkdW1teSB2YWx1ZSBmb3IgZXNsaW50IGV4ZWN1dGFibGVcbiAgXVxuICBpZiAodHlwZSA9PT0gJ2xpbnQnKSB7XG4gICAgYXJndi5wdXNoKCctLXN0ZGluJylcbiAgfVxuICBhcmd2LnB1c2goJy0tZm9ybWF0JywgUGF0aC5qb2luKF9fZGlybmFtZSwgJ3JlcG9ydGVyLmpzJykpXG5cbiAgY29uc3QgaWdub3JlRmlsZSA9IGNvbmZpZy5kaXNhYmxlRXNsaW50SWdub3JlID8gbnVsbCA6IGZpbmRDYWNoZWQoZmlsZURpciwgJy5lc2xpbnRpZ25vcmUnKVxuICBpZiAoaWdub3JlRmlsZSkge1xuICAgIGFyZ3YucHVzaCgnLS1pZ25vcmUtcGF0aCcsIGlnbm9yZUZpbGUpXG4gIH1cblxuICBpZiAoY29uZmlnLmVzbGludFJ1bGVzRGlyKSB7XG4gICAgbGV0IHJ1bGVzRGlyID0gcmVzb2x2ZUVudihjb25maWcuZXNsaW50UnVsZXNEaXIpXG4gICAgaWYgKCFQYXRoLmlzQWJzb2x1dGUocnVsZXNEaXIpKSB7XG4gICAgICBydWxlc0RpciA9IGZpbmRDYWNoZWQoZmlsZURpciwgcnVsZXNEaXIpXG4gICAgfVxuICAgIGFyZ3YucHVzaCgnLS1ydWxlc2RpcicsIHJ1bGVzRGlyKVxuICB9XG4gIGlmIChjb25maWdQYXRoKSB7XG4gICAgYXJndi5wdXNoKCctLWNvbmZpZycsIHJlc29sdmVFbnYoY29uZmlnUGF0aCkpXG4gIH1cbiAgaWYgKGNvbmZpZy5kaXNhYmxlRXNsaW50SWdub3JlKSB7XG4gICAgYXJndi5wdXNoKCctLW5vLWlnbm9yZScpXG4gIH1cbiAgaWYgKHR5cGUgPT09ICdsaW50Jykge1xuICAgIGFyZ3YucHVzaCgnLS1zdGRpbi1maWxlbmFtZScsIGZpbGVQYXRoKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdmaXgnKSB7XG4gICAgYXJndi5wdXNoKGZpbGVQYXRoKVxuICAgIGFyZ3YucHVzaCgnLS1maXgnKVxuICB9XG5cbiAgcmV0dXJuIGFyZ3Zcbn1cbiJdfQ==
//# sourceURL=/home/jakob/.atom/packages/linter-eslint/src/worker-helpers.js