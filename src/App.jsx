import AdminPanel from "./pages/admin/AdminPanel";
import ProtectedAdmin from "./components/ProtectedAdmin";
import Login from "./pages/login/login";
import Error404 from "./pages/error404/Error404";
import GameDetailPage from "./pages/gameDetailpage/GameDetailPage";
import Register from "./pages/register/register";
import Aboutus from "./pages/aboutus/aboutus";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminPanel />
            </ProtectedAdmin>
          }
        />
        <Route path="/Home" element={<Home />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error404" element={<Error404 />} />
        <Route path="*" element={<AdminPanel />} />
        <Route path="/juego/:slug" element={<GameDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
