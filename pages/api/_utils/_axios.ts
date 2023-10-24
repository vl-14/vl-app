import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { acquireToken, isAuthenticated } from "@/pages/api/_utils";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiCallParams {
	method: HttpMethod;
	endpoint: string;
	params?: Record<string, any>;
	data?: Record<string, any>;
	req: NextApiRequest;
	res: NextApiResponse;
	withAuth?: boolean;
	withToken?: boolean;
}

const baseURL = process.env.APIURL;

if (!baseURL) {
	throw new Error("APIURL environment variable is not defined.");
}

const _axios = async ({
	method,
	endpoint,
	params,
	data,
	req,
	res,
	withAuth = false,
	withToken = false,
}: ApiCallParams): Promise<AxiosResponse<Record<string, any>>> => {
	let headers: Record<string, string> = {};
    
	if (req) {
		if (withAuth && !isAuthenticated(req, res)) {
			throw new Error("Unauthorized");
		}
        
		if (withToken) { //This is just for demonstration. In real world scenarios where you need to pass a bearer token.
			const token = await acquireToken(req);
			if (!token) {
				throw new Error("Failed to acquire token.");
			}
			headers.Authorization = `Bearer ${token}`;
		}
	}
	const axiosConfig: AxiosRequestConfig = {
		method,
		url: `${baseURL}${endpoint}`,
		params: method === "GET" ? params : undefined,
		data: ["POST", "PUT", "PATCH"].includes(method) ? data : undefined,
		headers,
	};

	try {
		return await axios(axiosConfig);
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message || "Internal Server Error"
		);
	}
};

export default _axios;
