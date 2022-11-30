import { FC } from "react";
import router from "next/router";
import { MateriaPrima } from '../../../interfaces';

interface Props {
  materiaPrima: MateriaPrima;
}

const ListaMateriasPrimas: FC<Props> = ({ materiaPrima }) => {
  const onClick = () => {
    router.push(`/gerencia-operativa/materiaPrima/${materiaPrima._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={materiaPrima._id}
        onClick={onClick}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {materiaPrima.materiaPrima}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {materiaPrima.temperatura}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {materiaPrima.unidades}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaMateriasPrimas;
