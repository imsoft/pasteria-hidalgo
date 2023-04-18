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
  const {
    materiaPrima = "",
    unidades = "",
    temperatura = "",
    cantidad = "",
  } = req.body;

  const newManejoDeAlmacen = new ManejoDeAlmacen({
    materiaPrima,
    unidades,
    temperatura,
    cantidad,
  });

  try {
    await db.connect();

    const product = await ManejoDeAlmacen.findOne({ materiaPrima });

    if (!product) {

      await newManejoDeAlmacen.save();
      await db.disconnect();
      return res.status(201).json(newManejoDeAlmacen);
      
    } else {
      const { cantidad = product.cantidad } = req.body;

      const updatedManejoDeAlmacen = await ManejoDeAlmacen.findOneAndUpdate(
        { materiaPrima },
        { $inc: { cantidad } },
        { runValidators: true, new: true }
      );
      await db.disconnect();
      res.status(200).json(updatedManejoDeAlmacen!);
    }
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor" });
  }
};
