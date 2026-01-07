import "./nosotros.css";
import "./member-card.css";
import MemberCard from "./member-card";
import A from "../../assets/Agustin-Imagen.png"
import Nico from "../../assets/Nico-Imagen.png"
import Gonzalo from "../../assets/Gonzalo-Imagen2.png"
import Ezequiel from "../../assets/Ezequiel-Imagen.jpg"

function Nosotros() {
  return (
    <section className="nosotros d-flex flex-column mb-">
      <h1 className="titulo-equipo">Nuestro Equipo</h1>

      <div className="team-container">
        <MemberCard 
          nombre = "Ezequiel"
          imagen = {Ezequiel}
        />
        <MemberCard 
          nombre = "Gonzalo"
          imagen = {Gonzalo}
        />
        <MemberCard 
          nombre = "Nico"
          imagen = {Nico}
        />
        <MemberCard 
          nombre = "Agustin"
          imagen = {A}
        />
      </div>
      <p>Somos un equipo apasionado por los videojuegos.
Trabajamos para ofrecerte los mejores títulos y experiencias, desde clásicos hasta los últimos lanzamientos.</p>
    </section>
  )
}

export default Nosotros
