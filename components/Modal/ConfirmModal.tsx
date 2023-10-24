import { useDispatch, useSelector } from "react-redux";
import { closeModal, getModalState } from "@/redux/slices/modalSlice";
import { ReactNode } from "react";

interface ModalProps {
	handleConfirm?: () => void;
	children: ReactNode;
}

const ConfirmModal = ({ handleConfirm, children }: ModalProps) => {
	const dispatch = useDispatch();
	const { isOpen } = useSelector(getModalState);

	const onConfirm = () => {
		dispatch(closeModal());
		handleConfirm?.();
	};

	const onDecline = () => {
		dispatch(closeModal());
	};

	if (!isOpen) return null;

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 ${
				isOpen ? "opacity-100" : "opacity-0"
			} transition-opacity duration-300 ease-in-out`}
		>
			<div className="bg-black opacity-50 absolute inset-0 transition-opacity duration-300 ease-in-out"></div>
			<div className="bg-white p-6 rounded-lg z-10 transition-transform duration-300 ease-in-out transform translate-y-4">
				<div>{children}</div>
				<div className="flex justify-end mt-4">
					<button
						onClick={onDecline}
						className="mr-2 px-4 py-2 bg-gray-200 rounded"
					>
						No
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-gray-500 text-white rounded"
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
