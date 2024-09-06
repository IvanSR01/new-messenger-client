import fileService from '@/services/file-service/file.service'

export default async function uploadsFiles(
	e: any,
	setContent: any,
	folder = 'message',
	isHaveTag = true
) {
	const file = e.target.files[0]
	const data = await fileService.uploadFile(
		file,
		`${folder}/${file.type.split('/')[0]}`
	)
	setContent(isHaveTag ? tags[file.type](data.path) : data.path.replaceAll('\\', '/'))
}
const tags: any = {
	'image/png': (p: any) => `<img src="/${p}" />`,
	'image/jpeg': (p: any) => `<img src="/${p}" />`,
	'image/gif': (p: any) => `<img src="/${p}" />`,
	'image/webp': (p: any) => `<img src="/${p}" />`,
	'audio/mpeg': (p: any) =>
		`<audio src="/${p}" controls></audio>`,
	'audio/ogg': (p: any) =>
		`<audio src="/${p}" controls></audio>`,
	'audio/wav': (p: any) =>
		`<audio src="/${p}" controls></audio>`,
	'audio/mp3': (p: any) =>
		`<audio src="/${p}" controls></audio>`,
	'video/mp4': (p: any) =>
		`<video src="/${p}" controls></video>`,
	'video/ogg': (p: any) =>
		`<video src="/${p}" controls></video>`,
	'video/webm': (p: any) =>
		`<video src="/${p}" controls></video>`,
}
