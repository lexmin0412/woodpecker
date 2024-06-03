import React from "react";
import Logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import Demo from '../assets/demo.png'
import IconGithub from "./../components/icons/github";

console.log("process.cwd", process.cwd());

export default async function Home() {
	return (
		<div className="bg-white h-full flex flex-col">
			<header className="absolute inset-x-0 top-0 z-50">
				<nav
					className="flex items-center justify-between p-6 lg:px-8"
					aria-label="Global"
				>
					<div className="flex lg:flex-1 items-center">
						<Link href="/">
							<Image src={Logo} alt="Woodpecker Logo" width={32} height={32} />
						</Link>
						{/* <span className='text-gray-900 ml-2 font-semibold text-xl'>Woodpecker</span> */}
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</button>
					</div>
					{/* <div className="hidden lg:flex lg:gap-x-12">
							<a
								href="#"
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								Product1
							</a>
							<a
								href="#"
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								Features
							</a>
							<a
								href="#"
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								Marketplace
							</a>
							<a
								href="#"
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								Company
							</a>
						</div> */}
					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						<Link href="https://github.com/lexmin0412/woodpecker" target="_blank">
							<IconGithub className="text-sm w-9 h-9" />
						</Link>
					</div>
				</nav>
				<div className="lg:hidden" role="dialog" aria-modal="true">
					<div className="fixed inset-0 z-50"></div>
					<div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<a href="#" className="-m-1.5 p-1.5">
								<span className="sr-only">Your Company</span>
								<img
									className="h-8 w-auto"
									src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
									alt=""
								/>
							</a>
							<button
								type="button"
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
							>
								<span className="sr-only">Close menu</span>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Product
									</a>
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Features
									</a>
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Marketplace
									</a>
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Company
									</a>
								</div>
								<div className="py-6">
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Log in
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className="relative isolate px-6 pt-14 lg:px-8 flex-1 pb-6 overflow-hidden flex flex-col  justify-center">
				<div className="mx-auto max-w-2xl py-32 sm:py-48">
					{/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
						<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
							Announcing our next round of funding.{" "}
							<a href="#" className="font-semibold text-indigo-600">
								<span className="absolute inset-0" aria-hidden="true"></span>
								Read more <span aria-hidden="true">&rarr;</span>
							</a>
						</div>
					</div> */}
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							Woodpecker
						</h1>
						<p className="my-6 text-lg leading-8 text-gray-600">
							一只啄木鸟，随时检测你的项目健康度。
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link
								href="/dashboard"
								className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Dashboard
							</Link>
							<Link
								target="_blank"
								href="https://github.com/lexmin0412/woodpecker"
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								Learn more <span aria-hidden="true">→</span>
							</Link>
						</div>
						<Image alt="演示图片" className="mt-8 rounded-2xl" src={Demo} />
					</div>
				</div>
			</div>
		</div>
	);
}
