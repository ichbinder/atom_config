function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _path = require('path');

var path = _interopRequireWildcard(_path);

'use babel';

describe('The htmlhint provider for Linter', function () {
  var lint = require(path.join('..', 'lib', 'index.js')).provideLinter().lint;

  beforeEach(function () {
    atom.workspace.destroyActivePaneItem();
    waitsForPromise(function () {
      return Promise.all([atom.packages.activatePackage('linter-htmlhint'), atom.packages.activatePackage('language-html')]);
    });
  });

  it('detects invalid coding style in bad.html and report as error', function () {
    waitsForPromise(function () {
      var bad = path.join(__dirname, 'fixtures', 'bad.html');
      return atom.workspace.open(bad).then(function (editor) {
        return lint(editor);
      }).then(function (messages) {
        expect(messages.length).toEqual(1);

        // test only the first error
        expect(messages[0].type).toEqual('error');
        expect(messages[0].text).toEqual('Doctype must be declared first.');
        expect(messages[0].filePath).toMatch(/.+bad\.html$/);
        expect(messages[0].range).toEqual([[0, 0], [0, 13]]);
      });
    });
  });

  it('finds nothing wrong with a valid file (good.html)', function () {
    waitsForPromise(function () {
      var good = path.join(__dirname, 'fixtures', 'good.html');
      return atom.workspace.open(good).then(function (editor) {
        return lint(editor);
      }).then(function (messages) {
        expect(messages.length).toEqual(0);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1odG1saGludC9zcGVjL2xpbnRlci1odG1saGludC1zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O29CQUVzQixNQUFNOztJQUFoQixJQUFJOztBQUZoQixXQUFXLENBQUM7O0FBSVosUUFBUSxDQUFDLGtDQUFrQyxFQUFFLFlBQU07QUFDakQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQzs7QUFFOUUsWUFBVSxDQUFDLFlBQU07QUFDZixRQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDdkMsbUJBQWUsQ0FBQzthQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDVixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FDL0MsQ0FBQztLQUFBLENBQ0gsQ0FBQztHQUNILENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsOERBQThELEVBQUUsWUFBTTtBQUN2RSxtQkFBZSxDQUFDLFlBQU07QUFDcEIsVUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3pELGFBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtlQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7T0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUSxFQUFJO0FBQzVFLGNBQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7QUFHbkMsY0FBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUMsY0FBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUNwRSxjQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNyRCxjQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUN0RCxDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLG1EQUFtRCxFQUFFLFlBQU07QUFDNUQsbUJBQWUsQ0FBQyxZQUFNO0FBQ3BCLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUMzRCxhQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07ZUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO09BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsRUFBSTtBQUM3RSxjQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUNwQyxDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvbGludGVyLWh0bWxoaW50L3NwZWMvbGludGVyLWh0bWxoaW50LXNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuZGVzY3JpYmUoJ1RoZSBodG1saGludCBwcm92aWRlciBmb3IgTGludGVyJywgKCkgPT4ge1xuICBjb25zdCBsaW50ID0gcmVxdWlyZShwYXRoLmpvaW4oJy4uJywgJ2xpYicsICdpbmRleC5qcycpKS5wcm92aWRlTGludGVyKCkubGludDtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBhdG9tLndvcmtzcGFjZS5kZXN0cm95QWN0aXZlUGFuZUl0ZW0oKTtcbiAgICB3YWl0c0ZvclByb21pc2UoKCkgPT5cbiAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2xpbnRlci1odG1saGludCcpLFxuICAgICAgICBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnbGFuZ3VhZ2UtaHRtbCcpXG4gICAgICBdKVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdkZXRlY3RzIGludmFsaWQgY29kaW5nIHN0eWxlIGluIGJhZC5odG1sIGFuZCByZXBvcnQgYXMgZXJyb3InLCAoKSA9PiB7XG4gICAgd2FpdHNGb3JQcm9taXNlKCgpID0+IHtcbiAgICAgIGNvbnN0IGJhZCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICdmaXh0dXJlcycsICdiYWQuaHRtbCcpO1xuICAgICAgcmV0dXJuIGF0b20ud29ya3NwYWNlLm9wZW4oYmFkKS50aGVuKGVkaXRvciA9PiBsaW50KGVkaXRvcikpLnRoZW4obWVzc2FnZXMgPT4ge1xuICAgICAgICBleHBlY3QobWVzc2FnZXMubGVuZ3RoKS50b0VxdWFsKDEpO1xuXG4gICAgICAgIC8vIHRlc3Qgb25seSB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgZXhwZWN0KG1lc3NhZ2VzWzBdLnR5cGUpLnRvRXF1YWwoJ2Vycm9yJyk7XG4gICAgICAgIGV4cGVjdChtZXNzYWdlc1swXS50ZXh0KS50b0VxdWFsKCdEb2N0eXBlIG11c3QgYmUgZGVjbGFyZWQgZmlyc3QuJyk7XG4gICAgICAgIGV4cGVjdChtZXNzYWdlc1swXS5maWxlUGF0aCkudG9NYXRjaCgvLitiYWRcXC5odG1sJC8pO1xuICAgICAgICBleHBlY3QobWVzc2FnZXNbMF0ucmFuZ2UpLnRvRXF1YWwoW1swLCAwXSwgWzAsIDEzXV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdmaW5kcyBub3RoaW5nIHdyb25nIHdpdGggYSB2YWxpZCBmaWxlIChnb29kLmh0bWwpJywgKCkgPT4ge1xuICAgIHdhaXRzRm9yUHJvbWlzZSgoKSA9PiB7XG4gICAgICBjb25zdCBnb29kID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ2ZpeHR1cmVzJywgJ2dvb2QuaHRtbCcpO1xuICAgICAgcmV0dXJuIGF0b20ud29ya3NwYWNlLm9wZW4oZ29vZCkudGhlbihlZGl0b3IgPT4gbGludChlZGl0b3IpKS50aGVuKG1lc3NhZ2VzID0+IHtcbiAgICAgICAgZXhwZWN0KG1lc3NhZ2VzLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19
//# sourceURL=/home/jakob/.atom/packages/linter-htmlhint/spec/linter-htmlhint-spec.js
