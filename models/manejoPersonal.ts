import mongoose, { Model, Schema } from "mongoose";
import { ManejoPersonal } from "../interfaces";

export interface IManejoPersonal extends ManejoPersonal {}

const manejoPersonalSchema = new Schema({
  nombre: { type: String, required: true },
  descripcionDelPuesto: { type: String, required: true },
});

const ManejoPersonalModel: Model<IManejoPersonal> =
  mongoose.models.ManejoPersonal ||
  mongoose.model("ManejoPersonal", manejoPersonalSchema);

export default ManejoPersonalModel;
