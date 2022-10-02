import mongoose, { Model, Schema } from "mongoose";
import { Proveedor } from "../interfaces";

export interface IProveedor extends Proveedor {}

const proveedoresSchema = new Schema({
  nombre: { type: String, required: true, },
  direccion: { type: String, required: true, },
  telefono: { type: String, required: true, },
  horarioAtencion: { type: String, required: true, },
  productosQueSeCompran: { type: String, required: true, },
  entregasADomicilio: { type: String, required: true, },
});

const ProveedoresModel: Model<IProveedor> =
  mongoose.models.Proveedores ||
  mongoose.model("Proveedores", proveedoresSchema);

export default ProveedoresModel;
