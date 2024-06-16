"use client"

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
	const [currentMenu, setCurrentMenu] = useState("problems");

	return (
		<div className="px-4">
			<div className="text-gray-400 text-xs h-9 leading-9">代码质量</div>
			<div>
				<Link
					className={`text-sm h-10 leading-10 hover:text-white cursor-pointer px-2 rounded-xl ${
						currentMenu === "problems"
							? "text-white bg-[#1F2937]"
							: "text-gray-400"
					}`}
					href='/dashboard'
				>
					规范检测
				</Link>
			</div>
		</div>
	);
}
