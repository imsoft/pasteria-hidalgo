import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../apis";
import { Mantenimiento } from "../../../interfaces";
import { MantenimientosContext } from "./MantenimientoContext";
import { mantenimientosReducer } from "./mantenimientoReducer";

import Swal from "sweetalert2";

export interface MantenimientosState {
  mantenimientos: Mantenimiento[];
}

const Mantenimientos_INITIAL_STATE: MantenimientosState = {
  mantenimientos: [],
};

interface Props {
  children: ReactNode;
}

export const MantenimientosProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    mantenimientosReducer,
    Mantenimientos_INITIAL_STATE
  );

  const eliminarMantenimiento = async (
    mantenimiento: Mantenimiento,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<Mantenimiento>(
        `/mantenimientos/${mantenimiento._id}`
      );

      dispatch({
        type: "[Mantenimiento] Eliminar-Mantenimiento",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Mantenimiento Eliminado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarNuevoMantenimiento = async (
    nombreMaquina: string,
    proveedor: string,
    fechaDeGarantia: string,
    fechaDeMantenimiento: string,
    modificacionDeMantenimiento: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<Mantenimiento>("/mantenimientos", {
        nombreMaquina,
        proveedor,
        fechaDeGarantia,
        fechaDeMantenimiento,
        modificacionDeMantenimiento,
      });
      dispatch({
        type: "[Mantenimiento] Agregar-Mantenimiento",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Mantenimiento Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarMantenimiento = async (
    {
      _id,
      nombreMaquina,
      proveedor,
      fechaDeGarantia,
      fechaDeMantenimiento,
      modificacionDeMantenimiento,
    }: Mantenimiento,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<Mantenimiento>(
        `/mantenimientos/${_id}`,
        {
          nombreMaquina,
          proveedor,
          fechaDeGarantia,
          fechaDeMantenimiento,
          modificacionDeMantenimiento,
        }
      );
      dispatch({
        type: "[Mantenimiento] Actualizar-Mantenimiento",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Mantenimiento Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshMantenimientos = async () => {
    const { data } = await entriesApi.get<Mantenimiento[]>("/mantenimientos");
    console.log(data);
    dispatch({ type: "[Mantenimiento] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshMantenimientos();
  }, []);

  return (
    <MantenimientosContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevoMantenimiento,
        actualizarMantenimiento,
        eliminarMantenimiento,
      }}
    >
      {children}
    </MantenimientosContext.Provider>
  );
};
