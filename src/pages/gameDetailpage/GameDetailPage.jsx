import { useParams } from "react-router-dom";
import GameDetail from "../../components/GameDetail/GameDetails";
import juegos from "../../data/juegos";

const slugify = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
};

export default function GameDetailPage() {
  const { slug } = useParams();

  // Buscamos el juego comparando los slugs
  const juego = juegos.find((j) => slugify(j.nombre) === slug);

  // Debug para ver si llega la info
  console.log("Datos recibidos en GameDetail:", juego);

  // Si no encuentra el juego, mostramos error
  if (!juego) {
    return (
      <div style={{ padding: "40px", color: "#fff", textAlign: "center" }}>
        <h2>Juego no encontrado</h2>
      </div>
    );
  }

  // Renderizamos el componente con todo el diseño
  return <GameDetail juego={juego} />;
}
