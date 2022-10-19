import { createContext } from "react";
import { Proveedor } from "../../../interfaces";

interface ContextProps {
  proveedores: Proveedor[];

  //Métodos
  agregarNuevoProveedor: (
    nombre: string,
    direccion: string,
    telefono: string,
    horarioDeApertura: string,
    horarioDeCierre: string,
    productosQueSeCompran: string,
    entregasADomicilio: string,
    rfc: string,
    showNotificacion?: boolean
  ) => void;

  actualizarProveedor: (
    proveedor: Proveedor,
    showNotificacion?: boolean
  ) => void;

  eliminarProveedor: (proveedor: Proveedor, showNotificacion?: boolean) => void;
}

export const ProveedoresContext = createContext({} as ContextProps);
