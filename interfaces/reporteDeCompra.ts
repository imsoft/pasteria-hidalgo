export interface ReporteDeCompra {
  _id: string;
  idReporteDeCompra: string;
  codigoDeReporte: string;
  fechaDeCompra: string;
  credito: string;
  fechaDePago: string;
  idMateriaPrima: string;
  materiaPrima: string;
  cantidad: number;
  unidades: string;
  idProveedor: string;
  nombreProveedor: string;
  precioPorUnidad: number;
  precioTotalDelProducto: number;
  precioTotalDelCompra: number;
  tempetatura: number;
  caducidad: string;
  factura: boolean;
}
