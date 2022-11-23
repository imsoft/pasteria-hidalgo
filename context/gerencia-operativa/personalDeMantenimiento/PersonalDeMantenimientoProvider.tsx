import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";
import {
  PersonalesDeMantenimientoContext,
  personalesDeMantenimientoReducer,
} from ".";
import { PersonalDeMantenimiento } from "../../../interfaces";

import Swal from "sweetalert2";

export interface PersonalesDeMantenimientoState {
  personalesDeMantenimiento: PersonalDeMantenimiento[];
}

const PersonalesDeMantenimiento_INITIAL_STATE: PersonalesDeMantenimientoState =
  {
    personalesDeMantenimiento: [],
  };

interface Props {
  children: ReactNode;
}

export const PersonalesDeMantenimientoProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    personalesDeMantenimientoReducer,
    PersonalesDeMantenimiento_INITIAL_STATE
  );

  const eliminarPersonalDeMantenimiento = async (
    personalDeMantenimiento: PersonalDeMantenimiento,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<PersonalDeMantenimiento>(
        `/personalesDeMantenimiento/${personalDeMantenimiento._id}`
      );

      dispatch({
        type: "[Personal De Mantenimiento] Eliminar-Personal De Mantenimiento",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Personal De Mantenimiento Eliminado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarNuevoPersonalDeMantenimiento = async (
    nombre: string,
    oficio: string,
    direccion: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<PersonalDeMantenimiento>(
        "/personalesDeMantenimiento",
        {
          nombre,
          oficio,
          direccion,
        }
      );
      dispatch({
        type: "[Personal De Mantenimiento] Agregar-Personal De Mantenimiento",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Personal De Mantenimiento Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarPersonalDeMantenimiento = async (
    { _id, nombre, oficio, direccion }: PersonalDeMantenimiento,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<PersonalDeMantenimiento>(
        `/personalesDeMantenimiento/${_id}`,
        {
          nombre,
          oficio,
          direccion,
        }
      );
      dispatch({
        type: "[Personal De Mantenimiento] Actualizar-Personal De Mantenimiento",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Personal De Mantenimiento Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshPersonalesDeMantenimiento = async () => {
    const { data } = await entriesApi.get<PersonalDeMantenimiento[]>(
      "/personalesDeMantenimiento"
    );
    console.log(data);
    dispatch({
      type: "[Personal De Mantenimiento] Refrescar-Datos",
      payload: data,
    });
  };

  useEffect(() => {
    refreshPersonalesDeMantenimiento();
  }, []);

  return (
    <PersonalesDeMantenimientoContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevoPersonalDeMantenimiento,
        actualizarPersonalDeMantenimiento,
        eliminarPersonalDeMantenimiento,
      }}
    >
      {children}
    </PersonalesDeMantenimientoContext.Provider>
  );
};
