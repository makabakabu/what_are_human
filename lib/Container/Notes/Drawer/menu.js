Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/Container/Notes/Drawer/menu.js';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);var _menuItem=require('./menuItem');var _menuItem2=_interopRequireDefault(_menuItem);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var Menu=function Menu(_ref){var drawer=_ref.drawer;return _react2.default.createElement(_reactNative.View,{style:styles.main,__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement(_reactNative.View,{style:styles.menuContainer,__source:{fileName:_jsxFileName,lineNumber:13}},_react2.default.createElement(_menuItem2.default,{imageSource:require('../../../Image/notes/notes.png'),text:'\u5B66\u9662\u7B14\u8BB0',drawer:drawer,__source:{fileName:_jsxFileName,lineNumber:14}}),_react2.default.createElement(_menuItem2.default,{imageSource:require('../../../Image/notes/winkThought.png'),text:'\u601D\u7EF4\u788E\u7247',drawer:drawer,__source:{fileName:_jsxFileName,lineNumber:15}}),_react2.default.createElement(_menuItem2.default,{imageSource:require('../../../Image/notes/create.png'),text:'\u95EA\u5FF5\u6355\u6349',drawer:drawer,__source:{fileName:_jsxFileName,lineNumber:16}})));};Menu.propTypes={drawer:_propTypes2.default.object};Menu.defaultProps={drawer:{}};var styles=_reactNative.StyleSheet.create({main:{width:width*0.2,height:height,justifyContent:'center',backgroundColor:'transparent'},menuContainer:{width:width*0.2,height:width*0.6}});exports.default=Menu;