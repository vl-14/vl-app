import { ModalStateProps } from "@/types/components";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const initialState: ModalStateProps = {
	isOpen: false,
	type: "",
	reduxProps: {},
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		handleShowingModal: (
			state,
			action: PayloadAction<{ type: string; reduxProps?: Record<string, any> }>
		) => {
			state.isOpen = true;
			state.type = action.payload.type;
			state.reduxProps = action.payload.reduxProps;
		},
		closeModal: (state) => {
			state.isOpen = false;
			state.type = null;
			state.reduxProps = {};
		},
	},
});

const getModalState = (state: RootState) => state.modal;

export { getModalState };

export const { handleShowingModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
