"use client";

import fetch from "@toolkit-fe/request";
import { useEffect, useRef, useState } from "react";

interface EditorProps {
	// onGen: () => void;
}

export default function Editor(props: EditorProps) {
	const userNameRef = useRef<HTMLInputElement>(null);
	const repoNameRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLTextAreaElement>(null);
	const [content, setContent] = useState<string>("");

	const getRepoReadme = (userName: string, repoName: string) => {
		return fetch(
			`https://api.github.com/repos/${userName}/${repoName}/readme`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		).then((res: any) => {
			if (res.message === "Not Found") {
				throw new Error(
					`https://api.github.com/repos/${userName}/${repoName}/readme.md 指向的文件不存在, 请确保仓库中存在该文件`
				);
			}
			return Buffer.from(res.content, "base64").toString();
		});
	};

	async function handleClick() {
		console.log("fetch begin");
		// const result = await getRepoReadme("lexmin0412", "woodpecker");
		// props.onGen()
		const result = (await fetch("/api/repos", {
			method: "post",
			body: JSON.stringify({
				userName: userNameRef.current?.value,
				repoName: repoNameRef.current?.value,
			}),
		})) as string;
		console.log("result", result);
		setContent(result);
		if (contentRef.current) {
			console.log("contentRef.current", contentRef.current);
			contentRef.current.value = result;
		}
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-10 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" action="#" method="POST">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
							<div className="text-sm">
								<a
									href="#"
									className="font-semibold text-indigo-600 hover:text-indigo-500"
								>
									Forgot password?
								</a>
							</div>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign in
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{" "}
					<a
						href="#"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Start a 14 day free trial
					</a>
				</p>
			</div>
		</div>
	);
}
