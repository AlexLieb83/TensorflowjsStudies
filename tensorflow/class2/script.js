function setup() {
  noCanvas();

  const values = [];
  for (let i = 0; i < 15; i++) {
    values[i] = random(0, 100);
  }

  // set shape to 2 5x3's
  const shapeA = [5, 3];
  const shapeB = [3, 5];

  // declare our tensor
  const a = tf.tensor2d(values, shapeA, "int32");
  const b = tf.tensor2d(values, shapeB, "int32");

  // matMul is matrix multiplication, so the number of columns from the first number must match the number of rows of the second number
  const c = a.matMul(b);

  // a.print();
  // b.print();
  c.print();

  // storing our tensor in a variable - we do this for memory, we can add trainable for optimizers this way
  // const vtense = tf.variable(tense);

  // // tense.data() returns a promise, so we use then to cl what is returned with the promise
  // // tense.data().then(function (stuff) {
  // //   console.log(stuff);
  // // });

  // // or we can just get our data using dataSync()
  // tense.print();
  // console.log(tense.dataSync());

  //tense.get(10) grabs the value 10 from the tensor
}

// operations - math operations we can perform on the tensor itself

//tf.transpose() - will turn [2,3] into [3,2] or [5,3] into [3,5]
