import React, { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { CheckInPersonalContext } from "../../../context/recursos-humanos/checkInPersonal";
import { PersonalActivoContext } from "../../../context/recursos-humanos/personalActivo/PersonalActivoContext";

import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";

import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";
import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { cambiarFormatoFecha } from "../../../utils";

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

type FormData = {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  nombre: string;
  fecha: string;
  horaDeIngreso: string;
  horaDeSalida: string;
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
        : values.nombre === "Seleccione una opción..."
        ? {
            nombre: {
              type: "required",
              message: "El campo nombre es requerido.",
            },
          }
        : !values.fecha
        ? {
            fecha: {
              type: "required",
              message: "El campo fecha es requerido.",
            },
          }
        : !values.horaDeIngreso
        ? {
            horaDeIngreso: {
              type: "required",
              message: "El campo hora de ingreso es requerido.",
            },
          }
        : !values.horaDeSalida
        ? {
            horaDeSalida: {
              type: "required",
              message: "El campo hora de salida es requerido.",
            },
          }
        : {},
  };
};

export default function CheckInDePersonal() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver });

  const { agregarCheckInPersonal } = useContext(CheckInPersonalContext);

  const { sucursalesYFranquicias, refreshSucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const { personasActivas, refreshPersonalActivo } = useContext(PersonalActivoContext);
  const personasActivasMemo = useMemo(() => personasActivas, [personasActivas]);

  const watchSucursalOFranquicia = watch("sucursalOFranquicia");

  useEffect(() => {
    refreshPersonalActivo();
    refreshSucursalesYFranquicias();
  }, []);

  const onSave = ({
    sucursalOFranquicia,
    nombreSucursalOFranquicia,
    nombre,
    fecha,
    horaDeIngreso,
    horaDeSalida,
  }: FormData) => {
    agregarCheckInPersonal(
      sucursalOFranquicia,
      nombreSucursalOFranquicia,
      nombre,
      fecha,
      horaDeIngreso,
      horaDeSalida,
      true
    );

    router.push("/recursos-humanos/checkInPersonal/VerCheckInPersonal");
  };

  return (
    <SidebarLayoutRecursosHumanos>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Check In De Personal
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
                    {personasActivasMemo.map((personaActiva) => (
                      <option key={personaActiva._id}>
                        {personaActiva.nombre}
                      </option>
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
                  htmlFor="TxtFecha"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtFecha"
                    autoComplete="off"
                    value={cambiarFormatoFecha(hoy.toLocaleDateString())}
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

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHoraDeIngreso"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hora De Ingreso
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtHoraDeIngreso"
                    autoComplete="off"
                    value={hoy.toLocaleTimeString()}
                    className={`${
                      errors?.horaDeIngreso
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("horaDeIngreso")}
                  />
                  {errors?.horaDeIngreso && (
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
                {errors?.horaDeIngreso && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.horaDeIngreso.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHoraDeSalida"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hora De Salida
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtHoraDeSalida"
                    autoComplete="off"
                    value={'00:00:00'}
                    className={`${
                      errors?.horaDeSalida
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("horaDeSalida")}
                    readOnly
                  />
                  {errors?.horaDeSalida && (
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
                {errors?.horaDeSalida && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.horaDeSalida.message}
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
