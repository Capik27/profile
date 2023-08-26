import {
	configureStore,
	combineReducers,
	// ConfigureStoreOptions
	getDefaultMiddleware,
} from "@reduxjs/toolkit";
import adminSlice from "./adminSlice";
import postsSlice from "./postsSlice";

const rootReducer = combineReducers({
	admin: adminSlice,
	data: postsSlice,
	//
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

// (getDefaultMiddleware) =>
// 		getDefaultMiddleware({
// 			serializableCheck: false,
// 		}),

export type RootState = ReturnType<typeof store.getState>;

export default store;
