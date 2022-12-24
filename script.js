function draw() {
  stroke("green");
  strokeWeight(4);
  noFill();
  rect(20, 30, 40, 50);
  noStroke();
  fill(255);
  textSize(24);
  text("test", 20 + 10, 30 + 24);
}

function setup() {
  createCanvas(640, 480);
  draw();
}
