import { create } from "zustand";
import { Product } from "@/types";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartStore {
    items: Product[];
    addItem: (data: Product, selectedSize: { id: string; name: string; value: string }) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addItem: (data: Product, selectedSize) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    item => item.id === data.id && item.selectedSize?.id === selectedSize.id
                );

                if (existingItem) {
                    return toast("Item already in cart.");
                }

                set({ items: [...get().items, { ...data, selectedSize }] });
                toast.success("Item added to cart.");
            },
            removeItem: (id: string) => {
                set({ items: get().items.filter(item => item.id !== id) });
            },
            removeAll: () => set({ items: [] }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;
