import Image from "next/image";
import { SidebarLayoutContaduria } from "../../components/layouts/contaduria/SidebarLayoutContaduria";
import LogoPasteria from "../../public/images/company/LCP_LIGHT_VERTICAL.jpg";

import {
  CashIcon,
  CurrencyDollarIcon,
  DocumentReportIcon,
} from "@heroicons/react/outline";

const actions = [
  {
    title: "Asignar comisiones",
    href: "/contaduria/asignar-comisiones",
    icon: CashIcon,
    iconForeground: "text-primary-yellow",
    iconBackground: "bg-primary-blue",
  },
  {
    title: "Asignar precios",
    href: "/contaduria/asignar-precios",
    icon: CurrencyDollarIcon,
    iconForeground: "text-primary-yellow",
    iconBackground: "bg-primary-blue",
  },
  {
    title: "Reporte de ganancias",
    href: "/contaduria/reporte-de-ganancias",
    icon: DocumentReportIcon,
    iconForeground: "text-primary-yellow",
    iconBackground: "bg-primary-blue",
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function IndexContaduria() {
  return (
    <SidebarLayoutContaduria>
      <div className="flex justify-center items-center">
        <div>
          <Image
            className="h-8 w-auto"
            src={LogoPasteria}
            width={600}
            height={600}
            alt="Pasteleria La Hidalguense"
          />
        </div>

        <div>
          <div className="text-center my-5">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">¿Con que trabajaremos? 🤔</span>
            </h1>
          </div>
          <div className="rounded-lg bg-gray-100 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
            {actions.map((action, actionIdx) => (
              <div
                key={action.title}
                className={classNames(
                  actionIdx === 0
                    ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                    : "",
                  actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                  actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
                  actionIdx === actions.length - 1
                    ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                    : "",
                  "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-yellow"
                )}
              >
                <div>
                  <span
                    className={classNames(
                      action.iconBackground,
                      action.iconForeground,
                      "rounded-lg inline-flex p-3 ring-4 ring-white"
                    )}
                  >
                    <action.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <a href={action.href} className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Doloribus dolores nostrum quia qui natus officia quod et
                    dolorem. Sit repellendus qui ut at blanditiis et quo et
                    molestiae.
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayoutContaduria>
  );
}
