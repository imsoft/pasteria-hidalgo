import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IPersonalDeMantenimiento, PersonalDeMantenimiento } from "../../../../models";

type Data = { message: string } | IPersonalDeMantenimiento;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getPersonalDeMantenimiento(req, res);

    case "PUT":
      return updatePersonalDeMantenimiento(req, res);

    case "DELETE":
      return deletePersonalDeMantenimiento(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getPersonalDeMantenimiento = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const personalDeMantenimientoInDB = await PersonalDeMantenimiento.findById(id);
  await db.disconnect();

  if (!personalDeMantenimientoInDB) {
    return res
      .status(400)
      .json({ message: "No hay Personal De Mantenimiento con ese ID: " + id });
  }

  return res.status(200).json(personalDeMantenimientoInDB);
};

const updatePersonalDeMantenimiento = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const personalDeMantenimientoToUpdate = await PersonalDeMantenimiento.findById(id);

  if (!personalDeMantenimientoToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Personal De Mantenimiento con ese ID: " + id });
  }

  const {
    nombre = personalDeMantenimientoToUpdate.nombre,
    oficio = personalDeMantenimientoToUpdate.oficio,
    direccion = personalDeMantenimientoToUpdate.direccion,
    telefono = personalDeMantenimientoToUpdate.telefono,
  } = req.body;

  try {
    const updatedPersonalDeMantenimiento = await PersonalDeMantenimiento.findByIdAndUpdate(
      id,
      {
        nombre,
        oficio,
        direccion,
        telefono,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedPersonalDeMantenimiento!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deletePersonalDeMantenimiento = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const personalDeMantenimientoDBToDelete = await PersonalDeMantenimiento.findByIdAndDelete(id);
  await db.disconnect();

  if (!personalDeMantenimientoDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Personal De Mantenimiento con ese ID: " + id });
  }

  return res.status(200).json(personalDeMantenimientoDBToDelete);
};
