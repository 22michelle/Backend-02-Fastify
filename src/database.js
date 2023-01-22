import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const uri = "mongodb+srv://prueba:prueba@cluster0.noyz2br.mongodb.net/Backend2";

export const conectarDb = async () => {
  try {
    const db = await mongoose.connect(uri);
    console.log("Base de datos conectada con éxito", db.connection.name);
  } catch (error) {
    console.log(
      `Ha sucedido un error al conectar con la base de datos ${error.message}`
    );
  }
};
