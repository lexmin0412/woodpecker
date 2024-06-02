async function getData() {
	const res = await fetch("https://api.github.com/users/lexmin0412/repos");
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	const repoList = await res.json();

	return repoList?.map((item) => {
		return {
			name: item.name,
			description: item.description,
			href: item.html_url,
		};
	});
}

interface IItemProps {
	name: string;
	href: string;
	description: string;
}

const Item = (props: IItemProps) => {
	return (
		<div
			key={props.name}
			className="group relative flex gap-x-6 py-4 border-0 border-b border-solid border-gray-700"
		>
			<div>
				<a href={props.href} className="text-white" target='_blank'>
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
		</div>
	);
};

export default async function Dashboard() {
	const item = {
		name: "名称",
		description: "描述",
		href: "/",
	};

	const data = await getData();

	console.log("data11", data);

	return (
		<div className="h-full overflow-auto px-2">
			{data.map((item) => {
				return <Item key={item.name} {...item} />;
			})}
		</div>
	);
}
