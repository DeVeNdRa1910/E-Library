import { createSlice } from "@reduxjs/toolkit";

export interface user {
  name: string,
  token: string,
  email: string,
  userId: string
}

const initialState: user = {
  name: "",
  email: "",
  userId: "",
  token: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action)=>{
      state.name=action.payload.name;
      state.email=action.payload.email;
      state.userId=action.payload.userId;
      state.token=action.payload.token;
    },
    removeUser: (state)=>{
      state.name = "";
      state.email = "";
      state.userId = "";
      state.token = "";
    }
  }
})

export const { addUser , removeUser } = userSlice.actions;
export default userSlice.reducer;