var initState={
   access_verified:localStorage.getItem('admin_access')|| null,
     
}

const adminReducer =(state=initState,action)=>{
console.log(action.payload);
switch(action.type){
    case "admin_login":localStorage.setItem('admin_access',action.payload); return {...state,access_verified:action.payload};
       case "logout": localStorage.removeItem('admin_access'); return{...state,access_verified:false}
       default: return state;
}
}
export default adminReducer;