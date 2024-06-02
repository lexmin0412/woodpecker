"use client"

import { useState } from "react";

export default function Sidebar() {
	const [currentMenu, setCurrentMenu] = useState("problems");

	const handleClick = (name: string) => {
		setCurrentMenu(name);
	};

	console.log("currentMenu", currentMenu);

	return (
		<div className="px-4">
			<div className="text-gray-400 text-xs h-9 leading-9">代码质量</div>
			<div>
				<div
					className={`text-sm h-10 leading-10 hover:text-white cursor-pointer px-2 rounded-xl ${
						currentMenu === "problems"
							? "text-white bg-[#1F2937]"
							: "text-gray-400"
					}`}
					onClick={() => handleClick("problems")}
				>
					规范检测
				</div>
			</div>
		</div>
	);
}
