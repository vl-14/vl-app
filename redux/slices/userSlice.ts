import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/redux/store";

type User = {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
};

interface UserState {
	data: User[];
	loading: "IDLE" | "PENDING" | "SUCCEED" | "FAILED"; //Generally you would store these as constants.
	error: string | null;
}

const initialState: UserState = {
	data: [],
	loading: "IDLE",
	error: null,
};

export const fetchUsers = createAsyncThunk(
	"users/fetchUsers",
	async (payload: { cookie: string; wish: string }) => {
		// In order to allow server side to read session data and authenticate user
		const response = await axios.post("/api/backend/user", payload, {
			headers: {
				Cookie: payload.cookie,
			},
		});
		return response.data as User[];
	}
);

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = "PENDING";
			})
			.addCase(
				fetchUsers.fulfilled,
				(state, action: PayloadAction<User[]>) => {
					state.loading = "SUCCEED";
					state.data = action.payload;
				}
			)
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = "FAILED";
				state.error = action.error.message || "Something went wrong";
			});
	},
});

export const getUsersData = (state: RootState) => state.users;
export default userSlice.reducer;
