import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { CheckInDePersonal, ICheckInPersonal } from '../../../../models';

type Data = { message: string } | ICheckInPersonal;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getCheckInPersonal(req, res);

    case "PUT":
      return updateCheckInPersonal(req, res);

    case "DELETE":
      return deleteCheckInPersonal(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getCheckInPersonal = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const checkInPersonalInDB = await CheckInDePersonal.findById(id);
  await db.disconnect();

  if (!checkInPersonalInDB) {
    return res
      .status(400)
      .json({ message: "No hay Check In Personal con ese ID: " + id });
  }

  return res.status(200).json(checkInPersonalInDB);
};

const updateCheckInPersonal = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const checkInPersonalToUpdate = await CheckInDePersonal.findById(id);

  if (!checkInPersonalToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Check In Personal con ese ID: " + id });
  }

  const {
    idFranquicia = checkInPersonalToUpdate.idFranquicia,
    idSucursal = checkInPersonalToUpdate.idSucursal,
    nombre = checkInPersonalToUpdate.nombre,
    fecha = checkInPersonalToUpdate.fecha,
    idPersonal = checkInPersonalToUpdate.idPersonal,
    horaDeIngreso = checkInPersonalToUpdate.horaDeIngreso,
    horaDeSalida = checkInPersonalToUpdate.horaDeSalida,
  } = req.body;

  try {
    const updatedCheckInPersonal = await CheckInDePersonal.findByIdAndUpdate(
      id,
      {
        idFranquicia,
        idSucursal,
        nombre,
        fecha,
        idPersonal,
        horaDeIngreso,
        horaDeSalida,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedCheckInPersonal!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteCheckInPersonal = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const checkInPersonalDBToDelete = await CheckInDePersonal.findByIdAndDelete(id);
  await db.disconnect();

  if (!checkInPersonalDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Check In Personal con ese ID: " + id });
  }

  return res.status(200).json(checkInPersonalDBToDelete);
};
