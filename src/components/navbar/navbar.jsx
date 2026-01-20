import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/img/lgopngegnegro.png";
import "./navbar.css";

function CustomNavbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAdmin");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="evil-navbar" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img
            src={logo}
            alt="Evil Games Logo"
            width="40"
            height="40"
            className="d-inline-block align-top rounded-circle border border-light"
          />
          <span className="brand-text">
            EVIL <span className="text-danger">GAMES</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Inicio
            </NavLink>
            <NavLink to="/aboutus" className="nav-link">
              Nosotros
            </NavLink>

            {currentUser && currentUser.role === "admin" && (
              <NavLink
                to="/AdminPanel"
                className="nav-link text-warning fw-bold"
              >
                ⚡ Panel Admin
              </NavLink>
            )}
          </Nav>

          <Nav className="align-items-center gap-2">
            {!currentUser ? (
              <>
                <Link to="/login">
                  <Button variant="outline-light" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="danger" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  className="d-flex align-items-center gap-2 user-dropdown"
                >
                  <span>👤 {currentUser.username}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                  {currentUser.role === "admin" && (
                    <Dropdown.Item as={Link} to="/admin">
                      Gestionar Juegos
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    Cerrar Sesión 🚪
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
