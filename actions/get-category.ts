import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

const getCategory = async (id: string): Promise<Category> => {
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });

    if (!res.ok) return {} as Category;

    const jsonResponse = await res.json();
    return jsonResponse?.data ?? {};
  } catch {
    return {} as Category;
  }
}

export default getCategory;