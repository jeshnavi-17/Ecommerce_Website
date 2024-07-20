import React, { useState } from "react";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from "react-bootstrap";

function AddProduct({setShow,setMsg}) {
  const [formData, setFormData] = useState({
    productName: "",
    price:"",
    details: "",
    brand: "",
    category: "Electronics",
    subCategory: "",
    productImage: "",
  });
 const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

  
    // Validate required fields
    if (
      !formData.productName ||
      !formData.price ||
      !formData.details ||
      !formData.brand ||
      !formData.category ||
      !formData.subCategory ||
      !formData.productImage
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/products/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/");
        setShow(true);
        setMsg("Product is added");
      } else {
        props.setShow(true);
        props.setMsg("Adding failed");
      }
    } catch (error) {
      alert("Error during adding:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
        <Form style={{
              border: "1px solid lightgrey",
              padding: "20px",
              borderRadius: "8px",
              borderColor: "whitesmoke",
              backgroundColor: "whitesmoke",
            }}
            onSubmit={handleSubmit}
            className="mt-5">
            <h2 style={{ textAlign: "center" }}>AddProduct</h2>
          <Form.Group className="mb-3" controlId="Form.ControlInput2">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="Form.ControlInput3"
            >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="Form.ControlInput5"
            >
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="Form.ControlInput4">
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="details"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Form.ControlInput6">
          <Form.Label>Category</Form.Label>
          <Form.Select    name="category"
          onChange={handleChange}>
            <option>Electronics</option>
            <option>Stationery</option>
            <option>Grocery</option>
            <option>clothes</option>
          </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Form.ControlInput7">
            <Form.Label>SubCategory</Form.Label>
            <Form.Control
              type="text"
              name="subCategory"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Form.ControlInput8">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="productImage"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
        </Form>
        </Col>
        </Row>
        </Container>
      
  );
}

export default AddProduct;
