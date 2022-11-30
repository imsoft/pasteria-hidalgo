import mongoose, { Model, Schema } from "mongoose";
import { MateriaPrima } from "../interfaces";

export interface IMateriaPrima extends MateriaPrima {}

const materiaPrimaSchema = new Schema({
  materiaPrima: { type: String, required: true },
  unidades: { type: String, required: true },
  temperatura: { type: String, required: true },
});

const MateriaPrimaModel: Model<IMateriaPrima> =
  mongoose.models.MateriaPrima || mongoose.model("MateriaPrima", materiaPrimaSchema);

export default MateriaPrimaModel;
