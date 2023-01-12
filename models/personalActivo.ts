import mongoose from "mongoose";
import { PersonalActivo } from "../interfaces";

export interface IPersonalActivo extends PersonalActivo {}

const personalActivoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  puesto: { type: String, required: true },
  fechaDeContratacion: { type: String, required: true },
  noContrato: { type: String, required: true },
  noExpediente: { type: String, required: true },
  bajaTemporal: { type: String, required: true },
  comentarios: { type: String, required: true },
});

const PersonalActivoModel: mongoose.Model<IPersonalActivo> =
  mongoose.models.PersonalActivo ||
  mongoose.model("PersonalActivo", personalActivoSchema);

export default PersonalActivoModel;