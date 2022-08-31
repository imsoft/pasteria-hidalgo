import mongoose from "mongoose";
import { PersonalActivo } from "../interfaces";

const personalActivoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  puesto: { type: String, required: true },
  fechaDeContratacion: { type: Date, required: true },
  noContrato: { type: String, required: true },
  noExpediente: { type: String, required: true },
});

const PersonalActivoModel: mongoose.Model<PersonalActivo> =
  mongoose.models.PersonalActivo ||
  mongoose.model("PersonalActivo", personalActivoSchema);

export default PersonalActivoModel;
