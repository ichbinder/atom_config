
/*
 * Modifierhandling shamelessly stolen and customized from brackets:
 * https://github.com/adobe/brackets/blob/master/src/command/KeyBindingManager.js
 */

(function() {
  var KeyEvent, ModifierStateHandler;

  KeyEvent = require('./key-event');

  module.exports = ModifierStateHandler = (function() {

    /**
     * States of Ctrl key down detection
     * @enum {number}
     */
    var LINUX_ALTGR_IDENTIFIER;

    ModifierStateHandler.prototype.CtrlDownStates = {
      'NOT_YET_DETECTED': 0,
      'DETECTED': 1,
      'DETECTED_AND_IGNORED': 2
    };


    /**
     * Flags used to determine whether right Alt key is pressed. When it is pressed,
     * the following two keydown events are triggered in that specific order.
     *
     *    1. ctrlDown - flag used to record { ctrlKey: true, keyIdentifier: "Control", ... } keydown event
     *    2. altGrDown - flag used to record { ctrlKey: true, altKey: true, keyIdentifier: "Alt", ... } keydown event
     *
     * @type {CtrlDownStates|boolean}
     */

    ModifierStateHandler.prototype.ctrlDown = 0;

    ModifierStateHandler.prototype.altGrDown = false;

    ModifierStateHandler.prototype.hasShift = false;

    ModifierStateHandler.prototype.hasCtrl = false;

    ModifierStateHandler.prototype.hasAltGr = false;

    ModifierStateHandler.prototype.hasAlt = false;

    ModifierStateHandler.prototype.hasCmd = false;


    /**
     * Constant used for checking the interval between Control keydown event and Alt keydown event.
     * If the right Alt key is down we get Control keydown followed by Alt keydown within 30 ms. if
     * the user is pressing Control key and then Alt key, the interval will be larger than 30 ms.
     * @type {number}
     */

    ModifierStateHandler.prototype.MAX_INTERVAL_FOR_CTRL_ALT_KEYS = 30;


    /**
     * Constant used for identifying AltGr on Linux
     * @type {String}
     */

    LINUX_ALTGR_IDENTIFIER = 'U+00E1';


    /**
     * Used to record the timeStamp property of the last keydown event.
     * @type {number}
     */

    ModifierStateHandler.prototype.lastTimeStamp = null;


    /**
     * Used to record the keyIdentifier property of the last keydown event.
     * @type {string}
     */

    ModifierStateHandler.prototype.lastKeyIdentifier = null;


    /**
     * clear modifiers listener on editor blur and focus
     * @type {event}
     */

    ModifierStateHandler.prototype.clearModifierStateListener = null;

    function ModifierStateHandler() {
      this.clearModifierStateListener = (function(_this) {
        return function() {
          return _this.clearModifierState();
        };
      })(this);
      window.addEventListener('blur', this.clearModifierStateListener);
      window.addEventListener('focus', this.clearModifierStateListener);
    }

    ModifierStateHandler.prototype.destroy = function() {
      window.removeEventListener('blur', this.clearModifierStateListener);
      return window.removeEventListener('focus', this.clearModifierStateListener);
    };

    ModifierStateHandler.prototype.clearModifierState = function() {
      if (process.platform === 'win32') {
        this.quitAltGrMode();
      }
      this.hasShift = false;
      this.hasCtrl = false;
      this.hasAltGr = false;
      this.hasAlt = false;
      return this.hasCmd = false;
    };


    /**
     * Resets all the flags.
     */

    ModifierStateHandler.prototype.quitAltGrMode = function() {
      this.ctrlDown = this.CtrlDownStates.NOT_YET_DETECTED;
      this.altGrDown = false;
      this.hasAltGr = false;
      this.lastTimeStamp = null;
      return this.lastKeyIdentifier = null;
    };


    /**
     * Detects the release of AltGr key by checking all keyup events
     * until we receive one with ctrl key code. Once detected, reset
     * all the flags.
     *
     * @param {KeyboardEvent} e keyboard event object
     */

    ModifierStateHandler.prototype.detectAltGrKeyUp = function(e) {
      var key;
      if (process.platform === 'win32') {
        key = e.keyCode || e.which;
        if (this.altGrDown && key === KeyEvent.DOM_VK_CONTROL) {
          this.quitAltGrMode();
        }
      }
      if (process.platform === 'linux') {
        if (e.keyIdentifier === LINUX_ALTGR_IDENTIFIER) {
          return this.quitAltGrMode();
        }
      }
    };


    /**
     * Detects whether AltGr key is pressed. When it is pressed, the first keydown event has
     * ctrlKey === true with keyIdentifier === "Control". The next keydown event with
     * altKey === true, ctrlKey === true and keyIdentifier === "Alt" is sent within 30 ms. Then
     * the next keydown event with altKey === true, ctrlKey === true and keyIdentifier === "Control"
     * is sent. If the user keep holding AltGr key down, then the second and third
     * keydown events are repeatedly sent out alternately. If the user is also holding down Ctrl
     * key, then either keyIdentifier === "Control" or keyIdentifier === "Alt" is repeatedly sent
     * but not alternately.
     *
     * @param {KeyboardEvent} e keyboard event object
     */

    ModifierStateHandler.prototype.detectAltGrKeyDown = function(e) {
      if (process.platform === 'win32') {
        if (!this.altGrDown) {
          if (this.ctrlDown !== this.CtrlDownStates.DETECTED_AND_IGNORED && e.ctrlKey && e.keyIdentifier === 'Control') {
            this.ctrlDown = this.CtrlDownStates.DETECTED;
          } else if (e.repeat && e.ctrlKey && e.keyIdentifier === 'Control') {
            this.ctrlDown = this.CtrlDownStates.DETECTED_AND_IGNORED;
          } else if (this.ctrlDown === this.CtrlDownStates.DETECTED && e.altKey && e.ctrlKey && e.keyIdentifier === 'Alt' && e.timeStamp - this.lastTimeStamp < this.MAX_INTERVAL_FOR_CTRL_ALT_KEYS && (e.location === 2 || e.keyLocation === 2)) {
            this.altGrDown = true;
            this.lastKeyIdentifier = 'Alt';
          } else {
            this.ctrlDown = this.CtrlDownStates.NOT_YET_DETECTED;
          }
          this.lastTimeStamp = e.timeStamp;
        } else if (e.keyIdentifier === 'Control' || e.keyIdentifier === 'Alt') {
          if (e.altKey && e.ctrlKey && e.keyIdentifier === this.lastKeyIdentifier) {
            this.quitAltGrMode();
          } else {
            this.lastKeyIdentifier = e.keyIdentifier;
          }
        }
      }
      if (process.platform === 'linux') {
        if (!this.altGrDown) {
          if (e.keyIdentifier === LINUX_ALTGR_IDENTIFIER) {
            return this.altGrDown = true;
          }
        }
      } else {

      }
    };


    /**
     * Handle key event
     *
     * @param {KeyboardEvent} e keyboard event object
     */

    ModifierStateHandler.prototype.handleKeyEvent = function(e) {
      if (e.type === 'keydown') {
        this.detectAltGrKeyDown(e);
      }
      if (e.type === 'keyup') {
        this.detectAltGrKeyUp(e);
      }
      if (process.platform === 'win32') {
        this.hasCtrl = !this.altGrDown && e.ctrlKey;
        this.hasAltGr = this.altGrDown;
        this.hasAlt = !this.altGrDown && e.altKey;
      } else if (process.platform === 'linux') {
        this.hasCtrl = e.ctrlKey;
        this.hasAltGr = this.altGrDown;
        this.hasAlt = e.altKey;
      } else {
        this.hasCtrl = (e.ctrlKey != null) && e.ctrlKey === true;
        this.hasAltGr = e.altKey;
        this.hasAlt = e.altKey;
      }
      this.hasShift = e.shiftKey;
      return this.hasCmd = (e.metaKey != null) && e.metaKey === true;
    };


    /**
     * determine if shift key is pressed
     */

    ModifierStateHandler.prototype.isShift = function() {
      return this.hasShift;
    };


    /**
     * determine if altgr key is pressed
     */

    ModifierStateHandler.prototype.isAltGr = function() {
      return this.hasAltGr;
    };


    /**
     * determine if alt key is pressed
     */

    ModifierStateHandler.prototype.isAlt = function() {
      return this.hasAlt;
    };


    /**
     * determine if ctrl key is pressed
     */

    ModifierStateHandler.prototype.isCtrl = function() {
      return this.hasCtrl;
    };


    /**
     * determine if cmd key is pressed
     */

    ModifierStateHandler.prototype.isCmd = function() {
      return this.hasCmd;
    };


    /**
     * get the state of all modifiers
     * @return {object}
     */

    ModifierStateHandler.prototype.getState = function() {
      return {
        shift: this.isShift(),
        altgr: this.isAltGr(),
        alt: this.isAlt(),
        ctrl: this.isCtrl(),
        cmd: this.isCmd()
      };
    };


    /**
     * get the modifier sequence string.
     * Additionally with a character
     * @param {String} character
     * @return {String}
     */

    ModifierStateHandler.prototype.getStrokeSequence = function(character) {
      var sequence;
      sequence = [];
      if (this.isCtrl()) {
        sequence.push('ctrl');
      }
      if (this.isAlt()) {
        sequence.push('alt');
      }
      if (this.isAltGr()) {
        sequence.push('altgr');
      }
      if (this.isShift()) {
        sequence.push('shift');
      }
      if (this.isCmd()) {
        sequence.push('cmd');
      }
      if (character) {
        sequence.push(character);
      }
      return sequence.join('-');
    };

    return ModifierStateHandler;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMva2V5Ym9hcmQtbG9jYWxpemF0aW9uL2xpYi9tb2RpZmllci1zdGF0ZS1oYW5kbGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUE7OztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsOEJBQUE7O0FBQUEsRUFLQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FMWCxDQUFBOztBQUFBLEVBT0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKO0FBQUE7OztPQUFBO0FBQUEsUUFBQSxzQkFBQTs7QUFBQSxtQ0FJQSxjQUFBLEdBQ0U7QUFBQSxNQUFBLGtCQUFBLEVBQW9CLENBQXBCO0FBQUEsTUFDQSxVQUFBLEVBQVksQ0FEWjtBQUFBLE1BRUEsc0JBQUEsRUFBd0IsQ0FGeEI7S0FMRixDQUFBOztBQVNBO0FBQUE7Ozs7Ozs7O09BVEE7O0FBQUEsbUNBa0JBLFFBQUEsR0FBVSxDQWxCVixDQUFBOztBQUFBLG1DQW1CQSxTQUFBLEdBQVcsS0FuQlgsQ0FBQTs7QUFBQSxtQ0FxQkEsUUFBQSxHQUFVLEtBckJWLENBQUE7O0FBQUEsbUNBc0JBLE9BQUEsR0FBUyxLQXRCVCxDQUFBOztBQUFBLG1DQXVCQSxRQUFBLEdBQVUsS0F2QlYsQ0FBQTs7QUFBQSxtQ0F3QkEsTUFBQSxHQUFRLEtBeEJSLENBQUE7O0FBQUEsbUNBeUJBLE1BQUEsR0FBUSxLQXpCUixDQUFBOztBQTJCQTtBQUFBOzs7OztPQTNCQTs7QUFBQSxtQ0FpQ0EsOEJBQUEsR0FBZ0MsRUFqQ2hDLENBQUE7O0FBbUNBO0FBQUE7OztPQW5DQTs7QUFBQSxJQXVDQSxzQkFBQSxHQUF5QixRQXZDekIsQ0FBQTs7QUF5Q0E7QUFBQTs7O09BekNBOztBQUFBLG1DQTZDQSxhQUFBLEdBQWUsSUE3Q2YsQ0FBQTs7QUErQ0E7QUFBQTs7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

//# sourceURL=/home/jakob/.atom/packages/keyboard-localization/lib/modifier-state-handler.coffee
