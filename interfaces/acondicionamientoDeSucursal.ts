import { YesNo } from ".";

export interface AcondicionamientoDeSucursal {
  _id: string;
  sucursalOFranquicia: string;
  sucursales?: string;
  franquicias?: string;
  producto: string;
  fechaDeCompra: string;
  descripcionDelProducto: string;
  fechaEstimadaDeEntrega: string;
  proveedor: string;
  factura: YesNo;
  precioDeCompra: number;
  cantidad: number;
  totalAcomulado: number;
}
