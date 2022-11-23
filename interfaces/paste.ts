import { TipoDeProducto } from '.';

export interface Paste {
    _id: string;
    saborDelPaste: string;
    precio: number;
    tipoDeProducto: TipoDeProducto;
}