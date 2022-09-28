import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { ClienteFrecuente, IClienteFrecuente } from "../../../../models";

type Data = { message: string } | IClienteFrecuente;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getClienteFrecuente(req, res);

    case "PUT":
      return updateClienteFrecuente(req, res);

    case "DELETE":
      return deleteClienteFrecuente(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getClienteFrecuente = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const clienteFrecuenteInDB = await ClienteFrecuente.findById(id);
  await db.disconnect();

  if (!clienteFrecuenteInDB) {
    return res
      .status(400)
      .json({ message: "No hay candidato con ese ID: " + id });
  }

  return res.status(200).json(clienteFrecuenteInDB);
};

const updateClienteFrecuente = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const clienteFrecuenteToUpdate = await ClienteFrecuente.findById(id);

  if (!clienteFrecuenteToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay candidato con ese ID: " + id });
  }

  const {
    nombre = clienteFrecuenteToUpdate.nombre,
    correoElectronico = clienteFrecuenteToUpdate.correoElectronico,
    fechaDeNacimiento = clienteFrecuenteToUpdate.fechaDeNacimiento,
  } = req.body;

  try {
    const updatedClienteFrecuente = await ClienteFrecuente.findByIdAndUpdate(
      id,
      {
        nombre,
        correoElectronico,
        fechaDeNacimiento,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedClienteFrecuente!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteClienteFrecuente = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const ClienteFrecuenteDBToDelete = await ClienteFrecuente.findByIdAndDelete(id);
  await db.disconnect();

  if (!ClienteFrecuenteDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay candidato con ese ID: " + id });
  }

  return res.status(200).json(ClienteFrecuenteDBToDelete);
};
