import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { AsignarPrecio, IAsignarPrecio } from '../../../../models';

type Data = { message: string } | IAsignarPrecio;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getAsignarPrecio(req, res);

    case "PUT":
      return updateAsignarPrecio(req, res);

    case "DELETE":
      return deleteAsignarPrecio(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getAsignarPrecio = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const asignarPrecioInDB = await AsignarPrecio.findById(id);
  await db.disconnect();

  if (!asignarPrecioInDB) {
    return res
      .status(400)
      .json({ message: "No hay asignar precio con ese ID: " + id });
  }

  return res.status(200).json(asignarPrecioInDB);
};

const updateAsignarPrecio = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const asignarPrecioToUpdate = await AsignarPrecio.findById(id);

  if (!asignarPrecioToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Asignar Precio con ese ID: " + id });
  }

  const {
    producto = asignarPrecioToUpdate.producto,
    precioMaximo = asignarPrecioToUpdate.precioMaximo,
  } = req.body;

  try {
    const updatedAsignarPrecio = await AsignarPrecio.findByIdAndUpdate(
      id,
      {
        producto,
        precioMaximo,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedAsignarPrecio!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteAsignarPrecio = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const asignarPrecioDBToDelete = await AsignarPrecio.findByIdAndDelete(id);
  await db.disconnect();

  if (!asignarPrecioDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Asignar Precio con ese ID: " + id });
  }

  return res.status(200).json(asignarPrecioDBToDelete);
};
