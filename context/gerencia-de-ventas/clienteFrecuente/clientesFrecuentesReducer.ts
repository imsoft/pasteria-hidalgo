import { ClientesFrecuentesState } from ".";
import { ClienteFrecuente } from "../../../interfaces";

type ClientesFrecuentesActionType =
  | {
      type: "[Cliente Frecuente] Agregar-Cliente Frecuente";
      payload: ClienteFrecuente;
    }
  | {
      type: "[Cliente Frecuente] Actualizar-Cliente Frecuente";
      payload: ClienteFrecuente;
    }
  | { type: "[Cliente Frecuente] Refrescar-Datos"; payload: ClienteFrecuente[] }
  | {
      type: "[Cliente Frecuente] Eliminar-Cliente Frecuente";
      payload: ClienteFrecuente;
    };

export const clientesFrecuentesReducer = (
  state: ClientesFrecuentesState,
  action: ClientesFrecuentesActionType
): ClientesFrecuentesState => {
  switch (action.type) {
    case "[Cliente Frecuente] Agregar-Cliente Frecuente":
      return {
        ...state,
        clientesFrecuentes: [...state.clientesFrecuentes, action.payload],
      };

    case "[Cliente Frecuente] Actualizar-Cliente Frecuente":
      return {
        ...state,
        clientesFrecuentes: state.clientesFrecuentes.map((clienteFrecuente) => {
          if (clienteFrecuente._id === action.payload._id) {
            clienteFrecuente.nombre = action.payload.nombre;
            clienteFrecuente.correoElectronico =
              action.payload.correoElectronico;
            clienteFrecuente.fechaDeNacimiento =
              action.payload.fechaDeNacimiento;
          }
          return clienteFrecuente;
        }),
      };

    case "[Cliente Frecuente] Refrescar-Datos":
      return {
        ...state,
        clientesFrecuentes: [...action.payload],
      };

    case "[Cliente Frecuente] Eliminar-Cliente Frecuente":
      return {
        ...state,
        clientesFrecuentes: state.clientesFrecuentes.filter(
          (clienteFrecuente) => clienteFrecuente._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
