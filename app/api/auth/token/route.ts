import { getToken } from "@/app/qualities/actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const code = searchParams.get('code') as string
	console.log('request', code)
	const data = await getToken(code)
	return NextResponse.json({
		code: 0,
		data,
		message: null
	})
}
