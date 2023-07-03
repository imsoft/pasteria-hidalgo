import { TipoDeProducto } from '.';

export interface Menu {
    _id: string;
    saborDelPaste: string;
    precio: number;
    tipoDeProducto: TipoDeProducto;
}