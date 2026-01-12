export default function GameCard({ game }) {
    if (!game) return null;

    return (
        <article style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "12px",
            overflow: "hidden"
        }}>
            {game.imagen && (
                <img
                    src={game.imagen}
                    alt={game.nombre}
                    style={{
                        width: "100%",
                        aspectRatio: "2 / 3",
                        objectFit: "cover"
                    }}
                />
            )}

            <div style={{ padding: "12px" }}>
                <small style={{ color: "#8c1f28" }}>{game.categoria}</small>
                <h3 style={{ fontSize: "1rem", margin: "6px 0" }}>
                    {game.nombre}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#aaa" }}>
                    {game.descripcion}
                </p>
            </div>
        </article>
    );
}
