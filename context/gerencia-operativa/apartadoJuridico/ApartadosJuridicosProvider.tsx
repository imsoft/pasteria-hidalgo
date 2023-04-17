import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";
import { ApartadosJuridicosContext, apartadosJuridicosReducer } from ".";
import { ApartadoJuridico } from "../../../interfaces";

import Swal from "sweetalert2";

export interface ApartadosJuridicosState {
  apartadosJuridicos: ApartadoJuridico[];
}

const ApartadosJuridicos_INITIAL_STATE: ApartadosJuridicosState = {
  apartadosJuridicos: [],
};

interface Props {
  children: ReactNode;
}

export const ApartadosJuridicosProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    apartadosJuridicosReducer,
    ApartadosJuridicos_INITIAL_STATE
  );

  const eliminarApartadoJuridico = async (
    apartadoJuridico: ApartadoJuridico,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<ApartadoJuridico>(
        `/apartadosJuridicos/${apartadoJuridico._id}`
      );

      dispatch({
        type: "[Apartado Juridico] Eliminar-Apartado Juridico",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Apartado Juridico Eliminado",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const agregarNuevoApartadoJuridico = async (
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string,
    nombreDelArchivo: string,
    urlDelArchivo: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ApartadoJuridico>(
        "/apartadosJuridicos",
        {
          sucursalOFranquicia,
          nombreSucursalOFranquicia,
          nombreDelArchivo,
          urlDelArchivo,
        }
      );
      dispatch({
        type: "[Apartado Juridico] Agregar-Apartado Juridico",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Apartado Juridico Agregado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarApartadoJuridico = async (
    {
      _id,
      sucursalOFranquicia,
      nombreSucursalOFranquicia,
      nombreDelArchivo,
      urlDelArchivo,
    }: ApartadoJuridico,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ApartadoJuridico>(
        `/apartadosJuridicos/${_id}`,
        {
          sucursalOFranquicia,
          nombreSucursalOFranquicia,
          nombreDelArchivo,
          urlDelArchivo,
        }
      );
      dispatch({
        type: "[Apartado Juridico] Actualizar-Apartado Juridico",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Apartado Juridico Actualizado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshApartadosJuridicos = async () => {
    const { data } = await entriesApi.get<ApartadoJuridico[]>(
      "/apartadosJuridicos"
    );
    // console.log(data);
    dispatch({ type: "[Apartado Juridico] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshApartadosJuridicos();
  }, []);

  return (
    <ApartadosJuridicosContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevoApartadoJuridico,
        actualizarApartadoJuridico,
        eliminarApartadoJuridico,
      }}
    >
      {children}
    </ApartadosJuridicosContext.Provider>
  );
};
