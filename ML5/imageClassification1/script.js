let mobilenet;

function modelReady() {
  console.log("Model is Ready!");
  mobilenet.classify(puffin, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
    let label = results[0].label;
    let prob = results[0].confidence;
    fill(255);
    textSize(64);
    text(label, 10, height - 100);
    createP(label);
    createP(prob);
  }
}

function imageReady() {
  image(puffin, 0, 0, width, height);
}

function setup() {
  createCanvas(640, 480);
  background(0);
  puffin = createImg("images/puffin.jpg", imageReady);
  puffin.hide();

  // creates image classification object
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
}
