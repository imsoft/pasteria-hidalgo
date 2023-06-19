import { db } from ".";
import { Usuario } from "../models";
import bcrypt from "bcryptjs";

export const checkUserEmailPassword = async (
  correoElectronico: string,
  contrasenia: string
) => {
  await db.connect();
  const user = await Usuario.findOne({ correoElectronico });
  await db.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(contrasenia, user.contrasenia)) {
    return null;
  }

  const {role, nombre, _id} =  user;

  return{
    id: _id,
    nombre,
    correoElectronico: correoElectronico.toLocaleLowerCase(),
    role,
  }
};
