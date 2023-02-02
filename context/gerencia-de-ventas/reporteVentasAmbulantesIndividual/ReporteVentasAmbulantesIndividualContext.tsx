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
    nombreLugarDeVenta: string,
    totalDeLaVenta: number,
    listadoDeProductos: ListadoDeProductos[],
    correoElectronicoClienteFrecuente?: string,
    puntosClienteFrecuente?: number,
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
}

export const ReportesVentasAmbulantesIndividualContext = createContext(
  {} as ContextProps
);
