import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { MateriaPrima, IMateriaPrima } from "../../../models";

type Data = { message: string } | IMateriaPrima[] | IMateriaPrima;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getMateriasPrimas(res);

    case "POST":
      return postMateriaPrima(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no exite " + req.method });
  }
}

const getMateriasPrimas = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const materiasPrimas = await MateriaPrima.find().sort({ nombre: "ascending" });
  await db.disconnect();

  return res.status(200).json(materiasPrimas);
};

const postMateriaPrima = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    materiaPrima = "",
    unidades = "",
    temperatura = "",
  } = req.body;

  const newMateriaPrima = new MateriaPrima({
    materiaPrima,
    unidades,
    temperatura,
  });

  try {
    await db.connect();
    await newMateriaPrima.save();
    await db.disconnect();

    return res.status(201).json(newMateriaPrima);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor" });
  }
};
