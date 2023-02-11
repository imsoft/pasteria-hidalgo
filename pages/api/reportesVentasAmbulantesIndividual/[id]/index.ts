import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import {
  IReporteVentasAmbulantesIndividual,
  ReporteVentasAmbulantesIndividual,
} from "../../../../models";

type Data = { message: string } | IReporteVentasAmbulantesIndividual;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getReporteVentasAmbulantesIndividual(req, res);

    case "PUT":
      return updateReporteVentasAmbulantesIndividual(req, res);

    case "DELETE":
      return deleteReporteVentasAmbulantesIndividual(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getReporteVentasAmbulantesIndividual = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const reporteVentasAmbulantesIndividualInDB =
    await ReporteVentasAmbulantesIndividual.findById(id);
  await db.disconnect();

  if (!reporteVentasAmbulantesIndividualInDB) {
    return res.status(400).json({
      message: "No hay Reporte Ventas Ambulantes Individual con ese ID: " + id,
    });
  }

  return res.status(200).json(reporteVentasAmbulantesIndividualInDB);
};

const updateReporteVentasAmbulantesIndividual = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const reporteVentasAmbulantesIndividualToUpdate =
    await ReporteVentasAmbulantesIndividual.findById(id);

  if (!reporteVentasAmbulantesIndividualToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Reporte Ventas Individual con ese ID: " + id });
  }

  const {
    fecha = reporteVentasAmbulantesIndividualToUpdate.fecha,
    nombreDelVendedor = reporteVentasAmbulantesIndividualToUpdate.nombreDelVendedor,
    totalDeLaVenta = reporteVentasAmbulantesIndividualToUpdate.totalDeLaVenta,
    listadoDeProductos = reporteVentasAmbulantesIndividualToUpdate.listadoDeProductos,
  } = req.body;

  try {
    const updatedReporteVentasAmbulantesIndividual =
      await ReporteVentasAmbulantesIndividual.findByIdAndUpdate(
        id,
        {
          fecha,
          nombreDelVendedor,
          totalDeLaVenta,
          listadoDeProductos,
        },
        { runValidators: true, new: true }
      );
    await db.disconnect();
    res.status(200).json(updatedReporteVentasAmbulantesIndividual!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteReporteVentasAmbulantesIndividual = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const reporteVentasAmbulantesIndividualDBToDelete =
    await ReporteVentasAmbulantesIndividual.findByIdAndDelete(id);
  await db.disconnect();

  if (!reporteVentasAmbulantesIndividualDBToDelete) {
    return res.status(400).json({
      message: "No hay Reporte Ventas Ambulantes Individual con ese ID: " + id,
    });
  }

  return res.status(200).json(reporteVentasAmbulantesIndividualDBToDelete);
};
