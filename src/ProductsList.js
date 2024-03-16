import { useState, useEffect } from "react";
import Product from "./Product";

const ProductsList = () => {
  const [productsList, setProductsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(2);

  const fetchProducts = async () => {
    const data = await fetch("https://dummyjson.com/products");
    const json = await data.json();
    // console.log(json.products);
    setProductsList(json.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleSearch = (e) => {
    // console.log(e.target.value);
    setSearchInput(e.target.value);
    const filteredList = productsList.filter((product) => {
      if (product.title.includes(searchInput)) {
        return product;
      }
    });
    setProductsList(filteredList);
  };

  const handleFilter = () => {
    const filteredList = productsList.filter((product) => {
      if (product.rating > 4.5) {
        return product;
      }
    });
    setProductsList(filteredList);
    // console.log(filteredList);
  };

  const handlepagination = (number) => {
    if (number >= 1 && number <= productsList.length / 10 && number != page) {
      setPage(number);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <input type="text" placeholder="Search..." onChange={handleSearch} />
      <button onClick={handleFilter}>Filter</button>
      <div className="productContainer">
        {productsList.slice(page * 10 - 10, page * 10).map((each) => (
          <Product key={each.id} product={each} />
        ))}
      </div>

      <div className="pageNum">
        <p onClick={() => handlepagination(page - 1)}>⬅️</p>
        {[...Array(productsList.length / 10)].map((each, i) => {
          return (
            <p
              className="number"
              onClick={() => {
                setPage(i + 1);
              }}
            >
              {i + 1}
            </p>
          );
        })}
        <p onClick={() => handlepagination(page + 1)}>➡️</p>
      </div>
    </div>
  );
};

export default ProductsList;
