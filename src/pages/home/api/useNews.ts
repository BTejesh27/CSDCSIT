import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface News {
  _id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string; // Base64 image data
  imageName?: string; // Original filename
  updatedOn?: string;
}

export function useNews(): UseQueryResult<News[]> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || process.env.REACT_APP_BACKEND_API_URL;

  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      console.log("🔄 Fetching news from backend...");
      const res = await fetch(`${backendUrl}/news`);
      
      console.log("📥 News fetch response:", res.status, res.statusText);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("❌ Failed to fetch news:", errorData);
        throw new Error(errorData.message || "Failed to fetch news");
      }
      
      const data = await res.json();
      console.log("✅ News fetched successfully:", data.length, "news items");
      console.log("📊 Sample news data:", data[0] || "No news found");
      
      return data;
    },
    meta: {
      userErrorMessage: "Error while getting news list",
    },
  });
}