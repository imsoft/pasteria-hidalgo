import mongoose, { Model, Schema } from "mongoose";
import { Mantenimiento } from "../interfaces";

export interface IMantenimiento extends Mantenimiento {}

const mantenimientoSchema = new Schema({
  sucursalOFranquicia: { type: String, required: true },
  nombreSucursalOFranquicia: { type: String, required: true },
  nombreMaquina: { type: String, required: true },
  proveedor: { type: String, required: true },
  fechaDeGarantia: { type: String, required: true },
  fechaDeMantenimiento: { type: String, required: true },
  modificacionDeMantenimiento: { type: String, required: true },
});

const MantenimientoModel: Model<IMantenimiento> =
  mongoose.models.Mantenimiento ||
  mongoose.model("Mantenimiento", mantenimientoSchema);

export default MantenimientoModel;
