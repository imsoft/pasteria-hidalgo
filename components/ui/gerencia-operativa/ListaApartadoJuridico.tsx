import { FC } from "react";
import router from "next/router";
import { ApartadoJuridico } from "../../../interfaces";

interface Props {
  apartadoJuridico: ApartadoJuridico;
}

const ListaApartadosJuridicos: FC<Props> = ({ apartadoJuridico }) => {
  const onClick = () => {
    router.push(`/gerencia-operativa/apartadoJuridico/${apartadoJuridico._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr key={apartadoJuridico._id} onClick={onClick} className="cursor-pointer hover:bg-yellow-100">

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{apartadoJuridico.sucursalOFranquicia}</div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {apartadoJuridico.sucursales || '-'}
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{apartadoJuridico.franquicias || '-'}</div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{apartadoJuridico.documento}</div>
        </td>
        
      </tr>
    </tbody>
  );
};

export default ListaApartadosJuridicos;
