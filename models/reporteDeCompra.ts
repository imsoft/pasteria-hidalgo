import mongoose, { Model, Schema } from "mongoose";
import { ReporteDeCompra } from "../interfaces";

export interface IReporteDeCompra extends ReporteDeCompra {}

const reporteDeCompraSchema = new Schema({
  idReporteDeCompra: { type: String, required: true },
  codigoDeReporte: { type: String, required: true },
  fechaDeCompra: { type: Date, required: true },
  credito: { type: Boolean, required: true },
  fechaDePago: { type: Date, required: true },
  idMateriaPrima: { type: String, required: true },
  materiaPrima: { type: [String], required: true },
  cantidad: { type: Number, required: true },
  unidades: { type: String, required: true },
  idProveedor: { type: String, required: true },
  nombreProveedor: { type: String, required: true },
  precioPorUnidad: { type: Number, required: true },
  precioTotalDelProducto: { type: Number, required: true },
  precioTotalDelCompra: { type: Number, required: true },
  tempetatura: { type: Number, required: true },
  caducidad: { type: Date, required: true },
  factura: { type: Boolean, required: true },
});

const ReporteDeCompraModel: Model<IReporteDeCompra> =
  mongoose.models.ReporteDeCompra ||
  mongoose.model("ReporteDeCompra", reporteDeCompraSchema);

export default ReporteDeCompraModel;