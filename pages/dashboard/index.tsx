import { Layout, UserProfile } from "@/components";
import { UserProfileProps } from "@/types/components";
import { FilterCriteria } from "@/types/hooks";
import axios from "axios";
import { GetServerSideProps } from "next";

type DashboardProps = {
	users?: [];
};

const Dashboard = ({ users = [] }: DashboardProps) => {
	return (
		<Layout>
			<div className="my-4">
				<p>
					On this page, we use <code>getServerSideProps</code> to
					fetch data from the proxy server and send filter criteria.
					The server fetches all data and applies filters based on the
					provided criteria. This allows the API to support search
					functions with criteria in the format:
				</p>

				<pre className="bg-gray-100 p-4 mt-2 rounded">
					<code>
						{`[
    { "criteria": "first_name", "method": "startsWith", "searchText": "G" },
    { "criteria": "last_name", "method": "startsWith", "searchText": "W" }
]`}
					</code>
				</pre>

				<p>
					The filtered data is then passed as props to the page for
					display.
				</p>
			</div>

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
		const filterCriteria: FilterCriteria[] = [
			{ criteria: "first_name", method: "startsWith", searchText: "G" },
			{ criteria: "last_name", method: "startsWith", searchText: "W" },
		];
		const operation = "OR";
		const payload = {
			wish: "FILTERED_DATA",
			filterCriteria,
			operation,
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
