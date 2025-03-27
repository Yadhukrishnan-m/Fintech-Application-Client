import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface AdminTokenState {
  adminToken: string | null;
}

const initialState: AdminTokenState = {
  adminToken: JSON.parse(localStorage.getItem("adminAccessToken") || "null"),
};

const adminTokenSlice = createSlice({
  name: "admintokenSlice", // Updated to match the store
  initialState,
  reducers: {
    addAdminToken: (state, action: PayloadAction<string>) => {
      state.adminToken = action.payload;
      localStorage.setItem("adminAccessToken", JSON.stringify(action.payload));
    },
    removeAdminToken: (state) => {
      state.adminToken = null;
      localStorage.removeItem("adminAccessToken");
    },
  },
});

export const { addAdminToken, removeAdminToken } = adminTokenSlice.actions;
export default adminTokenSlice.reducer;
