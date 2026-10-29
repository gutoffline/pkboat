const base = [
    "barco-preto-zoom", "lateral-barco", "mulher", "interna-geral", "frente-barco",
    "velocimetro", "textura-bancos", "copos", "pessoas", "cachoeira", "motor"
];

const items = [
    ...base.map(n => ({ type: "image", src: `images/${n}.avif`, thumb: `images/${n}.avif` })),
    ...Array.from({ length: 20 }, (_, i) => {
        const n = String(i + 1).padStart(2, "0");
        return { type: "image", src: `images/evento-${n}.avif`, thumb: `images/evento-${n}.avif` };
    }),
    ...Array.from({ length: 5 }, (_, i) => {
        const n = String(i + 1).padStart(2, "0");
        return { type: "video", src: `videos/evento-${n}.mp4`, thumb: `images/evento-video-${n}.avif` };
    })
];

const frame = document.getElementById("frame");
const track = document.getElementById("track");
const bgs = [document.getElementById("bgA"), document.getElementById("bgB")];
const bar = document.getElementById("bar");
const SLIDE_MS = 8000;
let current = 0;
let timer;
let bgIdx = 0;
let busy = false;

const pad = n => String(n).padStart(2, "0");
document.getElementById("total").textContent = pad(items.length);

items.forEach((it, i) => {
    const d = document.createElement("div");
    d.className = "thumb" + (it.type === "video" ? " video" : "");
    d.innerHTML = `<img src="${it.thumb}" alt="Miniatura ${i + 1}" loading="lazy">`;
    d.onclick = () => go(i);
    track.appendChild(d);
});

function centerThumb() {
    const active = track.children[current];
    if (active) {
        const left = active.offsetLeft - (track.clientWidth / 2) + (active.clientWidth / 2);
        track.scrollTo({ left: left, behavior: "smooth" });
    }
}

function render(it) {
    frame.innerHTML = "";
    if (it.type === "video") {
        const poster = document.createElement("img");
        poster.src = it.thumb;
        poster.alt = "Vídeo";
        const play = document.createElement("button");
        play.className = "play";
        play.setAttribute("aria-label", "Reproduzir vídeo");
        play.textContent = "▶";
        play.onclick = () => {
            clearTimeout(timer);
            bar.className = "";
            const v = document.createElement("video");
            v.src = it.src;
            v.poster = it.thumb;
            v.controls = true;
            v.autoplay = true;
            v.playsInline = true;
            v.onended = () => { next(); };
            frame.innerHTML = "";
            frame.appendChild(v);
        };
        frame.append(poster, play);
    } else {
        const img = document.createElement("img");
        img.src = it.src;
        img.alt = "Galeria " + (current + 1);
        frame.appendChild(img);
    }
}

function setBg(src) {
    const nextBg = bgs[1 - bgIdx];
    nextBg.style.backgroundImage = `url("${src}")`;
    nextBg.classList.add("on");
    bgs[bgIdx].classList.remove("on");
    bgIdx = 1 - bgIdx;
}

function update(first) {
    const it = items[current];
    document.getElementById("cur").textContent = pad(current + 1);
    [...track.children].forEach((el, i) => el.classList.toggle("active", i === current));
    centerThumb();
    setBg(it.thumb);
    if (first) { render(it); return; }
    busy = true;
    frame.classList.add("out");
    setTimeout(() => {
        render(it);
        frame.classList.remove("out");
        busy = false;
    }, 450);
}

function go(i) {
    if (busy || i === current) return;
    current = i;
    update();
    restart();
}

function next() { go((current + 1) % items.length); }
function prev() { go((current - 1 + items.length) % items.length); }

function restart() {
    clearTimeout(timer);
    bar.className = "";
    if (items[current].type === "video") return;
    void bar.offsetWidth;
    bar.className = "run";
    timer = setTimeout(next, SLIDE_MS);
}

document.querySelector(".next").onclick = next;
document.querySelector(".prev").onclick = prev;

let touchX = null;
const stage = document.getElementById("stage");
stage.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
stage.addEventListener("touchend", e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
});

update(true);
restart();


// Efeito Cinemático de rolagem (Scroll Reveal)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Dispara a animação quando 15% do elemento aparece
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adiciona a classe que faz o elemento aparecer
            entry.target.classList.add('active');
            
            // Deixa de observar após animar a primeira vez (evita repetições)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Seleciona todos os elementos com a classe .reveal e inicia a observação
document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});