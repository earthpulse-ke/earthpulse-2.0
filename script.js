const navbar = document.querySelector("nav");
const logoName = document.querySelector(".name");
const logoImage = document.querySelector(".logo-img");
const footer = document.getElementById("footer");

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add("effects");
        logoName.classList.add("hidden");
        // logoImage.classList.add("small");
    } else {
        navbar.classList.remove("effects");
        logoName.classList.remove("hidden");
        // logoImage.classList.remove("small")
    }
});

const people = [
    { name: "Fadeel Notta", role: "CEO" },
    { name: "Michael Jabali", role: "Communications" },
    { name: "Sarhan Dib", role: "Communications" },
    { name: "Ammaarah Natha", role: "Communications" },
    { name: "Avi Dharani", role: "Logistics" },
    { name: "Abhinav Borthakur", role: "Logistics" },
    { name: "Samina Bakhtalieva", role: "Session Planning" },
    { name: "Rihanna Gajiyani", role: "Session Planning" },
    { name: "Harvi Vekariya", role: "Marketing" },
    { name: "Aarav Shah", role: "Marketing" },
    { name: "Deeta Ladwa", role: "Marketing" },
    { name: "Abizaid Shingira", role: "Marketing" },
    { name: "Ayan Rahemani", role: "Technology" },
    { name: "Aydan Jamal", role: "Technology" },
    { name: "Mehran Kamani", role: "Finance" },
    { name: "Samier Hamdi", role: "Finance" },
    { name: "Aiman Shamshudin", role: "Finance" },
    { name: "Aayan Natha", role: "Design and Engineering" },
    { name: "Anahita Sindhwani", role: "Design and Engineering" },
    { name: "Parviz Sohibnazarov", role: "Design and Engineering" }
];

const cards = document.querySelectorAll(".card");
const groups = document.querySelectorAll(".card-group");
const cardImg = document.querySelectorAll(".card-img");

const name = document.getElementById("name");
const role = document.getElementById("role");

const leftBtn = document.getElementById("arrow-left");
const rightBtn = document.getElementById("arrow-right");

let currentIndex = 0;
let currentGroup = 0;

function updateActiveCard() {
    // cards.forEach(card => {
    //     card.classList.remove("active");
    // });

    cardImg.forEach(image => {
        image.classList.remove("img-active");
    });

    // const activeCard = cards[currentIndex];
    const activeImg = cardImg[currentIndex];
    // activeCard.classList.add("active");
    activeImg.classList.add("img-active");

    name.textContent = people[currentIndex].name;
    role.textContent = people[currentIndex].role;
}

const track = document.querySelector(".track");

function getCardWidth() {
    return window.innerWidth <= 480 ? 140 : 180;
}

const cardWidth = getCardWidth();
let isScrolling = false;

rightBtn.addEventListener("click", () => {
    if (isScrolling) return;
    if (currentIndex === people.length - 1) return;

    currentIndex++;

    track.scrollLeft += cardWidth;

    if (window.innerWidth > 480 && currentIndex % 5 === 0) {
        const groupWidth = cardWidth * 5;
        track.scrollLeft = groupWidth * (currentIndex / 5);
    }

    if (window.innerWidth <= 480) {
        const groupWidth = cardWidth * 1;
        track.scrollLeft = groupWidth * currentIndex;
    }

    if (currentIndex >= people.length) {
        currentIndex = 0;
        track.scrollLeft = 0;
    }

    updateActiveCard();

    setTimeout(() => {
        isScrolling = false;
    }, 300);
});

leftBtn.addEventListener("click", () => {
    if (isScrolling) return;
    if (currentIndex === 0) return;

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = people.length - 1;
    }

    track.scrollLeft -= cardWidth;

    // Every time we go BACK into a previous group
    if (window.innerWidth > 480 && (currentIndex + 1) % 5 === 0) {
        const groupWidth = cardWidth * 5;
        track.scrollLeft = groupWidth * Math.floor(currentIndex / 5);
    }

    if (window.innerWidth <= 480 && (currentIndex + 1) % 2 === 0) {
        const groupWidth = cardWidth * 2;
        track.scrollLeft = groupWidth * (currentIndex / 2)
    }

    updateActiveCard();

    setTimeout(() => {
        isScrolling = false;
    }, 300);
});

cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        currentIndex = index;
        currentGroup = Math.floor(index / 5);
        updateActiveCard();
    });
});

updateActiveCard();


const trackBox = document.querySelector('.track');

