// Main Game Logic and Scene Management

class CyberpunkGame {
    constructor() {
        this.currentScene = null;
        this.gameHistory = [];
        this.isLoading = true;
        this.sceneRenderer = null;
        this.mallImage = null;

        // DOM elements
        this.sceneTitle = document.getElementById('sceneTitle');
        this.sceneDescription = document.getElementById('sceneDescription');
        this.choicesContainer = document.getElementById('choicesContainer');
        this.locationStatus = document.getElementById('locationStatus');
        this.loadingScreen = document.getElementById('loadingScreen');
        this.endingScreen = document.getElementById('endingScreen');
        this.endingTitle = document.getElementById('endingTitle');
        this.endingDescription = document.getElementById('endingDescription');
        this.restartButton = document.getElementById('restartButton');

        // Bind restart button
        this.restartButton.addEventListener('click', () => this.restart());

        // Initialize scene renderer
        this.initSceneRenderer();

        // Load mall image
        this.loadMallImage();
    }

    initSceneRenderer() {
        const canvas = document.getElementById('sceneCanvas');
        if (canvas && window.SceneRenderer) {
            this.sceneRenderer = new SceneRenderer(canvas);
            this.startSceneAnimation();
        }
    }

    loadMallImage() {
        this.mallImage = new Image();
        this.mallImage.src = 'desertedmall.png';
        this.mallImage.onload = () => {
            console.log('Mall image loaded successfully');
        };
        this.mallImage.onerror = () => {
            console.warn('Could not load mall image, using fallback');
        };
    }

    startSceneAnimation() {
        const animate = () => {
            if (this.sceneRenderer && this.currentScene) {
                // Render based on current scene theme
                const theme = this.currentScene.visualTheme;

                switch(theme) {
                    case 'bar':
                        this.sceneRenderer.renderBar();
                        break;
                    case 'alley':
                    case 'rain':
                        this.sceneRenderer.renderAlley();
                        break;
                    case 'rooftop':
                        this.sceneRenderer.renderRooftop();
                        break;
                    case 'mall':
                        this.sceneRenderer.renderMall(this.mallImage);
                        break;
                    case 'tunnels':
                    case 'chase':
                    case 'subway':
                    case 'flight':
                    case 'capture':
                        // For these themes, use alley renderer (can be customized later)
                        this.sceneRenderer.renderAlley();
                        break;
                    default:
                        this.sceneRenderer.renderBar();
                }
            }
            requestAnimationFrame(animate);
        };
        animate();
    }

    init() {
        // Simulate loading
        setTimeout(() => {
            this.hideLoading();
            this.loadScene('bar_intro');
        }, 2000);
    }

    hideLoading() {
        this.loadingScreen.style.opacity = '0';
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            this.isLoading = false;
        }, 500);
    }

    loadScene(sceneId) {
        const scene = SCENES[sceneId];
        if (!scene) {
            console.error(`Scene ${sceneId} not found!`);
            return;
        }

        this.currentScene = scene;
        this.gameHistory.push(sceneId);

        // Update visuals theme
        if (window.visualEffects) {
            visualEffects.setTheme(scene.visualTheme);
        }
        if (window.particleSystem) {
            particleSystem.setTheme(scene.visualTheme);
        }

        // Check if this is an ending
        if (scene.isEnding) {
            this.showEnding(scene);
            return;
        }

        // Update UI
        this.updateScene(scene);
    }

    updateScene(scene) {
        // Fade out
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.style.opacity = '0';

        setTimeout(() => {
            // Update content
            this.sceneTitle.textContent = scene.title;
            this.sceneDescription.innerHTML = this.formatDescription(scene.description);
            this.locationStatus.textContent = scene.location;

            // Clear and rebuild choices
            this.choicesContainer.innerHTML = '';
            scene.choices.forEach((choice, index) => {
                this.createChoiceButton(choice, index);
            });

            // Fade in
            gameContainer.style.opacity = '1';

            // Play sound effect (if we had audio)
            this.playSceneTransition();
        }, 300);
    }

    formatDescription(description) {
        // Convert plain text to formatted HTML
        return description
            .trim()
            .split('\n\n')
            .map(paragraph => `<p>${paragraph.trim()}</p>`)
            .join('');
    }

    createChoiceButton(choice, index) {
        const button = document.createElement('button');
        button.className = 'choice-btn fade-in';
        button.style.animationDelay = `${index * 0.1}s`;

        // Just the action text - game style
        button.textContent = choice.text;

        // Add hover sound effect
        button.addEventListener('mouseenter', () => {
            this.playHoverSound();
        });

        // Add click handler
        button.addEventListener('click', () => {
            this.playClickSound();
            this.makeChoice(choice);
        });

        this.choicesContainer.appendChild(button);
    }

    makeChoice(choice) {
        // Disable all buttons
        const buttons = this.choicesContainer.querySelectorAll('.choice-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        });

        // Flash effect
        this.flashScreen();

        // Load next scene after delay
        setTimeout(() => {
            this.loadScene(choice.nextScene);
        }, 500);
    }

    showEnding(scene) {
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.style.opacity = '0';

        setTimeout(() => {
            gameContainer.style.display = 'none';

            // Set ending content
            this.endingTitle.textContent = scene.title;
            this.endingDescription.innerHTML = this.formatDescription(scene.description);

            // Show ending screen
            this.endingScreen.style.display = 'flex';
            this.endingScreen.style.opacity = '0';

            setTimeout(() => {
                this.endingScreen.style.opacity = '1';
            }, 100);

            // Play ending sound
            this.playEndingSound(scene.endingType);
        }, 500);
    }

    restart() {
        // Fade out ending screen
        this.endingScreen.style.opacity = '0';

        setTimeout(() => {
            this.endingScreen.style.display = 'none';

            // Reset game state
            this.gameHistory = [];
            this.currentScene = null;

            // Show game container
            const gameContainer = document.getElementById('gameContainer');
            gameContainer.style.display = 'flex';
            gameContainer.style.opacity = '0';

            setTimeout(() => {
                gameContainer.style.opacity = '1';
                this.loadScene('bar_intro');
            }, 100);
        }, 500);
    }

    flashScreen() {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.background = 'rgba(0, 255, 255, 0.3)';
        flash.style.zIndex = '999';
        flash.style.pointerEvents = 'none';
        flash.style.animation = 'flash 0.3s ease-out';

        document.body.appendChild(flash);

        setTimeout(() => {
            document.body.removeChild(flash);
        }, 300);

        // Add flash animation to stylesheet dynamically
        if (!document.getElementById('flash-animation')) {
            const style = document.createElement('style');
            style.id = 'flash-animation';
            style.textContent = `
                @keyframes flash {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Sound effect placeholders (visual feedback instead)
    playSceneTransition() {
        console.log('🎵 Scene transition');
    }

    playHoverSound() {
        // Could add Web Audio API sound here
        console.log('🎵 Hover');
    }

    playClickSound() {
        console.log('🎵 Click');
    }

    playEndingSound(type) {
        console.log(`🎵 Ending: ${type}`);
    }

    // Debug method to view game tree
    getGameHistory() {
        return this.gameHistory;
    }

    // Save game state (could be localStorage)
    saveGame() {
        const saveData = {
            currentScene: this.currentScene?.id,
            history: this.gameHistory,
            timestamp: Date.now()
        };
        localStorage.setItem('cyberpunk_save', JSON.stringify(saveData));
        console.log('Game saved!');
    }

    // Load game state
    loadGame() {
        const saveData = localStorage.getItem('cyberpunk_save');
        if (saveData) {
            const data = JSON.parse(saveData);
            this.gameHistory = data.history;
            if (data.currentScene) {
                this.loadScene(data.currentScene);
            }
            console.log('Game loaded!');
            return true;
        }
        return false;
    }
}

// Initialize game when DOM is ready
let game;

document.addEventListener('DOMContentLoaded', () => {
    // Wait for all systems to be ready
    setTimeout(() => {
        game = new CyberpunkGame();
        game.init();

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Press 1-9 to select choices
            const num = parseInt(e.key);
            if (num >= 1 && num <= 9) {
                const buttons = document.querySelectorAll('.choice-btn');
                if (buttons[num - 1] && !buttons[num - 1].disabled) {
                    buttons[num - 1].click();
                }
            }

            // Press S to save
            if (e.key.toLowerCase() === 's' && e.ctrlKey) {
                e.preventDefault();
                game.saveGame();
            }

            // Press L to load
            if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
                e.preventDefault();
                game.loadGame();
            }
        });

        // Expose game to window for debugging
        window.game = game;

        console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   CYBERPUNK CHASE - Interactive Story                ║
║   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║                                                       ║
║   Keyboard Shortcuts:                                 ║
║   • Press 1-9 to select choices                      ║
║   • Ctrl+S to save game                              ║
║   • Ctrl+L to load game                              ║
║                                                       ║
║   Multiple paths. Multiple endings.                   ║
║   Your choices matter.                                ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
        `);
    }, 100);
});

// Add auto-save on scene change
window.addEventListener('beforeunload', () => {
    if (window.game && !window.game.isLoading) {
        window.game.saveGame();
    }
});
