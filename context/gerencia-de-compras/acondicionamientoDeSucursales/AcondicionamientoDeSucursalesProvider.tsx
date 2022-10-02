import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../apis";
import { AcondicionamientoDeSucursal } from "../../../interfaces";
import {
  AcondicionamientoDeSucursalesContext,
  acondicionamientoDeSucursalesReducer,
} from ".";

import Swal from "sweetalert2";

export interface AcondicionamientoDeSucursalesState {
  acondicionamientoDeSucursales: AcondicionamientoDeSucursal[];
}

const AcondicionamientoDeSucursales_INITIAL_STATE: AcondicionamientoDeSucursalesState =
  {
    acondicionamientoDeSucursales: [],
  };

interface Props {
  children: ReactNode;
}

export const AcondicionamientoDeSucursalesProvider: FC<Props> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    acondicionamientoDeSucursalesReducer,
    AcondicionamientoDeSucursales_INITIAL_STATE
  );

  const eliminarAcondicionamientoDeSucursal = async (
    acondicionamientoDeSucursal: AcondicionamientoDeSucursal,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<AcondicionamientoDeSucursal>(
        `/acondicionamientoDeSucursales/${acondicionamientoDeSucursal._id}`
      );

      dispatch({
        type: "[Acondicionamiento De Sucursales] Eliminar-Acondicionamiento De Sucursal",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Acondicionamiento De Sucursal Eliminado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarNuevoAcondicionamientoDeSucursal = async (
    producto: string,
    fechaDeCompra: string,
    descripcionDelProducto: string,
    precioDeCompra: string,
    fechaEstimadaDeEntrega: string,
    proveedor: string,
    factura: string,
    totalAcomulado: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<AcondicionamientoDeSucursal>(
        "/acondicionamientoDeSucursales",
        {
          producto,
          fechaDeCompra,
          descripcionDelProducto,
          precioDeCompra,
          fechaEstimadaDeEntrega,
          proveedor,
          factura,
          totalAcomulado,
        }
      );
      dispatch({
        type: "[Acondicionamiento De Sucursales] Agregar-Acondicionamiento De Sucursal",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Acondicionamiento De Sucursal Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarAcondicionamientoDeSucursal = async (
    {
      _id,
      producto,
      fechaDeCompra,
      descripcionDelProducto,
      precioDeCompra,
      fechaEstimadaDeEntrega,
      proveedor,
      factura,
      totalAcomulado,
    }: AcondicionamientoDeSucursal,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<AcondicionamientoDeSucursal>(
        `/acondicionamientoDeSucursales/${_id}`,
        {
          producto,
          fechaDeCompra,
          descripcionDelProducto,
          precioDeCompra,
          fechaEstimadaDeEntrega,
          proveedor,
          factura,
          totalAcomulado,
        }
      );
      dispatch({
        type: "[Acondicionamiento De Sucursales] Actualizar-Acondicionamiento De Sucursal",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Acondicionamiento De Sucursal Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshAcondicionamientoDeSucursales = async () => {
    const { data } = await entriesApi.get<AcondicionamientoDeSucursal[]>(
      "/acondicionamientoDeSucursales"
    );
    console.log(data);
    dispatch({
      type: "[Acondicionamiento De Sucursales] Refrescar-Datos",
      payload: data,
    });
  };

  useEffect(() => {
    refreshAcondicionamientoDeSucursales();
  }, []);

  return (
    <AcondicionamientoDeSucursalesContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevoAcondicionamientoDeSucursal,
        eliminarAcondicionamientoDeSucursal,
        actualizarAcondicionamientoDeSucursal,
      }}
    >
      {children}
    </AcondicionamientoDeSucursalesContext.Provider>
  );
};
