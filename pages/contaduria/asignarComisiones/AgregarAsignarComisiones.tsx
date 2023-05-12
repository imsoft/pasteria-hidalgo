import { ChangeEvent, useContext, useMemo, useState } from "react";
import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";
import { useRouter } from "next/router";

import { AsignarComisionContext } from "../../../context/contaduria/asignarComision/AsignarComisionContext";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";
import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

type FormData = {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  mes: string;
  anio: string;
  minimoDeLaMeta: number;
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
        : values.mes === "Seleccione una opción..."
        ? {
            mes: {
              type: "required",
              message: "El campo mes es requerido.",
            },
          }
        : !values.anio
        ? {
            anio: {
              type: "required",
              message: "El campo año es requerido.",
            },
          }
        : !values.minimoDeLaMeta
        ? {
            minimoDeLaMeta: {
              type: "required",
              message: "El campo minimo de la meta es requerido.",
            },
          }
        : {},
  };
};

const mesesDelAno: string[] = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const today = new Date();
const currentYear = today.getFullYear();

export default function AgregarAsignarComisiones() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver });

  const { agregarNuevoAsignarComision } = useContext(AsignarComisionContext);

  const { sucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const watchSucursalOFranquicia = watch("sucursalOFranquicia");

  const onSave = ({
    sucursalOFranquicia,
    nombreSucursalOFranquicia,
    mes,
    anio,
    minimoDeLaMeta,
  }: FormData) => {
    agregarNuevoAsignarComision(
      sucursalOFranquicia,
      nombreSucursalOFranquicia,
      mes,
      anio,
      minimoDeLaMeta,
      true
    );

    router.push("/contaduria/asignarComisiones/VerAsignarComisiones");
  };

  return (
    <SidebarLayoutContaduria>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Asignar comisiones
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
                  htmlFor="CmbMes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mes
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbMes"
                    className={`${
                      errors?.mes
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Selecciona un producto..."
                    {...register("mes")}
                  >
                    <option hidden>Seleccione una opción...</option>
                  {mesesDelAno.map((mes) => (
                    <option key={mes}>{mes}</option>
                  ))}
                  </select>

                  {errors?.mes && (
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
                {errors?.mes && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.mes.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtAnio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Año
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtAnio"
                    autoComplete="off"
                    value={currentYear.toString()}
                    className={`${
                      errors?.anio
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("anio")}
                  />
                  {errors?.anio && (
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
                {errors?.anio && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.anio.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtMinimoDeLaMeta"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mínimo de la meta
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtMinimoDeLaMeta"
                    autoComplete="off"
                    className={`${
                      errors?.minimoDeLaMeta
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("minimoDeLaMeta")}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      MXN
                    </span>
                  </div>
                  {errors?.minimoDeLaMeta && (
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
                {errors?.minimoDeLaMeta && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.minimoDeLaMeta.message}
                    </p>
                  </>
                )}
              </div>


            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type='submit'
              className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayoutContaduria>
  );
}
