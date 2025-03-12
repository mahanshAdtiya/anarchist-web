import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`

const getColors = async (): Promise<Color[]> => {
    const res = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
    
      const jsonResponse = await res.json();
    
      if (!res.ok) {
        throw new Error(`Failed to fetch colors: ${res.statusText}`);
      }
    
      return jsonResponse?.data ?? []; 
}

export default getColors;