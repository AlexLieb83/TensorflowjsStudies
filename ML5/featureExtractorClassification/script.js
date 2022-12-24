let mobilenet;
let classifier;
let video;
let label = "";
let hatButton;
let remoteButton;
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
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    label = results[0].label;
    let prob = results[0].confidence;

    classifier.classify(gotResults);
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

  classifier = mobilenet.classification(video, videoReady);

  // add hat image button
  hatButton = createButton("hat");
  hatButton.mousePressed(function () {
    classifier.addImage("hat");
  });

  // add remote image button
  remoteButton = createButton("remote");
  remoteButton.mousePressed(function () {
    classifier.addImage("remote");
  });

  // add train button
  trainButton = createButton("train");
  trainButton.mousePressed(function () {
    classifier.train(whileTraining);
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}
