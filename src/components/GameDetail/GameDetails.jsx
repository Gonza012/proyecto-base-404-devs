import React, { useState, useEffect } from "react";
import { Badge, Form, Button, Alert } from "react-bootstrap";
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
  const [usuarioActual, setUsuarioActual] = useState(null);

  const [alerta, setAlerta] = useState({
    show: false,
    msg: "",
    variant: "success",
  });

  const mostrarNotificacion = (msg, variant = "success") => {
    setAlerta({ show: true, msg, variant });
    setTimeout(() => {
      setAlerta({ show: false, msg: "", variant: "success" });
    }, 3000);
  };

  useEffect(() => {
    setMediaActual(galeria[0]);
    setNuevoTexto("");
    setAlerta({ show: false, msg: "", variant: "success" });

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUsuarioActual(currentUser);

    const listaJuegosLS = JSON.parse(localStorage.getItem("juegos")) || [];
    const juegoGuardado = listaJuegosLS.find((g) => g.id === juego.id);

    if (juegoGuardado) {
      setResenas(juegoGuardado.resenas);
      setComentarios(juegoGuardado.comentarios || []);
    } else {
      setResenas(juego.resenas);
      setComentarios(juego.comentarios || []);
    }

    // 3. Wishlist Check
    if (currentUser && currentUser.wishlist) {
      const estaGuardado = currentUser.wishlist.some((id) => id === juego.id);
      setEnDeseados(estaGuardado);
    } else {
      setEnDeseados(false);
    }
  }, [juego]);

  const yaComento = usuarioActual
    ? comentarios.some((c) => c.usuario === usuarioActual.username)
    : false;

  const handleWishlist = () => {
    if (!usuarioActual) {
      mostrarNotificacion(
        "🔒 Debes iniciar sesión para guardar favoritos",
        "danger"
      );
      return;
    }

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userWishlist = currentUser.wishlist || [];

    if (enDeseados) {
      userWishlist = userWishlist.filter((id) => id !== juego.id);
      setEnDeseados(false);
      mostrarNotificacion("💔 Eliminado de favoritos", "warning");
    } else {
      userWishlist.push(juego.id);
      setEnDeseados(true);
      mostrarNotificacion("❤️ ¡Agregado a favoritos!", "success");
    }

    currentUser.wishlist = userWishlist;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    setUsuarioActual(currentUser); // Actualizamos estado local

    const usersDB = JSON.parse(localStorage.getItem("usersDB")) || [];
    const usersActualizados = usersDB.map((user) => {
      if (user.username === currentUser.username) {
        return currentUser;
      }
      return user;
    });

    localStorage.setItem("usersDB", JSON.stringify(usersActualizados));
  };

  const esVideo = (url) => url && url.includes("youtube.com/embed");

  const handleBorrarResena = (resenaAEliminar) => {
    const nuevosComentarios = comentarios.filter(
      (c) => c.usuario !== resenaAEliminar.usuario
    );
    const nuevosContadores = { ...resenas };
    if (resenaAEliminar.voto === "positivo") nuevosContadores.positivas--;
    else nuevosContadores.negativas--;
    setComentarios(nuevosComentarios);
    setResenas(nuevosContadores);

    const listaJuegosLS = JSON.parse(localStorage.getItem("juegos")) || [];
    const indiceJuego = listaJuegosLS.findIndex((g) => g.id === juego.id);

    if (indiceJuego !== -1) {
      listaJuegosLS[indiceJuego].comentarios = nuevosComentarios;
      listaJuegosLS[indiceJuego].resenas = nuevosContadores;
      localStorage.setItem("juegos", JSON.stringify(listaJuegosLS));
      mostrarNotificacion("🗑️ Reseña eliminada correctamente", "warning");
    }
  };

  const handleSubmitResena = (e) => {
    e.preventDefault();
    if (nuevoTexto.trim() === "") return;

    if (yaComento) {
      mostrarNotificacion(
        "⚠️ Ya has publicado una reseña para este juego.",
        "danger"
      );
      return;
    }

    const nombreUsuario = usuarioActual ? usuarioActual.username : "Invitado";

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
      listaJuegosLS[indiceJuego].comentarios = [
        nuevaResenaObj,
        ...(listaJuegosLS[indiceJuego].comentarios || []),
      ];
      listaJuegosLS[indiceJuego].resenas = nuevosContadores;
    } else {
      const juegoNuevoParaGuardar = {
        ...juego,
        comentarios: [nuevaResenaObj, ...(juego.comentarios || [])],
        resenas: nuevosContadores,
      };
      listaJuegosLS.push(juegoNuevoParaGuardar);
    }

    localStorage.setItem("juegos", JSON.stringify(listaJuegosLS));

    setNuevoTexto("");
    mostrarNotificacion(
      "✅ ¡Tu reseña ha sido publicada con éxito!",
      "success"
    );
  };

  const totalVotos = resenas.positivas + resenas.negativas;
  const promedio = totalVotos === 0 ? 0 : (resenas.positivas / totalVotos) * 5;
  const porcentajePositivo =
    totalVotos === 0 ? 0 : Math.round((resenas.positivas / totalVotos) * 100);

  return (
    <div className={styles.epicPage}>
      <div className={styles.mainContainer}>
        {alerta.show && (
          <div
            style={{
              position: "fixed",
              top: "80px",
              right: "20px",
              zIndex: 9999,
              minWidth: "300px",
            }}
          >
            <Alert
              variant={alerta.variant}
              onClose={() => setAlerta({ ...alerta, show: false })}
              dismissible
            >
              <div style={{ fontWeight: "bold" }}>{alerta.msg}</div>
            </Alert>
          </div>
        )}

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
                {/* Specs Box Minimos */}
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
              {!usuarioActual ? (
                <Alert variant="warning">
                  {" "}
                  Debes iniciar sesión para escribir una reseña.
                </Alert>
              ) : yaComento ? (
                <Alert variant="info">
                  ✅ <strong>¡Gracias!</strong> Ya has compartido tu opinión
                  sobre este juego.
                </Alert>
              ) : (
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
              )}
            </div>

            <div className={styles.reviewsSection}>
              <h4 className={styles.specSectionTitle}>
                Opiniones de la Comunidad ({comentarios.length})
              </h4>
              {comentarios.length > 0 ? (
                <div className={styles.reviewsList}>
                  {comentarios.map((r, i) => (
                    <div key={i} className={styles.reviewCard}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <span className={styles.reviewUser}>{r.usuario}</span>
                          <span className="mx-2 text-muted">|</span>
                          <span className={styles.reviewDate}>{r.fecha}</span>
                        </div>
                        {usuarioActual &&
                          usuarioActual.username === r.usuario && (
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleBorrarResena(r)}
                              title="Eliminar mi reseña"
                              type="button"
                            >
                              🗑️
                            </button>
                          )}
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
