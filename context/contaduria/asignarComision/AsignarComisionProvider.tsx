import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";

import Swal from "sweetalert2";
import { AsignarComision } from "../../../interfaces";
import { AsignarComisionContext, asignarComisionesReducer } from ".";

export interface AsignarComisionesState {
  asignarComisiones: AsignarComision[];
}

const AsignarComision_INITIAL_STATE: AsignarComisionesState = {
  asignarComisiones: [],
};

interface Props {
  children: ReactNode;
}

export const AsignarComisionProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    asignarComisionesReducer,
    AsignarComision_INITIAL_STATE
  );

  const eliminarAsignarComision = async (
    asignarComision: AsignarComision,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<AsignarComision>(
        `/asignarComisiones/${asignarComision._id}`
      );

      dispatch({
        type: "[Asignar Comision] Eliminar-Asignar Comision",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Asignar Comision Eliminado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarNuevoAsignarComision = async (
    sucursalOFranquicia: string,
    mes: string,
    anio: string,
    minimoDeLaMeta: number,
    sucursales?: string,
    franquicias?: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<AsignarComision>(
        "/asignarComisiones",
        {
          sucursalOFranquicia,
          mes,
          anio,
          minimoDeLaMeta,
          sucursales,
          franquicias,
        }
      );
      dispatch({
        type: "[Asignar Comision] Agregar-Asignar Comision",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Asignar Comision Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarAsignarComision = async (
    {
      _id,
      sucursalOFranquicia,
      mes,
      anio,
      minimoDeLaMeta,
      sucursales,
      franquicias,
    }: AsignarComision,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<AsignarComision>(
        `/asignarComisiones/${_id}`,
        {
          sucursalOFranquicia,
          mes,
          anio,
          minimoDeLaMeta,
          sucursales,
          franquicias,
        }
      );
      dispatch({
        type: "[Asignar Comision] Actualizar-Asignar Comision",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Asignar Comision Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshCandidatos = async () => {
    const { data } = await entriesApi.get<AsignarComision[]>(
      "/asignarComisiones"
    );
    console.log(data);
    dispatch({ type: "[Asignar Comision] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshCandidatos();
  }, []);

  return (
    <AsignarComisionContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevoAsignarComision,
        actualizarAsignarComision,
        eliminarAsignarComision,
      }}
    >
      {children}
    </AsignarComisionContext.Provider>
  );
};
