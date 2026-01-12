import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const dataUser = getLSItems("userData");
    if (!dataUser) {
      setErrorLogin("No hay ningún usuario registrado. Ve a Registro.");
      return;
    }
    if (
      dataUser.username === data.username &&
      dataUser.password === data.password
    ) {
      setLSItems("isAdmin", true);
      setErrorLogin("");
      navigate("/");
    } else {
      setLSItems("isAdmin", false);
      setErrorLogin("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h1>Bienvenido</h1>
        <p className="subtitle">Ingresa a tu cuenta de Evil Games</p>

        <form onSubmit={handleSubmit} className="loginForm">
          <div className="inputGroup">
            <label>Usuario</label>
            <input
              type="text"
              name="username"
              placeholder="Ej: Jose Perez"
              required
            />
          </div>

          <div className="inputGroup">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••"
              required
            />
          </div>

          <button type="submit" className="loginBtn">
            Iniciar Sesión
          </button>
        </form>

        {errorLogin && <div className="errorMessage">{errorLogin}</div>}
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
