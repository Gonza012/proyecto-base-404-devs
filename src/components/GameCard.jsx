import { useNavigate } from "react-router-dom";
import "./gameCard.css";

export default function GameCard({ game }) {
  const navigate = useNavigate();

  if (!game) return null;

  const handleClick = () => {
    navigate("*"); // va al Error404
  };

  return (
    <article className="gameCard" onClick={handleClick}>
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
