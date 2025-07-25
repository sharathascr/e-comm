import { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import axios from "axios";

function Sidebar() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=0")
      .then((response) => {
        const categoryArr = [
          ...(new Set(
            response?.data?.products
              ?.filter((product) => product.category)
              .map((product) => product.category)
          ) || ""),
        ];
        setCategories(categoryArr);
        console.log("category", categoryArr);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <div id="sidebar">
      <ul>
        {categories.map((category, index) => (
          <button className="category-item" key={index}>
            {category}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
