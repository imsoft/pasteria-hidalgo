import React from "react";
import { Disclosure } from "@headlessui/react";
import { SidebarLayout } from "../components/layouts/SidebarLayout";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

const tasksList = [
  {
    topic: "🔢 Contaduria",
    subtopics: [
      {
        title: "Asignar comisiones",
        tasks: [""],
      },
      {
        title: "Reporte de ganancias",
        tasks: [
          "⚒️ En reporte de ganancias, hacer la suma de compras y ventas según el mes y la sucursal.",
        ],
      },
      {
        title: "Ver Acondicionamiento de sucursales",
        tasks: [
          "⚒️ En contaduría checar que sólo pueda ver y no editar o agregar.",
        ],
      },
      {
        title: "Ver Check In",
        tasks: [
          "⚒️ En contaduría checar que sólo pueda ver y no editar o agregar.",
        ],
      },
      {
        title: "Ver Materia Prima",
        tasks: [
          "⚒️ En contaduría checar que sólo pueda ver y no editar o agregar.",
        ],
      },
      {
        title: "Ver Precio Maximo",
        tasks: [
          "⚒️ En contaduría checar que sólo pueda ver y no editar o agregar.",
        ],
      },
      {
        title: "Ver Reporte de compras",
        tasks: [
          "⚒️ En contaduría checar que sólo pueda ver y no editar o agregar.",
        ],
      },
      {
        title: "Ver Reporte de salida",
        tasks: [
          "⚒️ En contaduría checar que sólo pueda ver y no editar o agregar.",
        ],
      },
      {
        title: "Ver Reporte de venta ambulantes individual",
        tasks: [
          "⚒️ En contaduría checar que sólo pueda ver y no editar o agregar.",
        ],
      },
      {
        title: "Ver Reporte Ventas Individual",
        tasks: [
          "⚒️ En contaduría checar que sólo pueda ver y no editar o agregar.",
        ],
      },
    ],
  },
  {
    topic: "🛍️ Gerencia de compras",
    subtopics: [
      {
        title: "Acondicionamiento de sucursales",
        tasks: [""],
      },
      {
        title: "Asignar Precios",
        tasks: [
          "⚒️ Poner leyenda en asignar precios, de verificar si el producto ya está registrado.",
        ],
      },
      {
        title: "Proveedores",
        tasks: ["⚒️ Animación y cambio de ventana en proveedores."],
      },
      {
        title: "Reporte de compras",
        tasks: [
          "⚒️ Filtrado en reporte de compras por fecha, como en reporte de ventas individual.",
        ],
      },
    ],
  },
  {
    topic: "💰 Gerencia de ventas",
    subtopics: [
      {
        title: "Cliente frecuente",
        tasks: [""],
      },
      {
        title: "Reporte De Ventas Ambulantes Individual",
        tasks: [""],
      },
      {
        title: "Reporte Ventas Individual",
        tasks: [
          "⚒️ Checar el guardado de reporte de ventas individual.",
          "⚒️ Actualizar puntos del cliente frecuente segun la compra",
        ],
      },
    ],
  },
  {
    topic: "👷 Gerencia operativa",
    subtopics: [
      {
        title: "Apartado jurídico",
        tasks: [""],
      },
      {
        title: "Manejo de almacen",
        tasks: [
          "⚒️ Que no se dupliquen productos en almacén.",
          "⚒️ Actualizar productos segun reporte de entrada y salida.",
        ],
      },
      {
        title: "Manejo de personal",
        tasks: [""],
      },
      {
        title: "Mantenimiento",
        tasks: [""],
      },
      {
        title: "Materia Prima",
        tasks: [""],
      },
      {
        title: "Personal De Mantenimiento",
        tasks: [""],
      },
      {
        title: "Reporte Salida",
        tasks: [
          "⚒️ Cambiar datos de la ruta en reporte de salida por distancia de la fábrica al destino.",
          "⚒️ Corregir el click en ver salidas.",
        ],
      },
      {
        title: "Sucursales y Franquicias",
        tasks: ["⚒️ Cambio de ventana en sucursales y franquicias."],
      },
    ],
  },
  {
    topic: "👥 Recursos Humanos",
    subtopics: [
      {
        title: "Candidato",
        tasks: [""],
      },
      {
        title: "Check In de Personal",
        tasks: [""],
      },
      {
        title: "Personal activo",
        tasks: [""],
      },
    ],
  },
  {
    topic: "💻 Miscelaneos",
    subtopics: [
      { title: "Caja registradora", tasks: ["⚒️ Ver caja registradora"] },
      {
        title: "General",
        tasks: ["⚒️ Incorporar el login"],
      },
    ],
  },
  {
    topic: "📘 Simbología",
    subtopics: [
      {
        title: "",
        tasks: [
          "⚒️ = En mantenimiento.",
          "🔵 = Tarea terminada pero sin revisar. ",
          "✅ = Tarea terminada y revisada.",
        ],
      },
    ],
  },
];

const Tareas = () => {
  return (
    <>
      <SidebarLayout>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-12 py-6 sm:py-8 lg:py-10 lg:px-8">
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
                Lista de tareas 📝
              </h2>
              <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                {tasksList.map((taskList) => (
                  <Disclosure as="div" key={taskList.topic} className="pt-6">
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                            <span className="text-xl font-semibold leading-7">
                              {taskList.topic}
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              {open ? (
                                <ChevronUpIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDownIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          {taskList.subtopics.map((subtopic) => (
                            <div key={subtopic.title} className="py-3">
                              <p className="text-lg leading-7 text-gray-600">
                                {subtopic.title}
                                {subtopic.tasks.map((task) => (
                                  <p
                                    key={task}
                                    className="text-base leading-7 text-gray-500"
                                  >
                                    {task}
                                  </p>
                                ))}
                              </p>
                            </div>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default Tareas;
