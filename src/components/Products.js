import React, { useEffect, useState } from 'react';
import Product from './Product'; // Adjust the path based on your file structure
import { PRODUCTS } from '../PRODUCTS'; // Adjust the path based on your file structure
import { useFilters } from '../FilterContext'; // Import the useFilters hook
import { useSearch } from '../SearchContext'; // Import the useSearch hook
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect (() => {

    const fetchProducts = async () => {
      try {
        const responce = await fetch('http://localhost:5001/product');
        if (!responce.ok) {
          throw new Error(`HTTP error! Status: ${responce.status}`);
        }
        const data = await responce.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts()
  }, [])


  const { filters } = useFilters(); // Get filters from context
  const { searchTerm } = useSearch(); // Get the current search term from context

  const filterAndSearchProducts = (products) => {

    return products.filter((product) => {
      // Filter by category, priceFrom, and priceTo
      if (filters.category!=="Catalogue"){
      if (filters.category && product.category !== filters.category) {
        return false;
      }
    }
      if (filters.priceFrom && product.price < parseFloat(filters.priceFrom)) {
        return false;
      }
      if (filters.priceTo && product.price > parseFloat(filters.priceTo)) {
        return false;
      }
      if(filters.state&&product.state !== filters.state) {
        return false;
      }
      // Additional filtering based on search term (e.g., by product name)
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      } 
      return true;
    });
  };


  const filteredAndSearchedProducts = filterAndSearchProducts(products); // Filter products including search

  return (
    <div className='products-div'>
      <h1>Trending items</h1>
      <div className="items">
        {filteredAndSearchedProducts.map((product) => (
          <Product
            className="item-wrapper"
            key={product.id}
            imgSrc={product.productImage}
            itemName={product.name}
            condition={product.state}
            price={product.price}
            location={product.location}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
