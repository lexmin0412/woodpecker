interface IItemProps {
	name: string;
	href: string;
	description: string;
}

export default async function Dashboard() {

	const userName = "lexmin0412";

	async function getData() {
		const res = await fetch(`https://api.github.com/users/${userName}/repos?sort=updated&per_page=100&type=owner`);
		// The return value is *not* serialized
		// You can return Date, Map, Set, etc.

		if (!res.ok) {
			// This will activate the closest `error.js` Error Boundary
			throw new Error("Failed to fetch data");
		}

		const repoList = await res.json();

		return repoList?.map((item: any) => {
			return {
				name: item.name,
				description: item.description,
				href: item.html_url,
			};
		})
	}
	const data = await getData();

	const Item = (props: IItemProps) => {
		return (
			<div
				key={props.name}
				className="group relative gap-x-6 py-4 border-0 border-b border-solid border-gray-700"
			>
				<a href={`/qualities/lint?userName=${userName}&repoName=${props.name}`} className="text-white">
					<div className="flex items-center">
						<div className="bg-green-200 rounded-[50%] w-2 h-2 flex items-center justify-center mr-2">
							<div className="bg-green-500 rounded-[50%] w-1 h-1" />
						</div>
						<div className="font-semibold">{props.name}</div>
					</div>
					<span className="absolute inset-0" />
				</a>
				<p className="mt-1 text-gray-600">{props.description}</p>
			</div>
		);
	};

	return (
		<div className="h-full flex flex-col overflow-hidden">
			<header className="flex items-center justify-between px-6 h-20 border-b border-solid border-gray-700">
				<input
					type="search"
					placeholder="请输入仓库名"
					className="bg-gray-800 text-white border-gray-700 px-4 outline-none border-solid border  h-10 leading-10 text-sm rounded-3xl w-60"
				/>
			</header>
			<div className="overflow-auto px-6 flex-1">
				{data.map((item: IItemProps) => {
					return <Item key={item.name} {...item} />;
				})}
			</div>
		</div>
	);
}
