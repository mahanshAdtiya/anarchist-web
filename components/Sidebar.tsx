"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "@/types";
import Link from "next/link";
import useSidebarStore from "@/hooks/useSidebar";

interface SidebarProps {
  categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories }) => {
  const { isOpen, closeSidebar } = useSidebarStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={closeSidebar}
          />

          <motion.div
            className="fixed left-0 top-0 h-full bg-white opacity-92 shadow-lg z-[100] p-6 flex flex-col w-full md:w-[40%] lg:w-[30%]"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-lg font-semibold text-[#CA100F] hover:text-black">Explore</h2>
              <button onClick={closeSidebar} className="p-2 rounded-md hover:bg-gray-200">
                <X size={24} />
              </button>
            </div>

            <nav className="mt-4 space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="block p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100 hover:font-bold"
                  onClick={closeSidebar}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;