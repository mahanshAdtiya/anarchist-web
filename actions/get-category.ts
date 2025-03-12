import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

const getCategory = async (id: string): Promise<Category> => {
    const res = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
    
      const jsonResponse = await res.json();
    
      if (!res.ok) {
        throw new Error(`Failed to fetch category: ${res.statusText}`);
      }
    
      return jsonResponse?.data ?? []; 
}

export default getCategory;