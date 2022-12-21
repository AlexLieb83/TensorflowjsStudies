function setup() {
  noCanvas();

  // tensors are complex objects in javascript
  //tensors are made up of values, the shape, and the dtypes
  //dtypes can be -> floats, ints, booleans

  // this tensor is 2 2x2 images
  // const data = tf.tensor(
  //   [0, 0, 127.5, 255, 100, 50, 24, 54],
  //   [2, 2, 2],
  //   "int32"
  // );

  // creating a 5x3 tensor, filled with random nums
  const values = [];
  for (let i = 0; i < 15; i++) {
    values[i] = Math.random(0, 100);
  }

  // set shape to 5x3
  const shape = [5, 3];

  // declare our tensor
  const data = tf.tensor(values, shape, "int32");

  console.log(data.toString());
}

//scalars are tensors with a single value
//so tf.scalar(4) === tf.tensor(4)

//we use scalar, tensor2d, and tensor3d to declare which type of tensor we are using
