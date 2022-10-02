import { createContext } from "react";
import { AcondicionamientoDeSucursal } from "../../../interfaces";

interface ContextProps {
  acondicionamientoDeSucursales: AcondicionamientoDeSucursal[];

  //Métodos
  agregarNuevoAcondicionamientoDeSucursal: (
    producto: string,
    fechaDeCompra: string,
    descripcionDelProducto: string,
    precioDeCompra: string,
    fechaEstimadaDeEntrega: string,
    proveedor: string,
    factura: string,
    totalAcomulado: string,
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
