import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";
import { ClientesFrecuentesContext, clientesFrecuentesReducer } from ".";
import { ClienteFrecuente } from "../../../interfaces";

import Swal from "sweetalert2";

export interface ClientesFrecuentesState {
  clientesFrecuentes: ClienteFrecuente[];
}

const ClientesFrecuentes_INITIAL_STATE: ClientesFrecuentesState = {
  clientesFrecuentes: [],
};

interface Props {
  children: ReactNode;
}

export const ClientesFrecuentesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    clientesFrecuentesReducer,
    ClientesFrecuentes_INITIAL_STATE
  );

  const eliminarClienteFrecuente = async (
    clienteFrecuente: ClienteFrecuente,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<ClienteFrecuente>(
        `/clientesFrecuentes/${clienteFrecuente._id}`
      );

      dispatch({
        type: "[Cliente Frecuente] Eliminar-Cliente Frecuente",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente Frecuente Eliminado",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const agregarClienteFrecuente = async (
    nombre: string,
    correoElectronico: string,
    fechaDeNacimiento: string,
    puntosDeCompra: number,
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ClienteFrecuente>(
        "/clientesFrecuentes",
        {
          nombre,
          correoElectronico,
          fechaDeNacimiento,
          puntosDeCompra,
          sucursalOFranquicia,
          nombreSucursalOFranquicia,
        }
      );
      dispatch({
        type: "[Cliente Frecuente] Agregar-Cliente Frecuente",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cliente Frecuente Agregado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarClienteFrecuente = async (
    {
      _id,
      nombre,
      correoElectronico,
      fechaDeNacimiento,
      puntosDeCompra,
      sucursalOFranquicia,
      nombreSucursalOFranquicia,
    }: ClienteFrecuente,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ClienteFrecuente>(
        `/clientesFrecuentes/${_id}`,
        {
          nombre,
          correoElectronico,
          fechaDeNacimiento,
          puntosDeCompra,
          sucursalOFranquicia,
          nombreSucursalOFranquicia,
        }
      );
      dispatch({
        type: "[Cliente Frecuente] Actualizar-Cliente Frecuente",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cliente Frecuente Actualizado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshClientesFrecuentes = async () => {
    const { data } = await entriesApi.get<ClienteFrecuente[]>(
      "/clientesFrecuentes"
    );
    console.log(data);
    dispatch({ type: "[Cliente Frecuente] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshClientesFrecuentes();
  }, []);

  return (
    <ClientesFrecuentesContext.Provider
      value={{
        ...state,

        //Methods
        eliminarClienteFrecuente,
        agregarClienteFrecuente,
        actualizarClienteFrecuente,
      }}
    >
      {children}
    </ClientesFrecuentesContext.Provider>
  );
};
