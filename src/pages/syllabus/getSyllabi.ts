import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface Syllabus {
  _id: string;
  subject: string;
  unit: string;
  year: number;
  branch: string;
  department: string;
  fileName: string;
  filePath: string;
  uploadedAt: string;
}

export function useGetSyllabi(): UseQueryResult<Syllabus[]> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || process.env.REACT_APP_BACKEND_API_URL;

  return useQuery({
    queryKey: ["syllabi"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/syllabus`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch syllabi");
      }
      return res.json();
    },
    meta: {
      userErrorMessage: "Error while getting syllabus list",
    },
  });
}