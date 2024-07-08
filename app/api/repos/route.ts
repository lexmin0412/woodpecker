import * as fs from 'fs'
import * as path from 'path'
import { execSync } from "child_process";
import { NextResponse } from "next/server";
import { knipOSSClientInstance, lintOSSClientInstance } from '@/utils/oss'
import { processToolOutput } from './utils/oxlint';
import FCClient from '@/utils/fc'

export async function POST(request: Request) {

	const body = await request.json();

	let toolOutput = ''

	if (body.tool === 'lint') {
		toolOutput = await FCClient.main(body)
	} else {
		if (!fs.existsSync('/tmp')) {
			fs.mkdirSync('/tmp')
		}
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

		toolOutput = processToolOutput(repoTempPath, body.tool)
	}

	const ossClient = body.tool === 'lint' ? lintOSSClientInstance : knipOSSClientInstance
	// 上传到 OSS
	try {
		const upload2OSS = await ossClient.add(toolOutput, {
			platform: 'github',
			userName: body.userName,
			repoName: body.repoName,
		})
		console.log('upload2OSS', upload2OSS)
	} catch (error) {
		console.error('upload2OSS error', error)
	}

	return NextResponse.json(toolOutput);
}

export async function GET(request: Request) {

	const { searchParams } = new URL(request.url)
	const userName = searchParams.get('userName')
	console.log('userName', userName)

	const res = await (await fetch(`https://api.github.com/users/${userName}/repos`)).json()

	return NextResponse.json(res);
}
