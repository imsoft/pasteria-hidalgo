import mongoose, { Model, Schema } from "mongoose";
import { AsignarPrecio } from '../interfaces';

export interface IAsignarPrecio extends AsignarPrecio {}

const asignarPrecioSchema = new Schema({
  producto: { type: String, required: true },
  precioMaximo: { type: String, required: true },
});

const AsignarPrecioModel: Model<IAsignarPrecio> =
  mongoose.models.AsignarPrecio || mongoose.model("AsignarPrecio", asignarPrecioSchema);

export default AsignarPrecioModel;
