import { Post } from "5_shared/models";
import { createSlice } from "@reduxjs/toolkit";

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
			state.update = payload;
		},
	},
});

export default postsSlice.reducer;
export const { setDataPosts, setUpdate } = postsSlice.actions;
