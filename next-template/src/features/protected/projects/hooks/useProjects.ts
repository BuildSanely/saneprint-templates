'use client';

import { useQuery } from '@tanstack/react-query';
import { projectsQueryOptions } from '../services/getProjects';

export function useProjects() {
	return useQuery(projectsQueryOptions());
}
