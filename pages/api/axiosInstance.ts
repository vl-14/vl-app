import axios from "axios";
import { NextApiRequest } from "next";
const BASE_URL = process.env.APIURL;

const axiosInstance = async (req?: NextApiRequest) => {
	const axiosObj = axios.create({
		baseURL: BASE_URL,
	});

	axiosObj.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			return Promise.reject({
				status: error?.response?.status || 500,
				data: error?.response?.data || {},
			});
		}
	);

	return axiosObj;
};

export default axiosInstance;
