import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { CheckInDePersonal, ICheckInPersonal } from "../../../models";

type Data = { message: string } | ICheckInPersonal[] | ICheckInPersonal;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getCheckInPersonal(res);

    case "POST":
      return postCheckInPersonal(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no exite " + req.method });
  }
}

const getCheckInPersonal = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const candidatos = await CheckInDePersonal.find().sort({
    nombre: "ascending",
  });
  await db.disconnect();

  return res.status(200).json(candidatos);
};

const postCheckInPersonal = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    sucursalOFranquicia = "",
    nombreSucursalOFranquicia = "",
    nombre = "",
    fecha = "",
    horaDeIngreso = "",
    horaDeSalida = "",
  } = req.body;

  const newCheckInDePersonal = new CheckInDePersonal({
    sucursalOFranquicia,
    nombreSucursalOFranquicia,
    nombre,
    fecha,
    horaDeIngreso,
    horaDeSalida,
  });

  console.log(newCheckInDePersonal);

  try {
    await db.connect();
    await newCheckInDePersonal.save();
    await db.disconnect();

    return res.status(201).json(newCheckInDePersonal);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor" });
  }
};
