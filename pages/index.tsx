import { SidebarLayout } from "../components/layouts/SidebarLayout";
import Image from "next/image";

import LogoPasteriaBlanco from "../public/LCPLIGHTVERTICAL.jpg";

export default function Home() {
  return (
    <>
      <SidebarLayout>
        <div className="flex justify-center">
          <Image
            className="h-8 w-auto"
            src={LogoPasteriaBlanco}
            width={600}
            height={600}
            alt="Pasteleria La Hidalguense"
          />
        </div>
      </SidebarLayout>
    </>
  );
}
