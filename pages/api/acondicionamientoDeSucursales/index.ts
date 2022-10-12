import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import {
  AcondicionamientoDeSucursal,
  IAcondicionamientoDeSucursal,
} from "../../../models";

type Data =
  | { message: string }
  | IAcondicionamientoDeSucursal[]
  | IAcondicionamientoDeSucursal;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getAcondicionamientoDeSucursales(res);

    case "POST":
      return postAcondicionamientoDeSucursal(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no exite " + req.method });
  }
}

const getAcondicionamientoDeSucursales = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const acondicionamientoDeSucursales =
    await AcondicionamientoDeSucursal.find().sort({ nombre: "ascending" });
  await db.disconnect();

  return res.status(200).json(acondicionamientoDeSucursales);
};

const postAcondicionamientoDeSucursal = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    sucursalOFranquicia = "",
    sucursales = "",
    franquicias = "",
    producto = "",
    fechaDeCompra = "",
    descripcionDelProducto = "",
    fechaEstimadaDeEntrega = "",
    proveedor = "",
    factura = "",
    precioDeCompra = "",
    cantidad = "",
    totalAcomulado = "",
  } = req.body;

  const newAcondicionamientoDeSucursal = new AcondicionamientoDeSucursal({
    sucursalOFranquicia,
    sucursales,
    franquicias,
    producto,
    fechaDeCompra,
    descripcionDelProducto,
    fechaEstimadaDeEntrega,
    proveedor,
    factura,
    precioDeCompra,
    cantidad,
    totalAcomulado,
  });

  try {
    await db.connect();
    await newAcondicionamientoDeSucursal.save();
    await db.disconnect();

    return res.status(201).json(newAcondicionamientoDeSucursal);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor" });
  }
};
