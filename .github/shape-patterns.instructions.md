# Shape Pattern Design Instructions

This file provides detailed guidance for creating new shape patterns in instance mode P5.js.

## Common Shape Pattern Types

### Concentric Shapes
- Consist of the same shape repeated at different sizes
- Example: `drawCircleTile`, `drawSquareTile`
- Implementation pattern:
  ```javascript
  function drawConcentricShapeTile(p, x, y, tileSize, colors) {
    const numShapes = p.int(p.random(2, 5));
    for (let i = numShapes; i > 0; i--) {
      p.fill(colors[(numShapes - i) % colors.length]);
      // Draw shape with size proportional to i/numShapes
    }
  }
  ```

### Radial Patterns
- Elements arranged around a center point
- Example: `drawRadialLinesTile`, `drawCircleOfCirclesTile`
- Implementation pattern:
  ```javascript
  function drawRadialPatternTile(p, x, y, tileSize, colors) {
    const numElements = p.int(p.random(5, 36));
    const angleStep = p.TWO_PI / numElements;
    const centerX = x + tileSize / 2;
    const centerY = y + tileSize / 2;
    const radius = tileSize / 2.5;
    
    for (let i = 0; i < numElements; i++) {
      const angle = i * angleStep;
      const elementX = centerX + p.cos(angle) * radius;
      const elementY = centerY + p.sin(angle) * radius;
      // Draw element at this position
    }
  }
  ```

### Geometric Compositions
- Combining basic shapes to create composite designs
- Example: `drawRotatedCrossTile`
- Implementation pattern:
  ```javascript
  function drawCompositionTile(p, x, y, tileSize, colors) {
    p.blendMode(p.MULTIPLY);
    p.push();
    p.translate(x + tileSize / 2, y + tileSize / 2);
    // Optional rotation
    // Draw your composition of shapes
    p.pop();
    p.blendMode(p.BLEND);
  }
  ```

### Outlined/Stroked Shapes
- Shapes with outlines instead of fills
- Example: `drawRings`, `doubleRings`
- Implementation pattern:
  ```javascript
  function drawOutlinedShapeTile(p, x, y, tileSize, colors) {
    p.blendMode(p.MULTIPLY);
    p.noFill();
    p.stroke(p.random(colors));
    p.strokeWeight(p.random([2, 5, 10]));
    // Draw outlined shapes
    p.noStroke();
    p.blendMode(p.BLEND);
  }
  ```

### Polygon-based Patterns
- Regular polygons (triangle, pentagon, etc.)
- Example: `drawPolygonTile`
- Implementation pattern:
  ```javascript
  function drawPolygonTile(p, x, y, tileSize, colors) {
    const npoints = p.random([3, 5, 7, 8]);
    p.blendMode(p.MULTIPLY);
    p.push();
    // Draw polygon using the polygon helper function
    p.pop();
    p.blendMode(p.BLEND);
  }
  ```

## Working with Transformations

### Translation & Rotation
```javascript
p.push();
p.translate(x + tileSize / 2, y + tileSize / 2);
p.rotate(p.PI / p.random([2, 4, 6]));
// Draw shapes relative to the origin (0,0)
p.pop();
```

### Scaling
```javascript
p.push();
p.translate(x + tileSize / 2, y + tileSize / 2);
p.scale(p.random(0.5, 1.5));
// Draw shapes relative to the origin (0,0)
p.pop();
```

## Advanced Techniques

### Dashed Lines
```javascript
function setLineDash(p, pattern = null) {
  pattern = pattern || p.random([[2], [5], [10], [30], [5, 10, 30, 10]]);
  p.drawingContext.lineCap = 'butt';
  p.drawingContext.setLineDash(pattern);
}

function resetLineDash(p) {
  p.drawingContext.setLineDash([]);
}
```

### Gradient/Shading Effects
Consider using multiple semi-transparent shapes to create gradient-like effects:
```javascript
p.blendMode(p.MULTIPLY);
for (let i = 0; i < 5; i++) {
  const c = p.color(p.random(colors));
  c.setAlpha(50); // Semi-transparent
  p.fill(c);
  // Draw overlapping shapes
}
```

### Using Noise for Organic Variations
```javascript
// Add subtle variation to shapes using Perlin noise
const variation = p.map(p.noise(x * 0.01, y * 0.01), 0, 1, -10, 10);
```

## Debugging Tips
- Use temporary colors to debug shape positions
- Use `p.frameRate(1)` to slow down animations
- Add `console.log()` statements to debug parameter values
- Use `p.point()` to visualize important coordinates
