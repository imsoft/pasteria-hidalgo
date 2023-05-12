import { useContext } from "react";

import { CandidatosContext } from "../../../context/recursos-humanos/candidatos";

import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";

import { PuestosEmpresa } from "../../../interfaces";

import { useRouter } from "next/router";

import { Resolver, useForm } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const puestosValidos: PuestosEmpresa[] = [
  "Seleccione una opción...",
  "Administrador",
  "Contaduria",
  "Gerencia de compras",
  "Gerencia operativa",
  "Gerencia de ventas",
  "Recursos Humanos",
];

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type FormData = {
  nombre: string;
  puesto: PuestosEmpresa;
  descripcionDelPuesto: string;
  fechaDeNacimiento: string;
  domicilio: string;
  curp: string;
  noImss?: string;
  noCartaDePolicia: string;
  celular: string;
  contactoDeEmergencia: string;
  correoElectronico: string;
  referencia1Nombre: string;
  referencia1Empresa: string;
  referencia1NumeroTelefonico: string;
  referencia1Observaciones: string;
  referencia2Nombre: string;
  referencia2Empresa: string;
  referencia2NumeroTelefonico: string;
  referencia2Observaciones: string;
  referencia3Nombre?: string;
  referencia3Empresa?: string;
  referencia3NumeroTelefonico?: string;
  referencia3Observaciones?: string;
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
      : values.puesto === "Seleccione una opción..."
      ? {
          puesto: {
            type: "required",
            message: "El campo puesto es requerido.",
          },
        }
      : !values.descripcionDelPuesto
      ? {
          descripcionDelPuesto: {
            type: "required",
            message: "El campo descripción del puesto es requerido.",
          },
        }
      : !values.fechaDeNacimiento
      ? {
          fechaDeNacimiento: {
            type: "required",
            message: "El campo fecha de nacimiento es requerido.",
          },
        }
      : !values.domicilio
      ? {
          domicilio: {
            type: "required",
            message: "El campo domicilio es requerido.",
          },
        }
      : !values.curp
      ? {
          curp: {
            type: "required",
            message: "El campo CURP es requerido.",
          },
        }
      : !values.noCartaDePolicia
      ? {
          noCartaDePolicia: {
            type: "required",
            message: "El campo No carta de policia es requerido.",
          },
        }
      : !values.celular
      ? {
          celular: {
            type: "required",
            message: "El campo celular es requerido.",
          },
        }
      : !values.contactoDeEmergencia
      ? {
          contactoDeEmergencia: {
            type: "required",
            message: "El campo contacto de emergencia es requerido.",
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
      : !values.referencia1Nombre
      ? {
          referencia1Nombre: {
            type: "required",
            message: "El campo nombre es requerido.",
          },
        }
      : !values.referencia1Empresa
      ? {
          referencia1Empresa: {
            type: "required",
            message: "El campo empresa es requerido.",
          },
        }
      : !values.referencia1NumeroTelefonico
      ? {
          referencia1NumeroTelefonico: {
            type: "required",
            message: "El campo número telefónico es requerido.",
          },
        }
      : !values.referencia1Observaciones
      ? {
          referencia1Observaciones: {
            type: "required",
            message: "El campo observaciones es requerido.",
          },
        }
      : !values.referencia2Nombre
      ? {
          referencia2Nombre: {
            type: "required",
            message: "El campo nombre es requerido.",
          },
        }
      : !values.referencia2Empresa
      ? {
          referencia2Empresa: {
            type: "required",
            message: "El campo empresa es requerido.",
          },
        }
      : !values.referencia2NumeroTelefonico
      ? {
          referencia2NumeroTelefonico: {
            type: "required",
            message: "El campo número telefónico es requerido.",
          },
        }
      : !values.referencia2Observaciones
      ? {
          referencia2Observaciones: {
            type: "required",
            message: "El campo observaciones es requerido.",
          },
        }
      : {},
  };
};

export default function AgregarCandidato() {
  const router = useRouter();

  const { agregarNuevoCandidato } = useContext(CandidatosContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver });

  const onSave = ({
    nombre,
    puesto,
    descripcionDelPuesto,
    fechaDeNacimiento,
    domicilio,
    curp,
    noImss = "",
    noCartaDePolicia,
    celular,
    contactoDeEmergencia,
    correoElectronico,
    referencia1Nombre,
    referencia1Empresa,
    referencia1NumeroTelefonico,
    referencia1Observaciones,
    referencia2Nombre,
    referencia2Empresa,
    referencia2NumeroTelefonico,
    referencia2Observaciones,
    referencia3Nombre,
    referencia3Empresa,
    referencia3NumeroTelefonico,
    referencia3Observaciones,
  }: FormData) => {
    agregarNuevoCandidato(
      nombre,
      puesto,
      descripcionDelPuesto,
      fechaDeNacimiento,
      domicilio,
      curp,
      noImss,
      noCartaDePolicia,
      celular,
      contactoDeEmergencia,
      correoElectronico,
      referencia1Nombre,
      referencia1Empresa,
      referencia1NumeroTelefonico,
      referencia1Observaciones,
      referencia2Nombre,
      referencia2Empresa,
      referencia2NumeroTelefonico,
      referencia2Observaciones,
      referencia3Nombre,
      referencia3Empresa,
      referencia3NumeroTelefonico,
      referencia3Observaciones,
      true
    );

    router.push("/recursos-humanos/candidato/VerCandidatos");
  };

  return (
    <SidebarLayoutRecursosHumanos>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Candidato
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
                    {puestosValidos.map((puesto) => (
                      <option key={puesto} value={puesto}>
                        {puesto}
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
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción y funciones de puesto
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtDescripcionProducto"
                    autoComplete="off"
                    className={`${
                      errors?.descripcionDelPuesto
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("descripcionDelPuesto")}
                  />
                  {errors?.descripcionDelPuesto && (
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
                {errors?.descripcionDelPuesto && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.descripcionDelPuesto.message}
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
                  htmlFor="TxtDomicilio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Domicilio
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtDomicilio"
                    autoComplete="off"
                    className={`${
                      errors?.domicilio
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("domicilio")}
                  />
                  {errors?.domicilio && (
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
                {errors?.domicilio && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.domicilio.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCurp"
                  className="block text-sm font-medium text-gray-700"
                >
                  CURP
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtCurp"
                    autoComplete="off"
                    className={`${
                      errors?.curp
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("curp")}
                  />
                  {errors?.curp && (
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
                {errors?.curp && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.curp.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNoImss"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. Imss
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtNoImss"
                    autoComplete="off"
                    className={`${
                      errors?.noImss
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("noImss")}
                  />
                  {errors?.noImss && (
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
                {errors?.noImss && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.noImss.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNoCartaDePolicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. Carta de policía
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtNoCartaDePolicia"
                    autoComplete="off"
                    className={`${
                      errors?.noCartaDePolicia
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("noCartaDePolicia")}
                  />
                  {errors?.noCartaDePolicia && (
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
                {errors?.noCartaDePolicia && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.noCartaDePolicia.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCelular"
                  className="block text-sm font-medium text-gray-700"
                >
                  Celular
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    id="TxtCelular"
                    autoComplete="off"
                    className={`${
                      errors?.celular
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("celular")}
                  />
                  {errors?.celular && (
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
                {errors?.celular && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.celular.message}
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtContactoDeEmergencia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contacto de emergencia
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="TxtContactoDeEmergencia"
                    autoComplete="off"
                    className={`${
                      errors?.contactoDeEmergencia
                        ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    }`}
                    {...register("contactoDeEmergencia")}
                  />
                  {errors?.contactoDeEmergencia && (
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
                {errors?.contactoDeEmergencia && (
                  <>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.contactoDeEmergencia.message}
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
            </div>

            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Referencias
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Nota: Obligatorio dos referencias y una opcional.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Referencia #1
                  </h3>
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
                          errors?.referencia1Nombre
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia1Nombre")}
                      />
                      {errors?.referencia1Nombre && (
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
                    {errors?.referencia1Nombre && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia1Nombre.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtEmpresa"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Empresa
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="TxtEmpresa"
                        autoComplete="off"
                        className={`${
                          errors?.referencia1Empresa
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia1Empresa")}
                      />
                      {errors?.referencia1Empresa && (
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
                    {errors?.referencia1Empresa && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia1Empresa.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtNumeroTelefonico"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número Telefónico
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="tel"
                        id="TxtNumeroTelefonico"
                        autoComplete="off"
                        className={`${
                          errors?.referencia1NumeroTelefonico
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia1NumeroTelefonico")}
                      />
                      {errors?.referencia1NumeroTelefonico && (
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
                    {errors?.referencia1NumeroTelefonico && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia1NumeroTelefonico.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtObservaciones"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Observaciones
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="TxtObservaciones"
                        autoComplete="off"
                        className={`${
                          errors?.referencia1Observaciones
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia1Observaciones")}
                      />
                      {errors?.referencia1Observaciones && (
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
                    {errors?.referencia1Observaciones && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia1Observaciones.message}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Referencia #2
                  </h3>
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
                          errors?.referencia2Nombre
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia2Nombre")}
                      />
                      {errors?.referencia2Nombre && (
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
                    {errors?.referencia2Nombre && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia2Nombre.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtEmpresa"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Empresa
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="TxtEmpresa"
                        autoComplete="off"
                        className={`${
                          errors?.referencia2Empresa
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia2Empresa")}
                      />
                      {errors?.referencia2Empresa && (
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
                    {errors?.referencia2Empresa && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia2Empresa.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtNumeroTelefonico"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número Telefónico
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="tel"
                        id="TxtNumeroTelefonico"
                        autoComplete="off"
                        className={`${
                          errors?.referencia2NumeroTelefonico
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia2NumeroTelefonico")}
                      />
                      {errors?.referencia2NumeroTelefonico && (
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
                    {errors?.referencia2NumeroTelefonico && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia2NumeroTelefonico.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtObservaciones"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Observaciones
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="TxtObservaciones"
                        autoComplete="off"
                        className={`${
                          errors?.referencia2Observaciones
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia2Observaciones")}
                      />
                      {errors?.referencia2Observaciones && (
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
                    {errors?.referencia2Observaciones && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia2Observaciones.message}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Referencia #3 (Opcional)
                  </h3>
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
                          errors?.referencia3Nombre
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia3Nombre")}
                      />
                      {errors?.referencia3Nombre && (
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
                    {errors?.referencia3Nombre && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia3Nombre.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtEmpresa"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Empresa
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="TxtEmpresa"
                        autoComplete="off"
                        className={`${
                          errors?.referencia3Empresa
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia3Empresa")}
                      />
                      {errors?.referencia3Empresa && (
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
                    {errors?.referencia3Empresa && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia3Empresa.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtNumeroTelefonico"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número Telefónico
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="tel"
                        id="TxtNumeroTelefonico"
                        autoComplete="off"
                        className={`${
                          errors?.referencia3NumeroTelefonico
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia3NumeroTelefonico")}
                      />
                      {errors?.referencia3NumeroTelefonico && (
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
                    {errors?.referencia3NumeroTelefonico && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia3NumeroTelefonico.message}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtObservaciones"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Observaciones
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="TxtObservaciones"
                        autoComplete="off"
                        className={`${
                          errors?.referencia3Observaciones
                            ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                        }`}
                        {...register("referencia3Observaciones")}
                      />
                      {errors?.referencia3Observaciones && (
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
                    {errors?.referencia3Observaciones && (
                      <>
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {errors.referencia3Observaciones.message}
                        </p>
                      </>
                    )}
                  </div>
                </div>
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
