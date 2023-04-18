import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  token: string;
  isAdmin: string;
  name: string;
  loading: boolean;
}

const initialState: IUser = {
  token: localStorage.getItem("token") || "",
  isAdmin: localStorage.getItem("isAdmin") || 'false',
  name: localStorage.getItem("name") || "",
  loading: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN: (state, action:PayloadAction<{ name: string, token: string, isAdmin: string }>) => {
        state.name = action.payload.name;
        state.token = action.payload.token;
        state.isAdmin = action.payload.isAdmin;
    },
    LOGOUT: (state) => {
        state.token= "";
        state.name= "";
        state.isAdmin =  "";
        localStorage.clear();
    },
    SetLoading: (state, action:PayloadAction<{ loading: boolean}>) => {
        state.loading=action.payload.loading;
    }
  },
});

export default userSlice.reducer;
export const {LOGIN, LOGOUT, SetLoading} = userSlice.actions;
