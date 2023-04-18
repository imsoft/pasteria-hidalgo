import { isValidObjectId } from "mongoose";
import { IManejoDeAlmacen, ManejoDeAlmacen } from "../models";
import { db } from "./";

export const getManejoDeAlmacenById = async (
  id: string
): Promise<IManejoDeAlmacen | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();
  const manejoDeAlmacen = await ManejoDeAlmacen.findById(id).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(manejoDeAlmacen));
};
