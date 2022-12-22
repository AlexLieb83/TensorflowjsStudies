// *** NOTES ***

//linear regression is used to figure out, can we fit a line into like a 2d scatter point plot, where the line approximates all of the points as best as possible
//the line is minimizing distance between the point and the line, as a straight line
//think of it as the total sum of the distances from all the points to the line, being as small as possible

//optimizer allows us to minimize this loss function, and we need a learning rate

//formula for a line === y = mx + b,   m = slope, b = y-intercept

//statastic gradient descent - sgd - slowly adjusting m and b to minimize the loss function

//training - means to minimize the loss function with the optimizer and adjust m and b based on that

let xVals = [];
let yVals = [];

let a, b, c, d;

const learningRate = 0.1;
const optimizer = tf.train.sgd(learningRate);

function setup() {
  createCanvas(400, 400);

  // give me a random num between 0 and 1, sort of like weights
  //m and b must be variables, because they will change based on where we click dots
  a = tf.variable(tf.scalar(random(-1, 1)));
  b = tf.variable(tf.scalar(random(-1, 1)));
  c = tf.variable(tf.scalar(random(-1, 1)));
  d = tf.variable(tf.scalar(random(-1, 1)));
}

function loss(preds, labels) {
  // predictions - labels, then square, then take the mean of that
  return preds.sub(labels).square().mean();
}

function predict(x) {
  // turn array of nums into a tensor
  const xs = tf.tensor1d(x);

  //apply formula for a line to our tensor, ys are the predictions

  //y = ax^3 + bx^2 + cx + d
  const ys = xs
    .pow(tf.scalar(3))
    .mul(a)
    .add(xs.square().mul(b))
    .add(xs.mul(c))
    .add(d);

  return ys;
}

function mousePressed() {
  // normalize numbers between 0 and 1, to make the math easier than 0 and 400
  let x = map(mouseX, 0, width, -1, 1);
  let y = map(mouseY, 0, height, 1, -1);

  // push mouse click coordinates to their arrays
  xVals.push(x);
  yVals.push(y);
}

// allows us to draw on the canvas and see our dots
function draw() {
  tf.tidy(() => {
    //***training***
    if (xVals.length > 0) {
      // turn array of ys into tensor
      const ys = tf.tensor1d(yVals);
      optimizer.minimize(() => loss(predict(xVals), ys));
    }
  });

  background(0);

  stroke(255);
  strokeWeight(2);

  for (let i = 0; i < xVals.length; i++) {
    let px = map(xVals[i], -1, 1, 0, width);
    let py = map(yVals[i], -1, 1, height, 0);

    point(px, py);
  }

  // our curved line
  const curveX = [];
  for (let x = -1; x <= 1.01; x += 0.05) {
    curveX.push(x);
  }
  const ys = tf.tidy(() => predict(curveX));
  let curveY = ys.dataSync();
  ys.dispose();

  beginShape();
  noFill();
  stroke(255);
  strokeWeight(2);

  for (let i = 0; i < curveX.length; i++) {
    let x = map(curveX[i], -1, 1, 0, width);
    let y = map(curveY[i], -1, 1, height, 0);
    vertex(x, y);
  }

  endShape();
}
