import axios, { AxiosResponse, AxiosError, Method } from "axios";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

type AxiosConfig = {
	method: Method;
	url: string;
	headers?: Record<string, string>;
	data?: any;
};

type execAxiosParams = {
	method: Method;
	endPoint: string;
	req?: NextApiRequest;
	data?: any;
	withAuth?: boolean;
};

/**
 * Get the bearer token from NextAuth.
 * Update jwt from NextAuth to configure different way of handling jwt if needed.
 */

const getBearerToken = async (req: NextApiRequest): Promise<string | null> => {
	const token = await getToken({
		req,
		secret: process.env.NEXTAUTH_SECRET,
		raw: true,
	});
	return token || null;
};

/**
 * Build and execute an Axios request.
 *
 * @param method - HTTP method (e.g., 'GET', 'POST')
 * @param endpoint - API endpoint path
 * @param data - Request body data (for POST, PUT, etc.)
 * @param withAuth - Flag to include Authorization header
 * @param req - Next API request object
 */

const execAxios = async ({
	method,
	endPoint,
	req,
	data = {},
	withAuth = false,
}: execAxiosParams): Promise<AxiosResponse | AxiosError> => {
	const baseUrl = process.env.APIURL || "http://localhost:3000"; //Set this according to environment.

	const config: AxiosConfig = {
		method,
		url: `${baseUrl}${endPoint}`,
	};

	if (withAuth && req) {
		const token = await getBearerToken(req);
		if (!token) {
			// Mimic Axios error format for consistent error handling
			return Promise.reject({
				response: {
					status: 401,
					data: { message: "Unauthorized: Token is missing" },
				},
			});
		}
		config.headers = {
			Authorization: `Bearer ${token}`,
		};
	}
	if (["POST", "PUT", "PATCH"].includes(method.toUpperCase()) && data) {
		config.data = data;
	}
	return axios(config)
		.then((response) => response)
		.catch((error: AxiosError) => {
			return Promise.reject(error);
		});
};

export default execAxios;
