(function() {
  var $, GitTimeplot, GitTimeplotPopup, RevisionView, View, d3, moment, _, _ref;

  _ref = require("atom-space-pen-views"), $ = _ref.$, View = _ref.View;

  _ = require('underscore-plus');

  moment = require('moment');

  d3 = require('d3');

  GitTimeplotPopup = require('./git-timeplot-popup');

  RevisionView = require('./git-revision-view');

  module.exports = GitTimeplot = (function() {
    function GitTimeplot(element) {
      this.element = element;
      this.$element = $(this.element);
      this._debouncedRenderPopup = _.debounce(this._renderPopup, 50);
      this._debouncedHidePopup = _.debounce(this._hidePopup, 50);
      this._debouncedViewNearestRevision = _.debounce(this._viewNearestRevision, 100);
    }

    GitTimeplot.prototype.hide = function() {
      var _ref1;
      return (_ref1 = this.popup) != null ? _ref1.remove() : void 0;
    };

    GitTimeplot.prototype.show = function() {};

    GitTimeplot.prototype.render = function(editor, commitData) {
      var svg, _ref1;
      this.editor = editor;
      this.commitData = commitData;
      if ((_ref1 = this.popup) != null) {
        _ref1.remove();
      }
      this.file = this.editor.getPath();
      this.$timeplot = this.$element.find('.timeplot');
      if (this.$timeplot.length <= 0) {
        this.$timeplot = $("<div class='timeplot'>");
        this.$element.append(this.$timeplot);
      }
      if (this.commitData.length <= 0) {
        this.$timeplot.html("<div class='placeholder'>No commits, nothing to see here.</div>");
        return;
      }
      svg = d3.select(this.$timeplot.get(0)).append("svg").attr("width", this.$element.width()).attr("height", 100);
      this._renderAxis(svg);
      this._renderBlobs(svg);
      this._renderHoverMarker();
      return this.$timeplot;
    };

    GitTimeplot.prototype._renderAxis = function(svg) {
      var h, left_pad, maxDate, maxHour, minDate, minHour, pad, w, xAxis, yAxis;
      w = this.$element.width();
      h = 100;
      left_pad = 20;
      pad = 20;
      minDate = moment.unix(this.commitData[this.commitData.length - 1].authorDate).toDate();
      maxDate = moment.unix(this.commitData[0].authorDate).toDate();
      minHour = d3.min(this.commitData.map(function(d) {
        return moment.unix(d.authorDate).hour();
      }));
      maxHour = d3.max(this.commitData.map(function(d) {
        return moment.unix(d.authorDate).hour();
      }));
      this.x = d3.time.scale().domain([minDate, maxDate]).range([left_pad, w - pad]);
      this.y = d3.scale.linear().domain([minHour, maxHour]).range([10, h - pad * 2]);
      xAxis = d3.svg.axis().scale(this.x).orient("bottom");
      yAxis = d3.svg.axis().scale(this.y).orient("left").ticks(0);
      svg.append("g").attr("class", "axis").attr("transform", "translate(0, " + (h - pad) + ")").call(xAxis);
      return svg.append("g").attr("class", "axis").attr("transform", "translate(" + (left_pad - pad) + ", 0)").call(yAxis);
    };

    GitTimeplot.prototype._renderBlobs = function(svg) {
      var max_r, r;
      max_r = d3.max(this.commitData.map(function(d) {
        return d.linesAdded + d.linesDeleted;
      }));
      r = d3.scale.linear().domain([0, max_r]).range([3, 15]);
      return svg.selectAll("circle").data(this.commitData).enter().append("circle").attr("class", "circle").attr("cx", (function(_this) {
        return function(d) {
          return _this.x(moment.unix(d.authorDate).toDate());
        };
      })(this)).attr("cy", (function(_this) {
        return function(d) {
          return _this.y(moment.unix(d.authorDate).hour());
        };
      })(this)).transition().duration(500).attr("r", function(d) {
        return r(d.linesAdded + d.linesDeleted || 0);
      });
    };

    GitTimeplot.prototype._renderHoverMarker = function() {
      var _this;
      this.$hoverMarker = this.$element.find('.hover-marker');
      if (!(this.$hoverMarker.length > 0)) {
        this.$hoverMarker = $("<div class='hover-marker'>");
        this.$element.append(this.$hoverMarker);
      }
      _this = this;
      this.$element.mouseenter(function(e) {
        return _this._onMouseenter(e);
      });
      this.$element.mousemove(function(e) {
        return _this._onMousemove(e);
      });
      this.$element.mouseleave(function(e) {
        return _this._onMouseleave(e);
      });
      this.$element.mousedown(function(e) {
        return _this._onMousedown(e);
      });
      return this.$element.mouseup(function(e) {
        return _this._onMouseup(e);
      });
    };

    GitTimeplot.prototype._onMouseenter = function(evt) {
      return this.isMouseInElement = true;
    };

    GitTimeplot.prototype._onMousemove = function(evt) {
      var relativeX;
      relativeX = evt.clientX - this.$element.offset().left;
      if (relativeX < this.$hoverMarker.offset().left) {
        this.$hoverMarker.css('left', relativeX);
      } else {
        this.$hoverMarker.css('left', relativeX - this.$hoverMarker.width());
      }
      if (this.isMouseDown) {
        this._hidePopup({
          force: true
        });
        return this._debouncedViewNearestRevision();
      } else {
        return this._debouncedRenderPopup();
      }
    };

    GitTimeplot.prototype._onMouseleave = function(evt) {
      this.isMouseInElement = false;
      this._debouncedHidePopup();
      return this.isMouseDown = false;
    };

    GitTimeplot.prototype._onMousedown = function(evt) {
      this.isMouseDown = true;
      this._hidePopup({
        force: true
      });
      return this._debouncedViewNearestRevision();
    };

    GitTimeplot.prototype._onMouseup = function(evt) {
      return this.isMouseDown = false;
    };

    GitTimeplot.prototype._renderPopup = function() {
      var commits, end, left, start, _ref1, _ref2, _ref3;
      if ((_ref1 = this.popup) != null ? _ref1.isMouseInPopup() : void 0) {
        left = this.popup.offset().left - this.$element.offset().left;
        if (this._popupRightAligned) {
          left += this.popup.width() + 7;
        }
        this.$hoverMarker.css({
          'left': left
        });
        return;
      }
      if (!this.isMouseInElement) {
        return;
      }
      if ((_ref2 = this.popup) != null) {
        _ref2.hide().remove();
      }
      _ref3 = this._filterCommitData(this.commitData), commits = _ref3[0], start = _ref3[1], end = _ref3[2];
      this.popup = new GitTimeplotPopup(commits, this.editor, start, end);
      left = this.$hoverMarker.offset().left;
      if (left + this.popup.outerWidth() + 10 > this.$element.offset().left + this.$element.width()) {
        this._popupRightAligned = true;
        left -= this.popup.width() + 7;
      } else {
        this._popupRightAligned = false;
      }
      return this.popup.css({
        left: left,
        top: this.$element.offset().top - this.popup.height() - 10
      });
    };

    GitTimeplot.prototype._hidePopup = function(options) {
      var _ref1, _ref2;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        force: false
      });
      if (!options.force && (((_ref1 = this.popup) != null ? _ref1.isMouseInPopup() : void 0) || this.isMouseInElement)) {
        return;
      }
      return (_ref2 = this.popup) != null ? _ref2.hide().remove() : void 0;
    };

    GitTimeplot.prototype._filterCommitData = function() {
      var commits, left, relativeLeft, tEnd, tStart;
      left = this.$hoverMarker.offset().left;
      relativeLeft = left - this.$element.offset().left - 5;
      tStart = moment(this.x.invert(relativeLeft)).startOf('hour').subtract(1, 'minute');
      tEnd = moment(this.x.invert(relativeLeft + 10)).endOf('hour').add(1, 'minute');
      commits = _.filter(this.commitData, function(c) {
        return moment.unix(c.authorDate).isBetween(tStart, tEnd);
      });
      return [commits, tStart, tEnd];
    };

    GitTimeplot.prototype._getNearestCommit = function() {
      var filteredCommitData, tEnd, tStart, _ref1;
      _ref1 = this._filterCommitData(), filteredCommitData = _ref1[0], tStart = _ref1[1], tEnd = _ref1[2];
      if ((filteredCommitData != null ? filteredCommitData.length : void 0) > 0) {
        return filteredCommitData[0];
      } else {
        return _.find(this.commitData, function(c) {
          return moment.unix(c.authorDate).isBefore(tEnd);
        });
      }
    };

    GitTimeplot.prototype._viewNearestRevision = function() {
      var nearestCommit;
      nearestCommit = this._getNearestCommit();
      if (nearestCommit != null) {
        return RevisionView.showRevision(this.editor, nearestCommit.hash);
      }
    };

    return GitTimeplot;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LXRpbWUtbWFjaGluZS9saWIvZ2l0LXRpbWVwbG90LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSx5RUFBQTs7QUFBQSxFQUFBLE9BQVksT0FBQSxDQUFRLHNCQUFSLENBQVosRUFBQyxTQUFBLENBQUQsRUFBSSxZQUFBLElBQUosQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FESixDQUFBOztBQUFBLEVBRUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBRlQsQ0FBQTs7QUFBQSxFQUdBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUhMLENBQUE7O0FBQUEsRUFLQSxnQkFBQSxHQUFtQixPQUFBLENBQVEsc0JBQVIsQ0FMbkIsQ0FBQTs7QUFBQSxFQU1BLFlBQUEsR0FBZSxPQUFBLENBQVEscUJBQVIsQ0FOZixDQUFBOztBQUFBLEVBVUEsTUFBTSxDQUFDLE9BQVAsR0FBdUI7QUFFUixJQUFBLHFCQUFFLE9BQUYsR0FBQTtBQUNYLE1BRFksSUFBQyxDQUFBLFVBQUEsT0FDYixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsUUFBRCxHQUFZLENBQUEsQ0FBRSxJQUFDLENBQUEsT0FBSCxDQUFaLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxxQkFBRCxHQUF5QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxZQUFaLEVBQTBCLEVBQTFCLENBRHpCLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxtQkFBRCxHQUF1QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxVQUFaLEVBQXdCLEVBQXhCLENBRnZCLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSw2QkFBRCxHQUFpQyxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMs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

//# sourceURL=/home/jakob/.atom/packages/git-time-machine/lib/git-timeplot.coffee