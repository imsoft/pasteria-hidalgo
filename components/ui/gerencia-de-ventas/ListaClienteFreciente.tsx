import { FC } from "react";
import router from "next/router";
import { ClienteFrecuente } from '../../../interfaces';

interface Props {
  clienteFrecuente: ClienteFrecuente;
}

const ListaClientesFrecuentes: FC<Props> = ({ clienteFrecuente }) => {
  const onClick = () => {
    router.push(`/recursos-humanos/clienteFrecuente/${clienteFrecuente._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr key={clienteFrecuente._id} onClick={onClick} className="cursor-pointer hover:bg-yellow-100">
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{clienteFrecuente.nombre}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">{clienteFrecuente.correoElectronico}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {clienteFrecuente.fechaDeNacimiento}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaClientesFrecuentes;
