import { createContext } from 'react';
import { Proveedor } from '../../../interfaces';

interface ContextProps {
  proveedores: Proveedor[];

  //Métodos
  agregarNuevoProveedor: (
    nombre: string,
    direccion: string,
    telefono: string,
    horarioAtencion: string,
    productosQueSeCompran: string,
    entregasADomicilio: string,
    showNotificacion?: boolean
  ) => void;

  actualizarProveedor: (
    proveedor: Proveedor,
    showNotificacion?: boolean
  ) => void;

  eliminarProveedor: (
    proveedor: Proveedor,
    showNotificacion?: boolean
  ) => void;
}

export const ProveedoresContext = createContext({} as ContextProps);
