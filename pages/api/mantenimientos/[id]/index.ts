import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IMantenimiento, Mantenimiento } from '../../../../models';

type Data = { message: string } | IMantenimiento;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getMantenimiento(req, res);

    case "PUT":
      return updateMantenimiento(req, res);

    case "DELETE":
      return deleteMantenimiento(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getMantenimiento = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const mantenimientoInDB = await Mantenimiento.findById(id);
  await db.disconnect();

  if (!mantenimientoInDB) {
    return res
      .status(400)
      .json({ message: "No hay mantenimiento con ese ID: " + id });
  }

  return res.status(200).json(mantenimientoInDB);
};

const updateMantenimiento = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const mantenimientoToUpdate = await Mantenimiento.findById(id);

  if (!mantenimientoToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay mantenimiento con ese ID: " + id });
  }

  const {
    sucursalOFranquicia = mantenimientoToUpdate.sucursalOFranquicia,
    sucursal = mantenimientoToUpdate.sucursal,
    franquicia = mantenimientoToUpdate.franquicia,
    nombreMaquina = mantenimientoToUpdate.nombreMaquina,
    proveedor = mantenimientoToUpdate.proveedor,
    fechaDeGarantia = mantenimientoToUpdate.fechaDeGarantia,
    fechaDeMantenimiento = mantenimientoToUpdate.fechaDeMantenimiento,
    modificacionDeMantenimiento = mantenimientoToUpdate.modificacionDeMantenimiento,
  } = req.body;

  try {
    const updatedMantenimiento = await Mantenimiento.findByIdAndUpdate(
      id,
      {
        sucursalOFranquicia,
        sucursal,
        franquicia,
        nombreMaquina,
        proveedor,
        fechaDeGarantia,
        fechaDeMantenimiento,
        modificacionDeMantenimiento,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedMantenimiento!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteMantenimiento = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const mantenimientoDBToDelete = await Mantenimiento.findByIdAndDelete(id);
  await db.disconnect();

  if (!mantenimientoDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay mantenimiento con ese ID: " + id });
  }

  return res.status(200).json(mantenimientoDBToDelete);
};
