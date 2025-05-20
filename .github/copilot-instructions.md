# Those Shape Things - Copilot Instructions

## Tech Stack
- P5.js (via p5js-wrapper ^1.2.3)
- Vanilla JavaScript
- Vite ^2.7.2 for building
- HTML/CSS

## Project Overview
This is a creative coding project that generates tile-based patterns with various geometric shapes, inspired by the work of Lee Doughty. The project creates visual compositions using different drawing techniques.

## Important Note on P5.js Mode
This project will be using P5.js instance mode instead of global mode. In instance mode:
- P5 functions are prefixed with the instance object (e.g., `p.rect()` not `rect()`)
- Constants are accessed via the instance (e.g., `p.PI` not `PI`)
- Setup and draw functions are defined as properties of the instance object
- Event handlers are attached to the instance object

## Code Structure
- Main sketch file: `/src/sketch.js`
- CSS: `/css/style.css`
- HTML: single entry point: `/index.html`
- Build configuration: `vite.config.js`

## Patterns & Coding Style
- Function names should be descriptive and follow camelCase
- Drawing functions typically take parameters: (p, x, y, tileSize, colors, [optional params])
- Tile generators are grouped into overlays and underlays
- Use P5.js specific functions via the instance (e.g., `p.rect()`, `p.ellipse()`, `p.beginShape()`)
- Random selection is frequently used for variation

## Drawing Patterns
- Shapes are centered at (x + tileSize/2, y + tileSize/2)
- Most shapes accept a color array and randomly select from it
- Blend modes (typically MULTIPLY) are used for visual effects
- Push/pop pattern is used for isolated transformations
- Dashed lines are implemented via p.drawingContext.setLineDash()

## DO
- Access P5.js built-in functions and constants via the instance (p.TWO_PI, p.PI, etc.)
- Reset blend modes to p.BLEND after using other modes
- Reset stroke settings after drawing
- Use p.push() and p.pop() when applying transformations
- Create functions that follow the pattern of existing drawing functions
- Use p.random() for variation in colors, sizes, and shapes
- Follow the existing pattern for tile generators

## DON'T
- Don't use global P5.js functions (use instance methods instead)
- Don't leave blend modes set to anything other than p.BLEND
- Don't leave stroke settings active after drawing operations
- Don't hardcode colors - use the colors array passed to functions
- Don't use DOM manipulation outside of setup functions
- Don't create complex class hierarchies - this project uses functional composition
- Don't create side effects in drawing functions

## New Shape Implementation Pattern
When creating a new shape drawing function:
1. Accept standard parameters (p, x, y, tileSize, colors)
2. Set appropriate blend mode at the beginning
3. Use p.push() if using transformations
4. Draw the shape(s)
5. Reset any style changes (strokeWeight, fill, etc.)
6. Use p.pop() to restore transformation state if needed
7. Reset blend mode to p.BLEND
8. Add the function to either overlays or underlays array
