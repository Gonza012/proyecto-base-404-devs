import { useEffect, useState } from "react";

export default function AdminGames() {
    const [games, setGames] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        nombre: "",
        categoria: "Acción",
        imagen: "",
        descripcion: "",
        tipo: "normal",
    });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("juegos")) || [];
        setGames(stored);
    }, []);

    const resetForm = () => {
        setForm({
            nombre: "",
            categoria: "Acción",
            imagen: "",
            descripcion: "",
            tipo: "normal",
        });
        setEditingId(null);
    };

    const saveGame = () => {
        if (!form.nombre || !form.categoria) return;

        let updated;

        if (editingId) {
            updated = games.map(g =>
                g.id === editingId ? { ...g, ...form } : g
            );
        } else {
            updated = [...games, { id: Date.now(), ...form }];
        }

        setGames(updated);
        localStorage.setItem("juegos", JSON.stringify(updated));
        resetForm();
    };

    const deleteGame = (id) => {
        if (!window.confirm("¿Seguro que querés eliminar este juego?")) return;

        const updated = games.filter(g => g.id !== id);
        setGames(updated);
        localStorage.setItem("juegos", JSON.stringify(updated));
    };

    const editGame = (game) => {
        setForm({
            nombre: game.nombre,
            categoria: game.categoria,
            imagen: game.imagen,
            descripcion: game.descripcion,
            tipo: game.tipo,
        });
        setEditingId(game.id);
    };

    return (
        <div className="adminSection">
            <h2>Gestión de Juegos</h2>

            <div className="adminForm">
                <input
                    placeholder="Nombre del juego"
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                />

                <select
                    value={form.categoria}
                    onChange={e => setForm({ ...form, categoria: e.target.value })}
                >
                    <option>Acción</option>
                    <option>Supervivencia</option>
                    <option>Terror</option>
                    <option>Carreras</option>
                </select>

                <select
                    value={form.tipo}
                    onChange={e => setForm({ ...form, tipo: e.target.value })}
                >
                    <option value="normal">Normal</option>
                    <option value="destacado">Destacado</option>
                </select>

                <input
                    placeholder="URL de imagen"
                    value={form.imagen}
                    onChange={e => setForm({ ...form, imagen: e.target.value })}
                />

                <input
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={e => setForm({ ...form, descripcion: e.target.value })}
                />

                <button onClick={saveGame}>
                    {editingId ? "Guardar cambios" : "Crear juego"}
                </button>

                {editingId && (
                    <button className="danger" onClick={resetForm}>
                        Cancelar edición
                    </button>
                )}
            </div>

            <table className="adminTable">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(g => (
                        <tr key={g.id}>
                            <td>{g.nombre}</td>
                            <td>{g.categoria}</td>
                            <td>{g.tipo}</td>
                            <td>
                                <button onClick={() => editGame(g)}>Editar</button>
                                <button className="danger" onClick={() => deleteGame(g.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
