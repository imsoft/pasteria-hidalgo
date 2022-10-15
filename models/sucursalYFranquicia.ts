import mongoose, { Schema, Model } from "mongoose";
import { SucursalYFranquicia } from "../interfaces";

export interface ISucursalYFranquicia extends SucursalYFranquicia {}

const sucursalesYFranquiciasSchema = new Schema({
  sucursalOFranquicia: { type: String, required: true },
  franquicias: { type: String, required: false },
  sucursales: { type: String, required: false },
  direccion: { type: String, required: true },
  distancia: { type: String, required: true },
  fechaDePago: { type: String, required: true },
  montoDePago: { type: String, required: true },
  cuentaBancaria: { type: String, required: true },
  banco: { type: String, required: true },
  nombreDelBeneficiario: { type: String, required: true },
  rfc: { type: String, required: true },
});

const SucursalesYFranquiciasModel: Model<ISucursalYFranquicia> =
  mongoose.models.SucursalesYFranquicias ||
  mongoose.model("SucursalesYFranquicias", sucursalesYFranquiciasSchema);

export default SucursalesYFranquiciasModel;
