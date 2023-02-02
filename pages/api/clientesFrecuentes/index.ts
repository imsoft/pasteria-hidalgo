import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { ClienteFrecuente, IClienteFrecuente } from "../../../models";

type Data = { message: string } | IClienteFrecuente[] | IClienteFrecuente;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getClienteFrecuente(res);

    case "POST":
      return postClienteFrecuente(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no exite " + req.method });
  }
}

const getClienteFrecuente = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const clienteFrecuente = await ClienteFrecuente.find().sort({
    nombre: "ascending",
  });
  await db.disconnect();

  return res.status(200).json(clienteFrecuente);
};

const postClienteFrecuente = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    nombre = "",
    correoElectronico = "",
    fechaDeNacimiento = "",
    puntosDeCompra = "",
    sucursal = "",
    franquicia = "",
  } = req.body;

  const newClienteFrecuente = new ClienteFrecuente({
    nombre,
    correoElectronico,
    fechaDeNacimiento,
    puntosDeCompra,
    sucursal,
    franquicia,
  });

  try {
    await db.connect();
    await newClienteFrecuente.save();
    await db.disconnect();

    return res.status(201).json(newClienteFrecuente);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor" });
  }
};
