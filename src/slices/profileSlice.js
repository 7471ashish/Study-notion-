import {createSlice} from "@reduxjs/toolkit"

const getUserFromStorage = () => {
  const data = localStorage.getItem("user");

  if (!data || data === "undefined") return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};


const initialState={
    user:getUserFromStorage(),
    loading:false,
}

const profileSlice=createSlice({
    name:'profile',
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload;
        },
        setLoading(state,value){
            state.loading=value.payload;
        }
    },
});

export const {setUser,setLoading}=profileSlice.actions;
export default profileSlice.reducer;