import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";
import { CheckInPersonal } from "../../../interfaces";
import { CheckInPersonalContext, checksInPersonalReducer } from ".";

import Swal from "sweetalert2";

export interface ChecksInPersonalState {
  checksInPersonal: CheckInPersonal[];
}

const ChecksInPersonal_INITIAL_STATE: ChecksInPersonalState = {
  checksInPersonal: [],
};

interface Props {
  children: ReactNode;
}

export const ChecksInPersonalProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    checksInPersonalReducer,
    ChecksInPersonal_INITIAL_STATE
  );

  const eliminarCheckInPersonal = async (
    checkInPersonal: CheckInPersonal,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<CheckInPersonal>(
        `/checksInPersonal/${checkInPersonal._id}`
      );

      dispatch({
        type: "[Check In Personal] Eliminar-Checks In Personal",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Check In Personal Eliminado",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const agregarCheckInPersonal = async (
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string,
    nombre: string,
    fecha: string,
    horaDeIngreso: string,
    horaDeSalida: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<CheckInPersonal>(
        "/checksInPersonal",
        {
          sucursalOFranquicia,
          nombreSucursalOFranquicia,
          nombre,
          fecha,
          horaDeIngreso,
          horaDeSalida,
        }
      );
      dispatch({
        type: "[Check In Personal] Agregar-Check In Personal",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Check In Personal Agregado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarCheckInPersonal = async (
    {
      _id,
      sucursalOFranquicia,
      nombreSucursalOFranquicia,
      nombre,
      fecha,
      horaDeIngreso,
      horaDeSalida,
    }: CheckInPersonal,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<CheckInPersonal>(
        `/checksInPersonal/${_id}`,
        {
          sucursalOFranquicia,
          nombreSucursalOFranquicia,
          nombre,
          fecha,
          horaDeIngreso,
          horaDeSalida,
        }
      );
      dispatch({
        type: "[Check In Personal] Actualizar-Check In Personal",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Candidato Actualizado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshCandidatos = async () => {
    const { data } = await entriesApi.get<CheckInPersonal[]>(
      "/checksInPersonal"
    );
    // console.log(data);
    dispatch({ type: "[Check In Personal] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshCandidatos();
  }, []);

  return (
    <CheckInPersonalContext.Provider
      value={{
        ...state,

        //Methods
        agregarCheckInPersonal,
        actualizarCheckInPersonal,
        eliminarCheckInPersonal,
      }}
    >
      {children}
    </CheckInPersonalContext.Provider>
  );
};
