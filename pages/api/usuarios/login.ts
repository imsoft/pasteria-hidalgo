import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Usuario } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt } from "../../../utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      usuario: {
        nombre: string;
        correoElectronico: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return loginUser(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { correoElectronico = "", contrasenia = "" } = req.body;

  await db.connect();
  const user = await Usuario.findOne({ correoElectronico });
  await db.disconnect();

  if (!user) {
    return res
      .status(400)
      .json({ message: "Correo o contraseña no validos - EMAIL" });
  }

  if (!bcrypt.compareSync(contrasenia, user.contrasenia)) {
    return res
      .status(400)
      .json({ message: "Correo o contraseña no validos - PASSWORD" });
  }

  const { _id, nombre, role } = user;
  const token = jwt.signToken(_id, correoElectronico);

  return res
    .status(200)
    .json({ token, usuario: { nombre, correoElectronico, role } });
};
