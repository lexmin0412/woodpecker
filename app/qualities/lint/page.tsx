"use client";

import fetch from "@toolkit-fe/request";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface IProblem {
	type: "warning" | "error";
	otherProps: {
		file: string;
		line: string;
		endLine: string;
		col: string;
		endColumn: string;
		title: string;
	};
}

export default function LintQualityPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const [content, setContent] = useState<IProblem[]>([]);
	const userName = searchParams.userName;
	const repoName = searchParams.repoName;
	const [loading, setLoading] = useState(false);
	const [errText, setErrText] = useState<string>("");
	const [lastUpdated, setLastUpdated] = useState<string>("");

	const initContent = async () => {
		console.log("searchParams", searchParams);
		const platform = "github";
		if (searchParams.userName && searchParams.repoName) {
			const content = (await fetch(
				`/api/qualities/lint?userName=${userName}&repoName=${repoName}&platform=${platform}`,
				{
					method: "get",
				}
			)) as string;
			const parsedContent = JSON.parse(content);
			if (parsedContent.code === 200) {
				setContent(JSON.parse(parsedContent.data));
				setLastUpdated(new Date(parsedContent.lastModified).toLocaleString());
				setErrText("");
			} else if (parsedContent.code === 404) {
				console.error(parsedContent.message);
				setErrText("记录不存在，请点击检测按钮初始化数据");
			} else {
				console.error("请求错误", parsedContent.message);
			}
		}
	};

	useEffect(() => {
		initContent();
	}, []);

	const handleClick = async () => {
		setLoading(true);
		try {
			const result = (await fetch("/api/repos", {
				method: "post",
				body: JSON.stringify({
					userName: userName,
					repoName: repoName,
				}),
			})) as string;
			setContent(JSON.parse(result));
			console.log("result", result);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	const typeCountMap = useMemo(() => {
		return {
			warning: content.filter((item) => item.type === "warning")?.length,
			error: content.filter((item) => item.type === "error")?.length,
		};
	}, [content]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="h-20 px-6 w-full flex justify-between items-center border-b border-solid border-gray-700">
				<div className="text-2xl font-semibold">{searchParams.repoName}</div>
				<button
					disabled={loading}
					className="text-sm rounded h-7 leading-7 w-16 bg-blue-600  text-gray-100 hover:scale-105 transition-all"
					onClick={handleClick}
				>
					检测
				</button>
			</div>
			<div className="flex-1 flex-col flex overflow-hidden w-full">
				<div className="flex items-center justify-between px-6 py-4">
					<div className="text-left">
						{typeCountMap.error} Errors, {typeCountMap.warning} Warnings.
					</div>
					{errText ? (
						<div className="text-red-600">{errText}</div>
					) : (
						<div>最后更新时间：{lastUpdated || '未知'}</div>
					)}
				</div>
				<div className="flex-1 overflow-auto px-6">
					{content?.map((item: IProblem) => {
						return (
							<div className="border border-solid border-gray-600 p-3 rounded-xl mb-2" key={`${item.type}-${item.otherProps.file}-${item.otherProps.line}-${item.otherProps.col}`}>
								<div className="flex items-start">
									<div>{item.type}</div>
									<span className="mr-1">:</span>
									<div className="text-yellow-600">{item.otherProps.title}</div>
								</div>
								<div>
									<span className="mr-1 mt-1">file:</span>
									<span>{"["}</span>
									<Link
										className="text-blue-600 hover:underline cursor-pointer"
										href={`https://github.com/${userName}/${repoName}/blob/main/${item.otherProps.file}#L${item.otherProps.line}`}
										target='_blank'
									>
										{item.otherProps.file}
										{":"}
										{item.otherProps.line}
									</Link>
									<span>{":"}</span>
									<span>{item.otherProps.col}</span>
									<span>{"]"}</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
