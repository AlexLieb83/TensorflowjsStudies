// NOTE - using older versions of p5 to make the site work

// EMOJI Display

// TODO - when nothing is shown, show smiling face emoji or something else

// Video
let video;

let label = "waiting...";

let classifier;

let imageModelURL = "https://teachablemachine.withgoogle.com/models/jzRjyKbqr/";

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  // image(video, 0, 0);

  // // STEP 4: Draw the label
  // textSize(32);
  textAlign(CENTER, CENTER);
  // fill(255);
  // text(label, width / 2, height - 16);

  let emoji = "🎩";
  if (label === "Book") {
    emoji = "📖";
  } else if (label === "Pen") {
    emoji = "🖋️";
  } else if (label === "Remote") {
    emoji = "📺";
  }

  textSize(256);
  text(emoji, width / 2, height / 2);
}

// STEP 3: Get the classification!
function gotResults(err, results) {
  // check for error, if so, console log it, then return out of program
  if (err) {
    console.error(err);
    return;
    // else console log our results
  }
  label = results[0].label;
  classifyVideo();
}
