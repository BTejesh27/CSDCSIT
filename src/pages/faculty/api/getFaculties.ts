import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface Faculty {
  _id: string;
  name: string;
  imagePath?: string; // For backward compatibility
  imageUrl?: string; // Base64 image data (new)
  imageName?: string; // Original filename
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
      console.log("🔄 Fetching faculties from backend...");
      const res = await fetch(`${backendUrl}/faculty`);

      console.log("📥 Faculties fetch response:", res.status, res.statusText);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("❌ Failed to fetch faculties:", errorData);
        throw new Error(errorData.message || "Failed to fetch faculties");
      }

      const data = await res.json();
      console.log("✅ Faculties fetched successfully:", data.length, "faculties");
      console.log("📊 Sample faculty data:", data[0] || "No faculties found");

      return data;
    },
    meta: {
      userErrorMessage: "Error while getting faculty list",
    },
  });
}
