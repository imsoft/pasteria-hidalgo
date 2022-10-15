import { FC } from "react";
import router from "next/router";
import { Mantenimiento } from "../../../interfaces";

interface Props {
  mantenimiento: Mantenimiento;
}

const ListaMantenimientos: FC<Props> = ({ mantenimiento }) => {
  const onClick = () => {
    router.push(`/gerencia-operativa/mantenimiento/${mantenimiento._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr key={mantenimiento._id} onClick={onClick} className="cursor-pointer hover:bg-yellow-100">
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{mantenimiento.nombreMaquina}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{mantenimiento.proveedor}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{mantenimiento.fechaDeGarantia}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{mantenimiento.fechaDeMantenimiento}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{mantenimiento.modificacionDeMantenimiento}</div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaMantenimientos;
