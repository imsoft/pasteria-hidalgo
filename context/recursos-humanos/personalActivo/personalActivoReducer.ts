import { PersonalActivoState } from ".";
import { PersonalActivo } from "../../../interfaces";

type PersonalActivoActionType =
  | {
      type: "[Personal Activo] Agregar-Personal Activo";
      payload: PersonalActivo;
    }
  | {
      type: "[Personal Activo] Actualizar-Personal Activo";
      payload: PersonalActivo;
    }
  | { type: "[Personal Activo] Refrescar-Datos"; payload: PersonalActivo[] }
  | {
      type: "[Personal Activo] Eliminar-Personal Activo";
      payload: PersonalActivo;
    };

export const personalActivoReducer = (
  state: PersonalActivoState,
  action: PersonalActivoActionType
): PersonalActivoState => {
  switch (action.type) {
    case "[Personal Activo] Agregar-Personal Activo":
      return {
        ...state,
        personasActivas: [...state.personasActivas, action.payload],
      };

    case "[Personal Activo] Actualizar-Personal Activo":
      return {
        ...state,
        personasActivas: state.personasActivas.map((personalActivo) => {
          if (personalActivo._id === action.payload._id) {
            personalActivo.nombre = action.payload.nombre;
            personalActivo.puesto = action.payload.puesto;
            personalActivo.fechaDeContratacion =
              action.payload.fechaDeContratacion;
            personalActivo.noContrato = action.payload.noContrato;
            personalActivo.noExpediente = action.payload.noExpediente;
            personalActivo.bajaTemporal = action.payload.bajaTemporal;
            personalActivo.comentarios = action.payload.comentarios;
          }
          return personalActivo;
        }),
      };

    case "[Personal Activo] Refrescar-Datos":
      return {
        ...state,
        personasActivas: [...action.payload],
      };

    case "[Personal Activo] Eliminar-Personal Activo":
      return {
        ...state,
        personasActivas: state.personasActivas.filter(
          (personalActivo) => personalActivo._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
