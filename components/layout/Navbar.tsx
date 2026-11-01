"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight, MapPin } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { SITE_DATA, getWhatsAppUrl, isDemoMode } from "@/lib/data/site-data";
import type { AjustesGenerales } from "@/lib/sanity/types";

interface NavbarProps {
  settings?: AjustesGenerales | null;
}

const PLAN_SUBLINKS = [
  { href: "/planes#membresias", label: "Membresías" },
  { href: "/planes#promociones", label: "Promociones" },
  { href: "/planes#clases", label: "Clases & Disciplinas" },
  { href: "/planes#beneficios", label: "Beneficios de Sede" },
];

export function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlanesDropdownOpen, setIsPlanesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = getWhatsAppUrl(
    settings?.mensajeWhatsappDefault ||
      "Hola Sumaq Center Gym, deseo consultar sobre las membresías y promociones."
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menús con tecla Escape o clic fuera
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsPlanesDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsPlanesDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sincronizar cierre de menús cuando cambia la ruta sin efecto en cascada
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setIsPlanesDropdownOpen(false);
  }

  const isHomeActive = pathname === "/";
  const isPlanesActive = pathname.startsWith("/planes");
  const isUbicacionActive = pathname.startsWith("/ubicacion");
  const isCalculadorasActive = pathname.startsWith("/calculadoras");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Cintillo Superior Discreto de Prototipo */}
      {isDemoMode && (
        <div className="bg-[#EAE3D6] border-b border-[#DCE3DD] py-1 px-4 text-center">
          <p className="text-[11px] font-semibold tracking-wide text-[#526159] uppercase">
            Prototipo: contenido de demostración.
          </p>
        </div>
      )}

      {/* Barra Principal de Navegación */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#F8F9F6]/95 backdrop-blur-md border-b border-[#DCE3DD] shadow-sm"
            : "bg-[#F8F9F6]/85 backdrop-blur-sm border-b border-[#DCE3DD]/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Textual Corporativo */}
            <Link
              href="/"
              className="flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48] rounded-lg p-1 -m-1"
              aria-label="Sumaq Center Gym - Ir al inicio"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-[#17211D] uppercase font-sans">
                  SUMAQ
                </span>
                <span className="w-2 h-2 rounded-full bg-[#176B48]"></span>
                <span className="text-xs sm:text-sm font-bold tracking-widest text-[#526159] uppercase">
                  CENTER GYM
                </span>
              </div>
              <div className="flex items-center gap-1.5 -mt-0.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]"
                  title="Sumaq Micro Brand Accent"
                ></span>
                <span className="text-[10px] tracking-wider uppercase text-[#526159] font-medium">
                  Cercado de Lima • Plaza de Armas
                </span>
              </div>
            </Link>

            {/* Navegación Desktop */}
            <nav
              className="hidden md:flex items-center gap-1 lg:gap-2"
              aria-label="Navegación principal"
            >
              {/* 1. INICIO */}
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] flex items-center ${
                  isHomeActive
                    ? "bg-[#E7F1E9] text-[#176B48]"
                    : "text-[#526159] hover:text-[#17211D] hover:bg-[#E7F1E9]/50"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
              >
                Inicio
              </Link>

              {/* 2. PLANES (con Dropdown Accesible) */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsPlanesDropdownOpen(true)}
                onMouseLeave={() => setIsPlanesDropdownOpen(false)}
              >
                <div
                  className={`flex items-center rounded-lg transition-all ${
                    isPlanesActive
                      ? "bg-[#E7F1E9] text-[#176B48]"
                      : "text-[#526159] hover:text-[#17211D] hover:bg-[#E7F1E9]/50"
                  }`}
                >
                  <Link
                    href="/planes"
                    className="pl-3.5 pr-1.5 py-2 text-xs font-bold uppercase tracking-wider min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48] rounded-l-lg"
                  >
                    Planes
                  </Link>

                  <button
                    type="button"
                    onClick={() => setIsPlanesDropdownOpen(!isPlanesDropdownOpen)}
                    aria-expanded={isPlanesDropdownOpen}
                    aria-haspopup="true"
                    aria-label="Abrir submenú de planes y secciones"
                    className="pr-3 pl-1 py-2 min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48] rounded-r-lg"
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isPlanesDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Submenú Desplegable Accesible */}
                <AnimatePresence>
                  {isPlanesDropdownOpen && (
                    <motion.div
                      initial={
                        shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }
                      }
                      animate={
                        shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                      }
                      exit={
                        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
                      }
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 w-56 pt-2 z-50"
                    >
                      <div className="bg-[#FFFFFF] border border-[#DCE3DD] rounded-xl shadow-lg p-2 space-y-1">
                        {PLAN_SUBLINKS.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            onClick={() => setIsPlanesDropdownOpen(false)}
                            className="block px-3 py-2.5 rounded-lg text-xs font-semibold text-[#17211D] hover:bg-[#E7F1E9] hover:text-[#176B48] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]"
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. UBICACIÓN */}
              <Link
                href="/ubicacion"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] flex items-center ${
                  isUbicacionActive
                    ? "bg-[#E7F1E9] text-[#176B48]"
                    : "text-[#526159] hover:text-[#17211D] hover:bg-[#E7F1E9]/50"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
              >
                Ubicación
              </Link>

              {/* 4. CALCULADORAS */}
              <Link
                href="/calculadoras"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] flex items-center ${
                  isCalculadorasActive
                    ? "bg-[#E7F1E9] text-[#176B48]"
                    : "text-[#526159] hover:text-[#17211D] hover:bg-[#E7F1E9]/50"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]`}
              >
                Calculadoras
              </Link>
            </nav>

            {/* CTA Desktop - Rectangular Moderado rounded-lg (Sin Píldora) */}
            <div className="hidden md:flex items-center gap-3">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B48]"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp</span>
                </a>
              ) : (
                <Link
                  href="/ubicacion"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B48]"
                  title="Línea de WhatsApp pendiente de confirmación formal. Consulta nuestra sede en Jr. Callao 126."
                >
                  <MapPin className="w-4 h-4 text-white" />
                  <span>Contacto en Sede</span>
                </Link>
              )}
            </div>

            {/* Botón Disparador Menú Móvil */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#17211D] hover:bg-[#E7F1E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48] min-h-[44px] min-w-[44px]"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-b border-[#DCE3DD] bg-[#FFFFFF] shadow-xl"
          >
            <nav className="px-4 pt-3 pb-6 flex flex-col gap-1.5" aria-label="Menú móvil">
              {/* Inicio */}
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px] ${
                  isHomeActive
                    ? "bg-[#E7F1E9] text-[#176B48]"
                    : "text-[#17211D] hover:bg-[#F8F9F6]"
                }`}
              >
                <span>Inicio</span>
                <ArrowUpRight className="w-4 h-4 text-[#526159]" />
              </Link>

              {/* Planes Principal */}
              <div className="space-y-1">
                <Link
                  href="/planes"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px] ${
                    isPlanesActive
                      ? "bg-[#E7F1E9] text-[#176B48]"
                      : "text-[#17211D] hover:bg-[#F8F9F6]"
                  }`}
                >
                  <span>Planes & Membresías</span>
                  <ArrowUpRight className="w-4 h-4 text-[#526159]" />
                </Link>

                {/* Subenlaces de Planes */}
                <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-[#DCE3DD] ml-3">
                  {PLAN_SUBLINKS.map((sublink) => (
                    <Link
                      key={sublink.href}
                      href={sublink.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#526159] hover:text-[#176B48] hover:bg-[#E7F1E9]/50 min-h-[40px] flex items-center"
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Ubicación */}
              <Link
                href="/ubicacion"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px] ${
                  isUbicacionActive
                    ? "bg-[#E7F1E9] text-[#176B48]"
                    : "text-[#17211D] hover:bg-[#F8F9F6]"
                }`}
              >
                <span>Ubicación</span>
                <ArrowUpRight className="w-4 h-4 text-[#526159]" />
              </Link>

              {/* Calculadoras */}
              <Link
                href="/calculadoras"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px] ${
                  isCalculadorasActive
                    ? "bg-[#E7F1E9] text-[#176B48]"
                    : "text-[#17211D] hover:bg-[#F8F9F6]"
                }`}
              >
                <span>Calculadoras</span>
                <ArrowUpRight className="w-4 h-4 text-[#526159]" />
              </Link>

              {/* Botón Móvil */}
              <div className="pt-4 mt-2 border-t border-[#DCE3DD]">
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-lg text-sm font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] active:scale-[0.98] transition-all shadow-md min-h-[44px]"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                    <span>Contactar por WhatsApp</span>
                  </a>
                ) : (
                  <Link
                    href="/ubicacion"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-lg text-sm font-bold uppercase tracking-wider bg-[#176B48] text-white hover:bg-[#105236] active:scale-[0.98] transition-all shadow-md min-h-[44px]"
                  >
                    <MapPin className="w-5 h-5 text-white" />
                    <span>Contacto en Sede (Jr. Callao 126)</span>
                  </Link>
                )}
                <p className="text-center text-[11px] text-[#526159] mt-2 font-medium">
                  {SITE_DATA.street} • {SITE_DATA.district}
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
