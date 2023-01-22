export const empleadoValidSchema = {
  body: {
    type: "object",
    required: ["nombres", "edad", "correo", "cargo", "salario"],
    properties: {
      nombres: {
        type: "string",
        minLength: 4,
      },
      apellidos: {
        type: "string",
        minLength: 4,
        maxLength: 50,
      },
      edad: {
        type: "number",
        minimum: 1,
        maximum: 100,
      },
      correo: {
        type: "string",
        format: "email",
      },
      salario: {
        type: "number",
      },
      cargo: {
        type: "string",
        minLength: 5,
      },
    },
  },
};
