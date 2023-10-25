import { AxiosError } from "axios";
import { NextApiResponse } from "next";

const errorAxios = (
	error: AxiosError,
	res: NextApiResponse,
	cb?: () => void
) => {
	const status = error?.response?.status || 500;
	let message: string;

	switch (status) {
		case 404:
			message = "Resource not found";
			break;
		case 500:
			message = "Internal server error";
			break;
		default:
			message = "An error occurred";
			break;
	}
	cb?.();
	res.status(status).json({ error: message });
};

export default errorAxios;
