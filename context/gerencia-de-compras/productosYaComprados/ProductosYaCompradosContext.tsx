import { createContext } from "react";
import { ProductoYaComprado } from "../../../interfaces";

interface ContextProps {
  productosYaComprados: ProductoYaComprado[];

  //Métodos
  agregarNuevoProductoYaComprado: (
    fechaDeCompra: string,
    precioDeCompra: number,
    descripcionDelProducto: string,
    fechaDeEntrega: string,
    idProveedor: string,
    facura: boolean,
    totalAcomulado: number,
    showNotificacion?: boolean
  ) => void;

  actualizarProductoYaComprado: (
    productoYaComprado: ProductoYaComprado,
    showNotificacion?: boolean
  ) => void;

  eliminarProductoYaComprado: (
    productoYaComprado: ProductoYaComprado,
    showNotificacion?: boolean
  ) => void;
}

export const ProductosYaCompradosContext = createContext({} as ContextProps);
