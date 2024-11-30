import '../css/style.css';
import {sketch} from 'p5js-wrapper';

// inspired by work of https://bsky.app/profile/leedoughty.bsky.social

const palettes = [
  // "https://coolors.co/palette/00ffff-00ff15-ffff00-ff9500-ff0040-ff00ff", too bright maybe
  // "https://coolors.co/palette/04e762-f5b700-008bf8-89fc00-f4442e", // bright green red thing
  // "https://coolors.co/palette/ffc759-ff7b9c-607196-babfd1-e8e9ed", // gray-yellow-red pastel
  // "https://coolors.co/palette/81f4e1-56cbf9-ff729f-d3c4d1", // blue-green pastels
  // "https://coolors.co/palette/cfd4c5-eecfd4-efb9cb-e6adec-c287e8", // rose-purplish pastels
  // "https://coolors.co/palette/f5ffc6-b4e1ff-ab87ff-fface4-c1ff9b", // purplish pastels
  // "https://coolors.co/palette/70d6ff-ff70a6-ff9770-ffd670-e9ff70", // light reddish pastels
  // 'https://coolors.co/palette/f72585-b5179e-7209b7-560bad-480ca8-3a0ca3-3f37c9-4361ee-4895ef-4cc9f0', // bluesish
  'https://coolors.co/palette/9b5de5-f15bb5-fee440-00bbf9-00f5d4', // bright pastels
  // 'https://coolors.co/palette/0b090a-161a1d-660708-a4161a-ba181b-e5383b-b1a7a6-d3d3d3-f5f3f4', // reds
  // 'https://coolors.co/palette/007f5f-2b9348-55a630-80b918-aacc00-bfd200-d4d700-dddf00-eeef20-ffff3f', // spring green & yellow
  // 'https://coolors.co/palette/00296b-003f88-00509d-fdc500-ffd500', // Blue & Yellow
  // 'https://coolors.co/palette/004b23-006400-007200-008000-38b000-70e000-9ef01a-ccff33', // Emerald City
  // 'https://coolors.co/palette/ff6d00-ff7900-ff8500-ff9100-ff9e00-240046-3c096c-5a189a-7b2cbf-9d4edd', // purple-orange
  // 'https://coolors.co/palette/004733-2b6a4d-568d66-a5c1ae-f3f4f6-dcdfe5-df8080-cb0b0a-ad080f-8e0413', // red-green technicolor
  // 'https://coolors.co/palette/fbf8cc-fde4cf-ffcfd2-f1c0e8-cfbaf0-a3c4f3-90dbf4-8eecf5-98f5e1-b9fbc0', // pale
];

const dashes = [[2], [5], [10], [30], [5, 10, 30, 10]];

const overlays = [
  drawCircleTile,
  drawRotatedCrossTile,
  drawRadialLinesTile,
  drawRings,
  drawPolygonTile,
];

const underlays = [
  drawCircleTile,
  drawSquareTile,
  drawRotatedCrossTile,
  drawCircleOfCirclesTile,
  drawRadialLinesTile,
  drawRings,
  drawPolygonTile,
];

let underlayIndex = 0

sketch.setup = () => {
  createCanvas(800, 800);
  noLoop();
  noStroke();
  rectMode(CENTER);
}

sketch.draw = () => {
  drawGrid();
}

sketch.keyPressed = () => {
  if (key === " ") drawGrid();
}

sketch.mouseClicked = () => {
  drawGrid();
}

let tileSequencer = () => {
  let nextUnderlay = underlays[underlayIndex]
  underlayIndex = (underlayIndex + 1) % (underlays.length - 1)
  return nextUnderlay
}

function drawGrid() {
  background(255);
  let cols = 8;
  let rows = 8;
  let tileSize = (width / cols) * 0.8; // Reduce tile size to create gaps
  let padding = (width / cols) * 0.2; // Padding to create gaps
  let colors = getColorsFromUrl(random(palettes));

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      colors = shuffle(colors, true); // Shuffle the colors array for each tile
      let x = i * (tileSize + padding) + padding / 2;
      let y = j * (tileSize + padding) + padding / 2;
      tileSequencer()(x, y, tileSize, colors, random([true, false]));
      if (random([true, false])) random(overlays)(x, y, tileSize, colors, random([true, false]));
    }
  }
}

function drawTileBase(x, y, tileSize, colors, drawShape) {
  let numShapes = int(random(2, 5));
  for (let i = numShapes; i > 0; i--) {
    fill(colors[(numShapes - i) % colors.length]);
    drawShape(x, y, tileSize, i, numShapes);
  }
}

function drawCircleTile(x, y, tileSize, colors) {
  drawTileBase(x, y, tileSize, colors, (x, y, tileSize, i, numShapes) => {
    ellipse(x + tileSize / 2, y + tileSize / 2, (tileSize * i) / numShapes);
  });
}

function drawSquareTile(x, y, tileSize, colors) {
  drawTileBase(x, y, tileSize, colors, (x, y, tileSize, i, numShapes) => {
    rect(
      x + tileSize / 2,
      y + tileSize / 2,
      (tileSize * i) / numShapes,
      (tileSize * i) / numShapes
    );
  });
}

