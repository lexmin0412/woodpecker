interface DataItem {
	id: string;
	title: string;
	date: string;
	tags: string[];
}

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
				errDetail: error,
				lastModified: null
			})
		}
		// @ts-ignore
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
}

console.log('process.env.OSS_REGION', process.env.OSS_REGION)

export default new OssClient({
	region: process.env.OSS_REGION || '',
	accessKeyId: process.env.OSS_ACCESS_KEY || '',
	accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
	bucket: process.env.OSS_BUCKET || '',
});
