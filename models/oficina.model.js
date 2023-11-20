const mongoose = require("mongoose");
const { Schema } = mongoose;

const oficinaSchema = new Schema({
  nombre: String,
  ubicacion: Schema.Types.Mixed,
  tipo: String,
});

module.exports = mongoose.model("Oficina", oficinaSchema);
