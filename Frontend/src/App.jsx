import { useState } from "react";
import Container from "react-bootstrap/Container";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import ProductView from "./Pages/ProductView";
import ProductDetail from "./Pages/ProductDetail";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import Cookies from "js-cookie";
import Orders from "./Pages/Orders";
import Toast from 'react-bootstrap/Toast';
import PrivateRoutes from "./components/PrivateRoutes";
import { ToastContainer } from "react-bootstrap";
import AddProduct from "./Pages/AddProduct";

function App() {

  const [isLoggedIn,setIsLoggedIn]=useState(Cookies.get("userid") ? true : false);
  const [keyword,setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState();


  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} keyword={keyword} setKeyword={setKeyword}/>
      
      
      <ToastContainer position="top-center" className="p-3" style={{ zIndex: 1021}}>
      <Toast style={{height:"100px", backgroundColor:"#2b3035",color:"white"}} onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Message</strong>
          </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
        </ToastContainer>
     
        <Container>
        <Router>
          <Routes>
            <Route exact path="/" element={<ProductView keyword={keyword} setShow={setShow} setMsg={setMsg}/>} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route exact path="/products/:productId" element={<ProductDetail setShow={setShow} setMsg={setMsg} />} />           
            <Route element={<PrivateRoutes isLoggedIn={isLoggedIn}/>}>
            <Route exact path="/cart" element={<Cart setShow={setShow} setMsg={setMsg} />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/addProduct" element={<AddProduct setShow={setShow} setMsg={setMsg} />} />
            </Route>
          </Routes>
        </Router>
      </Container>
     
    </>
  );
}

export default App;
