let clearButton;
let canvas;

let doodleClassifier;
let resultsDiv;

let video;

function setup() {
  canvas = createCanvas(400, 400);
  clearButton = createButton("clear");
  clearButton.mousePressed(clearCanvas);
  background(255);

  doodleClassifier = ml5.imageClassifier("DoodleNet", modelReady);
  resultsDiv = createDiv("model loading");
  video = createCapture(VIDEO);
  video.hide();
}

function modelReady() {
  console.log("model loaded");
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }

  let content = `${results[0].label} ${nf(
    100 * results[0].confidence,
    2,
    1
  )}% <br />
  ${results[1].label} ${(nf(100 * results[1].confidence), 2, 1)}%`;

  resultsDiv.html(content);

  doodleClassifier.classify(canvas, gotResults);
}

function clearCanvas() {
  background(255);
}

function draw() {
  image(video, 0, 0, width, height);
  filter(THRESHOLD, 0.5);
  // if (mouseIsPressed) {
  //   strokeWeight(16);
  //   // pmouse is previous mouse position
  //   line(mouseX, mouseY, pmouseX, pmouseY);
  // }
}
