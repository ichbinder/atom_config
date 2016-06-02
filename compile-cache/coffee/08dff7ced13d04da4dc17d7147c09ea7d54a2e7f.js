(function() {
  var GitLog, expectedCommits, fs, path;

  GitLog = require('git-log-utils');

  fs = require('fs');

  path = require('path');

  expectedCommits = require('./test-data/fiveCommitsExpected');

  describe("GitLogUtils", function() {
    return describe("when loading file history for known file in git", function() {
      beforeEach(function() {
        var projectRoot, testFileName;
        this.addMatchers({
          toHaveKnownValues: function(expected) {
            var key, matches, messages, pass, value;
            pass = true;
            messages = "";
            for (key in expected) {
              value = expected[key];
              matches = this.actual[key] === value;
              if (!matches) {
                if (pass) {
                  messages += "Commit " + this.actual.hash + ": ";
                } else {
                  messages += "; ";
                }
                messages += "" + key + " expected: " + value + " actual: " + this.actual[key];
                pass = false;
              }
            }
            if (pass) {
              this.message = function() {
                return "Expected commit " + this.actual.hash + " to not equal " + (JSON.stringify(this.expected));
              };
            } else {
              this.message = function() {
                return messages;
              };
            }
            return pass;
          }
        });
        projectRoot = __dirname;
        testFileName = path.join(projectRoot, 'test-data', 'fiveCommits.txt');
        return this.testdata = GitLog.getCommitHistory(testFileName);
      });
      it("should have 5 commits", function() {
        return expect(this.testdata.length).toEqual(5);
      });
      return it("first 5 commits should match last known good", function() {
        var actualCommit, expectedCommit, index, _i, _len, _results;
        _results = [];
        for (index = _i = 0, _len = expectedCommits.length; _i < _len; index = ++_i) {
          expectedCommit = expectedCommits[index];
          actualCommit = this.testdata[index];
          _results.push(expect(actualCommit).toHaveKnownValues(expectedCommit));
        }
        return _results;
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXRpbWUtbWFjaGluZS9zcGVjL2dpdC11dGlscy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSxpQ0FBQTs7QUFBQSxFQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsZUFBUixDQUFULENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FETCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUlBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLGlDQUFSLENBSmxCLENBQUE7O0FBQUEsRUFNQSxRQUFBLENBQVMsYUFBVCxFQUF3QixTQUFBLEdBQUE7V0FDdEIsUUFBQSxDQUFTLGlEQUFULEVBQTRELFNBQUEsR0FBQTtBQUMxRCxNQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxZQUFBLHlCQUFBO0FBQUEsUUFBQSxJQUFDLENBQUEsV0FBRCxDQUFhO0FBQUEsVUFBQSxpQkFBQSxFQUFtQixTQUFDLFFBQUQsR0FBQTtBQUM5QixnQkFBQSxtQ0FBQTtBQUFBLFlBQUEsSUFBQSxHQUFPLElBQVAsQ0FBQTtBQUFBLFlBQ0EsUUFBQSxHQUFXLEVBRFgsQ0FBQTtBQUVBLGlCQUFBLGVBQUE7b0NBQUE7QUFDRSxjQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsTUFBTyxDQUFBLEdBQUEsQ0FBUixLQUFnQixLQUExQixDQUFBO0FBQ0EsY0FBQSxJQUFBLENBQUEsT0FBQTtBQUNFLGdCQUFBLElBQUcsSUFBSDtBQUNFLGtCQUFBLFFBQUEsSUFBYSxTQUFBLEdBQVMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFqQixHQUFzQixJQUFuQyxDQURGO2lCQUFBLE1BQUE7QUFHRSxrQkFBQSxRQUFBLElBQVksSUFBWixDQUhGO2lCQUFBO0FBQUEsZ0JBSUEsUUFBQSxJQUFZLEVBQUEsR0FBRyxHQUFILEdBQU8sYUFBUCxHQUFvQixLQUFwQixHQUEwQixXQUExQixHQUFxQyxJQUFDLENBQUEsTUFBTyxDQUFBLEdBQUEsQ0FKekQsQ0FBQTtBQUFBLGdCQUtBLElBQUEsR0FBTyxLQUxQLENBREY7ZUFGRjtBQUFBLGFBRkE7QUFXQSxZQUFBLElBQUcsSUFBSDtBQUNFLGNBQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxTQUFBLEdBQUE7dUJBQUksa0JBQUEsR0FBa0IsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUExQixHQUErQixnQkFBL0IsR0FBOEMsQ0FBQyxJQUFJLENBQUMsU0FBTCxDQUFlLElBQUMsQ0FBQSxRQUFoQixDQUFELEVBQWxEO2NBQUEsQ0FBWCxDQURGO2FBQUEsTUFBQTtBQUdFLGNBQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxTQUFBLEdBQUE7dUJBQUcsU0FBSDtjQUFBLENBQVgsQ0FIRjthQVhBO0FBZUEsbUJBQU8sSUFBUCxDQWhCOEI7VUFBQSxDQUFuQjtTQUFiLENBQUEsQ0FBQTtBQUFBLFFBa0JBLFdBQUEsR0FBYyxTQWxCZCxDQUFBO0FBQUEsUUFtQkEsWUFBQSxHQUFlLElBQUksQ0FBQyxJQUFMLENBQVUsV0FBVixFQUF1QixXQUF2QixFQUFvQyxpQkFBcEMsQ0FuQmYsQ0FBQTtlQW9CQSxJQUFDLENBQUEsUUFBRCxHQUFZLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixZQUF4QixFQXJCSDtNQUFBLENBQVgsQ0FBQSxDQUFBO0FBQUEsTUF3QkEsRUFBQSxDQUFHLHVCQUFILEVBQTRCLFNBQUEsR0FBQTtlQUMxQixNQUFBLENBQU8sSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFqQixDQUF3QixDQUFDLE9BQXpCLENBQWlDLENBQWpDLEVBRDBCO01BQUEsQ0FBNUIsQ0F4QkEsQ0FBQTthQTRCQSxFQUFBLENBQUcsOENBQUgsRUFBbUQsU0FBQSxHQUFBO0FBQ2pELFlBQUEsdURBQUE7QUFBQTthQUFBLHNFQUFBO2tEQUFBO0FBQ0UsVUFBQSxZQUFBLEdBQWUsSUFBQyxDQUFBLFFBQVMsQ0FBQSxLQUFBLENBQXpCLENBQUE7QUFBQSx3QkFDQSxNQUFBLENBQU8sWUFBUCxDQUFvQixDQUFDLGlCQUFyQixDQUF1QyxjQUF2QyxFQURBLENBREY7QUFBQTt3QkFEaUQ7TUFBQSxDQUFuRCxFQTdCMEQ7SUFBQSxDQUE1RCxFQURzQjtFQUFBLENBQXhCLENBTkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/jakob/.atom/packages/git-time-machine/spec/git-utils-spec.coffee
