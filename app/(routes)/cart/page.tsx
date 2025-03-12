"use client"
import { useEffect, useState } from "react";

import Summary from "./components/summary";
import CartItem from "./components/cart-item";
import Container from "@/components/ui/container";
import ShippingPayment from "./components/shipping-payment-details";

import useCart from "@/hooks/use-cart";


const CartPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useCart();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return ( 
        <div className="bg-white">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black">Your Cart</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7 overflow-y-auto border p-4 rounded-lg">
                            {cart?.items?.length === 0 && (
                                <p className="text-neutral-500">No items added to cart</p>
                            )}
                            <ul>
                                {cart?.items?.map(item => (
                                    <CartItem
                                        key={item.id}
                                        data={item}
                                        selectedSize={item.selectedSize}
                                    />
                                ))}
                            </ul>
                        </div>
                        
                        <div className="lg:col-span-5 space-y-6 sticky top-20">
                            <Summary />
                            <ShippingPayment />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CartPage;