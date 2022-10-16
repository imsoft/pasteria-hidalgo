import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";

import { CandidatosProvider } from "../context/recursos-humanos/candidatos";
import { ChecksInPersonalProvider } from "../context/recursos-humanos/checkInPersonal";
import { ClientesFrecuentesProvider } from "../context/gerencia-de-ventas/clienteFrecuente";
import { ManejosDePersonalProvider } from "../context/gerencia-operativa/manejoDePersonal";
import { PersonalActivoProvider } from "../context/recursos-humanos/personalActivo";
import { ProductosYaCompradosProvider } from "../context/gerencia-de-compras/productosYaComprados/ProductosYaCompradosProvider";
import { ProveedoresProvider } from "../context/gerencia-de-compras/manejoDeProveedores";
import { ReportesDeComprasProvider } from "../context/gerencia-de-compras/reporteDeCompras";
import { SucursalesYFranquiciasProvider } from "../context/gerencia-operativa/sucursalYFranquicia";
import { AcondicionamientoDeSucursalesProvider } from "../context/gerencia-de-compras/acondicionamientoDeSucursales";
import { AsignarPreciosProvider } from "../context/gerencia-de-compras/asignarPrecios";
import { ApartadosJuridicosProvider } from "../context/gerencia-operativa/apartadoJuridico";
import { ReportesDeSalidaProvider } from "../context/gerencia-operativa/reporteDeSalida";
import { MantenimientosProvider } from "../context/gerencia-operativa/mantenimiento";
import { PersonalesDeMantenimientoProvider } from "../context/gerencia-operativa/personalDeMantenimiento/PersonalDeMantenimientoProvider";

import "../styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <CandidatosProvider>
      <ChecksInPersonalProvider>
        <ClientesFrecuentesProvider>
          <ManejosDePersonalProvider>
            <PersonalActivoProvider>
              <ProductosYaCompradosProvider>
                <ProveedoresProvider>
                  <ReportesDeComprasProvider>
                    <SucursalesYFranquiciasProvider>
                      <AcondicionamientoDeSucursalesProvider>
                        <AsignarPreciosProvider>
                          <ApartadosJuridicosProvider>
                            <ReportesDeSalidaProvider>
                              <MantenimientosProvider>
                                <PersonalesDeMantenimientoProvider>
                                  <Component {...pageProps} />
                                </PersonalesDeMantenimientoProvider>
                              </MantenimientosProvider>
                            </ReportesDeSalidaProvider>
                          </ApartadosJuridicosProvider>
                        </AsignarPreciosProvider>
                      </AcondicionamientoDeSucursalesProvider>
                    </SucursalesYFranquiciasProvider>
                  </ReportesDeComprasProvider>
                </ProveedoresProvider>
              </ProductosYaCompradosProvider>
            </PersonalActivoProvider>
          </ManejosDePersonalProvider>
        </ClientesFrecuentesProvider>
      </ChecksInPersonalProvider>
    </CandidatosProvider>
  );
}

export default MyApp;
