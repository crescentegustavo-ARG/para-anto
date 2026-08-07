// =========================
// FONDO DE ESTRELLAS
// =========================
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let estrellas = [];
for (let i = 0; i < 300; i++) {
    estrellas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        o: Math.random(),
        velTitilar: (Math.random() * 0.015) + 0.005,
        dir: Math.random() < 0.5 ? 1 : -1
    });
}

// =========================
// ESTRELLAS FUGACES
// =========================
let fugaces = [];

function crearFugaz() {
    const empiezaArriba = Math.random() < 0.5;
    const x = empiezaArriba ? Math.random() * canvas.width : 0;
    const y = empiezaArriba ? 0 : Math.random() * canvas.height * 0.5;

    fugaces.push({
        x: x,
        y: y,
        vx: 6 + Math.random() * 4,
        vy: 3 + Math.random() * 3,
        vida: 1
    });
}

function programarProximaFugaz() {
    const espera = 4000 + Math.random() * 9000; // entre 4 y 13 segundos
    setTimeout(() => {
        crearFugaz();
        programarProximaFugaz();
    }, espera);
}
programarProximaFugaz();

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // estrellas de fondo, titilando suavemente
    estrellas.forEach(e => {
        e.o += e.velTitilar * e.dir;
        if (e.o >= 1) { e.o = 1; e.dir = -1; }
        if (e.o <= 0.1) { e.o = 0.1; e.dir = 1; }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + e.o + ")";
        ctx.fill();
    });

    // estrellas fugaces
    fugaces.forEach(f => {
        const gradiente = ctx.createLinearGradient(
            f.x, f.y,
            f.x - f.vx * 8, f.y - f.vy * 8
        );
        gradiente.addColorStop(0, "rgba(255,255,255," + f.vida + ")");
        gradiente.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = gradiente;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(f.x - f.vx * 8, f.y - f.vy * 8);
        ctx.stroke();

        f.x += f.vx;
        f.y += f.vy;
        f.vida -= 0.012;
    });

    fugaces = fugaces.filter(f => f.vida > 0 && f.x < canvas.width + 50 && f.y < canvas.height + 50);

    requestAnimationFrame(dibujar);
}
dibujar();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// =========================
// BOTON "COMENZAR NUESTRO VIAJE"
// =========================
const btnComenzar = document.getElementById("btnComenzar");
if (btnComenzar) {
    btnComenzar.addEventListener("click", () => {
        const primeraEscena = document.querySelector(".scene");
        if (primeraEscena) {
            primeraEscena.scrollIntoView({ behavior: "smooth" });
        }
        const musica = document.getElementById("musica");
        if (musica) {
            musica.volume = 0.5;
            musica.play();
        }
    });
}

// =========================
// APARICION SUAVE DE CADA ESCENA AL HACER SCROLL
// =========================
const escenas = document.querySelectorAll(".scene");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.25 });

escenas.forEach(escena => observer.observe(escena));

const btnMusica = document.getElementById("btnMusica");
const musicaEl = document.getElementById("musica");

if (btnMusica && musicaEl) {
    btnMusica.addEventListener("click", () => {
        if (musicaEl.paused) {
            musicaEl.play();
            btnMusica.classList.remove("pausado");
        } else {
            musicaEl.pause();
            btnMusica.classList.add("pausado");
        }
    });
}