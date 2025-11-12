// Particle System for Cyberpunk Effects

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.theme = 'bar';

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setTheme(theme) {
        this.theme = theme;
        this.particles = []; // Clear particles on theme change
    }

    createParticle(type) {
        const particle = {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            life: 1,
            decay: Math.random() * 0.01 + 0.005,
            type: type
        };

        // Type-specific properties
        switch(type) {
            case 'spark':
                particle.color = `rgba(255, ${Math.random() * 100 + 155}, 0, `;
                particle.vy = Math.random() * 3 - 1;
                particle.vx = Math.random() * 2 - 1;
                break;
            case 'rain':
                particle.color = 'rgba(0, 255, 255, ';
                particle.vy = Math.random() * 10 + 5;
                particle.vx = Math.random() * 2 - 1;
                particle.size = Math.random() * 2 + 1;
                particle.length = Math.random() * 20 + 10;
                break;
            case 'smoke':
                particle.color = 'rgba(150, 150, 200, ';
                particle.vy = -Math.random() * 2 - 0.5;
                particle.vx = (Math.random() - 0.5) * 1;
                particle.size = Math.random() * 20 + 10;
                break;
            case 'neon':
                const colors = [
                    'rgba(0, 255, 255, ',
                    'rgba(255, 0, 255, ',
                    'rgba(0, 212, 255, ',
                    'rgba(157, 0, 255, '
                ];
                particle.color = colors[Math.floor(Math.random() * colors.length)];
                particle.vy = (Math.random() - 0.5) * 1;
                particle.vx = (Math.random() - 0.5) * 1;
                break;
            case 'dust':
                particle.color = 'rgba(200, 200, 200, ';
                particle.vy = Math.random() * 0.5 + 0.2;
                particle.vx = Math.random() * 0.3 - 0.15;
                particle.size = Math.random() * 2 + 0.5;
                break;
            default:
                particle.color = 'rgba(255, 255, 255, ';
        }

        return particle;
    }

    generateParticles() {
        // Generate particles based on current theme
        const particleCount = this.particles.length;
        const maxParticles = 150;

        if (particleCount < maxParticles) {
            let type = 'neon';

            switch(this.theme) {
                case 'bar':
                    type = Math.random() > 0.5 ? 'neon' : 'smoke';
                    break;
                case 'alley':
                case 'rain':
                    type = Math.random() > 0.3 ? 'rain' : 'spark';
                    break;
                case 'rooftop':
                    type = Math.random() > 0.7 ? 'spark' : 'dust';
                    break;
                case 'mall':
                    type = 'dust';
                    break;
                case 'tunnels':
                    type = Math.random() > 0.6 ? 'spark' : 'smoke';
                    break;
                case 'chase':
                case 'flight':
                    type = Math.random() > 0.5 ? 'neon' : 'spark';
                    break;
                case 'subway':
                    type = Math.random() > 0.4 ? 'spark' : 'neon';
                    break;
            }

            this.particles.push(this.createParticle(type));
        }
    }

    update() {
        // Update particle positions and life
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;

            // Remove dead particles
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // Wrap around screen
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
        }
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw particles
        this.particles.forEach(p => {
            this.ctx.save();

            if (p.type === 'rain') {
                // Draw rain as lines
                this.ctx.strokeStyle = p.color + p.life + ')';
                this.ctx.lineWidth = p.size;
                this.ctx.beginPath();
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(p.x + p.vx, p.y + p.length);
                this.ctx.stroke();
            } else {
                // Draw particles as circles with glow
                const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                gradient.addColorStop(0, p.color + p.life + ')');
                gradient.addColorStop(0.5, p.color + (p.life * 0.5) + ')');
                gradient.addColorStop(1, p.color + '0)');

                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        });
    }

    animate() {
        this.generateParticles();
        this.update();
        this.draw();
    }
}

// Initialize particle system when DOM loads
let particleSystem;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    particleSystem = new ParticleSystem(canvas);

    // Animation loop
    function particleLoop() {
        particleSystem.animate();
        requestAnimationFrame(particleLoop);
    }
    particleLoop();
});
