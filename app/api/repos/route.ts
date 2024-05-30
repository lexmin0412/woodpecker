import * as fs from 'fs'
import * as path from 'path'
import { execSync } from "child_process";
import os  from 'os'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const body = await request.json();

	// const oxlintPath = path.join(os.homedir(),'./code/git_repos/woodpecker/node_modules/.bin/oxlint')

	fs.rmSync('/tmp/woodpecker', {
		force: true,
		recursive: true
	})
	fs.mkdirSync('/tmp/woodpecker');
	execSync(
		`git clone https://github.com/${body.userName}/${body.repoName}.git`,
		{
			cwd: "/tmp/woodpecker",
		}
	);

	const repoTempPath = path.join("/tmp/woodpecker", body.repoName)

	const result = execSync(`npx oxlint --format github`, {
		cwd: repoTempPath
	}).toString()
	const lines = result.toString().split('\n').filter(Boolean)
	console.log('lines', lines)
	const formattedRes = lines.map(line => {
		const [type, ...restText] = line.split(' ')
		const message = restText.join(' ')
		const typeText = type.split('::')[1]
		const otherProps: Record<string, string> = {}
		if (message) {
			message.split(',').forEach((item) => {
				const [key, value] = item.split('=')
				otherProps[key] = value
			})
		}
		return { type: typeText, otherProps }
	})
	const finalRes = JSON.stringify(formattedRes, null, 2)
	return NextResponse.json(finalRes);
}
