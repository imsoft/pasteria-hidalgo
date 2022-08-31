export interface Proveedores {
  idProveedor: string;
  nombre: string;
  direccion: string;
  telefono: string;
  horarioAtencion: string;
  productosQueSeCompran: string[];
  entregasADomicilio: boolean;
}
