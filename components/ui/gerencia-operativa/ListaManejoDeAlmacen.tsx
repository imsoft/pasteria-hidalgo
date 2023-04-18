import { FC, useEffect, useState } from "react";
import { ManejoDeAlmacen } from "../../../interfaces";

interface Props {
  manejoDeAlmacen: ManejoDeAlmacen;
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
            {manejoDeAlmacen.materiaPrima}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {manejoDeAlmacen.unidades}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {manejoDeAlmacen.temperatura}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {manejoDeAlmacen.cantidad}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaManejosDeAlmacen;
