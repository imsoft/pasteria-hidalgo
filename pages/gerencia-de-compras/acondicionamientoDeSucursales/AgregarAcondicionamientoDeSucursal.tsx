import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";

import { AcondicionamientoDeSucursalesContext } from "../../../context/gerencia-de-compras/acondicionamientoDeSucursales/AcondicionamientoDeSucursalesContext";
import { ProveedoresContext } from "../../../context/gerencia-de-compras/manejoDeProveedores/ManejoDeProveedoresContext";

import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

import { YesNo } from "../../../interfaces";

import { useRouter } from "next/router";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";
import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const validYesNoOptions: YesNo[] = ["Si", "No"];

type FormData = {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  producto: string;
  fechaDeCompra: string;
  descripcionDelProducto: string;
  fechaEstimadaDeEntrega: string;
  proveedor: string;
  factura: YesNo;
  precioDeCompra: number;
  cantidad: number;
  totalAcomulado: number;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values,
    errors:
      values.sucursalOFranquicia === "Seleccione una opción..."
        ? {
            sucursalOFranquicia: {
              type: "required",
              message: "El campo sucursal o franquicia es requerido.",
            },
          }
        : values.nombreSucursalOFranquicia ===
            "Seleccione primero seleccione si es franquicia o sucursal..." ||
          values.nombreSucursalOFranquicia === "Seleccione Sucursal..." ||
          values.nombreSucursalOFranquicia === "Seleccione Franquicia..."
        ? {
            nombreSucursalOFranquicia: {
              type: "required",
              message: "El campo nombre sucursal o franquicia es requerido.",
            },
          }
        : !values.producto
        ? {
            producto: {
              type: "required",
              message: "El campo producto es requerido.",
            },
          }
        : !values.fechaDeCompra
        ? {
            fechaDeCompra: {
              type: "required",
              message: "El campo fecha de compra es requerido.",
            },
          }
        : !values.descripcionDelProducto
        ? {
            descripcionDelProducto: {
              type: "required",
              message: "El campo descripcion del producto es requerido.",
            },
          }
        : !values.fechaEstimadaDeEntrega
        ? {
            fechaEstimadaDeEntrega: {
              type: "required",
              message: "El campo fecha estimada de entrega es requerido.",
            },
          }
        : values.proveedor === "Seleccione una opción..."
        ? {
            proveedor: {
              type: "required",
              message: "El campo proveedor es requerido.",
            },
          }
        : values.factura === "Seleccione una opción..."
        ? {
            factura: {
              type: "required",
              message: "El campo factura es requerido.",
            },
          }
        : !values.precioDeCompra
        ? {
            precioDeCompra: {
              type: "required",
              message: "El campo precio de compra es requerido.",
            },
          }
        : !values.cantidad
        ? {
            cantidad: {
              type: "required",
              message: "El campo cantidad es requerido.",
            },
          }
        : !values.totalAcomulado
        ? {
            totalAcomulado: {
              type: "required",
              message: "El campo total acomulado es requerido.",
            },
          }
        : {},
  };
};

