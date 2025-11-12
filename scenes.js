// Story Scenes and Branching Narrative Structure

const SCENES = {
    // SCENE 1 - CYBERPUNK BAR
    bar_intro: {
        id: 'bar_intro',
        title: 'NEON NIGHTCLUB',
        location: 'Downtown - Club Nexus',
        description: `
            The bass throbs through your chest as holographic dancers flicker and glitch in mid-air.
            Glass tables pulse with internal LEDs in sync with the music.
            Vapor and fog swirl through laser beams cutting across the packed dance floor.

            Screens loop advertisements for the latest cybernetic implants:
            "UPGRADE YOUR REALITY. NEURAL-LINK 3.0."

            Suddenly, a confrontation erupts near the bar. Someone shouts your name.
            The music cuts to distorted static. Red alarms flash.
            Security drones descend from the ceiling.

            A bouncer shoves you toward the exit. You need to leave. NOW.
        `,
        visualTheme: 'bar',
        choices: [
            {
                text: 'Exit Through Front Door',
                hint: 'Straight into neon alley - direct but exposed',
                nextScene: 'alley_front',
                visual: 'door'
            },
            {
                text: 'Jump Out Broken Window',
                hint: 'Land in back courtyard - risky but unexpected',
                nextScene: 'alley_window',
                visual: 'window'
            }
        ]
    },

    // SCENE 2A - ALLEY (FRONT DOOR PATH)
    alley_front: {
        id: 'alley_front',
        title: 'NEON ALLEY - MAIN STREET',
        location: 'Downtown - Back Alley',
        description: `
            You burst through the front door into the rain-soaked alley.
            Neon signs reflect off wet pavement in streaks of pink and cyan.

            Flying police drones swoop overhead, their blue and red strobes cutting through the fog.
            "HALT! YOU ARE UNDER SURVEILLANCE!"

            Bounty hunters emerge from the shadows, megaphones crackling:
            "THERE! DON'T LET THEM GET AWAY!"

            Sparks rain from severed electrical wires. Steam vents hiss.
            The alley splits ahead - you have seconds to decide.
        `,
        visualTheme: 'alley',
        choices: [
            {
                text: 'Climb Fire Escape',
                hint: 'Blue neon ladder - leads to rooftops',
                nextScene: 'rooftops',
                visual: 'ladder'
            },
            {
                text: 'Slide Under Gate',
                hint: 'Sparking gate closing in slow motion',
                nextScene: 'back_alleys',
                visual: 'gate'
            }
        ]
    },

    // SCENE 2B - ALLEY (WINDOW PATH)
    alley_window: {
        id: 'alley_window',
        title: 'BACK COURTYARD',
        location: 'Downtown - Service Area',
        description: `
            You crash through the window, glass shattering around you.
            You land hard in a back courtyard surrounded by dumpsters and broken crates.

            The smell of burning plastic and ozone fills the air.
            A broken neon sign flickers: "WA---Y OU-"

            Police drones circle overhead, searchlights sweeping the ground.
            You hear boots pounding on metal grating.

            The courtyard has two exits - both dangerous.
        `,
        visualTheme: 'alley',
        choices: [
            {
                text: 'Climb Fire Escape',
                hint: 'Rusty ladder glowing with blue strips',
                nextScene: 'rooftops',
                visual: 'ladder'
            },
            {
                text: 'Slide Under Gate',
                hint: 'Service gate sparking with electricity',
                nextScene: 'back_alleys',
                visual: 'gate'
            }
        ]
    },

    // SCENE 3A - ROOFTOPS PATH
    rooftops: {
        id: 'rooftops',
        title: 'ROOFTOP GARDENS',
        location: 'Downtown - 15 Stories Up',
        description: `
            You scramble up the fire escape, three steps at a time.
            Your lungs burn as you reach the rooftop.

            Abandoned rooftop gardens stretch before you, overrun by mutant weeds.
            Solar panels flicker with broken LEDs, casting erratic shadows.
            A giant holographic advertisement screen dominates the skyline:
            "LIVE FOREVER. NEURAL BACKUP AVAILABLE."

            Behind you, boots clang on metal. They're coming.
            Ahead, the next building is 15 feet away.
        `,
        visualTheme: 'rooftop',
        choices: [
            {
                text: 'Leap to Next Roof',
                hint: 'Big cinematic jump - risky but fast',
                nextScene: 'rooftop_jump',
                visual: 'jump'
            },
            {
                text: 'Duck Behind AC Units',
                hint: 'Hide and wait - guards may search',
                nextScene: 'rooftop_hide',
                visual: 'hide'
            }
        ]
    },

    // SCENE 3A-1 - ROOFTOP JUMP
    rooftop_jump: {
        id: 'rooftop_jump',
        title: 'THE LEAP',
        location: 'Downtown - Airborne',
        description: `
            You take a running start.
            Time seems to slow as you launch yourself into the void.

            The city spreads below you - a sea of neon and chrome.
            Wind whips past your face.

            You land hard on the opposite roof, rolling to absorb the impact.
            Behind you, the guards stop at the edge. Too scared to jump.

            But more drones are converging. You spot an entrance to an old mall below.
        `,
        visualTheme: 'rooftop',
        choices: [
            {
                text: 'Enter The Mall',
                hint: 'Crash through skylight into deserted mall',
                nextScene: 'mall_entrance',
                visual: 'door'
            }
        ]
    },

    // SCENE 3A-2 - ROOFTOP HIDE
    rooftop_hide: {
        id: 'rooftop_hide',
        title: 'HIDING IN SHADOWS',
        location: 'Downtown - Behind AC Unit',
        description: `
            You duck behind a massive air conditioning unit.
            The rusted metal is warm, humming with a low vibration.

            Guards burst onto the roof, their flashlights cutting through the fog.
            "Search everywhere! They couldn't have gone far!"

            You hold your breath. A guard walks past, inches away.
            His radio crackles: "Unit 5, report."
            "Nothing here. Moving to adjacent building."

            They leave. You wait five more minutes before moving.
            Below, you spot a broken skylight leading into an abandoned mall.
        `,
        visualTheme: 'rooftop',
        choices: [
            {
                text: 'Enter The Mall',
                hint: 'Lower yourself through broken skylight',
                nextScene: 'mall_entrance',
                visual: 'door'
            }
        ]
    },

    // SCENE 3B - BACK ALLEYS PATH
    back_alleys: {
        id: 'back_alleys',
        title: 'SERVICE CORRIDORS',
        location: 'Underground - Maintenance Tunnels',
        description: `
            You slide under the sparking gate just as it slams shut.
            The narrow tunnel ahead is barely wide enough to move through.

            Glitching vending machines line the walls, displays showing corrupted images.
            "B-BUY C-C-COLA... ERROR... ERROR..."

            Broken neon tubes spark overhead, casting flickering shadows.
            Water drips from rusted pipes.

            Ahead, you see a parked light-cycle and a pile of trash cans.
            Behind you, they're trying to cut through the gate.
        `,
        visualTheme: 'alley',
        choices: [
            {
                text: 'Steal Light-Cycle',
                hint: 'Quick motorcycle chase through tunnels',
                nextScene: 'cycle_chase',
                visual: 'vehicle'
            },
            {
                text: 'Throw Trash Cans',
                hint: 'Block pursuit - slow but quiet',
                nextScene: 'trash_block',
                visual: 'block'
            }
        ]
    },

    // SCENE 3B-1 - LIGHT CYCLE CHASE
    cycle_chase: {
        id: 'cycle_chase',
        title: 'LIGHT-CYCLE CHASE',
        location: 'Underground - High Speed',
        description: `
            You jump on the light-cycle. It roars to life, neon trails blazing behind you.

            The narrow tunnels blur as you accelerate.
            Warning signs flash: "MAX SPEED 20 MPH"
            You're doing 80.

            Behind you, pursuit drones struggle to keep up.
            You lean into a sharp turn, sparks flying from the bike's body.

            Ahead, a ramp leads up and out - into an abandoned shopping mall.
        `,
        visualTheme: 'chase',
        choices: [
            {
                text: 'Take The Ramp',
                hint: 'Crash into deserted mall',
                nextScene: 'mall_entrance',
                visual: 'ramp'
            }
        ]
    },

    // SCENE 3B-2 - TRASH BLOCK
    trash_block: {
        id: 'trash_block',
        title: 'DEFENSIVE MANEUVER',
        location: 'Underground - Service Corridor',
        description: `
            You grab trash cans and hurl them behind you.
            Metal crashes against metal. Garbage spills everywhere.

            You hear cursing and radio chatter:
            "Path is blocked! Going around!"

            You've bought yourself time. You run deeper into the tunnels.
            The corridor opens up into a larger space.

            Through a broken wall, you see the interior of an old mall.
            Dead escalators. Shattered glass. Perfect hiding spot.
        `,
        visualTheme: 'alley',
        choices: [
            {
                text: 'Enter The Mall',
                hint: 'Slip through broken wall',
                nextScene: 'mall_entrance',
                visual: 'door'
            }
        ]
    },

    // SCENE 4 - DESERTED MALL (MAJOR CHOICE POINT)
    mall_entrance: {
        id: 'mall_entrance',
        title: 'DESERTED MALL',
        location: 'Shopping District - Abandoned',
        description: `
            You step into the abandoned mall. The silence is eerie after the chase.

            Dead escalators stretch up into darkness.
            Shattered glass crunches under your feet.
            Neon signs flicker on and off: "SA-- 50% -FF" "CL-SED FOR-VER"

            A hologram mall directory glitches in the center:
            "WELC-ME TO... ERROR... PARADISE SH-PPING CENTER"

            Dust swirls in beams of light from broken skylights.
            Leaves have blown in through shattered windows.
            Your footsteps echo through empty storefronts.

            Then you hear it: boots. Lots of them. They found the entrance.
            You have seconds to decide.
        `,
        visualTheme: 'mall',
        choices: [
            {
                text: 'Hide Behind Mannequins',
                hint: 'Stealth approach - stay perfectly still',
                nextScene: 'mall_hide',
                visual: 'hide'
            },
            {
                text: 'Grab Neon Sign - FIGHT',
                hint: 'Aggressive approach - improvised weapon',
                nextScene: 'mall_fight',
                visual: 'fight'
            },
            {
                text: 'Escape Through Maintenance',
                hint: 'Tactical retreat - find another way',
                nextScene: 'mall_tunnels',
                visual: 'door'
            }
        ]
    },

    // SCENE 4A - HIDE PATH
    mall_hide: {
        id: 'mall_hide',
        title: 'FROZEN IN PLACE',
        location: 'Clothing Store - Among The Mannequins',
        description: `
            You duck into an abandoned clothing store.
            Mannequins stand in frozen poses, some missing limbs.
            Their eyes seem to glow with residual neon.

            You position yourself among them, perfectly still.

            Guards enter the mall. Flashlights sweep across the store.
            "Check every corner!"

            A beam passes over your face. You don't breathe.
            The mannequin next to you has a cracked face, forever smiling.

            Seconds feel like hours.
        `,
        visualTheme: 'mall',
        choices: [
            {
                text: 'Stay Perfectly Still',
                hint: 'Test your nerves - don\'t move',
                nextScene: 'ending_a_success',
                visual: 'wait'
            },
            {
                text: 'Panic and Run',
                hint: 'Lose your nerve',
                nextScene: 'ending_d_caught',
                visual: 'run'
            }
        ]
    },

    // SCENE 4B - FIGHT PATH
    mall_fight: {
        id: 'mall_fight',
        title: 'IMPROVISED COMBAT',
        location: 'Mall Atrium - Center Stage',
        description: `
            You rip a broken neon sign from the wall.
            It buzzes with electricity, sparking in your hands.
            "WELCO-E TO P-RADISE"

            The first guard rounds the corner.
            "There! Take them—"

            You swing. The sign connects. Sparks explode.
            The guard crumples. His drone fires but misses.

            You spin, using the sign to short out the drone.
            It spirals down, crashing into a fountain.

            More are coming. You spot a broken skylight above.
        `,
        visualTheme: 'mall',
        choices: [
            {
                text: 'Quick Strike - Escape Up',
                hint: 'Aggressive combo to reach skylight',
                nextScene: 'ending_c_rooftop',
                visual: 'attack'
            },
            {
                text: 'Defensive Stance',
                hint: 'Try to hold them off',
                nextScene: 'fight_fail',
                visual: 'defend'
            }
        ]
    },

    // SCENE 4B-1 - FIGHT SUCCESS
    fight_fail: {
        id: 'fight_fail',
        title: 'OVERWHELMED',
        location: 'Mall Atrium - Surrounded',
        description: `
            You take a defensive stance, but there are too many.

            More guards pour in from every entrance.
            Drones descend from above.
            Red targeting lasers paint your chest.

            Your improvised weapon sparks one last time, then dies.

            "Drop it. Now."

            You're surrounded. Nowhere to run.
        `,
        visualTheme: 'mall',
        choices: [
            {
                text: 'Surrender',
                hint: 'It\'s over',
                nextScene: 'ending_d_caught',
                visual: 'surrender'
            }
        ]
    },

    // SCENE 4C - TUNNELS PATH
    mall_tunnels: {
        id: 'mall_tunnels',
        title: 'MAINTENANCE TUNNELS',
        location: 'Below The Mall - Service Level',
        description: `
            You find a maintenance door and slip through.

            Steam pipes line the ceiling, hissing and dripping.
            Flickering red emergency lights cast everything in crimson.
            Warning signs: "AUTHORIZED PERSONNEL ONLY"

            You hear the guards searching above.
            "Check the stores! They couldn't have gone far!"

            The tunnel splits: left leads deeper down, right leads to a dead end...
            or does it?
        `,
        visualTheme: 'tunnels',
        choices: [
            {
                text: 'Go Deeper - Follow Steam Pipes',
                hint: 'Trust your instincts - might lead to subway',
                nextScene: 'ending_b_subway',
                visual: 'tunnel'
            },
            {
                text: 'Take Right Path',
                hint: 'Looks like a dead end',
                nextScene: 'tunnel_dead_end',
                visual: 'deadend'
            }
        ]
    },

    // SCENE 4C-1 - DEAD END
    tunnel_dead_end: {
        id: 'tunnel_dead_end',
        title: 'DEAD END',
        location: 'Maintenance Tunnels - Blocked',
        description: `
            You take the right path.

            It leads to a solid wall. No exit. Just old pipes and rust.
            A sign: "SECTION CONDEMNED - NO OUTLET"

            Behind you, you hear footsteps in the tunnel.
            They found the maintenance entrance.

            "End of the line."

            Flashlights pin you against the wall.
        `,
        visualTheme: 'tunnels',
        choices: [
            {
                text: 'Accept Capture',
                hint: 'There\'s no escape',
                nextScene: 'ending_d_caught',
                visual: 'surrender'
            }
        ]
    },

    // ENDINGS
    ending_a_success: {
        id: 'ending_a_success',
        title: 'ESCAPE - MALL EXIT',
        location: 'Outside - Freedom',
        description: `
            You hold your breath. Don't move. Don't blink.

            The guard's flashlight passes over you one more time.
            "Nothing here. Just creepy mannequins."

            They move on. You wait five more minutes.
            Then ten.

            Finally, you hear them leaving: "Target must have gone another way."

            When you're certain they're gone, you slip through an emergency exit.

            Outside, neon rain pours down.
            Police drones search the skies above, but you're already moving.
            You blend into the crowd on the street.

            Another night in the city. Another escape.
            For now, you're free.
        `,
        visualTheme: 'rain',
        isEnding: true,
        endingType: 'success'
    },

    ending_b_subway: {
        id: 'ending_b_subway',
        title: 'ESCAPE - SUBWAY FREEDOM',
        location: 'Underground - Rail System',
        description: `
            You follow the steam pipes deeper into the darkness.
            The tunnel slopes downward.

            Suddenly, you hear it: the rumble of a train.

            The maintenance tunnel opens onto an abandoned subway platform.
            Neon graffiti covers the walls: "THE FUTURE IS NOW" "RESIST THE SYSTEM"

            A subway train approaches, its headlights cutting through the darkness.
            Neon advertisements flicker on its sides.

            You run and leap onto the roof of the train as it passes.
            Wind whips past you as it accelerates.

            Through broken sections of the tunnel, you glimpse the city lights.
            They blur into streaks of color - pink, cyan, yellow.

            You hold on tight as the train rockets through the underground.
            Where it's going, you don't know.

            But you're free. And that's all that matters.
        `,
        visualTheme: 'subway',
        isEnding: true,
        endingType: 'best'
    },

    ending_c_rooftop: {
        id: 'ending_c_rooftop',
        title: 'ESCAPE - ROOFTOP FLIGHT',
        location: 'Above The City - Skyline',
        description: `
            You swing the neon sign in a wide arc, sparks flying.
            Guards stumble back.

            You sprint and leap, grabbing the edge of the broken skylight.
            Glass cuts your hands but you pull yourself up.

            You're on the roof of the mall.
            The city spreads before you - an ocean of lights and steel.

            Below, you hear shouting: "They're on the roof! Send the drones!"

            You run across neon billboards and advertisements.
            "UPGRADE YOUR LIFE" "NEURAL-SYNC AVAILABLE NOW"

            A shadow passes overhead.
            A hoverbike descends, piloted by someone in a reflective helmet.
            They gesture urgently: "GET ON!"

            You leap onto the back of the bike.
            It shoots upward, leaving the pursuit behind.

            As you soar through the neon canyons, you wonder:
            Who was that? And what do they want?

            But for now, you're alive. You're free.

            The night belongs to you.
        `,
        visualTheme: 'flight',
        isEnding: true,
        endingType: 'success'
    },

    ending_d_caught: {
        id: 'ending_d_caught',
        title: 'CAPTURED',
        location: 'Unknown',
        description: `
            The guards close in from all sides.
            Red targeting lasers paint your body.
            Drones hover overhead, weapons armed.

            "Don't move!"

            You raise your hands slowly.

            Neon cuffs lock around your wrists.
            They glow blue, then red, syncing with police networks.

            One of the guards speaks into their radio:
            "Target secured. Bringing them in."

            As they lead you away, the neon lights of the city blur.
            The last thing you see is a holographic advertisement:
            "RESISTANCE IS FUTILE. COMPLIANCE IS MANDATORY."

            The screen glitches.

            Everything cuts to black.

            >>> NEURAL LINK SEVERED
            >>> MEMORY WIPE INITIATED
            >>> SUBJECT DESIGNATION: UNKNOWN
            >>> STATUS: CAPTURED
        `,
        visualTheme: 'capture',
        isEnding: true,
        endingType: 'failure'
    }
};

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SCENES };
}
