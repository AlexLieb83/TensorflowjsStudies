// the video and pixel scale
let video;
let videoSize = 10;
let ready = false;

let pixelBrain;

let label = "n";

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO, videoReady);
  video.size(videoSize, videoSize);
  video.hide();

  let options = {
    inputs: videoSize * videoSize * 3,
    outputs: 2,
    task: "classification",
    debug: true,
  };
  pixelBrain = ml5.neuralNetwork(options);
  // getting cors errors when loading, need to spin up server to get around training data on every reload
  // pixelBrain.loadData("data.json", loaded);
}

function loaded() {
  pixelBrain.train({ epochs: 50 }, finishedTraining);
}

function finishedTraining() {
  console.log("training complete");
  classifyVideo();
}

function classifyVideo() {
  let inputs = video.pixels.filter((val, i) => i % 4 !== 3);

  pixelBrain.classify(inputs, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  label = results[0].label;
  classifyVideo();
}

function keyPressed() {
  if (key === "t") {
    pixelBrain.normalizeData();
    pixelBrain.train({ epochs: 50 }, finishedTraining);
  } else if (key === "s") {
    pixelBrain.saveData();
  } else {
    addExample(key);
  }
}

function addExample(label) {
  let inputs = video.pixels.filter((val, i) => i % 4 !== 3);
  // video.loadPixels();
  // for (let i = 0; i < video.length; i += 4) {
  //   let r = video.pixels[i];
  //   let g = video.pixels[i + 1];
  //   let b = video.pixels[i + 2];
  //   inputs.push(r, g, b);
  // }

  let target = [label];
  pixelBrain.addData(inputs, target);
}

// Video is ready
function videoReady() {
  ready = true;
}

function draw() {
  background(0);
  if (ready) {
    // render low-res image
    let w = width / videoSize;
    video.loadPixels();

    for (let x = 0; x < video.width; x++) {
      for (let y = 0; y < video.height; y++) {
        let index = (x + y * video.width) * 4;
        let r = video.pixels[index + 0];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];
        noStroke();
        fill(r, g, b);
        rect(x * w, y * w, w, w);
      }
    }
  }

  if (label === "h") {
    textSize(64);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Hi", width / 2, height / 2);
  }
}
