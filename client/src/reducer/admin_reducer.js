var initState={
   access_verified:localStorage.getItem('admin_access'),
    subjects:[],
    test:localStorage.getItem('test'),
    message:""


}

const adminReducer =(state=initState,action)=>{
console.log(action.payload);
switch(action.type){
    case "admin_login":localStorage.setItem('admin_access',true); return {...state,access_verified:true};
       case "admin_logout": localStorage.removeItem('admin_access'); return{...state,access_verified:false}
       case "getsubjects": return {...state,subjects:action.payload.subjects}
        case "chooseSubject":  localStorage.setItem('test',action.payload); return{...state,test:action.payload}
        case "addsubject" :
             if(action.payload.message){
                return {...state,message:action.payload.message};   
             }
             else{ 
        return{...state,subjects:[action.payload.sub,...state.subjects]};
             }
        case "deletesubject":
                if(action.payload.message){
                    return {...state,message:action.payload.message};   
                 }
                 else{ 

    return {...state,
        subjects:state.subjects.filter(subject=>subject._id!==action.payload.id)    
    };
                 }
                 case "clear": return{...state,message:""}
        default: return state;
}
}
export default adminReducer;
// ,subjects:[action.payload,...state.subjects]
