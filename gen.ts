import path from 'path'
import fs from 'fs'

const genAnalyzeRes = async() => {
	const result = fs.readFileSync(path.resolve(__dirname, '..', './output.txt'), {
		encoding: 'utf-8'
	}).toString()
	const lines = result.toString().split('\n')
	const formattedRes = lines.map(line => {
		const [type, ...restText] = line.split(' ')
		const message = restText.join(' ')
		const typeText = type.split('::')[1]
		const otherProps: Record<string, string> = {}
		if (message) {
			message.split(',').forEach((item)=>{
				const [key, value] = item.split('=')
				otherProps[key] = value
			})
		}
		return { type: typeText, otherProps }
 	})
	console.log('json', result)
	fs.writeFileSync(path.resolve(__dirname, '..', './output.json'), JSON.stringify(formattedRes, null, 2), {
		encoding: 'utf-8',

	})
}

genAnalyzeRes()
