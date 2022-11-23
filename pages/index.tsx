import Image from "next/image";
import { SidebarLayout } from "../components/layouts/SidebarLayout";

export default function Home () {
  return (
    <SidebarLayout>
      <div className="flex justify-center">
        <Image
          className="h-8 w-auto"
          src={"/static/LCPLIGHTVERTICAL.jpg"}
          width={600}
          height={600}
          alt="Pasteleria La Hidalguense"
        />
      </div>
    </SidebarLayout>
  );
};
