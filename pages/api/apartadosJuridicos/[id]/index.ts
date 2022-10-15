import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { ApartadoJuridico, IApartadoJuridico } from '../../../../models';

type Data = { message: string } | IApartadoJuridico;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getApartadoJuridico(req, res);

    case "PUT":
      return updateApartadoJuridico(req, res);

    case "DELETE":
      return deleteApartadoJuridico(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getApartadoJuridico = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const apartadoJuridicoInDB = await ApartadoJuridico.findById(id);
  await db.disconnect();

  if (!apartadoJuridicoInDB) {
    return res
      .status(400)
      .json({ message: "No hay Apartado Juridico con ese ID: " + id });
  }

  return res.status(200).json(apartadoJuridicoInDB);
};

const updateApartadoJuridico = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const apartadoJuridicoToUpdate = await ApartadoJuridico.findById(id);

  if (!apartadoJuridicoToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Apartado Juridico con ese ID: " + id });
  }

  const {
    sucursalOFranquicia = apartadoJuridicoToUpdate.sucursalOFranquicia,
    sucursales = apartadoJuridicoToUpdate.sucursales,
    franquicias = apartadoJuridicoToUpdate.franquicias,
    documento = apartadoJuridicoToUpdate.documento,
  } = req.body;

  try {
    const updatedApartadoJuridico = await ApartadoJuridico.findByIdAndUpdate(
      id,
      {
        sucursalOFranquicia,
        sucursales,
        franquicias,
        documento,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedApartadoJuridico!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteApartadoJuridico = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const apartadoJuridicoDBToDelete = await ApartadoJuridico.findByIdAndDelete(id);
  await db.disconnect();

  if (!apartadoJuridicoDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Apartado Juridico con ese ID: " + id });
  }

  return res.status(200).json(apartadoJuridicoDBToDelete);
};
