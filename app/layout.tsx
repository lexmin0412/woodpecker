import type { Metadata } from "next";
import { Inter } from "next/font/google";
import IconGithub from "./../components/icons/github";
import Logo from "../assets/logo.png";
import Image from "next/image";
import "./globals.css";
import Sidebar from "@/components/sidebar";

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
						<Image src={Logo} alt="Woodpecker Logo" width={32} height={32} />
						<a href="https://github.com/lexmin0412/woodpecker" target="_blank">
							<IconGithub className="text-sm w-9 h-9" />
						</a>
					</div>
					<Sidebar />
				</div>

				<div className="bg-[#1F2937] h-full overflow-hidden flex-1 flex flex-col">
					<header className="flex items-center justify-between px-6 h-20 border-b border-solid border-gray-700">
						<input type="search" placeholder='请输入仓库名' className='bg-gray-800 text-white border-gray-700 px-4 outline-none border-solid border  h-10 leading-10 text-sm rounded-3xl w-60'	 />
					</header>
					<div className="p-6 flex-1 overflow-auto">{children}</div>
				</div>
			</body>
		</html>
	);
}
