import type { MetadataRoute } from "next";
import { isDemoMode } from "@/lib/data/site-data";

/**
 * Generador dinámico de robots.txt según el estado del proyecto:
 * 1. En Modo Demostración (isDemoMode === true): Bloquea todos los rastreadores
 *    para evitar indexación de contenidos provisionales de prototipo.
 * 2. En Producción Aprobada (isDemoMode === false): Permite el rastreo de páginas públicas,
 *    bloquea explícitamente el panel administrativo /studio y declara el sitemap oficial.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sumaqcentergym.com";

  if (isDemoMode) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/studio/*"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
