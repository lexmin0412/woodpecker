'use server'

/**
 * 获取 Github 仓库列表
 */
export async function getData(accessToken: string, workspace: string, formData?: FormData) {
	const res = await fetch(`https://api.github.com/users/${workspace}/repos?sort=updated&per_page=100&type=owner`, {
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	});


	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	const keyword = formData?.get('keyword')
	const repoList = await res.json();

	const mappedList = repoList?.map((item: any) => {
		return {
			name: item.name,
			description: item.description,
			href: item.html_url,
		};
	})

	if (keyword) {
		return mappedList.filter((item: any) => item.name.includes(keyword))
	}

	return mappedList

}

/**
 * 通过 oauth code 获取 github access token
 */
export async function getToken(code: string) {

	// 组装请求参数
	var urlencoded = new URLSearchParams();
	urlencoded.append("client_id", process.env.GITHUB_OAUTH_APP_CLIENT_ID as string);
	urlencoded.append("client_secret", process.env.GITHUB_OAUTH_APP_CLIENT_SECRET as string);
	urlencoded.append("code", code);
	urlencoded.append("redirect_uri", process.env.GITHUB_OAUTH_APP_REDRECT_URI as string);

	return fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		body: urlencoded,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	}).then((res) => {
		return res.json()
	})
}

/**
 * 生成跳转 oauth 授权链接
 */
export async function getAuthURL() {
	const oauthClientID = process.env.GITHUB_OAUTH_APP_CLIENT_ID
	const oauthRedirectURI = process.env.GITHUB_OAUTH_APP_REDRECT_URI
	const oauthScope = process.env.GITHUB_OAUTH_APP_SCOPE
	return `https://github.com/login/oauth/authorize?client_id=${oauthClientID}&redirect_uri=${encodeURIComponent(oauthRedirectURI as string)}&scope=${oauthScope}`
}

/**
 * 获取环境变量
 */
export async function getEnvConfig(key: string) {
	return process.env[key]
}
