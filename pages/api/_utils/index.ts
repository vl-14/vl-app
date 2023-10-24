import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { auth } from "@/pages/api/auth/[...nextauth]";

const secret = process.env.NEXTAUTH_SECRET;

const acquireToken = async (req: NextApiRequest): Promise<string | null> => {
	const token = await getToken({ req, secret, raw: true });
	return token;
};

const isAuthenticated = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<boolean> => {
	const session = await auth(req, res);
	return Boolean(session);
};

export { acquireToken, isAuthenticated };
