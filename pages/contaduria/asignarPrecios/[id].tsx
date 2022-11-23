import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";

import { FC } from 'react';
import { AsignarPrecio } from '../../../interfaces';

interface Props {
  asignarPrecio: AsignarPrecio;
}

export const AsignarPreciosPage: FC<Props> = () => {
  return (
    <SidebarLayoutContaduria>
      <div>AgregarAsignarPrecios</div>
    </SidebarLayoutContaduria>
  );
};

export default AsignarPreciosPage;