import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Aboutus from "./pages/aboutus/aboutus";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Error404 from "./pages/error404/Error404";
import GameDetailPage from "./pages/gameDetailpage/GameDetailPage";
import Register from "./pages/register/register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/error404" element={<Error404 />} />
          <Route path="/juego/:id" element={<GameDetailPage />} />
        </Routes>
      </BrowserRouter>
      ,
    </>
  );
}

export default App;
