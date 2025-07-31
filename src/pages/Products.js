import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";
import { useSelector } from "react-redux";
import { useDebounce } from "../custom-hooks/useDebounce";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";

function Products() {
  const [products, setProducts] = useState([]);
  console.log("products", products);
  const [inputValue, setInputValue] = useState("");
  const [totalProductsCount, setTotalProductsCount] = useState(null);
  const category = useSelector((state) => state.categorySlice.category);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const deBouncedValue = useDebounce(inputValue, 2000);
  const [selectedPostPerPage, setPostsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = selectedPostPerPage;
  const skip = (currentPage - 1) * selectedPostPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDropdownChange = (e) => {
    setPostsPerPage(e.target.value);
  };
  useEffect(() => {
    if (deBouncedValue) {
      setTimeout(() => {
        axios
          .get(`http://localhost:4001/api/products/search?q=${deBouncedValue}`)
          .then((response) => {
            setProducts(response.data.data);
            setTotalProductsCount(response.data.count);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 3000);
    } else if (category) {
      axios
        .get(`http://localhost:4001/api/products/category/${category}`)
        .then((response) => {
          setProducts(response.data.products);
          setTotalProductsCount(response.data.total);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (currentPage) {
      axios
        .get(
          `http://localhost:4001/api/products/retrive-products/?limit=${limit}&skip=${skip}`
        )
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get(
          `http://localhost:4001/api/products/retrive-products/?limit=${limit}&skip=${skip}`
        )
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [deBouncedValue, category, selectedPostPerPage, currentPage]);
  useEffect(() => {
    axios
      .get(`http://localhost:4001/api/products/retrive-products-count`)
      .then((res) => setTotalProductsCount(res.data));
  }, []);
  console.log("products", products);
  return (
    <>
      <Sidebar />
      <div className="products-page">
        <div className="search-section">
          <input
            id="product-search-input"
            type="text"
            placeholder="search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="posts-per-page-select">Posts per page</label>
          <select
            id="posts-per-page-select"
            onChange={(e) => handleDropdownChange(e)}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>
        {products.length !== 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="suspense">
            {arr.map((_, index) => (
              <div key={index}>
                <div className="suspense-image"></div>
                <div className="suspense-desc"></div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination
        totalProductsCount={totalProductsCount}
        selectedPostPerPage={selectedPostPerPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
}

export default Products;
