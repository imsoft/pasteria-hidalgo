import mongoose, { Model, Schema } from "mongoose";
import { AcondicionamientoDeSucursal } from "../interfaces";

export interface IAcondicionamientoDeSucursal
  extends AcondicionamientoDeSucursal {}

const acondicionamientoDeSucursalesSchema = new Schema({
  sucursalOFranquicia: { type: String, required: true },
  nombreSucursalOFranquicia: { type: String, required: true },
  producto: { type: String, required: true },
  fechaDeCompra: { type: String, required: true },
  descripcionDelProducto: { type: String, required: true },
  fechaEstimadaDeEntrega: { type: String, required: true },
  proveedor: { type: String, required: true },
  factura: { type: String, required: true },
  precioDeCompra: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  totalAcomulado: { type: Number, required: true },
});

const AcondicionamientoDeSucursalSchemaModel: Model<IAcondicionamientoDeSucursal> =
  mongoose.models.AcondicionamientoDeSucursal ||
  mongoose.model(
    "AcondicionamientoDeSucursal",
    acondicionamientoDeSucursalesSchema
  );

export default AcondicionamientoDeSucursalSchemaModel;
