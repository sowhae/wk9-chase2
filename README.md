# 🌃 CYBERPUNK CHASE - Interactive Story

An immersive, choice-driven interactive story set in a neon-soaked cyberpunk world. Experience a thrilling chase through a futuristic city with multiple branching paths and endings.

## 🎮 Features

- **Branching Narrative**: Your choices truly matter - multiple paths lead to different endings
- **3D Cyberpunk Visuals**: Dynamic particle effects, animated backgrounds, and neon aesthetics
- **4 Unique Endings**: Success, escape, capture, or the best ending - subway freedom
- **Multiple Scenes**:
  - 🍸 Neon Nightclub
  - 🏃 Alley Chase
  - 🏢 Rooftop Gardens
  - 🏪 Deserted Mall
  - 🚇 Subway Tunnels
  - ...and more!
- **Visual Effects**: Bloom, glow, particles, scanlines, and motion blur
- **Keyboard Shortcuts**: Press 1-9 to select choices, Ctrl+S to save, Ctrl+L to load
- **Auto-save**: Your progress is automatically saved

## 🚀 How to Play

1. Open `index.html` in a modern web browser
2. Make choices by clicking buttons or pressing number keys (1-9)
3. Experience different story branches based on your decisions
4. Try to find all 4 endings!

## 🎨 Visual Style

Inspired by **Cyberpunk 2077**, featuring:
- Neon pink and cyan color palette
- Holographic effects and glitch animations
- Rain-soaked streets and urban decay
- Flying drones and futuristic technology
- Particle systems (rain, sparks, smoke, neon dust)
- 3D depth effects with perspective

## 📖 Story Overview

You're caught in a confrontation at a neon-soaked nightclub. When security arrives, you must escape through the dangerous streets of a cyberpunk metropolis. Every choice you make determines your path through:

1. **The Bar** - Exit through the front or window?
2. **The Alley** - Climb to rooftops or slide under the gate?
3. **Urban Chase** - Jump across buildings or hide?
4. **The Mall** - Hide, fight, or escape through maintenance tunnels?
5. **Your Fate** - Multiple endings await...

## 🎯 Endings

- **Ending A**: Mall Escape - Slip away into the neon rain
- **Ending B**: Subway Freedom - The best ending, escape on a train
- **Ending C**: Rooftop Flight - Rescued by a mysterious hoverbike
- **Ending D**: Captured - Caught by authorities

## 🛠️ Technical Details

### Files Structure

```
├── index.html          # Main HTML structure
├── style.css           # Cyberpunk styling and animations
├── game.js             # Game logic and scene management
├── scenes.js           # All story scenes and branching paths
├── particles.js        # Particle effects system
├── visuals.js          # 3D background visual effects
└── desertedmall.png    # Reference image for mall scene
```

### Technologies Used

- **HTML5 Canvas**: For particle effects and 3D backgrounds
- **CSS3**: Advanced animations, glows, and cyberpunk styling
- **JavaScript (ES6+)**: Game logic and interactive systems
- **Local Storage**: Auto-save functionality

### Browser Compatibility

Works best in modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎮 Keyboard Controls

- **1-9**: Select choice by number
- **Ctrl+S**: Save game
- **Ctrl+L**: Load saved game
- **Click**: Select choices with mouse

## 🎬 Scene Flow Diagram

```
Bar Intro
├─ Front Door → Alley (Front)
│              ├─ Fire Escape → Rooftops
│              │               ├─ Jump → Mall
│              │               └─ Hide → Mall
│              └─ Gate → Back Alleys
│                        ├─ Light Cycle → Mall
│                        └─ Trash → Mall
└─ Window → Alley (Window)
            ├─ Fire Escape → Rooftops (same as above)
            └─ Gate → Back Alleys (same as above)

Mall (convergence point)
├─ Hide
│  ├─ Stay Still → ENDING A (Success)
│  └─ Panic → ENDING D (Caught)
├─ Fight
│  ├─ Quick Strike → ENDING C (Rooftop Flight)
│  └─ Defensive → ENDING D (Caught)
└─ Tunnels
   ├─ Go Deep → ENDING B (Subway - Best!)
   └─ Right Path → ENDING D (Caught)
```

## 🎨 Visual Themes

Each scene has unique visual effects:

| Scene | Theme | Effects |
|-------|-------|---------|
| Bar | Neon chaos | Smoke, neon particles, holograms |
| Alley | Rain chase | Rain, sparks, police lights |
| Rooftops | Urban heights | Dust, sparks, city glow |
| Mall | Abandoned | Dust particles, flickering lights |
| Tunnels | Underground | Steam, sparks, red emergency lights |
| Subway | Escape | Neon streaks, motion blur, speed |

## 🔧 Customization

You can modify the experience by editing:

- **scenes.js**: Add new scenes or modify existing story branches
- **style.css**: Change color schemes, add new animations
- **particles.js**: Adjust particle effects and densities
- **visuals.js**: Modify 3D background effects

## 📝 Credits

- **Concept**: Based on Cyberpunk 2077 aesthetic
- **Story Design**: Original branching narrative
- **Visual Effects**: Custom particle system and 3D canvas rendering
- **Reference Image**: desertedmall.png

## 🐛 Known Issues

- Performance may vary on older devices
- Best experienced on desktop/laptop screens
- Mobile support is functional but not optimized

## 🚀 Future Enhancements

Potential additions:
- Sound effects and ambient music
- More endings and secret paths
- Character customization
- Achievement system
- Multiplayer story branches
- WebGL/Three.js for enhanced 3D effects

## 📄 License

This is an educational/portfolio project. Feel free to use and modify!

---

**Made with 💜 and ⚡ in the cyberpunk future**