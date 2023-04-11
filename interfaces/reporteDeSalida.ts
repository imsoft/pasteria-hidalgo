import { IListadoReporteDeSalida } from "./listaReporteDeSalida";

export interface ReporteDeSalida {
  _id: string;
  sucursalAEnviar: string;
  nombreDelRepartidor: string;
  datosDeLaRuta: string;
  kilometrajeDeEntrada: string;
  kilometrajeDeSalida: string;
  listadoReporteDeSalida: IListadoReporteDeSalida[];
}
