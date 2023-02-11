import { createContext } from "react";
import {
  IListadoDeReporteDeCompra,
  ReporteDeCompra,
} from "../../../interfaces";

interface ContextProps {
  reportesDeCompras: ReporteDeCompra[];

  //Métodos
  agregarReporteDeCompra: (
    fechaDeCompra: string,
    credito: string,
    nombreProveedor: string,
    factura: string,
    listadoDeReporteDeCompra: IListadoDeReporteDeCompra[],
    precioTotalDelCompra: number,
    showNotificacion?: boolean
  ) => void;

  actualizarReporteDeCompra: (
    reporteDeCompra: ReporteDeCompra,
    showNotificacion?: boolean
  ) => void;

  eliminarReporteDeCompra: (
    reporteDeCompra: ReporteDeCompra,
    showNotificacion?: boolean
  ) => void;
}

export const ReporteDeCompraContext = createContext({} as ContextProps);
