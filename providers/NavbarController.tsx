"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useNavbarStore from "@/hooks/useNavbarStore";

export default function NavbarController() {
  const pathname = usePathname();
  const setNavbarStyles = useNavbarStore((state) => state.setNavbarStyles);

  useEffect(() => {
    if (pathname === "/") {
      setNavbarStyles("bg-transparent", "text-white");
    } else {
      setNavbarStyles("bg-white", "text-black");
    }
  }, [pathname, setNavbarStyles]);

  return null; 
}
