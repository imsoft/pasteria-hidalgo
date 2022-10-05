import mongoose, { Model, Schema } from "mongoose";
import { Candidato } from "../interfaces";

export interface ICandidato extends Candidato {}

const candidatoSchema = new Schema({
  nombre: { type: String, required: true },
  puesto: { type: String, required: true },
  descripcionDelPuesto: { type: String, required: true },
  fechaDeNacimiento: { type: String, required: true },
  domicilio: { type: String, required: true },
  curp: { type: String, required: true },
  noImss: { type: String, required: false },
  noCartaDePolicia: { type: String, required: true },
  celular: { type: String, required: true },
  contactoDeEmergencia: { type: String, required: true },
  correoElectronico: { type: String, required: true },
  referencia1Nombre: { type: String, required: true },
  referencia1Empresa: { type: String, required: true },
  referencia1CorreoElectronico: { type: String, required: true },
  referencia2Nombre: { type: String, required: true },
  referencia2Empresa: { type: String, required: true },
  referencia2CorreoElectronico: { type: String, required: true },
  referencia3Nombre: { type: String, required: false },
  referencia3Empresa: { type: String, required: false },
  referencia3CorreoElectronico: { type: String, required: false },
});

const CandidatoModel: Model<ICandidato> =
  mongoose.models.Candidato || mongoose.model("Candidato", candidatoSchema);

export default CandidatoModel;
