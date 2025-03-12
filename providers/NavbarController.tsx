"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useNavbarStore from "@/hooks/useNavbarStore";

export default function NavbarController() {
  const pathname = usePathname();
  const setTransparent = useNavbarStore((state) => state.setTransparent);

  useEffect(() => {
    setTransparent(pathname === "/");
  }, [pathname, setTransparent]);

  return null; 
}
