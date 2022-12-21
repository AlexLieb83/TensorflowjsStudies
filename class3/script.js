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

  const c = a.matMul(b);

  // a.print();
  // b.print();
  c.print();
}
