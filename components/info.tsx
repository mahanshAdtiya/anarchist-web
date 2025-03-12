"use client";

import { useState } from "react";
import { MouseEventHandler } from 'react';
import { ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import Currency from "@/components/ui/currency";
import { CustomButton } from "@/components/ui/cusomtbutton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InfoProps {
    data: Product;
    onClose?: () => void;
}

const Info: React.FC<InfoProps> = ({ data, onClose }) => {
    const cart = useCart();
    const [selectedSize, setSelectedSize] = useState<{ id: string; name: string; value: string } | null>(null);

    const handleSizeClick = (sizeObj: { id: string; name: string; value: string }) => {
        setSelectedSize(prevSize => (prevSize?.id === sizeObj.id ? null : sizeObj));
    };

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        if (!selectedSize) return; 

        cart.addItem(data, selectedSize); 

        onClose?.();
    };

    return ( 
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="flex items-end justify-between mt-3">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price} />
                </p>
            </div>
            <hr className="my-4" />

            <div className="flex flex-col gap-y-6">

                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div className="flex gap-x-2">
                        {data.sizes.length > 0 ? (
                            data.sizes.map((sizeObj) => (
                                <button
                                    key={sizeObj.size.id}
                                    className={`px-2 py-1 text-sm border rounded-md transition-all ${
                                        selectedSize?.id === sizeObj.size.id 
                                            ? "border-black bg-gray-200" 
                                            : "border-gray-600"
                                    }`}
                                    onClick={() => handleSizeClick(sizeObj.size)}
                                >
                                    {sizeObj.size.value}
                                </button>
                            ))
                        ) : (
                            <span className="text-gray-500">No sizes available</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div 
                        className="w-6 h-6 border border-gray-600 rounded-full" 
                        style={{ backgroundColor: data?.color?.value }}
                    />
                </div>
            </div>

            <div className="flex items-center mt-10 gap-x-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <CustomButton 
                                className="flex items-center gap-x-2"
                                disabled={!selectedSize} 
                                onClick={onAddToCart}
                            >
                                Add To Cart
                                <ShoppingCart />
                            </CustomButton>
                        </TooltipTrigger>
                        {!selectedSize && (
                            <TooltipContent side="top">
                                Select a size before adding to cart
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default Info;
