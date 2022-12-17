import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../interfaces/Message";
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
            const exists = state.rooms.find(room => room.rid === action.payload.rid)
            if (exists) {
                const foundIdx = state.rooms.findIndex(room => room.rid == action.payload.rid);
                state.rooms[foundIdx] = { ...state.rooms[foundIdx], ...action.payload };
            }
            else
                state.rooms.push({ ...action.payload, messages: [] })
        },
        addMessage: (state, action: PayloadAction<{ rid: string; message: Message }>) => {
            const exists = state.rooms.find(room => room.rid === action.payload.rid)
            if (exists) {
                const foundIdx = state.rooms.findIndex(room => room.rid == action.payload.rid);
                state.rooms[foundIdx].messages.push(action.payload.message)
            }
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
    addMessage,
    addRoom,
    removeRoom,
    clearRooms,
} = roomsSlice.actions
