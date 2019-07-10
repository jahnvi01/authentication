import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import adminReducer from './admin_reducer';


export default combineReducers({
 user:userReducer,
 admin:adminReducer 
 
});