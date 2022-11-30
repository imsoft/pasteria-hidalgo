import { MateriaPrima } from '../../../interfaces/materiaPrima';
import { MateriasPrimasState } from './MateriaPrimaProvider';


type MateriasPrimasActionType =
  | { type: "[Materia Prima] Agregar-Materia Prima"; payload: MateriaPrima }
  | { type: "[Materia Prima] Actualizar-Materia Prima"; payload: MateriaPrima }
  | { type: "[Materia Prima] Refrescar-Datos"; payload: MateriaPrima[] }
  | { type: "[Materia Prima] Eliminar-Materia Prima"; payload: MateriaPrima };

export const materiasPrimasReducer = (
  state: MateriasPrimasState,
  action: MateriasPrimasActionType
): MateriasPrimasState => {
  switch (action.type) {
    case "[Materia Prima] Agregar-Materia Prima":
      return {
        ...state,
        materiasPrimas: [...state.materiasPrimas, action.payload],
      };

    case "[Materia Prima] Actualizar-Materia Prima":
      return {
        ...state,
        materiasPrimas: state.materiasPrimas.map((materiaPrima) => {
          if (materiaPrima._id === action.payload._id) {
            materiaPrima.materiaPrima = action.payload.materiaPrima;
            materiaPrima.unidades = action.payload.unidades;
            materiaPrima.temperatura = action.payload.temperatura;
          }
          return materiaPrima;
        }),
      };

    case "[Materia Prima] Refrescar-Datos":
      return {
        ...state,
        materiasPrimas: [...action.payload],
      };

    case "[Materia Prima] Eliminar-Materia Prima":
      return {
        ...state,
        materiasPrimas: state.materiasPrimas.filter(
          (materiaPrima) => materiaPrima._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
