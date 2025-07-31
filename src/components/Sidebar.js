import { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCategory } from "../store/slice/categorySlice";

function Sidebar() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const handleClick = (value) => {
    dispatch(setCategory(value.textContent));
  };
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div id="sidebar">
      <ul>
        {categories.map((category, index) => (
          <button
            className="category-item"
            key={index}
            onClick={(e) => handleClick(e.target)}
          >
            {category}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
