import React, { useContext, useState } from "react";
import Image from "next/image";

import { Resolver, useForm } from "react-hook-form";

import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { validations } from "../../utils";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth";
import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

const rolesValidos = [
  //   "Seleccione una opción...",
  "admin",
  "contaduria",
  "gerencia de compras",
  "gerencia operativa",
  "gerencia de ventas",
  "recursos Humanos",
];

type FormData = {
  nombre: string;
  correoElectronico: string;
  contrasenia: string;
  role: string;
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
      : values.role === "Seleccione una opción..."
      ? {
          role: {
            type: "required",
            message: "El campo role es requerido.",
          },
        }
      : !values.correoElectronico
      ? {
          correoElectronico: {
            type: "required",
            message: "El campo correo electrónico es requerido.",
          },
        }
      : validations.isEmail(values.correoElectronico)
      ? {
          correoElectronico: {
            type: "pattern",
            message: "Correo electrónico no valido.",
          },
        }
      : !values.contrasenia
      ? {
          contrasenia: {
            type: "required",
            message: "El campo contraseña es requerido.",
          },
        }
      : {},
  };
};

export default function Registro() {
  const router = useRouter();

  const { regiterUser } = useContext(AuthContext);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver });

  const onRegisterUser = async ({
    nombre,
    correoElectronico,
    contrasenia,
    role,
  }: FormData) => {
    setShowError(false);

    const { hasError, message } = await regiterUser(
      nombre,
      correoElectronico,
      contrasenia,
      role,
      //TODO: CORREGIR ESTO A SUCURSALYFRANQUICIA Y NOMBREDESUCURSALYFRANQUICIA
      role,
      role
    );

    if (hasError) {
      setShowError(true);
      setErrorMessage(message || "");
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // router.replace("/");
    await signIn("credentials", { correoElectronico, contrasenia });
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image
            className="mx-auto h-24 w-auto"
            src={"/static/LogoPasteria.jpg"}
            alt="Pasteria la Hidalguense"
            width={128}
            height={128}
          />
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Pastería la Hidalguense
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onRegisterUser)} className="space-y-6">
            <div>
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

            <div>
              <label
                htmlFor="CmbRole"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>

              <div className="relative rounded-md shadow-sm">
                <select
                  id="CmbRole"
                  className={`${
                    errors?.role
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  }`}
                  defaultValue="Seleccione una opción..."
                  {...register("role")}
                >
                  <option hidden>Seleccione una opción...</option>
                  {rolesValidos.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>

                {errors?.role && (
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
              {errors?.role && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {errors.role.message}
                  </p>
                </>
              )}
            </div>

            <div>
              <label
                htmlFor="TxtCorreoElectronico"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
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
                {errors?.correoElectronico && (
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

            <div>
              <label
                htmlFor="TxtContrasenia"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="password"
                  id="TxtContrasenia"
                  autoComplete="off"
                  className={`${
                    errors?.contrasenia
                      ? "block mt-1 w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                      : "block mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  }`}
                  {...register("contrasenia")}
                />
                {errors?.contrasenia && (
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
              {errors?.contrasenia && (
                <>
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {errors.contrasenia.message}
                  </p>
                </>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-blue hover:bg-primary-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              >
                Registrar usuario
              </button>
            </div>

            <div className={`relative mt-4 ${showError || "invisible"}`}>
              <div className="pointer-events-none absolute flex items-center">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
                <p className="ml-2 text-sm leading-6 text-red-600">
                  Ese correo electrónico ya está registrado.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
