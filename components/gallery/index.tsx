"use client"

import GalleryTab from './gallery-tab';
import { Image as ImageType } from '@/types' 

import Image from 'next/image';
import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';


interface GalleryProps {
    images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    return ( 
        <TabGroup as="div" className="flex flex-col-reverse">
            <div className='hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none'>
                <TabList className="grid grid-cols-4 gap-6">
                    {images.map(image => (
                        <GalleryTab key={image.id} image={image} />
                    ))}
                </TabList>
            </div>
            <TabPanels className="w-full aspect-square">
                {images.map(image => (
                    <TabPanel key={image.id}>
                        <div className='relative w-full h-full overflow-hidden aspect-square sm:rounded-lg'>
                            <Image fill sizes="(max-width: 1024px) 100vw, 50vw" src={image.url} alt={'Image'} className='object-cover object-center' />
                        </div>
                    </TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
     );
}
 
export default Gallery;