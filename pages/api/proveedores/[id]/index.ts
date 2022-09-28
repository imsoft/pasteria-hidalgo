import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { IProveedor, Proveedor } from "../../../../models";

type Data = { message: string } | IProveedor;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProveedor(req, res);

    case "PUT":
      return updateProveedor(req, res);

    case "DELETE":
      return deleteProveedor(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getProveedor = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const proveedorInDB = await Proveedor.findById(id);
  await db.disconnect();

  if (!proveedorInDB) {
    return res
      .status(400)
      .json({ message: "No hay proveedor con ese ID: " + id });
  }

  return res.status(200).json(proveedorInDB);
};

const updateProveedor = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const proveedorToUpdate = await Proveedor.findById(id);

  if (!proveedorToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay proveedor con ese ID: " + id });
  }

  const {
    nombre = proveedorToUpdate.nombre,
    direccion = proveedorToUpdate.direccion,
    telefono = proveedorToUpdate.telefono,
    horarioAtencion = proveedorToUpdate.horarioAtencion,
    productosQueSeCompran = proveedorToUpdate.productosQueSeCompran,
    entregasADomicilio = proveedorToUpdate.entregasADomicilio,
  } = req.body;

  try {
    const updatedProveedor = await Proveedor.findByIdAndUpdate(
      id,
      {
        nombre,
        direccion,
        telefono,
        horarioAtencion,
        productosQueSeCompran,
        entregasADomicilio,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedProveedor!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteProveedor = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const proveedorDBToDelete = await Proveedor.findByIdAndDelete(id);
  await db.disconnect();

  if (!proveedorDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay proveedor con ese ID: " + id });
  }

  return res.status(200).json(proveedorDBToDelete);
};
