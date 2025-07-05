import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface Faculty {
  _id: string;
  name: string;
  imagePath?: string;
  qualifications?: string[];
  subjects?: string[];
  mail?: string;
  number?: string;
  location?: string;
}

export function useGetFaculties(): UseQueryResult<Faculty[]> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || process.env.REACT_APP_BACKEND_API_URL;

  return useQuery({
    queryKey: ["faculties"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/faculty`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch faculties");
      }
      return res.json();
    },
    meta: {
      userErrorMessage: "Error while getting faculty list",
    },
  });
}
