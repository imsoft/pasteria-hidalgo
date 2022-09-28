import { SucursalYFranquicia } from "../../../interfaces";
import { SucursalesYFranquiciasState } from "./SucursalYFranquiciaProvider";

type SucursalesYFranquiciasActionType =
  | { type: "[Sucursal Y Franquicia] Agregar-Sucursal Y Franquicia"; payload: SucursalYFranquicia }
  | { type: "[Sucursal Y Franquicia] Actualizar-Sucursal Y Franquicia"; payload: SucursalYFranquicia }
  | { type: "[Sucursal Y Franquicia] Refrescar-Datos"; payload: SucursalYFranquicia[] }
  | { type: "[Sucursal Y Franquicia] Eliminar-Sucursal Y Franquicia"; payload: SucursalYFranquicia };

export const sucursalYFranquiciaReducer = (
  state: SucursalesYFranquiciasState,
  action: SucursalesYFranquiciasActionType
): SucursalesYFranquiciasState => {
  switch (action.type) {
    case "[Sucursal Y Franquicia] Agregar-Sucursal Y Franquicia":
      return {
        ...state,
        sucursalesYFranquicias: [...state.sucursalesYFranquicias, action.payload],
      };

    case '[Sucursal Y Franquicia] Actualizar-Sucursal Y Franquicia':
      return {
        ...state,
        sucursalesYFranquicias: state.sucursalesYFranquicias.map((sucursalYFranquicia) => {
          if (sucursalYFranquicia._id === action.payload._id) {
            sucursalYFranquicia.direccion = action.payload.direccion;
            sucursalYFranquicia.distancia = action.payload.distancia;
          }
          return sucursalYFranquicia;
        }),
      };

    case '[Sucursal Y Franquicia] Refrescar-Datos':
      return {
        ...state,
        sucursalesYFranquicias: [...action.payload],
      };

    case "[Sucursal Y Franquicia] Eliminar-Sucursal Y Franquicia":
      return {
        ...state,
        sucursalesYFranquicias: state.sucursalesYFranquicias.filter(
          (sucursalYFranquicia) => sucursalYFranquicia._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
