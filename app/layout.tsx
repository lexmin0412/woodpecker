import type { Metadata } from "next";
import { Inter } from "next/font/google";
import IconGithub from "./../components/icons/github";
import Logo from "../assets/logo.png";
import Image from "next/image";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Woodpecker",
  description: "你的代码仓库健康检查工具。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
		<html lang="en">
			<body
				className={`${inter.className} text-white flex items-center h-screen`}
			>
				<div className="h-full w-60 bg-[#192231]">
					<div className="flex items-center justify-between h-20 px-4">
						<Link href='/'>
							<Image src={Logo} alt="Woodpecker Logo" width={32} height={32} />
						</Link>
						<a href="https://github.com/lexmin0412/woodpecker" target="_blank">
							<IconGithub className="text-sm w-9 h-9" />
						</a>
					</div>
					<Sidebar />
				</div>

				<div className="bg-[#1F2937] h-full overflow-hidden flex-1 flex flex-col">
					{children}
				</div>
			</body>
		</html>
	);
}
