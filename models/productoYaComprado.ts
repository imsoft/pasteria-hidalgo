import mongoose, { Model, Schema } from "mongoose";
import { ProductoYaComprado } from "../interfaces";

export interface IProductoYaComprado extends ProductoYaComprado {}

const productosYaCompradosSchema = new Schema({
  fechaDeCompra: { type: Date, required: true },
  precioDeCompra: { type: Number, required: true },
  descripcionDelProducto: { type: String, required: true },
  fechaDeEntrega: { type: Date, required: true },
  idProveedor: { type: String, required: true },
  facura: { type: Boolean, required: true },
  totalAcomulado: { type: Number, required: true },
});

const ProductosYaCompradosModel: Model<IProductoYaComprado> =
  mongoose.models.ProductosYaComprados ||
  mongoose.model("ProductosYaComprados", productosYaCompradosSchema);

export default ProductosYaCompradosModel;