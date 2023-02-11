import mongoose, { Model, Schema } from "mongoose";
import { ReporteDeCompra } from "../interfaces";

export interface IReporteDeCompra extends ReporteDeCompra {}

const reporteDeCompraSchema = new Schema({
  fechaDeCompra: { type: String, required: true },
  credito: { type: String, required: true },
  nombreProveedor: { type: String, required: true },
  factura: { type: String, required: true },
  cantidad: { type: Number, required: true },
  listadoDeProductos: [
    {
      materiaPrima: { type: String, required: true },
      unidades: { type: String, required: true },
      tempetatura: { type: String, required: true },
      precioPorUnidad: { type: Number, required: true },
      precioTotalDelProducto: { type: Number, required: true },
      caducidad: { type: String, required: true },
    },
  ],
  precioTotalDelCompra: { type: Number, required: true },
});

const ReporteDeCompraModel: Model<IReporteDeCompra> =
  mongoose.models.ReporteDeCompra ||
  mongoose.model("ReporteDeCompra", reporteDeCompraSchema);

export default ReporteDeCompraModel;
