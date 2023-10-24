import { configureStore } from "@reduxjs/toolkit";
import { modalSlice, userSlice } from "@/redux/slices";

export const store = configureStore({
	reducer: {
		modal: modalSlice,
		users: userSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
