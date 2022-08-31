import mongoose, { Schema, Model } from "mongoose";
import { SucursalesYFranquicias } from "../interfaces";

const sucursalesYFranquiciasSchema = new Schema({
  direccion: { type: String, required: true },
  distancia: { type: Number, required: true },
});

const SucursalesYFranquiciasModel: Model<SucursalesYFranquicias> =
  mongoose.models.SucursalesYFranquicias ||
  mongoose.model("SucursalesYFranquicias", sucursalesYFranquiciasSchema);

export default SucursalesYFranquiciasModel;
