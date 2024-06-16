'use client'
import { Button } from "@/components/ui/button";
import { deleteWorkspace, getWorkspaceList } from "./../actions";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { AddForm } from "./add-form";
import dayjs from 'dayjs'

interface IItemProps {
	id: string
	name: string
	domain: string
	created_at: string
}

export default function WorkspaceList() {

	const [data, setData] = useState<IItemProps[]>([])
	const [addDialogVisible, setAddDialogVisible] = useState(false)

	const getList = async () => {
		const data = await getWorkspaceList();
	console.log("data22", data);
	setData(data)
	}

	useEffect(() => {
		getList()
	}, [])

	const handleAddSuccess = () =>  {
		setAddDialogVisible(false)
		getList()
	}

	const handleDelete = async(id: string) => {
		await deleteWorkspace(id)
		getList()
	}

	const Item = (props: IItemProps) => {
		return (
			<div
				key={props.name}
				className="group gap-x-6 py-4 border-0 border-b border-solid border-gray-700 flex items-center"
			>
				<div className="flex-grow relative">
					<div className="text-white">
						<div className="flex items-center">
							<div className="bg-green-200 rounded-[50%] w-2 h-2 flex items-center justify-center mr-2">
								<div className="bg-green-500 rounded-[50%] w-1 h-1" />
							</div>
							<div className="font-semibold">{props.name}</div>
						</div>
						<span className="absolute inset-0" />
					</div>
					<p className="mt-1 text-gray-600">
						创建时间:{" "}
						{dayjs(Number(props.created_at)).format("YYYY-MM-DD HH:mm:ss")}
					</p>
				</div>
				<Button variant="link" className="text-orange-600 cursor-pointer"
					onClick={()=>handleDelete(props.id)}
				>
					删除
				</Button>
			</div>
		);
	};

	return (
		<div className="h-full flex flex-col overflow-hidden">
			<header className="flex items-center justify-between px-6 h-20 border-b border-solid border-gray-700">
				<input
					name="keyword"
					type="search"
					placeholder="搜索"
					className="bg-gray-800 text-white border-gray-700 px-4 outline-none border-solid border  h-10 leading-10 text-sm rounded-3xl w-60"
				/>
				<Dialog
					open={addDialogVisible}
					onOpenChange={(open: boolean) => setAddDialogVisible(open)}
				>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							className="text-black"
							onClick={() => setAddDialogVisible(true)}
						>
							新增
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px] text-black">
						<DialogHeader>
							<DialogTitle>新增工作区</DialogTitle>
							<DialogDescription>
								新增工作区之后，你可以在这里监控你的项目质量。
							</DialogDescription>
						</DialogHeader>
						<AddForm onSuccess={handleAddSuccess} />
					</DialogContent>
				</Dialog>
			</header>
			<div className="overflow-auto px-6 flex-1">
				{
					data.map((item: any)=>{
						return (
							<Item key={item.id}
								{...item}
							/>
						)
					})
				}
			</div>
		</div>
	);
}
