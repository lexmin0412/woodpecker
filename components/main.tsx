"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import IconGithub from "./../components/icons/github";
import Logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Main({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	console.log("pathname", pathname);

	const sidebar = (
		<div className="h-full w-60 bg-[#192231]">
			<div className="flex items-center justify-between h-20 px-4">
				<Link href="/">
					<Image src={Logo} alt="Woodpecker Logo" width={32} height={32} />
				</Link>
				<a href="https://github.com/lexmin0412/woodpecker" target="_blank">
					<IconGithub className="text-sm w-9 h-9" />
				</a>
			</div>
			<Sidebar />
		</div>
	);

	const content = (
		<div className="bg-[#1F2937] h-full overflow-hidden flex-1 flex flex-col">
			{children}
		</div>
	);

	return (
		<>
			{["/", "/login"].includes(pathname) ? null : sidebar}
			{content}
		</>
	);
}
