"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { DialogFooter } from "@/components/ui/dialog";
import { addWorkspace } from "../actions";

const FormSchema = z.object({
	domain: z.string().min(2, {
		message: "domain must be at least 2 characters.",
	}),
	name: z.string().min(2, {
		message: "name must be at least 2 characters.",
	}),
});

interface IAddFormProps {
	onSuccess: ()  => void
}

export function AddForm(props: IAddFormProps) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			domain: "",
			name: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log("data", data);

		await addWorkspace({
			name: data.name,
			domain: data.domain
		})
		props.onSuccess()

		// toast({
		// 	title: "You submitted the following values:",
		// 	description: (
		// 		<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
		// 			<code className="text-white">{JSON.stringify(data, null, 2)}</code>
		// 		</pre>
		// 	),
		// });
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
				<FormField
					control={form.control}
					name="domain"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Domain</FormLabel>
							<FormControl>
								<Input placeholder="请输入" {...field} />
							</FormControl>
							<FormDescription>你的代码托管平台域名</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Workspace</FormLabel>
							<FormControl>
								<Input placeholder="请输入" {...field} />
							</FormControl>
							<FormDescription>你的分组/用户名</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit">Submit</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
