const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(express.json());

const connectDB = require("./connectMongo");
connectDB();
app.use(cors());

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
app.get("/api/v1/ticket/cercano", ticketController.traerTicketsCercanos);
app.get("/api/v1/ticket/derivaciones", ticketController.traerTicketsDerivados);
app.get(
  "/api/v1/ticket/soluciones",
  ticketController.traerTicketsVariasSoluciones
);
app.get(
  "/api/v1/ticket/spuerpackfull/barato",
  ticketController.traerSuperPackFullBarato
);
app.get(
  "/api/v1/ticket/spuerpackfull",
  ticketController.traerCanalesSuperPackFull
);
app.get(
  "/api/v1/ticket/traerExcluyenteLocalidad",
  ticketController.traerExcluyenteLocalidad
);
app.get(
  "/api/v1/ticket/traerIncluyenteLocalidad",
  ticketController.traerIncluyenteLocalidad
);

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
app.get("/api/v1/oficina/tipo", oficinaController.traerOficinaTipo);
app.get("/api/v1/oficina/tipoEx", oficinaController.traerOficinaTipoEx);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
