import React, { useContext } from "react";

import { SidebarLayout } from "../../components/layouts/SidebarLayout";
import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { PersonalesDeMantenimientoContext } from "../../context/gerencia-operativa/personalDeMantenimiento";
import { useRouter } from "next/router";

type FormData = {
  nombre: string;
  oficio: string;
  direccion: string;
  telefono: string;
  sucursalOFranquicia: string;
  fecha: string;
};

// Esto es una prueba

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
      : !values.oficio
      ? {
          oficio: {
            type: "required",
            message: "El campo oficio es requerido.",
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
            message: "El campo télefono es requerido.",
          },
        }
      : values.sucursalOFranquicia === "Seleccione una opción..."
      ? {
          sucursalOFranquicia: {
            type: "required",
            message: "El campo sucursal o franquicia es requerido.",
          },
        }
      : !values.fecha
      ? {
          fecha: {
            type: "required",
            message: "El campo fecha es requerido.",
          },
        }
      : {},
  };
};

const Pruebas = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({ resolver });

  const { agregarNuevoPersonalDeMantenimiento } = useContext(
    PersonalesDeMantenimientoContext
  );

  const onSave = ({
    nombre,
    oficio,
    direccion,
    telefono,
    sucursalOFranquicia,
    fecha,
  }: FormData) => {
    console.log(
      nombre,
      oficio,
      direccion,
      telefono,
      sucursalOFranquicia,
      fecha
    );

    agregarNuevoPersonalDeMantenimiento(
      nombre,
      oficio,
      direccion,
      telefono,
      true
    );

    router.push(
      "/gerencia-operativa/personalMantenimiento/VerPersonalMantenimiento"
    );
  };

  return (
    <SidebarLayout>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Pruebas de useForm
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
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
                  htmlFor="TxtOficio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Oficio
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtOficio"
                    autoComplete="off"
                    className={`${
                      errors?.oficio
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("oficio")}
                  />
                  {errors?.oficio && (
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
                {errors?.oficio && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.oficio.message}
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
                  htmlFor="TxtNumeroDeTelefono"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número de Télefono
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="TxtNumeroDeTelefono"
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
                  htmlFor="TxtFechaDeCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Compra
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    id="TxtFechaDeCompra"
                    className={`${
                      errors?.fecha
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("fecha")}
                  />
                  {errors?.fecha && (
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
                {errors?.fecha && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.fecha.message}
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
              // onClick={onSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayout>
  );
};

export default Pruebas;
