import { NextResponse } from "next/server";
import OSSClient from '@/utils/workspaces'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const id = (searchParams.get('id') || '') as string
	const keyword = searchParams.get('keyword') || ''
	const result = await OSSClient.getList({
		id,
		keyword
	})
	console.log('result', result)
	return NextResponse.json({
		code: 0,
		data: result,
		message: null
	})
}
