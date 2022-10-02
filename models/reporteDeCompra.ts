import mongoose, { Model, Schema } from "mongoose";
import { ReporteDeCompra } from "../interfaces";

export interface IReporteDeCompra extends ReporteDeCompra {}

const reporteDeCompraSchema = new Schema({
  idReporteDeCompra: { type: String, required: true },
  codigoDeReporte: { type: String, required: true },
  fechaDeCompra: { type: String, required: true },
  credito: { type: String, required: true },
  idMateriaPrima: { type: String, required: true },
  materiaPrima: { type: String, required: true },
  cantidad: { type: String, required: true },
  unidades: { type: String, required: true },
  idProveedor: { type: String, required: true },
  nombreProveedor: { type: String, required: true },
  precioPorUnidad: { type: String, required: true },
  precioTotalDelProducto: { type: String, required: true },
  precioTotalDelCompra: { type: String, required: true },
  tempetatura: { type: String, required: true },
  caducidad: { type: String, required: true },
  factura: { type: String, required: true },
});

const ReporteDeCompraModel: Model<IReporteDeCompra> =
  mongoose.models.ReporteDeCompra ||
  mongoose.model("ReporteDeCompra", reporteDeCompraSchema);

export default ReporteDeCompraModel;