/** @babel */
/* eslint-env jasmine, atomtest */

/*
	This file contains an informational output for the developer, help getting a
	performance-awareness.
*/

describe('editorconfig', function () {
	beforeEach(function () {
		waitsForPromise(function () {
			return atom.packages.activatePackage('editorconfig');
		});
	});

	it('should have been loaded fine', function () {
		var pack = atom.packages.getLoadedPackage('editorconfig');

		expect(pack).not.toBeUndefined();
		if (typeof pack !== 'undefined') {
			console.info('The package took ' + pack.loadTime + 'ms to load and ' + pack.activateTime + 'ms to activate.');
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL2VkaXRvcmNvbmZpZy9zcGVjL2JlbmNobWFyay1zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBUUEsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFNO0FBQzlCLFdBQVUsQ0FBQyxZQUFNO0FBQ2hCLGlCQUFlLENBQUM7VUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUM7R0FBQSxDQUFDLENBQUM7RUFDckUsQ0FBQyxDQUFDOztBQUVILEdBQUUsQ0FBQyw4QkFBOEIsRUFBRSxZQUFNO0FBQ3hDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRTVELFFBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDakMsTUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7QUFDaEMsVUFBTyxDQUFDLElBQUksdUJBQXFCLElBQUksQ0FBQyxRQUFRLHVCQUMzQyxJQUFJLENBQUMsWUFBWSxxQkFBa0IsQ0FBQztHQUN2QztFQUNELENBQUMsQ0FBQztDQUNILENBQUMsQ0FBQyIsImZpbGUiOiIvaG9tZS9qYWtvYi8uYXRvbS9wYWNrYWdlcy9lZGl0b3Jjb25maWcvc3BlYy9iZW5jaG1hcmstc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAYmFiZWwgKi9cbi8qIGVzbGludC1lbnYgamFzbWluZSwgYXRvbXRlc3QgKi9cblxuLypcblx0VGhpcyBmaWxlIGNvbnRhaW5zIGFuIGluZm9ybWF0aW9uYWwgb3V0cHV0IGZvciB0aGUgZGV2ZWxvcGVyLCBoZWxwIGdldHRpbmcgYVxuXHRwZXJmb3JtYW5jZS1hd2FyZW5lc3MuXG4qL1xuXG5kZXNjcmliZSgnZWRpdG9yY29uZmlnJywgKCkgPT4ge1xuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHR3YWl0c0ZvclByb21pc2UoKCkgPT4gYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2VkaXRvcmNvbmZpZycpKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBoYXZlIGJlZW4gbG9hZGVkIGZpbmUnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcGFjayA9IGF0b20ucGFja2FnZXMuZ2V0TG9hZGVkUGFja2FnZSgnZWRpdG9yY29uZmlnJyk7XG5cblx0XHRleHBlY3QocGFjaykubm90LnRvQmVVbmRlZmluZWQoKTtcblx0XHRpZiAodHlwZW9mIHBhY2sgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRjb25zb2xlLmluZm8oYFRoZSBwYWNrYWdlIHRvb2sgJHtwYWNrLmxvYWRUaW1lfW1zIHRvIGxvYWQgXFxcbmFuZCAke3BhY2suYWN0aXZhdGVUaW1lfW1zIHRvIGFjdGl2YXRlLmApO1xuXHRcdH1cblx0fSk7XG59KTtcbiJdfQ==
//# sourceURL=/home/jakob/.atom/packages/editorconfig/spec/benchmark-spec.js
