import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../apis";
import { Proveedor } from "../../../interfaces";
import { ProveedoresContext, proveedoresReducer } from ".";

import Swal from "sweetalert2";

export interface ProveedoresState {
  proveedores: Proveedor[];
}

const Proveedores_INITIAL_STATE: ProveedoresState = {
  proveedores: [],
};

interface Props {
  children: ReactNode;
}

export const ProveedoresProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    proveedoresReducer,
    Proveedores_INITIAL_STATE
  );

  const eliminarProveedor = async (
    proveedor: Proveedor,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<Proveedor>(
        `/proveedores/${proveedor._id}`
      );

      dispatch({
        type: "[Proveedor] Eliminar-Proveedor",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Proveedor Eliminado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarNuevoProveedor = async (
    nombre: string,
    direccion: string,
    telefono: string,
    horarioDeApertura: string,
    horarioDeCierre: string,
    productosQueSeCompran: string,
    entregasADomicilio: string,
    rfc: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<Proveedor>("/proveedores", {
        nombre,
        direccion,
        telefono,
        horarioDeApertura,
        horarioDeCierre,
        productosQueSeCompran,
        entregasADomicilio,
        rfc,
      });
      dispatch({ type: "[Proveedor] Agregar-Proveedor", payload: data });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Proveedor Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarProveedor = async (
    {
      _id,
      nombre,
      direccion,
      telefono,
      horarioDeApertura,
      horarioDeCierre,
      productosQueSeCompran,
      entregasADomicilio,
      rfc,
    }: Proveedor,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<Proveedor>(`/proveedores/${_id}`, {
        nombre,
        direccion,
        telefono,
        horarioDeApertura,
        horarioDeCierre,
        productosQueSeCompran,
        entregasADomicilio,
        rfc,
      });
      dispatch({ type: "[Proveedor] Actualizar-Proveedor", payload: data });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Proveedor Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshProveedores = async () => {
    const { data } = await entriesApi.get<Proveedor[]>("/proveedores");
    console.log(data);
    dispatch({ type: "[Proveedor] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshProveedores();
  }, []);

  return (
    <ProveedoresContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevoProveedor,
        actualizarProveedor,
        eliminarProveedor,
      }}
    >
      {children}
    </ProveedoresContext.Provider>
  );
};
