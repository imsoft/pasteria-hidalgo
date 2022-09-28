import { FC } from "react";
import router from "next/router";
import { SucursalYFranquicia } from "../../../interfaces";

interface Props {
  sucursalYFranquicia: SucursalYFranquicia;
}

const ListaSucursalesYFranquicias: FC<Props> = ({ sucursalYFranquicia }) => {
  const onClick = () => {
    router.push(`/recursos-humanos/sucursalYFranquicia/${sucursalYFranquicia._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr key={sucursalYFranquicia._id} onClick={onClick} className="cursor-pointer hover:bg-yellow-100">
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{sucursalYFranquicia.direccion}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">{sucursalYFranquicia.distancia}</div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaSucursalesYFranquicias;
