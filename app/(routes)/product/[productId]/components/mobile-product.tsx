import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

import { Product } from "@/types";

const MobileProductPage = ({ product }: { product: Product }) => {
    return (
      <div className="px-6 py-4 flex flex-col mt-5">
        <ScrollArea className="w-full whitespace-nowrap no-scrollbar">
          <div className="flex w-max space-x-4 p-4 gap-4">
            {product.images.map((image, index) => (
              <figure key={index} className="shrink-0">
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={image.url}
                    alt={`Product Image ${index + 1}`}
                    className="shadow-lg"
                    width={250}
                    height={350}
                  />
                </div>
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
  
  
        <div className="flex flex-col mt-6">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
  
          <p className="text-xl font-semibold mt-4">
            <Currency value={product?.price} />
          </p>
  
          <div className="flex items-center gap-2 mt-4">
            <h3 className="font-semibold text-black">Size:</h3>
            <div className="flex gap-2">
              {product.sizes.length > 0 ? (
                product.sizes.map((sizeObj) => (
                  <span key={sizeObj.size.id} className="px-2 py-1 text-sm border rounded-md border-gray-600">
                    {sizeObj.size.value}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No sizes available</span>
              )}
            </div>
          </div>
  
          <div className="flex items-center gap-2 mt-4">
            <h3 className="font-semibold text-black">Color:</h3>
            <div className="w-6 h-6 border border-gray-600 rounded-full" style={{ backgroundColor: product?.color?.value }} />
          </div>
  
          <Button className="mt-6 w-full bg-black text-white py-2 flex items-center justify-center gap-2">
            <ShoppingCart size={18} />
            Add to cart
          </Button>
  
          <hr className="my-4" />
  
  
          <Accordion type="single" collapsible className="w-full mt-6">
            <AccordionItem value="composition-washcare">
              <AccordionTrigger>Composition & Washcare</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5">
                  <li>Do not bleach</li>
                  <li>Line drying in the shade</li>
                  <li>Iron at low temperature, not on print</li>
                  <li>Professional dry cleaning in hydrocarbons, mild process</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
  
            <AccordionItem value="size-fit">
              <AccordionTrigger>Size & Fit</AccordionTrigger>
              <AccordionContent>
                <p>Relaxed Fit</p>
                <a href="#" className="text-blue-600 underline">Size Chart</a>
              </AccordionContent>
            </AccordionItem>
  
            <AccordionItem value="shipping-return">
              <AccordionTrigger>Shipping & Return</AccordionTrigger>
              <AccordionContent>
                <h4 className="font-semibold">Shipping</h4>
                <p>Free global shipping.</p>
                <p>Domestic Orders: 5-7 business days</p>
                <p>International Orders: 10-14 business days</p>
                <p>You will receive a tracking link via WhatsApp once your order is ready to ship.</p>
                <h4 className="font-semibold mt-4">Returns</h4>
                <p>Orders can be exchanged or returned within 30 days of the purchase date.</p>
                <p>All products must be unworn and unwashed with original tags and packaging.</p>
                <p>Returns can be processed via our Product Returns Portal.</p>
                <p>For more information, please check our <a href="#" className="text-blue-600 underline">Shipping & Returns</a> page.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    );
};

export default MobileProductPage;