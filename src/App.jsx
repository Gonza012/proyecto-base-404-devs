import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import AdminPanel from "./pages/admin/AdminPanel.jsx";
import ProtectedAdmin from "./components/ProtectedAdmin";
import Error404 from "./pages/error404/Error404";
import GameDetailPage from "./pages/GameDetailPage";

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

        <Route path="/game/:id" element={<GameDetailPage />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
