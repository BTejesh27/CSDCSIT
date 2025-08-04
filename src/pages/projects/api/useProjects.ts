import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface Project {
  _id: string;
  title: string;
  description: string;
  year: number;
  link?: string;
  updatedOn?: string;
}

export function useProjects(): UseQueryResult<Project[]> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || process.env.REACT_APP_BACKEND_API_URL;

  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/projects`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch projects");
      }
      return res.json();
    },
    meta: {
      userErrorMessage: "Error while getting projects list",
    },
  });
}