import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isLoggedIn:false,
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setLogin(state, action){
            state.user=action.payload;
            state.isLoggedIn=true;
        },
        setLogout(state, action){
            state.user=null;
            state.isLoggedIn=false;
        }
    }
}
)

export const {setLogin, setLogout}=userSlice.actions;

export default userSlice.reducer;