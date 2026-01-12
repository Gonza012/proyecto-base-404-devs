import { useParams } from "react-router-dom";
import GameDetail from "../../components/GameDetail/GameDetails";
import juegosData from "../../data/juegos";

function GameDetailPage() {
  const { id } = useParams();

  const juegosGuardados = JSON.parse(localStorage.getItem("juegos")) || [];
  let juego = juegosGuardados.find((j) => j.id === id);

  if (!juego) {
    juego = juegosData.find((j) => j.id === id);
  }

  if (!juego) {
    return (
      <div className="text-white text-center mt-5">Juego no encontrado</div>
    );
  }

  return <GameDetail juego={juego} />;
}

export default GameDetailPage;
