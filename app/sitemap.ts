import type { MetadataRoute } from "next";

/**
 * Generador oficial de sitemap.xml para Sumaq Center Gym.
 * Lista exclusivamente las 4 rutas públicas canónicas con el dominio de producción.
 * Excluye de forma rigurosa la ruta administrativa /studio.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    "http://localhost:3000";
  const currentDate = new Date("2026-11-01T00:00:00.000Z");

  return [
    {
      url: `${siteUrl}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/planes`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/ubicacion`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/calculadoras`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
