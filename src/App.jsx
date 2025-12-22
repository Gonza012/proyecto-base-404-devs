import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Aboutus from "./pages/aboutus/aboutus";
import Home from "./pages/home/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Aboutus" element={<Aboutus />} />
        </Routes>
      </BrowserRouter>
      ,
    </>
  );
}

export default App;
