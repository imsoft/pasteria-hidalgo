import { createContext } from "react";
import { SucursalYFranquicia } from "../../../interfaces";

interface ContextProps {
  sucursalesYFranquicias: SucursalYFranquicia[];

  //Métodos
  agregarSucursalYFranquicia: (
    sucursalOFranquicia: string,
    direccion: string,
    distancia: string,
    fechaDePago: string,
    montoDePago: string,
    cuentaBancaria: string,
    banco: string,
    nombreDelBeneficiario: string,
    rfc: string,
    sucursales?: string,
    franquicias?: string,
    showNotificacion?: boolean
  ) => void;

  actualizarSucursalYFranquicia: (
    sucursalYFranquicia: SucursalYFranquicia,
    showNotificacion?: boolean
  ) => void;

  eliminarSucursalYFranquicia: (
    sucursalYFranquicia: SucursalYFranquicia,
    showNotificacion?: boolean
  ) => void;
}

export const SucursalesYFranquiciasContext = createContext({} as ContextProps);
