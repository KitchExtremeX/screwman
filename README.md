# ScrewMan: Rise of the Rogue Machines — 16-bit Edition

An original, dependency-free browser action-platformer prototype. Artwork uses original indexed pixel sprites, tiled Canvas scenery, and a bitmap logo; all sounds and the temporary musical loop are synthesized locally. The supplied franchise screenshots and sprite sheet were not copied or incorporated.

## 16-bit presentation update

The game now renders at 560×315 with nearest-neighbor display scaling and pixel-snapped camera movement. Original indexed sprites use dark outlines, stepped metal highlights, four-frame walking poses and distinct enemy silhouettes. The facility has beveled tilework, reactor-window dithering, conduits and metal panels. A custom 5×7 bitmap alphabet labels the world; the title uses an original pixel logo. The HUD uses segmented meters and console-style panels. Original 120 BPM music combines pulse melody, triangle bass/arpeggios and shift-register noise percussion. This is a browser game with 16-bit-era styling, not a console ROM or hardware emulator.

The existing 14 system checks still pass after the conversion. Browser verification covers the new title, gameplay rendering and startup; the earlier full-playthrough limitation still applies.

## Run

Open `index.html` in a desktop browser; no installation is required. Alternatively run `npm start` from this folder, then visit http://127.0.0.1:4188. The server binds only to localhost. Run `npm test` for the automated checks. A keyboard is required; touch and gamepads are not implemented.

## Mission and systems

Traverse the maintenance chamber and conveyor floor, defeat three Clamp Crawlers, and recover module 01. Enter the reactor shaft, clear two enemy groups, and climb the platforms to module 02. In the security room, defeat three progressively harder mixed waves and survive the minimum 20-second lockdown to release module 03. All three modules and the completed security encounter are required to open the Central Foundry. Defeat ForgeMind Prime, then reach the extraction chamber on the far right within 35 seconds.

The player controller uses acceleration, deceleration, gravity, air steering, variable jump height, jump buffering, a short grace period after leaving a platform, crouching, one-way platform dropping, magnetic moving-platform support, and a short ground dash. Solid collision resolves each axis separately; standing from a crouch checks headroom. Falls cost health and return the player to the latest checkpoint. Four checkpoints restore minimum resources and preserve mission progress for checkpoint retries. Full restart resets the mission.

Torque builds through enemy damage, scrap salvage, and dashes performed near a telegraphed attack. The latter is a proximity-based evasion approximation. Quick Bolts cost no Torque. Holding fire for at least 0.48 seconds and releasing spends 20 Torque on a 42-damage Charged Spiral; normal bolts deal 12 before armor. The drill drains 22 Torque per second, continuously damages adjacent enemies, and breaks cracked machines. Rebound bolts consume ammunition and reflect once from solid geometry. Pickups restore 28 health, 24 Torque, or four rounds.

Clamp Crawlers patrol, turn near ledges, pursue at close range, telegraph a bite, and recover afterward. Prism Sentries track with a targeting line, fire three-projectile bursts, and take increased damage while cooling. Rivet Brutes approach slowly, resist frontal weak shots, telegraph a ground strike, launch low shockwaves, and expose their cores during recovery. Damage flashes, knockback, sparks, audio, and brief hit-stop provide feedback. Player invulnerability lasts 1.1 seconds after damage.

Encounters track living enemies by group. Reactor groups and security waves cannot advance while their current group has survivors. Temporary entrance barriers prevent retreat during lockdown. The HUD reports modules, objectives, wave/group, health, Torque, ammunition, boss phase, and extraction time.

ForgeMind Prime is a suspended industrial assembly system. It cycles through telegraphed molten rivets, a low mechanical sweep, and crawler assembly. Its processor takes damage only during exposed windows. Below 50% health it attacks faster, shortens exposure, adds radial projectiles, activates conveyor motion, and alternates hazardous floor sections. Defeat opens the extraction door and starts the countdown. Extraction wins; exhausted health or countdown loses. Result screens show kills, modules, elapsed time, and damage taken.

## Controls

