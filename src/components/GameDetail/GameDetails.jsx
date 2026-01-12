import React, { useState, useEffect } from "react";
import { Badge, Form, Button } from "react-bootstrap";
import styles from "./GameDetails.module.css";
import logoEvil from "../../assets/img/lgopngegnegro.png";

function GameDetail({ juego }) {
  const galeria = [juego.trailer, juego.banner, ...juego.imagenes].filter(
    Boolean
  );
  const [mediaActual, setMediaActual] = useState(galeria[0]);

  const [comentarios, setComentarios] = useState(juego.comentarios || []);
  const [resenas, setResenas] = useState(juego.resenas);

  const [nuevoTexto, setNuevoTexto] = useState("");
  const [nuevoVoto, setNuevoVoto] = useState("positivo");

  const [enDeseados, setEnDeseados] = useState(false);

  useEffect(() => {
    setMediaActual(galeria[0]);
    setResenas(juego.resenas);
    setComentarios(juego.comentarios || []);
    setNuevoTexto("");

    const deseadosGuardados =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    const estaGuardado = deseadosGuardados.some((item) => item.id === juego.id);
    setEnDeseados(estaGuardado);
  }, [juego]);

  const handleWishlist = () => {
    let listaDeseados = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (enDeseados) {
      listaDeseados = listaDeseados.filter((item) => item.id !== juego.id);
      setEnDeseados(false);
    } else {
      const juegoParaGuardar = {
        id: juego.id,
        nombre: juego.nombre,
        precio: juego.precio,
        imagen: juego.banner || juego.imagenes[0],
      };
      listaDeseados.push(juegoParaGuardar);
      setEnDeseados(true);
    }
    localStorage.setItem("wishlist", JSON.stringify(listaDeseados));
  };

  const esVideo = (url) => url && url.includes("youtube.com/embed");

  const handleSubmitResena = (e) => {
    e.preventDefault();
    if (nuevoTexto.trim() === "") return;

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const nombreUsuario = usuarioLogueado
      ? usuarioLogueado.nombre
      : "Invitado Anónimo";

    const nuevaResenaObj = {
      usuario: nombreUsuario,
      texto: nuevoTexto,
      fecha: new Date().toLocaleDateString(),
      voto: nuevoVoto,
    };
    setComentarios([nuevaResenaObj, ...comentarios]);

    const nuevosContadores = { ...resenas };
    if (nuevoVoto === "positivo") nuevosContadores.positivas++;
    else nuevosContadores.negativas++;
    setResenas(nuevosContadores);

    const listaJuegosLS = JSON.parse(localStorage.getItem("juegos")) || [];

    const indiceJuego = listaJuegosLS.findIndex((g) => g.id === juego.id);

    if (indiceJuego !== -1) {
      const juegoEnLS = listaJuegosLS[indiceJuego];
      if (!juegoEnLS.comentarios) juegoEnLS.comentarios = [];

      juegoEnLS.comentarios.unshift(nuevaResenaObj);
      juegoEnLS.resenas = nuevosContadores;

      listaJuegosLS[indiceJuego] = juegoEnLS;
    } else {
      const nuevoJuegoGuardado = {
        ...juego,
        comentarios: [nuevaResenaObj, ...(juego.comentarios || [])],
        resenas: nuevosContadores,
      };
      listaJuegosLS.push(nuevoJuegoGuardado);
    }

    localStorage.setItem("juegos", JSON.stringify(listaJuegosLS));

    setNuevoTexto("");
    alert("¡Tu reseña ha sido guardada!");
  };

  const totalVotos = resenas.positivas + resenas.negativas;
  const promedio = totalVotos === 0 ? 0 : (resenas.positivas / totalVotos) * 5;
  const porcentajePositivo =
    totalVotos === 0 ? 0 : Math.round((resenas.positivas / totalVotos) * 100);

  return (
    <div className={styles.epicPage}>
      <div className={styles.mainContainer}>
        <div className="d-flex align-items-center gap-3 mb-2">
          <img
            src={logoEvil}
            alt="Evil Games"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid #fff",
              objectFit: "cover",
            }}
          />
          <span
            style={{
              color: "#ccc",
              fontWeight: "bold",
              letterSpacing: "1px",
              fontSize: "0.9rem",
            }}
          >
            EVIL GAMES
          </span>
        </div>

        <div className="mb-4">
          <h1 className={styles.gameTitle}>{juego.nombre}</h1>
          <div className="d-flex align-items-center gap-3">
            <div className={styles.ratingBox}>⭐ {promedio.toFixed(1)}</div>
            <div className={styles.sentimentBox}>
              <span
                style={{
                  color: porcentajePositivo >= 50 ? "#66c0f4" : "#c62828",
                }}
              >
                👍 {porcentajePositivo}% Recomendado
              </span>
            </div>
          </div>
        </div>

        <div className={styles.layoutGrid}>
          {/* COLUMNA IZQUIERDA */}
          <div className={styles.leftColumn}>
            <div className={styles.mainMediaFrame}>
              {esVideo(mediaActual) ? (
                <iframe
                  src={`${mediaActual}?rel=0&showinfo=0&controls=1&autoplay=1&mute=1`}
                  title="Trailer"
                  className={styles.videoPlayer}
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={mediaActual}
                  alt={juego.nombre}
                  className={styles.mainImage}
                />
              )}
            </div>

            {galeria.length > 1 && (
              <div className={styles.thumbnailRow}>
                {galeria.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles.thumbWrapper} ${
                      mediaActual === item ? styles.activeThumb : ""
                    }`}
                    onClick={() => setMediaActual(item)}
                  >
                    {esVideo(item) ? (
                      <div className={styles.videoThumbOverlay}>
                        <span>▶</span>
                      </div>
                    ) : (
                      <img src={item} alt="thumb" className={styles.thumbImg} />
                    )}
                  </div>
                ))}
              </div>
            )}

            <p className={styles.descriptionText}>{juego.descripcion}</p>

            <div className={styles.specsContainer}>
              <h4 className={styles.specSectionTitle}>
                Requisitos del Sistema
              </h4>
              <div className={styles.specsGrid}>
                <div className={styles.specBox}>
                  <span className={styles.specBoxTitle}>MÍNIMOS</span>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>SO</span>
                    <span className={styles.specValue}>
                      {juego.requisitos.minimos.os}
                    </span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>CPU</span>
                    <span className={styles.specValue}>
                      {juego.requisitos.minimos.procesador}
                    </span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>RAM</span>
                    <span className={styles.specValue}>
                      {juego.requisitos.minimos.memoria}
                    </span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>GPU</span>
                    <span className={styles.specValue}>
                      {juego.requisitos.minimos.graficos}
                    </span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>ALM</span>
                    <span className={styles.specValue}>
                      {juego.requisitos.minimos.almacenamiento}
                    </span>
                  </div>
                </div>
                <div className={styles.specBox}>
                  <span className={styles.specBoxTitle}>RECOMENDADOS</span>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>SO</span>
                    <span className={styles.specValue}>
                      {juego.requisitos.recomendados.os}
                    </span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>CPU</span>
                    <span className={styles.specValue}>
                      {juego.requisitos.recomendados.procesador}
                    </span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>RAM</span>
                    <span className={styles.specValue}>
                      {juego.requisitos.recomendados.memoria}
                    </span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>GPU</span>
                    <span className={styles.specValue}>
                      {juego.requisitos.recomendados.graficos}
                    </span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>ALM</span>
                    <span className={styles.specValue}>
                      {juego.requisitos.recomendados.almacenamiento}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.reviewFormCard}>
              <h4 className="text-white mb-3">Escribe tu reseña</h4>
              <Form onSubmit={handleSubmitResena}>
                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    className={styles.epicInput}
                    placeholder="¿Qué te pareció el juego? Cuéntanos tu experiencia..."
                    value={nuevoTexto}
                    onChange={(e) => setNuevoTexto(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mobile-column">
                  <div className="d-flex gap-3 mb-3 mb-md-0">
                    <div
                      className={`${styles.radioOption} ${
                        nuevoVoto === "positivo" ? styles.selectedPos : ""
                      }`}
                      onClick={() => setNuevoVoto("positivo")}
                    >
                      👍 Lo recomiendo
                    </div>
                    <div
                      className={`${styles.radioOption} ${
                        nuevoVoto === "negativo" ? styles.selectedNeg : ""
                      }`}
                      onClick={() => setNuevoVoto("negativo")}
                    >
                      👎 No lo recomiendo
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.btnSubmit}
                  >
                    Publicar Reseña
                  </Button>
                </div>
              </Form>
            </div>

            {/* LISTA COMENTARIOS */}
            <div className={styles.reviewsSection}>
              <h4 className={styles.specSectionTitle}>
                Opiniones de la Comunidad ({comentarios.length})
              </h4>
              {comentarios.length > 0 ? (
                <div className={styles.reviewsList}>
                  {comentarios.map((r, i) => (
                    <div key={i} className={styles.reviewCard}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className={styles.reviewUser}>{r.usuario}</span>
                        <span className={styles.reviewDate}>{r.fecha}</span>
                      </div>
                      <div className="mb-2">
                        {r.voto === "positivo" ? (
                          <span className={styles.thumbUp}>👍 Recomendado</span>
                        ) : (
                          <span className={styles.thumbDown}>
                            👎 No recomendado
                          </span>
                        )}
                      </div>
                      <p className={styles.reviewText}>"{r.texto}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">
                  Sé el primero en opinar sobre este juego.
                </p>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className={styles.rightColumn}>
            <div className={styles.sidebar}>
              <div className="mb-2">
                <Badge bg="light" text="dark" className="px-2 py-1 mb-2">
                  JUEGO BASE
                </Badge>
              </div>
              <h2 className={styles.priceTag}>USD {juego.precio}</h2>
              <button className={styles.btnPrimary}>COMPRAR AHORA</button>
              <button className={styles.btnSecondary}>AÑADIR AL CARRITO</button>
              <button
                className={styles.btnWishlist}
                onClick={handleWishlist}
                style={{ color: enDeseados ? "#fff" : "#ccc" }}
              >
                {enDeseados
                  ? "❤️ EN LISTA DE DESEOS"
                  : "➕ A LA LISTA DE DESEOS"}
              </button>
              <div className={styles.metaTable}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Desarrolladora</span>
                  <span className={styles.metaValue}>
                    {juego.desarrollador}
                  </span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Plataforma</span>
                  <span className={styles.metaValue}>Windows</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Categoría</span>
                  <span className={styles.metaValue}>{juego.categoria}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
