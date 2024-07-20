import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    userPhone: "",
    password: "",
    email: "",
    picture: "", // Optional field
    addresses: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the changed field is part of the address
    if (name.startsWith("addresses.")) {
    
      setFormData({
        ...formData,
        addresses: {
          ...formData.addresses,
          [name.substring(10)]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.userPhone ||
      !formData.password ||
      !formData.email ||
      !formData.addresses.street ||
      !formData.addresses.city ||
      !formData.addresses.state ||
      !formData.addresses.pincode
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/");
        console.log("User successfully signed up!");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("Error during signup:", error);
    }
  };

  return (
    
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form
            style={{
              border: "1px solid lightgrey",
              padding: "20px",
              borderRadius: "8px",
              borderColor: "whitesmoke",
              backgroundColor: "whitesmoke",
            }}
            onSubmit={handleSubmit}
            className="mt-5"
          >
            <h2 style={{ textAlign: "center" }}>SignUp</h2>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formUserPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                name="userPhone"
                value={formData.userPhone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street"
                name="addresses.street"
                value={formData.addresses.street}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                name="addresses.city"
                value={formData.addresses.city}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your state"
                name="addresses.state"
                value={formData.addresses.state}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your pincode"
                name="addresses.pincode"
                value={formData.addresses.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPicture">
              <Form.Label>Picture URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter URL for your picture"
                name="picture"
                value={formData.picture}
                onChange={handleChange}
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Sign Up
            </Button>

            <p className="mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Col>
      </Row>
   
  );
};

export default Signup;
