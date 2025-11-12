// INTERACTIVE VIDEO GAME - Click on objects to interact

class InteractiveGame {
    constructor() {
        this.canvas = document.getElementById('sceneCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentScene = 'bar';
        this.images = {};
        this.hotspots = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.hoveredHotspot = null;

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.handleClick(e));

        this.loadImages();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    loadImages() {
        const imageList = ['desertedmall.png'];
        let loaded = 0;

        imageList.forEach(src => {
            const img = new Image();
            img.onload = () => {
                this.images[src] = img;
                loaded++;
                if (loaded === imageList.length) {
                    this.start();
                }
            };
            img.src = src;
        });
    }

    start() {
        this.loadScene('bar');
        this.animate();
    }

    loadScene(sceneId) {
        this.currentScene = sceneId;
        this.hotspots = [];

        switch(sceneId) {
            case 'bar':
                this.createBarScene();
                break;
            case 'alley':
                this.createAlleyScene();
                break;
            case 'mall':
                this.createMallScene();
                break;
            case 'escape':
                this.createEscapeScene();
                break;
        }
    }

    createBarScene() {
        // Clickable areas in the bar
        this.hotspots = [
            {
                x: this.canvas.width * 0.1,
                y: this.canvas.height * 0.5,
                width: 200,
                height: 150,
                label: 'EXIT LEFT',
                action: () => this.loadScene('alley'),
                color: '#ff00ff'
            },
            {
                x: this.canvas.width * 0.45,
                y: this.canvas.height * 0.3,
                width: 200,
                height: 150,
                label: 'WINDOW',
                action: () => this.loadScene('alley'),
                color: '#00ffff'
            },
            {
                x: this.canvas.width * 0.8,
                y: this.canvas.height * 0.5,
                width: 200,
                height: 150,
                label: 'EXIT RIGHT',
                action: () => this.loadScene('alley'),
                color: '#ffff00'
            }
        ];
    }

    createAlleyScene() {
        this.hotspots = [
            {
                x: this.canvas.width * 0.15,
                y: this.canvas.height * 0.4,
                width: 180,
                height: 200,
                label: 'LADDER UP',
                action: () => this.loadScene('mall'),
                color: '#00ffff'
            },
            {
                x: this.canvas.width * 0.5,
                y: this.canvas.height * 0.6,
                width: 250,
                height: 150,
                label: 'RUN FORWARD',
                action: () => this.loadScene('mall'),
                color: '#ff00ff'
            },
            {
                x: this.canvas.width * 0.8,
                y: this.canvas.height * 0.5,
                width: 180,
                height: 180,
                label: 'DOOR',
                action: () => this.loadScene('mall'),
                color: '#ffff00'
            }
        ];
    }

    createMallScene() {
        // Use actual mall image
        this.hotspots = [
            {
                x: this.canvas.width * 0.2,
                y: this.canvas.height * 0.6,
                width: 220,
                height: 200,
                label: 'HIDE HERE',
                action: () => this.loadScene('escape'),
                color: '#00ff00'
            },
            {
                x: this.canvas.width * 0.5,
                y: this.canvas.height * 0.4,
                width: 250,
                height: 180,
                label: 'ESCALATOR',
                action: () => this.loadScene('escape'),
                color: '#00ffff'
            },
            {
                x: this.canvas.width * 0.75,
                y: this.canvas.height * 0.7,
                width: 200,
                height: 150,
                label: 'EXIT',
                action: () => this.loadScene('escape'),
                color: '#ff00ff'
            }
        ];
    }

    createEscapeScene() {
        // Ending - show restart
        this.hotspots = [
            {
                x: this.canvas.width * 0.5 - 100,
                y: this.canvas.height * 0.8,
                width: 200,
                height: 80,
                label: 'RESTART',
                action: () => this.loadScene('bar'),
                color: '#ffff00'
            }
        ];
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;

        // Check hotspot hover
        this.hoveredHotspot = null;
        for (let hotspot of this.hotspots) {
            if (this.isPointInHotspot(this.mouseX, this.mouseY, hotspot)) {
                this.hoveredHotspot = hotspot;
                this.canvas.style.cursor = 'pointer';
                return;
            }
        }
        this.canvas.style.cursor = 'default';
    }

    handleClick(e) {
        if (this.hoveredHotspot) {
            this.hoveredHotspot.action();
        }
    }

    isPointInHotspot(x, y, hotspot) {
        return x >= hotspot.x && x <= hotspot.x + hotspot.width &&
               y >= hotspot.y && y <= hotspot.y + hotspot.height;
    }

    drawScene() {
        // Clear
        this.ctx.fillStyle = '#0a0a0f';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        switch(this.currentScene) {
            case 'bar':
                this.drawBar();
                break;
            case 'alley':
                this.drawAlley();
                break;
            case 'mall':
                this.drawMall();
                break;
            case 'escape':
                this.drawEscape();
                break;
        }

        // Draw hotspots
        this.drawHotspots();
    }

    drawBar() {
        // Neon bar environment
        this.ctx.fillStyle = '#1a0a2a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Floor
        this.ctx.fillStyle = '#2a1a3a';
        this.ctx.fillRect(0, this.canvas.height * 0.7, this.canvas.width, this.canvas.height * 0.3);

        // Neon signs
        this.drawNeonText('CLUB NEXUS', this.canvas.width * 0.5, 80, 48, '#ff00ff');

        // Bar counter
        this.ctx.fillStyle = '#4a3a5a';
        this.ctx.fillRect(this.canvas.width * 0.3, this.canvas.height * 0.6, this.canvas.width * 0.4, 100);

        // Glowing bottles
        for (let i = 0; i < 8; i++) {
            const x = this.canvas.width * 0.35 + i * 60;
            const y = this.canvas.height * 0.55;
            const glow = this.ctx.createRadialGradient(x, y, 0, x, y, 30);
            glow.addColorStop(0, i % 2 ? '#00ffff' : '#ff00ff');
            glow.addColorStop(1, 'transparent');
            this.ctx.fillStyle = glow;
            this.ctx.fillRect(x - 30, y - 30, 60, 60);
        }
    }

    drawAlley() {
        // Dark alley
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0a0a1f');
        gradient.addColorStop(1, '#000510');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Buildings
        this.ctx.fillStyle = '#050510';
        this.ctx.fillRect(0, 0, this.canvas.width * 0.3, this.canvas.height);
        this.ctx.fillRect(this.canvas.width * 0.7, 0, this.canvas.width * 0.3, this.canvas.height);

        // Neon signs
        this.drawNeonText('RAMEN', this.canvas.width * 0.15, 200, 36, '#ff00ff');
        this.drawNeonText('24/7', this.canvas.width * 0.85, 300, 36, '#00ffff');

        // Ground
        this.ctx.fillStyle = '#0a0a15';
        this.ctx.fillRect(0, this.canvas.height * 0.8, this.canvas.width, this.canvas.height * 0.2);

        // Rain effect
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * this.canvas.width;
            const y = (Date.now() * 0.5 + i * 40) % this.canvas.height;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + 2, y + 15);
            this.ctx.stroke();
        }
    }

    drawMall() {
        // Draw actual mall image
        const img = this.images['desertedmall.png'];
        if (img) {
            const scale = Math.max(this.canvas.width / img.width, this.canvas.height / img.height);
            const x = (this.canvas.width - img.width * scale) / 2;
            const y = (this.canvas.height - img.height * scale) / 2;
            this.ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

            // Cyberpunk overlay
            this.ctx.fillStyle = 'rgba(0, 255, 255, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    drawEscape() {
        // Success screen - visual only
        this.ctx.fillStyle = '#0a0514';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Neon success glow
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const glow = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300);
        glow.addColorStop(0, 'rgba(0, 255, 0, 0.3)');
        glow.addColorStop(1, 'transparent');
        this.ctx.fillStyle = glow;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawHotspots() {
        for (let hotspot of this.hotspots) {
            const isHovered = hotspot === this.hoveredHotspot;

            // Hotspot glow
            const glow = this.ctx.createRadialGradient(
                hotspot.x + hotspot.width / 2,
                hotspot.y + hotspot.height / 2,
                0,
                hotspot.x + hotspot.width / 2,
                hotspot.y + hotspot.height / 2,
                Math.max(hotspot.width, hotspot.height)
            );

            if (isHovered) {
                glow.addColorStop(0, hotspot.color + 'aa');
                glow.addColorStop(0.5, hotspot.color + '66');
                glow.addColorStop(1, hotspot.color + '00');
            } else {
                glow.addColorStop(0, hotspot.color + '44');
                glow.addColorStop(0.5, hotspot.color + '22');
                glow.addColorStop(1, hotspot.color + '00');
            }

            this.ctx.fillStyle = glow;
            this.ctx.fillRect(hotspot.x - 20, hotspot.y - 20, hotspot.width + 40, hotspot.height + 40);

            // Border
            this.ctx.strokeStyle = isHovered ? hotspot.color + 'ff' : hotspot.color + '88';
            this.ctx.lineWidth = isHovered ? 4 : 2;
            this.ctx.strokeRect(hotspot.x, hotspot.y, hotspot.width, hotspot.height);

            // Pulsing effect when hovered
            if (isHovered) {
                const pulse = Math.sin(Date.now() * 0.005) * 10 + 10;
                this.ctx.strokeStyle = hotspot.color + '44';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(
                    hotspot.x - pulse,
                    hotspot.y - pulse,
                    hotspot.width + pulse * 2,
                    hotspot.height + pulse * 2
                );
            }
        }
    }

    drawNeonText(text, x, y, size, color) {
        this.ctx.font = `bold ${size}px monospace`;
        this.ctx.textAlign = 'center';

        // Glow
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = color;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);

        // Reset shadow
        this.ctx.shadowBlur = 0;
    }

    animate() {
        this.drawScene();
        requestAnimationFrame(() => this.animate());
    }
}

// Start game when loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Start interactive game
    new InteractiveGame();
});
