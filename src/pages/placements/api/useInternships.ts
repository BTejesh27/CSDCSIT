import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface Internship {
  _id: string;
  studentName: string;
  company: string;
  role: string;
  stipend: string;
  imagePath?: string;
  description?: string;
}

export function useInternships(): UseQueryResult<Internship[]> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || process.env.REACT_APP_BACKEND_API_URL;

  return useQuery({
    queryKey: ["internships"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/internships`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch internships");
      }
      return res.json();
    },
    meta: {
      userErrorMessage: "Error while getting internships list",
    },
  });
}