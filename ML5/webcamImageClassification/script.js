let mobilenet;
let video;
let label = "";

function modelReady() {
  console.log("Model is Ready!");
  mobilenet.predict(gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    label = results[0].label;
    let prob = results[0].confidence;

    mobilenet.predict(gotResults);
  }
}

// function imageReady() {
//   image(puffin, 0, 0, width, height);
// }

function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

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
