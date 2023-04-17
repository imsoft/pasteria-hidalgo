import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IManejoDeAlmacen, ManejoDeAlmacen } from "../../../models";

type Data = { message: string } | IManejoDeAlmacen[] | IManejoDeAlmacen;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getManejosDeAlmacen(res);

    case "POST":
      return postManejoDeAlmacen(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no exite " + req.method });
  }
}

const getManejosDeAlmacen = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const manejosDeAlmacen = await ManejoDeAlmacen.find().sort({
    nombre: "ascending",
  });
  await db.disconnect();

  return res.status(200).json(manejosDeAlmacen);
};

const postManejoDeAlmacen = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { listaManejoDeAlmacen = "" } = req.body;

  const newManejoDeAlmacen = new ManejoDeAlmacen({
    listaManejoDeAlmacen,
  });

  try {
    await db.connect();
    await newManejoDeAlmacen.save();
    await db.disconnect();

    return res.status(201).json(newManejoDeAlmacen);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor" });
  }
};
