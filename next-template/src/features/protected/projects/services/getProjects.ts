import { queryOptions } from '@tanstack/react-query';

export interface ProjectRecord {
	id: string;
	name: string;
	owner: string;
	status: 'Active' | 'Draft' | 'Paused';
	visitors: number;
}

const ALL_PROJECTS: ProjectRecord[] = Array.from({ length: 72 }, (_, index) => ({
	id: `project-${index + 1}`,
	name: `Project ${index + 1}`,
	owner: index % 2 === 0 ? 'Karishma' : 'Product Team',
	status: index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Draft' : 'Paused',
	visitors: 1600 + index * 23,
}));

export async function getProjects() {
	return ALL_PROJECTS;
}

export function projectsQueryOptions() {
	return queryOptions({
		queryKey: ['projects'],
		queryFn: getProjects,
	});
}
