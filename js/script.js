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
        o: Math.random()
    });
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    estrellas.forEach(e => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + e.o + ")";
        ctx.fill();
    });
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
