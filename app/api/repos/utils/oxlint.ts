import { execSync } from "child_process"

/**
 * 格式化 lint 结果
 * @param repoTempPath
 */
export const processLintRes = (repoTempPath: string) => {
	const result = execSync(`npx oxlint --format github`, {
		cwd: repoTempPath
	}).toString()
	const lines = result.toString().split('\n').filter(Boolean)
	const formattedRes = lines.map(line => {
		const [type, ...restText] = line.split(' ')
		const message = restText.join(' ')
		const typeText = type.split('::')[1]
		const otherProps: Record<string, string> = {}
		if (message) {
			message.split(',').forEach((item) => {
				const [key, ...restContent] = item.split('=')
				otherProps[key] = restContent.join('=')
			})
		}
		return { type: typeText, otherProps }
	})
	return JSON.stringify(formattedRes, null, 2)
}

export const processKnipRes = (repoTempPath: string) => {
	let output = null
	try {
		const result = execSync(`npx knip --reporter=json`, {
			cwd: repoTempPath,
		}).toString()
		console.log('result', result)
	} catch (error: any) {
		output = error.stdout.toString()
	}
	console.log('output', output)
	return output
}

export const processToolOutput = (repoTempPath: string, tool: 'lint' | 'unused') => {
	if (tool === 'lint') {
		return processLintRes(repoTempPath)
	}
	if (tool === 'unused') {
		return processKnipRes(repoTempPath)
	}
}
