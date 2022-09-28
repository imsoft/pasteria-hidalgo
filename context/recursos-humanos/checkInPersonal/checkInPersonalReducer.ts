import { CheckInPersonal } from '../../../interfaces';
import { ChecksInPersonalState } from './checkInPersonalProvider';

type ChecksInPersonalActionType =
  | { type: "[Check In Personal] Agregar-Check In Personal"; payload: CheckInPersonal }
  | { type: "[Check In Personal] Actualizar-Check In Personal"; payload: CheckInPersonal }
  | { type: "[Check In Personal] Refrescar-Datos"; payload: CheckInPersonal[] }
  | { type: "[Check In Personal] Eliminar-Checks In Personal"; payload: CheckInPersonal };

export const checksInPersonalReducer = (
  state: ChecksInPersonalState,
  action: ChecksInPersonalActionType
): ChecksInPersonalState => {
  switch (action.type) {
    case "[Check In Personal] Agregar-Check In Personal":
      return {
        ...state,
        checksInPersonal: [...state.checksInPersonal, action.payload],
      };

    case "[Check In Personal] Actualizar-Check In Personal":
      return {
        ...state,
        checksInPersonal: state.checksInPersonal.map((checkInPersonal) => {
          if (checkInPersonal._id === action.payload._id) {
            checkInPersonal.idFranquicia = action.payload.idFranquicia;
            checkInPersonal.idSucursal = action.payload.idSucursal;
            checkInPersonal.nombre = action.payload.nombre;
            checkInPersonal.fecha = action.payload.fecha;
            checkInPersonal.idPersonal = action.payload.idPersonal;
            checkInPersonal.horaDeIngreso = action.payload.horaDeIngreso;
            checkInPersonal.horaDeSalida = action.payload.horaDeSalida;
          }
          return checkInPersonal;
        }),
      };

    case "[Check In Personal] Refrescar-Datos":
      return {
        ...state,
        checksInPersonal: [...action.payload],
      };

    case "[Check In Personal] Eliminar-Checks In Personal":
      return {
        ...state,
        checksInPersonal: state.checksInPersonal.filter(
          (checkInPersonal) => checkInPersonal._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
