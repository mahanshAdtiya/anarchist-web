import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import getProducts from "@/actions/get-products";
import getProduct from "@/actions/get-product";
import Currency from "@/components/ui/currency";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import MobileProductPage from "./components/mobile-product";

type Params = Promise<{ productId: string }>;

const ProductPage = async ({ params }: { params: Params }) => {
  const { productId } = await params;
  const product = await getProduct(productId);
  const suggestProducts = await getProducts({ categoryId: product?.category?.id });

  return (
    <>
      <div className="hidden lg:grid grid-cols-12 h-screen px-12 gap-8 ml-2">
        <ScrollArea className="col-span-5 w-full h-full flex justify-center overflow-y-scroll no-scrollbar">
          <div className="flex flex-col items-center">
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={image.url}
                alt={`Product Image ${index + 1}`}
                width={400}
                height={500}
                className="shadow-lg"
              />
            ))}
          </div>
        </ScrollArea>

        <div className="col-span-4 flex flex-col justify-center">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>

          <Accordion type="single" collapsible className="w-full mt-4">
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

        <div className="col-span-3 flex flex-col justify-center items-start gap-x-4 gap-y-2">
          <p className="text-xl font-semibold">
            <Currency value={product?.price} />
          </p>

          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Size:</h3>
            <div className="flex gap-x-2">
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

          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Color:</h3>
            <div className="w-6 h-6 border border-gray-600 rounded-full" style={{ backgroundColor: product?.color?.value }} />
          </div>

          <Button className="mt-6 w-full bg-black text-white py-2 flex items-center justify-center gap-2">
            <ShoppingCart size={18} />
            Add to cart
          </Button>
        </div>
      </div>

      <div className="lg:hidden">
        <MobileProductPage product={product} />
      </div>

      <Container>
        <hr className="my-10" />
        <ProductList title="Related Items" items={suggestProducts} />
      </Container>
    </>
  );
};

export default ProductPage;

// import Image from "next/image";
// import { ShoppingCart } from "lucide-react";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import Currency from "@/components/ui/currency";
// import Container from "@/components/ui/container";
// import ProductList from "@/components/product-list";
// import getProducts from "@/actions/get-products";
// import getProduct from "@/actions/get-product";
// import { Product } from "@/types";

// type Params = Promise<{ productId: string }>;

// const ProductImages = ({ images }: { images: { url: string }[] }) => (
//   <ScrollArea className="w-full whitespace-nowrap no-scrollbar">
//     <div className="flex w-max space-x-4 p-4 gap-4">
//       {images.map((image, index) => (
//         <figure key={index} className="shrink-0">
//           <div className="overflow-hidden rounded-md">
//             <Image src={image.url} alt={`Product Image ${index + 1}`} className="shadow-lg" width={250} height={350} />
//           </div>
//         </figure>
//       ))}
//     </div>
//     <ScrollBar orientation="horizontal" />
//   </ScrollArea>
// );

// const ProductDetails = ({ product }: { product: Product }) => (
//   <div className="flex flex-col mt-6">
//     <h1 className="text-2xl font-bold">{product.name}</h1>
//     <p className="text-gray-600 mt-2">{product.description}</p>
//     <p className="text-xl font-semibold mt-4"><Currency value={product?.price} /></p>
    
//     <div className="flex items-center gap-2 mt-4">
//       <h3 className="font-semibold text-black">Size:</h3>
//       <div className="flex gap-2">
//         {product.sizes.length > 0 ? (
//           product.sizes.map((sizeObj) => (
//             <span key={sizeObj.size.id} className="px-2 py-1 text-sm border rounded-md border-gray-600">
//               {sizeObj.size.value}
//             </span>
//           ))
//         ) : (
//           <span className="text-gray-500">No sizes available</span>
//         )}
//       </div>
//     </div>
    
//     <div className="flex items-center gap-2 mt-4">
//       <h3 className="font-semibold text-black">Color:</h3>
//       <div className="w-6 h-6 border border-gray-600 rounded-full" style={{ backgroundColor: product?.color?.value }} />
//     </div>
    
//     <Button className="mt-6 w-full bg-black text-white py-2 flex items-center justify-center gap-2">
//       <ShoppingCart size={18} />
//       Add to cart
//     </Button>
//   </div>
// );

// const ProductAccordion = () => (
//   <Accordion type="single" collapsible className="w-full mt-6">
//     <AccordionItem value="composition-washcare">
//       <AccordionTrigger>Composition & Washcare</AccordionTrigger>
//       <AccordionContent>
//         <ul className="list-disc pl-5">
//           <li>Do not bleach</li>
//           <li>Line drying in the shade</li>
//           <li>Iron at low temperature, not on print</li>
//           <li>Professional dry cleaning in hydrocarbons, mild process</li>
//         </ul>
//       </AccordionContent>
//     </AccordionItem>
//     <AccordionItem value="size-fit">
//       <AccordionTrigger>Size & Fit</AccordionTrigger>
//       <AccordionContent>
//         <p>Relaxed Fit</p>
//         <a href="#" className="text-blue-600 underline">Size Chart</a>
//       </AccordionContent>
//     </AccordionItem>
//     <AccordionItem value="shipping-return">
//       <AccordionTrigger>Shipping & Return</AccordionTrigger>
//       <AccordionContent>
//         <h4 className="font-semibold">Shipping</h4>
//         <p>Free global shipping.</p>
//         <p>Domestic Orders: 5-7 business days</p>
//         <p>International Orders: 10-14 business days</p>
//         <p>You will receive a tracking link via WhatsApp once your order is ready to ship.</p>
//         <h4 className="font-semibold mt-4">Returns</h4>
//         <p>Orders can be exchanged or returned within 30 days of the purchase date.</p>
//         <p>All products must be unworn and unwashed with original tags and packaging.</p>
//         <p>Returns can be processed via our Product Returns Portal.</p>
//         <p>For more information, please check our <a href="#" className="text-blue-600 underline">Shipping & Returns</a> page.</p>
//       </AccordionContent>
//     </AccordionItem>
//   </Accordion>
// );

// const ProductPage = async ({ params }: { params: Params }) => {
//   const { productId } = await params;
//   const product = await getProduct(productId);
//   const suggestProducts = await getProducts({ categoryId: product?.category?.id });

//   return (
//     <>
//       <div className="hidden lg:grid grid-cols-12 h-screen px-12 gap-8 ml-2">
//         <ScrollArea className="col-span-5 w-full h-full flex justify-center overflow-y-scroll no-scrollbar">
//           <ProductImages images={product.images} />
//         </ScrollArea>
//         <div className="col-span-4 flex flex-col justify-center">
//           <ProductDetails product={product} />
//           <ProductAccordion />
//         </div>
//       </div>
//       <div className="lg:hidden px-6 py-4 flex flex-col mt-5">
//         <ProductImages images={product.images} />
//         <ProductDetails product={product} />
//         <ProductAccordion />
//       </div>
//       <Container>
//         <hr className="my-10" />
//         <ProductList title="Related Items" items={suggestProducts} />
//       </Container>
//     </>
//   );
// };

// export default ProductPage;
