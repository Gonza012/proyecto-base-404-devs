import { useEffect, useState, useRef } from "react";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: "",
        rol: "user",
    });

    const [message, setMessage] = useState({ text: "", type: "" });
    const nameInputRef = useRef(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("usuarios")) || [];
        setUsers(stored);
    }, []);

    const createUser = () => {
        if (!form.nombre || !form.email || !form.password) {
            setMessage({
                text: "⚠️ Completá todos los campos obligatorios",
                type: "error",
            });
            return;
        }

        const updated = [...users, { id: Date.now(), ...form }];
        setUsers(updated);
        localStorage.setItem("usuarios", JSON.stringify(updated));

        setForm({ nombre: "", email: "", password: "", rol: "user" });

        setMessage({
            text: "✅ Usuario creado correctamente",
            type: "success",
        });

        setTimeout(() => {
            nameInputRef.current?.focus();
        }, 100);
    };

    const deleteUser = (id) => {
        if (!window.confirm("¿Seguro que querés eliminar este usuario?")) return;

        const updated = users.filter(u => u.id !== id);
        setUsers(updated);
        localStorage.setItem("usuarios", JSON.stringify(updated));

        setMessage({
            text: "🗑️ Usuario eliminado correctamente",
            type: "success",
        });
    };

    return (
        <div className="adminSection">
            <h2>Usuarios</h2>

            {message.text && (
                <p style={{ color: message.type === "error" ? "#c0392b" : "#27ae60" }}>
                    {message.text}
                </p>
            )}

            <div className="adminForm">
                <input
                    ref={nameInputRef}
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                />

                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <select
                    value={form.rol}
                    onChange={e => setForm({ ...form, rol: e.target.value })}
                >
                    <option value="user">Usuario</option>
                    <option value="admin">Admin</option>
                </select>

                <button onClick={createUser}>Crear</button>
            </div>

            {users.length === 0 ? (
                <p className="muted">No hay usuarios registrados.</p>
            ) : (
                <table className="adminTable">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.nombre}</td>
                                <td>{u.email}</td>
                                <td>{u.rol}</td>
                                <td>
                                    <button className="danger" onClick={() => deleteUser(u.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
