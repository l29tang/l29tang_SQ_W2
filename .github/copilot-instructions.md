# Copilot Instructions for Week 2 Example 2: Platformer with Platforms Array

## Overview
This project demonstrates a platformer game using an array of platforms. The architecture is designed to facilitate easy addition and management of platforms, enhancing the gameplay experience.

## Key Components
- **Platforms Array**: Each platform is represented as an object with properties `x`, `y`, `w`, and `h`. This allows for dynamic management of platforms through a single array.
- **Collision Detection**: The game implements bounding box collision detection, allowing the player to land on platforms only when falling downwards.
- **Player Movement**: Utilizes `keyIsDown()` for smooth movement and `constrain()` to keep the player within the canvas boundaries.

## Developer Workflows
- **Running the Game**: Use a local server to run the `index.html` file. Ensure that the canvas is properly sized in the CSS for optimal gameplay.
- **Testing**: Test collision detection by adjusting platform positions in the `platforms` array and observing player interactions.

## Project Conventions
- **Array Management**: Platforms are stored in an array, allowing for easy iteration and modification. New platforms can be added by simply appending to the array.
- **CSS Styling**: Basic styles are applied to ensure the game canvas is centered and responsive. Modify the `style.css` for visual adjustments.

## Integration Points
- **External Dependencies**: This project does not rely on external libraries, making it lightweight and easy to run.
- **Cross-Component Communication**: The game logic in `sketch.js` directly manipulates the canvas based on the state defined in the platforms array.

## Examples
- To add a new platform, simply append an object to the `platforms` array:
  ```javascript
  platforms.push({ x: 200, y: 150, w: 100, h: 16 });
  ```
- For collision detection, ensure the player's downward velocity is checked before allowing landing on a platform:
  ```javascript
  if (vy >= 0 && playerIsAbove(platform)) {
      // Allow landing
  }
  ```

## Conclusion
These instructions should help AI agents understand the structure and functionality of the platformer game, enabling them to assist effectively in development tasks.