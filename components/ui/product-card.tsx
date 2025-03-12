"use client";

import Image from "next/image";
import { MouseEventHandler } from 'react';
import { useRouter } from "next/navigation";
import { Expand, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";

interface ProductCard {
    data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
    const previewModal = usePreviewModal();
    const router = useRouter();
    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    }

    return ( 
        <div onClick={handleClick} className="space-y-4 bg-white border cursor-pointer group rounded-xl">
            <div className="relative bg-gray-100 aspect-square rounded-xl">
                <Image
                    fill
                    src={data?.images?.[0]?.url}
                    alt="Images"
                    className="object-cover rounded-md aspect-square" />
                <div className="absolute w-full px-6 transition opacity-0 group-hover:opacity-100 bottom-5">
                    <div className="flex justify-center gap-x-6">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-gray-600" />}/>
                        <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={20} className="text-gray-600" />}/>
                    </div>
                </div>
            </div>
            <div className="px-4 mb-4">
                <p className="text-lg font-semibold">{data?.name}</p>
                <p className="text-sm text-gray-500"><Currency value={data?.price} /></p>
            </div>
        </div>
    );
}

export default ProductCard;