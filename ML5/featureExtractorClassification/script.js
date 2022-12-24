let mobilenet;
let classifier;
let video;
let label = "loading model";
let hatButton;
let remoteButton;
let trainButton;
let saveButton;

function modelReady() {
  console.log("Model is Ready!");
  // it will look for .bin as well
  classifier.load("model.json", customModelReady);
}

function customModelReady() {
  console.log("Custom Model is ready!");
  label = "model ready";
  classifier.classify(gotResults);
}

function videoReady() {
  console.log("Video is Ready!");
}

function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  // creates image classification object
  mobilenet = ml5.featureExtractor("MobileNet", modelReady);

  classifier = mobilenet.classification(video, videoReady);

  // // add hat image button
  // hatButton = createButton("hat");
  // hatButton.mousePressed(function () {
  //   classifier.addImage("hat");
  // });

  // // add remote image button
  // remoteButton = createButton("remote");
  // remoteButton.mousePressed(function () {
  //   classifier.addImage("remote");
  // });

  // // add train button
  // trainButton = createButton("train");
  // trainButton.mousePressed(function () {
  //   classifier.train(whileTraining);
  // });

  // // add save button
  // //will save the training files as
  // //model.json and model.weights.bin
  // saveButton = createButton("save");
  // saveButton.mousePressed(function () {
  //   classifier.save();
  // });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}

// function whileTraining(loss) {
//   if (loss === null) {
//     console.log("Training Complete");
//     classifier.classify(gotResults);
//   } else {
//     console.log(loss);
//   }
// }

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
