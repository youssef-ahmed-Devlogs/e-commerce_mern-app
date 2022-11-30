import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          MeStore
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/categories" className="nav-link">
              Categories
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Link to="/cart" className="nav-link">
              Cart 0
            </Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <Link to="/my-account" className="dropdown-item">
                My Account
              </Link>
              <Link to="/blog" className="dropdown-item">
                Blog
              </Link>
              <Link to="/about" className="dropdown-item">
                About
              </Link>
              <NavDropdown.Divider />

              <Link to="/logout" className="dropdown-item">
                Logout
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
