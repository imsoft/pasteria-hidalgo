import { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

// Contaduria

import { AsignarComisionProvider } from "../context/contaduria/asignarComision";
import { ReporteDeGananciaProvider } from "../context/contaduria/reporteDeGanancia";

// Gerencia de compras

import { AcondicionamientoDeSucursalesProvider } from "../context/gerencia-de-compras/acondicionamientoDeSucursales";
import { AsignarPreciosProvider } from "../context/gerencia-de-compras/asignarPrecios";
import { ProveedoresProvider } from "../context/gerencia-de-compras/manejoDeProveedores";
import { ReportesDeComprasProvider } from "../context/gerencia-de-compras/reporteDeCompras";
import { ReporteVentasAmbulantesIndividualProvider } from "../context/gerencia-de-ventas/reporteVentasAmbulantesIndividual";

// Gerencia de ventas

import { ClientesFrecuentesProvider } from "../context/gerencia-de-ventas/clienteFrecuente";
import { ReportesVentasIndividualProvider } from "../context/gerencia-de-ventas/reporteVentasIndividual";

// Gerencia operativa

import { ApartadosJuridicosProvider } from "../context/gerencia-operativa/apartadoJuridico";
import { MantenimientosProvider } from "../context/gerencia-operativa/mantenimiento";
import { PersonalesDeMantenimientoProvider } from "../context/gerencia-operativa/personalDeMantenimiento";
import { ReportesDeSalidaProvider } from "../context/gerencia-operativa/reporteDeSalida";
import { SucursalesYFranquiciasProvider } from "../context/gerencia-operativa/sucursalYFranquicia";
import { MateriasPrimasProvider } from "../context/gerencia-operativa/materiaPrima";
import { ManejosDeAlmacenProvider } from "../context/gerencia-operativa/manejoDeAlmacen";

// Recursos Humanos

import { CandidatosProvider } from "../context/recursos-humanos/candidatos";
import { ChecksInPersonalProvider } from "../context/recursos-humanos/checkInPersonal";
import { PersonalActivoProvider } from "../context/recursos-humanos/personalActivo";

// Miscelaneos

import "../styles/globals.css";
import { AuthProvider } from "../context/auth";

// TODO: Checar de donde viene esto:
import { ProductosYaCompradosProvider } from "../context/gerencia-de-compras/productosYaComprados/ProductosYaCompradosProvider";
import { ManejosDePersonalProvider } from "../context/gerencia-operativa/manejoDePersonal";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <SessionProvider>
      <AuthProvider>
        <SucursalesYFranquiciasProvider>
          <ClientesFrecuentesProvider>
            <ReportesVentasIndividualProvider>
              <ReportesDeSalidaProvider>
                <ApartadosJuridicosProvider>
                  <AsignarComisionProvider>
                    <MantenimientosProvider>
                      <ProveedoresProvider>
                        <AcondicionamientoDeSucursalesProvider>
                          <MateriasPrimasProvider>
                            <ReportesDeComprasProvider>
                              <AsignarPreciosProvider>
                                <ReporteDeGananciaProvider>
                                  <CandidatosProvider>
                                    <PersonalActivoProvider>
                                      <ChecksInPersonalProvider>
                                        <ManejosDeAlmacenProvider>
                                          <ReporteVentasAmbulantesIndividualProvider>
                                            <PersonalesDeMantenimientoProvider>
                                              <Component {...pageProps} />
                                            </PersonalesDeMantenimientoProvider>
                                          </ReporteVentasAmbulantesIndividualProvider>
                                        </ManejosDeAlmacenProvider>
                                      </ChecksInPersonalProvider>
                                    </PersonalActivoProvider>
                                  </CandidatosProvider>
                                </ReporteDeGananciaProvider>
                              </AsignarPreciosProvider>
                            </ReportesDeComprasProvider>
                          </MateriasPrimasProvider>
                        </AcondicionamientoDeSucursalesProvider>
                      </ProveedoresProvider>
                    </MantenimientosProvider>
                  </AsignarComisionProvider>
                </ApartadosJuridicosProvider>
              </ReportesDeSalidaProvider>
            </ReportesVentasIndividualProvider>
          </ClientesFrecuentesProvider>
        </SucursalesYFranquiciasProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
