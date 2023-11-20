const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nombre: String,
  apellido: String,
});

module.exports = mongoose.model("Usuario", usuarioSchema);
