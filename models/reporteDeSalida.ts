import mongoose, { Model, Schema } from "mongoose";
import { ReporteDeSalida } from "../interfaces/reporteDeSalida";

export interface IReporteDeSalida extends ReporteDeSalida {}

const reporteDeSalidaSchema = new Schema({
  fecha: { type: String, required: true },
  productoExtra: { type: String, required: true },
  codigoDeProductoExtra: { type: String, required: true },
  cantidadDeProductoExtra: { type: String, required: true },
  unidadesDeProductoExtra: { type: String, required: true },
  listadoDeProductos: [{
    idProducto: { type: String, required: true },
    tipoDeProducto: { type: String, required: true },
    saborProducto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precioProducto: { type: Number, required: true },
    monto: { type: Number, required: true },
  }],
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
