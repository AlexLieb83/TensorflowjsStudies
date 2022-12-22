//Tensorflow Layers API

//inputs -> hidden -> outputs

//tf.sequential - any layer where the outputs of it's layer are the input's of another layer

//tf.layers.dense() - fully connected layer, every node is fully connected to previous layer

//input shape - we do not have to give a shape to the input's shape of the outputs layer, because it is inferred to be the same as the units

//compile() - used to compile the whole model together - must be compiled with an optimizer and a loss functions

//example of our model
//input = 2 nodes, 8 weights
//hidden = 4 nodes, 12 weights
//output = 3 nodes

//create our sequential object
const model = tf.sequential();

// create and set up the configuration of our hidden layer
// dense means fully connected layer
const hidden = tf.layers.dense({
  units: 4, //number of nodes
  inputShape: [2],
  activation: "sigmoid",
});

// create and set up the configuration of our output layer
//dense means fully connected layer
const output = tf.layers.dense({
  units: 1, //number of nodes
  // inputShape is inferred from the previous layer, [4]
  activation: "sigmoid",
});

// add layers to model
model.add(hidden);
model.add(output);

// make our optimizer
// stacastic gradient decent, learning rate = 0.1
const sdgOptimizer = tf.train.sgd(0.1);

// configure our model compiler
model.compile({
  optimizer: sdgOptimizer,
  loss: "meanSquaredError",
});

//dummy input samples
const xs = tf.tensor2d([
  [0, 0],
  [0.5, 0.5],
  [1, 1],
]);

// dummy target samples
const ys = tf.tensor2d([[1], [0.5], [0]]);

// .fit() returns a promise, meaning it executes asynchronously
async function train() {
  for (let i = 0; i < 1000; i++) {
    const config = {
      shuffle: true,
      epochs: 10,
    };
    const response = await model.fit(xs, ys, config);
    console.log(response.history.loss[0]);
  }
}

// train 100 times, then do prediction
train().then(() => {
  console.log("training complete");
  let outputs = model.predict(xs);
  outputs.print();
});

// // example data
// const xs = tf.tensor2d([
//   [0.25, 0.92],
//   [0.12, 0.3],
//   [0.4, 0.74],
//   [0.1, 0.22],
// ]);
