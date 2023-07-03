import Image from "next/image";
import { SidebarLayout } from "../components/layouts/SidebarLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <>
      <SidebarLayout>
        <div className="flex justify-center">
          <Image
            className="h-full w-auto"
            src={"/static/LCPLIGHTVERTICAL.jpg"}
            width={600}
            height={600}
            alt="Pasteleria La Hidalguense"
            priority
          />
        </div>
      </SidebarLayout>
    </>
  );
}
