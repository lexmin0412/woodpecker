"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarList = [
	{
		title: "质量管理",
		children: [
			{
				title: "代码质量",
				path: "/qualities",
			},
		],
	},
	{
		title: "设置",
		children: [
			{
				title: "工作区",
				path: "/settings/workspaces",
			},
		],
	},
];

export default function Sidebar() {
	const pathname = usePathname()

	return (
		<div className="px-4">
			{sidebarList.map((item) => {
				return (
					<div key={item.title}>
						<div className="text-gray-400 text-xs h-9 leading-9">
							{item.title}
						</div>
						{item.children?.map((child) => {
							return (
								<div key={`${item.title}${child.path}`}>
									<Link
										key={child.path}
										className={`text-sm h-10 leading-10 hover:text-white cursor-pointer px-2 rounded-xl ${
											pathname.startsWith(child.path)
												? "text-white bg-[#1F2937]"
												: "text-gray-400"
										}`}
										href={child.path}
									>
										{child.title}
									</Link>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
