import { FC } from "react";
import router from "next/router";
import { PersonalDeMantenimiento } from "../../../interfaces";

interface Props {
  personalDeMantenimiento: PersonalDeMantenimiento;
}

const ListaPersonalesDeMantenimiento: FC<Props> = ({
  personalDeMantenimiento,
}) => {
  const onClick = () => {
    router.push(
      `/gerencia-operativa/personalMantenimiento/${personalDeMantenimiento._id}`
    );
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={personalDeMantenimiento._id}
        onClick={onClick}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {personalDeMantenimiento.nombre}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">{personalDeMantenimiento.oficio}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">
            {personalDeMantenimiento.direccion}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">
            {personalDeMantenimiento.telefono}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaPersonalesDeMantenimiento;
