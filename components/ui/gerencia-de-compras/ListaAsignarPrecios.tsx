import { FC } from "react";
import router from "next/router";
import { AsignarPrecio } from "../../../interfaces/asignarPrecio";

interface Props {
  asignarPrecio: AsignarPrecio;
}

const ListaAsignarPrecio: FC<Props> = ({ asignarPrecio }) => {
  const onClick = () => {
    router.push(`/gerencia-de-compras/asignarPrecios/${asignarPrecio._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={asignarPrecio._id}
        onClick={onClick}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {asignarPrecio.producto}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">$ {asignarPrecio.precioMaximo}</div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaAsignarPrecio;
