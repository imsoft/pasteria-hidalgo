import { createContext } from "react";
import { ReporteDeGanancia, VentasSucursalIndividual } from "../../../interfaces";

interface ContextProps {
  reportesDeGanancias: ReporteDeGanancia[];

  //Métodos
  agregarNuevoReporteDeGanancia: (
    mes: string,
    anio: string,
    ventasSucursalIndividual: VentasSucursalIndividual,
    totalVentas: number,
    totalCompras: number,
    balance: number,
    showNotification?: boolean
  ) => void;

  actualizarReporteDeGanancia: (
    reporteDeGanancia: ReporteDeGanancia,
    showNotificacion?: boolean
  ) => void;

  eliminarReporteDeGanancia: (
    reporteDeGanancia: ReporteDeGanancia,
    showNotificacion?: boolean
  ) => void;

  refreshReporteDeGanancia: () => Promise<void>;
}

export const ReporteDeGananciaContext = createContext({} as ContextProps);
