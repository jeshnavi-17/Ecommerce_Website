import React, { useState, useEffect } from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";



const Cart = ({ setShow, setMsg }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userId = Cookies.get('userid');

  useEffect(() => {
    
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/cart/${userId}/getCart`
        );
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        alert("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      const response = await fetch(
        `http://localhost:8080/cart/changeQuantity/${cartItemId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: newQuantity,
        }
      );

      if (response.ok) {
        const updatedCartItem = await response.json();
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.cartItemId === updatedCartItem.cartItemId
              ? updatedCartItem
              : item
          )
        );
      } else {
        alert("Failed to update quantity.");
      }
    } catch (error) {
      alert("Error updating quantity:", error);
    }
  };

  const handleRemoveFromCart = async (userId, productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/cart/${userId}/remove/${productId}`
      );
      if (response.ok) {
        // Remove the item from cartItems state if it was removed successfully
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.product.productId !== productId)
        );
      } else {
        alert("Failed to remove product from cart.");
      }
    } catch (error) {
      alert("Error removing product from cart:", error);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.product.price * item.quantity;
    }
    return total;
  };

  const handleOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/order/${userId}/createOrder`
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/orders");
        setShow(true);
        setMsg("Order is Placed");
      } else {
        setShow(true);
        setMsg("Cart is empty, Order can't be placed");
      }
    } catch (error) {
      alert("Error fetching order history:", error);
    }
  };

  return (
    <div>
      <h1
        style={{ textAlign: "center", fontFamily: "monospace", padding: "10px" }}
      >
        Cart
      </h1>
      <Row>
        {/* 70% for Cart Items */}
        <Col md={8}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <Card key={item.cartItemId} className="mb-3">
                  <Card.Body className="d-flex align-items-center justify-content-around">
                    <Image
                      src={item.product.productImage}
                      alt={item.product.productName}
                      style={{ maxWidth: "100px" }}
                    />
                    <Card.Title className="mb-0">
                      {item.product.productName}
                    </Card.Title>
                    <Card.Text className="mb-0">
                      Price: ₹{item.product.price}
                    </Card.Text>
                    <div className="d-flex align-items-center">
                      <Button
                        onClick={() => {
                          if (item.quantity === 1)
                            handleRemoveFromCart(
                              userId,
                              item.product.productId
                            );
                          else
                            handleQuantityChange(
                              item.cartItemId,
                              item.quantity - 1
                            );
                        }}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        onClick={() =>
                          handleQuantityChange(
                            item.cartItemId,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleRemoveFromCart(userId, item.product.productId)
                      }
                    >
                      <i className="fa-solid fa-trash"></i>{" "}
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </>
          )}
        </Col>
        {/* 30% for Total Price */}
        <Col md={4}>
          <div className="d-flex flex-column h-20 border p-3">
            <div
              className="d-flex align-items-center gap-3"
              style={{ fontFamily: "serif" }}
            >
              <h4>Total Price:</h4>
              <h5>₹{calculateTotalPrice()}</h5>
            </div>
            <Button variant="primary" onClick={handleOrder} className="mt-auto">
              Place Order
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
