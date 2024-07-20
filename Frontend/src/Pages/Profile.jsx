import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Container, Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import { FaPenSquare } from "react-icons/fa";
import { useNavigate } from "react-router";

const Profile = () => {
  const userId = Cookies.get("userid");
  const [show, setShow] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    const fetchUserProfile = async (userId) => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        const userData = await response.json();
        setUserProfile(userData);
        setFormData(userData);
      } catch (error) {
        alert("Error fetching user profile:", error);
      }
    };

    fetchUserProfile(userId);
  }, []);

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  const handleEdit = (e) => {
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
    console.log(formData);

    // Validate required fields
    if (
      !formData.name ||
      !formData.phone ||
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
      const response = await fetch(
        "http://localhost:8080/users/updateProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate(0);
        console.log("Updated profile");
      } else {
        alert("Updating failed");
      }
    } catch (error) {
      alert("Error during updating:", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>User Profile</h2>
          <Row>
            <Col md={4}>
              <img
                src={userProfile.picture}
                alt="Profile"
                style={{ width: "100%", borderRadius: "50%" }}
              />
            </Col>
            <Col md={8}>
              <p>
                <strong>Name:</strong> {userProfile.name}
              </p>
              <p>
                <strong>Email:</strong> {userProfile.email}
              </p>
              <p>
                <strong>Phone:</strong> {userProfile.phone}
              </p>
              <p>
                <strong>Street:</strong> {userProfile.addresses.street}
              </p>
              <p>
                <strong>City:</strong> {userProfile.addresses.city}
              </p>
              <p>
                <strong>State:</strong> {userProfile.addresses.state}
              </p>
              <p>
                <strong>Pincode:</strong> {userProfile.addresses.pincode}
              </p>
            </Col>
          </Row>
        </Col>
        <Col md={1}>
          <FaPenSquare onClick={handleShow} />
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              border: "1px solid lightgrey",
              padding: "20px",
              borderRadius: "8px",
              borderColor: "whitesmoke",
              backgroundColor: "whitesmoke",
            }}
            className="mt-5"
          >
            <h2 style={{ textAlign: "center" }}>SignUp</h2>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={userProfile.name}
                onChange={handleEdit}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                defaultValue={userProfile.email}
                onChange={handleEdit}
                required
              />
            </Form.Group>

            <Form.Group controlId="formUserPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                defaultValue={userProfile.phone}
                onChange={handleEdit}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="addresses.street"
                defaultValue={userProfile.addresses.street}
                onChange={handleEdit}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="addresses.city"
                defaultValue={userProfile.addresses.city}
                onChange={handleEdit}
                required
              />
            </Form.Group>

            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="addresses.state"
                defaultValue={userProfile.addresses.state}
                onChange={handleEdit}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="addresses.pincode"
                defaultValue={userProfile.addresses.pincode}
                onChange={handleEdit}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPicture">
              <Form.Label>Picture URL</Form.Label>
              <Form.Control
                type="text"
                name="picture"
                defaultValue={userProfile.picture}
                onChange={handleEdit}
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
    </Container>
  );
};

export default Profile;
