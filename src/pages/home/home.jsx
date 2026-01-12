import { useEffect, useState } from "react";
import GameCard from "../../components/GameCard";
import "./home.css";

export default function Home() {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const storedGames = JSON.parse(localStorage.getItem("juegos")) || [];
        setGames(storedGames);
    }, []);

    const destacados = games.filter(g => g.tipo === "destacado");

    const categorias = ["Acción", "Supervivencia", "Terror", "Carreras"];

    const gamesByCategory = (cat) =>
        games.filter(
            g =>
                g.tipo === "normal" &&
                g.categoria === cat &&
                g.nombre.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div className="home">

            {/* HEADER */}
            <header className="homeHeader">
                <div className="container headerContent">
                    <div className="logoPlaceholder">
                        <img
                            src="/logpngeg.png"
                            alt="EvilGame"
                            className="logoImg"
                        />
                        <span className="logoText">
                            EVIL<span>GAME</span>
                        </span>
                    </div>
                </div>
            </header>

            {/* DESTACADOS */}
            {destacados.length > 0 && (
                <section className="container py-4">
                    <h2 className="sectionTitle">Destacados</h2>

                    <div
                        id="carouselDestacados"
                        className="carousel slide"
                        data-bs-ride="carousel"
                        data-bs-interval="3000"
                        data-bs-wrap="true"
                    >
                        <div className="carousel-inner">
                            {destacados.map((game, index) => (
                                <div
                                    key={game.id}
                                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                                >
                                    <div className="carouselImageWrapper">
                                        <img
                                            src={game.imagen}
                                            className="d-block w-100"
                                            alt={game.nombre}
                                        />
                                        <div className="carouselCaption">
                                            <h3>{game.nombre}</h3>
                                            <p>{game.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* FLECHA IZQ */}
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselDestacados"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" />
                        </button>

                        {/* FLECHA DER */}
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselDestacados"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" />
                        </button>
                    </div>
                </section>
            )}

            {/* CATÁLOGO */}
            <section className="container py-5">
                <h2 className="sectionTitle">Catálogo de Juegos</h2>

                <div className="mb-4">
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="Buscar juegos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="row g-4">
                    {categorias.map((cat) => (
                        <div key={cat} className="col-12 col-md-6 col-lg-3">
                            <h4 className="categoryTitle">{cat}</h4>

                            {gamesByCategory(cat).length === 0 ? (
                                <p className="emptyCategory">No hay juegos</p>
                            ) : (
                                gamesByCategory(cat).map(game => (
                                    <GameCard key={game.id} game={game} />
                                ))
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
