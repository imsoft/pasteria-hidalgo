import mongoose, { Model, Schema } from "mongoose";
import { ReporteVentasAmbulantesIndividual } from "../interfaces";

export interface IReporteVentasAmbulantesIndividual extends ReporteVentasAmbulantesIndividual {}

const reporteVentasAmbulantesIndividualSchema = new Schema({
  fecha: { type: String, required: true },
  nombreDelVendedor: { type: String, required: true },
  totalDeLaVenta: { type: Number, required: true },
  listadoDeProductos: [{
    idProducto: { type: String, required: true },
    tipoDeProducto: { type: String, required: true },
    saborProducto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precioProducto: { type: Number, required: true },
    monto: { type: Number, required: true },
  }],
});

const ReporteVentasAmbulantesIndividualModel: Model<IReporteVentasAmbulantesIndividual> =
  mongoose.models.ReporteVentasAmbulantesIndividual ||
  mongoose.model("ReporteVentasAmbulantesIndividual", reporteVentasAmbulantesIndividualSchema);

export default ReporteVentasAmbulantesIndividualModel;
