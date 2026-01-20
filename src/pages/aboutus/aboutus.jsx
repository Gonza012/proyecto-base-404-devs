import "./aboutUs.css";
import MemberCard from "./member-card";
import A from "../../assets/Agustin-Imagen.png";
import Nico from "../../assets/Nico-Imagen.png";
import Gonzalo from "../../assets/Gonzalo-Imagen2.png";
import Ezequiel from "../../assets/Ezequiel-Imagen.jpg";

function Nosotros() {
  return (
    <section className="nosotros-section">
      <h1 className="titulo-equipo">Nuestro Equipo</h1>

      <div className="team-container">
        <MemberCard nombre="Ezequiel" rol="Dev Fullstack" imagen={Ezequiel} />
        <MemberCard nombre="Gonzalo" rol="Frontend Dev" imagen={Gonzalo} />
        <MemberCard nombre="Nico" rol="Backend Dev" imagen={Nico} />
        <MemberCard nombre="Agustin" rol="UI/UX Designer" imagen={A} />
      </div>

      <p className="texto-descripcion">
        Somos un equipo apasionado por los videojuegos. Trabajamos día a día
        para ofrecerte los mejores títulos y experiencias, desde los grandes
        clásicos hasta los últimos lanzamientos del mercado.
      </p>
    </section>
  );
}

export default Nosotros;
