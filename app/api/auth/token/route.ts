import { getToken } from "@/app/qualities/actions";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
    const code = new URLSearchParams(request.url).get('code') as string
    console.log('request', code)
    const token = await getToken(code)
	return NextResponse.json({
		code: 0,
		data: {
            token,
         },
		message: null
	})
}