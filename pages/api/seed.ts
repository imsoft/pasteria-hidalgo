import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedDatabase } from "../../database";
import {
  AcondicionamientoDeSucursal,
  ApartadoJuridico,
  AsignarComision,
  AsignarPrecio,
  Candidato,
  CheckInDePersonal,
  ClienteFrecuente,
  ManejoDeAlmacen,
  Mantenimiento,
  MateriaPrima,
  PersonalActivo,
  PersonalDeMantenimiento,
  Proveedor,
  ReporteDeCompra,
  ReporteDeSalida,
  ReporteVentasAmbulantesIndividual,
  ReporteVentasIndividual,
  SucursalYFranquicia,
  Usuario,
} from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // if (process.env.NODE_ENV === "production") {
  //   return res.status(401).json({
  //     message: "No tiene acceso a este servicio",
  //   });
  // }

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

  await Proveedor.deleteMany(); //Borra todo de la DB
  await Proveedor.insertMany(seedDatabase.initialData.proveedor);

  await ReporteDeCompra.deleteMany(); //Borra todo de la DB
  await ReporteDeCompra.insertMany(seedDatabase.initialData.reporteDeCompra);

  await AsignarPrecio.deleteMany(); //Borra todo de la DB
  await AsignarPrecio.insertMany(seedDatabase.initialData.asignarPrecio);

  await ClienteFrecuente.deleteMany(); //Borra todo de la DB
  await ClienteFrecuente.insertMany(seedDatabase.initialData.clienteFrecuente);

  await ReporteVentasAmbulantesIndividual.deleteMany(); //Borra todo de la DB
  await ReporteVentasAmbulantesIndividual.insertMany(
    seedDatabase.initialData.reporteVentasAmbulantesIndividual
  );

  await ReporteVentasIndividual.deleteMany(); //Borra todo de la DB
  await ReporteVentasIndividual.insertMany(
    seedDatabase.initialData.reporteVentasIndividual
  );

  await ApartadoJuridico.deleteMany(); //Borra todo de la DB
  await ApartadoJuridico.insertMany(seedDatabase.initialData.apartadoJuridico);

  await SucursalYFranquicia.deleteMany(); //Borra todo de la DB
  await SucursalYFranquicia.insertMany(
    seedDatabase.initialData.sucursalYFranquicia
  );

  await PersonalDeMantenimiento.deleteMany(); //Borra todo de la DB
  await PersonalDeMantenimiento.insertMany(
    seedDatabase.initialData.personalDeMantenimiento
  );

  await Mantenimiento.deleteMany(); //Borra todo de la DB
  await Mantenimiento.insertMany(seedDatabase.initialData.mantenimiento);

  await ReporteDeSalida.deleteMany(); //Borra todo de la DB
  await ReporteDeSalida.insertMany(seedDatabase.initialData.reporteDeSalida);

  await MateriaPrima.deleteMany(); //Borra todo de la DB
  await MateriaPrima.insertMany(seedDatabase.initialData.materiaPrima);

  await AsignarComision.deleteMany(); //Borra todo de la DB
  await AsignarComision.insertMany(seedDatabase.initialData.asignarComision);

  await ManejoDeAlmacen.deleteMany(); //Borra todo de la DB
  await ManejoDeAlmacen.insertMany(seedDatabase.initialData.manejoDeAlmacen);

  await Usuario.deleteMany(); //Borra todo de la DB
  await Usuario.insertMany(seedDatabase.initialData.usuario);

  await db.disconnect();

  res.status(200).json({ message: "Proceso realizado correctamente" });
}
