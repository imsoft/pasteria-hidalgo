import mongoose, { Model, Schema } from "mongoose";
import { ManejoDeAlmacen } from "../interfaces";

export interface IManejoDeAlmacen extends ManejoDeAlmacen {}

const manejoDeAlmacenSchema = new Schema({
  materiaPrima: { type: String, required: true },
  unidades: { type: String, required: true },
  temperatura: { type: String, required: true },
  cantidad: { type: Number, required: true },
});

const ManejoDeAlmacenModel: Model<IManejoDeAlmacen> =
  mongoose.models.ManejoDeAlmacen ||
  mongoose.model("ManejoDeAlmacen", manejoDeAlmacenSchema);

export default ManejoDeAlmacenModel;
