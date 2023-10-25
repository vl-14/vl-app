import { Layout, UserProfile } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useFilteredUsers } from "@/hooks/use-filter-users";
import { fetchUsers, getUsersData } from "@/redux/slices/userSlice";
import { UserProfileProps } from "@/types/components";
import { FilterCriteria } from "@/types/hooks";
import { useEffect } from "react";

const Example2 = () => {
	const dispatch = useAppDispatch();
	const { loading, error } = useAppSelector(getUsersData);

	useEffect(() => {
		if (loading === "IDLE") {
			dispatch(fetchUsers({ wish: "ALL_DATA" }));
		}
	}, [loading, dispatch]);

	const filterCriteria: FilterCriteria[] = [
		{ criteria: "last_name", method: "endsWith", searchText: "s" },
	];

	const operation = "OR";
	const filteredUsers = useFilteredUsers(filterCriteria, operation);

	if (loading === "PENDING") return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<Layout>
			<div className="my-4">
				<p>
					On this page, the frontend gets data from the proxy server
					using
				</p>

				<code className="bg-gray-100 px-2 py-1 rounded">
					async thunks
				</code>

				<p>
					. The server fetches all the data recursively and sends it
					back to the client side. We handle filtering with the
				</p>

				<code className="bg-gray-100 px-2 py-1 rounded">
					useFilteredUsers
				</code>

				<p>
					hook, and there's potential to enhance it for a more robust
					frontend search in future iterations.
				</p>
			</div>

			<div className="flex flex-wrap justify-center gap-4">
				{filteredUsers.map((profile: UserProfileProps) => (
					<UserProfile key={profile.id} profile={profile} />
				))}
			</div>
		</Layout>
	);
};

export default Example2;
