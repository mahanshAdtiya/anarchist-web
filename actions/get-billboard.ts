import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`

const getBillboard = async (): Promise<Billboard[]> => { 
  const res = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  const jsonResponse = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch billboards: ${res.statusText}`);
  }

  return jsonResponse?.data ?? []; 
};

export default getBillboard;
