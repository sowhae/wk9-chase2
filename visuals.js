// 3D Visual Effects System using Canvas

class VisualEffects {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.theme = 'bar';
        this.time = 0;
        this.shapes = [];

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.initShapes();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setTheme(theme) {
        this.theme = theme;
        this.initShapes();
    }

    initShapes() {
        this.shapes = [];
        const numShapes = 30;

        for (let i = 0; i < numShapes; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 1000,
                size: Math.random() * 50 + 20,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                color: this.getThemeColor(),
                type: Math.random() > 0.5 ? 'rect' : 'circle',
                pulseOffset: Math.random() * Math.PI * 2
            });
        }
    }

    getThemeColor() {
        const themes = {
            bar: ['rgba(0, 255, 255, ', 'rgba(255, 0, 255, ', 'rgba(0, 212, 255, '],
            alley: ['rgba(255, 0, 255, ', 'rgba(0, 255, 255, ', 'rgba(255, 100, 0, '],
            rooftop: ['rgba(0, 150, 255, ', 'rgba(255, 0, 255, ', 'rgba(100, 100, 200, '],
            mall: ['rgba(100, 100, 150, ', 'rgba(150, 0, 200, ', 'rgba(0, 200, 200, '],
            tunnels: ['rgba(255, 0, 0, ', 'rgba(200, 0, 0, ', 'rgba(255, 100, 0, '],
            chase: ['rgba(255, 0, 0, ', 'rgba(0, 100, 255, ', 'rgba(255, 255, 0, '],
            subway: ['rgba(0, 255, 255, ', 'rgba(255, 255, 0, ', 'rgba(255, 0, 255, '],
            rain: ['rgba(0, 255, 255, ', 'rgba(0, 200, 255, ', 'rgba(0, 150, 255, '],
            flight: ['rgba(255, 0, 255, ', 'rgba(0, 255, 255, ', 'rgba(255, 255, 0, '],
            capture: ['rgba(255, 0, 0, ', 'rgba(150, 0, 0, ', 'rgba(200, 0, 0, ']
        };

        const colors = themes[this.theme] || themes.bar;
        return colors[Math.floor(Math.random() * colors.length)];
    }

    drawGrid() {
        this.ctx.save();
        this.ctx.strokeStyle = `rgba(0, 255, 255, 0.1)`;
        this.ctx.lineWidth = 1;

        const gridSize = 50;
        const offsetX = (this.time * 2) % gridSize;
        const offsetY = (this.time * 2) % gridSize;

        // Vertical lines
        for (let x = -gridSize + offsetX; x < this.canvas.width + gridSize; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        // Horizontal lines
        for (let y = -gridSize + offsetY; y < this.canvas.height + gridSize; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        this.ctx.restore();
    }

    drawShapes() {
        this.shapes.forEach((shape, index) => {
            this.ctx.save();

            // Perspective calculation
            const scale = 1000 / (1000 + shape.z);
            const x = this.canvas.width / 2 + (shape.x - this.canvas.width / 2) * scale;
            const y = this.canvas.height / 2 + (shape.y - this.canvas.height / 2) * scale;
            const size = shape.size * scale;

            // Pulse effect
            const pulse = Math.sin(this.time * 0.05 + shape.pulseOffset) * 0.3 + 0.7;
            const opacity = (0.3 + pulse * 0.3) * (1 - shape.z / 1000);

            // Move shapes forward (3D depth effect)
            shape.z -= 2;
            if (shape.z < 0) {
                shape.z = 1000;
                shape.x = Math.random() * this.canvas.width;
                shape.y = Math.random() * this.canvas.height;
                shape.color = this.getThemeColor();
            }

            // Update rotation
            shape.rotation += shape.rotationSpeed;

            // Draw shape with glow
            this.ctx.translate(x, y);
            this.ctx.rotate(shape.rotation);

            // Glow effect
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
            gradient.addColorStop(0, shape.color + opacity + ')');
            gradient.addColorStop(0.5, shape.color + (opacity * 0.5) + ')');
            gradient.addColorStop(1, shape.color + '0)');

            if (shape.type === 'rect') {
                // Draw rectangle
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(-size / 2, -size / 2, size, size);

                // Border
                this.ctx.strokeStyle = shape.color + (opacity * 0.8) + ')';
                this.ctx.lineWidth = 2 * scale;
                this.ctx.strokeRect(-size / 2, -size / 2, size, size);
            } else {
                // Draw circle
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                this.ctx.fill();

                // Border
                this.ctx.strokeStyle = shape.color + (opacity * 0.8) + ')';
                this.ctx.lineWidth = 2 * scale;
                this.ctx.stroke();
            }

            this.ctx.restore();
        });
    }

    drawScanlines() {
        this.ctx.save();
        const scanlineHeight = 3;
        const scanlineSpeed = 2;
        const offset = (this.time * scanlineSpeed) % (scanlineHeight * 2);

        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;

        for (let y = -scanlineHeight + offset; y < this.canvas.height; y += scanlineHeight * 2) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        this.ctx.restore();
    }

    drawLightShafts() {
        const numShafts = 5;

        for (let i = 0; i < numShafts; i++) {
            const angle = (this.time * 0.01 + i * (Math.PI * 2 / numShafts)) % (Math.PI * 2);
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            const length = Math.max(this.canvas.width, this.canvas.height);

            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(angle);

            const gradient = this.ctx.createLinearGradient(0, -50, 0, 50);
            gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
            gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.05)');
            gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, -50, length, 100);

            this.ctx.restore();
        }
    }

    drawHexagonPattern() {
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(255, 0, 255, 0.1)';
        this.ctx.lineWidth = 1;

        const hexSize = 40;
        const hexHeight = hexSize * Math.sqrt(3);
        const offsetX = (this.time * 0.5) % (hexSize * 1.5);
        const offsetY = (this.time * 0.5) % (hexHeight);

        for (let y = -hexHeight + offsetY; y < this.canvas.height + hexHeight; y += hexHeight) {
            for (let x = -hexSize * 2 + offsetX; x < this.canvas.width + hexSize * 2; x += hexSize * 1.5) {
                const xOffset = (y / hexHeight) % 2 === 0 ? 0 : hexSize * 0.75;
                this.drawHexagon(x + xOffset, y, hexSize);
            }
        }

        this.ctx.restore();
    }

    drawHexagon(x, y, size) {
        this.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + size * Math.cos(angle);
            const hy = y + size * Math.sin(angle);
            if (i === 0) {
                this.ctx.moveTo(hx, hy);
            } else {
                this.ctx.lineTo(hx, hy);
            }
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }

    animate() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.3)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw effects based on theme
        if (['bar', 'alley', 'rooftop'].includes(this.theme)) {
            this.drawGrid();
            this.drawLightShafts();
        }

        if (['mall', 'tunnels'].includes(this.theme)) {
            this.drawHexagonPattern();
        }

        if (['chase', 'flight', 'subway'].includes(this.theme)) {
            this.drawGrid();
            this.drawLightShafts();
        }

        // Always draw shapes and scanlines
        this.drawShapes();
        this.drawScanlines();

        this.time++;
    }
}

// Initialize visual effects when DOM loads
let visualEffects;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bgCanvas');
    visualEffects = new VisualEffects(canvas);

    // Animation loop
    function visualLoop() {
        visualEffects.animate();
        requestAnimationFrame(visualLoop);
    }
    visualLoop();
});
