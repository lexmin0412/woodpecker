/**
 * 项目所属平台
 */
export type IPlatform = 'github' | 'gitlab'

/**
 * Workpsace 类型
 */
export interface IWorkspaceItem {
	id: string;
	name: string;
	domain: string
	created_at: string;
}
