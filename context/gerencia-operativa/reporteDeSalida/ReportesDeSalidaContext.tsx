import { createContext } from "react";
import { IListadoReporteDeSalida, ReporteDeSalida } from "../../../interfaces";

interface ContextProps {
  reportesDeSalida: ReporteDeSalida[];

  //Métodos
  agregarNuevoReporteDeSalida: (
    sucursalAEnviar: string,
    nombreDelRepartidor: string,
    datosDeLaRuta: string,
    kilometrajeDeEntrada: string,
    kilometrajeDeSalida: string,
    listadoReporteDeSalida: IListadoReporteDeSalida[],
    showNotificacion?: boolean
  ) => void;

  actualizarReporteDeSalida: (
    reporteDeSalida: ReporteDeSalida,
    showNotificacion?: boolean
  ) => void;

  eliminarReporteDeSalida: (
    reporteDeSalida: ReporteDeSalida,
    showNotificacion?: boolean
  ) => void;

  refreshReportesDeSalida: () => Promise<void>;
}

export const ReportesDeSalidaContext = createContext({} as ContextProps);
