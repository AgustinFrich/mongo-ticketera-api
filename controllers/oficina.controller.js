const OficinaModel = require("../models/oficina.model");
const TicketModel = require("../models/ticket.model");

exports.crearOficina = async (req, res) => {
  try {
    const oficina = new OficinaModel(req.body);
    const data = await oficina.save();

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

exports.traerOficinaCercana = async (req, res) => {
  const { id } = req.query;
  try {
    const ticket = await TicketModel.findById(id);
    console.log(ticket);
    const data = await OficinaModel.find({
      ubicacion: {
        $geoIntersects: {
          $geometry: ticket.ubicacion,
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

exports.traerOficinaTipo = async (req, res) => {
  const { tipo } = req.query;
  try {
    const data = await OficinaModel.find({
      tipo: {
        $eq: tipo,
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

exports.traerOficinaTipoEx = async (req, res) => {
  const { tipo } = req.query;
  try {
    const data = await OficinaModel.find({
      tipo: {
        $ne: tipo,
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
