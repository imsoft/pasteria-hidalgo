import { createContext } from "react";
import {
  ListadoDeProductos,
  ReporteVentasAmbulantesIndividual,
} from "../../../interfaces";

interface ContextProps {
  reportesVentasAmbulantesIndividual: ReporteVentasAmbulantesIndividual[];

  //Métodos
  agregarNuevoReporteVentasAmbulantesIndividual: (
    fecha: string,
    nombreDelVendedor: string,
    totalDeLaVenta: number,
    listadoDeProductos: ListadoDeProductos[],
    showNotificacion?: boolean
  ) => void;

  actualizarReporteVentasAmbulantesIndividual: (
    reporteVentasAmbulantesIndividual: ReporteVentasAmbulantesIndividual,
    showNotificacion?: boolean
  ) => void;

  eliminarReporteVentasAmbulantesIndividual: (
    reporteVentasAmbulantesIndividual: ReporteVentasAmbulantesIndividual,
    showNotificacion?: boolean
  ) => void;

  refreshReporteVentasAmbulantesIndividual: () => Promise<void>;
}

export const ReportesVentasAmbulantesIndividualContext = createContext(
  {} as ContextProps
);
