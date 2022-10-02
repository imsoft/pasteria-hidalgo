import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import {
  AcondicionamientoDeSucursal,
  PuedeFacturar,
} from "../../../interfaces/acondicionamientoDeSucursal";
import { AcondicionamientoDeSucursalesContext } from "../../../context/gerencia-de-compras/acondicionamientoDeSucursales/AcondicionamientoDeSucursalesContext";
import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";
import { dbAcondicionamientoDeSucursal } from "../../../database";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const factura: PuedeFacturar[] = ["Si", "No"];

interface Props {
  acondicionamientoDeSucursal: AcondicionamientoDeSucursal;
}

export const AcondicionamientoDeSucursalPage: FC<Props> = ({
  acondicionamientoDeSucursal,
}) => {
  const router = useRouter();

  const {
    actualizarAcondicionamientoDeSucursal,
    eliminarAcondicionamientoDeSucursal,
  } = useContext(AcondicionamientoDeSucursalesContext);

  const [inputProducto, setInputProducto] = useState(
    acondicionamientoDeSucursal.producto
  );
  const [inputFechaDeCompra, setInputFechaDeCompra] = useState(
    acondicionamientoDeSucursal.fechaDeCompra
  );
  const [inputDescripcionDelProducto, setInputDescripcionDelProducto] =
    useState(acondicionamientoDeSucursal.descripcionDelProducto);
  const [inputPrecioDeCompra, setInputPrecioDeCompra] = useState(
    acondicionamientoDeSucursal.precioDeCompra
  );
  const [inputFechaEstimadaDeEntrega, setInputFechaEstimadaDeEntrega] =
    useState(acondicionamientoDeSucursal.fechaEstimadaDeEntrega);
  const [inputProveedor, setInputProveedor] = useState(
    acondicionamientoDeSucursal.proveedor
  );
  const [inputFactura, setInputFactura] = useState<PuedeFacturar>(
    acondicionamientoDeSucursal.factura
  );
  const [inputTotalAcomulado, setInputTotalAcomulado] = useState(
    acondicionamientoDeSucursal.totalAcomulado
  );

  const MySwal = withReactContent(Swal);

  const onInputValueChangedProducto = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputProducto(event.target.value);
  };

  const onInputValueChangedFechaDeCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeCompra(event.target.value);
  };

  const onInputValueChangedDescripcionDelProducto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDescripcionDelProducto(event.target.value);
  };

  const onInputValueChangedPrecioDeCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioDeCompra(event.target.value);
  };

  const onInputValueChangedFechaEstimadaDeEntrega = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaEstimadaDeEntrega(event.target.value);
  };

  const onInputValueChangedProveedor = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputProveedor(event.target.value);
  };

  const onInputValueChangedFactura = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputFactura(event.target.value as PuedeFacturar);
  };

  const onInputValueChangedTotalAcomulado = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputTotalAcomulado(event.target.value);
  };

  const onSave = () => {
    if (
      inputProducto.trim().length === 0 &&
      inputFechaDeCompra.trim().length === 0 &&
      inputDescripcionDelProducto.trim().length === 0 &&
      inputPrecioDeCompra.trim().length === 0 &&
      inputFechaEstimadaDeEntrega.trim().length === 0 &&
      inputProveedor.trim().length === 0 &&
      inputFactura.trim().length === 0 &&
      inputTotalAcomulado.trim().length === 0
    )
      return;

    MySwal.fire({
      title:
        "¿Quieres actualizar la información a este acondicionamiento de sucursal?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoAcondicionamientoDeSucursal: AcondicionamientoDeSucursal =
          {
            ...acondicionamientoDeSucursal,
            producto: inputProducto,
            fechaDeCompra: inputFechaDeCompra,
            descripcionDelProducto: inputDescripcionDelProducto,
            precioDeCompra: inputPrecioDeCompra,
            fechaEstimadaDeEntrega: inputFechaEstimadaDeEntrega,
            proveedor: inputProveedor,
            factura: inputFactura,
            totalAcomulado: inputTotalAcomulado,
          };

        actualizarAcondicionamientoDeSucursal(
          actualizadoAcondicionamientoDeSucursal,
          true
        );
        router.push(
          "/gerencia-de-compras/acondicionamientoDeSucursales/VerAcondicinamientoDeSucursal"
        );
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este acondicionamiento de sucursal?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarAcondicionamientoDeSucursal(acondicionamientoDeSucursal, true);
        router.push(
          "/gerencia-de-compras/acondicionamientoDeSucursales/VerAcondicinamientoDeSucursal"
        );
      }
    });
  };

  return (
    <SidebarLayoutGerenciaCompras>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Acondicionamiento de sucursales
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Productos
                </label>
                <select
                  id="TxtProductos"
                  name="TxtProductos"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onInputValueChangedProducto}
                  value={inputProducto}
                  //   onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona un producto...</option>
                  <option>Masa</option>
                  <option>Fresas</option>
                  <option>Leche</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de compra
                </label>
                <input
                  type="Date"
                  name="TxtFechaCompra"
                  id="TxtFechaCompra"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onInputValueChangedFechaDeCompra}
                  value={inputFechaDeCompra}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción del producto
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onInputValueChangedDescripcionDelProducto}
                  value={inputDescripcionDelProducto}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio de la compra
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    onChange={onInputValueChangedPrecioDeCompra}
                    value={inputPrecioDeCompra}
                    // onBlur={() => setTouched(true)}
                    placeholder="0.00"
                    aria-describedby="price-currency"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      MXN
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaEstimadaDeEntrega"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha estimada de entrega
                </label>
                <input
                  type="Date"
                  name="TxtFechaEstimadaDeEntrega"
                  id="TxtFechaEstimadaDeEntrega"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onInputValueChangedFechaEstimadaDeEntrega}
                  value={inputFechaEstimadaDeEntrega}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProveedor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Proveedor
                </label>
                <select
                  id="TxtProveedor"
                  name="TxtProveedor"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onInputValueChangedProveedor}
                  value={inputProveedor}
                  //   onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona un proveedor...</option>
                  <option>Juan</option>
                  <option>Pedro</option>
                  <option>Luis</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFactura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Factura
                </label>
                <select
                  id="TxtFactura"
                  name="TxtFactura"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onInputValueChangedFactura}
                  value={inputFactura}
                  //   onBlur={() => setTouched(true)}
                  defaultValue="Selecciona unq opción..."
                >
                  <option>Selecciona una opción...</option>
                  <option>Si</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTotalAcomulado"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total acomulado
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtTotalAcomulado"
                    id="TxtTotalAcomulado"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    onChange={onInputValueChangedTotalAcomulado}
                    value={inputTotalAcomulado}
                    // onBlur={() => setTouched(true)}
                    placeholder="0.00"
                    aria-describedby="price-currency"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      MXN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              className="mx-4 bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              onClick={onSave}
            >
              Actualizar
            </button>
            <button
              type="button"
              className="bg-red-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-600 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800"
              onClick={onDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayoutGerenciaCompras>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const acondicionamientoDeSucursal =
    await dbAcondicionamientoDeSucursal.getAcondicionamientoDeSucursalById(id);

  if (!acondicionamientoDeSucursal) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      acondicionamientoDeSucursal,
    },
  };
};

export default AcondicionamientoDeSucursalPage;
