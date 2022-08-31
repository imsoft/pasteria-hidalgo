import mongoose, { Model, Schema } from "mongoose";
import { ManejoPersonal } from "../interfaces";

const manejoPersonalSchema = new Schema({
  nombre: { type: String, required: true },
  descripcionDelPuesto: { type: String, required: true },
});

const ManejoPersonalModel: Model<ManejoPersonal> =
  mongoose.models.ManejoPersonal ||
  mongoose.model("ManejoPersonal", manejoPersonalSchema);

export default ManejoPersonalModel;
