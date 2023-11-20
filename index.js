const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

const connectDB = require("./connectMongo");
connectDB();

const PlanModel = require("./models/plan.model");
const UsuarioModel = require("./models/usuario.model");

const ticketController = require("./controllers/ticket.controller");
const empleadoController = require("./controllers/empleado.controller");
const oficinaController = require("./controllers/oficina.controller");

// TICKETS
app.post("/api/v1/ticket", ticketController.crearTicket);
app.get("/api/v1/ticket", ticketController.traerTickets);
app.get("/api/v1/ticket/estado", ticketController.traerTicketsEstado);
app.get("/api/v1/ticket/tipo", ticketController.traerTicketsTipo);
app.get("/api/v1/ticket/oficina", ticketController.traerPorOficina);

// EMPLEADOS
app.post("/api/v1/empleado", empleadoController.crearEmpleado);
app.get("/api/v1/empleado", empleadoController.traerEmpleados);
app.get(
  "/api/v1/empleado/datos",
  empleadoController.traerEmpleadoNombreApellido
);

// OFICINAS
app.post("/api/v1/oficina", oficinaController.crearOficina);
app.get("/api/v1/oficina/cercana", oficinaController.traerOficinaCercana);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});