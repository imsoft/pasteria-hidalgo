import mongoose, { Model, Schema } from "mongoose";
import { ClienteFrecuente } from "../interfaces";

export interface IClienteFrecuente extends ClienteFrecuente {}

const clienteFrecuenteSchema = new Schema({
  nombre: { type: String, required: true },
  correoElectronico: { type: String, required: true },
  fechaDeNacimiento: { type: String, required: true },
  puntosDeCompra: { type: Number, required: true },
  sucursal: { type: String, required: true },
  franquicia: { type: String, required: true },
});

const ClienteFrecuenteModel: Model<ClienteFrecuente> =
  mongoose.models.ClienteFrecuente ||
  mongoose.model("ClienteFrecuente", clienteFrecuenteSchema);

export default ClienteFrecuenteModel;
