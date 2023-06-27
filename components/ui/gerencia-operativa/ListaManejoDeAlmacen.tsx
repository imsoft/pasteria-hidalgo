import { FC } from "react";
import { ManejoDeAlmacen } from "../../../interfaces";
import { useRouter } from "next/router";

interface Props {
  manejoDeAlmacen: ManejoDeAlmacen;
}

const ListaManejosDeAlmacen: FC<Props> = ({ manejoDeAlmacen }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/gerencia-operativa/manejoDeAlmacen/${manejoDeAlmacen._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={manejoDeAlmacen._id}
        onClick={onClick}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {manejoDeAlmacen.materiaPrima}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {manejoDeAlmacen.unidades}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {manejoDeAlmacen.temperatura}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {manejoDeAlmacen.cantidad}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaManejosDeAlmacen;
