import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import {
  IReporteVentasIndividual,
  ReporteVentasIndividual,
} from "../../../../models";

type Data = { message: string } | IReporteVentasIndividual;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getReporteVentasIndividual(req, res);

    case "PUT":
      return updateReporteVentasIndividual(req, res);

    case "DELETE":
      return deleteReporteVentasIndividual(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getReporteVentasIndividual = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const reporteVentasIndividualInDB = await ReporteVentasIndividual.findById(
    id
  );
  await db.disconnect();

  if (!reporteVentasIndividualInDB) {
    return res
      .status(400)
      .json({ message: "No hay Reporte Ventas Individual con ese ID: " + id });
  }

  return res.status(200).json(reporteVentasIndividualInDB);
};

const updateReporteVentasIndividual = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const reporteVentasIndividualToUpdate =
    await ReporteVentasIndividual.findById(id);

  if (!reporteVentasIndividualToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Reporte Ventas Individual con ese ID: " + id });
  }

  const {
    fecha = reporteVentasIndividualToUpdate.fecha,
    nombreDelVendedor = reporteVentasIndividualToUpdate.nombreDelVendedor,
    lugarDeVenta = reporteVentasIndividualToUpdate.lugarDeVenta,
    nombreLugarDeVenta = reporteVentasIndividualToUpdate.nombreLugarDeVenta,
    totalDeLaVenta = reporteVentasIndividualToUpdate.totalDeLaVenta,
    promocionUsada = reporteVentasIndividualToUpdate.promocionUsada,
    metodoDePago = reporteVentasIndividualToUpdate.metodoDePago,
    listadoDeProductos = reporteVentasIndividualToUpdate.listadoDeProductos,
    correoElectronicoClienteFrecuente = reporteVentasIndividualToUpdate.correoElectronicoClienteFrecuente,
    puntosClienteFrecuente = reporteVentasIndividualToUpdate.puntosClienteFrecuente,
  } = req.body;

  try {
    const updatedReporteVentasIndividual =
      await ReporteVentasIndividual.findByIdAndUpdate(
        id,
        {
          fecha,
          nombreDelVendedor,
          lugarDeVenta,
          nombreLugarDeVenta,
          totalDeLaVenta,
          promocionUsada,
          metodoDePago,
          listadoDeProductos,
          correoElectronicoClienteFrecuente,
          puntosClienteFrecuente,
        },
        { runValidators: true, new: true }
      );
    await db.disconnect();
    res.status(200).json(updatedReporteVentasIndividual!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteReporteVentasIndividual = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const reporteVentasIndividualDBToDelete =
    await ReporteVentasIndividual.findByIdAndDelete(id);
  await db.disconnect();

  if (!reporteVentasIndividualDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Reporte Ventas Individual con ese ID: " + id });
  }

  return res.status(200).json(reporteVentasIndividualDBToDelete);
};
