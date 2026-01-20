import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuarioLogueado || usuarioLogueado.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedAdmin;
