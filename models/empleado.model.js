const mongoose = require("mongoose");
const { Schema } = mongoose;

const empleadoSchema = new Schema({
  nombre: String,
  apellido: String,
  area: String,
});

module.exports = mongoose.model("Empleado", empleadoSchema);
