"use client";

import { useEffect, useState } from "react";
import { getAuthURL, getData, getEnvConfig, getToken } from "../actions";
import { useSearchParams } from "next/navigation";

interface IItemProps {
	name: string;
	href: string;
	description: string;
}

export default function RepoList() {
	const [data, setData] = useState([]);
	const [pending, setPending] = useState(false);
	const searchParams = useSearchParams();
	const code = new URLSearchParams(searchParams).get("code");
	const [authURL, setAuthURL] = useState("");
	const [userName, setUserName] = useState("");

	const fetchDataList = async (formData?: FormData) => {
		setPending(true);
		const data = await getData(
			localStorage.getItem("GITHUB_TOKEN") as string,
			formData
		);
		setData(data);
		setPending(false);
	};

	const refreshToken = async () => {
		const res = await getToken(code as string);
		if (res.access_token) {
			localStorage.setItem("GITHUB_TOKEN", res.access_token);
			return res.access_token;
		}
	};

	const initAuthURL = async () => {
		const res = await getAuthURL();
		setAuthURL(res);
	};

	const initUserName = async () => {
		const res = await getEnvConfig("GITHUB_DEFAULT_ORG");
		setUserName(res as string);
	};

	const init = async() => {
		const githubAccessToken = localStorage.getItem("GITHUB_TOKEN");

		if (githubAccessToken) {
			// 如果有 token 则直接请求列表
			fetchDataList();
		} else if (code) {
			// 有 code 则通过 code 换 token
			await refreshToken();
			init()
		} else {
			// 没有则展示授权入口
			initAuthURL();
		}
	};

	useEffect(() => {
		init();

		initUserName();
	}, []);

	const Item = (props: IItemProps) => {
		return (
			<div
				key={props.name}
				className="group relative gap-x-6 py-4 border-0 border-b border-solid border-gray-700"
			>
				<a
					href={`/qualities/lint?userName=${userName}&repoName=${props.name}`}
					className="text-white"
				>
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
		<form
			className="h-full flex flex-col overflow-hidden"
			action={fetchDataList}
		>
			<header className="flex items-center justify-between px-6 h-20 border-b border-solid border-gray-700">
				<input
					name="keyword"
					type="search"
					placeholder="请输入仓库名"
					className="bg-gray-800 text-white border-gray-700 px-4 outline-none border-solid border  h-10 leading-10 text-sm rounded-3xl w-60"
				/>
				{authURL ? <a href={authURL}>授权</a> : null}
			</header>
			<div className="overflow-auto px-6 flex-1">
				{pending
					? "加载中..."
					: data.map((item: IItemProps) => {
							return <Item key={item.name} {...item} />;
					  })}
			</div>
		</form>
	);
}
