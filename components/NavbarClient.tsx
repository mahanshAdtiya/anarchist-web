"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, Search, User, ShoppingBag } from "lucide-react";

import useCart from "@/hooks/use-cart";
import useSidebarStore from "@/hooks/useSidebar";
import useNavbarStore from "@/hooks/useNavbarStore";
import { Button } from "@/components/ui/button";

function NavbarClient() {
  const { bgColor, iconColor } = useNavbarStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const cart = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const { openSidebar } = useSidebarStore();

  useEffect(() => {
    const isHome = pathname === "/";
    const isProductPage = pathname.startsWith("/product/");
  
    if (!isHome && !isProductPage) {
      setIsScrolled(true); 
      return;
    }
  
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 650);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  

  const finalBgColor = pathname.startsWith("/product/")
  ? "bg-transparent"
  : isScrolled
  ? "bg-white shadow-md"
  : bgColor;

const finalIconColor = pathname.startsWith("/product/") || isScrolled || pathname !== "/"
  ? "text-black"
  : iconColor;


  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${finalBgColor}`}>
      <div className="relative flex items-center h-16 px-4 sm:px-6 lg:px-8">
        <button onClick={openSidebar} className="mr-4 p-2 rounded-md cursor-pointer">
          <Menu className={`${finalIconColor} !w-[25px] !h-[25px]`} />
        </button>

        <div className="flex-1 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className={`text-[25px] font-bold cursor-pointer text-[#CA100F]`}
          >
            ANARCHIST
          </button>
        </div>

        <div className="flex items-center gap-x-4">
          {[
            { icon: <Search />, link: "/search" },
            { icon: <User />, link: "/account" },
            {
              icon: <ShoppingBag />,
              link: "/cart",
              badge: cart.items.length ? cart.items.length : null,
            },
          ].map(({ icon, link, badge }, index) => (
            <Button
              key={index}
              onClick={() => router.push(link)}
              className="relative p-2 rounded-md cursor-pointer bg-transparent hover:bg-transparent"
            >
              <div className={`w-8 h-8 flex items-center justify-center ${finalIconColor}`}>
                {icon}
              </div>
              {badge && (
                <span className="absolute top-0 right-0 w-4 h-4 text-xs text-white bg-black rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavbarClient;
