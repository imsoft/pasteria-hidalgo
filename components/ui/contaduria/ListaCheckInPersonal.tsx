import { FC } from "react";
import router from "next/router";
import { CheckInPersonal } from "../../../interfaces";

interface Props {
  checkInPersonal: CheckInPersonal;
}

const ListaChecksInPersonal: FC<Props> = ({ checkInPersonal }) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={checkInPersonal._id}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {checkInPersonal.sucursalOFranquicia}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {checkInPersonal.nombreSucursalOFranquicia || "-"}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {checkInPersonal.nombre}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {checkInPersonal.fecha}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {checkInPersonal.horaDeIngreso}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {checkInPersonal.horaDeSalida}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaChecksInPersonal;
