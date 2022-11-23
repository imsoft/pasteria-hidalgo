import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";
import { ManejosDePersonalContext, manejosDePersonalReducer } from ".";
import { ManejoPersonal } from "../../../interfaces";

import Swal from "sweetalert2";

export interface ManejosDePersonalState {
  manejosDePersonal: ManejoPersonal[];
}

const ManejosDePersonal_INITIAL_STATE: ManejosDePersonalState = {
  manejosDePersonal: [],
};

interface Props {
  children: ReactNode;
}

export const ManejosDePersonalProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    manejosDePersonalReducer,
    ManejosDePersonal_INITIAL_STATE
  );

  const eliminarManejoDePersonal = async (
    manejoDePersonal: ManejoPersonal,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<ManejoPersonal>(
        `/manejosDePersonal/${manejoDePersonal._id}`
      );

      dispatch({
        type: "[Manejo De Personal] Eliminar-Manejo De Personal",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Manejo De Personal Eliminado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarNuevoManejoDePersonal = async (
    nombre: string,
    descripcionDelPuesto: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ManejoPersonal>(
        "/manejosDePersonal",
        {
          nombre,
          descripcionDelPuesto,
        }
      );
      dispatch({
        type: "[Manejo De Personal] Agregar-Manejo De Personal",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Manejo De Personal Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarManejoDePersonal = async (
    { _id, nombre, descripcionDelPuesto }: ManejoPersonal,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ManejoPersonal>(
        `/manejosDePersonal/${_id}`,
        {
          nombre,
          descripcionDelPuesto,
        }
      );
      dispatch({
        type: "[Manejo De Personal] Actualizar-Manejo De Personal",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Manejo De Personal Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshCandidatos = async () => {
    const { data } = await entriesApi.get<ManejoPersonal[]>(
      "/manejosDePersonal"
    );
    console.log(data);
    dispatch({ type: "[Manejo De Personal] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshCandidatos();
  }, []);

  return (
    <ManejosDePersonalContext.Provider
      value={{
        ...state,

        //Methods
        eliminarManejoDePersonal,
        agregarNuevoManejoDePersonal,
        actualizarManejoDePersonal,
      }}
    >
      {children}
    </ManejosDePersonalContext.Provider>
  );
};
