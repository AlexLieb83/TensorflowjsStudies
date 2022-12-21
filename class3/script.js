function setup() {
  noCanvas();

  // const values = [];
  // for (let i = 0; i < 15; i++) {
  //   values[i] = random(0, 100);
  // }

  // // set shapes of tensors
  // const shapeA = [5, 3];
  // const shapeB = [3, 5];

  // // declare our tensors
  // const a = tf.tensor2d(values, shapeA, "int32");
  // const b = tf.tensor2d(values, shapeB, "int32");

  // // matrix multiply the two tensors
  // const c = a.matMul(b);

  // // a.print();
  // // b.print();
  // c.print();
}

function draw() {
  const values = [];

  for (let i = 0; i < 15; i++) {
    values[i] = random(0, 100);
  }

  const shape = [5, 3];
  const a = tf.tensor(values, shape, "int32");
  const b = tf.tensor(values, shape, "int32");
  const bb = b.transpose();

  const c = a.matMul(bb);
}

//memory management

//we use tf.memory to return memory info from program

//use .dispose() to manually dispose of the tensors - we do this to decrease the chances of keeping a tensor stored in memory, which causes memory leaks, bugs, etc

//use tf.tidy(stuff{}) to dispose of tensors from inside of the stuff function, after we are done with them
