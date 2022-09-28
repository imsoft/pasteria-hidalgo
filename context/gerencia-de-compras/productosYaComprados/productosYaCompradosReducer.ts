import { ProductoYaComprado } from "../../../interfaces";
import { ProductosYaCompradosState } from "./ProductosYaCompradosProvider";

type ProductosYaCompradosActionType =
  | { type: "[Producto Ya Comprado] Agregar-Producto Ya Comprado"; payload: ProductoYaComprado }
  | { type: "[Producto Ya Comprado] Actualizar-Producto Ya Comprado"; payload: ProductoYaComprado }
  | { type: "[Producto Ya Comprado] Refrescar-Datos"; payload: ProductoYaComprado[] }
  | { type: "[Producto Ya Comprado] Eliminar-Producto Ya Comprado"; payload: ProductoYaComprado };

export const productosYaCompradosReducer = (
  state: ProductosYaCompradosState,
  action: ProductosYaCompradosActionType
): ProductosYaCompradosState => {
  switch (action.type) {
    case "[Producto Ya Comprado] Agregar-Producto Ya Comprado":
      return {
        ...state,
        productosYaComprados: [...state.productosYaComprados, action.payload],
      };

    case "[Producto Ya Comprado] Actualizar-Producto Ya Comprado":
      return {
        ...state,
        productosYaComprados: state.productosYaComprados.map((productoYaComprado) => {
          if (productoYaComprado._id === action.payload._id) {
            productoYaComprado.fechaDeCompra = action.payload.fechaDeCompra;
            productoYaComprado.precioDeCompra = action.payload.precioDeCompra;
            productoYaComprado.descripcionDelProducto = action.payload.descripcionDelProducto;
            productoYaComprado.fechaDeEntrega = action.payload.fechaDeEntrega;
            productoYaComprado.idProveedor = action.payload.idProveedor;
            productoYaComprado.facura = action.payload.facura;
            productoYaComprado.totalAcomulado = action.payload.totalAcomulado;
          }
          return productoYaComprado;
        }),
      };

    case "[Producto Ya Comprado] Refrescar-Datos":
      return {
        ...state,
        productosYaComprados: [...action.payload],
      };

    case "[Producto Ya Comprado] Eliminar-Producto Ya Comprado":
      return {
        ...state,
        productosYaComprados: state.productosYaComprados.filter(
          (productoYaComprado) => productoYaComprado._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
