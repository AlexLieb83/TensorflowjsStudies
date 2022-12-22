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

// set up the configuration of our hidden layer
const hidden = tf.layers.dense({
  units: 4,
  inputShape: [2],
  activation: "sigmoid",
});

// set up the configuration of our output layer
const output = tf.layers.dense({
  units: 3,
  activation: "sigmoid",
});

// add layers to model
model.add(hidden);
model.add(output);

// make our optimizer
// stacastic gradient decent, learning rate = 0.1
const sdgOptimizer = tf.train.sgd(0.1);

// configure our model compiler
const config = {
  optimizer: sdgOptimizer,
  loss: "meanSquaredError",
};

model.compile(config);
