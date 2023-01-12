import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Candidato, ICandidato } from "../../../../models";

type Data = { message: string } | ICandidato;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getCandidato(req, res);

    case "PUT":
      return updateCandidato(req, res);

    case "DELETE":
      return deleteCandidato(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getCandidato = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const candidatoInDB = await Candidato.findById(id);
  await db.disconnect();

  if (!candidatoInDB) {
    return res
      .status(400)
      .json({ message: "No hay candidato con ese ID: " + id });
  }

  return res.status(200).json(candidatoInDB);
};

const updateCandidato = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  await db.connect();

  const candidatoToUpdate = await Candidato.findById(id);

  if (!candidatoToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay candidato con ese ID: " + id });
  }

  const {
    nombre = candidatoToUpdate.nombre,
    puesto = candidatoToUpdate.puesto,
    descripcionDelPuesto = candidatoToUpdate.descripcionDelPuesto,
    fechaDeNacimiento = candidatoToUpdate.fechaDeNacimiento,
    domicilio = candidatoToUpdate.domicilio,
    curp = candidatoToUpdate.curp,
    noImss = candidatoToUpdate.noImss,
    noCartaDePolicia = candidatoToUpdate.noCartaDePolicia,
    celular = candidatoToUpdate.celular,
    contactoDeEmergencia = candidatoToUpdate.contactoDeEmergencia,
    correoElectronico = candidatoToUpdate.correoElectronico,
    referencia1Nombre = candidatoToUpdate.referencia1Nombre,
    referencia1Empresa = candidatoToUpdate.referencia1Empresa,
    referencia1NumeroTelefonico = candidatoToUpdate.referencia1NumeroTelefonico,
    referencia1Observaciones = candidatoToUpdate.referencia1Observaciones,
    referencia2Nombre = candidatoToUpdate.referencia2Nombre,
    referencia2Empresa = candidatoToUpdate.referencia2Empresa,
    referencia2NumeroTelefonico = candidatoToUpdate.referencia2NumeroTelefonico,
    referencia2Observaciones = candidatoToUpdate.referencia2Observaciones,
    referencia3Nombre = candidatoToUpdate.referencia3Nombre,
    referencia3Empresa = candidatoToUpdate.referencia3Empresa,
    referencia3NumeroTelefonico = candidatoToUpdate.referencia3NumeroTelefonico,
    referencia3Observaciones = candidatoToUpdate.referencia3Observaciones,
  } = req.body;

  try {
    const updatedCandidato = await Candidato.findByIdAndUpdate(
      id,
      {
        nombre,
        puesto,
        descripcionDelPuesto,
        fechaDeNacimiento,
        domicilio,
        curp,
        noImss,
        noCartaDePolicia,
        celular,
        contactoDeEmergencia,
        correoElectronico,
        referencia1Nombre,
        referencia1Empresa,
        referencia1NumeroTelefonico,
        referencia1Observaciones,
        referencia2Nombre,
        referencia2Empresa,
        referencia2NumeroTelefonico,
        referencia2Observaciones,
        referencia3Nombre,
        referencia3Empresa,
        referencia3NumeroTelefonico,
        referencia3Observaciones,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedCandidato!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteCandidato = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const candidatoDBToDelete = await Candidato.findByIdAndDelete(id);
  await db.disconnect();

  if (!candidatoDBToDelete) {
    return res
      .status(400)
      .json({ message: "No hay candidato con ese ID: " + id });
  }

  return res.status(200).json(candidatoDBToDelete);
};
