import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useProductStore } from '../store/productStore';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const { products, setProducts, searchQuery, sortOption } = useProductStore();
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Sort products based on sortOption
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  //  Paginate sorted products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return sortedProducts.slice(startIndex, startIndex + productsPerPage);
  }, [sortedProducts, currentPage]);

  return (
    <div className="dark:bg-[#151414] min-h-screen">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4  ">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full flex justify-center">
            <h1 className="text-center text-2xl font-bold text-red-500">
              No products found for "{searchQuery}"
            </h1>
          </div>
        ) : (
          paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              rating={product.rating.rate}
            />
          ))
        )}
      </div>
      <Pagination
        totalProducts={sortedProducts.length}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;
