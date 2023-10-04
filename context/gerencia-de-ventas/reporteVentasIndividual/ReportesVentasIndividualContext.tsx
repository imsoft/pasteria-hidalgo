import { createContext } from "react";
import {
  ListadoDeProductos,
  ReporteVentasIndividual,
} from "../../../interfaces";

interface ContextProps {
  reportesVentasIndividual: ReporteVentasIndividual[];

  //Métodos
  agregarNuevoReporteVentasIndividual: (
    fecha: string,
    nombreDelVendedor: string,
    lugarDeVenta: string,
    nombreLugarDeVenta: string,
    totalDeLaVenta: number,
    promocionUsada: string,
    metodoDePago: string,
    listadoDeProductos: ListadoDeProductos[],
    correoElectronicoClienteFrecuente?: string,
    puntosClienteFrecuente?: number,
    showNotificacion?: boolean
  ) => void;

  actualizarReporteVentasIndividual: (
    reporteVentasIndividual: ReporteVentasIndividual,
    showNotificacion?: boolean
  ) => void;

  eliminarReporteVentasIndividual: (
    reporteVentasIndividual: ReporteVentasIndividual,
    showNotificacion?: boolean
  ) => void;

  refreshReportesVentasIndividual: () => Promise<void>;
}

export const ReportesVentasIndividualContext = createContext(
  {} as ContextProps
);
