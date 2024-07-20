import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import Cookies from "js-cookie";
import { useState } from "react";
function Header({ isLoggedIn, setIsLoggedIn, keyword, setKeyword }) {
  const [text, setText] = useState(keyword);
  const userId = Cookies.get("userid");
  {
    console.log(userId);
  }
  const isAdmin = userId == 3 ? true : false;

  const handleLogout = () => {
    // logout logic and removing the userid cookie
    Cookies.remove("userid");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const handleSearch = (e) => {
    setKeyword(text);
  };

  const handleTextchange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Navbar
        sticky="top"
        expand="lg"
        className="bg-body-tertiary "
        bg="dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand href="/" className="ms-5">
            BlueWaves
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className=" d-flex gap-3 me-auto ms-auto  my-3 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Form className="d-flex ml-auto">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={handleTextchange}
                  value={text}
                />
                <Button variant="outline-success" onClick={handleSearch}>
                  Search
                </Button>
              </Form>
              <Nav.Link href={"/Cart"}>
                <i className="fa-solid fa-cart-shopping"></i>
              </Nav.Link>
              <Nav.Link href="/orders">Orders</Nav.Link>
              <NavDropdown title="Profile" id="navbarScrollingDropdown">
                {isLoggedIn ? (
                  // Show logout option if the user is logged in
                  <>
                    <NavDropdown.Item href="/profile">Account</NavDropdown.Item>
                    <NavDropdown.Divider />
                    {isAdmin ? (
                      <>
                        <NavDropdown.Item href="/addProduct">
                          Add Product
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                      </>
                    ) : (
                      console.log("not Admin")
                    )}
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </>
                ) : (
                  // Show login option if the user is not logged in
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
