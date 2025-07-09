import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface Internship {
  _id: string;
  studentName: string;
  company: string;
  role: string;
  stipend: number;
  year: number;
  description?: string;
  imageUrl?: string; // Base64 image data (same as placements)
  imageName?: string; // Original filename
  updatedOn?: string;
}

export function useInternships(): UseQueryResult<Internship[]> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || process.env.REACT_APP_BACKEND_API_URL;

  return useQuery({
    queryKey: ["internships"],
    queryFn: async () => {
      console.log("🔄 Fetching internships from backend...");
      const res = await fetch(`${backendUrl}/internships`);

      console.log("📥 Internships fetch response:", res.status, res.statusText);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("❌ Failed to fetch internships:", errorData);
        throw new Error(errorData.message || "Failed to fetch internships");
      }

      const data = await res.json();
      console.log("✅ Internships fetched successfully:", data.length, "internships");
      console.log("📊 Sample internship data:", data[0] || "No internships found");

      return data;
    },
    meta: {
      userErrorMessage: "Error while getting internships list",
    },
  });
}