| Action | Input |
| --- | --- |
| Move | A/D or Left/Right |
| Jump; release early for a shorter jump | Space |
| Crouch | S or Down |
| Drop through a thin platform | S/Down + Space |
| Ground dash | Shift |
| Quick Bolt | Tap J or left mouse |
| Charged Spiral | Hold J/left mouse, then release |
| Torque Drill | Hold K or right mouse |
| Rebound Bolt | E or L |
| Pause / resume | Escape or pause button |
| Mute | Sound button below game |

## Verification report

Fourteen automated checks pass in Node using the actual game systems with stubbed DOM/Canvas/audio surfaces. They verify:

1. Running, crouching/standing, dash, variable jumping, landing, and locked-wall collision.
2. Moving-platform carry and dropping through one-way platforms.
3. Quick Bolt projectile collision and damage against each enemy type.
4. Charged Spiral Torque cost and increased damage.
5. Drill damage and machinery destruction.
6. A Rebound Bolt reflecting from a solid wall.
7. Crawler detection, a delayed attack, damage, and protection against immediate repeated damage.
8. Correct health, scrap, and ammunition pickup amounts.
9. All three module collection counters and the three-module gate condition.
10. Wave advancement blocked by living enemies; completion after the third wave and lockdown timer.
11. Boss shield, phase-two transition, boss defeat, extraction activation, and victory trigger.
12. Health/countdown defeat, checkpoint recovery, and full mission reset.
13. Camera bounds and renderer execution across rooms and boss states.
14. Physical reachability of the three ascending reactor platform jumps using player movement and gravity.

Browser checks: title screen, deployment, rendered gameplay and HUD, keyboard event handling, pause/resume menu and restart control, and browser console inspection. No browser errors or warnings were recorded during these checks.

**A continuous unassisted starting-area-to-extraction playthrough has not been completed. This is a playable prototype, not a fully validated complete game.** System tests intentionally arrange states to isolate behavior; they are not evidence of a full playthrough. Difficulty, long-session robustness, all combat telegraph timings under real play, all possible collision edge cases, subjective audio quality, and other browsers remain unverified.

## Known limitations

- Procedural placeholder art and minimal pose animation; destruction uses particles rather than authored sprite sequences. Victory/defeat presentation is primarily the results overlay.
- No touch controls, gamepad, rebinding, persistent save, or accessibility mode for the Canvas gameplay. Menus use native buttons.
- Checkpoint state persists only within the open page. Reloading starts over.
- Shots travel horizontally; reaching hovering enemies requires platform positioning and jumping. Rebound shots reverse direction once rather than supporting angled aim.
- The reactor module can be collected before both groups are defeated, but its exit remains locked until both groups are cleared.
- Scrap/health/ammunition drops follow a deterministic rotation rather than random chance, keeping resource availability reproducible.
- Enemy logic is intentionally compact, with procedural tell/cooldown states. Brute shield damage reduction and boss exposure windows may need tuning after a full playthrough.

## Project structure

| File | Responsibility |
| --- | --- |
| `index.html`, `style.css` | Game shell, preflight controls, HUD, menus, presentation |
| `js/config.js` | Tunable movement, weapons, enemies, waves, boss and countdown |
| `js/player.js` | Movement controller, player health and damage |
| `js/combat.js` | Player weapons, projectiles, enemy health, pickups |
| `js/enemies.js` | Enemy state machines, attacks, ForgeMind Prime |
| `js/level.js` | Geometry, hazards, moving platforms, doors, solid collision |
| `js/progression.js` | Modules, encounters, waves, checkpoints, debris, extraction |
| `js/pixel-art.js`, `js/pixel-font.js` | Indexed sprites and original bitmap alphabet |
| `assets/logo.svg`, `build-art.cjs` | Pixel logo and reproducible local generator |
| `js/render.js` | Original procedural artwork, camera rendering and visual effects |
| `js/audio.js` | Synthesized sound effects and temporary music |
| `js/game.js` | Input, game states, save/restore, camera follow and HUD |
| `serve.cjs`, `package.json` | Optional local server and commands |
| `tests.cjs` | Reproducible system verification |

## Three next improvements

1. Add a Torque-powered magnetic grapple with optional aerial routes.
2. Add branching salvage rooms with risk/reward encounters and optional modules.
3. Add another industrial boss built around press timing and movable cover, alongside a complete playthrough-driven balance pass.
