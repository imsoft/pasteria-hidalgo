import { TipoDeProducto } from '.';

export interface ListadoDeProductos {
  idProducto: string;
  tipoDeProducto: TipoDeProducto;
  saborProducto: string;
  cantidad: number;
  precioProducto: number;
  monto: number;
}