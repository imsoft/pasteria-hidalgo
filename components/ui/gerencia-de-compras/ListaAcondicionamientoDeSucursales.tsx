import { FC } from "react";
import router from "next/router";
import { AcondicionamientoDeSucursal } from "../../../interfaces";

interface Props {
  acondicionamientoDeSucursal: AcondicionamientoDeSucursal;
}

const ListaAcondicionamientoDeSucursales: FC<Props> = ({
  acondicionamientoDeSucursal,
}) => {
  const onClick = () => {
    router.push(
      `/gerencia-de-compras/acondicionamientoDeSucursales/${acondicionamientoDeSucursal._id}`
    );
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr
        key={acondicionamientoDeSucursal._id}
        onClick={onClick}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {acondicionamientoDeSucursal.sucursalOFranquicia}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {acondicionamientoDeSucursal.sucursales || '-'}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {acondicionamientoDeSucursal.franquicias || '-'}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {acondicionamientoDeSucursal.producto}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="text-gray-900">
            {acondicionamientoDeSucursal.fechaDeCompra}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {acondicionamientoDeSucursal.descripcionDelProducto}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {acondicionamientoDeSucursal.fechaEstimadaDeEntrega}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {acondicionamientoDeSucursal.proveedor}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {acondicionamientoDeSucursal.factura}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {acondicionamientoDeSucursal.precioDeCompra}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {acondicionamientoDeSucursal.cantidad}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="font-medium text-gray-900">
            {acondicionamientoDeSucursal.totalAcomulado}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ListaAcondicionamientoDeSucursales;
