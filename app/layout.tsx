import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Main from "@/components/main";

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
				<Main>{children}</Main>
			</body>
		</html>
	);
}
