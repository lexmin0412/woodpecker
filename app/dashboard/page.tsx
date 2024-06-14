import { Suspense } from "react";
import RepoList from "./components/list";

interface IItemProps {
	name: string;
	href: string;
	description: string;
}

export default async function Dashboard() {
	return (
		<Suspense fallback='页面初始化中...'>
			<RepoList />
		</Suspense>
	)
}
