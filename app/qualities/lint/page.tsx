"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

/**
 * 质量检测页面
 */
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
	const [tabValue, setTabValue] = useState('lint')

	const initContent = async (tab?: 'lint' | 'unused') => {
		const platform = "github";
		if (searchParams.userName && searchParams.repoName) {
			const content = (await fetch(
				`/api/qualities/lint?userName=${userName}&repoName=${repoName}&platform=${platform}&tool=${tab || tabValue}`,
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
					tool: tabValue
				}),
			})) as string;
			setContent(JSON.parse(result));
			// 检测完毕之后执行初始化逻辑
			initContent()
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	const typeCountMap = useMemo(() => {
		if (!content.length || typeof content === 'string') {
			return {
				warning: 0,
				error: 0
			}
		}
		return {
			warning: content.filter((item) => item.type === "warning")?.length,
			error: content.filter((item) => item.type === "error")?.length,
		};
	}, [content]);

	const FunctionTabs = [
		{
			value: 'lint',
			label: 'Lint'
		},
		{
			value: 'unused',
			label: 'Unused'
		}
	]

	const handleTabChange = (newTab: string) => {
		setTabValue(newTab)
		setContent([])
		initContent(newTab as 'lint' | 'unused')
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="h-20 px-6 w-full flex justify-between items-center border-b border-solid border-gray-700">
				<div className="text-2xl font-semibold">{searchParams.repoName}</div>
				<button
					disabled={loading}
					className="text-sm rounded h-7 leading-7 w-16 bg-blue-600  text-gray-100 hover:scale-105 transition-all"
					onClick={handleClick}
				>
					{loading ? "检测中..." : "检测"}
				</button>
			</div>

			<div className="flex-1 flex-col flex overflow-hidden w-full px-6 py-6">
				<Tabs
					defaultValue="lint"
					value={tabValue}
					onValueChange={handleTabChange}
					className="w-full h-full flex flex-col"
				>
					<TabsList className={`grid w-full grid-cols-2`}>
						{FunctionTabs.map((item) => {
							return (
								<TabsTrigger key={item.value} value={item.value}>
									{item.label}
								</TabsTrigger>
							);
						})}
					</TabsList>
					{tabValue === "lint" ? (
						<TabsContent value="lint" className="flex-1 overflow-y-auto">
							<Card>
								<CardHeader>
									<CardTitle>
										{typeCountMap.error} Errors, {typeCountMap.warning}{" "}
										Warnings.
									</CardTitle>
									<CardDescription>
										{errText ? (
											<div className="text-red-600">{errText}</div>
										) : (
											<div>最后更新时间：{lastUpdated || "未知"}</div>
										)}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="flex-1 overflow-auto">
										<Table>
											<TableCaption>
												共 {content?.length || 0} 条
											</TableCaption>
											<TableHeader>
												<TableRow>
													<TableHead className="w-[100px]">类型</TableHead>
													<TableHead>原因</TableHead>
													<TableHead>文件路径</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{content?.map((child) => (
													<TableRow
														key={`${child.type}-${child.otherProps?.file}-${child.otherProps?.line}-${child.otherProps?.col}`}
													>
														<TableCell className="font-medium">
															{child.type}
														</TableCell>
														<TableCell className="font-medium">
															{child.otherProps?.title}
														</TableCell>
														<TableCell>
															<Link
																className="text-blue-600 hover:underline cursor-pointer"
																href={`https://github.com/${userName}/${repoName}/blob/main/${child.otherProps?.file}#L${child.otherProps?.line}`}
																target="_blank"
															>
																{child.otherProps?.file}
																{":"}
																{child.otherProps?.line}
																{':'}
																{child.otherProps?.col}
															</Link>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					) : tabValue === "unused" ? (
						<TabsContent value="unused" className="flex-1 overflow-y-auto">
							<Card>
								<CardHeader>
									<CardTitle>未使用模块</CardTitle>
									<CardDescription>
										{errText ? (
											<div className="text-red-600">{errText}</div>
										) : (
											<div>最后更新时间：{lastUpdated || "未知"}</div>
										)}
										本结果使用 knip v5.20 输出。
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-2">
									<div className="text-lg font-semibold">未使用文件</div>
									<Table>
										<TableCaption>
											共 {content.files?.length || 0} 条
										</TableCaption>
										<TableHeader>
											<TableRow>
												<TableHead className="w-[100px]">Name</TableHead>
												<TableHead>File Link</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{content.files?.map((child) => (
												<TableRow key={child}>
													<TableCell className="font-medium">{child}</TableCell>
													<TableCell>
														<Link
															target="_blank"
															href={`https://github.com/${userName}/${repoName}/blob/main/${child}`}
															className="hover:text-blue-600 hover:underline"
														>
															{`https://github.com/${userName}/${repoName}/blob/main/${child}`}
														</Link>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
									{/* 子类型 */}
									<div className="text-lg font-semibold">未使用的其他模块</div>
									<Accordion type="single" collapsible>
										{content.issues?.map((issue) => {
											const children = Object.keys(issue)
												.filter((key) => {
													return issue[key].length && key !== "file";
												})
												.reduce((prev, cur) => {
													console.log("issue[cur]", issue[cur]);
													return prev.concat(
														issue[cur].map((child) => {
															return {
																...child,
																type: cur,
															};
														})
													);
												}, []);
											return (
												<AccordionItem key={issue.file} value={issue.file}>
													<AccordionTrigger>{issue.file}</AccordionTrigger>
													<AccordionContent>
														<Table>
															<TableCaption>
																共 {children.length} 条
															</TableCaption>
															<TableHeader>
																<TableRow>
																	<TableHead className="w-[100px]">
																		Name
																	</TableHead>
																	<TableHead>Unused Type</TableHead>
																	<TableHead>Code Link</TableHead>
																</TableRow>
															</TableHeader>
															<TableBody>
																{children.map((child) => (
																	<TableRow key={`${child.name}-${child.type}`}>
																		<TableCell className="font-medium w-[200px]">
																			{child.name}
																		</TableCell>
																		<TableCell className="w-[200px]">
																			{child.type}
																		</TableCell>
																		<TableCell>
																			<Link
																				target="_blank"
																				href={`https://github.com/${userName}/${repoName}/blob/main/${issue.file}#L${child?.line}`}
																				className="hover:text-blue-600 hover:underline"
																			>
																				{`https://github.com/${userName}/${repoName}/blob/main/${issue.file}#L${child?.line}`}
																			</Link>
																		</TableCell>
																	</TableRow>
																))}
															</TableBody>
														</Table>
														{/* {children?.map((child) => {
																return (
																	<div
																		className="py-2 flex items-center"
																		key={`${child.name}-${child.type}`}
																	>
																		<div className="w-64">{child.name}</div>
																		{child.type}
																	</div>
																);
															})} */}
													</AccordionContent>
												</AccordionItem>
											);
										})}
									</Accordion>
									{/* <Tabs defaultValue="lint" onValueChange={handleTabChange} className='w-full'>
										<TabsList className={`w-full flex items-center overflow-auto flex-shrink-0 justify-start scroll`}>
											{
												content.map((item)=>{
													return (
														<TabsTrigger key={item.type} value={item.type}>{item.type}</TabsTrigger>
													)
												})
											}
										</TabsList>
									</Tabs> */}
									{/* {
										content.map((item)=>{
											return (
												<div key={item.type}>
													{item.type}

													{item.children?.map((child)=>{
														return (

														)
													})}
												</div>
											)
										})
									} */}
								</CardContent>
							</Card>
						</TabsContent>
					) : null}
				</Tabs>
			</div>
		</div>
	);
}
