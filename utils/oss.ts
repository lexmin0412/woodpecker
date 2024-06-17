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
	subDir: string
}

class OssClient {
	constructor(props: OssClientInitProps) {
		const { subDir, ...restProps } = props
		const store = new OSS({
			...restProps
		});
		this.store = store;
		this.subDir = subDir
	}

	subDir: string
	store: OSS;

	getList(projectInfo: any) {
		return this.store.get(`/apis/woodpecker/${this.subDir}/${projectInfo.platform}__${projectInfo.userName}__${projectInfo.repoName}.json`, undefined, {
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
		const filePath = `/apis/woodpecker/${this.subDir}/${projectInfo.platform}__${projectInfo.userName}__${projectInfo.repoName}.json`
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
		return this.store.put(`/apis/woodpecker/${this.subDir}/${projectInfo.platform}__${projectInfo.userName}__${projectInfo.repoName}.json`, Buffer.from(fileContent))
	}
}

/**
 * lint
 */
export const lintOSSClientInstance = new OssClient({
	region: process.env.OSS_REGION || '',
	accessKeyId: process.env.OSS_ACCESS_KEY || '',
	accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
	bucket: process.env.OSS_BUCKET || '',
	subDir: 'lint'
})

/**
 * knip
 */
export const knipOSSClientInstance = new OssClient({
	region: process.env.OSS_REGION || '',
	accessKeyId: process.env.OSS_ACCESS_KEY || '',
	accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
	bucket: process.env.OSS_BUCKET || '',
	subDir: 'knip'
})

export default lintOSSClientInstance
