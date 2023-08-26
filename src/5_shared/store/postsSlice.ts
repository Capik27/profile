import { Post } from "5_shared/models";
import { createSlice } from "@reduxjs/toolkit";
// import { DocumentData } from "firebase/firestore";

export type State = {
	posts: Post[];
	update: boolean;
};

const initialState: State = {
	posts: [],
	update: true,
};

const postsSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		setDataPosts(state, { payload }) {
			state.posts = payload as Post[];
		},
		setUpdate(state, { payload }) {
			console.log("setUpdate", payload);
			state.update = payload;
		},
	},
});

export default postsSlice.reducer;
export const { setDataPosts, setUpdate } = postsSlice.actions;
