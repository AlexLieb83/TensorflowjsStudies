let img;
let detector;

function preload() {
  img = loadImage("images/penguin.jpg");
  detector = ml5.objectDetector("cocossd");
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  for (let i = 0; i < results.length; i++) {
    let object = results[i];
    console.log(object.x, object.y, object.width, object.height);
    stroke("green");
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}

function setup() {
  createCanvas(640, 480);
  image(img, 0, 0, width, height);
  detector.detect(img, gotDetections);
}
