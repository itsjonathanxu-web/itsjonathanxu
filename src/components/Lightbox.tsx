"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type OriginRect = { x: number; y: number; width: number; height: number };

type LightboxContextType = {
  open: (src: string, alt: string, origin: OriginRect) => void;
};

const LightboxContext = createContext<LightboxContextType>({ open: () => {} });

export function useLightbox() {
  return useContext(LightboxContext);
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<{ src: string; alt: string; origin: OriginRect } | null>(null);

  const open = useCallback((src: string, alt: string, origin: OriginRect) => {
    setCurrent({ src, alt, origin });
  }, []);

  const close = useCallback(() => {
    setCurrent(null);
  }, []);

  // Close on Escape key + lock body scroll
  useEffect(() => {
    if (!current) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [current, close]);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {current && (
          <>
            {/* Backdrop - fades in/out independently */}
            <motion.div
              key="lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-0 z-[9998] cursor-zoom-out bg-black/70 backdrop-blur-md"
              onClick={close}
            />

            {/* Image - animates from clicked position to centered 85vw/85vh */}
            <motion.div
              key="lightbox-image"
              initial={{
                top: current.origin.y,
                left: current.origin.x,
                width: current.origin.width,
                height: current.origin.height,
              }}
              animate={{
                top: "7.5vh",
                left: "7.5vw",
                width: "85vw",
                height: "85vh",
              }}
              exit={{
                top: current.origin.y,
                left: current.origin.x,
                width: current.origin.width,
                height: current.origin.height,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed z-[9999] cursor-zoom-out overflow-hidden rounded-xl"
              onClick={close}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="85vw"
                quality={100}
                priority
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
