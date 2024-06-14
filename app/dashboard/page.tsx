import RepoList from "./components/list";

interface IItemProps {
	name: string;
	href: string;
	description: string;
}

export default async function Dashboard() {
	return <RepoList />;
}
