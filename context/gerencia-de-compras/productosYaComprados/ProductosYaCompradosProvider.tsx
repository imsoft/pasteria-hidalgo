import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../api";
import { ProductosYaCompradosContext, productosYaCompradosReducer } from ".";
import { ProductoYaComprado } from "../../../interfaces";

import Swal from "sweetalert2";

export interface ProductosYaCompradosState {
  productosYaComprados: ProductoYaComprado[];
}

const ProductosYaComprados_INITIAL_STATE: ProductosYaCompradosState = {
  productosYaComprados: [],
};

interface Props {
  children: ReactNode;
}

export const ProductosYaCompradosProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    productosYaCompradosReducer,
    ProductosYaComprados_INITIAL_STATE
  );

  const eliminarProductoYaComprado = async (
    productoYaComprado: ProductoYaComprado,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<ProductoYaComprado>(
        `/productosYaComprados/${productoYaComprado._id}`
      );

      dispatch({
        type: "[Producto Ya Comprado] Eliminar-Producto Ya Comprado",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto Ya Comprado Eliminado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarNuevoProductoYaComprado = async (
    fechaDeCompra: string,
    precioDeCompra: number,
    descripcionDelProducto: string,
    fechaDeEntrega: string,
    idProveedor: string,
    facura: boolean,
    totalAcomulado: number,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ProductoYaComprado>(
        "/productosYaComprados",
        {
          fechaDeCompra,
          precioDeCompra,
          descripcionDelProducto,
          fechaDeEntrega,
          idProveedor,
          facura,
          totalAcomulado,
        }
      );
      dispatch({
        type: "[Producto Ya Comprado] Agregar-Producto Ya Comprado",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Producto Ya Comprado Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarProductoYaComprado = async (
    {
      _id,
      fechaDeCompra,
      precioDeCompra,
      descripcionDelProducto,
      fechaDeEntrega,
      idProveedor,
      facura,
      totalAcomulado,
    }: ProductoYaComprado,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ProductoYaComprado>(
        `/productoYaComprado/${_id}`,
        {
          fechaDeCompra,
          precioDeCompra,
          descripcionDelProducto,
          fechaDeEntrega,
          idProveedor,
          facura,
          totalAcomulado,
        }
      );
      dispatch({
        type: "[Producto Ya Comprado] Actualizar-Producto Ya Comprado",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Producto Ya Comprado Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshProductosYaComprados = async () => {
    const { data } = await entriesApi.get<ProductoYaComprado[]>(
      "/productosYaComprados"
    );
    console.log(data);
    dispatch({ type: "[Producto Ya Comprado] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshProductosYaComprados();
  }, []);

  return (
    <ProductosYaCompradosContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevoProductoYaComprado,
        actualizarProductoYaComprado,
        eliminarProductoYaComprado,
      }}
    >
      {children}
    </ProductosYaCompradosContext.Provider>
  );
};
