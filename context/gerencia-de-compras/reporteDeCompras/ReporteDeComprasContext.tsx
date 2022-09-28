import { createContext } from "react";
import { ReporteDeCompra } from "../../../interfaces";

interface ContextProps {
  reportesDeCompras: ReporteDeCompra[];

  //Métodos
  agregarReporteDeCompra: (
    idReporteDeCompra: string,
    codigoDeReporte: string,
    fechaDeCompra: string,
    credito: string,
    fechaDePago: string,
    idMateriaPrima: string,
    materiaPrima: string,
    cantidad: string,
    unidades: string,
    idProveedor: string,
    nombreProveedor: string,
    precioPorUnidad: string,
    precioTotalDelProducto: string,
    precioTotalDelCompra: string,
    tempetatura: string,
    caducidad: string,
    factura: string,
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
