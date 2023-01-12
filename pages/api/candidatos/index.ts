import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Candidato, ICandidato } from "../../../models";

type Data = { message: string } | ICandidato[] | ICandidato;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getCandidatos(res);

    case "POST":
      return postCandidato(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no exite " + req.method });
  }
}

const getCandidatos = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const candidatos = await Candidato.find().sort({ nombre: "ascending" });
  await db.disconnect();

  return res.status(200).json(candidatos);
};

const postCandidato = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    nombre = "",
    puesto = "",
    descripcionDelPuesto = "",
    fechaDeNacimiento = "",
    domicilio = "",
    curp = "",
    noImss = "",
    noCartaDePolicia = "",
    celular = "",
    contactoDeEmergencia = "",
    correoElectronico = "",
    referencia1Nombre = "",
    referencia1Empresa = "",
    referencia1NumeroTelefonico = "",
    referencia1Observaciones = "",
    referencia2Nombre = "",
    referencia2Empresa = "",
    referencia2NumeroTelefonico = "",
    referencia2Observaciones = "",
    referencia3Nombre = "",
    referencia3Empresa = "",
    referencia3NumeroTelefonico = "",
    referencia3Observaciones = "",
  } = req.body;

  const newCandidato = new Candidato({
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
  });

  try {
    await db.connect();
    await newCandidato.save();
    await db.disconnect();

    return res.status(201).json(newCandidato);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor" });
  }
};
