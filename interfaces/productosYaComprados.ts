export interface ProductosYaComprados {
  fechaDeCompra: Date;
  precioDeCompra: number;
  descripcionDelProducto: string;
  fechaDeEntrega: Date;
  idProveedor: string;
  facura: boolean;
  totalAcomulado: number;
}
