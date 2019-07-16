var initState={
    token:localStorage.getItem('token')|| null,
    user:[],
    message:"",
    correctAnswer:0,
    notAnswered:0,
    incorrectAnswer:0
}

const userReducer =(state=initState,action)=>{
// console.log(action.payload);
// console.log(state);
// //var currentColor = localStorage.getItem('token');
//console.log(currentColor);
switch(action.type){
    case "get": return {...state,user:action.payload};
    case "add":   localStorage.setItem('token',action.payload.token); return {...state,user:[action.payload.user],token:action.payload.token,message:action.payload.message}
    case "login":localStorage.setItem('token',action.payload.token); return{...state,user:[action.payload.user],token:action.payload.token,message:action.payload.message}
    case "clear": return{...state,message:[action.payload]}
    case "logout": localStorage.removeItem('token'); return{...state,user:[],message:"",token:null}
    case "score":  return{...state,correctAnswer:action.payload.correctAnswer,notAnswered:action.payload.notAnswered,incorrectAnswer:action.payload.incorrectAnswer}
 
    default: return state;
}
}
export default userReducer;