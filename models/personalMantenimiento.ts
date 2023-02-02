import mongoose, { Model, Schema } from "mongoose";
import { PersonalDeMantenimiento } from "../interfaces";

export interface IPersonalDeMantenimiento extends PersonalDeMantenimiento {}

const personalDeMantenimientoSchema = new Schema({
  nombre: { type: String, required: true },
  oficio: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
});

const PersonalDeMantenimientoModel: Model<IPersonalDeMantenimiento> =
  mongoose.models.PersonalDeMantenimiento || mongoose.model("PersonalDeMantenimiento", personalDeMantenimientoSchema);

export default PersonalDeMantenimientoModel;
