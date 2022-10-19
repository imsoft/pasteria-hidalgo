import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../apis";
import { AsignarPreciosContext, asignarPreciosReducer } from ".";
import { AsignarPrecio } from "../../../interfaces";

import Swal from "sweetalert2";

export interface AsignarPreciosState {
  asignarPrecios: AsignarPrecio[];
}

const AsignarPrecios_INITIAL_STATE: AsignarPreciosState = {
  asignarPrecios: [],
};

interface Props {
  children: ReactNode;
}

export const AsignarPreciosProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    asignarPreciosReducer,
    AsignarPrecios_INITIAL_STATE
  );

  const eliminarAsignarPrecio = async (
    asignarPrecio: AsignarPrecio,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<AsignarPrecio>(
        `/asignarPrecios/${asignarPrecio._id}`
      );

      dispatch({
        type: "[Asignar Precios] Eliminar-Asignar Precio",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Precio Asignado Eliminado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarNuevoAsignarPrecio = async (
    producto: string,
    precioMaximo: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<AsignarPrecio>("/asignarPrecios", {
        producto,
        precioMaximo,
      });
      dispatch({
        type: "[Asignar Precios] Agregar-Asignar Precios",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Asignar Precio Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarAsignarPrecio = async (
    { _id, producto, precioMaximo }: AsignarPrecio,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<AsignarPrecio>(
        `/asignarPrecios/${_id}`,
        {
          producto,
          precioMaximo,
        }
      );
      dispatch({
        type: "[Asignar Precios] Actualizar-Asignar Precios",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Asignar Precio Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshCandidatos = async () => {
    const { data } = await entriesApi.get<AsignarPrecio[]>("/asignarPrecios");
    console.log(data);
    dispatch({ type: "[Asignar Precios] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshCandidatos();
  }, []);

  return (
    <AsignarPreciosContext.Provider
      value={{
        ...state,

        //Methods
        eliminarAsignarPrecio,
        agregarNuevoAsignarPrecio,
        actualizarAsignarPrecio,
      }}
    >
      {children}
    </AsignarPreciosContext.Provider>
  );
};
