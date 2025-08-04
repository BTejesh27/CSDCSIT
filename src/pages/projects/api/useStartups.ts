import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface Startup {
  _id: string;
  title: string;
  description: string;
  year: number;
  link?: string;
  updatedOn?: string;
}

export function useStartups(): UseQueryResult<Startup[]> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || process.env.REACT_APP_BACKEND_API_URL;

  return useQuery({
    queryKey: ["startups"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/startups`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch startups");
      }
      return res.json();
    },
    meta: {
      userErrorMessage: "Error while getting startups list",
    },
  });
}