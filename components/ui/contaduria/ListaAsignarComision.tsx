import React, { FC } from "react";
import { AsignarComision } from "../../../interfaces";

interface Props {
  asignarComision: AsignarComision;
}

const ListaAsignarComision: FC<Props> = ({ asignarComision }) => {
  return (
    <>
      <tbody className="divide-y divide-gray-200 bg-white">
        <tr
          key={asignarComision._id}
          className="cursor-pointer hover:bg-yellow-100"
        >
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {asignarComision.sucursalOFranquicia}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {asignarComision.franquicias || '-'}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              {asignarComision.sucursales || '-'}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              $ {asignarComision.minimoDeLaMeta}
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              $ 0
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="font-medium text-gray-900">
              Lo logro
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default ListaAsignarComision;
