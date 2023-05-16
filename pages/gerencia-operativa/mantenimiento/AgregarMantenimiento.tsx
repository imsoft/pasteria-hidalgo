import { ChangeEvent, useContext, useMemo, useState } from "react";

import { MantenimientosContext } from "../../../context/gerencia-operativa/mantenimiento/MantenimientoContext";
import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import { useRouter } from "next/router";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";
import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

type FormData = {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  nombreMaquina: string;
  proveedor: string;
  fechaDeGarantia: string;
  fechaDeMantenimiento: string;
  modificacionDeMantenimiento: string;
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
        : !values.nombreMaquina
        ? {
            nombreMaquina: {
              type: "required",
              message: "El campo nombre maquina es requerido.",
            },
          }
        : !values.proveedor
        ? {
            proveedor: {
              type: "required",
              message: "El campo proveedor es requerido.",
            },
          }
        : !values.fechaDeGarantia
        ? {
            fechaDeGarantia: {
              type: "required",
              message: "El campo fecha de garantia es requerido.",
            },
          }
        : !values.fechaDeMantenimiento
        ? {
            fechaDeMantenimiento: {
              type: "required",
              message: "El campo fecha de mantenimiento es requerido.",
            },
          }
        : !values.modificacionDeMantenimiento
        ? {
            modificacionDeMantenimiento: {
              type: "required",
              message: "El campo modificacion de mantenimiento es requerido.",
            },
          }
        : {},
  };
};

export default function AgregarMantenimiento() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver });

  const { agregarNuevoMantenimiento } = useContext(MantenimientosContext);
  const { sucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const watchSucursalOFranquicia = watch("sucursalOFranquicia");

  const onSave = ({
    sucursalOFranquicia,
    nombreSucursalOFranquicia,
    nombreMaquina,
    proveedor,
    fechaDeGarantia,
    fechaDeMantenimiento,
    modificacionDeMantenimiento,
  }: FormData) => {
    agregarNuevoMantenimiento(
      sucursalOFranquicia,
      nombreSucursalOFranquicia,
      nombreMaquina,
      proveedor,
      fechaDeGarantia,
      fechaDeMantenimiento,
      modificacionDeMantenimiento,
      true
    );

    router.push("/gerencia-operativa/mantenimiento/VerMantenimiento");
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Mantenimiento
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
                  htmlFor="TxtNombreMaquina"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Maquina
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtNombreMaquina"
                    autoComplete="off"
                    className={`${
                      errors?.nombreMaquina
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("nombreMaquina")}
                  />
                  {errors?.nombreMaquina && (
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
                {errors?.nombreMaquina && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.nombreMaquina.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProveedor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Proveedor
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtProveedor"
                    autoComplete="off"
                    className={`${
                      errors?.proveedor
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("proveedor")}
                  />
                  {errors?.proveedor && (
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
                  htmlFor="TxtFechaDeGarantia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha De Garantía
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    id="TxtFechaDeGarantia"
                    autoComplete="off"
                    className={`${
                      errors?.fechaDeGarantia
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("fechaDeGarantia")}
                  />
                  {errors?.fechaDeGarantia && (
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
                {errors?.fechaDeGarantia && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.fechaDeGarantia.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeMantenimiento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha De Mantenimiento
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    id="TxtFechaDeMantenimiento"
                    autoComplete="off"
                    className={`${
                      errors?.fechaDeMantenimiento
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("fechaDeMantenimiento")}
                  />
                  {errors?.fechaDeMantenimiento && (
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
                {errors?.fechaDeMantenimiento && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.fechaDeMantenimiento.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtModificacionDeMantenimiento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modificación De Mantenimiento
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtModificacionDeMantenimiento"
                    autoComplete="off"
                    className={`${
                      errors?.modificacionDeMantenimiento
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("modificacionDeMantenimiento")}
                  />
                  {errors?.modificacionDeMantenimiento && (
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
                {errors?.modificacionDeMantenimiento && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.modificacionDeMantenimiento.message}
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
    </SidebarLayoutGerenciaOperativa>
  );
}
