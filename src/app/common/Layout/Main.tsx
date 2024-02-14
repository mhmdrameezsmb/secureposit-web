"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { NextAuthProvider } from "@/app/providers";
import { ToastContainer, Zoom } from "react-toastify";
import { Theme } from "@radix-ui/themes";

export interface Props {
  children: any;
}
export default function Main({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [p, setPath] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-screen overflow-hidden">
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden body-bg">
            <main>
              <NextAuthProvider>
                <Theme>
                  <ToastContainer transition={Zoom} />

                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </Theme>
              </NextAuthProvider>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
