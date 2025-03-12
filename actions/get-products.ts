import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeIds?: string[]; 
  isFeatured?: boolean;
  isArchived?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl(
    {
      url: URL,
      query: {
        categoryId: query.categoryId,
        colorId: query.colorId,
        sizeIds: query.sizeIds?.length ? query.sizeIds.join(",") : undefined,
        isFeatured: query.isFeatured !== undefined ? String(query.isFeatured) : undefined,
        isArchived: query.isArchived !== undefined ? String(query.isArchived) : undefined,
      },
    },
    { skipNull: true, skipEmptyString: true }
  );

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    console.error(`Failed to fetch products: ${res.statusText}`);
    return [];
  }

  const jsonResponse = await res.json();

  return Array.isArray(jsonResponse.data) ? jsonResponse.data : [];
};

export default getProducts;

