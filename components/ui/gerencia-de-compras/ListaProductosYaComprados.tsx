import { FC } from "react";
import router from "next/router";
import { ProductoYaComprado } from "../../../interfaces"

interface Props {
  productoYaComprado: ProductoYaComprado;
}

const ListaProductosYaComprados: FC<Props> = ({ productoYaComprado }) => {
  const onClick = () => {
    router.push(`/recursos-humanos/productoYaComprado/${productoYaComprado._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr key={productoYaComprado._id} onClick={onClick} className="cursor-pointer hover:bg-yellow-100">
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{productoYaComprado.fechaDeCompra}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">{productoYaComprado.precioDeCompra}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {productoYaComprado.descripcionDelProducto}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{productoYaComprado.fechaDeEntrega}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{productoYaComprado.idProveedor}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{productoYaComprado.facura}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {productoYaComprado.totalAcomulado}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaProductosYaComprados;
