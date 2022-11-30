import { createContext } from "react";
import { MateriaPrima } from "../../../interfaces";

interface ContextProps {
  materiasPrimas: MateriaPrima[];

  //Métodos
  agregarNuevaMateriaPrima: (
    materiaPrima: string,
    unidades: string,
    temperatura: string,
    showNotificacion?: boolean
  ) => void;

  actualizarMateriaPrima: (
    materiaPrima: MateriaPrima,
    showNotificacion?: boolean
  ) => void;

  eliminarMateriaPrima: (materiaPrima: MateriaPrima, showNotificacion?: boolean) => void;
}

export const MateriasPrimasContext = createContext({} as ContextProps);
