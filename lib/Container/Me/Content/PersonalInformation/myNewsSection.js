Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/Container/Me/Content/PersonalInformation/myNewsSection.js';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _reactRedux=require('react-redux');var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);var _generateColor=require('../../../../Action/generateColor');var _generateColor2=_interopRequireDefault(_generateColor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _Dimensions$get=_reactNative.Dimensions.get('window'),width=_Dimensions$get.width,height=_Dimensions$get.height;var myNewsSection=function myNewsSection(_ref){var imageSource=_ref.imageSource,num=_ref.num,name=_ref.name,light=_ref.light,press=_ref.press;return _react2.default.createElement(_reactNative.TouchableOpacity,{onPress:press,__source:{fileName:_jsxFileName,lineNumber:17}},_react2.default.createElement(_reactNative.View,{style:styles.main,__source:{fileName:_jsxFileName,lineNumber:18}},_react2.default.createElement(_reactNative.ImageBackground,{style:{width:width*0.12,height:height*0.08,justifyContent:'flex-start',alignItems:'flex-end'},source:imageSource,__source:{fileName:_jsxFileName,lineNumber:19}},_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'#ccc',width:20,height:20,borderRadius:10,justifyContent:'center',alignItems:'center'},__source:{fileName:_jsxFileName,lineNumber:20}},_react2.default.createElement(_reactNative.Text,{style:[styles.num,{color:'#'+(0,_generateColor2.default)(50,109,light)}],__source:{fileName:_jsxFileName,lineNumber:21}},num))),_react2.default.createElement(_reactNative.Text,{style:[styles.name,{color:'#'+(0,_generateColor2.default)(166,216,light)}],__source:{fileName:_jsxFileName,lineNumber:24}},name,' ')));};myNewsSection.propTypes={imageSource:_propTypes2.default.number.isRequired,num:_propTypes2.default.number.isRequired,name:_propTypes2.default.string.isRequired,light:_propTypes2.default.number.isRequired,press:_propTypes2.default.func.isRequired};var styles=_reactNative.StyleSheet.create({main:{width:_reactNative.Platform.Os==='ios'?width*0.3:width*0.3,height:_reactNative.Platform.Os==='ios'?height*0.1:height*0.12,justifyContent:'center',alignItems:'center',marginTop:(height*0.465-width*0.5)/3,borderRadius:4,backgroundColor:'transparent'},name:{fontSize:16,color:'#ededed',width:width*0.25,textAlign:'center'},num:{fontSize:15,width:width*0.25,textAlign:'center'}});var mapStateToProps=function mapStateToProps(state,ownProps){var componentMap={我的演讲:require('../../../../Image/SideMenu/speech.png'),我的转发:require('../../../../Image/SideMenu/share.png'),我的收藏:require('../../../../Image/SideMenu/collect.png'),我的点赞:require('../../../../Image/SideMenu/like.png'),我的评论:require('../../../../Image/SideMenu/comment.png'),我的回复:require('../../../../Image/SideMenu/review.png')};return{imageSource:componentMap[ownProps.name],light:state.getIn(['pageSet','light'])};};var mapDispatchToProps=function mapDispatchToProps(dispatch,ownProps){return{press:function press(){return dispatch({type:'ME_CHANGE_VIEWMODE',viewMode:ownProps.name});}};};exports.default=(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(myNewsSection);