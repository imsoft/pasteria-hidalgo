import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedDatabase } from "../../database";
import {
  AcondicionamientoDeSucursal,
  Candidato,
  CheckInDePersonal,
  PersonalActivo,
} from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({
      message: "No tiene acceso a este servicio",
    });
  }

  await db.connect();
  await Candidato.deleteMany(); //Borra todo de la DB
  await Candidato.insertMany(seedDatabase.initialData.candidatos);

  await PersonalActivo.deleteMany(); //Borra todo de la DB
  await PersonalActivo.insertMany(seedDatabase.initialData.personalActivo);

  await CheckInDePersonal.deleteMany(); //Borra todo de la DB
  await CheckInDePersonal.insertMany(
    seedDatabase.initialData.checkInDePersonal
  );

  await AcondicionamientoDeSucursal.deleteMany(); //Borra todo de la DB
  await AcondicionamientoDeSucursal.insertMany(
    seedDatabase.initialData.acondicionamientoDeSucursal
  );
  await db.disconnect();

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
