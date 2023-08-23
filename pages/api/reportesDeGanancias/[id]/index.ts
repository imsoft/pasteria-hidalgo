import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { ReporteDeGanancia, IReporteDeGanancia } from "../../../../models";

type Data = { message: string } | IReporteDeGanancia;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getReporteDeGanancia(req, res);

    case "PUT":
      return updateReporteDeGanancia(req, res);

    case "DELETE":
      return deleteReporteDeGanancia(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getReporteDeGanancia = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const reporteDeGananciaInDB = await ReporteDeGanancia.findById(id);
  await db.disconnect();

  if (!reporteDeGananciaInDB) {
    return res
      .status(400)
      .json({ message: "No hay Reporte De Ganancia con ese ID: " + id });
  }

  return res.status(200).json(reporteDeGananciaInDB);
};

const updateReporteDeGanancia = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const reporteDeGananciaToUpdate = await ReporteDeGanancia.findById(id);

  if (!reporteDeGananciaToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Reporte De Ganancia con ese ID: " + id });
  }

  const {
    mes = reporteDeGananciaToUpdate.mes,
    anio = reporteDeGananciaToUpdate.anio,
    ventasSucursalIndividual = reporteDeGananciaToUpdate.ventasSucursalIndividual,
    totalVentas = reporteDeGananciaToUpdate.totalVentas,
    totalCompras = reporteDeGananciaToUpdate.totalCompras,
    balance = reporteDeGananciaToUpdate.balance,
  } = req.body;

  try {
    const updatedReporteDeGanancia = await ReporteDeGanancia.findByIdAndUpdate(
      id,
      {
        mes,
        anio,
        ventasSucursalIndividual,
        totalVentas,
        totalCompras,
        balance,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedReporteDeGanancia!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteReporteDeGanancia = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const ReporteDeGananciaDBToDelete = await ReporteDeGanancia.findByIdAndDelete(id);
  await db.disconnect();

  if (!ReporteDeGananciaDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Reporte De Ganancia con ese ID: " + id });
  }

  return res.status(200).json(ReporteDeGananciaDBToDelete);
};
