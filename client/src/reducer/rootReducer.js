var initState={
    users:[],
    token:[],
    user:[],
    authorized:false,
    message:""
}

const rootReducer =(state=initState,action)=>{
console.log(state);
console.log(action.payload);

switch(action.type){
    case "get": return {...state,users:action.payload};
    case "add": return {...state,users:[action.payload.user,...state.users],user:[action.payload.user],token:[action.payload.token],message:action.payload.message,authorized:action.payload.authorized}
    case "login": return{...state,user:[action.payload.user],token:[action.payload.token],message:action.payload.message,authorized:action.payload.authorized}
    case "clear": return{...state,message:[action.payload]}
    case "logout": return{...state,user:[],authorized:false,message:""}
    default: return state;
}
}
export default rootReducer;