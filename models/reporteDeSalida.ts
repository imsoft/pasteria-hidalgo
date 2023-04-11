import mongoose, { Model, Schema } from "mongoose";
import { ReporteDeSalida } from "../interfaces/reporteDeSalida";

export interface IReporteDeSalida extends ReporteDeSalida {}

const reporteDeSalidaSchema = new Schema({
  sucursalAEnviar: { type: String, required: true },
  nombreDelRepartidor: { type: String, required: true },
  datosDeLaRuta: { type: String, required: true },
  kilometrajeDeEntrada: { type: String, required: true },
  kilometrajeDeSalida: { type: String, required: true },
  listadoReporteDeSalida: [
    {
      fecha: { type: String, required: true },
      tipoDeProducto: { type: String, required: true },
      producto: { type: String, required: true },
      codigoDelProducto: { type: String, required: true },
      cantidadDeProducto: { type: Number, required: true },
    },
  ],
});

const ReporteDeSalidaModel: Model<IReporteDeSalida> =
  mongoose.models.ReporteDeSalida ||
  mongoose.model("ReporteDeSalida", reporteDeSalidaSchema);

export default ReporteDeSalidaModel;
