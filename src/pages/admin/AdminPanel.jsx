import { useState } from "react";
import AdminUsers from "./AdminUsers";
import AdminGames from "./AdminGames";
import "./admin.css";

export default function AdminPanel() {
    const [tab, setTab] = useState("users");

    return (
        <div className="admin">
            <div className="adminContainer">
                <h1 className="adminTitle">Panel de Administración</h1>

                <div className="adminTabs">
                    <button
                        className={tab === "users" ? "active" : ""}
                        onClick={() => setTab("users")}
                    >
                        Usuarios
                    </button>
                    <button
                        className={tab === "games" ? "active" : ""} 
                        onClick={() => setTab("games")}
                    >
                        Juegos
                    </button>
                </div>

                <div className="adminContent">
                    {tab === "users" ? <AdminUsers /> : <AdminGames />}
                </div>
            </div>
        </div>
    );
}
