const TicketModel = require("../models/ticket.model");
const OficinaModel = require("../models/oficina.model");

exports.crearTicket = async (req, res) => {
  try {
    const ticket = new TicketModel(req.body);
    const data = await ticket.save();

    return res.status(200).json({
      msg: "Agregado correctamente",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.traerTickets = async (req, res) => {
  try {
    const data = await TicketModel.find();
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.traerTicketsEstado = async (req, res) => {
  const { resuelto } = req.query;
  console.log(resuelto);
  try {
    const data = await TicketModel.find({ resuelto: resuelto });
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.traerTicketsTipo = async (req, res) => {
  const { tipo } = req.query;
  console.log(tipo);
  try {
    const data = await TicketModel.find({ tipo: tipo });
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.traerPorOficina = async (req, res) => {
  const { nombre } = req.query;
  try {
    const oficina = await OficinaModel.findOne({ nombre: nombre });
    const data = await TicketModel.find({
      ubicacion: {
        $geoWithin: {
          $geometry: oficina.ubicacion,
        },
      },
    });
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
