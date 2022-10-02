import { isValidObjectId } from "mongoose";
import { db } from ".";
import {
  IAcondicionamientoDeSucursal,
  AcondicionamientoDeSucursal,
} from "../models";

export const getAcondicionamientoDeSucursalById = async (
  id: string
): Promise<IAcondicionamientoDeSucursal | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();
  const acondicionamientoDeSucursales =
    await AcondicionamientoDeSucursal.findById(id).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(acondicionamientoDeSucursales));
};
