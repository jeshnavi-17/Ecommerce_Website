import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const ProductDetail = ({setMsg,setShow}) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const userId = Cookies.get("userid");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/getById/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          alert('Error fetching product details');
        }
      } catch (error) {
        alert('Error during fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async() => {
    if (!userId) {
      navigate(`/login`);
    } else {
      try {
        const response = await fetch(
          `http://localhost:8080/cart/${userId}/add/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Check if the request was successful 
        if (response.ok) {
          setShow(true);
          setMsg("Added to cart successfully")
        } else {
          alert("Failed to add product to cart.");
        }
      } catch (error) {
        alert("Error adding product to cart:", error);
      }
    }
  };
   


  return (
    <div className="container mt-4">
      {loading ? (
        <p>Loading product details...</p>
      ) : product ? (
        <div className="row">
          <div className="col-md-4">
            <img
              src={product.productImage}
              alt={product.productName}
              className="img-fluid"
              style={{ height: '17rem', marginRight: '20px' }}
            />
          </div>
          <div className="col-md-8">
            <h2>{product.productName}</h2>
            <p>Price: ₹{product.price}</p>
            <p>Details: {product.details}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>Subcategory: {product.subCategory}</p>
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
};

export default ProductDetail;
