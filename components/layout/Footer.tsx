import React from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, ArrowUpRight, ShieldCheck } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/ui/Icons";
import { BadgeUnconfirmed } from "@/components/ui/BadgeUnconfirmed";
import { getWhatsAppUrl } from "@/lib/data/site-data";
import type { AjustesGenerales } from "@/lib/sanity/types";

const CURRENT_YEAR = 2026;

interface FooterProps {
  settings?: AjustesGenerales | null;
}

export function Footer({ settings }: FooterProps) {
  const address =
    settings?.direccion || "Jirón Callao 126, Cercado de Lima 15001";
  const displayPhone = settings?.telefonoWhatsapp || "933 596 324";
  const instagramUrl =
    settings?.instagramUrl || "https://www.instagram.com/sumaqcentergym/";
  const facebookUrl =
    settings?.facebookUrl || "https://www.facebook.com/SumaqSumaqGYM/";
  const hoursWeek =
    settings?.horarioLunesViernes || "6:00 a. m. – 11:00 p. m.";
  const hoursSat = settings?.horarioSabado || "POR CONFIRMAR";
  const hoursSun = settings?.horarioDomingo || "POR CONFIRMAR";

  const whatsappFooterUrl = getWhatsAppUrl(
    "Hola Sumaq Center Gym, deseo más información sobre membresías y horarios."
  );

  return (
    <footer className="bg-[#17211D] border-t border-[#263730] text-[#9DB0A6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Columna 1: Marca y Propuesta */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black tracking-wider text-white uppercase">
                  SUMAQ
                </span>
                <span className="w-2 h-2 rounded-full bg-[#176B48]"></span>
                <span className="text-sm font-semibold tracking-widest text-[#A3B8AD] uppercase">
                  CENTER GYM
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]"></span>
                <span className="text-xs text-[#A3B8AD] font-medium uppercase tracking-wider">
                  Cercado de Lima
                </span>
              </div>
            </div>
            <p className="text-sm text-[#A3B8AD] leading-relaxed">
              Tu centro de acondicionamiento físico, fuerza y salud en el centro histórico de Lima. A solo unos pasos de la histórica Plaza Mayor.
            </p>
            {/* Redes Sociales - Botones Rectangulares rounded-lg */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#176B48] hover:text-white flex items-center justify-center transition-all text-[#A3B8AD] border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]"
                aria-label="Instagram de Sumaq Center Gym"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#176B48] hover:text-white flex items-center justify-center transition-all text-[#A3B8AD] border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]"
                aria-label="Facebook de Sumaq Center Gym"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              {whatsappFooterUrl && (
                <a
                  href={whatsappFooterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#176B48] hover:text-white flex items-center justify-center transition-all text-[#A3B8AD] border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]"
                  aria-label="WhatsApp de Sumaq Center Gym"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#176B48]"></span>
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/planes"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Planes de Membresía
                </Link>
              </li>
              <li>
                <Link
                  href="/planes#clases"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Clases & Disciplinas
                </Link>
              </li>
              <li>
                <Link
                  href="/planes#promociones"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Promociones Activas
                </Link>
              </li>
              <li>
                <Link
                  href="/calculadoras"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Calculadoras de Entrenamiento
                </Link>
              </li>
              <li>
                <Link
                  href="/ubicacion"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Ubicación y Accesos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Horarios de Atención */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A3B8AD]" />
              Horarios
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <span className="text-xs font-semibold text-white block">
                  Lunes a Viernes
                </span>
                <span className="text-white font-mono font-medium">
                  {hoursWeek}
                </span>
                <span className="text-[10px] text-[#A3B8AD] block mt-0.5">
                  Horario continuo confirmado
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">
                    Sábados:
                  </span>
                  {hoursSat.includes("CONFIRMAR") ? (
                    <BadgeUnconfirmed size="sm" />
                  ) : (
                    <span className="text-xs font-mono text-white">
                      {hoursSat}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">
                    Domingos:
                  </span>
                  {hoursSun.includes("CONFIRMAR") ? (
                    <BadgeUnconfirmed size="sm" />
                  ) : (
                    <span className="text-xs font-mono text-white">
                      {hoursSun}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Columna 4: Ubicación y Contacto */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#A3B8AD]" />
              Contacto y Local
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-[#A3B8AD] leading-snug">
                <strong className="text-white block font-medium">Dirección:</strong>
                {address}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#A3B8AD]">Piso y ref:</span>
                <BadgeUnconfirmed size="sm" label="7.° PISO (POR CONFIRMAR)" />
              </div>
              <p className="text-xs text-[#A3B8AD] font-medium">
                Referencia: A pocos metros de la Plaza de Armas
              </p>
              <div className="pt-2 border-t border-white/10">
                {whatsappFooterUrl ? (
                  <a
                    href={whatsappFooterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-[#A3B8AD] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#A3B8AD]" />
                    <span className="font-mono">{displayPhone}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 text-white">
                    <Phone className="w-4 h-4 text-[#A3B8AD]" />
                    <span className="font-mono text-xs">{displayPhone}</span>
                    <BadgeUnconfirmed size="sm" label="POR CONFIRMAR" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Separador inferior y Créditos */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3B8AD]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#176B48]" />
            <span>
              © {CURRENT_YEAR} Sumaq Center Gym. Todos los derechos reservados.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-[#A3B8AD]">
              Datos sujetos a validación de administración
            </span>
            <Link
              href="/studio"
              className="text-[#A3B8AD] hover:text-white transition-colors underline underline-offset-4 flex items-center gap-1"
            >
              <span>Acceso Studio</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
