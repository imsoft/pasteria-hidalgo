import { FC } from "react";
import router from "next/router";
import { Proveedor } from "../../../interfaces";
import { phoneNumberFormat } from "../../../utils";

interface Props {
  proveedor: Proveedor;
}

const ListaProveedores: FC<Props> = ({ proveedor }) => {
  const onClick = () => {
    router.push(`/gerencia-de-compras/proveedores/${proveedor._id}`);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={proveedor._id}
        onClick={onClick}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{proveedor.nombre}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">{proveedor.direccion}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {phoneNumberFormat(proveedor.telefono)}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {proveedor.horarioDeApertura}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {proveedor.horarioDeCierre}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {proveedor.productosQueSeCompran}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {proveedor.entregasADomicilio}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">{proveedor.rfc}</div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaProveedores;
