"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type LightboxContextType = {
  open: (src: string, alt: string) => void;
};

const LightboxContext = createContext<LightboxContextType>({ open: () => {} });

export function useLightbox() {
  return useContext(LightboxContext);
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<{ src: string; alt: string } | null>(null);

  const open = useCallback((src: string, alt: string) => {
    setCurrent({ src, alt });
  }, []);

  const close = useCallback(() => {
    setCurrent(null);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!current) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    // Prevent body scroll when lightbox is open
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center cursor-zoom-out"
            onClick={close}
          >
            {/* Blurred backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

            {/* Image container - 85% of viewport with padding */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 flex items-center justify-center"
              style={{ width: "85vw", height: "85vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain cursor-zoom-out"
                sizes="85vw"
                quality={100}
                priority
                onClick={close}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
