import { response } from "../helpers/response.js";
import { empleadoModel } from "../models/empleado.model.js";
import { data } from "./data.js";

export const seedDb = async (req, reply) => {
    try {
        await empleadoModel.deleteMany();

        const empleados = await empleadoModel.create(data);
        
        response(reply, 201, true, empleados, "Población inyectada.")
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
}