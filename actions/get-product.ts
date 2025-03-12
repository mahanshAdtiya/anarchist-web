import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

const getProduct = async (id: string): Promise<Product> => {
    const res = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
    
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.statusText}`);
      }
    
      const jsonResponse = await res.json();
      return jsonResponse?.data || [];
}

export default getProduct;