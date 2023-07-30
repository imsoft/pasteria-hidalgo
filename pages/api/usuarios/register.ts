import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Usuario } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt, validations } from "../../../utils";

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
        sucursalOFranquicia: string;
        nombreSucursalOFranquicia: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    nombre = "",
    correoElectronico = "",
    contrasenia = "",
    role = "",
    sucursalOFranquicia = "",
    nombreSucursalOFranquicia = "",
  } = req.body as {
    nombre: string;
    correoElectronico: string;
    contrasenia: string;
    role: string;
    sucursalOFranquicia: string;
    nombreSucursalOFranquicia: string;
  };

  if (contrasenia.length < 6) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }

  if (nombre.length < 3) {
    return res
      .status(400)
      .json({ message: "El nombre debe tener al menos 3 caracteres" });
  }

  if (!validations.isValidEmail(correoElectronico)) {
    return res.status(400).json({ message: "El correo no es valido" });
  }

  await db.connect();
  const user = await Usuario.findOne({ correoElectronico });

  if (user) {
    return res.status(400).json({ message: "El correo ya esta registrado" });
  }

  const newUser = new Usuario({
    nombre,
    correoElectronico: correoElectronico.toLowerCase(),
    contrasenia: bcrypt.hashSync(contrasenia),
    role,
    sucursalOFranquicia,
    nombreSucursalOFranquicia,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Revisar logs de servidor" });
  }

  const { _id } = newUser;
  const token = jwt.signToken(_id, correoElectronico);

  return res
    .status(200)
    .json({
      token,
      usuario: {
        nombre,
        correoElectronico,
        role,
        sucursalOFranquicia,
        nombreSucursalOFranquicia,
      },
    });
};
