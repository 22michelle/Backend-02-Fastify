import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const {Schema, model} = mongoose;

const empleadoShema = new Schema ({
    nombres:{
        type: String,
        required:[true, "El campo nombres es requerido"]
    },
    apellidos:{
        type: String,
        default: "",
    },
    correo:{
        type: String,
        unique: true,
        required: [true, "El campo correo es requerido"],
    },
    edad:{
        type: Number,
        required: [true, "El campo edad es requerido"],
    },
    salario:{
        type: Number,
        required: [true, "El campo salario es requerido"],
    },
    cargo:{
        type: String,
        required: [true, "El campo cargo es requerido"],
    },
},
{
    timestamps: true,
}
);

empleadoShema.plugin(mongoosePaginate);

export const empleadoModel = model("empleados", empleadoShema);

