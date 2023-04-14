import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";

import Swal from "sweetalert2";
import { MateriaPrima } from "../../../interfaces";
import { MateriasPrimasContext, materiasPrimasReducer } from '.';

export interface MateriasPrimasState {
    materiasPrimas: MateriaPrima[];
}

const MateriasPrimas_INITIAL_STATE: MateriasPrimasState = {
    materiasPrimas: [],
};

interface Props {
  children: ReactNode;
}

export const MateriasPrimasProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    materiasPrimasReducer,
    MateriasPrimas_INITIAL_STATE
  );

  const eliminarMateriaPrima = async (
    materiaPrima: MateriaPrima,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<MateriaPrima>(
        `/materiasPrimas/${materiaPrima._id}`
      );

      dispatch({
        type: "[Materia Prima] Eliminar-Materia Prima",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Materia Prima Eliminado",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const agregarNuevaMateriaPrima = async (
    materiaPrima: string,
    unidades: string,
    temperatura: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<MateriaPrima>("/materiasPrimas", {
        materiaPrima,
        unidades,
        temperatura,
      });
      dispatch({ type: "[Materia Prima] Agregar-Materia Prima", payload: data });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Materia Prima Agregado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarMateriaPrima = async (
    {
      _id,
      materiaPrima,
      unidades,
      temperatura,
    }: MateriaPrima,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<MateriaPrima>(`/materiasPrimas/${_id}`, {
        materiaPrima,
        unidades,
        temperatura,
      });
      dispatch({ type: "[Materia Prima] Actualizar-Materia Prima", payload: data });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Materia Prima Actualizado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshMateriasPrimas = async () => {
    const { data } = await entriesApi.get<MateriaPrima[]>("/materiasPrimas");
    console.log(data);
    dispatch({ type: "[Materia Prima] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshMateriasPrimas();
  }, []);

  return (
    <MateriasPrimasContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevaMateriaPrima,
        actualizarMateriaPrima,
        eliminarMateriaPrima,
      }}
    >
      {children}
    </MateriasPrimasContext.Provider>
  );
};
