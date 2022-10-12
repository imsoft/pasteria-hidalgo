import mongoose, { Model, Schema } from "mongoose";
import { CheckInPersonal } from "../interfaces";

export interface ICheckInPersonal extends CheckInPersonal {}

const checkInPersonalSchema = new Schema({
  sucursalOFranquicia: { type: String, required: true },
  nombre: { type: String, required: true },
  fecha: { type: String, required: true },
  horaDeIngreso: { type: String, required: true },
  horaDeSalida: { type: String, required: true },
  sucursales: { type: String, required: false },
  franquicias: { type: String, required: false },
});

const CheckInPersonalModel: Model<CheckInPersonal> =
  mongoose.models.CheckInPersonal ||
  mongoose.model("CheckInPersonal", checkInPersonalSchema);

export default CheckInPersonalModel;
