// Step 1: collect training data
// Step 2: train model
// Step 3: prediction

let model;
let targetLabel = "C";
let state = "collection";

function setup() {
  createCanvas(400, 400);

  let options = {
    inputs: ["x", "y"],
    outputs: ["label"],
    task: "classification",
    debug: "true",
    learningRate: 0.5,
  };

  model = ml5.neuralNetwork(options);
  model.loadData("mouseClicks.json", dataLoaded);

  background(255);
}

function dataLoaded() {
  console.log(model.data);
  let data = model;
  // let data = model.getData();
  for (let i = 0; i < data.length; i++) {
    let inputs = data[i].xs;
    let target = data[i].ys;
    stroke(0);
    noFill();
    ellipse(inputs.x, inputs.y, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(target.label, inputs.x, inputs.y);
  }
  state = "training";
  console.log("starting training");
  model.normalizeData();
  let options = {
    epochs: 200,
  };
  model.train(options, whileTraining, finishedTraining);
}

// change letter when we press key, so we can collect different groups of letters
function keyPressed() {
  // if user presses 't' then train the model
  if (key === "t") {
    state = "training";
    console.log("training started");
    // we normalize the data to make the data points, x and y for us across our canvas, instead of being 400, 400 - it will be 0 , 1 basically
    model.normalizeData();
    let options = {
      epochs: 200,
    };

    // whileTraining executes every epoch
    // finishedTraining executes after training is all finished
    model.train(options, whileTraining, finishedTraining);
  } else if (key === "s") {
    model.saveData("mouseClicks");
  } else {
    targetLabel = key.toUpperCase();
  }
}

// this function executes every epoch
// loss is the machine getting the answer right or wrong
function whileTraining(epoch, loss) {
  console.log(epoch);
}

function finishedTraining() {
  console.log("training finished");
  state = "prediction";
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY,
  };

  if (state === "collection") {
    let target = {
      label: targetLabel,
    };

    model.addData(inputs, target);
    // this is how we will collect training data

    // when mouse is pressed, put an ellipse, circle, with a radius of 24 where the mouse click happened, with a letter 'C; in it
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);

    // when we are in prediction state, and we click mouse, we want the model to classify our click,
    //so basically tell me if it's a c cluster, d cluster, or e cluster
  } else if ((state = "prediction")) {
    model.classify(inputs, gotResults);
  }
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(results);
  // when we click after we are finished training, we can draw the result that we will get from our model
  stroke(0);
  fill(0, 0, 255, 100);
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(results[0].label, mouseX, mouseY);
}
