export interface ReporteDeGanancia {
  _id: string;
  mes: string;
  anio: string;
  ventasSucursalIndividual: VentasSucursalIndividual[];
  totalVentas: number;
  totalCompras: number;
  balance: number;
}

export interface VentasSucursalIndividual {
  nombreSucursal: string;
  ventasSucursal: number;
}
