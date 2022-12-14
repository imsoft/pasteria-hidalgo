import { createContext } from "react";
import { AcondicionamientoDeSucursal } from "../../../interfaces";

interface ContextProps {
  acondicionamientoDeSucursales: AcondicionamientoDeSucursal[];

  //Métodos
  agregarNuevoAcondicionamientoDeSucursal: (
    sucursalOFranquicia: string,
    producto: string,
    fechaDeCompra: string,
    descripcionDelProducto: string,
    fechaEstimadaDeEntrega: string,
    proveedor: string,
    factura: string,
    precioDeCompra: number,
    cantidad: number,
    totalAcomulado: number,
    sucursales?: string,
    franquicias?: string,
    showNotificacion?: boolean
  ) => void;

  actualizarAcondicionamientoDeSucursal: (
    acondicionamientoDeSucursal: AcondicionamientoDeSucursal,
    showNotificacion?: boolean
  ) => void;

  eliminarAcondicionamientoDeSucursal: (
    acondicionamientoDeSucursal: AcondicionamientoDeSucursal,
    showNotificacion?: boolean
  ) => void;
}

export const AcondicionamientoDeSucursalesContext = createContext(
  {} as ContextProps
);
