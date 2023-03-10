let mobilenet;
let predictor;
let video;
let value = 0;
let slider;
let addButton;
let trainButton;

function modelReady() {
  console.log("Model is Ready!");
}

function videoReady() {
  console.log("Video is Ready!");
}

function whileTraining(loss) {
  if (loss === null) {
    console.log("Training Complete");
    predictor.predict(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    value = results.value;
    predictor.predict(gotResults);
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
  mobilenet = ml5.featureExtractor("MobileNet", modelReady);

  predictor = mobilenet.regression(video, videoReady);

  slider = createSlider(0, 1, 0.5, 0.01);
  slider.input(function () {
    // console.log(slider.value());
    // assign this image/feature to this certain slider value number
    predictor.addImage(slider.value());
  });

  addButton = createButton("add example image");
  addButton.mousePressed(function () {
    // assign this image/feature to this certain slider value number
    predictor.addImage(slider.value());
  });

  // add train button
  trainButton = createButton("train");
  trainButton.mousePressed(function () {
    predictor.train(whileTraining);
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  rectMode(CENTER);
  fill(255, 0, 200);
  rect(value * width, height / 2, 50, 50);
  fill(255);
  textSize(32);
  text(value, 10, height - 20);
}
