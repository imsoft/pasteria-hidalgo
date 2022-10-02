import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../apis";
import { SucursalYFranquicia } from "../../../interfaces";
import { SucursalesYFranquiciasContext, sucursalYFranquiciaReducer } from ".";

import Swal from "sweetalert2";

export interface SucursalesYFranquiciasState {
  sucursalesYFranquicias: SucursalYFranquicia[];
}

const SucursalesYFranquicias_INITIAL_STATE: SucursalesYFranquiciasState = {
  sucursalesYFranquicias: [],
};

interface Props {
  children: ReactNode;
}

export const SucursalesYFranquiciasProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    sucursalYFranquiciaReducer,
    SucursalesYFranquicias_INITIAL_STATE
  );

  const eliminarSucursalYFranquicia = async (
    sucursalYFranquicia: SucursalYFranquicia,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<SucursalYFranquicia>(
        `/sucursalesYFranquicias/${sucursalYFranquicia._id}`
      );

      dispatch({
        type: "[Sucursal Y Franquicia] Eliminar-Sucursal Y Franquicia",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sucursal Y Franquicia Eliminada",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarSucursalYFranquicia = async (
    direccion: string,
    distancia: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<SucursalYFranquicia>(
        "/sucursalesYFranquicias",
        {
          direccion,
          distancia,
        }
      );
      dispatch({
        type: "[Sucursal Y Franquicia] Agregar-Sucursal Y Franquicia",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sucursal Y Franquicia Agregada",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarSucursalYFranquicia = async (
    { _id, direccion, distancia }: SucursalYFranquicia,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<SucursalYFranquicia>(
        `/sucursalesYFranquicias/${_id}`,
        {
          direccion,
          distancia,
        }
      );
      dispatch({
        type: "[Sucursal Y Franquicia] Actualizar-Sucursal Y Franquicia",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sucursal Y Franquicia Actualizada",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshSucursalesYFranquicias = async () => {
    const { data } = await entriesApi.get<SucursalYFranquicia[]>(
      "/sucursalesYFranquicias"
    );
    console.log(data);
    dispatch({
      type: "[Sucursal Y Franquicia] Refrescar-Datos",
      payload: data,
    });
  };

  useEffect(() => {
    refreshSucursalesYFranquicias();
  }, []);

  return (
    <SucursalesYFranquiciasContext.Provider
      value={{
        ...state,

        //Methods
        agregarSucursalYFranquicia,
        actualizarSucursalYFranquicia,
        eliminarSucursalYFranquicia,
      }}
    >
      {children}
    </SucursalesYFranquiciasContext.Provider>
  );
};
