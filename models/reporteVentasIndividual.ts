import mongoose, { Model, Schema } from "mongoose";
import { ReporteVentasIndividual } from "../interfaces";

export interface IReporteVentasIndividual extends ReporteVentasIndividual {}

const reporteVentasIndividualSchema = new Schema({
  fecha: { type: String, required: true },
  nombreDelVendedor: { type: String, required: true },
  lugarDeVenta: { type: String, required: true },
  nombreLugarDeVenta: { type: String, required: true },
  totalDeLaVenta: { type: Number, required: true },
  listadoDeProductos: [
    {
      idProducto: { type: String, required: true },
      tipoDeProducto: { type: String, required: true },
      saborProducto: { type: String, required: true },
      cantidad: { type: Number, required: true },
      precioProducto: { type: Number, required: true },
      monto: { type: Number, required: true },
    },
  ],
  correoElectronicoClienteFrecuente: { type: String, required: false },
  puntosClienteFrecuente: { type: Number, required: false },
});

const ReporteVentasIndividualModel: Model<IReporteVentasIndividual> =
  mongoose.models.ReporteVentasIndividual ||
  mongoose.model("ReporteVentasIndividual", reporteVentasIndividualSchema);

export default ReporteVentasIndividualModel;
