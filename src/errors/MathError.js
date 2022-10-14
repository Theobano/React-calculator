// Define a MathError class which extends the default Error class.
// To be used to represent computational errors arising from
// mathematical computatations.An example is a computation resulting in Nan.
class MathError extends Error {
  constructor(message) {
    super(message);
    this.name = "MathError";
  }
}

export default MathError;
