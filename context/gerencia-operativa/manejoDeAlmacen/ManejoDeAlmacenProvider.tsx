import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";
import { ManejosDeAlmacenContext, manejosDeAlmacenReducer } from ".";
import { ListaManejoDeAlmacen } from "../../../interfaces";

import Swal from "sweetalert2";

export interface ManejosDeAlmacenState {
  manejosDeAlmacen: ListaManejoDeAlmacen[];
}

const ManejosDeAlmacen_INITIAL_STATE: ManejosDeAlmacenState = {
  manejosDeAlmacen: [],
};

interface Props {
  children: ReactNode;
}

export const ManejosDeAlmacenProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    manejosDeAlmacenReducer,
    ManejosDeAlmacen_INITIAL_STATE
  );

  const eliminarManejoDeAlmacen = async (
    manejoDeAlmacen: ListaManejoDeAlmacen,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<ListaManejoDeAlmacen>(
        `/manejosDeAlmacen/${manejoDeAlmacen._id}`
      );

      dispatch({
        type: "[Manejo De Almacen] Eliminar-Manejo De Almacen",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Manejo De Almacen Eliminado",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const agregarNuevoManejoDeAlmacen = async (
    listaManejoDeAlmacen: ListaManejoDeAlmacen[],
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ListaManejoDeAlmacen>(
        "/manejosDeAlmacen",
        {
          listaManejoDeAlmacen,
        }
      );
      dispatch({
        type: "[Manejo De Almacen] Agregar-Manejo De Almacen",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Manejo De Almacen Agregado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarManejoDeAlmacen = async (
    { _id, listaManejoDeAlmacen }: ListaManejoDeAlmacen,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ListaManejoDeAlmacen>(
        `/manejosDeAlmacen/${_id}`,
        {
          listaManejoDeAlmacen,
        }
      );
      dispatch({
        type: "[Manejo De Almacen] Actualizar-Manejo De Almacen",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Manejo De Almacen Actualizado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshManejosDeAlmacen = async () => {
    const { data } = await entriesApi.get<ListaManejoDeAlmacen[]>(
      "/manejosDeAlmacen"
    );
    // console.log(data);
    dispatch({ type: "[Manejo De Almacen] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshManejosDeAlmacen();
  }, []);

  return (
    <ManejosDeAlmacenContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevoManejoDeAlmacen,
        actualizarManejoDeAlmacen,
        eliminarManejoDeAlmacen,
      }}
    >
      {children}
    </ManejosDeAlmacenContext.Provider>
  );
};
