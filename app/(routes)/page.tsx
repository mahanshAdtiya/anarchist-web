import Billboard from '@/components/Billboard'
import ProductList from '@/components/product-list';

import getBillboard from '@/actions/get-billboard';
import getProducts from '@/actions/get-products';

async function HomePage() {
  const billboardArray = await getBillboard(); 

  const billboard = billboardArray[0]; 

  const products = await getProducts({ isFeatured: true });

  return (
    <div className="pb-10 space-y-10">
      {billboard && <Billboard data={billboard} />} 
      <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </div>
  );
}

export default HomePage;
