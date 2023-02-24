import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IAsignarComisiones, AsignarComision } from "../../../../models";

type Data = { message: string } | IAsignarComisiones;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getAsignarComision(req, res);

    case "PUT":
      return updateAsignarComision(req, res);

    case "DELETE":
      return deleteAsignarComision(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getAsignarComision = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const asignarComisionInDB = await AsignarComision.findById(id);
  await db.disconnect();

  if (!asignarComisionInDB) {
    return res
      .status(400)
      .json({ message: "No hay Asignar Comisión con ese ID: " + id });
  }

  return res.status(200).json(asignarComisionInDB);
};

const updateAsignarComision = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const asignarComisionToUpdate = await AsignarComision.findById(id);

  if (!asignarComisionToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Asignar Comisión con ese ID: " + id });
  }

  const {
    sucursalOFranquicia = asignarComisionToUpdate.sucursalOFranquicia,
    mes = asignarComisionToUpdate.mes,
    anio = asignarComisionToUpdate.anio,
    minimoDeLaMeta = asignarComisionToUpdate.minimoDeLaMeta,
    sucursales = asignarComisionToUpdate.sucursales,
    franquicias = asignarComisionToUpdate.franquicias,
  } = req.body;

  try {
    const updatedAsignarComision = await AsignarComision.findByIdAndUpdate(
      id,
      {
        sucursalOFranquicia,
        mes,
        anio,
        minimoDeLaMeta,
        sucursales,
        franquicias,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedAsignarComision!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteAsignarComision = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const AsignarComisionDBToDelete = await AsignarComision.findByIdAndDelete(id);
  await db.disconnect();

  if (!AsignarComisionDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Asignar Comisión con ese ID: " + id });
  }

  return res.status(200).json(AsignarComisionDBToDelete);
};
