"use client";

import { z } from "zod";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CustomButton } from "@/components/ui/cusomtbutton";
import useCart from "@/hooks/use-cart";

const addressSchema = z.object({
    state: z.string().min(2, { message: "State is required" }),
    city: z.string().min(2, { message: "City is required" }),
    postalCode: z.string().min(4, { message: "Postal code is required" }),
    addressLine: z.string().min(5, { message: "Address line is required" }),
});

const checkoutSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    shippingAddress: addressSchema,
    billingAddress: addressSchema,
});

const ShippingPayment = () => {
    const searchParams = useSearchParams();
    const removeAll = useCart(state => state.removeAll);
    const items = useCart(state => state.items);
    const totalPrice = items.reduce((total, item) => total + Number(item.price), 0);

    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Payment completed.");
            removeAll();
            redirect("/");
        }
        if (searchParams.get("canceled")) {
            toast.error("Something went wrong.");
            redirect("/");
        }
    }, [searchParams, removeAll]);

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            shippingAddress: {
                state: "",
                city: "",
                postalCode: "",
                addressLine: "",
            },
            billingAddress: {
                state: "",
                city: "",
                postalCode: "",
                addressLine: "",
            },
        },
    });
    
    const onSubmit = async (data: any) => {
        const formattedData = {
            ...data,
            shippingAddress: {
                state: data.shippingAddress.state,
                city: data.shippingAddress.city,
                postalCode: data.shippingAddress.postalCode,
                addressLine: data.shippingAddress.addressLine,
            },
            billingAddress: {
                state: data.billingAddress.state,
                city: data.billingAddress.city,
                postalCode: data.billingAddress.postalCode,
                addressLine: data.billingAddress.addressLine,
            },
            items: items.map(item => ({
                productId: item.id,
                sizeId: item.selectedSize?.id || ""
            })).filter(item => item.sizeId),
        };
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });
    
            if (!response.ok) throw new Error("Failed to process checkout");
    
            removeAll();
            reset();
            
            toast.success("Order placed successfully!");
            redirect("/");
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <Card className="rounded-lg bg-gray-50">
            <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Shipping & Payment</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name" className="mb-3 block">Name</Label>
                            <Input id="name" {...register("name")} placeholder="Enter your name" />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email" className="mb-3 block">Email</Label>
                            <Input id="email" {...register("email")} placeholder="Enter your email" />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="phone" className="mb-3 block">Phone</Label>
                        <Input id="phone" {...register("phone")} placeholder="Enter your phone number" />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <h3 className="text-md font-semibold mb-2">Shipping Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <Label htmlFor="shippingState" className="mb-2 block">State</Label>
                                <Input id="shippingState" {...register("shippingAddress.state")} placeholder="Enter state" />
                                {errors.shippingAddress?.state && <p className="text-red-500 text-sm">{errors.shippingAddress.state.message}</p>}
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="shippingCity" className="mb-2 block">City</Label>
                                <Input id="shippingCity" {...register("shippingAddress.city")} placeholder="Enter city" />
                                {errors.shippingAddress?.city && <p className="text-red-500 text-sm">{errors.shippingAddress.city.message}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="shippingPostalCode" className="mb-2 block">Postal Code</Label>
                            <Input id="shippingPostalCode" {...register("shippingAddress.postalCode")} placeholder="Enter postal code" />
                            {errors.shippingAddress?.postalCode && <p className="text-red-500 text-sm">{errors.shippingAddress.postalCode.message}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="shippingAddressLine" className="mb-2 block">Address Line</Label>
                            <Input id="shippingAddressLine" {...register("shippingAddress.addressLine")} placeholder="Enter address" />
                            {errors.shippingAddress?.addressLine && <p className="text-red-500 text-sm">{errors.shippingAddress.addressLine.message}</p>}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-md font-semibold mb-2">Billing Address</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="mb-4">
                                <Label htmlFor="billingState" className="mb-2 block">State</Label>
                                <Input id="billingState" {...register("billingAddress.state")} placeholder="Enter state" />
                                {errors.billingAddress?.state && <p className="text-red-500 text-sm">{errors.billingAddress.state.message}</p>}
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="billingCity" className="mb-2 block">City</Label>
                                <Input id="billingCity" {...register("billingAddress.city")} placeholder="Enter city" />
                                {errors.billingAddress?.city && <p className="text-red-500 text-sm">{errors.billingAddress.city.message}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="billingPostalCode" className="mb-2 block">Postal Code</Label>
                            <Input id="billingPostalCode" {...register("billingAddress.postalCode")} placeholder="Enter postal code" />
                            {errors.billingAddress?.postalCode && <p className="text-red-500 text-sm">{errors.billingAddress.postalCode.message}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="billingAddressLine" className="mb-2 block">Address Line</Label>
                            <Input id="billingAddressLine" {...register("billingAddress.addressLine")} placeholder="Enter address" />
                            {errors.billingAddress?.addressLine && <p className="text-red-500 text-sm">{errors.billingAddress.addressLine.message}</p>}
                        </div>
                    </div>

                    <CustomButton type="submit" disabled={items.length === 0} className="w-full mt-6">Place Order</CustomButton>
                </form>
            </CardContent>
        </Card>
    );
};

export default ShippingPayment;
