import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../pages/Login/Login.css";

function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    if (data.password !== data.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (data.username.length < 4) {
      setError("El usuario debe tener al menos 4 caracteres");
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("usersDB")) || [];
    const userExists = existingUsers.find((u) => u.username === data.username);
    if (userExists) {
      setError("El nombre de usuario ya está en uso");
      return;
    }
    const newUser = {
      username: data.username,
      password: data.password,
      email: data.email,
      role: data.username === "Admin" ? "admin" : "user",
    };
    existingUsers.push(newUser);
    localStorage.setItem("usersDB", JSON.stringify(existingUsers));

    alert("¡Usuario creado con éxito! Ahora inicia sesión.");
    navigate("/Home");
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h1>Crear Cuenta</h1>
        <p className="subtitle">Únete a Evil Games</p>

        <form onSubmit={handleRegister} className="login-form">
          <div className="inputGroup">
            <label>Usuario</label>
            <input
              type="text"
              name="username"
              placeholder="Ej: pepitoGamer"
              required
            />
          </div>
          <div className="inputGroup">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Nombre@gmail.com"
              required
            />
          </div>
          <div className="inputGroup">
            <label>Contraseña</label>
            <input type="password" name="password" required />
          </div>
          <div className="inputGroup">
            <label>Confirmar Contraseña</label>
            <input type="password" name="confirmPassword" required />
          </div>

          <button type="submit" className="loginBtn">
            Registrarse
          </button>
        </form>

        {error && <div className="errorMessage">{error}</div>}

        <div style={{ marginTop: "20px" }}>
          <span style={{ color: "#ccc" }}>¿Ya tienes cuenta? </span>
          <Link
            to="/login"
            style={{
              color: "#ff4444",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
