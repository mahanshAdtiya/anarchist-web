import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`

const getColors = async (): Promise<Color[]> => {
  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    });

    if (!res.ok) return [];

    const jsonResponse = await res.json();
    return jsonResponse?.data ?? [];
  } catch {
    return [];
  }
}

export default getColors;