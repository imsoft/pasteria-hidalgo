import mongoose, { Model, Schema } from "mongoose";
import { ReporteDeSalida } from "../interfaces/reporteDeSalida";

export interface IReporteDeSalida extends ReporteDeSalida {}

const reporteDeSalidaSchema = new Schema({
  fecha: { type: String, required: true },
  productoExtra: { type: String, required: true },
  codigoDeProductoExtra: { type: String, required: true },
  cantidadDeProductoExtra: { type: String, required: true },
  unidadesDeProductoExtra: { type: String, required: true },
  codigoDeMasa: { type: String, required: true },
  masa: { type: String, required: true },
  cantidadDeMasa: { type: String, required: true },
  unidadesDeMasa: { type: String, required: true },
  rellenos: { type: String, required: true },
  codigosDeRelleno: { type: String, required: true },
  cantidadDeProductoExtraRelleno: { type: String, required: true },
  unidadesDeRelleno: { type: String, required: true },
  temperaturaDeRellenos: { type: String, required: true },
  sucursalAEnviar: { type: String, required: true },
  datosDeRepartidor: { type: String, required: true },
  datosDeLaRuta: { type: String, required: true },
  kilometrajeDeEntrada: { type: String, required: true },
  kilometrajeDeSalida: { type: String, required: true },
});

const ReporteDeSalidaModel: Model<IReporteDeSalida> =
  mongoose.models.ReporteDeSalida ||
  mongoose.model("ReporteDeSalida", reporteDeSalidaSchema);

export default ReporteDeSalidaModel;
