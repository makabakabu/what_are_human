Object.defineProperty(exports,"__esModule",{value:true});var _immutable=require('immutable');var _menu=require('./menu');var _menu2=_interopRequireDefault(_menu);var _academy=require('./academy');var _academy2=_interopRequireDefault(_academy);var _plaza=require('./plaza');var _plaza2=_interopRequireDefault(_plaza);var _news=require('./news');var _news2=_interopRequireDefault(_news);var _me=require('./me');var _me2=_interopRequireDefault(_me);var _notes=require('./notes');var _notes2=_interopRequireDefault(_notes);var _share=require('./share');var _share2=_interopRequireDefault(_share);var _pageSet=require('./pageSet');var _pageSet2=_interopRequireDefault(_pageSet);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var app=function app(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var action=arguments[1];switch(action.type){case'CHANGE_VIEWMODE':{var title={academy:'学院',plaza:'广场',notes:'学院笔记'};if(['academy','plaza','notes'].includes(action.viewMode)){state=state.setIn([action.viewMode,'title'],title[action.viewMode]);}var isSignIn=state.getIn(['me','我的信息','userName'])!=='';if(!isSignIn&&['notes','news','me'].includes(action.viewMode)){state=state.set('viewMode','menu');state=state.setIn(['menu','backTo'],action.viewMode);return state.setIn(['menu','viewMode'],'signIn');}switch(action.viewMode){case'home':{state=state.set('viewMode','academy');state=state.setIn(['academy','viewMode'],'section');var order=(0,_immutable.List)(state.getIn(['academy','content']).keySeq()).last();state=state.setIn(['academy','order'],order);return state.setIn(['academy','content',order,'viewMode'],'main');}case'academy':state=state.set('viewMode','academy');return state.setIn(['academy','viewMode'],'main');case'plaza':state=state.set('viewMode','plaza');return state.setIn(['plaza','plazaName'],'main');case'notes':state=state.set('viewMode','notes');state=state.setIn(['notes','academyNotes','viewMode'],'main');return state.setIn(['notes','viewMode'],'academyNotes');case'news':state=state.set('viewMode','news');return state.setIn(['news','viewMode'],'未读消息');case'me':state=state.set('viewMode','me');return state.setIn(['me','viewMode'],'我的信息');case'menu':if(state.get('viewMode')!=='menu'){state=state.setIn(['menu','backTo'],state.get('viewMode'));}if(isSignIn&&state.getIn(['menu','viewMode'])==='signIn'){state=state.setIn(['me','viewMode'],'我的信息');return state.set('viewMode','me');}return state.set('viewMode','menu');default:return state;}}case'BACK':switch(state.get('viewMode')){case'academy':{var artical=state.getIn(['academy','content',state.getIn(['academy','order'])]);state=state.setIn(['academy','title'],'学院');if(artical.get('viewMode')==='main'||artical.getIn(['operation','viewMode'])==='comment'){return state.setIn(['academy','viewMode'],'main');}return state.setIn(['academy','content',state.getIn(['academy','order']),'viewMode'],'main');}case'notes':{var notesMap={academyNotes:'学院笔记',winkThought:'思维碎片'};var notesViewMode=state.getIn(['notes','viewMode']);if(state.getIn(['notes',notesViewMode,'viewMode'])==='noteDetail'){state=state.setIn(['notes','title'],notesMap[notesViewMode]);return state.setIn(['notes',notesViewMode,'viewMode'],'main');}var notesId=state.getIn(['notes',notesViewMode,'notesId']);state=state.setIn(['notes','title'],state.getIn(['notes',notesViewMode,'notes',notesId,'title']));return state.setIn(['notes',notesViewMode,'viewMode'],'noteDetail');}case'plaza':{var _title={tiananmen:'天安门',freedom:'时代广场',france:'协和广场',russia:'红场',flyArea:'飞地微斯人'};var plazaName=state.getIn(['plaza','plazaName']);var viewMode=state.getIn(['plaza',plazaName,'viewMode']);if(viewMode==='main'){state=state.setIn(['plaza','title'],'广场');return state.setIn(['plaza','plazaName'],'main');}if(viewMode==='createSpeech'&&state.getIn(['plaza',plazaName,'createSpeech','viewMode'])==='protocol'){state=state.setIn(['plaza','title'],'创建演讲');return state.setIn(['plaza',plazaName,'createSpeech','viewMode'],'main');}state=state.setIn(['plaza','title'],_title[plazaName]);return state.setIn(['plaza',plazaName,'viewMode'],'main');}case'news':return state.setIn(['news','viewMode'],'未读消息');case'me':return state.setIn(['me','viewMode'],'我的信息');case'menu':{var _isSignIn=state.getIn(['me','我的信息','userName'])!=='';if(!_isSignIn&&['notes','news','me'].includes(state.getIn(['menu','backTo']))){state=state.set('viewMode','menu');state=state.setIn(['menu','title'],'登陆');return state.setIn(['menu','viewMode'],'signIn');}if(state.getIn(['menu','viewMode'])==='register'){state=state.setIn(['menu','viewMode'],'signIn');state=state.setIn(['menu','title'],'登陆');}else if(state.getIn(['menu','viewMode'])==='protocol'){state=state.setIn(['menu','viewMode'],'register');state=state.setIn(['menu','title'],'注册');}return state.set('viewMode',state.getIn(['menu','backTo']));}default:return state;}default:state=state.update('academy',function(value){return(0,_academy2.default)(value,action);});state=state.update('menu',function(value){return(0,_menu2.default)(value,action);});state=state.update('plaza',function(value){return(0,_plaza2.default)(value,action);});state=state.update('share',function(value){return(0,_share2.default)(value,action);});state=state.update('pageSet',function(value){return(0,_pageSet2.default)(value,action);});state=state.update('news',function(value){return(0,_news2.default)(value,action);});state=(0,_me2.default)(state,action);state=(0,_notes2.default)(state,action);return state;}};exports.default=app;