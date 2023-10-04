import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import {
  IReporteVentasIndividual,
  ReporteVentasIndividual,
} from "../../../models";

type Data =
  | { message: string }
  | IReporteVentasIndividual[]
  | IReporteVentasIndividual;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getReportesVentasIndividual(res);

    case "POST":
      return postReporteVentasIndividual(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no exite " + req.method });
  }
}

const getReportesVentasIndividual = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const reportesVentasIndividual = await ReporteVentasIndividual.find().sort({
    nombre: "ascending",
  });
  await db.disconnect();

  return res.status(200).json(reportesVentasIndividual);
};

const postReporteVentasIndividual = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    fecha = "",
    nombreDelVendedor = "",
    lugarDeVenta = "",
    nombreLugarDeVenta = "",
    totalDeLaVenta = "",
    promocionUsada = "",
    metodoDePago = "",
    listadoDeProductos = "",
    correoElectronicoClienteFrecuente = "",
    puntosClienteFrecuente = "",
  } = req.body;

  const newReporteVentasIndividual = new ReporteVentasIndividual({
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
  });

  try {
    await db.connect();
    await newReporteVentasIndividual.save();
    await db.disconnect();

    return res.status(201).json(newReporteVentasIndividual);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor" });
  }
};
