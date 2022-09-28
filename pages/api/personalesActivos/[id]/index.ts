import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IPersonalActivo, PersonalActivo } from "../../../../models";

type Data = { message: string } | IPersonalActivo;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getPersonalActivo(req, res);

    case "PUT":
      return updatePersonalActivo(req, res);

    case "DELETE":
      return deletePersonalActivo(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getPersonalActivo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const personalActivoInDB = await PersonalActivo.findById(id);
  await db.disconnect();

  if (!personalActivoInDB) {
    return res
      .status(400)
      .json({ message: "No hay Personal Activo con ese ID: " + id });
  }

  return res.status(200).json(personalActivoInDB);
};

const updatePersonalActivo = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const personalActivoToUpdate = await PersonalActivo.findById(id);

  if (!personalActivoToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Personal Activo con ese ID: " + id });
  }

  const {
    nombre = personalActivoToUpdate.nombre,
    puesto = personalActivoToUpdate.puesto,
    fechaDeContratacion = personalActivoToUpdate.fechaDeContratacion,
    noContrato = personalActivoToUpdate.noContrato,
    noExpediente = personalActivoToUpdate.noExpediente,
  } = req.body;

  try {
    const updatedPersonalActivo = await PersonalActivo.findByIdAndUpdate(
      id,
      {
        nombre,
        puesto,
        fechaDeContratacion,
        noContrato,
        noExpediente,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedPersonalActivo!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deletePersonalActivo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const personalActivoDBToDelete = await PersonalActivo.findByIdAndDelete(id);
  await db.disconnect();

  if (!personalActivoDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Personal Activo con ese ID: " + id });
  }

  return res.status(200).json(personalActivoDBToDelete);
};
