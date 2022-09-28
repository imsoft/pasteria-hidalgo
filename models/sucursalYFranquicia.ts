import mongoose, { Schema, Model } from "mongoose";
import { SucursalYFranquicia } from "../interfaces";

export interface ISucursalYFranquicia extends SucursalYFranquicia {}

const sucursalesYFranquiciasSchema = new Schema({
  direccion: { type: String, required: true },
  distancia: { type: Number, required: true },
});

const SucursalesYFranquiciasModel: Model<ISucursalYFranquicia> =
  mongoose.models.SucursalesYFranquicias ||
  mongoose.model("SucursalesYFranquicias", sucursalesYFranquiciasSchema);

export default SucursalesYFranquiciasModel;
