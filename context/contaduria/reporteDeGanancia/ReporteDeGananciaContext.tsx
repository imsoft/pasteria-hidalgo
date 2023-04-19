import { createContext } from "react";
import { ReporteDeGanancia } from "../../../interfaces";

interface ContextProps {
  reportesDeGanancias: ReporteDeGanancia[];

  //Métodos
  agregarNuevoReporteDeGanancia: (
    mes: string,
    anio: string,
    sucursal: string,
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
}

export const ReporteDeGananciaContext = createContext({} as ContextProps);
