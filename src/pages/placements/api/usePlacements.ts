import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface Placement {
  _id: string;
  studentName: string;
  company: string;
  role: string;
  package: string;
  year: string;
  imagePath?: string;
  description?: string;
}

export function usePlacements(): UseQueryResult<Placement[]> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || process.env.REACT_APP_BACKEND_API_URL;

  return useQuery({
    queryKey: ["placements"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/placements`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch placements");
      }
      return res.json();
    },
    meta: {
      userErrorMessage: "Error while getting placements list",
    },
  });
}