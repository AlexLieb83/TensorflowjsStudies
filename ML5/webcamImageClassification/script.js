let mobilenet;
let video;
let label = "";

function modelReady() {
  console.log("Model is Ready!");
  mobilenet.classify(gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    label = results[0].label;

    mobilenet.predict(gotResults);
  }
}

function setup() {
  createCanvas(640, 550);
  background(0);
  video = createCapture(VIDEO, imageReady);
  video.hide();

  // creates image classification object
  mobilenet = ml5.imageClassifier("MobileNet", video, modelReady);
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}
