import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IManejoDeAlmacen, ManejoDeAlmacen } from "../../../../models";

type Data = { message: string } | IManejoDeAlmacen;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getManejoDeAlmacen(req, res);

    case "PUT":
      return updateManejoDeAlmacen(req, res);

    case "DELETE":
      return deleteManejoDeAlmacen(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getManejoDeAlmacen = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const manejoDeAlmacenInDB = await ManejoDeAlmacen.findById(id);
  await db.disconnect();

  if (!manejoDeAlmacenInDB) {
    return res
      .status(400)
      .json({ message: "No hay Manejo De Almacen con ese ID: " + id });
  }

  return res.status(200).json(manejoDeAlmacenInDB);
};

const updateManejoDeAlmacen = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const manejoDeAlmacenToUpdate = await ManejoDeAlmacen.findById(id);

  if (!manejoDeAlmacenToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Manejo De Almacen con ese ID: " + id });
  }

  const {
    materiaPrima = manejoDeAlmacenToUpdate.materiaPrima,
    unidades = manejoDeAlmacenToUpdate.unidades,
    temperatura = manejoDeAlmacenToUpdate.temperatura,
    cantidad = manejoDeAlmacenToUpdate.cantidad,
  } = req.body;

  try {
    const updatedManejoDeAlmacen = await ManejoDeAlmacen.findByIdAndUpdate(
      id,
      {
        materiaPrima,
        unidades,
        temperatura,
        cantidad,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedManejoDeAlmacen!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteManejoDeAlmacen = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const manejoDeAlmacenDBToDelete = await ManejoDeAlmacen.findByIdAndDelete(id);
  await db.disconnect();

  if (!manejoDeAlmacenDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Manejo De Almacen con ese ID: " + id });
  }

  return res.status(200).json(manejoDeAlmacenDBToDelete);
};
