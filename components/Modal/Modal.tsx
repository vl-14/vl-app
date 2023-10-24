import { useSelector } from "react-redux";

import { ConfirmModal } from "@/components";
import { getModalState } from "@/redux/slices/modalSlice";
import { ReactNode } from "react";

const Modal = ({
	children,
	...props
}: {
	children?: ReactNode;
	handleConfirm?: () => void;
}) => {
	const { type, reduxProps } = useSelector(getModalState);

	const renderModal = () => {
		switch (type) {
			case "CONFIRM":
				return <ConfirmModal {...props}>{children}</ConfirmModal>;
			// case 'FORM': return <FormModal {...reduxProps} />;
			// case 'LIST': return <ListModal {...reduxProps} />;
			default:
				return null;
		}
	};

	return renderModal();
};

export default Modal;
