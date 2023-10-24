import { Layout, UserProfile } from "@/components";
import { UserProfileProps } from "@/types/components";
import axios from "axios";
import { GetServerSideProps } from "next";

type DashboardProps = {
	users?: [];
};

const Dashboard = ({ users = [] }: DashboardProps) => {
	return (
		<Layout>
			<div className="flex flex-wrap justify-center gap-4">
				{users.map((profile: UserProfileProps) => (
					<UserProfile key={profile.id} profile={profile} />
				))}
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const apiUrl = `${process.env.HOMEURL}/api/backend/user`;

	try {
		const payload = {
			wish: "BACKEND_SORT",
		};

		const res = await axios.post(apiUrl, payload, {
			headers: context.req.headers,
		});
		const users = res.data;

		return {
			props: {
				users,
			},
		};
	} catch (error: any) {
		return { notFound: true };
	}
};

export default Dashboard;
