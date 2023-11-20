const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new Schema({
  tipo: String,
  mensaje: String,
  derivaciones: [Schema.Types.Mixed],
  planes: Schema.Types.Mixed,
  ubicacion: Schema.Types.Mixed,
  soluciones: [String],
  resuelto: Boolean,
  localidad: {
    codigo_postal: { type: String },
    descripcion: { type: String },
  },
  usuario: Schema.Types.Mixed,
  empleado: Schema.Types.Mixed,
});

module.exports = mongoose.model("Ticket", ticketSchema);
