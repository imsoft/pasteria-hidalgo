import { ChangeEvent, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

import { AsignarPreciosContext } from "../../../context/gerencia-de-compras/asignarPrecios/AsignarPreciosContext";

import { MateriasPrimasContext } from "../../../context/gerencia-operativa/materiaPrima";
import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

type FormData = {
  producto: string;
  precioMaximo: string;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values,
    errors: values.producto === 'Seleccione un producto...'
      ? {
          producto: {
            type: "required",
            message: "El campo producto es requerido.",
          },
        }
      : !values.precioMaximo
      ? {
          precioMaximo: {
            type: "required",
            message: "El campo precio maximo es requerido.",
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

  const { agregarNuevoAsignarPrecio } = useContext(AsignarPreciosContext);

  const { materiasPrimas } = useContext(MateriasPrimasContext);
  const materiasPrimasMemo = useMemo(() => materiasPrimas, [materiasPrimas]);

  const onSave = ({ producto, precioMaximo }: FormData) => {
    agregarNuevoAsignarPrecio(producto, precioMaximo, true);

    router.push("/gerencia-de-compras/asignarPrecios/VerAsignarPrecio");
  };

  return (
    <SidebarLayoutGerenciaCompras>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Asignar Precios
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                ➡ Recuerda verificar si el producto ya ingresado en la lista.
              </p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Producto
                </label>

                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbProducto"
                    className={`${
                      errors?.producto
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    defaultValue="Seleccione un producto..."
                    {...register("producto")}
                  >
                    <option hidden>Seleccione un producto...</option>
                    {materiasPrimasMemo.map((materiaPrima) => (
                      <option key={materiaPrima._id}>
                        {" "}
                        {materiaPrima.materiaPrima}{" "}
                      </option>
                    ))}
                  </select>

                  {errors?.producto && (
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
                  htmlFor="TxtPrecioMaximo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio Máximo
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtPrecioMaximo"
                    autoComplete="off"
                    className={`${
                      errors?.precioMaximo
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("precioMaximo")}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      MXN
                    </span>
                  </div>
                  {errors?.precioMaximo && (
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
                {errors?.precioMaximo && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.precioMaximo.message}
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
