import { createSlice } from "@reduxjs/toolkit";

const storageWorker = (state: boolean) => {
	if (state) {
		sessionStorage.isAdmin = true;
	} else {
		delete sessionStorage.isAdmin;
	}
};

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
			state.isAdmin = !state.isAdmin;
			storageWorker(state.isAdmin);
		},
		setAdminMode(state, { payload }) {
			if (state.isAdmin !== payload) {
				state.isAdmin = payload;
				storageWorker(state.isAdmin);
			}
		},
	},
});

export default adminSlice.reducer;
export const { toggleAdminMode, setAdminMode } = adminSlice.actions;
