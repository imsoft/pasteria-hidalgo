import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IMateriaPrima, MateriaPrima } from "../../../../models";

type Data = { message: string } | IMateriaPrima;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getMateriaPrima(req, res);

    case "PUT":
      return updateMateriaPrima(req, res);

    case "DELETE":
      return deleteMateriaPrima(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getMateriaPrima = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const materiaPrimaInDB = await MateriaPrima.findById(id);
  await db.disconnect();

  if (!materiaPrimaInDB) {
    return res
      .status(400)
      .json({ message: "No hay materia prima con ese ID: " + id });
  }

  return res.status(200).json(materiaPrimaInDB);
};

const updateMateriaPrima = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const materiaPrimaToUpdate = await MateriaPrima.findById(id);

  if (!materiaPrimaToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay materia prima con ese ID: " + id });
  }

  const {
    materiaPrima = materiaPrimaToUpdate.materiaPrima,
    unidades = materiaPrimaToUpdate.unidades,
    temperatura = materiaPrimaToUpdate.temperatura,
    
  } = req.body;

  try {
    const updatedMateriaPrima = await MateriaPrima.findByIdAndUpdate(
      id,
      {
        materiaPrima,
        unidades,
        temperatura,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedMateriaPrima!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteMateriaPrima = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const materiaPrimaDBToDelete = await MateriaPrima.findByIdAndDelete(id);
  await db.disconnect();

  if (!materiaPrimaDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay materia prima con ese ID: " + id });
  }

  return res.status(200).json(materiaPrimaDBToDelete);
};
