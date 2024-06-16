import { IWorkspaceItem } from "@/types";
import OSS from "ali-oss";

export interface OssClientInitProps {
	region: string;
	accessKeyId: string;
	accessKeySecret: string;
	bucket: string;
}

class OssClient {
	constructor(props: OssClientInitProps) {
		const store = new OSS({
			region: props.region,
			accessKeyId: props.accessKeyId,
			accessKeySecret: props.accessKeySecret,
			bucket: props.bucket,
		});
		this.store = store;
	}

	store: OSS;

	async getList(options: {
		keyword?: string,
		id?: string
	} = {}): Promise<any[]> {
		const res = await this.store.get(`/apis/woodpecker/workspaces/data.json`, undefined, {
			headers: {
				'Content-type': 'application/json'
			}
		})
		const data = JSON.parse(res.content.toString()) as IWorkspaceItem[]
		if (data) {
			if (options.keyword) {
				return data.filter((item) => item.name.includes(options.keyword!)) || []
			}
			if (options.id) {
				return data.filter((item) => item.id === options.id) || []
			}
			return data
		}
		return []
	}

	async get(options: {
		id: string
	}) {
		const listRes = await this.getList()
		if (!options.id) {
			return null
		}
		if (listRes?.length) {
			const current = listRes.find((item: any) => {
				return item.id === options.id
			})
			if (current) {
				return current
			}
		}
	}

	async add(newItem: IWorkspaceItem) {
		const data = await this.getList()
		const newData = [
			...data,
			newItem
		]
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return this.store.put(`/apis/woodpecker/workspaces/data.json`, new Buffer(JSON.stringify(newData, null, 2)))
	}

	async delete(id: string) {
		const data = await this.getList()
		const newData = data.filter((item)=>item.id !== id)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return this.store.put(`/apis/woodpecker/workspaces/data.json`, new Buffer(JSON.stringify(newData, null, 2)))
	}
}

const ossClientInstance = new OssClient({
	region: process.env.OSS_REGION || '',
	accessKeyId: process.env.OSS_ACCESS_KEY || '',
	accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
	bucket: process.env.OSS_BUCKET || '',
})

export default ossClientInstance
