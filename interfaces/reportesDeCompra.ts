export interface ReporteDeCompra {
  idReporteDeCompra: string;
  codigoDeReporte: string;
  fechaDeCompra: Date;
  credito: boolean;
  fechaDePago: Date;
  idMateriaPrima: string;
  materiaPrima: string[];
  cantidad: number;
  unidades: string;
  idProveedor: string;
  nombreProveedor: string;
  precioPorUnidad: number;
  precioTotalDelProducto: number;
  precioTotalDelCompra: number;
  tempetatura: number;
  caducidad: Date;
  factura: boolean;
}
