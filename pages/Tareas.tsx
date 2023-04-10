import React from "react";
import { Disclosure } from "@headlessui/react";
import { SidebarLayout } from "../components/layouts/SidebarLayout";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

const tasksList = [
  {
    topic: "🛍️ Gerencia de compras",
    subtopics: [
      {
        title: "Reporte de compra",
        tasks: [
          "✅ Sumatoria en reporte de compra.",
          "✅ Arreglar diseño al ver reporte de compra. (Traer materia prima, unidades, temperatura, caducidad, cantidad, PPU, PTP)",
        ],
      },

      {
        title: "Acondicionamiento de sucursales",
        tasks: ["✅ Corregir las sucursales y franquicias."],
      },
    ],
  },
  {
    topic: "💰 Gerencia de ventas",
    subtopics: [
      {
        title: "Cliente frecuente",
        tasks: ["✅ Agregar sucursal o franquicia."],
      },
      {
        title: "Reporte de ventas ambulantes",
        tasks: [
          "✅ Clonar reporte de ventas individual en reporte de ventas ambulantes individual y quitar especificación del lugar de evento del clon.",
          "✅ Quitar parte de clientes frecuentes.",
        ],
      },
      {
        title: "Reporte de ventas ambulantes general",
        tasks: ["✅ Eliminarlo"],
      },
      {
        title: "Reporte de ventas individual",
        tasks: [
          "✅ Preguntar al cliente frecuente si quiere usar sus puntos o no.",
          "- Al momento de preguntar si quiere usar los puntos o no, solo ocultar los puntos para que pueda seleccionar el correo electrónico.",
        ],
      },
    ],
  },
  {
    topic: "👷 Gerencia operativa",
    subtopics: [
      {
        title: "Sucursal o franquicia",
        tasks: [
          "✅ Quitar la lista y solo dejar el cuadro de texto.",
          "🤔 Agregar pestaña del pago según el presupuesto.",
        ],
      },
      {
        title: "Personal de mantenimiento",
        tasks: ["✅ Agregar número de teléfono"],
      },
      {
        title: "Mantenimiento",
        tasks: ["✅ Agregar la sucursal o franquicia."],
      },
      {
        title: "Reporte de salida",
        tasks: [
          "✅ Quitar desde masa hasta temperatura de relleno.",
          "✅ Agregar lista de paste de salado, dulce y otros, junto con la cantidad.",
          "✅ Quitar todo lo de producto extra",
          "✅ Agregar otra opción a tipo de producto que diga 'Extra'",
          "✅ Si se seleccionar 'Extra' que aparezca una caja de texto",
          "✅ Agregar una lista como en ventas individual (Quitar de la lista, sucursal a enviar, datos del repartidor, datos de la ruta, Kilometraje de entrada y kilometraje de salida)",
          "✅ ¿Datos del repartidor?",
          "🤔 ¿Datos del la ruta?",
        ],
      },
    ],
  },
  {
    topic: "🔢 Contaduria",
    subtopics: [
      {
        title: "Asignar comisiones",
        tasks: [
          "✅ Por sucursal o franquicia, mínimo de la meta y si ya se alcanzó o no. (Ir sumando del Reporte Ventas Individual y de los ambulantes, agregar mes y año (del sistema) y filtrarlos al momento de ver, el filtrado de mes y año)... Arreglar filtrado",
        ],
      },
      {
        title: "Inventario",
        tasks: [
          "✅ Ver inventarios. (Solo ver Acondicionamiendo de sucursales)",
        ],
      },
      { title: "Asignar precios", tasks: ["✅ Solo ver el precio máximo."] },
      {
        title: "Reporte de ganancias",
        tasks: [
          "✅ Se comprara con el reporte de entrada con las ventas del mes, según las sucursales y franquicias y de todas las sucursales. (Tabla similar a la de asignar comisiones, solo agregandole los datos del balance y las compras), (Se comprara todo lo comprado con lo vendido por todas las sucursales)... Checar captura de pantalla",
        ],
      },
      { title: "Reportes de ventas", tasks: ["✅ Ver reportes de ventas."] },
      { title: "Check In", tasks: ["✅ Ver la lista."] },
      {
        title: "Asignar precios",
        tasks: [
          "✅ CRUD de precio máximo, (Quitar la asignacion de precios y solo dejar precio maximo)",
        ],
      },
      {
        title: "Asignar precios",
        tasks: ["✅ Traer la materia prima de la BD"],
      },
    ],
  },
  {
    topic: "💻 Miscelaneos",
    subtopics: [
      { title: "Caja registradora", tasks: ["⚒️ Ver caja registradora"] },
      {
        title: "General",
        tasks: [
          "⚒️ Incorporar el login, actualizar productos segun reporte de entrada y salida, actualizar puntos del cliente frecuente segun la compra",
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
