let x;
let y;

let video;
let features;
let knn;
let labelP; //label paragraph
let ready = false;
let label = "";

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  // flip video, so it's not mirrored
  video.style("transform", "scale(-1,1");
  // video.hide();

  features = ml5.featureExtractor("MobileNet", modelReady);

  labelP = createP("need training data");
  labelP.style("font-size", "32pt");

  x = width / 2;
  y = height / 2;
}

// if we just return results.label, it returns 1,2,3,4 etc because of how the objects are made from our data, so we can use getLabel function to get the correct label names
function getLabel(result) {
  const entries = Object.entries(result.confidencesByLabel);
  let greatestConfidence = entries[0];
  for (let i = 0; i < entries.length; i++) {
    if (entries[i][1] > greatestConfidence[1]) {
      greatestConfidence = entries[i];
    }
  }
  return greatestConfidence[0];
}

function goClassify() {
  const logits = features.infer(video);

  knn.classify(logits, function (error, results) {
    if (error) {
      console.error(error);
    } else {
      // left = 0, right = 1, up = 2, down = 3
      label = results.label;
      // add the result.label to the labelP in DOM
      labelP.html(getLabel(results));
      labelP.html(results.label);
      // then classify again
      goClassify();
    }
  });
}

function keyPressed() {
  const logits = features.infer(video);
  if (key === "ArrowLeft") {
    knn.addExample(logits, "left");
    console.log("left");
  } else if (key === "ArrowRight") {
    knn.addExample(logits, "right");
    console.log("right");
  } else if (key === "ArrowUp") {
    knn.addExample(logits, "up");
    console.log("up");
  } else if (key === "ArrowDown") {
    knn.addExample(logits, "down");
    console.log("down");
  } else if (key === "ArrowDown") {
    knn.addExample(logits, "stay");
  } else if (key === "s") {
    knn.save("model.json");
  }
}

function modelReady() {
  console.log("MobileNet Loaded");
  knn = ml5.KNNClassifier();
  knn.load("knn.json", function () {
    console.log("KNN Data Loaded");
    goClassify();
  });
}

function draw() {
  background(0);
  fill(255);
  ellipse(x, y, 36);

  // left = 0, right = 1, up = 2, down = 3
  if (label === "2") {
    y--;
  } else if (label === "3") {
    y++;
  } else if (label === "0") {
    x--;
  } else if (label === "1") {
    x++;
  }

  // don't let the ball go off screen
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);

  // image(video, 0, 0);

  // if (!ready && knn.getNumLabels() > 0) {
  //   goClassify();
  //   ready = true;
  // }
}

// KNN - K Nearest Neighbor
// - how many nearest neighbors am i looking for?

//KNN classification gives you a way to kind of train and classify at the same time
