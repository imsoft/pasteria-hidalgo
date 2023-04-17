import { FC } from "react";
import { ListaManejoDeAlmacen } from "../../../interfaces";

interface Props {
  manejoDeAlmacen: ListaManejoDeAlmacen;
}

const ListaManejosDeAlmacen: FC<Props> = ({ manejoDeAlmacen }) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={manejoDeAlmacen._id}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {manejoDeAlmacen.listaManejoDeAlmacen.map(
              (listadoManejoDeAlmacen) => listadoManejoDeAlmacen.materiaPrima
            )}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {manejoDeAlmacen.listaManejoDeAlmacen.map(
              (listadoManejoDeAlmacen) => listadoManejoDeAlmacen.unidades
            )}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {manejoDeAlmacen.listaManejoDeAlmacen.map(
              (listadoManejoDeAlmacen) => listadoManejoDeAlmacen.temperatura
            )}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {manejoDeAlmacen.listaManejoDeAlmacen.map(
              (listadoManejoDeAlmacen) => listadoManejoDeAlmacen.cantidad
            )}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaManejosDeAlmacen;
