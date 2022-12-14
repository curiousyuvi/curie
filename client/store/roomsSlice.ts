import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RoomShort } from "../interfaces/RoomShort";
import { RoomsSliceState } from "../interfaces/RoomSliceState";

const initialState: RoomsSliceState = {
    rooms: []
}

// create a slice
export const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addRoom: (state, action: PayloadAction<RoomShort>) => {
            state.rooms.push(action.payload)
        },
        removeRoom: (state, action: PayloadAction<string>) => {
            state.rooms = state.rooms.filter(room => room.rid !== action.payload)
        },
        clearRooms: (state) => {
            state.rooms = [];
        },
    },
});

// export the action
export const {
    addRoom,
    removeRoom,
    clearRooms,
} = roomsSlice.actions
