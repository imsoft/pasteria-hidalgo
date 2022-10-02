export interface AcondicionamientoDeSucursal {
  _id: string;
  producto: string;
  fechaDeCompra: string;
  descripcionDelProducto: string;
  precioDeCompra: string;
  fechaEstimadaDeEntrega: string;
  proveedor: string;
  factura: PuedeFacturar;
  totalAcomulado: string;
}

export type PuedeFacturar = "Si" | "No";
