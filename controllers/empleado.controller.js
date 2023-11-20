const EmpleadoModel = require("../models/empleado.model");

exports.crearEmpleado = async (req, res) => {
  try {
    const empleado = new EmpleadoModel(req.body);
    const data = await empleado.save();

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

exports.traerEmpleados = async (req, res) => {
  try {
    const data = await EmpleadoModel.find();
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

exports.traerEmpleadoNombreApellido = async (req, res) => {
  const { nombre, apellido } = req.query;
  try {
    const data = await EmpleadoModel.find({
      $and: [{ nombre: nombre }, { apellido: apellido }],
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
