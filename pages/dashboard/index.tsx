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
		const res = await axios.get(apiUrl);
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
