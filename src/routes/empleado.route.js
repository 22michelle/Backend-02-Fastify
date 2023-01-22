import empleadoCtrl from "../controllers/empleado.controller.js";
import { seedDb } from "../seed/seedDb.js";
import { empleadoValidSchema } from "../validSchema/empleadoValid.js";

export const empleadoRoutes = (fastify, opts, done) => {

  // RUTAS
  fastify.get("/seed", seedDb);

  fastify.get("/", empleadoCtrl.listar);
  fastify.get("/:id", empleadoCtrl.listById);
  fastify.post("/", { schema: empleadoValidSchema }, empleadoCtrl.guardar);

  fastify.put("/:id", { schema: empleadoValidSchema }, empleadoCtrl.actualizar);
  fastify.delete("/:id", empleadoCtrl.eliminar);

  done();
};
