import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import {
  AcondicionamientoDeSucursal,
  IAcondicionamientoDeSucursal,
} from "../../../../models";

type Data = { message: string } | IAcondicionamientoDeSucursal;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getAcondicionamientoDeSucursal(req, res);

    case "PUT":
      return updateAcondicionamientoDeSucursal(req, res);

    case "DELETE":
      return deleteAcondicionamientoDeSucursal(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getAcondicionamientoDeSucursal = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const acondicionamientoDeSucursalInDB =
    await AcondicionamientoDeSucursal.findById(id);
  await db.disconnect();

  if (!acondicionamientoDeSucursalInDB) {
    return res.status(400).json({
      message: "No hay Acondicionamiento De Sucursal con ese ID: " + id,
    });
  }

  return res.status(200).json(acondicionamientoDeSucursalInDB);
};

const updateAcondicionamientoDeSucursal = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const acondicionamientoDeSucursalToUpdate =
    await AcondicionamientoDeSucursal.findById(id);

  if (!acondicionamientoDeSucursalToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay candidato con ese ID: " + id });
  }

  const {
    sucursalOFranquicia = acondicionamientoDeSucursalToUpdate.sucursalOFranquicia,
    nombreSucursalOFranquicia = acondicionamientoDeSucursalToUpdate.nombreSucursalOFranquicia,
    producto = acondicionamientoDeSucursalToUpdate.producto,
    fechaDeCompra = acondicionamientoDeSucursalToUpdate.fechaDeCompra,
    descripcionDelProducto = acondicionamientoDeSucursalToUpdate.descripcionDelProducto,
    fechaEstimadaDeEntrega = acondicionamientoDeSucursalToUpdate.fechaEstimadaDeEntrega,
    proveedor = acondicionamientoDeSucursalToUpdate.proveedor,
    factura = acondicionamientoDeSucursalToUpdate.factura,
    precioDeCompra = acondicionamientoDeSucursalToUpdate.precioDeCompra,
    cantidad = acondicionamientoDeSucursalToUpdate.cantidad,
    totalAcomulado = acondicionamientoDeSucursalToUpdate.totalAcomulado,
  } = req.body;

  try {
    const updatedAcondicionamientoDeSucursal =
      await AcondicionamientoDeSucursal.findByIdAndUpdate(
        id,
        {
          sucursalOFranquicia,
          nombreSucursalOFranquicia,
          producto,
          fechaDeCompra,
          descripcionDelProducto,
          fechaEstimadaDeEntrega,
          proveedor,
          factura,
          precioDeCompra,
          cantidad,
          totalAcomulado,
        },
        { runValidators: true, new: true }
      );
    await db.disconnect();
    res.status(200).json(updatedAcondicionamientoDeSucursal!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteAcondicionamientoDeSucursal = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const acondicionamientoDeSucursalDBToDelete =
    await AcondicionamientoDeSucursal.findByIdAndDelete(id);
  await db.disconnect();

  if (!acondicionamientoDeSucursalDBToDelete) {
    return res.status(400).json({
      message: "No hay Acondicionamiento De Sucursal con ese ID: " + id,
    });
  }

  return res.status(200).json(acondicionamientoDeSucursalDBToDelete);
};
