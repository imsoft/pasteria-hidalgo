import mongoose, { Model, Schema } from "mongoose";
import { ListaManejoDeAlmacen } from "../interfaces";


export interface IListaManejoDeAlmacen extends ListaManejoDeAlmacen {}

const manejoDeAlmacenSchema = new Schema({
  listaManejoDeAlmacen: [
    {
      materiaPrima: { type: String, required: true },
      unidades: { type: String, required: true },
      temperatura: { type: String, required: true },
      cantidad: { type: Number, required: true },
    },
  ],
});

const ManejoDeAlmacenModel: Model<IListaManejoDeAlmacen> =
  mongoose.models.ManejoDeAlmacen ||
  mongoose.model("ManejoDeAlmacen", manejoDeAlmacenSchema);

export default ManejoDeAlmacenModel;
