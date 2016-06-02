Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactForAtom = require('react-for-atom');

var _reactForAtom2 = _interopRequireDefault(_reactForAtom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

'use babel';

var styles = {
  inputText: {
    width: "100%"
  },
  inputCheckBox: {
    float: "left"
  },
  fileName: {
    textAlign: "left"
  }
};

var CommitManagerView = _reactForAtom2['default'].createClass({
  displayName: 'CommitManagerView',

  getInitialState: function getInitialState() {
    return {};
  },
  getDefaultProps: function getDefaultProps() {
    return {
      files: []
    };
  },
  componentDidMount: function componentDidMount() {},
  componentWillUnmount: function componentWillUnmount() {},
  getFilesToAdd: function getFilesToAdd() {
    var _this = this;

    var filesToAdd = [];
    this.props.files.forEach(function (file) {
      if (_this.refs[file.name].checked) filesToAdd.push(file.name);
    });
    return filesToAdd;
  },
  render: function render() {
    return _reactForAtom2['default'].createElement(
      'div',
      null,
      _reactForAtom2['default'].createElement(
        'ul',
        { style: { listStyle: "none", paddingLeft: "10px" } },
        this.props.files.map(function (file, i) {
          return _reactForAtom2['default'].createElement(
            'li',
            { key: 'fileItem' + i, style: { width: "100%", display: "flex", marginBottom: "5px", marginTop: "5px" } },
            _reactForAtom2['default'].createElement(
              'span',
              { style: styles.fileName },
              file.name
            ),
            _reactForAtom2['default'].createElement(
              'div',
              { style: { display: "inline-flex", justifyContent: "flex-end", flexGrow: "1" } },
              _reactForAtom2['default'].createElement('input', { ref: file.name, style: styles.inputCheckBox, type: 'checkbox', defaultChecked: true })
            )
          );
        })
      ),
      _reactForAtom2['default'].createElement('input', { ref: 'inputText', type: 'text', className: 'native-key-bindings', style: styles.inputText, placeholder: 'Commit Message' })
    );
  }
});

exports['default'] = CommitManagerView;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pha29iLy5hdG9tL3BhY2thZ2VzL2dpdC1jb21taXQvbGliL2NvbXBvbmVudHMvQ29tbWl0TWFuYWdlclZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs0QkFDa0IsZ0JBQWdCOzs7OzBCQUNYLFlBQVk7Ozs7QUFGbkMsV0FBVyxDQUFBOztBQUlYLElBQUksTUFBTSxHQUFHO0FBQ1gsV0FBUyxFQUFFO0FBQ1QsU0FBSyxFQUFFLE1BQU07R0FDZDtBQUNELGVBQWEsRUFBRTtBQUNiLFNBQUssRUFBRSxNQUFNO0dBQ2Q7QUFDRCxVQUFRLEVBQUU7QUFDUixhQUFTLEVBQUUsTUFBTTtHQUNsQjtDQUNGLENBQUM7O0FBRUYsSUFBSSxpQkFBaUIsR0FBRywwQkFBTSxXQUFXLENBQUM7OztBQUN4QyxpQkFBZSxFQUFFLDJCQUFXO0FBQzFCLFdBQU8sRUFBRSxDQUFDO0dBQ1g7QUFDRCxpQkFBZSxFQUFFLDJCQUFXO0FBQzFCLFdBQU87QUFDTCxXQUFLLEVBQUUsRUFBRTtLQUNWLENBQUM7R0FDSDtBQUNELG1CQUFpQixFQUFFLDZCQUFXLEVBRTdCO0FBQ0Qsc0JBQW9CLEVBQUUsZ0NBQVcsRUFFaEM7QUFDRCxlQUFhLEVBQUUseUJBQVc7OztBQUN4QixRQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDcEIsUUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ2pDLFVBQUksTUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFDOUIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUIsQ0FBQyxDQUFDO0FBQ0gsV0FBTyxVQUFVLENBQUM7R0FDbkI7QUFDRCxRQUFNLEVBQUUsa0JBQVc7QUFDakIsV0FDRTs7O01BQ0U7O1VBQUksS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFDLEFBQUM7UUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLENBQUMsRUFBSztBQUNqQyxpQkFDRTs7Y0FBSSxHQUFHLGVBQWEsQ0FBQyxBQUFHLEVBQUMsS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBQyxBQUFDO1lBQ3JHOztnQkFBTSxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsQUFBQztjQUFFLElBQUksQ0FBQyxJQUFJO2FBQVE7WUFDaEQ7O2dCQUFLLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLEFBQUM7Y0FDOUUsbURBQU8sR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEFBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLGFBQWEsQUFBQyxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsY0FBYyxFQUFFLElBQUksQUFBQyxHQUFFO2FBQ3ZGO1dBQ0gsQ0FDTjtTQUNGLENBQUM7T0FDQztNQUNMLG1EQUFPLEdBQUcsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMscUJBQXFCLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEFBQUMsRUFBQyxXQUFXLEVBQUMsZ0JBQWdCLEdBQUU7S0FDdEgsQ0FDTjtHQUNIO0NBQ0YsQ0FBQyxDQUFDOztxQkFFWSxpQkFBaUIiLCJmaWxlIjoiL2hvbWUvamFrb2IvLmF0b20vcGFja2FnZXMvZ2l0LWNvbW1pdC9saWIvY29tcG9uZW50cy9Db21taXRNYW5hZ2VyVmlldy5qc3giLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0LWZvci1hdG9tJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG52YXIgc3R5bGVzID0ge1xuICBpbnB1dFRleHQ6IHtcbiAgICB3aWR0aDogXCIxMDAlXCJcbiAgfSxcbiAgaW5wdXRDaGVja0JveDoge1xuICAgIGZsb2F0OiBcImxlZnRcIlxuICB9LFxuICBmaWxlTmFtZToge1xuICAgIHRleHRBbGlnbjogXCJsZWZ0XCJcbiAgfVxufTtcblxudmFyIENvbW1pdE1hbmFnZXJWaWV3ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7fTtcbiAgfSxcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZXM6IFtdXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuXG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcblxuICB9LFxuICBnZXRGaWxlc1RvQWRkOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZmlsZXNUb0FkZCA9wqBbXTtcbiAgICB0aGlzLnByb3BzLmZpbGVzLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICAgIGlmICh0aGlzLnJlZnNbZmlsZS5uYW1lXS5jaGVja2VkKVxuICAgICAgICBmaWxlc1RvQWRkLnB1c2goZmlsZS5uYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmlsZXNUb0FkZDtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPHVsIHN0eWxlPXt7bGlzdFN0eWxlOiBcIm5vbmVcIiwgcGFkZGluZ0xlZnQ6IFwiMTBweFwifX0+XG4gICAgICAgICAge3RoaXMucHJvcHMuZmlsZXMubWFwKChmaWxlLCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8bGkga2V5PXtgZmlsZUl0ZW0ke2l9YH0gc3R5bGU9e3t3aWR0aDogXCIxMDAlXCIsIGRpc3BsYXk6XCJmbGV4XCIsIG1hcmdpbkJvdHRvbTogXCI1cHhcIiwgbWFyZ2luVG9wOiBcIjVweFwifX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5maWxlTmFtZX0+e2ZpbGUubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6IFwiaW5saW5lLWZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwiZmxleC1lbmRcIiwgZmxleEdyb3c6IFwiMVwifX0+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgcmVmPXtmaWxlLm5hbWV9IHN0eWxlPXtzdHlsZXMuaW5wdXRDaGVja0JveH0gdHlwZT1cImNoZWNrYm94XCIgZGVmYXVsdENoZWNrZWQ9e3RydWV9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC91bD5cbiAgICAgICAgPGlucHV0IHJlZj1cImlucHV0VGV4dFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwibmF0aXZlLWtleS1iaW5kaW5nc1wiIHN0eWxlPXtzdHlsZXMuaW5wdXRUZXh0fSBwbGFjZWhvbGRlcj1cIkNvbW1pdCBNZXNzYWdlXCIvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1pdE1hbmFnZXJWaWV3O1xuIl19
//# sourceURL=/home/jakob/.atom/packages/git-commit/lib/components/CommitManagerView.jsx
