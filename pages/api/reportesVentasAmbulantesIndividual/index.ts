import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import {
  IReporteVentasAmbulantesIndividual,
  ReporteVentasAmbulantesIndividual,
} from "../../../models";

type Data =
  | { message: string }
  | IReporteVentasAmbulantesIndividual[]
  | IReporteVentasAmbulantesIndividual;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getReportesVentasAmbulantesIndividual(res);

    case "POST":
      return postReporteVentasAmbulantesIndividual(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no exite " + req.method });
  }
}

const getReportesVentasAmbulantesIndividual = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const reporteVentasAmbulantesIndividual = await ReporteVentasAmbulantesIndividual.find().sort({
    nombre: "ascending",
  });
  await db.disconnect();

  return res.status(200).json(reporteVentasAmbulantesIndividual);
};

const postReporteVentasAmbulantesIndividual = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    fecha = "",
    nombreDelVendedor = "",
    nombreLugarDeVenta = "",
    totalDeLaVenta = "",
    listadoDeProductos = "",
    correoElectronicoClienteFrecuente = "",
    puntosClienteFrecuente = "",
  } = req.body;

  const newReporteVentasAmbulantesIndividual = new ReporteVentasAmbulantesIndividual({
    fecha,
    nombreDelVendedor,
    nombreLugarDeVenta,
    totalDeLaVenta,
    listadoDeProductos,
    correoElectronicoClienteFrecuente,
    puntosClienteFrecuente,
  });

  try {
    await db.connect();
    await newReporteVentasAmbulantesIndividual.save();
    await db.disconnect();

    return res.status(201).json(newReporteVentasAmbulantesIndividual);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor" });
  }
};
