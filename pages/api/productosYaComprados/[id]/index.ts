import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IProductoYaComprado, ProductoYaComprado } from "../../../../models";

type Data = { message: string } | IProductoYaComprado;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductoYaComprado(req, res);

    case "PUT":
      return updateProductoYaComprado(req, res);

    case "DELETE":
      return deleteProductoYaComprado(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getProductoYaComprado = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const productoYaCompradoInDB = await ProductoYaComprado.findById(id);
  await db.disconnect();

  if (!productoYaCompradoInDB) {
    return res
      .status(400)
      .json({ message: "No hay Producto Ya Comprado con ese ID: " + id });
  }

  return res.status(200).json(productoYaCompradoInDB);
};

const updateProductoYaComprado = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const productoYaCompradoToUpdate = await ProductoYaComprado.findById(id);

  if (!productoYaCompradoToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay Producto Ya Comprado con ese ID: " + id });
  }

  const {
    fechaDeCompra = productoYaCompradoToUpdate.fechaDeCompra,
    precioDeCompra = productoYaCompradoToUpdate.precioDeCompra,
    descripcionDelProducto = productoYaCompradoToUpdate.descripcionDelProducto,
    fechaDeEntrega = productoYaCompradoToUpdate.fechaDeEntrega,
    idProveedor = productoYaCompradoToUpdate.idProveedor,
    facura = productoYaCompradoToUpdate.facura,
    totalAcomulado = productoYaCompradoToUpdate.totalAcomulado,
  } = req.body;

  try {
    const updatedProductoYaComprado = await ProductoYaComprado.findByIdAndUpdate(
      id,
      {
        fechaDeCompra,
        precioDeCompra,
        descripcionDelProducto,
        fechaDeEntrega,
        idProveedor,
        facura,
        totalAcomulado,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedProductoYaComprado!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteProductoYaComprado = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const productoYaCompradoDBToDelete = await ProductoYaComprado.findByIdAndDelete(id);
  await db.disconnect();

  if (!productoYaCompradoDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay Producto Ya Comprado con ese ID: " + id });
  }

  return res.status(200).json(productoYaCompradoDBToDelete);
};
