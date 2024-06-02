interface DataItem {
	id: string;
	title: string;
	date: string;
	tags: string[];
}

import { IPlatform } from "@/types";
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

	getList(projectInfo: any) {
		return this.store.get(`/apis/woodpecker/lint/${projectInfo.platform}__${projectInfo.userName}__${projectInfo.repoName}.json`, undefined, {
			headers: {
				'Content-type': 'application/json'
			}
		})
	}

	async get(projectInfo: {
		platform: 'github' | 'gitlab',
		userName: string
		repoName: string
	}) {
		const filePath = `/apis/woodpecker/lint/${projectInfo.platform}__${projectInfo.userName}__${projectInfo.repoName}.json`
		try {
			await this.store.head(filePath)
		} catch (error) {
			console.log('不存在', error)
			return Promise.resolve({
				code: 404,
				content: null,
				message: '不存在',
				errDetail: error
			})
		}
		const objectMeta = await this.store.getObjectMeta(filePath)
		console.log('objectMeta', objectMeta)
		const res = await this.store.get(filePath)
		return {
			content: res.content.toString(),
			lastModified: objectMeta.res?.headers?.['last-modified']
		}
	}

	async add(fileContent: string, projectInfo: {
		platform: 'github' | 'gitlab',
		userName: string
		repoName: string
	}) {
		return this.store.put(`/apis/woodpecker/lint/${projectInfo.platform}__${projectInfo.userName}__${projectInfo.repoName}.json`, Buffer.from(fileContent))
	}

	async update(id: string, newValues: Omit<DataItem, 'id'>) {
		const res = await this.getList()
		const events = JSON.parse(res.content.toString()).events
		const newEvents = events.map((item: DataItem) => {
			if (item.id === id) {
				return {
					...item,
					...newValues
				}
			}
			return item
		})
		console.log('hahaha', newEvents)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return this.store.put(`/apis/woodpecker/data.json`, new OSS.Buffer(JSON.stringify({
			events: newEvents
		}, null, 2)))
	}

	async delete(id: string) {
		const res = await this.getList()
		const events = JSON.parse(res.content.toString()).events

		const newEvents = events.filter((item: DataItem) => item.id !== id)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return this.store.put(`/apis/woodpecker/data.json`, new OSS.Buffer(JSON.stringify({
			events: newEvents
		}, null, 2)))
	}

	/**
	 * 查询详情
	 * @param id 故事id
	 */
	async getDetail(id: string) {
		const res = await this.getList()
		const events = JSON.parse(res.content.toString()).events

		const detail = events.find((item: DataItem) => item.id === id)
		return detail
	}
}

console.log('process.env.OSS_REGION', process.env.OSS_REGION)

export default new OssClient({
	region: process.env.OSS_REGION || '',
	accessKeyId: process.env.OSS_ACCESS_KEY || '',
	accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
	bucket: process.env.OSS_BUCKET || '',
});
