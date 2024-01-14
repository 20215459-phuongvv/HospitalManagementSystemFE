import { createSlice } from "@reduxjs/toolkit";
import { Login } from "../actions/auth-actions";


export interface User {
    id: string,
    name: string,
    avatar: string, 
    role: string,
}
const user = localStorage.getItem("currentUser");
const initValues : {
    user: User | null
}= {
    user: user ? JSON.parse(user) : null
};
export const userSlice = createSlice({
    name: "user",
    initialState: initValues,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(Login.fulfilled, (state, action)=> {
            state.user = action.payload as User;
        })
    },
})

export const {updateUser} = userSlice.actions
export default userSlice.reducer