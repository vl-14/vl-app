import { Layout, UserProfile } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchUsers, getUsersData } from "@/redux/slices/userSlice";
import { UserProfileProps } from "@/types/components";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";

const SortFe = ({ cookie }: { cookie: any }) => {
	const dispatch = useAppDispatch();
	const { data: users, loading, error } = useAppSelector(getUsersData);

	useEffect(() => {
		if (loading === "IDLE") {
			dispatch(fetchUsers({ wish: "someWish", cookie: cookie }));
		}
	}, [loading, dispatch]);

	if (loading === "PENDING") return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

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

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const cookie = context.req.headers.cookie;

	return { props: { cookie } };
};

export default SortFe;
