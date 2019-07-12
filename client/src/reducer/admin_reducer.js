var initState={
   access_verified:localStorage.getItem('admin_access'),
     
}

const adminReducer =(state=initState,action)=>{
console.log(action.payload);
switch(action.type){
    case "admin_login":localStorage.setItem('admin_access',true); return {...state,access_verified:true};
       case "admin_logout": localStorage.removeItem('admin_access'); return{...state,access_verified:false}
       default: return state;
}
}
export default adminReducer;