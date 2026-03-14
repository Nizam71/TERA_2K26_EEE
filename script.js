// Intersection Observer for scroll animations (fade-up)
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it'striggered
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
});

// Particle system for the background
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Resize canvas to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Engine
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Update particle position
    update() {
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

// Create particle array
function initParticles() {
    particlesArray = [];
    const numberOfParticles = Math.min((canvas.height * canvas.width) / 9000, 100); // Responsive particle count
    const colors = ['rgba(0, 255, 245, 0.4)', 'rgba(181, 40, 255, 0.4)', 'rgba(255, 0, 212, 0.4)', 'rgba(255, 255, 255, 0.2)'];

    for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 2) + 1;
        const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);

        const directionX = (Math.random() * 1) - 0.5;
        const directionY = (Math.random() * 1) - 0.5;

        const color = colors[Math.floor(Math.random() * colors.length)];

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Animate particles
function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

initParticles();
animateParticles();

// Glitch text effect handling for hero title (optional subtle randomness)
const glitchText = document.querySelector('.hero-title');
setInterval(() => {
    if (Math.random() > 0.95) {
        glitchText.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0,255,245,0.7),
            ${Math.random() * -10 + 5}px ${Math.random() * -10 + 5}px 0 rgba(255,0,212,0.7)`;

        setTimeout(() => {
            glitchText.style.textShadow = `0 0 20px rgba(0,255,245,0.3)`;
        }, 100);
    }
}, 200);

// Drill-down UI Logic
function showEvents(viewId) {
    // Hide Categories View
    const categoriesView = document.getElementById('categories-view');
    categoriesView.classList.add('hidden');

    // Show Main Events Container and Specific Event View
    document.getElementById('events').classList.remove('hidden');
    document.getElementById(viewId).classList.remove('hidden');

    // Small scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCategories() {
    // Hide Main Events Container and Detailed Views
    document.getElementById('events').classList.add('hidden');
    document.getElementById('tech-events-view').classList.add('hidden');
    document.getElementById('non-tech-events-view').classList.add('hidden');

    // Show Categories View
    const categoriesView = document.getElementById('categories-view');
    categoriesView.classList.remove('hidden');

    // Re-trigger fade
    categoriesView.classList.remove('fade-up-initial');
    void categoriesView.offsetWidth; // Trigger reflow
    categoriesView.classList.add('fade-up-initial');

    // Small scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
