import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const usersDB = JSON.parse(localStorage.getItem("usersDB")) || [];
    const userFound = usersDB.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );

    if (userFound) {
      localStorage.setItem("currentUser", JSON.stringify(userFound));
      if (userFound.username === "Admin") {
        localStorage.setItem("isAdmin", "true");
      } else {
        localStorage.setItem("isAdmin", "false");
      }
      setErrorLogin("");
      navigate("/");
    } else {
      setErrorLogin("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h1>Bienvenido</h1>
        <p className="subtitle">Ingresa a Evil Games</p>
        <form onSubmit={handleSubmit} className="loginForm">
          <div className="inputGroup">
            <label>Usuario</label>
            <input type="text" name="username" required />
          </div>
          <div className="inputGroup">
            <label>Contraseña</label>
            <input type="password" name="password" required />
          </div>

          <button type="submit" className="loginBtn">
            Iniciar Sesión
          </button>
        </form>
        {errorLogin && <div className="errorMessage">{errorLogin}</div>}
        <div style={{ marginTop: "20px" }}>
          <span style={{ color: "#ccc" }}>¿No tienes cuenta? </span>
          <Link
            to="/register"
            style={{
              color: "#ff4444",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
const getLSItems = (key) => {
  const dataFound = localStorage.getItem(key);
  if (!dataFound) return null;
  return JSON.parse(dataFound);
};

const setLSItems = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default Login;
export { setLSItems, getLSItems };
