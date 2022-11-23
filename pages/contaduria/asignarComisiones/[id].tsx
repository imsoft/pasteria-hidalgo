import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const AsignarComisionesPage: FC<Props> = () => {
  return (
    <SidebarLayoutContaduria>
      <div>AgregarAsignarComisiones</div>
    </SidebarLayoutContaduria>
  );
}

export default AsignarComisionesPage;