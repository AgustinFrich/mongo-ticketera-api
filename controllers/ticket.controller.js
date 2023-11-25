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

exports.traerTicketsCercanos = async (req, res) => {
  const { ubicacion } = req.body;

  try {
    const data = await TicketModel.findOne({
      ubicacion: {
        $near: {
          $geometry: { ...ubicacion, maxDistance: 10 },
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

exports.traerTicketsVariasSoluciones = async (req, res) => {
  try {
    const data = await TicketModel.find({
      $expr: { $gt: [{ $size: "$soluciones" }, 1] },
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

exports.traerTicketsDerivados = async (req, res) => {
  try {
    const data = await TicketModel.find({
      $expr: { $gte: [{ $size: "$derivaciones" }, 1] },
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

exports.traerSuperPackFullBarato = async (req, res) => {
  try {
    const data = await TicketModel.aggregate([
      {
        $match: {
          "planes.actual.nombre": "SuperPackFull",
          "planes.actual.valor": { $lt: 2000 },
        },
      },
      {
        $project: {
          usuario: 1,
        },
      },
    ]);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.traerSuperPackFullCaro = async (req, res) => {
  try {
    const data = await TicketModel.aggregate([
      {
        $match: {
          "planes.actual.nombre": "SuperPackFull",
          "planes.actual.valor": { $not: { $lte: 4000 } },
        },
      },
      {
        $project: {
          usuario: 1,
        },
      },
    ]);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.traerCanalesSuperPackFull = async (req, res) => {
  try {
    const data = await TicketModel.aggregate([
      {
        $match: {
          "planes.actual.nombre": "SuperPackFull",
        },
      },
      {
        $unwind: {
          path: "$planes.actual.canales",
        },
      },
      {
        $sortByCount: "$planes.actual.canales",
      },
    ]);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.traerExcluyenteLocalidad = async (req, res) => {
  const { localidades } = req.body;
  try {
    const data = await TicketModel.find({
      localidad: {
        $nin: localidades,
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

exports.traerIncluyenteLocalidad = async (req, res) => {
  const { localidades } = req.body;
  try {
    const data = await TicketModel.find({
      localidad: {
        $in: localidades,
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

exports.traerTicketsNormal = async (req, res) => {
  try {
    const data = await TicketModel.aggregate([
      {
        $match: {
          $or: [
            {
              motivo: {
                $ne: "cambio de plan",
              },
            },
            {
              "planes.actual.nombre": "normal",
            },
          ],
        },
      },
      {
        $project: {
          "planes.previos": 1,
        },
      },
    ]);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.traerMensajeMoti = async (req, res) => {
  try {
    const data = await TicketModel.aggregate([
      {
        $match: {
          mensaje: /moti/gi,
        },
      },
      {
        $group: {
          _id: "$usuario",
          mensajes: {
            $push: "$mensaje",
          },
        },
      },
    ]);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
