import { FC } from "react";
import router from "next/router";
import { ClienteFrecuente } from "../../../interfaces";

interface Props {
  clienteFrecuente: ClienteFrecuente;
}

const ListaClientesFrecuentes: FC<Props> = ({ clienteFrecuente }) => {
  const onClick = () => {
    router.push(`/gerencia-de-ventas/clienteFrecuente/${clienteFrecuente._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={clienteFrecuente._id}
        onClick={onClick}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {clienteFrecuente.nombre}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">
            {clienteFrecuente.correoElectronico}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {clienteFrecuente.fechaDeNacimiento}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className={`font-medium ${ clienteFrecuente.puntosDeCompra >= 25 ? 'text-green-500' : 'text-gray-900' }`}>
            {clienteFrecuente.puntosDeCompra}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {clienteFrecuente.sucursal || "-"}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {clienteFrecuente.franquicia || "-"}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaClientesFrecuentes;
