import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
    console.log('request', request.headers)
	const oauthClientID = process.env.GITHUB_OAUTH_APP_CLIENT_ID
	const oauthRedirectURI = `${request.headers.get('referer')}guard/oauth`
    console.log('oauthRedirectURI', oauthRedirectURI)
	const oauthScope = process.env.GITHUB_OAUTH_APP_SCOPE
	const authURL = `https://github.com/login/oauth/authorize?client_id=${oauthClientID}&redirect_uri=${encodeURIComponent(oauthRedirectURI as string)}&scope=${oauthScope}`
	return NextResponse.json({
		code: 0,
		data: {
            authURL,
         },
		message: null
	})
}