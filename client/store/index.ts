import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { roomsSlice } from "./roomsSlice";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userSlice.reducer,
  rooms: roomsSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)



// config the store
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});



export type RootState = ReturnType<typeof rootReducer>

export const persistoor = persistStore(store)

// export default the store
export default store;

// export the action
