import mongoose, { Model, Schema } from "mongoose";
import { Candidato } from "../interfaces";

export interface ICandidato extends Candidato {}

const candidatoSchema = new Schema({
  nombre: { type: String, required: true },
  puesto: { type: String, required: true },
  descripcionDelPuesto: { type: String, required: true },
  fechaDeNacimiento: { type: Date, required: true },
  domicilio: { type: String, required: true },
  curp: { type: String, required: true },
  noImss: { type: String, required: true },
  noCartaDePolicia: { type: String, required: true },
});

const CandidatoModel: Model<ICandidato> =
  mongoose.models.Candidato || mongoose.model("Candidato", candidatoSchema);

export default CandidatoModel;
