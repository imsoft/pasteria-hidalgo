import mongoose, { Model, Schema } from "mongoose";
import { ReporteDeGanancia } from "../interfaces";

export interface IReporteDeGanancia extends ReporteDeGanancia {}

const reporteDeGananciaSchema = new Schema({
  mes: { type: String, required: true },
  anio: { type: String, required: true },
  sucursal: [{ type: String, required: false }],
  totalVentas: { type: Number, required: true },
  totalCompras: { type: Number, required: true },
  balance: { type: Number, required: true },
});

const ReporteDeGananciaModel: Model<IReporteDeGanancia> =
  mongoose.models.ReporteDeGanancia ||
  mongoose.model("ReporteDeGanancia", reporteDeGananciaSchema);

export default ReporteDeGananciaModel;