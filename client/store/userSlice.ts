import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/User";
import { UserSliceState } from "../interfaces/UserSliceState";

const initialState: UserSliceState = {
    currentUser: null
}

// create a slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        setUser: (state, action: PayloadAction<{ name?: string; avatarUrl?: string }>) => {
            state.currentUser = { ...state.currentUser, ...action.payload };
        },
        removeUser: (state) => {
            state.currentUser = null;
        },
    },
});

// export the action
export const {
    createUser,
    setUser,
    removeUser,
} = userSlice.actions
