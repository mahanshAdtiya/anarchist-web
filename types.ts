export interface Billboard{
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
  }

export interface Product{
  id: string;
  name: string;
  price: string;
  stock: number;
  description: string;
  isFeatured: boolean;
  isArchived: boolean;
  category: {
    id: string;
    name: string
  }
  sizes: {
    size: Size; 
  }[];
  images: Image[];
  color: {
    id: string;

    name: string;
    value: string;
  }
  selectedSize?: { id: string; name: string; value: string };
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
export interface Color {
  id: string;
  name: string;
  value: string;
}