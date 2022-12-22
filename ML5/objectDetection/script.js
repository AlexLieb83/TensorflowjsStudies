let img;
let detector;

function preload() {
  img = loadImage("images/man.jpg");
  detector = ml5.objectDetector("cocossd");
}

function gotDetections(err, results) {
  if (err) {
    console.error(err);
  }
  console.log(results);

  for (let i = 0; i < results.length; i += 1) {
    noStroke();
    fill(0, 255, 0);
    text(
      `${results[i].label} ${nfc(results[i].confidence * 100.0, 2)}%`,
      results[i].x + 5,
      results[i].y + 15
    );
    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    rect(results[i].x, results[i].y, results[i].width, results[i].height);
  }
}

function setup() {
  createCanvas(640, 480);
  image(img, 0, 0, width, height);
  detector.detect(img, gotDetections);
}
