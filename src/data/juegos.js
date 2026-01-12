const juegos = [
  {
    id: "GTA5-001",
    nombre: "Grand Theft Auto V",
    precio: 19.99,
    categoria: "Mundo Abierto",
    desarrollador: "Rockstar Games",
    trailer: "https://www.youtube.com/embed/VNbONMSObfs",
    banner:
      "https://wallpapers.com/images/high/cool-gta-5-r4je28wqifoa7boe.webp",
    imagenes: [
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/7f432690bd6365e871a2463a5db9cc4e7ebe1151/ss_7f432690bd6365e871a2463a5db9cc4e7ebe1151.1920x1080.jpg?t=1765479644",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/85ff4a9fad2064c201c00c27d8d28c28fa03c481/ss_85ff4a9fad2064c201c00c27d8d28c28fa03c481.1920x1080.jpg?t=1765479644",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/0231bf16835cd4f6d83523d76aa8d91cb2dfef9b/ss_0231bf16835cd4f6d83523d76aa8d91cb2dfef9b.1920x1080.jpg?t=1765479644",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/8340fd391012e12be7e4c02e65801a2648a6b60e/ss_8340fd391012e12be7e4c02e65801a2648a6b60e.1920x1080.jpg?t=1765479644",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3240220/808b550269f898e227dae2c64b5e026f90da85f9/ss_808b550269f898e227dae2c64b5e026f90da85f9.1920x1080.jpg?t=1765479644",
    ],
    descripcion:
      "Cuando un joven estafador callejero, un ladrón de bancos retirado y un psicópata aterrador se ven involucrados con lo peor y más desquiciado del mundo criminal...",
    requisitos: {
      minimos: {
        os: "Windows 11",
        procesador: "Intel® Core™ i5-9600K | AMD Ryzen™ 5 3600",
        memoria: "8 GB RAM",
        graficos:
          "NVIDIA GeForce® GTX 1630 (4GB VRAM) | AMD Radeon™ RX 6400 (4GB VRAM)",
        almacenamiento: "105 GB disponibles",
      },
      recomendados: {
        os: "Windows 11",
        procesador: " Intel® Core™ i5-9600K | AMD Ryzen™ 5 3600",
        memoria: "16 GB RAM",
        graficos:
          " NVIDIA GeForce® RTX 3060 (8GB VRAM) | AMD Radeon™ RX 6600XT (8GB VRAM)",
        almacenamiento: "105 GB",
      },
    },
    resenas: {
      positivas: 5000,
      negativas: 800,
    },
  },
  {
    id: "RE4-001",
    nombre: "Resident Evil 4 Remake",
    precio: 39.99,
    categoria: "Survival Horror",
    desarrollador: "Capcom",
    trailer: "https://www.youtube.com/embed/j5Xv2lM9wes",
    banner:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/capsule_616x353.jpg?t=1736385712",
    imagenes: [
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/ss_2f026b10ab2facd11820737453512b3b88c5a863.1920x1080.jpg?t=1736385712", // Foto 2
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/ss_82cef99075c8e19ec71d2aae8b0a19815695c5a7.1920x1080.jpg?t=1736385712", // Foto 3 (NUEVA)
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/ss_98d9687b6acf5feff600b483d9f30e52079091e9.1920x1080.jpg?t=1736385712",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/ss_0554b945aafc847d55f780f7968de00aafa968a3.1920x1080.jpg?t=1736385712",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/ss_440756cbcb0231dd325991d38b85d3b60d976b95.1920x1080.jpg?t=1736385712",
    ],
    descripcion:
      "Seis años han pasado desde el desastre biológico en Raccoon City... Sobrevivir es solo el principio. Con una mecánica de juego modernizada, una historia reimaginada y unos gráficos espectacularmente detallados, Resident Evil 4 supone el renacimiento de un gigante del mundo de los videojuegos.",
    requisitos: {
      minimos: {
        os: "Windows 10 (64bit)",
        procesador: "AMD Ryzen 3 1200 / Intel Core i5-7500",
        memoria: "8 GB RAM",
        graficos: "AMD Radeon RX 560 / NVIDIA GeForce GTX 1050 Ti",
        almacenamiento: "60 GB disponibles",
      },
      recomendados: {
        os: "Windows 11 (64bit)",
        procesador: "AMD Ryzen 5 3600 / Intel Core i7 8700",
        memoria: "16 GB RAM",
        graficos: "AMD Radeon RX 5700 / NVIDIA GeForce GTX 1070",
        almacenamiento: "SSD 60 GB",
      },
    },
    resenas: {
      positivas: 1200,
      negativas: 100,
    },
  },
  {
    id: "NFS-001",
    nombre: "Need for Speed™ Heat",
    precio: 69.99,
    categoria: "Carreras",
    desarrollador: "Ghost Games",
    trailer: "https://www.youtube.com/embed/9ewiJJe_nYI",
    banner:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222680/page_bg_raw.jpg?t=1716831270",
    imagenes: [
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222680/ss_4127c58a6a10124b4ba28375ec937a977aba37fc.1920x1080.jpg?t=1716831270", // Foto 2
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222680/ss_6994870577a41882c458cd00d852d8092116c81c.1920x1080.jpg?t=1716831270", // Foto 3 (NUEVA)
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222680/ss_1f752c037d7cbab2e1658f36d5c76d11e91e4fec.1920x1080.jpg?t=1716831270",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222680/ss_4e3387eb370a80ca7c1e80309baa9d812a6caa8a.1920x1080.jpg?t=1716831270",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222680/ss_720840b2cb26c38d0e4ad32085afb5f46b2bb6c6.1920x1080.jpg?t=1716831270",
    ],
    descripcion:
      "Apúrate de día y arriésgalo todo de noche en Need for Speed™ Heat, un juego de carreras callejeras dinámico, donde las líneas de la ley se desvanecen a medida que se pone sol..",
    requisitos: {
      minimos: {
        os: "Windows 10 (64bit)",
        procesador: "FX-6350 or Equivalent; Core i5-3570 or Equivalent",
        memoria: "8 GB RAM",
        graficos:
          "AMD: Radeon 7970/Radeon R9 280x or Equivalent; NVIDIA: GeForce GTX 760 or Equivalent",
        almacenamiento: "50 GB disponibles",
      },
      recomendados: {
        os: "Windows 10",
        procesador: "Ryzen 3 1300X or Equivalent; Core i7-4790 or Equivalent",
        memoria: "16 GB RAM",
        graficos:
          "AMD: Radeon RX 480 or Equivalent; NVIDIA: GeForce GTX 1060 or Equivalent",
        almacenamiento: "SSD 50 GB",
      },
    },
    resenas: {
      positivas: 1200,
      negativas: 100,
    },
  },
  {
    id: "MNC-001",
    nombre: "Minecraft: Java & Bedrock Edition for PC",
    precio: 30.0,
    categoria: "Carreras",
    desarrollador: "Microsoft Studios",
    trailer: "https://www.youtube.com/embed/79RwQe6EN_4",
    banner:
      "https://w0.peakpx.com/wallpaper/105/594/HD-wallpaper-video-game-minecraft.jpg",
    imagenes: [
      "https://imgs.search.brave.com/tjmMia-wVFmB22kHmk4xqDtlUolrnsCUeg3S5_9fwiI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvem9t/Ymllcy1taW5lY3Jh/ZnQtaGQtZjlkbXV6/dDd5bW1zbnN1ei5q/cGc", // Foto 2
      "https://w0.peakpx.com/wallpaper/719/342/HD-wallpaper-minecraft-animated-knight-steve-minecraft-animation.jpg", // Foto 3 (NUEVA)
      "https://w0.peakpx.com/wallpaper/80/609/HD-wallpaper-minecraft-game-render-minecraft.jpg",
      "https://w0.peakpx.com/wallpaper/36/896/HD-wallpaper-sun-above-sea-minecraft.jpg",
    ],
    descripcion:
      "Jugar a este juego desde el 2009 siendo un niño, aprender a meter mods, volverse a pasar el juego, jugar técnico,rabar videos que solo quedan en tu mente, jugar con amigos, disfrutar, ser feliz, hoy por fin uno ya es grande, y tal vez, puede permitirse el lujo de decir, hoy me comprare minecraft. Hoy ese niño, que lleno la computadora de virus Hoy ese niño cumplió un sueño",
    requisitos: {
      minimos: {
        os: "Windows 10 (64bit)",
        procesador: "FX-6350 or Equivalent; Core i5-3570 or Equivalent",
        memoria: "8 GB RAM",
        graficos:
          "AMD: Radeon 7970/Radeon R9 280x or Equivalent; NVIDIA: GeForce GTX 760 or Equivalent",
        almacenamiento: "10 GB disponibles",
      },
      recomendados: {
        os: "Windows 10",
        procesador: "Ryzen 3 1300X or Equivalent; Core i7-4790 or Equivalent",
        memoria: "16 GB RAM",
        graficos:
          "AMD: Radeon RX 480 or Equivalent; NVIDIA: GeForce GTX 1060 or Equivalent",
        almacenamiento: "10 GB",
      },
    },
    resenas: {
      positivas: 1200,
      negativas: 100,
    },
  },
];

export default juegos;
