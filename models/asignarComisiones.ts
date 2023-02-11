import mongoose, { Model, Schema } from "mongoose";
import { AsignarComision } from '../interfaces/asignarComision';

export interface IAsignarComisiones extends AsignarComision {}

const asignarComisionSchema  = new Schema({
  sucursalOFranquicia: { type: String, required: true },
  minimoDeLaMeta: { type: Number, required: true },
  sucursales: { type: String, required: false },
  franquicias: { type: String, required: false },
});

const AsignarComisionModel: Model<AsignarComision> =
  mongoose.models.AsignarComision ||
  mongoose.model("AsignarComision", asignarComisionSchema);

export default AsignarComisionModel;