function drawRotatedCrossTile(x, y, tileSize, colors, rotated = false) {
  let barWidth = tileSize / 4;
  blendMode(MULTIPLY);
  push();
  translate(x + tileSize / 2, y + tileSize / 2);
  if (rotated) rotate(PI / 4);
  fill(random(colors));
  rect(0, 0, tileSize, barWidth, barWidth / 2); // Horizontal bar
  fill(random(colors));
  rect(0, 0, barWidth, tileSize, barWidth / 2); // Vertical bar
  pop();
  blendMode(BLEND); // Reset blend mode to default
}

function drawCircleOfCirclesTile(x, y, tileSize, colors, rotated = false) {
  let numSmallCircles = int(random(4, 12));
  let radius = (tileSize / 2.9) * map(numSmallCircles, 4, 12, 1, 0.9);
  let angleStep = TWO_PI / numSmallCircles;
  let smallCircleRadius = tileSize / (numSmallCircles / 2); // Size of small circles based on their quantity
  blendMode(MULTIPLY);
  fill(colors[0]);
  ellipse(x + tileSize / 2, y + tileSize / 2, tileSize / 1.2); // Central circle
  fill(colors[1]);
  if (rotated) {
    push();
    translate(x + tileSize / 2, y + tileSize / 2);
    rotate(PI / 4);
    translate(-x - tileSize / 2, -y - tileSize / 2);
  }
  for (let i = 0; i < numSmallCircles; i++) {
    let angle = i * angleStep;
    let cx = x + tileSize / 2 + cos(angle) * radius;
    let cy = y + tileSize / 2 + sin(angle) * radius;
    ellipse(cx, cy, smallCircleRadius);
  }
  if (rotated) {
    pop();
  }
  blendMode(BLEND); // Reset blend mode to default
}

// dashp where "p" is for predicate
function drawSoloCircle(x, y, tileSize, color, dashp, size) {
  const weight = random([2, 5, 10, 20]);
  // const weight = size / 4
  blendMode(MULTIPLY);
  noFill();
  stroke(color);
  strokeWeight(weight);
  if (dashp) setLineDash();
  // setLineDash([size / 1.45])
  ellipse(x + tileSize / 2, y + tileSize / 2, size - weight / 2);
  noStroke();
  resetLineDash();
}

function drawRings(x, y, tileSize, colors) {
  let numShapes = int(random(2, 5));
  for (let i = numShapes; i > 0; i--) {
    const color = colors[(numShapes - i) % colors.length];
    const dashp = random([true, false]);
    drawSoloCircle(x, y, tileSize, color, dashp, (tileSize * i) / numShapes);
  }
  blendMode(BLEND); // Reset blend mode to default
}

function drawPolygonTile(x, y, tileSize, colors, rotated = true) {
  const weight = random([2, 5, 10, 15]);
  let numShapes = int(random(2, 5));
  push();
  noFill();
  for (let i = numShapes; i > 0; i--) {
    stroke(random(colors));
    strokeWeight(weight);
    const npoints = random([3, 5, 7, 8]);
    blendMode(MULTIPLY);
    if (rotated) {
      translate(x + tileSize / 2, y + tileSize / 2);
      rotate(PI / random([2,4,6]));
      translate(-x - tileSize / 2, -y - tileSize / 2);
    }
    polygon(
      x + tileSize / 2,
      y + tileSize / 2,
      (tileSize * i) / 2 / numShapes,
      npoints
    );
  }
  pop();
  blendMode(BLEND); // Reset blend mode to default
  noStroke();
}

// tileSize is TILE size (not to go over)
function drawRadialLinesTile(x, y, tileSize, colors) {
  let numLines = int(random(5, 36));
  let lineLength = (PI * tileSize) / int(random(5, 16));
  let angleStep = TWO_PI / numLines;
  let radius = tileSize / 2.5 - lineLength;
  let lineWidth = tileSize / 20;

  drawSoloCircle(
    x,
    y,
    tileSize,
    colors[0],
    random([true, true, false]),
    tileSize
  );
  drawSoloCircle(
    x,
    y,
    tileSize,
    colors[1],
    random([true, true, false]),
    tileSize * 0.7
  );

  fill(colors[2]);
  for (let i = 0; i < numLines; i++) {
    let angle = i * angleStep;
    let cx = x + tileSize / 2 + cos(angle) * radius;
    let cy = y + tileSize / 2 + sin(angle) * radius;
    push();
    translate(cx, cy);
    rotate(angle);
    rect(0, 0, lineLength / 2, lineWidth);
    pop();
  }
  blendMode(BLEND); // Reset blend mode to default
}

function getColorsFromUrl(url) {
  let colorStrings = url.split("/").pop().split("-");
  return colorStrings.map((c) => color("#" + c));
}

function setLineDash(pattern = null) {
  pattern ??= random(dashes);
  drawingContext.lineCap = "butt";
  drawingContext.setLineDash(pattern);
}

function resetLineDash() {
  drawingContext.setLineDash([]);
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}



