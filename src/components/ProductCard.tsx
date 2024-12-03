import React from 'react';
import star from '../assets/star.png';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  rating,
}) => {
  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-black  dark:text-white">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <h2 className="text-lg font-bold ">{title}</h2>
      <p className="text-gray-700 dark:text-gray-200">${price.toFixed(2)}</p>
      <div className="flex items-center gap-1">
        {' '}
        <img className="w-4" src={star} alt="" />
        <p className="text-sm text-red-500">({rating})</p>{' '}
        
      </div>
    </div>
  );
};

export default ProductCard;
