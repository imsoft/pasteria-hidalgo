import { ChangeEvent, useContext, useState } from "react";
import { useRouter } from "next/router";

import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

import { ProveedoresContext } from "../../../context/gerencia-de-compras/manejoDeProveedores/ManejoDeProveedoresContext";

import { YesNo } from "../../../interfaces";
import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const validYesNoOptions: YesNo[] = ["Si", "No"];

type FormData = {
  nombre: string;
  direccion: string;
  telefono: string;
  horarioDeApertura: string;
  horarioDeCierre: string;
  productosQueSeCompran: string;
  entregasADomicilio: string;
  rfc: string;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values,
    errors: !values.nombre
      ? {
          nombre: {
            type: "required",
            message: "El campo nombre es requerido.",
          },
        }
      : !values.direccion
      ? {
          direccion: {
            type: "required",
            message: "El campo dirección es requerido.",
          },
        }
      : !values.telefono
      ? {
          telefono: {
            type: "required",
            message: "El campo teléfono es requerido.",
          },
        }
      : !values.horarioDeApertura
      ? {
          horarioDeApertura: {
            type: "required",
            message: "El campo horario de apertura es requerido.",
          },
        }
      : !values.horarioDeCierre
      ? {
          horarioDeCierre: {
            type: "required",
            message: "El campo horario de cierre es requerido.",
          },
        }
      : !values.productosQueSeCompran
      ? {
          productosQueSeCompran: {
            type: "required",
            message: "El campo productos que se compran es requerido.",
          },
        }
      : values.entregasADomicilio === "Seleccione una opción..."
      ? {
          entregasADomicilio: {
            type: "required",
            message: "El campo entregas a domicilio es requerido.",
          },
        }
      : !values.rfc
      ? {
          rfc: {
            type: "required",
            message: "El campo rfc es requerido.",
          },
        }
      : {},
  };
};

export default function ManejoDeProveedores() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver });

  const { agregarNuevoProveedor } = useContext(ProveedoresContext);

  const onSave = ({
    nombre,
    direccion,
    telefono,
    horarioDeApertura,
    horarioDeCierre,
    productosQueSeCompran,
    entregasADomicilio,
    rfc,
  }: FormData) => {
    agregarNuevoProveedor(
      nombre,
      direccion,
      telefono,
      horarioDeApertura,
      horarioDeCierre,
      productosQueSeCompran,
      entregasADomicilio,
      rfc,
      true
    );

    router.push("/gerencia-de-compras/proveedores/VerProveedores");
  };

  return (
    <SidebarLayoutGerenciaCompras>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Proveedores
              </h3>
              {/* <p className="mt-1 text-sm text-gray-500">¡Hola!</p> */}
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre(s)
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtNombre"
                    autoComplete="off"
                    className={`${
                      errors?.nombre
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("nombre")}
                  />
                  {errors?.nombre && (
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
                {errors?.nombre && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.nombre.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDireccion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtDireccion"
                    autoComplete="off"
                    className={`${
                      errors?.direccion
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("direccion")}
                  />
                  {errors?.direccion && (
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
                {errors?.direccion && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.direccion.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTelefono"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtTelefono"
                    autoComplete="off"
                    className={`${
                      errors?.telefono
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("telefono")}
                  />
                  {errors?.telefono && (
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
                {errors?.telefono && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.telefono.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHorarioDeApertura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horario de apertura
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="time"
                    id="TxtHorarioDeApertura"
                    autoComplete="off"
                    className={`${
                      errors?.horarioDeApertura
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("horarioDeApertura")}
                  />
                  {errors?.horarioDeApertura && (
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
                {errors?.horarioDeApertura && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.horarioDeApertura.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHorarioDeCierre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horario de cierre
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="time"
                    id="TxtHorarioDeCierre"
                    autoComplete="off"
                    className={`${
                      errors?.horarioDeCierre
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("horarioDeCierre")}
                  />
                  {errors?.horarioDeCierre && (
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
                {errors?.horarioDeCierre && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.horarioDeCierre.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTiposDeProductosQueSeCompran"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipos de productos que se compran
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtTiposDeProductosQueSeCompran"
                    autoComplete="off"
                    className={`${
                      errors?.productosQueSeCompran
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("productosQueSeCompran")}
                  />
                  {errors?.productosQueSeCompran && (
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
                {errors?.productosQueSeCompran && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.productosQueSeCompran.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbEntregaADomicilio"
                  className="block text-sm font-medium text-gray-700"
                >
                  ¿Entrega a domicilio?
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbEntregaADomicilio"
                    className={`${
                      errors?.entregasADomicilio
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Seleccione un producto..."
                    {...register("entregasADomicilio")}
                  >
                    <option hidden>Seleccione una opción...</option>
                    {validYesNoOptions.map((yesNoOptions) => (
                      <option key={yesNoOptions}>{yesNoOptions}</option>
                    ))}
                  </select>

                  {errors?.entregasADomicilio && (
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
                {errors?.entregasADomicilio && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.entregasADomicilio.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtRfc"
                  className="block text-sm font-medium text-gray-700"
                >
                  RFC
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtRfc"
                    autoComplete="off"
                    className={`${
                      errors?.rfc
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("rfc")}
                  />
                  {errors?.rfc && (
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
                {errors?.rfc && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.rfc.message}
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
