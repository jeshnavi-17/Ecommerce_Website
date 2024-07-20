import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Cookies from 'js-cookie';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const userId = Cookies.get('userid');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/order/${userId}/getOrders`);
        const data = await response.json();
        setOrderHistory(data);
        console.log(data);
      } catch (error) {
        alert('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, [userId]);

  return (
    <div>
      <h2>Order History</h2>
      {orderHistory?.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orderHistory?.map((order) => (
          <Card key={order.orderId} className="mb-3">
            <Card.Body>
              <Card.Title className='mb-3'>Order ID: {order.orderId}</Card.Title>
              <Card.Subtitle className='mb-1 text-success'>Total Price: {order.price}</Card.Subtitle>
              <Card.Text>Order Status: {order.orderStatus}</Card.Text>
              <Container className="overflow-auto" style={{ whiteSpace: 'nowrap'}}>

              {/* <Row style={{overflowX:"auto"}}> */}
              {order.items.map((orderItem) => (
                // <Col lg={3}>
                  <Card  key={orderItem.orderItemId} className="mb-3 mx-2" style={{ display: 'inline-flex', width: '200px',height:250 }}>
                    <Card.Img variant="top" src={orderItem.product.productImage} alt={orderItem.product.productName} style={{width:"100px",height:"100px"}}/>
                    <Card.Body >
                      <Card.Title style={{whiteSpace:"collapse"}}>{orderItem.product.productName}</Card.Title>
                      <Card.Text>Quantity: {orderItem.quantity}</Card.Text>
                    </Card.Body>
                  </Card>
                // </Col>
              ))}
            {/* </Row> */}
            </Container>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default OrderHistory;

