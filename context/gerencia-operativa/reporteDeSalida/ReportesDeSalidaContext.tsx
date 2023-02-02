import { createContext } from "react";
import { ListadoDeProductos, ReporteDeSalida, Unidades } from "../../../interfaces";

interface ContextProps {
  reportesDeSalida: ReporteDeSalida[];

  //Métodos
  agregarNuevoReporteDeSalida: (
    fecha: string,
    productoExtra: string,
    codigoDeProductoExtra: string,
    cantidadDeProductoExtra: string,
    unidadesDeProductoExtra: string,
    listadoDeProductos: ListadoDeProductos[],
    sucursalAEnviar: string,
    datosDeRepartidor: string,
    datosDeLaRuta: string,
    kilometrajeDeEntrada: string,
    kilometrajeDeSalida: string,
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
}

export const ReportesDeSalidaContext = createContext({} as ContextProps);
