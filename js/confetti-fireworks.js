/**
 * confetti-fireworks.js
 * Particle system for:
 * - Floating interactive balloons (pastel pink, lavender, white, rose-gold)
 * - Canvas fireworks system with soft pastel bursts
 * - Floating ambient hearts and twinkling stars
 * - Confetti cannon blasts
 * - Cursor / Touch heart sparkle trails
 */

// Ambient Canvas for Floating Hearts & Stars
class AmbientParticleCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 45;
        this.colors = ['#ffb6c1', '#fbcfe8', '#e9d5ff', '#c084fc', '#ffffff', '#ffd1dc', '#f472b6'];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initParticles();
        this.animate();
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle(true));
        }
    }

    createParticle(randomY = false) {
        return {
            x: Math.random() * (this.canvas ? this.canvas.width : window.innerWidth),
            y: randomY ? Math.random() * (this.canvas ? this.canvas.height : window.innerHeight) : (this.canvas ? this.canvas.height + 20 : window.innerHeight + 20),
            size: Math.random() * 12 + 6,
            speedY: Math.random() * 0.8 + 0.3,
            speedX: (Math.random() - 0.5) * 0.6,
            opacity: Math.random() * 0.6 + 0.2,
            type: Math.random() > 0.4 ? 'heart' : 'star',
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02
        };
    }

    drawHeart(x, y, size, color, opacity, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        const topCurveHeight = size * 0.3;
        this.ctx.moveTo(0, topCurveHeight);
        // top left curve
        this.ctx.bezierCurveTo(
            -size / 2, -size / 2,
            -size, topCurveHeight / 3,
            0, size
        );
        // top right curve
        this.ctx.bezierCurveTo(
            size, topCurveHeight / 3,
            size / 2, -size / 2,
            0, topCurveHeight
        );
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    drawStar(x, y, size, color, opacity, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            this.ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * size, -Math.sin((18 + i * 72) * Math.PI / 180) * size);
            this.ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (size / 2), -Math.sin((54 + i * 72) * Math.PI / 180) * (size / 2));
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

    animate() {
        if (!this.ctx || !this.canvas) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.y -= p.speedY;
            p.x += Math.sin(p.y * 0.01) * 0.5 + p.speedX;
            p.rotation += p.rotSpeed;

            if (p.type === 'heart') {
                this.drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
            } else {
                this.drawStar(p.x, p.y, p.size * 0.7, p.color, p.opacity, p.rotation);
            }

            // Reset when reaching top
            if (p.y < -30 || p.x < -30 || p.x > this.canvas.width + 30) {
                this.particles[i] = this.createParticle(false);
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Full-screen Fireworks Engine
class FireworksEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.fireworks = [];
        this.particles = [];
        this.colors = ['#ff758c', '#ff7eb3', '#e0c3fc', '#a18cd1', '#ffb6c1', '#fbcfe8', '#ffd700', '#ffffff'];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.loop();
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    launch(x = null, targetY = null) {
        if (!this.canvas) return;
        const startX = x !== null ? x : Math.random() * (this.canvas.width * 0.8) + this.canvas.width * 0.1;
        const endY = targetY !== null ? targetY : Math.random() * (this.canvas.height * 0.4) + this.canvas.height * 0.15;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];

        this.fireworks.push({
            x: startX,
            y: this.canvas.height,
            targetY: endY,
            speed: Math.random() * 3 + 7,
            color: color
        });
    }

    explode(x, y, color) {
        const count = 65;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.3;
            const speed = Math.random() * 5 + 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                decay: Math.random() * 0.015 + 0.012,
                color: Math.random() > 0.3 ? color : '#ffffff',
                size: Math.random() * 3 + 2,
                shape: Math.random() > 0.6 ? 'heart' : 'spark'
            });
        }
    }

    loop() {
        if (!this.ctx || !this.canvas) return;
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';

        // Update rockets
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const fw = this.fireworks[i];
            fw.y -= fw.speed;

            this.ctx.beginPath();
            this.ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = fw.color;
            this.ctx.fill();

            if (fw.y <= fw.targetY) {
                this.explode(fw.x, fw.y, fw.color);
                this.fireworks.splice(i, 1);
            }
        }

        // Update explosion particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.06; // gravity
            p.vx *= 0.98; // air resistance
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = p.color;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }

        requestAnimationFrame(() => this.loop());
    }

    launchBurst(count = 5) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.launch();
            }, i * 300);
        }
    }
}

