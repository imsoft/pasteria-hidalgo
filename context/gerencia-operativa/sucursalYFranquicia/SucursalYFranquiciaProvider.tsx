import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";
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
        timer: 1000,
      });
    }
  };

  const agregarSucursalYFranquicia = async (
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string,
    direccion: string,
    distancia: string,
    fechaDePago: string,
    montoDePago: string,
    cuentaBancaria: string,
    banco: string,
    nombreDelBeneficiario: string,
    rfc: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<SucursalYFranquicia>(
        "/sucursalesYFranquicias",
        {
          sucursalOFranquicia,
          nombreSucursalOFranquicia,
          direccion,
          distancia,
          fechaDePago,
          montoDePago,
          cuentaBancaria,
          banco,
          nombreDelBeneficiario,
          rfc,
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
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarSucursalYFranquicia = async (
    {
      _id,
      sucursalOFranquicia,
      nombreSucursalOFranquicia,
      direccion,
      distancia,
      fechaDePago,
      montoDePago,
      cuentaBancaria,
      banco,
      nombreDelBeneficiario,
      rfc,
    }: SucursalYFranquicia,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<SucursalYFranquicia>(
        `/sucursalesYFranquicias/${_id}`,
        {
          sucursalOFranquicia,
          nombreSucursalOFranquicia,
          direccion,
          distancia,
          fechaDePago,
          montoDePago,
          cuentaBancaria,
          banco,
          nombreDelBeneficiario,
          rfc,
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
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshSucursalesYFranquicias = async () => {
    const { data } = await entriesApi.get<SucursalYFranquicia[]>(
      "/sucursalesYFranquicias", {timeout: 10000}
    );
    // console.log(data);
    dispatch({
      type: "[Sucursal Y Franquicia] Refrescar-Datos",
      payload: data,
    });
  };

  // useEffect(() => {
  //   refreshSucursalesYFranquicias();
  // }, []);

  return (
    <SucursalesYFranquiciasContext.Provider
      value={{
        ...state,

        //Methods
        agregarSucursalYFranquicia,
        actualizarSucursalYFranquicia,
        eliminarSucursalYFranquicia,
        refreshSucursalesYFranquicias,
      }}
    >
      {children}
    </SucursalesYFranquiciasContext.Provider>
  );
};
