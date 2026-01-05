import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getLSItems } from "../utilis/functions";

function AuthChecker({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const isAdmin = getLSItems("isAdmin");
    if (!isAdmin) {
      navigate("Login");
    }
  });
  return children;
}

export default AuthChecker;
