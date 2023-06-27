import { ChangeEvent, useContext, useEffect, useState } from "react";

import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia/SucursalYFranquiciaContext";
import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import { useRouter } from "next/router";
import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { moneyFormat } from "../../../utils/moneyFormat";

type FormData = {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  direccion: string;
  distancia: string;
  fechaDePago: string;
  montoDePago: string;
  cuentaBancaria: string;
  banco: string;
  nombreDelBeneficiario: string;
  rfc: string;
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
        : !values.nombreSucursalOFranquicia
        ? {
            nombreSucursalOFranquicia: {
              type: "required",
              message: "El campo nombre sucursal o franquicia es requerido.",
            },
          }
        : !values.direccion
        ? {
            direccion: {
              type: "required",
              message: "El campo dirección es requerido.",
            },
          }
        : !values.distancia
        ? {
            distancia: {
              type: "required",
              message: "El campo distancia es requerido.",
            },
          }
        : !values.fechaDePago
        ? {
            fechaDePago: {
              type: "required",
              message: "El campo fecha de pago es requerido.",
            },
          }
        : !values.montoDePago
        ? {
            montoDePago: {
              type: "required",
              message: "El campo monto de pago es requerido.",
            },
          }
        : !values.cuentaBancaria
        ? {
            cuentaBancaria: {
              type: "required",
              message: "El campo cuenta bancaria es requerido.",
            },
          }
        : !values.banco
        ? {
            banco: {
              type: "required",
              message: "El campo banco es requerido.",
            },
          }
        : !values.nombreDelBeneficiario
        ? {
            nombreDelBeneficiario: {
              type: "required",
              message: "El campo nombre del beneficiario es requerido.",
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

export default function ManejoSucursalesFranquicias() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ resolver });

  const [montoDePago, setMontoDePago] = useState("");

  useEffect(() => {
    setMontoDePago(moneyFormat(parseFloat(watch("montoDePago"))));
  }, [watch("montoDePago")]);

  const { agregarSucursalYFranquicia } = useContext(
    SucursalesYFranquiciasContext
  );

  const onSave = ({
    sucursalOFranquicia,
    nombreSucursalOFranquicia,
    direccion,
    distancia,
    fechaDePago,
    montoDePago,
    cuentaBancaria,
    banco,
    nombreDelBeneficiario,
    rfc,
  }: FormData) => {
    agregarSucursalYFranquicia(
      sucursalOFranquicia,
      nombreSucursalOFranquicia,
      direccion,
      distancia,
      fechaDePago,
      montoDePago,
      cuentaBancaria,
      banco,
      nombreDelBeneficiario,
      rfc,
      true
    );

    router.push(
      "/gerencia-operativa/sucursalYFranquicia/VerSucursalesYFranquicias"
    );
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Sucursales y Franquicias
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
                  htmlFor="TxtNombreDeLaSucursalOFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de la sucursal o franquicia
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtNombreDeLaSucursalOFranquicia"
                    autoComplete="off"
                    className={`${
                      errors?.nombreSucursalOFranquicia
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("nombreSucursalOFranquicia")}
                  />
                  {errors?.nombreSucursalOFranquicia && (
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
                  htmlFor="DistanciaDeLaFabricaALaSucursalOFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Distancia de la fabrica a la sucursal o franquicia
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="DistanciaDeLaFabricaALaSucursalOFranquicia"
                    autoComplete="off"
                    className={`${
                      errors?.distancia
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("distancia")}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      KM
                    </span>
                  </div>
                  {errors?.distancia && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-10">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors?.distancia && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.distancia.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDePago"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de pago
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    id="TxtFechaDePago"
                    autoComplete="off"
                    className={`${
                      errors?.fechaDePago
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("fechaDePago")}
                  />
                  {errors?.fechaDePago && (
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
                {errors?.fechaDePago && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.fechaDePago.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtMontoDePago"
                  className="block text-sm font-medium text-gray-700"
                >
                  Monto de pago
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtMontoDePago"
                    autoComplete="off"
                    className={`${
                      errors?.montoDePago
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...(register("montoDePago"))}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      MXN
                    </span>
                  </div>

                  {errors?.montoDePago && (
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
                <span className="text-sm text-gray-500">
                  $ {isNaN(parseFloat(montoDePago)) ? "" : montoDePago}
                </span>
                {errors?.montoDePago && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.montoDePago.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCuentaBancaria"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cuenta Bancaria
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtCuentaBancaria"
                    autoComplete="off"
                    className={`${
                      errors?.cuentaBancaria
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("cuentaBancaria")}
                  />
                  {errors?.cuentaBancaria && (
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
                {errors?.cuentaBancaria && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.cuentaBancaria.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtBanco"
                  className="block text-sm font-medium text-gray-700"
                >
                  Banco
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtBanco"
                    autoComplete="off"
                    className={`${
                      errors?.banco
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("banco")}
                  />
                  {errors?.banco && (
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
                {errors?.banco && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.banco.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombreDelBeneficiario"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del beneficiario del beneficiario
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtNombre"
                    autoComplete="off"
                    className={`${
                      errors?.nombreDelBeneficiario
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("nombreDelBeneficiario")}
                  />
                  {errors?.nombreDelBeneficiario && (
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
                {errors?.nombreDelBeneficiario && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.nombreDelBeneficiario.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtRFC"
                  className="block text-sm font-medium text-gray-700"
                >
                  RFC
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtRFC"
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
    </SidebarLayoutGerenciaOperativa>
  );
}
