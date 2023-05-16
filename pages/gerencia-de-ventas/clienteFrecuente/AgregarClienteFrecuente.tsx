import { ChangeEvent, useContext, useMemo, useState } from "react";

import { SidebarLayoutGerenciaVentas } from "../../../components/layouts/gerencia-de-ventas/SidebarLayoutGerenciaVentas";
import { ClientesFrecuentesContext } from "../../../context/gerencia-de-ventas/clienteFrecuente";

import { useRouter } from "next/router";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";
import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type FormData = {
  nombre: string;
  correoElectronico: string;
  fechaDeNacimiento: string;
  puntosDeCompra: number;
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
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
        : !values.nombre
        ? {
            nombre: {
              type: "required",
              message: "El campo nombre es requerido.",
            },
          }
        : !values.correoElectronico
        ? {
            correoElectronico: {
              type: "required",
              message: "El campo correo electrónico es requerido.",
            },
          }
        : !emailRegex.test(values.correoElectronico)
        ? {
            correoElectronico: {
              type: "pattern",
              message: "Correo electrónico no valido.",
            },
          }
        : !values.fechaDeNacimiento
        ? {
            fechaDeNacimiento: {
              type: "required",
              message: "El campo fecha de nacimiento es requerido.",
            },
          }
        : !values.puntosDeCompra
        ? {
            puntosDeCompra: {
              type: "required",
              message: "El campo puntos de compra es requerido.",
            },
          }
        : {},
  };
};

export default function AgregarCandidato() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver });

  const { agregarClienteFrecuente } = useContext(ClientesFrecuentesContext);

  const { sucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const watchSucursalOFranquicia = watch("sucursalOFranquicia");

  const onSave = ({
    nombre,
    correoElectronico,
    fechaDeNacimiento,
    puntosDeCompra,
    sucursalOFranquicia,
    nombreSucursalOFranquicia,
  }: FormData) => {
    agregarClienteFrecuente(
      nombre,
      correoElectronico,
      fechaDeNacimiento,
      puntosDeCompra,
      sucursalOFranquicia,
      nombreSucursalOFranquicia,
      true
    );

    router.push("/gerencia-de-ventas/clienteFrecuente/VerClientesFrecuentes");
  };

  return (
    <SidebarLayoutGerenciaVentas>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Agregar Cliente Frecuente
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
                  htmlFor="TxtNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
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
                  htmlFor="TxtCorreoElectronico"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo electrónico
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="email"
                    id="TxtCorreoElectronico"
                    autoComplete="off"
                    className={`${
                      errors?.correoElectronico
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("correoElectronico")}
                  />
                  {errors?.correoElectronico &&
                    errors?.correoElectronico.type === "pattern" && (
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
                {errors?.correoElectronico && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.correoElectronico.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeNacimiento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de nacimiento
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    id="TxtFechaDeNacimiento"
                    autoComplete="off"
                    className={`${
                      errors?.fechaDeNacimiento
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("fechaDeNacimiento")}
                  />
                  {errors?.fechaDeNacimiento && (
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
                {errors?.fechaDeNacimiento && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.fechaDeNacimiento.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPuntosDeCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Puntos De Compra
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="TxtPuntosDeCompra"
                    autoComplete="off"
                    min="0"
                    value={0}
                    className={`${
                      errors?.puntosDeCompra
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("puntosDeCompra")}
                  />
                  {errors?.puntosDeCompra && (
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
                {errors?.puntosDeCompra && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.puntosDeCompra.message}
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
    </SidebarLayoutGerenciaVentas>
  );
}
