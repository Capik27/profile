import { createSlice } from "@reduxjs/toolkit";

export type adminState = {
	isAdmin: boolean;
};

const initialState: adminState = {
	isAdmin: sessionStorage.isAdmin ?? false,
};

const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		toggleAdminMode(state) {
			sessionStorage.isAdmin = !state.isAdmin;
			state.isAdmin = !state.isAdmin;
		},
	},
});

export default adminSlice.reducer;
export const { toggleAdminMode } = adminSlice.actions;
