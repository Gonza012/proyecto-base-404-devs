import "./GameCard.css";

export default function GameCard({ game }) {
    if (!game) return null;

    return (
        <article className="gameCard">
            <div className="gameImage">
                {game.imagen ? (
                    <img src={game.imagen} alt={game.nombre} />
                ) : (
                    <div className="noImage">Sin imagen</div>
                )}
            </div>

            <div className="gameInfo">
                <span className="category">{game.categoria}</span>
                <h3 className="title">{game.nombre}</h3>
                <p className="description">{game.descripcion}</p>
            </div>
        </article>
    );
}

