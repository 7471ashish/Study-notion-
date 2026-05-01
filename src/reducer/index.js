import {combineReducers} from "@reduxjs/toolkit";
// this is for combining various reducers from various slices 
import authReducer from '../slices/authSlice'
import profileReducer from '../slices/profileSlice'
import cartReducer from '../slices/cartSlice'
const rootReducer=combineReducers({
auth:authReducer,
profile:profileReducer,
cart:cartReducer
})

export default rootReducer