export default function AcondicionamientoDeSucursales() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({ resolver });

  const [inputTotalAcomulado, setInputTotalAcomulado] = useState(0);

  const { sucursalesYFranquicias, refreshSucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const { agregarNuevoAcondicionamientoDeSucursal } = useContext(
    AcondicionamientoDeSucursalesContext
  );

  const { proveedores, refreshProveedores } = useContext(ProveedoresContext);
  const proveedoresMemo = useMemo(() => proveedores, [proveedores]);

  const watchSucursalOFranquicia = watch("sucursalOFranquicia");
  const watchCantidad = watch("cantidad");
  const watchPrecioDeCompra = watch("precioDeCompra");

  const precioTotalDelProducto = () => {
    setValue("totalAcomulado", watchCantidad * watchPrecioDeCompra);
  };

  useEffect(() => {
    refreshSucursalesYFranquicias();
    refreshProveedores();
  }, []);

  useEffect(() => {
    precioTotalDelProducto();
  }, [watchCantidad, watchPrecioDeCompra]);

  const onSave = ({
    sucursalOFranquicia,
    nombreSucursalOFranquicia,
    producto,
    fechaDeCompra,
    descripcionDelProducto,
    fechaEstimadaDeEntrega,
    proveedor,
    factura,
    precioDeCompra,
    cantidad,
    totalAcomulado,
  }: FormData) => {
    agregarNuevoAcondicionamientoDeSucursal(
      sucursalOFranquicia,
      nombreSucursalOFranquicia,
      producto,
      fechaDeCompra,
      descripcionDelProducto,
      fechaEstimadaDeEntrega,
      proveedor,
      factura,
      precioDeCompra,
      cantidad,
      totalAcomulado,
      true
    );

    router.push(
      "/gerencia-de-compras/acondicionamientoDeSucursales/VerAcondicinamientoDeSucursal"
    );
  };

  return (
    <SidebarLayoutGerenciaCompras>
      <form onSubmit={handleSubmit(onSave)}>
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
                  htmlFor="CmbSucursalOFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  ¿Sucursal o Franquicia?
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbSucursalOFranquicia"
                    className={`${
                      errors?.sucursalOFranquicia
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Selecciona un producto..."
                    {...register("sucursalOFranquicia")}
                  >
                    <option value={"Seleccione una opción..."} hidden>
                      Seleccione una opción...
                    </option>
                    <option value={"Sucursal"}>Sucursal</option>
                    <option value={"Franquicia"}>Franquicia</option>
                  </select>

                  {errors?.sucursalOFranquicia && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-9">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.sucursalOFranquicia && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.sucursalOFranquicia.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbNombreSucursalOFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  {watchSucursalOFranquicia === "Sucursal"
                    ? "Sucursal"
                    : watchSucursalOFranquicia === "Franquicia"
                    ? "Franquicia"
                    : "Primero seleccione si es franquicia o sucursal"}
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbNombreSucursalOFranquicia"
                    className={`${
                      errors?.nombreSucursalOFranquicia
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Selecciona un producto..."
                    {...register("nombreSucursalOFranquicia")}
                  >
                    <option hidden>
                      Seleccione{" "}
                      {watchSucursalOFranquicia === "Sucursal"
                        ? "Sucursal"
                        : watchSucursalOFranquicia === "Franquicia"
                        ? "Franquicia"
                        : "primero seleccione si es franquicia o sucursal"}
                      ...
                    </option>
                    {sucursalesYFranquiciasMemo
                      .filter(
                        (sucursalesYFranquicias) =>
                          sucursalesYFranquicias.sucursalOFranquicia ===
                          watchSucursalOFranquicia
                      )
                      .map((sucursalesYFranquicias) => (
                        <option
                          key={sucursalesYFranquicias.nombreSucursalOFranquicia}
                        >
                          {sucursalesYFranquicias.nombreSucursalOFranquicia}
                        </option>
                      ))}
                  </select>

                  {errors?.nombreSucursalOFranquicia && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-9">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.nombreSucursalOFranquicia && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.nombreSucursalOFranquicia.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Productos
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtProductos"
                    autoComplete="off"
                    className={`${
                      errors?.producto
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("producto")}
                  />
                  {errors?.producto && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.producto && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.producto.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de compra
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    id="TxtFechaDeCompra"
                    autoComplete="off"
                    className={`${
                      errors?.fechaDeCompra
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("fechaDeCompra")}
                  />
                  {errors?.fechaDeCompra && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.fechaDeCompra && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.fechaDeCompra.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="TxtDescripcionDelProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción del producto
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtDescripcionDelProducto"
                    autoComplete="off"
                    className={`${
                      errors?.descripcionDelProducto
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("descripcionDelProducto")}
                  />
                  {errors?.descripcionDelProducto && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.descripcionDelProducto && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.descripcionDelProducto.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaEstimadaDeEntrega"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha estimada de entrega
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    id="TxtFechaEstimadaDeEntrega"
                    autoComplete="off"
                    className={`${
                      errors?.fechaEstimadaDeEntrega
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("fechaEstimadaDeEntrega")}
                  />
                  {errors?.fechaEstimadaDeEntrega && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.fechaEstimadaDeEntrega && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.fechaEstimadaDeEntrega.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbProveedor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Proveedor
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbProveedor"
                    className={`${
                      errors?.proveedor
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Seleccione una opción..."
                    {...register("proveedor")}
                  >
                    <option hidden>Seleccione una opción...</option>
                    {proveedoresMemo.map((proveedor) => (
                      <option key={proveedor._id}> {proveedor.nombre} </option>
                    ))}
                  </select>

                  {errors?.proveedor && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-9">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.proveedor && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.proveedor.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFactura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Factura
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="TxtFactura"
                    className={`${
                      errors?.factura
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Seleccione una opción..."
                    {...register("factura")}
                  >
                    <option hidden>Seleccione una opción...</option>
                    {validYesNoOptions.map((yesNoOptions) => (
                      <option key={yesNoOptions}>{yesNoOptions}</option>
                    ))}
                  </select>

                  {errors?.factura && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-9">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.factura && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.factura.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioDeLaCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio de la compra
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtPrecioDeLaCompra"
                    autoComplete="off"
                    className={`${
                      errors?.precioDeCompra
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("precioDeCompra")}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      MXN
                    </span>
                  </div>
                  {errors?.precioDeCompra && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-12">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.precioDeCompra && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.precioDeCompra.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCantidad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtCantidad"
                    autoComplete="off"
                    placeholder="0"
                    className={`${
                      errors?.cantidad
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("cantidad")}
                  />
                  {errors?.cantidad && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.cantidad && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.cantidad.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTotalAcomulado"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total acomulado
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtTotalAcomulado"
                    autoComplete="off"
                    // value={isNaN(inputTotalAcomulado) ? 0 : inputTotalAcomulado}
                    className={`${
                      errors?.totalAcomulado
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("totalAcomulado")}
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      MXN
                    </span>
                  </div>
                  {errors?.totalAcomulado && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.totalAcomulado && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.totalAcomulado.message}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayoutGerenciaCompras>
  );
}
