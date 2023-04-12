import mongoose, { Model, Schema } from "mongoose";
import { ApartadoJuridico } from "../interfaces";

export interface IApartadoJuridico extends ApartadoJuridico {}

const apartadoJuridicoSchema = new Schema({
  sucursalOFranquicia: { type: String, required: true },
  nombreSucursalOFranquicia: { type: String, required: true },
  nombreDelArchivo: { type: String, required: true },
  urlDelArchivo: { type: String, required: true },
});

const ApartadoJuridicoModel: Model<ApartadoJuridico> =
  mongoose.models.ApartadoJuridico ||
  mongoose.model("ApartadoJuridico", apartadoJuridicoSchema);

export default ApartadoJuridicoModel;
