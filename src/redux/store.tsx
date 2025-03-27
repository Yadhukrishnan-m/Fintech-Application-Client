import { configureStore } from "@reduxjs/toolkit";
import userTokenSlice from "./slice/UserTokenSlice";
import adminTokenSlice from './slice/AdminTokenSlice'
const store = configureStore({
  reducer: {
    userTokenSlice: userTokenSlice,
    adminTokenSlice: adminTokenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
