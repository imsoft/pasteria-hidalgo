import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { ISucursalYFranquicia, SucursalYFranquicia } from "../../../../models";

type Data = { message: string } | ISucursalYFranquicia;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getSucursalYFranquicia(req, res);

    case "PUT":
      return updateSucursalYFranquicia(req, res);

    case "DELETE":
      return deleteSucursalYFranquicia(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getSucursalYFranquicia = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const sucursalYFranquiciaInDB = await SucursalYFranquicia.findById(id);
  await db.disconnect();

  if (!sucursalYFranquiciaInDB) {
    return res
      .status(400)
      .json({ message: "No hay sucursalYFranquicia con ese ID: " + id });
  }

  return res.status(200).json(sucursalYFranquiciaInDB);
};

const updateSucursalYFranquicia = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const sucursalYFranquiciaToUpdate = await SucursalYFranquicia.findById(id);

  if (!sucursalYFranquiciaToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay sucursalYFranquicia con ese ID: " + id });
  }

  const {
    sucursalOFranquicia = sucursalYFranquiciaToUpdate.sucursalOFranquicia,
    franquicias = sucursalYFranquiciaToUpdate.franquicias,
    sucursales = sucursalYFranquiciaToUpdate.sucursales,
    direccion = sucursalYFranquiciaToUpdate.direccion,
    distancia = sucursalYFranquiciaToUpdate.distancia,
    fechaDePago = sucursalYFranquiciaToUpdate.fechaDePago,
    montoDePago = sucursalYFranquiciaToUpdate.montoDePago,
    cuentaBancaria = sucursalYFranquiciaToUpdate.cuentaBancaria,
    banco = sucursalYFranquiciaToUpdate.banco,
    nombreDelBeneficiario = sucursalYFranquiciaToUpdate.nombreDelBeneficiario,
    rfc = sucursalYFranquiciaToUpdate.rfc,
  } = req.body;

  try {
    const updatedSucursalYFranquicia =
      await SucursalYFranquicia.findByIdAndUpdate(
        id,
        {
          sucursalOFranquicia,
          franquicias,
          sucursales,
          direccion,
          distancia,
          fechaDePago,
          montoDePago,
          cuentaBancaria,
          banco,
          nombreDelBeneficiario,
          rfc,
        },
        { runValidators: true, new: true }
      );
    await db.disconnect();
    res.status(200).json(updatedSucursalYFranquicia!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteSucursalYFranquicia = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const sucursalYFranquiciaDBToDelete =
    await SucursalYFranquicia.findByIdAndDelete(id);
  await db.disconnect();

  if (!sucursalYFranquiciaDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay sucursalYFranquicia con ese ID: " + id });
  }

  return res.status(200).json(sucursalYFranquiciaDBToDelete);
};
