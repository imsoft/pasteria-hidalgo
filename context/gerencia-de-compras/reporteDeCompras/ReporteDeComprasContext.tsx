import { createContext } from "react";
import { ReporteDeCompra } from "../../../interfaces";

interface ContextProps {
  reportesDeCompras: ReporteDeCompra[];

  //Métodos
  agregarReporteDeCompra: (
    fechaDeCompra: string,
    credito: string,
    materiaPrima: string,
    unidades: string,
    nombreProveedor: string,
    tempetatura: string,
    caducidad: string,
    factura: string,
    cantidad: number,
    precioPorUnidad: number,
    precioTotalDelProducto: number,
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
