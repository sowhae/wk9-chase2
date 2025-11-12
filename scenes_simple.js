// SIMPLIFIED VISUAL-ONLY STORY - NO TEXT

const SCENES = {
    // SCENE 1: BAR - Chase starts
    bar_start: {
        id: 'bar_start',
        visualTheme: 'bar',
        choices: [
            {
                text: '',  // NO TEXT - visual only
                nextScene: 'chase_left',
                visual: 'left'
            },
            {
                text: '',
                nextScene: 'chase_straight',
                visual: 'straight'
            },
            {
                text: '',
                nextScene: 'chase_right',
                visual: 'right'
            }
        ]
    },

    // SCENE 2A: Chase - Left path
    chase_left: {
        id: 'chase_left',
        visualTheme: 'alley',
        choices: [
            {
                text: '',
                nextScene: 'ending_escape',
                visual: 'up'
            },
            {
                text: '',
                nextScene: 'ending_mall',
                visual: 'forward'
            },
            {
                text: '',
                nextScene: 'ending_caught',
                visual: 'down'
            }
        ]
    },

    // SCENE 2B: Chase - Straight path
    chase_straight: {
        id: 'chase_straight',
        visualTheme: 'rooftop',
        choices: [
            {
                text: '',
                nextScene: 'ending_escape',
                visual: 'left'
            },
            {
                text: '',
                nextScene: 'ending_mall',
                visual: 'forward'
            },
            {
                text: '',
                nextScene: 'ending_caught',
                visual: 'right'
            }
        ]
    },

    // SCENE 2C: Chase - Right path
    chase_right: {
        id: 'chase_right',
        visualTheme: 'alley',
        choices: [
            {
                text: '',
                nextScene: 'ending_escape',
                visual: 'jump'
            },
            {
                text: '',
                nextScene: 'ending_mall',
                visual: 'slide'
            },
            {
                text: '',
                nextScene: 'ending_caught',
                visual: 'hide'
            }
        ]
    },

    // ENDING 1: Escape
    ending_escape: {
        id: 'ending_escape',
        visualTheme: 'flight',
        isEnding: true,
        endingType: 'success'
    },

    // ENDING 2: Mall hideout
    ending_mall: {
        id: 'ending_mall',
        visualTheme: 'mall',
        isEnding: true,
        endingType: 'success'
    },

    // ENDING 3: Caught
    ending_caught: {
        id: 'ending_caught',
        visualTheme: 'capture',
        isEnding: true,
        endingType: 'failure'
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SCENES };
}
