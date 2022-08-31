import mongoose, { Model, Schema } from "mongoose";
import { ClienteFrecuente } from "../interfaces";

const clienteFrecuenteSchema = new Schema({
  nombre: { type: String, required: true },
  correoElectronico: { type: String, required: true },
  fechaDeNacimiento: { type: Date, required: true },
});

const ClienteFrecuenteModel: Model<ClienteFrecuente> =
  mongoose.models.ClienteFrecuente ||
  mongoose.model("ClienteFrecuente", clienteFrecuenteSchema);

export default ClienteFrecuenteModel;
