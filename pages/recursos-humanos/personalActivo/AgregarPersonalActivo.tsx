import { ChangeEvent, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { PersonalActivoContext } from "../../../context/recursos-humanos/personalActivo/PersonalActivoContext";
import { CandidatosContext } from "../../../context/recursos-humanos/candidatos";

import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";

import { PuestosEmpresa } from "../../../interfaces";
import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const puestosValidos: PuestosEmpresa[] = ["Administrador", "Chef", "Operador"];

type FormData = {
  nombre: string;
  puesto: PuestosEmpresa;
  fechaDeContratacion: string;
  noContrato: string;
  noExpediente: string;
  bajaTemporal: string;
  comentarios: string;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values,
    errors:
      values.nombre === "Seleccione una opción..."
        ? {
            nombre: {
              type: "required",
              message: "El campo nombre es requerido.",
            },
          }
        : values.puesto === "Seleccione una opción..."
        ? {
            puesto: {
              type: "required",
              message: "El campo puesto es requerido.",
            },
          }
        : !values.fechaDeContratacion
        ? {
            fechaDeContratacion: {
              type: "required",
              message: "El campo fecha de contratación es requerido.",
            },
          }
        : !values.noContrato
        ? {
            noContrato: {
              type: "required",
              message: "El campo No contrato es requerido.",
            },
          }
        : !values.noExpediente
        ? {
            noExpediente: {
              type: "required",
              message: "El campo No expediente es requerido.",
            },
          }
        : values.bajaTemporal !== "No"
        ? {
            bajaTemporal: {
              type: "required",
              message: "El campo baja temporal es requerido.",
            },
          }
        : !values.comentarios
        ? {
            comentarios: {
              type: "required",
              message: "El campo comentarios es requerido.",
            },
          }
        : {},
  };
};

export default function AgregarPersonalActivo() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver });

  const { agregarPersonalActivo } = useContext(PersonalActivoContext);

  const { candidatos } = useContext(CandidatosContext);
  const candidatosMemo = useMemo(() => candidatos, [candidatos]);

  const watchNombre = watch("nombre");

  const onSave = ({
    nombre,
    puesto,
    fechaDeContratacion,
    noContrato,
    noExpediente,
    bajaTemporal,
    comentarios,
  }: FormData) => {
    agregarPersonalActivo(
      nombre,
      puesto,
      fechaDeContratacion,
      noContrato,
      noExpediente,
      bajaTemporal,
      comentarios,
      true
    );

    router.push("/recursos-humanos/personalActivo/VerPersonalActivo");
  };

  return (
    <SidebarLayoutRecursosHumanos>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Activo
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbNombre"
                    className={`${
                      errors?.nombre
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Seleccione una opción..."
                    {...register("nombre")}
                  >
                    <option hidden>Seleccione una opción...</option>
                    {candidatosMemo.map((candidato) => (
                      <option key={candidato._id}> {candidato.nombre} </option>
                    ))}
                  </select>

                  {errors?.nombre && (
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
                  htmlFor="CmbPuesto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Puesto
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbPuesto"
                    className={`${
                      errors?.puesto
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Seleccione una opción..."
                    {...register("puesto")}
                  >
                    <option hidden>Seleccione una opción...</option>
                    {candidatosMemo
                      .filter((candidato) => candidato.nombre === watchNombre)
                      .map((candidato) => (
                        <option key={candidato.puesto}>
                          {candidato.puesto}
                        </option>
                      ))}
                  </select>

                  {errors?.puesto && (
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
                {errors?.puesto && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.puesto.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeContratacion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de contratación
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    id="TxtFechaDeContratacion"
                    autoComplete="off"
                    className={`${
                      errors?.fechaDeContratacion
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("fechaDeContratacion")}
                  />
                  {errors?.fechaDeContratacion && (
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
                {errors?.fechaDeContratacion && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.fechaDeContratacion.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNoDeContrato"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. De Contrato
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtNoDeContrato"
                    autoComplete="off"
                    className={`${
                      errors?.noContrato
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("noContrato")}
                  />
                  {errors?.noContrato && (
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
                {errors?.noContrato && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.noContrato.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNoExpediente"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. Expediente
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtNoExpediente"
                    autoComplete="off"
                    className={`${
                      errors?.noExpediente
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("noExpediente")}
                  />
                  {errors?.noExpediente && (
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
                {errors?.noExpediente && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.noExpediente.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbBajaTemporal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Baja Temporal
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbBajaTemporal"
                    className={`${
                      errors?.bajaTemporal
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Seleccione una opción..."
                    {...register("bajaTemporal")}
                  >
                    <option>No</option>
                  </select>

                  {errors?.bajaTemporal && (
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
                {errors?.bajaTemporal && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.bajaTemporal.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtComentarios"
                  className="block text-sm font-medium text-gray-700"
                >
                  Comentarios
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtComentarios"
                    autoComplete="off"
                    className={`${
                      errors?.comentarios
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("comentarios")}
                  />
                  {errors?.comentarios && (
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
                {errors?.comentarios && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.comentarios.message}
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
    </SidebarLayoutRecursosHumanos>
  );
}
