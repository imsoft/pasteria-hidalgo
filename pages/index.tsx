import Image from "next/image";
import { SidebarLayout } from "../components/layouts/SidebarLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <p>Loading...</p>
        </div>
      ) : (
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
      )}
    </>
  );
}
