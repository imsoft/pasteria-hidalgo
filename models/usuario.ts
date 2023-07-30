import mongoose, { Model, Schema } from "mongoose";
import { Usuario } from "../interfaces";

export interface IUsuario extends Usuario {}

const usuarioSchema = new Schema(
  {
    nombre: { type: String, required: true },
    correoElectronico: { type: String, required: true, unique: true },
    contrasenia: { type: String, required: true },
    sucursalOFranquicia: { type: String, required: true },
    nombreSucursalOFranquicia: { type: String, required: true },
    role: [
      {
        type: String,
        enum: {
          values: [
            "admin",
            "contaduria",
            "gerencia de compras",
            "gerencia de ventas",
            "gerencia operativa",
            "recursos humanos",
          ],
          message: "{VALUE} no es un rol valido",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const UsuarioModel: Model<Usuario> =
  mongoose.models.Usuario || mongoose.model("Usuario", usuarioSchema);

export default UsuarioModel;