// Prevent mouse wheel horizontal scrolling
if (window.innerWidth > 480) {
    trackBox.addEventListener('wheel', (e) => {
    if (e.deltaX !== 0) e.preventDefault();
    }, { passive: false });

    // Prevent arrow key scrolling (Left: 37, Right: 39)
    window.addEventListener('keydown', (e) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
        e.preventDefault();
    }
    });
}

const container = document.querySelector(".box");
const svg = container.querySelector(".trail-svg");
const c_svg = container.querySelector(".connections-svg")

let points = [];
let lastMoveTime = 0;

// mouse move
container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    points.push({ x, y });

    if (points.length > 20) points.shift();

    lastMoveTime = Date.now();
});

// draw
function draw() {
    svg.innerHTML = "";

    if (points.length < 2) return;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i].x} ${points[i].y}`;
    }

    path.setAttribute("d", d);
    path.setAttribute("class", "trail-path");

    svg.appendChild(path);
}

// animate
function animate() {
    const now = Date.now();

    if (now - lastMoveTime > 80) {
        points.splice(0, 2);
    }

    draw();
    requestAnimationFrame(animate);
}

animate();

// ---------------------------------------------------

let mouse = { x: 0, y: 0 };

container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

function drawConnections() {
    c_svg.innerHTML = "";

    const elements = container.querySelectorAll(".dot, .bubble, .smaller-dots");
    const rect = container.getBoundingClientRect();

    const points = Array.from(elements).map(el => {
        const r = el.getBoundingClientRect();
        return {
            x: r.left - rect.left + r.width / 2,
            y: r.top - rect.top + r.height / 2
        };
    });

    points.forEach((point, i) => {
        // calculate distances to all other points
        const distances = points
            .map((p, j) => ({
                index: j,
                dist: Math.hypot(point.x - p.x, point.y - p.y)
            }))
            .filter(p => p.index !== i) // remove itself
            .sort((a, b) => a.dist - b.dist);

        // 🔥 connect to 2 nearest neighbors
        for (let k = 0; k < 4; k++) {
            const neighbor = points[distances[k].index];

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            line.setAttribute("x1", point.x);
            line.setAttribute("y1", point.y);
            line.setAttribute("x2", neighbor.x);
            line.setAttribute("y2", neighbor.y);

            line.setAttribute("stroke", "white");
            line.setAttribute("stroke-width", "1");
            line.setAttribute("opacity", "0.2");

            c_svg.appendChild(line);
        }
    });
}

// animate so it follows floating motion
function animateConnections() {
    drawConnections();
    requestAnimationFrame(animateConnections);
}

animateConnections();

// -------------------------------------------

// select bubbles and problems
const bubbles = document.querySelectorAll(".bubble");
const problems = document.querySelectorAll(".problem");

bubbles.forEach((bubble, index) => {
    bubble.addEventListener("click", () => {

        problems.forEach(p => p.style.display = "none");
        bubbles.forEach(b => b.style.boxShadow = "none");

        problems[index].style.display = "block";
        bubbles[index].style.boxShadow = "0 12px 48px rgba(255, 255, 255, 0.4)"
    });
});

// ---------------------------------------

bubbles.forEach(bubble => {
    let isDragging = false;
    let hasMoved = false;
    let offsetX = 0;
    let offsetY = 0;

    bubble.addEventListener("mousedown", (e) => {
        isDragging = true;
        hasMoved = false;

        const rect = bubble.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        bubble.style.cursor = "grabbing";

        // remove conflicting positioning
        bubble.style.right = "auto";
        bubble.style.bottom = "auto";
    });

    function moveDrag(e) {
        if (!isDragging) return;

        const containerRect = container.getBoundingClientRect();

        // 🔥 handle both mouse + touch
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        let x = clientX - containerRect.left - offsetX;
        let y = clientY - containerRect.top - offsetY;

        // detect real movement
        if (Math.abs(x) > 2 || Math.abs(y) > 2) {
            hasMoved = true;
        }

        if (!hasMoved) return;

        const maxX = container.clientWidth - bubble.offsetWidth;
        const maxY = container.clientHeight - bubble.offsetHeight;

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;

        drawConnections();

        // 🔥 prevent scroll on touch
        if (e.touches) e.preventDefault();
    }

    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("touchmove", moveDrag, { passive: false });   

    function endDrag() {
        isDragging = false;
        bubble.style.cursor = "pointer";
    }

    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);
});

class GalleryImage extends HTMLElement {
    connectedCallback() {
        const width = this.getAttribute("width");
        const height = this.getAttribute("height");
        const imgNumber = this.getAttribute("imgNumber");
        this.innerHTML = 
        `
        <img width="${width}" height="${height}" src="resources/gallery/img${imgNumber}.jpeg">
        `
    }
}

customElements.define("g-image", GalleryImage);