import { NextResponse } from "next/server";
import { lintOSSClientInstance, knipOSSClientInstance } from '@/utils/oss'
import { IPlatform } from "@/types";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const platform = (searchParams.get('platform') || 'github') as IPlatform
	const userName = searchParams.get('userName') || ''
	const repoName = searchParams.get('repoName') || ''
	const tool = searchParams.get('tool') || 'lint'
	if (!platform || !userName || !repoName) {
		return NextResponse.json(JSON.stringify({
			code: 500,
			message: '缺少参数',
			requestParams: {
				platform,
				userName,
				repoName
			}
		}))
	}
	const ossClient = tool === 'lint' ? lintOSSClientInstance : knipOSSClientInstance
	const result = await ossClient.get({
		platform,
		userName,
		repoName,
	})
	if (result.content) {
		console.log('我的 content', result.content)
		return NextResponse.json(JSON.stringify({
			code: 200,
			data: result.content.toString(),
			lastModified: result.lastModified
		}))
	}
	return NextResponse.json(JSON.stringify({
		code: 404,
		message: '记录不存在',
		requestParams: {
			platform,
			userName,
			repoName
		}
	}))
}
