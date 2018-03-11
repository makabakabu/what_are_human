Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/Container/Me/Drawer/menu.js';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);var _menuItem=require('./menuItem');var _menuItem2=_interopRequireDefault(_menuItem);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _Dimensions$get=_reactNative.Dimensions.get('window'),height=_Dimensions$get.height,width=_Dimensions$get.width;var Menu=function Menu(_ref){var drawer=_ref.drawer;return _react2.default.createElement(_reactNative.View,{style:styles.main,__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement(_reactNative.View,{style:styles.menuContainer,__source:{fileName:_jsxFileName,lineNumber:13}},_react2.default.createElement(_menuItem2.default,{imageSource:require('../../../Image/SideMenu/speech.png'),text:'\u6211\u7684\u6F14\u8BB2',drawer:drawer,__source:{fileName:_jsxFileName,lineNumber:14}}),_react2.default.createElement(_menuItem2.default,{imageSource:require('../../../Image/SideMenu/share.png'),text:'\u6211\u7684\u8F6C\u53D1',drawer:drawer,__source:{fileName:_jsxFileName,lineNumber:15}}),_react2.default.createElement(_menuItem2.default,{imageSource:require('../../../Image/SideMenu/collect.png'),text:'\u6211\u7684\u6536\u85CF',drawer:drawer,__source:{fileName:_jsxFileName,lineNumber:16}}),_react2.default.createElement(_menuItem2.default,{imageSource:require('../../../Image/SideMenu/like.png'),text:'\u6211\u7684\u70B9\u8D5E',drawer:drawer,__source:{fileName:_jsxFileName,lineNumber:17}}),_react2.default.createElement(_menuItem2.default,{imageSource:require('../../../Image/SideMenu/comment.png'),text:'\u6211\u7684\u8BC4\u8BBA',drawer:drawer,__source:{fileName:_jsxFileName,lineNumber:18}}),_react2.default.createElement(_menuItem2.default,{imageSource:require('../../../Image/SideMenu/review.png'),text:'\u6211\u7684\u56DE\u590D',drawer:drawer,__source:{fileName:_jsxFileName,lineNumber:19}}),_react2.default.createElement(_menuItem2.default,{imageSource:require('../../../Image/SideMenu/information.png'),text:'\u6211\u7684\u4FE1\u606F',drawer:drawer,__source:{fileName:_jsxFileName,lineNumber:20}})));};Menu.propTypes={drawer:_propTypes2.default.object};Menu.defaultProps={drawer:{}};var styles=_reactNative.StyleSheet.create({main:{width:width*0.2,height:height,justifyContent:'center',backgroundColor:'transparent'},menuContainer:{width:width*0.2,height:width*1.4}});exports.default=Menu;