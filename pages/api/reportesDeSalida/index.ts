import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { ReporteDeSalida, IReporteDeSalida } from "../../../models";

type Data = { message: string } | IReporteDeSalida[] | IReporteDeSalida;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getReportesDeSalida(res);

    case "POST":
      return postReporteDeSalida(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no exite " + req.method });
  }
}

const getReportesDeSalida = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const reportesDeSalida = await ReporteDeSalida.find().sort({
    nombre: "ascending",
  });
  await db.disconnect();

  return res.status(200).json(reportesDeSalida);
};

const postReporteDeSalida = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    fecha = "",
    productoExtra = "",
    codigoDeProductoExtra = "",
    cantidadDeProductoExtra = "",
    unidadesDeProductoExtra = "",
    codigoDeMasa = "",
    masa = "",
    cantidadDeMasa = "",
    unidadesDeMasa = "",
    rellenos = "",
    codigosDeRelleno = "",
    cantidadDeProductoExtraRelleno = "",
    unidadesDeRelleno = "",
    temperaturaDeRellenos = "",
    sucursalAEnviar = "",
    datosDeRepartidor = "",
    datosDeLaRuta = "",
    kilometrajeDeEntrada = "",
    kilometrajeDeSalida = "",
  } = req.body;

  const newReporteDeSalida = new ReporteDeSalida({
    fecha,
    productoExtra,
    codigoDeProductoExtra,
    cantidadDeProductoExtra,
    unidadesDeProductoExtra,
    codigoDeMasa,
    masa,
    cantidadDeMasa,
    unidadesDeMasa,
    rellenos,
    codigosDeRelleno,
    cantidadDeProductoExtraRelleno,
    unidadesDeRelleno,
    temperaturaDeRellenos,
    sucursalAEnviar,
    datosDeRepartidor,
    datosDeLaRuta,
    kilometrajeDeEntrada,
    kilometrajeDeSalida,
  });

  try {
    await db.connect();
    await newReporteDeSalida.save();
    await db.disconnect();

    return res.status(201).json(newReporteDeSalida);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor" });
  }
};
