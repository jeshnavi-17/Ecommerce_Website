import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();  


  const handleSubmit = async(e) => {
    e.preventDefault();

    // sending data and getting response
    try {
        const response = await fetch("http://localhost:8080/auth/login",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include" //let cookies to be stored
        });
        const data = await response.json();
        {console.log(data);}
        if (response.ok) {
          console.log('Login successful');
          setIsLoggedIn(true)
          navigate('/');
        } else {
          console.log('Login failed');
        }
      

    } catch (error) {
        alert('Login error:', error);

    }
    setShowError(true);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          
          <Form  style={{
              border: '1px solid lightgrey', 
              padding: '20px', 
              borderRadius: '8px',
              borderColor:'whitesmoke',
              backgroundColor:'whitesmoke'
            }} onSubmit={handleSubmit}>
          <h2 style={{textAlign:'center'}}>Login</h2>
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

            {showError && <Alert variant="danger">Invalid email or password</Alert>}

            <Button variant="primary" type="submit"className="mt-3">
              Log In
            </Button>

            <p className="mt-3">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
