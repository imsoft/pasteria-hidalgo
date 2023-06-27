import { ChangeEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import { MateriasPrimasContext } from "../../../context/gerencia-operativa/materiaPrima/MateriaPrimaContext";
import { Temperatura, Unidades } from "../../../interfaces";
import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";
import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const validTemperature: Temperatura[] = [
  "Ambiente",
  "Refrigerado",
  "Congelado",
];

const validUnits: Unidades[] = [
  "Gramos",
  "Kilogramos",
  "Mililitros",
  "Litros",
  "Por pieza",
];

type FormData = {
  materiaPrima: string;
  temperatura: Temperatura;
  unidades: Unidades;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values,
    errors: !values.materiaPrima
      ? {
          materiaPrima: {
            type: "required",
            message: "El campo materia prima es requerido.",
          },
        }
      : values.temperatura === "Seleccione una opción..."
      ? {
          temperatura: {
            type: "required",
            message: "El campo temperatura es requerido.",
          },
        }
      : values.unidades === "Seleccione una opción..."
      ? {
          unidades: {
            type: "required",
            message: "El campo unidades es requerido.",
          },
        }
      : {},
  };
};

export default function AgregarMateriaPrima() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver });

  const { agregarNuevaMateriaPrima } = useContext(MateriasPrimasContext);

  const onSave = ({ materiaPrima, unidades, temperatura }: FormData) => {
    agregarNuevaMateriaPrima(materiaPrima, unidades, temperatura, true);

    router.push("/gerencia-operativa/materiaPrima/VerMateriaPrima");
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Materia Prima
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombreMateriaPrima"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Materia Prima
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtNombreMateriaPrima"
                    autoComplete="off"
                    className={`${
                      errors?.materiaPrima
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("materiaPrima")}
                  />
                  {errors?.materiaPrima && (
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
                {errors?.materiaPrima && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.materiaPrima.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbTemperatura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Temperatura
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbTemperatura"
                    className={`${
                      errors?.temperatura
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Seleccione una opción..."
                    {...register("temperatura")}
                  >
                    <option hidden>Seleccione una opción...</option>
                    {validTemperature.map((temperatura) => (
                      <option key={temperatura} value={temperatura}>
                        {temperatura}
                      </option>
                    ))}
                  </select>

                  {errors?.temperatura && (
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
                {errors?.temperatura && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.temperatura.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbUnidades"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbUnidades"
                    className={`${
                      errors?.unidades
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Seleccione una opción..."
                    {...register("unidades")}
                  >
                    <option hidden>Seleccione una opción...</option>
                    {validUnits.map((unidad) => (
                      <option key={unidad} value={unidad}>
                        {unidad}
                      </option>
                    ))}
                  </select>

                  {errors?.unidades && (
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
                {errors?.unidades && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.unidades.message}
                    </p>
                  </>
                )}
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
        </div>
      </form>
    </SidebarLayoutGerenciaOperativa>
  );
}
