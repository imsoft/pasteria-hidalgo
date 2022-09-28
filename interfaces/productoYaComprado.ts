export interface ProductoYaComprado {
  _id: string;
  fechaDeCompra: string;
  precioDeCompra: number;
  descripcionDelProducto: string;
  fechaDeEntrega: string;
  idProveedor: string;
  facura: boolean;
  totalAcomulado: number;
}
