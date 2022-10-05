import { FC } from "react";
import router from "next/router";
import { PersonalActivo } from '../../../interfaces';

interface Props {
  personalActivo: PersonalActivo;
}

const ListaPersonalesActivos: FC<Props> = ({ personalActivo }) => {
  const onClick = () => {
    router.push(`/recursos-humanos/personalActivo/${personalActivo._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr key={personalActivo._id} onClick={onClick} className="cursor-pointer hover:bg-yellow-100">
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{personalActivo.nombre}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">{personalActivo.puesto}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {personalActivo.fechaDeContratacion}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{personalActivo.noContrato}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{personalActivo.noExpediente}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{personalActivo.bajaTemporal}</div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaPersonalesActivos;
