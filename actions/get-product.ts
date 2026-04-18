import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

const getProduct = async (id: string): Promise<Product> => {
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });

    if (!res.ok) return {} as Product;

    const jsonResponse = await res.json();
    return jsonResponse?.data || {};
  } catch {
    return {} as Product;
  }
}

export default getProduct;