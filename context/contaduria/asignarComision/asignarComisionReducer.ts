import { AsignarComision } from "../../../interfaces";
import { AsignarComisionesState } from "./AsignarComisionProvider";

type AsignarComisionesActionType =
  | {
      type: "[Asignar Comision] Agregar-Asignar Comision";
      payload: AsignarComision;
    }
  | {
      type: "[Asignar Comision] Actualizar-Asignar Comision";
      payload: AsignarComision;
    }
  | { type: "[Asignar Comision] Refrescar-Datos"; payload: AsignarComision[] }
  | {
      type: "[Asignar Comision] Eliminar-Asignar Comision";
      payload: AsignarComision;
    };

export const asignarComisionesReducer = (
  state: AsignarComisionesState,
  action: AsignarComisionesActionType
): AsignarComisionesState => {
  switch (action.type) {
    case "[Asignar Comision] Agregar-Asignar Comision":
      return {
        ...state,
        asignarComisiones: [...state.asignarComisiones, action.payload],
      };

    case "[Asignar Comision] Actualizar-Asignar Comision":
      return {
        ...state,
        asignarComisiones: state.asignarComisiones.map((checkInPersonal) => {
          if (checkInPersonal._id === action.payload._id) {
            checkInPersonal.sucursalOFranquicia =
              action.payload.sucursalOFranquicia;
            checkInPersonal.minimoDeLaMeta = action.payload.minimoDeLaMeta;
            checkInPersonal.sucursales = action.payload.sucursales;
            checkInPersonal.franquicias = action.payload.franquicias;
          }
          return checkInPersonal;
        }),
      };

    case "[Asignar Comision] Refrescar-Datos":
      return {
        ...state,
        asignarComisiones: [...action.payload],
      };

    case "[Asignar Comision] Eliminar-Asignar Comision":
      return {
        ...state,
        asignarComisiones: state.asignarComisiones.filter(
          (asignarComision) => asignarComision._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};