(function() {
  module.exports = {
    config: {
      preview: {
        type: 'string',
        "default": 'The Quick brown fox { 0 !== "O" }'
      },
      fontFamily: {
        description: 'Use one of the fonts available in this package.',
        type: 'string',
        "default": 'Source Code Pro',
        "enum": ['Anka/Coder', 'Anonymous Pro', 'Aurulent Sans Mono', 'Average Mono', 'BPmono', 'Bitstream Vera Sans Mono', 'CamingoCode', 'Code New Roman', 'Consolamono', 'Cousine', 'Cutive Mono', 'DejaVu Mono', 'Droid Sans Mono', 'Effects Eighty', 'Fantasque Sans Mono', 'Fifteen', 'Fira Mono', 'FiraCode', 'Fixedsys', 'Fixedsys Ligatures', 'GNU Freefont', 'GNU Unifont', 'Generic Mono', 'Gohufont 11', 'Gohufont 14', 'Hack', 'Hasklig', 'Hermit Light', 'Hermit', 'Inconsolata', 'Inconsolata-g', 'Iosevka', 'Iosevka Thin', 'Iosevka Light', 'Iosevka Extra Light', 'Iosevka Medium', 'Latin Modern Mono Light', 'Latin Modern Mono', 'Lekton', 'Liberation Mono', 'Luxi Mono', 'M+ Light', 'M+ Medium', 'M+ Thin', 'M+', 'Meslo', 'Monofur', 'Monoid', 'Mononoki', 'NotCourierSans', 'Nova Mono', 'Office Code Pro', 'Office Code Pro Light', 'Office Code Pro Medium', 'Oxygen Mono', 'PT Mono', 'Profont', 'Proggy Clean', 'Quinze', 'Roboto Mono', 'Roboto Mono Light', 'Roboto Mono Thin', 'Roboto Mono Medium', 'Share Tech Mono', 'SK Modernist', 'Source Code Pro Extra Light', 'Source Code Pro Light', 'Source Code Pro Medium', 'Source Code Pro', 'Sudo', 'TeX Gyre Cursor', 'Ubuntu Mono', 'VT323', 'Verily Serif Mono', 'saxMono']
      }
    },
    activate: function(state) {
      return atom.packages.onDidActivateInitialPackages(function() {
        var Runner;
        Runner = require('./runner');
        return Runner.run();
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZm9udHMvbGliL2ZvbnRzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUVFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxtQ0FEVDtPQURGO0FBQUEsTUFHQSxVQUFBLEVBQ0U7QUFBQSxRQUFBLFdBQUEsRUFBYSxpREFBYjtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxpQkFGVDtBQUFBLFFBR0EsTUFBQSxFQUFNLENBQ0osWUFESSxFQUVKLGVBRkksRUFHSixvQkFISSxFQUlKLGNBSkksRUFLSixRQUxJLEVBTUosMEJBTkksRUFPSixhQVBJLEVBUUosZ0JBUkksRUFTSixhQVRJLEVBVUosU0FWSSxFQVdKLGFBWEksRUFZSixhQVpJLEVBYUosaUJBYkksRUFjSixnQkFkSSxFQWVKLHFCQWZJLEVBZ0JKLFNBaEJJLEVBaUJKLFdBakJJLEVBa0JKLFVBbEJJLEVBbUJKLFVBbkJJLEVBb0JKLG9CQXBCSSxFQXFCSixjQXJCSSxFQXNCSixhQXRCSSxFQXVCSixjQXZCSSxFQXdCSixhQXhCSSxFQXlCSixhQXpCSSxFQTBCSixNQTFCSSxFQTJCSixTQTNCSSxFQTRCSixjQTVCSSxFQTZCSixRQTdCSSxFQThCSixhQTlCSSxFQStCSixlQS9CSSxFQWdDSixTQWhDSSxFQWlDSixjQWpDSSxFQWtDSixlQWxDSSxFQW1DSixxQkFuQ0ksRUFvQ0osZ0JBcENJLEVBcUNKLHlCQXJDSSxFQXNDSixtQkF0Q0ksRUF1Q0osUUF2Q0ksRUF3Q0osaUJBeENJLEVBeUNKLFdBekNJLEVBMENKLFVBMUNJLEVBMkNKLFdBM0NJLEVBNENKLFNBNUNJLEVBNkNKLElBN0NJLEVBOENKLE9BOUNJLEVBK0NKLFNBL0NJLEVBZ0RKLFFBaERJLEVBaURKLFVBakRJLEVBa0RKLGdCQWxESSxFQW1ESixXQW5ESSxFQW9ESixpQkFwREksRUFxREosdUJBckRJLEVBc0RKLHdCQXRESSxFQXVESixhQXZESSxFQXdESixTQXhESSxFQXlESixTQXpESSxFQTBESixjQTFESSxFQTJESixRQTNESSxFQTRESixhQTVESSxFQTZESixtQkE3REksRUE4REosa0JBOURJLEVBK0RKLG9CQS9ESSxFQWdFSixpQkFoRUksRUFpRUosY0FqRUksRUFrRUosNkJBbEVJLEVBbUVKLHVCQW5FSSxFQW9FSix3QkFwRUksRUFxRUosaUJBckVJLEVBc0VKLE1BdEVJLEVBdUVKLGlCQXZFSSxFQXdFSixhQXhFSSxFQXlFSixPQXpFSSxFQTBFSixtQkExRUksRUEyRUosU0EzRUksQ0FITjtPQUpGO0tBREY7QUFBQSxJQXNGQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7YUFHUixJQUFJLENBQUMsUUFBUSxDQUFDLDRCQUFkLENBQTJDLFNBQUEsR0FBQTtBQUN6QyxZQUFBLE1BQUE7QUFBQSxRQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsVUFBUixDQUFULENBQUE7ZUFDQSxNQUFNLENBQUMsR0FBUCxDQUFBLEVBRnlDO01BQUEsQ0FBM0MsRUFIUTtJQUFBLENBdEZWO0dBRkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/jakob/.atom/packages/fonts/lib/fonts.coffee