// Pastel Floating Balloons Manager
class BalloonManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.balloonColors = [
            { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%)', shadow: 'rgba(255, 154, 158, 0.4)' },
            { bg: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', shadow: 'rgba(161, 140, 209, 0.4)' },
            { bg: 'linear-gradient(135deg, #ffd1dc 0%, #fff1eb 100%)', shadow: 'rgba(255, 209, 220, 0.4)' },
            { bg: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)', shadow: 'rgba(255, 117, 140, 0.4)' },
            { bg: 'linear-gradient(135deg, #c471ed 0%, #f64f59 100%)', shadow: 'rgba(196, 113, 237, 0.4)' },
            { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', shadow: 'rgba(252, 182, 159, 0.4)' }
        ];
        this.init();
    }

    init() {
        if (!this.container) return;
        // Initial set of background balloons
        for (let i = 0; i < 12; i++) {
            this.createBalloon(true);
        }

        // Spawn new ones periodically
        setInterval(() => {
            if (this.container && this.container.children.length < 18) {
                this.createBalloon(false);
            }
        }, 3500);
    }

    createBalloon(randomStart = false) {
        if (!this.container) return;
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';

        const colorStyle = this.balloonColors[Math.floor(Math.random() * this.balloonColors.length)];
        const size = Math.floor(Math.random() * 35) + 45; // 45px - 80px
        const left = Math.random() * 95; // percent
        const duration = Math.random() * 12 + 16; // 16s - 28s float duration
        const delay = randomStart ? -Math.random() * 20 : 0;
        const drift = (Math.random() - 0.5) * 60; // horizontal wobble

        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.25}px`;
        balloon.style.left = `${left}%`;
        balloon.style.background = colorStyle.bg;
        balloon.style.boxShadow = `0 10px 25px ${colorStyle.shadow}, inset -4px -6px 12px rgba(0,0,0,0.1), inset 6px 6px 14px rgba(255,255,255,0.7)`;
        balloon.style.animationDuration = `${duration}s`;
        balloon.style.animationDelay = `${delay}s`;
        balloon.style.setProperty('--drift-x', `${drift}px`);

        // String element
        const string = document.createElement('div');
        string.className = 'balloon-string';
        balloon.appendChild(string);

        // Click to pop balloon with confetti and sound
        balloon.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.birthdayAudio) window.birthdayAudio.playPop();
            this.popBalloon(balloon, e.clientX, e.clientY);
        });

        this.container.appendChild(balloon);

        // Remove balloon after animation
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.parentNode.removeChild(balloon);
            }
        }, (duration + (delay < 0 ? 0 : delay)) * 1000);
    }

    popBalloon(balloon, x, y) {
        balloon.style.transform = 'scale(1.5)';
        balloon.style.opacity = '0';
        balloon.style.transition = 'all 0.15s ease-out';

        // Trigger mini confetti burst at point
        if (window.confetti) {
            window.confetti({
                particleCount: 25,
                spread: 60,
                origin: { x: x / window.innerWidth, y: y / window.innerHeight },
                colors: ['#ff758c', '#a18cd1', '#ffd1dc', '#ffffff']
            });
        }

        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.parentNode.removeChild(balloon);
            }
            this.createBalloon(false);
        }, 150);
    }

    releaseMany(count = 15) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createBalloon(false);
            }, i * 200);
        }
    }
}

// Confetti Cannon Utilities
const BirthdayCelebration = {
    fireConfetti: function() {
        if (typeof confetti === 'function') {
            // Heart-shaped confetti & pastel ribbons
            confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#ff758c', '#ff7eb3', '#c3bef0', '#a18cd1', '#ffd1dc', '#ffd700', '#ffffff'],
                shapes: ['circle', 'square']
            });
        }
    },

    fireGrandExplosion: function() {
        if (typeof confetti === 'function') {
            const count = 200;
            const defaults = {
                origin: { y: 0.7 }
            };

            function fire(particleRatio, opts) {
                confetti(Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio),
                    colors: ['#ff758c', '#a18cd1', '#ffcbf2', '#f72585', '#7209b7', '#ffd700', '#ffffff']
                }));
            }

            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });
        }

        if (window.fireworksEngine) {
            window.fireworksEngine.launchBurst(4);
        }
    },

    heartShower: function() {
        const hearts = ['💖', '🌸', '✨', '💕', '🎂', '🎉', '💜', '👑'];
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-emoji-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = `${Math.random() * 95}vw`;
                heart.style.top = `${window.scrollY + window.innerHeight}px`;
                heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
                heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
                document.body.appendChild(heart);

                setTimeout(() => {
                    if (heart.parentNode) heart.parentNode.removeChild(heart);
                }, 5000);
            }, i * 120);
        }
    }
};

// Cursor Romantic Sparkle Trail
function setupCursorHearts() {
    let lastTime = 0;
    const createSparkle = (x, y) => {
        const now = Date.now();
        if (now - lastTime < 70) return; // limit rate
        lastTime = now;

        const el = document.createElement('div');
        el.className = 'cursor-heart-trail';
        const hearts = ['💖', '✨', '🌸', '💕'];
        el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        document.body.appendChild(el);

        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, 1000);
    };

    window.addEventListener('mousemove', (e) => {
        createSparkle(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            createSparkle(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    window.ambientCanvas = new AmbientParticleCanvas('ambientCanvas');
    window.fireworksEngine = new FireworksEngine('fireworksCanvas');
    window.balloonManager = new BalloonManager('balloonContainer');
    setupCursorHearts();
});

