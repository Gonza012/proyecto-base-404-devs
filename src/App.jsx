import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Aboutus from "./pages/aboutus/aboutus";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import AuthChecker from "./routes/authChecker";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      ,
    </>
  );
}

export default App;
