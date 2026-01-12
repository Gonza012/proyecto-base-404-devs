import { useState } from "react";
import { useNavigate } from "react-router";
import { getLSItems, setLSItems } from "../../utilis/functions";

function Login() {
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const dataUser = getLSItems("userData");
    if (dataUser.username === data.username) {
      if (dataUser.password === data.password) {
        setLSItems("isAdmin", true);
        navigate("/inicio");
        setErrorLogin("");
        return;
      } else {
        setLSItems("isAdmin", false);
        return setErrorLogin("credenciales incorrectas");
      }
    } else {
      setLSItems("isAdmin", false);
      return setErrorLogin("credenciales incorrectas");
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button>Iniciar Sesion</button>
      </form>
      <span style={{ color: "red" }}>{errorLogin}</span>
    </>
  );
}

export default Login;
