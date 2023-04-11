import { MantenimientosState } from ".";
import { Mantenimiento } from "../../../interfaces";

type MantenimientosActionType =
  | { type: "[Mantenimiento] Agregar-Mantenimiento"; payload: Mantenimiento }
  | { type: "[Mantenimiento] Actualizar-Mantenimiento"; payload: Mantenimiento }
  | { type: "[Mantenimiento] Refrescar-Datos"; payload: Mantenimiento[] }
  | { type: "[Mantenimiento] Eliminar-Mantenimiento"; payload: Mantenimiento };

export const mantenimientosReducer = (
  state: MantenimientosState,
  action: MantenimientosActionType
): MantenimientosState => {
  switch (action.type) {
    case "[Mantenimiento] Agregar-Mantenimiento":
      return {
        ...state,
        mantenimientos: [...state.mantenimientos, action.payload],
      };

    case "[Mantenimiento] Actualizar-Mantenimiento":
      return {
        ...state,
        mantenimientos: state.mantenimientos.map((mantenimiento) => {
          if (mantenimiento._id === action.payload._id) {
            mantenimiento.sucursalOFranquicia =
              action.payload.sucursalOFranquicia;
            mantenimiento.nombreSucursalOFranquicia =
              action.payload.nombreSucursalOFranquicia;
            mantenimiento.nombreMaquina = action.payload.nombreMaquina;
            mantenimiento.proveedor = action.payload.proveedor;
            mantenimiento.fechaDeGarantia = action.payload.fechaDeGarantia;
            mantenimiento.fechaDeMantenimiento =
              action.payload.fechaDeMantenimiento;
            mantenimiento.modificacionDeMantenimiento =
              action.payload.modificacionDeMantenimiento;
          }
          return mantenimiento;
        }),
      };

    case "[Mantenimiento] Refrescar-Datos":
      return {
        ...state,
        mantenimientos: [...action.payload],
      };

    case "[Mantenimiento] Eliminar-Mantenimiento":
      return {
        ...state,
        mantenimientos: state.mantenimientos.filter(
          (mantenimiento) => mantenimiento._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
