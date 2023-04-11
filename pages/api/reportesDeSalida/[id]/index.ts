import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IReporteDeSalida, ReporteDeSalida } from "../../../../models";

type Data = { message: string } | IReporteDeSalida;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getReporteDeSalida(req, res);

    case "PUT":
      return updateReporteDeSalida(req, res);

    case "DELETE":
      return deleteReporteDeSalida(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getReporteDeSalida = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const reporteDeSalidaInDB = await ReporteDeSalida.findById(id);
  await db.disconnect();

  if (!reporteDeSalidaInDB) {
    return res
      .status(400)
      .json({ message: "No hay Reporte De Salida con ese ID: " + id });
  }

  return res.status(200).json(reporteDeSalidaInDB);
};

const updateReporteDeSalida = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const reporteDeSalidaToUpdate = await ReporteDeSalida.findById(id);

  if (!reporteDeSalidaToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Reporte De Salida con ese ID: " + id });
  }

  const {
    sucursalAEnviar = reporteDeSalidaToUpdate.sucursalAEnviar,
    nombreDelRepartidor = reporteDeSalidaToUpdate.nombreDelRepartidor,
    datosDeLaRuta = reporteDeSalidaToUpdate.datosDeLaRuta,
    kilometrajeDeEntrada = reporteDeSalidaToUpdate.kilometrajeDeEntrada,
    kilometrajeDeSalida = reporteDeSalidaToUpdate.kilometrajeDeSalida,
    listadoReporteDeSalida = reporteDeSalidaToUpdate.listadoReporteDeSalida,
  } = req.body;

  try {
    const updatedReporteDeSalida = await ReporteDeSalida.findByIdAndUpdate(
      id,
      {
        sucursalAEnviar,
        nombreDelRepartidor,
        datosDeLaRuta,
        kilometrajeDeEntrada,
        kilometrajeDeSalida,
        listadoReporteDeSalida,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedReporteDeSalida!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteReporteDeSalida = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  await db.connect();
  const reporteDeSalidaDBToDelete = await ReporteDeSalida.findByIdAndDelete(id);
  await db.disconnect();

  if (!reporteDeSalidaDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Reporte De Salida con ese ID: " + id });
  }

  return res.status(200).json(reporteDeSalidaDBToDelete);
};
