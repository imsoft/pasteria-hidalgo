import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";
import {
  AcondicionamientoDeSucursalesContext,
  acondicionamientoDeSucursalesReducer,
} from ".";
import { AcondicionamientoDeSucursal } from "../../../interfaces";

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
        timer: 1000,
      });
    }
  };

  const agregarNuevoAcondicionamientoDeSucursal = async (
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string,
    producto: string,
    fechaDeCompra: string,
    descripcionDelProducto: string,
    fechaEstimadaDeEntrega: string,
    proveedor: string,
    factura: string,
    precioDeCompra: number,
    cantidad: number,
    totalAcomulado: number,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<AcondicionamientoDeSucursal>(
        "/acondicionamientoDeSucursales",
        {
          sucursalOFranquicia,
          nombreSucursalOFranquicia,
          producto,
          fechaDeCompra,
          descripcionDelProducto,
          fechaEstimadaDeEntrega,
          proveedor,
          factura,
          precioDeCompra,
          cantidad,
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
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarAcondicionamientoDeSucursal = async (
    {
      _id,
      sucursalOFranquicia,
      nombreSucursalOFranquicia,
      producto,
      fechaDeCompra,
      descripcionDelProducto,
      fechaEstimadaDeEntrega,
      proveedor,
      factura,
      precioDeCompra,
      cantidad,
      totalAcomulado,
    }: AcondicionamientoDeSucursal,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<AcondicionamientoDeSucursal>(
        `/acondicionamientoDeSucursales/${_id}`,
        {
          sucursalOFranquicia,
          nombreSucursalOFranquicia,
          producto,
          fechaDeCompra,
          descripcionDelProducto,
          fechaEstimadaDeEntrega,
          proveedor,
          factura,
          precioDeCompra,
          cantidad,
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
          timer: 1000,
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
