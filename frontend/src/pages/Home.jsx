import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/Product';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

function Home({ isDarkMode }) {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className={isDarkMode ? 'dark' : ''}>
      <div className={`container ${isDarkMode ? 'dark' : ''}`}>
        <h1>Current Products</h1>
        
        {products.length > 0 ? (
          // Wrap ProductCard components in a horizontal container
          <div className="product-container">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          // Display a message if no product found
          <>
            <span>No Product Found 😅</span>
            <Link to="/product">Create a Product</Link>
          </>
        )}
      </div>
    </main>
  );
}

export default Home;
