import { FC, ReactNode, useEffect, useReducer } from "react";
import { entriesApi } from "../../../apis";
import { PersonalActivo } from "../../../interfaces";
import { PersonalActivoContext, personalActivoReducer } from ".";
import Swal from "sweetalert2";

export interface PersonalActivoState {
  personasActivas: PersonalActivo[];
}

const PersonalActivo_INITIAL_STATE: PersonalActivoState = {
  personasActivas: [],
};

interface Props {
  children: ReactNode;
}

export const PersonalActivoProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    personalActivoReducer,
    PersonalActivo_INITIAL_STATE
  );

  const eliminarPersonalActivo = async (
    personalActivo: PersonalActivo,
    showNotification = false
  ) => {
    try {
      const { data } = await entriesApi.delete<PersonalActivo>(
        `/personalActivo/${personalActivo._id}`
      );
      dispatch({
        type: "[Personal Activo] Eliminar-Personal Activo",
        payload: data,
      });

      if (showNotification) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Personal Activo Eliminado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const agregarPersonalActivo = async (
    nombre: string,
    puesto: string,
    fechaDeContratacion: string,
    noContrato: string,
    noExpediente: string,
    showNotification = false
  ) => {
    try {
      const { data } = await entriesApi.post<PersonalActivo>(
        "/personalActivo",
        {
          nombre,
          puesto,
          fechaDeContratacion,
          noContrato,
          noExpediente,
        }
      );
      dispatch({
        type: "[Personal Activo] Agregar-Personal Activo",
        payload: data,
      });

      if (showNotification) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Candidato Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarPersonalActivo = async (
    {
      _id,
      nombre,
      puesto,
      fechaDeContratacion,
      noContrato,
      noExpediente,
    }: PersonalActivo,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<PersonalActivo>(
        `/personalActivo/${_id}`,
        {
          nombre,
          puesto,
          fechaDeContratacion,
          noContrato,
          noExpediente,
        }
      );
      dispatch({
        type: "[Personal Activo] Actualizar-Personal Activo",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Personal Activo Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshCandidatos = async () => {
    const { data } = await entriesApi.get<PersonalActivo[]>("/personalActivo");
    console.log(data);
    dispatch({ type: "[Personal Activo] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshCandidatos();
  }, []);

  return (
    <PersonalActivoContext.Provider
        value={{
            ...state,

            //Methods
            agregarPersonalActivo,
            actualizarPersonalActivo,
            eliminarPersonalActivo,
        }}
    >
        {children}
    </PersonalActivoContext.Provider>
  );

};
