import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import {
  Col,
  Row,
  ButtonGroup,
  ToggleButton,
  Pagination,
  Dropdown,
} from "react-bootstrap";

function ProductView({ keyword = "", setShow, setMsg }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState("");
  const [sortField, setSortField] = useState("");
  

  useEffect(() => {
    setCurrentPage(0);
  }, [keyword, sortField, sortOrder]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/products/search?keyword=${keyword}&category=${selectedCategory}&pageNumber=${currentPage}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
        const data = await response.json();
        console.log(data);
        setProducts(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        alert("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, [keyword, selectedCategory, currentPage, sortField, sortOrder]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0); // Reset to the first page when changing the category
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Page numbers start from 1, but API uses zero-based indexing
  };

  const pagesArray = new Array(totalPages).fill(0)
 

  return (
    <div>
      {/* Category Buttons */}
      <ButtonGroup className="my-3">
        <ToggleButton
          type="radio"
          variant="outline-dark"
          name="categories"
          checked={selectedCategory === ""}
          onClick={() => handleCategoryChange("")}
        >
          All Categories
        </ToggleButton>
        <ToggleButton
          type="radio"
          variant="outline-dark"
          name="categories"
          checked={selectedCategory === "electronics"}
          onClick={() => handleCategoryChange("electronics")}
        >
          Electronics
        </ToggleButton>
        <ToggleButton
          type="radio"
          variant="outline-dark"
          name="categories"
          checked={selectedCategory === "stationery"}
          onClick={() => handleCategoryChange("stationery")}
        >
          Stationery
        </ToggleButton>
        <ToggleButton
          type="radio"
          variant="outline-dark"
          name="grocery"
          checked={selectedCategory === "grocery"}
          onClick={() => handleCategoryChange("grocery")}
        >
          Grocery
        </ToggleButton>
        <ToggleButton
          type="radio"
          variant="outline-dark"
          name="clothes"
          checked={selectedCategory === "clothes"}
          onClick={() => handleCategoryChange("clothes")}
        >
          Clothing
        </ToggleButton>
      </ButtonGroup>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        <i className="fa-solid fa-filter"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            active={(sortField==="price")&&(sortOrder==="asc")}
            onClick={() => {
              setSortField("price");
              setSortOrder("asc");
            }}
          >
            Price - low to high
          </Dropdown.Item>
          <Dropdown.Item 
           active={(sortField==="price")&&(sortOrder==="desc")}
          onClick={() => {
              setSortField("price");
              setSortOrder("desc"); 
            }}>Price - high to low</Dropdown.Item>
          <Dropdown.Item onClick={() => {
              setSortField("");
              setSortOrder("");
            }}>Clear</Dropdown.Item>  
        </Dropdown.Menu>
      </Dropdown>

      {/* Product Cards */}
      <Row sm={3} md={5} xl={5} xxl={8}>
        {products.map((product) => (
          <Col className="my-2" key={product.productId}>
            <ProductCard
              img={product.productImage}
              pname={product.productName}
              price={product.price}
              id={product.productId}
              details={product.details}
              brand={product.brand}
              category={product.category}
              subCategory={product.subCategory}
              setMsg={setMsg}
              setShow={setShow}
            />
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <Pagination className="mt-3">
          {pagesArray.map((_, page) => (
            <Pagination.Item            
              key={page + 1}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
}

export default ProductView;
