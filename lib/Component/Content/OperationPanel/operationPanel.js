Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/Component/Content/OperationPanel/operationPanel.js',_this=this;var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('react-native');var _immutable=require('immutable');var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);var _reactRedux=require('react-redux');var _uuid=require('uuid');var _uuid2=_interopRequireDefault(_uuid);var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);var _reactImmutableProptypes=require('react-immutable-proptypes');var _reactImmutableProptypes2=_interopRequireDefault(_reactImmutableProptypes);var _operationTrigger=require('./operationTrigger');var _operationTrigger2=_interopRequireDefault(_operationTrigger);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _Dimensions$get=_reactNative.Dimensions.get('window'),width=_Dimensions$get.width;var OperationPanel=function OperationPanel(_ref){var likeId=_ref.likeId,imageSource=_ref.imageSource,order=_ref.order,operation=_ref.operation,text=_ref.text,sharePress=_ref.sharePress,commentPress=_ref.commentPress,likePress=_ref.likePress,operationPress=_ref.operationPress;var commentNumber=operation.getIn(['comment','content']).reduce(function(sum,value){return sum+1+value.get('recomment').size;},0);return _react2.default.createElement(_reactNative.View,{style:styles.operation,__source:{fileName:_jsxFileName,lineNumber:15}},_react2.default.createElement(_operationTrigger2.default,{imageSource:require('../../../Image/Operation/share.png'),number:operation.getIn(['share','number']).toString(),press:sharePress({sourceDetail:(0,_immutable.Map)({text:'',time:(0,_moment2.default)().format('YYYY-MM-DD hh:mm'),location:(0,_immutable.Map)({order:order})})}),__source:{fileName:_jsxFileName,lineNumber:16}}),_react2.default.createElement(_operationTrigger2.default,{imageSource:require('../../../Image/Operation/comment.png'),number:commentNumber.toString(),press:commentPress({location:(0,_immutable.Map)({viewMode:'main',text:'',commentId:(0,_uuid2.default)(),recommentId:''})}),__source:{fileName:_jsxFileName,lineNumber:29}}),_react2.default.createElement(_operationTrigger2.default,{imageSource:imageSource,number:operation.getIn(['like','number']).toString(),likeId:likeId,press:likePress({likeId:likeId,location:(0,_immutable.Map)({viewMode:'like'})}),__source:{fileName:_jsxFileName,lineNumber:41}}),_react2.default.createElement(_operationTrigger2.default,{imageSource:require('../../../Image/Operation/revise.png'),have:operation.get('revise')!==text,press:operationPress({viewMode:'revise'}),__source:{fileName:_jsxFileName,lineNumber:52}}),_react2.default.createElement(_operationTrigger2.default,{imageSource:require('../../../Image/Operation/notes.png'),have:operation.getIn(['notes','text']).length!==0,press:operationPress({viewMode:'notes'}),__source:{fileName:_jsxFileName,lineNumber:57}}));};OperationPanel.propTypes={likeId:_propTypes2.default.string.isRequired,imageSource:_propTypes2.default.number.isRequired,operation:_reactImmutableProptypes2.default.map.isRequired,order:_propTypes2.default.string.isRequired,text:_propTypes2.default.string.isRequired,sharePress:_propTypes2.default.func.isRequired,commentPress:_propTypes2.default.func.isRequired,likePress:_propTypes2.default.func.isRequired,operationPress:_propTypes2.default.func.isRequired};var styles=_reactNative.StyleSheet.create({operation:{marginLeft:width*0.025,width:width*0.85,height:40,marginTop:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}});var mapStateToProps=function mapStateToProps(state,ownProps){return{likeId:(0,_uuid2.default)(),operation:state.getIn(['academy','content',ownProps.order,'operation']),imageSource:state.getIn(['academy','content',ownProps.order,'operation','like','clicked'])?require('../../../Image/Operation/likeAfter.png'):require('../../../Image/Operation/like.png'),text:state.getIn(['academy','content',ownProps.order,'text'])};};var mapDispatchToProps=function mapDispatchToProps(dispatch){return{sharePress:function sharePress(_ref2){var sourceDetail=_ref2.sourceDetail;return function(){dispatch({type:'OPERATION_2_SHARE',source:'academy',sourceDetail:sourceDetail});dispatch({type:'OPERATION_PRESS',viewMode:'share'});};},operationPress:function operationPress(_ref3){var viewMode=_ref3.viewMode;return function(){return dispatch({type:'OPERATION_PRESS',viewMode:viewMode});};},commentPress:function commentPress(_ref4){var location=_ref4.location;return function(){return dispatch({type:'OPERATION_COMMENT_PRESS',location:location});};},likePress:function likePress(_ref5){var location=_ref5.location,likeId=_ref5.likeId;return function(){_this[likeId].swing(800);dispatch({type:'OPERATION_LIKE_PRESS',location:location});dispatch({type:'ME_ADD',viewMode:'我的点赞',location:location});};}};};exports.default=(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(OperationPanel);