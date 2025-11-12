// Scene Renderer - Creates visual representations of each scene

class SceneRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 0;
        this.height = 0;
        this.animationFrame = 0;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    // RENDER BAR SCENE
    renderBar() {
        this.clear();

        // Dark background
        this.ctx.fillStyle = '#0a0514';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Floor with neon reflections
        const gradient = this.ctx.createLinearGradient(0, this.height * 0.7, 0, this.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#0f0f1e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, this.height * 0.7, this.width, this.height * 0.3);

        // Neon lights on ceiling
        for (let i = 0; i < 8; i++) {
            const x = (i + 0.5) * (this.width / 8);
            const y = 50;
            const glow = this.ctx.createRadialGradient(x, y, 0, x, y, 60);
            glow.addColorStop(0, 'rgba(255, 0, 255, 0.8)');
            glow.addColorStop(0.5, 'rgba(255, 0, 255, 0.3)');
            glow.addColorStop(1, 'rgba(255, 0, 255, 0)');
            this.ctx.fillStyle = glow;
            this.ctx.fillRect(x - 60, y - 60, 120, 120);

            // Light beam
            this.ctx.fillStyle = 'rgba(255, 0, 255, 0.1)';
            this.ctx.fillRect(x - 30, y, 60, this.height * 0.7);
        }

        // Glass tables with LED glow
        for (let i = 0; i < 4; i++) {
            const x = (i + 1) * (this.width / 5);
            const y = this.height * 0.6;
            const pulse = Math.sin(this.animationFrame * 0.05 + i) * 0.3 + 0.7;

            // Table glow
            const tableGlow = this.ctx.createRadialGradient(x, y, 0, x, y, 80);
            tableGlow.addColorStop(0, `rgba(0, 255, 255, ${pulse * 0.6})`);
            tableGlow.addColorStop(0.5, `rgba(0, 255, 255, ${pulse * 0.3})`);
            tableGlow.addColorStop(1, 'rgba(0, 255, 255, 0)');
            this.ctx.fillStyle = tableGlow;
            this.ctx.fillRect(x - 80, y - 80, 160, 160);

            // Table surface
            this.ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
            this.ctx.fillRect(x - 50, y - 10, 100, 20);

            // Reflection
            this.ctx.fillStyle = `rgba(0, 255, 255, ${pulse * 0.2})`;
            this.ctx.fillRect(x - 50, y + 10, 100, 40);
        }

        // Holographic dancers (geometric shapes)
        for (let i = 0; i < 3; i++) {
            const x = (i + 1.5) * (this.width / 4);
            const y = this.height * 0.4;
            const offset = Math.sin(this.animationFrame * 0.1 + i * 2) * 20;

            // Glitch effect
            const glitch = Math.random() > 0.95 ? 10 : 0;

            this.ctx.save();
            this.ctx.translate(x + glitch, y + offset);

            // Body
            this.ctx.fillStyle = `rgba(255, 0, 255, ${0.6 + Math.random() * 0.2})`;
            this.ctx.fillRect(-15, -40, 30, 80);

            // Arms
            this.ctx.fillRect(-40, -20, 25, 10);
            this.ctx.fillRect(15, -20, 25, 10);

            // Legs
            this.ctx.fillRect(-15, 40, 12, 40);
            this.ctx.fillRect(3, 40, 12, 40);

            // Head glow
            const headGlow = this.ctx.createRadialGradient(0, -50, 0, 0, -50, 20);
            headGlow.addColorStop(0, 'rgba(0, 255, 255, 0.9)');
            headGlow.addColorStop(1, 'rgba(0, 255, 255, 0)');
            this.ctx.fillStyle = headGlow;
            this.ctx.arc(0, -50, 20, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        }

        // Screens with ads
        this.drawScreen(this.width * 0.1, this.height * 0.2, 'NEURAL-LINK 3.0', '#ff00ff');
        this.drawScreen(this.width * 0.8, this.height * 0.3, 'UPGRADE NOW', '#00ffff');

        // Fog/smoke effect
        for (let i = 0; i < 20; i++) {
            const x = (this.animationFrame * 2 + i * 50) % this.width;
            const y = this.height * 0.5 + Math.sin(x * 0.01) * 100;
            const smokeGlow = this.ctx.createRadialGradient(x, y, 0, x, y, 100);
            smokeGlow.addColorStop(0, 'rgba(200, 200, 255, 0.1)');
            smokeGlow.addColorStop(1, 'rgba(200, 200, 255, 0)');
            this.ctx.fillStyle = smokeGlow;
            this.ctx.fillRect(x - 100, y - 100, 200, 200);
        }

        this.animationFrame++;
    }

    // RENDER ALLEYWAY SCENE
    renderAlley() {
        this.clear();

        // Dark sky
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.height * 0.4);
        skyGradient.addColorStop(0, '#0a0a1f');
        skyGradient.addColorStop(1, '#1a1a3a');
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, this.width, this.height * 0.4);

        // Buildings (perspective)
        this.drawBuilding(0, 150, this.width * 0.3, this.height - 150, '#0f0f1a', true);
        this.drawBuilding(this.width * 0.7, 100, this.width * 0.3, this.height - 100, '#0f0f1a', false);

        // Ground (wet pavement)
        const groundGradient = this.ctx.createLinearGradient(0, this.height * 0.6, 0, this.height);
        groundGradient.addColorStop(0, '#1a1a2a');
        groundGradient.addColorStop(1, '#0a0a15');
        this.ctx.fillStyle = groundGradient;
        this.ctx.fillRect(0, this.height * 0.6, this.width, this.height * 0.4);

        // Neon reflections on wet ground
        for (let i = 0; i < 5; i++) {
            const x = (i + 0.5) * (this.width / 5);
            const y = this.height * 0.8;
            const color = i % 2 === 0 ? '#ff00ff' : '#00ffff';

            // Vertical reflection streak
            const reflectionGradient = this.ctx.createLinearGradient(x, y, x, this.height);
            reflectionGradient.addColorStop(0, color + '80');
            reflectionGradient.addColorStop(1, color + '00');
            this.ctx.fillStyle = reflectionGradient;
            this.ctx.fillRect(x - 20, y, 40, this.height - y);
        }

        // Neon signs on buildings
        this.drawNeonSign(this.width * 0.15, 250, 'RAMEN', '#ff00ff', 180);
        this.drawNeonSign(this.width * 0.75, 300, 'BAR', '#00ffff', 120);
        this.drawNeonSign(this.width * 0.25, 400, '24/7', '#ffff00', 100);

        // Steam vents
        for (let i = 0; i < 4; i++) {
            const x = (i + 1) * (this.width / 5);
            const steamHeight = Math.sin(this.animationFrame * 0.05 + i) * 50 + 100;

            const steamGradient = this.ctx.createLinearGradient(x, this.height * 0.6, x, this.height * 0.6 - steamHeight);
            steamGradient.addColorStop(0, 'rgba(200, 200, 200, 0.4)');
            steamGradient.addColorStop(1, 'rgba(200, 200, 200, 0)');
            this.ctx.fillStyle = steamGradient;
            this.ctx.fillRect(x - 20, this.height * 0.6 - steamHeight, 40, steamHeight);
        }

        // Police drones
        for (let i = 0; i < 2; i++) {
            const x = this.width * 0.3 + Math.sin(this.animationFrame * 0.03 + i * 3) * 200;
            const y = 150 + i * 80;
            this.drawDrone(x, y, i);
        }

        // Rain
        this.drawRain();

        // Electrical sparks from wires
        if (Math.random() > 0.9) {
            const x = this.width * 0.6;
            const y = this.height * 0.3;
            this.drawSpark(x, y);
        }

        this.animationFrame++;
    }

    // RENDER ROOFTOP SCENE
    renderRooftop() {
        this.clear();

        // Sky with city glow
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        skyGradient.addColorStop(0, '#1a0a2a');
        skyGradient.addColorStop(0.5, '#2a1a3a');
        skyGradient.addColorStop(1, '#ff00ff20');
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Distant buildings silhouette
        for (let i = 0; i < 10; i++) {
            const x = i * (this.width / 10);
            const height = Math.random() * 300 + 200;
            this.ctx.fillStyle = '#0a0a1a';
            this.ctx.fillRect(x, this.height - height, this.width / 10 - 10, height);

            // Random lit windows
            for (let j = 0; j < 5; j++) {
                if (Math.random() > 0.7) {
                    const wx = x + Math.random() * 50;
                    const wy = this.height - height + j * 50;
                    this.ctx.fillStyle = Math.random() > 0.5 ? '#ffff0040' : '#00ffff40';
                    this.ctx.fillRect(wx, wy, 10, 10);
                }
            }
        }

        // Current rooftop surface
        this.ctx.fillStyle = '#1a1a2a';
        this.ctx.fillRect(0, this.height * 0.7, this.width, this.height * 0.3);

        // Rooftop edge
        this.ctx.fillStyle = '#2a2a3a';
        this.ctx.fillRect(0, this.height * 0.7, this.width, 20);

        // Solar panels
        for (let i = 0; i < 6; i++) {
            const x = (i + 0.5) * (this.width / 7);
            const y = this.height * 0.75;
            this.drawSolarPanel(x, y, i);
        }

        // Overgrown weeds/plants
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * this.width;
            const y = this.height * 0.7;
            this.drawPlant(x, y);
        }

        // AC units
        this.drawACUnit(this.width * 0.2, this.height * 0.73);
        this.drawACUnit(this.width * 0.8, this.height * 0.73);

        // Giant holographic billboard in distance
        const billboardX = this.width * 0.7;
        const billboardY = this.height * 0.3;
        this.drawHoloBillboard(billboardX, billboardY);

        // Edge of next building (for jumping)
        this.ctx.fillStyle = '#0a0a1a';
        this.ctx.fillRect(this.width * 0.85, this.height * 0.75, this.width * 0.15, this.height * 0.25);
        this.ctx.fillStyle = '#ff00ff40';
        this.ctx.fillRect(this.width * 0.85, this.height * 0.75, this.width * 0.15, 5);

        this.animationFrame++;
    }

    // RENDER MALL SCENE (uses actual image)
    renderMall(image) {
        this.clear();

        if (image && image.complete) {
            // Draw the actual deserted mall image
            const scale = Math.max(this.width / image.width, this.height / image.height);
            const x = (this.width - image.width * scale) / 2;
            const y = (this.height - image.height * scale) / 2;

            this.ctx.drawImage(image, x, y, image.width * scale, image.height * scale);

            // Add cyberpunk overlay effects
            this.ctx.fillStyle = 'rgba(0, 255, 255, 0.05)';
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Flickering neon signs overlay
            if (Math.random() > 0.7) {
                const flickerX = Math.random() * this.width;
                const flickerY = Math.random() * this.height * 0.5;
                const glow = this.ctx.createRadialGradient(flickerX, flickerY, 0, flickerX, flickerY, 100);
                glow.addColorStop(0, 'rgba(255, 0, 255, 0.3)');
                glow.addColorStop(1, 'rgba(255, 0, 255, 0)');
                this.ctx.fillStyle = glow;
                this.ctx.fillRect(flickerX - 100, flickerY - 100, 200, 200);
            }
        } else {
            // Fallback if image not loaded
            this.renderMallFallback();
        }
    }

    renderMallFallback() {
        // Fallback rendering if image doesn't load
        this.ctx.fillStyle = '#0a0a0f';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Dead escalators
        this.ctx.fillStyle = '#2a2a3a';
        this.ctx.fillRect(this.width * 0.4, this.height * 0.5, this.width * 0.2, this.height * 0.5);

        // Broken glass
        this.ctx.strokeStyle = '#ffffff40';
        for (let i = 0; i < 20; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(Math.random() * this.width, Math.random() * this.height);
            this.ctx.lineTo(Math.random() * this.width, Math.random() * this.height);
            this.ctx.stroke();
        }

        // Flickering sign
        if (Math.random() > 0.5) {
            this.ctx.fillStyle = '#ff00ff80';
            this.ctx.font = '48px monospace';
            this.ctx.fillText('SA-- 50% -FF', this.width * 0.1, 100);
        }
    }

    // Helper drawing functions
    drawBuilding(x, y, width, height, color, left) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);

        // Windows
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 5; col++) {
                if (Math.random() > 0.6) {
                    const wx = x + (col + 0.5) * (width / 6);
                    const wy = y + (row + 1) * (height / 21);
                    const lit = Math.random() > 0.5;
                    this.ctx.fillStyle = lit ? '#ffff0080' : '#00000080';
                    this.ctx.fillRect(wx, wy, width / 8, height / 25);
                }
            }
        }

        // Fire escape
        this.ctx.strokeStyle = '#ff00ff80';
        this.ctx.lineWidth = 3;
        const escapeX = left ? x + width - 50 : x + 50;
        for (let i = 0; i < 10; i++) {
            const ey = y + i * (height / 10);
            this.ctx.strokeRect(escapeX - 20, ey, 40, height / 10 - 10);
        }
    }

    drawNeonSign(x, y, text, color, width) {
        const pulse = Math.sin(this.animationFrame * 0.1) * 0.3 + 0.7;

        // Glow
        const glow = this.ctx.createRadialGradient(x, y, 0, x, y, width);
        glow.addColorStop(0, color + Math.floor(pulse * 128).toString(16).padStart(2, '0'));
        glow.addColorStop(0.5, color + '40');
        glow.addColorStop(1, color + '00');
        this.ctx.fillStyle = glow;
        this.ctx.fillRect(x - width, y - 30, width * 2, 60);

        // Text
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 24px monospace';
        this.ctx.fillText(text, x - width/2, y + 8);
    }

    drawDrone(x, y, index) {
        const pulse = Math.sin(this.animationFrame * 0.15 + index) * 0.5 + 0.5;

        // Body
        this.ctx.fillStyle = '#1a1a2a';
        this.ctx.fillRect(x - 20, y - 10, 40, 20);

        // Propellers
        this.ctx.fillStyle = '#ffffff40';
        this.ctx.fillRect(x - 30, y - 15, 15, 5);
        this.ctx.fillRect(x + 15, y - 15, 15, 5);

        // Police light
        const lightColor = pulse > 0.5 ? '#0000ff' : '#ff0000';
        const lightGlow = this.ctx.createRadialGradient(x, y, 0, x, y, 30);
        lightGlow.addColorStop(0, lightColor + 'ff');
        lightGlow.addColorStop(1, lightColor + '00');
        this.ctx.fillStyle = lightGlow;
        this.ctx.fillRect(x - 30, y - 30, 60, 60);

        // Searchlight
        this.ctx.fillStyle = 'rgba(255, 255, 200, 0.2)';
        this.ctx.fillRect(x - 40, y + 20, 80, 300);
    }

    drawRain() {
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < 100; i++) {
            const x = (this.animationFrame * 5 + i * 20) % this.width;
            const y = (this.animationFrame * 10 + i * 30) % this.height;

            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + 2, y + 20);
            this.ctx.stroke();
        }
    }

    drawSpark(x, y) {
        const sparkGlow = this.ctx.createRadialGradient(x, y, 0, x, y, 50);
        sparkGlow.addColorStop(0, 'rgba(255, 255, 0, 1)');
        sparkGlow.addColorStop(0.5, 'rgba(255, 150, 0, 0.6)');
        sparkGlow.addColorStop(1, 'rgba(255, 150, 0, 0)');
        this.ctx.fillStyle = sparkGlow;
        this.ctx.fillRect(x - 50, y - 50, 100, 100);

        // Lightning branches
        this.ctx.strokeStyle = '#ffff00';
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + (Math.random() - 0.5) * 40, y + Math.random() * 40);
            this.ctx.stroke();
        }
    }

    drawSolarPanel(x, y, index) {
        const flicker = Math.random() > 0.8;

        // Panel frame
        this.ctx.fillStyle = '#2a2a3a';
        this.ctx.fillRect(x - 40, y, 80, 60);

        // Panel surface
        this.ctx.fillStyle = '#1a1a2a';
        this.ctx.fillRect(x - 35, y + 5, 70, 50);

        // LED indicators
        if (flicker) {
            this.ctx.fillStyle = Math.random() > 0.5 ? '#00ff00' : '#ff0000';
            this.ctx.fillRect(x - 30, y + 10, 5, 5);
            this.ctx.fillRect(x + 25, y + 10, 5, 5);
        }
    }

    drawPlant(x, y) {
        this.ctx.strokeStyle = '#00ff0040';
        this.ctx.lineWidth = 2;

        // Stem
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + Math.random() * 10 - 5, y - Math.random() * 40 - 20);
        this.ctx.stroke();

        // Leaves
        for (let i = 0; i < 3; i++) {
            const leafY = y - i * 15;
            this.ctx.beginPath();
            this.ctx.arc(x, leafY, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = '#00ff0060';
            this.ctx.fill();
        }
    }

    drawACUnit(x, y) {
        // Main body
        this.ctx.fillStyle = '#3a3a4a';
        this.ctx.fillRect(x - 60, y, 120, 80);

        // Vents
        this.ctx.strokeStyle = '#1a1a2a';
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x - 50, y + 10 + i * 8);
            this.ctx.lineTo(x + 50, y + 10 + i * 8);
            this.ctx.stroke();
        }

        // Status light
        const pulse = Math.sin(this.animationFrame * 0.1) * 0.5 + 0.5;
        this.ctx.fillStyle = `rgba(255, 0, 0, ${pulse})`;
        this.ctx.fillRect(x + 40, y + 10, 8, 8);
    }

    drawHoloBillboard(x, y) {
        const glitch = Math.random() > 0.95 ? 10 : 0;

        // Frame
        this.ctx.strokeStyle = '#00ffff80';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(x - 150 + glitch, y - 100, 300, 200);

        // Holographic content
        const pulse = Math.sin(this.animationFrame * 0.1) * 0.5 + 0.5;
        this.ctx.fillStyle = `rgba(255, 0, 255, ${0.3 + pulse * 0.3})`;
        this.ctx.fillRect(x - 145 + glitch, y - 95, 290, 190);

        // Text
        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = 'bold 32px monospace';
        this.ctx.fillText('LIVE FOREVER', x - 140, y - 40);
        this.ctx.font = '20px monospace';
        this.ctx.fillText('NEURAL BACKUP', x - 130, y);
        this.ctx.fillText('AVAILABLE NOW', x - 130, y + 30);
    }

    drawScreen(x, y, text, color) {
        // Screen frame
        this.ctx.fillStyle = '#1a1a2a';
        this.ctx.fillRect(x - 100, y - 40, 200, 80);

        // Screen glow
        const pulse = Math.sin(this.animationFrame * 0.1) * 0.3 + 0.7;
        const glow = this.ctx.createRadialGradient(x, y, 0, x, y, 100);
        glow.addColorStop(0, color + Math.floor(pulse * 128).toString(16).padStart(2, '0'));
        glow.addColorStop(1, color + '00');
        this.ctx.fillStyle = glow;
        this.ctx.fillRect(x - 100, y - 40, 200, 80);

        // Text
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 18px monospace';
        this.ctx.fillText(text, x - 90, y + 5);
    }
}

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SceneRenderer };
}
