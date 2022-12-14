import { PuestosEmpresa } from ".";

export interface Candidato {
  _id: string;
  nombre: string;
  puesto: PuestosEmpresa;
  descripcionDelPuesto: string;
  fechaDeNacimiento: string;
  domicilio: string;
  curp: string;
  noImss?: string;
  noCartaDePolicia: string;
  celular: string;
  contactoDeEmergencia: string;
  correoElectronico: string;
  referencia1Nombre: string;
  referencia1Empresa: string;
  referencia1CorreoElectronico: string;
  referencia2Nombre: string;
  referencia2Empresa: string;
  referencia2CorreoElectronico: string;
  referencia3Nombre?: string;
  referencia3Empresa?: string;
  referencia3CorreoElectronico?: string;
}