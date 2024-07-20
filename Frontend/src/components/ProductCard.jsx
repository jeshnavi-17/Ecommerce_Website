import React, { useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function ProductCard(props) {
  const navigate = useNavigate();
  const userId = Cookies.get("userid");
  const isAdmin = (userId==3)?true:false;
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    productId: props.id,
    productName:props.pname,
    price:props.price,
    details:props.details,
    brand:props.brand,
    category:props.category,
    subCategory:props.subCategory,
    productImage:props.img
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.productId ||
      !formData.productName ||
      !formData.price ||
      !formData.details ||
      !formData.brand ||
      !formData.category ||
      !formData.subCategory||
      !formData.productImage
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/products/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate(0);
        props.setShow(true);
        props.setMsg("Product is updated");
      } else {
        props.setShow(true);
        props.setMsg("Update failed");
      }
    } catch (error) {
      alert("Error during update:", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  };

  const cartHandler = async () => {
    if (!userId) {
      navigate(`/login`);
    } else {
      try {
        const response = await fetch(
          `http://localhost:8080/cart/${userId}/add/${props.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Check if the request was successful 
        if (response.ok) {
          props.setShow(true);
          props.setMsg("Product added to cart successfully!");
        } else {
          alert("Failed to add product to cart.");
        }
      } catch (error) {
        alert("Error adding product to cart:", error);
      }
    }
  };



  return (
    <Card className="h-100 mt-3 border border-2 border-dark mb-4">
      <Card.Img
        src={props.img}
        style={{ width: "100%", height: "12rem" }}
        onClick={() => {
          navigate(`/products/${props.id}`);
        }}
        className="border-bottom border-2 "
      />

      <Card.Body>
        <Card.Title
          onClick={() => {
            navigate(`/products/${props.id}`);
          }}
        >
          {props.pname}
        </Card.Title>
        <Card.Text>Price:₹{props.price}</Card.Text>
        <Button variant="primary" className="w-100" onClick={cartHandler}>
          Add to Cart
        </Button>
        {isAdmin?(
        <>
        <Button variant="warning" className="w-100 mt-2" onClick={handleShow}>
          Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="ProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  defaultValue={props.pname}
                   onChange={handleChange}
                required
                />
              </Form.Group>
              <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="Price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  defaultValue={props.price}
                   onChange={handleChange}
                required
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="Brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  defaultValue={props.brand}
                   onChange={handleChange}
                required
                />
              </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="Details">
                <Form.Label>Details</Form.Label>
                <Form.Control
                  as="textarea" rows={3}
                  name="details"
                  defaultValue={props.details}
                   onChange={handleChange}
                required
                />
              </Form.Group>
           
              <Form.Group className="mb-3" controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  defaultValue={props.category}
                   onChange={handleChange}
                required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="SubCategory">
                <Form.Label>SubCategory</Form.Label>
                <Form.Control
                  type="text"
                  name="subCategory"
                  defaultValue={props.subCategory}
                   onChange={handleChange}
                required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  name="productImage"
                  defaultValue={props.img}
                   onChange={handleChange}
                required
                />
              </Form.Group>
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
        ):(console.log("Not Admin"))}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
