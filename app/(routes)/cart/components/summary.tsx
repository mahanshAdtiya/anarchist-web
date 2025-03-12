"use client"

import useCart from '@/hooks/use-cart';

import Currency from '@/components/ui/currency';

const Summary = () => {
    const items = useCart(state => state.items);
    const totalPrice = items.reduce((total, item) => total + Number(item.price), 0)

    return ( 
        <div className='px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
            <div className='mt-6 space-y-4'>
                <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
                    <div className='text-base font-medium text-gray-400'>
                        Order Total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
        </div>
     );
}
 
export default Summary;