import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface Placement {
  _id: string;
  studentName: string;
  company: string;
  role: string;
  package: number;
  year: number;
  description?: string;
  updatedOn: string;
  imageUrl?: string; // Base64 image data or URL
  imageName?: string; // Original filename
}

export function usePlacements(): UseQueryResult<Placement[]> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || process.env.REACT_APP_BACKEND_API_URL;

  return useQuery({
    queryKey: ["placements"],
    queryFn: async () => {
      console.log("🔄 Fetching placements from backend...");
      const res = await fetch(`${backendUrl}/placements`);
      
      console.log("📥 Placements fetch response:", res.status, res.statusText);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("❌ Failed to fetch placements:", errorData);
        throw new Error(errorData.message || "Failed to fetch placements");
      }
      
      const data = await res.json();
      console.log("✅ Placements fetched successfully:", data.length, "placements");
      console.log("📊 Sample placement data:", data[0] || "No placements found");
      
      return data;
    },
    meta: {
      userErrorMessage: "Error while getting placements list",
    },
  });
}