'use server'

import ossClientInstance from "@/utils/workspaces"

export async function getWorkspaceList () {
	const result = await ossClientInstance.getList()
	return result
}


export async function addWorkspace(data: {
	name: string
	domain: string
}) {
	return ossClientInstance.add({
		id: Math.random().toString(),
		name: data.name,
		domain: data.domain,
		created_at: new Date().getTime().toString()
	})
}

export async function deleteWorkspace(id: string) {
	return ossClientInstance.delete(id)
}
