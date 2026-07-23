const images = [
    "images/barco-preto-zoom.avif",
    "images/lateral-barco.avif",
    "images/mulher.avif",
    "images/interna-geral.avif",
    "images/barco-vermelho-agua.avif",
    "images/frente-barco.avif",
    "images/velocimetro.avif",
    "images/textura-bancos.avif",
    "images/copos.avif",
    "images/pessoas.avif",
    "images/cachoeira.avif",
    "images/motor.avif"
];

const main = document.getElementById("mainImg");
const track = document.getElementById("track");
let current = 0;
let timer;

images.forEach((src, i) => {
    const d = document.createElement("div");
    d.className = "thumb";
    d.innerHTML = `<img src="${src}" alt="Miniatura ${i}">`;
    d.onclick = () => {
        current = i;
        update();
        restart();
    };
    track.appendChild(d);
});

function centerThumb() {
    const active = track.children[current];
    if(active) {
        const left = active.offsetLeft - (track.clientWidth / 2) + (active.clientWidth / 2);
        track.scrollTo({ left: left, behavior: "smooth" });
    }
}

function update() {
    main.src = images[current];
    [...track.children].forEach((el, i) => el.classList.toggle("active", i === current));
    centerThumb();
}

function next() {
    current = (current + 1) % images.length;
    update();
}

function prev() {
    current = (current - 1 + images.length) % images.length;
    update();
}

function restart() {
    clearInterval(timer);
    timer = setInterval(next, 8000);
}

document.querySelector(".next").onclick = () => { next(); restart(); };
document.querySelector(".prev").onclick = () => { prev(); restart(); };

update();
restart();
