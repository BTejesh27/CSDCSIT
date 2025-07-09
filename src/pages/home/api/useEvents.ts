import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  organizer?: string;
  imageUrl?: string; // Base64 image data
  imageName?: string; // Original filename
  updatedOn?: string;
}

export function useEvents(): UseQueryResult<Event[]> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL || process.env.REACT_APP_BACKEND_API_URL;

  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      console.log("🔄 Fetching events from backend...");
      const res = await fetch(`${backendUrl}/events`);
      
      console.log("📥 Events fetch response:", res.status, res.statusText);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("❌ Failed to fetch events:", errorData);
        throw new Error(errorData.message || "Failed to fetch events");
      }
      
      const data = await res.json();
      console.log("✅ Events fetched successfully:", data.length, "events");
      console.log("📊 Sample event data:", data[0] || "No events found");
      
      return data;
    },
    meta: {
      userErrorMessage: "Error while getting events list",
    },
  });
}