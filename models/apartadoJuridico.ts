import mongoose, { Model, Schema } from "mongoose";
import { ApartadoJuridico } from "../interfaces";

export interface IApartadoJuridico extends ApartadoJuridico {}

const apartadoJuridicoSchema = new Schema({
  sucursalOFranquicia: { type: String, required: true },
  sucursales: { type: String, required: false },
  franquicias: { type: String, required: false },
  documento: { type: String, required: true },
});

const ApartadoJuridicoModel: Model<ApartadoJuridico> =
  mongoose.models.ApartadoJuridico ||
  mongoose.model("ApartadoJuridico", apartadoJuridicoSchema);

export default ApartadoJuridicoModel;
