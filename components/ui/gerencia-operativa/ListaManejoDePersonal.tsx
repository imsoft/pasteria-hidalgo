import { FC } from "react";
import router from "next/router";
import { ManejoPersonal } from "../../../interfaces";

interface Props {
  manejoDePersonal: ManejoPersonal;
}

const ListaManejosDePersonal: FC<Props> = ({ manejoDePersonal }) => {
  const onClick = () => {
    router.push(`/recursos-humanos/manejoDePersonal/${manejoDePersonal._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr key={manejoDePersonal._id} onClick={onClick} className="cursor-pointer hover:bg-yellow-100">
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{manejoDePersonal.nombre}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">{manejoDePersonal.descripcionDelPuesto}</div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaManejosDePersonal;
