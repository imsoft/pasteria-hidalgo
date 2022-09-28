import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IManejoPersonal, ManejoPersonal } from "../../../../models";

type Data = { message: string } | IManejoPersonal;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getManejoPersonal(req, res);

    case "PUT":
      return updateManejoPersonal(req, res);

    case "DELETE":
      return deleteManejoPersonal(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getManejoPersonal = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const manejoPersonalInDB = await ManejoPersonal.findById(id);
  await db.disconnect();

  if (!manejoPersonalInDB) {
    return res
      .status(400)
      .json({ message: "No hay Manejo Personal con ese ID: " + id });
  }

  return res.status(200).json(manejoPersonalInDB);
};

const updateManejoPersonal = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const manejoPersonalToUpdate = await ManejoPersonal.findById(id);

  if (!manejoPersonalToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Manejo Personal con ese ID: " + id });
  }

  const {
    nombre = manejoPersonalToUpdate.nombre,
    descripcionDelPuesto = manejoPersonalToUpdate.descripcionDelPuesto,
  } = req.body;

  try {
    const updatedManejoPersonal = await ManejoPersonal.findByIdAndUpdate(
      id,
      {
        nombre,
        descripcionDelPuesto,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedManejoPersonal!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteManejoPersonal = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const manejoPersonalDBToDelete = await ManejoPersonal.findByIdAndDelete(id);
  await db.disconnect();

  if (!manejoPersonalDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Manejo Personal con ese ID: " + id });
  }

  return res.status(200).json(manejoPersonalDBToDelete);
};
