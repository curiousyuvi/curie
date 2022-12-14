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
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;

        },
        removeUser: (state) => {
            state.currentUser = null;
        },
    },
});

// export the action
export const {
    setUser,
    removeUser,
} = userSlice.actions
