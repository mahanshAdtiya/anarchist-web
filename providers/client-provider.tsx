"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useNavbarStore from "@/hooks/useNavbarStore";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import Sidebar from "@/components/Sidebar";
import { Category } from "@/types";

interface ClientProvidersProps {
  categories: Category[];
}

const ClientProviders: React.FC<ClientProvidersProps> = ({ categories }) => {
  const pathname = usePathname();
  const setNavbarStyles = useNavbarStore((state) => state.setNavbarStyles);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const isTransparent = pathname === "/" || pathname.startsWith("/product/");
    const bgColor = isTransparent ? "bg-transparent" : "bg-white shadow-md";
    const textColor = isTransparent ? "text-white" : "text-black";

    const iconColor = windowWidth < 700 ? "text-black" : textColor;

    setNavbarStyles(bgColor, iconColor);
  }, [pathname, setNavbarStyles, windowWidth]);

  return (
    <>
      <ModalProvider />
      <ToastProvider />
      <Sidebar categories={categories} />
    </>
  );
};

export default ClientProviders;
