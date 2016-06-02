(function() {
  var RemoteListView, git, options, pullBeforePush, remotes, repo;

  git = require('../../lib/git');

  RemoteListView = require('../../lib/views/remote-list-view');

  repo = require('../fixtures').repo;

  options = {
    cwd: repo.getWorkingDirectory()
  };

  remotes = "remote1\nremote2";

  pullBeforePush = 'git-plus.pullBeforePush';

  describe("RemoteListView", function() {
    it("displays a list of remotes", function() {
      var view;
      view = new RemoteListView(repo, remotes, {
        mode: 'pull'
      });
      return expect(view.items.length).toBe(2);
    });
    describe("when mode is pull", function() {
      return it("it calls git.cmd to get the remote branches", function() {
        var view;
        view = new RemoteListView(repo, remotes, {
          mode: 'pull'
        });
        spyOn(git, 'cmd').andCallFake(function() {
          return Promise.resolve('branch1\nbranch2');
        });
        view.confirmSelection();
        waitsFor(function() {
          return git.cmd.callCount > 0;
        });
        return runs(function() {
          return expect(git.cmd).toHaveBeenCalledWith(['branch', '-r'], options);
        });
      });
    });
    describe("when mode is fetch", function() {
      return it("it calls git.cmd to with ['fetch'] and the remote name", function() {
        var view;
        spyOn(git, 'cmd').andCallFake(function() {
          return Promise.resolve('fetched stuff');
        });
        view = new RemoteListView(repo, remotes, {
          mode: 'fetch'
        });
        view.confirmSelection();
        waitsFor(function() {
          return git.cmd.callCount > 0;
        });
        return runs(function() {
          return expect(git.cmd).toHaveBeenCalledWith(['fetch', 'remote1'], options);
        });
      });
    });
    describe("when mode is fetch-prune", function() {
      return it("it calls git.cmd to with ['fetch', '--prune'] and the remote name", function() {
        var view;
        spyOn(git, 'cmd').andCallFake(function() {
          return Promise.resolve('fetched stuff');
        });
        view = new RemoteListView(repo, remotes, {
          mode: 'fetch-prune'
        });
        view.confirmSelection();
        waitsFor(function() {
          return git.cmd.callCount > 0;
        });
        return runs(function() {
          return expect(git.cmd).toHaveBeenCalledWith(['fetch', '--prune', 'remote1'], options);
        });
      });
    });
    describe("when mode is push", function() {
      return it("calls git.cmd with ['push']", function() {
        var view;
        spyOn(git, 'cmd').andReturn(Promise.resolve('pushing text'));
        view = new RemoteListView(repo, remotes, {
          mode: 'push'
        });
        view.confirmSelection();
        waitsFor(function() {
          return git.cmd.callCount > 1;
        });
        return runs(function() {
          return expect(git.cmd).toHaveBeenCalledWith(['push', 'remote1'], options);
        });
      });
    });
    return describe("when mode is push and there is no upstream set", function() {
      it("calls git.cmd with ['push', '-u'] and remote name", function() {
        var view;
        atom.config.set(pullBeforePush, 'no');
        spyOn(git, 'cmd').andCallFake(function() {
          if (git.cmd.callCount === 1) {
            return Promise.reject('no upstream');
          } else {
            return Promise.resolve('pushing text');
          }
        });
        view = new RemoteListView(repo, remotes, {
          mode: 'push'
        });
        view.confirmSelection();
        waitsFor(function() {
          return git.cmd.callCount > 1;
        });
        return runs(function() {
          return expect(git.cmd).toHaveBeenCalledWith(['push', '-u', 'remote1', 'HEAD'], options);
        });
      });
      describe("when the the config for pull before push is set to true", function() {
        return it("calls git.cmd with ['pull'], remote name, and branch name and then with ['push']", function() {
          var view;
          spyOn(git, 'cmd').andReturn(Promise.resolve('branch1'));
          atom.config.set(pullBeforePush, 'pull');
          view = new RemoteListView(repo, remotes, {
            mode: 'push'
          });
          view.confirmSelection();
          waitsFor(function() {
            return git.cmd.callCount > 2;
          });
          return runs(function() {
            expect(git.cmd).toHaveBeenCalledWith(['pull', 'remote1', 'branch1'], options);
            return expect(git.cmd).toHaveBeenCalledWith(['push', 'remote1'], options);
          });
        });
      });
      return describe("when the the config for pull before push is set to 'Pull --rebase'", function() {
        return it("calls git.cmd with ['pull', '--rebase'], remote name, and branch name and then with ['push']", function() {
          var view;
          spyOn(git, 'cmd').andReturn(Promise.resolve('branch1'));
          atom.config.set(pullBeforePush, 'pull --rebase');
          view = new RemoteListView(repo, remotes, {
            mode: 'push'
          });
          view.confirmSelection();
          waitsFor(function() {
            return git.cmd.callCount > 2;
          });
          return runs(function() {
            expect(git.cmd).toHaveBeenCalledWith(['pull', '--rebase', 'remote1', 'branch1'], options);
            return expect(git.cmd).toHaveBeenCalledWith(['push', 'remote1'], options);
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXBsdXMvc3BlYy92aWV3cy9yZW1vdGUtbGlzdC12aWV3LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJEQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxlQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLGtDQUFSLENBRGpCLENBQUE7O0FBQUEsRUFFQyxPQUFRLE9BQUEsQ0FBUSxhQUFSLEVBQVIsSUFGRCxDQUFBOztBQUFBLEVBR0EsT0FBQSxHQUFVO0FBQUEsSUFBQyxHQUFBLEVBQUssSUFBSSxDQUFDLG1CQUFMLENBQUEsQ0FBTjtHQUhWLENBQUE7O0FBQUEsRUFJQSxPQUFBLEdBQVUsa0JBSlYsQ0FBQTs7QUFBQSxFQUtBLGNBQUEsR0FBaUIseUJBTGpCLENBQUE7O0FBQUEsRUFPQSxRQUFBLENBQVMsZ0JBQVQsRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLElBQUEsRUFBQSxDQUFHLDRCQUFILEVBQWlDLFNBQUEsR0FBQTtBQUMvQixVQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsR0FBVyxJQUFBLGNBQUEsQ0FBZSxJQUFmLEVBQXFCLE9BQXJCLEVBQThCO0FBQUEsUUFBQSxJQUFBLEVBQU0sTUFBTjtPQUE5QixDQUFYLENBQUE7YUFDQSxNQUFBLENBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFsQixDQUF5QixDQUFDLElBQTFCLENBQStCLENBQS9CLEVBRitCO0lBQUEsQ0FBakMsQ0FBQSxDQUFBO0FBQUEsSUFJQSxRQUFBLENBQVMsbUJBQVQsRUFBOEIsU0FBQSxHQUFBO2FBQzVCLEVBQUEsQ0FBRyw2Q0FBSCxFQUFrRCxTQUFBLEdBQUE7QUFDaEQsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdB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

//# sourceURL=/home/jakob/.atom/packages/git-plus/spec/views/remote-list-view-spec.coffee
