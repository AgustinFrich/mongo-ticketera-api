const mongoose = require("mongoose");
const { Schema } = mongoose;

const planSchema = new Schema({
  nombre: String,
  valor: Number,
  canales: [String],
});
module.exports = mongoose.model("Plan", planSchema);
