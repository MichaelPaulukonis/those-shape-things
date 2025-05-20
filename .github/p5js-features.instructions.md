# P5.js Features and Instance Mode Instructions

This file provides detailed instructions for working with P5.js features in instance mode.

## Instance Mode Basics

### Setting Up Instance Mode
```javascript
import { p5 } from 'p5js-wrapper';

// Create a new P5 instance
const sketch = new p5((p) => {
  // Setup function
  p.setup = () => {
    p.createCanvas(800, 800);
    p.noLoop();
    p.noStroke();
    p.rectMode(p.CENTER);
  };
  
  // Draw function
  p.draw = () => {
    p.background(255);
    // Drawing code
  };
  
  // Event handlers
  p.mouseClicked = () => {
    // Handle mouse click
  };
  
  p.keyPressed = () => {
    // Handle key press
  };
});
```

### Accessing P5 Functions and Constants
All P5.js functions and constants must be accessed through the instance object:

```javascript
// INCORRECT (global mode)
background(255);
rect(10, 10, 50, 50);

// CORRECT (instance mode)
p.background(255);
p.rect(10, 10, 50, 50);
```

## Canvas Management

### Creating and Resizing Canvas
```javascript
// Create canvas in setup
p.setup = () => {
  p.createCanvas(800, 800);
};

// Resize canvas when window is resized
p.windowResized = () => {
  p.resizeCanvas(p.windowWidth, p.windowHeight);
};
```

### Canvas Transformations
```javascript
// Save current transformation state
p.push();

// Translate origin to center of canvas
p.translate(p.width/2, p.height/2);

// Rotate coordinate system
p.rotate(p.PI/4);

// Scale coordinate system
p.scale(2);

// Restore previous transformation state
p.pop();
```

## Color and Style

### Blend Modes
```javascript
// Set blend mode (affects how shapes overlap)
p.blendMode(p.MULTIPLY);

// Draw shapes
p.rect(50, 50, 100, 100);
p.ellipse(100, 100, 100);

// Reset to default blend mode
p.blendMode(p.BLEND);
```

### Color Manipulation
```javascript
// Create a color object
const c = p.color(p.random(colors));

// Adjust alpha (transparency)
c.setAlpha(128);

// Apply color
p.fill(c);

// Getting HSB components
const hue = p.hue(c);
const sat = p.saturation(c);
const bright = p.brightness(c);
```

## Animation and Interactivity

### Frame Control
```javascript
// Stop animation loop (draw won't be called repeatedly)
p.noLoop();

// Start animation loop
p.loop();

// Only call draw once
p.redraw();

// Set framerate
p.frameRate(30);
```

### Mouse Interaction
```javascript
// Mouse position is available via p.mouseX and p.mouseY
const distance = p.dist(p.mouseX, p.mouseY, p.width/2, p.height/2);

// Mouse event handlers
p.mousePressed = () => {
  console.log("Mouse pressed at", p.mouseX, p.mouseY);
};

p.mouseDragged = () => {
  // Handle mouse drag
};

p.mouseReleased = () => {
  // Handle mouse release
};
```

### Keyboard Interaction
```javascript
p.keyPressed = () => {
  if (p.key === ' ') {
    // Space bar pressed
  } else if (p.keyCode === p.UP_ARROW) {
    // Up arrow pressed
  }
};
```

## Working with Images

### Loading and Displaying Images
```javascript
let img;

p.preload = () => {
  img = p.loadImage('path/to/image.jpg');
};

p.draw = () => {
  p.image(img, 0, 0, p.width, p.height);
};
```

### Creating and Manipulating Pixel Data
```javascript
// Create an offscreen buffer
const buffer = p.createGraphics(400, 400);

// Draw to the buffer
buffer.background(200);
buffer.ellipse(200, 200, 100);

// Display the buffer
p.image(buffer, 0, 0);
```

## Optimization Tips

### Performance Considerations
- Use `p.noLoop()` for static sketches
- Minimize calls to `p.random()` in the draw loop
- Use `p.createGraphics()` for complex static elements
- Avoid unnecessary style changes (fill, stroke, etc.)
- Use `p.push()` and `p.pop()` efficiently
- Consider using `p.frameRate()` to control animation speed

### Memory Management
```javascript
// Remove event listeners when not needed
p.mousePressed = undefined;

// Remove P5 instance when done
sketch.remove();
```

## Debugging Tools

### Built-in P5.js Debug
```javascript
// Show framerate in the corner
p.draw = () => {
  // Your drawing code
  p.fill(0);
  p.text("FPS: " + p.frameRate().toFixed(2), 10, 20);
};
```

### Visualizing Parameters
```javascript
// Visualize a variable by mapping it to a visual property
const mappedValue = p.map(someValue, minValue, maxValue, 0, 255);
p.fill(mappedValue);
p.rect(10, 10, 50, 50);
```
