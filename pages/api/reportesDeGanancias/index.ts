import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IReporteDeGanancia, ReporteDeGanancia } from "../../../models";

type Data = { message: string } | IReporteDeGanancia[] | IReporteDeGanancia;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getReporteDeGanancia(res);

    case "POST":
      return postReporteDeGanancia(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no exite " + req.method });
  }
}

const getReporteDeGanancia = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const reportesDeGanancias = await ReporteDeGanancia.find().sort({
    nombre: "ascending",
  });
  await db.disconnect();

  return res.status(200).json(reportesDeGanancias);
};

const postReporteDeGanancia = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    mes = "",
    anio = "",
    ventasSucursalIndividual = "",
    totalVentas = "",
    totalCompras = "",
    balance = "",
  } = req.body;

  const newReporteDeGanancia = new ReporteDeGanancia({
    mes,
    anio,
    ventasSucursalIndividual,
    totalVentas,
    totalCompras,
    balance,
  });

  // console.log(newReporteDeGanancia);

  try {
    await db.connect();

    const report = await ReporteDeGanancia.findOne({ mes, anio });

    // console.log("report: " + report);

    if (!report) {
      await newReporteDeGanancia.save();
      await db.disconnect();
      return res.status(201).json(newReporteDeGanancia);
    } else {
      const updatedReporteDeGanancia = await ReporteDeGanancia.findOneAndUpdate(
        { mes, anio },
        {
          $addToSet: { sucursal: 'Chapultepec' },
          $inc: {
            totalVentas,
            totalCompras,
          },
          balance: (report.totalVentas + totalVentas) - (report.totalCompras + totalCompras),
        },
        { runValidators: true, new: true }
      );
      await db.disconnect();
      res.status(200).json(updatedReporteDeGanancia!);
    }
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor" });
  }
};
