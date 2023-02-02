import { PersonalesDeMantenimientoState } from ".";
import { PersonalDeMantenimiento } from "../../../interfaces";

type PersonalesDeMantenimientoActionType =
  | {
      type: "[Personal De Mantenimiento] Agregar-Personal De Mantenimiento";
      payload: PersonalDeMantenimiento;
    }
  | {
      type: "[Personal De Mantenimiento] Actualizar-Personal De Mantenimiento";
      payload: PersonalDeMantenimiento;
    }
  | {
      type: "[Personal De Mantenimiento] Refrescar-Datos";
      payload: PersonalDeMantenimiento[];
    }
  | {
      type: "[Personal De Mantenimiento] Eliminar-Personal De Mantenimiento";
      payload: PersonalDeMantenimiento;
    };

export const personalesDeMantenimientoReducer = (
  state: PersonalesDeMantenimientoState,
  action: PersonalesDeMantenimientoActionType
): PersonalesDeMantenimientoState => {
  switch (action.type) {
    case "[Personal De Mantenimiento] Agregar-Personal De Mantenimiento":
      return {
        ...state,
        personalesDeMantenimiento: [
          ...state.personalesDeMantenimiento,
          action.payload,
        ],
      };

    case "[Personal De Mantenimiento] Actualizar-Personal De Mantenimiento":
      return {
        ...state,
        personalesDeMantenimiento: state.personalesDeMantenimiento.map(
          (personalDeMantenimiento) => {
            if (personalDeMantenimiento._id === action.payload._id) {
              personalDeMantenimiento.nombre = action.payload.nombre;
              personalDeMantenimiento.oficio = action.payload.oficio;
              personalDeMantenimiento.direccion = action.payload.direccion;
              personalDeMantenimiento.telefono = action.payload.telefono;
            }
            return personalDeMantenimiento;
          }
        ),
      };

    case "[Personal De Mantenimiento] Refrescar-Datos":
      return {
        ...state,
        personalesDeMantenimiento: [...action.payload],
      };

    case "[Personal De Mantenimiento] Eliminar-Personal De Mantenimiento":
      return {
        ...state,
        personalesDeMantenimiento: state.personalesDeMantenimiento.filter(
          (personalDeMantenimiento) =>
            personalDeMantenimiento._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
