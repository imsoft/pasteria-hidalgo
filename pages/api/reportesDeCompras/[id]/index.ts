import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IReporteDeCompra, ReporteDeCompra } from "../../../../models";

type Data = { message: string } | IReporteDeCompra;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getReporteDeCompra(req, res);

    case "PUT":
      return updateReporteDeCompra(req, res);

    case "DELETE":
      return deleteReporteDeCompra(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getReporteDeCompra = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const reporteDeCompraInDB = await ReporteDeCompra.findById(id);
  await db.disconnect();

  if (!reporteDeCompraInDB) {
    return res
      .status(400)
      .json({ message: "No hay Reporte De Compra con ese ID: " + id });
  }

  return res.status(200).json(reporteDeCompraInDB);
};

const updateReporteDeCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const reporteDeCompraToUpdate = await ReporteDeCompra.findById(id);

  if (!reporteDeCompraToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Reporte De Compra con ese ID: " + id });
  }

  const {
    fechaDeCompra = reporteDeCompraToUpdate.fechaDeCompra,
    credito = reporteDeCompraToUpdate.credito,
    nombreProveedor = reporteDeCompraToUpdate.nombreProveedor,
    factura = reporteDeCompraToUpdate.factura,
    listadoDeReporteDeCompra = reporteDeCompraToUpdate.listadoDeReporteDeCompra,
    precioTotalDelCompra = reporteDeCompraToUpdate.precioTotalDelCompra,
  } = req.body;

  try {
    const updatedReporteDeCompra = await ReporteDeCompra.findByIdAndUpdate(
      id,
      {
        fechaDeCompra,
        credito,
        nombreProveedor,
        factura,
        listadoDeReporteDeCompra,
        precioTotalDelCompra,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedReporteDeCompra!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteReporteDeCompra = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const reporteDeCompraDBToDelete = await ReporteDeCompra.findByIdAndDelete(id);
  await db.disconnect();

  if (!reporteDeCompraDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Reporte De Compra con ese ID: " + id });
  }

  return res.status(200).json(reporteDeCompraDBToDelete);
};
