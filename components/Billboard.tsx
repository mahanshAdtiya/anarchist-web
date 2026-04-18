import { Billboard as BillboardType } from '@/types';
import Image from 'next/image';

interface BillboardProps {
    data: BillboardType;  
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
    if (!data) return null;  

    return (
        <div className="relative w-full h-screen">
            <Image 
                src={data.imageUrl} 
                alt={data.label} 
                fill
                sizes="100vw"
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40">
                <h1 className="text-4xl font-bold text-white sm:text-6xl lg:text-7xl">
                    {data.label}
                </h1>
            </div>
        </div>
    );
}

export default Billboard;
