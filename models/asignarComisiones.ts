import mongoose, { Model, Schema } from "mongoose";
import { AsignarComision } from "../interfaces/asignarComision";

export interface IAsignarComisiones extends AsignarComision {}

const asignarComisionSchema = new Schema({
  sucursalOFranquicia: { type: String, required: true },
  nombreSucursalOFranquicia: { type: String, required: true },
  mes: { type: String, required: true },
  anio: { type: String, required: true },
  minimoDeLaMeta: { type: Number, required: true },
});

const AsignarComisionModel: Model<AsignarComision> =
  mongoose.models.AsignarComision ||
  mongoose.model("AsignarComision", asignarComisionSchema);

export default AsignarComisionModel;
