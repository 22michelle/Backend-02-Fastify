import { response } from "../helpers/response.js";
import { empleadoModel } from "../models/empleado.model.js";
response;

const empleadoCtrl = {};

empleadoCtrl.listar = async (req, reply) => {
  try {
    // const empleados = await empleadoModel.find()
    // response(res, 200, true, empleados, "Lista de empleados");

    // const limit = parseInt(req.query.limit) || 10;

    // const page = parseInt(req.query.page) || 1;

    const opciones = {
      limit: parseInt(req.query.limit) || 10,
      page: parseInt(req.query.page) || 1,
    };

    const empleados = await empleadoModel.paginate({}, opciones);

    response(reply, 200, true, empleados, "Lista de empleados");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

empleadoCtrl.listById = async (req, reply) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoModel.findById(id);

    if (!empleado) {
      return response(
        reply,
        404,
        false,
        "",
        "El empleado no ha sido encontrado."
      );
    }

    response(reply, 200, true, empleado, "Empleado encontrado con éxito.");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

empleadoCtrl.guardar = async (req, reply) => {
  try {
    const { correo } = req.body;

    const empleado = await empleadoModel.findOne({ correo });

    if (empleado) {
      return response(
        reply,
        400,
        false,
        "",
        `El correo ${correo} ya existe, inténtalo de nuevo.`
      );
    }

    const nuevoEmpleado = await empleadoModel.create(req.body);

    // const nuevoEmpleado = new empleadoModel({
    //     nombres,
    //     apellidos,
    //     correo,
    //     salario,
    //     edad,
    //     cargo,
    // });

    // await nuevoEmpleado.save();

    response(
      reply,
      201,
      true,
      nuevoEmpleado,
      "El empleado ha sido creado con éxito."
    );
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

empleadoCtrl.actualizar = async (req, reply) => {
  try {
    const { id } = req.params;

    const { correo } = req.body;

    const empleado = await empleadoModel.findById(id);

    if (!empleado) {
      return response(
        reply,
        404,
        false,
        "",
        "El registro no ha sido encontrado."
      );
    }

    if (empleado.correo != correo) {
      const empleadoCorreo = await empleadoModel.findOne({ correo });

      if (empleadoCorreo) {
        return response(
          reply,
          400,
          false,
          "",
          `El correo ${correo} ya existe, intente de nuevo.`
        );
      }
    }

    await empleado.updateOne(req.body);

    // await empleadoModel.findByIdAndUpdate({_id: id}, req.body);

    response(
      reply,
      200,
      true,
      "",
      "El registro se ha actuzalizado correctamente."
    );
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

empleadoCtrl.eliminar = async (req, reply) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoModel.findById(id);

    if (!empleado) {
      return response(
        reply,
        404,
        false,
        "",
        "El empleado no ha sido encontrado"
      );
    }

    await empleado.deleteOne();

    response(
      reply,
      200,
      true,
      empleado,
      "El empleado se ha eliminado con éxito."
    );
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default empleadoCtrl;
